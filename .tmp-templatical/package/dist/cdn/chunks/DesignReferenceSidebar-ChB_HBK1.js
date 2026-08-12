import { H as e, M as t, V as n, Z as r, ct as i, f as a, g as o, h as s, it as c, k as ee, m as te, n as ne, o as re, ot as ie, p as l, st as u, v as d, x as f, y as p, z as ae } from "./draggable-BRF_Q_jB.js";
import "./timeouts-SsLMC4a3.js";
import { G as m, g as oe, i as se } from "./keys-CZOBuCQd.js";
import { Ct as ce, Mt as le, St as h, mt as g, n as _, s as ue } from "./icons-DN008liP.js";
import { t as de } from "./LoadingTrack-CiNg9s16.js";
import { t as v } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { n as fe } from "./useCloudI18n-CML0BxqX.js";
import { m as pe } from "./cloud-CxNsW3hp.js";
//#region src/cloud/components/DesignReferenceSidebar.vue?vue&type=script&setup=true&lang.ts
var me = {
	key: 0,
	class: "tpl-design-sidebar tpl:absolute tpl:top-14 tpl:right-0 tpl:bottom-0 tpl:z-panel tpl:flex tpl:w-[360px] tpl:flex-col tpl:border-l tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)]"
}, he = { class: "tpl:flex tpl:items-center tpl:justify-between tpl:border-b tpl:border-[var(--tpl-border)] tpl:px-4 tpl:py-3" }, ge = { class: "tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-sm tpl:font-medium tpl:text-[var(--tpl-primary)]" }, _e = { class: "tpl:flex-1 tpl:overflow-y-auto tpl:p-4" }, y = {
	key: 0,
	class: "tpl:flex tpl:h-full tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:text-center"
}, b = { class: "tpl:flex tpl:w-full tpl:flex-col tpl:items-center tpl:gap-3" }, x = { class: "tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, S = {
	key: 1,
	class: "tpl:flex tpl:flex-col tpl:gap-4"
}, C = { class: "tpl:flex tpl:gap-1 tpl:rounded-[var(--tpl-radius-sm)] tpl:p-1 tpl:bg-[var(--tpl-bg-hover)]" }, w = {
	key: 0,
	class: "tpl:flex tpl:flex-col tpl:gap-2"
}, T = { class: "tpl:relative tpl:overflow-hidden tpl:rounded-[var(--tpl-radius)] tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)]" }, E = ["src", "alt"], D = {
	key: 1,
	class: "tpl:flex tpl:h-32 tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2"
}, O = { class: "tpl:text-xs tpl:text-[var(--tpl-text-muted)]" }, k = { class: "tpl:text-center tpl:text-xs tpl:text-[var(--tpl-text-muted)]" }, A = { class: "tpl:text-center tpl:text-[11px] tpl:text-[var(--tpl-text-dim)]" }, j = ["accept"], M = { class: "tpl:flex tpl:flex-col tpl:gap-1.5" }, N = { class: "tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text-muted)]" }, P = ["placeholder"], F = {
	key: 0,
	class: "tpl:flex tpl:flex-col tpl:gap-2 tpl:rounded-[var(--tpl-radius)] tpl:px-3 tpl:py-3 tpl:bg-[var(--tpl-warning-light)] tpl:border tpl:border-[var(--tpl-warning)]"
}, I = { class: "tpl:text-xs tpl:leading-snug tpl:text-[var(--tpl-text)]" }, ve = { class: "tpl:flex tpl:gap-2" }, ye = {
	key: 1,
	class: "tpl:flex tpl:items-start tpl:gap-2 tpl:rounded-lg tpl:px-3 tpl:py-2 tpl:text-xs tpl:bg-[var(--tpl-danger-light)] tpl:text-[var(--tpl-danger)]"
}, be = ["disabled"], xe = { class: "tpl:m-0 tpl:pt-1 tpl:text-center tpl:text-[11px] tpl:text-[var(--tpl-text-dim)]" }, L = /*#__PURE__*/ v(/* @__PURE__ */ f({
	__name: "DesignReferenceSidebar",
	props: {
		visible: { type: Boolean },
		hasExistingBlocks: { type: Boolean }
	},
	emits: ["close", "apply"],
	setup(f, { emit: v }) {
		let L = f, R = v, { t: z } = fe(), Se = m(oe, "DesignReferenceSidebar"), Ce = m(se, "DesignReferenceSidebar"), B = pe({
			authManager: Ce,
			getTemplateId: () => Se.state.template?.id ?? null,
			onApply: (e) => R("apply", e)
		}), V = r(null), H = r("image"), U = r(null), W = r(""), G = r(null), K = r(!1), q = r(!1), J = a(() => !B.isGenerating.value && U.value !== null);
		function Y(e) {
			H.value = e, Z();
		}
		function we(e) {
			let t = e.target, n = t.files?.[0];
			n && X(n), t.value = "";
		}
		function X(e) {
			if (e.size > 10485760) {
				B.error.value = z.designReference.fileTooLarge;
				return;
			}
			if (H.value === "image") {
				if (![
					"image/png",
					"image/jpeg",
					"image/jpg",
					"image/webp"
				].includes(e.type)) {
					B.error.value = z.designReference.invalidFileType;
					return;
				}
			} else if (H.value === "pdf" && e.type !== "application/pdf") {
				B.error.value = z.designReference.invalidFileType;
				return;
			}
			U.value = e, B.error.value = null, G.value && URL.revokeObjectURL(G.value), e.type.startsWith("image/") ? G.value = URL.createObjectURL(e) : G.value = null;
		}
		function Z() {
			G.value &&= (URL.revokeObjectURL(G.value), null), U.value = null;
		}
		function Q(e) {
			e.preventDefault(), q.value = !0;
		}
		function Te() {
			q.value = !1;
		}
		function Ee(e) {
			e.preventDefault(), q.value = !1;
			let t = e.dataTransfer?.files?.[0];
			t && X(t);
		}
		function $() {
			if (!J.value) return;
			if (L.hasExistingBlocks && !K.value) {
				K.value = !0;
				return;
			}
			K.value = !1;
			let e = {};
			W.value.trim() && (e.prompt = W.value.trim()), H.value === "image" && U.value ? e.imageUpload = U.value : H.value === "pdf" && U.value && (e.pdfUpload = U.value), B.generate(e);
		}
		function De() {
			K.value = !1;
		}
		return ae(() => L.visible, (e) => {
			e || (K.value = !1);
		}), ee(() => {
			G.value &&= (URL.revokeObjectURL(G.value), null);
		}), (r, a) => (t(), te(ne, {
			"enter-active-class": "tpl-design-slide-enter-active",
			"enter-from-class": "tpl:translate-x-full",
			"enter-to-class": "tpl:translate-x-0",
			"leave-active-class": "tpl-design-slide-leave-active",
			"leave-from-class": "tpl:translate-x-0",
			"leave-to-class": "tpl:translate-x-full"
		}, {
			default: n(() => [f.visible ? (t(), o("div", me, [l("div", he, [l("div", ge, [p(c(g), {
				size: 13,
				"stroke-width": 2
			}), l("span", null, i(c(z).designReference.title), 1)]), l("button", {
				class: "tpl:rounded-md tpl:p-0.5 tpl:transition-colors tpl:duration-150 tpl:text-[var(--tpl-text-muted)]",
				onClick: a[0] ||= (e) => R("close")
			}, [p(c(_), {
				size: 14,
				"stroke-width": 2
			})])]), l("div", _e, [c(B).isGenerating.value ? (t(), o("div", y, [l("div", b, [p(de), l("p", x, i(c(z).designReference.generating), 1)])])) : (t(), o("div", S, [
				l("div", C, [l("button", {
					class: "tpl:flex tpl:flex-1 tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:px-2 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
					style: u({
						backgroundColor: H.value === "image" ? "var(--tpl-bg)" : "transparent",
						color: H.value === "image" ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
						boxShadow: H.value === "image" ? "var(--tpl-shadow)" : "none"
					}),
					onClick: a[1] ||= (e) => Y("image")
				}, [p(c(ce), {
					size: 12,
					"stroke-width": 2
				}), d(" " + i(c(z).designReference.uploadImage), 1)], 4), l("button", {
					class: "tpl:flex tpl:flex-1 tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:px-2 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
					style: u({
						backgroundColor: H.value === "pdf" ? "var(--tpl-bg)" : "transparent",
						color: H.value === "pdf" ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
						boxShadow: H.value === "pdf" ? "var(--tpl-shadow)" : "none"
					}),
					onClick: a[2] ||= (e) => Y("pdf")
				}, [p(c(h), {
					size: 12,
					"stroke-width": 2
				}), d(" " + i(c(z).designReference.uploadPdf), 1)], 4)]),
				l("div", null, [U.value ? (t(), o("div", w, [l("div", T, [G.value ? (t(), o("img", {
					key: 0,
					src: G.value,
					alt: U.value.name,
					class: "tpl:h-auto tpl:max-h-48 tpl:w-full tpl:object-contain"
				}, null, 8, E)) : (t(), o("div", D, [p(c(h), {
					size: 32,
					"stroke-width": 1.5,
					class: "tpl:text-[var(--tpl-text-dim)]"
				}), l("span", O, i(U.value.name), 1)])), l("button", {
					class: "tpl:absolute tpl:top-2 tpl:right-2 tpl:rounded-full tpl:p-1 tpl:transition-colors tpl:duration-150 tpl:bg-[var(--tpl-bg)] tpl:text-[var(--tpl-text-muted)] tpl:shadow-[var(--tpl-shadow)]",
					onClick: Z
				}, [p(c(_), {
					size: 12,
					"stroke-width": 2
				})])])])) : (t(), o("div", {
					key: 1,
					class: "tpl-design-dropzone tpl:flex tpl:cursor-pointer tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded-[var(--tpl-radius)] tpl:border-2 tpl:border-dashed tpl:px-4 tpl:py-8 tpl:transition-colors tpl:duration-150",
					style: u({
						borderColor: q.value ? "var(--tpl-primary)" : "var(--tpl-border-light)",
						backgroundColor: q.value ? "var(--tpl-primary-light)" : "var(--tpl-bg)"
					}),
					onClick: a[3] ||= (e) => V.value?.click(),
					onDragover: Q,
					onDragleave: Te,
					onDrop: Ee
				}, [
					p(c(ue), {
						size: 24,
						"stroke-width": 1.5,
						class: "tpl:text-[var(--tpl-text-dim)]"
					}),
					l("span", k, i(c(z).designReference.dropHint), 1),
					l("span", A, i(H.value === "image" ? c(z).designReference.acceptedImages : c(z).designReference.acceptedPdf), 1)
				], 36)), l("input", {
					ref_key: "fileInput",
					ref: V,
					type: "file",
					class: "tpl:hidden",
					accept: H.value === "image" ? "image/png,image/jpeg,image/webp" : "application/pdf",
					onChange: we
				}, null, 40, j)]),
				l("div", M, [l("label", N, i(c(z).designReference.promptLabel), 1), e(l("textarea", {
					"onUpdate:modelValue": a[4] ||= (e) => W.value = e,
					class: ie(["tpl:min-h-[72px] tpl:w-full tpl:resize-none tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:px-3 tpl:py-2 tpl:font-sans tpl:text-sm tpl:outline-none tpl:transition-colors tpl:duration-150 tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text)] tpl:bg-[var(--tpl-bg)]", ["tpl-design-prompt-input"]]),
					placeholder: c(z).designReference.promptPlaceholder,
					rows: "3"
				}, null, 8, P), [[re, W.value]])]),
				K.value ? (t(), o("div", F, [l("p", I, i(c(z).designReference.replaceWarning), 1), l("div", ve, [l("button", {
					class: "tpl:flex-1 tpl:rounded-[var(--tpl-radius-sm)] tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150 tpl:text-[var(--tpl-text-muted)] tpl:border tpl:border-[var(--tpl-border)]",
					style: { "background-color": "transparent" },
					onClick: De
				}, i(c(z).designReference.replaceCancel), 1), l("button", {
					class: "tpl:flex-1 tpl:rounded-[var(--tpl-radius-sm)] tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
					onClick: $
				}, i(c(z).designReference.replaceConfirm), 1)])])) : s("", !0),
				c(B).error.value ? (t(), o("div", ye, [p(c(le), {
					size: 14,
					"stroke-width": 2,
					class: "tpl:mt-0.5 tpl:shrink-0"
				}), l("span", null, i(c(z).designReference.error), 1)])) : s("", !0),
				K.value ? s("", !0) : (t(), o("button", {
					key: 2,
					class: "tpl:flex tpl:w-full tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded-[var(--tpl-radius-sm)] tpl:px-4 tpl:py-2.5 tpl:text-sm tpl:font-medium tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
					disabled: !J.value,
					onClick: $
				}, [p(c(g), {
					size: 16,
					"stroke-width": 2
				}), d(" " + i(c(z).designReference.generate), 1)], 8, be)),
				l("p", xe, i(c(z).aiMenu.disclaimer), 1)
			]))])])) : s("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-bdbf8d0d"]]);
//#endregion
export { L as default };

//# sourceMappingURL=DesignReferenceSidebar-ChB_HBK1.js.map