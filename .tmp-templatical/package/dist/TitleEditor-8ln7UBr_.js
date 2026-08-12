import { Dt as e, Et as t, O as n, Ot as r, W as i, _ as a, c as o, d as s, h as c, i as l, l as u, m as d, nt as f, r as p, s as m, u as h, x as g } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { C as ee, S as te } from "./useEditorCore-BMbxdUbY.js";
import { n as ne } from "./usePopoverPosition-D93u-EZm.js";
import { O as _, T as v, U as y, V as b } from "./keys-BI6VSUh4.js";
import { t as re } from "./useI18n-BkHfCWC6.js";
import { a as ie, i as ae, n as oe, r as se, t as ce } from "./RichTextEditorContent-DznIQcdY.js";
import { n as x, t as S } from "./scan-line-D8Oh5xos.js";
import { t as C } from "./loader-circle-GADaYcyQ.js";
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
}, P = /* @__PURE__ */ a({
	__name: "TitleEditor",
	props: {
		block: {},
		toolbarPosition: {}
	},
	emits: ["done"],
	setup(a, { emit: P }) {
		let F = a, I = P, L = g(b, null), R = g(y, null), z = ne(), B = g(_, null), le = g(v, null), V = m(() => (B?.isOpen.value ?? !1) || (le?.isOpen.value ?? !1)), { t: H } = re(), { editor: U, EditorContent: W, isLoading: G, initError: ue, retry: de, showLinkDialog: fe, linkUrl: K, linkColor: q, linkDialogRef: J, canRequestMergeTag: Y, canInsertLogicTag: X, openLinkDialog: Z, insertLink: pe, removeLink: me, closeLinkDialog: he, handleLinkKeydown: ge, handleAddMergeTag: Q, handleAddLogicTag: $ } = te({
			blockId: () => F.block.id,
			blockContent: () => F.block.content,
			onDone: () => I("done"),
			editorName: "TitleEditor",
			async loadExtensions({ mergeTags: e, syntax: t, triggerChar: n, autocompleteEnabled: r, suggestionEmptyText: i }) {
				let [{ Editor: a, EditorContent: o }, { default: s }, { default: c }, { MergeTagNode: l, MergeTagSuggestion: u, LogicMergeTagNode: d }] = await Promise.all([
					import("./dist-C31bMR4x.js").then((e) => e.r),
					import("./dist-Dx71pluS.js"),
					import("./dist-DX4x6mQ1.js"),
					import("./extensions-CbiWtzS6.js")
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
						ee(c).configure({
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
		return (m, g) => (n(), s("div", w, [
			f(z) && !V.value ? (n(), u(l, {
				key: 0,
				to: f(z)
			}, [o("div", {
				"data-tpl-theme": f(R),
				role: "toolbar",
				"aria-label": f(H).titleEditor.toolbar,
				class: "tpl tpl-text-toolbar tpl:absolute tpl:z-popover tpl:flex tpl:items-center tpl:gap-1 tpl:rounded-lg tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-2 tpl:shadow-lg",
				style: e({
					...f(L),
					top: `${a.toolbarPosition.top}px`,
					left: `${a.toolbarPosition.left}px`,
					transform: "translateY(-100%)"
				})
			}, [!f(G) && f(U) ? (n(), s(p, { key: 0 }, [
				o("button", {
					type: "button",
					class: t(["tpl-text-toolbar-btn", { "tpl-text-toolbar-btn--active": f(U)?.isActive("bold") }]),
					"aria-label": f(H).titleEditor.bold,
					title: f(H).titleEditor.bold,
					onClick: g[0] ||= (e) => f(U)?.chain().focus().toggleBold().run()
				}, [c(f(ie), {
					size: 16,
					"stroke-width": 2.5
				})], 10, E),
				o("button", {
					type: "button",
					class: t(["tpl-text-toolbar-btn", { "tpl-text-toolbar-btn--active": f(U)?.isActive("italic") }]),
					"aria-label": f(H).titleEditor.italic,
					title: f(H).titleEditor.italic,
					onClick: g[1] ||= (e) => f(U)?.chain().focus().toggleItalic().run()
				}, [c(f(ae), {
					size: 16,
					"stroke-width": 2
				})], 10, D),
				g[8] ||= o("span", {
					class: "tpl:mx-1.5 tpl:h-6 tpl:w-px tpl:bg-[var(--tpl-border)]",
					"aria-hidden": "true"
				}, null, -1),
				o("button", {
					type: "button",
					class: t(["tpl-text-toolbar-btn", { "tpl-text-toolbar-btn--active": f(U)?.isActive("link") }]),
					"aria-label": f(H).titleEditor.addLink,
					title: f(H).titleEditor.addLink,
					onClick: g[2] ||= (...e) => f(Z) && f(Z)(...e)
				}, [c(f(se), {
					size: 16,
					"stroke-width": 2
				})], 10, O),
				f(Y) ? (n(), s("span", k)) : h("", !0),
				f(Y) ? (n(), s("button", {
					key: 1,
					type: "button",
					class: "tpl:flex tpl:h-8 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded tpl:border-none tpl:bg-transparent tpl:px-2.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)] tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-bg-active)]",
					"aria-label": f(H).mergeTag.insert,
					title: f(H).mergeTag.insert,
					onClick: g[3] ||= (...e) => f(Q) && f(Q)(...e)
				}, [c(f(S), {
					size: 16,
					"stroke-width": 2
				}), d(" " + r(f(H).mergeTag.insertShort), 1)], 8, A)) : h("", !0),
				f(X) ? (n(), s("span", j)) : h("", !0),
				f(X) ? (n(), s("button", {
					key: 3,
					type: "button",
					class: "tpl:flex tpl:h-8 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded tpl:border-none tpl:bg-transparent tpl:px-2.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)] tpl:transition-all tpl:duration-150 tpl:hover:bg-[var(--tpl-bg-active)]",
					"aria-label": f(H).logicTag.insert,
					title: f(H).logicTag.insert,
					"data-testid": "insert-logic-button",
					onClick: g[4] ||= (...e) => f($) && f($)(...e)
				}, [c(f(x), {
					size: 16,
					"stroke-width": 2
				}), d(" " + r(f(H).logicTag.insertShort), 1)], 8, M)) : h("", !0)
			], 64)) : (n(), s("div", N, [c(f(C), {
				class: "tpl-spinner",
				size: 14,
				"stroke-width": 2
			}), d(" " + r(f(H).errors.editorLoading), 1)]))], 12, T)], 8, ["to"])) : h("", !0),
			c(ce, {
				editor: f(U),
				"editor-content": f(W),
				"is-loading": f(G),
				"init-error": f(ue),
				onRetry: f(de)
			}, null, 8, [
				"editor",
				"editor-content",
				"is-loading",
				"init-error",
				"onRetry"
			]),
			c(oe, {
				visible: f(fe),
				"is-editing-link": f(U)?.isActive("link") ?? !1,
				"dialog-ref": f(J),
				"onUpdate:dialogRef": g[5] ||= (e) => i(J) ? J.value = e : null,
				"link-url": f(K),
				"onUpdate:linkUrl": g[6] ||= (e) => i(K) ? K.value = e : null,
				"link-color": f(q),
				"onUpdate:linkColor": g[7] ||= (e) => i(q) ? q.value = e : null,
				onClose: f(he),
				onInsert: f(pe),
				onRemove: f(me),
				onKeydown: f(ge)
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
