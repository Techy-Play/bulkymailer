import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { A as t, Dt as n, M as r, N as i, O as a, _ as o, c as s, d as c, k as l, l as u, nt as d, r as f, s as p, x as m } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { a as h, b as g, d as _, f as v, g as y, h as b, i as x, l as S, m as C, n as w, p as T, r as E, v as D, y as O, z as k } from "./useEditorCore-BMbxdUbY.js";
import { W as A, f as j, g as M, k as N, s as P } from "./keys-BI6VSUh4.js";
import { n as F, t as I } from "./emailFrameWidth-BmFCN2dp.js";
//#region src/components/blocks/PreviewSectionBlock.vue?vue&type=script&setup=true&lang.ts
var L = { class: "tpl:w-full" }, R = { class: "tpl:flex tpl:gap-0" }, z = /* @__PURE__ */ o({
	name: "PreviewSectionBlock",
	__name: "PreviewSectionBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let o = {
			title: S,
			paragraph: C,
			image: y,
			video: w,
			button: k,
			divider: O,
			social: h,
			menu: b,
			table: E,
			spacer: x,
			html: D,
			custom: g
		}, l = e, v = m(P, null), A = p(() => {
			switch (l.block.columns) {
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
		}), j = p(() => {
			let e = A.value.length, t = [...l.block.children];
			for (; t.length < e;) t.push([]);
			return t.slice(0, e);
		});
		function M(e) {
			return j.value[e] || [];
		}
		function N(e) {
			return T(e, v, o);
		}
		return (e, o) => {
			let l = r("PreviewSectionBlock", !0);
			return a(), c("div", L, [s("div", R, [(a(!0), c(f, null, t(j.value, (e, r) => (a(), c("div", {
				key: r,
				style: n({ width: A.value[r] })
			}, [(a(!0), c(f, null, t(M(r), (e) => (a(), c("div", {
				key: e.id,
				style: n(d(_)(e))
			}, [e.type === "section" ? (a(), u(l, {
				key: 0,
				block: e,
				viewport: "desktop"
			}, null, 8, ["block"])) : (a(), u(i(N(e)), {
				key: 1,
				block: e,
				viewport: "desktop"
			}, null, 8, ["block"]))], 4))), 128))], 4))), 128))])]);
		};
	}
}), B = /*@__PURE__*/ o({
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
		let r = e, o = m(P), s = m(M, null), L = m(j, null), R = m(N, null);
		l(A, p(() => R?.value ?? !1));
		let B = p(() => r.applyConditionFilter ? r.blocks.filter((e) => !L?.isHidden(e.id)) : r.blocks), V = p(() => F(s?.content.value.settings, r.viewport)), H = p(() => s ? v(s.content.value.settings) : {}), U = {
			section: z,
			title: S,
			paragraph: C,
			image: y,
			video: w,
			button: k,
			divider: O,
			social: h,
			menu: b,
			table: E,
			spacer: x,
			html: D,
			custom: g
		};
		function W(e) {
			return T(e, o, U);
		}
		return (r, o) => (a(), c("div", {
			"data-testid": "block-preview-canvas",
			class: "tpl:pointer-events-none tpl:mx-auto tpl:select-none tpl:rounded-lg",
			style: n({
				width: `${V.value}px`,
				transition: d(I),
				backgroundColor: "var(--tpl-canvas-bg)",
				boxShadow: "var(--tpl-shadow-sm)",
				...H.value
			})
		}, [(a(!0), c(f, null, t(B.value, (t) => (a(), c("div", {
			key: t.id,
			style: n(d(_)(t))
		}, [(a(), u(i(W(t)), {
			block: t,
			viewport: e.viewport
		}, null, 8, ["block", "viewport"]))], 4))), 128))], 4));
	}
}), V = /* @__PURE__ */ e({ default: () => H }), H = B;
//#endregion
export { V as n, H as t };
