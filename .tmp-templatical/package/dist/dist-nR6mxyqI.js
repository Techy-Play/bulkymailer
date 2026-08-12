import { c as e, qt as t } from "./dist-CcQFPJMF.js";
//#region ../../node_modules/.pnpm/@tiptap+extension-superscript@3.29.2_@tiptap+core@3.29.2_@tiptap+pm@3.29.2__@tiptap+pm@3.29.2/node_modules/@tiptap/extension-superscript/dist/index.js
var n = e.create({
	name: "superscript",
	addOptions() {
		return { HTMLAttributes: {} };
	},
	parseHTML() {
		return [{ tag: "sup" }, {
			style: "vertical-align",
			getAttrs(e) {
				return e === "super" && null;
			}
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"sup",
			t(this.options.HTMLAttributes, e),
			0
		];
	},
	addCommands() {
		return {
			setSuperscript: () => ({ commands: e }) => e.setMark(this.name),
			toggleSuperscript: () => ({ commands: e }) => e.toggleMark(this.name),
			unsetSuperscript: () => ({ commands: e }) => e.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-.": () => this.editor.commands.toggleSuperscript() };
	}
}), r = n;
//#endregion
export { n as Superscript, r as default };
