import { c as e, qt as t } from "./dist-CcQFPJMF.js";
//#region ../../node_modules/.pnpm/@tiptap+extension-subscript@3.29.2_@tiptap+core@3.29.2_@tiptap+pm@3.29.2__@tiptap+pm@3.29.2/node_modules/@tiptap/extension-subscript/dist/index.js
var n = e.create({
	name: "subscript",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [{ tag: "sub" }, {
			style: "vertical-align",
			getAttrs(e) {
				return e === "sub" && null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"sub",
			t(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setSubscript: () => ({ commands: e }) => e.setMark(this.name),
			toggleSubscript: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetSubscript: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-,": () => this.editor.commands.toggleSubscript() };
	}
}), r = n;
//#endregion
export { n as Subscript, r as default };
