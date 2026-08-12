import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { $ as t, G as n, H as r, K as i, U as a, W as o, X as s, Y as ee, Z as te, q as c, z as l } from "./src-CZjSXPYq.js";
import { t as u } from "./htmlparser-CPhs2cYE.js";
//#region ../quality/src/types.ts
var d = {
	altMaxLength: 125,
	minFontSize: 14,
	allCapsMinLength: 20,
	minTouchTargetPx: 44
}, f = [
	"localhost",
	"127.0.0.1",
	"0.0.0.0",
	"*.local",
	"*.staging.*",
	"*.dev.*"
];
//#endregion
//#region ../quality/src/contrast.ts
function p(e, t) {
	let n = m(e), r = m(t);
	if (!n || !r) return NaN;
	let i = g(n), a = g(r), o = Math.max(i, a), s = Math.min(i, a);
	return (o + .05) / (s + .05);
}
var ne = /^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i, re = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i, ie = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
function m(e) {
	if (typeof e != "string") return null;
	let t = e.trim(), n = ie.exec(t);
	if (n) return n[4].toLowerCase() === "ff" ? {
		r: parseInt(n[1], 16),
		g: parseInt(n[2], 16),
		b: parseInt(n[3], 16)
	} : null;
	let r = re.exec(t);
	if (r) return {
		r: parseInt(r[1], 16),
		g: parseInt(r[2], 16),
		b: parseInt(r[3], 16)
	};
	let i = ne.exec(t);
	return i ? {
		r: parseInt(i[1] + i[1], 16),
		g: parseInt(i[2] + i[2], 16),
		b: parseInt(i[3] + i[3], 16)
	} : null;
}
function h(e) {
	return m(e ?? "") !== null;
}
function g({ r: e, g: t, b: n }) {
	let r = _(e / 255), i = _(t / 255), a = _(n / 255);
	return .2126 * r + .7152 * i + .0722 * a;
}
function _(e) {
	return e <= .03928 ? e / 12.92 : ((e + .055) / 1.055) ** 2.4;
}
//#endregion
//#region ../quality/src/walk.ts
var v = "#ffffff", y = "#1a1a1a";
function b(e, t) {
	let n = h(e.settings.backgroundColor) ? e.settings.backgroundColor.toLowerCase() : v, r = h(e.settings.textColor) ? e.settings.textColor.toLowerCase() : y, a = (e, n) => {
		let r = e.styles?.backgroundColor, o = h(r) ? r.toLowerCase() : n.resolvedBackgroundColor;
		t(e, o === n.resolvedBackgroundColor ? n : {
			...n,
			resolvedBackgroundColor: o
		}), i(e) && e.children.forEach((t, r) => {
			t.forEach((t) => a(t, {
				parent: e,
				section: e,
				columnIndex: r,
				depth: n.depth + 1,
				resolvedBackgroundColor: o,
				resolvedTextColor: n.resolvedTextColor
			}));
		});
	};
	for (let t of e.blocks) a(t, {
		parent: null,
		section: null,
		columnIndex: null,
		depth: 0,
		resolvedBackgroundColor: n,
		resolvedTextColor: r
	});
}
//#endregion
//#region ../quality/src/run-rules.ts
function x(e, t, n, r) {
	let i = [];
	function a(e, t, i) {
		return {
			blockId: i.blockId,
			ruleId: e,
			severity: t,
			message: r(n.locale, e, i.params),
			fix: i.fix
		};
	}
	b(e, (e, r) => {
		for (let o of t) {
			let t = n.severity(o.meta.id);
			if (t === "off" || !o.block) continue;
			let s = o.block(e, r, n);
			s !== null && i.push(a(o.meta.id, t, s));
		}
	});
	for (let r of t) {
		let t = n.severity(r.meta.id);
		if (t === "off" || !r.template) continue;
		let o = r.template(e, n);
		for (let e of o) i.push(a(r.meta.id, t, e));
	}
	return i;
}
function S(e) {
	let t = e.overrides ?? {}, n = {
		...d,
		...e.thresholds ?? {}
	}, r = { nonProductionHosts: e.nonProductionHosts ?? f }, i = e.locale ?? "en", a = e.rules;
	return {
		locale: i,
		rules: t,
		thresholds: n,
		links: r,
		severity: (e) => {
			let n = t[e];
			return n === void 0 ? a.find((t) => t.meta.id === e)?.meta.severity ?? "warning" : n;
		}
	};
}
function ae(e, t, n) {
	return S({
		locale: e,
		rules: n,
		overrides: t.rules,
		thresholds: t.thresholds,
		nonProductionHosts: void 0
	});
}
function oe(e, t, n) {
	return S({
		locale: e,
		rules: n,
		overrides: t.rules,
		thresholds: void 0,
		nonProductionHosts: void 0
	});
}
function se(e, t, n) {
	return S({
		locale: e,
		rules: n,
		overrides: t.rules,
		thresholds: void 0,
		nonProductionHosts: t.nonProductionHosts
	});
}
//#endregion
//#region ../quality/src/accessibility/messages/de.ts
var ce = /* @__PURE__ */ e({ default: () => le }), le = {
	"a11y.img-missing-alt": "Bild ohne Alt-Text. Füge eine kurze Beschreibung hinzu oder markiere das Bild als dekorativ.",
	"a11y.img-alt-is-filename": "Alt-Text sieht wie ein Dateiname aus (\"{alt}\"). Beschreibe stattdessen kurz, was das Bild zeigt.",
	"a11y.img-alt-too-long": "Alt-Text ist {length} Zeichen lang; bleibe unter {max}.",
	"a11y.img-decorative-needs-empty-alt": "Dekoratives Bild hat Alt-Text. Entferne den Alt-Text oder hebe die Markierung als dekorativ auf.",
	"a11y.img-linked-no-context": "Verlinktes Bild beschreibt nur das Motiv, nicht das Linkziel. Nenne das Ziel (z. B. „Frühlingssale ansehen“).",
	"a11y.heading-empty": "Überschrift ist leer. Füge Text hinzu oder entferne den Block.",
	"a11y.heading-skip-level": "Überschrift springt von H{from} auf H{to}. Eine Ebene pro Schritt.",
	"a11y.heading-multiple-h1": "E-Mail enthält mehr als eine H1. Verwende H1 nur einmal für die Hauptüberschrift.",
	"a11y.link-empty": "Ein Link in diesem Block hat keinen Text und kein beschriebenes Bild.",
	"a11y.link-vague-text": "Link-Text „{text}“ ist unspezifisch. Beschreibe stattdessen das Ziel.",
	"a11y.link-href-empty": "Ein Link in diesem Block hat ein leeres oder „#“-href.",
	"a11y.link-target-blank-no-rel": "Link öffnet in neuem Tab, aber rel=\"noopener\" fehlt – ergänze es, damit das Ziel nicht auf window.opener zugreifen kann.",
	"a11y.link-nested-anchor": "Ein Link liegt innerhalb eines anderen Links. Verschachtelte Anker sind ungültiges HTML und werden von E-Mail-Clients unterschiedlich gerendert – flache einen einzigen Anker daraus.",
	"a11y.text-all-caps": "Längere Texte in Großbuchstaben sind schwerer lesbar. Verwende Groß- und Kleinschreibung.",
	"a11y.text-justified": "Blocksatz dehnt die Wortabstände zu ungleichmäßigen „Flüssen“ aus Leerraum, die für Menschen mit Legasthenie und Sehbeeinträchtigung am schwersten zu verfolgen sind. Verwende linksbündigen Text.",
	"a11y.text-low-contrast": "Überschriftskontrast beträgt {ratio}:1; WCAG AA verlangt mindestens {required}:1.",
	"a11y.text-too-small": "Text ist {size}px; mindestens {min}px verwenden.",
	"a11y.button-vague-label": "Button-Beschriftung „{text}“ ist unspezifisch. Beschreibe die Aktion.",
	"a11y.button-touch-target": "Button ist etwa {height}px hoch; mindestens {min}px verwenden, um Fehltipper auf Mobilgeräten zu vermeiden.",
	"a11y.button-low-contrast": "Buttontextkontrast beträgt {ratio}:1; WCAG AA verlangt mindestens {required}:1.",
	"a11y.missing-preheader": "Kein Preheader-Text gesetzt. Postfächer zeigen sonst Bruchstücke des ersten Blocks an."
}, ue = /* @__PURE__ */ e({ default: () => C }), C = {
	"a11y.img-missing-alt": "Image is missing alt text. Add a short description, or mark the image as decorative.",
	"a11y.img-alt-is-filename": "Alt text looks like a filename (\"{alt}\"). Replace with a short description of what the image conveys.",
	"a11y.img-alt-too-long": "Alt text is {length} characters; aim for under {max}.",
	"a11y.img-decorative-needs-empty-alt": "Decorative image has alt text. Either clear the alt text or unmark the image as decorative.",
	"a11y.img-linked-no-context": "Linked image alt describes the image but not the link destination. Include where the link goes (e.g. 'Buy spring sale').",
	"a11y.heading-empty": "Heading is empty. Add text or remove the block.",
	"a11y.heading-skip-level": "Heading jumps from H{from} to H{to}. Step one level at a time.",
	"a11y.heading-multiple-h1": "Email has more than one H1. Use H1 once for the main heading.",
	"a11y.link-empty": "A link in this block has no text and no described image.",
	"a11y.link-vague-text": "Link text \"{text}\" is vague. Describe the destination instead.",
	"a11y.link-href-empty": "A link in this block has an empty or '#' href.",
	"a11y.link-target-blank-no-rel": "Link opens in a new tab but is missing rel=\"noopener\" — add it to prevent the destination from accessing window.opener.",
	"a11y.link-nested-anchor": "A link is nested inside another link. Nested anchors are invalid HTML and clients render them inconsistently — flatten to a single anchor.",
	"a11y.text-all-caps": "Long all-caps text is harder to read for everyone. Use sentence case.",
	"a11y.text-justified": "Justified text stretches word spacing into uneven 'rivers' of white space, which is hardest to track for dyslexic and low-vision readers. Use left-aligned text.",
	"a11y.text-low-contrast": "Heading contrast is {ratio}:1; WCAG AA requires at least {required}:1.",
	"a11y.text-too-small": "Text is {size}px; aim for at least {min}px.",
	"a11y.button-vague-label": "Button label \"{text}\" is vague. Describe the action.",
	"a11y.button-touch-target": "Button is roughly {height}px tall; aim for at least {min}px to avoid mis-taps on mobile.",
	"a11y.button-low-contrast": "Button text contrast is {ratio}:1; WCAG AA requires at least {required}:1.",
	"a11y.missing-preheader": "No preheader text set. Inboxes will fall back to fragments of the first block."
}, w = /* #__PURE__ */ Object.assign({
	"./de.ts": ce,
	"./en.ts": ue
}), T = {};
for (let e in w) {
	let t = /\.\/([^/]+)\.ts$/.exec(e);
	if (!t) continue;
	let n = t[1];
	n !== "index" && (T[n] = w[e].default);
}
function de(e) {
	return T[e.split("-")[0]?.toLowerCase() ?? "en"] ?? T.en ?? C;
}
function fe(e, t, n) {
	let r = de(e)[t] ?? C[t];
	return n ? r.replace(/\{(\w+)\}/g, (e, t) => {
		let r = n[t];
		return r === void 0 ? `{${t}}` : String(r);
	}) : r;
}
var pe = {
	meta: {
		id: "a11y.img-missing-alt",
		severity: "error"
	},
	block(e) {
		return !a(e) || e.decorative === !0 || (e.alt?.trim() ?? "") !== "" || (e.src ?? "").trim() === "" ? null : { blockId: e.id };
	}
}, me = {
	id: "a11y.img-alt-is-filename",
	severity: "warning"
}, he = [
	/\.(jpe?g|png|gif|webp|svg)$/i,
	/^IMG[_-]?\d+/i,
	/^Untitled/i,
	/^Screen[\s_-]?Shot/i,
	/^DSC[_-]?\d+/i
], ge = {
	meta: me,
	block(e) {
		if (!a(e) || e.decorative === !0) return null;
		let t = e.alt?.trim() ?? "";
		return t === "" || !he.some((e) => e.test(t)) ? null : {
			blockId: e.id,
			params: { alt: t }
		};
	}
}, _e = {
	meta: {
		id: "a11y.img-alt-too-long",
		severity: "warning"
	},
	block(e, t, n) {
		if (!a(e) || e.decorative === !0) return null;
		let r = e.alt ?? "";
		return r.length <= n.thresholds.altMaxLength ? null : {
			blockId: e.id,
			params: {
				length: r.length,
				max: n.thresholds.altMaxLength
			}
		};
	}
}, ve = {
	meta: {
		id: "a11y.img-decorative-needs-empty-alt",
		severity: "info"
	},
	block(e) {
		return !a(e) || e.decorative !== !0 || (e.alt ?? "").trim() === "" ? null : {
			blockId: e.id,
			fix: {
				description: "Clear alt text",
				apply: (t) => t.updateBlock(e.id, { alt: "" })
			}
		};
	}
}, ye = /* @__PURE__ */ e({ default: () => be }), be = {
	vagueLinkText: [
		"hier klicken",
		"hier",
		"mehr lesen",
		"mehr",
		"weiter",
		"weiterlesen",
		"siehe mehr",
		"dies",
		"dieser link",
		"link",
		"klick"
	],
	vagueButtonLabels: [
		"hier klicken",
		"klicken",
		"senden",
		"los",
		"ok",
		"okay",
		"ja",
		"nein"
	],
	linkedImageActionHints: [
		"kaufen",
		"shoppen",
		"ansehen",
		"lesen",
		"lernen",
		"öffnen",
		"los",
		"sehen",
		"entdecken",
		"erkunden",
		"stöbern",
		"herunterladen",
		"holen",
		"abholen",
		"einlösen",
		"anschauen",
		"jetzt"
	]
}, xe = /* @__PURE__ */ e({ default: () => E }), E = {
	vagueLinkText: [
		"click here",
		"here",
		"read more",
		"more",
		"learn more",
		"see more",
		"this",
		"this link",
		"link",
		"click"
	],
	vagueButtonLabels: [
		"click here",
		"click",
		"submit",
		"go",
		"ok",
		"okay",
		"yes",
		"no"
	],
	linkedImageActionHints: [
		"buy",
		"shop",
		"view",
		"read",
		"learn",
		"open",
		"go",
		"see",
		"explore",
		"discover",
		"browse",
		"download",
		"get",
		"claim",
		"redeem",
		"watch"
	]
}, D = /* #__PURE__ */ Object.assign({
	"./de.ts": ye,
	"./en.ts": xe
}), O = {};
for (let e in D) {
	let t = /\.\/([^/]+)\.ts$/.exec(e);
	if (!t) continue;
	let n = t[1];
	n !== "index" && (O[n] = D[e].default);
}
function k(e) {
	return j;
}
function A(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of Object.values(O)) for (let r of e(n)) t.add(r);
	return Array.from(t);
}
var j = {
	vagueLinkText: A((e) => e.vagueLinkText),
	vagueButtonLabels: A((e) => e.vagueButtonLabels),
	linkedImageActionHints: A((e) => e.linkedImageActionHints)
};
function M(e) {
	return e.toLowerCase().replace(/\s+/g, " ").replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").trim();
}
var Se = {
	meta: {
		id: "a11y.img-linked-no-context",
		severity: "warning"
	},
	block(e, t, n) {
		if (!a(e) || e.decorative === !0 || !e.linkUrl || e.linkUrl.trim() === "") return null;
		let r = (e.alt ?? "").trim();
		if (r === "") return null;
		let i = r.toLocaleLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), o = k(n.locale).linkedImageActionHints;
		return i.some((e) => o.includes(e)) ? null : { blockId: e.id };
	}
};
//#endregion
//#region ../quality/src/html-utils.ts
function N(e) {
	let t = [], n = null, r = "", i = () => {
		n !== null && (n.text = r.trim(), t.push(n), n = null, r = "");
	}, a = new u({
		onopentag(e, t) {
			if (e === "a") {
				i(), n = {
					href: t.href ?? "",
					text: "",
					target: t.target ?? null,
					rel: t.rel ?? null,
					hasImageWithAlt: !1
				};
				return;
			}
			e === "img" && n !== null && (t.alt ?? "").trim() !== "" && (n.hasImageWithAlt = !0);
		},
		ontext(e) {
			n !== null && (r += e);
		},
		onclosetag(e) {
			e === "a" && i();
		}
	});
	return a.write(e), a.end(), i(), t;
}
function Ce(e) {
	let t = we(e).matchAll(/<\/?a\b[^<>]*>/gi), n = 0;
	for (let e of t) {
		if (e[0].startsWith("</")) {
			n > 0 && n--;
			continue;
		}
		if (n > 0) return !0;
		n++;
	}
	return !1;
}
function we(e) {
	let t = "", n = 0;
	for (; n < e.length;) {
		let r = e.indexOf("<!--", n);
		if (r === -1) {
			t += e.substring(n);
			break;
		}
		t += e.substring(n, r);
		let i = e.indexOf("-->", r + 4);
		if (i === -1) break;
		n = i + 3;
	}
	return t;
}
function P(e) {
	let t = "", n = new u({ ontext(e) {
		t += e;
	} });
	return n.write(e), n.end(), t.trim();
}
var Te = {
	meta: {
		id: "a11y.heading-empty",
		severity: "error"
	},
	block(e) {
		return !s(e) || P(e.content ?? "") !== "" ? null : { blockId: e.id };
	}
}, Ee = {
	id: "a11y.heading-skip-level",
	severity: "error"
};
function F(e, t) {
	for (let n of e) {
		if (s(n)) {
			t.push(n);
			continue;
		}
		if (i(n)) for (let e of n.children) F(e, t);
	}
}
var De = {
	meta: Ee,
	template(e) {
		let t = [];
		F(e.blocks, t);
		let n = [], r = 0;
		for (let e of t) r !== 0 && e.level > r + 1 && n.push({
			blockId: e.id,
			params: {
				from: r,
				to: e.level
			}
		}), r = e.level;
		return n;
	}
}, Oe = {
	id: "a11y.heading-multiple-h1",
	severity: "warning"
};
function I(e, t) {
	for (let n of e) {
		if (s(n)) {
			t.push(n);
			continue;
		}
		if (i(n)) for (let e of n.children) I(e, t);
	}
}
var ke = {
	meta: Oe,
	template(e) {
		let t = [];
		I(e.blocks, t);
		let n = t.filter((e) => e.level === 1);
		return n.length <= 1 ? [] : n.slice(1).map((e) => ({ blockId: e.id }));
	}
}, Ae = {
	id: "a11y.link-empty",
	severity: "error"
};
function je(e) {
	return n(e) || s(e) ? e.content : null;
}
var Me = {
	meta: Ae,
	block(e) {
		let t = je(e);
		return t === null || !N(t).find((e) => e.text === "" && !e.hasImageWithAlt) ? null : { blockId: e.id };
	}
}, Ne = {
	id: "a11y.link-vague-text",
	severity: "warning"
};
function Pe(e) {
	return n(e) || s(e) ? e.content : null;
}
var Fe = {
	meta: Ne,
	block(e, t, n) {
		let r = Pe(e);
		if (r === null) return null;
		let i = k(n.locale).vagueLinkText, a = N(r).find((e) => {
			let t = M(e.text);
			return t !== "" && i.includes(t);
		});
		return a ? {
			blockId: e.id,
			params: { text: a.text }
		} : null;
	}
}, Ie = {
	id: "a11y.link-href-empty",
	severity: "error"
};
function Le(e) {
	return n(e) || s(e) ? e.content : null;
}
var Re = {
	meta: Ie,
	block(e) {
		let t = Le(e);
		return t === null || !N(t).find((e) => {
			let t = e.href.trim();
			return t === "" || t === "#";
		}) ? null : { blockId: e.id };
	}
}, ze = {
	id: "a11y.link-target-blank-no-rel",
	severity: "warning"
};
function Be(e) {
	return n(e) || s(e) ? e.content : null;
}
function Ve(e) {
	if (e === null) return !1;
	let t = e.toLowerCase().split(/\s+/);
	return t.includes("noopener") || t.includes("noreferrer");
}
var He = {
	meta: ze,
	block(e) {
		let t = Be(e);
		return t === null || !N(t).find((e) => e.target === "_blank" && !Ve(e.rel)) ? null : {
			blockId: e.id,
			fix: {
				description: "Add rel=\"noopener\"",
				apply: (t) => {
					if (!n(e) && !s(e)) return;
					let r = Ge(e.content ?? "");
					t.updateBlock(e.id, { content: r });
				}
			}
		};
	}
}, L = /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
function Ue(e) {
	let t = [], n = new RegExp(L.source, L.flags), r;
	for (; (r = n.exec(e)) !== null;) t.push({
		raw: r[0],
		name: r[1],
		value: r[2] ?? r[3] ?? r[4] ?? null,
		start: r.index
	});
	return t;
}
function We(e) {
	return e.some((e) => e.name.toLowerCase() === "target" && e.value !== null && e.value.toLowerCase() === "_blank");
}
function Ge(e) {
	return e.replace(/<a\b([^>]*)>/gi, (e, t) => {
		let n = Ue(t);
		if (!We(n)) return e;
		let r = n.find((e) => e.name.toLowerCase() === "rel");
		if (r) {
			let n = (r.value ?? "").toLowerCase().split(/\s+/);
			if (n.includes("noopener") || n.includes("noreferrer")) return e;
			let i = `${r.value ?? ""} noopener`.trim();
			return `<a${t.slice(0, r.start)}rel="${i}"${t.slice(r.start + r.raw.length)}>`;
		}
		return `<a${t} rel="noopener">`;
	});
}
//#endregion
//#region ../quality/src/accessibility/rules/link-nested-anchor.ts
var R = {
	id: "a11y.link-nested-anchor",
	severity: "error"
};
function Ke(e) {
	return n(e) || s(e) ? e.content : null;
}
var qe = {
	meta: R,
	block(e) {
		let t = Ke(e);
		return t === null || !Ce(t) ? null : { blockId: e.id };
	}
}, Je = {
	meta: {
		id: "a11y.text-all-caps",
		severity: "warning"
	},
	block(e, t, r) {
		if (!n(e) && !s(e)) return null;
		let i = P(e.content ?? "").replace(/[^\p{L}]/gu, "");
		return i.length < r.thresholds.allCapsMinLength || i !== i.toLocaleUpperCase() ? null : { blockId: e.id };
	}
}, Ye = {
	id: "a11y.text-justified",
	severity: "warning"
}, Xe = /(^|;)\s*text-align\s*:\s*([^;]*)/i, z = /\sstyle\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
function Ze(e) {
	let t = [], n = new RegExp(z.source, z.flags), r;
	for (; (r = n.exec(e)) !== null;) t.push(r[1] ?? r[2] ?? "");
	return t;
}
function B(e) {
	let t = Xe.exec(e);
	return t !== null && t[2].trim().toLowerCase() === "justify";
}
function Qe(e) {
	return e.split(";").filter((e) => !/^\s*text-align\s*:/i.test(e)).map((e) => e.trim()).filter((e) => e !== "").join("; ");
}
function $e(e) {
	return e.replace(/\sstyle\s*=\s*(?:"([^"]*)"|'([^']*)')/gi, (e, t, n) => {
		let r = t ?? n ?? "";
		if (!B(r)) return e;
		let i = Qe(r);
		return i === "" ? "" : ` style="${i}"`;
	});
}
var et = {
	meta: Ye,
	block(e) {
		return !n(e) || !Ze(e.content ?? "").some(B) ? null : {
			blockId: e.id,
			fix: {
				description: "Remove justified alignment",
				apply: (t) => {
					n(e) && t.updateBlock(e.id, { content: $e(e.content ?? "") });
				}
			}
		};
	}
}, tt = {
	meta: {
		id: "a11y.text-low-contrast",
		severity: "error"
	},
	block(e, n) {
		if (!s(e)) return null;
		let r = e.color ?? n.resolvedTextColor;
		if (!h(r) || !h(n.resolvedBackgroundColor)) return null;
		let i = t[e.level] >= 24 ? 3 : 4.5, a = p(r, n.resolvedBackgroundColor);
		return Number.isNaN(a) || a >= i ? null : {
			blockId: e.id,
			params: {
				ratio: a.toFixed(2),
				required: i
			}
		};
	}
}, nt = {
	id: "a11y.text-too-small",
	severity: "warning"
};
function rt(e) {
	return o(e) || ee(e) ? e.fontSize : null;
}
//#endregion
//#region ../quality/src/accessibility/index.ts
var V = [
	pe,
	ge,
	_e,
	ve,
	Se,
	Te,
	De,
	ke,
	Me,
	Fe,
	Re,
	He,
	qe,
	Je,
	et,
	tt,
	{
		meta: nt,
		block(e, t, n) {
			let r = rt(e);
			return r === null || r >= n.thresholds.minFontSize ? null : {
				blockId: e.id,
				params: {
					size: r,
					min: n.thresholds.minFontSize
				}
			};
		}
	},
	{
		meta: {
			id: "a11y.button-vague-label",
			severity: "warning"
		},
		block(e, t, n) {
			if (!l(e)) return null;
			let r = M(e.text ?? "");
			return r === "" || !k(n.locale).vagueButtonLabels.includes(r) ? null : {
				blockId: e.id,
				params: { text: e.text }
			};
		}
	},
	{
		meta: {
			id: "a11y.button-touch-target",
			severity: "warning"
		},
		block(e, t, n) {
			if (!l(e)) return null;
			let r = e.buttonPadding;
			if (!r) return null;
			let i = e.fontSize * 1.4 + r.top + r.bottom;
			return i >= n.thresholds.minTouchTargetPx ? null : {
				blockId: e.id,
				params: {
					height: Math.round(i),
					min: n.thresholds.minTouchTargetPx
				}
			};
		}
	},
	{
		meta: {
			id: "a11y.button-low-contrast",
			severity: "error"
		},
		block(e) {
			if (!l(e)) return null;
			let t = p(e.textColor, e.backgroundColor);
			if (Number.isNaN(t)) return null;
			let n = e.fontSize >= 24 ? 3 : 4.5;
			return t >= n ? null : {
				blockId: e.id,
				params: {
					ratio: t.toFixed(2),
					required: n
				}
			};
		}
	},
	{
		meta: {
			id: "a11y.missing-preheader",
			severity: "info"
		},
		template(e) {
			return (e.settings.preheaderText?.trim() ?? "") === "" ? [{ blockId: null }] : [];
		}
	}
];
function it(e, t = {}) {
	return t.disabled === !0 || t.accessibility === !1 ? [] : x(e, V, ae(t.locale, t.accessibility ?? {}, V), (e, t, n) => fe(e, t, n));
}
//#endregion
//#region ../quality/src/structure/messages/de.ts
var at = /* @__PURE__ */ e({ default: () => ot }), ot = {
	"structure.duplicate-block-id": "Block-ID erscheint {count}-mal im Baum. Jeder Block muss eine eindeutige ID haben.",
	"structure.section-column-mismatch": "Sektion verwendet Layout „{layout}\" (erwartet {expected} Spalten), hat aber {actual}. Deutet auf beschädigten Zustand hin.",
	"structure.nested-section": "Sektion ist in einer anderen Sektion verschachtelt. Sektionen können nicht verschachtelt werden – der Renderer wird sich falsch verhalten.",
	"structure.empty-section": "Sektion enthält keine Blöcke. Entferne sie oder füge Inhalt hinzu.",
	"structure.empty-column": "Spalte {columnIndex} dieser Sektion ist leer. Füge Inhalt hinzu oder reduziere die Spaltenanzahl."
}, st = /* @__PURE__ */ e({ default: () => H }), H = {
	"structure.duplicate-block-id": "Block id appears {count} times in the tree. Each block must have a unique id.",
	"structure.section-column-mismatch": "Section uses layout \"{layout}\" (expects {expected} columns) but has {actual}. Indicates corrupted state.",
	"structure.nested-section": "Section is nested inside another section. Sections cannot nest — the renderer will misbehave.",
	"structure.empty-section": "Section has no blocks. Remove it or add content.",
	"structure.empty-column": "Column {columnIndex} of this section is empty. Add content or reduce the column count."
}, U = /* #__PURE__ */ Object.assign({
	"./de.ts": at,
	"./en.ts": st
}), W = {};
for (let e in U) {
	let t = /\.\/([^/]+)\.ts$/.exec(e);
	if (!t) continue;
	let n = t[1];
	n !== "index" && (W[n] = U[e].default);
}
function ct(e) {
	return W[e.split("-")[0]?.toLowerCase() ?? "en"] ?? W.en ?? H;
}
function lt(e, t, n) {
	let r = ct(e)[t] ?? H[t];
	return n ? r.replace(/\{(\w+)\}/g, (e, t) => {
		let r = n[t];
		return r === void 0 ? `{${t}}` : String(r);
	}) : r;
}
//#endregion
//#region ../quality/src/structure/rules/duplicate-block-id.ts
var ut = {
	id: "structure.duplicate-block-id",
	severity: "error"
};
function G(e, t) {
	for (let n of e) if (t.set(n.id, (t.get(n.id) ?? 0) + 1), i(n)) for (let e of n.children) G(e, t);
}
var dt = {
	meta: ut,
	template(e) {
		let t = /* @__PURE__ */ new Map();
		G(e.blocks, t);
		let n = [];
		for (let [e, r] of t) r > 1 && n.push({
			blockId: e,
			params: { count: r }
		});
		return n;
	}
}, ft = {
	id: "structure.empty-column",
	severity: "warning"
};
function K(e, t) {
	for (let n of e) {
		if (!i(n)) continue;
		let e = n;
		e.children.length > 1 && e.children.forEach((n, r) => {
			n.length === 0 && t.push({
				blockId: e.id,
				params: { columnIndex: r + 1 }
			});
		});
		for (let n of e.children) K(n, t);
	}
}
var pt = {
	meta: ft,
	template(e) {
		let t = [];
		return K(e.blocks, t), t;
	}
}, mt = {
	id: "structure.empty-section",
	severity: "warning"
};
function ht(e) {
	return e.children.length === 0 || e.children.every((e) => e.length === 0);
}
var gt = {
	meta: mt,
	block(e) {
		if (!i(e)) return null;
		let t = e;
		return ht(t) ? {
			blockId: t.id,
			fix: {
				description: "Remove the empty section",
				apply: (e) => {
					e.removeBlock(t.id);
				}
			}
		} : null;
	}
}, _t = {
	meta: {
		id: "structure.nested-section",
		severity: "error"
	},
	block(e, t) {
		return !i(e) || t.section === null ? null : {
			blockId: e.id,
			params: { parentId: t.section.id }
		};
	}
}, vt = {
	id: "structure.section-column-mismatch",
	severity: "error"
};
function yt(e) {
	return e === "1" ? 1 : e === "3" ? 3 : 2;
}
//#endregion
//#region ../quality/src/structure/index.ts
var q = [
	dt,
	gt,
	pt,
	_t,
	{
		meta: vt,
		block(e) {
			if (!i(e)) return null;
			let t = e, n = yt(t.columns), r = t.children.length;
			return r === n ? null : {
				blockId: t.id,
				params: {
					layout: t.columns,
					expected: n,
					actual: r
				}
			};
		}
	}
];
function bt(e, t = {}) {
	return t.disabled === !0 || t.structure === !1 ? [] : x(e, q, oe(t.locale, t.structure ?? {}, q), (e, t, n) => lt(e, t, n));
}
//#endregion
//#region ../quality/src/links/messages/de.ts
var xt = /* @__PURE__ */ e({ default: () => St }), St = {
	"link.javascript-protocol": "Die URL verwendet das Protokoll „{protocol}:\", das beliebigen Skriptcode ausführen kann und aus Sicherheitsgründen beim Rendern entfernt wird. Ersetze sie durch eine echte URL oder entferne sie.",
	"link.unsupported-protocol": "Die URL verwendet das Protokoll „{protocol}\", das von den meisten E-Mail-Clients nicht unterstützt wird. Verwende http, https, mailto, tel oder sms.",
	"link.malformed-mailto": "Der mailto:-Link ist fehlerhaft. Erwartet wird eine einzelne Empfängeradresse vor einer eventuellen Querystring (z. B. mailto:hallo@example.com).",
	"link.malformed-tel": "Der tel:-Link enthält Zeichen, die keine Ziffern, +, Leerzeichen, Bindestriche, Klammern oder Punkte sind.",
	"link.localhost-or-staging": "Der URL-Host „{host}\" entspricht einem Nicht-Produktionsmuster. Ersetze ihn vor dem Versand durch die Produktions-URL."
}, Ct = /* @__PURE__ */ e({ default: () => J }), J = {
	"link.javascript-protocol": "URL uses the \"{protocol}:\" protocol, which can execute arbitrary script and is stripped at render time for safety. Replace it with a real link or remove the URL.",
	"link.unsupported-protocol": "URL uses the \"{protocol}\" protocol, which most email clients do not support. Use http, https, mailto, tel, or sms.",
	"link.malformed-mailto": "mailto: link is malformed. Expected a single recipient address before any query string (e.g. mailto:hello@example.com).",
	"link.malformed-tel": "tel: link contains characters that are not digits, +, spaces, dashes, parentheses, or dots.",
	"link.localhost-or-staging": "URL host \"{host}\" matches a non-production pattern. Replace with the production URL before sending."
}, Y = /* #__PURE__ */ Object.assign({
	"./de.ts": xt,
	"./en.ts": Ct
}), X = {};
for (let e in Y) {
	let t = /\.\/([^/]+)\.ts$/.exec(e);
	if (!t) continue;
	let n = t[1];
	n !== "index" && (X[n] = Y[e].default);
}
function wt(e) {
	return X[e.split("-")[0]?.toLowerCase() ?? "en"] ?? X.en ?? J;
}
function Tt(e, t, n) {
	let r = wt(e)[t] ?? J[t];
	return n ? r.replace(/\{(\w+)\}/g, (e, t) => {
		let r = n[t];
		return r === void 0 ? `{${t}}` : String(r);
	}) : r;
}
//#endregion
//#region ../quality/src/url-walker.ts
function Z(e) {
	let t = [];
	return b(e, (e) => {
		if (s(e) || n(e) || r(e)) {
			for (let n of N(e.content)) t.push({
				url: n.href,
				blockId: e.id,
				source: "anchor",
				label: n.text
			});
			return;
		}
		if (l(e)) {
			t.push({
				url: e.url,
				blockId: e.id,
				source: "button",
				label: e.text
			});
			return;
		}
		if (a(e)) {
			e.linkUrl && e.linkUrl !== "" && t.push({
				url: e.linkUrl,
				blockId: e.id,
				source: "image-link",
				label: e.alt || void 0
			});
			return;
		}
		if (te(e)) {
			t.push({
				url: e.url,
				blockId: e.id,
				source: "video",
				label: e.alt || void 0
			});
			return;
		}
		if (o(e)) {
			for (let n of e.items) t.push({
				url: n.url,
				blockId: e.id,
				source: "menu-item",
				label: n.text
			});
			return;
		}
		if (c(e)) {
			for (let n of e.icons) t.push({
				url: n.url,
				blockId: e.id,
				source: "social-icon",
				label: n.platform
			});
			return;
		}
	}), t;
}
//#endregion
//#region ../quality/src/links/rules/javascript-protocol.ts
var Et = {
	id: "link.javascript-protocol",
	severity: "error"
}, Q = [
	"javascript",
	"data",
	"vbscript"
];
function Dt(e) {
	if (!e) return null;
	let t = e.replace(/\s+/g, "");
	for (let e of Q) if (RegExp(`^${e}:`, "i").test(t)) return e;
	return null;
}
var Ot = {
	meta: Et,
	template(e) {
		let t = [];
		for (let n of Z(e)) {
			let e = Dt(n.url);
			e !== null && t.push({
				blockId: n.blockId,
				params: { protocol: e }
			});
		}
		return t;
	}
}, kt = {
	id: "link.unsupported-protocol",
	severity: "warning"
}, At = /* @__PURE__ */ new Set([
	"http",
	"https",
	"mailto",
	"tel",
	"sms"
]), jt = new Set(Q);
function Mt(e) {
	if (!e) return null;
	let t = e.trim(), n = /^([a-z][a-z0-9+\-.]*):/i.exec(t);
	return n ? n[1].toLowerCase() : null;
}
var Nt = {
	meta: kt,
	template(e) {
		let t = [];
		for (let n of Z(e)) {
			let e = Mt(n.url);
			e !== null && (jt.has(e) || At.has(e) || t.push({
				blockId: n.blockId,
				params: { protocol: e }
			}));
		}
		return t;
	}
}, Pt = {
	id: "link.malformed-mailto",
	severity: "warning"
};
function Ft(e) {
	let t = e.trim();
	if (!/^mailto:/i.test(t)) return !1;
	let [n] = t.slice(7).split("?", 2);
	if (n.trim() === "") return !0;
	let r = n.split(",").map((e) => e.trim());
	for (let e of r) {
		if (e === "") return !0;
		let t = e.split("@");
		if (t.length !== 2) return !0;
		let [n, r] = t;
		if (n === "" || r === "" || !r.includes(".")) return !0;
	}
	return !1;
}
var It = {
	meta: Pt,
	template(e) {
		let t = [];
		for (let n of Z(e)) Ft(n.url) && t.push({ blockId: n.blockId });
		return t;
	}
}, Lt = {
	id: "link.malformed-tel",
	severity: "warning"
}, Rt = /^[+0-9\s().\-]+$/, zt = /^[A-Za-z0-9-]+(=[^;]+)?$/;
function Bt(e) {
	let t = e.trim();
	if (!/^tel:/i.test(t)) return !1;
	let n = t.slice(4).trim();
	if (n === "") return !0;
	let [r, ...i] = n.split(";");
	return !Rt.test(r) || i.some((e) => !zt.test(e));
}
var Vt = {
	meta: Lt,
	template(e) {
		let t = [];
		for (let n of Z(e)) Bt(n.url) && t.push({ blockId: n.blockId });
		return t;
	}
}, Ht = {
	id: "link.localhost-or-staging",
	severity: "warning"
};
function Ut(e) {
	let t = e.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return RegExp(`^${t}$`, "i");
}
function Wt(e) {
	if (!e) return null;
	let t = e.trim();
	if (!/^(https?|ftps?):\/\//i.test(t)) return null;
	try {
		return new URL(t).hostname.toLowerCase();
	} catch {
		return null;
	}
}
//#endregion
//#region ../quality/src/links/index.ts
var $ = [
	Ot,
	Nt,
	It,
	Vt,
	{
		meta: Ht,
		template(e, t) {
			let n = t.links.nonProductionHosts;
			if (n.length === 0) return [];
			let r = n.map(Ut), i = [];
			for (let t of Z(e)) {
				let e = Wt(t.url);
				e !== null && r.some((t) => t.test(e)) && i.push({
					blockId: t.blockId,
					params: { host: e }
				});
			}
			return i;
		}
	}
];
function Gt(e, t = {}) {
	return t.disabled === !0 || t.links === !1 ? [] : x(e, $, se(t.locale, t.links ?? {}, $), (e, t, n) => Tt(e, t, n));
}
//#endregion
//#region ../quality/src/util.ts
function Kt(e) {
	return e ? e.disabled === !0 || e.accessibility === !1 && e.structure === !1 && e.links === !1 : !1;
}
//#endregion
//#region ../quality/src/lint-template.ts
function qt(e, t = {}) {
	return Kt(t) ? [] : [
		...it(e, t),
		...bt(e, t),
		...Gt(e, t)
	];
}
//#endregion
export { qt as lintTemplate };

//# sourceMappingURL=src-D_3bXt7-.js.map