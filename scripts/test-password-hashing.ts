import { hashPassword, verifyPassword, needsPasswordUpgrade } from "../lib/auth";
import bcrypt from "bcryptjs";

async function runTests() {
  console.log("Running Password Hashing Tests...");
  let passed = 0;
  let failed = 0;

  async function assert(name: string, condition: boolean) {
    if (condition) {
      console.log(`✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${name}`);
      failed++;
    }
  }

  // 1. 8-character ASCII password
  const p8 = "password";
  const h8 = await hashPassword(p8);
  await assert("8-character ASCII password verifies", await verifyPassword(p8, h8));
  await assert("8-character ASCII password rejects wrong password", !(await verifyPassword("wrong123", h8)));

  // 2. Normal 20-character password
  const p20 = "correct-horse-battery";
  const h20 = await hashPassword(p20);
  await assert("20-character password verifies", await verifyPassword(p20, h20));

  // 3. Exactly 72-byte password
  const p72 = "a".repeat(72);
  const h72 = await hashPassword(p72);
  await assert("72-byte password verifies", await verifyPassword(p72, h72));

  // 4. 73-byte password
  const p73 = "a".repeat(73);
  const h73 = await hashPassword(p73);
  await assert("73-byte password verifies", await verifyPassword(p73, h73));
  
  // Bcrypt flaw check: in raw bcrypt, a 73 char password and a 72 char password might verify the same if the first 72 match!
  // In our v2, they MUST be distinct.
  await assert("73-byte password does NOT verify against 72-byte hash", !(await verifyPassword(p73, h72)));

  // 5. 100-character ASCII password
  const p100 = "a".repeat(72) + "b".repeat(28); // 100 chars
  const h100 = await hashPassword(p100);
  await assert("100-character ASCII password verifies", await verifyPassword(p100, h100));
  
  const p100_wrong = "a".repeat(72) + "c".repeat(28); // Same first 72 bytes, different end
  await assert("100-character ASCII password detects changes after 72 bytes", !(await verifyPassword(p100_wrong, h100)));

  // 6. 128-character ASCII password
  const p128 = "x".repeat(128);
  const h128 = await hashPassword(p128);
  await assert("128-character ASCII password verifies", await verifyPassword(p128, h128));
  const p128_wrong = "x".repeat(72) + "y".repeat(56);
  await assert("128-character ASCII password detects changes after 72 bytes", !(await verifyPassword(p128_wrong, h128)));

  // 7. Unicode password
  const pUnicode = "पासवर्ड-password";
  const hUnicode = await hashPassword(pUnicode);
  await assert("Unicode password verifies", await verifyPassword(pUnicode, hUnicode));

  // 8. Emoji-containing password
  const pEmoji = "password🚀🔥🔐";
  const hEmoji = await hashPassword(pEmoji);
  await assert("Emoji password verifies", await verifyPassword(pEmoji, hEmoji));

  // 9. Legacy bcrypt hash
  const legacyHash = await bcrypt.hash("legacy-password", 12);
  await assert("Legacy hash verifies correctly", await verifyPassword("legacy-password", legacyHash));
  await assert("needsPasswordUpgrade returns true for legacy hash", needsPasswordUpgrade(legacyHash));

  // 10. New v2 hash
  await assert("needsPasswordUpgrade returns false for v2 hash", !needsPasswordUpgrade(h20));

  console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test execution failed:", e);
  process.exit(1);
});
