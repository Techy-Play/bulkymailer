import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mailer";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with that email address" }, 
        { status: 404 }
      );
    }

    // Generate a secure, 64-character random hex token
    const unhashedToken = crypto.randomBytes(32).toString("hex");
    
    // Hash the token before storing it (security best practice)
    const hashedToken = crypto.createHash("sha256").update(unhashedToken).digest("hex");
    
    // Set expiry to 1 hour from now
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    await db.user.update({
      where: { id: user.id },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: tokenExpiry,
      },
    });

    // Send the raw, unhashed token in the email
    await sendPasswordResetEmail(user.email, unhashedToken);

    return NextResponse.json({ message: "Reset link sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("[FORGOT_PASSWORD_ERROR]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
