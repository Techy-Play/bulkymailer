import { c as e, ft as t, i as n, qt as r } from "./dist-CcQFPJMF.js";
//#region ../../node_modules/.pnpm/@tiptap+extension-text-style@3.29.2_@tiptap+core@3.29.2_@tiptap+pm@3.29.2_/node_modules/@tiptap/extension-text-style/dist/index.js
var i = 20, a = (e, t = 0) => {
	let n = [];
	return !e.children.length || t > i || Array.from(e.children).forEach((e) => {
		e.tagName === "SPAN" ? n.push(e) : e.children.length && n.push(...a(e, t + 1));
	}), n;
}, o = (e) => {
	if (!e.children.length) return;
	let t = a(e);
	t && t.forEach((e) => {
		let t = e.getAttribute("style"), n = (e.parentElement?.closest("span"))?.getAttribute("style");
		e.setAttribute("style", `${n};${t}`);
	});
}, s = e.create({
	name: "textStyle",
	priority: 101,
	addOptions() {
		return {
			HTMLAttributes: {},
			mergeNestedSpanStyles: !0
		};
	},
	parseHTML() {
		return [{
			tag: "span",
			consuming: !1,
			getAttrs: (e) => e.hasAttribute("style") ? (this.options.mergeNestedSpanStyles && o(e), {}) : !1
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"span",
			r(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			toggleTextStyle: (e) => ({ commands: t }) => t.toggleMark(this.name, e),
			removeEmptyTextStyle: () => ({ tr: e }) => {
				let { selection: t } = e;
				return e.doc.nodesBetween(t.from, t.to, (t, n) => {
					if (t.isTextblock) return !0;
					t.marks.filter((e) => e.type === this.type).some((e) => Object.values(e.attrs).some((e) => !!e)) || e.removeMark(n, n + t.nodeSize, this.type);
				}), !0;
			}
		};
	}
}), c = n.create({
	name: "backgroundColor",
	addOptions() {
		return { types: ["textStyle"] };
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { backgroundColor: {
				default: null,
				parseHTML: (e) => (t(e, "background-color") ?? e.style.backgroundColor)?.replace(/['"]+/g, ""),
				renderHTML: (e) => e.backgroundColor ? { style: `background-color: ${e.backgroundColor}` } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setBackgroundColor: (e) => ({ chain: t }) => t().setMark("textStyle", { backgroundColor: e }).run(),
			unsetBackgroundColor: () => ({ chain: e }) => e().setMark("textStyle", { backgroundColor: null }).removeEmptyTextStyle().run()
		};
	}
}), l = n.create({
	name: "color",
	addOptions() {
		return { types: ["textStyle"] };
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { color: {
				default: null,
				parseHTML: (e) => (t(e, "color") ?? e.style.color)?.replace(/['"]+/g, ""),
				renderHTML: (e) => e.color ? { style: `color: ${e.color}` } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setColor: (e) => ({ chain: t }) => t().setMark("textStyle", { color: e }).run(),
			unsetColor: () => ({ chain: e }) => e().setMark("textStyle", { color: null }).removeEmptyTextStyle().run()
		};
	}
}), u = n.create({
	name: "fontFamily",
	addOptions() {
		return { types: ["textStyle"] };
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { fontFamily: {
				default: null,
				parseHTML: (e) => t(e, "font-family") ?? e.style.fontFamily,
				renderHTML: (e) => e.fontFamily ? { style: `font-family: ${e.fontFamily}` } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setFontFamily: (e) => ({ chain: t }) => t().setMark("textStyle", { fontFamily: e }).run(),
			unsetFontFamily: () => ({ chain: e }) => e().setMark("textStyle", { fontFamily: null }).removeEmptyTextStyle().run()
		};
	}
}), d = n.create({
	name: "fontSize",
	addOptions() {
		return { types: ["textStyle"] };
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { fontSize: {
				default: null,
				parseHTML: (e) => t(e, "font-size") ?? e.style.fontSize,
				renderHTML: (e) => e.fontSize ? { style: `font-size: ${e.fontSize}` } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setFontSize: (e) => ({ chain: t }) => t().setMark("textStyle", { fontSize: e }).run(),
			unsetFontSize: () => ({ chain: e }) => e().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run()
		};
	}
}), f = n.create({
	name: "lineHeight",
	addOptions() {
		return { types: ["textStyle"] };
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { lineHeight: {
				default: null,
				parseHTML: (e) => t(e, "line-height") ?? e.style.lineHeight,
				renderHTML: (e) => e.lineHeight ? { style: `line-height: ${e.lineHeight}` } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setLineHeight: (e) => ({ chain: t }) => t().setMark("textStyle", { lineHeight: e }).run(),
			unsetLineHeight: () => ({ chain: e }) => e().setMark("textStyle", { lineHeight: null }).removeEmptyTextStyle().run()
		};
	}
}), p = n.create({
	name: "textStyleKit",
	addExtensions() {
		let e = [];
		return this.options.backgroundColor !== !1 && e.push(c.configure(this.options.backgroundColor)), this.options.color !== !1 && e.push(l.configure(this.options.color)), this.options.fontFamily !== !1 && e.push(u.configure(this.options.fontFamily)), this.options.fontSize !== !1 && e.push(d.configure(this.options.fontSize)), this.options.lineHeight !== !1 && e.push(f.configure(this.options.lineHeight)), this.options.textStyle !== !1 && e.push(s.configure(this.options.textStyle)), e;
	}
});
//#endregion
export { c as BackgroundColor, l as Color, u as FontFamily, d as FontSize, f as LineHeight, s as TextStyle, p as TextStyleKit };
