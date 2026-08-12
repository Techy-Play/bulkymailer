import { Ut as e, Wt as t, c as n, ft as r, qt as i } from "./dist-CcQFPJMF.js";
//#region ../../node_modules/.pnpm/@tiptap+extension-highlight@3.29.2_@tiptap+core@3.29.2_@tiptap+pm@3.29.2_/node_modules/@tiptap/extension-highlight/dist/index.js
var a = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/, o = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g, s = n.create({
	name: "highlight",
	addOptions() {
		return {
			multicolor: !1,
			HTMLAttributes: {}
		};
	},
	addAttributes() {
		return this.options.multicolor ? { color: {
			default: null,
			parseHTML: (e) => e.getAttribute("data-color") || r(e, "background-color") || e.style.backgroundColor,
			renderHTML: (e) => e.color ? {
				"data-color": e.color,
				style: `background-color: ${e.color}; color: inherit`
			} : {}
		} } : {};
	},
	parseHTML() {
		return [{ tag: "mark" }];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"mark",
			i(this.options.HTMLAttributes, e),
			0
		];
	},
	renderMarkdown: (e, t) => `==${t.renderChildren(e)}==`,
	parseMarkdown: (e, t) => t.applyMark("highlight", t.parseInline(e.tokens || [])),
	markdownTokenizer: {
		name: "highlight",
		level: "inline",
		start: (e) => e.indexOf("=="),
		tokenize(e, t, n) {
			let r = /^(==)([^=]+)(==)/.exec(e);
			if (r) {
				let e = r[2].trim(), t = n.inlineTokens(e);
				return {
					type: "highlight",
					raw: r[0],
					text: e,
					tokens: t
				};
			}
		}
	},
	addCommands() {
		return {
			setHighlight: (e) => ({ commands: t }) => t.setMark(this.name, e),
			toggleHighlight: (e) => ({ commands: t }) => t.toggleMark(this.name, e),
			unsetHighlight: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-h": () => this.editor.commands.toggleHighlight() };
	},
	addInputRules() {
		return [e({
			find: a,
			type: this.type
		})];
	},
	addPasteRules() {
		return [t({
			find: o,
			type: this.type
		})];
	}
}), c = s;
//#endregion
export { s as Highlight, c as default, a as inputRegex, o as pasteRegex };
