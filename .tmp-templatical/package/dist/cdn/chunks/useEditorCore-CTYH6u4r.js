import { $ as e, A as t, C as n, F as r, G as i, H as a, J as o, K as s, L as c, M as l, N as u, O as d, P as f, T as p, U as m, V as h, X as g, Y as _, Z as v, at as y, b, c as x, ct as S, f as C, g as w, h as T, it as E, k as D, l as O, m as k, nt as A, ot as j, p as M, rt as N, s as P, st as F, t as ee, u as I, v as L, x as R, y as z, z as B } from "./draggable-BRF_Q_jB.js";
import "./timeouts-SsLMC4a3.js";
import { $ as te, A as ne, B as re, C as ie, D as ae, E as oe, F as V, I as se, L as ce, M as le, N as ue, O as de, P as fe, Q as pe, R as me, S as he, T as ge, _ as _e, a as ve, b as ye, d as be, f as xe, g as Se, h as Ce, i as H, j as we, k as Te, l as Ee, m as De, n as Oe, o as ke, p as Ae, r as je, s as Me, t as Ne, u as Pe, v as Fe, w as Ie, x as Le } from "./src-CZjSXPYq.js";
import { _ as Re, h as ze, v as Be, y as Ve } from "./dist-Dp46rwVY.js";
import { a as U, c as He, i as Ue, r as We } from "./dist-BLF-S9_A.js";
import { A as Ge, B as Ke, C as qe, D as Je, E as W, F as Ye, G as Xe, H as Ze, I as Qe, L as $e, M as et, N as tt, O as nt, P as rt, S as it, T as at, U as ot, V as st, W as G, _ as ct, a as lt, b as ut, c as dt, f as ft, g as K, h as pt, j as mt, k as ht, m as gt, n as _t, o as vt, p as yt, r as bt, s as xt, u as St, v as Ct, w as wt, x as Tt, y as Et } from "./keys-CZOBuCQd.js";
import { t as q } from "./useI18n-aRMtgYRj.js";
import { a as Dt, i as Ot, o as kt, r as J, t as At } from "./usePopoverPosition-Dm1jv3y5.js";
import { Bt as jt, Et as Mt, Ot as Nt, Tt as Pt, U as Ft, Z as It, at as Lt, d as Rt, gt as zt, j as Bt, nt as Vt, o as Ht, pt as Ut, s as Wt, u as Gt, v as Kt, yt as qt, zt as Jt } from "./icons-DN008liP.js";
import { t as Yt } from "./LoadingTrack-CiNg9s16.js";
import { t as Xt } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import "./useCloudI18n-CML0BxqX.js";
import { t as Y } from "./useMergeTag-8a8BnIZp.js";
import { t as Zt } from "./useAliveFlag-Ctyt3GgH.js";
//#region ../core/src/editor.ts
function Qt(e) {
	return e === "1" ? 1 : e === "3" ? 3 : 2;
}
function $t(e) {
	let t = _({
		content: e.content ?? se(e.defaultFontFamily, e.templateDefaults),
		selectedBlockId: null,
		viewport: "desktop",
		darkMode: !1,
		previewMode: !1,
		isDirty: !1,
		uiTheme: "auto"
	}), n = m({
		get: () => t.content,
		set: (e) => {
			t.content = e, t.isDirty = !0;
		}
	}), r = m(() => t.selectedBlockId ? i(t.content.blocks, t.selectedBlockId) : null);
	function i(e, t) {
		for (let n of e) {
			if (n.id === t) return n;
			if (n.type === "section") for (let e of n.children) {
				let n = i(e, t);
				if (n) return n;
			}
		}
		return null;
	}
	function a(e, t) {
		if (t.add(e.id), e.type === "section") for (let n of e.children) for (let e of n) a(e, t);
	}
	function o(e, t, n = { blocks: e }) {
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (i.id === t) return n;
			if (i.type === "section") for (let e = 0; e < i.children.length; e++) {
				let n = o(i.children[e], t, {
					blocks: i.children[e],
					sectionId: i.id,
					columnIndex: e
				});
				if (n) return n;
			}
		}
		return null;
	}
	function s(t) {
		return e.lockedBlocks?.value.has(t) ?? !1;
	}
	function c(e) {
		let n = o(t.content.blocks, e);
		if (!n) return null;
		let r = n.blocks.findIndex((t) => t.id === e);
		return r === -1 ? null : {
			targetSectionId: n.sectionId,
			columnIndex: n.columnIndex,
			index: r
		};
	}
	function l(e, n = !0) {
		t.content = e, n && (t.isDirty = !0);
	}
	function u(e) {
		e && s(e) || (t.selectedBlockId = e);
	}
	function d(e) {
		t.viewport = e;
	}
	function f(e) {
		t.darkMode = e;
	}
	function p(e) {
		t.uiTheme = e;
	}
	function h(e) {
		t.previewMode = e, e && (t.selectedBlockId = null);
	}
	function v(e, n) {
		if (s(e)) return;
		let r = i(t.content.blocks, e);
		r && (Object.assign(r, n), t.isDirty = !0);
	}
	function y(e) {
		t.content.settings = {
			...t.content.settings,
			...e
		}, t.isDirty = !0;
	}
	function b(e, n, r = 0, a) {
		if (!(n && e.type === "section")) {
			if (n) {
				if (s(n)) return;
				let o = i(t.content.blocks, n);
				if (o && o.type === "section") {
					if (r < 0 || r >= Qt(o.columns)) return;
					o.children[r] = o.children[r] || [];
					let t = o.children[r];
					a !== void 0 && a < t.length ? t.splice(a, 0, e) : t.push(e);
				}
			} else a !== void 0 && a < t.content.blocks.length ? t.content.blocks.splice(a, 0, e) : t.content.blocks.push(e);
			t.isDirty = !0;
		}
	}
	function x(e) {
		if (s(e)) return;
		let n = o(t.content.blocks, e);
		if (n) {
			let r = n.blocks.findIndex((t) => t.id === e);
			if (r !== -1) {
				let [e] = n.blocks.splice(r, 1);
				if (t.selectedBlockId) {
					let n = /* @__PURE__ */ new Set();
					a(e, n), n.has(t.selectedBlockId) && (t.selectedBlockId = null);
				}
				t.isDirty = !0;
			}
		}
	}
	function S(e, n, r, a = 0) {
		if (s(e) || r && s(r)) return;
		let c = o(t.content.blocks, e);
		if (!c) return;
		let l = c.blocks.findIndex((t) => t.id === e);
		if (l === -1 || r && c.blocks[l].type === "section") return;
		let u;
		if (r) {
			let e = i(t.content.blocks, r);
			if (!e || e.type !== "section" || a < 0 || a >= Qt(e.columns)) return;
			e.children[a] = e.children[a] || [], u = e.children[a];
		} else u = t.content.blocks;
		let [d] = c.blocks.splice(l, 1);
		u.splice(n, 0, d), t.isDirty = !0;
	}
	function C() {
		t.isDirty = !0;
	}
	return {
		state: g(t),
		content: n,
		selectedBlock: r,
		isBlockLocked: s,
		setContent: l,
		selectBlock: u,
		setViewport: d,
		setDarkMode: f,
		setUiTheme: p,
		setPreviewMode: h,
		updateBlock: v,
		updateSettings: y,
		addBlock: b,
		removeBlock: x,
		moveBlock: S,
		markDirty: C,
		findBlockLocation: c
	};
}
//#endregion
//#region ../core/src/history.ts
var en = 50, tn = 300, nn = 1500;
function rn(e) {
	let { content: t, setContent: n, isRemoteOperation: r, maxSize: i = en } = e, a = v([]), o = v([]), s = v(!1), c = null, l = null, u = m(() => a.value.length > 0), d = m(() => o.value.length > 0);
	function f() {
		return Fe(t.value);
	}
	function p(e) {
		a.value.push(e), a.value.length > i && a.value.splice(0, a.value.length - i);
	}
	function h() {
		l &&= (clearTimeout(l.timeoutId), null);
	}
	function g() {
		r?.() || (h(), p(f()), o.value = []);
	}
	function _(e) {
		if (!r?.()) {
			if (l && l.blockId === e) {
				clearTimeout(l.timeoutId), l.timeoutId = setTimeout(() => {
					l = null;
				}, tn);
				return;
			}
			h(), p(f()), o.value = [], l = {
				blockId: e,
				timeoutId: setTimeout(() => {
					l = null;
				}, tn)
			};
		}
	}
	function y() {
		s.value = !0, c && clearTimeout(c), c = setTimeout(() => {
			s.value = !1, c = null;
		}, nn);
	}
	function b() {
		if (a.value.length === 0) return;
		h();
		let e = a.value.pop();
		o.value.push(f()), n(e, !0), y();
	}
	function x() {
		if (o.value.length === 0) return;
		h();
		let e = o.value.pop();
		a.value.push(f()), n(e, !0), y();
	}
	function S() {
		a.value = [], o.value = [], h();
	}
	function C() {
		S(), c &&= (clearTimeout(c), null);
	}
	return {
		canUndo: u,
		canRedo: d,
		isNavigating: s,
		undo: b,
		redo: x,
		record: g,
		recordDebounced: _,
		clear: S,
		destroy: C
	};
}
//#endregion
//#region ../core/src/block-actions.ts
function an(e) {
	e.type === "table" ? e.rows = e.rows.map((e) => ({
		...e,
		id: V(),
		cells: e.cells.map((e) => ({
			...e,
			id: V()
		}))
	})) : e.type === "social" ? e.icons = e.icons.map((e) => ({
		...e,
		id: V()
	})) : e.type === "menu" && (e.items = e.items.map((e) => ({
		...e,
		id: V()
	})));
}
function on(e) {
	let { addBlock: t, removeBlock: n, updateBlock: r, selectBlock: i, findBlockLocation: a } = e;
	function o(n, r, a) {
		let o = ye(n, e.blockDefaults);
		return t(o, r, a), i(o.id), o;
	}
	function s(e, n, r) {
		let o = JSON.parse(JSON.stringify(e));
		if (o.id = V(), an(o), o.type === "section" && (o.children = o.children.map((e) => e.map((e) => {
			let t = JSON.parse(JSON.stringify(e));
			return t.id = V(), an(t), t;
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
//#endregion
//#region ../core/src/auto-save.ts
function sn(e) {
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
	let m = y(t, () => {
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
//#endregion
//#region ../core/src/condition-preview.ts
function cn(e) {
	let t = _(/* @__PURE__ */ new Set()), n = m(() => t.size > 0);
	function r(e) {
		return t.has(e);
	}
	function i(n) {
		t.has(n) ? t.delete(n) : (t.add(n), e.state.selectedBlockId === n && e.selectBlock(null));
	}
	function a() {
		t.clear();
	}
	return {
		isHidden: r,
		toggleBlock: i,
		reset: a,
		hasHiddenBlocks: n
	};
}
//#endregion
//#region ../core/src/data-source-fetch.ts
function ln(e) {
	let t = v(!1), n = v(!1), r = m(() => !!e.definition.value?.dataSource), i = m(() => r.value && !e.block.value.dataSourceFetched);
	async function a() {
		let r = e.definition.value;
		if (r?.dataSource) {
			t.value = !0, n.value = !1;
			try {
				let t = await r.dataSource.onFetch({
					fieldValues: { ...e.block.value.fieldValues },
					blockId: e.block.value.id
				});
				if (t == null) return;
				let n = { ...e.block.value.fieldValues };
				for (let e of Object.keys(n)) e in t && (n[e] = t[e]);
				e.onUpdate(n, !0);
			} catch (e) {
				console.warn("[Templatical] Data source fetch error:", e), n.value = !0;
			} finally {
				t.value = !1;
			}
		}
	}
	return {
		isFetching: t,
		fetchError: n,
		fetch: a,
		hasDataSource: r,
		needsFetch: i
	};
}
//#endregion
//#region ../core/src/history-interceptor.ts
function un(e, t) {
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
//#endregion
//#region ../core/src/saved-blocks.ts
function dn(e) {
	let { provider: t } = e, n = v([]), r = v(!1), i = C(() => {
		let e = /* @__PURE__ */ new Set();
		for (let t of n.value) {
			let n = t.category?.trim();
			n && e.add(n);
		}
		return [...e].sort((e, t) => e.localeCompare(t));
	}), a = C(() => typeof t.create == "function"), o = C(() => typeof t.update == "function"), s = C(() => typeof t.delete == "function");
	function c(e) {
		return o.value && e.canUpdate !== !1;
	}
	function l(e) {
		return s.value && e.canDelete !== !1;
	}
	function u(e, t) {
		throw new Ne(`[Templatical] Saved blocks: ${e} is ${t}. Check the capability before calling — the editor's own UI hides the action.`);
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
//#endregion
//#region ../core/src/saved-blocks-local.ts
var fn = "templatical:saved-blocks";
function pn(e = {}) {
	let t = e.key ?? fn;
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
				id: V(),
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
var X = /* @__PURE__ */ new Set(), Z = 0, mn = 0;
function hn() {
	let e = ++mn;
	return X.add(e), Z === 0 && (Z = e), {
		id: e,
		isActive: () => X.size <= 1 || Z === e,
		claim: () => {
			Z = e;
		},
		dispose: () => {
			if (X.delete(e), Z === e) {
				let e = Array.from(X);
				Z = e[e.length - 1] ?? 0;
			}
		}
	};
}
//#endregion
//#region src/composables/usePreviewResolution.ts
var gn = 500;
function _n(e) {
	let t = typeof e.resolvePreview == "function", n = v(null), r = v(!1), i = v(!1), a = 0, s = null;
	function c() {
		s !== null && (clearTimeout(s), s = null);
	}
	async function l() {
		let t = e.resolvePreview;
		if (!t) return;
		let o = ++a;
		r.value = !0;
		let s = {
			content: Fe(e.getContent()),
			...e.getRecipient?.() === void 0 ? {} : { recipient: e.getRecipient() }
		};
		try {
			let e = await t(s);
			if (o !== a) return;
			if (!Oe(e)) {
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
	function u() {
		if (t) {
			if (c(), n.value === null) {
				l();
				return;
			}
			s = setTimeout(() => {
				s = null, l();
			}, gn);
		}
	}
	return B(() => [e.isActive(), e.getRecipient?.()], ([e]) => {
		if (!e) {
			c(), a++, r.value = !1, n.value = null, i.value = !1;
			return;
		}
		u();
	}, { immediate: !0 }), o(() => {
		c(), a++;
	}), {
		isConfigured: t,
		content: C(() => n.value ?? e.getContent()),
		isResolving: r,
		isInitialResolve: C(() => r.value && n.value === null),
		hasFailed: i,
		supersedesSamples: C(() => t)
	};
}
//#endregion
//#region src/composables/useImageUrlResolver.ts
function vn(e) {
	let t = _(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set();
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
function Q(e) {
	let t = p(Tt, null), n = C(e);
	if (!t) return n;
	let r;
	function a() {
		r !== void 0 && (clearTimeout(r), r = void 0);
	}
	i() && o(a);
	let s = !0;
	return B(n, (e) => {
		a();
		let n = s;
		if (s = !1, !(!e || t.has(e))) {
			if (n) {
				t.lookup(e);
				return;
			}
			r = setTimeout(() => {
				r = void 0, t.lookup(e);
			}, 300);
		}
	}, { immediate: !0 }), C(() => {
		let e = n.value;
		if (!e) return e;
		let r = t.get(e);
		return typeof r == "string" && r.length > 0 ? r : e;
	});
}
//#endregion
//#region src/composables/useMergeTagPicker.ts
function yn() {
	let e = v(!1), t = v([]), n = null;
	function r(r) {
		if (n) {
			let e = n;
			n = null, e(null);
		}
		return t.value = r, e.value = !0, new Promise((e) => {
			n = e;
		});
	}
	function a(r) {
		let i = n;
		n = null, e.value = !1, t.value = [], i && i(r);
	}
	return i() && o(() => {
		if (n) {
			let e = n;
			n = null, e(null);
		}
		e.value = !1, t.value = [];
	}), {
		isOpen: e,
		tags: t,
		open: r,
		resolve: a
	};
}
//#endregion
//#region src/composables/useLogicTagPicker.ts
function bn() {
	let e = v(!1), t = v([]), n = v([]), r = null;
	function a(i, a) {
		if (r) {
			let e = r;
			r = null, e(null);
		}
		return t.value = i, n.value = a, e.value = !0, new Promise((e) => {
			r = e;
		});
	}
	function s(i) {
		let a = r;
		r = null, e.value = !1, t.value = [], n.value = [], a && a(i);
	}
	return i() && o(() => {
		if (r) {
			let e = r;
			r = null, e(null);
		}
		e.value = !1, t.value = [], n.value = [];
	}), {
		isOpen: e,
		tags: t,
		pairs: n,
		open: a,
		resolve: s
	};
}
//#endregion
//#region src/composables/useTemplateLint.ts
function xn(e) {
	return e ? e.disabled === !0 || e.accessibility === !1 && e.structure === !1 && e.links === !1 : !1;
}
function Sn(t) {
	let n = v([]), r = v(!1), i = v(!1), a = e(null), o = xn(t.options), s = null, c = !1;
	o || l();
	async function l() {
		try {
			let e = await import("./src-D_3bXt7-.js");
			if (c) return;
			a.value = { lintTemplate: e.lintTemplate }, r.value = !0, u(), s = Ve(t.content, u, {
				debounce: t.debounce ?? 500,
				deep: !0
			});
		} catch {
			if (c) return;
			i.value = !0;
		}
	}
	function u() {
		a.value && (n.value = a.value.lintTemplate(t.content.value, t.options));
	}
	let d = B(() => t.options, () => {
		a.value && u();
	}, { deep: !0 });
	function f(e) {
		e.fix && e.fix.apply({
			updateBlock: t.updateBlock,
			updateSettings: t.updateSettings,
			removeBlock: t.removeBlock
		});
	}
	function p() {
		c = !0, s?.(), d();
	}
	return {
		issues: n,
		ready: r,
		unavailable: i,
		applyFix: f,
		destroy: p
	};
}
//#endregion
//#region src/utils/blockTypeLabels.ts
function Cn(e, t) {
	return t.blocks[e] ?? e;
}
function wn(e, t, n = []) {
	if (e.type !== "custom") return Cn(e.type, t);
	let { customType: r } = e;
	return n.find((e) => e.type === r)?.name ?? r;
}
//#endregion
//#region src/composables/useKeyboardReorder.ts
function Tn(e, t, n = []) {
	let r = v(null), i = v(""), a = null;
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
		return a ? wn(a, t.t, n) : "";
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
			let r = o(n);
			r && (r && (r.sectionId !== a.sectionId || r.columnIndex !== a.columnIndex) || r && r.index !== a.index) && e.moveBlock(n, a.index, a.sectionId, a.columnIndex), l(t.format(t.t.blockActions.cancelled, {
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
function En(e) {
	let t = He("(prefers-color-scheme: dark)");
	return { resolvedTheme: C(() => e.value === "auto" ? t.value ? "dark" : "light" : e.value) };
}
//#endregion
//#region src/composables/useThemeStyles.ts
var Dn = {
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
function On({ themeOverrides: e, resolvedTheme: t, extraStyles: n }) {
	return { themeStyles: C(() => {
		let r = {}, i = e.value, a = t.value === "dark" ? i.dark : i;
		if (a) for (let [e, t] of Object.entries(Dn)) {
			let n = a[e];
			n && (r[t] = n);
		}
		return n && Object.assign(r, n()), r;
	}) };
}
//#endregion
//#region src/utils/logger.ts
var kn = "[Templatical]";
function An() {
	return typeof process < "u" && !0;
}
var $ = {
	warn(...e) {
		console.warn(kn, ...e);
	},
	error(...e) {
		console.error(kn, ...e);
	},
	debug(...e) {
		An() || console.debug(kn, ...e);
	},
	info(...e) {
		An() || console.info(kn, ...e);
	}
};
//#endregion
//#region src/composables/useBlockRegistry.ts
function jn() {
	let t = e(/* @__PURE__ */ new Map());
	function n(e, n) {
		t.value.set(e, n), N(t);
	}
	function r(e, n) {
		let r = `custom:${e.type}`;
		t.value.set(r, {
			component: n,
			createBlock: () => ie(e),
			definition: e
		}), N(t);
	}
	function i(e) {
		if (e.type === "custom") {
			let n = `custom:${e.customType}`;
			return t.value.get(n)?.component;
		}
		return t.value.get(e.type)?.component;
	}
	function a(e) {
		return t.value.get(e)?.createBlock();
	}
	function o(e) {
		let n = `custom:${e}`;
		return t.value.get(n)?.definition;
	}
	function s(e) {
		return `<div style="color: var(--tpl-text-muted); padding: 16px; text-align: center; border: 1px dashed var(--tpl-border); border-radius: var(--tpl-radius-sm); font-family: var(--tpl-font-family); font-size: 14px;">${e}</div>`;
	}
	async function c(e) {
		let t = o(e.customType);
		if (!t) return s("Block definition not found");
		try {
			let { Liquid: n } = await import("./liquid.browser-CZaQe87t.js");
			return await new n({
				strictVariables: !1,
				strictFilters: !1
			}).parseAndRender(t.template, e.fieldValues);
		} catch (t) {
			return $.error(`Failed to render custom block "${e.customType}":`, t), s(`Render error: ${e.customType}`);
		}
	}
	function l(e) {
		return t.value.has(e);
	}
	return {
		registerBuiltIn: n,
		registerCustom: r,
		getComponent: i,
		createBlock: a,
		getDefinition: o,
		renderCustomBlock: c,
		isRegistered: l
	};
}
//#endregion
//#region src/composables/useCustomBlockStylesheets.ts
function Mn(e, t) {
	return C(() => {
		let n = Nn(e.value.blocks);
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
function Nn(e) {
	let t = /* @__PURE__ */ new Set();
	return Pn(e, t), t;
}
function Pn(e, t) {
	for (let n of e) {
		if (re(n)) {
			t.add(n.customType);
			continue;
		}
		if (n.type === "section") {
			let e = n.children;
			if (!e) continue;
			for (let n of e) Pn(n, t);
		}
	}
}
//#endregion
//#region src/utils/registerBuiltInBlocks.ts
var Fn = [
	{
		type: "section",
		createBlock: Te
	},
	{
		type: "title",
		createBlock: ue
	},
	{
		type: "paragraph",
		createBlock: de
	},
	{
		type: "image",
		createBlock: oe
	},
	{
		type: "button",
		createBlock: Le
	},
	{
		type: "divider",
		createBlock: Ie
	},
	{
		type: "video",
		createBlock: fe
	},
	{
		type: "social",
		createBlock: ne
	},
	{
		type: "menu",
		createBlock: ae
	},
	{
		type: "table",
		createBlock: le
	},
	{
		type: "spacer",
		createBlock: we
	},
	{
		type: "html",
		createBlock: ge
	},
	{
		type: "countdown",
		createBlock: he
	}
];
function In(e, t) {
	for (let n of Fn) {
		let r = t[n.type];
		r && e.registerBuiltIn(n.type, {
			component: r,
			createBlock: n.createBlock
		});
	}
}
//#endregion
//#region src/utils/resolveHtmlBlockPreview.ts
function Ln(e) {
	return typeof e == "boolean" ? e : e?.enabled ?? !1;
}
//#endregion
//#region src/utils/collectOffPaletteDefaults.ts
function Rn(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function zn(e, t, n) {
	let r = new Set(e.map((e) => J(e))), i = [], a = (e, t) => {
		for (let [n, o] of Object.entries(e)) typeof o == "string" ? o !== "" && /color$/i.test(n) && !r.has(J(o)) && i.push(`${t}.${n}: ${o}`) : Rn(o) && a(o, `${t}.${n}`);
	}, o = t;
	for (let [e, t] of Object.entries(ce)) {
		let n = o?.[e];
		a({
			...t,
			...Rn(n) ? n : {}
		}, e);
	}
	return a({
		...me,
		...n ?? {}
	}, "template"), i;
}
//#endregion
//#region src/utils/resolveFieldColors.ts
function Bn(e, t) {
	let n = kt({ presets: e.presets }, Dt), r = n.presets.length === 0;
	return {
		presets: r ? t.presets : n.presets,
		allowCustom: t.allowCustom === !1 ? !1 : e.allowCustom ?? t.allowCustom,
		invalidPresets: n.invalidPresets,
		emptyPresets: e.presets !== void 0 && e.presets.length === 0,
		presetsInherited: r,
		allowCustomIgnored: e.allowCustom === !0 && t.allowCustom === !1
	};
}
//#endregion
//#region src/utils/collectColorFieldIssues.ts
function Vn(e, t) {
	let n = [], r = (r, i) => {
		let a = Bn(r, t), o = `custom block "${e.type}" field "${i}"`, s = (t) => `${e.type}:${i}:${t}`;
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
			let e = r.default ?? "", t = new Set(a.presets.map((e) => J(e)));
			e !== "" && !t.has(J(e)) && n.push({
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
function Hn(e) {
	for (let t of e.composedPath()) {
		if (!(t instanceof HTMLElement)) continue;
		if (t.isContentEditable) return !0;
		let e = t.tagName;
		if (e === "INPUT" || e === "TEXTAREA" || e === "SELECT") return !0;
	}
	return !1;
}
function Un(e, t) {
	let n = e.metaKey || e.ctrlKey;
	if (n && e.key.toLowerCase() === "s") {
		e.preventDefault(), t.onSave?.();
		return;
	}
	if (n && e.key.toLowerCase() === "z") {
		if (Hn(e)) return;
		e.preventDefault(), e.shiftKey ? t.history.redo() : (t.onBeforeUndo?.(), t.history.undo());
		return;
	}
	if (t.isPicking?.() && !Hn(e)) {
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
	(e.key === "Delete" || e.key === "Backspace") && t.getSelectedBlockId() && !Hn(e) && (e.preventDefault(), t.history.record(), t.removeBlock(t.getSelectedBlockId()));
}
//#endregion
//#region src/utils/mergeTagLabelSegments.ts
function Wn(e, t, n, r = !1) {
	if (!e) return [];
	let i = RegExp(`(${n.value.source}|${n.logic.source})`, "g"), a = [], o = 0, s;
	for (; (s = i.exec(e)) !== null;) {
		s.index > o && a.push({
			type: "text",
			value: e.slice(o, s.index)
		});
		let i = s[0];
		if (xe(i, n)) {
			let e = r ? Me(i, t) : void 0;
			a.push(e === void 0 ? {
				type: "tag",
				value: ke(i, t)
			} : {
				type: "text",
				value: e
			});
		} else be(i, n) ? a.push({
			type: "tag",
			value: ve(i, n)
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
var Gn = R({
	name: "MergeTagPreviewText",
	props: { text: {
		type: String,
		required: !0
	} },
	setup(e) {
		let t = p(W, []), r = p(Ge, je.liquid), i = p(G, null), a = C(() => Wn(e.text, t, r, i?.value ?? !1));
		return () => a.value.map((e, t) => e.type === "tag" ? n("span", {
			key: t,
			class: "tpl-merge-tag-label"
		}, e.value) : e.value);
	}
}), Kn = { class: "tpl:text-center" }, qn = ["href"], Jn = /* @__PURE__ */ R({
	__name: "ButtonBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, n = C(() => {
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
		return (t, r) => (l(), w("div", Kn, [M("a", {
			href: e.block.url || "#",
			style: F(n.value),
			class: "tpl:cursor-default",
			onClick: r[0] ||= O(() => {}, ["prevent"])
		}, [z(Gn, { text: e.block.text }, null, 8, ["text"])], 12, qn)]));
	}
}), Yn = ["innerHTML"], Xn = [
	"src",
	"width",
	"height"
], Zn = /* @__PURE__ */ R({
	__name: "CustomBlockIcon",
	props: {
		icon: {},
		size: {}
	},
	setup(e) {
		let t = e, n = C(() => t.size ?? 20), r = C(() => t.icon && (t.icon.trimStart().startsWith("<svg") || t.icon.trimStart().startsWith("<SVG"))), i = C(() => t.icon && !r.value && (t.icon.startsWith("http") || t.icon.startsWith("/")));
		return (t, a) => r.value ? (l(), w("span", {
			key: 0,
			class: "tpl:inline-flex tpl:items-center tpl:justify-center",
			style: F({
				width: `${n.value}px`,
				height: `${n.value}px`
			}),
			innerHTML: e.icon
		}, null, 12, Yn)) : i.value ? (l(), w("img", {
			key: 1,
			src: e.icon,
			width: n.value,
			height: n.value,
			class: "tpl:inline-block",
			alt: ""
		}, null, 8, Xn)) : (l(), k(E(Jt), {
			key: 2,
			size: n.value,
			"stroke-width": 1.5
		}, null, 8, ["size"]));
	}
});
//#endregion
//#region src/composables/useEditorRoot.ts
function Qn() {
	return p(ct, document) ?? document;
}
//#endregion
//#region src/composables/useFocusTrap.ts
var $n = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])";
function er(e, t) {
	let n = Qn(), r = null, i = null, a = null;
	function s() {
		return e.value ? Array.from(e.value.querySelectorAll($n)).filter((e) => e.offsetParent !== null) : [];
	}
	function c(e) {
		if (e.key !== "Tab") return;
		let t = s();
		if (t.length === 0) return;
		let r = t[0], i = t[t.length - 1];
		e.shiftKey ? n.activeElement === r && (e.preventDefault(), i.focus()) : n.activeElement === i && (e.preventDefault(), r.focus());
	}
	function l() {
		let t = i !== null || a !== null;
		t && u({ restoreFocus: !1 }), t || (r = n.activeElement), a = requestAnimationFrame(() => {
			a = null;
			let t = s();
			t.length > 0 && (e.value?.querySelector("[autofocus], input:not([disabled])") ?? t[0]).focus();
		}), i = U(e, "keydown", c);
	}
	function u(e = {}) {
		let t = e.restoreFocus !== !1;
		a !== null && (typeof cancelAnimationFrame < "u" && cancelAnimationFrame(a), a = null), i?.(), i = null, t && r && r.focus && (r.focus(), r = null);
	}
	let d = B([t, e], ([e, t]) => {
		e && t ? l() : u();
	}, { flush: "post" });
	o(() => {
		d(), u();
	});
}
//#endregion
//#region src/composables/useEmoji.ts
function tr() {
	let [t, n] = Be(!1), r = e([]), i = !1;
	o(() => {
		i = !0;
	}), B(t, async (e) => {
		if (e && r.value.length === 0) {
			let { emojiCategories: e } = await import("./emojiData-6m0DBh7O.js");
			if (i) return;
			r.value = e;
		}
	});
	function a() {
		n();
	}
	function s() {
		t.value = !1;
	}
	return {
		categories: r,
		isOpen: t,
		toggle: a,
		close: s
	};
}
//#endregion
//#region src/composables/useDragDrop.ts
function nr(e) {
	let { onBlockMove: t, onBlockAdd: n } = e, r = v(!1), i = v(null), a = v(null);
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
var rr = [
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
], ir = {
	arial: "Arial, sans-serif",
	helvetica: "Helvetica, sans-serif",
	georgia: "Georgia, serif",
	"times new roman": "'Times New Roman', serif",
	verdana: "Verdana, sans-serif",
	"trebuchet ms": "'Trebuchet MS', sans-serif",
	"courier new": "'Courier New', monospace"
}, ar = "Arial, sans-serif";
function or(e) {
	if (e === void 0 || e === !0) return [...rr];
	if (e === !1) return [];
	let t = [], n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
	for (let i of e) {
		let e = i.toLowerCase(), a = rr.find((t) => t.value.toLowerCase() === e);
		if (!a) {
			r.has(e) || (r.add(e), $.warn(`config.fonts.builtIns: "${i}" is not a built-in font — skipping it. Built-in fonts are: ${rr.map((e) => e.value).join(", ")}.`));
			continue;
		}
		n.has(a.value) || (n.add(a.value), t.push(a));
	}
	return t;
}
function sr(e) {
	let t = v(e?.customFonts ?? []), n = v(!0), r = v(!1), a = or(e?.builtIns), s = C(() => e?.defaultFallback ?? ar);
	function c(e) {
		n.value = e;
	}
	let l = C(() => {
		let e = [...a];
		if (!n.value) return e.sort((e, t) => e.label.localeCompare(t.label));
		let r = t.value.map((e) => ({
			value: e.name,
			label: e.name,
			isCustom: !0
		})), i = [...e, ...r];
		return i.sort((e, t) => e.label.localeCompare(t.label)), i;
	});
	function u(e) {
		return l.value.some((t) => t.label.toLowerCase() === e.toLowerCase() || t.value.toLowerCase().startsWith(e.toLowerCase()));
	}
	let d = e?.defaultFont ?? ar.split(",")[0].trim();
	u(d) || $.warn(`config.fonts: new templates seed "${d}", which the font picker doesn't offer — authors can't reselect it. Either add it to fonts.builtIns, or set fonts.defaultFont to an offered font.`);
	function f(e) {
		return rr.some((t) => t.label.toLowerCase() === e.toLowerCase() || t.value.toLowerCase().startsWith(e.toLowerCase()));
	}
	function p() {
		if (e?.defaultFont) {
			if (!n.value && !f(e.defaultFont)) return ar;
			if (u(e.defaultFont)) {
				let t = l.value.find((t) => t.label.toLowerCase() === e.defaultFont.toLowerCase() || t.value.toLowerCase().startsWith(e.defaultFont.toLowerCase()));
				if (t) return t.value;
			}
		}
		return ar;
	}
	let m = C(() => p());
	function h(e) {
		if (!e) return s.value;
		let n = t.value.find((t) => t.name.toLowerCase() === e.toLowerCase());
		return n ? `'${n.name}', ${n.fallback ?? s.value}` : ir[e.toLowerCase()] || (e.includes(",") ? e : `${e}, ${s.value}`);
	}
	let g = [], _ = !1;
	async function y() {
		if (t.value.length === 0) {
			_ || (r.value = !0);
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
				$.warn(`Failed to load custom font "${e.name}":`, t);
			}
		});
		await Promise.allSettled(e), !_ && (r.value = !0);
	}
	function b() {
		for (let e of g) e.remove();
		g.length = 0;
	}
	return i() && o(() => {
		_ = !0, b();
	}), {
		fonts: l,
		defaultFont: m,
		defaultFallback: s,
		customFonts: t,
		customFontsEnabled: n,
		isLoaded: r,
		setCustomFontsEnabled: c,
		loadCustomFonts: y,
		cleanupFontLinks: b,
		getFontWithFallback: h,
		getDefaultFont: p
	};
}
//#endregion
//#region src/composables/useLogicTag.ts
function cr() {
	let e = p(wt, []), t = p(qe, []), n = p(Ge, je.liquid), r = p(mt, null), i = p(at, null), a = v(!1), o = !!r || e.length > 0 || t.length > 0, s = e.length > 0 || t.length > 0;
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
function lr(e, t, n) {
	return be(e, n) ? {
		type: "logicMergeTagNode",
		attrs: {
			value: e,
			keyword: ve(e, n)
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
function ur(e) {
	return "before" in e && "after" in e;
}
function dr(e, t, n) {
	if (!ur(t)) {
		e.chain().focus().insertContent(lr(t.value, t.label, n)).run();
		return;
	}
	let r = lr(t.before, t.label, n), i = lr(t.after, t.label, n), { from: a, to: o } = e.state.selection;
	if (a !== o) {
		e.chain().focus().insertContentAt(o, i).insertContentAt(a, r).run();
		return;
	}
	e.chain().focus().insertContentAt(a, [r, i]).setTextSelection(a + 1).run();
}
//#endregion
//#region src/utils/linkColorExtension.ts
function fr(e) {
	if (!e) return null;
	let t = e.trim();
	return /^#[0-9a-f]{3,8}$/i.test(t) || /^(rgb|rgba|hsl|hsla)\(\s*[0-9.,%/\s]+\)$/i.test(t) || /^[a-z]+$/i.test(t) ? t : null;
}
function pr(e) {
	return e.extend({ addAttributes() {
		return {
			...this.parent?.(),
			color: {
				default: null,
				parseHTML: (e) => fr(Ot(e.style.color)),
				renderHTML: (e) => {
					let t = fr(e.color);
					return t ? { style: `color: ${t}` } : {};
				}
			}
		};
	} });
}
//#endregion
//#region src/composables/useRichTextLinkDialog.ts
function mr(e) {
	let t = v(!1), n = v(""), r = v(""), i = v(null);
	er(i, t);
	function a() {
		let i = e.value?.getAttributes("link") ?? {};
		n.value = i.href || "", r.value = i.color || "", t.value = !0;
	}
	function o() {
		if (n.value) {
			let t = c(n.value);
			if (t !== null) {
				let n = fr(r.value), i = e.value?.chain().focus().extendMarkRange("link").setLink({ href: t }).updateAttributes("link", { color: n });
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
function hr(t) {
	let n = p(K, null), { mergeTags: r, canRequestMergeTag: i, isRequesting: a, requestMergeTag: o, syntax: c, autocomplete: l } = Y(), { canInsertLogicTag: u, isRequesting: d, requestLogicTag: f } = cr(), m = p(Ze, null), h = (s(m) ? m.value : m)?.mergeTag?.suggestionEmpty ?? "No matching merge tags", g = Ee(c), _ = e(null), { showLinkDialog: y, linkUrl: b, linkColor: x, linkDialogRef: S, openLinkDialog: C, insertLink: w, removeLink: T, closeLinkDialog: E, handleLinkKeydown: O } = mr(_), { start: k, stop: A } = Re(() => _.value?.commands.focus("end"), 0, { immediate: !1 }), j = e(null), M = v(!0), N = v(null), P = !1;
	async function F() {
		N.value = null, M.value = !0;
		try {
			let { TiptapEditor: e, EC: i, extensions: a } = await t.loadExtensions({
				mergeTags: r,
				syntax: c,
				triggerChar: g,
				autocompleteEnabled: l,
				suggestionEmptyText: h
			});
			if (P) return;
			j.value = i;
			let o = /* @__PURE__ */ new Map();
			a.forEach((e, t) => o.set(e.name, t));
			let s = new e({
				extensions: a.filter((e, t) => o.get(e.name) === t),
				content: t.blockContent(),
				editable: !0,
				onUpdate: ({ editor: e }) => {
					P || n && n.updateBlock(t.blockId(), { content: e.getHTML() });
				}
			});
			if (P) {
				s.destroy();
				return;
			}
			_.value = s, M.value = !1, k();
		} catch (e) {
			if (P) return;
			$.error(`[${t.editorName ?? "RichTextEditor"}] Failed to initialize TipTap editor:`, e), N.value = e instanceof Error ? e.message : "Failed to load editor", M.value = !1;
		}
	}
	function ee() {
		_.value?.destroy(), _.value = null, F();
	}
	F();
	let I = B(() => t.blockContent(), (e) => {
		_.value && _.value.getHTML() !== e && _.value.commands.setContent(e, { emitUpdate: !1 });
	});
	function L(e) {
		if (a.value || d.value) return;
		let n = e.composedPath(), r = n.find((e) => e instanceof HTMLElement);
		if (!r) return;
		t.onClickOutsideSideEffect?.(r);
		let i = n.some((e) => e instanceof HTMLElement && e.classList.contains("tpl-color-popover"));
		r.closest(".tpl-text-editor-wrapper") || r.closest(".tpl-text-toolbar") || r.closest(".tpl-link-dialog") || i || t.onDone();
	}
	U(document, "mousedown", L), D(() => {
		P = !0, I(), A(), _.value?.destroy();
	});
	async function R() {
		let e = await o();
		P || (e && _.value ? _.value.chain().focus().insertMergeTag({
			label: e.label,
			value: e.value
		}).run() : _.value?.commands.focus());
	}
	async function z() {
		let e = await f();
		P || (e && _.value ? dr(_.value, e, c) : _.value?.commands.focus());
	}
	return {
		editor: _,
		EditorContent: j,
		isLoading: M,
		initError: N,
		retry: ee,
		showLinkDialog: y,
		linkUrl: b,
		linkColor: x,
		linkDialogRef: S,
		mergeTags: r,
		canRequestMergeTag: i,
		isRequestingMergeTag: a,
		syntax: c,
		canInsertLogicTag: u,
		isRequestingLogicTag: d,
		openLinkDialog: C,
		insertLink: w,
		removeLink: T,
		closeLinkDialog: E,
		handleLinkKeydown: O,
		handleAddMergeTag: R,
		handleAddLogicTag: z
	};
}
//#endregion
//#region src/composables/useSmallScreenNotice.ts
var gr = "(max-width: 767px)";
function _r(e) {
	let t = He(gr);
	return {
		isSmallScreen: t,
		showNotice: C(() => (A(e) ?? !0) && t.value)
	};
}
//#endregion
//#region src/components/blocks/CustomBlock.vue?vue&type=script&setup=true&lang.ts
var vr = { class: "tpl:w-full" }, yr = {
	key: 0,
	class: "tpl:flex tpl:min-h-[80px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:border-[var(--tpl-warning)] tpl:bg-[var(--tpl-warning-light)]"
}, br = { class: "tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, xr = {
	key: 1,
	class: "tpl:flex tpl:min-h-[80px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:border-[var(--tpl-danger)] tpl:bg-[var(--tpl-danger-light)]"
}, Sr = { class: "tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, Cr = {
	key: 2,
	class: "tpl:relative"
}, wr = ["innerHTML"], Tr = {
	key: 0,
	class: "tpl:absolute tpl:inset-0 tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-3 tpl:rounded tpl:backdrop-blur-[2px]",
	style: { "background-color": "color-mix(in srgb, var(--tpl-bg) 80%, transparent)" }
}, Er = /* @__PURE__ */ R({
	__name: "CustomBlock",
	props: {
		block: {},
		viewport: {}
	},
	emits: ["fetchData"],
	setup(e, { emit: n }) {
		let r = e, i = n, { t: a } = q(), o = p(xt, null), s = v(""), c = v(!1), u = C(() => o?.getDefinition(r.block.customType)), d = C(() => !!u.value), { isFetching: f, fetch: m, needsFetch: h, hasDataSource: g } = ln({
			definition: u,
			block: C(() => r.block),
			onUpdate: (e, t) => {
				i("fetchData", {
					fieldValues: e,
					dataSourceFetched: t
				});
			}
		}), _ = p(W, []), y = p(G, null), b = C(() => {
			if (!y?.value) return r.block;
			let e = {};
			for (let [t, n] of Object.entries(r.block.fieldValues)) e[t] = typeof n == "string" ? _e(n, _) : n;
			return {
				...r.block,
				fieldValues: e
			};
		});
		async function x() {
			if (o) {
				c.value = !1;
				try {
					let e = await o.renderCustomBlock(b.value);
					e.includes("Template render error:") && (c.value = !0), s.value = e;
				} catch {
					c.value = !0, s.value = "";
				}
			}
		}
		let D = ze(x, 150);
		return t(() => {
			x();
		}), B(() => r.block.fieldValues, () => {
			D();
		}, { deep: !0 }), B(() => y?.value, () => {
			D();
		}), (e, t) => (l(), w("div", vr, [d.value ? c.value ? (l(), w("div", xr, [z(E(Gt), {
			size: 24,
			class: "tpl:text-[var(--tpl-danger)]"
		}), M("span", Sr, S(E(a).customBlocks.renderError), 1)])) : (l(), w("div", Cr, [M("div", { innerHTML: s.value }, null, 8, wr), E(g) && E(h) ? (l(), w("div", Tr, [E(f) ? (l(), k(Yt, {
			key: 1,
			class: "tpl:w-48"
		})) : (l(), w("button", {
			key: 0,
			type: "button",
			class: "tpl:flex tpl:cursor-pointer tpl:items-center tpl:gap-2 tpl:rounded-[var(--tpl-radius-sm)] tpl:border tpl:border-[var(--tpl-border)] tpl:px-4 tpl:py-2 tpl:text-sm tpl:font-semibold tpl:shadow-sm tpl:transition-all tpl:duration-150 hover:tpl:border-[var(--tpl-primary)] hover:tpl:shadow-md tpl:bg-[var(--tpl-primary-light)] tpl:text-[var(--tpl-primary-hover)]",
			onClick: t[0] ||= O((...e) => E(m) && E(m)(...e), ["stop"])
		}, [u.value?.icon ? (l(), k(Zn, {
			key: 0,
			icon: u.value.icon,
			size: 16
		}, null, 8, ["icon"])) : T("", !0), L(" " + S(u.value?.dataSource?.label || E(a).customBlocks.dataSource.fetchButton), 1)]))])) : T("", !0)])) : (l(), w("div", yr, [z(E(Ft), {
			size: 24,
			class: "tpl:text-[var(--tpl-warning)]"
		}), M("span", br, S(E(a).customBlocks.definitionNotFound), 1)]))]));
	}
}), Dr = { class: "tpl:w-full" }, Or = /* @__PURE__ */ R({
	__name: "DividerBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, n = C(() => ({
			borderTop: `${t.block.thickness}px ${t.block.lineStyle} ${t.block.color}`,
			width: t.block.width === "full" ? "100%" : `${t.block.width}px`,
			margin: t.block.width === "full" ? "0" : "0 auto"
		}));
		return (e, t) => (l(), w("div", Dr, [M("hr", {
			class: "tpl:m-0 tpl:border-none",
			style: F(n.value)
		}, null, 4)]));
	}
}), kr = { class: "tpl:w-full" }, Ar = ["srcdoc", "title"], jr = {
	key: 1,
	class: "tpl:flex tpl:min-h-[80px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-hover)]"
}, Mr = {
	key: 0,
	class: "tpl:text-sm tpl:text-[var(--tpl-text-muted)]"
}, Nr = {
	key: 1,
	class: "tpl:text-sm tpl:text-[var(--tpl-text-dim)]"
}, Pr = /* @__PURE__ */ R({
	__name: "HtmlBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, { t: n } = q(), r = p(ut, !1), i = C(() => t.block.content.trim().length > 0), a = C(() => r && i.value), o = p(W, []), s = p(G, null), c = C(() => s?.value ? _e(t.block.content, o) : t.block.content), u = v(null), d = v(60), f = null;
		function m() {
			let e = u.value?.contentDocument;
			e && (d.value = Math.max(e.body?.scrollHeight ?? 0, e.documentElement?.scrollHeight ?? 0));
		}
		function h() {
			f?.disconnect(), f = null, m();
			let e = u.value?.contentDocument?.documentElement;
			e && typeof ResizeObserver < "u" && (f = new ResizeObserver(() => m()), f.observe(e));
		}
		return B(a, (e) => {
			e || (f?.disconnect(), f = null);
		}), D(() => {
			f?.disconnect(), f = null;
		}), (e, t) => (l(), w("div", kr, [a.value ? (l(), w("iframe", {
			key: 0,
			ref_key: "iframeRef",
			ref: u,
			srcdoc: c.value,
			sandbox: "allow-same-origin",
			title: E(n).html.preview,
			class: "tpl:block tpl:w-full tpl:border-0",
			style: F({ height: `${d.value}px` }),
			onLoad: h
		}, null, 44, Ar)) : (l(), w("div", jr, [z(E(Nt), {
			size: 24,
			class: "tpl:text-[var(--tpl-text-dim)]"
		}), i.value ? (l(), w("span", Mr, S(E(n).html.preview), 1)) : (l(), w("span", Nr, S(E(n).html.empty), 1))]))]));
	}
}), Fr = "image/";
function Ir(e) {
	let { target: t, onFiles: n, enabled: r } = e, i = () => r === void 0 || A(r), { isOverDropZone: a } = We(t, {
		preventDefaultForUnhandled: !0,
		onDrop: (e) => {
			if (!i()) return;
			let t = (e ?? []).filter((e) => e.type.startsWith(Fr));
			t.length > 0 && n([t[0]]);
		}
	});
	return { isOver: C(() => i() && a.value) };
}
//#endregion
//#region src/components/blocks/ImageBlock.vue?vue&type=script&setup=true&lang.ts
var Lr = {
	key: 0,
	class: "tpl:pointer-events-none tpl:absolute tpl:inset-0 tpl:z-10 tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-xs tpl:font-medium tpl:border-[var(--tpl-primary)] tpl:text-[var(--tpl-primary)]",
	style: { "background-color": "color-mix(in srgb, var(--tpl-bg) 85%, transparent)" }
}, Rr = ["href"], zr = ["src", "alt"], Br = ["src", "alt"], Vr = {
	class: "tpl:max-w-full tpl:truncate tpl:px-3 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-primary)]",
	style: { opacity: "0.7" }
}, Hr = ["href"], Ur = ["src", "alt"], Wr = ["src", "alt"], Gr = {
	key: 4,
	class: "tpl:flex tpl:min-h-[100px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-sm tpl:border-[var(--tpl-border-light)] tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-dim)]"
}, Kr = ["aria-label"], qr = { key: 1 }, Jr = /* @__PURE__ */ R({
	__name: "ImageBlock",
	props: {
		block: {},
		viewport: {}
	},
	emits: ["update"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = q(), { syntax: a } = Y(), o = p(et, null), s = C(() => !!o), c = Zt();
		async function u() {
			let e = await o?.({ accept: ["images"] });
			if (c.alive && e) {
				let t = { src: e.url };
				e.alt && (t.alt = e.alt), r("update", t);
			}
		}
		let d = v(), f = v(!1), m = C(() => s.value && !f.value && !b.value);
		async function h(e) {
			if (o) {
				f.value = !0;
				try {
					let t = await o({
						accept: ["images"],
						files: e
					});
					if (!c.alive) return;
					if (t) {
						let e = { src: t.url };
						t.alt && (e.alt = t.alt), r("update", e);
					}
				} finally {
					c.alive && (f.value = !1);
				}
			}
		}
		let { isOver: g } = Ir({
			target: d,
			enabled: m,
			onFiles: h
		}), _ = C(() => ({ textAlign: n.block.align })), y = C(() => {
			let e = n.block.align;
			return {
				maxWidth: "100%",
				width: n.block.width === "full" ? "100%" : `${n.block.width}px`,
				display: "block",
				marginLeft: e === "center" || e === "right" ? "auto" : void 0,
				marginRight: e === "center" ? "auto" : void 0
			};
		}), b = C(() => H(n.block.src, a)), x = Q(() => b.value ? void 0 : n.block.src), D = Q(() => b.value ? n.block.placeholderUrl : void 0);
		return (t, n) => (l(), w("div", {
			ref_key: "dropZoneRef",
			ref: d,
			"data-testid": "image-drop-zone",
			class: "tpl:relative tpl:w-full",
			style: F(_.value)
		}, [m.value && (E(g) || f.value) ? (l(), w("div", Lr, [f.value ? (l(), w(I, { key: 0 }, [z(E(Lt), {
			class: "tpl-spinner",
			size: 20,
			"stroke-width": 2
		}), L(" " + S(E(i).image.uploading), 1)], 64)) : (l(), w(I, { key: 1 }, [z(E(Wt), {
			size: 20,
			"stroke-width": 1.5
		}), L(" " + S(E(i).image.dropToUpload), 1)], 64))])) : T("", !0), e.block.src && b.value && e.block.placeholderUrl ? (l(), w(I, { key: 1 }, [e.block.linkUrl ? (l(), w("a", {
			key: 0,
			href: e.block.linkUrl,
			target: "_blank",
			rel: "noopener noreferrer",
			onClick: n[0] ||= O(() => {}, ["prevent"])
		}, [M("img", {
			class: "tpl:border-0",
			loading: "lazy",
			src: E(D),
			alt: e.block.alt || E(i).image.altTextPlaceholder,
			style: F(y.value)
		}, null, 12, zr)], 8, Rr)) : (l(), w("img", {
			key: 1,
			class: "tpl:border-0",
			src: E(D),
			alt: e.block.alt,
			style: F(y.value)
		}, null, 12, Br))], 64)) : e.block.src && b.value ? (l(), w("div", {
			key: 2,
			class: "tpl:!flex tpl:min-h-[120px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-center tpl:bg-[var(--tpl-bg-elevated)]",
			style: F([{ "border-color": "color-mix(in srgb, var(--tpl-primary) 40%, transparent)" }, y.value])
		}, [z(E(Ut), {
			size: 32,
			"stroke-width": 1.5,
			class: "tpl:text-[var(--tpl-primary)]",
			style: { opacity: "0.5" }
		}), M("span", Vr, [z(Gn, { text: e.block.src }, null, 8, ["text"])])], 4)) : e.block.src ? (l(), w(I, { key: 3 }, [e.block.linkUrl ? (l(), w("a", {
			key: 0,
			href: e.block.linkUrl,
			target: "_blank",
			rel: "noopener noreferrer",
			onClick: n[1] ||= O(() => {}, ["prevent"])
		}, [M("img", {
			class: "tpl:border-0",
			loading: "lazy",
			src: E(x),
			alt: e.block.alt || E(i).image.altTextPlaceholder,
			style: F(y.value)
		}, null, 12, Ur)], 8, Hr)) : (l(), w("img", {
			key: 1,
			class: "tpl:border-0",
			src: E(x),
			alt: e.block.alt,
			style: F(y.value)
		}, null, 12, Wr))], 64)) : (l(), w("div", Gr, [s.value ? (l(), w("button", {
			key: 0,
			"aria-label": E(i).image.browseMedia,
			class: "tpl:flex tpl:items-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:px-3 tpl:py-2 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150 tpl:cursor-pointer tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-primary)] tpl:bg-[var(--tpl-bg)]",
			onClick: O(u, ["stop"])
		}, [z(E(Ut), {
			size: 14,
			"stroke-width": 1.5
		}), L(" " + S(E(i).image.browseMedia), 1)], 8, Kr)) : (l(), w("span", qr, S(E(i).image.clickToAdd), 1))]))], 4));
	}
}), Yr = { class: "tpl:w-full" }, Xr = ["href"], Zr = {
	key: 1,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:text-sm tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text-dim)]"
}, Qr = /* @__PURE__ */ R({
	__name: "MenuBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, { t: n } = q(), r = C(() => ({
			display: "flex",
			flexWrap: "wrap",
			gap: `0 ${t.block.spacing}px`,
			justifyContent: t.block.textAlign === "left" ? "flex-start" : t.block.textAlign === "right" ? "flex-end" : "center",
			fontSize: `${t.block.fontSize}px`,
			fontFamily: t.block.fontFamily || "inherit",
			alignItems: "center"
		})), i = C(() => t.block.items.length > 0);
		function a(e) {
			return e || t.block.linkColor || t.block.color;
		}
		return (t, o) => (l(), w("div", Yr, [i.value ? (l(), w("div", {
			key: 0,
			style: F(r.value)
		}, [(l(!0), w(I, null, f(e.block.items, (t, n) => (l(), w(I, { key: t.id }, [M("a", {
			href: t.url || "#",
			class: "tpl:cursor-default tpl:no-underline",
			style: F({
				color: a(t.color),
				fontWeight: t.bold ? "bold" : "normal",
				textDecoration: t.underline ? "underline" : "none"
			}),
			onClick: o[0] ||= O(() => {}, ["prevent"])
		}, [z(Gn, { text: t.text || "..." }, null, 8, ["text"])], 12, Xr), n < e.block.items.length - 1 ? (l(), w("span", {
			key: 0,
			style: F({
				color: e.block.separatorColor,
				padding: `0 ${e.block.spacing}px`
			})
		}, S(e.block.separator), 5)) : T("", !0)], 64))), 128))], 4)) : (l(), w("div", Zr, [z(E(It), { size: 16 }), M("span", null, S(E(n).menu.addLinks), 1)]))]));
	}
}), $r = /* @__PURE__ */ new Set([
	"http",
	"https",
	"mailto",
	"tel",
	"ftp",
	"ftps",
	"sms",
	"xmpp",
	"cid"
]), ei = /* @__PURE__ */ new Set([
	"SCRIPT",
	"STYLE",
	"IFRAME",
	"OBJECT",
	"EMBED",
	"LINK",
	"META",
	"BASE",
	"FORM"
]), ti = /* @__PURE__ */ new Set([
	"href",
	"xlink:href",
	"formaction",
	"action",
	"ping",
	"background",
	"poster"
]);
function ni(e, t) {
	let n = e.replace(/[\t\n\r]/g, "").replace(/^[\u0000-\u0020]+/, "").trimEnd();
	if (!n || n.startsWith("#")) return !0;
	let r = /^([a-z][a-z0-9+.-]*):/i.exec(n);
	if (!r) return !0;
	let i = r[1].toLowerCase();
	return $r.has(i) ? !0 : t && i === "data" ? /^data:image\/(png|jpe?g|gif|webp|svg\+xml);/i.test(n) : !1;
}
function ri(e) {
	if (ei.has(e.tagName)) {
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
		if (ti.has(t)) {
			ni(e.getAttribute(n) ?? "", !1) || e.removeAttribute(n);
			continue;
		}
		if (t === "src") {
			ni(e.getAttribute(n) ?? "", !0) || e.removeAttribute(n);
			continue;
		}
		t === "srcdoc" && e.removeAttribute(n);
	}
	let n = Array.from(e.children);
	for (let e of n) ri(e);
}
function ii(e) {
	if (typeof DOMParser > "u") return e;
	let t = new DOMParser().parseFromString(`<!doctype html><body>${e}</body>`, "text/html").body, n = Array.from(t.children);
	for (let e of n) ri(e);
	return t.innerHTML;
}
//#endregion
//#region src/composables/useEditableTextBlock.ts
function ai(e) {
	let t = p(W, []), n = p(G, null), { syntax: r } = Y(), i = C(() => n?.value ? Se(e(), t) : De(e(), t)), a = C(() => ii(Ae(i.value, r))), o = v(!1), s = v(null), { top: c, left: l } = Ue(s), { toLocal: u } = At(), d = C(() => u({
		top: c.value - 8,
		left: l.value
	}));
	function f() {
		o.value = !0;
	}
	function m() {
		o.value = !1;
	}
	return {
		isEditing: o,
		blockRef: s,
		toolbarPosition: d,
		resolvedContent: a,
		handleDoubleClick: f,
		handleEditorDone: m
	};
}
//#endregion
//#region src/components/blocks/ParagraphBlock.vue?vue&type=script&setup=true&lang.ts
var oi = ["innerHTML"], si = /* @__PURE__ */ R({
	__name: "ParagraphBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, n = b(() => import("./ParagraphEditor-o4hs9mgy.js")), { isEditing: r, blockRef: i, toolbarPosition: a, resolvedContent: o, handleDoubleClick: s, handleEditorDone: c } = ai(() => t.block.content);
		return (t, u) => (l(), w("div", {
			ref_key: "blockRef",
			ref: i,
			class: "tpl:min-h-[1em] tpl:w-full",
			onDblclick: u[0] ||= (...e) => E(s) && E(s)(...e)
		}, [E(r) ? (l(), k(E(n), {
			key: 0,
			block: e.block,
			"toolbar-position": E(a),
			onDone: E(c)
		}, null, 8, [
			"block",
			"toolbar-position",
			"onDone"
		])) : (l(), w("div", {
			key: 1,
			class: "tpl-text-content tpl:outline-none [&_a]:tpl:underline [&_li]:tpl:my-1 [&_ol]:tpl:my-2 [&_ol]:tpl:pl-6 [&_p]:tpl:m-0 [&_p]:tpl:mb-2 [&_p:last-child]:tpl:mb-0 [&_s]:tpl:line-through [&_sub]:tpl:align-sub [&_sub]:tpl:text-[0.75em] [&_sup]:tpl:align-super [&_sup]:tpl:text-[0.75em] [&_ul]:tpl:my-2 [&_ul]:tpl:pl-6",
			innerHTML: E(o)
		}, null, 8, oi))], 544));
	}
});
//#endregion
//#region src/utils/blockComponentResolver.ts
function ci(e) {
	let t = { fontFamily: e.fontFamily };
	return e.textColor && (t.color = e.textColor), e.linkColor && (t["--tpl-doc-link-color"] = e.linkColor), e.linkUnderline && (t["--tpl-doc-link-underline"] = "underline"), t;
}
function li(e, t, n) {
	if (t) {
		let n = t.getComponent(e);
		if (n) return n;
	}
	return n[e.type] ?? null;
}
function ui(e) {
	let { padding: t, backgroundColor: n } = e.styles, r = {
		padding: `${t.top}px ${t.right}px ${t.bottom}px ${t.left}px`,
		backgroundColor: n || "transparent"
	};
	return e.type === "section" && e.borderRadius && e.borderRadius > 0 && (r.borderRadius = `${e.borderRadius}px`), r;
}
function di(e) {
	if (e.type !== "section" || !e.wrapper) return null;
	let t = e.wrapper, n = {};
	return t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.padding && (n.padding = `${t.padding.top}px ${t.padding.right}px ${t.padding.bottom}px ${t.padding.left}px`), t.borderRadius && t.borderRadius > 0 && (n.borderRadius = `${t.borderRadius}px`), n;
}
//#endregion
//#region src/components/blocks/BlockWrapper.vue?vue&type=script&setup=true&lang.ts
var fi = [
	"data-block-id",
	"data-block-type",
	"data-tpl-picked"
], pi = ["aria-label"], mi = [
	"aria-label",
	"aria-pressed",
	"title"
], hi = ["aria-label", "title"], gi = ["aria-label", "title"], _i = ["aria-label", "title"], vi = {
	key: 1,
	class: "tpl-block-hidden-overlay tpl:pointer-events-none tpl:absolute tpl:inset-0 tpl:z-[5] tpl:flex tpl:items-center tpl:justify-center tpl:rounded-sm"
}, yi = { class: "tpl:flex tpl:items-center tpl:gap-1 tpl:rounded tpl:px-2 tpl:py-1 tpl:text-[10px] tpl:font-medium tpl:bg-[var(--tpl-chrome-bg-elevated)] tpl:text-[var(--tpl-chrome-text-muted)] tpl:shadow-[var(--tpl-shadow-sm)]" }, bi = {
	key: 2,
	class: "tpl:absolute tpl:-left-1 tpl:top-1/2 tpl:z-[5] tpl:-translate-x-full tpl:-translate-y-1/2"
}, xi = ["aria-label", "title"], Si = {
	key: 3,
	class: "tpl:absolute tpl:-right-1 tpl:-top-1 tpl:z-[5] tpl:translate-x-full"
}, Ci = ["aria-label"], wi = /*#__PURE__*/ Xt(/* @__PURE__ */ R({
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
		let n = b(() => import("./BlockIssueBadge-dnqZk6pl.js")), i = e, a = t, { t: o, format: s } = q(), c = p(it, null), u = v(null), f = C(() => c?.liftedBlockId.value === i.block.id), m = C(() => f.value ? s(o.blockActions.dragLifted, { block: i.block.type }) : o.blockActions.drag);
		async function h() {
			await d(), u.value?.focus();
		}
		function g(e) {
			if (c) {
				if (e.key === " " || e.key === "Enter") {
					e.preventDefault(), e.stopPropagation(), f.value ? c.drop(i.block.id) : c.lift(i.block.id);
					return;
				}
				if (f.value) {
					if (e.key === "Escape") {
						e.preventDefault(), e.stopPropagation(), c.cancel(), h();
						return;
					}
					if (e.key === "ArrowUp") {
						e.preventDefault(), e.stopPropagation(), c.moveUp(i.block.id), h();
						return;
					}
					e.key === "ArrowDown" && (e.preventDefault(), e.stopPropagation(), c.moveDown(i.block.id), h());
				}
			}
		}
		let _ = C(() => !i.viewport || !i.block.visibility ? !1 : i.block.visibility[i.viewport] === !1), y = C(() => i.previewMode === !0 && _.value), x = C(() => i.viewport ? {
			desktop: o.viewport.desktop,
			mobile: o.viewport.mobile
		}[i.viewport] ?? i.viewport : ""), D = C(() => !!i.block.displayCondition), k = p(lt, null), A = p(ft, null), N = p(dt, {}), P = C(() => N.savedBlocks?.isPicking.value === !0), ee = C(() => !i.nested && N.savedBlocks?.isAvailable.value === !0 && N.savedBlocks?.canCreate.value === !0), I = C(() => i.isSelected && !P.value), R = C(() => N.comments?.getBlockCount(i.block.id) ?? 0), B = C(() => {
			let e = ui(i.block), t = {
				padding: e.padding,
				backgroundColor: e.backgroundColor
			};
			return e.borderRadius && (t.borderRadius = e.borderRadius), t;
		}), te = C(() => di(i.block));
		function ne(e) {
			i.previewMode || (e.target?.closest("a") && e.preventDefault(), e.stopPropagation(), a("select"));
		}
		function re() {
			k?.deleteBlock(i.block.id);
		}
		function ie() {
			k?.duplicateBlock(i.block);
		}
		function ae() {
			N.savedBlocks?.startPicking(i.block.id);
		}
		function oe() {
			A?.toggleBlock(i.block.id);
		}
		return (t, i) => y.value ? T("", !0) : (l(), w("div", {
			key: 0,
			class: j(["tpl-block tpl:group tpl:relative tpl:cursor-pointer tpl:rounded-sm tpl:transition-shadow tpl:duration-150", {
				"tpl-block--selected": e.isSelected,
				"tpl-block--picked": e.picked,
				"tpl-block--idle": !e.isSelected && !e.picked,
				"tpl-block--lifted": f.value
			}]),
			"data-block-id": e.block.id,
			"data-block-type": e.block.type,
			"data-tpl-picked": e.picked || void 0,
			onClick: ne
		}, [
			z(E(n), { "block-id": e.block.id }, null, 8, ["block-id"]),
			I.value ? (l(), w("div", {
				key: 0,
				role: "toolbar",
				"aria-label": E(o).blockActions.drag,
				class: "tpl-block-actions tpl-fade-in tpl:absolute tpl:-right-2 tpl:top-1/2 tpl:z-10 tpl:flex tpl:-translate-y-1/2 tpl:translate-x-full tpl:gap-0.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:p-1 tpl:bg-[var(--tpl-chrome-bg-elevated)] tpl:shadow-[var(--tpl-shadow-md)] tpl:border tpl:border-[var(--tpl-border)]"
			}, [
				M("button", {
					ref_key: "dragButtonRef",
					ref: u,
					class: "tpl-block-btn tpl-block-action-btn tpl:flex tpl:size-7 tpl:cursor-grab tpl:items-center tpl:justify-center tpl:rounded-sm tpl:border-none tpl:transition-colors tpl:duration-150 tpl:active:cursor-grabbing",
					"aria-label": m.value,
					"aria-pressed": f.value,
					"aria-keyshortcuts": "Space Enter ArrowUp ArrowDown Escape",
					title: E(o).blockActions.drag,
					onKeydown: g
				}, [z(E(zt), {
					size: 14,
					"stroke-width": 1.5
				})], 40, mi),
				M("button", {
					class: "tpl-block-action-btn tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-sm tpl:border-none tpl:transition-colors tpl:duration-150",
					"aria-label": E(o).blockActions.duplicate,
					title: E(o).blockActions.duplicate,
					onClick: O(ie, ["stop"])
				}, [z(E(Mt), {
					size: 14,
					"stroke-width": 1.5
				})], 8, hi),
				ee.value ? (l(), w("button", {
					key: 0,
					class: "tpl-block-action-btn tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-sm tpl:border-none tpl:transition-colors tpl:duration-150",
					"aria-label": E(o).blockActions.saveAsBlock,
					title: E(o).blockActions.saveAsBlock,
					onClick: O(ae, ["stop"])
				}, [z(E(jt), {
					size: 14,
					"stroke-width": 1.5
				})], 8, gi)) : T("", !0),
				M("button", {
					class: "tpl-block-action-btn tpl-block-delete-btn tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-sm tpl:border-none tpl:transition-colors tpl:duration-150",
					"aria-label": E(o).blockActions.delete,
					title: E(o).blockActions.delete,
					onClick: O(re, ["stop"])
				}, [z(E(Rt), {
					size: 14,
					"stroke-width": 1.5
				})], 8, _i)
			], 8, pi)) : T("", !0),
			_.value ? (l(), w("div", vi, [M("span", yi, [z(E(Pt), {
				size: 12,
				"stroke-width": 1.5
			}), L(" " + S(E(s)(E(o).blockActions.hiddenOnViewport, { viewport: x.value })), 1)])])) : T("", !0),
			D.value && !_.value ? (l(), w("div", bi, [M("button", {
				"data-testid": "condition-toggle",
				class: "tpl-condition-toggle tpl:flex tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-md tpl:p-1 tpl:transition-colors tpl:duration-150 tpl:bg-[var(--tpl-chrome-bg-elevated)] tpl:text-[var(--tpl-primary)] tpl:border tpl:border-[var(--tpl-border)]",
				"aria-label": E(o).blockActions.conditionToggle,
				title: e.block.displayCondition?.label,
				onClick: O(oe, ["stop"])
			}, [z(E(qt), {
				size: 12,
				"stroke-width": 2
			})], 8, xi)])) : T("", !0),
			R.value > 0 && !_.value ? (l(), w("div", Si, [M("button", {
				class: "tpl-comment-indicator tpl:flex tpl:min-h-6 tpl:min-w-6 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-0.5 tpl:rounded-full tpl:border-none tpl:px-2 tpl:py-0.5 tpl:text-[10px] tpl:font-semibold tpl:transition-colors tpl:duration-150 tpl:bg-[var(--tpl-chrome-primary-light)] tpl:text-[var(--tpl-primary)]",
				"aria-label": E(s)(E(o).blockActions.comments, { count: String(R.value) }),
				onClick: i[0] ||= O((t) => E(N).comments?.openForBlock(e.block.id), ["stop"])
			}, [z(E(Vt), {
				size: 12,
				"stroke-width": 2.5
			}), L(" " + S(R.value), 1)], 8, Ci)])) : T("", !0),
			te.value ? (l(), w("div", {
				key: 4,
				class: "tpl-section-wrapper",
				style: F(te.value)
			}, [M("div", {
				class: "tpl-block-content",
				style: F(B.value)
			}, [r(t.$slots, "default", {}, void 0, !0)], 4)], 4)) : (l(), w("div", {
				key: 5,
				class: "tpl-block-content",
				style: F(B.value)
			}, [r(t.$slots, "default", {}, void 0, !0)], 4))
		], 10, fi));
	}
}), [["__scopeId", "data-v-8e4583ee"]]);
//#endregion
//#region src/utils/unwrapParagraph.ts
function Ti(e) {
	let t = e.match(/^\s*<p\b[^>]*>([\s\S]*)<\/p>\s*$/);
	return !t || /<\/p>\s*<p\b/i.test(t[1]) ? e : t[1];
}
//#endregion
//#region src/components/blocks/TitleBlock.vue
var Ei = /* @__PURE__ */ R({
	__name: "TitleBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, n = b(() => import("./TitleEditor-LiUvXGPw.js")), { isEditing: r, blockRef: i, toolbarPosition: a, resolvedContent: o, handleDoubleClick: s, handleEditorDone: u } = ai(() => t.block.content), d = C(() => {
			let e = {
				fontSize: `${te[t.block.level]}px`,
				textAlign: t.block.textAlign
			};
			return t.block.color && (e.color = t.block.color), t.block.fontFamily && (e.fontFamily = t.block.fontFamily), e;
		}), f = C(() => `h${t.block.level}`), p = C(() => Ti(o.value));
		return (t, o) => (l(), w("div", {
			ref_key: "blockRef",
			ref: i,
			class: "tpl:min-h-[1em] tpl:w-full",
			style: F(d.value),
			onDblclick: o[0] ||= (...e) => E(s) && E(s)(...e)
		}, [E(r) ? (l(), k(E(n), {
			key: 0,
			block: e.block,
			"toolbar-position": E(a),
			onDone: E(u)
		}, null, 8, [
			"block",
			"toolbar-position",
			"onDone"
		])) : (l(), k(c(f.value), {
			key: 1,
			class: "tpl-text-content tpl:m-0 tpl:font-[inherit] tpl:text-[length:inherit] tpl:leading-tight tpl:outline-none [&_a]:tpl:underline [&_p]:tpl:m-0 [&_p]:tpl:mb-2 [&_p:last-child]:tpl:mb-0",
			style: { color: "inherit" },
			innerHTML: p.value
		}, null, 8, ["innerHTML"]))], 36));
	}
});
//#endregion
//#region src/utils/sectionColumnDrop.ts
function Di(e) {
	return e.dataset.blockType !== "section" && e.dataset.paletteType !== "section";
}
//#endregion
//#region src/components/blocks/SectionBlock.vue?vue&type=script&setup=true&lang.ts
var Oi = { class: "tpl:w-full" }, ki = {
	key: 0,
	"data-testid": "section-drop-hint",
	class: "tpl:pointer-events-none tpl:absolute tpl:inset-0 tpl:flex tpl:items-center tpl:justify-center tpl:text-xs tpl:text-[var(--tpl-chrome-text-dim)]"
}, Ai = /* @__PURE__ */ R({
	__name: "SectionBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = {
			title: Ei,
			paragraph: si,
			image: Jr,
			button: Jn,
			divider: Or,
			custom: Er
		}, n = e, { t: r } = q(), i = Xe(K, "SectionBlock"), o = p(ft, null), s = p(xt, null), u = p(dt, {}), d = p(bt, null);
		function m(e) {
			let t = u.savedBlocks;
			if (t?.isPicking.value) {
				t.togglePick(n.block.id);
				return;
			}
			i.selectBlock(e);
		}
		let g = C(() => {
			switch (n.block.columns) {
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
		}), _ = C(() => {
			let e = g.value.length, t = [...n.block.children];
			for (; t.length < e;) t.push([]);
			return t.slice(0, e);
		}), v = C(() => n.viewport === "mobile" && n.block.stackOnMobile !== !1);
		function y(e) {
			return _.value[e] || [];
		}
		function b(e, t) {
			let r = t.map((e) => JSON.parse(JSON.stringify(e))), a = [...n.block.children];
			for (; a.length <= e;) a.push([]);
			a[e] = r, i.updateBlock(n.block.id, { children: a });
		}
		function x(e) {
			return li(e, s, t);
		}
		function D(e, t) {
			e.type === "custom" && i.updateBlock(e.id, {
				fieldValues: t.fieldValues,
				dataSourceFetched: t.dataSourceFetched
			});
		}
		return (t, n) => (l(), w("div", Oi, [M("div", { class: j(["tpl:flex tpl:gap-0", { "tpl:flex-col": v.value }]) }, [(l(!0), w(I, null, f(_.value, (t, n) => (l(), w("div", {
			key: n,
			class: j(["tpl:relative tpl:min-h-[60px] tpl:rounded", y(n).length === 0 ? "tpl:border tpl:border-dashed tpl:border-[var(--tpl-border)]" : ""]),
			style: F({ width: v.value ? "100%" : g.value[n] })
		}, [z(E(ee), {
			"model-value": y(n),
			group: {
				name: "blocks",
				pull: !0,
				put: (e, t, n) => E(Di)(n)
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
			"onUpdate:modelValue": (e) => b(n, e)
		}, {
			default: h(() => [(l(!0), w(I, null, f(y(n), (t) => a((l(), w("div", { key: t.id }, [z(wi, {
				block: t,
				"is-selected": E(i).state.selectedBlockId === t.id,
				viewport: e.viewport,
				"preview-mode": E(i).state.previewMode,
				nested: "",
				onSelect: (e) => m(t.id)
			}, {
				default: h(() => [(l(), k(c(x(t)), {
					block: t,
					viewport: e.viewport,
					onFetchData: (e) => D(t, e),
					onUpdate: (e) => E(i).updateBlock(t.id, e)
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
			])])), [[P, E(d) === !1 || !E(o)?.isHidden(t.id)]])), 128))]),
			_: 2
		}, 1032, [
			"model-value",
			"group",
			"onUpdate:modelValue"
		]), y(n).length === 0 ? (l(), w("div", ki, [M("span", null, S(E(r).section.dropHere), 1)])) : T("", !0)], 6))), 128))], 2)]));
	}
}), ji = pe, Mi = {
	small: 24,
	medium: 32,
	large: 48
}, Ni = [
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
], Pi = [
	"width",
	"height",
	"fill"
], Fi = ["d"], Ii = /* @__PURE__ */ R({
	__name: "SocialIconSvg",
	props: {
		platform: {},
		iconStyle: {},
		iconSize: {}
	},
	setup(e) {
		let t = e, n = C(() => ji[t.platform]), r = C(() => Mi[t.iconSize]), i = C(() => {
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
		}), a = C(() => Math.floor(r.value * .6)), o = C(() => t.iconStyle === "outlined" ? n.value.color : "#ffffff");
		return (e, t) => (l(), w("span", { style: F(i.value) }, [(l(), w("svg", {
			width: a.value,
			height: a.value,
			viewBox: "0 0 24 24",
			fill: o.value,
			xmlns: "http://www.w3.org/2000/svg"
		}, [M("path", { d: n.value.path }, null, 8, Fi)], 8, Pi))], 4));
	}
}), Li = { class: "tpl:w-full" }, Ri = ["href"], zi = {
	key: 1,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:text-sm tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text-dim)]"
}, Bi = /* @__PURE__ */ R({
	__name: "SocialIconsBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, { t: n } = q(), r = C(() => ({
			display: "flex",
			flexWrap: "wrap",
			gap: `${t.block.spacing}px`,
			justifyContent: t.block.align === "left" ? "flex-start" : t.block.align === "right" ? "flex-end" : "center"
		})), i = C(() => t.block.icons.length > 0);
		return (t, a) => (l(), w("div", Li, [i.value ? (l(), w("div", {
			key: 0,
			style: F(r.value)
		}, [(l(!0), w(I, null, f(e.block.icons, (t) => (l(), w("a", {
			key: t.id,
			href: t.url || "#",
			class: "tpl:cursor-default",
			onClick: a[0] ||= O(() => {}, ["prevent"])
		}, [z(Ii, {
			platform: t.platform,
			"icon-style": e.block.iconStyle,
			"icon-size": e.block.iconSize
		}, null, 8, [
			"platform",
			"icon-style",
			"icon-size"
		])], 8, Ri))), 128))], 4)) : (l(), w("div", zi, [z(E(Bt), { size: 16 }), M("span", null, S(E(n).social.addIcons), 1)]))]));
	}
}), Vi = { class: "tpl:w-full" }, Hi = {
	key: 0,
	class: "tpl:absolute tpl:rounded tpl:px-2 tpl:py-0.5 tpl:text-[10px] tpl:font-medium",
	style: {
		"background-color": "var(--tpl-bg-hover)",
		color: "var(--tpl-text-dim)"
	}
}, Ui = /* @__PURE__ */ R({
	__name: "SpacerBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, n = Xe(K, "SpacerBlock"), r = C(() => ({
			height: `${t.block.height}px`,
			minHeight: `${t.block.height}px`,
			...n.state.previewMode ? {} : { borderColor: "var(--tpl-border)" }
		}));
		return (t, i) => (l(), w("div", Vi, [M("div", {
			style: F(r.value),
			class: j(["tpl:relative tpl:flex tpl:items-center tpl:justify-center", { "tpl:border-y tpl:border-dashed": !E(n).state.previewMode }])
		}, [E(n).state.previewMode ? T("", !0) : (l(), w("span", Hi, S(e.block.height) + "px ", 1))], 6)]));
	}
}), Wi = { class: "tpl:w-full" }, Gi = { key: 0 }, Ki = [
	"aria-label",
	"data-placeholder",
	"onBlur"
], qi = [
	"aria-label",
	"data-placeholder",
	"onBlur"
], Ji = {
	key: 1,
	class: "tpl:flex tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border tpl:border-dashed tpl:py-4 tpl:text-sm tpl:border-[var(--tpl-border)] tpl:text-[var(--tpl-text-dim)]"
}, Yi = /*#__PURE__*/ Xt(/* @__PURE__ */ R({
	__name: "TableBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = {
			mounted(e, t) {
				e.textContent = t.value ?? "";
			},
			updated(e, t) {
				t.value !== t.oldValue && e.getRootNode().activeElement !== e && (e.textContent = t.value ?? "");
			}
		}, n = e, { t: r } = q(), i = Xe(K, "TableBlock"), o = C(() => n.block.rows.length > 0), s = C(() => {
			let e = {
				width: "100%",
				borderCollapse: "collapse",
				fontSize: `${n.block.fontSize}px`,
				textAlign: n.block.textAlign,
				fontFamily: n.block.fontFamily || "inherit"
			};
			return n.block.color && (e.color = n.block.color), e;
		}), c = C(() => ({
			border: `${n.block.borderWidth}px solid ${n.block.borderColor}`,
			padding: `${n.block.cellPadding}px`,
			textAlign: n.block.textAlign
		})), u = C(() => ({
			...c.value,
			fontWeight: "bold",
			backgroundColor: n.block.headerBackgroundColor || "transparent"
		})), d = C(() => n.block.hasHeaderRow && n.block.rows.length > 0 ? n.block.rows[0] : null), p = C(() => n.block.hasHeaderRow ? n.block.rows.slice(1) : n.block.rows);
		function m() {
			i.selectBlock(n.block.id);
		}
		function h(e, t, r) {
			let a = r.target.innerText.trim(), o = n.block.rows.map((n) => n.id === e ? {
				...n,
				cells: n.cells.map((e) => e.id === t ? {
					...e,
					content: a
				} : e)
			} : n);
			i.updateBlock(n.block.id, { rows: o });
		}
		return (e, n) => (l(), w("div", Wi, [o.value ? (l(), w("table", {
			key: 0,
			style: F(s.value),
			class: "tpl-table-editable"
		}, [d.value ? (l(), w("thead", Gi, [M("tr", null, [(l(!0), w(I, null, f(d.value.cells, (e) => a((l(), w("th", {
			key: e.id,
			style: F(u.value),
			"aria-label": E(r).table.cellPlaceholder,
			contenteditable: "true",
			"data-placeholder": E(r).table.cellPlaceholder,
			onBlur: (t) => h(d.value.id, e.id, t),
			onKeydown: n[0] ||= x(O((e) => e.target.blur(), ["prevent"]), ["enter"]),
			onClick: O(m, ["stop"])
		}, null, 44, Ki)), [[t, e.content]])), 128))])])) : T("", !0), M("tbody", null, [(l(!0), w(I, null, f(p.value, (e) => (l(), w("tr", { key: e.id }, [(l(!0), w(I, null, f(e.cells, (i) => a((l(), w("td", {
			key: i.id,
			style: F(c.value),
			"aria-label": E(r).table.cellPlaceholder,
			contenteditable: "true",
			"data-placeholder": E(r).table.cellPlaceholder,
			onBlur: (t) => h(e.id, i.id, t),
			onKeydown: n[1] ||= x(O((e) => e.target.blur(), ["prevent"]), ["enter"]),
			onClick: O(m, ["stop"])
		}, null, 44, qi)), [[t, i.content]])), 128))]))), 128))])], 4)) : (l(), w("div", Ji, [z(E(Kt), { size: 16 }), M("span", null, S(E(r).table.empty), 1)]))]));
	}
}), [["__scopeId", "data-v-963ac422"]]), Xi = /* @__PURE__ */ R({
	__name: "VideoPlayButton",
	props: { hoverEffect: {
		type: Boolean,
		default: !1
	} },
	setup(e) {
		return (t, n) => (l(), w("div", { class: j(["tpl:absolute tpl:inset-0 tpl:flex tpl:items-center tpl:justify-center tpl:bg-black/30", e.hoverEffect && "tpl:transition-opacity tpl:group-hover:bg-black/40"]) }, [...n[0] ||= [M("div", { class: "tpl:flex tpl:size-16 tpl:items-center tpl:justify-center tpl:rounded-full tpl:bg-white/90 tpl:shadow-lg" }, [M("svg", {
			class: "tpl:ml-1 tpl:text-[var(--tpl-danger)]",
			width: "28",
			height: "28",
			viewBox: "0 0 24 24",
			fill: "currentColor"
		}, [M("polygon", { points: "5,3 19,12 5,21" })])], -1)]], 2));
	}
});
//#endregion
//#region src/utils/videoThumbnail.ts
function Zi(e) {
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
function Qi(e, t) {
	return t || Zi(e).thumbnailUrl;
}
//#endregion
//#region src/components/blocks/VideoBlock.vue?vue&type=script&setup=true&lang.ts
var $i = ["src", "alt"], ea = {
	class: "tpl:max-w-full tpl:truncate tpl:px-3 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-primary)]",
	style: { opacity: "0.7" }
}, ta = ["href"], na = ["src", "alt"], ra = ["src", "alt"], ia = {
	key: 3,
	class: "tpl:flex tpl:min-h-[150px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-sm tpl:border-[var(--tpl-border-light)] tpl:bg-[var(--tpl-bg-hover)] tpl:text-[var(--tpl-text-dim)]"
}, aa = /* @__PURE__ */ R({
	__name: "VideoBlock",
	props: {
		block: {},
		viewport: {}
	},
	setup(e) {
		let t = e, { t: n } = q(), { syntax: r } = Y(), i = C(() => H(t.block.url, r) || H(t.block.thumbnailUrl, r)), a = Q(() => i.value ? void 0 : t.block.thumbnailUrl || void 0), o = Q(() => i.value ? t.block.placeholderUrl : void 0), s = C(() => i.value ? null : t.block.thumbnailUrl ? a.value ?? null : Qi(t.block.url)), c = C(() => ({ textAlign: t.block.align })), u = C(() => {
			let e = t.block.align;
			return {
				maxWidth: "100%",
				width: t.block.width === "full" ? "100%" : `${t.block.width}px`,
				display: "block",
				marginLeft: e === "center" || e === "right" ? "auto" : void 0,
				marginRight: e === "center" ? "auto" : void 0
			};
		}), d = C(() => H(t.block.url, r) ? t.block.url : t.block.thumbnailUrl);
		return (t, r) => (l(), w("div", {
			class: "tpl:w-full",
			style: F(c.value)
		}, [i.value && e.block.placeholderUrl ? (l(), w("div", {
			key: 0,
			class: "tpl:relative tpl:inline-block",
			style: F(u.value)
		}, [M("img", {
			class: "tpl:w-full tpl:border-0",
			src: E(o),
			alt: e.block.alt
		}, null, 8, $i), z(Xi)], 4)) : i.value ? (l(), w("div", {
			key: 1,
			class: "tpl:relative tpl:!flex tpl:min-h-[150px] tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2 tpl:rounded tpl:border-2 tpl:border-dashed tpl:text-center tpl:bg-[var(--tpl-bg-elevated)]",
			style: F([{ "border-color": "color-mix(in srgb, var(--tpl-primary) 40%, transparent)" }, u.value])
		}, [z(E(Ht), {
			size: 36,
			"stroke-width": 1.5,
			class: "tpl:text-[var(--tpl-primary)]",
			style: { opacity: "0.5" }
		}), M("span", ea, [z(Gn, { text: d.value }, null, 8, ["text"])])], 4)) : s.value ? (l(), w(I, { key: 2 }, [e.block.url ? (l(), w("a", {
			key: 0,
			href: e.block.url,
			target: "_blank",
			rel: "noopener noreferrer",
			class: "tpl:group tpl:relative tpl:inline-block",
			style: F(u.value),
			onClick: r[0] ||= O(() => {}, ["prevent"])
		}, [M("img", {
			class: "tpl:w-full tpl:border-0",
			src: s.value,
			alt: e.block.alt
		}, null, 8, na), z(Xi, { "hover-effect": "" })], 12, ta)) : (l(), w("div", {
			key: 1,
			class: "tpl:relative tpl:inline-block",
			style: F(u.value)
		}, [M("img", {
			class: "tpl:w-full tpl:border-0",
			src: s.value,
			alt: e.block.alt
		}, null, 8, ra), z(Xi)], 4))], 64)) : (l(), w("div", ia, [z(E(Ht), {
			size: 40,
			"stroke-width": 1.5,
			class: "tpl:text-[var(--tpl-border-light)]"
		}), M("span", null, S(E(n).video.addVideo), 1)]))], 4));
	}
}), oa = {
	section: Ai,
	title: Ei,
	paragraph: si,
	image: Jr,
	button: Jn,
	divider: Or,
	video: aa,
	social: Bi,
	menu: Qr,
	table: Yi,
	spacer: Ui,
	html: Pr,
	countdown: b(() => import("./CountdownBlock-D2Oth7YY.js"))
};
function sa(e) {
	let { editor: t, config: n, translations: r, fontsManager: a } = e, { t: s, format: c } = q(r);
	t.setUiTheme(n.uiTheme ?? "auto");
	let { resolvedTheme: l } = En(C(() => t.state.uiTheme)), d = v(n.theme ?? {}), { themeStyles: f } = On({
		themeOverrides: d,
		resolvedTheme: l,
		extraStyles: e.themeExtraStyles
	}), p = rn({
		content: t.content,
		setContent: (e, n) => t.setContent(e, n),
		...e.historyOptions
	});
	un(t, p);
	let m = on({
		addBlock: t.addBlock,
		removeBlock: t.removeBlock,
		updateBlock: t.updateBlock,
		selectBlock: t.selectBlock,
		findBlockLocation: t.findBlockLocation,
		blockDefaults: n.blockDefaults
	}), h = cn(t), g = e.autoSaveOptions !== null && e.autoSaveOptions !== void 0 ? sn({
		content: t.content,
		isDirty: () => t.state.isDirty,
		...e.autoSaveOptions
	}) : null, _ = null;
	g && (_ = B(p.isNavigating, (e) => {
		e ? g.pause() : g.resume();
	}));
	let y = Tn(t, {
		t: s,
		format: c
	}, n.customBlocks ?? []), b = kt(n.colors);
	if (b.allowCustomIgnored && $.warn("config.colors.allowCustom: false is ignored without presets — keeping the color wheel and hex input so a color can still be chosen."), b.invalidPresets.length > 0 && $.warn(`config.colors.presets skipped invalid entries: ${b.invalidPresets.join(", ")} — presets must be hex colors (#rgb or #rrggbb).`), b.allowCustom === !1) {
		let e = zn(b.presets, n.blockDefaults, n.templateDefaults);
		e.length > 0 && $.warn(`config.colors locks custom colours, but these block/template default colours fall outside colors.presets: ${e.join(", ")}. New blocks start on a colour the palette can't reselect — set blockDefaults / templateDefaults from the same palette.`);
	}
	let x = jn();
	In(x, oa);
	let S = /* @__PURE__ */ new Set();
	function w(e) {
		for (let t of e) {
			x.registerCustom(t, Er);
			for (let e of Vn(t, b)) S.has(e.id) || (S.add(e.id), $.warn(e.message));
		}
	}
	n.customBlocks?.length && w(n.customBlocks);
	let T = hn();
	if (i() && o(T.dispose), e.containerEl) {
		let t = e.containerEl;
		U(document, "pointerdown", (e) => {
			let n = t.value;
			n && (e.composedPath?.() ?? []).includes(n) && T.claim();
		}, { capture: !0 });
	}
	function E(r) {
		T.isActive() && Un(r, {
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
	U(document, "keydown", E);
	let D = v(null);
	u(ct, e.editorRoot ?? document), u(Ye, D), u(Ze, r), u(K, t), u(Et, p), u(lt, m), u(ft, h), u(Ct, a), u(st, f), u(ot, l), u(vt, n.blockDefaults), u(xt, x), u(yt, n.customBlocks ?? []), u(rt, n.paletteBlocks), u(ut, Ln(n.htmlBlockPreview)), u(St, b), u(gt, Mn(t.content, x));
	let O = Ce(n.mergeTags?.syntax);
	u(W, n.mergeTags?.tags ?? []), u(Ge, O), u(tt, n.mergeTags?.onRequest ?? null), u(Je, n.mergeTags?.autocomplete !== !1);
	let k = v(Pe(n.mergeTags?.tags ?? []));
	u(ht, k);
	let A = _n({
		resolvePreview: n.resolvePreview,
		getContent: () => t.content.value,
		isActive: () => t.state.previewMode
	});
	u(Qe, A), u($e, n.resolvePreview);
	let j = C(() => !(t.state.previewMode && A.isConfigured));
	u(bt, j);
	let M = yn();
	u(nt, M), u(wt, n.logicTags?.tags ?? []), u(qe, n.logicTags?.pairs ?? []), u(mt, n.logicTags?.onRequest ?? null), u(at, bn()), u(et, n.onRequestMedia ?? null), u(Tt, n.resolveImageUrl ? vn(n.resolveImageUrl) : null), u(pt, n.displayConditions?.conditions ?? []), u(_t, n.displayConditions?.allowCustom ?? !1), u(dt, e.capabilities ?? {}), u(it, y);
	let N = xn(n.lint) ? null : Sn({
		content: t.content,
		options: n.lint ?? {},
		updateBlock: t.updateBlock,
		updateSettings: t.updateSettings,
		removeBlock: t.removeBlock
	});
	u(Ke, N);
	function P() {
		_?.(), N?.destroy(), g?.destroy(), p.destroy();
	}
	return {
		t: s,
		format: c,
		history: p,
		blockActions: m,
		conditionPreview: h,
		autoSave: g,
		resolvedTheme: l,
		themeStyles: f,
		themeOverrides: d,
		registry: x,
		keyboardReorder: y,
		templateLint: N,
		popoverRoot: D,
		mergeTagSampleMode: k,
		previewResolution: A,
		appliesConditionFilter: j,
		registerCustomBlocks: w,
		destroy: P
	};
}
//#endregion
export { Bn as A, cr as C, er as D, tr as E, pn as F, dn as I, ln as L, wn as M, Cn as N, Zn as O, _n as P, $t as R, pr as S, nr as T, Pr as _, Bi as a, _r as b, Ei as c, ci as d, li as f, Ir as g, Jr as h, Ui as i, $ as j, Jn as k, wi as l, Qr as m, aa as n, Ni as o, si as p, Yi as r, Ai as s, sa as t, ui as u, Or as v, sr as w, hr as x, Er as y };

//# sourceMappingURL=useEditorCore-CTYH6u4r.js.map