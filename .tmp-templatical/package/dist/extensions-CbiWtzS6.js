import { Dt as e, Et as t, O as n, Ot as r, R as i, Y as a, _ as o, c as s, d as c, l, nt as u, s as d, u as f, w as p, z as m } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { a as h, c as g, s as _ } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { D as v, E as y, N as b, a as x } from "./dist-CQ0fVBQ3.js";
import { t as S } from "./useI18n-BkHfCWC6.js";
import { t as C } from "./useMergeTag-CZ4XYAxu.js";
import { i as w, o as T, p as E, qt as D, u as O } from "./dist-CcQFPJMF.js";
import { i as k, r as A, t as j } from "./MergeTagSuggestion-DvisJ9im.js";
import { n as M, t as N } from "./dist-C31bMR4x.js";
//#region src/extensions/FontSize.ts
var P = w.create({
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
}), F = w.create({
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
}), I = w.create({
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
], R = ["aria-label", "onKeydown"], z = ["aria-label"], B = /* @__PURE__ */ o({
	__name: "LogicMergeTagNodeView",
	props: {
		node: {},
		editor: {},
		getPos: { type: Function },
		deleteNode: { type: Function },
		updateAttributes: { type: Function }
	},
	setup(o) {
		let v = o, { syntax: x } = C(), { t: w } = S(), T = d(() => b(v.node.attrs.value, x)), E = d(() => y(v.node.attrs.value, x)), D = a(!1), O = a(""), k = a(null), A = !1;
		function j() {
			O.value = v.node.attrs.value, A = !1, D.value = !0, p(() => {
				k.value?.focus(), k.value?.select();
			});
		}
		function M() {
			if (A) return;
			A = !0;
			let e = O.value.trim();
			if (!e) {
				D.value = !1;
				return;
			}
			e !== v.node.attrs.value && v.updateAttributes({
				value: e,
				keyword: b(e, x) ? y(e, x) : ""
			}), D.value = !1;
		}
		function P(e) {
			e.key === "Enter" ? (e.preventDefault(), M()) : e.key === "Escape" && (D.value = !1);
		}
		return (a, d) => (n(), l(u(N), {
			as: "span",
			class: t(T.value ? "tpl-logic-merge-tag-node tpl:group tpl:mx-0.5 tpl:inline-flex tpl:items-center tpl:gap-1 tpl:rounded tpl:px-1.5 tpl:py-0.5 tpl:text-[0.8em] tpl:font-bold tpl:tracking-wide tpl:uppercase tpl:select-none" : ""),
			style: e(T.value ? "background-color: transparent; border: 1.5px solid color-mix(in srgb, var(--tpl-primary) 50%, transparent); color: var(--tpl-primary);" : ""),
			contenteditable: "false"
		}, {
			default: i(() => [D.value ? m((n(), c("input", {
				key: 0,
				ref_key: "inputRef",
				ref: k,
				"onUpdate:modelValue": d[0] ||= (e) => O.value = e,
				type: "text",
				class: "tpl:w-40 tpl:rounded tpl:border-none tpl:bg-transparent tpl:px-0.5 tpl:py-0 tpl:text-[1em] tpl:font-medium tpl:normal-case tpl:outline-none tpl:text-[var(--tpl-primary)]",
				onBlur: M,
				onKeydown: P
			}, null, 544)), [[h, O.value]]) : T.value ? (n(), c("span", {
				key: 1,
				role: "button",
				tabindex: "0",
				"aria-label": u(w).mergeTag.editValue,
				class: "tpl-tooltip tpl:cursor-pointer",
				"data-tooltip": o.node.attrs.value,
				onClick: g(j, ["stop"]),
				onKeydown: [_(g(j, ["stop"]), ["enter"]), _(g(j, ["prevent", "stop"]), ["space"])]
			}, r(E.value), 41, L)) : (n(), c("span", {
				key: 2,
				role: "button",
				tabindex: "0",
				"aria-label": u(w).mergeTag.editValue,
				onClick: g(j, ["stop"]),
				onKeydown: [_(g(j, ["stop"]), ["enter"]), _(g(j, ["prevent", "stop"]), ["space"])]
			}, r(o.node.attrs.value), 41, R)), T.value ? (n(), c("button", {
				key: 3,
				type: "button",
				"aria-label": u(w).mergeTag.deleteMergeTag,
				class: "tpl-merge-tag-delete tpl:flex tpl:size-5 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-full tpl:border-none tpl:bg-transparent tpl:p-0 tpl:opacity-60 tpl:transition-all hover:tpl:opacity-100 tpl:text-[var(--tpl-primary)]",
				contenteditable: "false",
				onClick: d[1] ||= g((...e) => o.deleteNode && o.deleteNode(...e), ["stop", "prevent"])
			}, [...d[2] ||= [s("svg", {
				width: "10",
				height: "10",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "3",
				"aria-hidden": "true"
			}, [s("line", {
				x1: "18",
				y1: "6",
				x2: "6",
				y2: "18"
			}), s("line", {
				x1: "6",
				y1: "6",
				x2: "18",
				y2: "18"
			})], -1)]], 8, z)) : f("", !0)]),
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
	return M(e);
}
//#endregion
//#region src/extensions/LogicMergeTagNode.ts
var U = O.create({
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
		if (!b(e.attrs.value, this.options.syntax)) return [
			"span",
			{},
			e.attrs.value
		];
		let n = y(e.attrs.value, this.options.syntax);
		return [
			"span",
			D(t, {
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
				if (!b(r, this.options.syntax)) return;
				let i = y(r, this.options.syntax), a = this.type.create({
					value: r,
					keyword: i
				});
				e.tr.replaceWith(t.from, t.to, a);
			}
		})];
	},
	addPasteRules() {
		let e = new RegExp(this.options.syntax.logic.source, "g");
		return [new E({
			find: e,
			handler: ({ state: e, range: t, match: n }) => {
				let r = n[0];
				if (!b(r, this.options.syntax)) return;
				let i = y(r, this.options.syntax), a = this.type.create({
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
], G = ["aria-label"], K = /* @__PURE__ */ o({
	__name: "MergeTagNodeView",
	props: {
		node: {},
		deleteNode: { type: Function },
		updateAttributes: { type: Function }
	},
	setup(e) {
		let t = e, { getMergeTagLabel: o } = C(), { t: f } = S(), v = d(() => o(t.node.attrs.value)), y = a(!1), b = a(""), x = a(null);
		function w() {
			b.value = t.node.attrs.value, y.value = !0, p(() => {
				x.value?.focus(), x.value?.select();
			});
		}
		function T() {
			let e = b.value.trim();
			e && e !== t.node.attrs.value && t.updateAttributes({
				value: e,
				label: o(e)
			}), y.value = !1;
		}
		function E(e) {
			e.key === "Enter" ? (e.preventDefault(), T()) : e.key === "Escape" && (y.value = !1);
		}
		return (t, a) => (n(), l(u(N), {
			as: "span",
			class: "tpl-merge-tag-node tpl:group tpl:mx-0.5 tpl:inline-flex tpl:items-center tpl:gap-1 tpl:rounded tpl:px-1.5 tpl:py-0.5 tpl:text-[0.9em] tpl:font-medium tpl:select-none tpl:text-[var(--tpl-primary)]",
			style: { "background-color": "color-mix(in srgb, var(--tpl-primary) 20%, transparent)" },
			contenteditable: "false"
		}, {
			default: i(() => [y.value ? m((n(), c("input", {
				key: 0,
				ref_key: "inputRef",
				ref: x,
				"onUpdate:modelValue": a[0] ||= (e) => b.value = e,
				type: "text",
				class: "tpl:w-32 tpl:rounded tpl:border-none tpl:bg-transparent tpl:px-0.5 tpl:py-0 tpl:text-[1em] tpl:font-medium tpl:outline-none tpl:text-[var(--tpl-primary)]",
				onBlur: T,
				onKeydown: E
			}, null, 544)), [[h, b.value]]) : (n(), c("span", {
				key: 1,
				role: "button",
				tabindex: "0",
				"aria-label": u(f).mergeTag.editValue,
				class: "tpl-tooltip tpl:cursor-pointer",
				"data-tooltip": e.node.attrs.value,
				onClick: g(w, ["stop"]),
				onKeydown: [_(g(w, ["stop"]), ["enter"]), _(g(w, ["prevent", "stop"]), ["space"])]
			}, r(v.value), 41, W)), s("button", {
				type: "button",
				"aria-label": u(f).mergeTag.deleteMergeTag,
				class: "tpl-merge-tag-delete tpl:flex tpl:size-5 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-full tpl:border-none tpl:bg-transparent tpl:p-0 tpl:opacity-60 tpl:transition-all hover:tpl:opacity-100 tpl:text-[var(--tpl-primary)]",
				contenteditable: "false",
				onClick: a[1] ||= g((...t) => e.deleteNode && e.deleteNode(...t), ["stop", "prevent"])
			}, [...a[2] ||= [s("svg", {
				width: "10",
				height: "10",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "3",
				"aria-hidden": "true"
			}, [s("line", {
				x1: "18",
				y1: "6",
				x2: "6",
				y2: "18"
			}), s("line", {
				x1: "6",
				y1: "6",
				x2: "18",
				y2: "18"
			})], -1)]], 8, G)]),
			_: 1
		}));
	}
}), q = O.create({
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
		let n = v(e.attrs.value, this.options.mergeTags);
		return [
			"span",
			D(t, {
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
				let r = n[0], i = v(r, this.options.mergeTags), a = this.type.create({
					label: i,
					value: r
				});
				e.tr.replaceWith(t.from, t.to, a);
			}
		})];
	},
	addPasteRules() {
		let e = new RegExp(this.options.syntax.value.source, "g");
		return [new E({
			find: e,
			handler: ({ state: e, range: t, match: n }) => {
				let r = n[0], i = v(r, this.options.mergeTags), a = this.type.create({
					label: i,
					value: r
				});
				e.tr.replaceWith(t.from, t.to, a);
			}
		})];
	}
});
//#endregion
export { P as FontSize, F as LetterSpacing, I as LineHeight, U as LogicMergeTagNode, q as MergeTagNode, j as MergeTagSuggestion, A as filterMergeTags, k as handleSuggestionKeyDown };
