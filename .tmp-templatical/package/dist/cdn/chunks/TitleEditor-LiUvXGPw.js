import { K as e, M as t, T as n, ct as r, d as i, f as a, g as o, h as s, it as c, m as l, ot as u, p as d, st as ee, u as f, v as p, x as m, y as h } from "./draggable-BRF_Q_jB.js";
import { S as te, x as ne } from "./useEditorCore-CTYH6u4r.js";
import { O as re, T as g, U as _, V as v } from "./keys-CZOBuCQd.js";
import { t as y } from "./useI18n-aRMtgYRj.js";
import { n as b } from "./usePopoverPosition-Dm1jv3y5.js";
import { F as ie, Rt as ae, Vt as oe, at as se, dt as ce, lt as x } from "./icons-DN008liP.js";
import { n as S, t as C } from "./RichTextEditorContent-BAriGldd.js";
//#region src/components/blocks/TitleEditor.vue?vue&type=script&setup=true&lang.ts
var w = { class: "tpl-text-editor-wrapper tpl:relative" }, T = ["data-tpl-theme", "aria-label"], E = ["aria-label", "title"], D = ["aria-label", "title"], O = ["aria-label", "title"], k = {
	key: 0,
	class: "tpl:mx-1.5 tpl:h-6 tpl:w-px tpl:bg-[var(--tpl-border)]"
}, A = ["aria-label", "title"], j = {
	key: 2,
	class: "tpl:mx-1.5 tpl:h-6 tpl:w-px tpl:bg-[var(--tpl-border)]"
}, M = ["aria-label", "title"], N = {
	key: 1,
	class: "tpl:flex tpl:items-center tpl:gap-2 tpl:px-2 tpl:text-xs tpl:text-[var(--tpl-text-dim)]"
}, P = /* @__PURE__ */ m({
	__name: "TitleEditor",
	props: {
		block: {},
		toolbarPosition: {}
	},
	emits: ["done"],
	setup(m, { emit: P }) {
		let F = m, I = P, L = n(v, null), R = n(_, null), z = b(), B = n(re, null), le = n(g, null), V = a(() => (B?.isOpen.value ?? !1) || (le?.isOpen.value ?? !1)), { t: H } = y(), { editor: U, EditorContent: W, isLoading: G, initError: ue, retry: de, showLinkDialog: fe, linkUrl: K, linkColor: q, linkDialogRef: J, canRequestMergeTag: Y, canInsertLogicTag: X, openLinkDialog: Z, insertLink: pe, removeLink: me, closeLinkDialog: he, handleLinkKeydown: ge, handleAddMergeTag: Q, handleAddLogicTag: $ } = ne({
			blockId: () => F.block.id,
			blockContent: () => F.block.content,
			onDone: () => I("done"),
			editorName: "TitleEditor",
			async loadExtensions({ mergeTags: e, syntax: t, triggerChar: n, autocompleteEnabled: r, suggestionEmptyText: i }) {
				let [{ Editor: a, EditorContent: o }, { default: s }, { default: c }, { MergeTagNode: l, MergeTagSuggestion: u, LogicMergeTagNode: d }] = await Promise.all([
					import("./tiptap-CgwK_fKJ.js").then((e) => e.r),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.i),
					import("./tiptap-CgwK_fKJ.js").then((e) => e.l),
					import("./extensions-yNQlgLNE.js")
				]);
				return {
					TiptapEditor: a,
					EC: o,
					extensions: [
						s.configure({
							heading: !1,
							codeBlock: !1,
							blockquote: !1,
							horizontalRule: !1,
							bulletList: !1,
							orderedList: !1,
							listItem: !1,
							strike: !1,
							link: !1
						}),
						te(c).configure({
							openOnClick: !1,
							HTMLAttributes: {
								target: "_blank",
								rel: "noopener noreferrer"
							}
						}),
						l.configure({
							mergeTags: e,
							syntax: t
						}),
						d.configure({ syntax: t }),
						...r && n && e.length > 0 ? [u.configure({
							mergeTags: e,
							char: n,
							emptyText: i,
							popoverRoot: z
						})] : []
					]
				};
			}
		});
		return (n, a) => (t(), o("div", w, [
			c(z) && !V.value ? (t(), l(i, {
				key: 0,
				to: c(z)
			}, [d("div", {
				"data-tpl-theme": c(R),
				role: "toolbar",
				"aria-label": c(H).titleEditor.toolbar,
				class: "tpl tpl-text-toolbar tpl:absolute tpl:z-popover tpl:flex tpl:items-center tpl:gap-1 tpl:rounded-lg tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-2 tpl:shadow-lg",
				style: ee({
					...c(L),
					top: `${m.toolbarPosition.top}px`,
					left: `${m.toolbarPosition.left}px`,
					transform: "translateY(-100%)"
				})
			}, [!c(G) && c(U) ? (t(), o(f, { key: 0 }, [
				d("button", {
					type: "button",
					class: u(["tpl-text-toolbar-btn", { "tpl-text-toolbar-btn--active": c(U)?.isActive("bold") }]),
					"aria-label": c(H).titleEditor.bold,
					title: c(H).titleEditor.bold,
					onClick: a[0] ||= (e) => c(U)?.chain().focus().toggleBold().run()
				}, [h(c(oe), {
					size: 16,
					"stroke-width": 2.5
				})], 10, E),
				d("button", {
					type: "button",
					class: u(["tpl-text-toolbar-btn", { "tpl-text-toolbar-btn--active": c(U)?.isActive("italic") }]),
					"aria-label": c(H).titleEditor.italic,
					title: c(H).titleEditor.italic,
					onClick: a[1] ||= (e) => c(U)?.chain().focus().toggleItalic().run()
				}, [h(c(ce), {
					size: 16,
					"stroke-width": 2
				})], 10, D),
				a[8] ||= d("span", {
					class: "tpl:mx-1.5 tpl:h-6 tpl:w-px tpl:bg-[var(--tpl-border)]",
					"aria-hidden": "true"
				}, null, -1),
				d("button", {
					type: "button",
					class: u(["tpl-text-toolbar-btn", { "tpl-text-toolbar-btn--active": c(U)?.isActive("link") }]),
					"aria-label": c(H).titleEditor.addLink,
					title: c(H).titleEditor.addLink,
					onClick: a[2] ||= (...e) => c(Z) && c(Z)(...e)
				}, [h(c(x), {
					size: 16,
					"stroke-width": 2
				})], 10, O),
				c(Y) ? (t(), o("span", k)) : s("", !0),
				c(Y) ? (t(), o("button", {
					key: 1,
					type: "button",
					class: "tpl:flex tpl:h-8 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded tpl:border-none tpl:bg-transparent tpl:px-2.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)] tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-bg-active)]",
					"aria-label": c(H).mergeTag.insert,
					title: c(H).mergeTag.insert,
					onClick: a[3] ||= (...e) => c(Q) && c(Q)(...e)
				}, [h(c(ie), {
					size: 16,
					"stroke-width": 2
				}), p(" " + r(c(H).mergeTag.insertShort), 1)], 8, A)) : s("", !0),
				c(X) ? (t(), o("span", j)) : s("", !0),
				c(X) ? (t(), o("button", {
					key: 3,
					type: "button",
					class: "tpl:flex tpl:h-8 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded tpl:border-none tpl:bg-transparent tpl:px-2.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)] tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-bg-active)]",
					"aria-label": c(H).logicTag.insert,
					title: c(H).logicTag.insert,
					"data-testid": "insert-logic-button",
					onClick: a[4] ||= (...e) => c($) && c($)(...e)
				}, [h(c(ae), {
					size: 16,
					"stroke-width": 2
				}), p(" " + r(c(H).logicTag.insertShort), 1)], 8, M)) : s("", !0)
			], 64)) : (t(), o("div", N, [h(c(se), {
				class: "tpl-spinner",
				size: 14,
				"stroke-width": 2
			}), p(" " + r(c(H).errors.editorLoading), 1)]))], 12, T)], 8, ["to"])) : s("", !0),
			h(C, {
				editor: c(U),
				"editor-content": c(W),
				"is-loading": c(G),
				"init-error": c(ue),
				onRetry: c(de)
			}, null, 8, [
				"editor",
				"editor-content",
				"is-loading",
				"init-error",
				"onRetry"
			]),
			h(S, {
				visible: c(fe),
				"is-editing-link": c(U)?.isActive("link") ?? !1,
				"dialog-ref": c(J),
				"onUpdate:dialogRef": a[5] ||= (t) => e(J) ? J.value = t : null,
				"link-url": c(K),
				"onUpdate:linkUrl": a[6] ||= (t) => e(K) ? K.value = t : null,
				"link-color": c(q),
				"onUpdate:linkColor": a[7] ||= (t) => e(q) ? q.value = t : null,
				onClose: c(he),
				onInsert: c(pe),
				onRemove: c(me),
				onKeydown: c(ge)
			}, null, 8, [
				"visible",
				"is-editing-link",
				"dialog-ref",
				"link-url",
				"link-color",
				"onClose",
				"onInsert",
				"onRemove",
				"onKeydown"
			])
		]));
	}
});
//#endregion
export { P as default };

//# sourceMappingURL=TitleEditor-LiUvXGPw.js.map