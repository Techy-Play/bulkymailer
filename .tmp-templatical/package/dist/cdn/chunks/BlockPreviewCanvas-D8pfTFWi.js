import { n as e } from "./rolldown-runtime-B0aSnxlc.js";
import { I as t, L as n, M as r, N as i, P as a, T as o, f as s, g as c, it as l, m as u, p as d, st as f, u as p, x as m } from "./draggable-BRF_Q_jB.js";
import { _ as h, a as g, c as _, d as v, f as y, h as b, i as x, k as S, m as C, n as w, p as T, r as E, u as D, v as O, y as k } from "./useEditorCore-CTYH6u4r.js";
import { W as A, f as j, g as M, k as N, s as P } from "./keys-CZOBuCQd.js";
import { n as F, t as I } from "./emailFrameWidth-BmFCN2dp.js";
//#region src/components/blocks/PreviewSectionBlock.vue?vue&type=script&setup=true&lang.ts
var L = { class: "tpl:w-full" }, R = { class: "tpl:flex tpl:gap-0" }, z = /* @__PURE__ */ m({
	name: "PreviewSectionBlock",
	__name: "PreviewSectionBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let i = {
			title: _,
			paragraph: T,
			image: b,
			video: w,
			button: S,
			divider: O,
			social: g,
			menu: C,
			table: E,
			spacer: x,
			html: h,
			custom: k
		}, m = e, v = o(P, null), A = s(() => {
			switch (m.block.columns) {
				case "2": return ["50%", "50%"];
				case "3": return [
					"33.33%",
					"33.33%",
					"33.33%"
				];
				case "1-2": return ["33.33%", "66.67%"];
				case "2-1": return ["66.67%", "33.33%"];
				default: return ["100%"];
			}
		}), j = s(() => {
			let e = A.value.length, t = [...m.block.children];
			for (; t.length < e;) t.push([]);
			return t.slice(0, e);
		});
		function M(e) {
			return j.value[e] || [];
		}
		function N(e) {
			return y(e, v, i);
		}
		return (e, i) => {
			let o = t("PreviewSectionBlock", !0);
			return r(), c("div", L, [d("div", R, [(r(!0), c(p, null, a(j.value, (e, t) => (r(), c("div", {
				key: t,
				style: f({ width: A.value[t] })
			}, [(r(!0), c(p, null, a(M(t), (e) => (r(), c("div", {
				key: e.id,
				style: f(l(D)(e))
			}, [e.type === "section" ? (r(), u(o, {
				key: 0,
				block: e,
				viewport: "desktop"
			}, null, 8, ["block"])) : (r(), u(n(N(e)), {
				key: 1,
				block: e,
				viewport: "desktop"
			}, null, 8, ["block"]))], 4))), 128))], 4))), 128))])]);
		};
	}
}), B = /*@__PURE__*/ m({
	__name: "BlockPreviewCanvas",
	props: {
		blocks: {},
		viewport: { default: "desktop" },
		applyConditionFilter: {
			type: Boolean,
			default: !0
		}
	},
	setup(e) {
		let t = e, d = o(P), m = o(M, null), L = o(j, null), R = o(N, null);
		i(A, s(() => R?.value ?? !1));
		let B = s(() => t.applyConditionFilter ? t.blocks.filter((e) => !L?.isHidden(e.id)) : t.blocks), V = s(() => F(m?.content.value.settings, t.viewport)), H = s(() => m ? v(m.content.value.settings) : {}), U = {
			section: z,
			title: _,
			paragraph: T,
			image: b,
			video: w,
			button: S,
			divider: O,
			social: g,
			menu: C,
			table: E,
			spacer: x,
			html: h,
			custom: k
		};
		function W(e) {
			return y(e, d, U);
		}
		return (t, i) => (r(), c("div", {
			"data-testid": "block-preview-canvas",
			class: "tpl:pointer-events-none tpl:mx-auto tpl:select-none tpl:rounded-lg",
			style: f({
				width: `${V.value}px`,
				transition: l(I),
				backgroundColor: "var(--tpl-canvas-bg)",
				boxShadow: "var(--tpl-shadow-sm)",
				...H.value
			})
		}, [(r(!0), c(p, null, a(B.value, (t) => (r(), c("div", {
			key: t.id,
			style: f(l(D)(t))
		}, [(r(), u(n(W(t)), {
			block: t,
			viewport: e.viewport
		}, null, 8, ["block", "viewport"]))], 4))), 128))], 4));
	}
}), V = /* @__PURE__ */ e({ default: () => H }), H = B;
//#endregion
export { V as n, H as t };

//# sourceMappingURL=BlockPreviewCanvas-D8pfTFWi.js.map