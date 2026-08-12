import { $ as e, B as t, G as n, H as r, J as i, K as a, U as o, V as s, W as c, X as l, Y as u, Z as d, q as f, z as p } from "./src-CZjSXPYq.js";
//#endregion
//#region ../renderer/src/render-context.ts
var m = `https://cdn.jsdelivr.net/npm/@templatical/renderer@${{
	name: "@templatical/renderer",
	description: "Render Templatical email templates to MJML",
	version: "0.25.1",
	bugs: "https://github.com/templatical/sdk/issues",
	dependencies: { "@templatical/types": "workspace:*" },
	devDependencies: {
		"@resvg/resvg-js": "^2.6.2",
		mjml: "^5.4.0",
		typescript: "^6.0.3",
		vitest: "^4.1.10"
	},
	exports: { ".": {
		types: "./dist/index.d.ts",
		import: "./dist/index.js"
	} },
	files: ["dist", "assets"],
	homepage: "https://templatical.com",
	keywords: [
		"email",
		"email-template",
		"html-email",
		"mjml",
		"renderer",
		"templatical"
	],
	license: "MIT",
	module: "./dist/index.js",
	publishConfig: { access: "public" },
	repository: {
		type: "git",
		url: "git+https://github.com/templatical/sdk.git",
		directory: "packages/renderer"
	},
	scripts: {
		build: "tsdown && node scripts/rasterize-social.mjs",
		test: "vitest run --config vitest.config.ts",
		typecheck: "tsc --noEmit"
	},
	type: "module",
	types: "./dist/index.d.ts"
}.version}/assets/social`, h = {
	arial: "Arial, sans-serif",
	helvetica: "Helvetica, sans-serif",
	georgia: "Georgia, serif",
	"times new roman": "'Times New Roman', serif",
	verdana: "Verdana, sans-serif",
	"trebuchet ms": "'Trebuchet MS', sans-serif",
	"courier new": "'Courier New', monospace",
	tahoma: "Tahoma, sans-serif"
}, g = class e {
	containerWidth;
	customFonts;
	defaultFallbackFont;
	allowHtmlBlocks;
	customBlockHtml;
	socialIconsBaseUrl;
	constructor(e, t, n, r, i = /* @__PURE__ */ new Map(), a = m) {
		this.containerWidth = e, this.customFonts = t, this.defaultFallbackFont = n, this.allowHtmlBlocks = r, this.customBlockHtml = i, this.socialIconsBaseUrl = a;
	}
	withContainerWidth(t) {
		return new e(t, this.customFonts, this.defaultFallbackFont, this.allowHtmlBlocks, this.customBlockHtml, this.socialIconsBaseUrl);
	}
	resolveFontFamily(e) {
		for (let t of this.customFonts) if (t.name.toLowerCase() === e.toLowerCase()) {
			let e = t.fallback ?? this.defaultFallbackFont;
			return `'${t.name}', ${e}`;
		}
		return h[e.toLowerCase()] || e;
	}
}, _ = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#039;"
}, v = /[&<>"']/g;
function y(e) {
	return e === "" ? "" : e.replace(v, (e) => _[e] ?? e);
}
function b(e) {
	return e === "" ? "" : e.replace(v, (e) => _[e] ?? e);
}
function x(e) {
	return e === "" ? "" : b(e).replace(/[;{}\r\n]/g, "");
}
function S(e) {
	return e === "" ? "" : C(e, (e) => w(e, "data-merge-tag") ?? w(e, "data-logic-merge-tag"));
}
function C(e, t) {
	let n = "", r = 0;
	for (; r < e.length;) {
		let i = e.indexOf("<span", r);
		if (i === -1) {
			n += e.substring(r);
			break;
		}
		let a = e[i + 5];
		if (a !== ">" && a !== " " && a !== "	" && a !== "\n" && a !== "\r" && a !== "/") {
			n += e.substring(r, i + 5), r = i + 5;
			continue;
		}
		let o = e.indexOf(">", i + 5);
		if (o === -1) {
			n += e.substring(r);
			break;
		}
		let s = e.indexOf("</span>", o + 1);
		if (s === -1) {
			n += e.substring(r);
			break;
		}
		let c = t(e.substring(i + 5, o));
		if (c === null) {
			n += e.substring(r, i + 5), r = i + 5;
			continue;
		}
		n += e.substring(r, i), n += c, r = s + 7;
	}
	return n;
}
function w(e, t) {
	let n = RegExp(`(?:^|\\s)${t}="([^"<>]*)"`).exec(e);
	return n ? n[1] : null;
}
//#endregion
//#region ../renderer/src/padding.ts
function T(e) {
	return `${e.top}px ${e.right}px ${e.bottom}px ${e.left}px`;
}
//#endregion
//#region ../renderer/src/utils.ts
function E(e, t) {
	return e ? ` ${t === "native" ? "background-color" : "container-background-color"}="${e}"` : "";
}
//#endregion
//#region ../renderer/src/visibility.ts
function D(e) {
	let t = e.visibility;
	return t ? !t.desktop && !t.mobile : !1;
}
function O(e) {
	let t = k(e);
	return t === "" ? "" : ` css-class="${t}"`;
}
function k(e) {
	let t = e.visibility;
	if (!t) return "";
	let n = [];
	return t.desktop || n.push("tpl-hide-desktop"), t.mobile || n.push("tpl-hide-mobile"), n.join(" ");
}
//#endregion
//#region ../renderer/src/renderers/title.ts
function A(t, n) {
	if (D(t)) return "";
	let r = T(t.styles.padding), i = E(t.styles.backgroundColor, "container"), a = j(S(t.content)), o = e[t.level] ?? e[2], s = t.color ? `\n  color="${b(t.color)}"` : "", c = t.textAlign, l = ee(t.fontFamily, n), u = O(t), d = `h${e[t.level] ? t.level : 2}`;
	return `<mj-text
  font-size="${o}px"${s}
  align="${c}"
  line-height="1.3"
  padding="${r}"${i}${l}${u}
><${d} style="margin:0;font-size:inherit;color:inherit;line-height:inherit">${a}</${d}></mj-text>`;
}
function j(e) {
	let t = e.match(/^\s*<p\b[^>]*>([\s\S]*)<\/p>\s*$/);
	return !t || /<\/p>\s*<p\b/i.test(t[1]) ? e : t[1];
}
function ee(e, t) {
	return e ? ` font-family="${t.resolveFontFamily(e)}"` : "";
}
//#endregion
//#region ../renderer/src/renderers/paragraph.ts
function te(e, t) {
	if (D(e) || e.content.replace(/<\/?p\b[^<>]*>/gi, "").trim() === "") return "";
	let n = T(e.styles.padding), r = E(e.styles.backgroundColor, "container"), i = S(e.content);
	return `<mj-text
  line-height="1.5"
  padding="${n}"${r}${O(e)}
>${i}</mj-text>`;
}
//#endregion
//#region ../renderer/src/renderers/image.ts
function ne(e, t) {
	if (D(e) || e.src === "") return "";
	let n = T(e.styles.padding), r = E(e.styles.backgroundColor, "container"), i = e.width === "full" ? t.containerWidth + "px" : e.width + "px", a = O(e), o = "";
	e.linkUrl && (o = ` href="${b(e.linkUrl)}"`, e.linkOpenInNewTab && (o += " target=\"_blank\" rel=\"noopener\""));
	let s = b(e.src), c = e.decorative === !0;
	return `<mj-image
  src="${s}"
  alt="${c ? "" : b(e.alt)}"
  width="${i}"
  align="${e.align}"
  padding="${n}"${r}${o}${a}${c ? " role=\"presentation\"" : ""}
/>`;
}
//#endregion
//#region ../renderer/src/renderers/button.ts
function M(e, t) {
	if (D(e)) return "";
	let n = T(e.styles.padding), r = E(e.styles.backgroundColor, "container"), i = T(e.buttonPadding), a = e.url === "" ? "" : b(e.url), o = a === "" ? "" : ` href="${a}"`, s = b(e.backgroundColor), c = b(e.textColor), l = e.fontSize, u = e.borderRadius, d = y(e.text);
	return `<mj-button${o}${e.openInNewTab ? " target=\"_blank\" rel=\"noopener\"" : ""}
  background-color="${s}"
  color="${c}"
  font-size="${l}px"
  font-weight="bold"
  border-radius="${u}px"
  inner-padding="${i}"
  padding="${n}"${r}${N(e.fontFamily, t)}${P(e.width)}${O(e)}
>${d}</mj-button>`;
}
function N(e, t) {
	return e ? ` font-family="${t.resolveFontFamily(e)}"` : "";
}
function P(e) {
	return e === void 0 ? "" : ` width="${e === "full" ? "100%" : `${e}px`}"`;
}
//#endregion
//#region ../renderer/src/renderers/divider.ts
function F(e, t) {
	if (D(e)) return "";
	let n = T(e.styles.padding), r = e.styles.backgroundColor ? ` container-background-color="${b(e.styles.backgroundColor)}"` : "", i = e.width === "full" ? "100%" : e.width + "px";
	return `<mj-divider
  border-width="${e.thickness}px"
  border-style="${e.lineStyle}"
  border-color="${b(e.color)}"
  width="${i}"
  padding="${n}"${r}${O(e)}
/>`;
}
//#endregion
//#region ../renderer/src/renderers/spacer.ts
function I(e, t) {
	return D(e) ? "" : `<mj-spacer height="${e.height}px" padding="0"${e.styles.backgroundColor ? ` container-background-color="${b(e.styles.backgroundColor)}"` : ""}${O(e)} />`;
}
//#endregion
//#region ../renderer/src/renderers/html.ts
function L(e, t) {
	if (D(e) || !t.allowHtmlBlocks) return "";
	let n = e.content;
	if (n === "") return "";
	let r = O(e);
	return `<mj-text padding="${T(e.styles.padding)}"${E(e.styles.backgroundColor, "container")}${r}>
${n}
</mj-text>`;
}
//#endregion
//#region ../renderer/src/renderers/social.ts
function R(e, t) {
	if (D(e)) return "";
	let n = e.icons;
	if (n.length === 0) return "";
	let r = T(e.styles.padding), i = e.styles.backgroundColor ? ` container-background-color="${b(e.styles.backgroundColor)}"` : "", a = O(e), o = e.align, s = e.iconSize, c = e.iconStyle, l = e.spacing, u;
	switch (s) {
		case "small":
			u = 24;
			break;
		case "large":
			u = 48;
			break;
		default: u = 32;
	}
	let d;
	switch (c) {
		case "circle":
			d = "50%";
			break;
		case "rounded":
			d = "8px";
			break;
		case "square":
			d = "0";
			break;
		default: d = "4px";
	}
	let f = n.length;
	return `<mj-social
  mode="horizontal"
  align="${o}"
  icon-padding="0"
  padding="${r}"${i}${a}
>
${n.map((e, n) => {
		let r = e.platform, i = b(e.url), a = `${t.socialIconsBaseUrl}/${c}/${r}.png`, o = n === f - 1 ? 0 : l;
		return `<mj-social-element src="${a}" href="${i}" icon-size="${u}px" padding="0 ${o}px 0 0" border-radius="${d}" background-color="transparent"></mj-social-element>`;
	}).join("\n")}
</mj-social>`;
}
//#endregion
//#region ../renderer/src/renderers/menu.ts
function z(e, t) {
	if (D(e) || e.items.length === 0) return "";
	let n = T(e.styles.padding), r = E(e.styles.backgroundColor, "container"), i = O(e), a = H(e.fontFamily, t), o = e.textAlign;
	return `<mj-text
  font-size="${e.fontSize}px"${e.color ? `\n  color="${b(e.color)}"` : ""}
  align="${o}"
  line-height="1.5"
  padding="${n}"${r}${a}${i}
>${B(e)}</mj-text>`;
}
function B(e) {
	let t = e.items, n = y(e.separator), r = x(e.separatorColor), i = e.spacing, a = e.linkColor ?? e.color, o = [], s = t.length;
	for (let e = 0; e < s; e++) o.push(V(t[e], a)), e < s - 1 && o.push(`<span style="color: ${r}; padding: 0 ${i}px;">${n}</span>`);
	return o.join("");
}
function V(e, t) {
	let n = y(e.text), r = b(e.url), i = e.color ?? t, a = e.openInNewTab ? " target=\"_blank\" rel=\"noopener\"" : "", o = ["text-decoration: none"];
	return i && o.unshift(`color: ${x(i)}`), e.bold && o.push("font-weight: bold"), e.underline && o.push("text-decoration: underline"), `<a href="${r}" style="${o.join("; ")}"${a}>${n}</a>`;
}
function H(e, t) {
	return e ? ` font-family="${t.resolveFontFamily(e)}"` : "";
}
//#endregion
//#region ../renderer/src/renderers/table.ts
function U(e, t) {
	if (D(e) || e.rows.length === 0) return "";
	let n = T(e.styles.padding), r = E(e.styles.backgroundColor, "container"), i = O(e), a = q(e.fontFamily, t);
	return `<mj-text
  font-size="${e.fontSize}px"${e.color ? `\n  color="${b(e.color)}"` : ""}
  align="${e.textAlign}"
  line-height="1.5"
  padding="${n}"${r}${a}${i}
>${W(e)}</mj-text>`;
}
function W(e) {
	let t = x(e.borderColor), n = e.borderWidth, r = "";
	for (let i = 0; i < e.rows.length; i++) {
		let a = e.rows[i];
		r += G(a, e, e.hasHeaderRow && i === 0, t, n);
	}
	return `<table style="width: 100%; border-collapse: collapse;">${r}</table>`;
}
function G(e, t, n, r, i) {
	let a = "";
	for (let o of e.cells) a += K(o, t, n, r, i);
	return `<tr>${a}</tr>`;
}
function K(e, t, n, r, i) {
	let a = t.cellPadding, o = [`border: ${i}px solid ${r}`, `padding: ${a}px`];
	n && (o.push("font-weight: bold"), t.headerBackgroundColor && o.push(`background-color: ${x(t.headerBackgroundColor)}`));
	let s = o.join("; "), c = y(S(e.content)), l = n ? "th" : "td";
	return `<${l} style="${s}">${c}</${l}>`;
}
function q(e, t) {
	return e ? ` font-family="${t.resolveFontFamily(e)}"` : "";
}
//#endregion
//#region ../renderer/src/renderers/custom.ts
function re(e, t) {
	if (D(e)) return "";
	let n = t.customBlockHtml.get(e.id) ?? e.renderedHtml;
	if (!n || n === "") return "";
	let r = O(e);
	return `<mj-text padding="${T(e.styles.padding)}"${E(e.styles.backgroundColor, "container")}${r}>
${n}
</mj-text>`;
}
//#endregion
//#region ../renderer/src/columns.ts
function J(e) {
	switch (e) {
		case "2": return ["50%", "50%"];
		case "3": return [
			"33.33%",
			"33.33%",
			"33.34%"
		];
		case "1-2": return ["33.33%", "66.67%"];
		case "2-1": return ["66.67%", "33.33%"];
		default: return ["100%"];
	}
}
function Y(e, t) {
	switch (e) {
		case "2": return [t * .5, t * .5];
		case "3": return [
			t / 3,
			t / 3,
			t / 3
		];
		case "1-2": return [t / 3, t * 2 / 3];
		case "2-1": return [t * 2 / 3, t / 3];
		default: return [t];
	}
}
//#endregion
//#region ../renderer/src/display-condition.ts
function X(e, t) {
	if (t === "") return "";
	let n = e.displayCondition;
	return n ? `<mj-raw>${n.before}</mj-raw>
` + t + `
<mj-raw>${n.after}</mj-raw>` : t;
}
//#endregion
//#region ../renderer/src/renderers/section.ts
function ie(e, t, n) {
	if (D(e)) return "";
	let r = e.columns, i = J(r), o = Y(r, t.containerWidth), s = T(e.styles.padding), c = E(e.styles.backgroundColor, "native"), l = O(e), u = e.borderRadius && e.borderRadius > 0 ? ` border-radius="${e.borderRadius}px"` : "", d = e.children, f = [];
	for (let e = 0; e < d.length; e++) {
		let r = d[e], s = i[e] ?? "100%", c = Math.floor(o[e] ?? t.containerWidth), l = ae(r, t.allowHtmlBlocks).filter((e) => !a(e)), u = t.withContainerWidth(c), p = l.map((e) => X(e, n(e, u))).filter((e) => e !== "").join("\n");
		f.push(`<mj-column width="${s}">
${p === "" ? "<mj-text>&nbsp;</mj-text>" : p}
</mj-column>`);
	}
	let p = f.join("\n");
	return `<mj-section${c} padding="${s}"${u}${l}>
${e.stackOnMobile === !1 && f.length > 1 ? `<mj-group>
${p}
</mj-group>` : p}
</mj-section>`;
}
function ae(e, t) {
	return t ? e : e.filter((e) => e.type !== "html");
}
//#endregion
//#region ../renderer/src/renderers/video.ts
function oe(e, t) {
	if (t) return t;
	if (!e) return null;
	for (let t of [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/, /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/]) {
		let n = e.match(t);
		if (n) return `https://img.youtube.com/vi/${n[1]}/maxresdefault.jpg`;
	}
	let n = e.match(/vimeo\.com\/(?:video\/)?(\d+)/);
	return n ? `https://vumbnail.com/${n[1]}.jpg` : null;
}
function se(e, t) {
	if (D(e)) return "";
	let n = oe(e.url, e.thumbnailUrl);
	if (!n) return "";
	let r = T(e.styles.padding), i = E(e.styles.backgroundColor, "container"), a = e.width === "full" ? t.containerWidth + "px" : e.width + "px", o = O(e);
	return `<mj-image
  src="${b(n)}"
  alt="${b(e.alt)}"
  width="${a}"
  align="${e.align}"
  padding="${r}"
  href="${b(e.url)}"
  target="_blank"
  rel="noopener"${i}${o}
/>`;
}
//#endregion
//#region ../renderer/src/renderers/index.ts
function Z(e, m) {
	return a(e) ? ie(e, m, Z) : l(e) ? A(e, m) : n(e) ? te(e, m) : o(e) ? ne(e, m) : p(e) ? M(e, m) : s(e) ? F(e, m) : i(e) ? I(e, m) : r(e) ? L(e, m) : f(e) ? R(e, m) : c(e) ? z(e, m) : u(e) ? U(e, m) : d(e) ? se(e, m) : t(e) ? re(e, m) : "";
}
//#endregion
//#region ../renderer/src/index.ts
async function ce(e, t) {
	let n = t?.customFonts ?? [], r = t?.defaultFallbackFont ?? "Arial, sans-serif", i = t?.allowHtmlBlocks ?? !0, a = fe(t?.socialIconsBaseUrl ?? m), o = await he(e, t?.renderCustomBlock), s = ge(e, t?.getCustomBlockStylesheet), c = new g(e.settings.width, n, r, i, o, a), l = Q(e.blocks, i), u = c.resolveFontFamily(e.settings.fontFamily), d = e.settings.backgroundColor, f = e.settings.textColor ? ` color="${b(e.settings.textColor)}"` : "", p = e.settings.linkColor ? x(e.settings.linkColor) : "inherit", h = e.settings.linkUnderline ? "underline" : "none", _ = l.map((e) => le(e, c)).filter((e) => e !== "").join("\n"), v = me(n), y = pe(e.settings.preheaderText);
	return `<mjml lang="${b(e.settings.locale)}">
  <mj-head>${y}
    <mj-attributes>
      <mj-all font-family="${u}" />
      <mj-text font-size="14px"${f} />
      <mj-section padding="0" />
      <mj-column padding="0" />
      <mj-image fluid-on-mobile="true" />
    </mj-attributes>${v}
    <mj-style>
      a { color: ${p}; text-decoration: ${h}; }
      @media only screen and (max-width: 480px) {
        .tpl-hide-mobile { display: none !important; mso-hide: all !important; }
      }
      @media only screen and (min-width: 481px) {
        .tpl-hide-desktop { display: none !important; mso-hide: all !important; }
      }
    </mj-style>${_e(s)}
  </mj-head>
  <mj-body width="${c.containerWidth}px" background-color="${d}">
${_}
  </mj-body>
</mjml>`;
}
function le(e, t) {
	if (a(e)) {
		let n = Z(e, t);
		return X(e, e.wrapper && n !== "" ? ue(n, e.wrapper) : n);
	}
	return X(e, de(Z(e, t)));
}
function ue(e, t) {
	return `<mj-wrapper${E(t.backgroundColor, "native")}${` padding="${t.padding ? T(t.padding) : "0"}"`}${t.borderRadius && t.borderRadius > 0 ? ` border-radius="${t.borderRadius}px"` : ""}>
${e}
</mj-wrapper>`;
}
function de(e) {
	return e === "" ? "" : `<mj-section>
  <mj-column>
${e}
  </mj-column>
</mj-section>`;
}
function fe(e) {
	return e.endsWith("/") ? e.slice(0, -1) : e;
}
function pe(e) {
	if (!e) return "";
	let t = e.trim();
	return t === "" ? "" : `\n    <mj-preview>${y(t)}</mj-preview>`;
}
function me(e) {
	return e.length === 0 ? "" : e.map((e) => `\n    <mj-font name="${b(e.name)}" href="${b(e.url)}" />`).join("");
}
function Q(e, t) {
	return t ? e : e.filter((e) => e.type !== "html");
}
async function he(e, t) {
	let n = /* @__PURE__ */ new Map();
	if (!t) return n;
	let r = [];
	if ($(e.blocks, r), r.length === 0) return n;
	let i = await Promise.all(r.map((e) => t(e)));
	for (let e = 0; e < r.length; e++) n.set(r[e].id, i[e]);
	return n;
}
function $(e, n) {
	for (let r of e) {
		if (t(r)) {
			n.push(r);
			continue;
		}
		if (a(r)) for (let e of r.children) $(e, n);
	}
}
function ge(e, t) {
	if (!t) return [];
	let n = [];
	if ($(e.blocks, n), n.length === 0) return [];
	let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = [];
	for (let e of n) {
		if (r.has(e.customType)) continue;
		r.add(e.customType);
		let n = t(e.customType);
		if (!n) continue;
		let o = n.trim();
		o === "" || i.has(o) || (i.add(o), a.push(o));
	}
	return a;
}
function _e(e) {
	return e.length === 0 ? "" : e.map((e) => `\n    <mj-style>\n${e}\n    </mj-style>`).join("");
}
//#endregion
export { m as DEFAULT_SOCIAL_ICONS_BASE_URL, g as RenderContext, S as convertMergeTagsToValues, b as escapeAttr, y as escapeHtml, O as getCssClassAttr, k as getCssClasses, J as getWidthPercentages, Y as getWidthPixels, D as isHiddenOnAll, Z as renderBlock, ce as renderToMjml, T as toPaddingString };

//# sourceMappingURL=src-uc_Mb_yH.js.map