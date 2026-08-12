import { $ as e, A as t, B as n, D as r, Dt as i, E as a, Et as o, H as s, I as c, J as l, K as u, N as d, O as f, Ot as p, R as m, T as h, W as g, Y as _, Z as v, _ as y, c as b, d as x, et as S, g as C, h as w, j as T, k as E, l as D, m as O, nt as k, q as A, r as j, rt as ee, s as M, tt as te, u as N, v as ne, w as re, x as P, y as ie, z as ae } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { c as F, o as oe, s as se } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { t as ce } from "./upload-WvZGBySw.js";
import { A as le, B as ue, C as de, D as fe, E as pe, F as me, I as he, L as ge, M as _e, N as ve, O as ye, P as be, R as xe, S as Se, T as Ce, V as we, _ as Te, a as Ee, b as De, c as Oe, d as ke, f as Ae, g as je, h as Me, i as Ne, j as Pe, l as Fe, m as Ie, n as Le, o as Re, p as ze, r as Be, t as Ve, u as He, v as Ue, w as We, x as Ge, y as Ke, z as qe } from "./dist-CQ0fVBQ3.js";
import { f as Je, g as Ye, h as Xe, m as Ze } from "./dist-DDfXShPv.js";
import { a as Qe, c as $e, d as et, i as tt, l as nt, o as rt, r as it, t as at, u as ot } from "./usePopoverPosition-D93u-EZm.js";
import { A as st, B as ct, C as lt, D as ut, E as dt, F as ft, G as pt, H as mt, I as ht, L as gt, M as _t, N as vt, O as yt, P as bt, S as xt, T as St, U as Ct, V as wt, W as Tt, _ as Et, a as Dt, b as Ot, c as kt, f as At, g as jt, h as Mt, j as Nt, k as Pt, m as Ft, n as It, o as Lt, p as Rt, r as zt, s as Bt, u as Vt, v as Ht, w as Ut, x as Wt, y as Gt } from "./keys-BI6VSUh4.js";
import { t as Kt } from "./useI18n-BkHfCWC6.js";
import { t as I } from "./createLucideIcon-D7GKhya2.js";
import { t as qt } from "./loader-circle-GADaYcyQ.js";
import { t as Jt } from "./message-circle-B62fdo0b.js";
import { t as Yt } from "./trash-2-BoNT8wbq.js";
import { t as Xt } from "./triangle-alert-CiN0ssB3.js";
import { t as Zt } from "./LoadingTrack-DH3OEM3z.js";
import { t as Qt } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import "./useCloudI18n-KgIWl-IE.js";
import { t as $t } from "./useMergeTag-CZ4XYAxu.js";
import { t as en } from "./useAliveFlag-eT67QCMf.js";
//#region ../core/dist/index.js
function tn(e) {
	return e === "1" ? 1 : e === "3" ? 3 : 2;
}
function nn(e) {
	let t = A({
		content: e.content ?? ze(e.defaultFontFamily, e.templateDefaults),
		selectedBlockId: null,
		viewport: "desktop",
		darkMode: !1,
		previewMode: !1,
		isDirty: !1,
		uiTheme: "auto"
	}), r = n({
		get: () => t.content,
		set: (e) => {
			t.content = e, t.isDirty = !0;
		}
	}), i = n(() => t.selectedBlockId ? a(t.content.blocks, t.selectedBlockId) : null);
	function a(e, t) {
		for (let n of e) {
			if (n.id === t) return n;
			if (n.type === "section") for (let e of n.children) {
				let n = a(e, t);
				if (n) return n;
			}
		}
		return null;
	}
	function o(e, t) {
		if (t.add(e.id), e.type === "section") for (let n of e.children) for (let e of n) o(e, t);
	}
	function s(e, t, n = { blocks: e }) {
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (i.id === t) return n;
			if (i.type === "section") for (let e = 0; e < i.children.length; e++) {
				let n = s(i.children[e], t, {
					blocks: i.children[e],
					sectionId: i.id,
					columnIndex: e
				});
				if (n) return n;
			}
		}
		return null;
	}
	function c(t) {
		return e.lockedBlocks?.value.has(t) ?? !1;
	}
	function u(e) {
		let n = s(t.content.blocks, e);
		if (!n) return null;
		let r = n.blocks.findIndex((t) => t.id === e);
		return r === -1 ? null : {
			targetSectionId: n.sectionId,
			columnIndex: n.columnIndex,
			index: r
		};
	}
	function d(e, n = !0) {
		t.content = e, n && (t.isDirty = !0);
	}
	function f(e) {
		e && c(e) || (t.selectedBlockId = e);
	}
	function p(e) {
		t.viewport = e;
	}
	function m(e) {
		t.darkMode = e;
	}
	function h(e) {
		t.uiTheme = e;
	}
	function g(e) {
		t.previewMode = e, e && (t.selectedBlockId = null);
	}
	function _(e, n) {
		if (c(e)) return;
		let r = a(t.content.blocks, e);
		r && (Object.assign(r, n), t.isDirty = !0);
	}
	function v(e) {
		t.content.settings = {
			...t.content.settings,
			...e
		}, t.isDirty = !0;
	}
	function y(e, n, r = 0, i) {
		if (!(n && e.type === "section")) {
			if (n) {
				if (c(n)) return;
				let o = a(t.content.blocks, n);
				if (o && o.type === "section") {
					if (r < 0 || r >= tn(o.columns)) return;
					o.children[r] = o.children[r] || [];
					let t = o.children[r];
					i !== void 0 && i < t.length ? t.splice(i, 0, e) : t.push(e);
				}
			} else i !== void 0 && i < t.content.blocks.length ? t.content.blocks.splice(i, 0, e) : t.content.blocks.push(e);
			t.isDirty = !0;
		}
	}
	function b(e) {
		if (c(e)) return;
		let n = s(t.content.blocks, e);
		if (n) {
			let r = n.blocks.findIndex((t) => t.id === e);
			if (r !== -1) {
				let [e] = n.blocks.splice(r, 1);
				if (t.selectedBlockId) {
					let n = /* @__PURE__ */ new Set();
					o(e, n), n.has(t.selectedBlockId) && (t.selectedBlockId = null);
				}
				t.isDirty = !0;
			}
		}
	}
	function x(e, n, r, i = 0) {
		if (c(e) || r && c(r)) return;
		let o = s(t.content.blocks, e);
		if (!o) return;
		let l = o.blocks.findIndex((t) => t.id === e);
		if (l === -1 || r && o.blocks[l].type === "section") return;
		let u;
		if (r) {
			let e = a(t.content.blocks, r);
			if (!e || e.type !== "section" || i < 0 || i >= tn(e.columns)) return;
			e.children[i] = e.children[i] || [], u = e.children[i];
		} else u = t.content.blocks;
		let [d] = o.blocks.splice(l, 1);
		u.splice(n, 0, d), t.isDirty = !0;
	}
	function S() {
		t.isDirty = !0;
	}
	return {
		state: l(t),
		content: r,
		selectedBlock: i,
		isBlockLocked: c,
		setContent: d,
		selectBlock: f,
		setViewport: p,
		setDarkMode: m,
		setUiTheme: h,
		setPreviewMode: g,
		updateBlock: _,
		updateSettings: v,
		addBlock: y,
		removeBlock: b,
		moveBlock: x,
		markDirty: S,
		findBlockLocation: u
	};
}
var rn = 50, an = 300, on = 1500;
function sn(e) {
	let { content: t, setContent: r, isRemoteOperation: i, maxSize: a = rn } = e, o = _([]), s = _([]), c = _(!1), l = null, u = null, d = n(() => o.value.length > 0), f = n(() => s.value.length > 0);
	function p() {
		return qe(t.value);
	}
	function m(e) {
		o.value.push(e), o.value.length > a && o.value.splice(0, o.value.length - a);
	}
	function h() {
		u &&= (clearTimeout(u.timeoutId), null);
	}
	function g() {
		i?.() || (h(), m(p()), s.value = []);
	}
	function v(e) {
		if (!i?.()) {
			if (u && u.blockId === e) {
				clearTimeout(u.timeoutId), u.timeoutId = setTimeout(() => {
					u = null;
				}, an);
				return;
			}
			h(), m(p()), s.value = [], u = {
				blockId: e,
				timeoutId: setTimeout(() => {
					u = null;
				}, an)
			};
		}
	}
	function y() {
		c.value = !0, l && clearTimeout(l), l = setTimeout(() => {
			c.value = !1, l = null;
		}, on);
	}
	function b() {
		if (o.value.length === 0) return;
		h();
		let e = o.value.pop();
		s.value.push(p()), r(e, !0), y();
	}
	function x() {
		if (s.value.length === 0) return;
		h();
		let e = s.value.pop();
		o.value.push(p()), r(e, !0), y();
	}
	function S() {
		o.value = [], s.value = [], h();
	}
	function C() {
		S(), l &&= (clearTimeout(l), null);
	}
	return {
		canUndo: d,
		canRedo: f,
		isNavigating: c,
		undo: b,
		redo: x,
		record: g,
		recordDebounced: v,
		clear: S,
		destroy: C
	};
}
function cn(e) {
	e.type === "table" ? e.rows = e.rows.map((e) => ({
		...e,
		id: Ce(),
		cells: e.cells.map((e) => ({
			...e,
			id: Ce()
		}))
	})) : e.type === "social" ? e.icons = e.icons.map((e) => ({
		...e,
		id: Ce()
	})) : e.type === "menu" && (e.items = e.items.map((e) => ({
		...e,
		id: Ce()
	})));
}
function ln(e) {
	let { addBlock: t, removeBlock: n, updateBlock: r, selectBlock: i, findBlockLocation: a } = e;
	function o(n, r, a) {
		let o = Fe(n, e.blockDefaults);
		return t(o, r, a), i(o.id), o;
	}
	function s(e, n, r) {
		let o = JSON.parse(JSON.stringify(e));
		if (o.id = Ce(), cn(o), o.type === "section" && (o.children = o.children.map((e) => e.map((e) => {
			let t = JSON.parse(JSON.stringify(e));
			return t.id = Ce(), cn(t), t;
		}))), n !== void 0 || r !== void 0) t(o, n, r);
		else {
			let i = a?.(e.id) ?? null;
			i ? t(o, i.targetSectionId, i.columnIndex, i.index + 1) : t(o, n, r);
		}
		return i(o.id), o;
	}
	function c(e) {
		n(e);
	}
	function l(e, t, n) {
		r(e, { [t]: n });
	}
	return {
		createAndAddBlock: o,
		duplicateBlock: s,
		deleteBlock: c,
		updateBlockProperty: l
	};
}
function un(e) {
	let { content: t, isDirty: n, onChange: r, debounce: i = 1e3, enabled: a = !0 } = e, o = null, s = !1;
	function c() {
		return typeof a == "function" ? a() : a;
	}
	function l() {
		s = !0, d();
	}
	function u() {
		s = !1;
	}
	function d() {
		o &&= (clearTimeout(o), null);
	}
	function f() {
		d(), n() && r(JSON.parse(JSON.stringify(t.value)));
	}
	function p() {
		!c() || s || (d(), o = setTimeout(() => {
			o = null, c() && !s && n() && r(JSON.parse(JSON.stringify(t.value)));
		}, i));
	}
	let m = ee(t, () => {
		c() && !s && n() && p();
	}, { deep: !0 });
	function h() {
		m(), d();
	}
	return {
		flush: f,
		cancel: d,
		pause: l,
		resume: u,
		destroy: h
	};
}
function dn(e) {
	let t = A(/* @__PURE__ */ new Set()), r = n(() => t.size > 0);
	function i(e) {
		return t.has(e);
	}
	function a(n) {
		t.has(n) ? t.delete(n) : (t.add(n), e.state.selectedBlockId === n && e.selectBlock(null));
	}
	function o() {
		t.clear();
	}
	return {
		isHidden: i,
		toggleBlock: a,
		reset: o,
		hasHiddenBlocks: r
	};
}
function fn(e) {
	let t = _(!1), r = _(!1), i = n(() => !!e.definition.value?.dataSource), a = n(() => i.value && !e.block.value.dataSourceFetched);
	async function o() {
		let n = e.definition.value;
		if (n?.dataSource) {
			t.value = !0, r.value = !1;
			try {
				let t = await n.dataSource.onFetch({
					fieldValues: { ...e.block.value.fieldValues },
					blockId: e.block.value.id
				});
				if (t == null) return;
				let r = { ...e.block.value.fieldValues };
				for (let e of Object.keys(r)) e in t && (r[e] = t[e]);
				e.onUpdate(r, !0);
			} catch (e) {
				console.warn("[Templatical] Data source fetch error:", e), r.value = !0;
			} finally {
				t.value = !1;
			}
		}
	}
	return {
		isFetching: t,
		fetchError: r,
		fetch: o,
		hasDataSource: i,
		needsFetch: a
	};
}
function pn(e, t) {
	let n = e.addBlock, r = e.removeBlock, i = e.moveBlock, a = e.updateBlock, o = e.updateSettings;
	e.addBlock = (r, i, a, o) => {
		i && e.isBlockLocked(i) || (t.record(), n(r, i, a, o));
	}, e.removeBlock = (n) => {
		e.isBlockLocked(n) || (t.record(), r(n));
	}, e.moveBlock = (n, r, a, o) => {
		e.isBlockLocked(n) || a && e.isBlockLocked(a) || (t.record(), i(n, r, a, o));
	}, e.updateBlock = (n, r) => {
		e.isBlockLocked(n) || (t.recordDebounced(n), a(n, r));
	}, e.updateSettings = (e) => {
		t.record(), o(e);
	};
}
function mn(e) {
	let { provider: t } = e, n = _([]), r = _(!1), i = M(() => {
		let e = /* @__PURE__ */ new Set();
		for (let t of n.value) {
			let n = t.category?.trim();
			n && e.add(n);
		}
		return [...e].sort((e, t) => e.localeCompare(t));
	}), a = M(() => typeof t.create == "function"), o = M(() => typeof t.update == "function"), s = M(() => typeof t.delete == "function");
	function c(e) {
		return o.value && e.canUpdate !== !1;
	}
	function l(e) {
		return s.value && e.canDelete !== !1;
	}
	function u(e, t) {
		throw new Re(`[Templatical] Saved blocks: ${e} is ${t}. Check the capability before calling — the editor's own UI hides the action.`);
	}
	async function d(i) {
		r.value = !0;
		try {
			n.value = await t.list(i);
		} catch (t) {
			throw e.onError?.(t), t;
		} finally {
			r.value = !1;
		}
	}
	async function f(r, i, a) {
		let { create: o } = t;
		typeof o != "function" && u("create", "disabled by the provider");
		try {
			let e = await o(a ? {
				name: r,
				content: i,
				category: a
			} : {
				name: r,
				content: i
			});
			return n.value = [e, ...n.value], e;
		} catch (t) {
			throw e.onError?.(t), t;
		}
	}
	async function p(r, i) {
		let { update: a } = t;
		typeof a != "function" && u("update", "disabled by the provider");
		let o = n.value.find((e) => e.id === r);
		o && o.canUpdate === !1 && u("update", `not permitted for entry "${r}"`);
		try {
			let e = await a(r, i);
			return n.value = n.value.map((t) => t.id === r ? e : t), e;
		} catch (t) {
			throw e.onError?.(t), t;
		}
	}
	async function m(r) {
		let { delete: i } = t;
		typeof i != "function" && u("delete", "disabled by the provider");
		let a = n.value.find((e) => e.id === r);
		a && a.canDelete === !1 && u("delete", `not permitted for entry "${r}"`);
		try {
			await i(r), n.value = n.value.filter((e) => e.id !== r);
		} catch (t) {
			throw e.onError?.(t), t;
		}
	}
	return {
		savedBlocks: n,
		isLoading: r,
		categories: i,
		canCreate: a,
		canUpdate: o,
		canDelete: s,
		canUpdateBlock: c,
		canDeleteBlock: l,
		load: d,
		create: f,
		update: p,
		remove: m
	};
}
var hn = "templatical:saved-blocks";
function gn(e = {}) {
	let t = e.key ?? hn;
	function n() {
		if (typeof localStorage > "u") throw Error("[Templatical] createLocalStorageSavedBlocksProvider requires a browser environment with localStorage. Supply your own SavedBlocksProvider for server-side or non-browser use.");
		return localStorage;
	}
	function r() {
		let e = n().getItem(t);
		if (!e) return [];
		try {
			let t = JSON.parse(e);
			return Array.isArray(t) ? t : [];
		} catch {
			return [];
		}
	}
	function i(e) {
		n().setItem(t, JSON.stringify(e));
	}
	return {
		async list(e) {
			let t = r(), n = e?.search?.trim().toLowerCase(), i = e?.category?.trim();
			return t.filter((e) => !(n && !e.name.toLowerCase().includes(n) || i && e.category !== i));
		},
		async create(e) {
			let t = (/* @__PURE__ */ new Date()).toISOString(), n = {
				id: Ce(),
				name: e.name,
				content: e.content,
				...e.category ? { category: e.category } : {},
				createdAt: t,
				updatedAt: t
			};
			return i([n, ...r()]), n;
		},
		async update(e, t) {
			let n = r(), a = n.findIndex((t) => t.id === e);
			if (a === -1) throw Error(`[Templatical] Saved block not found: ${e}`);
			let o = {
				...n[a],
				...t,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}, s = [...n];
			return s[a] = o, i(s), o;
		},
		async delete(e) {
			let t = r();
			if (!t.some((t) => t.id === e)) throw Error(`[Templatical] Saved block not found: ${e}`);
			i(t.filter((t) => t.id !== e));
		}
	};
}
//#endregion
//#region src/utils/activeEditorTracker.ts
var _n = /* @__PURE__ */ new Set(), vn = 0, yn = 0;
function bn() {
	let e = ++yn;
	return _n.add(e), vn === 0 && (vn = e), {
		id: e,
		isActive: () => _n.size <= 1 || vn === e,
		claim: () => {
			vn = e;
		},
		dispose: () => {
			if (_n.delete(e), vn === e) {
				let e = Array.from(_n);
				vn = e[e.length - 1] ?? 0;
			}
		}
	};
}
//#endregion
//#region src/composables/usePreviewResolution.ts
var xn = 500;
function Sn(e) {
	let t = typeof e.resolvePreview == "function", n = _(null), r = _(!1), i = _(!1), a = 0, o = null;
	function s() {
		o !== null && (clearTimeout(o), o = null);
	}
	async function l() {
		let t = e.resolvePreview;
		if (!t) return;
		let o = ++a;
		r.value = !0;
		let s = {
			content: qe(e.getContent()),
			...e.getRecipient?.() === void 0 ? {} : { recipient: e.getRecipient() }
		};
		try {
			let e = await t(s);
			if (o !== a) return;
			if (!me(e)) {
				i.value = !0;
				return;
			}
			n.value = e, i.value = !1;
		} catch {
			if (o !== a) return;
			i.value = !0;
		} finally {
			o === a && (r.value = !1);
		}
	}
	function d() {
		if (t) {
			if (s(), n.value === null) {
				l();
				return;
			}
			o = setTimeout(() => {
				o = null, l();
			}, xn);
		}
	}
	return c(() => [e.isActive(), e.getRecipient?.()], ([e]) => {
		if (!e) {
			s(), a++, r.value = !1, n.value = null, i.value = !1;
			return;
		}
		d();
	}, { immediate: !0 }), u(() => {
		s(), a++;
	}), {
		isConfigured: t,
		content: M(() => n.value ?? e.getContent()),
		isResolving: r,
		isInitialResolve: M(() => r.value && n.value === null),
		hasFailed: i,
		supersedesSamples: M(() => t)
	};
}
//#endregion
//#region src/composables/useImageUrlResolver.ts
function Cn(e) {
	let t = A(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set();
	function r(e) {
		return t.get(e);
	}
	function i(e) {
		return t.has(e) || n.has(e);
	}
	function a(r) {
		if (i(r)) return;
		let a;
		try {
			a = e(r);
		} catch {
			t.set(r, null);
			return;
		}
		if (a === null || typeof a == "string") {
			t.set(r, a);
			return;
		}
		n.add(r), Promise.resolve(a).then((e) => {
			t.set(r, typeof e == "string" ? e : null);
		}, () => {
			t.set(r, null);
		}).finally(() => n.delete(r));
	}
	return {
		get: r,
		has: i,
		lookup: a
	};
}
function wn(e) {
	let t = P(Wt, null), n = M(e);
	if (!t) return n;
	let r;
	function i() {
		r !== void 0 && (clearTimeout(r), r = void 0);
	}
	s() && u(i);
	let a = !0;
	return c(n, (e) => {
		i();
		let n = a;
		if (a = !1, !(!e || t.has(e))) {
			if (n) {
				t.lookup(e);
				return;
			}
			r = setTimeout(() => {
				r = void 0, t.lookup(e);
			}, 300);
		}
	}, { immediate: !0 }), M(() => {
		let e = n.value;
		if (!e) return e;
		let r = t.get(e);
		return typeof r == "string" && r.length > 0 ? r : e;
	});
}
//#endregion
//#region src/composables/useMergeTagPicker.ts
function Tn() {
	let e = _(!1), t = _([]), n = null;
	function r(r) {
		if (n) {
			let e = n;
			n = null, e(null);
		}
		return t.value = r, e.value = !0, new Promise((e) => {
			n = e;
		});
	}
	function i(r) {
		let i = n;
		n = null, e.value = !1, t.value = [], i && i(r);
	}
	return s() && u(() => {
		if (n) {
			let e = n;
			n = null, e(null);
		}
		e.value = !1, t.value = [];
	}), {
		isOpen: e,
		tags: t,
		open: r,
		resolve: i
	};
}
//#endregion
//#region src/composables/useLogicTagPicker.ts
function En() {
	let e = _(!1), t = _([]), n = _([]), r = null;
	function i(i, a) {
		if (r) {
			let e = r;
			r = null, e(null);
		}
		return t.value = i, n.value = a, e.value = !0, new Promise((e) => {
			r = e;
		});
	}
	function a(i) {
		let a = r;
		r = null, e.value = !1, t.value = [], n.value = [], a && a(i);
	}
	return s() && u(() => {
		if (r) {
			let e = r;
			r = null, e(null);
		}
		e.value = !1, t.value = [], n.value = [];
	}), {
		isOpen: e,
		tags: t,
		pairs: n,
		open: i,
		resolve: a
	};
}
//#endregion
//#region src/composables/useTemplateLint.ts
function Dn(e) {
	return e ? e.disabled === !0 || e.accessibility === !1 && e.structure === !1 && e.links === !1 : !1;
}
function On(e) {
	let t = _([]), n = _(!1), r = _(!1), i = v(null), a = Dn(e.options), o = null, s = !1;
	a || l();
	async function l() {
		try {
			let t = await import("@templatical/quality");
			if (s) return;
			i.value = { lintTemplate: t.lintTemplate }, n.value = !0, u(), o = Ye(e.content, u, {
				debounce: e.debounce ?? 500,
				deep: !0
			});
		} catch {
			if (s) return;
			r.value = !0;
		}
	}
	function u() {
		i.value && (t.value = i.value.lintTemplate(e.content.value, e.options));
	}
	let d = c(() => e.options, () => {
		i.value && u();
	}, { deep: !0 });
	function f(t) {
		t.fix && t.fix.apply({
			updateBlock: e.updateBlock,
			updateSettings: e.updateSettings,
			removeBlock: e.removeBlock
		});
	}
	function p() {
		s = !0, o?.(), d();
	}
	return {
		issues: t,
		ready: n,
		unavailable: r,
		applyFix: f,
		destroy: p
	};
}
//#endregion
//#region src/utils/blockTypeLabels.ts
function kn(e, t) {
	return t.blocks[e] ?? e;
}
function An(e, t, n = []) {
	if (e.type !== "custom") return kn(e.type, t);
	let { customType: r } = e;
	return n.find((e) => e.type === r)?.name ?? r;
}
//#endregion
//#region src/composables/useKeyboardReorder.ts
function jn(e, t, n = []) {
	let r = _(null), i = _(""), a = null;
	function o(t) {
		let n = e.content.value.blocks, r = n.findIndex((e) => e.id === t);
		if (r !== -1) return {
			index: r,
			total: n.length
		};
		for (let e of n) {
			if (e.type !== "section") continue;
			let n = e;
			for (let e = 0; e < n.children.length; e++) {
				let r = n.children[e], i = r.findIndex((e) => e.id === t);
				if (i !== -1) return {
					index: i,
					total: r.length,
					sectionId: n.id,
					columnIndex: e
				};
			}
		}
		return null;
	}
	function s(r) {
		let i = o(r);
		if (!i) return "";
		let a = (i.sectionId ? c(i.sectionId, i.columnIndex ?? 0) : e.content.value.blocks)?.[i.index];
		return a ? An(a, t.t, n) : "";
	}
	function c(t, n) {
		return e.content.value.blocks.find((e) => e.id === t && e.type === "section")?.children[n] ?? null;
	}
	function l(e) {
		i.value = "", queueMicrotask(() => {
			i.value = e;
		});
	}
	function u(e) {
		return r.value === e;
	}
	function d(e) {
		let n = o(e);
		n && (r.value = e, a = n, l(t.format(t.t.blockActions.lifted, {
			block: s(e),
			position: String(n.index + 1),
			total: String(n.total)
		})));
	}
	function f(n, r) {
		let i = o(n);
		if (!i) return;
		let a = i.index + r;
		a < 0 || a >= i.total || (e.moveBlock(n, a, i.sectionId, i.columnIndex), l(t.format(t.t.blockActions.moved, {
			block: s(n),
			position: String(a + 1),
			total: String(i.total)
		})));
	}
	function p(e) {
		f(e, -1);
	}
	function m(e) {
		f(e, 1);
	}
	function h(e) {
		let n = o(e);
		n && l(t.format(t.t.blockActions.dropped, {
			block: s(e),
			position: String(n.index + 1),
			total: String(n.total)
		})), r.value = null, a = null;
	}
	function g() {
		let n = r.value;
		if (n && a) {
			let r = o(n), i = !!r && (r.sectionId !== a.sectionId || r.columnIndex !== a.columnIndex), c = !!r && r.index !== a.index;
			r && (i || c) && e.moveBlock(n, a.index, a.sectionId, a.columnIndex), l(t.format(t.t.blockActions.cancelled, {
				block: s(n),
				position: String(a.index + 1)
			}));
		}
		r.value = null, a = null;
	}
	return {
		liftedBlockId: r,
		announcement: i,
		isLifted: u,
		lift: d,
		cancel: g,
		moveUp: p,
		moveDown: m,
		drop: h
	};
}
//#endregion
//#region src/composables/useUiTheme.ts
function Mn(e) {
	let t = et("(prefers-color-scheme: dark)");
	return { resolvedTheme: M(() => e.value === "auto" ? t.value ? "dark" : "light" : e.value) };
}
//#endregion
//#region src/composables/useThemeStyles.ts
var Nn = {
	bg: "--tpl-bg",
	bgElevated: "--tpl-bg-elevated",
	bgHover: "--tpl-bg-hover",
	bgActive: "--tpl-bg-active",
	border: "--tpl-border",
	borderLight: "--tpl-border-light",
	text: "--tpl-text",
	textMuted: "--tpl-text-muted",
	textDim: "--tpl-text-dim",
	primary: "--tpl-primary",
	primaryHover: "--tpl-primary-hover",
	primaryLight: "--tpl-primary-light",
	secondary: "--tpl-secondary",
	secondaryHover: "--tpl-secondary-hover",
	secondaryLight: "--tpl-secondary-light",
	success: "--tpl-success",
	successLight: "--tpl-success-light",
	warning: "--tpl-warning",
	warningLight: "--tpl-warning-light",
	danger: "--tpl-danger",
	dangerLight: "--tpl-danger-light",
	canvasBg: "--tpl-canvas-bg"
};
function Pn({ themeOverrides: e, resolvedTheme: t, extraStyles: n }) {
	return { themeStyles: M(() => {
		let r = {}, i = e.value, a = t.value === "dark" ? i.dark : i;
		if (a) for (let [e, t] of Object.entries(Nn)) {
			let n = a[e];
			n && (r[t] = n);
		}
		return n && Object.assign(r, n()), r;
	}) };
}
//#endregion
//#region src/utils/logger.ts
var Fn = "[Templatical]";
function In() {
	return typeof process < "u" && process.env.NODE_ENV === "production";
}
var Ln = {
	warn(...e) {
		console.warn(Fn, ...e);
	},
	error(...e) {
		console.error(Fn, ...e);
	},
	debug(...e) {
		In() || console.debug(Fn, ...e);
	},
	info(...e) {
		In() || console.info(Fn, ...e);
	}
};
//#endregion
//#region src/composables/useBlockRegistry.ts
function Rn() {
	let e = v(/* @__PURE__ */ new Map());
	function t(t, n) {
		e.value.set(t, n), te(e);
	}
	function n(t, n) {
		let r = `custom:${t.type}`, i = {
			component: n,
			createBlock: () => Ae(t),
			definition: t
		};
		e.value.set(r, i), te(e);
	}
	function r(t) {
		if (t.type === "custom") {
			let n = `custom:${t.customType}`;
			return e.value.get(n)?.component;
		}
		return e.value.get(t.type)?.component;
	}
	function i(t) {
		return e.value.get(t)?.createBlock();
	}
	function a(t) {
		let n = `custom:${t}`;
		return e.value.get(n)?.definition;
	}
	function o(e) {
		return `<div style="color: var(--tpl-text-muted); padding: 16px; text-align: center; border: 1px dashed var(--tpl-border); border-radius: var(--tpl-radius-sm); font-family: var(--tpl-font-family); font-size: 14px;">${e}</div>`;
	}
	async function s(e) {
		let t = a(e.customType);
		if (!t) return o("Block definition not found");
		try {
			let { Liquid: n } = await import("./liquid.browser-BECWFL5Z.js");
			return await new n({
				strictVariables: !1,
				strictFilters: !1
			}).parseAndRender(t.template, e.fieldValues);
		} catch (t) {
			return Ln.error(`Failed to render custom block "${e.customType}":`, t), o(`Render error: ${e.customType}`);
		}
	}
	function c(t) {
		return e.value.has(t);
	}
	return {
		registerBuiltIn: t,
		registerCustom: n,
		getComponent: r,
		createBlock: i,
		getDefinition: a,
		renderCustomBlock: s,
		isRegistered: c
	};
}
//#endregion
//#region src/composables/useCustomBlockStylesheets.ts
function zn(e, t) {
	return M(() => {
		let n = Bn(e.value.blocks);
		if (n.size === 0) return [];
		let r = /* @__PURE__ */ new Set(), i = [];
		for (let e of n) {
			let n = t.getDefinition(e)?.stylesheet;
			if (!n) continue;
			let a = n.trim();
			a === "" || r.has(a) || (r.add(a), i.push(a));
		}
		return i;
	});
}
function Bn(e) {
	let t = /* @__PURE__ */ new Set();
	return Vn(e, t), t;
}
function Vn(e, t) {
	for (let n of e) {
		if (_e(n)) {
			t.add(n.customType);
			continue;
		}
		if (n.type === "section") {
			let e = n.children;
			if (!e) continue;
			for (let n of e) Vn(n, t);
		}
	}
}
//#endregion
//#region src/utils/registerBuiltInBlocks.ts
var Hn = [
	{
		type: "section",
		createBlock: Ke
	},
	{
		type: "title",
		createBlock: de
	},
	{
		type: "paragraph",
		createBlock: Ue
	},
	{
		type: "image",
		createBlock: je
	},
	{
		type: "button",
		createBlock: He
	},
	{
		type: "divider",
		createBlock: Ie
	},
	{
		type: "video",
		createBlock: We
	},
	{
		type: "social",
		createBlock: De
	},
	{
		type: "menu",
		createBlock: Te
	},
	{
		type: "table",
		createBlock: Se
	},
	{
		type: "spacer",
		createBlock: Ge
	},
	{
		type: "html",
		createBlock: Me
	},
	{
		type: "countdown",
		createBlock: ke
	}
];
function Un(e, t) {
	for (let n of Hn) {
		let r = t[n.type];
		r && e.registerBuiltIn(n.type, {
			component: r,
			createBlock: n.createBlock
		});
	}
}
//#endregion
//#region src/utils/resolveHtmlBlockPreview.ts
function Wn(e) {
	return typeof e == "boolean" ? e : e?.enabled ?? !1;
}
//#endregion
//#region src/utils/collectOffPaletteDefaults.ts
function Gn(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Kn(e, t, n) {
	let r = new Set(e.map((e) => it(e))), i = [], a = (e, t) => {
		for (let [n, o] of Object.entries(e)) typeof o == "string" ? o !== "" && /color$/i.test(n) && !r.has(it(o)) && i.push(`${t}.${n}: ${o}`) : Gn(o) && a(o, `${t}.${n}`);
	}, o = t;
	for (let [e, t] of Object.entries(Ve)) {
		let n = o?.[e];
		a({
			...t,
			...Gn(n) ? n : {}
		}, e);
	}
	return a({
		...Le,
		...n ?? {}
	}, "template"), i;
}
//#endregion
//#region src/utils/resolveFieldColors.ts
function qn(e, t) {
	let n = rt({ presets: e.presets }, Qe), r = n.presets.length === 0, i = e.allowCustom ?? t.allowCustom;
	return {
		presets: r ? t.presets : n.presets,
		allowCustom: t.allowCustom !== !1 && i,
		invalidPresets: n.invalidPresets,
		emptyPresets: e.presets !== void 0 && e.presets.length === 0,
		presetsInherited: r,
		allowCustomIgnored: e.allowCustom === !0 && t.allowCustom === !1
	};
}
//#endregion
//#region src/utils/collectColorFieldIssues.ts
function Jn(e, t) {
	let n = [], r = (r, i) => {
		let a = qn(r, t), o = `custom block "${e.type}" field "${i}"`, s = (t) => `${e.type}:${i}:${t}`;
		if (a.invalidPresets.length > 0 && n.push({
			id: s("invalid-presets"),
			message: `${o}: presets skipped invalid entries: ${a.invalidPresets.join(", ")} — presets must be hex colors (#rgb or #rrggbb).` + (a.presetsInherited ? " No valid entries are left, so the field inherits colors.presets." : "")
		}), a.emptyPresets && n.push({
			id: s("empty-presets"),
			message: `${o}: presets is empty — a field palette can only narrow the editor's, so an empty list is ignored and the field inherits colors.presets.`
		}), a.allowCustomIgnored && n.push({
			id: s("allow-custom-ignored"),
			message: `${o}: allowCustom: true is ignored because colors.allowCustom is false — a field can narrow the editor-wide palette, never unlock it.`
		}), !a.allowCustom && a.presets.length > 0) {
			let e = r.default ?? "", t = new Set(a.presets.map((e) => it(e)));
			e !== "" && !t.has(it(e)) && n.push({
				id: s("off-palette-default"),
				message: `${o} locks custom colours, but its default ${e} falls outside the field's presets: ${a.presets.join(", ")}. New blocks start on a colour the picker can't reselect — set the default from the same palette.`
			});
		}
	};
	for (let t of e.fields) if (t.type === "color") r(t, t.key);
	else if (t.type === "repeatable") for (let e of t.fields) e.type === "color" && r(e, `${t.key}[].${e.key}`);
	return n;
}
//#endregion
//#region src/utils/keyboardShortcuts.ts
function Yn(e) {
	for (let t of e.composedPath()) {
		if (!(t instanceof HTMLElement)) continue;
		if (t.isContentEditable) return !0;
		let e = t.tagName;
		if (e === "INPUT" || e === "TEXTAREA" || e === "SELECT") return !0;
	}
	return !1;
}
function Xn(e, t) {
	let n = e.metaKey || e.ctrlKey;
	if (n && e.key.toLowerCase() === "s") {
		e.preventDefault(), t.onSave?.();
		return;
	}
	if (n && e.key.toLowerCase() === "z") {
		if (Yn(e)) return;
		e.preventDefault(), e.shiftKey ? t.history.redo() : (t.onBeforeUndo?.(), t.history.undo());
		return;
	}
	if (t.isPicking?.() && !Yn(e)) {
		if (e.key === "Escape") {
			e.preventDefault(), t.onCancelPick?.();
			return;
		}
		if (e.key === "Enter") {
			e.preventDefault(), t.onConfirmPick?.();
			return;
		}
		if (e.key === "Delete" || e.key === "Backspace") {
			e.preventDefault();
			return;
		}
	}
	if (e.key === "Escape") {
		t.selectBlock(null);
		return;
	}
	(e.key === "Delete" || e.key === "Backspace") && t.getSelectedBlockId() && !Yn(e) && (e.preventDefault(), t.history.record(), t.removeBlock(t.getSelectedBlockId()));
}
//#endregion
//#region src/utils/mergeTagLabelSegments.ts
function Zn(e, t, n, r = !1) {
	if (!e) return [];
	let i = RegExp(`(${n.value.source}|${n.logic.source})`, "g"), a = [], o = 0, s;
	for (; (s = i.exec(e)) !== null;) {
		s.index > o && a.push({
			type: "text",
			value: e.slice(o, s.index)
		});
		let i = s[0];
		if (be(i, n)) {
			let e = r ? ye(i, t) : void 0;
			a.push(e === void 0 ? {
				type: "tag",
				value: fe(i, t)
			} : {
				type: "text",
				value: e
			});
		} else ve(i, n) ? a.push({
			type: "tag",
			value: pe(i, n)
		}) : a.push({
			type: "text",
			value: i
		});
		o = s.index + i.length;
	}
	return o < e.length && a.push({
		type: "text",
		value: e.slice(o)
	}), a;
}
//#endregion
//#region src/components/MergeTagPreviewText.vue
var Qn = y({
	name: "MergeTagPreviewText",
	props: { text: {
		type: String,
		required: !0
	} },
	setup(e) {
		let t = P(dt, []), n = P(st, Ee.liquid), r = P(Tt, null), i = M(() => Zn(e.text, t, n, r?.value ?? !1));
		return () => i.value.map((e, t) => e.type === "tag" ? ie("span", {
			key: t,
			class: "tpl-merge-tag-label"
		}, e.value) : e.value);
	}
}), $n = { class: "tpl:text-center" }, er = ["href"], tr = /* @__PURE__ */ y({
	__name: "ButtonBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, n = M(() => {
			let e = {
				display: "inline-block",
				padding: `${t.block.buttonPadding.top}px ${t.block.buttonPadding.right}px ${t.block.buttonPadding.bottom}px ${t.block.buttonPadding.left}px`,
				backgroundColor: t.block.backgroundColor,
				color: t.block.textColor,
				fontSize: `${t.block.fontSize}px`,
				fontWeight: "bold",
				textDecoration: "none",
				borderRadius: `${t.block.borderRadius}px`,
				textAlign: "center"
			};
			return t.block.fontFamily && (e.fontFamily = t.block.fontFamily), t.block.width === "full" ? (e.display = "block", e.width = "100%", e.boxSizing = "border-box") : typeof t.block.width == "number" && (e.width = `${t.block.width}px`, e.boxSizing = "border-box"), e;
		});
		return (t, r) => (f(), x("div", $n, [b("a", {
			href: e.block.url || "#",
			style: i(n.value),
			class: "tpl:cursor-default",
			onClick: r[0] ||= F(() => {}, ["prevent"])
		}, [w(Qn, { text: e.block.text }, null, 8, ["text"])], 12, er)]));
	}
}), nr = I("bookmark", [["path", {
	d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
	key: "oz39mx"
}]]), rr = I("box", [
	["path", {
		d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
		key: "hh9hay"
	}],
	["path", {
		d: "m3.3 7 8.7 5 8.7-5",
		key: "g66t2b"
	}],
	["path", {
		d: "M12 22V12",
		key: "d0xqtd"
	}]
]), ir = I("code", [["path", {
	d: "m16 18 6-6-6-6",
	key: "eg8j8"
}], ["path", {
	d: "m8 6-6 6 6 6",
	key: "ppft3o"
}]]), ar = I("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]), or = I("eye-off", [
	["path", {
		d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
		key: "ct8e1f"
	}],
	["path", {
		d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
		key: "151rxh"
	}],
	["path", {
		d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
		key: "13bj9a"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]), sr = I("funnel", [["path", {
	d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
	key: "sc7q7i"
}]]), cr = I("grip-vertical", [
	["circle", {
		cx: "9",
		cy: "12",
		r: "1",
		key: "1vctgf"
	}],
	["circle", {
		cx: "9",
		cy: "5",
		r: "1",
		key: "hp0tcf"
	}],
	["circle", {
		cx: "9",
		cy: "19",
		r: "1",
		key: "fkjjf6"
	}],
	["circle", {
		cx: "15",
		cy: "12",
		r: "1",
		key: "1tmaij"
	}],
	["circle", {
		cx: "15",
		cy: "5",
		r: "1",
		key: "19l28e"
	}],
	["circle", {
		cx: "15",
		cy: "19",
		r: "1",
		key: "f4zoj3"
	}]
]), lr = I("image", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2",
		key: "1m3agn"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}]
]), ur = I("navigation", [["polygon", {
	points: "3 11 22 2 13 21 11 13 3 11",
	key: "1ltx0t"
}]]), dr = I("puzzle", [["path", {
	d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
	key: "w46dr5"
}]]), fr = I("share-2", [
	["circle", {
		cx: "18",
		cy: "5",
		r: "3",
		key: "gq8acd"
	}],
	["circle", {
		cx: "6",
		cy: "12",
		r: "3",
		key: "w7nqdw"
	}],
	["circle", {
		cx: "18",
		cy: "19",
		r: "3",
		key: "1xt0gg"
	}],
	["line", {
		x1: "8.59",
		x2: "15.42",
		y1: "13.51",
		y2: "17.49",
		key: "47mynk"
	}],
	["line", {
		x1: "15.41",
		x2: "8.59",
		y1: "6.51",
		y2: "10.49",
		key: "1n3mei"
	}]
]), pr = I("table", [
	["path", {
		d: "M12 3v18",
		key: "108xh3"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}],
	["path", {
		d: "M3 9h18",
		key: "1pudct"
	}],
	["path", {
		d: "M3 15h18",
		key: "5xshup"
	}]
]), mr = I("video", [["path", {
	d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
	key: "ftymec"
}], ["rect", {
	x: "2",
	y: "6",
	width: "14",
	height: "12",
	rx: "2",
	key: "158x01"
}]]), hr = ["innerHTML"], gr = [
	"src",
	"width",
	"height"
], _r = /* @__PURE__ */ y({
	__name: "CustomBlockIcon",
	props: {
		icon: {},
		size: {}
	},
	setup(e) {
		let t = e, n = M(() => t.size ?? 20), r = M(() => t.icon && (t.icon.trimStart().startsWith("<svg") || t.icon.trimStart().startsWith("<SVG"))), a = M(() => t.icon && !r.value && (t.icon.startsWith("http") || t.icon.startsWith("/")));
		return (t, o) => r.value ? (f(), x("span", {
			key: 0,
			class: "tpl:inline-flex tpl:items-center tpl:justify-center",
			style: i({
				width: `${n.value}px`,
				height: `${n.value}px`
			}),
			innerHTML: e.icon
		}, null, 12, hr)) : a.value ? (f(), x("img", {
			key: 1,
			src: e.icon,
			width: n.value,
			height: n.value,
			class: "tpl:inline-block",
			alt: ""
		}, null, 8, gr)) : (f(), D(k(rr), {
			key: 2,
			size: n.value,
			"stroke-width": 1.5
		}, null, 8, ["size"]));
	}
});
//#endregion
//#region src/composables/useEditorRoot.ts
function vr() {
	return P(Et, document) ?? document;
}
//#endregion
//#region src/composables/useFocusTrap.ts
var yr = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])";
function br(e, t) {
	let n = vr(), r = null, i = null, a = null;
	function o() {
		return e.value ? Array.from(e.value.querySelectorAll(yr)).filter((e) => e.offsetParent !== null) : [];
	}
	function s(e) {
		if (e.key !== "Tab") return;
		let t = o();
		if (t.length === 0) return;
		let r = t[0], i = t[t.length - 1];
		e.shiftKey ? n.activeElement === r && (e.preventDefault(), i.focus()) : n.activeElement === i && (e.preventDefault(), r.focus());
	}
	function l() {
		let t = i !== null || a !== null;
		t && d({ restoreFocus: !1 }), t || (r = n.activeElement), a = requestAnimationFrame(() => {
			a = null;
			let t = o();
			t.length > 0 && (e.value?.querySelector("[autofocus], input:not([disabled])") ?? t[0]).focus();
		}), i = ot(e, "keydown", s);
	}
	function d(e = {}) {
		let t = e.restoreFocus !== !1;
		a !== null && (typeof cancelAnimationFrame < "u" && cancelAnimationFrame(a), a = null), i?.(), i = null, t && r && r.focus && (r.focus(), r = null);
	}
	let f = c([t, e], ([e, t]) => {
		e && t ? l() : d();
	}, { flush: "post" });
	u(() => {
		f(), d();
	});
}
//#endregion
//#region src/composables/useEmoji.ts
function xr() {
	let [e, t] = Xe(!1), n = v([]), r = !1;
	u(() => {
		r = !0;
	}), c(e, async (e) => {
		if (e && n.value.length === 0) {
			let { emojiCategories: e } = await import("./emojiData-6m0DBh7O.js");
			if (r) return;
			n.value = e;
		}
	});
	function i() {
		t();
	}
	function a() {
		e.value = !1;
	}
	return {
		categories: n,
		isOpen: e,
		toggle: i,
		close: a
	};
}
//#endregion
//#region src/composables/useDragDrop.ts
function Sr(e) {
	let { onBlockMove: t, onBlockAdd: n } = e, r = _(!1), i = _(null), a = _(null);
	function o(e) {
		r.value = !0, i.value = e;
	}
	function s() {
		r.value = !1, i.value = null, a.value = null;
	}
	function c(e) {
		a.value = e;
	}
	function l(e, r, a, o) {
		i.value && (e.findIndex((e) => e.id === i.value.id) === -1 ? n(i.value, a, o) : t(i.value.id, r, a, o), s());
	}
	function u(e, n, i) {
		return {
			group: e,
			animation: 150,
			ghostClass: "tpl-ghost",
			dragClass: "tpl-drag",
			handle: ".tpl-drag-handle",
			onStart: (e) => {
				e.item.dataset.blockId && (r.value = !0);
			},
			onEnd: () => {
				s();
			},
			onAdd: (e) => {
				let r = e.item.dataset.blockId;
				r && t(r, e.newIndex, n, i);
			},
			onUpdate: (e) => {
				let r = e.item.dataset.blockId;
				r && t(r, e.newIndex, n, i);
			}
		};
	}
	return {
		isDragging: r,
		draggedBlock: i,
		dropTargetId: a,
		startDrag: o,
		endDrag: s,
		setDropTarget: c,
		handleDrop: l,
		getSortableOptions: u
	};
}
//#endregion
//#region src/composables/useFonts.ts
var Cr = [
	{
		value: "Arial",
		label: "Arial"
	},
	{
		value: "Helvetica",
		label: "Helvetica"
	},
	{
		value: "Georgia",
		label: "Georgia"
	},
	{
		value: "Times New Roman",
		label: "Times New Roman"
	},
	{
		value: "Verdana",
		label: "Verdana"
	},
	{
		value: "Trebuchet MS",
		label: "Trebuchet MS"
	},
	{
		value: "Courier New",
		label: "Courier New"
	}
], wr = {
	arial: "Arial, sans-serif",
	helvetica: "Helvetica, sans-serif",
	georgia: "Georgia, serif",
	"times new roman": "'Times New Roman', serif",
	verdana: "Verdana, sans-serif",
	"trebuchet ms": "'Trebuchet MS', sans-serif",
	"courier new": "'Courier New', monospace"
}, Tr = "Arial, sans-serif";
function Er(e) {
	if (e === void 0 || e === !0) return [...Cr];
	if (e === !1) return [];
	let t = [], n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
	for (let i of e) {
		let e = i.toLowerCase(), a = Cr.find((t) => t.value.toLowerCase() === e);
		if (!a) {
			r.has(e) || (r.add(e), Ln.warn(`config.fonts.builtIns: "${i}" is not a built-in font — skipping it. Built-in fonts are: ${Cr.map((e) => e.value).join(", ")}.`));
			continue;
		}
		n.has(a.value) || (n.add(a.value), t.push(a));
	}
	return t;
}
function Dr(e) {
	let t = _(e?.customFonts ?? []), n = _(!0), r = _(!1), i = Er(e?.builtIns), a = M(() => e?.defaultFallback ?? Tr);
	function o(e) {
		n.value = e;
	}
	let c = M(() => {
		let e = [...i];
		if (!n.value) return e.sort((e, t) => e.label.localeCompare(t.label));
		let r = t.value.map((e) => ({
			value: e.name,
			label: e.name,
			isCustom: !0
		})), a = [...e, ...r];
		return a.sort((e, t) => e.label.localeCompare(t.label)), a;
	});
	function l(e) {
		return c.value.some((t) => t.label.toLowerCase() === e.toLowerCase() || t.value.toLowerCase().startsWith(e.toLowerCase()));
	}
	let d = e?.defaultFont ?? Tr.split(",")[0].trim();
	l(d) || Ln.warn(`config.fonts: new templates seed "${d}", which the font picker doesn't offer — authors can't reselect it. Either add it to fonts.builtIns, or set fonts.defaultFont to an offered font.`);
	function f(e) {
		return Cr.some((t) => t.label.toLowerCase() === e.toLowerCase() || t.value.toLowerCase().startsWith(e.toLowerCase()));
	}
	function p() {
		if (e?.defaultFont) {
			if (!n.value && !f(e.defaultFont)) return Tr;
			if (l(e.defaultFont)) {
				let t = c.value.find((t) => t.label.toLowerCase() === e.defaultFont.toLowerCase() || t.value.toLowerCase().startsWith(e.defaultFont.toLowerCase()));
				if (t) return t.value;
			}
		}
		return Tr;
	}
	let m = M(() => p());
	function h(e) {
		if (!e) return a.value;
		let n = t.value.find((t) => t.name.toLowerCase() === e.toLowerCase());
		if (n) {
			let e = n.fallback ?? a.value;
			return `'${n.name}', ${e}`;
		}
		return wr[e.toLowerCase()] || (e.includes(",") ? e : `${e}, ${a.value}`);
	}
	let g = [], v = !1;
	async function y() {
		if (t.value.length === 0) {
			v || (r.value = !0);
			return;
		}
		let e = t.value.map(async (e) => {
			try {
				if (document.querySelector(`link[data-custom-font="${CSS.escape(e.name)}"]`)) return;
				let t = document.createElement("link");
				t.rel = "stylesheet", t.href = e.url, t.setAttribute("data-custom-font", e.name), g.push(t), await new Promise((n, r) => {
					t.onload = () => n(), t.onerror = () => r(/* @__PURE__ */ Error(`Failed to load font: ${e.name}`)), document.head.appendChild(t);
				});
			} catch (t) {
				Ln.warn(`Failed to load custom font "${e.name}":`, t);
			}
		});
		await Promise.allSettled(e), !v && (r.value = !0);
	}
	function b() {
		for (let e of g) e.remove();
		g.length = 0;
	}
	return s() && u(() => {
		v = !0, b();
	}), {
		fonts: c,
		defaultFont: m,
		defaultFallback: a,
		customFonts: t,
		customFontsEnabled: n,
		isLoaded: r,
		setCustomFontsEnabled: o,
		loadCustomFonts: y,
		cleanupFontLinks: b,
		getFontWithFallback: h,
		getDefaultFont: p
	};
}
//#endregion
//#region src/composables/useLogicTag.ts
function Or() {
	let e = P(Ut, []), t = P(lt, []), n = P(st, Ee.liquid), r = P(Nt, null), i = P(St, null), a = _(!1), o = !!r || e.length > 0 || t.length > 0, s = e.length > 0 || t.length > 0;
	async function c() {
		if (r) {
			a.value = !0;
			try {
				return await r();
			} finally {
				a.value = !1;
			}
		}
		if (i && s) {
			a.value = !0;
			try {
				return await i.open(e, t);
			} finally {
				a.value = !1;
			}
		}
		return null;
	}
	return {
		logicTags: e,
		logicPairs: t,
		syntax: n,
		canInsertLogicTag: o,
		isRequesting: a,
		requestLogicTag: c
	};
}
//#endregion
//#region src/utils/mergeTagNodeSpec.ts
function kr(e, t, n) {
	return ve(e, n) ? {
		type: "logicMergeTagNode",
		attrs: {
			value: e,
			keyword: pe(e, n)
		}
	} : {
		type: "mergeTagNode",
		attrs: {
			label: t,
			value: e
		}
	};
}
//#endregion
//#region src/utils/insertLogicTag.ts
function Ar(e) {
	return "before" in e && "after" in e;
}
function jr(e, t, n) {
	if (!Ar(t)) {
		e.chain().focus().insertContent(kr(t.value, t.label, n)).run();
		return;
	}
	let r = kr(t.before, t.label, n), i = kr(t.after, t.label, n), { from: a, to: o } = e.state.selection;
	if (a !== o) {
		e.chain().focus().insertContentAt(o, i).insertContentAt(a, r).run();
		return;
	}
	e.chain().focus().insertContentAt(a, [r, i]).setTextSelection(a + 1).run();
}
//#endregion
//#region src/utils/linkColorExtension.ts
function Mr(e) {
	if (!e) return null;
	let t = e.trim();
	return /^#[0-9a-f]{3,8}$/i.test(t) || /^(rgb|rgba|hsl|hsla)\(\s*[0-9.,%/\s]+\)$/i.test(t) || /^[a-z]+$/i.test(t) ? t : null;
}
function Nr(e) {
	return e.extend({ addAttributes() {
		return {
			...this.parent?.(),
			color: {
				default: null,
				parseHTML: (e) => Mr(tt(e.style.color)),
				renderHTML: (e) => {
					let t = Mr(e.color);
					return t ? { style: `color: ${t}` } : {};
				}
			}
		};
	} });
}
//#endregion
//#region src/composables/useRichTextLinkDialog.ts
function Pr(e) {
	let t = _(!1), n = _(""), r = _(""), i = _(null);
	br(i, t);
	function a() {
		let i = e.value?.getAttributes("link") ?? {};
		n.value = i.href || "", r.value = i.color || "", t.value = !0;
	}
	function o() {
		if (n.value) {
			let t = c(n.value);
			if (t !== null) {
				let n = Mr(r.value), i = e.value?.chain().focus().extendMarkRange("link").setLink({ href: t }).updateAttributes("link", { color: n });
				n && typeof e.value?.commands.unsetColor == "function" && i?.unsetColor(), i?.run();
			}
		}
		u();
	}
	let s = /* @__PURE__ */ new Set([
		"http",
		"https",
		"mailto",
		"tel",
		"ftp",
		"ftps",
		"sms",
		"xmpp",
		"cid"
	]);
	function c(e) {
		let t = e.trim();
		if (!t) return null;
		if (t.startsWith("#")) return t;
		let n = /^([a-z][a-z0-9+.-]*):/i.exec(t);
		return n ? s.has(n[1].toLowerCase()) ? t : null : `https://${t}`;
	}
	function l() {
		e.value?.chain().focus().extendMarkRange("link").unsetLink().run(), u();
	}
	function u() {
		t.value = !1, n.value = "", r.value = "";
	}
	function d(e) {
		e.key === "Enter" ? (e.preventDefault(), o()) : e.key === "Escape" && u();
	}
	return {
		showLinkDialog: t,
		linkUrl: n,
		linkColor: r,
		linkDialogRef: i,
		openLinkDialog: a,
		insertLink: o,
		removeLink: l,
		closeLinkDialog: u,
		handleLinkKeydown: d
	};
}
//#endregion
//#region src/composables/useRichTextEditor.ts
function Fr(e) {
	let t = P(jt, null), { mergeTags: n, canRequestMergeTag: r, isRequesting: i, requestMergeTag: a, syntax: o, autocomplete: s } = $t(), { canInsertLogicTag: l, isRequesting: u, requestLogicTag: d } = Or(), f = P(mt, null), p = (g(f) ? f.value : f)?.mergeTag?.suggestionEmpty ?? "No matching merge tags", m = le(o), y = v(null), { showLinkDialog: b, linkUrl: x, linkColor: S, linkDialogRef: C, openLinkDialog: w, insertLink: T, removeLink: E, closeLinkDialog: D, handleLinkKeydown: O } = Pr(y), { start: k, stop: A } = Ze(() => y.value?.commands.focus("end"), 0, { immediate: !1 }), j = v(null), ee = _(!0), M = _(null), te = !1;
	async function N() {
		M.value = null, ee.value = !0;
		try {
			let { TiptapEditor: r, EC: i, extensions: a } = await e.loadExtensions({
				mergeTags: n,
				syntax: o,
				triggerChar: m,
				autocompleteEnabled: s,
				suggestionEmptyText: p
			});
			if (te) return;
			j.value = i;
			let c = /* @__PURE__ */ new Map();
			a.forEach((e, t) => c.set(e.name, t));
			let l = new r({
				extensions: a.filter((e, t) => c.get(e.name) === t),
				content: e.blockContent(),
				editable: !0,
				onUpdate: ({ editor: n }) => {
					te || t && t.updateBlock(e.blockId(), { content: n.getHTML() });
				}
			});
			if (te) {
				l.destroy();
				return;
			}
			y.value = l, ee.value = !1, k();
		} catch (t) {
			if (te) return;
			Ln.error(`[${e.editorName ?? "RichTextEditor"}] Failed to initialize TipTap editor:`, t), M.value = t instanceof Error ? t.message : "Failed to load editor", ee.value = !1;
		}
	}
	function ne() {
		y.value?.destroy(), y.value = null, N();
	}
	N();
	let re = c(() => e.blockContent(), (e) => {
		y.value && y.value.getHTML() !== e && y.value.commands.setContent(e, { emitUpdate: !1 });
	});
	function ie(t) {
		if (i.value || u.value) return;
		let n = t.composedPath(), r = n.find((e) => e instanceof HTMLElement);
		if (!r) return;
		e.onClickOutsideSideEffect?.(r);
		let a = n.some((e) => e instanceof HTMLElement && e.classList.contains("tpl-color-popover"));
		r.closest(".tpl-text-editor-wrapper") || r.closest(".tpl-text-toolbar") || r.closest(".tpl-link-dialog") || a || e.onDone();
	}
	ot(document, "mousedown", ie), h(() => {
		te = !0, re(), A(), y.value?.destroy();
	});
	async function ae() {
		let e = await a();
		te || (e && y.value ? y.value.chain().focus().insertMergeTag({
			label: e.label,
			value: e.value
		}).run() : y.value?.commands.focus());
	}
	async function F() {
		let e = await d();
		te || (e && y.value ? jr(y.value, e, o) : y.value?.commands.focus());
	}
	return {
		editor: y,
		EditorContent: j,
		isLoading: ee,
		initError: M,
		retry: ne,
		showLinkDialog: b,
		linkUrl: x,
		linkColor: S,
		linkDialogRef: C,
		mergeTags: n,
		canRequestMergeTag: r,
		isRequestingMergeTag: i,
		syntax: o,
		canInsertLogicTag: l,
		isRequestingLogicTag: u,
		openLinkDialog: w,
		insertLink: T,
		removeLink: E,
		closeLinkDialog: D,
		handleLinkKeydown: O,
		handleAddMergeTag: ae,
		handleAddLogicTag: F
	};
}
//#endregion
//#region src/composables/useSmallScreenNotice.ts
var Ir = "(max-width: 767px)";
function Lr(e) {
	let t = et(Ir);
	return {
		isSmallScreen: t,
		showNotice: M(() => (S(e) ?? !0) && t.value)
	};
}
//#endregion
//#region src/components/blocks/CustomBlock.vue?vue&type=script&setup=true&lang.ts
var Rr = { class: "tpl:w-full" }, zr = {
	key: 0,
	class: "tpl:flex tpl:min-h-[80px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:border-[var(--tpl-warning)] tpl:bg-[var(--tpl-warning-light)]"
}, Br = { class: "tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, Vr = {
	key: 1,
	class: "tpl:flex tpl:min-h-[80px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:border-[var(--tpl-danger)] tpl:bg-[var(--tpl-danger-light)]"
}, Hr = { class: "tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, Ur = {
	key: 2,
	class: "tpl:relative"
}, Wr = ["innerHTML"], Gr = {
	key: 0,
	class: "tpl:absolute tpl:inset-0 tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:rounded tpl:backdrop-blur-[2px]",
	style: { "background-color": "color-mix(in srgb, var(--tpl-bg) 80%, transparent)" }
}, Kr = /* @__PURE__ */ y({
	__name: "CustomBlock",
	props: {
		block: {},
		viewport: {}
	},
	emits: ["fetchData"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = Kt(), o = P(Bt, null), s = _(""), l = _(!1), u = M(() => o?.getDefinition(n.block.customType)), d = M(() => !!u.value), { isFetching: m, fetch: h, needsFetch: g, hasDataSource: v } = fn({
			definition: u,
			block: M(() => n.block),
			onUpdate: (e, t) => {
				r("fetchData", {
					fieldValues: e,
					dataSourceFetched: t
				});
			}
		}), y = P(dt, []), S = P(Tt, null), C = M(() => {
			if (!S?.value) return n.block;
			let e = {};
			for (let [t, r] of Object.entries(n.block.fieldValues)) e[t] = typeof r == "string" ? we(r, y) : r;
			return {
				...n.block,
				fieldValues: e
			};
		});
		async function T() {
			if (o) {
				l.value = !1;
				try {
					let e = await o.renderCustomBlock(C.value);
					e.includes("Template render error:") && (l.value = !0), s.value = e;
				} catch {
					l.value = !0, s.value = "";
				}
			}
		}
		let E = Je(T, 150);
		return a(() => {
			T();
		}), c(() => n.block.fieldValues, () => {
			E();
		}, { deep: !0 }), c(() => S?.value, () => {
			E();
		}), (e, t) => (f(), x("div", Rr, [d.value ? l.value ? (f(), x("div", Vr, [w(k(Xt), {
			size: 24,
			class: "tpl:text-[var(--tpl-danger)]"
		}), b("span", Hr, p(k(i).customBlocks.renderError), 1)])) : (f(), x("div", Ur, [b("div", { innerHTML: s.value }, null, 8, Wr), k(v) && k(g) ? (f(), x("div", Gr, [k(m) ? (f(), D(Zt, {
			key: 1,
			class: "tpl:w-48"
		})) : (f(), x("button", {
			key: 0,
			type: "button",
			class: "tpl:flex tpl:cursor-pointer tpl:items-center tpl:gap-2 tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:px-4 tpl:py-2 tpl:text-sm tpl:font-semibold tpl:shadow-sm tpl:transition-all tpl:duration-150 hover:tpl:border-[var(--tpl-primary)] hover:tpl:shadow-md tpl:bg-[var(--tpl-primary-light)] tpl:text-[var(--tpl-primary-hover)]",
			onClick: t[0] ||= F((...e) => k(h) && k(h)(...e), ["stop"])
		}, [u.value?.icon ? (f(), D(_r, {
			key: 0,
			icon: u.value.icon,
			size: 16
		}, null, 8, ["icon"])) : N("", !0), O(" " + p(u.value?.dataSource?.label || k(i).customBlocks.dataSource.fetchButton), 1)]))])) : N("", !0)])) : (f(), x("div", zr, [w(k(dr), {
			size: 24,
			class: "tpl:text-[var(--tpl-warning)]"
		}), b("span", Br, p(k(i).customBlocks.definitionNotFound), 1)]))]));
	}
}), qr = { class: "tpl:w-full" }, Jr = /* @__PURE__ */ y({
	__name: "DividerBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, n = M(() => ({
			borderTop: `${t.block.thickness}px ${t.block.lineStyle} ${t.block.color}`,
			width: t.block.width === "full" ? "100%" : `${t.block.width}px`,
			margin: t.block.width === "full" ? "0" : "0 auto"
		}));
		return (e, t) => (f(), x("div", qr, [b("hr", {
			class: "tpl:m-0 tpl:border-none",
			style: i(n.value)
		}, null, 4)]));
	}
}), Yr = { class: "tpl:w-full" }, Xr = ["srcdoc", "title"], Zr = {
	key: 1,
	class: "tpl:flex tpl:min-h-[80px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-hover)]"
}, Qr = {
	key: 0,
	class: "tpl:text-sm tpl:text-[var(--tpl-text-muted)]"
}, $r = {
	key: 1,
	class: "tpl:text-sm tpl:text-[var(--tpl-text-dim)]"
}, ei = /* @__PURE__ */ y({
	__name: "HtmlBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, { t: n } = Kt(), r = P(Ot, !1), a = M(() => t.block.content.trim().length > 0), o = M(() => r && a.value), s = P(dt, []), l = P(Tt, null), u = M(() => l?.value ? we(t.block.content, s) : t.block.content), d = _(null), m = _(60), g = null;
		function v() {
			let e = d.value?.contentDocument;
			e && (m.value = Math.max(e.body?.scrollHeight ?? 0, e.documentElement?.scrollHeight ?? 0));
		}
		function y() {
			g?.disconnect(), g = null, v();
			let e = d.value?.contentDocument?.documentElement;
			e && typeof ResizeObserver < "u" && (g = new ResizeObserver(() => v()), g.observe(e));
		}
		return c(o, (e) => {
			e || (g?.disconnect(), g = null);
		}), h(() => {
			g?.disconnect(), g = null;
		}), (e, t) => (f(), x("div", Yr, [o.value ? (f(), x("iframe", {
			key: 0,
			ref_key: "iframeRef",
			ref: d,
			srcdoc: u.value,
			sandbox: "allow-same-origin",
			title: k(n).html.preview,
			class: "tpl:block tpl:w-full tpl:border-0",
			style: i({ height: `${m.value}px` }),
			onLoad: y
		}, null, 44, Xr)) : (f(), x("div", Zr, [w(k(ir), {
			size: 24,
			class: "tpl:text-[var(--tpl-text-dim)]"
		}), a.value ? (f(), x("span", Qr, p(k(n).html.preview), 1)) : (f(), x("span", $r, p(k(n).html.empty), 1))]))]));
	}
}), ti = "image/";
function ni(e) {
	let { target: t, onFiles: n, enabled: r } = e, i = () => r === void 0 || S(r), { isOverDropZone: a } = $e(t, {
		preventDefaultForUnhandled: !0,
		onDrop: (e) => {
			if (!i()) return;
			let t = (e ?? []).filter((e) => e.type.startsWith(ti));
			t.length > 0 && n([t[0]]);
		}
	});
	return { isOver: M(() => i() && a.value) };
}
//#endregion
//#region src/components/blocks/ImageBlock.vue?vue&type=script&setup=true&lang.ts
var ri = {
	key: 0,
	class: "tpl:pointer-events-none tpl:absolute tpl:inset-0 tpl:z-10 tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-xs tpl:font-medium tpl:border-[var(--tpl-primary)] tpl:text-[var(--tpl-primary)]",
	style: { "background-color": "color-mix(in srgb, var(--tpl-bg) 85%, transparent)" }
}, ii = ["href"], ai = ["src", "alt"], oi = ["src", "alt"], si = {
	class: "tpl:max-w-full tpl:truncate tpl:px-3 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-primary)]",
	style: { opacity: "0.7" }
}, ci = ["href"], li = ["src", "alt"], ui = ["src", "alt"], di = {
	key: 4,
	class: "tpl:flex tpl:min-h-[100px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-sm tpl:border-[var(--tpl-border-light)] tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-dim)]"
}, fi = ["aria-label"], pi = { key: 1 }, mi = /* @__PURE__ */ y({
	__name: "ImageBlock",
	props: {
		block: {},
		viewport: {}
	},
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: a } = Kt(), { syntax: o } = $t(), s = P(_t, null), c = M(() => !!s), l = en();
		async function u() {
			let e = await s?.({ accept: ["images"] });
			if (l.alive && e) {
				let t = { src: e.url };
				e.alt && (t.alt = e.alt), r("update", t);
			}
		}
		let d = _(), m = _(!1), h = M(() => c.value && !m.value && !C.value);
		async function g(e) {
			if (s) {
				m.value = !0;
				try {
					let t = await s({
						accept: ["images"],
						files: e
					});
					if (!l.alive) return;
					if (t) {
						let e = { src: t.url };
						t.alt && (e.alt = t.alt), r("update", e);
					}
				} finally {
					l.alive && (m.value = !1);
				}
			}
		}
		let { isOver: v } = ni({
			target: d,
			enabled: h,
			onFiles: g
		}), y = M(() => ({ textAlign: n.block.align })), S = M(() => {
			let e = n.block.align;
			return {
				maxWidth: "100%",
				width: n.block.width === "full" ? "100%" : `${n.block.width}px`,
				display: "block",
				marginLeft: e === "center" || e === "right" ? "auto" : void 0,
				marginRight: e === "center" ? "auto" : void 0
			};
		}), C = M(() => Oe(n.block.src, o)), T = wn(() => C.value ? void 0 : n.block.src), E = wn(() => C.value ? n.block.placeholderUrl : void 0);
		return (t, n) => (f(), x("div", {
			ref_key: "dropZoneRef",
			ref: d,
			"data-testid": "image-drop-zone",
			class: "tpl:relative tpl:w-full",
			style: i(y.value)
		}, [h.value && (k(v) || m.value) ? (f(), x("div", ri, [m.value ? (f(), x(j, { key: 0 }, [w(k(qt), {
			class: "tpl-spinner",
			size: 20,
			"stroke-width": 2
		}), O(" " + p(k(a).image.uploading), 1)], 64)) : (f(), x(j, { key: 1 }, [w(k(ce), {
			size: 20,
			"stroke-width": 1.5
		}), O(" " + p(k(a).image.dropToUpload), 1)], 64))])) : N("", !0), e.block.src && C.value && e.block.placeholderUrl ? (f(), x(j, { key: 1 }, [e.block.linkUrl ? (f(), x("a", {
			key: 0,
			href: e.block.linkUrl,
			target: "_blank",
			rel: "noopener noreferrer",
			onClick: n[0] ||= F(() => {}, ["prevent"])
		}, [b("img", {
			class: "tpl:border-0",
			loading: "lazy",
			src: k(E),
			alt: e.block.alt || k(a).image.altTextPlaceholder,
			style: i(S.value)
		}, null, 12, ai)], 8, ii)) : (f(), x("img", {
			key: 1,
			class: "tpl:border-0",
			src: k(E),
			alt: e.block.alt,
			style: i(S.value)
		}, null, 12, oi))], 64)) : e.block.src && C.value ? (f(), x("div", {
			key: 2,
			class: "tpl:!flex tpl:min-h-[120px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-center tpl:bg-[var(--tpl-bg-elevated)]",
			style: i([{ "border-color": "color-mix(in srgb, var(--tpl-primary) 40%, transparent)" }, S.value])
		}, [w(k(lr), {
			size: 32,
			"stroke-width": 1.5,
			class: "tpl:text-[var(--tpl-primary)]",
			style: { opacity: "0.5" }
		}), b("span", si, [w(Qn, { text: e.block.src }, null, 8, ["text"])])], 4)) : e.block.src ? (f(), x(j, { key: 3 }, [e.block.linkUrl ? (f(), x("a", {
			key: 0,
			href: e.block.linkUrl,
			target: "_blank",
			rel: "noopener noreferrer",
			onClick: n[1] ||= F(() => {}, ["prevent"])
		}, [b("img", {
			class: "tpl:border-0",
			loading: "lazy",
			src: k(T),
			alt: e.block.alt || k(a).image.altTextPlaceholder,
			style: i(S.value)
		}, null, 12, li)], 8, ci)) : (f(), x("img", {
			key: 1,
			class: "tpl:border-0",
			src: k(T),
			alt: e.block.alt,
			style: i(S.value)
		}, null, 12, ui))], 64)) : (f(), x("div", di, [c.value ? (f(), x("button", {
			key: 0,
			"aria-label": k(a).image.browseMedia,
			class: "tpl:flex tpl:items-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150 tpl:cursor-pointer tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-primary)] tpl:bg-[var(--tpl-bg)]",
			onClick: F(u, ["stop"])
		}, [w(k(lr), {
			size: 14,
			"stroke-width": 1.5
		}), O(" " + p(k(a).image.browseMedia), 1)], 8, fi)) : (f(), x("span", pi, p(k(a).image.clickToAdd), 1))]))], 4));
	}
}), hi = { class: "tpl:w-full" }, gi = ["href"], _i = {
	key: 1,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:text-sm tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text-dim)]"
}, vi = /* @__PURE__ */ y({
	__name: "MenuBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let n = e, { t: r } = Kt(), a = M(() => ({
			display: "flex",
			flexWrap: "wrap",
			gap: `0 ${n.block.spacing}px`,
			justifyContent: n.block.textAlign === "left" ? "flex-start" : n.block.textAlign === "right" ? "flex-end" : "center",
			fontSize: `${n.block.fontSize}px`,
			fontFamily: n.block.fontFamily || "inherit",
			alignItems: "center"
		})), o = M(() => n.block.items.length > 0);
		function s(e) {
			return e || n.block.linkColor || n.block.color;
		}
		return (n, c) => (f(), x("div", hi, [o.value ? (f(), x("div", {
			key: 0,
			style: i(a.value)
		}, [(f(!0), x(j, null, t(e.block.items, (t, n) => (f(), x(j, { key: t.id }, [b("a", {
			href: t.url || "#",
			class: "tpl:cursor-default tpl:no-underline",
			style: i({
				color: s(t.color),
				fontWeight: t.bold ? "bold" : "normal",
				textDecoration: t.underline ? "underline" : "none"
			}),
			onClick: c[0] ||= F(() => {}, ["prevent"])
		}, [w(Qn, { text: t.text || "..." }, null, 8, ["text"])], 12, gi), n < e.block.items.length - 1 ? (f(), x("span", {
			key: 0,
			style: i({
				color: e.block.separatorColor,
				padding: `0 ${e.block.spacing}px`
			})
		}, p(e.block.separator), 5)) : N("", !0)], 64))), 128))], 4)) : (f(), x("div", _i, [w(k(ur), { size: 16 }), b("span", null, p(k(r).menu.addLinks), 1)]))]));
	}
}), yi = /* @__PURE__ */ new Set([
	"http",
	"https",
	"mailto",
	"tel",
	"ftp",
	"ftps",
	"sms",
	"xmpp",
	"cid"
]), bi = /* @__PURE__ */ new Set([
	"SCRIPT",
	"STYLE",
	"IFRAME",
	"OBJECT",
	"EMBED",
	"LINK",
	"META",
	"BASE",
	"FORM"
]), xi = /* @__PURE__ */ new Set([
	"href",
	"xlink:href",
	"formaction",
	"action",
	"ping",
	"background",
	"poster"
]);
function Si(e, t) {
	let n = e.replace(/[\t\n\r]/g, "").replace(/^[\u0000-\u0020]+/, "").trimEnd();
	if (!n || n.startsWith("#")) return !0;
	let r = /^([a-z][a-z0-9+.-]*):/i.exec(n);
	if (!r) return !0;
	let i = r[1].toLowerCase();
	return yi.has(i) ? !0 : t && i === "data" ? /^data:image\/(png|jpe?g|gif|webp|svg\+xml);/i.test(n) : !1;
}
function Ci(e) {
	if (bi.has(e.tagName)) {
		e.remove();
		return;
	}
	let t = [];
	for (let n = 0; n < e.attributes.length; n++) t.push(e.attributes[n].name);
	for (let n of t) {
		let t = n.toLowerCase();
		if (t.startsWith("on")) {
			e.removeAttribute(n);
			continue;
		}
		if (xi.has(t)) {
			Si(e.getAttribute(n) ?? "", !1) || e.removeAttribute(n);
			continue;
		}
		if (t === "src") {
			Si(e.getAttribute(n) ?? "", !0) || e.removeAttribute(n);
			continue;
		}
		t === "srcdoc" && e.removeAttribute(n);
	}
	let n = Array.from(e.children);
	for (let e of n) Ci(e);
}
function wi(e) {
	if (typeof DOMParser > "u") return e;
	let t = new DOMParser().parseFromString(`<!doctype html><body>${e}</body>`, "text/html").body, n = Array.from(t.children);
	for (let e of n) Ci(e);
	return t.innerHTML;
}
//#endregion
//#region src/composables/useEditableTextBlock.ts
function Ti(e) {
	let t = P(dt, []), n = P(Tt, null), { syntax: r } = $t(), i = M(() => n?.value ? ue(e(), t) : ge(e(), t)), a = M(() => wi(he(i.value, r))), o = _(!1), s = _(null), { top: c, left: l } = nt(s), { toLocal: u } = at(), d = M(() => u({
		top: c.value - 8,
		left: l.value
	}));
	function f() {
		o.value = !0;
	}
	function p() {
		o.value = !1;
	}
	return {
		isEditing: o,
		blockRef: s,
		toolbarPosition: d,
		resolvedContent: a,
		handleDoubleClick: f,
		handleEditorDone: p
	};
}
//#endregion
//#region src/components/blocks/ParagraphBlock.vue?vue&type=script&setup=true&lang.ts
var Ei = ["innerHTML"], Di = /* @__PURE__ */ y({
	__name: "ParagraphBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, n = C(() => import("./ParagraphEditor-DK_IPi9H.js")), { isEditing: r, blockRef: i, toolbarPosition: a, resolvedContent: o, handleDoubleClick: s, handleEditorDone: c } = Ti(() => t.block.content);
		return (t, l) => (f(), x("div", {
			ref_key: "blockRef",
			ref: i,
			class: "tpl:min-h-[1em] tpl:w-full",
			onDblclick: l[0] ||= (...e) => k(s) && k(s)(...e)
		}, [k(r) ? (f(), D(k(n), {
			key: 0,
			block: e.block,
			"toolbar-position": k(a),
			onDone: k(c)
		}, null, 8, [
			"block",
			"toolbar-position",
			"onDone"
		])) : (f(), x("div", {
			key: 1,
			class: "tpl-text-content tpl:outline-none [&_a]:tpl:underline [&_li]:tpl:my-1 [&_ol]:tpl:my-2 [&_ol]:tpl:pl-6 [&_p]:tpl:m-0 [&_p]:tpl:mb-2 [&_p:last-child]:tpl:mb-0 [&_s]:tpl:line-through [&_sub]:tpl:align-sub [&_sub]:tpl:text-[0.75em] [&_sup]:tpl:align-super [&_sup]:tpl:text-[0.75em] [&_ul]:tpl:my-2 [&_ul]:tpl:pl-6",
			innerHTML: k(o)
		}, null, 8, Ei))], 544));
	}
});
//#endregion
//#region src/utils/blockComponentResolver.ts
function Oi(e) {
	let t = { fontFamily: e.fontFamily };
	return e.textColor && (t.color = e.textColor), e.linkColor && (t["--tpl-doc-link-color"] = e.linkColor), e.linkUnderline && (t["--tpl-doc-link-underline"] = "underline"), t;
}
function ki(e, t, n) {
	if (t) {
		let n = t.getComponent(e);
		if (n) return n;
	}
	return n[e.type] ?? null;
}
function Ai(e) {
	let { padding: t, backgroundColor: n } = e.styles, r = {
		padding: `${t.top}px ${t.right}px ${t.bottom}px ${t.left}px`,
		backgroundColor: n || "transparent"
	};
	return e.type === "section" && e.borderRadius && e.borderRadius > 0 && (r.borderRadius = `${e.borderRadius}px`), r;
}
function ji(e) {
	if (e.type !== "section" || !e.wrapper) return null;
	let t = e.wrapper, n = {};
	return t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.padding && (n.padding = `${t.padding.top}px ${t.padding.right}px ${t.padding.bottom}px ${t.padding.left}px`), t.borderRadius && t.borderRadius > 0 && (n.borderRadius = `${t.borderRadius}px`), n;
}
//#endregion
//#region src/components/blocks/BlockWrapper.vue?vue&type=script&setup=true&lang.ts
var Mi = [
	"data-block-id",
	"data-block-type",
	"data-tpl-picked"
], Ni = ["aria-label"], Pi = [
	"aria-label",
	"aria-pressed",
	"title"
], Fi = ["aria-label", "title"], Ii = ["aria-label", "title"], Li = ["aria-label", "title"], Ri = {
	key: 1,
	class: "tpl-block-hidden-overlay tpl:pointer-events-none tpl:absolute tpl:inset-0 tpl:z-[5] tpl:flex tpl:items-center tpl:justify-center tpl:rounded-sm"
}, zi = { class: "tpl:flex tpl:items-center tpl:gap-1 tpl:rounded tpl:px-2 tpl:py-1 tpl:text-[10px] tpl:font-medium tpl:bg-[var(--tpl-chrome-bg-elevated)] tpl:text-[var(--tpl-chrome-text-muted)] tpl:shadow-[var(--tpl-shadow-sm)]" }, Bi = {
	key: 2,
	class: "tpl:absolute tpl:-left-1 tpl:top-1/2 tpl:z-[5] tpl:-translate-x-full tpl:-translate-y-1/2"
}, Vi = ["aria-label", "title"], Hi = {
	key: 3,
	class: "tpl:absolute tpl:-right-1 tpl:-top-1 tpl:z-[5] tpl:translate-x-full"
}, Ui = ["aria-label"], Wi = /*#__PURE__*/ Qt(/* @__PURE__ */ y({
	__name: "BlockWrapper",
	props: {
		block: {},
		isSelected: { type: Boolean },
		viewport: {},
		previewMode: { type: Boolean },
		nested: { type: Boolean },
		picked: { type: Boolean }
	},
	emits: ["select"],
	setup(e, { emit: t }) {
		let n = C(() => import("./BlockIssueBadge-De36PJC4.js")), r = e, a = t, { t: s, format: c } = Kt(), l = P(xt, null), u = _(null), d = M(() => l?.liftedBlockId.value === r.block.id), m = M(() => d.value ? c(s.blockActions.dragLifted, { block: r.block.type }) : s.blockActions.drag);
		async function h() {
			await re(), u.value?.focus();
		}
		function g(e) {
			if (l) {
				if (e.key === " " || e.key === "Enter") {
					e.preventDefault(), e.stopPropagation(), d.value ? l.drop(r.block.id) : l.lift(r.block.id);
					return;
				}
				if (d.value) {
					if (e.key === "Escape") {
						e.preventDefault(), e.stopPropagation(), l.cancel(), h();
						return;
					}
					if (e.key === "ArrowUp") {
						e.preventDefault(), e.stopPropagation(), l.moveUp(r.block.id), h();
						return;
					}
					e.key === "ArrowDown" && (e.preventDefault(), e.stopPropagation(), l.moveDown(r.block.id), h());
				}
			}
		}
		let v = M(() => !r.viewport || !r.block.visibility ? !1 : r.block.visibility[r.viewport] === !1), y = M(() => r.previewMode === !0 && v.value), S = M(() => r.viewport ? {
			desktop: s.viewport.desktop,
			mobile: s.viewport.mobile
		}[r.viewport] ?? r.viewport : ""), E = M(() => !!r.block.displayCondition), D = P(Dt, null), A = P(At, null), j = P(kt, {}), ee = M(() => j.savedBlocks?.isPicking.value === !0), te = M(() => !r.nested && j.savedBlocks?.isAvailable.value === !0 && j.savedBlocks?.canCreate.value === !0), ne = M(() => r.isSelected && !ee.value), ie = M(() => j.comments?.getBlockCount(r.block.id) ?? 0), ae = M(() => {
			let e = Ai(r.block), t = {
				padding: e.padding,
				backgroundColor: e.backgroundColor
			};
			return e.borderRadius && (t.borderRadius = e.borderRadius), t;
		}), oe = M(() => ji(r.block));
		function se(e) {
			r.previewMode || (e.target?.closest("a") && e.preventDefault(), e.stopPropagation(), a("select"));
		}
		function ce() {
			D?.deleteBlock(r.block.id);
		}
		function le() {
			D?.duplicateBlock(r.block);
		}
		function ue() {
			j.savedBlocks?.startPicking(r.block.id);
		}
		function de() {
			A?.toggleBlock(r.block.id);
		}
		return (t, r) => y.value ? N("", !0) : (f(), x("div", {
			key: 0,
			class: o(["tpl-block tpl:group tpl:relative tpl:cursor-pointer tpl:rounded-sm tpl:transition-shadow tpl:duration-150", {
				"tpl-block--selected": e.isSelected,
				"tpl-block--picked": e.picked,
				"tpl-block--idle": !e.isSelected && !e.picked,
				"tpl-block--lifted": d.value
			}]),
			"data-block-id": e.block.id,
			"data-block-type": e.block.type,
			"data-tpl-picked": e.picked || void 0,
			onClick: se
		}, [
			w(k(n), { "block-id": e.block.id }, null, 8, ["block-id"]),
			ne.value ? (f(), x("div", {
				key: 0,
				role: "toolbar",
				"aria-label": k(s).blockActions.drag,
				class: "tpl-block-actions tpl-fade-in tpl:absolute tpl:-right-2 tpl:top-1/2 tpl:z-10 tpl:flex tpl:-translate-y-1/2 tpl:translate-x-full tpl:gap-0.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:p-1 tpl:bg-[var(--tpl-chrome-bg-elevated)] tpl:shadow-[var(--tpl-shadow-md)] tpl:border tpl:border-[var(--tpl-border)]"
			}, [
				b("button", {
					ref_key: "dragButtonRef",
					ref: u,
					class: "tpl-block-btn tpl-block-action-btn tpl:flex tpl:size-7 tpl:cursor-grab tpl:items-center tpl:justify-center tpl:rounded-sm tpl:border-none tpl:transition-colors tpl:duration-150 tpl:active:cursor-grabbing",
					"aria-label": m.value,
					"aria-pressed": d.value,
					"aria-keyshortcuts": "Space Enter ArrowUp ArrowDown Escape",
					title: k(s).blockActions.drag,
					onKeydown: g
				}, [w(k(cr), {
					size: 14,
					"stroke-width": 1.5
				})], 40, Pi),
				b("button", {
					class: "tpl-block-action-btn tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-sm tpl:border-none tpl:transition-colors tpl:duration-150",
					"aria-label": k(s).blockActions.duplicate,
					title: k(s).blockActions.duplicate,
					onClick: F(le, ["stop"])
				}, [w(k(ar), {
					size: 14,
					"stroke-width": 1.5
				})], 8, Fi),
				te.value ? (f(), x("button", {
					key: 0,
					class: "tpl-block-action-btn tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-sm tpl:border-none tpl:transition-colors tpl:duration-150",
					"aria-label": k(s).blockActions.saveAsBlock,
					title: k(s).blockActions.saveAsBlock,
					onClick: F(ue, ["stop"])
				}, [w(k(nr), {
					size: 14,
					"stroke-width": 1.5
				})], 8, Ii)) : N("", !0),
				b("button", {
					class: "tpl-block-action-btn tpl-block-delete-btn tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-sm tpl:border-none tpl:transition-colors tpl:duration-150",
					"aria-label": k(s).blockActions.delete,
					title: k(s).blockActions.delete,
					onClick: F(ce, ["stop"])
				}, [w(k(Yt), {
					size: 14,
					"stroke-width": 1.5
				})], 8, Li)
			], 8, Ni)) : N("", !0),
			v.value ? (f(), x("div", Ri, [b("span", zi, [w(k(or), {
				size: 12,
				"stroke-width": 1.5
			}), O(" " + p(k(c)(k(s).blockActions.hiddenOnViewport, { viewport: S.value })), 1)])])) : N("", !0),
			E.value && !v.value ? (f(), x("div", Bi, [b("button", {
				"data-testid": "condition-toggle",
				class: "tpl-condition-toggle tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-md tpl:p-1 tpl:transition-colors tpl:duration-150 tpl:bg-[var(--tpl-chrome-bg-elevated)] tpl:text-[var(--tpl-primary)] tpl:border tpl:border-[var(--tpl-border)]",
				"aria-label": k(s).blockActions.conditionToggle,
				title: e.block.displayCondition?.label,
				onClick: F(de, ["stop"])
			}, [w(k(sr), {
				size: 12,
				"stroke-width": 2
			})], 8, Vi)])) : N("", !0),
			ie.value > 0 && !v.value ? (f(), x("div", Hi, [b("button", {
				class: "tpl-comment-indicator tpl:flex tpl:min-h-6 tpl:min-w-6 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-0.5 tpl:rounded-full tpl:border-none tpl:px-2 tpl:py-0.5 tpl:text-[10px] tpl:font-semibold tpl:transition-colors tpl:duration-150 tpl:bg-[var(--tpl-chrome-primary-light)] tpl:text-[var(--tpl-primary)]",
				"aria-label": k(c)(k(s).blockActions.comments, { count: String(ie.value) }),
				onClick: r[0] ||= F((t) => k(j).comments?.openForBlock(e.block.id), ["stop"])
			}, [w(k(Jt), {
				size: 12,
				"stroke-width": 2.5
			}), O(" " + p(ie.value), 1)], 8, Ui)])) : N("", !0),
			oe.value ? (f(), x("div", {
				key: 4,
				class: "tpl-section-wrapper",
				style: i(oe.value)
			}, [b("div", {
				class: "tpl-block-content",
				style: i(ae.value)
			}, [T(t.$slots, "default", {}, void 0, !0)], 4)], 4)) : (f(), x("div", {
				key: 5,
				class: "tpl-block-content",
				style: i(ae.value)
			}, [T(t.$slots, "default", {}, void 0, !0)], 4))
		], 10, Mi));
	}
}), [["__scopeId", "data-v-8e4583ee"]]);
//#endregion
//#region src/utils/unwrapParagraph.ts
function Gi(e) {
	let t = e.match(/^\s*<p\b[^>]*>([\s\S]*)<\/p>\s*$/);
	return !t || /<\/p>\s*<p\b/i.test(t[1]) ? e : t[1];
}
//#endregion
//#region src/components/blocks/TitleBlock.vue
var Ki = /* @__PURE__ */ y({
	__name: "TitleBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, n = C(() => import("./TitleEditor-8ln7UBr_.js")), { isEditing: r, blockRef: a, toolbarPosition: o, resolvedContent: s, handleDoubleClick: c, handleEditorDone: l } = Ti(() => t.block.content), u = M(() => {
			let e = {
				fontSize: `${Be[t.block.level]}px`,
				textAlign: t.block.textAlign
			};
			return t.block.color && (e.color = t.block.color), t.block.fontFamily && (e.fontFamily = t.block.fontFamily), e;
		}), p = M(() => `h${t.block.level}`), m = M(() => Gi(s.value));
		return (t, s) => (f(), x("div", {
			ref_key: "blockRef",
			ref: a,
			class: "tpl:min-h-[1em] tpl:w-full",
			style: i(u.value),
			onDblclick: s[0] ||= (...e) => k(c) && k(c)(...e)
		}, [k(r) ? (f(), D(k(n), {
			key: 0,
			block: e.block,
			"toolbar-position": k(o),
			onDone: k(l)
		}, null, 8, [
			"block",
			"toolbar-position",
			"onDone"
		])) : (f(), D(d(p.value), {
			key: 1,
			class: "tpl-text-content tpl:m-0 tpl:font-[inherit] tpl:text-[length:inherit] tpl:leading-tight tpl:outline-none [&_a]:tpl:underline [&_p]:tpl:m-0 [&_p]:tpl:mb-2 [&_p:last-child]:tpl:mb-0",
			style: { color: "inherit" },
			innerHTML: m.value
		}, null, 8, ["innerHTML"]))], 36));
	}
});
//#endregion
//#region src/utils/sectionColumnDrop.ts
function qi(e) {
	return e.dataset.blockType !== "section" && e.dataset.paletteType !== "section";
}
//#endregion
//#region ../../node_modules/.pnpm/vue-draggable-plus@0.6.1_@types+sortablejs@1.15.9/node_modules/vue-draggable-plus/dist/vue-draggable-plus.js
var Ji = Object.defineProperty, Yi = Object.getOwnPropertySymbols, Xi = Object.prototype.hasOwnProperty, Zi = Object.prototype.propertyIsEnumerable, Qi = (e, t, n) => t in e ? Ji(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, $i = (e, t) => {
	for (var n in t ||= {}) Xi.call(t, n) && Qi(e, n, t[n]);
	if (Yi) for (var n of Yi(t)) Zi.call(t, n) && Qi(e, n, t[n]);
	return e;
}, ea = (e, t) => {
	var n = {};
	for (var r in e) Xi.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && Yi) for (var r of Yi(e)) t.indexOf(r) < 0 && Zi.call(e, r) && (n[r] = e[r]);
	return n;
}, ta = "[vue-draggable-plus]: ";
function na(e) {
	console.warn(ta + e);
}
function ra(e) {
	console.error(ta + e);
}
function ia(e, t, n) {
	return n >= 0 && n < e.length && e.splice(n, 0, e.splice(t, 1)[0]), e;
}
function aa(e) {
	return e.replace(/-(\w)/g, (e, t) => t ? t.toUpperCase() : "");
}
function oa(e) {
	return Object.keys(e).reduce((t, n) => (e[n] !== void 0 && (t[aa(n)] = e[n]), t), {});
}
function sa(e, t) {
	return Array.isArray(e) && e.splice(t, 1), e;
}
function ca(e, t, n) {
	return Array.isArray(e) && e.splice(t, 0, n), e;
}
function la(e) {
	return e === void 0;
}
function ua(e) {
	return typeof e == "string";
}
function da(e, t, n) {
	let r = e.children[n];
	e.insertBefore(t, r);
}
function fa(e) {
	e.parentNode && e.parentNode.removeChild(e);
}
function pa(e, t = document) {
	let n = null;
	return n = typeof t?.querySelector == "function" ? (t?.querySelector)?.call(t, e) : document.querySelector(e), n || na(`Element not found: ${e}`), n;
}
function ma(e, t, n = null) {
	return function(...r) {
		return e.apply(n, r), t.apply(n, r);
	};
}
function ha(e, t) {
	let n = $i({}, e);
	return Object.keys(t).forEach((r) => {
		n[r] ? n[r] = ma(e[r], t[r]) : n[r] = t[r];
	}), n;
}
function ga(e) {
	return e instanceof HTMLElement;
}
function _a(e, t) {
	Object.keys(e).forEach((n) => {
		t(n, e[n]);
	});
}
function va(e) {
	return e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97);
}
var ya = Object.assign;
function ba(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function xa(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ba(Object(n), !0).forEach(function(t) {
			Ca(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ba(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Sa(e) {
	"@babel/helpers - typeof";
	return Sa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Sa(e);
}
function Ca(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function wa() {
	return wa = Object.assign || function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, wa.apply(this, arguments);
}
function Ta(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function Ea(e, t) {
	if (e == null) return {};
	var n = Ta(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
var Da = "1.15.2";
function Oa(e) {
	if (typeof window < "u" && window.navigator) return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var ka = Oa(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Aa = Oa(/Edge/i), ja = Oa(/firefox/i), Ma = Oa(/safari/i) && !Oa(/chrome/i) && !Oa(/android/i), Na = Oa(/iP(ad|od|hone)/i), Pa = Oa(/chrome/i) && Oa(/android/i), Fa = {
	capture: !1,
	passive: !1
};
function L(e, t, n) {
	e.addEventListener(t, n, !ka && Fa);
}
function R(e, t, n) {
	e.removeEventListener(t, n, !ka && Fa);
}
function Ia(e, t) {
	if (t) {
		if (t[0] === ">" && (t = t.substring(1)), e) try {
			if (e.matches) return e.matches(t);
			if (e.msMatchesSelector) return e.msMatchesSelector(t);
			if (e.webkitMatchesSelector) return e.webkitMatchesSelector(t);
		} catch {
			return !1;
		}
		return !1;
	}
}
function La(e) {
	return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function Ra(e, t, n, r) {
	if (e) {
		n ||= document;
		do {
			if (t != null && (t[0] === ">" ? e.parentNode === n && Ia(e, t) : Ia(e, t)) || r && e === n) return e;
			if (e === n) break;
		} while (e = La(e));
	}
	return null;
}
var za = /\s+/g;
function z(e, t, n) {
	e && t && (e.classList ? e.classList[n ? "add" : "remove"](t) : e.className = ((" " + e.className + " ").replace(za, " ").replace(" " + t + " ", " ") + (n ? " " + t : "")).replace(za, " "));
}
function B(e, t, n) {
	var r = e && e.style;
	if (r) {
		if (n === void 0) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
		!(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
	}
}
function Ba(e, t) {
	var n = "";
	if (typeof e == "string") n = e;
	else do {
		var r = B(e, "transform");
		r && r !== "none" && (n = r + " " + n);
	} while (!t && (e = e.parentNode));
	var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
	return i && new i(n);
}
function Va(e, t, n) {
	if (e) {
		var r = e.getElementsByTagName(t), i = 0, a = r.length;
		if (n) for (; i < a; i++) n(r[i], i);
		return r;
	}
	return [];
}
function Ha() {
	return document.scrollingElement || document.documentElement;
}
function V(e, t, n, r, i) {
	if (!(!e.getBoundingClientRect && e !== window)) {
		var a, o, s, c, l, u, d;
		if (e !== window && e.parentNode && e !== Ha() ? (a = e.getBoundingClientRect(), o = a.top, s = a.left, c = a.bottom, l = a.right, u = a.height, d = a.width) : (o = 0, s = 0, c = window.innerHeight, l = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (i ||= e.parentNode, !ka)) do
			if (i && i.getBoundingClientRect && (B(i, "transform") !== "none" || n && B(i, "position") !== "static")) {
				var f = i.getBoundingClientRect();
				o -= f.top + parseInt(B(i, "border-top-width")), s -= f.left + parseInt(B(i, "border-left-width")), c = o + a.height, l = s + a.width;
				break;
			}
		while (i = i.parentNode);
		if (r && e !== window) {
			var p = Ba(i || e), m = p && p.a, h = p && p.d;
			p && (o /= h, s /= m, d /= m, u /= h, c = o + u, l = s + d);
		}
		return {
			top: o,
			left: s,
			bottom: c,
			right: l,
			width: d,
			height: u
		};
	}
}
function Ua(e, t, n) {
	for (var r = Ya(e, !0), i = V(e)[t]; r;) {
		var a = V(r)[n], o = void 0;
		if (o = i >= a, !o) return r;
		if (r === Ha()) break;
		r = Ya(r, !1);
	}
	return !1;
}
function Wa(e, t, n, r) {
	for (var i = 0, a = 0, o = e.children; a < o.length;) {
		if (o[a].style.display !== "none" && o[a] !== Q.ghost && (r || o[a] !== Q.dragged) && Ra(o[a], n.draggable, e, !1)) {
			if (i === t) return o[a];
			i++;
		}
		a++;
	}
	return null;
}
function Ga(e, t) {
	for (var n = e.lastElementChild; n && (n === Q.ghost || B(n, "display") === "none" || t && !Ia(n, t));) n = n.previousElementSibling;
	return n || null;
}
function Ka(e, t) {
	var n = 0;
	if (!e || !e.parentNode) return -1;
	for (; e = e.previousElementSibling;) e.nodeName.toUpperCase() !== "TEMPLATE" && e !== Q.clone && (!t || Ia(e, t)) && n++;
	return n;
}
function qa(e) {
	var t = 0, n = 0, r = Ha();
	if (e) do {
		var i = Ba(e), a = i.a, o = i.d;
		t += e.scrollLeft * a, n += e.scrollTop * o;
	} while (e !== r && (e = e.parentNode));
	return [t, n];
}
function Ja(e, t) {
	for (var n in e) if (e.hasOwnProperty(n)) {
		for (var r in t) if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
	}
	return -1;
}
function Ya(e, t) {
	if (!e || !e.getBoundingClientRect) return Ha();
	var n = e, r = !1;
	do
		if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
			var i = B(n);
			if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
				if (!n.getBoundingClientRect || n === document.body) return Ha();
				if (r || t) return n;
				r = !0;
			}
		}
	while (n = n.parentNode);
	return Ha();
}
function Xa(e, t) {
	if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	return e;
}
function Za(e, t) {
	return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var Qa;
function $a(e, t) {
	return function() {
		if (!Qa) {
			var n = arguments, r = this;
			n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), Qa = setTimeout(function() {
				Qa = void 0;
			}, t);
		}
	};
}
function eo() {
	clearTimeout(Qa), Qa = void 0;
}
function to(e, t, n) {
	e.scrollLeft += t, e.scrollTop += n;
}
function no(e) {
	var t = window.Polymer, n = window.jQuery || window.Zepto;
	return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function ro(e, t, n) {
	var r = {};
	return Array.from(e.children).forEach(function(i) {
		if (!(!Ra(i, t.draggable, e, !1) || i.animated || i === n)) {
			var a = V(i);
			r.left = Math.min(r.left ?? Infinity, a.left), r.top = Math.min(r.top ?? Infinity, a.top), r.right = Math.max(r.right ?? -Infinity, a.right), r.bottom = Math.max(r.bottom ?? -Infinity, a.bottom);
		}
	}), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var H = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function io() {
	var e = [], t;
	return {
		captureAnimationState: function() {
			e = [], this.options.animation && [].slice.call(this.el.children).forEach(function(t) {
				if (B(t, "display") !== "none" && t !== Q.ghost) {
					e.push({
						target: t,
						rect: V(t)
					});
					var n = xa({}, e[e.length - 1].rect);
					if (t.thisAnimationDuration) {
						var r = Ba(t, !0);
						r && (n.top -= r.f, n.left -= r.e);
					}
					t.fromRect = n;
				}
			});
		},
		addAnimationState: function(t) {
			e.push(t);
		},
		removeAnimationState: function(t) {
			e.splice(Ja(e, { target: t }), 1);
		},
		animateAll: function(n) {
			var r = this;
			if (!this.options.animation) {
				clearTimeout(t), typeof n == "function" && n();
				return;
			}
			var i = !1, a = 0;
			e.forEach(function(e) {
				var t = 0, n = e.target, o = n.fromRect, s = V(n), c = n.prevFromRect, l = n.prevToRect, u = e.rect, d = Ba(n, !0);
				d && (s.top -= d.f, s.left -= d.e), n.toRect = s, n.thisAnimationDuration && Za(c, s) && !Za(o, s) && (u.top - s.top) / (u.left - s.left) === (o.top - s.top) / (o.left - s.left) && (t = oo(u, c, l, r.options)), Za(s, o) || (n.prevFromRect = o, n.prevToRect = s, t ||= r.options.animation, r.animate(n, u, s, t)), t && (i = !0, a = Math.max(a, t), clearTimeout(n.animationResetTimer), n.animationResetTimer = setTimeout(function() {
					n.animationTime = 0, n.prevFromRect = null, n.fromRect = null, n.prevToRect = null, n.thisAnimationDuration = null;
				}, t), n.thisAnimationDuration = t);
			}), clearTimeout(t), i ? t = setTimeout(function() {
				typeof n == "function" && n();
			}, a) : typeof n == "function" && n(), e = [];
		},
		animate: function(e, t, n, r) {
			if (r) {
				B(e, "transition", ""), B(e, "transform", "");
				var i = Ba(this.el), a = i && i.a, o = i && i.d, s = (t.left - n.left) / (a || 1), c = (t.top - n.top) / (o || 1);
				e.animatingX = !!s, e.animatingY = !!c, B(e, "transform", "translate3d(" + s + "px," + c + "px,0)"), this.forRepaintDummy = ao(e), B(e, "transition", "transform " + r + "ms" + (this.options.easing ? " " + this.options.easing : "")), B(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
					B(e, "transition", ""), B(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
				}, r);
			}
		}
	};
}
function ao(e) {
	return e.offsetWidth;
}
function oo(e, t, n, r) {
	return Math.sqrt((t.top - e.top) ** 2 + (t.left - e.left) ** 2) / Math.sqrt((t.top - n.top) ** 2 + (t.left - n.left) ** 2) * r.animation;
}
var so = [], co = { initializeByDefault: !0 }, lo = {
	mount: function(e) {
		for (var t in co) co.hasOwnProperty(t) && !(t in e) && (e[t] = co[t]);
		so.forEach(function(t) {
			if (t.pluginName === e.pluginName) throw `Sortable: Cannot mount plugin ${e.pluginName} more than once`;
		}), so.push(e);
	},
	pluginEvent: function(e, t, n) {
		var r = this;
		this.eventCanceled = !1, n.cancel = function() {
			r.eventCanceled = !0;
		};
		var i = e + "Global";
		so.forEach(function(r) {
			t[r.pluginName] && (t[r.pluginName][i] && t[r.pluginName][i](xa({ sortable: t }, n)), t.options[r.pluginName] && t[r.pluginName][e] && t[r.pluginName][e](xa({ sortable: t }, n)));
		});
	},
	initializePlugins: function(e, t, n, r) {
		for (var i in so.forEach(function(r) {
			var i = r.pluginName;
			if (!(!e.options[i] && !r.initializeByDefault)) {
				var a = new r(e, t, e.options);
				a.sortable = e, a.options = e.options, e[i] = a, wa(n, a.defaults);
			}
		}), e.options) if (e.options.hasOwnProperty(i)) {
			var a = this.modifyOption(e, i, e.options[i]);
			a !== void 0 && (e.options[i] = a);
		}
	},
	getEventProperties: function(e, t) {
		var n = {};
		return so.forEach(function(r) {
			typeof r.eventProperties == "function" && wa(n, r.eventProperties.call(t[r.pluginName], e));
		}), n;
	},
	modifyOption: function(e, t, n) {
		var r;
		return so.forEach(function(i) {
			e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], n));
		}), r;
	}
};
function uo(e) {
	var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, a = e.cloneEl, o = e.toEl, s = e.fromEl, c = e.oldIndex, l = e.newIndex, u = e.oldDraggableIndex, d = e.newDraggableIndex, f = e.originalEvent, p = e.putSortable, m = e.extraEventProperties;
	if (t ||= n && n[H], t) {
		var h, g = t.options, _ = "on" + r.charAt(0).toUpperCase() + r.substr(1);
		window.CustomEvent && !ka && !Aa ? h = new CustomEvent(r, {
			bubbles: !0,
			cancelable: !0
		}) : (h = document.createEvent("Event"), h.initEvent(r, !0, !0)), h.to = o || n, h.from = s || n, h.item = i || n, h.clone = a, h.oldIndex = c, h.newIndex = l, h.oldDraggableIndex = u, h.newDraggableIndex = d, h.originalEvent = f, h.pullMode = p ? p.lastPutMode : void 0;
		var v = xa(xa({}, m), lo.getEventProperties(r, t));
		for (var y in v) h[y] = v[y];
		n && n.dispatchEvent(h), g[_] && g[_].call(t, h);
	}
}
var fo = ["evt"], U = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, i = Ea(n, fo);
	lo.pluginEvent.bind(Q)(e, t, xa({
		dragEl: G,
		parentEl: K,
		ghostEl: q,
		rootEl: J,
		nextEl: po,
		lastDownEl: mo,
		cloneEl: Y,
		cloneHidden: ho,
		dragStarted: Ao,
		putSortable: X,
		activeSortable: Q.active,
		originalEvent: r,
		oldIndex: go,
		oldDraggableIndex: vo,
		newIndex: _o,
		newDraggableIndex: yo,
		hideGhostForTarget: Jo,
		unhideGhostForTarget: Yo,
		cloneNowHidden: function() {
			ho = !0;
		},
		cloneNowShown: function() {
			ho = !1;
		},
		dispatchSortableEvent: function(e) {
			W({
				sortable: t,
				name: e,
				originalEvent: r
			});
		}
	}, i));
};
function W(e) {
	uo(xa({
		putSortable: X,
		cloneEl: Y,
		targetEl: G,
		rootEl: J,
		oldIndex: go,
		oldDraggableIndex: vo,
		newIndex: _o,
		newDraggableIndex: yo
	}, e));
}
var G, K, q, J, po, mo, Y, ho, go, _o, vo, yo, bo, X, xo = !1, So = !1, Co = [], wo, To, Eo, Do, Oo, ko, Ao, jo, Mo, No = !1, Po = !1, Fo, Z, Io = [], Lo = !1, Ro = [], zo = typeof document < "u", Bo = Na, Vo = Aa || ka ? "cssFloat" : "float", Ho = zo && !Pa && !Na && "draggable" in document.createElement("div"), Uo = function() {
	if (zo) {
		if (ka) return !1;
		var e = document.createElement("x");
		return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
	}
}(), Wo = function(e, t) {
	var n = B(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = Wa(e, 0, t), a = Wa(e, 1, t), o = i && B(i), s = a && B(a), c = o && parseInt(o.marginLeft) + parseInt(o.marginRight) + V(i).width, l = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + V(a).width;
	if (n.display === "flex") return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
	if (n.display === "grid") return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
	if (i && o.float && o.float !== "none") {
		var u = o.float === "left" ? "left" : "right";
		return a && (s.clear === "both" || s.clear === u) ? "vertical" : "horizontal";
	}
	return i && (o.display === "block" || o.display === "flex" || o.display === "table" || o.display === "grid" || c >= r && n[Vo] === "none" || a && n[Vo] === "none" && c + l > r) ? "vertical" : "horizontal";
}, Go = function(e, t, n) {
	var r = n ? e.left : e.top, i = n ? e.right : e.bottom, a = n ? e.width : e.height, o = n ? t.left : t.top, s = n ? t.right : t.bottom, c = n ? t.width : t.height;
	return r === o || i === s || r + a / 2 === o + c / 2;
}, Ko = function(e, t) {
	var n;
	return Co.some(function(r) {
		var i = r[H].options.emptyInsertThreshold;
		if (!(!i || Ga(r))) {
			var a = V(r), o = e >= a.left - i && e <= a.right + i, s = t >= a.top - i && t <= a.bottom + i;
			if (o && s) return n = r;
		}
	}), n;
}, qo = function(e) {
	function t(e, n) {
		return function(r, i, a, o) {
			var s = r.options.group.name && i.options.group.name && r.options.group.name === i.options.group.name;
			if (e == null && (n || s)) return !0;
			if (e == null || e === !1) return !1;
			if (n && e === "clone") return e;
			if (typeof e == "function") return t(e(r, i, a, o), n)(r, i, a, o);
			var c = (n ? r : i).options.group.name;
			return e === !0 || typeof e == "string" && e === c || e.join && e.indexOf(c) > -1;
		};
	}
	var n = {}, r = e.group;
	(!r || Sa(r) != "object") && (r = { name: r }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, Jo = function() {
	!Uo && q && B(q, "display", "none");
}, Yo = function() {
	!Uo && q && B(q, "display", "");
};
zo && !Pa && document.addEventListener("click", function(e) {
	if (So) return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), So = !1, !1;
}, !0);
var Xo = function(e) {
	if (G) {
		e = e.touches ? e.touches[0] : e;
		var t = Ko(e.clientX, e.clientY);
		if (t) {
			var n = {};
			for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
			n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[H]._onDragOver(n);
		}
	}
}, Zo = function(e) {
	G && G.parentNode[H]._isOutsideThisEl(e.target);
};
function Q(e, t) {
	if (!(e && e.nodeType && e.nodeType === 1)) throw `Sortable: \`el\` must be an HTMLElement, not ${{}.toString.call(e)}`;
	this.el = e, this.options = t = wa({}, t), e[H] = this;
	var n = {
		group: null,
		sort: !0,
		disabled: !1,
		store: null,
		handle: null,
		draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
		swapThreshold: 1,
		invertSwap: !1,
		invertedSwapThreshold: null,
		removeCloneOnHide: !0,
		direction: function() {
			return Wo(e, this.options);
		},
		ghostClass: "sortable-ghost",
		chosenClass: "sortable-chosen",
		dragClass: "sortable-drag",
		ignore: "a, img",
		filter: null,
		preventOnFilter: !0,
		animation: 0,
		easing: null,
		setData: function(e, t) {
			e.setData("Text", t.textContent);
		},
		dropBubble: !1,
		dragoverBubble: !1,
		dataIdAttr: "data-id",
		delay: 0,
		delayOnTouchOnly: !1,
		touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
		forceFallback: !1,
		fallbackClass: "sortable-fallback",
		fallbackOnBody: !1,
		fallbackTolerance: 0,
		fallbackOffset: {
			x: 0,
			y: 0
		},
		supportPointer: Q.supportPointer !== !1 && "PointerEvent" in window && !Ma,
		emptyInsertThreshold: 5
	};
	for (var r in lo.initializePlugins(this, e, n), n) !(r in t) && (t[r] = n[r]);
	for (var i in qo(t), this) i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
	this.nativeDraggable = !t.forceFallback && Ho, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? L(e, "pointerdown", this._onTapStart) : (L(e, "mousedown", this._onTapStart), L(e, "touchstart", this._onTapStart)), this.nativeDraggable && (L(e, "dragover", this), L(e, "dragenter", this)), Co.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), wa(this, io());
}
Q.prototype = {
	constructor: Q,
	_isOutsideThisEl: function(e) {
		!this.el.contains(e) && e !== this.el && (jo = null);
	},
	_getDirection: function(e, t) {
		return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, G) : this.options.direction;
	},
	_onTapStart: function(e) {
		if (e.cancelable) {
			var t = this, n = this.el, r = this.options, i = r.preventOnFilter, a = e.type, o = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (o || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, l = r.filter;
			if (ss(n), !G && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && Ma && s && s.tagName.toUpperCase() === "SELECT") && (s = Ra(s, r.draggable, n, !1), !(s && s.animated) && mo !== s)) {
				if (go = Ka(s), vo = Ka(s, r.draggable), typeof l == "function") {
					if (l.call(this, e, s, this)) {
						W({
							sortable: t,
							rootEl: c,
							name: "filter",
							targetEl: s,
							toEl: n,
							fromEl: n
						}), U("filter", t, { evt: e }), i && e.cancelable && e.preventDefault();
						return;
					}
				} else if (l && (l = l.split(",").some(function(r) {
					if (r = Ra(c, r.trim(), n, !1), r) return W({
						sortable: t,
						rootEl: r,
						name: "filter",
						targetEl: s,
						fromEl: n,
						toEl: n
					}), U("filter", t, { evt: e }), !0;
				}), l)) {
					i && e.cancelable && e.preventDefault();
					return;
				}
				r.handle && !Ra(c, r.handle, n, !1) || this._prepareDragStart(e, o, s);
			}
		}
	},
	_prepareDragStart: function(e, t, n) {
		var r = this, i = r.el, a = r.options, o = i.ownerDocument, s;
		if (n && !G && n.parentNode === i) {
			var c = V(n);
			if (J = i, G = n, K = G.parentNode, po = G.nextSibling, mo = n, bo = a.group, Q.dragged = G, wo = {
				target: G,
				clientX: (t || e).clientX,
				clientY: (t || e).clientY
			}, Oo = wo.clientX - c.left, ko = wo.clientY - c.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, G.style["will-change"] = "all", s = function() {
				if (U("delayEnded", r, { evt: e }), Q.eventCanceled) {
					r._onDrop();
					return;
				}
				r._disableDelayedDragEvents(), !ja && r.nativeDraggable && (G.draggable = !0), r._triggerDragStart(e, t), W({
					sortable: r,
					name: "choose",
					originalEvent: e
				}), z(G, a.chosenClass, !0);
			}, a.ignore.split(",").forEach(function(e) {
				Va(G, e.trim(), es);
			}), L(o, "dragover", Xo), L(o, "mousemove", Xo), L(o, "touchmove", Xo), L(o, "mouseup", r._onDrop), L(o, "touchend", r._onDrop), L(o, "touchcancel", r._onDrop), ja && this.nativeDraggable && (this.options.touchStartThreshold = 4, G.draggable = !0), U("delayStart", this, { evt: e }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(Aa || ka))) {
				if (Q.eventCanceled) {
					this._onDrop();
					return;
				}
				L(o, "mouseup", r._disableDelayedDrag), L(o, "touchend", r._disableDelayedDrag), L(o, "touchcancel", r._disableDelayedDrag), L(o, "mousemove", r._delayedDragTouchMoveHandler), L(o, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && L(o, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
			} else s();
		}
	},
	_delayedDragTouchMoveHandler: function(e) {
		var t = e.touches ? e.touches[0] : e;
		Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
	},
	_disableDelayedDrag: function() {
		G && es(G), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
	},
	_disableDelayedDragEvents: function() {
		var e = this.el.ownerDocument;
		R(e, "mouseup", this._disableDelayedDrag), R(e, "touchend", this._disableDelayedDrag), R(e, "touchcancel", this._disableDelayedDrag), R(e, "mousemove", this._delayedDragTouchMoveHandler), R(e, "touchmove", this._delayedDragTouchMoveHandler), R(e, "pointermove", this._delayedDragTouchMoveHandler);
	},
	_triggerDragStart: function(e, t) {
		t ||= e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? L(document, "pointermove", this._onTouchMove) : t ? L(document, "touchmove", this._onTouchMove) : L(document, "mousemove", this._onTouchMove) : (L(G, "dragend", this), L(J, "dragstart", this._onDragStart));
		try {
			document.selection ? cs(function() {
				document.selection.empty();
			}) : window.getSelection().removeAllRanges();
		} catch {}
	},
	_dragStarted: function(e, t) {
		if (xo = !1, J && G) {
			U("dragStarted", this, { evt: t }), this.nativeDraggable && L(document, "dragover", Zo);
			var n = this.options;
			!e && z(G, n.dragClass, !1), z(G, n.ghostClass, !0), Q.active = this, e && this._appendGhost(), W({
				sortable: this,
				name: "start",
				originalEvent: t
			});
		} else this._nulling();
	},
	_emulateDragOver: function() {
		if (To) {
			this._lastX = To.clientX, this._lastY = To.clientY, Jo();
			for (var e = document.elementFromPoint(To.clientX, To.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(To.clientX, To.clientY), e !== t);) t = e;
			if (G.parentNode[H]._isOutsideThisEl(e), t) do {
				if (t[H]) {
					var n = void 0;
					if (n = t[H]._onDragOver({
						clientX: To.clientX,
						clientY: To.clientY,
						target: e,
						rootEl: t
					}), n && !this.options.dragoverBubble) break;
				}
				e = t;
			} while (t = t.parentNode);
			Yo();
		}
	},
	_onTouchMove: function(e) {
		if (wo) {
			var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = q && Ba(q, !0), o = q && a && a.a, s = q && a && a.d, c = Bo && Z && qa(Z), l = (i.clientX - wo.clientX + r.x) / (o || 1) + (c ? c[0] - Io[0] : 0) / (o || 1), u = (i.clientY - wo.clientY + r.y) / (s || 1) + (c ? c[1] - Io[1] : 0) / (s || 1);
			if (!Q.active && !xo) {
				if (n && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < n) return;
				this._onDragStart(e, !0);
			}
			if (q) {
				a ? (a.e += l - (Eo || 0), a.f += u - (Do || 0)) : a = {
					a: 1,
					b: 0,
					c: 0,
					d: 1,
					e: l,
					f: u
				};
				var d = `matrix(${a.a},${a.b},${a.c},${a.d},${a.e},${a.f})`;
				B(q, "webkitTransform", d), B(q, "mozTransform", d), B(q, "msTransform", d), B(q, "transform", d), Eo = l, Do = u, To = i;
			}
			e.cancelable && e.preventDefault();
		}
	},
	_appendGhost: function() {
		if (!q) {
			var e = this.options.fallbackOnBody ? document.body : J, t = V(G, !0, Bo, !0, e), n = this.options;
			if (Bo) {
				for (Z = e; B(Z, "position") === "static" && B(Z, "transform") === "none" && Z !== document;) Z = Z.parentNode;
				Z !== document.body && Z !== document.documentElement ? (Z === document && (Z = Ha()), t.top += Z.scrollTop, t.left += Z.scrollLeft) : Z = Ha(), Io = qa(Z);
			}
			q = G.cloneNode(!0), z(q, n.ghostClass, !1), z(q, n.fallbackClass, !0), z(q, n.dragClass, !0), B(q, "transition", ""), B(q, "transform", ""), B(q, "box-sizing", "border-box"), B(q, "margin", 0), B(q, "top", t.top), B(q, "left", t.left), B(q, "width", t.width), B(q, "height", t.height), B(q, "opacity", "0.8"), B(q, "position", Bo ? "absolute" : "fixed"), B(q, "zIndex", "100000"), B(q, "pointerEvents", "none"), Q.ghost = q, e.appendChild(q), B(q, "transform-origin", Oo / parseInt(q.style.width) * 100 + "% " + ko / parseInt(q.style.height) * 100 + "%");
		}
	},
	_onDragStart: function(e, t) {
		var n = this, r = e.dataTransfer, i = n.options;
		if (U("dragStart", this, { evt: e }), Q.eventCanceled) {
			this._onDrop();
			return;
		}
		U("setupClone", this), Q.eventCanceled || (Y = no(G), Y.removeAttribute("id"), Y.draggable = !1, Y.style["will-change"] = "", this._hideClone(), z(Y, this.options.chosenClass, !1), Q.clone = Y), n.cloneId = cs(function() {
			U("clone", n), !Q.eventCanceled && (n.options.removeCloneOnHide || J.insertBefore(Y, G), n._hideClone(), W({
				sortable: n,
				name: "clone"
			}));
		}), !t && z(G, i.dragClass, !0), t ? (So = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (R(document, "mouseup", n._onDrop), R(document, "touchend", n._onDrop), R(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(n, r, G)), L(document, "drop", n), B(G, "transform", "translateZ(0)")), xo = !0, n._dragStartId = cs(n._dragStarted.bind(n, t, e)), L(document, "selectstart", n), Ao = !0, Ma && B(document.body, "user-select", "none");
	},
	_onDragOver: function(e) {
		var t = this.el, n = e.target, r, i, a, o = this.options, s = o.group, c = Q.active, l = bo === s, u = o.sort, d = X || c, f, p = this, m = !1;
		if (Lo) return;
		function h(o, s) {
			U(o, p, xa({
				evt: e,
				isOwner: l,
				axis: f ? "vertical" : "horizontal",
				revert: a,
				dragRect: r,
				targetRect: i,
				canSort: u,
				fromSortable: d,
				target: n,
				completed: _,
				onMove: function(n, i) {
					return $o(J, t, G, r, n, V(n), e, i);
				},
				changed: v
			}, s));
		}
		function g() {
			h("dragOverAnimationCapture"), p.captureAnimationState(), p !== d && d.captureAnimationState();
		}
		function _(r) {
			return h("dragOverCompleted", { insertion: r }), r && (l ? c._hideClone() : c._showClone(p), p !== d && (z(G, X ? X.options.ghostClass : c.options.ghostClass, !1), z(G, o.ghostClass, !0)), X !== p && p !== Q.active ? X = p : p === Q.active && X && (X = null), d === p && (p._ignoreWhileAnimating = n), p.animateAll(function() {
				h("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
			}), p !== d && (d.animateAll(), d._ignoreWhileAnimating = null)), (n === G && !G.animated || n === t && !n.animated) && (jo = null), !o.dragoverBubble && !e.rootEl && n !== document && (G.parentNode[H]._isOutsideThisEl(e.target), !r && Xo(e)), !o.dragoverBubble && e.stopPropagation && e.stopPropagation(), m = !0;
		}
		function v() {
			_o = Ka(G), yo = Ka(G, o.draggable), W({
				sortable: p,
				name: "change",
				toEl: t,
				newIndex: _o,
				newDraggableIndex: yo,
				originalEvent: e
			});
		}
		if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = Ra(n, o.draggable, t, !0), h("dragOver"), Q.eventCanceled) return m;
		if (G.contains(e.target) || n.animated && n.animatingX && n.animatingY || p._ignoreWhileAnimating === n) return _(!1);
		if (So = !1, c && !o.disabled && (l ? u || (a = K !== J) : X === this || (this.lastPutMode = bo.checkPull(this, c, G, e)) && s.checkPut(this, c, G, e))) {
			if (f = this._getDirection(e, n) === "vertical", r = V(G), h("dragOverValid"), Q.eventCanceled) return m;
			if (a) return K = J, g(), this._hideClone(), h("revert"), Q.eventCanceled || (po ? J.insertBefore(G, po) : J.appendChild(G)), _(!0);
			var y = Ga(t, o.draggable);
			if (!y || rs(e, f, this) && !y.animated) {
				if (y === G) return _(!1);
				if (y && t === e.target && (n = y), n && (i = V(n)), $o(J, t, G, r, n, i, e, !!n) !== !1) return g(), y && y.nextSibling ? t.insertBefore(G, y.nextSibling) : t.appendChild(G), K = t, v(), _(!0);
			} else if (y && ns(e, f, this)) {
				var b = Wa(t, 0, o, !0);
				if (b === G) return _(!1);
				if (n = b, i = V(n), $o(J, t, G, r, n, i, e, !1) !== !1) return g(), t.insertBefore(G, b), K = t, v(), _(!0);
			} else if (n.parentNode === t) {
				i = V(n);
				var x = 0, S, C = G.parentNode !== t, w = !Go(G.animated && G.toRect || r, n.animated && n.toRect || i, f), T = f ? "top" : "left", E = Ua(n, "top", "top") || Ua(G, "top", "top"), D = E ? E.scrollTop : void 0;
				jo !== n && (S = i[T], No = !1, Po = !w && o.invertSwap || C), x = is(e, n, i, f, w ? 1 : o.swapThreshold, o.invertedSwapThreshold == null ? o.swapThreshold : o.invertedSwapThreshold, Po, jo === n);
				var O;
				if (x !== 0) {
					var k = Ka(G);
					do
						k -= x, O = K.children[k];
					while (O && (B(O, "display") === "none" || O === q));
				}
				if (x === 0 || O === n) return _(!1);
				jo = n, Mo = x;
				var A = n.nextElementSibling, j = !1;
				j = x === 1;
				var ee = $o(J, t, G, r, n, i, e, j);
				if (ee !== !1) return (ee === 1 || ee === -1) && (j = ee === 1), Lo = !0, setTimeout(ts, 30), g(), j && !A ? t.appendChild(G) : n.parentNode.insertBefore(G, j ? A : n), E && to(E, 0, D - E.scrollTop), K = G.parentNode, S !== void 0 && !Po && (Fo = Math.abs(S - V(n)[T])), v(), _(!0);
			}
			if (t.contains(G)) return _(!1);
		}
		return !1;
	},
	_ignoreWhileAnimating: null,
	_offMoveEvents: function() {
		R(document, "mousemove", this._onTouchMove), R(document, "touchmove", this._onTouchMove), R(document, "pointermove", this._onTouchMove), R(document, "dragover", Xo), R(document, "mousemove", Xo), R(document, "touchmove", Xo);
	},
	_offUpEvents: function() {
		var e = this.el.ownerDocument;
		R(e, "mouseup", this._onDrop), R(e, "touchend", this._onDrop), R(e, "pointerup", this._onDrop), R(e, "touchcancel", this._onDrop), R(document, "selectstart", this);
	},
	_onDrop: function(e) {
		var t = this.el, n = this.options;
		if (_o = Ka(G), yo = Ka(G, n.draggable), U("drop", this, { evt: e }), K = G && G.parentNode, _o = Ka(G), yo = Ka(G, n.draggable), Q.eventCanceled) {
			this._nulling();
			return;
		}
		xo = !1, Po = !1, No = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), ls(this.cloneId), ls(this._dragStartId), this.nativeDraggable && (R(document, "drop", this), R(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Ma && B(document.body, "user-select", ""), B(G, "transform", ""), e && (Ao && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), q && q.parentNode && q.parentNode.removeChild(q), (J === K || X && X.lastPutMode !== "clone") && Y && Y.parentNode && Y.parentNode.removeChild(Y), G && (this.nativeDraggable && R(G, "dragend", this), es(G), G.style["will-change"] = "", Ao && !xo && z(G, X ? X.options.ghostClass : this.options.ghostClass, !1), z(G, this.options.chosenClass, !1), W({
			sortable: this,
			name: "unchoose",
			toEl: K,
			newIndex: null,
			newDraggableIndex: null,
			originalEvent: e
		}), J === K ? _o !== go && _o >= 0 && (W({
			sortable: this,
			name: "update",
			toEl: K,
			originalEvent: e
		}), W({
			sortable: this,
			name: "sort",
			toEl: K,
			originalEvent: e
		})) : (_o >= 0 && (W({
			rootEl: K,
			name: "add",
			toEl: K,
			fromEl: J,
			originalEvent: e
		}), W({
			sortable: this,
			name: "remove",
			toEl: K,
			originalEvent: e
		}), W({
			rootEl: K,
			name: "sort",
			toEl: K,
			fromEl: J,
			originalEvent: e
		}), W({
			sortable: this,
			name: "sort",
			toEl: K,
			originalEvent: e
		})), X && X.save()), Q.active && ((_o == null || _o === -1) && (_o = go, yo = vo), W({
			sortable: this,
			name: "end",
			toEl: K,
			originalEvent: e
		}), this.save()))), this._nulling();
	},
	_nulling: function() {
		U("nulling", this), J = G = K = q = po = Y = mo = ho = wo = To = Ao = _o = yo = go = vo = jo = Mo = X = bo = Q.dragged = Q.ghost = Q.clone = Q.active = null, Ro.forEach(function(e) {
			e.checked = !0;
		}), Ro.length = Eo = Do = 0;
	},
	handleEvent: function(e) {
		switch (e.type) {
			case "drop":
			case "dragend":
				this._onDrop(e);
				break;
			case "dragenter":
			case "dragover":
				G && (this._onDragOver(e), Qo(e));
				break;
			case "selectstart": e.preventDefault();
		}
	},
	toArray: function() {
		for (var e = [], t, n = this.el.children, r = 0, i = n.length, a = this.options; r < i; r++) t = n[r], Ra(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || os(t));
		return e;
	},
	sort: function(e, t) {
		var n = {}, r = this.el;
		this.toArray().forEach(function(e, t) {
			var i = r.children[t];
			Ra(i, this.options.draggable, r, !1) && (n[e] = i);
		}, this), t && this.captureAnimationState(), e.forEach(function(e) {
			n[e] && (r.removeChild(n[e]), r.appendChild(n[e]));
		}), t && this.animateAll();
	},
	save: function() {
		var e = this.options.store;
		e && e.set && e.set(this);
	},
	closest: function(e, t) {
		return Ra(e, t || this.options.draggable, this.el, !1);
	},
	option: function(e, t) {
		var n = this.options;
		if (t === void 0) return n[e];
		var r = lo.modifyOption(this, e, t);
		n[e] = r === void 0 ? t : r, e === "group" && qo(n);
	},
	destroy: function() {
		U("destroy", this);
		var e = this.el;
		e[H] = null, R(e, "mousedown", this._onTapStart), R(e, "touchstart", this._onTapStart), R(e, "pointerdown", this._onTapStart), this.nativeDraggable && (R(e, "dragover", this), R(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(e) {
			e.removeAttribute("draggable");
		}), this._onDrop(), this._disableDelayedDragEvents(), Co.splice(Co.indexOf(this.el), 1), this.el = e = null;
	},
	_hideClone: function() {
		if (!ho) {
			if (U("hideClone", this), Q.eventCanceled) return;
			B(Y, "display", "none"), this.options.removeCloneOnHide && Y.parentNode && Y.parentNode.removeChild(Y), ho = !0;
		}
	},
	_showClone: function(e) {
		if (e.lastPutMode !== "clone") {
			this._hideClone();
			return;
		}
		if (ho) {
			if (U("showClone", this), Q.eventCanceled) return;
			G.parentNode == J && !this.options.group.revertClone ? J.insertBefore(Y, G) : po ? J.insertBefore(Y, po) : J.appendChild(Y), this.options.group.revertClone && this.animate(G, Y), B(Y, "display", ""), ho = !1;
		}
	}
};
function Qo(e) {
	e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function $o(e, t, n, r, i, a, o, s) {
	var c, l = e[H], u = l.options.onMove, d;
	return window.CustomEvent && !ka && !Aa ? c = new CustomEvent("move", {
		bubbles: !0,
		cancelable: !0
	}) : (c = document.createEvent("Event"), c.initEvent("move", !0, !0)), c.to = t, c.from = e, c.dragged = n, c.draggedRect = r, c.related = i || t, c.relatedRect = a || V(t), c.willInsertAfter = s, c.originalEvent = o, e.dispatchEvent(c), u && (d = u.call(l, c, o)), d;
}
function es(e) {
	e.draggable = !1;
}
function ts() {
	Lo = !1;
}
function ns(e, t, n) {
	var r = V(Wa(n.el, 0, n.options, !0)), i = ro(n.el, n.options, q), a = 10;
	return t ? e.clientX < i.left - a || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - a || e.clientY < r.bottom && e.clientX < r.left;
}
function rs(e, t, n) {
	var r = V(Ga(n.el, n.options.draggable)), i = ro(n.el, n.options, q), a = 10;
	return t ? e.clientX > i.right + a || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + a || e.clientX > r.right && e.clientY > r.top;
}
function is(e, t, n, r, i, a, o, s) {
	var c = r ? e.clientY : e.clientX, l = r ? n.height : n.width, u = r ? n.top : n.left, d = r ? n.bottom : n.right, f = !1;
	if (!o) {
		if (s && Fo < l * i) {
			if (!No && (Mo === 1 ? c > u + l * a / 2 : c < d - l * a / 2) && (No = !0), No) f = !0;
			else if (Mo === 1 ? c < u + Fo : c > d - Fo) return -Mo;
		} else if (c > u + l * (1 - i) / 2 && c < d - l * (1 - i) / 2) return as(t);
	}
	return f ||= o, f && (c < u + l * a / 2 || c > d - l * a / 2) ? c > u + l / 2 ? 1 : -1 : 0;
}
function as(e) {
	return Ka(G) < Ka(e) ? 1 : -1;
}
function os(e) {
	for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--;) r += t.charCodeAt(n);
	return r.toString(36);
}
function ss(e) {
	Ro.length = 0;
	for (var t = e.getElementsByTagName("input"), n = t.length; n--;) {
		var r = t[n];
		r.checked && Ro.push(r);
	}
}
function cs(e) {
	return setTimeout(e, 0);
}
function ls(e) {
	return clearTimeout(e);
}
zo && L(document, "touchmove", function(e) {
	(Q.active || xo) && e.cancelable && e.preventDefault();
}), Q.utils = {
	on: L,
	off: R,
	css: B,
	find: Va,
	is: function(e, t) {
		return !!Ra(e, t, e, !1);
	},
	extend: Xa,
	throttle: $a,
	closest: Ra,
	toggleClass: z,
	clone: no,
	index: Ka,
	nextTick: cs,
	cancelNextTick: ls,
	detectDirection: Wo,
	getChild: Wa
}, Q.get = function(e) {
	return e[H];
}, Q.mount = function() {
	var e = [...arguments];
	e[0].constructor === Array && (e = e[0]), e.forEach(function(e) {
		if (!e.prototype || !e.prototype.constructor) throw `Sortable: Mounted plugin must be a constructor function, not ${{}.toString.call(e)}`;
		e.utils && (Q.utils = xa(xa({}, Q.utils), e.utils)), lo.mount(e);
	});
}, Q.create = function(e, t) {
	return new Q(e, t);
}, Q.version = Da;
var $ = [], us, ds, fs = !1, ps, ms, hs, gs;
function _s() {
	function e() {
		for (var e in this.defaults = {
			scroll: !0,
			forceAutoScrollFallback: !1,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			bubbleScroll: !0
		}, this) e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
	}
	return e.prototype = {
		dragStarted: function(e) {
			var t = e.originalEvent;
			this.sortable.nativeDraggable ? L(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? L(document, "pointermove", this._handleFallbackAutoScroll) : t.touches ? L(document, "touchmove", this._handleFallbackAutoScroll) : L(document, "mousemove", this._handleFallbackAutoScroll);
		},
		dragOverCompleted: function(e) {
			var t = e.originalEvent;
			!this.options.dragOverBubble && !t.rootEl && this._handleAutoScroll(t);
		},
		drop: function() {
			this.sortable.nativeDraggable ? R(document, "dragover", this._handleAutoScroll) : (R(document, "pointermove", this._handleFallbackAutoScroll), R(document, "touchmove", this._handleFallbackAutoScroll), R(document, "mousemove", this._handleFallbackAutoScroll)), ys(), vs(), eo();
		},
		nulling: function() {
			hs = ds = us = fs = gs = ps = ms = null, $.length = 0;
		},
		_handleFallbackAutoScroll: function(e) {
			this._handleAutoScroll(e, !0);
		},
		_handleAutoScroll: function(e, t) {
			var n = this, r = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, a = document.elementFromPoint(r, i);
			if (hs = e, t || this.options.forceAutoScrollFallback || Aa || ka || Ma) {
				bs(e, this.options, a, t);
				var o = Ya(a, !0);
				fs && (!gs || r !== ps || i !== ms) && (gs && ys(), gs = setInterval(function() {
					var a = Ya(document.elementFromPoint(r, i), !0);
					a !== o && (o = a, vs()), bs(e, n.options, a, t);
				}, 10), ps = r, ms = i);
			} else {
				if (!this.options.bubbleScroll || Ya(a, !0) === Ha()) {
					vs();
					return;
				}
				bs(e, this.options, Ya(a, !1), !1);
			}
		}
	}, wa(e, {
		pluginName: "scroll",
		initializeByDefault: !0
	});
}
function vs() {
	$.forEach(function(e) {
		clearInterval(e.pid);
	}), $ = [];
}
function ys() {
	clearInterval(gs);
}
var bs = $a(function(e, t, n, r) {
	if (t.scroll) {
		var i = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, o = t.scrollSensitivity, s = t.scrollSpeed, c = Ha(), l = !1, u;
		ds !== n && (ds = n, vs(), us = t.scroll, u = t.scrollFn, us === !0 && (us = Ya(n, !0)));
		var d = 0, f = us;
		do {
			var p = f, m = V(p), h = m.top, g = m.bottom, _ = m.left, v = m.right, y = m.width, b = m.height, x = void 0, S = void 0, C = p.scrollWidth, w = p.scrollHeight, T = B(p), E = p.scrollLeft, D = p.scrollTop;
			p === c ? (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll"));
			var O = x && (Math.abs(v - i) <= o && E + y < C) - (Math.abs(_ - i) <= o && !!E), k = S && (Math.abs(g - a) <= o && D + b < w) - (Math.abs(h - a) <= o && !!D);
			if (!$[d]) for (var A = 0; A <= d; A++) $[A] || ($[A] = {});
			($[d].vx != O || $[d].vy != k || $[d].el !== p) && ($[d].el = p, $[d].vx = O, $[d].vy = k, clearInterval($[d].pid), (O != 0 || k != 0) && (l = !0, $[d].pid = setInterval(function() {
				r && this.layer === 0 && Q.active._onTouchMove(hs);
				var t = $[this.layer].vy ? $[this.layer].vy * s : 0, n = $[this.layer].vx ? $[this.layer].vx * s : 0;
				typeof u == "function" && u.call(Q.dragged.parentNode[H], n, t, e, hs, $[this.layer].el) !== "continue" || to($[this.layer].el, n, t);
			}.bind({ layer: d }), 24))), d++;
		} while (t.bubbleScroll && f !== c && (f = Ya(f, !1)));
		fs = l;
	}
}, 30), xs = function(e) {
	var t = e.originalEvent, n = e.putSortable, r = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, o = e.hideGhostForTarget, s = e.unhideGhostForTarget;
	if (t) {
		var c = n || i;
		o();
		var l = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, u = document.elementFromPoint(l.clientX, l.clientY);
		s(), c && !c.el.contains(u) && (a("spill"), this.onSpill({
			dragEl: r,
			putSortable: n
		}));
	}
};
function Ss() {}
Ss.prototype = {
	startIndex: null,
	dragStart: function(e) {
		var t = e.oldDraggableIndex;
		this.startIndex = t;
	},
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable;
		this.sortable.captureAnimationState(), n && n.captureAnimationState();
		var r = Wa(this.sortable.el, this.startIndex, this.options);
		r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
	},
	drop: xs
}, wa(Ss, { pluginName: "revertOnSpill" });
function Cs() {}
Cs.prototype = {
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable || this.sortable;
		n.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), n.animateAll();
	},
	drop: xs
}, wa(Cs, { pluginName: "removeOnSpill" }), Q.mount(new _s()), Q.mount(Cs, Ss);
function ws(e) {
	return e == null ? e : JSON.parse(JSON.stringify(e));
}
function Ts(e) {
	ne() && r(e);
}
function Es(e) {
	ne() ? a(e) : re(e);
}
var Ds = null, Os = null;
function ks(e = null, t = null) {
	Ds = e, Os = t;
}
function As() {
	return {
		data: Ds,
		clonedData: Os
	};
}
var js = Symbol("cloneElement");
function Ms(...e) {
	let t = ne()?.proxy, n = null, r = e[0], [, i, a] = e;
	Array.isArray(k(i)) || (a = i, i = null);
	let o = null, { immediate: s = !0, clone: l = ws, forceFallback: u, fallbackOnBody: d, customUpdate: f } = k(a) ?? {};
	function p(e) {
		let { from: t, oldIndex: r, item: a } = e, o = Array.from(t.childNodes);
		n = u && !d ? o.slice(0, -1) : o;
		let s = k(k(i)?.[r]), c = l(s);
		ks(s, c), a[js] = c;
	}
	function m(e) {
		let t = e.item[js];
		if (!la(t)) {
			if (fa(e.item), g(i)) {
				let n = [...k(i)];
				i.value = ca(n, e.newDraggableIndex, t);
				return;
			}
			ca(k(i), e.newDraggableIndex, t);
		}
	}
	function h(e) {
		let { from: t, item: n, oldIndex: r, oldDraggableIndex: a, pullMode: o, clone: s } = e;
		if (da(t, n, r), o === "clone") {
			fa(s);
			return;
		}
		if (g(i)) {
			let e = [...k(i)];
			i.value = sa(e, a);
			return;
		}
		sa(k(i), a);
	}
	function _(e) {
		if (f) {
			f(e);
			return;
		}
		let { from: t, item: n, oldIndex: r, oldDraggableIndex: a, newDraggableIndex: o } = e;
		if (fa(n), da(t, n, r), g(i)) {
			let e = [...k(i)];
			i.value = ia(e, a, o);
			return;
		}
		ia(k(i), a, o);
	}
	function v(e) {
		let { newIndex: t, oldIndex: r, from: i, to: a } = e, o = null, s = t === r && i === a;
		try {
			if (s) {
				let e = null;
				n?.some((t, r) => {
					if (e && n?.length !== a.childNodes.length) return i.insertBefore(e, t.nextSibling), !0;
					let o = a.childNodes[r];
					e = a?.replaceChild(t, o);
				});
			}
		} catch (e) {
			o = e;
		} finally {
			n = null;
		}
		re(() => {
			if (ks(), o) throw o;
		});
	}
	let y = {
		onUpdate: _,
		onStart: p,
		onAdd: m,
		onRemove: h,
		onEnd: v
	};
	function b(e) {
		let n = k(r);
		return e ||= ua(n) ? pa(n, t?.$el) : n, e && !ga(e) && (e = e.$el), e || ra("Root element not found"), e;
	}
	function x() {
		let e = k(a) ?? {}, { immediate: t, clone: n } = e, r = ea(e, ["immediate", "clone"]);
		return _a(r, (e, t) => {
			va(e) && (r[e] = (e, ...n) => (ya(e, As()), t(e, ...n)));
		}), ha(i === null ? {} : y, r);
	}
	let S = (e) => {
		e = b(e), o && C.destroy(), o = new Q(e, x());
	};
	c(() => a, () => {
		o && _a(x(), (e, t) => {
			o?.option(e, t);
		});
	}, { deep: !0 });
	let C = {
		option: (e, t) => o?.option(e, t),
		destroy: () => {
			o?.destroy(), o = null;
		},
		save: () => o?.save(),
		toArray: () => o?.toArray(),
		closest: (...e) => o?.closest(...e)
	};
	return Es(() => {
		s && S();
	}), Ts(C.destroy), $i({
		start: S,
		pause: () => C?.option("disabled", !0),
		resume: () => C?.option("disabled", !1)
	}, C);
}
var Ns = [
	"update",
	"start",
	"add",
	"remove",
	"choose",
	"unchoose",
	"end",
	"sort",
	"filter",
	"clone",
	"move",
	"change"
], Ps = [
	"clone",
	"animation",
	"ghostClass",
	"group",
	"sort",
	"disabled",
	"store",
	"handle",
	"draggable",
	"swapThreshold",
	"invertSwap",
	"invertedSwapThreshold",
	"removeCloneOnHide",
	"direction",
	"chosenClass",
	"dragClass",
	"ignore",
	"filter",
	"preventOnFilter",
	"easing",
	"setData",
	"dropBubble",
	"dragoverBubble",
	"dataIdAttr",
	"delay",
	"delayOnTouchOnly",
	"touchStartThreshold",
	"forceFallback",
	"fallbackClass",
	"fallbackOnBody",
	"fallbackTolerance",
	"fallbackOffset",
	"supportPointer",
	"emptyInsertThreshold",
	"scroll",
	"forceAutoScrollFallback",
	"scrollSensitivity",
	"scrollSpeed",
	"bubbleScroll",
	"modelValue",
	"tag",
	"target",
	"customUpdate",
	...Ns.map((e) => `on${e.replace(/^\S/, (e) => e.toUpperCase())}`)
], Fs = y({
	name: "VueDraggable",
	model: {
		prop: "modelValue",
		event: "update:modelValue"
	},
	props: Ps,
	emits: ["update:modelValue", ...Ns],
	setup(t, { slots: n, emit: r, expose: i, attrs: a }) {
		let o = Ns.reduce((e, t) => {
			let n = `on${t.replace(/^\S/, (e) => e.toUpperCase())}`;
			return e[n] = (...e) => r(t, ...e), e;
		}, {}), s = M(() => {
			let n = e(t), { modelValue: r } = n, i = ea(n, ["modelValue"]), s = Object.entries(i).reduce((e, [t, n]) => {
				let r = k(n);
				return r !== void 0 && (e[t] = r), e;
			}, {});
			return $i($i({}, o), oa($i($i({}, a), s)));
		}), c = M({
			get: () => t.modelValue,
			set: (e) => r("update:modelValue", e)
		}), l = _(), u = A(Ms(t.target || l, c, s));
		return i(u), () => ie(t.tag || "div", { ref: l }, (n?.default)?.call(n, u));
	}
}), Is = {
	mounted: "mounted",
	unmounted: "unmounted"
};
Is.mounted, Is.unmounted;
//#endregion
//#region src/components/blocks/SectionBlock.vue?vue&type=script&setup=true&lang.ts
var Ls = { class: "tpl:w-full" }, Rs = {
	key: 0,
	"data-testid": "section-drop-hint",
	class: "tpl:pointer-events-none tpl:absolute tpl:inset-0 tpl:flex tpl:items-center tpl:justify-center tpl:text-xs tpl:text-[var(--tpl-chrome-text-dim)]"
}, zs = /* @__PURE__ */ y({
	__name: "SectionBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let n = {
			title: Ki,
			paragraph: Di,
			image: mi,
			button: tr,
			divider: Jr,
			custom: Kr
		}, r = e, { t: a } = Kt(), s = pt(jt, "SectionBlock"), c = P(At, null), l = P(Bt, null), u = P(kt, {}), h = P(zt, null);
		function g(e) {
			let t = u.savedBlocks;
			if (t?.isPicking.value) {
				t.togglePick(r.block.id);
				return;
			}
			s.selectBlock(e);
		}
		let _ = M(() => {
			switch (r.block.columns) {
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
		}), v = M(() => {
			let e = _.value.length, t = [...r.block.children];
			for (; t.length < e;) t.push([]);
			return t.slice(0, e);
		}), y = M(() => r.viewport === "mobile" && r.block.stackOnMobile !== !1);
		function S(e) {
			return v.value[e] || [];
		}
		function C(e, t) {
			let n = t.map((e) => JSON.parse(JSON.stringify(e))), i = [...r.block.children];
			for (; i.length <= e;) i.push([]);
			i[e] = n, s.updateBlock(r.block.id, { children: i });
		}
		function T(e) {
			return ki(e, l, n);
		}
		function E(e, t) {
			e.type === "custom" && s.updateBlock(e.id, {
				fieldValues: t.fieldValues,
				dataSourceFetched: t.dataSourceFetched
			});
		}
		return (n, r) => (f(), x("div", Ls, [b("div", { class: o(["tpl:flex tpl:gap-0", { "tpl:flex-col": y.value }]) }, [(f(!0), x(j, null, t(v.value, (n, r) => (f(), x("div", {
			key: r,
			class: o(["tpl:relative tpl:min-h-[60px] tpl:rounded", S(r).length === 0 ? "tpl:border tpl:border-dashed tpl:border-[var(--tpl-border)]" : ""]),
			style: i({ width: y.value ? "100%" : _.value[r] })
		}, [w(k(Fs), {
			"model-value": S(r),
			group: {
				name: "blocks",
				pull: !0,
				put: (e, t, n) => k(qi)(n)
			},
			animation: 150,
			"ghost-class": "tpl-ghost",
			"drag-class": "tpl-dragging",
			handle: ".tpl-block-btn",
			"invert-swap": !0,
			"inverted-swap-threshold": .65,
			"empty-insert-threshold": 20,
			"force-fallback": !0,
			class: "tpl:min-h-[60px]",
			"onUpdate:modelValue": (e) => C(r, e)
		}, {
			default: m(() => [(f(!0), x(j, null, t(S(r), (t) => ae((f(), x("div", { key: t.id }, [w(Wi, {
				block: t,
				"is-selected": k(s).state.selectedBlockId === t.id,
				viewport: e.viewport,
				"preview-mode": k(s).state.previewMode,
				nested: "",
				onSelect: (e) => g(t.id)
			}, {
				default: m(() => [(f(), D(d(T(t)), {
					block: t,
					viewport: e.viewport,
					onFetchData: (e) => E(t, e),
					onUpdate: (e) => k(s).updateBlock(t.id, e)
				}, null, 40, [
					"block",
					"viewport",
					"onFetchData",
					"onUpdate"
				]))]),
				_: 2
			}, 1032, [
				"block",
				"is-selected",
				"viewport",
				"preview-mode",
				"onSelect"
			])])), [[oe, k(h) === !1 || !k(c)?.isHidden(t.id)]])), 128))]),
			_: 2
		}, 1032, [
			"model-value",
			"group",
			"onUpdate:modelValue"
		]), S(r).length === 0 ? (f(), x("div", Rs, [b("span", null, p(k(a).section.dropHere), 1)])) : N("", !0)], 6))), 128))], 2)]));
	}
}), Bs = Ne, Vs = {
	small: 24,
	medium: 32,
	large: 48
}, Hs = [
	"facebook",
	"twitter",
	"instagram",
	"linkedin",
	"youtube",
	"tiktok",
	"pinterest",
	"email",
	"website",
	"whatsapp",
	"telegram",
	"discord",
	"snapchat",
	"reddit",
	"github",
	"dribbble",
	"behance"
], Us = [
	"width",
	"height",
	"fill"
], Ws = ["d"], Gs = /* @__PURE__ */ y({
	__name: "SocialIconSvg",
	props: {
		platform: {},
		iconStyle: {},
		iconSize: {}
	},
	setup(e) {
		let t = e, n = M(() => Bs[t.platform]), r = M(() => Vs[t.iconSize]), a = M(() => {
			let e = {
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				width: `${r.value}px`,
				height: `${r.value}px`
			};
			switch (t.iconStyle) {
				case "solid": return {
					...e,
					backgroundColor: n.value.color,
					borderRadius: "4px"
				};
				case "outlined": return {
					...e,
					backgroundColor: "transparent",
					border: `2px solid ${n.value.color}`,
					borderRadius: "4px"
				};
				case "rounded": return {
					...e,
					backgroundColor: n.value.color,
					borderRadius: "8px"
				};
				case "square": return {
					...e,
					backgroundColor: n.value.color,
					borderRadius: "0"
				};
				case "circle": return {
					...e,
					backgroundColor: n.value.color,
					borderRadius: "50%"
				};
				default: return e;
			}
		}), o = M(() => Math.floor(r.value * .6)), s = M(() => t.iconStyle === "outlined" ? n.value.color : "#ffffff");
		return (e, t) => (f(), x("span", { style: i(a.value) }, [(f(), x("svg", {
			width: o.value,
			height: o.value,
			viewBox: "0 0 24 24",
			fill: s.value,
			xmlns: "http://www.w3.org/2000/svg"
		}, [b("path", { d: n.value.path }, null, 8, Ws)], 8, Us))], 4));
	}
}), Ks = { class: "tpl:w-full" }, qs = ["href"], Js = {
	key: 1,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:text-sm tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text-dim)]"
}, Ys = /* @__PURE__ */ y({
	__name: "SocialIconsBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let n = e, { t: r } = Kt(), a = M(() => ({
			display: "flex",
			flexWrap: "wrap",
			gap: `${n.block.spacing}px`,
			justifyContent: n.block.align === "left" ? "flex-start" : n.block.align === "right" ? "flex-end" : "center"
		})), o = M(() => n.block.icons.length > 0);
		return (n, s) => (f(), x("div", Ks, [o.value ? (f(), x("div", {
			key: 0,
			style: i(a.value)
		}, [(f(!0), x(j, null, t(e.block.icons, (t) => (f(), x("a", {
			key: t.id,
			href: t.url || "#",
			class: "tpl:cursor-default",
			onClick: s[0] ||= F(() => {}, ["prevent"])
		}, [w(Gs, {
			platform: t.platform,
			"icon-style": e.block.iconStyle,
			"icon-size": e.block.iconSize
		}, null, 8, [
			"platform",
			"icon-style",
			"icon-size"
		])], 8, qs))), 128))], 4)) : (f(), x("div", Js, [w(k(fr), { size: 16 }), b("span", null, p(k(r).social.addIcons), 1)]))]));
	}
}), Xs = { class: "tpl:w-full" }, Zs = {
	key: 0,
	class: "tpl:absolute tpl:rounded tpl:px-2 tpl:py-0.5 tpl:text-[10px] tpl:font-medium",
	style: {
		"background-color": "var(--tpl-bg-hover)",
		color: "var(--tpl-text-dim)"
	}
}, Qs = /* @__PURE__ */ y({
	__name: "SpacerBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, n = pt(jt, "SpacerBlock"), r = M(() => ({
			height: `${t.block.height}px`,
			minHeight: `${t.block.height}px`,
			...n.state.previewMode ? {} : { borderColor: "var(--tpl-border)" }
		}));
		return (t, a) => (f(), x("div", Xs, [b("div", {
			style: i(r.value),
			class: o(["tpl:relative tpl:flex tpl:items-center tpl:justify-center", { "tpl:border-y tpl:border-dashed": !k(n).state.previewMode }])
		}, [k(n).state.previewMode ? N("", !0) : (f(), x("span", Zs, p(e.block.height) + "px ", 1))], 6)]));
	}
}), $s = { class: "tpl:w-full" }, ec = { key: 0 }, tc = [
	"aria-label",
	"data-placeholder",
	"onBlur"
], nc = [
	"aria-label",
	"data-placeholder",
	"onBlur"
], rc = {
	key: 1,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:text-sm tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text-dim)]"
}, ic = /*#__PURE__*/ Qt(/* @__PURE__ */ y({
	__name: "TableBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let n = {
			mounted(e, t) {
				e.textContent = t.value ?? "";
			},
			updated(e, t) {
				t.value !== t.oldValue && e.getRootNode().activeElement !== e && (e.textContent = t.value ?? "");
			}
		}, r = e, { t: a } = Kt(), o = pt(jt, "TableBlock"), s = M(() => r.block.rows.length > 0), c = M(() => {
			let e = {
				width: "100%",
				borderCollapse: "collapse",
				fontSize: `${r.block.fontSize}px`,
				textAlign: r.block.textAlign,
				fontFamily: r.block.fontFamily || "inherit"
			};
			return r.block.color && (e.color = r.block.color), e;
		}), l = M(() => ({
			border: `${r.block.borderWidth}px solid ${r.block.borderColor}`,
			padding: `${r.block.cellPadding}px`,
			textAlign: r.block.textAlign
		})), u = M(() => ({
			...l.value,
			fontWeight: "bold",
			backgroundColor: r.block.headerBackgroundColor || "transparent"
		})), d = M(() => r.block.hasHeaderRow && r.block.rows.length > 0 ? r.block.rows[0] : null), m = M(() => r.block.hasHeaderRow ? r.block.rows.slice(1) : r.block.rows);
		function h() {
			o.selectBlock(r.block.id);
		}
		function g(e, t, n) {
			let i = n.target.innerText.trim(), a = r.block.rows.map((n) => n.id === e ? {
				...n,
				cells: n.cells.map((e) => e.id === t ? {
					...e,
					content: i
				} : e)
			} : n);
			o.updateBlock(r.block.id, { rows: a });
		}
		return (e, r) => (f(), x("div", $s, [s.value ? (f(), x("table", {
			key: 0,
			style: i(c.value),
			class: "tpl-table-editable"
		}, [d.value ? (f(), x("thead", ec, [b("tr", null, [(f(!0), x(j, null, t(d.value.cells, (e) => ae((f(), x("th", {
			key: e.id,
			style: i(u.value),
			"aria-label": k(a).table.cellPlaceholder,
			contenteditable: "true",
			"data-placeholder": k(a).table.cellPlaceholder,
			onBlur: (t) => g(d.value.id, e.id, t),
			onKeydown: r[0] ||= se(F((e) => e.target.blur(), ["prevent"]), ["enter"]),
			onClick: F(h, ["stop"])
		}, null, 44, tc)), [[n, e.content]])), 128))])])) : N("", !0), b("tbody", null, [(f(!0), x(j, null, t(m.value, (e) => (f(), x("tr", { key: e.id }, [(f(!0), x(j, null, t(e.cells, (t) => ae((f(), x("td", {
			key: t.id,
			style: i(l.value),
			"aria-label": k(a).table.cellPlaceholder,
			contenteditable: "true",
			"data-placeholder": k(a).table.cellPlaceholder,
			onBlur: (n) => g(e.id, t.id, n),
			onKeydown: r[1] ||= se(F((e) => e.target.blur(), ["prevent"]), ["enter"]),
			onClick: F(h, ["stop"])
		}, null, 44, nc)), [[n, t.content]])), 128))]))), 128))])], 4)) : (f(), x("div", rc, [w(k(pr), { size: 16 }), b("span", null, p(k(a).table.empty), 1)]))]));
	}
}), [["__scopeId", "data-v-963ac422"]]), ac = /* @__PURE__ */ y({
	__name: "VideoPlayButton",
	props: { hoverEffect: {
		type: Boolean,
		default: !1
	} },
	setup(e) {
		return (t, n) => (f(), x("div", { class: o(["tpl:absolute tpl:inset-0 tpl:flex tpl:items-center tpl:justify-center tpl:bg-black/30", e.hoverEffect && "tpl:transition-opacity tpl:group-hover:bg-black/40"]) }, [...n[0] ||= [b("div", { class: "tpl:flex tpl:size-16 tpl:items-center tpl:justify-center tpl:rounded-full tpl:bg-white/90 tpl:shadow-lg" }, [b("svg", {
			class: "tpl:ml-1 tpl:text-[var(--tpl-danger)]",
			width: "28",
			height: "28",
			viewBox: "0 0 24 24",
			fill: "currentColor"
		}, [b("polygon", { points: "5,3 19,12 5,21" })])], -1)]], 2));
	}
});
//#endregion
//#region src/utils/videoThumbnail.ts
function oc(e) {
	if (!e) return {
		platform: "unknown",
		videoId: null,
		thumbnailUrl: null
	};
	for (let t of [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/i, /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i]) {
		let n = e.match(t);
		if (n) {
			let e = n[1];
			return {
				platform: "youtube",
				videoId: e,
				thumbnailUrl: `https://img.youtube.com/vi/${e}/maxresdefault.jpg`
			};
		}
	}
	let t = e.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
	if (t) {
		let e = t[1];
		return {
			platform: "vimeo",
			videoId: e,
			thumbnailUrl: `https://vumbnail.com/${e}.jpg`
		};
	}
	return {
		platform: "unknown",
		videoId: null,
		thumbnailUrl: null
	};
}
function sc(e, t) {
	return t || oc(e).thumbnailUrl;
}
//#endregion
//#region src/components/blocks/VideoBlock.vue?vue&type=script&setup=true&lang.ts
var cc = ["src", "alt"], lc = {
	class: "tpl:max-w-full tpl:truncate tpl:px-3 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-primary)]",
	style: { opacity: "0.7" }
}, uc = ["href"], dc = ["src", "alt"], fc = ["src", "alt"], pc = {
	key: 3,
	class: "tpl:flex tpl:min-h-[150px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-sm tpl:border-[var(--tpl-border-light)] tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-dim)]"
}, mc = /* @__PURE__ */ y({
	__name: "VideoBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, { t: n } = Kt(), { syntax: r } = $t(), a = M(() => Oe(t.block.url, r) || Oe(t.block.thumbnailUrl, r)), o = wn(() => a.value ? void 0 : t.block.thumbnailUrl || void 0), s = wn(() => a.value ? t.block.placeholderUrl : void 0), c = M(() => a.value ? null : t.block.thumbnailUrl ? o.value ?? null : sc(t.block.url)), l = M(() => ({ textAlign: t.block.align })), u = M(() => {
			let e = t.block.align;
			return {
				maxWidth: "100%",
				width: t.block.width === "full" ? "100%" : `${t.block.width}px`,
				display: "block",
				marginLeft: e === "center" || e === "right" ? "auto" : void 0,
				marginRight: e === "center" ? "auto" : void 0
			};
		}), d = M(() => Oe(t.block.url, r) ? t.block.url : t.block.thumbnailUrl);
		return (t, r) => (f(), x("div", {
			class: "tpl:w-full",
			style: i(l.value)
		}, [a.value && e.block.placeholderUrl ? (f(), x("div", {
			key: 0,
			class: "tpl:relative tpl:inline-block",
			style: i(u.value)
		}, [b("img", {
			class: "tpl:w-full tpl:border-0",
			src: k(s),
			alt: e.block.alt
		}, null, 8, cc), w(ac)], 4)) : a.value ? (f(), x("div", {
			key: 1,
			class: "tpl:relative tpl:!flex tpl:min-h-[150px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-center tpl:bg-[var(--tpl-bg-elevated)]",
			style: i([{ "border-color": "color-mix(in srgb, var(--tpl-primary) 40%, transparent)" }, u.value])
		}, [w(k(mr), {
			size: 36,
			"stroke-width": 1.5,
			class: "tpl:text-[var(--tpl-primary)]",
			style: { opacity: "0.5" }
		}), b("span", lc, [w(Qn, { text: d.value }, null, 8, ["text"])])], 4)) : c.value ? (f(), x(j, { key: 2 }, [e.block.url ? (f(), x("a", {
			key: 0,
			href: e.block.url,
			target: "_blank",
			rel: "noopener noreferrer",
			class: "tpl:group tpl:relative tpl:inline-block",
			style: i(u.value),
			onClick: r[0] ||= F(() => {}, ["prevent"])
		}, [b("img", {
			class: "tpl:w-full tpl:border-0",
			src: c.value,
			alt: e.block.alt
		}, null, 8, dc), w(ac, { "hover-effect": "" })], 12, uc)) : (f(), x("div", {
			key: 1,
			class: "tpl:relative tpl:inline-block",
			style: i(u.value)
		}, [b("img", {
			class: "tpl:w-full tpl:border-0",
			src: c.value,
			alt: e.block.alt
		}, null, 8, fc), w(ac)], 4))], 64)) : (f(), x("div", pc, [w(k(mr), {
			size: 40,
			"stroke-width": 1.5,
			class: "tpl:text-[var(--tpl-border-light)]"
		}), b("span", null, p(k(n).video.addVideo), 1)]))], 4));
	}
}), hc = {
	section: zs,
	title: Ki,
	paragraph: Di,
	image: mi,
	button: tr,
	divider: Jr,
	video: mc,
	social: Ys,
	menu: vi,
	table: ic,
	spacer: Qs,
	html: ei,
	countdown: C(() => import("./CountdownBlock-Bs2Q_bFX.js"))
};
function gc(e) {
	let { editor: t, config: n, translations: r, fontsManager: i } = e, { t: a, format: o } = Kt(r);
	t.setUiTheme(n.uiTheme ?? "auto");
	let { resolvedTheme: l } = Mn(M(() => t.state.uiTheme)), d = _(n.theme ?? {}), { themeStyles: f } = Pn({
		themeOverrides: d,
		resolvedTheme: l,
		extraStyles: e.themeExtraStyles
	}), p = sn({
		content: t.content,
		setContent: (e, n) => t.setContent(e, n),
		...e.historyOptions
	});
	pn(t, p);
	let m = ln({
		addBlock: t.addBlock,
		removeBlock: t.removeBlock,
		updateBlock: t.updateBlock,
		selectBlock: t.selectBlock,
		findBlockLocation: t.findBlockLocation,
		blockDefaults: n.blockDefaults
	}), h = dn(t), g = e.autoSaveOptions !== null && e.autoSaveOptions !== void 0 ? un({
		content: t.content,
		isDirty: () => t.state.isDirty,
		...e.autoSaveOptions
	}) : null, v = null;
	g && (v = c(p.isNavigating, (e) => {
		e ? g.pause() : g.resume();
	}));
	let y = jn(t, {
		t: a,
		format: o
	}, n.customBlocks ?? []), b = rt(n.colors);
	if (b.allowCustomIgnored && Ln.warn("config.colors.allowCustom: false is ignored without presets — keeping the color wheel and hex input so a color can still be chosen."), b.invalidPresets.length > 0 && Ln.warn(`config.colors.presets skipped invalid entries: ${b.invalidPresets.join(", ")} — presets must be hex colors (#rgb or #rrggbb).`), b.allowCustom === !1) {
		let e = Kn(b.presets, n.blockDefaults, n.templateDefaults);
		e.length > 0 && Ln.warn(`config.colors locks custom colours, but these block/template default colours fall outside colors.presets: ${e.join(", ")}. New blocks start on a colour the palette can't reselect — set blockDefaults / templateDefaults from the same palette.`);
	}
	let x = Rn();
	Un(x, hc);
	let S = /* @__PURE__ */ new Set();
	function C(e) {
		for (let t of e) {
			x.registerCustom(t, Kr);
			for (let e of Jn(t, b)) S.has(e.id) || (S.add(e.id), Ln.warn(e.message));
		}
	}
	n.customBlocks?.length && C(n.customBlocks);
	let w = bn();
	if (s() && u(w.dispose), e.containerEl) {
		let t = e.containerEl;
		ot(document, "pointerdown", (e) => {
			let n = t.value;
			n && (e.composedPath?.() ?? []).includes(n) && w.claim();
		}, { capture: !0 });
	}
	function T(r) {
		w.isActive() && Xn(r, {
			history: p,
			selectBlock: (e) => t.selectBlock(e),
			getSelectedBlockId: () => t.state.selectedBlockId,
			removeBlock: (e) => t.removeBlock(e),
			onSave: n.onSave,
			onBeforeUndo: e.keyboardOptions?.onBeforeUndo,
			isPicking: () => e.capabilities?.savedBlocks?.isPicking.value === !0,
			onConfirmPick: () => e.capabilities?.savedBlocks?.confirmPicking(),
			onCancelPick: () => e.capabilities?.savedBlocks?.cancelPicking()
		});
	}
	ot(document, "keydown", T);
	let D = _(null);
	E(Et, e.editorRoot ?? document), E(ft, D), E(mt, r), E(jt, t), E(Gt, p), E(Dt, m), E(At, h), E(Ht, i), E(wt, f), E(Ct, l), E(Lt, n.blockDefaults), E(Bt, x), E(Rt, n.customBlocks ?? []), E(bt, n.paletteBlocks), E(Ot, Wn(n.htmlBlockPreview)), E(Vt, b), E(Ft, zn(t.content, x));
	let O = xe(n.mergeTags?.syntax);
	E(dt, n.mergeTags?.tags ?? []), E(st, O), E(vt, n.mergeTags?.onRequest ?? null), E(ut, n.mergeTags?.autocomplete !== !1);
	let k = _(Pe(n.mergeTags?.tags ?? []));
	E(Pt, k);
	let A = Sn({
		resolvePreview: n.resolvePreview,
		getContent: () => t.content.value,
		isActive: () => t.state.previewMode
	});
	E(ht, A), E(gt, n.resolvePreview);
	let j = M(() => !(t.state.previewMode && A.isConfigured));
	E(zt, j);
	let ee = Tn();
	E(yt, ee), E(Ut, n.logicTags?.tags ?? []), E(lt, n.logicTags?.pairs ?? []), E(Nt, n.logicTags?.onRequest ?? null), E(St, En()), E(_t, n.onRequestMedia ?? null), E(Wt, n.resolveImageUrl ? Cn(n.resolveImageUrl) : null), E(Mt, n.displayConditions?.conditions ?? []), E(It, n.displayConditions?.allowCustom ?? !1), E(kt, e.capabilities ?? {}), E(xt, y);
	let te = Dn(n.lint) ? null : On({
		content: t.content,
		options: n.lint ?? {},
		updateBlock: t.updateBlock,
		updateSettings: t.updateSettings,
		removeBlock: t.removeBlock
	});
	E(ct, te);
	function N() {
		v?.(), te?.destroy(), g?.destroy(), p.destroy();
	}
	return {
		t: a,
		format: o,
		history: p,
		blockActions: m,
		conditionPreview: h,
		autoSave: g,
		resolvedTheme: l,
		themeStyles: f,
		themeOverrides: d,
		registry: x,
		keyboardReorder: y,
		templateLint: te,
		popoverRoot: D,
		mergeTagSampleMode: k,
		previewResolution: A,
		appliesConditionFilter: j,
		registerCustomBlocks: C,
		destroy: N
	};
}
//#endregion
export { pr as A, qn as B, Nr as C, xr as D, Sr as E, or as F, gn as G, An as H, ar as I, mn as J, fn as K, ir as L, ur as M, lr as N, br as O, cr as P, nr as R, Fr as S, Dr as T, kn as U, Ln as V, Sn as W, ni as _, Ys as a, Kr as b, Fs as c, Ai as d, Oi as f, mi as g, vi as h, Qs as i, fr as j, _r as k, Ki as l, Di as m, mc as n, Hs as o, ki as p, nn as q, ic as r, zs as s, gc as t, Wi as u, ei as v, Or as w, Lr as x, Jr as y, tr as z };
