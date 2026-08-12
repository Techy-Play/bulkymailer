import { A as e, C as t, D as n, F as r, H as i, I as a, K as o, L as s, M as c, N as l, P as u, T as d, V as f, Z as p, c as m, ct as h, d as g, f as _, g as v, h as y, it as b, l as x, m as S, n as C, o as w, ot as T, p as E, r as D, s as O, st as k, tt as ee, u as A, v as j, x as M, y as N, z as te } from "./draggable-BRF_Q_jB.js";
import { h as ne } from "./dist-Dp46rwVY.js";
import { a as re, n as ie, o as ae, r as P, s as F, t as oe } from "./dist-BLF-S9_A.js";
import { B as I, C as se, Et as ce, Lt as le, P as ue, Pt as de, W as fe, Y as pe, _t as me, at as he, bt as ge, d as _e, lt as ve, n as ye, ot as be, q as xe, s as Se, xt as Ce } from "./icons-DN008liP.js";
import { t as we } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { S as L, b as Te, w as Ee, x as R } from "./cloud-CxNsW3hp.js";
//#region ../media-library/src/api-client.ts
var De = class {
	authManager;
	constructor(e) {
		this.authManager = e;
	}
	get projectId() {
		return this.authManager.projectId;
	}
	get tenantSlug() {
		return this.authManager.tenantSlug;
	}
	get baseParams() {
		return {
			project: this.projectId,
			tenant: this.tenantSlug
		};
	}
	async request(e, t = {}) {
		let n = await this.authManager.authenticatedFetch(e, {
			...t,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				...t.headers
			}
		});
		if (!n.ok) {
			let e = await n.json().catch(() => ({ message: `HTTP error ${n.status}` }));
			throw Error(e.message, { cause: e });
		}
		if (n.status !== 204) return (await n.json()).data;
	}
	async browseMedia(e) {
		let t = new URLSearchParams();
		e.folder_id && t.set("folder_id", e.folder_id), e.search && t.set("search", e.search), e.category && t.set("category", e.category), e.sort && t.set("sort", e.sort), e.cursor && t.set("cursor", e.cursor);
		let n = t.toString(), r = `${L(R["media.browse"], this.baseParams)}${n ? `?${n}` : ""}`, i = await this.authManager.authenticatedFetch(r, { headers: { Accept: "application/json" } });
		if (!i.ok) {
			let e = await i.json().catch(() => ({ message: `HTTP error ${i.status}` }));
			throw Error(e.message, { cause: e });
		}
		return i.json();
	}
	async uploadMedia(e, t) {
		let n = new FormData();
		n.append("file", e), t && n.append("folder_id", t);
		let r = L(R["media.upload"], this.baseParams), i = await this.authManager.authenticatedFetch(r, {
			method: "POST",
			headers: { Accept: "application/json" },
			body: n
		});
		if (!i.ok) {
			let e = await i.json().catch(() => ({ message: `HTTP error ${i.status}` }));
			throw Error(e.message, { cause: e });
		}
		return (await i.json()).data;
	}
	async updateMedia(e, t, n) {
		return this.request(L(R["media.update"], {
			...this.baseParams,
			media: e
		}), {
			method: "PUT",
			body: JSON.stringify({
				filename: t,
				alt_text: n
			})
		});
	}
	async deleteMedia(e) {
		return this.request(L(R["media.delete"], this.baseParams), {
			method: "POST",
			body: JSON.stringify({ ids: e })
		});
	}
	async moveMedia(e, t) {
		return this.request(L(R["media.move"], this.baseParams), {
			method: "POST",
			body: JSON.stringify({
				ids: e,
				folder_id: t
			})
		});
	}
	async getMediaFolders() {
		return this.request(L(R["folders.index"], this.baseParams));
	}
	async createMediaFolder(e, t) {
		return this.request(L(R["folders.store"], this.baseParams), {
			method: "POST",
			body: JSON.stringify({
				name: e,
				parent_id: t ?? null
			})
		});
	}
	async renameMediaFolder(e, t) {
		return this.request(L(R["folders.update"], {
			...this.baseParams,
			mediaFolder: e
		}), {
			method: "PUT",
			body: JSON.stringify({ name: t })
		});
	}
	async deleteMediaFolder(e) {
		return this.request(L(R["folders.destroy"], {
			...this.baseParams,
			mediaFolder: e
		}), { method: "DELETE" });
	}
	async checkMediaUsage(e) {
		let t = await this.authManager.authenticatedFetch(L(R["media.checkUsage"], this.baseParams), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({ ids: e })
		});
		if (!t.ok) {
			let e = await t.json().catch(() => ({ message: `HTTP error ${t.status}` }));
			throw Error(e.message, { cause: e });
		}
		return t.json();
	}
	async getFrequentlyUsed() {
		return this.request(L(R["media.frequentlyUsed"], this.baseParams));
	}
	async importFromUrl(e, t) {
		return this.request(L(R["media.importFromUrl"], this.baseParams), {
			method: "POST",
			body: JSON.stringify({
				url: e,
				folder_id: t ?? null
			})
		});
	}
	async replaceMedia(e, t) {
		let n = new FormData();
		n.append("file", t);
		let r = L(R["media.replace"], {
			...this.baseParams,
			media: e
		}), i = await this.authManager.authenticatedFetch(r, {
			method: "POST",
			headers: { Accept: "application/json" },
			body: n
		});
		if (!i.ok) {
			let e = await i.json().catch(() => ({ message: `HTTP error ${i.status}` }));
			throw Error(e.message, { cause: e });
		}
		return (await i.json()).data;
	}
};
//#endregion
//#region ../media-library/src/composable.ts
function Oe(e) {
	if (!e.projectId) throw Error("projectId is required for useMediaLibrary");
	let t = new De(e.authManager), n = p([]), r = p([]), i = p(null), a = p("files"), o = p(""), s = p(null), c = p("newest"), l = p(!1), u = p(!1), d = p(!1), f = p(null), m = p(null), h = p(/* @__PURE__ */ new Set()), g = p(null), _ = p([]), v = p({}), y = p(!1), b = p([]), x = p(!1), S = p(null), C = p(!1), w = p(null), T = p(!1), E = p(null), D = p(null), O = 0;
	async function k() {
		let r = ++O;
		l.value = !0;
		try {
			let e = await t.browseMedia({
				folder_id: o.value ? void 0 : i.value,
				search: o.value || void 0,
				category: s.value || void 0,
				sort: c.value === "newest" ? void 0 : c.value
			});
			if (r !== O) return;
			n.value = e.data, f.value = e.meta.next_cursor, d.value = !!e.meta.next_cursor;
		} catch (t) {
			if (r !== O) return;
			e.onError?.(t);
		} finally {
			r === O && (l.value = !1);
		}
	}
	async function ee() {
		if (!d.value || !f.value || l.value) return;
		let r = ++O;
		l.value = !0;
		try {
			let e = await t.browseMedia({
				folder_id: o.value ? void 0 : i.value,
				search: o.value || void 0,
				category: s.value || void 0,
				sort: c.value === "newest" ? void 0 : c.value,
				cursor: f.value
			});
			if (r !== O) return;
			n.value = [...n.value, ...e.data], f.value = e.meta.next_cursor, d.value = !!e.meta.next_cursor;
		} catch (t) {
			if (r !== O) return;
			e.onError?.(t);
		} finally {
			r === O && (l.value = !1);
		}
	}
	async function A(e) {
		o.value = e, await k();
	}
	async function j(e) {
		s.value = e, await k();
	}
	async function M(e) {
		c.value = e, await k();
	}
	async function N(e) {
		a.value = "files", i.value = e, o.value = "", h.value = /* @__PURE__ */ new Set(), g.value = null, await k();
	}
	async function te() {
		a.value = "frequently-used", i.value = null, o.value = "", h.value = /* @__PURE__ */ new Set(), g.value = null, await F();
	}
	async function ne(r) {
		u.value = !0;
		try {
			let e = await t.uploadMedia(r, i.value);
			return n.value = [e, ...n.value], e;
		} catch (t) {
			return e.onError?.(t), null;
		} finally {
			u.value = !1;
		}
	}
	async function re(r) {
		u.value = !0, m.value = {
			current: 0,
			total: r.length
		};
		try {
			for (let a = 0; a < r.length; a++) {
				m.value = {
					current: a + 1,
					total: r.length
				};
				try {
					let e = await t.uploadMedia(r[a], i.value);
					n.value = [e, ...n.value];
				} catch (t) {
					e.onError?.(t);
				}
			}
		} finally {
			u.value = !1, m.value = null;
		}
	}
	async function ie(r) {
		if (h.value.size !== 0) try {
			let e = await t.moveMedia([...h.value], r);
			if (i.value === null) {
				let t = new Map(e.map((e) => [e.id, e]));
				n.value = n.value.map((e) => t.get(e.id) ?? e);
			} else n.value = n.value.filter((e) => !h.value.has(e.id));
			h.value = /* @__PURE__ */ new Set(), g.value = null;
		} catch (t) {
			e.onError?.(t);
		}
	}
	async function ae(r, i, a) {
		try {
			let e = await t.updateMedia(r, i, a);
			n.value = n.value.map((t) => t.id === r ? e : t), g.value?.id === r && (g.value = e);
		} catch (t) {
			e.onError?.(t);
		}
	}
	async function P() {
		if (h.value.size !== 0) try {
			await t.deleteMedia([...h.value]), n.value = n.value.filter((e) => !h.value.has(e.id)), _.value = _.value.filter((e) => !h.value.has(e.id)), h.value = /* @__PURE__ */ new Set(), g.value = null;
		} catch (t) {
			e.onError?.(t);
		}
	}
	async function F() {
		try {
			_.value = await t.getFrequentlyUsed();
		} catch (t) {
			e.onError?.(t);
		}
	}
	async function oe() {
		if (h.value.size === 0) return !1;
		b.value = [...h.value];
		try {
			let e = await t.checkMediaUsage(b.value);
			v.value = e.data;
			let n = Object.values(e.data).some((e) => e.template_count > 0);
			return y.value = !0, n;
		} catch (t) {
			return e.onError?.(t), !1;
		}
	}
	async function I() {
		if (y.value = !1, b.value.length !== 0) try {
			await t.deleteMedia(b.value), n.value = n.value.filter((e) => !b.value.includes(e.id)), _.value = _.value.filter((e) => !b.value.includes(e.id)), h.value = /* @__PURE__ */ new Set(), g.value = null, b.value = [], v.value = {};
		} catch (t) {
			e.onError?.(t);
		}
	}
	function se() {
		y.value = !1, b.value = [], v.value = {};
	}
	async function ce(r) {
		x.value = !0, S.value = null;
		try {
			let e = await t.importFromUrl(r, i.value);
			return n.value = [e, ...n.value], e;
		} catch (t) {
			return S.value = t instanceof Error ? t.message : "Import failed", e.onError?.(t), null;
		} finally {
			x.value = !1;
		}
	}
	function le(e) {
		let t = new Set(h.value);
		t.has(e) ? t.delete(e) : t.add(e), h.value = t;
	}
	function ue() {
		h.value = /* @__PURE__ */ new Set(), g.value = null;
	}
	function de(e) {
		g.value = e, h.value = /* @__PURE__ */ new Set([e.id]);
	}
	async function fe() {
		try {
			r.value = await t.getMediaFolders();
		} catch (t) {
			e.onError?.(t);
		}
	}
	async function pe(n, r) {
		try {
			let e = await t.createMediaFolder(n, r);
			return await fe(), e;
		} catch (t) {
			return e.onError?.(t), null;
		}
	}
	function me(e, t) {
		for (let n of e) {
			if (n.id === t) return n;
			if (n.children) {
				let e = me(n.children, t);
				if (e) return e;
			}
		}
		return null;
	}
	async function he(n, r) {
		try {
			await t.renameMediaFolder(n, r), await fe();
		} catch (t) {
			e.onError?.(t);
		}
	}
	async function ge(n) {
		try {
			let e = me(r.value, n)?.parent_id ?? null;
			await t.deleteMediaFolder(n), i.value === n && (i.value = e), await fe(), await k();
		} catch (t) {
			e.onError?.(t);
		}
	}
	async function _e(n) {
		E.value = n, w.value = null;
		try {
			let e = await t.checkMediaUsage([n.id]);
			D.value = e.data[n.id] ?? null, T.value = !0;
		} catch (t) {
			e.onError?.(t);
		}
	}
	function ve() {
		T.value = !1, E.value = null, D.value = null, w.value = null;
	}
	async function ye(r) {
		if (!E.value) return null;
		C.value = !0, w.value = null;
		try {
			let e = await t.replaceMedia(E.value.id, r);
			return n.value = n.value.map((t) => t.id === e.id ? e : t), _.value = _.value.map((t) => t.id === e.id ? e : t), g.value?.id === e.id && (g.value = e), T.value = !1, E.value = null, D.value = null, e;
		} catch (t) {
			return w.value = t instanceof Error ? t.message : "Replace failed", e.onError?.(t), null;
		} finally {
			C.value = !1;
		}
	}
	async function be(r, i) {
		try {
			let e = await t.replaceMedia(r, i);
			return n.value = n.value.map((t) => t.id === e.id ? e : t), _.value = _.value.map((t) => t.id === e.id ? e : t), g.value?.id === e.id && (g.value = e), e;
		} catch (t) {
			return e.onError?.(t), null;
		}
	}
	return {
		items: n,
		folders: r,
		currentFolderId: i,
		viewMode: a,
		searchQuery: o,
		categoryFilter: s,
		sortOption: c,
		isLoading: l,
		isUploading: u,
		uploadProgress: m,
		hasMore: d,
		selectedItems: h,
		previewItem: g,
		frequentlyUsedItems: _,
		deleteUsageInfo: v,
		showDeleteWarning: y,
		loadItems: k,
		loadMore: ee,
		search: A,
		filterByCategory: j,
		sortBy: M,
		navigateToFolder: N,
		showFrequentlyUsed: te,
		uploadFile: ne,
		uploadFiles: re,
		moveSelected: ie,
		updateFile: ae,
		deleteSelected: P,
		isImportingFromUrl: x,
		importFromUrlError: S,
		importFromUrl: ce,
		toggleSelection: le,
		clearSelection: ue,
		selectItem: de,
		loadFolders: fe,
		createFolder: pe,
		renameFolder: he,
		deleteFolder: ge,
		findFolderInTree: me,
		loadFrequentlyUsed: F,
		checkUsageBeforeDelete: oe,
		confirmDelete: I,
		cancelDelete: se,
		isReplacing: C,
		replaceError: w,
		showReplaceWarning: T,
		pendingReplaceItem: E,
		replaceUsageInfo: D,
		checkUsageBeforeReplace: _e,
		cancelReplace: ve,
		replaceFile: ye,
		replaceMediaDirectly: be
	};
}
//#endregion
//#region ../media-library/src/composables/useI18n.ts
function z(e) {
	let t = e ?? d("translations"), n = o(t) ? t.value : t;
	function r(e, t) {
		return e.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : `{${n}}`);
	}
	return {
		t: n,
		format: r
	};
}
//#endregion
//#region ../media-library/src/components/media/MediaBreadcrumb.vue?vue&type=script&setup=true&lang.ts
var ke = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:gap-1 tpl:text-xs",
	style: { color: "var(--tpl-text-muted)" }
}, Ae = ["onClick"], je = {
	key: 1,
	style: { color: "var(--tpl-text)" }
}, Me = /* @__PURE__ */ M({
	__name: "MediaBreadcrumb",
	props: {
		folders: {},
		currentFolderId: {}
	},
	emits: ["navigate"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = z(), a = _(() => {
			if (!n.currentFolderId) return [];
			let e = [];
			return o(n.folders, n.currentFolderId, e), e;
		});
		function o(e, t, n) {
			for (let r of e) {
				if (r.id === t) return n.push(r), !0;
				if (r.children && o(r.children, t, n)) return n.unshift(r), !0;
			}
			return !1;
		}
		return (e, t) => a.value.length > 0 ? (c(), v("div", ke, [E("button", {
			class: "tpl:transition-colors tpl:duration-150 tpl:hover:underline",
			style: { color: "var(--tpl-primary)" },
			onClick: t[0] ||= (e) => r("navigate", null)
		}, h(b(i).mediaLibrary.allFiles), 1), (c(!0), v(A, null, u(a.value, (e, t) => (c(), v(A, { key: e.id }, [N(b(de), {
			size: 12,
			"stroke-width": 2
		}), t < a.value.length - 1 ? (c(), v("button", {
			key: 0,
			class: "tpl:transition-colors tpl:duration-150 tpl:hover:underline",
			style: { color: "var(--tpl-primary)" },
			onClick: (t) => r("navigate", e.id)
		}, h(e.name), 9, Ae)) : (c(), v("span", je, h(e.name), 1))], 64))), 128))])) : y("", !0);
	}
});
//#endregion
//#region ../media-library/src/composables/useMediaCategories.ts
function Ne() {
	let e = d("planConfig"), t = _(() => e.config.value?.media ?? null), n = _(() => t.value?.use_media_library ?? !0), r = _(() => t.value?.categories ?? null), i = _(() => r.value ? Object.values(r.value).flatMap((e) => e.mime_types) : []), a = _(() => i.value.join(",")), o = _(() => t.value?.max_file_size ?? 0);
	function s(e, t) {
		return r.value ? !t || t.length === 0 ? i.value.includes(e) : t.some((t) => r.value[t]?.mime_types.includes(e)) : !1;
	}
	function c(e) {
		return r.value ? r.value.images?.mime_types.includes(e) ?? !1 : !1;
	}
	function l(e) {
		if (!r.value) return null;
		for (let [t, n] of Object.entries(r.value)) if (n.mime_types.includes(e)) return t;
		return null;
	}
	return {
		isMediaLibraryEnabled: n,
		allAcceptedMimeTypes: i,
		allAcceptedInputString: a,
		maxFileSize: o,
		availableCategories: _(() => r.value ? Object.keys(r.value) : []),
		isAcceptedMimeType: s,
		isImageMimeType: c,
		getCategoryForMimeType: l
	};
}
//#endregion
//#region ../media-library/src/composables/useImageCrop.ts
var Pe = {
	free: void 0,
	square: 1,
	landscape43: 4 / 3,
	landscape169: 16 / 9,
	original: void 0
};
function Fe(e) {
	return e === "image/png" || e === "image/gif" ? {
		mimeType: "image/png",
		quality: 1
	} : e === "image/webp" ? {
		mimeType: "image/webp",
		quality: .92
	} : {
		mimeType: "image/jpeg",
		quality: .92
	};
}
function Ie(e, t, n) {
	let r = e.width, i = e.height;
	if (!t && !n) return e;
	let a = r, o = i;
	if (t && r > t && (a = t, o = Math.round(t / r * i)), n && o > n) {
		let e = n / o;
		a = Math.round(a * e), o = n;
	}
	if (a === r && o === i) return e;
	let s = document.createElement("canvas");
	s.width = a, s.height = o;
	let c = s.getContext("2d");
	return c && (c.imageSmoothingEnabled = !0, c.imageSmoothingQuality = "high", c.drawImage(e, 0, 0, a, o)), s;
}
function Le(e, t, n) {
	return new Promise((r, i) => {
		e.toBlob((e) => {
			if (!e) {
				i(/* @__PURE__ */ Error("Failed to create blob from canvas"));
				return;
			}
			let a = n.mimeType.split("/")[1], o = `${t.replace(/\.[^.]+$/, "")}.${a}`;
			r(new File([e], o, { type: n.mimeType }));
		}, n.mimeType, n.quality);
	});
}
function Re(e, t, n, r) {
	let i = e, a = t;
	if (n && i > n) {
		let e = n / i;
		i = n, a = Math.round(a * e);
	}
	if (r && a > r) {
		let e = r / a;
		a = r, i = Math.round(i * e);
	}
	return {
		width: i,
		height: a
	};
}
//#endregion
//#region ../media-library/src/keys.ts
var ze = Symbol("templaticalMediaPopoverTarget");
//#endregion
//#region ../../node_modules/.pnpm/vue-advanced-cropper@2.8.9_vue@3.5.41_typescript@6.0.3_/node_modules/vue-advanced-cropper/dist/index.esm-bundler.js
function Be(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), n.push.apply(n, r);
	}
	return n;
}
function B(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Be(Object(n), !0).forEach((function(t) {
			V(e, t, n[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Be(Object(n)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		}));
	}
	return e;
}
function V(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ve(e, t) {
	if (e == null) return {};
	var n, r, i = function(e, t) {
		if (e == null) return {};
		var n, r, i = {}, a = Object.keys(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
		return i;
	}(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function He(e) {
	return function(e) {
		if (Array.isArray(e)) return Ue(e);
	}(e) || function(e) {
		if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
	}(e) || function(e, t) {
		if (e) {
			if (typeof e == "string") return Ue(e, t);
			var n = Object.prototype.toString.call(e).slice(8, -1);
			if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
			if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ue(e, t);
		}
	}(e) || function() {
		throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}();
}
function Ue(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
var We, Ge, Ke, H = (We = function(e) {
	(function() {
		var t = {}.hasOwnProperty;
		function n() {
			for (var e = [], r = 0; r < arguments.length; r++) {
				var i = arguments[r];
				if (i) {
					var a = typeof i;
					if (a === "string" || a === "number") e.push(i);
					else if (Array.isArray(i)) {
						if (i.length) {
							var o = n.apply(null, i);
							o && e.push(o);
						}
					} else if (a === "object") if (i.toString === Object.prototype.toString) for (var s in i) t.call(i, s) && i[s] && e.push(s);
					else e.push(i.toString());
				}
			}
			return e.join(" ");
		}
		e.exports ? (n.default = n, e.exports = n) : window.classNames = n;
	})();
}, We(Ke = {
	path: Ge,
	exports: {},
	require: function(e, t) {
		return function() {
			throw Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
		}(t == null && Ke.path);
	}
}, Ke.exports), Ke.exports), U = function(e) {
	return function(t, n) {
		if (!t) return e;
		var r;
		typeof t == "string" ? r = t : n = t;
		var i = e;
		return r && (i += "__" + r), i + (n ? Object.keys(n).reduce((function(e, t) {
			var r = n[t];
			return r && (e += " " + (typeof r == "boolean" ? i + "--" + t : i + "--" + t + "_" + r)), e;
		}), "") : "");
	};
};
function qe(e, t, n) {
	var r, i, a, o, s;
	function c() {
		var l = Date.now() - o;
		l < t && l >= 0 ? r = setTimeout(c, t - l) : (r = null, n || (s = e.apply(a, i), a = i = null));
	}
	t ??= 100;
	var l = function() {
		a = this, i = arguments, o = Date.now();
		var l = n && !r;
		return r ||= setTimeout(c, t), l && (s = e.apply(a, i), a = i = null), s;
	};
	return l.clear = function() {
		r &&= (clearTimeout(r), null);
	}, l.flush = function() {
		r &&= (s = e.apply(a, i), a = i = null, clearTimeout(r), null);
	}, l;
}
qe.debounce = qe;
var Je = qe, W = function() {
	return W = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, W.apply(this, arguments);
};
function Ye(e, t) {
	var n, r;
	return e && t ? (n = "" + e + t[0].toUpperCase() + t.slice(1), r = e + "-" + t) : (n = e || t, r = e || t), {
		name: n,
		classname: r
	};
}
function Xe(e) {
	return /^blob:/.test(e);
}
function Ze(e) {
	return Xe(e) || function(e) {
		return /^data:/.test(e);
	}(e);
}
function Qe(e) {
	return !!(e && e.constructor && e.call && e.apply);
}
function G(e) {
	return e === void 0;
}
function $e(e) {
	return typeof e == "object" && !!e;
}
function et(e, t, n) {
	var r = {};
	return $e(e) ? (Object.keys(t).forEach((function(i) {
		r[i] = G(e[i]) ? t[i] : $e(t[i]) ? $e(e[i]) ? et(e[i], t[i], n[i]) : e[i] ? t[i] : n[i] : !0 === t[i] || !1 === t[i] ? !!e[i] : e[i];
	})), r) : e ? t : n;
}
function tt(e) {
	var t = Number(e);
	return Number.isNaN(t) ? e : t;
}
function nt(e) {
	return typeof (e == "number" || function(e) {
		return typeof e == "object" && !!e;
	}(e) && toString.call(e) == "[object Number]") && !rt(e);
}
function rt(e) {
	return e != e;
}
function it(e, t) {
	return Math.sqrt((e.x - t.x) ** 2 + (e.y - t.y) ** 2);
}
var at = function(e, t) {
	e === void 0 && (e = {}), t === void 0 && (t = {}), this.type = "manipulateImage", this.move = e, this.scale = t;
}, ot = function(e, t) {
	t === void 0 && (t = {}), this.type = "resize", this.directions = e, this.params = t;
}, st = function(e) {
	this.type = "move", this.directions = e;
}, ct = function() {
	function e(e, t, n, r, i) {
		this.type = "drag", this.nativeEvent = e, this.position = n, this.previousPosition = r, this.element = t, this.anchor = i;
	}
	return e.prototype.shift = function() {
		var e = this, t = e.element, n = e.anchor, r = e.position;
		if (t) {
			var i = t.getBoundingClientRect(), a = i.left, o = i.top;
			return {
				left: r.left - a - n.left,
				top: r.top - o - n.top
			};
		}
		return {
			left: 0,
			top: 0
		};
	}, e;
}(), lt = {
	name: "DraggableElement",
	props: { classname: { type: String } },
	beforeMount: function() {
		window.addEventListener("mouseup", this.onMouseUp, { passive: !1 }), window.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), window.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), window.addEventListener("touchend", this.onTouchEnd, { passive: !1 });
	},
	beforeUnmount: function() {
		window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
	},
	mounted: function() {
		if (!this.$refs.draggable) throw Error("You should add ref \"draggable\" to your root element to use draggable mixin");
		this.touches = [], this.hovered = !1;
	},
	methods: {
		onMouseOver: function() {
			this.hovered || (this.hovered = !0, this.$emit("enter"));
		},
		onMouseLeave: function() {
			this.hovered && !this.touches.length && (this.hovered = !1, this.$emit("leave"));
		},
		onTouchStart: function(e) {
			e.cancelable && !this.disabled && e.touches.length === 1 && (this.touches = He(e.touches), this.hovered ||= (this.$emit("enter"), !0), e.touches.length && this.initAnchor(this.touches.reduce((function(t, n) {
				return {
					clientX: t.clientX + n.clientX / e.touches.length,
					clientY: t.clientY + n.clientY / e.touches.length
				};
			}), {
				clientX: 0,
				clientY: 0
			})), e.preventDefault && e.preventDefault(), e.stopPropagation());
		},
		onTouchEnd: function() {
			this.processEnd();
		},
		onTouchMove: function(e) {
			this.touches.length && (this.processMove(e, e.touches), e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation());
		},
		onMouseDown: function(e) {
			if (!this.disabled) {
				var t = {
					fake: !0,
					clientX: e.clientX,
					clientY: e.clientY
				};
				this.touches = [t], this.initAnchor(t), e.stopPropagation();
			}
		},
		onMouseMove: function(e) {
			this.touches.length && (this.processMove(e, [{
				fake: !0,
				clientX: e.clientX,
				clientY: e.clientY
			}]), e.preventDefault && e.preventDefault());
		},
		onMouseUp: function() {
			this.processEnd();
		},
		initAnchor: function(e) {
			var t = this.$refs.draggable.getBoundingClientRect(), n = t.left, r = t.right, i = t.bottom, a = t.top;
			this.anchor = {
				left: e.clientX - n,
				top: e.clientY - a,
				bottom: i - e.clientY,
				right: r - e.clientX
			};
		},
		processMove: function(e, t) {
			var n = He(t);
			if (this.touches.length) {
				if (this.touches.length === 1 && n.length === 1) {
					var r = this.$refs.draggable;
					this.$emit("drag", new ct(e, r, {
						left: n[0].clientX,
						top: n[0].clientY
					}, {
						left: this.touches[0].clientX,
						top: this.touches[0].clientY
					}, this.anchor));
				}
				this.touches = n;
			}
		},
		processEnd: function() {
			this.touches.length && this.$emit("drag-end"), this.hovered &&= (this.$emit("leave"), !1), this.touches = [];
		}
	},
	emits: [
		"drag",
		"drag-end",
		"leave",
		"enter"
	]
};
lt.render = function(e, t, n, i, a, o) {
	return c(), S("div", {
		ref: "draggable",
		class: n.classname,
		onTouchstart: t[1] ||= function() {
			return o.onTouchStart && o.onTouchStart.apply(o, arguments);
		},
		onMousedown: t[2] ||= function() {
			return o.onMouseDown && o.onMouseDown.apply(o, arguments);
		},
		onMouseover: t[3] ||= function() {
			return o.onMouseOver && o.onMouseOver.apply(o, arguments);
		},
		onMouseleave: t[4] ||= function() {
			return o.onMouseLeave && o.onMouseLeave.apply(o, arguments);
		}
	}, [r(e.$slots, "default")], 34);
};
var ut = U("vue-handler-wrapper"), dt = {
	name: "HandlerWrapper",
	components: { DraggableElement: lt },
	props: {
		horizontalPosition: { type: String },
		verticalPosition: { type: String },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	computed: { classes: function() {
		var e;
		if (this.horizontalPosition || this.verticalPosition) {
			var t, n = Ye(this.horizontalPosition, this.verticalPosition);
			e = ut((V(t = {}, n.classname, !0), V(t, "disabled", this.disabled), t));
		} else e = ut({ disabled: this.disabled });
		return {
			root: e,
			draggable: ut("draggable")
		};
	} },
	emits: [
		"leave",
		"enter",
		"drag",
		"drag-end"
	]
};
dt.render = function(e, t, n, i, o, s) {
	var l = a("DraggableElement");
	return c(), S("div", { class: s.classes.root }, [N(l, {
		class: s.classes.draggable,
		onDrag: t[1] ||= function(t) {
			return e.$emit("drag", t);
		},
		onDragEnd: t[2] ||= function(t) {
			return e.$emit("drag-end");
		},
		onLeave: t[3] ||= function(t) {
			return e.$emit("leave");
		},
		onEnter: t[4] ||= function(t) {
			return e.$emit("enter");
		}
	}, {
		default: f((function() {
			return [r(e.$slots, "default")];
		})),
		_: 3
	}, 8, ["class"])], 2);
};
var ft = U("vue-line-wrapper"), pt = {
	name: "LineWrapper",
	components: { DraggableElement: lt },
	props: {
		position: {
			type: String,
			required: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	computed: { classname: function() {
		var e;
		return ft((V(e = {}, this.position, !0), V(e, "disabled", this.disabled), e));
	} },
	emits: [
		"leave",
		"enter",
		"drag",
		"drag-end"
	]
};
pt.render = function(e, t, n, i, o, s) {
	var l = a("DraggableElement");
	return c(), S(l, {
		class: s.classname,
		onDrag: t[1] ||= function(t) {
			return e.$emit("drag", t);
		},
		onDragEnd: t[2] ||= function(t) {
			return e.$emit("drag-end");
		},
		onLeave: t[3] ||= function(t) {
			return e.$emit("leave");
		},
		onEnter: t[4] ||= function(t) {
			return e.$emit("enter");
		}
	}, {
		default: f((function() {
			return [r(e.$slots, "default")];
		})),
		_: 3
	}, 8, ["class"]);
};
var K = [
	"left",
	"right",
	"top",
	"bottom"
], mt = ["left", "right"], ht = ["top", "bottom"], gt = ["left", "top"], _t = [
	"fill-area",
	"fit-area",
	"stencil",
	"none"
], vt = {
	left: 0,
	top: 0,
	width: 0,
	height: 0
};
function yt(e, t, n) {
	return !(n ||= [
		"width",
		"height",
		"left",
		"top"
	]).some((function(n) {
		return e[n] !== t[n];
	}));
}
function q(e) {
	return {
		left: e.left,
		top: e.top,
		right: e.left + e.width,
		bottom: e.top + e.height
	};
}
function bt(e, t) {
	return {
		left: e.left - t.left,
		top: e.top - t.top
	};
}
function J(e) {
	return {
		left: e.left + e.width / 2,
		top: e.top + e.height / 2
	};
}
function xt(e, t) {
	var n = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	};
	return K.forEach((function(r) {
		var i = t[r], a = q(e)[r];
		n[r] = i !== void 0 && a !== void 0 ? r === "left" || r === "top" ? Math.max(0, i - a) : Math.max(0, a - i) : 0;
	})), n;
}
function Y(e, t) {
	return {
		left: e.left - t.left,
		top: e.top - t.top,
		width: e.width + t.left + t.right,
		height: e.height + t.top + t.bottom
	};
}
function St(e) {
	return {
		left: -e.left,
		top: -e.top
	};
}
function X(e, t) {
	return W(W({}, e), {
		left: e.left + t.left,
		top: e.top + t.top
	});
}
function Z(e, t, n, r) {
	if (t !== 1) {
		if (n) {
			var i = J(e);
			return {
				width: e.width * t,
				height: e.height * t,
				left: e.left + e.width * (1 - t) / 2 + (n.left - i.left) * (r || 1 - t),
				top: e.top + e.height * (1 - t) / 2 + (n.top - i.top) * (r || 1 - t)
			};
		}
		return {
			width: e.width * t,
			height: e.height * t,
			left: e.left + e.width * (1 - t) / 2,
			top: e.top + e.height * (1 - t) / 2
		};
	}
	return e;
}
function Q(e) {
	return e.width / e.height;
}
function Ct(e, t) {
	return Math.min(t.right !== void 0 && t.left !== void 0 ? (t.right - t.left) / e.width : Infinity, t.bottom !== void 0 && t.top !== void 0 ? (t.bottom - t.top) / e.height : Infinity);
}
function wt(e, t) {
	var n = {
		left: 0,
		top: 0
	}, r = xt(e, t);
	return r.left && r.left > 0 ? n.left = r.left : r.right && r.right > 0 && (n.left = -r.right), r.top && r.top > 0 ? n.top = r.top : r.bottom && r.bottom > 0 && (n.top = -r.bottom), n;
}
function Tt(e, t) {
	var n;
	return t.minimum && e < t.minimum ? n = t.minimum : t.maximum && e > t.maximum && (n = t.maximum), n;
}
function Et(e, t) {
	var n = Q(e), r = Q(t);
	return t.width < Infinity && t.height < Infinity ? n > r ? {
		width: t.width,
		height: t.width / n
	} : {
		width: t.height * n,
		height: t.height
	} : t.width < Infinity ? {
		width: t.width,
		height: t.width / n
	} : t.height < Infinity ? {
		width: t.height * n,
		height: t.height
	} : e;
}
function Dt(e, t) {
	var n = t * Math.PI / 180;
	return {
		width: Math.abs(e.width * Math.cos(n)) + Math.abs(e.height * Math.sin(n)),
		height: Math.abs(e.width * Math.sin(n)) + Math.abs(e.height * Math.cos(n))
	};
}
function Ot(e, t) {
	var n = t * Math.PI / 180;
	return {
		left: e.left * Math.cos(n) - e.top * Math.sin(n),
		top: e.left * Math.sin(n) + e.top * Math.cos(n)
	};
}
function kt(e, t) {
	var n = xt($(e, t), t);
	return n.left + n.right + n.top + n.bottom ? n.left + n.right > n.top + n.bottom ? Math.min((e.width + n.left + n.right) / e.width, Ct(e, t)) : Math.min((e.height + n.top + n.bottom) / e.height, Ct(e, t)) : 1;
}
function $(e, t, n) {
	n === void 0 && (n = !1);
	var r = wt(e, t);
	return X(e, n ? St(r) : r);
}
function At(e) {
	return {
		width: e.right !== void 0 && e.left !== void 0 ? e.right - e.left : Infinity,
		height: e.bottom !== void 0 && e.top !== void 0 ? e.bottom - e.top : Infinity
	};
}
function jt(e, t) {
	return W(W({}, e), {
		minWidth: Math.min(t.width, e.minWidth),
		minHeight: Math.min(t.height, e.minHeight),
		maxWidth: Math.min(t.width, e.maxWidth),
		maxHeight: Math.min(t.height, e.maxHeight)
	});
}
function Mt(e, t, n) {
	n === void 0 && (n = !0);
	var r = {};
	return K.forEach((function(i) {
		var a = e[i], o = t[i];
		a !== void 0 && o !== void 0 ? r[i] = i === "left" || i === "top" ? n ? Math.max(a, o) : Math.min(a, o) : n ? Math.min(a, o) : Math.max(a, o) : o === void 0 ? a !== void 0 && (r[i] = a) : r[i] = o;
	})), r;
}
function Nt(e, t) {
	return Mt(e, t, !0);
}
function Pt(e) {
	var t = e.size, n = e.aspectRatio, r = e.ignoreMinimum, i = e.sizeRestrictions;
	return !!((t.correctRatio || Q(t) >= n.minimum && Q(t) <= n.maximum) && t.height <= i.maxHeight && t.width <= i.maxWidth && t.width && t.height && (r || t.height >= i.minHeight && t.width >= i.minWidth));
}
function Ft(e, t) {
	return (e.width - t.width) ** 2 + (e.height - t.height) ** 2;
}
function It(e) {
	var t = e.width, n = e.height, r = e.sizeRestrictions, i = {
		minimum: e.aspectRatio && e.aspectRatio.minimum || 0,
		maximum: e.aspectRatio && e.aspectRatio.maximum || Infinity
	}, a = {
		width: Math.max(r.minWidth, Math.min(r.maxWidth, t)),
		height: Math.max(r.minHeight, Math.min(r.maxHeight, n))
	};
	function o(e, a) {
		return a === void 0 && (a = !1), e.reduce((function(e, o) {
			return Pt({
				size: o,
				aspectRatio: i,
				sizeRestrictions: r,
				ignoreMinimum: a
			}) && (!e || Ft(o, {
				width: t,
				height: n
			}) < Ft(e, {
				width: t,
				height: n
			})) ? o : e;
		}), null);
	}
	var s = [];
	i && [i.minimum, i.maximum].forEach((function(e) {
		e && s.push({
			width: a.width,
			height: a.width / e,
			correctRatio: !0
		}, {
			width: a.height * e,
			height: a.height,
			correctRatio: !0
		});
	})), Pt({
		size: a,
		aspectRatio: i,
		sizeRestrictions: r
	}) && s.push(a);
	var c = o(s) || o(s, !0);
	return c && {
		width: c.width,
		height: c.height
	};
}
function Lt(e) {
	var t = e.event, n = e.coordinates, r = e.positionRestrictions, i = r === void 0 ? {} : r, a = X(n, t.directions);
	return X(a, wt(a, i));
}
function Rt(e) {
	var t = e.coordinates, n = e.transform, r = e.imageSize, i = e.sizeRestrictions, a = e.positionRestrictions, o = e.aspectRatio, s = e.visibleArea, c = function(e, t) {
		return Lt({
			coordinates: e,
			positionRestrictions: a,
			event: new st({
				left: t.left - e.left,
				top: t.top - e.top
			})
		});
	}, l = W({}, t);
	return (Array.isArray(n) ? n : [n]).forEach((function(e) {
		var t = {};
		G((t = typeof e == "function" ? e({
			coordinates: l,
			imageSize: r,
			visibleArea: s
		}) : e).width) && G(t.height) || (l = function(e, t) {
			return c(W(W(W({}, e), It({
				width: t.width,
				height: t.height,
				sizeRestrictions: i,
				aspectRatio: o
			})), {
				left: 0,
				top: 0
			}), {
				left: e.left,
				top: e.top
			});
		}(l, W(W({}, l), t))), G(t.left) && G(t.top) || (l = c(l, W(W({}, l), t)));
	})), l;
}
function zt(e) {
	var t = e.getAreaRestrictions, n = e.boundaries, r = e.coordinates, i = e.visibleArea, a = e.stencilSize, o = e.sizeRestrictions, s = e.positionRestrictions, c, l, u, d = W({}, r), f = W({}, i), p = W({}, a);
	c = Q(p), l = Q(d), u === void 0 && (u = .001), (c === 0 || l === 0 ? Math.abs(l - c) < u : Math.abs(l / c) < 1 + u && Math.abs(l / c) > 1 - u) || (d = W(W({}, d), It({
		sizeRestrictions: o,
		width: d.width,
		height: d.height,
		aspectRatio: {
			minimum: Q(p),
			maximum: Q(p)
		}
	})));
	var m = kt(f = Z(f, d.width * n.width / (f.width * p.width)), t({
		visibleArea: f,
		type: "resize"
	}));
	return m !== 1 && (f = Z(f, m), d = Z(d, m)), f = $(f = X(f, bt(J(d), J(f))), t({
		visibleArea: f,
		type: "move"
	})), {
		coordinates: d = $(d, Nt(q(f), s)),
		visibleArea: f
	};
}
function Bt(e) {
	var t = e.event, n = e.getAreaRestrictions, r = e.boundaries, i = e.coordinates, a = e.visibleArea, o = e.positionRestrictions, s = W({}, i), c = W({}, a);
	if (i && a && t.type !== "manipulateImage") {
		var l = {
			width: 0,
			height: 0
		};
		Q(r) > Q(s) ? (l.height = .8 * r.height, l.width = l.height * Q(s)) : (l.width = .8 * r.width, l.height = l.width * Q(s));
		var u = kt(c = Z(c, s.width * r.width / (c.width * l.width)), n({
			visibleArea: c,
			type: "resize"
		}));
		c = Z(c, u), u !== 1 && (l.height /= u, l.width /= u), c = $(c = X(c, bt(J(s), J(c))), n({
			visibleArea: c,
			type: "move"
		})), s = $(s, Nt(q(c), o));
	}
	return {
		coordinates: s,
		visibleArea: c
	};
}
function Vt(e) {
	var t = e.event, n = e.coordinates, r = e.visibleArea, i = e.getAreaRestrictions, a = W({}, r), o = W({}, n);
	if (t.type === "setCoordinates") {
		var s = Math.max(0, o.width - a.width), c = Math.max(0, o.height - a.height);
		s > c ? a = Z(a, Math.min(o.width / a.width, Ct(a, i({
			visibleArea: a,
			type: "resize"
		})))) : c > s && (a = Z(a, Math.min(o.height / a.height, Ct(a, i({
			visibleArea: a,
			type: "resize"
		}))))), a = $(a = X(a, St(wt(o, q(a)))), i({
			visibleArea: a,
			type: "move"
		}));
	}
	return {
		visibleArea: a,
		coordinates: o
	};
}
function Ht(e) {
	var t = e.imageSize, n = e.visibleArea, r = e.coordinates, i = n || t;
	return {
		left: (n ? n.left : 0) + i.width / 2 - r.width / 2,
		top: (n ? n.top : 0) + i.height / 2 - r.height / 2
	};
}
function Ut(e) {
	var t = e.imageSize, n = e.visibleArea, r = e.aspectRatio, i = e.sizeRestrictions, a = n || t, o = Math.min(r.maximum || Infinity, Math.max(r.minimum || 0, Q(a))), s = a.width < a.height ? {
		width: .8 * a.width,
		height: .8 * a.width / o
	} : {
		height: .8 * a.height,
		width: .8 * a.height * o
	};
	return It(W(W({}, s), {
		aspectRatio: r,
		sizeRestrictions: i
	}));
}
function Wt(e) {
	var t, n, r = e.imageSize, i = e.visibleArea, a = e.boundaries, o = e.aspectRatio, s = e.sizeRestrictions, c = e.stencilSize, l = i || r;
	return Q(l) > Q(a) ? n = (t = c.height * l.height / a.height) * Q(c) : t = (n = c.width * l.width / a.width) / Q(c), It({
		width: n,
		height: t,
		aspectRatio: o,
		sizeRestrictions: s
	});
}
function Gt(e) {
	var t = e.getAreaRestrictions, n = e.coordinates, r = e.imageSize, i = Q(e.boundaries);
	if (n) {
		var a = {
			height: Math.max(n.height, r.height),
			width: Math.max(n.width, r.width)
		}, o = Et({
			width: Q(a) > i ? a.width : a.height * i,
			height: Q(a) > i ? a.width / i : a.height
		}, At(t())), s = {
			left: n.left + n.width / 2 - o.width / 2,
			top: n.top + n.height / 2 - o.height / 2,
			width: o.width,
			height: o.height
		}, c = xt(n, q(W({
			left: 0,
			top: 0
		}, r))), l = {};
		return !c.left && !c.right && s.width <= r.width && (l.left = 0, l.right = r.width), !c.top && !c.bottom && s.height <= r.height && (l.top = 0, l.bottom = r.height), $(s, l);
	}
	var u = Q(r);
	return o = {
		height: u > i ? r.height : r.width / i,
		width: u > i ? r.height * i : r.width
	}, {
		left: r.width / 2 - o.width / 2,
		top: r.height / 2 - o.height / 2,
		width: o.width,
		height: o.height
	};
}
function Kt(e, t) {
	return Mt(e, q(t));
}
function qt(e) {
	var t = e.event, n = e.coordinates, r = e.visibleArea, i = e.sizeRestrictions, a = e.getAreaRestrictions, o = e.positionRestrictions, s = e.adjustStencil, c = t.scale, l = t.move, u = W({}, r), d = W({}, n), f = 1, p = 1, m = c.factor && Math.abs(c.factor - 1) > .001;
	u = X(u, {
		left: l.left || 0,
		top: l.top || 0
	});
	var h = {
		stencil: {
			minimum: Math.max(i.minWidth ? i.minWidth / d.width : 0, i.minHeight ? i.minHeight / d.height : 0),
			maximum: Math.min(i.maxWidth ? i.maxWidth / d.width : Infinity, i.maxHeight ? i.maxHeight / d.height : Infinity, Ct(d, o))
		},
		area: { maximum: Ct(u, a({
			visibleArea: u,
			type: "resize"
		})) }
	};
	c.factor && m && (c.factor < 1 ? (p = Math.max(c.factor, h.stencil.minimum)) > 1 && (p = 1) : c.factor > 1 && (p = Math.min(c.factor, Math.min(h.area.maximum, h.stencil.maximum))) < 1 && (p = 1)), p && (u = Z(u, p, c.center));
	var g = n.left - r.left, _ = r.width + r.left - (n.width + n.left), v = n.top - r.top, y = r.height + r.top - (n.height + n.top);
	return u = $(u = X(u, wt(u, {
		left: o.left === void 0 ? void 0 : o.left - g * p,
		top: o.top === void 0 ? void 0 : o.top - v * p,
		bottom: o.bottom === void 0 ? void 0 : o.bottom + y * p,
		right: o.right === void 0 ? void 0 : o.right + _ * p
	})), a({
		visibleArea: u,
		type: "move"
	})), d.width *= p, d.height *= p, d.left = u.left + g * p, d.top = u.top + v * p, d = $(d, Nt(q(u), o)), c.factor && m && s && (c.factor > 1 ? f = Math.min(h.area.maximum, c.factor) / p : c.factor < 1 && (f = Math.max(d.height / u.height, d.width / u.width, c.factor / p)), f !== 1 && (u = X(u = $(u = Z(u, f, c.factor > 1 ? c.center : J(d)), a({
		visibleArea: u,
		type: "move"
	})), St(wt(d, q(u)))))), {
		coordinates: d,
		visibleArea: u
	};
}
function Jt(e) {
	var t = e.aspectRatio, n = e.getAreaRestrictions, r = e.coordinates, i = e.visibleArea, a = e.sizeRestrictions, o = e.positionRestrictions, s = e.imageSize, c = e.previousImageSize, l = e.angle, u = W({}, r), d = W({}, i), f = Ot(J(W({
		left: 0,
		top: 0
	}, c)), l);
	return (u = W(W({}, It({
		sizeRestrictions: a,
		aspectRatio: t,
		width: u.width,
		height: u.height
	})), Ot(J(u), l))).left -= f.left - s.width / 2 + u.width / 2, u.top -= f.top - s.height / 2 + u.height / 2, d = Z(d, kt(d, n({
		visibleArea: d,
		type: "resize"
	}))), {
		coordinates: u = $(u, o),
		visibleArea: d = $(d = X(d, bt(J(u), J(r))), n({
			visibleArea: d,
			type: "move"
		}))
	};
}
function Yt(e) {
	var t = e.flip, n = e.previousFlip, r = e.rotate, i = e.getAreaRestrictions, a = e.coordinates, o = e.visibleArea, s = e.imageSize, c = W({}, a), l = W({}, o), u = n.horizontal !== t.horizontal, d = n.vertical !== t.vertical;
	if (u || d) {
		var f = Ot({
			left: s.width / 2,
			top: s.height / 2
		}, -r), p = Ot(J(c), -r), m = Ot({
			left: u ? f.left - (p.left - f.left) : p.left,
			top: d ? f.top - (p.top - f.top) : p.top
		}, r);
		c = X(c, bt(m, J(c))), p = Ot(J(l), -r), l = $(l = X(l, bt(m = Ot({
			left: u ? f.left - (p.left - f.left) : p.left,
			top: d ? f.top - (p.top - f.top) : p.top
		}, r), J(l))), i({
			visibleArea: l,
			type: "move"
		}));
	}
	return {
		coordinates: c,
		visibleArea: l
	};
}
function Xt(e) {
	var t = e.directions, n = e.coordinates, r = e.positionRestrictions, i = r === void 0 ? {} : r, a = e.sizeRestrictions, o = e.preserveRatio, s = e.compensate, c = W({}, t), l = Y(n, c).width, u = Y(n, c).height;
	l < 0 && (c.left < 0 && c.right < 0 ? (c.left = -(n.width - a.minWidth) / (c.left / c.right), c.right = -(n.width - a.minWidth) / (c.right / c.left)) : c.left < 0 ? c.left = -(n.width - a.minWidth) : c.right < 0 && (c.right = -(n.width - a.minWidth))), u < 0 && (c.top < 0 && c.bottom < 0 ? (c.top = -(n.height - a.minHeight) / (c.top / c.bottom), c.bottom = -(n.height - a.minHeight) / (c.bottom / c.top)) : c.top < 0 ? c.top = -(n.height - a.minHeight) : c.bottom < 0 && (c.bottom = -(n.height - a.minHeight)));
	var d = xt(Y(n, c), i);
	s && (d.left && d.left > 0 && d.right === 0 ? (c.right += d.left, c.left -= d.left) : d.right && d.right > 0 && d.left === 0 && (c.left += d.right, c.right -= d.right), d.top && d.top > 0 && d.bottom === 0 ? (c.bottom += d.top, c.top -= d.top) : d.bottom && d.bottom > 0 && d.top === 0 && (c.top += d.bottom, c.bottom -= d.bottom), d = xt(Y(n, c), i));
	var f = {
		width: Infinity,
		height: Infinity,
		left: Infinity,
		right: Infinity,
		top: Infinity,
		bottom: Infinity
	};
	if (K.forEach((function(e) {
		var t = d[e];
		t && c[e] && (f[e] = Math.max(0, 1 - t / c[e]));
	})), o) {
		var p = Math.min.apply(null, K.map((function(e) {
			return f[e];
		})));
		p !== Infinity && K.forEach((function(e) {
			c[e] *= p;
		}));
	} else K.forEach((function(e) {
		f[e] !== Infinity && (c[e] *= f[e]);
	}));
	if (l = Y(n, c).width, u = Y(n, c).height, c.right + c.left && (l > a.maxWidth ? f.width = (a.maxWidth - n.width) / (c.right + c.left) : l < a.minWidth && (f.width = (a.minWidth - n.width) / (c.right + c.left))), c.bottom + c.top && (u > a.maxHeight ? f.height = (a.maxHeight - n.height) / (c.bottom + c.top) : u < a.minHeight && (f.height = (a.minHeight - n.height) / (c.bottom + c.top))), o) {
		var m = Math.min(f.width, f.height);
		m !== Infinity && K.forEach((function(e) {
			c[e] *= m;
		}));
	} else f.width !== Infinity && mt.forEach((function(e) {
		c[e] *= f.width;
	})), f.height !== Infinity && ht.forEach((function(e) {
		c[e] *= f.height;
	}));
	return c;
}
function Zt(e, t, n) {
	return t == 0 && n == 0 ? e / 2 : t == 0 ? 0 : n == 0 ? e : e * Math.abs(t / (t + n));
}
var Qt = U("vue-simple-handler"), $t = U("vue-simple-handler-wrapper"), en = {
	name: "SimpleHandler",
	components: { HandlerWrapper: dt },
	props: {
		defaultClass: { type: String },
		hoverClass: { type: String },
		wrapperClass: { type: String },
		horizontalPosition: { type: String },
		verticalPosition: { type: String },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	data: function() {
		return { hover: !1 };
	},
	computed: { classes: function() {
		var e, t = (V(e = {}, this.horizontalPosition, !!this.horizontalPosition), V(e, this.verticalPosition, !!this.verticalPosition), V(e, `${this.horizontalPosition}-${this.verticalPosition}`, !!(this.verticalPosition && this.horizontalPosition)), V(e, "hover", this.hover), e);
		return {
			default: H(Qt(t), this.defaultClass, this.hover && this.hoverClass),
			wrapper: H($t(t), this.wrapperClass)
		};
	} },
	methods: {
		onDrag: function(e) {
			this.$emit("drag", e);
		},
		onEnter: function() {
			this.hover = !0;
		},
		onLeave: function() {
			this.hover = !1;
		},
		onDragEnd: function() {
			this.$emit("drag-end");
		}
	},
	emits: ["drag", "drag-end"]
};
en.render = function(e, t, n, r, i, o) {
	var s = a("HandlerWrapper");
	return c(), S(s, {
		class: o.classes.wrapper,
		"vertical-position": n.verticalPosition,
		"horizontal-position": n.horizontalPosition,
		disabled: n.disabled,
		onDrag: o.onDrag,
		onDragEnd: o.onDragEnd,
		onEnter: o.onEnter,
		onLeave: o.onLeave
	}, {
		default: f((function() {
			return [N("div", { class: o.classes.default }, null, 2)];
		})),
		_: 1
	}, 8, [
		"class",
		"vertical-position",
		"horizontal-position",
		"disabled",
		"onDrag",
		"onDragEnd",
		"onEnter",
		"onLeave"
	]);
};
var tn = U("vue-simple-line"), nn = U("vue-simple-line-wrapper"), rn = {
	name: "SimpleLine",
	components: { LineWrapper: pt },
	props: {
		defaultClass: { type: String },
		hoverClass: { type: String },
		wrapperClass: { type: String },
		position: { type: String },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	data: function() {
		return { hover: !1 };
	},
	computed: { classes: function() {
		return {
			root: H(tn(V({}, this.position, !0)), this.defaultClass, this.hover && this.hoverClass),
			wrapper: H(nn(V({}, this.position, !0)), this.wrapperClass)
		};
	} },
	methods: {
		onDrag: function(e) {
			this.$emit("drag", e);
		},
		onEnter: function() {
			this.hover = !0;
		},
		onLeave: function() {
			this.hover = !1;
		},
		onDragEnd: function() {
			this.$emit("drag-end");
		}
	},
	emits: ["drag", "drag-end"]
};
rn.render = function(e, t, n, r, i, o) {
	var s = a("LineWrapper");
	return c(), S(s, {
		class: o.classes.wrapper,
		position: n.position,
		disabled: n.disabled,
		onDrag: o.onDrag,
		onDragEnd: o.onDragEnd,
		onEnter: o.onEnter,
		onLeave: o.onLeave
	}, {
		default: f((function() {
			return [N("div", { class: o.classes.root }, null, 2)];
		})),
		_: 1
	}, 8, [
		"class",
		"position",
		"disabled",
		"onDrag",
		"onDragEnd",
		"onEnter",
		"onLeave"
	]);
};
var an = U("vue-bounding-box"), on = [
	"east",
	"west",
	null
], sn = [
	"south",
	"north",
	null
], cn = {
	name: "BoundingBox",
	props: {
		width: { type: Number },
		height: { type: Number },
		transitions: { type: Object },
		handlers: {
			type: Object,
			default: function() {
				return {
					eastNorth: !0,
					north: !0,
					westNorth: !0,
					west: !0,
					westSouth: !0,
					south: !0,
					eastSouth: !0,
					east: !0
				};
			}
		},
		handlersComponent: {
			type: [Object, String],
			default: function() {
				return en;
			}
		},
		handlersClasses: {
			type: Object,
			default: function() {
				return {};
			}
		},
		handlersWrappersClasses: {
			type: Object,
			default: function() {
				return {};
			}
		},
		lines: {
			type: Object,
			default: function() {
				return {
					west: !0,
					north: !0,
					east: !0,
					south: !0
				};
			}
		},
		linesComponent: {
			type: [Object, String],
			default: function() {
				return rn;
			}
		},
		linesClasses: {
			type: Object,
			default: function() {
				return {};
			}
		},
		linesWrappersClasses: {
			type: Object,
			default: function() {
				return {};
			}
		},
		resizable: {
			type: Boolean,
			default: !0
		}
	},
	data: function() {
		var e = [];
		return on.forEach((function(t) {
			sn.forEach((function(n) {
				if (t !== n) {
					var r = Ye(t, n);
					e.push({
						name: r.name,
						classname: r.classname,
						verticalDirection: n,
						horizontalDirection: t
					});
				}
			}));
		})), { points: e };
	},
	computed: {
		style: function() {
			var e = {};
			return this.width && this.height && (e.width = `${this.width}px`, e.height = `${this.height}px`, this.transitions && this.transitions.enabled && (e.transition = `${this.transitions.time}ms ${this.transitions.timingFunction}`)), e;
		},
		classes: function() {
			var e = this.handlersClasses, t = this.handlersWrappersClasses, n = this.linesClasses, r = this.linesWrappersClasses;
			return {
				root: an(),
				handlers: e,
				handlersWrappers: t,
				lines: n,
				linesWrappers: r
			};
		},
		lineNodes: function() {
			var e = this, t = [];
			return this.points.forEach((function(n) {
				n.horizontalDirection && n.verticalDirection || !e.lines[n.name] || t.push({
					name: n.name,
					component: e.linesComponent,
					class: H(e.classes.lines.default, e.classes.lines[n.name], !e.resizable && e.classes.lines.disabled),
					wrapperClass: H(e.classes.linesWrappers.default, e.classes.linesWrappers[n.name], !e.resizable && e.classes.linesWrappers.disabled),
					hoverClass: e.classes.lines.hover,
					verticalDirection: n.verticalDirection,
					horizontalDirection: n.horizontalDirection,
					disabled: !e.resizable
				});
			})), t;
		},
		handlerNodes: function() {
			var e = this, t = [], n = this.width, r = this.height;
			return this.points.forEach((function(i) {
				if (e.handlers[i.name]) {
					var a = {
						name: i.name,
						component: e.handlersComponent,
						class: H(e.classes.handlers.default, e.classes.handlers[i.name]),
						wrapperClass: H(e.classes.handlersWrappers.default, e.classes.handlersWrappers[i.name]),
						hoverClass: e.classes.handlers.hover,
						verticalDirection: i.verticalDirection,
						horizontalDirection: i.horizontalDirection,
						disabled: !e.resizable
					};
					if (n && r) {
						var o = i.horizontalDirection, s = i.verticalDirection, c = o === "east" ? n : o === "west" ? 0 : n / 2, l = s === "south" ? r : s === "north" ? 0 : r / 2;
						a.wrapperClass = an("handler"), a.wrapperStyle = { transform: `translate(${c}px, ${l}px)` }, e.transitions && e.transitions.enabled && (a.wrapperStyle.transition = `${e.transitions.time}ms ${e.transitions.timingFunction}`);
					} else a.wrapperClass = an("handler", V({}, i.classname, !0));
					t.push(a);
				}
			})), t;
		}
	},
	beforeMount: function() {
		window.addEventListener("mouseup", this.onMouseUp, { passive: !1 }), window.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), window.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), window.addEventListener("touchend", this.onTouchEnd, { passive: !1 });
	},
	beforeUnmount: function() {
		window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
	},
	mounted: function() {
		this.touches = [];
	},
	methods: {
		onEnd: function() {
			this.$emit("resize-end");
		},
		onHandlerDrag: function(e, t, n) {
			var r, i = e.shift(), a = i.left, o = i.top, s = {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			};
			t === "west" ? s.left -= a : t === "east" && (s.right += a), n === "north" ? s.top -= o : n === "south" && (s.bottom += o), !n && t ? r = "width" : n && !t && (r = "height"), this.resizable && this.$emit("resize", new ot(s, {
				allowedDirections: {
					left: t === "west" || !t,
					right: t === "east" || !t,
					bottom: n === "south" || !n,
					top: n === "north" || !n
				},
				preserveAspectRatio: e.nativeEvent && e.nativeEvent.shiftKey,
				respectDirection: r
			}));
		}
	},
	emits: ["resize", "resize-end"]
};
cn.render = function(e, t, n, i, a, o) {
	return c(), S("div", {
		ref: "box",
		class: o.classes.root,
		style: o.style
	}, [
		r(e.$slots, "default"),
		N("div", null, [(c(!0), S(A, null, u(o.lineNodes, (function(e) {
			return c(), S(s(e.component), {
				key: e.name,
				"default-class": e.class,
				"hover-class": e.hoverClass,
				"wrapper-class": e.wrapperClass,
				position: e.name,
				disabled: e.disabled,
				onDrag: function(t) {
					return o.onHandlerDrag(t, e.horizontalDirection, e.verticalDirection);
				},
				onDragEnd: t[1] ||= function(e) {
					return o.onEnd();
				}
			}, null, 8, [
				"default-class",
				"hover-class",
				"wrapper-class",
				"position",
				"disabled",
				"onDrag"
			]);
		})), 128))]),
		(c(!0), S(A, null, u(o.handlerNodes, (function(e) {
			return c(), S("div", {
				key: e.name,
				style: e.wrapperStyle,
				class: e.wrapperClass
			}, [(c(), S(s(e.component), {
				"default-class": e.class,
				"hover-class": e.hoverClass,
				"wrapper-class": e.wrapperClass,
				"horizontal-position": e.horizontalDirection,
				"vertical-position": e.verticalDirection,
				disabled: e.disabled,
				onDrag: function(t) {
					return o.onHandlerDrag(t, e.horizontalDirection, e.verticalDirection);
				},
				onDragEnd: t[2] ||= function(e) {
					return o.onEnd();
				}
			}, null, 8, [
				"default-class",
				"hover-class",
				"wrapper-class",
				"horizontal-position",
				"vertical-position",
				"disabled",
				"onDrag"
			]))], 6);
		})), 128))
	], 6);
};
var ln = U("vue-draggable-area"), un = {
	name: "DraggableArea",
	props: {
		movable: {
			type: Boolean,
			default: !0
		},
		activationDistance: {
			type: Number,
			default: 20
		}
	},
	computed: { classnames: function() {
		return { default: ln() };
	} },
	beforeMount: function() {
		window.addEventListener("mouseup", this.onMouseUp, { passive: !1 }), window.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), window.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), window.addEventListener("touchend", this.onTouchEnd, { passive: !1 });
	},
	beforeUnmount: function() {
		window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
	},
	mounted: function() {
		this.touches = [], this.touchStarted = !1;
	},
	methods: {
		onTouchStart: function(e) {
			if (e.cancelable) {
				var t = this.movable && e.touches.length === 1;
				t && (this.touches = He(e.touches)), (this.touchStarted || t) && (e.preventDefault(), e.stopPropagation());
			}
		},
		onTouchEnd: function() {
			this.touchStarted = !1, this.processEnd();
		},
		onTouchMove: function(e) {
			this.touches.length >= 1 && (this.touchStarted ? (this.processMove(e, e.touches), e.preventDefault(), e.stopPropagation()) : it({
				x: this.touches[0].clientX,
				y: this.touches[0].clientY
			}, {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			}) > this.activationDistance && (this.initAnchor({
				clientX: e.touches[0].clientX,
				clientY: e.touches[0].clientY
			}), this.touchStarted = !0));
		},
		onMouseDown: function(e) {
			if (this.movable && e.button === 0) {
				var t = {
					fake: !0,
					clientX: e.clientX,
					clientY: e.clientY
				};
				this.touches = [t], this.initAnchor(t), e.stopPropagation();
			}
		},
		onMouseMove: function(e) {
			this.touches.length && (this.processMove(e, [{
				fake: !0,
				clientX: e.clientX,
				clientY: e.clientY
			}]), e.preventDefault && e.cancelable && e.preventDefault(), e.stopPropagation());
		},
		onMouseUp: function() {
			this.processEnd();
		},
		initAnchor: function(e) {
			var t = this.$refs.container.getBoundingClientRect(), n = t.left, r = t.top;
			this.anchor = {
				x: e.clientX - n,
				y: e.clientY - r
			};
		},
		processMove: function(e, t) {
			var n = He(t);
			if (this.touches.length) {
				var r = this.$refs.container.getBoundingClientRect(), i = r.left, a = r.top;
				this.touches.length === 1 && n.length === 1 && this.$emit("move", new st({
					left: n[0].clientX - (i + this.anchor.x),
					top: n[0].clientY - (a + this.anchor.y)
				}));
			}
		},
		processEnd: function() {
			this.touches.length && this.$emit("move-end"), this.touches = [];
		}
	},
	emits: ["move", "move-end"]
};
un.render = function(e, t, n, i, a, o) {
	return c(), S("div", {
		ref: "container",
		onTouchstart: t[1] ||= function() {
			return o.onTouchStart && o.onTouchStart.apply(o, arguments);
		},
		onMousedown: t[2] ||= function() {
			return o.onMouseDown && o.onMouseDown.apply(o, arguments);
		}
	}, [r(e.$slots, "default")], 544);
};
function dn(e) {
	return {
		rotate: e.rotate || 0,
		flip: {
			horizontal: e?.flip?.horizontal || !1,
			vertical: e?.flip?.vertical || !1
		}
	};
}
function fn(e) {
	return new Promise((function(t, n) {
		try {
			if (e) if (/^data:/i.test(e)) t(function(e) {
				e = e.replace(/^data:([^;]+);base64,/gim, "");
				for (var t = atob(e), n = t.length, r = new ArrayBuffer(n), i = new Uint8Array(r), a = 0; a < n; a++) i[a] = t.charCodeAt(a);
				return r;
			}(e));
			else if (/^blob:/i.test(e)) {
				var r = new FileReader();
				r.onload = function(e) {
					t(e.target.result);
				}, a = e, o = function(e) {
					r.readAsArrayBuffer(e);
				}, (s = new XMLHttpRequest()).open("GET", a, !0), s.responseType = "blob", s.onload = function() {
					this.status != 200 && this.status !== 0 || o(this.response);
				}, s.send();
			} else {
				var i = new XMLHttpRequest();
				i.onreadystatechange = function() {
					i.readyState === 4 && (i.status === 200 || i.status === 0 ? t(i.response) : n("Warning: could not load an image to parse its orientation"), i = null);
				}, i.onprogress = function() {
					i.getResponseHeader("content-type") !== "image/jpeg" && i.abort();
				}, i.withCredentials = !1, i.open("GET", e, !0), i.responseType = "arraybuffer", i.send(null);
			}
			else n("Error: the image is empty");
		} catch (e) {
			n(e);
		}
		var a, o, s;
	}));
}
function pn(e) {
	var t = e.rotate, n = e.flip, r = e.scaleX, i = e.scaleY, a = "";
	return a += " rotate(" + t + "deg) ", a += " scaleX(" + r * (n.horizontal ? -1 : 1) + ") ", a += " scaleY(" + i * (n.vertical ? -1 : 1) + ") ";
}
function mn(e) {
	try {
		var t, n = new DataView(e), r = void 0, i = void 0, a = void 0, o = void 0;
		if (n.getUint8(0) === 255 && n.getUint8(1) === 216) for (var s = n.byteLength, c = 2; c + 1 < s;) {
			if (n.getUint8(c) === 255 && n.getUint8(c + 1) === 225) {
				a = c;
				break;
			}
			c++;
		}
		if (a && (r = a + 10, function(e, t, n) {
			var r, i = "";
			for (r = t, n += t; r < n; r++) i += String.fromCharCode(e.getUint8(r));
			return i;
		}(n, a + 4, 4) === "Exif")) {
			var l = n.getUint16(r);
			if (((i = l === 18761) || l === 19789) && n.getUint16(r + 2, i) === 42) {
				var u = n.getUint32(r + 4, i);
				u >= 8 && (o = r + u);
			}
		}
		if (o) {
			for (var d = n.getUint16(o, i), f = 0; f < d; f++) if (c = o + 12 * f + 2, n.getUint16(c, i) === 274) {
				c += 8, t = n.getUint16(c, i), n.setUint16(c, 1, i);
				break;
			}
		}
		return t;
	} catch {
		return null;
	}
}
function hn(e, t) {
	var n = t.getBoundingClientRect(), r = n.left, i = n.top, a = {
		left: 0,
		top: 0
	}, o = 0;
	return e.forEach((function(t) {
		a.left += (t.clientX - r) / e.length, a.top += (t.clientY - i) / e.length;
	})), e.forEach((function(e) {
		o += it({
			x: a.left,
			y: a.top
		}, {
			x: e.clientX - r,
			y: e.clientY - i
		});
	})), {
		centerMass: a,
		spread: o,
		count: e.length
	};
}
var gn = {
	props: {
		touchMove: {
			type: Boolean,
			required: !0
		},
		mouseMove: {
			type: Boolean,
			required: !0
		},
		touchResize: {
			type: Boolean,
			required: !0
		},
		wheelResize: {
			type: [Boolean, Object],
			required: !0
		},
		eventsFilter: {
			type: Function,
			required: !1
		}
	},
	beforeMount: function() {
		window.addEventListener("mouseup", this.onMouseUp, { passive: !1 }), window.addEventListener("mousemove", this.onMouseMove, { passive: !1 }), window.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), window.addEventListener("touchend", this.onTouchEnd, { passive: !1 });
	},
	beforeUnmount: function() {
		window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
	},
	created: function() {
		this.transforming = !1, this.debouncedProcessEnd = Je(this.processEnd), this.touches = [];
	},
	methods: {
		processMove: function(e, t) {
			if (this.touches.length) {
				if (this.touches.length === 1 && t.length === 1) this.$emit("move", new at({
					left: this.touches[0].clientX - t[0].clientX,
					top: this.touches[0].clientY - t[0].clientY
				}));
				else if (this.touches.length > 1 && this.touchResize) {
					var n = hn(t, this.$refs.container), r = this.oldGeometricProperties;
					r.count === n.count && r.count > 1 && this.$emit("resize", new at({
						left: r.centerMass.left - n.centerMass.left,
						top: r.centerMass.top - n.centerMass.top
					}, {
						factor: r.spread / n.spread,
						center: n.centerMass
					})), this.oldGeometricProperties = n;
				}
				this.touches = t;
			}
		},
		processEnd: function() {
			this.transforming && (this.transforming = !1, this.$emit("transform-end"));
		},
		processStart: function() {
			this.transforming = !0, this.debouncedProcessEnd.clear();
		},
		processEvent: function(e) {
			return this.eventsFilter ? !1 !== this.eventsFilter(e, this.transforming) : (e.preventDefault(), e.stopPropagation(), !0);
		},
		onTouchStart: function(e) {
			if (e.cancelable && (this.touchMove || this.touchResize && e.touches.length > 1) && this.processEvent(e)) {
				var t = this.$refs.container, n = t.getBoundingClientRect(), r = n.left, i = n.top, a = n.bottom, o = n.right;
				this.touches = He(e.touches).filter((function(e) {
					return e.clientX > r && e.clientX < o && e.clientY > i && e.clientY < a;
				})), this.oldGeometricProperties = hn(this.touches, t);
			}
		},
		onTouchEnd: function(e) {
			e.touches.length === 0 && (this.touches = [], this.processEnd());
		},
		onTouchMove: function(e) {
			var t = this;
			if (this.touches.length) {
				var n = He(e.touches).filter((function(e) {
					return !e.identifier || t.touches.find((function(t) {
						return t.identifier === e.identifier;
					}));
				}));
				this.processEvent(e) && (this.processMove(e, n), this.processStart());
			}
		},
		onMouseDown: function(e) {
			if (this.mouseMove && "buttons" in e && e.buttons === 1 && this.processEvent(e)) {
				var t = {
					fake: !0,
					clientX: e.clientX,
					clientY: e.clientY
				};
				this.touches = [t], this.processStart();
			}
		},
		onMouseMove: function(e) {
			this.touches.length && this.processEvent(e) && this.processMove(e, [{
				clientX: e.clientX,
				clientY: e.clientY
			}]);
		},
		onMouseUp: function() {
			this.touches = [], this.processEnd();
		},
		onWheel: function(e) {
			if (this.wheelResize && this.processEvent(e)) {
				var t = this.$refs.container.getBoundingClientRect(), n = t.left, r = t.top, i = 1 + this.wheelResize.ratio * (o = e.deltaY || e.detail || e.wheelDelta, (s = +o) == 0 || rt(s) ? s : s > 0 ? 1 : -1), a = {
					left: e.clientX - n,
					top: e.clientY - r
				};
				this.$emit("resize", new at({}, {
					factor: i,
					center: a
				})), this.touches.length || this.debouncedProcessEnd();
			}
			var o, s;
		}
	},
	emits: [
		"resize",
		"move",
		"transform-end"
	]
};
gn.render = function(e, t, n, i, a, o) {
	return c(), S("div", {
		ref: "container",
		onTouchstart: t[1] ||= function() {
			return o.onTouchStart && o.onTouchStart.apply(o, arguments);
		},
		onMousedown: t[2] ||= function() {
			return o.onMouseDown && o.onMouseDown.apply(o, arguments);
		},
		onWheel: t[3] ||= function() {
			return o.onWheel && o.onWheel.apply(o, arguments);
		}
	}, [r(e.$slots, "default")], 544);
};
var _n = {
	components: { TransformableImage: gn },
	props: {
		touchMove: {
			type: Boolean,
			required: !0
		},
		mouseMove: {
			type: Boolean,
			required: !0
		},
		touchResize: {
			type: Boolean,
			required: !0
		},
		wheelResize: {
			type: [Boolean, Object],
			required: !0
		}
	},
	emits: ["resize", "move"]
};
_n.render = function(e, t, n, i, o, s) {
	var l = a("transformable-image");
	return c(), S(l, {
		"touch-move": n.touchMove,
		"touch-resize": n.touchResize,
		"mouse-move": n.mouseMove,
		"wheel-resize": n.wheelResize,
		onMove: t[1] ||= function(t) {
			return e.$emit("move", t);
		},
		onResize: t[2] ||= function(t) {
			return e.$emit("resize", t);
		}
	}, {
		default: f((function() {
			return [r(e.$slots, "default")];
		})),
		_: 3
	}, 8, [
		"touch-move",
		"touch-resize",
		"mouse-move",
		"wheel-resize"
	]);
};
var vn = U("vue-preview"), yn = {
	props: {
		coordinates: { type: Object },
		transitions: { type: Object },
		image: {
			type: Object,
			default: function() {
				return {};
			}
		},
		imageClass: { type: String },
		width: { type: Number },
		height: { type: Number },
		fill: { type: Boolean }
	},
	data: function() {
		return {
			calculatedImageSize: {
				width: 0,
				height: 0
			},
			calculatedSize: {
				width: 0,
				height: 0
			}
		};
	},
	computed: {
		classes: function() {
			return {
				root: vn({ fill: this.fill }),
				wrapper: vn("wrapper"),
				imageWrapper: vn("image-wrapper"),
				image: H(vn("image"), this.imageClass)
			};
		},
		style: function() {
			if (this.fill) return {};
			var e = {};
			return this.width && (e.width = `${this.size.width}px`), this.height && (e.height = `${this.size.height}px`), this.transitions && this.transitions.enabled && (e.transition = `${this.transitions.time}ms ${this.transitions.timingFunction}`), e;
		},
		wrapperStyle: function() {
			var e = {
				width: `${this.size.width}px`,
				height: `${this.size.height}px`,
				left: `calc(50% - ${this.size.width / 2}px)`,
				top: `calc(50% - ${this.size.height / 2}px)`
			};
			return this.transitions && this.transitions.enabled && (e.transition = `${this.transitions.time}ms ${this.transitions.timingFunction}`), e;
		},
		imageStyle: function() {
			if (this.coordinates && this.image) {
				var e = this.coordinates.width / this.size.width, t = B(B({
					rotate: 0,
					flip: {
						horizontal: !1,
						vertical: !1
					}
				}, this.image.transforms), {}, {
					scaleX: 1 / e,
					scaleY: 1 / e
				}), n = this.imageSize.width, r = this.imageSize.height, i = Dt({
					width: n,
					height: r
				}, t.rotate), a = {
					width: `${n}px`,
					height: `${r}px`,
					left: "0px",
					top: "0px"
				}, o = {
					rotate: {
						left: (n - i.width) * t.scaleX / 2,
						top: (r - i.height) * t.scaleY / 2
					},
					scale: {
						left: (1 - t.scaleX) * n / 2,
						top: (1 - t.scaleY) * r / 2
					}
				};
				return a.transform = `translate(
				${-this.coordinates.left / e - o.rotate.left - o.scale.left}px,${-this.coordinates.top / e - o.rotate.top - o.scale.top}px) ` + pn(t), this.transitions && this.transitions.enabled && (a.transition = `${this.transitions.time}ms ${this.transitions.timingFunction}`), a;
			}
			return {};
		},
		size: function() {
			return {
				width: this.width || this.calculatedSize.width,
				height: this.height || this.calculatedSize.height
			};
		},
		imageSize: function() {
			return {
				width: this.image.width || this.calculatedImageSize.width,
				height: this.image.height || this.calculatedImageSize.height
			};
		}
	},
	watch: { image: function(e) {
		(e.width || e.height) && this.onChangeImage();
	} },
	mounted: function() {
		var e = this;
		this.onChangeImage(), this.$refs.image.addEventListener("load", (function() {
			e.refreshImage();
		})), window.addEventListener("resize", this.refresh), window.addEventListener("orientationchange", this.refresh);
	},
	unmounted: function() {
		window.removeEventListener("resize", this.refresh), window.removeEventListener("orientationchange", this.refresh);
	},
	methods: {
		refreshImage: function() {
			var e = this.$refs.image;
			this.calculatedImageSize.height = e.naturalHeight, this.calculatedImageSize.width = e.naturalWidth;
		},
		refresh: function() {
			var e = this.$refs.root;
			this.width || (this.calculatedSize.width = e.clientWidth), this.height || (this.calculatedSize.height = e.clientHeight);
		},
		onChangeImage: function() {
			var e = this.$refs.image;
			e && e.complete && this.refreshImage(), this.refresh();
		}
	}
};
yn.render = function(e, t, n, r, a, o) {
	return c(), S("div", {
		ref: "root",
		class: o.classes.root,
		style: o.style
	}, [N("div", {
		ref: "wrapper",
		class: o.classes.wrapper,
		style: o.wrapperStyle
	}, [i(N("img", {
		ref: "image",
		src: n.image && n.image.src,
		class: o.classes.image,
		style: o.imageStyle
	}, null, 14, ["src"]), [[O, n.image && n.image.src]])], 6)], 6);
};
var bn = {
	components: { Preview: yn },
	inheritAttrs: !1
};
bn.render = function(e, t, r, i, o, s) {
	var l = a("preview");
	return c(), S(l, n(e.$attrs, { fill: !0 }), null, 16);
};
var xn = U("vue-rectangle-stencil"), Sn = {
	name: "RectangleStencil",
	components: {
		StencilPreview: bn,
		BoundingBox: cn,
		DraggableArea: un
	},
	props: {
		image: { type: Object },
		coordinates: { type: Object },
		stencilCoordinates: { type: Object },
		handlers: { type: Object },
		handlersComponent: {
			type: [Object, String],
			default: function() {
				return en;
			}
		},
		lines: { type: Object },
		linesComponent: {
			type: [Object, String],
			default: function() {
				return rn;
			}
		},
		aspectRatio: { type: [Number, String] },
		minAspectRatio: { type: [Number, String] },
		maxAspectRatio: { type: [Number, String] },
		movable: {
			type: Boolean,
			default: !0
		},
		resizable: {
			type: Boolean,
			default: !0
		},
		transitions: { type: Object },
		movingClass: { type: String },
		resizingClass: { type: String },
		previewClass: { type: String },
		boundingBoxClass: { type: String },
		linesClasses: {
			type: Object,
			default: function() {
				return {};
			}
		},
		linesWrappersClasses: {
			type: Object,
			default: function() {
				return {};
			}
		},
		handlersClasses: {
			type: Object,
			default: function() {
				return {};
			}
		},
		handlersWrappersClasses: {
			type: Object,
			default: function() {
				return {};
			}
		}
	},
	data: function() {
		return {
			moving: !1,
			resizing: !1
		};
	},
	computed: {
		classes: function() {
			return {
				stencil: H(xn({
					movable: this.movable,
					moving: this.moving,
					resizing: this.resizing
				}), this.moving && this.movingClass, this.resizing && this.resizingClass),
				preview: H(xn("preview"), this.previewClass),
				boundingBox: H(xn("bounding-box"), this.boundingBoxClass)
			};
		},
		style: function() {
			var e = this.stencilCoordinates, t = e.height, n = e.width, r = e.left, i = e.top, a = {
				width: `${n}px`,
				height: `${t}px`,
				transform: `translate(${r}px, ${i}px)`
			};
			return this.transitions && this.transitions.enabled && (a.transition = `${this.transitions.time}ms ${this.transitions.timingFunction}`), a;
		}
	},
	methods: {
		onMove: function(e) {
			this.$emit("move", e), this.moving = !0;
		},
		onMoveEnd: function() {
			this.$emit("move-end"), this.moving = !1;
		},
		onResize: function(e) {
			this.$emit("resize", e), this.resizing = !0;
		},
		onResizeEnd: function() {
			this.$emit("resize-end"), this.resizing = !1;
		},
		aspectRatios: function() {
			return {
				minimum: this.aspectRatio || this.minAspectRatio,
				maximum: this.aspectRatio || this.maxAspectRatio
			};
		}
	},
	emits: [
		"resize",
		"resize-end",
		"move",
		"move-end"
	]
};
Sn.render = function(e, t, n, r, i, o) {
	var s = a("stencil-preview"), l = a("draggable-area"), u = a("bounding-box");
	return c(), S("div", {
		class: o.classes.stencil,
		style: o.style
	}, [N(u, {
		width: n.stencilCoordinates.width,
		height: n.stencilCoordinates.height,
		transitions: n.transitions,
		class: o.classes.boundingBox,
		handlers: n.handlers,
		"handlers-component": n.handlersComponent,
		"handlers-classes": n.handlersClasses,
		"handlers-wrappers-classes": n.handlersWrappersClasses,
		lines: n.lines,
		"lines-component": n.linesComponent,
		"lines-classes": n.linesClasses,
		"lines-wrappers-classes": n.linesWrappersClasses,
		resizable: n.resizable,
		onResize: o.onResize,
		onResizeEnd: o.onResizeEnd
	}, {
		default: f((function() {
			return [N(l, {
				movable: n.movable,
				onMove: o.onMove,
				onMoveEnd: o.onMoveEnd
			}, {
				default: f((function() {
					return [N(s, {
						image: n.image,
						coordinates: n.coordinates,
						width: n.stencilCoordinates.width,
						height: n.stencilCoordinates.height,
						class: o.classes.preview,
						transitions: n.transitions
					}, null, 8, [
						"image",
						"coordinates",
						"width",
						"height",
						"class",
						"transitions"
					])];
				})),
				_: 1
			}, 8, [
				"movable",
				"onMove",
				"onMoveEnd"
			])];
		})),
		_: 1
	}, 8, [
		"width",
		"height",
		"transitions",
		"class",
		"handlers",
		"handlers-component",
		"handlers-classes",
		"handlers-wrappers-classes",
		"lines",
		"lines-component",
		"lines-classes",
		"lines-wrappers-classes",
		"resizable",
		"onResize",
		"onResizeEnd"
	])], 6);
};
var Cn = ["transitions"], wn = U("vue-advanced-cropper"), Tn = {
	name: "Cropper",
	components: { BackgroundWrapper: _n },
	props: {
		src: {
			type: String,
			default: null
		},
		stencilComponent: {
			type: [Object, String],
			default: function() {
				return Sn;
			}
		},
		backgroundWrapperComponent: {
			type: [Object, String],
			default: function() {
				return _n;
			}
		},
		stencilProps: {
			type: Object,
			default: function() {
				return {};
			}
		},
		autoZoom: {
			type: Boolean,
			default: !1
		},
		imageClass: { type: String },
		boundariesClass: { type: String },
		backgroundClass: { type: String },
		foregroundClass: { type: String },
		minWidth: { type: [Number, String] },
		minHeight: { type: [Number, String] },
		maxWidth: { type: [Number, String] },
		maxHeight: { type: [Number, String] },
		debounce: {
			type: [Boolean, Number],
			default: 500
		},
		transitions: {
			type: Boolean,
			default: !0
		},
		checkOrientation: {
			type: Boolean,
			default: !0
		},
		canvas: {
			type: [Object, Boolean],
			default: !0
		},
		crossOrigin: {
			type: [Boolean, String],
			default: void 0
		},
		transitionTime: {
			type: Number,
			default: 300
		},
		imageRestriction: {
			type: String,
			default: "fit-area",
			validator: function(e) {
				return _t.indexOf(e) !== -1;
			}
		},
		roundResult: {
			type: Boolean,
			default: !0
		},
		defaultSize: { type: [Function, Object] },
		defaultPosition: { type: [Function, Object] },
		defaultVisibleArea: { type: [Function, Object] },
		defaultTransforms: { type: [Function, Object] },
		defaultBoundaries: {
			type: [Function, String],
			validator: function(e) {
				return typeof e != "string" || e === "fill" || e === "fit";
			}
		},
		priority: {
			type: String,
			default: "coordinates"
		},
		stencilSize: { type: [Object, Function] },
		resizeImage: {
			type: [Boolean, Object],
			default: !0
		},
		moveImage: {
			type: [Boolean, Object],
			default: !0
		},
		autoZoomAlgorithm: { type: Function },
		resizeAlgorithm: {
			type: Function,
			default: function(e) {
				var t = e.event, n = e.coordinates, r = e.aspectRatio, i = e.positionRestrictions, a = e.sizeRestrictions, o = W(W({}, n), {
					right: n.left + n.width,
					bottom: n.top + n.height
				}), s = t.params || {}, c = W({}, t.directions), l = s.allowedDirections || {
					left: !0,
					right: !0,
					bottom: !0,
					top: !0
				};
				a.widthFrozen && (c.left = 0, c.right = 0), a.heightFrozen && (c.top = 0, c.bottom = 0), K.forEach((function(e) {
					l[e] || (c[e] = 0);
				}));
				var u = Y(o, c = Xt({
					coordinates: o,
					directions: c,
					sizeRestrictions: a,
					positionRestrictions: i
				})).width, d = Y(o, c).height, f = s.preserveRatio ? Q(o) : Tt(u / d, r);
				if (f) {
					var p = s.respectDirection;
					if (p ||= o.width >= o.height || f === 1 ? "width" : "height", p === "width") {
						var m = u / f - o.height;
						if (l.top && l.bottom) {
							var h = c.top, g = c.bottom;
							c.bottom = Zt(m, g, h), c.top = Zt(m, h, g);
						} else l.bottom ? c.bottom = m : l.top ? c.top = m : l.right ? c.right = 0 : l.left && (c.left = 0);
					} else if (p === "height") {
						var _ = o.width - d * f;
						if (l.left && l.right) {
							var v = c.left, y = c.right;
							c.left = -Zt(_, v, y), c.right = -Zt(_, y, v);
						} else l.left ? c.left = -_ : l.right ? c.right = -_ : l.top ? c.top = 0 : l.bottom && (c.bottom = 0);
					}
					c = Xt({
						directions: c,
						coordinates: o,
						sizeRestrictions: a,
						positionRestrictions: i,
						preserveRatio: !0,
						compensate: s.compensate
					});
				}
				return u = Y(o, c).width, d = Y(o, c).height, (f = s.preserveRatio ? Q(o) : Tt(u / d, r)) && Math.abs(f - u / d) > .001 && K.forEach((function(e) {
					l[e] || (c[e] = 0);
				})), Lt({
					event: new st({
						left: -c.left,
						top: -c.top
					}),
					coordinates: {
						width: n.width + c.right + c.left,
						height: n.height + c.top + c.bottom,
						left: n.left,
						top: n.top
					},
					positionRestrictions: i
				});
			}
		},
		moveAlgorithm: {
			type: Function,
			default: Lt
		},
		initStretcher: {
			type: Function,
			default: function(e) {
				var t = e.stretcher, n = e.imageSize, r = Q(n);
				t.style.width = n.width + "px", t.style.height = t.clientWidth / r + "px", t.style.width = t.clientWidth + "px";
			}
		},
		fitCoordinates: {
			type: Function,
			default: function(e) {
				var t = e.visibleArea, n = e.coordinates, r = e.aspectRatio, i = e.sizeRestrictions, a = e.positionRestrictions, o = W(W({}, n), It({
					width: n.width,
					height: n.height,
					aspectRatio: r,
					sizeRestrictions: {
						maxWidth: t.width,
						maxHeight: t.height,
						minHeight: Math.min(t.height, i.minHeight),
						minWidth: Math.min(t.width, i.minWidth)
					}
				}));
				return o = $(o = X(o, bt(J(n), J(o))), Nt(q(t), a));
			}
		},
		fitVisibleArea: {
			type: Function,
			default: function(e) {
				var t = e.visibleArea, n = e.boundaries, r = e.getAreaRestrictions, i = e.coordinates, a = W({}, t);
				a.height = a.width / Q(n), a.top += (t.height - a.height) / 2, (i.height - a.height > 0 || i.width - a.width > 0) && (a = Z(a, Math.max(i.height / a.height, i.width / a.width)));
				var o = St(wt(i, q(a = Z(a, kt(a, r({
					visibleArea: a,
					type: "resize"
				}))))));
				return a.width < i.width && (o.left = 0), a.height < i.height && (o.top = 0), a = $(a = X(a, o), r({
					visibleArea: a,
					type: "move"
				}));
			}
		},
		areaRestrictionsAlgorithm: {
			type: Function,
			default: function(e) {
				var t = e.visibleArea, n = e.boundaries, r = e.imageSize, i = e.imageRestriction, a = e.type, o = {};
				return i === "fill-area" ? o = {
					left: 0,
					top: 0,
					right: r.width,
					bottom: r.height
				} : i === "fit-area" && (Q(n) > Q(r) ? (o = {
					top: 0,
					bottom: r.height
				}, t && a === "move" && (t.width > r.width ? (o.left = -(t.width - r.width) / 2, o.right = r.width - o.left) : (o.left = 0, o.right = r.width))) : (o = {
					left: 0,
					right: r.width
				}, t && a === "move" && (t.height > r.height ? (o.top = -(t.height - r.height) / 2, o.bottom = r.height - o.top) : (o.top = 0, o.bottom = r.height)))), o;
			}
		},
		sizeRestrictionsAlgorithm: {
			type: Function,
			default: function(e) {
				return {
					minWidth: e.minWidth,
					minHeight: e.minHeight,
					maxWidth: e.maxWidth,
					maxHeight: e.maxHeight
				};
			}
		},
		positionRestrictionsAlgorithm: {
			type: Function,
			default: function(e) {
				var t = e.imageSize, n = {};
				return e.imageRestriction !== "none" && (n = {
					left: 0,
					top: 0,
					right: t.width,
					bottom: t.height
				}), n;
			}
		}
	},
	data: function() {
		return {
			transitionsActive: !1,
			imageLoaded: !1,
			imageAttributes: {
				width: null,
				height: null,
				crossOrigin: null,
				src: null
			},
			defaultImageTransforms: {
				rotate: 0,
				flip: {
					horizontal: !1,
					vertical: !1
				}
			},
			appliedImageTransforms: {
				rotate: 0,
				flip: {
					horizontal: !1,
					vertical: !1
				}
			},
			boundaries: {
				width: 0,
				height: 0
			},
			visibleArea: null,
			coordinates: B({}, vt)
		};
	},
	computed: {
		image: function() {
			return {
				src: this.imageAttributes.src,
				width: this.imageAttributes.width,
				height: this.imageAttributes.height,
				transforms: this.imageTransforms
			};
		},
		imageTransforms: function() {
			return {
				rotate: this.appliedImageTransforms.rotate,
				flip: {
					horizontal: this.appliedImageTransforms.flip.horizontal,
					vertical: this.appliedImageTransforms.flip.vertical
				},
				translateX: this.visibleArea ? this.visibleArea.left / this.coefficient : 0,
				translateY: this.visibleArea ? this.visibleArea.top / this.coefficient : 0,
				scaleX: 1 / this.coefficient,
				scaleY: 1 / this.coefficient
			};
		},
		imageSize: function() {
			var e = function(e) {
				return e * Math.PI / 180;
			}(this.imageTransforms.rotate);
			return {
				width: Math.abs(this.imageAttributes.width * Math.cos(e)) + Math.abs(this.imageAttributes.height * Math.sin(e)),
				height: Math.abs(this.imageAttributes.width * Math.sin(e)) + Math.abs(this.imageAttributes.height * Math.cos(e))
			};
		},
		initialized: function() {
			return !!(this.visibleArea && this.imageLoaded);
		},
		settings: function() {
			var e = et(this.resizeImage, {
				touch: !0,
				wheel: { ratio: .1 },
				adjustStencil: !0
			}, {
				touch: !1,
				wheel: !1,
				adjustStencil: !1
			});
			return {
				moveImage: et(this.moveImage, {
					touch: !0,
					mouse: !0
				}, {
					touch: !1,
					mouse: !1
				}),
				resizeImage: e
			};
		},
		coefficient: function() {
			return this.visibleArea ? this.visibleArea.width / this.boundaries.width : 0;
		},
		areaRestrictions: function() {
			return this.imageLoaded ? this.areaRestrictionsAlgorithm({
				imageSize: this.imageSize,
				imageRestriction: this.imageRestriction,
				boundaries: this.boundaries
			}) : {};
		},
		transitionsOptions: function() {
			return {
				enabled: this.transitionsActive,
				timingFunction: "ease-in-out",
				time: 350
			};
		},
		sizeRestrictions: function() {
			if (this.boundaries.width && this.boundaries.height && this.imageSize.width && this.imageSize.height) {
				var e = this.sizeRestrictionsAlgorithm({
					imageSize: this.imageSize,
					minWidth: G(this.minWidth) ? 0 : tt(this.minWidth),
					minHeight: G(this.minHeight) ? 0 : tt(this.minHeight),
					maxWidth: G(this.maxWidth) ? Infinity : tt(this.maxWidth),
					maxHeight: G(this.maxHeight) ? Infinity : tt(this.maxHeight)
				});
				if (e = function(e) {
					var t = e.areaRestrictions, n = e.sizeRestrictions, r = e.boundaries, i = e.positionRestrictions, a = W(W({}, n), {
						minWidth: n.minWidth === void 0 ? 0 : n.minWidth,
						minHeight: n.minHeight === void 0 ? 0 : n.minHeight,
						maxWidth: n.maxWidth === void 0 ? Infinity : n.maxWidth,
						maxHeight: n.maxHeight === void 0 ? Infinity : n.maxHeight
					});
					i.left !== void 0 && i.right !== void 0 && (a.maxWidth = Math.min(a.maxWidth, i.right - i.left)), i.bottom !== void 0 && i.top !== void 0 && (a.maxHeight = Math.min(a.maxHeight, i.bottom - i.top));
					var o = At(t), s = Et(r, o);
					return o.width < Infinity && (!a.maxWidth || a.maxWidth > s.width) && (a.maxWidth = Math.min(a.maxWidth, s.width)), o.height < Infinity && (!a.maxHeight || a.maxHeight > s.height) && (a.maxHeight = Math.min(a.maxHeight, s.height)), a.minWidth > a.maxWidth && (a.minWidth = a.maxWidth, a.widthFrozen = !0), a.minHeight > a.maxHeight && (a.minHeight = a.maxHeight, a.heightFrozen = !0), a;
				}({
					sizeRestrictions: e,
					areaRestrictions: this.getAreaRestrictions({
						visibleArea: this.visibleArea,
						type: "resize"
					}),
					imageSize: this.imageSize,
					boundaries: this.boundaries,
					positionRestrictions: this.positionRestrictions,
					imageRestriction: this.imageRestriction,
					visibleArea: this.visibleArea,
					stencilSize: this.getStencilSize()
				}), this.visibleArea && this.stencilSize) {
					var t = this.getStencilSize(), n = At(this.getAreaRestrictions({
						visibleArea: this.visibleArea,
						type: "resize"
					}));
					e.maxWidth = Math.min(e.maxWidth, n.width * t.width / this.boundaries.width), e.maxHeight = Math.min(e.maxHeight, n.height * t.height / this.boundaries.height), e.maxWidth < e.minWidth && (e.minWidth = e.maxWidth), e.maxHeight < e.minHeight && (e.minHeight = e.maxHeight);
				}
				return e;
			}
			return {
				minWidth: 0,
				minHeight: 0,
				maxWidth: 0,
				maxHeight: 0
			};
		},
		positionRestrictions: function() {
			return this.positionRestrictionsAlgorithm({
				imageSize: this.imageSize,
				imageRestriction: this.imageRestriction
			});
		},
		classes: function() {
			return {
				cropper: wn(),
				image: H(wn("image"), this.imageClass),
				stencil: wn("stencil"),
				boundaries: H(wn("boundaries"), this.boundariesClass),
				stretcher: H(wn("stretcher")),
				background: H(wn("background"), this.backgroundClass),
				foreground: H(wn("foreground"), this.foregroundClass),
				imageWrapper: H(wn("image-wrapper")),
				cropperWrapper: H(wn("cropper-wrapper"))
			};
		},
		stencilCoordinates: function() {
			if (this.initialized) {
				var e = this.coordinates, t = e.width, n = e.height, r = e.left, i = e.top;
				return {
					width: t / this.coefficient,
					height: n / this.coefficient,
					left: (r - this.visibleArea.left) / this.coefficient,
					top: (i - this.visibleArea.top) / this.coefficient
				};
			}
			return this.defaultCoordinates();
		},
		boundariesStyle: function() {
			var e = {
				width: this.boundaries.width ? `${Math.round(this.boundaries.width)}px` : "auto",
				height: this.boundaries.height ? `${Math.round(this.boundaries.height)}px` : "auto",
				transition: `opacity ${this.transitionTime}ms`,
				pointerEvents: this.imageLoaded ? "all" : "none"
			};
			return this.imageLoaded || (e.opacity = "0"), e;
		},
		imageStyle: function() {
			var e = this.imageAttributes.width > this.imageAttributes.height ? {
				width: Math.min(1024, this.imageAttributes.width),
				height: Math.min(1024, this.imageAttributes.width) / (this.imageAttributes.width / this.imageAttributes.height)
			} : {
				height: Math.min(1024, this.imageAttributes.height),
				width: Math.min(1024, this.imageAttributes.height) * (this.imageAttributes.width / this.imageAttributes.height)
			}, t = {
				left: (e.width - this.imageSize.width) / (2 * this.coefficient),
				top: (e.height - this.imageSize.height) / (2 * this.coefficient)
			}, n = {
				left: (1 - 1 / this.coefficient) * e.width / 2,
				top: (1 - 1 / this.coefficient) * e.height / 2
			}, r = B(B({}, this.imageTransforms), {}, {
				scaleX: this.imageTransforms.scaleX * (this.imageAttributes.width / e.width),
				scaleY: this.imageTransforms.scaleY * (this.imageAttributes.height / e.height)
			}), i = {
				width: `${e.width}px`,
				height: `${e.height}px`,
				left: "0px",
				top: "0px",
				transform: `translate(${-t.left - n.left - this.imageTransforms.translateX}px, ${-t.top - n.top - this.imageTransforms.translateY}px)` + pn(r)
			};
			return this.transitionsOptions.enabled && (i.transition = `${this.transitionsOptions.time}ms ${this.transitionsOptions.timingFunction}`), i;
		}
	},
	watch: {
		src: function() {
			this.onChangeImage();
		},
		stencilComponent: function() {
			var e = this;
			this.$nextTick((function() {
				e.resetCoordinates(), e.runAutoZoom("setCoordinates"), e.onChange();
			}));
		},
		minWidth: function() {
			this.onPropsChange();
		},
		maxWidth: function() {
			this.onPropsChange();
		},
		minHeight: function() {
			this.onPropsChange();
		},
		maxHeight: function() {
			this.onPropsChange();
		},
		imageRestriction: function() {
			this.reset();
		},
		stencilProps: function(e, t) {
			[
				"aspectRatio",
				"minAspectRatio",
				"maxAspectRatio"
			].find((function(n) {
				return e[n] !== t[n];
			})) && this.$nextTick(this.onPropsChange);
		}
	},
	created: function() {
		this.debouncedUpdate = Je(this.update, this.debounce), this.debouncedDisableTransitions = Je(this.disableTransitions, this.transitionsOptions.time), this.awaiting = !1;
	},
	mounted: function() {
		this.$refs.image.addEventListener("load", this.onSuccessLoadImage), this.$refs.image.addEventListener("error", this.onFailLoadImage), this.onChangeImage(), window.addEventListener("resize", this.refresh), window.addEventListener("orientationchange", this.refresh);
	},
	unmounted: function() {
		window.removeEventListener("resize", this.refresh), window.removeEventListener("orientationchange", this.refresh), this.imageAttributes.revoke && this.imageAttributes.src && URL.revokeObjectURL(this.imageAttributes.src), this.debouncedUpdate.clear(), this.debouncedDisableTransitions.clear();
	},
	methods: {
		getResult: function() {
			var e = this.initialized ? this.prepareResult(B({}, this.coordinates)) : this.defaultCoordinates(), t = {
				rotate: this.imageTransforms.rotate % 360,
				flip: B({}, this.imageTransforms.flip)
			};
			if (this.src && this.imageLoaded) {
				var n = this;
				return {
					image: this.image,
					coordinates: e,
					visibleArea: this.visibleArea ? B({}, this.visibleArea) : null,
					imageTransforms: t,
					get canvas() {
						return n.canvas ? n.getCanvas() : void 0;
					}
				};
			}
			return {
				image: this.image,
				coordinates: e,
				visibleArea: this.visibleArea ? B({}, this.visibleArea) : null,
				canvas: void 0,
				imageTransforms: t
			};
		},
		zoom: function(e, t) {
			var n = (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}).transitions, r = n === void 0 || n;
			this.onManipulateImage(new at({}, {
				factor: 1 / e,
				center: t
			}), {
				normalize: !1,
				transitions: r
			});
		},
		move: function(e, t) {
			var n = (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}).transitions, r = n === void 0 || n;
			this.onManipulateImage(new at({
				left: e || 0,
				top: t || 0
			}), {
				normalize: !1,
				transitions: r
			});
		},
		setCoordinates: function(e) {
			var t = this, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = n.autoZoom, i = r === void 0 || r, a = n.transitions, o = a === void 0 || a;
			this.$nextTick((function() {
				t.imageLoaded ? (t.transitionsActive || (o && t.enableTransitions(), t.coordinates = t.applyTransform(e), i && t.runAutoZoom("setCoordinates"), o && t.debouncedDisableTransitions()), t.onChange()) : t.delayedTransforms = e;
			}));
		},
		refresh: function() {
			var e = this, t = this.$refs.image;
			if (this.src && t) return this.initialized ? this.updateVisibleArea().then((function() {
				e.onChange();
			})) : this.resetVisibleArea().then((function() {
				e.onChange();
			}));
		},
		reset: function() {
			var e = this;
			return this.resetVisibleArea().then((function() {
				e.onChange(!1);
			}));
		},
		awaitRender: function(e) {
			var t = this;
			this.awaiting || (this.awaiting = !0, this.$nextTick((function() {
				e(), t.awaiting = !1;
			})));
		},
		prepareResult: function(e) {
			return this.roundResult ? function(e) {
				var t = e.coordinates, n = e.sizeRestrictions, r = e.positionRestrictions, i = {
					width: Math.round(t.width),
					height: Math.round(t.height),
					left: Math.round(t.left),
					top: Math.round(t.top)
				};
				return i.width > n.maxWidth ? i.width = Math.floor(t.width) : i.width < n.minWidth && (i.width = Math.ceil(t.width)), i.height > n.maxHeight ? i.height = Math.floor(t.height) : i.height < n.minHeight && (i.height = Math.ceil(t.height)), $(i, r);
			}(B(B({}, this.getPublicProperties()), {}, {
				positionRestrictions: Kt(this.positionRestrictions, this.visibleArea),
				coordinates: e
			})) : e;
		},
		processAutoZoom: function(e, t, n, r) {
			var i = this.autoZoomAlgorithm;
			i ||= this.stencilSize ? zt : this.autoZoom ? Bt : Vt;
			var a = i({
				event: {
					type: e,
					params: r
				},
				visibleArea: t,
				coordinates: n,
				boundaries: this.boundaries,
				aspectRatio: this.getAspectRatio(),
				positionRestrictions: this.positionRestrictions,
				getAreaRestrictions: this.getAreaRestrictions,
				sizeRestrictions: this.sizeRestrictions,
				stencilSize: this.getStencilSize()
			});
			return B(B({}, a), {}, { changed: !yt(a.visibleArea, t) || !yt(a.coordinates, n) });
		},
		runAutoZoom: function(e) {
			var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.transitions, r = n !== void 0 && n, i = Ve(t, Cn), a = this.processAutoZoom(e, this.visibleArea, this.coordinates, i), o = a.visibleArea, s = a.coordinates, c = a.changed;
			r && c && this.enableTransitions(), this.visibleArea = o, this.coordinates = s, r && c && this.debouncedDisableTransitions();
		},
		normalizeEvent: function(e) {
			return function(e) {
				var t = e.event, n = e.visibleArea, r = e.coefficient;
				if (t.type === "manipulateImage") return W(W({}, t), {
					move: {
						left: t.move && t.move.left ? r * t.move.left : 0,
						top: t.move && t.move.top ? r * t.move.top : 0
					},
					scale: {
						factor: t.scale && t.scale.factor ? t.scale.factor : 1,
						center: t.scale && t.scale.center ? {
							left: t.scale.center.left * r + n.left,
							top: t.scale.center.top * r + n.top
						} : null
					}
				});
				if (t.type === "resize") {
					var i = W(W({}, t), { directions: W({}, t.directions) });
					return K.forEach((function(e) {
						i.directions[e] *= r;
					})), i;
				}
				if (t.type === "move") {
					var a = W(W({}, t), { directions: W({}, t.directions) });
					return gt.forEach((function(e) {
						a.directions[e] *= r;
					})), a;
				}
				return t;
			}(B(B({}, this.getPublicProperties()), {}, { event: e }));
		},
		getCanvas: function() {
			if (this.$refs.canvas) {
				var e = this.$refs.canvas, t = this.$refs.image, n = this.imageTransforms.rotate !== 0 || this.imageTransforms.flip.horizontal || this.imageTransforms.flip.vertical ? function(e, t, n) {
					var r = n.rotate, i = n.flip, a = {
						width: t.naturalWidth,
						height: t.naturalHeight
					}, o = Dt(a, r), s = e.getContext("2d");
					e.height = o.height, e.width = o.width, s.save();
					var c = Ot(J(W({
						left: 0,
						top: 0
					}, a)), r);
					return s.translate(-(c.left - o.width / 2), -(c.top - o.height / 2)), s.rotate(r * Math.PI / 180), s.translate(i.horizontal ? a.width : 0, i.vertical ? a.height : 0), s.scale(i.horizontal ? -1 : 1, i.vertical ? -1 : 1), s.drawImage(t, 0, 0, a.width, a.height), s.restore(), e;
				}(this.$refs.sourceCanvas, t, this.imageTransforms) : t, r = B({
					minWidth: 0,
					minHeight: 0,
					maxWidth: Infinity,
					maxHeight: Infinity,
					maxArea: this.maxCanvasSize,
					imageSmoothingEnabled: !0,
					imageSmoothingQuality: "high",
					fillColor: "transparent"
				}, this.canvas), i = function(e) {
					return e.find((function(e) {
						return t = e, !Number.isNaN(parseFloat(t)) && isFinite(t);
						var t;
					}));
				}, a = It({
					sizeRestrictions: {
						minWidth: i([r.width, r.minWidth]) || 0,
						minHeight: i([r.height, r.minHeight]) || 0,
						maxWidth: i([r.width, r.maxWidth]) || Infinity,
						maxHeight: i([r.height, r.maxHeight]) || Infinity
					},
					width: this.coordinates.width,
					height: this.coordinates.height,
					aspectRatio: {
						minimum: this.coordinates.width / this.coordinates.height,
						maximum: this.coordinates.width / this.coordinates.height
					}
				});
				if (r.maxArea && a.width * a.height > r.maxArea) {
					var o = Math.sqrt(r.maxArea / (a.width * a.height));
					a = {
						width: Math.round(o * a.width),
						height: Math.round(o * a.height)
					};
				}
				return function(e, t, n, r, i) {
					e.width = r ? r.width : n.width, e.height = r ? r.height : n.height;
					var a = e.getContext("2d");
					a.clearRect(0, 0, e.width, e.height), i && (i.imageSmoothingEnabled && (a.imageSmoothingEnabled = i.imageSmoothingEnabled), i.imageSmoothingQuality && (a.imageSmoothingQuality = i.imageSmoothingQuality), i.fillColor && (a.fillStyle = i.fillColor, a.fillRect(0, 0, e.width, e.height), a.save()));
					var o = n.left < 0 ? -n.left : 0, s = n.top < 0 ? -n.top : 0;
					a.drawImage(t, n.left + o, n.top + s, n.width, n.height, e.width / n.width * o, e.height / n.height * s, e.width, e.height);
				}(e, n, this.coordinates, a, r), e;
			}
		},
		update: function() {
			this.$emit("change", this.getResult());
		},
		applyTransform: function(e) {
			var t = arguments.length > 1 && arguments[1] !== void 0 && arguments[1], n = this.visibleArea && t ? jt(this.sizeRestrictions, this.visibleArea) : this.sizeRestrictions, r = this.visibleArea && t ? Kt(this.positionRestrictions, this.visibleArea) : this.positionRestrictions;
			return Rt({
				transform: e,
				coordinates: this.coordinates,
				imageSize: this.imageSize,
				sizeRestrictions: n,
				positionRestrictions: r,
				aspectRatio: this.getAspectRatio(),
				visibleArea: this.visibleArea
			});
		},
		resetCoordinates: function() {
			var e = this;
			if (this.$refs.image) {
				this.$refs.cropper, this.$refs.image;
				var t = this.defaultSize;
				t ||= this.stencilSize ? Wt : Ut, this.sizeRestrictions;
				var n = Qe(t) ? t({
					boundaries: this.boundaries,
					imageSize: this.imageSize,
					aspectRatio: this.getAspectRatio(),
					sizeRestrictions: this.sizeRestrictions,
					stencilSize: this.getStencilSize(),
					visibleArea: this.visibleArea
				}) : t, r = this.defaultPosition || Ht, i = [n, function(t) {
					var n = t.coordinates;
					return B({}, Qe(r) ? r({
						coordinates: n,
						imageSize: e.imageSize,
						visibleArea: e.visibleArea
					}) : e.defaultPosition);
				}];
				this.delayedTransforms && i.push.apply(i, He(Array.isArray(this.delayedTransforms) ? this.delayedTransforms : [this.delayedTransforms])), this.coordinates = this.applyTransform(i, !0), this.delayedTransforms = null;
			}
		},
		clearImage: function() {
			var e = this;
			this.imageLoaded = !1, setTimeout((function() {
				var t = e.$refs.stretcher;
				t && (t.style.height = "auto", t.style.width = "auto"), e.coordinates = e.defaultCoordinates(), e.boundaries = {
					width: 0,
					height: 0
				};
			}), this.transitionTime);
		},
		enableTransitions: function() {
			this.transitions && (this.transitionsActive = !0);
		},
		disableTransitions: function() {
			this.transitionsActive = !1;
		},
		updateBoundaries: function() {
			var e = this, t = this.$refs.stretcher, n = this.$refs.cropper;
			return this.initStretcher({
				cropper: n,
				stretcher: t,
				imageSize: this.imageSize
			}), this.$nextTick().then((function() {
				var t = {
					cropper: n,
					imageSize: e.imageSize
				};
				if (e.boundaries = Qe(e.defaultBoundaries) ? e.defaultBoundaries(t) : e.defaultBoundaries === "fit" ? function(e) {
					var t = e.cropper, n = e.imageSize, r = t.clientHeight, i = t.clientWidth, a = r, o = n.width * r / n.height;
					return o > i && (o = i, a = n.height * i / n.width), {
						width: o,
						height: a
					};
				}(t) : function(e) {
					var t = e.cropper;
					return {
						width: t.clientWidth,
						height: t.clientHeight
					};
				}(t), !e.boundaries.width || !e.boundaries.height) throw Error("It's impossible to fit the cropper in the current container");
			}));
		},
		resetVisibleArea: function() {
			var e = this;
			return this.appliedImageTransforms = B(B({}, this.defaultImageTransforms), {}, { flip: B({}, this.defaultImageTransforms.flip) }), this.updateBoundaries().then((function() {
				e.priority !== "visible-area" && (e.visibleArea = null, e.resetCoordinates());
				var t, n, r, i, a, o, s = e.defaultVisibleArea || Gt;
				e.visibleArea = Qe(s) ? s({
					imageSize: e.imageSize,
					boundaries: e.boundaries,
					coordinates: e.priority === "visible-area" ? null : e.coordinates,
					getAreaRestrictions: e.getAreaRestrictions,
					stencilSize: e.getStencilSize()
				}) : e.defaultVisibleArea, e.visibleArea = (t = {
					visibleArea: e.visibleArea,
					boundaries: e.boundaries,
					getAreaRestrictions: e.getAreaRestrictions
				}, n = t.visibleArea, r = t.boundaries, i = t.getAreaRestrictions, a = W({}, n), o = Q(r), a.width / a.height !== o && (a.height = a.width / o), $(a, i({
					visibleArea: a,
					type: "move"
				}))), e.priority === "visible-area" ? e.resetCoordinates() : e.coordinates = e.fitCoordinates({
					visibleArea: e.visibleArea,
					coordinates: e.coordinates,
					aspectRatio: e.getAspectRatio(),
					positionRestrictions: e.positionRestrictions,
					sizeRestrictions: e.sizeRestrictions
				}), e.runAutoZoom("resetVisibleArea");
			})).catch((function() {
				e.visibleArea = null;
			}));
		},
		updateVisibleArea: function() {
			var e = this;
			return this.updateBoundaries().then((function() {
				e.visibleArea = e.fitVisibleArea({
					imageSize: e.imageSize,
					boundaries: e.boundaries,
					visibleArea: e.visibleArea,
					coordinates: e.coordinates,
					getAreaRestrictions: e.getAreaRestrictions
				}), e.coordinates = e.fitCoordinates({
					visibleArea: e.visibleArea,
					coordinates: e.coordinates,
					aspectRatio: e.getAspectRatio(),
					positionRestrictions: e.positionRestrictions,
					sizeRestrictions: e.sizeRestrictions
				}), e.runAutoZoom("updateVisibleArea");
			})).catch((function() {
				e.visibleArea = null;
			}));
		},
		onChange: function() {
			(!(arguments.length > 0 && arguments[0] !== void 0) || arguments[0]) && this.debounce ? this.debouncedUpdate() : this.update();
		},
		onChangeImage: function() {
			var e, t = this;
			if (this.imageLoaded = !1, this.delayedTransforms = null, this.src) {
				if (function(e) {
					if (Ze(e)) return !1;
					var t = window.location, n = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/.exec(e) || [], r = {
						protocol: n[1] || "",
						host: n[2] || "",
						port: n[3] || ""
					}, i = function(e) {
						return e.port || ((e.protocol || t.protocol) === "http" ? 80 : 433);
					};
					return !(!r.protocol && !r.host && !r.port || r.protocol && r.protocol == t.protocol && r.host && r.host == t.host && r.host && i(r) == i(t));
				}(this.src)) {
					var n = G(this.crossOrigin) ? this.canvas : this.crossOrigin;
					!0 === n && (n = "anonymous"), this.imageAttributes.crossOrigin = n || null;
				}
				if (this.checkOrientation) {
					var r = (e = this.src, new Promise((function(t) {
						fn(e).then((function(n) {
							var r = mn(n);
							t(n ? {
								source: e,
								arrayBuffer: n,
								orientation: r
							} : {
								source: e,
								arrayBuffer: null,
								orientation: null
							});
						})).catch((function(n) {
							console.warn(n), t({
								source: e,
								arrayBuffer: null,
								orientation: null
							});
						}));
					})));
					setTimeout((function() {
						r.then(t.onParseImage);
					}), this.transitionTime);
				} else setTimeout((function() {
					t.onParseImage({ source: t.src });
				}), this.transitionTime);
			} else this.clearImage();
		},
		onFailLoadImage: function() {
			this.imageAttributes.src && (this.clearImage(), this.$emit("error"));
		},
		onSuccessLoadImage: function() {
			var e = this, t = this.$refs.image;
			t && !this.imageLoaded && (this.imageAttributes.height = t.naturalHeight, this.imageAttributes.width = t.naturalWidth, this.imageLoaded = !0, this.resetVisibleArea().then((function() {
				e.$emit("ready"), e.onChange(!1);
			})));
		},
		onParseImage: function(e) {
			var t = this, n = e.source, r = e.arrayBuffer, i = e.orientation;
			this.imageAttributes.revoke && this.imageAttributes.src && URL.revokeObjectURL(this.imageAttributes.src), this.imageAttributes.revoke = !1, r && i && i > 1 ? Xe(n) || !Ze(n) ? (this.imageAttributes.src = URL.createObjectURL(new Blob([r])), this.imageAttributes.revoke = !0) : this.imageAttributes.src = function(e) {
				for (var t = [], n = new Uint8Array(e); n.length > 0;) {
					var r = n.subarray(0, 8192);
					t.push(String.fromCharCode.apply(null, Array.from ? Array.from(r) : r.slice())), n = n.subarray(8192);
				}
				return "data:image/jpeg;base64," + btoa(t.join(""));
			}(r) : this.imageAttributes.src = n, this.appliedImageTransforms = Qe(this.defaultTransforms) ? dn(this.defaultTransforms()) : $e(this.defaultTransforms) ? dn(this.defaultTransforms) : function(e) {
				var t = dn({});
				if (e) switch (e) {
					case 2:
						t.flip.horizontal = !0;
						break;
					case 3:
						t.rotate = -180;
						break;
					case 4:
						t.flip.vertical = !0;
						break;
					case 5:
						t.rotate = 90, t.flip.vertical = !0;
						break;
					case 6:
						t.rotate = 90;
						break;
					case 7:
						t.rotate = 90, t.flip.horizontal = !0;
						break;
					case 8: t.rotate = -90;
				}
				return t;
			}(i), this.defaultImageTransforms = B(B({}, this.appliedImageTransforms), {}, { flip: B({}, this.appliedImageTransforms.flip) }), this.$nextTick((function() {
				var e = t.$refs.image;
				e && e.complete && (function(e) {
					return !!e.naturalWidth;
				}(e) ? t.onSuccessLoadImage() : t.onFailLoadImage());
			}));
		},
		onResizeEnd: function() {
			this.runAutoZoom("resize", { transitions: !0 });
		},
		onMoveEnd: function() {
			this.runAutoZoom("move", { transitions: !0 });
		},
		onMove: function(e) {
			var t = this;
			this.transitionsOptions.enabled || this.awaitRender((function() {
				t.coordinates = t.moveAlgorithm(B(B({}, t.getPublicProperties()), {}, {
					positionRestrictions: Kt(t.positionRestrictions, t.visibleArea),
					coordinates: t.coordinates,
					event: t.normalizeEvent(e)
				})), t.onChange();
			}));
		},
		onResize: function(e) {
			var t = this;
			this.transitionsOptions.enabled || this.stencilSize && !this.autoZoom || this.awaitRender((function() {
				var n = t.sizeRestrictions, r = Math.min(t.coordinates.width, t.coordinates.height, 20 * t.coefficient);
				t.coordinates = t.resizeAlgorithm(B(B({}, t.getPublicProperties()), {}, {
					positionRestrictions: Kt(t.positionRestrictions, t.visibleArea),
					sizeRestrictions: {
						maxWidth: Math.min(n.maxWidth, t.visibleArea.width),
						maxHeight: Math.min(n.maxHeight, t.visibleArea.height),
						minWidth: Math.max(n.minWidth, r),
						minHeight: Math.max(n.minHeight, r)
					},
					event: t.normalizeEvent(e)
				})), t.onChange(), t.ticking = !1;
			}));
		},
		onManipulateImage: function(e) {
			var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
			if (!this.transitionsOptions.enabled) {
				var n = t.transitions, r = n !== void 0 && n, i = t.normalize, a = i === void 0 || i;
				r && this.enableTransitions();
				var o = qt(B(B({}, this.getPublicProperties()), {}, {
					event: a ? this.normalizeEvent(e) : e,
					getAreaRestrictions: this.getAreaRestrictions,
					imageRestriction: this.imageRestriction,
					adjustStencil: !this.stencilSize && this.settings.resizeImage.adjustStencil
				})), s = o.visibleArea, c = o.coordinates;
				this.visibleArea = s, this.coordinates = c, this.runAutoZoom("manipulateImage"), this.onChange(), r && this.debouncedDisableTransitions();
			}
		},
		onPropsChange: function() {
			this.coordinates = this.applyTransform(this.coordinates, !0), this.onChange(!1);
		},
		getAreaRestrictions: function() {
			var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.visibleArea, n = e.type, r = n === void 0 ? "move" : n;
			return this.areaRestrictionsAlgorithm({
				boundaries: this.boundaries,
				imageSize: this.imageSize,
				imageRestriction: this.imageRestriction,
				visibleArea: t,
				type: r
			});
		},
		getAspectRatio: function(e) {
			var t, n, r = this.stencilProps, i = r.aspectRatio, a = r.minAspectRatio, o = r.maxAspectRatio;
			if (this.$refs.stencil && this.$refs.stencil.aspectRatios) {
				var s = this.$refs.stencil.aspectRatios();
				t = s.minimum, n = s.maximum;
			}
			if (G(t) && (t = G(i) ? a : i), G(n) && (n = G(i) ? o : i), !e && (G(t) || G(n))) {
				var c = this.getStencilSize(), l = c ? Q(c) : null;
				G(t) && (t = nt(l) ? l : void 0), G(n) && (n = nt(l) ? l : void 0);
			}
			return {
				minimum: t,
				maximum: n
			};
		},
		getStencilSize: function() {
			if (this.stencilSize) return e = {
				currentStencilSize: {
					width: this.stencilCoordinates.width,
					height: this.stencilCoordinates.height
				},
				stencilSize: this.stencilSize,
				boundaries: this.boundaries,
				coefficient: this.coefficient,
				coordinates: this.coordinates,
				aspectRatio: this.getAspectRatio(!0)
			}, t = e.boundaries, n = e.stencilSize, r = e.aspectRatio, Tt(Q(i = Qe(n) ? n({
				boundaries: t,
				aspectRatio: r
			}) : n), r) && (i = It({
				sizeRestrictions: {
					maxWidth: t.width,
					maxHeight: t.height,
					minWidth: 0,
					minHeight: 0
				},
				width: i.width,
				height: i.height,
				aspectRatio: {
					minimum: r.minimum,
					maximum: r.maximum
				}
			})), (i.width > t.width || i.height > t.height) && (i = It({
				sizeRestrictions: {
					maxWidth: t.width,
					maxHeight: t.height,
					minWidth: 0,
					minHeight: 0
				},
				width: i.width,
				height: i.height,
				aspectRatio: {
					minimum: Q(i),
					maximum: Q(i)
				}
			})), i;
			var e, t, n, r, i;
		},
		getPublicProperties: function() {
			return {
				coefficient: this.coefficient,
				visibleArea: this.visibleArea,
				coordinates: this.coordinates,
				boundaries: this.boundaries,
				sizeRestrictions: this.sizeRestrictions,
				positionRestrictions: this.positionRestrictions,
				aspectRatio: this.getAspectRatio(),
				imageRestriction: this.imageRestriction
			};
		},
		defaultCoordinates: function() {
			return B({}, vt);
		},
		flip: function(e, t) {
			var n = (arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}).transitions, r = n === void 0 || n;
			if (!this.transitionsActive) {
				r && this.enableTransitions();
				var i = B({}, this.imageTransforms.flip), a = Yt({
					flip: {
						horizontal: e ? !i.horizontal : i.horizontal,
						vertical: t ? !i.vertical : i.vertical
					},
					previousFlip: i,
					rotate: this.imageTransforms.rotate,
					visibleArea: this.visibleArea,
					coordinates: this.coordinates,
					imageSize: this.imageSize,
					positionRestrictions: this.positionRestrictions,
					sizeRestrictions: this.sizeRestrictions,
					getAreaRestrictions: this.getAreaRestrictions,
					aspectRatio: this.getAspectRatio()
				}), o = a.visibleArea, s = a.coordinates;
				e && (this.appliedImageTransforms.flip.horizontal = !this.appliedImageTransforms.flip.horizontal), t && (this.appliedImageTransforms.flip.vertical = !this.appliedImageTransforms.flip.vertical), this.visibleArea = o, this.coordinates = s, this.onChange(), r && this.debouncedDisableTransitions();
			}
		},
		rotate: function(e) {
			var t = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}).transitions, n = t === void 0 || t;
			if (!this.transitionsActive) {
				n && this.enableTransitions();
				var r = B({}, this.imageSize);
				this.appliedImageTransforms.rotate += e;
				var i = Jt({
					visibleArea: this.visibleArea,
					coordinates: this.coordinates,
					previousImageSize: r,
					imageSize: this.imageSize,
					angle: e,
					positionRestrictions: this.positionRestrictions,
					sizeRestrictions: this.sizeRestrictions,
					getAreaRestrictions: this.getAreaRestrictions,
					aspectRatio: this.getAspectRatio()
				}), a = i.visibleArea, o = i.coordinates, s = this.processAutoZoom("rotateImage", a, o);
				a = s.visibleArea, o = s.coordinates, this.visibleArea = a, this.coordinates = o, this.onChange(), n && this.debouncedDisableTransitions();
			}
		}
	},
	emits: [
		"change",
		"error",
		"ready"
	]
}, En = {
	key: 0,
	ref: "canvas",
	style: { display: "none" }
}, Dn = {
	key: 1,
	ref: "sourceCanvas",
	style: { display: "none" }
};
Tn.render = function(e, t, r, a, o, l) {
	return c(), S("div", {
		ref: "cropper",
		class: l.classes.cropper
	}, [N("div", {
		ref: "stretcher",
		class: l.classes.stretcher
	}, null, 2), N("div", {
		class: l.classes.boundaries,
		style: l.boundariesStyle
	}, [(c(), S(s(r.backgroundWrapperComponent), {
		class: l.classes.cropperWrapper,
		"wheel-resize": l.settings.resizeImage.wheel,
		"touch-resize": l.settings.resizeImage.touch,
		"touch-move": l.settings.moveImage.touch,
		"mouse-move": l.settings.moveImage.mouse,
		onMove: l.onManipulateImage,
		onResize: l.onManipulateImage
	}, {
		default: f((function() {
			return [
				N("div", {
					class: l.classes.background,
					style: l.boundariesStyle
				}, null, 6),
				N("div", { class: l.classes.imageWrapper }, [N("img", {
					ref: "image",
					crossorigin: o.imageAttributes.crossOrigin,
					src: o.imageAttributes.src,
					class: l.classes.image,
					style: l.imageStyle,
					onMousedown: t[1] ||= x((function() {}), ["prevent"])
				}, null, 46, ["crossorigin", "src"])], 2),
				N("div", {
					class: l.classes.foreground,
					style: l.boundariesStyle
				}, null, 6),
				i((c(), S(s(r.stencilComponent), n({
					ref: "stencil",
					image: l.image,
					coordinates: o.coordinates,
					"stencil-coordinates": l.stencilCoordinates,
					transitions: l.transitionsOptions
				}, r.stencilProps, {
					onResize: l.onResize,
					onResizeEnd: l.onResizeEnd,
					onMove: l.onMove,
					onMoveEnd: l.onMoveEnd
				}), null, 16, [
					"image",
					"coordinates",
					"stencil-coordinates",
					"transitions",
					"onResize",
					"onResizeEnd",
					"onMove",
					"onMoveEnd"
				])), [[O, o.imageLoaded]]),
				r.canvas ? (c(), S("canvas", En, null, 512)) : y("", !0),
				r.canvas ? (c(), S("canvas", Dn, null, 512)) : y("", !0)
			];
		})),
		_: 1
	}, 8, [
		"class",
		"wheel-resize",
		"touch-resize",
		"touch-move",
		"mouse-move",
		"onMove",
		"onResize"
	]))], 6)], 2);
};
//#endregion
//#region ../media-library/src/components/media/MediaEditModal.vue?vue&type=script&setup=true&lang.ts
var On = ["data-tpl-theme"], kn = { class: "tpl:shrink-0 tpl:p-5 tpl:pb-4" }, An = {
	class: "tpl:text-sm tpl:font-semibold",
	style: { color: "var(--tpl-text)" }
}, jn = { class: "tpl:min-h-0 tpl:flex-1 tpl:overflow-y-auto tpl:px-5" }, Mn = {
	key: 0,
	class: "tpl:mb-4"
}, Nn = {
	class: "tpl:relative tpl:mb-3 tpl:overflow-hidden tpl:rounded-md tpl:border",
	style: {
		"border-color": "var(--tpl-border)",
		height: "300px",
		"background-color": "var(--tpl-bg)"
	}
}, Pn = { class: "tpl:space-y-3" }, Fn = {
	class: "tpl:mb-1.5 tpl:block tpl:text-xs tpl:font-medium",
	style: { color: "var(--tpl-text-muted)" }
}, In = { class: "tpl:flex tpl:flex-wrap tpl:gap-1.5" }, Ln = ["onClick"], Rn = { class: "tpl:flex tpl:gap-3" }, zn = { class: "tpl:flex-1" }, Bn = {
	class: "tpl:mb-1 tpl:block tpl:text-xs tpl:font-medium",
	style: { color: "var(--tpl-text-muted)" }
}, Vn = {
	class: "tpl:font-normal",
	style: { color: "var(--tpl-text-dim)" }
}, Hn = { class: "tpl:relative" }, Un = ["value", "placeholder"], Wn = {
	class: "tpl:absolute tpl:top-1/2 tpl:right-2.5 tpl:-translate-y-1/2 tpl:text-xs",
	style: { color: "var(--tpl-text-dim)" }
}, Gn = { class: "tpl:flex-1" }, Kn = {
	class: "tpl:mb-1 tpl:block tpl:text-xs tpl:font-medium",
	style: { color: "var(--tpl-text-muted)" }
}, qn = {
	class: "tpl:font-normal",
	style: { color: "var(--tpl-text-dim)" }
}, Jn = { class: "tpl:relative" }, Yn = ["value", "placeholder"], Xn = {
	class: "tpl:absolute tpl:top-1/2 tpl:right-2.5 tpl:-translate-y-1/2 tpl:text-xs",
	style: { color: "var(--tpl-text-dim)" }
}, Zn = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:gap-1 tpl:text-xs",
	style: { color: "var(--tpl-text-muted)" }
}, Qn = {
	class: "tpl:font-medium",
	style: { color: "var(--tpl-text)" }
}, $n = { class: "tpl:mb-3" }, er = {
	class: "tpl:mb-1 tpl:block tpl:text-xs tpl:font-medium",
	style: { color: "var(--tpl-text-muted)" }
}, tr = ["autofocus"], nr = {
	key: 1,
	class: "tpl:mb-4"
}, rr = {
	class: "tpl:mb-1 tpl:block tpl:text-xs tpl:font-medium",
	style: { color: "var(--tpl-text-muted)" }
}, ir = ["placeholder"], ar = { class: "tpl:flex tpl:shrink-0 tpl:justify-end tpl:gap-2 tpl:p-5 tpl:pt-4" }, or = ["disabled"], sr = /*#__PURE__*/ we(/* @__PURE__ */ M({
	__name: "MediaEditModal",
	props: {
		visible: { type: Boolean },
		item: {}
	},
	emits: ["save", "close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: a } = z(), o = d("tplUiTheme"), s = d(ze, p(null)), l = a.mediaLibrary, { isImageMimeType: m } = Ne(), D = p(""), O = p(""), ee = p(null), M = p("free"), ne = p(void 0), re = p(void 0), ie = p(""), ae = p(""), P = p(void 0), F = p(null), oe = p(!1), I = p(!1), se = p(!1), ce = _(() => n.item ? [
			"image/jpeg",
			"image/png",
			"image/webp",
			"image/gif"
		].includes(n.item.mime_type) : !1), le = _(() => M.value === "original" ? P.value : Pe[M.value]), ue = _(() => F.value ? Re(F.value.width, F.value.height, ne.value, re.value) : null);
		te(() => n.visible, (e) => {
			e && n.item && (D.value = n.item.filename, O.value = n.item.alt_text || "", M.value = "free", ne.value = void 0, re.value = void 0, ie.value = "", ae.value = "", P.value = void 0, F.value = null, oe.value = !1, se.value = !1, n.item.width && n.item.height && (P.value = n.item.width / n.item.height));
		});
		function de(e) {
			e.coordinates && (F.value = {
				width: Math.round(e.coordinates.width),
				height: Math.round(e.coordinates.height)
			}, se.value = !0);
		}
		function fe() {
			oe.value = !0, !P.value && n.item?.width && n.item?.height && (P.value = n.item.width / n.item.height);
		}
		function pe(e) {
			let t = e.target.value;
			ie.value = t, ne.value = t && parseInt(t, 10) || void 0;
		}
		function me(e) {
			let t = e.target.value;
			ae.value = t, re.value = t && parseInt(t, 10) || void 0;
		}
		async function he() {
			let e = D.value.trim();
			if (!e || !n.item || I.value) return;
			let t = m(n.item.mime_type), i;
			if (ce.value && ee.value && se.value) {
				I.value = !0;
				try {
					let { canvas: e } = ee.value.getResult();
					if (e) {
						let t = Ie(e, ne.value, re.value), r = Fe(n.item.mime_type);
						i = { file: await Le(t, n.item.filename, r) };
					}
				} catch {
					I.value = !1;
					return;
				}
				I.value = !1;
			}
			r("save", n.item.id, e, t ? O.value : void 0, i), r("close");
		}
		function ge(e) {
			e.key === "Enter" && !I.value && (e.preventDefault(), he()), e.key === "Escape" && r("close");
		}
		return (t, n) => (c(), S(g, { to: b(s) || "body" }, [N(C, {
			"enter-active-class": "tpl:transition tpl:ease-out tpl:duration-150",
			"enter-from-class": "tpl:opacity-0",
			"enter-to-class": "tpl:opacity-100",
			"leave-active-class": "tpl:transition tpl:ease-in tpl:duration-100",
			"leave-from-class": "tpl:opacity-100",
			"leave-to-class": "tpl:opacity-0"
		}, {
			default: f(() => [e.visible && e.item ? (c(), v("div", {
				key: 0,
				"data-tpl-theme": b(o),
				class: "tpl tpl:fixed tpl:inset-0 tpl:z-[10000] tpl:flex tpl:items-center tpl:justify-center",
				style: { "background-color": "var(--tpl-overlay)" },
				onClick: n[3] ||= x((e) => r("close"), ["self"]),
				onKeydown: ge
			}, [E("div", {
				class: T(["tpl:mx-4 tpl:flex tpl:max-h-[90vh] tpl:w-full tpl:flex-col tpl:overflow-hidden tpl:rounded-lg tpl:shadow-xl", ce.value ? "tpl:max-w-2xl" : "tpl:max-w-sm"]),
				style: { "background-color": "var(--tpl-bg-elevated)" }
			}, [
				E("div", kn, [E("h3", An, h(b(a).mediaLibrary.editFile), 1)]),
				E("div", jn, [
					ce.value ? (c(), v("div", Mn, [E("div", Nn, [N(b(Tn), {
						ref_key: "cropperRef",
						ref: ee,
						src: e.item.url,
						"stencil-props": { aspectRatio: le.value },
						class: "tpl:h-full tpl:w-full",
						"background-class": "tpl-cropper-background",
						onChange: de,
						onReady: fe
					}, null, 8, ["src", "stencil-props"])]), E("div", Pn, [
						E("div", null, [E("label", Fn, h(b(a).mediaLibrary.cropAspectRatio), 1), E("div", In, [(c(), v(A, null, u([
							"free",
							"square",
							"landscape43",
							"landscape169",
							"original"
						], (e) => E("button", {
							key: e,
							type: "button",
							class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-2.5 tpl:py-1 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
							style: k({
								borderColor: M.value === e ? "var(--tpl-primary)" : "var(--tpl-border)",
								backgroundColor: M.value === e ? "var(--tpl-primary-light)" : "var(--tpl-bg)",
								color: M.value === e ? "var(--tpl-primary)" : "var(--tpl-text)"
							}),
							onClick: (t) => M.value = e
						}, h(b(l)[`crop${e.charAt(0).toUpperCase()}${e.slice(1)}`]), 13, Ln)), 64))])]),
						E("div", Rn, [E("div", zn, [E("label", Bn, [j(h(b(a).mediaLibrary.cropMaxWidth) + " ", 1), E("span", Vn, h(b(a).mediaLibrary.cropOptional), 1)]), E("div", Hn, [E("input", {
							value: ie.value,
							type: "number",
							min: "1",
							class: "tpl:w-full tpl:rounded-md tpl:border tpl:py-1.5 tpl:pr-8 tpl:pl-3 tpl:text-xs tpl:outline-none",
							style: {
								"border-color": "var(--tpl-border)",
								"background-color": "var(--tpl-bg)",
								color: "var(--tpl-text)"
							},
							placeholder: F.value?.width?.toString() || "",
							onInput: pe
						}, null, 40, Un), E("span", Wn, h(b(a).mediaLibrary.cropPixels), 1)])]), E("div", Gn, [E("label", Kn, [j(h(b(a).mediaLibrary.cropMaxHeight) + " ", 1), E("span", qn, h(b(a).mediaLibrary.cropOptional), 1)]), E("div", Jn, [E("input", {
							value: ae.value,
							type: "number",
							min: "1",
							class: "tpl:w-full tpl:rounded-md tpl:border tpl:py-1.5 tpl:pr-8 tpl:pl-3 tpl:text-xs tpl:outline-none",
							style: {
								"border-color": "var(--tpl-border)",
								"background-color": "var(--tpl-bg)",
								color: "var(--tpl-text)"
							},
							placeholder: F.value?.height?.toString() || "",
							onInput: me
						}, null, 40, Yn), E("span", Xn, h(b(a).mediaLibrary.cropPixels), 1)])])]),
						ue.value ? (c(), v("div", Zn, [E("span", null, h(b(a).mediaLibrary.cropOutputSize) + ": ", 1), E("span", Qn, h(ue.value.width) + " x " + h(ue.value.height) + " " + h(b(a).mediaLibrary.cropPixels), 1)])) : y("", !0)
					])])) : y("", !0),
					E("div", $n, [E("label", er, h(b(a).mediaLibrary.fileName), 1), i(E("input", {
						"onUpdate:modelValue": n[0] ||= (e) => D.value = e,
						type: "text",
						class: "tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:outline-none",
						style: {
							"border-color": "var(--tpl-border)",
							"background-color": "var(--tpl-bg)",
							color: "var(--tpl-text)"
						},
						autofocus: !ce.value
					}, null, 8, tr), [[w, D.value]])]),
					b(m)(e.item.mime_type) ? (c(), v("div", nr, [E("label", rr, h(b(a).mediaLibrary.altText), 1), i(E("input", {
						"onUpdate:modelValue": n[1] ||= (e) => O.value = e,
						type: "text",
						class: "tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:outline-none",
						style: {
							"border-color": "var(--tpl-border)",
							"background-color": "var(--tpl-bg)",
							color: "var(--tpl-text)"
						},
						placeholder: b(a).mediaLibrary.altTextPlaceholder
					}, null, 8, ir), [[w, O.value]])])) : y("", !0)
				]),
				E("div", ar, [E("button", {
					class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
					style: {
						"border-color": "var(--tpl-border)",
						color: "var(--tpl-text)",
						"background-color": "var(--tpl-bg)"
					},
					onClick: n[2] ||= (e) => r("close")
				}, h(b(a).mediaLibrary.cancel), 1), E("button", {
					class: "tpl:cursor-pointer tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:text-white tpl:transition-all tpl:duration-150 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50",
					style: { background: "linear-gradient(\n                  135deg,\n                  var(--tpl-primary),\n                  var(--tpl-primary-hover)\n                )" },
					disabled: I.value,
					onClick: he
				}, h(I.value ? b(a).mediaLibrary.saving : b(a).mediaLibrary.saveChanges), 9, or)])
			], 2)], 40, On)) : y("", !0)]),
			_: 1
		})], 8, ["to"]));
	}
}), [["__scopeId", "data-v-1d42dd39"]]), cr = {
	key: 1,
	class: "tpl:size-4 tpl:shrink-0"
}, lr = {
	key: 0,
	class: "tpl:truncate"
}, ur = {
	key: 3,
	class: "tpl:flex tpl:shrink-0 tpl:items-center tpl:gap-0.5 tpl:opacity-0 tpl:transition-opacity tpl:group-hover:opacity-100"
}, dr = ["title"], fr = ["title"], pr = { key: 0 }, mr = ["placeholder"], hr = /* @__PURE__ */ M({
	__name: "MediaFolderTreeNode",
	props: {
		folder: {},
		currentFolderId: {},
		depth: {}
	},
	emits: [
		"navigate",
		"createFolder",
		"renameFolder",
		"deleteFolder"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: o } = z(), s = p(!1), l = p(!1), d = p(""), f = p(!1), g = p(""), C = _(() => (n.folder.children?.length ?? 0) > 0), D = _(() => n.depth < 4), O = _(() => n.currentFolderId === n.folder.id), ee = _(() => !n.currentFolderId || !n.folder.children ? !1 : M(n.folder.children, n.currentFolderId)), j = _(() => s.value || ee.value);
		function M(e, t) {
			for (let n of e) if (n.id === t || n.children && M(n.children, t)) return !0;
			return !1;
		}
		function te() {
			s.value = !s.value;
		}
		function ne() {
			l.value = !0, d.value = n.folder.name;
		}
		function re() {
			let e = d.value.trim();
			e && e !== n.folder.name && r("renameFolder", n.folder.id, e), l.value = !1, d.value = "";
		}
		function ie() {
			l.value = !1, d.value = "";
		}
		function ae() {
			f.value = !0, g.value = "", s.value = !0;
		}
		function P() {
			g.value.trim() && r("createFolder", g.value.trim(), n.folder.id), f.value = !1, g.value = "";
		}
		function F() {
			f.value = !1, g.value = "";
		}
		return (t, n) => {
			let s = a("MediaFolderTreeNode", !0);
			return c(), v("div", null, [E("div", {
				class: "tpl:group tpl:flex tpl:w-full tpl:items-center tpl:gap-1 tpl:py-1.5 tpl:pr-2 tpl:text-left tpl:text-xs tpl:transition-all tpl:duration-150",
				style: k({
					paddingLeft: `${e.depth * 16 + 8}px`,
					backgroundColor: O.value ? "var(--tpl-bg-active)" : "transparent",
					color: O.value ? "var(--tpl-primary)" : "var(--tpl-text)"
				})
			}, [
				C.value || f.value ? (c(), v("button", {
					key: 0,
					class: "tpl:flex tpl:size-4 tpl:shrink-0 tpl:items-center tpl:justify-center tpl:rounded tpl:transition-colors",
					onClick: x(te, ["stop"])
				}, [N(b(de), {
					class: T(["tpl:transition-transform tpl:duration-150", { "tpl:rotate-90": j.value }]),
					size: 10,
					"stroke-width": 2
				}, null, 8, ["class"])])) : (c(), v("span", cr)),
				E("button", {
					class: "tpl:flex tpl:min-w-0 tpl:flex-1 tpl:items-center tpl:gap-1.5",
					onClick: n[0] ||= (t) => r("navigate", e.folder.id)
				}, [N(b(ge), {
					class: "tpl:shrink-0",
					size: 14,
					"stroke-width": 1.5
				}), l.value ? y("", !0) : (c(), v("span", lr, h(e.folder.name), 1))]),
				l.value ? i((c(), v("input", {
					key: 2,
					"onUpdate:modelValue": n[1] ||= (e) => d.value = e,
					type: "text",
					class: "tpl:min-w-0 tpl:flex-1 tpl:rounded tpl:border tpl:px-1.5 tpl:py-0.5 tpl:text-xs tpl:outline-none",
					style: {
						"border-color": "var(--tpl-primary)",
						"background-color": "var(--tpl-bg)",
						color: "var(--tpl-text)"
					},
					autofocus: "",
					onKeydown: [m(re, ["enter"]), m(ie, ["escape"])],
					onBlur: re,
					onClick: n[2] ||= x(() => {}, ["stop"])
				}, null, 544)), [[w, d.value]]) : y("", !0),
				l.value ? y("", !0) : (c(), v("span", ur, [
					D.value ? (c(), v("button", {
						key: 0,
						class: "tpl:flex tpl:size-6 tpl:items-center tpl:justify-center tpl:rounded tpl:transition-colors",
						title: b(o).mediaLibrary.addSubfolder,
						onClick: x(ae, ["stop"])
					}, [N(b(fe), {
						size: 12,
						"stroke-width": 2
					})], 8, dr)) : y("", !0),
					E("button", {
						class: "tpl:flex tpl:size-6 tpl:items-center tpl:justify-center tpl:rounded tpl:transition-colors",
						title: b(o).mediaLibrary.renameFolder,
						onClick: x(ne, ["stop"])
					}, [N(b(xe), {
						size: 12,
						"stroke-width": 2
					})], 8, fr),
					E("button", {
						class: "tpl:flex tpl:size-6 tpl:items-center tpl:justify-center tpl:rounded tpl:transition-colors",
						onClick: n[3] ||= x((t) => r("deleteFolder", e.folder.id), ["stop"])
					}, [N(b(_e), {
						size: 12,
						"stroke-width": 2,
						style: { color: "var(--tpl-danger)" }
					})])
				]))
			], 4), j.value ? (c(), v("div", pr, [(c(!0), v(A, null, u(e.folder.children, (t) => (c(), S(s, {
				key: t.id,
				folder: t,
				"current-folder-id": e.currentFolderId,
				depth: e.depth + 1,
				onNavigate: n[4] ||= (e) => r("navigate", e),
				onCreateFolder: n[5] ||= (e, t) => r("createFolder", e, t),
				onRenameFolder: n[6] ||= (e, t) => r("renameFolder", e, t),
				onDeleteFolder: n[7] ||= (e) => r("deleteFolder", e)
			}, null, 8, [
				"folder",
				"current-folder-id",
				"depth"
			]))), 128)), f.value ? (c(), v("div", {
				key: 0,
				style: k({ paddingLeft: `${(e.depth + 1) * 16 + 8}px` }),
				class: "tpl:py-1.5 tpl:pr-2"
			}, [i(E("input", {
				"onUpdate:modelValue": n[8] ||= (e) => g.value = e,
				type: "text",
				class: "tpl:w-full tpl:rounded tpl:border tpl:px-2 tpl:py-1 tpl:text-xs tpl:outline-none",
				style: {
					"border-color": "var(--tpl-primary)",
					"background-color": "var(--tpl-bg)",
					color: "var(--tpl-text)"
				},
				placeholder: b(o).mediaLibrary.subfolderName,
				autofocus: "",
				onKeydown: [m(P, ["enter"]), m(F, ["escape"])],
				onBlur: P
			}, null, 40, mr), [[w, g.value]])], 4)) : y("", !0)])) : y("", !0)]);
		};
	}
}), gr = { class: "tpl:flex tpl:h-full tpl:flex-col tpl:overflow-y-auto" }, _r = {
	key: 0,
	class: "tpl:px-3 tpl:py-2"
}, vr = ["placeholder"], yr = /* @__PURE__ */ M({
	__name: "MediaFolderTree",
	props: {
		folders: {},
		currentFolderId: {},
		viewMode: {},
		hasFrequentlyUsed: { type: Boolean }
	},
	emits: [
		"navigate",
		"createFolder",
		"renameFolder",
		"deleteFolder",
		"showFrequentlyUsed"
	],
	setup(e, { emit: t }) {
		let n = t, { t: r } = z(), a = p(!1), o = p("");
		function s() {
			a.value = !0, o.value = "";
		}
		function l() {
			o.value.trim() && n("createFolder", o.value.trim()), a.value = !1, o.value = "";
		}
		function d() {
			a.value = !1, o.value = "";
		}
		return (t, f) => (c(), v("div", gr, [
			E("button", {
				class: "tpl:flex tpl:w-full tpl:items-center tpl:gap-2 tpl:px-3 tpl:py-2 tpl:text-left tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
				style: k({
					backgroundColor: e.viewMode === "files" && e.currentFolderId === null ? "var(--tpl-bg-active)" : "transparent",
					color: e.viewMode === "files" && e.currentFolderId === null ? "var(--tpl-primary)" : "var(--tpl-text)"
				}),
				onClick: f[0] ||= (e) => n("navigate", null)
			}, [N(b(Ce), {
				size: 14,
				"stroke-width": 1.5
			}), j(" " + h(b(r).mediaLibrary.allFiles), 1)], 4),
			(c(!0), v(A, null, u(e.folders, (t) => (c(), S(hr, {
				key: t.id,
				folder: t,
				"current-folder-id": e.currentFolderId,
				depth: 0,
				onNavigate: f[1] ||= (e) => n("navigate", e),
				onCreateFolder: f[2] ||= (e, t) => n("createFolder", e, t),
				onRenameFolder: f[3] ||= (e, t) => n("renameFolder", e, t),
				onDeleteFolder: f[4] ||= (e) => n("deleteFolder", e)
			}, null, 8, ["folder", "current-folder-id"]))), 128)),
			a.value ? (c(), v("div", _r, [i(E("input", {
				"onUpdate:modelValue": f[5] ||= (e) => o.value = e,
				type: "text",
				class: "tpl:w-full tpl:rounded tpl:border tpl:px-2 tpl:py-1 tpl:text-xs tpl:outline-none",
				style: {
					"border-color": "var(--tpl-primary)",
					"background-color": "var(--tpl-bg)",
					color: "var(--tpl-text)"
				},
				placeholder: b(r).mediaLibrary.folderName,
				autofocus: "",
				onKeydown: [m(l, ["enter"]), m(d, ["escape"])],
				onBlur: l
			}, null, 40, vr), [[w, o.value]])])) : y("", !0),
			a.value ? y("", !0) : (c(), v("button", {
				key: 1,
				class: "tpl:flex tpl:w-full tpl:items-center tpl:gap-2 tpl:px-3 tpl:py-2 tpl:text-left tpl:text-xs tpl:transition-all tpl:duration-150",
				style: { color: "var(--tpl-text-muted)" },
				onClick: s
			}, [N(b(fe), {
				size: 14,
				"stroke-width": 1.5
			}), j(" " + h(b(r).mediaLibrary.newFolder), 1)])),
			f[7] ||= E("div", { class: "tpl:flex-1" }, null, -1),
			e.hasFrequentlyUsed ? (c(), v("button", {
				key: 2,
				class: "tpl:flex tpl:w-full tpl:items-center tpl:gap-2 tpl:border-t tpl:px-3 tpl:py-2 tpl:text-left tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
				style: k({
					borderColor: "var(--tpl-border)",
					backgroundColor: e.viewMode === "frequently-used" ? "var(--tpl-bg-active)" : "transparent",
					color: e.viewMode === "frequently-used" ? "var(--tpl-primary)" : "var(--tpl-text)"
				}),
				onClick: f[6] ||= (e) => n("showFrequentlyUsed")
			}, [N(b(se), {
				size: 14,
				"stroke-width": 1.5
			}), j(" " + h(b(r).mediaLibrary.frequentlyUsed), 1)], 4)) : y("", !0)
		]));
	}
}), br = { class: "tpl:flex tpl:aspect-square tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-2" }, xr = /* @__PURE__ */ M({
	__name: "MediaFileIcon",
	props: { mimeType: {} },
	setup(e) {
		let t = e, n = {
			"application/pdf": {
				label: "PDF",
				color: "#dc2626",
				bgColor: "#fef2f2",
				icon: "document"
			},
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
				label: "DOC",
				color: "#2563eb",
				bgColor: "#eff6ff",
				icon: "document"
			},
			"application/msword": {
				label: "DOC",
				color: "#2563eb",
				bgColor: "#eff6ff",
				icon: "document"
			},
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
				label: "XLS",
				color: "#16a34a",
				bgColor: "#f0fdf4",
				icon: "document"
			},
			"application/vnd.ms-excel": {
				label: "XLS",
				color: "#16a34a",
				bgColor: "#f0fdf4",
				icon: "document"
			},
			"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
				label: "PPT",
				color: "#ea580c",
				bgColor: "#fff7ed",
				icon: "document"
			},
			"application/vnd.ms-powerpoint": {
				label: "PPT",
				color: "#ea580c",
				bgColor: "#fff7ed",
				icon: "document"
			},
			"text/csv": {
				label: "CSV",
				color: "#16a34a",
				bgColor: "#f0fdf4",
				icon: "document"
			},
			"text/plain": {
				label: "TXT",
				color: "#6b7280",
				bgColor: "#f9fafb",
				icon: "document"
			},
			"video/mp4": {
				label: "MP4",
				color: "#9333ea",
				bgColor: "#faf5ff",
				icon: "video"
			},
			"video/quicktime": {
				label: "MOV",
				color: "#9333ea",
				bgColor: "#faf5ff",
				icon: "video"
			},
			"video/webm": {
				label: "WEBM",
				color: "#9333ea",
				bgColor: "#faf5ff",
				icon: "video"
			},
			"audio/mpeg": {
				label: "MP3",
				color: "#0d9488",
				bgColor: "#f0fdfa",
				icon: "audio"
			},
			"audio/wav": {
				label: "WAV",
				color: "#0d9488",
				bgColor: "#f0fdfa",
				icon: "audio"
			},
			"audio/ogg": {
				label: "OGG",
				color: "#0d9488",
				bgColor: "#f0fdfa",
				icon: "audio"
			}
		}, r = {
			label: "FILE",
			color: "#6b7280",
			bgColor: "#f9fafb",
			icon: "document"
		}, i = _(() => n[t.mimeType] ?? r);
		return (e, t) => (c(), v("div", br, [i.value.icon === "document" ? (c(), v("svg", {
			key: 0,
			width: "60",
			height: "60",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "1.5",
			style: k({ color: i.value.color })
		}, [...t[0] ||= [
			E("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }, null, -1),
			E("polyline", { points: "14 2 14 8 20 8" }, null, -1),
			E("line", {
				x1: "8",
				y1: "13",
				x2: "16",
				y2: "13"
			}, null, -1),
			E("line", {
				x1: "8",
				y1: "17",
				x2: "12",
				y2: "17"
			}, null, -1)
		]], 4)) : i.value.icon === "video" ? (c(), v("svg", {
			key: 1,
			width: "40",
			height: "40",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "1.5",
			style: k({ color: i.value.color })
		}, [...t[1] ||= [E("rect", {
			x: "2",
			y: "4",
			width: "20",
			height: "16",
			rx: "2"
		}, null, -1), E("polygon", {
			points: "10,8 16,12 10,16",
			fill: "currentColor",
			stroke: "none"
		}, null, -1)]], 4)) : (c(), v("svg", {
			key: 2,
			width: "40",
			height: "40",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "1.5",
			style: k({ color: i.value.color })
		}, [...t[2] ||= [
			E("path", { d: "M9 18V5l12-2v13" }, null, -1),
			E("circle", {
				cx: "6",
				cy: "18",
				r: "3"
			}, null, -1),
			E("circle", {
				cx: "18",
				cy: "16",
				r: "3"
			}, null, -1)
		]], 4)), E("span", {
			class: "tpl:text-xs tpl:font-bold tpl:tracking-wider",
			style: k({ color: i.value.color })
		}, h(i.value.label), 5)]));
	}
}), Sr = { class: "tpl:p-4" }, Cr = {
	key: 1,
	class: "tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:py-16"
}, wr = {
	class: "tpl:text-xs",
	style: { color: "var(--tpl-text-muted)" }
}, Tr = {
	key: 2,
	class: "tpl:grid tpl:grid-cols-4 tpl:gap-3"
}, Er = ["onClick"], Dr = { class: "tpl:aspect-square" }, Or = ["src", "alt"], kr = { class: "tpl:px-2 tpl:py-1.5" }, Ar = {
	class: "tpl:truncate tpl:text-[10px] tpl:font-medium",
	style: { color: "var(--tpl-text)" }
}, jr = {
	class: "tpl:flex tpl:justify-between tpl:text-[9px]",
	style: { color: "var(--tpl-text-muted)" }
}, Mr = { key: 0 }, Nr = { class: "tpl:absolute tpl:top-1.5 tpl:left-1.5 tpl:flex tpl:gap-1 tpl:opacity-0 tpl:transition-opacity tpl:duration-150 tpl:group-hover:opacity-100" }, Pr = ["title", "onClick"], Fr = ["title", "onClick"], Ir = {
	key: 0,
	class: "tpl:absolute tpl:top-1.5 tpl:right-1.5 tpl:flex tpl:size-5 tpl:items-center tpl:justify-center tpl:rounded-full tpl:text-white",
	style: { "background-color": "var(--tpl-primary)" }
}, Lr = {
	key: 3,
	class: "tpl:flex tpl:flex-col tpl:gap-1"
}, Rr = ["onClick"], zr = {
	class: "tpl:size-10 tpl:shrink-0 tpl:overflow-hidden tpl:rounded",
	style: { "background-color": "var(--tpl-bg-hover)" }
}, Br = ["src", "alt"], Vr = {
	key: 1,
	class: "tpl-list-icon tpl:size-full"
}, Hr = { class: "tpl:min-w-0 tpl:flex-1" }, Ur = {
	class: "tpl:truncate tpl:text-xs tpl:font-medium",
	style: { color: "var(--tpl-text)" }
}, Wr = {
	class: "tpl:text-[10px]",
	style: { color: "var(--tpl-text-muted)" }
}, Gr = { class: "tpl:flex tpl:gap-1 tpl:opacity-0 tpl:transition-opacity tpl:duration-150 tpl:group-hover:opacity-100" }, Kr = ["title", "onClick"], qr = ["title", "onClick"], Jr = {
	key: 0,
	class: "tpl:flex tpl:size-5 tpl:shrink-0 tpl:items-center tpl:justify-center tpl:rounded-full tpl:text-white",
	style: { "background-color": "var(--tpl-primary)" }
}, Yr = {
	key: 4,
	class: "tpl:flex tpl:justify-center tpl:py-4"
}, Xr = /*#__PURE__*/ we(/* @__PURE__ */ M({
	__name: "MediaGrid",
	props: {
		items: {},
		selectedIds: {},
		isLoading: { type: Boolean },
		hasMore: { type: Boolean },
		accept: {},
		layout: {}
	},
	emits: [
		"select",
		"toggle",
		"loadMore",
		"edit",
		"replace"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, { isAcceptedMimeType: i, isImageMimeType: a } = Ne();
		function o(e) {
			return !n.accept || n.accept.length === 0 || i(e.mime_type, n.accept);
		}
		function s(e) {
			r("select", e);
		}
		let { t: l } = z(), d = p(null);
		F(d, ([{ isIntersecting: e }]) => {
			e && n.hasMore && !n.isLoading && r("loadMore");
		}, { threshold: .1 });
		function f(e) {
			return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1048576).toFixed(1)} MB`;
		}
		function m(e) {
			return new Date(e).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		return (t, n) => (c(), v("div", Sr, [
			e.isLoading && e.items.length === 0 ? (c(), v("div", {
				key: 0,
				class: T(e.layout === "list" ? "tpl:flex tpl:flex-col tpl:gap-1" : "tpl:grid tpl:grid-cols-4 tpl:gap-3")
			}, [(c(), v(A, null, u(8, (t) => E("div", {
				key: t,
				class: T(["tpl-pulse tpl:rounded-lg", e.layout === "list" ? "tpl:h-12" : "tpl:aspect-square"]),
				style: { "background-color": "var(--tpl-bg-hover)" }
			}, null, 2)), 64))], 2)) : e.items.length === 0 ? (c(), v("div", Cr, [N(b(Ce), {
				class: "tpl:mb-3",
				size: 40,
				"stroke-width": 1,
				style: { color: "var(--tpl-text-dim)" }
			}), E("p", wr, h(b(l).mediaLibrary.noFiles), 1)])) : e.layout === "list" ? (c(), v("div", Lr, [(c(!0), v(A, null, u(e.items, (t) => (c(), v("div", {
				key: t.id,
				class: T(["tpl-media-list-item tpl:group tpl:flex tpl:cursor-pointer tpl:items-center tpl:gap-3 tpl:rounded-lg tpl:px-3 tpl:py-2 tpl:transition-all tpl:duration-150", [!o(t) && !e.selectedIds.has(t.id) ? "tpl:opacity-60" : ""]]),
				style: k({ backgroundColor: e.selectedIds.has(t.id) ? "var(--tpl-bg-hover)" : "transparent" }),
				onClick: (e) => s(t)
			}, [
				E("div", zr, [b(a)(t.mime_type) ? (c(), v("img", {
					key: 0,
					src: t.small_url || t.url,
					alt: t.filename,
					class: "tpl:size-full tpl:object-cover",
					loading: "lazy"
				}, null, 8, Br)) : (c(), v("div", Vr, [N(xr, { "mime-type": t.mime_type }, null, 8, ["mime-type"])]))]),
				E("div", Hr, [E("p", Ur, h(t.filename), 1), E("p", Wr, [j(h(f(t.size)) + " · " + h(m(t.created_at)) + " ", 1), b(a)(t.mime_type) && t.width && t.height ? (c(), v(A, { key: 0 }, [j(" · " + h(t.width) + "×" + h(t.height), 1)], 64)) : y("", !0)])]),
				E("div", Gr, [E("button", {
					class: "tpl:flex tpl:size-6 tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded",
					style: { color: "var(--tpl-text-muted)" },
					title: b(l).mediaLibrary.editFile,
					onClick: x((e) => r("edit", t), ["stop"])
				}, [N(b(xe), {
					size: 12,
					"stroke-width": 2
				})], 8, Kr), E("button", {
					class: "tpl:flex tpl:size-6 tpl:shrink-0 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded",
					style: { color: "var(--tpl-text-muted)" },
					title: b(l).mediaLibrary.replaceFile,
					onClick: x((e) => r("replace", t), ["stop"])
				}, [N(b(I), {
					size: 12,
					"stroke-width": 2
				})], 8, qr)]),
				e.selectedIds.has(t.id) ? (c(), v("div", Jr, [N(b(le), {
					size: 12,
					"stroke-width": 3
				})])) : y("", !0)
			], 14, Rr))), 128))])) : (c(), v("div", Tr, [(c(!0), v(A, null, u(e.items, (t) => (c(), v("div", {
				key: t.id,
				class: T(["tpl-media-item tpl:group tpl:relative tpl:overflow-hidden tpl:rounded-lg tpl:border-2 tpl:transition-all tpl:duration-150", [
					"tpl:cursor-pointer",
					!o(t) && !e.selectedIds.has(t.id) ? "tpl:opacity-60" : "",
					e.selectedIds.has(t.id) ? "tpl-media-item--selected" : ""
				]]),
				style: k({
					borderColor: e.selectedIds.has(t.id) ? "var(--tpl-primary)" : "transparent",
					backgroundColor: !o(t) && !e.selectedIds.has(t.id) ? "var(--tpl-bg)" : "var(--tpl-bg-hover)"
				}),
				onClick: (e) => s(t)
			}, [
				E("div", Dr, [b(a)(t.mime_type) ? (c(), v("img", {
					key: 0,
					src: t.small_url || t.url,
					alt: t.filename,
					class: "tpl:size-full tpl:object-cover",
					loading: "lazy"
				}, null, 8, Or)) : (c(), S(xr, {
					key: 1,
					"mime-type": t.mime_type
				}, null, 8, ["mime-type"]))]),
				E("div", kr, [E("p", Ar, h(t.filename), 1), E("p", jr, [E("span", null, h(f(t.size)), 1), b(a)(t.mime_type) && t.width && t.height ? (c(), v("span", Mr, h(t.width) + "×" + h(t.height), 1)) : y("", !0)])]),
				E("div", Nr, [E("button", {
					class: "tpl:flex tpl:size-6 tpl:items-center tpl:justify-center tpl:rounded-full tpl:text-white",
					style: { "background-color": "rgba(0, 0, 0, 0.6)" },
					title: b(l).mediaLibrary.editFile,
					onClick: x((e) => r("edit", t), ["stop"])
				}, [N(b(xe), {
					size: 11,
					"stroke-width": 2
				})], 8, Pr), E("button", {
					class: "tpl:flex tpl:size-6 tpl:items-center tpl:justify-center tpl:rounded-full tpl:text-white",
					style: { "background-color": "rgba(0, 0, 0, 0.6)" },
					title: b(l).mediaLibrary.replaceFile,
					onClick: x((e) => r("replace", t), ["stop"])
				}, [N(b(I), {
					size: 11,
					"stroke-width": 2
				})], 8, Fr)]),
				e.selectedIds.has(t.id) ? (c(), v("div", Ir, [N(b(le), {
					size: 12,
					"stroke-width": 3
				})])) : y("", !0)
			], 14, Er))), 128))])),
			E("div", {
				ref_key: "sentinelRef",
				ref: d,
				class: "tpl:h-4"
			}, null, 512),
			e.isLoading && e.items.length > 0 ? (c(), v("div", Yr, [N(b(he), {
				class: "tpl-spinner",
				size: 20,
				"stroke-width": 2,
				style: { color: "var(--tpl-primary)" }
			})])) : y("", !0)
		]));
	}
}), [["__scopeId", "data-v-78d7ed75"]]), Zr = ["data-tpl-theme"], Qr = {
	class: "tpl:mx-4 tpl:w-full tpl:max-w-sm tpl:rounded-lg tpl:p-5 tpl:shadow-xl",
	style: { "background-color": "var(--tpl-bg-elevated)" }
}, $r = {
	class: "tpl:mb-4 tpl:text-sm tpl:font-semibold",
	style: { color: "var(--tpl-text)" }
}, ei = { class: "tpl:mb-3" }, ti = ["placeholder", "disabled"], ni = {
	key: 0,
	class: "tpl:mb-3 tpl:text-xs",
	style: { color: "var(--tpl-danger)" }
}, ri = { class: "tpl:flex tpl:justify-end tpl:gap-2" }, ii = ["disabled"], ai = ["disabled"], oi = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:gap-1.5"
}, si = { key: 1 }, ci = /* @__PURE__ */ M({
	__name: "MediaImportUrlModal",
	props: {
		visible: { type: Boolean },
		isImporting: { type: Boolean },
		error: {}
	},
	emits: ["import", "close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: a } = z(), o = d("tplUiTheme"), s = d(ze, p(null)), l = p("");
		te(() => n.visible, (e) => {
			e && (l.value = "");
		});
		function u() {
			let e = l.value.trim();
			!e || n.isImporting || r("import", e);
		}
		function m() {
			n.isImporting || r("close");
		}
		function _(e) {
			e.key === "Enter" && (e.preventDefault(), u()), e.key === "Escape" && m();
		}
		return (t, n) => (c(), S(g, { to: b(s) || "body" }, [N(C, {
			"enter-active-class": "tpl:transition tpl:ease-out tpl:duration-150",
			"enter-from-class": "tpl:opacity-0",
			"enter-to-class": "tpl:opacity-100",
			"leave-active-class": "tpl:transition tpl:ease-in tpl:duration-100",
			"leave-from-class": "tpl:opacity-100",
			"leave-to-class": "tpl:opacity-0"
		}, {
			default: f(() => [e.visible ? (c(), v("div", {
				key: 0,
				"data-tpl-theme": b(o),
				class: "tpl tpl:fixed tpl:inset-0 tpl:z-[10000] tpl:flex tpl:items-center tpl:justify-center",
				style: { "background-color": "var(--tpl-overlay)" },
				onClick: x(m, ["self"]),
				onKeydown: _
			}, [E("div", Qr, [
				E("h3", $r, h(b(a).mediaLibrary.importFromUrl), 1),
				E("div", ei, [i(E("input", {
					"onUpdate:modelValue": n[0] ||= (e) => l.value = e,
					type: "url",
					class: "tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:outline-none",
					style: {
						"border-color": "var(--tpl-border)",
						"background-color": "var(--tpl-bg)",
						color: "var(--tpl-text)"
					},
					placeholder: b(a).mediaLibrary.importUrlPlaceholder,
					disabled: e.isImporting,
					autofocus: ""
				}, null, 8, ti), [[w, l.value]])]),
				e.error ? (c(), v("p", ni, h(e.error), 1)) : y("", !0),
				E("div", ri, [E("button", {
					class: T(["tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150", { "tpl:cursor-not-allowed tpl:opacity-50": e.isImporting }]),
					style: {
						"border-color": "var(--tpl-border)",
						color: "var(--tpl-text)",
						"background-color": "var(--tpl-bg)"
					},
					disabled: e.isImporting,
					onClick: m
				}, h(b(a).mediaLibrary.cancel), 11, ii), E("button", {
					class: "tpl:cursor-pointer tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:text-white tpl:transition-all tpl:duration-150 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50",
					style: { background: "linear-gradient(\n                  135deg,\n                  var(--tpl-primary),\n                  var(--tpl-primary-hover)\n                )" },
					disabled: !l.value.trim() || e.isImporting,
					onClick: u
				}, [e.isImporting ? (c(), v("span", oi, [N(b(he), {
					class: "tpl:animate-spin",
					size: 12,
					"stroke-width": 2
				}), j(" " + h(b(a).mediaLibrary.importing), 1)])) : (c(), v("span", si, h(b(a).mediaLibrary.import), 1))], 8, ai)])
			])], 40, Zr)) : y("", !0)]),
			_: 1
		})], 8, ["to"]));
	}
}), li = { class: "tpl:max-h-56 tpl:overflow-y-auto tpl:py-1" }, ui = ["disabled", "onClick"], di = { class: "tpl:truncate" }, fi = {
	key: 0,
	class: "tpl:shrink-0",
	style: { color: "var(--tpl-text-dim)" }
}, pi = /* @__PURE__ */ M({
	__name: "MediaMovePicker",
	props: {
		folders: {},
		currentFolderId: {}
	},
	emits: ["select", "close"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = z(), i = p(null);
		function a(e, t = 0) {
			let n = [];
			for (let r of e) n.push({
				id: r.id,
				name: r.name,
				depth: t
			}), r.children?.length && n.push(...a(r.children, t + 1));
			return n;
		}
		return oe(i, () => {
			n("close");
		}), (t, o) => (c(), v("div", {
			ref_key: "pickerRef",
			ref: i,
			class: "tpl:absolute tpl:bottom-full tpl:left-0 tpl:z-10 tpl:mb-2 tpl:w-56 tpl:overflow-hidden tpl:rounded-lg tpl:border tpl:shadow-lg",
			style: {
				"border-color": "var(--tpl-border)",
				"background-color": "var(--tpl-bg-elevated)"
			}
		}, [E("div", li, [e.currentFolderId === null ? y("", !0) : (c(), v("button", {
			key: 0,
			class: "tpl:flex tpl:w-full tpl:items-center tpl:gap-1.5 tpl:px-3 tpl:py-1.5 tpl:text-left tpl:text-xs tpl:transition-colors tpl:duration-100",
			style: { color: "var(--tpl-text)" },
			onClick: o[0] ||= (e) => n("select", null)
		}, [N(b(Ce), {
			class: "tpl:shrink-0",
			size: 14,
			"stroke-width": 1.5
		}), j(" " + h(b(r).mediaLibrary.moveToRoot), 1)])), (c(!0), v(A, null, u(a(e.folders), (t) => (c(), v("button", {
			key: t.id,
			class: "tpl:flex tpl:w-full tpl:items-center tpl:gap-1.5 tpl:py-1.5 tpl:pr-3 tpl:text-left tpl:text-xs tpl:transition-colors tpl:duration-100",
			style: k({
				paddingLeft: `${t.depth * 16 + 12}px`,
				color: t.id === e.currentFolderId ? "var(--tpl-text-dim)" : "var(--tpl-text)",
				opacity: t.id === e.currentFolderId ? .5 : 1
			}),
			disabled: t.id === e.currentFolderId,
			onClick: (e) => n("select", t.id)
		}, [
			N(b(ge), {
				class: "tpl:shrink-0",
				size: 14,
				"stroke-width": 1.5
			}),
			E("span", di, h(t.name), 1),
			t.id === e.currentFolderId ? (c(), v("span", fi, h(b(r).mediaLibrary.currentFolder), 1)) : y("", !0)
		], 12, ui))), 128))])], 512));
	}
}), mi = { class: "tpl:flex tpl:items-center tpl:gap-3" }, hi = ["src", "alt"], gi = {
	key: 1,
	class: "tpl:flex tpl:size-10 tpl:shrink-0 tpl:items-center tpl:justify-center tpl:overflow-hidden tpl:rounded",
	style: { border: "1px solid var(--tpl-border)" }
}, _i = { class: "tpl:min-w-0 tpl:flex-1" }, vi = {
	class: "tpl:truncate tpl:text-xs tpl:font-medium",
	style: { color: "var(--tpl-text)" }
}, yi = {
	class: "tpl:mt-0.5 tpl:text-[10px]",
	style: { color: "var(--tpl-text-muted)" }
}, bi = {
	key: 2,
	class: "tpl:shrink-0"
}, xi = {
	class: "tpl:block tpl:text-[10px]",
	style: { color: "var(--tpl-text-muted)" }
}, Si = ["value"], Ci = ["value"], wi = /*#__PURE__*/ we(/* @__PURE__ */ M({
	__name: "MediaPreviewPanel",
	props: {
		item: {},
		folders: {},
		selectedConversion: {}
	},
	emits: ["update:selectedConversion"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = z(), { isImageMimeType: a } = Ne(), o = _(() => {
			if (!m.value || !n.item.conversions_generated) return [];
			let e = [];
			return n.item.small_url && e.push({
				value: "small",
				label: i.mediaLibrary.conversionSmall,
				url: n.item.small_url
			}), n.item.medium_url && e.push({
				value: "medium",
				label: i.mediaLibrary.conversionMedium,
				url: n.item.medium_url
			}), n.item.large_url && e.push({
				value: "large",
				label: i.mediaLibrary.conversionLarge,
				url: n.item.large_url
			}), e.push({
				value: "original",
				label: i.mediaLibrary.conversionOriginal,
				url: n.item.url
			}), e;
		}), s = _(() => m.value && o.value.length > 1), l = _(() => {
			if (!m.value) return null;
			switch (n.selectedConversion) {
				case "small": return n.item.small_url || n.item.url;
				case "medium": return n.item.medium_url || n.item.url;
				case "large": return n.item.large_url || n.item.url;
				default: return n.item.url;
			}
		});
		function d(e) {
			let t = e.target;
			r("update:selectedConversion", t.value);
		}
		function f(e, t, n = []) {
			for (let r of e) {
				let e = [...n, r.name];
				if (r.id === t) return e;
				if (r.children) {
					let n = f(r.children, t, e);
					if (n) return n;
				}
			}
			return null;
		}
		let p = _(() => {
			if (!n.item.folder_id || !n.folders) return null;
			let e = f(n.folders, n.item.folder_id);
			return e ? e.join("/") : null;
		}), m = _(() => a(n.item.mime_type));
		function g(e) {
			return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1048576).toFixed(1)} MB`;
		}
		function x(e) {
			return new Date(e).toLocaleDateString(void 0, {
				year: "numeric",
				month: "short",
				day: "numeric"
			});
		}
		return (t, n) => (c(), v("div", mi, [
			m.value ? (c(), v("img", {
				key: 0,
				src: l.value ?? void 0,
				alt: e.item.alt_text || e.item.filename,
				class: "tpl:size-10 tpl:shrink-0 tpl:rounded tpl:object-cover",
				style: { border: "1px solid var(--tpl-border)" }
			}, null, 8, hi)) : (c(), v("div", gi, [N(xr, {
				"mime-type": e.item.mime_type,
				class: "tpl-preview-icon"
			}, null, 8, ["mime-type"])])),
			E("div", _i, [
				E("p", vi, h(e.item.filename), 1),
				E("p", yi, [
					j(h(g(e.item.size)) + " · " + h(x(e.item.created_at)) + " ", 1),
					m.value && e.item.width && e.item.height ? (c(), v(A, { key: 0 }, [j(" · " + h(e.item.width) + "×" + h(e.item.height) + "px ", 1)], 64)) : y("", !0),
					p.value ? (c(), v(A, { key: 1 }, [
						n[0] ||= j(" · ", -1),
						N(b(ge), {
							class: "tpl:mb-px tpl:inline",
							size: 9,
							"stroke-width": 2
						}),
						j(" " + h(p.value), 1)
					], 64)) : y("", !0)
				]),
				m.value ? (c(), v("p", {
					key: 0,
					class: T(["tpl:mt-0.5 tpl:truncate tpl:text-[10px] tpl:italic", { "tpl:invisible": !e.item.alt_text }]),
					style: { color: "var(--tpl-text-dim)" }
				}, h(e.item.alt_text || "\xA0"), 3)) : y("", !0)
			]),
			s.value ? (c(), v("div", bi, [E("label", xi, h(b(i).mediaLibrary.conversionLabel), 1), E("select", {
				class: "tpl:mt-0.5 tpl:rounded-md tpl:border tpl:py-1 tpl:pr-6 tpl:pl-2 tpl:text-xs tpl:outline-none",
				style: {
					"border-color": "var(--tpl-border)",
					"background-color": "var(--tpl-bg)",
					color: "var(--tpl-text)"
				},
				value: e.selectedConversion,
				onChange: d
			}, [(c(!0), v(A, null, u(o.value, (e) => (c(), v("option", {
				key: e.value,
				value: e.value
			}, h(e.label), 9, Ci))), 128))], 40, Si)])) : y("", !0)
		]));
	}
}), [["__scopeId", "data-v-56be5670"]]), Ti = ["data-tpl-theme"], Ei = {
	class: "tpl:mx-4 tpl:w-full tpl:max-w-sm tpl:rounded-lg tpl:p-5 tpl:shadow-xl",
	style: { "background-color": "var(--tpl-bg-elevated)" }
}, Di = {
	class: "tpl:mb-2 tpl:text-sm tpl:font-semibold",
	style: { color: "var(--tpl-text)" }
}, Oi = {
	class: "tpl:mb-2 tpl:text-xs",
	style: { color: "var(--tpl-text-muted)" }
}, ki = {
	key: 0,
	class: "tpl:mb-3 tpl:text-xs",
	style: { color: "var(--tpl-warning)" }
}, Ai = {
	class: "tpl:mb-3 tpl:rounded tpl:border tpl:p-2",
	style: { "border-color": "var(--tpl-border)" }
}, ji = {
	class: "tpl:truncate tpl:text-xs tpl:font-medium",
	style: { color: "var(--tpl-text)" }
}, Mi = { class: "tpl:mb-4" }, Ni = {
	class: "tpl:mb-1 tpl:block tpl:text-xs tpl:font-medium",
	style: { color: "var(--tpl-text-muted)" }
}, Pi = ["accept"], Fi = {
	key: 1,
	class: "tpl:mb-3 tpl:text-xs",
	style: { color: "var(--tpl-danger)" }
}, Ii = { class: "tpl:flex tpl:justify-end tpl:gap-2" }, Li = ["disabled"], Ri = ["disabled"], zi = /* @__PURE__ */ M({
	__name: "MediaReplaceModal",
	props: {
		visible: { type: Boolean },
		item: {},
		usageInfo: {},
		isReplacing: { type: Boolean },
		error: {}
	},
	emits: ["replace", "close"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = z(), a = d("tplUiTheme"), o = d(ze, p(null)), s = p(null), l = p(null), u = _(() => {
			if (!n.item) return "";
			let e = n.item.filename.split(".");
			return e.length > 1 ? e[e.length - 1].toLowerCase() : "";
		}), m = _(() => u.value ? `.${u.value}` : "*"), w = _(() => (n.usageInfo?.template_count ?? 0) > 0);
		te(() => n.visible, (e) => {
			e || (l.value = null, s.value && (s.value.value = ""));
		});
		function T(e) {
			let t = e.target;
			t.files && t.files.length > 0 && (l.value = t.files[0]);
		}
		function D() {
			l.value && r("replace", l.value);
		}
		function O(e) {
			e.key === "Escape" && r("close");
		}
		return (t, n) => (c(), S(g, { to: b(o) || "body" }, [N(C, {
			"enter-active-class": "tpl:transition tpl:ease-out tpl:duration-150",
			"enter-from-class": "tpl:opacity-0",
			"enter-to-class": "tpl:opacity-100",
			"leave-active-class": "tpl:transition tpl:ease-in tpl:duration-100",
			"leave-from-class": "tpl:opacity-100",
			"leave-to-class": "tpl:opacity-0"
		}, {
			default: f(() => [e.visible && e.item ? (c(), v("div", {
				key: 0,
				"data-tpl-theme": b(a),
				class: "tpl tpl:fixed tpl:inset-0 tpl:z-[10000] tpl:flex tpl:items-center tpl:justify-center",
				style: { "background-color": "var(--tpl-overlay)" },
				onClick: n[1] ||= x((e) => r("close"), ["self"]),
				onKeydown: O
			}, [E("div", Ei, [
				E("h3", Di, h(b(i).mediaLibrary.replaceWarningTitle), 1),
				E("p", Oi, h(b(i).mediaLibrary.replaceWarningMessage.replace("{extension}", `.${u.value}`)), 1),
				w.value ? (c(), v("p", ki, h(b(i).mediaLibrary.replaceWarningUsageNote.replace("{count}", e.usageInfo.template_count.toString())), 1)) : y("", !0),
				E("div", Ai, [E("p", ji, h(e.item.filename), 1)]),
				E("div", Mi, [E("label", Ni, h(b(i).mediaLibrary.replaceSelectFile), 1), E("input", {
					ref_key: "fileInputRef",
					ref: s,
					type: "file",
					accept: m.value,
					class: "tpl:w-full tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs",
					style: {
						"border-color": "var(--tpl-border)",
						"background-color": "var(--tpl-bg)",
						color: "var(--tpl-text)"
					},
					onChange: T
				}, null, 40, Pi)]),
				e.error ? (c(), v("p", Fi, h(e.error), 1)) : y("", !0),
				E("div", Ii, [E("button", {
					class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
					style: {
						"border-color": "var(--tpl-border)",
						color: "var(--tpl-text)",
						"background-color": "var(--tpl-bg)"
					},
					disabled: e.isReplacing,
					onClick: n[0] ||= (e) => r("close")
				}, h(b(i).mediaLibrary.cancel), 9, Li), E("button", {
					class: "tpl:cursor-pointer tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:text-white tpl:transition-all tpl:duration-150 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50",
					style: { background: "linear-gradient(\n                  135deg,\n                  var(--tpl-primary),\n                  var(--tpl-primary-hover)\n                )" },
					disabled: !l.value || e.isReplacing,
					onClick: D
				}, h(e.isReplacing ? b(i).mediaLibrary.replacing : b(i).mediaLibrary.replace), 9, Ri)])
			])], 40, Ti)) : y("", !0)]),
			_: 1
		})], 8, ["to"]));
	}
}), Bi = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:gap-2"
}, Vi = {
	class: "tpl:text-xs",
	style: { color: "var(--tpl-text-muted)" }
}, Hi = {
	class: "tpl:text-xs",
	style: { color: "var(--tpl-text-muted)" }
}, Ui = {
	class: "tpl:mt-1 tpl:text-[10px]",
	style: { color: "var(--tpl-text-dim)" }
}, Wi = /* @__PURE__ */ M({
	__name: "MediaUploadZone",
	props: {
		isUploading: { type: Boolean },
		uploadProgress: {}
	},
	emits: ["upload"],
	setup(e, { emit: t }) {
		let n = t, { t: r, format: i } = z(), { allAcceptedMimeTypes: a, allAcceptedInputString: o, maxFileSize: s } = Ne(), l = p();
		function u(e) {
			let t = [];
			for (let n of Array.from(e)) a.value.includes(n.type) && n.size <= s.value && t.push(n);
			return t;
		}
		function d(e) {
			let t = u(e);
			t.length && n("upload", t);
		}
		let { isOverDropZone: f } = P(l, { onDrop: (e) => {
			e?.length && d(e);
		} }), { open: m, onChange: g } = ae({
			accept: o.value,
			multiple: !0
		});
		return g((e) => {
			e?.length && d(e);
		}), (t, n) => (c(), v("div", {
			ref_key: "dropZoneRef",
			ref: l,
			class: T(["tpl-upload-zone tpl:flex tpl:cursor-pointer tpl:flex-col tpl:items-center tpl:justify-center tpl:rounded-lg tpl:border-2 tpl:border-dashed tpl:p-5 tpl:text-center tpl:transition-all tpl:duration-150", b(f) ? "tpl-upload-zone-active" : ""]),
			style: {
				"border-color": "var(--tpl-border-light)",
				"background-color": "var(--tpl-bg)"
			},
			onClick: n[0] ||= (e) => b(m)()
		}, [e.isUploading ? (c(), v("div", Bi, [N(b(he), {
			class: "tpl-spinner",
			size: 20,
			"stroke-width": 2,
			style: { color: "var(--tpl-primary)" }
		}), E("span", Vi, h(e.uploadProgress && e.uploadProgress.total > 1 ? b(i)(b(r).mediaLibrary.uploadingProgress, {
			current: e.uploadProgress.current,
			total: e.uploadProgress.total
		}) : b(r).mediaLibrary.uploading), 1)])) : (c(), v(A, { key: 1 }, [
			N(b(Se), {
				class: "tpl:mb-2",
				size: 24,
				"stroke-width": 1.5,
				style: { color: "var(--tpl-text-dim)" }
			}),
			E("p", Hi, h(b(r).mediaLibrary.dropOrClick), 1),
			E("p", Ui, h(b(r).mediaLibrary.acceptedFormats), 1)
		], 64))], 2));
	}
}), Gi = [
	"width",
	"height",
	"viewBox"
], Ki = [
	"cx",
	"cy",
	"r",
	"stroke-width"
], qi = [
	"cx",
	"cy",
	"r",
	"stroke-width",
	"stroke",
	"stroke-dasharray",
	"stroke-dashoffset"
], Ji = {
	key: 0,
	class: "tpl:absolute tpl:top-full tpl:left-1/2 tpl:z-50 tpl:mt-2 tpl:-translate-x-1/2 tpl:rounded-md tpl:px-2.5 tpl:py-1.5 tpl:text-xs tpl:whitespace-nowrap tpl:shadow-lg",
	style: {
		"background-color": "var(--tpl-text)",
		color: "var(--tpl-bg-elevated)"
	}
}, Yi = /* @__PURE__ */ M({
	__name: "StorageProgressRing",
	props: {
		usedBytes: {},
		limitBytes: {},
		size: {}
	},
	setup(e) {
		let t = e, { t: n, format: r } = z(), i = p(!1), a = _(() => t.size ?? 24), o = _(() => Math.max(2, a.value / 8)), s = _(() => (a.value - o.value) / 2), l = _(() => 2 * Math.PI * s.value), u = _(() => t.limitBytes <= 0 ? 0 : Math.min(100, t.usedBytes / t.limitBytes * 100)), d = _(() => l.value - u.value / 100 * l.value), m = _(() => u.value >= 95 ? "var(--tpl-danger)" : u.value >= 75 ? "var(--tpl-warning, #f59e0b)" : "var(--tpl-primary)");
		function g(e) {
			if (e === 0) return "0 B";
			let t = 1024, n = [
				"B",
				"KB",
				"MB",
				"GB"
			], r = Math.floor(Math.log(e) / Math.log(t));
			return `${(e / t ** r).toFixed(+(r >= 2))} ${n[r]}`;
		}
		let b = _(() => g(t.usedBytes)), x = _(() => g(t.limitBytes)), S = _(() => Math.max(0, t.limitBytes - t.usedBytes)), w = _(() => g(S.value)), T = _(() => r(n.mediaLibrary.storageTooltip, {
			used: b.value,
			total: x.value,
			remaining: w.value
		}));
		return (e, t) => (c(), v("div", {
			class: "tpl:relative tpl:inline-flex tpl:cursor-help tpl:items-center tpl:justify-center",
			onMouseenter: t[0] ||= (e) => i.value = !0,
			onMouseleave: t[1] ||= (e) => i.value = !1
		}, [(c(), v("svg", {
			width: a.value,
			height: a.value,
			class: "tpl:-rotate-90",
			viewBox: `0 0 ${a.value} ${a.value}`
		}, [E("circle", {
			cx: a.value / 2,
			cy: a.value / 2,
			r: s.value,
			fill: "none",
			"stroke-width": o.value,
			style: { stroke: "var(--tpl-border)" }
		}, null, 8, Ki), E("circle", {
			cx: a.value / 2,
			cy: a.value / 2,
			r: s.value,
			fill: "none",
			"stroke-width": o.value,
			stroke: m.value,
			"stroke-linecap": "round",
			"stroke-dasharray": l.value,
			"stroke-dashoffset": d.value,
			class: "tpl:transition-all tpl:duration-300 tpl:ease-out"
		}, null, 8, qi)], 8, Gi)), N(C, {
			"enter-active-class": "tpl:transition tpl:ease-out tpl:duration-150",
			"enter-from-class": "tpl:opacity-0 tpl:translate-y-1",
			"enter-to-class": "tpl:opacity-100 tpl:translate-y-0",
			"leave-active-class": "tpl:transition tpl:ease-in tpl:duration-100",
			"leave-from-class": "tpl:opacity-100 tpl:translate-y-0",
			"leave-to-class": "tpl:opacity-0 tpl:translate-y-1"
		}, {
			default: f(() => [i.value ? (c(), v("div", Ji, [j(h(T.value) + " ", 1), t[2] ||= E("div", {
				class: "tpl:absolute tpl:-top-1 tpl:left-1/2 tpl:size-2 tpl:-translate-x-1/2 tpl:rotate-45",
				style: { "background-color": "var(--tpl-text)" }
			}, null, -1)])) : y("", !0)]),
			_: 1
		})], 32));
	}
});
//#endregion
//#region ../media-library/src/composables/useMediaLibraryUI.ts
function Xi(e) {
	let { library: t, canUseMediaFolders: n, translations: r } = e;
	function i() {
		return "value" in r && typeof r.value == "object" ? r.value : r;
	}
	let a = p("grid"), o = p(!1), s = p(""), c = p("original"), l = p(null), u = p(!1), d = p(!1), f = _(() => {
		let e = t.previewItem.value;
		if (!e) return null;
		switch (c.value) {
			case "small": return e.small_url || e.url;
			case "medium": return e.medium_url || e.url;
			case "large": return e.large_url || e.url;
			default: return e.url;
		}
	}), m = _(() => t.frequentlyUsedItems.value.length > 0), h = _(() => t.viewMode.value === "frequently-used" ? t.frequentlyUsedItems.value : t.items.value), g = _(() => Object.values(t.deleteUsageInfo.value).some((e) => e.template_count > 0)), v = {
		images: () => i().mediaLibrary.filterImages,
		documents: () => i().mediaLibrary.filterDocuments,
		videos: () => i().mediaLibrary.filterVideos,
		audio: () => i().mediaLibrary.filterAudio
	};
	function y(e) {
		return v[e]?.() ?? e;
	}
	te(o, (e) => {
		e && n.value && t.loadFolders();
	}), te(() => t.previewItem.value?.id, () => {
		c.value = "original";
	});
	let b = ne((e) => {
		t.search(e);
	}, 300);
	function x(e) {
		s.value = e, b(e);
	}
	let { copy: S, copied: C } = ie({
		copiedDuring: 2e3,
		legacy: !0
	});
	async function w(e) {
		await t.uploadFiles(e);
	}
	function T(e) {
		t.selectItem(e);
	}
	async function E(e, n) {
		await t.createFolder(e, n);
	}
	async function D(e, n) {
		await t.renameFolder(e, n);
	}
	async function O(e) {
		await t.deleteFolder(e);
	}
	function k(e) {
		l.value = e;
	}
	async function ee(e, n, r, i) {
		i && await t.replaceMediaDirectly(e, i.file), await t.updateFile(e, n, r), l.value = null;
	}
	async function A(e) {
		await t.importFromUrl(e) && (u.value = !1);
	}
	async function j(e) {
		d.value = !1, await t.moveSelected(e);
	}
	async function M() {
		await t.checkUsageBeforeDelete();
	}
	function N(e) {
		t.checkUsageBeforeReplace(e);
	}
	async function re(e) {
		await t.replaceFile(e);
	}
	function ae() {
		t.clearSelection(), t.cancelDelete(), t.cancelReplace(), s.value = "", t.categoryFilter.value = null, t.sortOption.value = "newest", t.viewMode.value = "files", l.value = null, u.value = !1, c.value = "original";
	}
	return {
		layoutMode: a,
		showSidebar: o,
		searchInput: s,
		selectedConversion: c,
		editingItem: l,
		showImportUrlModal: u,
		showMovePicker: d,
		selectedUrl: f,
		hasFrequentlyUsed: m,
		displayItems: h,
		hasUsedFiles: g,
		copy: S,
		copied: C,
		getCategoryLabel: y,
		handleSearchInput: x,
		handleUpload: w,
		handleSelect: T,
		handleCreateFolder: E,
		handleRenameFolder: D,
		handleDeleteFolder: O,
		handleEditItem: k,
		handleEditSave: ee,
		handleImportFromUrl: A,
		handleMoveToFolder: j,
		handleDeleteClick: M,
		handleReplaceItem: N,
		handleReplaceFile: re,
		resetUI: ae
	};
}
//#endregion
//#region ../media-library/src/components/MediaLibraryModal.vue?vue&type=script&setup=true&lang.ts
var Zi = ["data-tpl-theme"], Qi = {
	class: "tpl-media-modal tpl-scale-in tpl:flex tpl:flex-col tpl:overflow-hidden tpl:rounded-[var(--tpl-radius-lg)]",
	style: {
		width: "900px",
		height: "650px",
		"max-width": "95vw",
		"max-height": "90vh",
		"background-color": "var(--tpl-bg-elevated)",
		border: "1px solid var(--tpl-border)",
		"box-shadow": "var(--tpl-shadow-xl)"
	}
}, $i = {
	class: "tpl:flex tpl:shrink-0 tpl:items-center tpl:justify-between tpl:border-b tpl:px-5 tpl:py-3.5",
	style: { "border-color": "var(--tpl-border)" }
}, ea = {
	class: "tpl:text-sm tpl:font-semibold",
	style: { color: "var(--tpl-text)" }
}, ta = { class: "tpl:flex tpl:items-center tpl:gap-3" }, na = { class: "tpl:relative" }, ra = ["value", "placeholder"], ia = { class: "tpl:flex tpl:min-h-0 tpl:flex-1 tpl:overflow-hidden" }, aa = {
	key: 0,
	class: "tpl:flex tpl:w-48 tpl:shrink-0 tpl:flex-col tpl:border-r",
	style: {
		"border-color": "var(--tpl-border)",
		"background-color": "var(--tpl-bg)"
	}
}, oa = { class: "tpl:flex tpl:min-w-0 tpl:flex-1 tpl:flex-col" }, sa = {
	class: "tpl:flex tpl:shrink-0 tpl:items-center tpl:justify-between tpl:border-b tpl:px-4 tpl:py-2.5",
	style: { "border-color": "var(--tpl-border)" }
}, ca = { class: "tpl:flex tpl:items-center tpl:gap-2" }, la = ["title"], ua = {
	key: 1,
	class: "tpl:text-xs tpl:font-medium",
	style: { color: "var(--tpl-text)" }
}, da = {
	class: "tpl:flex tpl:rounded-md tpl:p-0.5",
	style: {
		border: "1px solid var(--tpl-border)",
		"background-color": "var(--tpl-bg)"
	}
}, fa = ["title"], pa = ["title"], ma = { class: "tpl:flex tpl:items-center tpl:gap-2" }, ha = ["value"], ga = { value: "" }, _a = ["value"], va = ["value"], ya = { value: "newest" }, ba = { value: "oldest" }, xa = { value: "name_asc" }, Sa = { value: "name_desc" }, Ca = { value: "size_asc" }, wa = { value: "size_desc" }, Ta = { class: "tpl:min-h-0 tpl:flex-1 tpl:overflow-y-auto" }, Ea = {
	key: 0,
	class: "tpl:px-4 tpl:pt-3"
}, Da = {
	class: "tpl-scale-in tpl:mx-4 tpl:w-full tpl:max-w-sm tpl:rounded-[var(--tpl-radius-lg)] tpl:p-5",
	style: {
		"background-color": "var(--tpl-bg-elevated)",
		"box-shadow": "var(--tpl-shadow-xl)"
	}
}, Oa = {
	class: "tpl:mb-2 tpl:text-sm tpl:font-semibold",
	style: { color: "var(--tpl-text)" }
}, ka = {
	key: 0,
	class: "tpl:mb-4 tpl:text-xs",
	style: { color: "var(--tpl-text-muted)" }
}, Aa = {
	key: 1,
	class: "tpl:mb-4 tpl:max-h-32 tpl:overflow-y-auto tpl:rounded tpl:border tpl:p-2",
	style: { "border-color": "var(--tpl-border)" }
}, ja = { class: "tpl:font-medium" }, Ma = { style: { color: "var(--tpl-text-muted)" } }, Na = { class: "tpl:flex tpl:justify-end tpl:gap-2" }, Pa = {
	class: "tpl:flex tpl:shrink-0 tpl:items-center tpl:justify-between tpl:border-t tpl:px-5 tpl:py-3",
	style: { "border-color": "var(--tpl-border)" }
}, Fa = { class: "tpl:flex tpl:min-w-0 tpl:flex-1 tpl:items-center tpl:gap-3" }, Ia = { class: "tpl:flex tpl:items-center tpl:gap-5" }, La = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:gap-2"
}, Ra = {
	key: 1,
	class: "tpl:relative"
}, za = { class: "tpl:flex tpl:items-center tpl:gap-2" }, Ba = ["disabled"], Va = /* @__PURE__ */ M({
	__name: "MediaLibraryModal",
	props: {
		visible: { type: Boolean },
		accept: {},
		popoverTarget: {}
	},
	emits: ["close", "select"],
	setup(e, { emit: t }) {
		let n = e, r = t, { t: i } = z(), a = d("tplUiTheme"), o = ee(() => n.popoverTarget ?? null);
		l(ze, o);
		let s = d("authManager"), p = d("projectId"), m = _(() => p.value), w = d("planConfig"), D = _(() => w.hasFeature("media_folders")), O = _(() => w.hasFeature("import_from_url")), M = _(() => w.config.value?.storage.used_bytes ?? 0), ne = _(() => w.config.value?.storage.limit_bytes ?? 0), { isAcceptedMimeType: ie, availableCategories: ae } = Ne(), P = Oe({
			projectId: m.value,
			authManager: s
		}), F = Xi({
			library: P,
			canUseMediaFolders: D,
			translations: i
		});
		te(() => n.visible, (e) => {
			e ? (P.loadItems(), P.loadFrequentlyUsed()) : F.resetUI();
		});
		function oe(e) {
			e.key === "Escape" && r("close");
		}
		re(document, "keydown", oe);
		function I() {
			return P.previewItem.value ? !n.accept?.length || ie(P.previewItem.value.mime_type, n.accept) : !1;
		}
		function se() {
			if (I()) {
				let e = P.previewItem.value;
				r("select", {
					...e,
					url: F.selectedUrl.value || e.url
				}), r("close");
			}
		}
		return (t, n) => (c(), S(g, { to: e.popoverTarget || "body" }, [N(C, {
			"enter-active-class": "tpl:transition tpl:duration-200",
			"enter-from-class": "tpl:opacity-0",
			"enter-to-class": "tpl:opacity-100",
			"leave-active-class": "tpl:transition tpl:duration-150",
			"leave-from-class": "tpl:opacity-100",
			"leave-to-class": "tpl:opacity-0"
		}, {
			default: f(() => [e.visible ? (c(), v("div", {
				key: 0,
				"data-tpl-theme": b(a),
				class: "tpl tpl-media-overlay tpl:fixed tpl:inset-0 tpl:z-[9999]",
				onClick: n[18] ||= x((e) => r("close"), ["self"])
			}, [E("div", Qi, [
				E("div", $i, [E("h2", ea, h(b(i).mediaLibrary.title), 1), E("div", ta, [
					N(Yi, {
						"used-bytes": M.value,
						"limit-bytes": ne.value,
						size: 22
					}, null, 8, ["used-bytes", "limit-bytes"]),
					E("div", na, [E("input", {
						value: b(F).searchInput.value,
						type: "text",
						class: "tpl:w-52 tpl:rounded-md tpl:border tpl:py-1.5 tpl:pr-3 tpl:pl-8 tpl:text-xs tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:outline-none tpl:focus:shadow-[var(--tpl-ring)]",
						style: {
							"border-color": "var(--tpl-border)",
							"background-color": "var(--tpl-bg)",
							color: "var(--tpl-text)"
						},
						placeholder: b(i).mediaLibrary.searchPlaceholder,
						onInput: n[0] ||= (e) => b(F).handleSearchInput(e.target.value)
					}, null, 40, ra), N(b(ue), {
						class: "tpl:absolute tpl:top-1/2 tpl:left-2.5 tpl:-translate-y-1/2",
						size: 13,
						"stroke-width": 2,
						style: { color: "var(--tpl-text-dim)" }
					})]),
					E("button", {
						class: "tpl:flex tpl:size-7 tpl:items-center tpl:justify-center tpl:rounded-md tpl:transition-all tpl:duration-150",
						style: { color: "var(--tpl-text-muted)" },
						onClick: n[1] ||= (e) => r("close")
					}, [N(b(ye), {
						size: 18,
						"stroke-width": 2
					})])
				])]),
				E("div", ia, [N(C, {
					"enter-active-class": "tpl:transition-all tpl:duration-200 tpl:ease-out",
					"enter-from-class": "tpl:-ml-48 tpl:opacity-0",
					"enter-to-class": "tpl:ml-0 tpl:opacity-100",
					"leave-active-class": "tpl:transition-all tpl:duration-150 tpl:ease-in",
					"leave-from-class": "tpl:ml-0 tpl:opacity-100",
					"leave-to-class": "tpl:-ml-48 tpl:opacity-0"
				}, {
					default: f(() => [D.value && b(F).showSidebar.value ? (c(), v("div", aa, [N(yr, {
						folders: b(P).folders.value,
						"current-folder-id": b(P).currentFolderId.value,
						"view-mode": b(P).viewMode.value,
						"has-frequently-used": b(F).hasFrequentlyUsed.value,
						onNavigate: b(P).navigateToFolder,
						onCreateFolder: b(F).handleCreateFolder,
						onRenameFolder: b(F).handleRenameFolder,
						onDeleteFolder: b(F).handleDeleteFolder,
						onShowFrequentlyUsed: b(P).showFrequentlyUsed
					}, null, 8, [
						"folders",
						"current-folder-id",
						"view-mode",
						"has-frequently-used",
						"onNavigate",
						"onCreateFolder",
						"onRenameFolder",
						"onDeleteFolder",
						"onShowFrequentlyUsed"
					])])) : y("", !0)]),
					_: 1
				}), E("div", oa, [E("div", sa, [E("div", ca, [
					D.value ? (c(), v("button", {
						key: 0,
						class: "tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-md tpl:transition-all tpl:duration-150",
						style: k({
							color: b(F).showSidebar.value ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
							backgroundColor: b(F).showSidebar.value ? "var(--tpl-bg)" : "transparent",
							border: b(F).showSidebar.value ? "1px solid var(--tpl-border)" : "1px solid transparent"
						}),
						title: b(F).showSidebar.value ? b(i).mediaLibrary.hideFolders : b(i).mediaLibrary.showFolders,
						onClick: n[2] ||= (e) => b(F).showSidebar.value = !b(F).showSidebar.value
					}, [N(b(pe), {
						size: 16,
						"stroke-width": 2
					})], 12, la)) : y("", !0),
					b(P).viewMode.value === "frequently-used" ? (c(), v("span", ua, h(b(i).mediaLibrary.frequentlyUsed), 1)) : (c(), S(Me, {
						key: 2,
						folders: b(P).folders.value,
						"current-folder-id": b(P).currentFolderId.value,
						onNavigate: b(P).navigateToFolder
					}, null, 8, [
						"folders",
						"current-folder-id",
						"onNavigate"
					])),
					E("div", da, [E("button", {
						class: "tpl:flex tpl:size-6 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded tpl:transition-all tpl:duration-150",
						style: k({
							color: b(F).layoutMode.value === "grid" ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
							backgroundColor: b(F).layoutMode.value === "grid" ? "var(--tpl-bg-elevated)" : "transparent"
						}),
						title: b(i).mediaLibrary.viewGrid,
						onClick: n[3] ||= (e) => b(F).layoutMode.value = "grid"
					}, [N(b(me), {
						size: 14,
						"stroke-width": 2
					})], 12, fa), E("button", {
						class: "tpl:flex tpl:size-6 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded tpl:transition-all tpl:duration-150",
						style: k({
							color: b(F).layoutMode.value === "list" ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
							backgroundColor: b(F).layoutMode.value === "list" ? "var(--tpl-bg-elevated)" : "transparent"
						}),
						title: b(i).mediaLibrary.viewList,
						onClick: n[4] ||= (e) => b(F).layoutMode.value = "list"
					}, [N(b(be), {
						size: 14,
						"stroke-width": 2
					})], 12, pa)])
				]), E("div", ma, [b(ae).length > 1 ? (c(), v("select", {
					key: 0,
					class: "tpl:rounded-md tpl:border tpl:py-1.5 tpl:pr-7 tpl:pl-2.5 tpl:text-xs tpl:transition-all tpl:duration-150 tpl:outline-none",
					style: {
						"border-color": "var(--tpl-border)",
						"background-color": "var(--tpl-bg)",
						color: "var(--tpl-text)"
					},
					value: b(P).categoryFilter.value ?? "",
					onChange: n[5] ||= (e) => b(P).filterByCategory(e.target.value || null)
				}, [E("option", ga, h(b(i).mediaLibrary.filterAll), 1), (c(!0), v(A, null, u(b(ae), (e) => (c(), v("option", {
					key: e,
					value: e
				}, h(b(F).getCategoryLabel(e)), 9, _a))), 128))], 40, ha)) : y("", !0), E("select", {
					class: "tpl:rounded-md tpl:border tpl:py-1.5 tpl:pr-7 tpl:pl-2.5 tpl:text-xs tpl:transition-all tpl:duration-150 tpl:outline-none",
					style: {
						"border-color": "var(--tpl-border)",
						"background-color": "var(--tpl-bg)",
						color: "var(--tpl-text)"
					},
					value: b(P).sortOption.value,
					onChange: n[6] ||= (e) => b(P).sortBy(e.target.value)
				}, [
					E("option", ya, h(b(i).mediaLibrary.sortNewest), 1),
					E("option", ba, h(b(i).mediaLibrary.sortOldest), 1),
					E("option", xa, h(b(i).mediaLibrary.sortNameAsc), 1),
					E("option", Sa, h(b(i).mediaLibrary.sortNameDesc), 1),
					E("option", Ca, h(b(i).mediaLibrary.sortSizeAsc), 1),
					E("option", wa, h(b(i).mediaLibrary.sortSizeDesc), 1)
				], 40, va)])]), E("div", Ta, [b(P).viewMode.value === "files" ? (c(), v("div", Ea, [N(Wi, {
					"is-uploading": b(P).isUploading.value,
					"upload-progress": b(P).uploadProgress.value,
					onUpload: b(F).handleUpload
				}, null, 8, [
					"is-uploading",
					"upload-progress",
					"onUpload"
				]), O.value ? (c(), v("button", {
					key: 0,
					class: "tpl:mt-2 tpl:flex tpl:w-full tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:border-dashed tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
					style: {
						"border-color": "var(--tpl-border)",
						color: "var(--tpl-text-muted)",
						"background-color": "var(--tpl-bg)"
					},
					onClick: n[7] ||= (e) => b(F).showImportUrlModal.value = !0
				}, [N(b(ve), {
					size: 14,
					"stroke-width": 2
				}), j(" " + h(b(i).mediaLibrary.importFromUrl), 1)])) : y("", !0)])) : y("", !0), N(Xr, {
					items: b(F).displayItems.value,
					"selected-ids": b(P).selectedItems.value,
					"is-loading": b(P).isLoading.value,
					"has-more": b(P).viewMode.value === "files" && b(P).hasMore.value,
					accept: e.accept,
					layout: b(F).layoutMode.value,
					onSelect: b(F).handleSelect,
					onToggle: b(P).toggleSelection,
					onLoadMore: b(P).loadMore,
					onEdit: b(F).handleEditItem,
					onReplace: b(F).handleReplaceItem
				}, null, 8, [
					"items",
					"selected-ids",
					"is-loading",
					"has-more",
					"accept",
					"layout",
					"onSelect",
					"onToggle",
					"onLoadMore",
					"onEdit",
					"onReplace"
				])])])]),
				N(ci, {
					visible: b(F).showImportUrlModal.value,
					"is-importing": b(P).isImportingFromUrl.value,
					error: b(P).importFromUrlError.value,
					onImport: b(F).handleImportFromUrl,
					onClose: n[8] ||= (e) => b(F).showImportUrlModal.value = !1
				}, null, 8, [
					"visible",
					"is-importing",
					"error",
					"onImport"
				]),
				N(sr, {
					visible: !!b(F).editingItem.value,
					item: b(F).editingItem.value,
					onSave: b(F).handleEditSave,
					onClose: n[9] ||= (e) => b(F).editingItem.value = null
				}, null, 8, [
					"visible",
					"item",
					"onSave"
				]),
				N(zi, {
					visible: b(P).showReplaceWarning.value,
					item: b(P).pendingReplaceItem.value,
					"usage-info": b(P).replaceUsageInfo.value,
					"is-replacing": b(P).isReplacing.value,
					error: b(P).replaceError.value,
					onReplace: b(F).handleReplaceFile,
					onClose: b(P).cancelReplace
				}, null, 8, [
					"visible",
					"item",
					"usage-info",
					"is-replacing",
					"error",
					"onReplace",
					"onClose"
				]),
				N(C, {
					"enter-active-class": "tpl:transition tpl:ease-out tpl:duration-150",
					"enter-from-class": "tpl:opacity-0",
					"enter-to-class": "tpl:opacity-100",
					"leave-active-class": "tpl:transition tpl:ease-in tpl:duration-100",
					"leave-from-class": "tpl:opacity-100",
					"leave-to-class": "tpl:opacity-0"
				}, {
					default: f(() => [b(P).showDeleteWarning.value ? (c(), v("div", {
						key: 0,
						class: "tpl:absolute tpl:inset-0 tpl:z-10 tpl:flex tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-lg)]",
						style: {
							"background-color": "var(--tpl-overlay)",
							"backdrop-filter": "blur(8px)",
							"-webkit-backdrop-filter": "blur(8px)"
						},
						onClick: n[12] ||= x((...e) => b(P).cancelDelete && b(P).cancelDelete(...e), ["self"])
					}, [E("div", Da, [
						E("h3", Oa, h(b(i).mediaLibrary.deleteWarningTitle), 1),
						E("p", {
							class: T(["tpl:text-xs", b(F).hasUsedFiles.value ? "tpl:mb-2" : "tpl:mb-4"]),
							style: { color: "var(--tpl-text-muted)" }
						}, h(b(i).mediaLibrary.deleteWarningMessage), 3),
						b(F).hasUsedFiles.value ? (c(), v("p", ka, h(b(i).mediaLibrary.deleteWarningUsageNote), 1)) : y("", !0),
						b(F).hasUsedFiles.value ? (c(), v("div", Aa, [(c(!0), v(A, null, u(b(P).deleteUsageInfo.value, (e, t) => (c(), v("div", {
							key: t,
							class: "tpl:text-xs",
							style: { color: "var(--tpl-text)" }
						}, [e.template_count > 0 ? (c(), v(A, { key: 0 }, [E("span", ja, h(b(F).displayItems.value.find((e) => e.id === t)?.filename || t), 1), E("span", Ma, " - " + h(b(i).mediaLibrary.usedInTemplates.replace("{count}", e.template_count.toString())), 1)], 64)) : y("", !0)]))), 128))])) : y("", !0),
						E("div", Na, [E("button", {
							class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
							style: {
								"border-color": "var(--tpl-border)",
								color: "var(--tpl-text)",
								"background-color": "var(--tpl-bg)"
							},
							onClick: n[10] ||= (...e) => b(P).cancelDelete && b(P).cancelDelete(...e)
						}, h(b(i).mediaLibrary.cancel), 1), E("button", {
							class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
							style: {
								"border-color": "var(--tpl-danger)",
								color: "var(--tpl-danger)",
								"background-color": "var(--tpl-danger-light)"
							},
							onClick: n[11] ||= (...e) => b(P).confirmDelete && b(P).confirmDelete(...e)
						}, h(b(F).hasUsedFiles.value ? b(i).mediaLibrary.deleteAnyway : b(i).mediaLibrary.confirmDelete), 1)])
					])])) : y("", !0)]),
					_: 1
				}),
				E("div", Pa, [E("div", Fa, [b(P).previewItem.value ? (c(), S(wi, {
					key: 0,
					"selected-conversion": b(F).selectedConversion.value,
					"onUpdate:selectedConversion": n[13] ||= (e) => b(F).selectedConversion.value = e,
					item: b(P).previewItem.value,
					folders: b(P).folders.value
				}, null, 8, [
					"selected-conversion",
					"item",
					"folders"
				])) : y("", !0)]), E("div", Ia, [b(P).selectedItems.value.size > 0 ? (c(), v("div", La, [b(P).previewItem.value ? (c(), v("button", {
					key: 0,
					class: "tpl:flex tpl:cursor-pointer tpl:items-center tpl:gap-1 tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
					style: k({
						borderColor: b(F).copied.value ? "var(--tpl-success)" : "var(--tpl-border)",
						color: b(F).copied.value ? "var(--tpl-success)" : "var(--tpl-text)",
						backgroundColor: "var(--tpl-bg)"
					}),
					onClick: n[14] ||= (e) => b(F).copy(b(F).selectedUrl.value)
				}, [b(F).copied.value ? (c(), S(b(le), {
					key: 1,
					size: 12,
					"stroke-width": 2
				})) : (c(), S(b(ce), {
					key: 0,
					size: 12,
					"stroke-width": 2
				})), j(" " + h(b(F).copied.value ? b(i).mediaLibrary.copied : b(i).mediaLibrary.copyUrl), 1)], 4)) : y("", !0), D.value ? (c(), v("div", Ra, [E("button", {
					class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
					style: {
						"border-color": "var(--tpl-border)",
						color: "var(--tpl-text)",
						"background-color": "var(--tpl-bg)"
					},
					onClick: n[15] ||= (e) => b(F).showMovePicker.value = !b(F).showMovePicker.value
				}, h(b(i).mediaLibrary.moveSelected), 1), b(F).showMovePicker.value ? (c(), S(pi, {
					key: 0,
					folders: b(P).folders.value,
					"current-folder-id": b(P).currentFolderId.value,
					onSelect: b(F).handleMoveToFolder,
					onClose: n[16] ||= (e) => b(F).showMovePicker.value = !1
				}, null, 8, [
					"folders",
					"current-folder-id",
					"onSelect"
				])) : y("", !0)])) : y("", !0)])) : y("", !0), E("div", za, [b(P).selectedItems.value.size > 0 ? (c(), v("button", {
					key: 0,
					class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
					style: {
						"border-color": "var(--tpl-danger)",
						color: "var(--tpl-danger)",
						"background-color": "var(--tpl-danger-light)"
					},
					onClick: n[17] ||= (...e) => b(F).handleDeleteClick && b(F).handleDeleteClick(...e)
				}, h(b(i).mediaLibrary.deleteSelected), 1)) : y("", !0), E("button", {
					class: "tpl:cursor-pointer tpl:rounded-md tpl:px-4 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50",
					style: {
						"background-color": "var(--tpl-primary)",
						color: "var(--tpl-bg)"
					},
					disabled: !I(),
					onClick: se
				}, h(e.accept?.length ? b(i).mediaLibrary.selectImage : b(i).mediaLibrary.selectFile), 9, Ba)])])])
			])], 8, Zi)) : y("", !0)]),
			_: 1
		})], 8, ["to"]));
	}
}), Ha = {
	class: "tpl tpl:flex tpl:flex-col tpl:overflow-hidden tpl:rounded-[var(--tpl-radius-lg)]",
	style: {
		width: "100%",
		height: "100%",
		"background-color": "var(--tpl-bg-elevated)",
		border: "1px solid var(--tpl-border)"
	}
}, Ua = {
	class: "tpl:flex tpl:shrink-0 tpl:items-center tpl:justify-between tpl:border-b tpl:px-5 tpl:py-3.5",
	style: { "border-color": "var(--tpl-border)" }
}, Wa = {
	class: "tpl:text-sm tpl:font-semibold",
	style: { color: "var(--tpl-text)" }
}, Ga = { class: "tpl:flex tpl:items-center tpl:gap-3" }, Ka = { class: "tpl:relative" }, qa = ["value", "placeholder"], Ja = { class: "tpl:flex tpl:min-h-0 tpl:flex-1 tpl:overflow-hidden" }, Ya = {
	key: 0,
	class: "tpl:flex tpl:w-48 tpl:shrink-0 tpl:flex-col tpl:border-r",
	style: {
		"border-color": "var(--tpl-border)",
		"background-color": "var(--tpl-bg)"
	}
}, Xa = { class: "tpl:flex tpl:min-w-0 tpl:flex-1 tpl:flex-col" }, Za = {
	class: "tpl:flex tpl:shrink-0 tpl:items-center tpl:justify-between tpl:border-b tpl:px-4 tpl:py-2.5",
	style: { "border-color": "var(--tpl-border)" }
}, Qa = { class: "tpl:flex tpl:items-center tpl:gap-2" }, $a = ["title"], eo = {
	key: 1,
	class: "tpl:text-xs tpl:font-medium",
	style: { color: "var(--tpl-text)" }
}, to = {
	class: "tpl:flex tpl:rounded-md tpl:p-0.5",
	style: {
		border: "1px solid var(--tpl-border)",
		"background-color": "var(--tpl-bg)"
	}
}, no = ["title"], ro = ["title"], io = { class: "tpl:flex tpl:items-center tpl:gap-2" }, ao = ["value"], oo = { value: "" }, so = ["value"], co = ["value"], lo = { value: "newest" }, uo = { value: "oldest" }, fo = { value: "name_asc" }, po = { value: "name_desc" }, mo = { value: "size_asc" }, ho = { value: "size_desc" }, go = { class: "tpl:min-h-0 tpl:flex-1 tpl:overflow-y-auto" }, _o = {
	key: 0,
	class: "tpl:px-4 tpl:pt-3"
}, vo = {
	class: "tpl-scale-in tpl:mx-4 tpl:w-full tpl:max-w-sm tpl:rounded-[var(--tpl-radius-lg)] tpl:p-5",
	style: {
		"background-color": "var(--tpl-bg-elevated)",
		"box-shadow": "var(--tpl-shadow-xl)"
	}
}, yo = {
	class: "tpl:mb-2 tpl:text-sm tpl:font-semibold",
	style: { color: "var(--tpl-text)" }
}, bo = {
	key: 0,
	class: "tpl:mb-4 tpl:text-xs",
	style: { color: "var(--tpl-text-muted)" }
}, xo = {
	key: 1,
	class: "tpl:mb-4 tpl:max-h-32 tpl:overflow-y-auto tpl:rounded tpl:border tpl:p-2",
	style: { "border-color": "var(--tpl-border)" }
}, So = { class: "tpl:font-medium" }, Co = { style: { color: "var(--tpl-text-muted)" } }, wo = { class: "tpl:flex tpl:justify-end tpl:gap-2" }, To = {
	class: "tpl:flex tpl:shrink-0 tpl:items-center tpl:justify-between tpl:border-t tpl:px-5 tpl:py-3",
	style: { "border-color": "var(--tpl-border)" }
}, Eo = { class: "tpl:flex tpl:min-w-0 tpl:flex-1 tpl:items-center tpl:gap-3" }, Do = { class: "tpl:flex tpl:items-center tpl:gap-5" }, Oo = {
	key: 0,
	class: "tpl:flex tpl:items-center tpl:gap-2"
}, ko = {
	key: 1,
	class: "tpl:relative"
}, Ao = { class: "tpl:flex tpl:items-center tpl:gap-2" }, jo = ["disabled"], Mo = /* @__PURE__ */ M({
	__name: "MediaLibrary",
	props: {
		authManager: {},
		projectId: {},
		planConfig: {},
		translations: {},
		onSelect: { type: Function },
		onError: { type: Function }
	},
	emits: ["ready"],
	setup(t, { emit: n }) {
		let r = t, i = n, a = _(() => r.translations);
		l("translations", r.translations), l("authManager", r.authManager), l("projectId", _(() => r.projectId));
		let o = p(r.planConfig);
		l("planConfig", {
			config: o,
			isLoading: p(!1),
			hasFeature: (e) => r.planConfig.features[e] ?? !1,
			features: _(() => r.planConfig.features),
			fetchConfig: async () => {}
		});
		let s = _(() => r.planConfig.features.media_folders ?? !1), d = _(() => r.planConfig.features.import_from_url ?? !1), m = _(() => r.planConfig.storage.used_bytes ?? 0), g = _(() => r.planConfig.storage.limit_bytes ?? 0), { availableCategories: w } = Ne(), D = Oe({
			projectId: r.projectId,
			authManager: r.authManager,
			onError: r.onError
		}), O = Xi({
			library: D,
			canUseMediaFolders: s,
			translations: a
		});
		function ee() {
			if (!D.previewItem.value) return;
			let e = D.previewItem.value;
			r.onSelect?.({
				...e,
				url: O.selectedUrl.value || e.url
			});
		}
		return e(() => {
			D.loadItems(), D.loadFrequentlyUsed(), i("ready");
		}), (e, n) => (c(), v("div", Ha, [
			E("div", Ua, [E("h2", Wa, h(a.value.mediaLibrary.title), 1), E("div", Ga, [N(Yi, {
				"used-bytes": m.value,
				"limit-bytes": g.value,
				size: 22
			}, null, 8, ["used-bytes", "limit-bytes"]), E("div", Ka, [E("input", {
				value: b(O).searchInput.value,
				type: "text",
				class: "tpl:w-52 tpl:rounded-md tpl:border tpl:py-1.5 tpl:pr-3 tpl:pl-8 tpl:text-xs tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:outline-none tpl:focus:shadow-[var(--tpl-ring)]",
				style: {
					"border-color": "var(--tpl-border)",
					"background-color": "var(--tpl-bg)",
					color: "var(--tpl-text)"
				},
				placeholder: a.value.mediaLibrary.searchPlaceholder,
				onInput: n[0] ||= (e) => b(O).handleSearchInput(e.target.value)
			}, null, 40, qa), N(b(ue), {
				class: "tpl:absolute tpl:top-1/2 tpl:left-2.5 tpl:-translate-y-1/2",
				size: 13,
				"stroke-width": 2,
				style: { color: "var(--tpl-text-dim)" }
			})])])]),
			E("div", Ja, [N(C, {
				"enter-active-class": "tpl:transition-all tpl:duration-200 tpl:ease-out",
				"enter-from-class": "tpl:-ml-48 tpl:opacity-0",
				"enter-to-class": "tpl:ml-0 tpl:opacity-100",
				"leave-active-class": "tpl:transition-all tpl:duration-150 tpl:ease-in",
				"leave-from-class": "tpl:ml-0 tpl:opacity-100",
				"leave-to-class": "tpl:-ml-48 tpl:opacity-0"
			}, {
				default: f(() => [s.value && b(O).showSidebar.value ? (c(), v("div", Ya, [N(yr, {
					folders: b(D).folders.value,
					"current-folder-id": b(D).currentFolderId.value,
					"view-mode": b(D).viewMode.value,
					"has-frequently-used": b(O).hasFrequentlyUsed.value,
					onNavigate: b(D).navigateToFolder,
					onCreateFolder: b(O).handleCreateFolder,
					onRenameFolder: b(O).handleRenameFolder,
					onDeleteFolder: b(O).handleDeleteFolder,
					onShowFrequentlyUsed: b(D).showFrequentlyUsed
				}, null, 8, [
					"folders",
					"current-folder-id",
					"view-mode",
					"has-frequently-used",
					"onNavigate",
					"onCreateFolder",
					"onRenameFolder",
					"onDeleteFolder",
					"onShowFrequentlyUsed"
				])])) : y("", !0)]),
				_: 1
			}), E("div", Xa, [E("div", Za, [E("div", Qa, [
				s.value ? (c(), v("button", {
					key: 0,
					class: "tpl:flex tpl:size-7 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded-md tpl:transition-all tpl:duration-150",
					style: k({
						color: b(O).showSidebar.value ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
						backgroundColor: b(O).showSidebar.value ? "var(--tpl-bg)" : "transparent",
						border: b(O).showSidebar.value ? "1px solid var(--tpl-border)" : "1px solid transparent"
					}),
					title: b(O).showSidebar.value ? a.value.mediaLibrary.hideFolders : a.value.mediaLibrary.showFolders,
					onClick: n[1] ||= (e) => b(O).showSidebar.value = !b(O).showSidebar.value
				}, [N(b(pe), {
					size: 16,
					"stroke-width": 2
				})], 12, $a)) : y("", !0),
				b(D).viewMode.value === "frequently-used" ? (c(), v("span", eo, h(a.value.mediaLibrary.frequentlyUsed), 1)) : (c(), S(Me, {
					key: 2,
					folders: b(D).folders.value,
					"current-folder-id": b(D).currentFolderId.value,
					onNavigate: b(D).navigateToFolder
				}, null, 8, [
					"folders",
					"current-folder-id",
					"onNavigate"
				])),
				E("div", to, [E("button", {
					class: "tpl:flex tpl:size-6 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded tpl:transition-all tpl:duration-150",
					style: k({
						color: b(O).layoutMode.value === "grid" ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
						backgroundColor: b(O).layoutMode.value === "grid" ? "var(--tpl-bg-elevated)" : "transparent"
					}),
					title: a.value.mediaLibrary.viewGrid,
					onClick: n[2] ||= (e) => b(O).layoutMode.value = "grid"
				}, [N(b(me), {
					size: 14,
					"stroke-width": 2
				})], 12, no), E("button", {
					class: "tpl:flex tpl:size-6 tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:rounded tpl:transition-all tpl:duration-150",
					style: k({
						color: b(O).layoutMode.value === "list" ? "var(--tpl-primary)" : "var(--tpl-text-muted)",
						backgroundColor: b(O).layoutMode.value === "list" ? "var(--tpl-bg-elevated)" : "transparent"
					}),
					title: a.value.mediaLibrary.viewList,
					onClick: n[3] ||= (e) => b(O).layoutMode.value = "list"
				}, [N(b(be), {
					size: 14,
					"stroke-width": 2
				})], 12, ro)])
			]), E("div", io, [b(w).length > 1 ? (c(), v("select", {
				key: 0,
				class: "tpl:rounded-md tpl:border tpl:py-1.5 tpl:pr-7 tpl:pl-2.5 tpl:text-xs tpl:transition-all tpl:duration-150 tpl:outline-none",
				style: {
					"border-color": "var(--tpl-border)",
					"background-color": "var(--tpl-bg)",
					color: "var(--tpl-text)"
				},
				value: b(D).categoryFilter.value ?? "",
				onChange: n[4] ||= (e) => b(D).filterByCategory(e.target.value || null)
			}, [E("option", oo, h(a.value.mediaLibrary.filterAll), 1), (c(!0), v(A, null, u(b(w), (e) => (c(), v("option", {
				key: e,
				value: e
			}, h(b(O).getCategoryLabel(e)), 9, so))), 128))], 40, ao)) : y("", !0), E("select", {
				class: "tpl:rounded-md tpl:border tpl:py-1.5 tpl:pr-7 tpl:pl-2.5 tpl:text-xs tpl:transition-all tpl:duration-150 tpl:outline-none",
				style: {
					"border-color": "var(--tpl-border)",
					"background-color": "var(--tpl-bg)",
					color: "var(--tpl-text)"
				},
				value: b(D).sortOption.value,
				onChange: n[5] ||= (e) => b(D).sortBy(e.target.value)
			}, [
				E("option", lo, h(a.value.mediaLibrary.sortNewest), 1),
				E("option", uo, h(a.value.mediaLibrary.sortOldest), 1),
				E("option", fo, h(a.value.mediaLibrary.sortNameAsc), 1),
				E("option", po, h(a.value.mediaLibrary.sortNameDesc), 1),
				E("option", mo, h(a.value.mediaLibrary.sortSizeAsc), 1),
				E("option", ho, h(a.value.mediaLibrary.sortSizeDesc), 1)
			], 40, co)])]), E("div", go, [b(D).viewMode.value === "files" ? (c(), v("div", _o, [N(Wi, {
				"is-uploading": b(D).isUploading.value,
				"upload-progress": b(D).uploadProgress.value,
				onUpload: b(O).handleUpload
			}, null, 8, [
				"is-uploading",
				"upload-progress",
				"onUpload"
			]), d.value ? (c(), v("button", {
				key: 0,
				class: "tpl:mt-2 tpl:flex tpl:w-full tpl:cursor-pointer tpl:items-center tpl:justify-center tpl:gap-1.5 tpl:rounded-md tpl:border tpl:border-dashed tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
				style: {
					"border-color": "var(--tpl-border)",
					color: "var(--tpl-text-muted)",
					"background-color": "var(--tpl-bg)"
				},
				onClick: n[6] ||= (e) => b(O).showImportUrlModal.value = !0
			}, [N(b(ve), {
				size: 14,
				"stroke-width": 2
			}), j(" " + h(a.value.mediaLibrary.importFromUrl), 1)])) : y("", !0)])) : y("", !0), N(Xr, {
				items: b(O).displayItems.value,
				"selected-ids": b(D).selectedItems.value,
				"is-loading": b(D).isLoading.value,
				"has-more": b(D).viewMode.value === "files" && b(D).hasMore.value,
				layout: b(O).layoutMode.value,
				onSelect: b(O).handleSelect,
				onToggle: b(D).toggleSelection,
				onLoadMore: b(D).loadMore,
				onEdit: b(O).handleEditItem,
				onReplace: b(O).handleReplaceItem
			}, null, 8, [
				"items",
				"selected-ids",
				"is-loading",
				"has-more",
				"layout",
				"onSelect",
				"onToggle",
				"onLoadMore",
				"onEdit",
				"onReplace"
			])])])]),
			N(ci, {
				visible: b(O).showImportUrlModal.value,
				"is-importing": b(D).isImportingFromUrl.value,
				error: b(D).importFromUrlError.value,
				onImport: b(O).handleImportFromUrl,
				onClose: n[7] ||= (e) => b(O).showImportUrlModal.value = !1
			}, null, 8, [
				"visible",
				"is-importing",
				"error",
				"onImport"
			]),
			N(sr, {
				visible: !!b(O).editingItem.value,
				item: b(O).editingItem.value,
				onSave: b(O).handleEditSave,
				onClose: n[8] ||= (e) => b(O).editingItem.value = null
			}, null, 8, [
				"visible",
				"item",
				"onSave"
			]),
			N(zi, {
				visible: b(D).showReplaceWarning.value,
				item: b(D).pendingReplaceItem.value,
				"usage-info": b(D).replaceUsageInfo.value,
				"is-replacing": b(D).isReplacing.value,
				error: b(D).replaceError.value,
				onReplace: b(O).handleReplaceFile,
				onClose: b(D).cancelReplace
			}, null, 8, [
				"visible",
				"item",
				"usage-info",
				"is-replacing",
				"error",
				"onReplace",
				"onClose"
			]),
			N(C, {
				"enter-active-class": "tpl:transition tpl:ease-out tpl:duration-150",
				"enter-from-class": "tpl:opacity-0",
				"enter-to-class": "tpl:opacity-100",
				"leave-active-class": "tpl:transition tpl:ease-in tpl:duration-100",
				"leave-from-class": "tpl:opacity-100",
				"leave-to-class": "tpl:opacity-0"
			}, {
				default: f(() => [b(D).showDeleteWarning.value ? (c(), v("div", {
					key: 0,
					class: "tpl:absolute tpl:inset-0 tpl:z-10 tpl:flex tpl:items-center tpl:justify-center tpl:rounded-[var(--tpl-radius-lg)]",
					style: {
						"background-color": "rgba(0, 0, 0, 0.5)",
						"backdrop-filter": "blur(8px)",
						"-webkit-backdrop-filter": "blur(8px)"
					},
					onClick: n[11] ||= x((...e) => b(D).cancelDelete && b(D).cancelDelete(...e), ["self"])
				}, [E("div", vo, [
					E("h3", yo, h(a.value.mediaLibrary.deleteWarningTitle), 1),
					E("p", {
						class: T(["tpl:text-xs", b(O).hasUsedFiles.value ? "tpl:mb-2" : "tpl:mb-4"]),
						style: { color: "var(--tpl-text-muted)" }
					}, h(a.value.mediaLibrary.deleteWarningMessage), 3),
					b(O).hasUsedFiles.value ? (c(), v("p", bo, h(a.value.mediaLibrary.deleteWarningUsageNote), 1)) : y("", !0),
					b(O).hasUsedFiles.value ? (c(), v("div", xo, [(c(!0), v(A, null, u(b(D).deleteUsageInfo.value, (e, t) => (c(), v("div", {
						key: t,
						class: "tpl:text-xs",
						style: { color: "var(--tpl-text)" }
					}, [e.template_count > 0 ? (c(), v(A, { key: 0 }, [E("span", So, h(b(O).displayItems.value.find((e) => e.id === t)?.filename || t), 1), E("span", Co, " - " + h(a.value.mediaLibrary.usedInTemplates.replace("{count}", e.template_count.toString())), 1)], 64)) : y("", !0)]))), 128))])) : y("", !0),
					E("div", wo, [E("button", {
						class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
						style: {
							"border-color": "var(--tpl-border)",
							color: "var(--tpl-text)",
							"background-color": "var(--tpl-bg)"
						},
						onClick: n[9] ||= (...e) => b(D).cancelDelete && b(D).cancelDelete(...e)
					}, h(a.value.mediaLibrary.cancel), 1), E("button", {
						class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
						style: {
							"border-color": "var(--tpl-danger)",
							color: "var(--tpl-danger)",
							"background-color": "var(--tpl-danger-light)"
						},
						onClick: n[10] ||= (...e) => b(D).confirmDelete && b(D).confirmDelete(...e)
					}, h(b(O).hasUsedFiles.value ? a.value.mediaLibrary.deleteAnyway : a.value.mediaLibrary.confirmDelete), 1)])
				])])) : y("", !0)]),
				_: 1
			}),
			E("div", To, [E("div", Eo, [b(D).previewItem.value ? (c(), S(wi, {
				key: 0,
				"selected-conversion": b(O).selectedConversion.value,
				"onUpdate:selectedConversion": n[12] ||= (e) => b(O).selectedConversion.value = e,
				item: b(D).previewItem.value,
				folders: b(D).folders.value
			}, null, 8, [
				"selected-conversion",
				"item",
				"folders"
			])) : y("", !0)]), E("div", Do, [b(D).selectedItems.value.size > 0 ? (c(), v("div", Oo, [b(D).previewItem.value ? (c(), v("button", {
				key: 0,
				class: "tpl:flex tpl:cursor-pointer tpl:items-center tpl:gap-1 tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
				style: k({
					borderColor: b(O).copied.value ? "var(--tpl-success)" : "var(--tpl-border)",
					color: b(O).copied.value ? "var(--tpl-success)" : "var(--tpl-text)",
					backgroundColor: "var(--tpl-bg)"
				}),
				onClick: n[13] ||= (e) => b(O).copy(b(O).selectedUrl.value)
			}, [b(O).copied.value ? (c(), S(b(le), {
				key: 1,
				size: 12,
				"stroke-width": 2
			})) : (c(), S(b(ce), {
				key: 0,
				size: 12,
				"stroke-width": 2
			})), j(" " + h(b(O).copied.value ? a.value.mediaLibrary.copied : a.value.mediaLibrary.copyUrl), 1)], 4)) : y("", !0), s.value ? (c(), v("div", ko, [E("button", {
				class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
				style: {
					"border-color": "var(--tpl-border)",
					color: "var(--tpl-text)",
					"background-color": "var(--tpl-bg)"
				},
				onClick: n[14] ||= (e) => b(O).showMovePicker.value = !b(O).showMovePicker.value
			}, h(a.value.mediaLibrary.moveSelected), 1), b(O).showMovePicker.value ? (c(), S(pi, {
				key: 0,
				folders: b(D).folders.value,
				"current-folder-id": b(D).currentFolderId.value,
				onSelect: b(O).handleMoveToFolder,
				onClose: n[15] ||= (e) => b(O).showMovePicker.value = !1
			}, null, 8, [
				"folders",
				"current-folder-id",
				"onSelect"
			])) : y("", !0)])) : y("", !0)])) : y("", !0), E("div", Ao, [b(D).selectedItems.value.size > 0 ? (c(), v("button", {
				key: 0,
				class: "tpl:cursor-pointer tpl:rounded-md tpl:border tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:transition-all tpl:duration-150",
				style: {
					"border-color": "var(--tpl-danger)",
					color: "var(--tpl-danger)",
					"background-color": "var(--tpl-danger-light)"
				},
				onClick: n[16] ||= (...e) => b(O).handleDeleteClick && b(O).handleDeleteClick(...e)
			}, h(a.value.mediaLibrary.deleteSelected), 1)) : y("", !0), t.onSelect ? (c(), v("button", {
				key: 1,
				class: "tpl:cursor-pointer tpl:rounded-md tpl:px-4 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:disabled:cursor-not-allowed tpl:disabled:opacity-50",
				style: {
					"background-color": "var(--tpl-primary)",
					color: "var(--tpl-bg)"
				},
				disabled: !b(D).previewItem.value,
				onClick: ee
			}, h(a.value.mediaLibrary.selectFile), 9, jo)) : y("", !0)])])])
		]));
	}
}), No = /* #__PURE__ */ Object.assign({
	"./locales/ca.ts": () => import("./ca-CNRWAMHI.js"),
	"./locales/de.ts": () => import("./de-DFYCT4QU.js"),
	"./locales/en.ts": () => import("./en-DE_y1YWU.js"),
	"./locales/es.ts": () => import("./es-OgkdMZGX.js"),
	"./locales/fr.ts": () => import("./fr-Dswns199.js"),
	"./locales/nl.ts": () => import("./nl-CbcPJlrL.js"),
	"./locales/pt-BR.ts": () => import("./pt-BR-BibOQm-o.js")
});
function Po(e) {
	return Object.keys(e).map((e) => e.match(/\/([^/]+)\.ts$/)?.[1]).filter((e) => !!e);
}
var Fo = Po(No);
function Io(e) {
	return e.trim().replace(/_/g, "-").toLowerCase();
}
function Lo(e) {
	let t = Io(e);
	return Fo.find((e) => Io(e) === t);
}
function Ro(e) {
	return Io(e).split("-")[0];
}
function zo(e) {
	return Lo(e) ?? Lo(Ro(e)) ?? "en";
}
async function Bo(e) {
	let t = No[`./locales/${zo(e)}.ts`];
	return (await t()).default;
}
//#endregion
//#region ../media-library/src/standalone/visual.ts
var Vo = null, Ho = p(null);
async function Uo(e) {
	let n = typeof e.container == "string" ? document.querySelector(e.container) : e.container;
	if (!n) throw Error(`Container element not found: ${e.container}`);
	let r = Ee(e.auth, e.onError);
	await r.initialize();
	let i = await new Te(r).fetchConfig(), a = await Bo(e.locale ?? "en");
	return Go(n, e.theme), Vo && Wo(), new Promise((o, s) => {
		try {
			Vo = D({ setup() {
				let s = () => {
					o({
						setTheme: (e) => Go(n, e),
						unmount: Wo
					});
				};
				return () => t(Mo, {
					authManager: r,
					projectId: r.projectId,
					planConfig: i,
					translations: a,
					onSelect: e.onSelect,
					onError: e.onError,
					ref: Ho,
					onReady: s
				});
			} }), Vo.mount(n);
		} catch (e) {
			s(e);
		}
	});
}
function Wo() {
	Vo && (Vo.unmount(), Vo = null, Ho.value = null);
}
function Go(e, t) {
	t && (t.primaryColor && e.style.setProperty("--tpl-primary", t.primaryColor), t.borderRadius !== void 0 && (e.style.setProperty("--tpl-radius", `${t.borderRadius}px`), e.style.setProperty("--tpl-radius-sm", `${Math.max(0, t.borderRadius - 3)}px`), e.style.setProperty("--tpl-radius-lg", `${t.borderRadius + 4}px`)));
}
typeof window < "u" && (window.TemplaticalMedia = {
	init: Uo,
	unmount: Wo
});
//#endregion
export { De as MediaApiClient, Va as MediaLibraryModal };

//# sourceMappingURL=src-B2LpXMIw.js.map