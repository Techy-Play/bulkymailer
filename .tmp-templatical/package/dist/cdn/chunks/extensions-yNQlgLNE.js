import { H as e, M as t, O as n, V as r, Z as i, c as a, ct as o, f as s, g as c, h as l, it as u, l as d, m as f, o as p, ot as m, p as h, st as g, x as _ } from "./draggable-BRF_Q_jB.js";
import { a as v, d as y, o as b, r as x } from "./src-CZjSXPYq.js";
import { t as S } from "./useI18n-aRMtgYRj.js";
import { t as C } from "./useMergeTag-8a8BnIZp.js";
import { _ as w, g as T, h as E, n as D, t as O, v as k, y as A } from "./tiptap-CgwK_fKJ.js";
import { i as j, r as M, t as N } from "./MergeTagSuggestion-CvZLI6Np.js";
//#region src/extensions/FontSize.ts
var P = E.create({
	name: "fontSize",
	addOptions() {
		return { types: ["textStyle"] };
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { fontSize: {
				default: null,
				parseHTML: (e) => e.style.fontSize?.replace(/['"]+/g, "") || null,
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
}), F = E.create({
	name: "letterSpacing",
	addOptions() {
		return { types: ["textStyle"] };
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { letterSpacing: {
				default: null,
				parseHTML: (e) => e.style.letterSpacing?.replace(/['"]+/g, "") || null,
				renderHTML: (e) => e.letterSpacing ? { style: `letter-spacing: ${e.letterSpacing}` } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setLetterSpacing: (e) => ({ chain: t }) => t().setMark("textStyle", { letterSpacing: e }).run(),
			unsetLetterSpacing: () => ({ chain: e }) => e().setMark("textStyle", { letterSpacing: null }).removeEmptyTextStyle().run()
		};
	}
}), I = E.create({
	name: "lineHeight",
	addOptions() {
		return {
			types: ["paragraph"],
			defaultLineHeight: "1.5"
		};
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { lineHeight: {
				default: null,
				parseHTML: (e) => e.style.lineHeight || null,
				renderHTML: (e) => e.lineHeight ? { style: `line-height: ${e.lineHeight}` } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setLineHeight: (e) => ({ commands: t }) => this.options.types.every((n) => t.updateAttributes(n, { lineHeight: e })),
			unsetLineHeight: () => ({ commands: e }) => this.options.types.every((t) => e.resetAttributes(t, "lineHeight"))
		};
	}
}), L = [
	"aria-label",
	"data-tooltip",
	"onKeydown"
], R = ["aria-label", "onKeydown"], z = ["aria-label"], B = /* @__PURE__ */ _({
	__name: "LogicMergeTagNodeView",
	props: {
		node: {},
		editor: {},
		getPos: { type: Function },
		deleteNode: { type: Function },
		updateAttributes: { type: Function }
	},
	setup(_) {
		let b = _, { syntax: x } = C(), { t: w } = S(), T = s(() => y(b.node.attrs.value, x)), E = s(() => v(b.node.attrs.value, x)), D = i(!1), k = i(""), A = i(null), j = !1;
		function M() {
			k.value = b.node.attrs.value, j = !1, D.value = !0, n(() => {
				A.value?.focus(), A.value?.select();
			});
		}
		function N() {
			if (j) return;
			j = !0;
			let e = k.value.trim();
			if (!e) {
				D.value = !1;
				return;
			}
			e !== b.node.attrs.value && b.updateAttributes({
				value: e,
				keyword: y(e, x) ? v(e, x) : ""
			}), D.value = !1;
		}
		function P(e) {
			e.key === "Enter" ? (e.preventDefault(), N()) : e.key === "Escape" && (D.value = !1);
		}
		return (n, i) => (t(), f(u(O), {
			as: "span",
			class: m(T.value ? "tpl-logic-merge-tag-node tpl:group tpl:mx-0.5 tpl:inline-flex tpl:items-center tpl:gap-1 tpl:rounded tpl:px-1.5 tpl:py-0.5 tpl:text-[0.8em] tpl:font-bold tpl:tracking-wide tpl:uppercase tpl:select-none" : ""),
			style: g(T.value ? "background-color: transparent; border: 1.5px solid color-mix(in srgb, var(--tpl-primary) 50%, transparent); color: var(--tpl-primary);" : ""),
			contenteditable: "false"
		}, {
			default: r(() => [D.value ? e((t(), c("input", {
				key: 0,
				ref_key: "inputRef",
				ref: A,
				"onUpdate:modelValue": i[0] ||= (e) => k.value = e,
				type: "text",
				class: "tpl:w-40 tpl:rounded tpl:border-none tpl:bg-transparent tpl:px-0.5 tpl:py-0 tpl:text-[1em] tpl:font-medium tpl:normal-case tpl:outline-none tpl:text-[var(--tpl-primary)]",
				onBlur: N,
				onKeydown: P
			}, null, 544)), [[p, k.value]]) : T.value ? (t(), c("span", {
				key: 1,
				role: "button",
				tabindex: "0",
				"aria-label": u(w).mergeTag.editValue,
				class: "tpl-tooltip tpl:cursor-pointer",
				"data-tooltip": _.node.attrs.value,
				onClick: d(M, ["stop"]),
				onKeydown: [a(d(M, ["stop"]), ["enter"]), a(d(M, ["prevent", "stop"]), ["space"])]
			}, o(E.value), 41, L)) : (t(), c("span", {
				key: 2,
				role: "button",
				tabindex: "0",
				"aria-label": u(w).mergeTag.editValue,
				onClick: d(M, ["stop"]),
				onKeydown: [a(d(M, ["stop"]), ["enter"]), a(d(M, ["prevent", "stop"]), ["space"])]
			}, o(_.node.attrs.value), 41, R)), T.value ? (t(), c("button", {
				key: 3,
				type: "button",
				"aria-label": u(w).mergeTag.deleteMergeTag,
				class: "tpl-merge-tag-delete tpl:flex tpl:size-5 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-full tpl:border-none tpl:bg-transparent tpl:p-0 tpl:opacity-60 tpl:transition-all hover:tpl:opacity-100 tpl:text-[var(--tpl-primary)]",
				contenteditable: "false",
				onClick: i[1] ||= d((...e) => _.deleteNode && _.deleteNode(...e), ["stop", "prevent"])
			}, [...i[2] ||= [h("svg", {
				width: "10",
				height: "10",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "3",
				"aria-hidden": "true"
			}, [h("line", {
				x1: "18",
				y1: "6",
				x2: "6",
				y2: "18"
			}), h("line", {
				x1: "6",
				y1: "6",
				x2: "18",
				y2: "18"
			})], -1)]], 8, z)) : l("", !0)]),
			_: 1
		}, 8, ["class", "style"]));
	}
});
//#endregion
//#region src/extensions/isNodeSelected.ts
function V(e, t) {
	let { $from: n, $to: r } = e.state.selection;
	return n.pos === r.pos ? n.pos > 0 && n.nodeBefore?.type.name === t || n.nodeAfter?.type.name === t : !1;
}
//#endregion
//#region src/extensions/renderVueNodeView.ts
function H(e) {
	return D(e);
}
//#endregion
//#region src/extensions/LogicMergeTagNode.ts
var U = w.create({
	name: "logicMergeTagNode",
	group: "inline",
	inline: !0,
	atom: !0,
	addOptions() {
		return { syntax: x.liquid };
	},
	addAttributes() {
		return {
			value: {
				default: "",
				parseHTML: (e) => e.getAttribute("data-logic-merge-tag") || ""
			},
			keyword: {
				default: "",
				parseHTML: (e) => e.getAttribute("data-keyword") || e.textContent || ""
			}
		};
	},
	parseHTML() {
		return [{ tag: "span[data-logic-merge-tag]" }];
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		if (!y(e.attrs.value, this.options.syntax)) return [
			"span",
			{},
			e.attrs.value
		];
		let n = v(e.attrs.value, this.options.syntax);
		return [
			"span",
			A(t, {
				"data-logic-merge-tag": e.attrs.value,
				"data-keyword": n
			}),
			n
		];
	},
	addNodeView() {
		return H(B);
	},
	addKeyboardShortcuts() {
		return {
			Backspace: () => V(this.editor, this.name),
			Delete: () => V(this.editor, this.name)
		};
	},
	addInputRules() {
		let e = RegExp(this.options.syntax.logic.source + "$", "");
		return [new T({
			find: e,
			handler: ({ state: e, range: t, match: n }) => {
				let r = n[0];
				if (!y(r, this.options.syntax)) return;
				let i = v(r, this.options.syntax), a = this.type.create({
					value: r,
					keyword: i
				});
				e.tr.replaceWith(t.from, t.to, a);
			}
		})];
	},
	addPasteRules() {
		let e = new RegExp(this.options.syntax.logic.source, "g");
		return [new k({
			find: e,
			handler: ({ state: e, range: t, match: n }) => {
				let r = n[0];
				if (!y(r, this.options.syntax)) return;
				let i = v(r, this.options.syntax), a = this.type.create({
					value: r,
					keyword: i
				});
				e.tr.replaceWith(t.from, t.to, a);
			}
		})];
	}
}), W = [
	"aria-label",
	"data-tooltip",
	"onKeydown"
], G = ["aria-label"], K = /* @__PURE__ */ _({
	__name: "MergeTagNodeView",
	props: {
		node: {},
		deleteNode: { type: Function },
		updateAttributes: { type: Function }
	},
	setup(l) {
		let m = l, { getMergeTagLabel: g } = C(), { t: _ } = S(), v = s(() => g(m.node.attrs.value)), y = i(!1), b = i(""), x = i(null);
		function w() {
			b.value = m.node.attrs.value, y.value = !0, n(() => {
				x.value?.focus(), x.value?.select();
			});
		}
		function T() {
			let e = b.value.trim();
			e && e !== m.node.attrs.value && m.updateAttributes({
				value: e,
				label: g(e)
			}), y.value = !1;
		}
		function E(e) {
			e.key === "Enter" ? (e.preventDefault(), T()) : e.key === "Escape" && (y.value = !1);
		}
		return (n, i) => (t(), f(u(O), {
			as: "span",
			class: "tpl-merge-tag-node tpl:group tpl:mx-0.5 tpl:inline-flex tpl:items-center tpl:gap-1 tpl:rounded tpl:px-1.5 tpl:py-0.5 tpl:text-[0.9em] tpl:font-medium tpl:select-none tpl:text-[var(--tpl-primary)]",
			style: { "background-color": "color-mix(in srgb, var(--tpl-primary) 20%, transparent)" },
			contenteditable: "false"
		}, {
			default: r(() => [y.value ? e((t(), c("input", {
				key: 0,
				ref_key: "inputRef",
				ref: x,
				"onUpdate:modelValue": i[0] ||= (e) => b.value = e,
				type: "text",
				class: "tpl:w-32 tpl:rounded tpl:border-none tpl:bg-transparent tpl:px-0.5 tpl:py-0 tpl:text-[1em] tpl:font-medium tpl:outline-none tpl:text-[var(--tpl-primary)]",
				onBlur: T,
				onKeydown: E
			}, null, 544)), [[p, b.value]]) : (t(), c("span", {
				key: 1,
				role: "button",
				tabindex: "0",
				"aria-label": u(_).mergeTag.editValue,
				class: "tpl-tooltip tpl:cursor-pointer",
				"data-tooltip": l.node.attrs.value,
				onClick: d(w, ["stop"]),
				onKeydown: [a(d(w, ["stop"]), ["enter"]), a(d(w, ["prevent", "stop"]), ["space"])]
			}, o(v.value), 41, W)), h("button", {
				type: "button",
				"aria-label": u(_).mergeTag.deleteMergeTag,
				class: "tpl-merge-tag-delete tpl:flex tpl:size-5 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-full tpl:border-none tpl:bg-transparent tpl:p-0 tpl:opacity-60 tpl:transition-all hover:tpl:opacity-100 tpl:text-[var(--tpl-primary)]",
				contenteditable: "false",
				onClick: i[1] ||= d((...e) => l.deleteNode && l.deleteNode(...e), ["stop", "prevent"])
			}, [...i[2] ||= [h("svg", {
				width: "10",
				height: "10",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "3",
				"aria-hidden": "true"
			}, [h("line", {
				x1: "18",
				y1: "6",
				x2: "6",
				y2: "18"
			}), h("line", {
				x1: "6",
				y1: "6",
				x2: "18",
				y2: "18"
			})], -1)]], 8, G)]),
			_: 1
		}));
	}
}), q = w.create({
	name: "mergeTagNode",
	group: "inline",
	inline: !0,
	atom: !0,
	addOptions() {
		return {
			mergeTags: [],
			syntax: x.liquid
		};
	},
	addAttributes() {
		return {
			label: {
				default: "",
				parseHTML: (e) => e.getAttribute("data-label") || e.textContent || ""
			},
			value: {
				default: "",
				parseHTML: (e) => e.getAttribute("data-merge-tag") || ""
			}
		};
	},
	parseHTML() {
		return [{ tag: "span[data-merge-tag]" }];
	},
	renderHTML({ node: e, HTMLAttributes: t }) {
		let n = b(e.attrs.value, this.options.mergeTags);
		return [
			"span",
			A(t, {
				"data-merge-tag": e.attrs.value,
				"data-label": n
			}),
			n
		];
	},
	addNodeView() {
		return H(K);
	},
	addCommands() {
		return { insertMergeTag: (e) => ({ commands: t }) => t.insertContent({
			type: this.name,
			attrs: {
				label: e.label,
				value: e.value
			}
		}) };
	},
	addKeyboardShortcuts() {
		return {
			Backspace: () => V(this.editor, this.name),
			Delete: () => V(this.editor, this.name)
		};
	},
	addInputRules() {
		let e = RegExp(this.options.syntax.value.source + "$", "");
		return [new T({
			find: e,
			handler: ({ state: e, range: t, match: n }) => {
				let r = n[0], i = b(r, this.options.mergeTags), a = this.type.create({
					label: i,
					value: r
				});
				e.tr.replaceWith(t.from, t.to, a);
			}
		})];
	},
	addPasteRules() {
		let e = new RegExp(this.options.syntax.value.source, "g");
		return [new k({
			find: e,
			handler: ({ state: e, range: t, match: n }) => {
				let r = n[0], i = b(r, this.options.mergeTags), a = this.type.create({
					label: i,
					value: r
				});
				e.tr.replaceWith(t.from, t.to, a);
			}
		})];
	}
});
//#endregion
export { P as FontSize, F as LetterSpacing, I as LineHeight, U as LogicMergeTagNode, q as MergeTagNode, N as MergeTagSuggestion, M as filterMergeTags, j as handleSuggestionKeyDown };

//# sourceMappingURL=extensions-yNQlgLNE.js.map