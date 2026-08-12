import { A as e, D as t, Dt as n, E as r, Et as i, I as a, K as o, O as s, Ot as c, R as l, Y as u, Z as d, _ as f, c as p, d as m, g as h, h as g, k as _, l as v, m as y, nt as b, p as x, r as S, s as C, u as w, z as T } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { c as E, o as D, t as O } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { n as k } from "./upload-WvZGBySw.js";
import { M as A } from "./dist-CQ0fVBQ3.js";
import { E as j, V as M, t as N, x as P } from "./useEditorCore-BMbxdUbY.js";
import { m as F } from "./dist-DDfXShPv.js";
import { s as I } from "./usePopoverPosition-D93u-EZm.js";
import { M as L, c as ee, d as R, i as z, l as B, t as V, z as te } from "./keys-BI6VSUh4.js";
import { t as H } from "./useI18n-BkHfCWC6.js";
import { t as U } from "./createLucideIcon-D7GKhya2.js";
import { t as W } from "./check-Bqimqf7l.js";
import { t as G } from "./circle-alert-6q_jgtv_.js";
import { a as K, c as ne, d as q, f as re, h as ie, i as J, l as ae, m as oe, n as se, o as ce, p as le, r as ue, s as de, t as fe, u as pe } from "./styles-B0MEBpOK.js";
import { t as me } from "./clock-CnadSSTD.js";
import { t as Y } from "./loader-circle-GADaYcyQ.js";
import { t as X } from "./message-circle-B62fdo0b.js";
import { n as Z, t as he } from "./MergeTagModeToggle-DEGyx8tw.js";
import { t as ge } from "./send-BYp4k38T.js";
import { t as _e } from "./sparkles-BHEE-vRD.js";
import { t as ve } from "./triangle-alert-CiN0ssB3.js";
import { t as ye } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { n as Q } from "./useCloudI18n-KgIWl-IE.js";
import { d as $ } from "./ColorPicker-VPq4ASC8.js";
import { _ as be, a as xe, b as Se, c as Ce, d as we, g as Te, h as Ee, i as De, l as Oe, m as ke, n as Ae, p as je, r as Me, s as Ne, t as Pe, u as Fe, v as Ie, y as Le } from "./cloud-BJLg_SlM.js";
var Re = U("save", [
	["path", {
		d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
		key: "1c8476"
	}],
	["path", {
		d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
		key: "1ydtos"
	}],
	["path", {
		d: "M7 3v4a1 1 0 0 0 1 1h7",
		key: "t51u73"
	}]
]);
//#endregion
//#region src/cloud/composables/useSnapshotPreview.ts
function ze(e) {
	let { authManager: t, editor: n, history: r, conditionPreview: i, autoSave: a, onError: s } = e, c = d(null), l = u(null), f = u(null), p = !1;
	o(() => {
		p = !0;
	});
	let m = C(() => l.value !== null), h = C(() => c.value?.snapshots.value ?? []), g = C(() => c.value?.isLoading.value ?? !1), _ = C(() => c.value?.isRestoring.value ?? !1);
	function v() {
		n.state.template?.id && !c.value && (c.value = be({
			authManager: t,
			templateId: n.state.template.id,
			onRestore: y,
			onError: s
		}), c.value.loadSnapshots());
	}
	function y(e) {
		n.setContent(e.content, !1), r.clear(), i.reset();
	}
	async function b(e) {
		if (!p) {
			if (l.value) {
				l.value = e, n.setContent(e.content, !1);
				return;
			}
			n.state.isDirty && n.hasTemplate() && (await n.createSnapshot(), p) || (f.value = structuredClone(n.content.value), a?.pause(), l.value = e, n.setContent(e.content, !1));
		}
	}
	async function x() {
		if (!(!l.value || !c.value)) try {
			if (await c.value.restoreSnapshot(l.value.id), p || (await c.value.loadSnapshots(), p)) return;
		} catch (e) {
			throw !p && f.value && n.setContent(f.value, !1), e;
		} finally {
			p || (l.value = null, f.value = null, a?.resume());
		}
	}
	function S() {
		!l.value || !f.value || (n.setContent(f.value, !1), l.value = null, f.value = null, a?.resume());
	}
	async function w() {
		p || c.value && await c.value.loadSnapshots();
	}
	return {
		snapshotHistoryInstance: c,
		previewingSnapshot: l,
		contentBeforePreview: f,
		isPreviewingSnapshot: m,
		snapshotHistorySnapshots: h,
		snapshotHistoryIsLoading: g,
		snapshotHistoryIsRestoring: _,
		initSnapshotHistory: v,
		handleRestore: y,
		handleSnapshotNavigate: b,
		confirmRestoreSnapshot: x,
		cancelPreview: S,
		loadSnapshotHistory: w
	};
}
//#endregion
//#region src/cloud/composables/useCloudPanelState.ts
function Be() {
	let e = u(null), t = C({
		get: () => e.value === "ai-chat",
		set: (t) => e.value = t ? "ai-chat" : null
	}), n = C({
		get: () => e.value === "scoring",
		set: (t) => e.value = t ? "scoring" : null
	}), r = C({
		get: () => e.value === "design-reference",
		set: (t) => e.value = t ? "design-reference" : null
	}), i = C({
		get: () => e.value === "comments",
		set: (t) => e.value = t ? "comments" : null
	}), a = u(!1), o = u(void 0), s = u(!1), c = u(null), l = C(() => e.value !== null), d = C(() => {
		let t = e.value;
		return t === "ai-chat" || t === "design-reference" || t === "scoring" ? t : null;
	}), f = C(() => s.value || e.value === "ai-chat" || e.value === "design-reference" || e.value === "scoring");
	function p() {
		s.value = !s.value;
	}
	function m(t) {
		s.value = !1, e.value = e.value === t ? null : t;
	}
	return I(c, () => {
		s.value = !1;
	}), {
		activePanel: e,
		aiChatOpen: t,
		scoringPanelOpen: n,
		designReferenceOpen: r,
		commentsOpen: i,
		mediaLibraryOpen: a,
		mediaLibraryAccept: o,
		aiMenuOpen: s,
		aiMenuRef: c,
		rightPanelOpen: l,
		activeAiFeature: d,
		aiButtonActive: f,
		toggleAiMenu: p,
		handleAiFeatureSelect: m
	};
}
//#endregion
//#region src/cloud/composables/useCollabUndoWarning.ts
function Ve(e) {
	let { isCollaborationEnabled: t, getCollaboratorCount: n, canUndo: r } = e, i = u(!1), a = u(!1), { start: o } = F(() => {
		a.value = !1;
	}, k, { immediate: !1 });
	function s() {
		i.value || !t.value || n() === 0 || !r.value || (i.value = !0, a.value = !0, o());
	}
	return {
		collabUndoWarningVisible: a,
		showCollabUndoWarning: s
	};
}
//#endregion
//#region src/cloud/composables/useCloudFeatureFlags.ts
function He(e) {
	let { planConfigInstance: t, aiConfig: n, editor: r } = e, i = C(() => t.hasFeature("ai_generation") && n.hasAnyMenuFeature.value), a = C(() => t.hasFeature("test_email")), o = C(() => !!r.state.template?.id), s = C(() => t.hasFeature("white_label")), c = C(() => t.config.value?.limits.max_templates ?? null), l = C(() => t.config.value?.template_count ?? 0), d = u(!1), f = u("idle"), p = u(""), { start: m } = F(() => {
		f.value = "idle";
	}, 3e3, { immediate: !1 });
	return {
		canUseAiGeneration: i,
		canSendTestEmail: a,
		hasTemplateSaved: o,
		isWhiteLabeled: s,
		templateLimit: c,
		templateCount: l,
		isSaveExporting: d,
		saveStatus: f,
		saveErrorMessage: p,
		startSaveStatusClear: m
	};
}
//#endregion
//#region src/cloud/composables/useCloudMediaLibrary.ts
function Ue(e) {
	let { onRequestMedia: t, mediaLibraryOpen: n, mediaLibraryAccept: r, authManager: i, getMediaConfig: a, onError: s } = e, c = null;
	function l(e) {
		return {
			url: e.url,
			alt: e.alt_text || void 0
		};
	}
	async function u(e) {
		let i = e?.accept ?? ["images"];
		if (e?.files?.length) {
			if (t) {
				let n = await t({
					accept: i,
					files: e.files
				});
				return n ? l(n) : null;
			}
			return d(e.files[0]);
		}
		if (t) {
			let e = await t({ accept: i });
			return e ? l(e) : null;
		}
		return c &&= (c(null), null), r.value = i, n.value = !0, new Promise((e) => {
			c = (t) => {
				e(t);
			};
		});
	}
	async function d(e) {
		let t = f(e);
		if (t) return s?.(t), null;
		try {
			let { MediaApiClient: t } = await import("@templatical/media-library");
			return l(await new t(i).uploadMedia(e));
		} catch (e) {
			return s?.(e), null;
		}
	}
	function f(e) {
		let t = a?.() ?? null;
		if (!t) return null;
		let n = t.categories?.images?.mime_types ?? [];
		return n.length > 0 && !n.includes(e.type) ? /* @__PURE__ */ Error(`Unsupported image type: ${e.type || "unknown"}. Accepted: ${n.join(", ")}.`) : t.max_file_size > 0 && e.size > t.max_file_size ? /* @__PURE__ */ Error(`Image is too large (${e.size} bytes). Maximum allowed is ${t.max_file_size} bytes.`) : null;
	}
	function p(e) {
		n.value = !1, c?.(l(e)), c = null;
	}
	function m() {
		n.value = !1, c?.(null), c = null;
	}
	return o(() => {
		c &&= (c(null), null);
	}), {
		handleRequestMedia: u,
		handleMediaSelect: p,
		handleMediaLibraryClose: m
	};
}
//#endregion
//#region src/cloud/composables/useCloudInitialization.ts
function We(e) {
	let { config: t, translations: n, fontsManager: r, emit: i, getCommentsSidebar: o } = e, s = u(!0), c = u(!1), l = u(null), d = !1, f = { value: null }, p = null, m = null, h = new Pe({
		...t.auth,
		onError: t.onError
	}), g = Te({
		authManager: h,
		onError: t.onError
	}), v = u(/* @__PURE__ */ new Map()), y = je({
		authManager: h,
		defaultFontFamily: t.fonts?.defaultFont,
		templateDefaults: t.templateDefaults,
		onError: t.onError,
		lockedBlocks: v
	}), b = Se({
		authManager: h,
		onError: t.onError
	});
	t.mcp?.enabled && Ee({
		editor: y,
		channel: b.channel,
		onOperation: t.mcp.onOperation
	});
	let x = null;
	t.collaboration?.enabled && (x = Ce({
		authManager: h,
		editor: y,
		channel: b.channel,
		onError: t.onError,
		onCollaboratorJoined: t.collaboration.onCollaboratorJoined,
		onCollaboratorLeft: t.collaboration.onCollaboratorLeft,
		onBlockLocked: t.collaboration.onBlockLocked,
		onBlockUnlocked: t.collaboration.onBlockUnlocked
	}), a(() => x.lockedBlocks.value, (e) => {
		v.value = e;
	}, { immediate: !0 }), Oe(y, x));
	let S = C(() => !!t.collaboration?.enabled && g.hasFeature("collaboration")), w = N({
		editor: y,
		config: {
			uiTheme: t.uiTheme,
			theme: void 0,
			blockDefaults: t.blockDefaults,
			templateDefaults: t.templateDefaults,
			customBlocks: [],
			paletteBlocks: t.paletteBlocks,
			htmlBlockPreview: t.htmlBlockPreview,
			colors: t.colors,
			mergeTags: t.mergeTags,
			logicTags: t.logicTags,
			displayConditions: t.displayConditions,
			onRequestMedia: null,
			resolvePreview: t.resolvePreview,
			lint: q(t),
			onSave: () => {
				f.value?.().catch((e) => {
					t.onError?.(e);
				});
			}
		},
		translations: n,
		fontsManager: r,
		historyOptions: x ? { isRemoteOperation: () => x._isProcessingRemoteOperation() } : void 0,
		autoSaveOptions: {
			onChange: async () => {
				y.hasTemplate() && (await y.createSnapshot(), p?.snapshotHistoryInstance.value?.loadSnapshots());
			},
			debounce: t.autoSaveDebounce ?? 5e3,
			enabled: () => t.autoSave !== !1 && g.hasFeature("auto_save")
		},
		themeExtraStyles: () => ({ "--tpl-drop-text": `"${n.canvas.dropHere}"` }),
		keyboardOptions: { onBeforeUndo: () => m?.showCollabUndoWarning() },
		editorRoot: e.editorRoot,
		containerEl: e.containerEl
	}), T = Ve({
		isCollaborationEnabled: S,
		getCollaboratorCount: () => x?.collaborators.value.length ?? 0,
		canUndo: w.history.canUndo
	});
	m = T;
	let E = ze({
		authManager: h,
		editor: y,
		history: w.history,
		conditionPreview: w.conditionPreview,
		autoSave: w.autoSave,
		onError: t.onError
	});
	p = E;
	let D = Be(), O = Ne(t.ai), k = He({
		planConfigInstance: g,
		aiConfig: O,
		editor: y
	}), A = Ue({
		onRequestMedia: t.onRequestMedia,
		mediaLibraryOpen: D.mediaLibraryOpen,
		mediaLibraryAccept: D.mediaLibraryAccept,
		authManager: h,
		getMediaConfig: () => g.config.value?.media ?? null,
		onError: t.onError
	});
	j({
		onBlockMove: y.moveBlock,
		onBlockAdd: y.addBlock
	});
	let P = ke({
		authManager: h,
		getFontsConfig: () => t.fonts,
		canUseCustomFonts: () => g.hasFeature("custom_fonts")
	}), F = Le({
		authManager: h,
		isAuthReady: c
	}), I = t.testEmail ?? null, B = re({
		provider: I ?? Me({
			authManager: h,
			getTemplateId: () => y.state.template?.id ?? null,
			save: () => y.save(),
			exportHtml: (e) => P.exportHtml(e),
			allowedEmails: F.allowedEmails,
			getSignature: F.getSignature,
			onBeforeTestEmail: t.onBeforeTestEmail
		}),
		getContent: () => y.content.value,
		renderMjml: () => le({
			getContent: () => y.content.value,
			renderCustomBlock: w.registry.renderCustomBlock,
			getCustomBlockStylesheet: (e) => w.registry.getDefinition(e)?.stylesheet
		}),
		onError: t.onError,
		isAvailable: I ? () => !0 : () => F.isEnabled.value && k.canSendTestEmail.value && k.hasTemplateSaved.value
	}), H = we({
		authManager: h,
		getTemplateId: () => y.state.template?.id ?? null,
		getSocketId: () => b.getSocketId(),
		onComment: t.onComment,
		onError: t.onError,
		isAuthReady: c,
		hasCommentingFeature: () => t.commenting !== !1 && g.hasFeature("commenting")
	});
	Fe({
		comments: H,
		channel: b.channel
	});
	let U = typeof t.savedBlocks == "object" && t.savedBlocks !== null ? t.savedBlocks : null, W = oe({
		provider: U ?? Ae(h),
		editor: y,
		onError: t.onError,
		isAvailable: U ? () => !0 : () => t.savedBlocks !== !1 && g.hasFeature("saved_modules")
	}), G = Ie({
		authManager: h,
		getTemplateId: () => y.state.template?.id ?? null
	});
	function K(e) {
		D.commentsOpen.value = !0, queueMicrotask(() => {
			o()?.filterByBlock(e);
		});
	}
	_(L, A.handleRequestMedia), _(z, h), _(V, O), _(R, H), _(te, G), _(ee, {
		plan: g,
		ai: O,
		comments: {
			getBlockCount: (e) => H.commentCountByBlock.value.get(e) ?? 0,
			openForBlock: K
		},
		savedBlocks: W.capability,
		testEmail: B.capability
	});
	function ne(e) {
		g.hasFeature("theme_customization") && (w.themeOverrides.value = e);
	}
	function ie(e) {
		y.setUiTheme(e);
	}
	async function J() {
		s.value = !0, l.value = null;
		try {
			if (await h.initialize(), d) return;
			c.value = !0;
			let e = await De({ authManager: h });
			if (d) return;
			if (!e.api.ok) throw Error("Health check failed: API is not reachable");
			if (!e.auth.ok) throw Error(`Health check failed: authentication error${e.auth.error ? ` - ${e.auth.error}` : ""}`);
			if (e.websocket.ok || M.warn("WebSocket health check failed:", e.websocket.error ?? "unknown error", "-- real-time features will be disabled."), await g.fetchConfig(), d) return;
			r.setCustomFontsEnabled(g.hasFeature("custom_fonts")), t.customBlocks?.length && g.hasFeature("custom_blocks") && w.registerCustomBlocks(t.customBlocks), t.theme && g.hasFeature("theme_customization") && (w.themeOverrides.value = t.theme), i("ready");
		} catch (e) {
			if (d) return;
			let n = e instanceof Error ? e : Error("Initialization failed", { cause: e });
			l.value = n, t.onError?.(n);
		} finally {
			d || (s.value = !1);
		}
	}
	function ae() {
		d = !0, r.cleanupFontLinks(), b.disconnect(), w.destroy(), t.onUnmount?.();
	}
	return {
		isInitializing: s,
		isAuthReady: c,
		initError: l,
		isDestroyed: () => d,
		authManager: h,
		planConfigInstance: g,
		websocket: b,
		collaboration: x,
		isCollaborationEnabled: S,
		editor: y,
		core: w,
		aiConfig: O,
		featureFlags: k,
		mediaLib: A,
		exporter: P,
		testEmail: B,
		commentsInstance: H,
		savedBlocks: W,
		scoringInstance: G,
		panelState: D,
		snapshotPreview: E,
		collabWarning: T,
		onSaveHook: f,
		initialize: J,
		destroy: ae,
		setThemeOverrides: ne,
		setUiTheme: ie,
		openCommentsForBlock: K
	};
}
//#endregion
//#region src/utils/preRenderCustomBlocks.ts
async function Ge(e, t) {
	let n = async (e) => {
		if (A(e)) {
			let n = e;
			try {
				n.renderedHtml = await t.renderCustomBlock(n);
			} catch {
				n.renderedHtml = `<!-- Custom block render error: ${n.customType} -->`;
			}
		}
		if (e.type === "section" && "children" in e) {
			let t = e;
			for (let e of t.children) for (let t of e) await n(t);
		}
	};
	for (let t of e.blocks) await n(t);
}
//#endregion
//#region src/cloud/composables/useCloudLifecycle.ts
function Ke(e) {
	let { config: t, editor: n, websocket: r, planConfigInstance: i, snapshotPreview: a, core: o, exporter: s, featureFlags: c, isDestroyed: l } = e;
	function u() {
		return xe(i.config.value.websocket);
	}
	async function d(e) {
		let i = await n.create(e);
		return l() ? i : (t.onCreate?.(i), a.initSnapshotHistory(), r.connect(i.id, u()), i);
	}
	async function f(e) {
		let i = await n.load(e);
		return l() ? i : (t.onLoad?.(i), a.initSnapshotHistory(), r.connect(i.id, u()), i);
	}
	async function p() {
		c.isSaveExporting.value = !0, c.saveStatus.value = "idle";
		try {
			if (await Ge(n.content.value, o.registry), l()) throw Error("Component unmounted during save");
			let e = await n.save();
			if (l()) throw Error("Component unmounted during save");
			a.initSnapshotHistory(), a.snapshotHistoryInstance.value?.loadSnapshots();
			let r = await s.exportHtml(e.id);
			if (l()) throw Error("Component unmounted during save");
			let i = {
				templateId: e.id,
				html: r.html,
				mjml: r.mjml,
				content: e.content
			};
			return t.onSave?.(i), c.saveStatus.value = "saved", c.startSaveStatusClear(), i;
		} catch (e) {
			throw l() || (c.saveStatus.value = "error", c.saveErrorMessage.value = e instanceof Error ? e.message : "Save failed"), e;
		} finally {
			l() || (c.isSaveExporting.value = !1);
		}
	}
	return {
		createTemplate: d,
		loadTemplate: f,
		saveTemplate: p
	};
}
//#endregion
//#region src/cloud/composables/useCloudSaveGate.ts
function qe(e) {
	let t = u(!1), n = null, r = C(() => e.planConfig.value?.accessibility?.blockOnError === !0), i = C(() => r.value ? e.issues.value.filter((e) => e.severity === "error") : []), a = C(() => i.value.length > 0);
	async function o(e) {
		return a.value ? (n = e, t.value = !0, !1) : (await e(), !0);
	}
	async function s() {
		let e = n;
		n = null, t.value = !1, e && await e();
	}
	function c() {
		n = null, t.value = !1;
	}
	return {
		shouldBlock: a,
		blockingIssues: i,
		modalOpen: t,
		tryRunSave: o,
		confirmAndSave: s,
		cancel: c
	};
}
//#endregion
//#region src/cloud/components/CloudSaveGateModal.vue?vue&type=script&setup=true&lang.ts
var Je = ["aria-label"], Ye = { class: "tpl:flex tpl:max-h-[80vh] tpl:w-full tpl:max-w-md tpl:flex-col tpl:gap-4 tpl:rounded-lg tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:p-5 tpl:shadow-[var(--tpl-shadow-md)]" }, Xe = { class: "tpl:flex tpl:items-center tpl:gap-2" }, Ze = { class: "tpl:m-0 tpl:text-base tpl:font-semibold tpl:text-[var(--tpl-text)]" }, Qe = { class: "tpl:m-0 tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, $e = { class: "tpl:m-0 tpl:flex tpl:max-h-64 tpl:list-none tpl:flex-col tpl:gap-1.5 tpl:overflow-y-auto tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:p-2" }, et = { class: "tpl:text-xs tpl:text-[var(--tpl-text)]" }, tt = { class: "tpl:font-mono tpl:text-[10px] tpl:text-[var(--tpl-text-dim)]" }, nt = { class: "tpl:flex tpl:justify-end tpl:gap-2" }, rt = /* @__PURE__ */ f({
	__name: "CloudSaveGateModal",
	props: {
		open: { type: Boolean },
		issues: {}
	},
	emits: ["cancel", "confirm"],
	setup(t, { emit: n }) {
		let r = n, { t: i } = Q();
		return (n, a) => (s(), v(O, {
			"enter-active-class": "tpl:transition-opacity tpl:duration-150",
			"leave-active-class": "tpl:transition-opacity tpl:duration-150",
			"enter-from-class": "tpl:opacity-0",
			"leave-to-class": "tpl:opacity-0"
		}, {
			default: l(() => [t.open ? (s(), m("div", {
				key: 0,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": b(i).saveGate.title,
				class: "tpl:fixed tpl:inset-0 tpl:z-50 tpl:flex tpl:items-center tpl:justify-center tpl:bg-black/40 tpl:p-6",
				onClick: a[2] ||= E((e) => r("cancel"), ["self"])
			}, [p("div", Ye, [
				p("header", Xe, [g(b(ve), {
					size: 18,
					"stroke-width": 2,
					class: "tpl:text-[var(--tpl-warning)]"
				}), p("h2", Ze, c(b(i).saveGate.title), 1)]),
				p("p", Qe, c(b(i).saveGate.body), 1),
				p("ul", $e, [(s(!0), m(S, null, e(t.issues, (e) => (s(), m("li", {
					key: `${e.ruleId}-${e.blockId ?? "template"}`,
					class: "tpl:flex tpl:flex-col tpl:gap-0.5 tpl:rounded tpl:px-2 tpl:py-1.5"
				}, [p("span", et, c(e.message), 1), p("span", tt, c(e.ruleId), 1)]))), 128))]),
				p("footer", nt, [p("button", {
					type: "button",
					class: "tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)]",
					onClick: a[0] ||= (e) => r("cancel")
				}, c(b(i).saveGate.cancel), 1), p("button", {
					type: "button",
					class: "tpl:rounded-md tpl:bg-[var(--tpl-danger)] tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:text-white",
					onClick: a[1] ||= (e) => r("confirm")
				}, c(b(i).saveGate.confirm), 1)])
			])], 8, Je)) : w("", !0)]),
			_: 1
		}));
	}
}), it = {
	class: "tpl-header tpl:absolute tpl:top-0 tpl:right-0 tpl:left-0 tpl:z-50 tpl:grid tpl:h-14 tpl:grid-cols-[1fr_auto_1fr] tpl:items-center tpl:px-4",
	style: {
		"background-color": "color-mix(in srgb, var(--tpl-bg) 80%, transparent)",
		"backdrop-filter": "blur(12px)",
		"-webkit-backdrop-filter": "blur(12px)",
		"box-shadow": "var(--tpl-shadow-md)",
		"border-bottom": "1px solid var(--tpl-border)"
	}
}, at = { class: "tpl-header-left tpl:flex tpl:min-w-[200px] tpl:items-center tpl:gap-3" }, ot = {
	key: 0,
	class: "tpl:text-xs tpl:opacity-60 tpl:text-[var(--tpl-text-muted)]"
}, st = { class: "tpl-header-center tpl:flex tpl:items-center tpl:justify-center tpl:gap-10" }, ct = { class: "tpl-header-right tpl:flex tpl:min-w-[200px] tpl:items-center tpl:justify-end tpl:gap-3" }, lt = ["data-tooltip"], ut = {
	key: 1,
	"aria-live": "polite",
	class: "tpl-status tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-xs tpl:text-[var(--tpl-success)]"
}, dt = {
	key: 2,
	"aria-live": "polite",
	class: "tpl-status tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-xs tpl:text-[var(--tpl-text-muted)]"
}, ft = ["aria-label", "aria-expanded"], pt = {
	key: 0,
	class: "tpl:inline-flex tpl:size-4.5 tpl:items-center tpl:justify-center tpl:rounded-full tpl:text-[10px] tpl:font-semibold tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]"
}, mt = ["aria-expanded"], ht = {
	key: 0,
	class: "tpl:absolute tpl:right-0 tpl:top-full tpl:z-50 tpl:mt-1 tpl:origin-top-right"
}, gt = ["disabled"], _t = ["disabled"], vt = /* @__PURE__ */ f({
	__name: "CloudHeader",
	props: {
		editor: {},
		core: {},
		featureFlags: {},
		panelState: {},
		snapshotPreview: {},
		commentsInstance: {},
		testEmail: {},
		websocket: {},
		collaboration: {},
		isCollaborationEnabled: { type: Boolean },
		isSaveDisabled: { type: Boolean },
		isSaving: { type: Boolean }
	},
	emits: ["save"],
	setup(e) {
		let t = h(() => import("./CollaboratorBar-D9AfWRTH.js")), r = h(() => import("./SnapshotHistory-BXSTGgBh.js")), a = h(() => import("./AiFeatureMenu-BhHhnu9G.js")), { t: o } = H(), { t: u, format: d } = Q();
		return (f, h) => (s(), m("header", it, [
			p("div", at, [e.featureFlags.templateLimit.value === null ? w("", !0) : (s(), m("span", ot, c(b(d)(b(u).header.templatesUsed, {
				used: e.featureFlags.templateCount.value,
				max: e.featureFlags.templateLimit.value
			})), 1))]),
			p("div", st, [
				g(Z, {
					viewport: e.editor.state.viewport,
					onChange: e.editor.setViewport
				}, null, 8, ["viewport", "onChange"]),
				g(J, {
					"dark-mode": e.editor.state.darkMode,
					onChange: e.editor.setDarkMode
				}, null, 8, ["dark-mode", "onChange"]),
				g(K, {
					"preview-mode": e.editor.state.previewMode,
					onChange: e.editor.setPreviewMode
				}, null, 8, ["preview-mode", "onChange"]),
				e.editor.state.previewMode && !e.core.previewResolution.supersedesSamples.value ? (s(), v(he, {
					key: 0,
					"sample-mode": e.core.mergeTagSampleMode.value,
					onChange: h[0] ||= (t) => e.core.mergeTagSampleMode.value = t
				}, null, 8, ["sample-mode"])) : w("", !0),
				e.collaboration && e.isCollaborationEnabled ? (s(), v(b(t), {
					key: 1,
					collaborators: e.collaboration.collaborators.value,
					"is-connected": e.websocket.isConnected.value
				}, null, 8, ["collaborators", "is-connected"])) : w("", !0),
				e.snapshotPreview.snapshotHistoryInstance.value ? (s(), v(b(r), {
					key: 2,
					snapshots: e.snapshotPreview.snapshotHistorySnapshots.value,
					"is-loading": e.snapshotPreview.snapshotHistoryIsLoading.value,
					"is-restoring": e.snapshotPreview.snapshotHistoryIsRestoring.value,
					onLoad: e.snapshotPreview.loadSnapshotHistory,
					onNavigate: e.snapshotPreview.handleSnapshotNavigate
				}, null, 8, [
					"snapshots",
					"is-loading",
					"is-restoring",
					"onLoad",
					"onNavigate"
				])) : w("", !0)
			]),
			p("div", ct, [
				e.featureFlags.saveStatus.value === "error" ? (s(), m("div", {
					key: 0,
					"aria-live": "assertive",
					class: "tpl-tooltip tpl-status tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-xs tpl:text-[var(--tpl-danger)]",
					"data-tooltip": e.featureFlags.saveErrorMessage.value
				}, [g(b(G), {
					size: 12,
					"stroke-width": 2.5
				}), y(" " + c(b(u).header.saveFailed), 1)], 8, lt)) : e.featureFlags.saveStatus.value === "saved" ? (s(), m("div", ut, [g(b(W), {
					size: 12,
					"stroke-width": 2.5
				}), y(" " + c(b(u).header.saved), 1)])) : e.editor.state.isDirty ? (s(), m("div", dt, [h[5] ||= p("span", { class: "tpl-pulse tpl:size-1.5 tpl:rounded-full tpl:bg-[var(--tpl-primary)]" }, null, -1), y(" " + c(b(u).header.unsaved), 1)])) : w("", !0),
				e.commentsInstance.isEnabled.value && e.featureFlags.hasTemplateSaved.value ? (s(), m("button", {
					key: 3,
					"aria-label": e.commentsInstance.unresolvedCount.value > 0 ? `${b(u).comments.button} (${e.commentsInstance.unresolvedCount.value})` : b(u).comments.button,
					"aria-expanded": e.panelState.commentsOpen.value,
					class: i(b($)),
					style: n({
						backgroundColor: e.panelState.commentsOpen.value ? "var(--tpl-primary)" : "transparent",
						color: e.panelState.commentsOpen.value ? "var(--tpl-bg)" : "var(--tpl-primary)",
						borderColor: "var(--tpl-primary)"
					}),
					onClick: h[1] ||= (t) => e.panelState.commentsOpen.value = !e.panelState.commentsOpen.value
				}, [
					g(b(X), {
						size: 16,
						"stroke-width": 2
					}),
					y(" " + c(b(u).comments.button) + " ", 1),
					e.commentsInstance.unresolvedCount.value > 0 && !e.panelState.commentsOpen.value ? (s(), m("span", pt, c(e.commentsInstance.unresolvedCount.value), 1)) : w("", !0)
				], 14, ft)) : w("", !0),
				e.featureFlags.canUseAiGeneration.value && e.featureFlags.hasTemplateSaved.value ? (s(), m("div", {
					key: 4,
					ref: (t) => e.panelState.aiMenuRef.value = t,
					class: "tpl:relative"
				}, [p("button", {
					"aria-expanded": e.panelState.aiMenuOpen.value,
					class: i(["tpl-ai-btn tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:px-4 tpl:py-2 tpl:text-sm tpl:font-semibold tpl:whitespace-nowrap tpl:transition-all tpl:duration-200", e.panelState.aiButtonActive.value ? "tpl-ai-btn--active" : "tpl-ai-btn--idle"]),
					onClick: h[2] ||= E((...t) => e.panelState.toggleAiMenu && e.panelState.toggleAiMenu(...t), ["stop"])
				}, [g(b(_e), {
					size: 16,
					"stroke-width": 2,
					class: "tpl-ai-btn-icon"
				}), y(" " + c(b(u).aiChat.button), 1)], 10, mt), g(O, {
					"enter-active-class": "tpl:transition-all tpl:duration-150 tpl:ease-out",
					"enter-from-class": "tpl:scale-95 tpl:opacity-0",
					"enter-to-class": "tpl:scale-100 tpl:opacity-100",
					"leave-active-class": "tpl:transition-all tpl:duration-100 tpl:ease-in",
					"leave-from-class": "tpl:scale-100 tpl:opacity-100",
					"leave-to-class": "tpl:scale-95 tpl:opacity-0"
				}, {
					default: l(() => [e.panelState.aiMenuOpen.value ? (s(), m("div", ht, [g(b(a), {
						"active-feature": e.panelState.activeAiFeature.value,
						onSelect: e.panelState.handleAiFeatureSelect
					}, null, 8, ["active-feature", "onSelect"])])) : w("", !0)]),
					_: 1
				})], 512)) : w("", !0),
				e.testEmail.isAvailable.value ? (s(), m("button", {
					key: 5,
					class: i(b($)),
					"data-testid": "test-email-trigger",
					style: {
						"background-color": "transparent",
						color: "var(--tpl-primary)",
						"border-color": "var(--tpl-primary)"
					},
					disabled: e.testEmail.isSending.value,
					onClick: h[3] ||= (t) => e.testEmail.open()
				}, [e.testEmail.isSending.value ? (s(), v(b(Y), {
					key: 1,
					class: "tpl-spinner",
					size: 16,
					"stroke-width": 2
				})) : (s(), v(b(ge), {
					key: 0,
					size: 16,
					"stroke-width": 2
				})), y(" " + c(b(o).testEmail.button), 1)], 10, gt)) : w("", !0),
				p("button", {
					class: i(b($)),
					style: {
						"background-color": "transparent",
						color: "var(--tpl-primary)",
						"border-color": "var(--tpl-primary)"
					},
					disabled: e.isSaveDisabled,
					onClick: h[4] ||= (e) => f.$emit("save")
				}, [e.isSaving ? (s(), v(b(Y), {
					key: 1,
					class: "tpl-spinner",
					size: 16,
					"stroke-width": 2
				})) : (s(), v(b(Re), {
					key: 0,
					size: 16,
					"stroke-width": 2
				})), y(" " + c(e.isSaving ? b(u).header.saving : b(u).header.save), 1)], 10, _t)
			])
		]));
	}
}), yt = /* @__PURE__ */ f({
	__name: "CloudPanels",
	props: {
		config: {},
		editor: {},
		core: {},
		panelState: {},
		planConfigInstance: {},
		mediaLib: {}
	},
	setup(e, { expose: t }) {
		let n = h(() => import("./AiChatSidebar-BYMdVldY.js")), r = h(() => import("./CommentsSidebar-C8BLy3Pr.js")), i = h(() => import("./DesignReferenceSidebar-k-26nkJI.js")), a = h(() => import("./TemplateScoringPanel-Ue6Dfnjb.js")), o = h(async () => {
			try {
				return (await import("@templatical/media-library")).MediaLibraryModal;
			} catch {
				throw Error("[Templatical] Cloud media library requires the optional peer dependency '@templatical/media-library'. Please install it.");
			}
		});
		function c(e, t, n) {
			t.history.record(), n.setContent(e), t.conditionPreview.reset();
		}
		let l = u(null);
		function d(e) {
			l.value?.filterByBlock(e);
		}
		return t({ filterCommentsByBlock: d }), (t, u) => (s(), m(S, null, [
			g(b(n), {
				visible: e.panelState.aiChatOpen.value,
				"on-apply": (t) => c(t, e.core, e.editor),
				onClose: u[0] ||= (t) => e.panelState.aiChatOpen.value = !1
			}, null, 8, ["visible", "on-apply"]),
			g(b(a), {
				visible: e.panelState.scoringPanelOpen.value,
				onClose: u[1] ||= (t) => e.panelState.scoringPanelOpen.value = !1
			}, null, 8, ["visible"]),
			g(b(i), {
				visible: e.panelState.designReferenceOpen.value,
				"has-existing-blocks": e.editor.content.value.blocks.length > 0,
				onClose: u[2] ||= (t) => e.panelState.designReferenceOpen.value = !1,
				onApply: u[3] ||= (t) => c(t, e.core, e.editor)
			}, null, 8, ["visible", "has-existing-blocks"]),
			g(b(r), {
				ref_key: "commentsSidebar",
				ref: l,
				visible: e.panelState.commentsOpen.value,
				onClose: u[4] ||= (t) => e.panelState.commentsOpen.value = !1
			}, null, 8, ["visible"]),
			g(b(o), {
				visible: e.panelState.mediaLibraryOpen.value,
				accept: e.panelState.mediaLibraryAccept.value,
				"popover-target": e.core.popoverRoot.value,
				onSelect: e.mediaLib.handleMediaSelect,
				onClose: e.mediaLib.handleMediaLibraryClose
			}, null, 8, [
				"visible",
				"accept",
				"popover-target",
				"onSelect",
				"onClose"
			])
		], 64));
	}
}), bt = {
	key: 0,
	class: "tpl-loading tpl:absolute tpl:inset-0 tpl:z-overlay tpl:flex tpl:flex-col tpl:bg-[var(--tpl-bg)]"
}, xt = { class: "tpl:flex tpl:flex-1 tpl:overflow-hidden" }, St = { class: "tpl:flex tpl:w-12 tpl:shrink-0 tpl:flex-col tpl:items-center tpl:gap-4 tpl:py-5 tpl:border-r tpl:border-[var(--tpl-border)]" }, Ct = /* @__PURE__ */ f({
	__name: "CloudLoadingOverlay",
	props: { visible: { type: Boolean } },
	setup(t) {
		return (n, r) => t.visible ? (s(), m("div", bt, [r[1] ||= x("<div class=\"tpl:flex tpl:h-14 tpl:shrink-0 tpl:items-center tpl:justify-between tpl:px-4 tpl:border-b tpl:border-[var(--tpl-border)]\"><div class=\"tpl-shimmer tpl:h-5 tpl:w-28 tpl:rounded-[var(--tpl-radius-sm)]\"></div><div class=\"tpl:flex tpl:gap-3\"><div class=\"tpl-shimmer tpl:h-8 tpl:w-20 tpl:rounded-[var(--tpl-radius-sm)]\"></div><div class=\"tpl-shimmer tpl:h-8 tpl:w-20 tpl:rounded-[var(--tpl-radius-sm)]\"></div></div></div>", 1), p("div", xt, [p("div", St, [(s(), m(S, null, e(5, (e) => p("div", {
			key: e,
			class: "tpl-shimmer tpl:size-7 tpl:rounded-[var(--tpl-radius-sm)]"
		})), 64))]), r[0] ||= x("<div class=\"tpl:flex tpl:flex-1 tpl:items-start tpl:justify-center tpl:overflow-auto tpl:p-8 tpl:bg-[var(--tpl-canvas-bg)]\"><div class=\"tpl:w-full tpl:max-w-[600px] tpl:rounded-[var(--tpl-radius)] tpl:p-6 tpl:bg-[var(--tpl-bg)] tpl:shadow-[var(--tpl-shadow-sm)]\"><div class=\"tpl:space-y-2 tpl:py-4\"><div class=\"tpl-shimmer tpl:h-3 tpl:w-3/4 tpl:rounded\"></div><div class=\"tpl-shimmer tpl:h-3 tpl:w-full tpl:rounded\"></div><div class=\"tpl-shimmer tpl:h-3 tpl:w-5/6 tpl:rounded\"></div></div><div class=\"tpl:py-4\"><div class=\"tpl-shimmer tpl:h-44 tpl:w-full tpl:rounded-[var(--tpl-radius-sm)]\"></div></div><div class=\"tpl:space-y-2 tpl:py-4\"><div class=\"tpl-shimmer tpl:h-3 tpl:w-full tpl:rounded\"></div><div class=\"tpl-shimmer tpl:h-3 tpl:w-2/3 tpl:rounded\"></div></div><div class=\"tpl:flex tpl:justify-center tpl:py-4\"><div class=\"tpl-shimmer tpl:h-10 tpl:w-36 tpl:rounded-[var(--tpl-radius-sm)]\"></div></div><div class=\"tpl:space-y-2 tpl:py-4\"><div class=\"tpl-shimmer tpl:mx-auto tpl:h-2.5 tpl:w-1/2 tpl:rounded\"></div><div class=\"tpl-shimmer tpl:mx-auto tpl:h-2.5 tpl:w-1/3 tpl:rounded\"></div></div></div></div><div class=\"tpl:flex tpl:w-[320px] tpl:shrink-0 tpl:flex-col tpl:gap-4 tpl:p-4 tpl:border-l tpl:border-[var(--tpl-border)]\"><div class=\"tpl-shimmer tpl:h-8 tpl:rounded-[var(--tpl-radius-sm)]\"></div><div class=\"tpl-shimmer tpl:h-32 tpl:rounded-[var(--tpl-radius)]\"></div><div class=\"tpl-shimmer tpl:h-32 tpl:rounded-[var(--tpl-radius)]\"></div></div>", 2)])])) : w("", !0);
	}
}), wt = {
	key: 0,
	role: "alert",
	class: "tpl-error tpl:absolute tpl:inset-0 tpl:z-overlay tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-6 tpl:px-8 tpl:bg-[var(--tpl-bg)]"
}, Tt = { class: "tpl:flex tpl:size-16 tpl:items-center tpl:justify-center tpl:rounded-full tpl:bg-[var(--tpl-danger-light)]" }, Et = { class: "tpl:flex tpl:flex-col tpl:items-center tpl:gap-2 tpl:text-center" }, Dt = { class: "tpl:text-lg tpl:font-semibold tpl:text-[var(--tpl-text)]" }, Ot = { class: "tpl:max-w-md tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, kt = /* @__PURE__ */ f({
	__name: "CloudErrorOverlay",
	props: {
		error: {},
		visible: { type: Boolean }
	},
	emits: ["retry"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = Q();
		function i(e) {
			return "isUnauthorized" in e && e.isUnauthorized ? r.error.authFailed : "isNotFound" in e && e.isNotFound ? r.error.templateNotFound : r.error.defaultMessage;
		}
		function a(e) {
			return "isNotFound" in e && !!e.isNotFound;
		}
		return (t, o) => e.visible && e.error ? (s(), m("div", wt, [
			p("div", Tt, [g(b(G), {
				size: 32,
				"stroke-width": 1.5,
				class: "tpl:text-[var(--tpl-danger)]"
			})]),
			p("div", Et, [p("h2", Dt, c(b(r).error.title), 1), p("p", Ot, c(i(e.error)), 1)]),
			a(e.error) ? w("", !0) : (s(), m("button", {
				key: 0,
				class: "tpl-btn tpl-btn-primary tpl:inline-flex tpl:items-center tpl:gap-2 tpl:rounded-md tpl:px-4 tpl:py-2.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
				onClick: o[0] ||= (e) => n("retry")
			}, c(b(r).error.retry), 1))
		])) : w("", !0);
	}
}), At = {
	key: 0,
	class: "tpl-preview-banner tpl:absolute tpl:top-14 tpl:right-0 tpl:left-0 tpl:z-40 tpl:flex tpl:items-center tpl:justify-center tpl:gap-4 tpl:px-4 tpl:py-3 tpl:bg-[var(--tpl-primary-light)] tpl:border-b tpl:border-[var(--tpl-primary)]"
}, jt = { class: "tpl:flex tpl:items-center tpl:gap-2 tpl:text-sm tpl:text-[var(--tpl-text)]" }, Mt = { class: "tpl:flex tpl:items-center tpl:gap-2" }, Nt = /* @__PURE__ */ f({
	__name: "SnapshotPreviewBanner",
	props: { visible: { type: Boolean } },
	emits: ["cancel", "confirm"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = Q();
		return (t, i) => e.visible ? (s(), m("div", At, [p("div", jt, [g(b(me), {
			size: 18,
			"stroke-width": 2,
			class: "tpl:text-[var(--tpl-primary)]"
		}), p("span", null, c(b(r).snapshotPreview.message), 1)]), p("div", Mt, [p("button", {
			class: "tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:transition-all tpl:duration-150 tpl:text-[var(--tpl-text-muted)] tpl:border tpl:border-[var(--tpl-border)]",
			style: { "background-color": "transparent" },
			onClick: i[0] ||= (e) => n("cancel")
		}, c(b(r).snapshotPreview.cancel), 1), p("button", {
			class: "tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
			onClick: i[1] ||= (e) => n("confirm")
		}, c(b(r).snapshotPreview.restore), 1)])])) : w("", !0);
	}
}), Pt = {
	key: 0,
	role: "status",
	"aria-live": "polite",
	class: "tpl:absolute tpl:top-16 tpl:left-1/2 tpl:z-toast tpl:-translate-x-1/2 tpl:rounded-[var(--tpl-radius)] tpl:px-4 tpl:py-2.5 tpl:text-sm tpl:shadow-lg",
	style: {
		"background-color": "var(--tpl-warning-light)",
		color: "var(--tpl-text)",
		border: "1px solid var(--tpl-warning)"
	}
}, Ft = /* @__PURE__ */ f({
	__name: "CollabUndoToast",
	props: { visible: { type: Boolean } },
	setup(e) {
		let { t } = H();
		return (n, r) => e.visible ? (s(), m("div", Pt, c(b(t).history.collabWarning), 1)) : w("", !0);
	}
}), It = ["data-tpl-theme"], Lt = { class: "tpl:sticky tpl:top-0 tpl:z-40 tpl:h-0" }, Rt = { class: "tpl-main tpl:flex tpl:justify-center tpl:p-8" }, zt = ["aria-label"], Bt = /*#__PURE__*/ ye(/* @__PURE__ */ f({
	__name: "CloudEditor",
	props: {
		config: {},
		translations: {},
		cloudTranslations: {},
		fontsManager: {},
		shadowRoot: {}
	},
	emits: ["ready"],
	setup(e, { expose: a, emit: o }) {
		let d = h(() => import("./SavedBlocksPanels-BCwQgKLF.js")), f = h(() => import("./TestEmailPanel-b8GHTrnE.js")), x = e;
		_(B, x.cloudTranslations);
		let S = o, C = u(null), k = u(null), A = We({
			config: x.config,
			translations: x.translations,
			fontsManager: x.fontsManager,
			emit: S,
			getCommentsSidebar: () => C.value ? { filterByBlock: C.value.filterCommentsByBlock } : null,
			editorRoot: x.shadowRoot,
			containerEl: k
		}), { isInitializing: j, isAuthReady: M, initError: N, planConfigInstance: F, websocket: I, collaboration: L, isCollaborationEnabled: ee, editor: R, core: z, featureFlags: V, mediaLib: te, exporter: H, testEmail: U, commentsInstance: W, savedBlocks: G, panelState: K, snapshotPreview: q, collabWarning: re, setThemeOverrides: J, setUiTheme: oe } = A, { showNotice: le } = P(() => x.config.smallScreenNotice);
		async function me() {
			try {
				await q.confirmRestoreSnapshot();
			} catch {}
		}
		let Y = Ke({
			config: x.config,
			editor: R,
			websocket: I,
			planConfigInstance: F,
			snapshotPreview: q,
			core: z,
			exporter: H,
			featureFlags: V,
			isDestroyed: A.isDestroyed
		}), X = qe({
			issues: z.templateLint ? z.templateLint.issues : u([]),
			planConfig: F.config
		});
		async function Z() {
			await X.tryRunSave(() => Y.saveTemplate().catch((e) => x.config.onError?.(e)));
		}
		return A.onSaveHook.value = Z, r(() => {
			A.initialize();
		}), t(() => {
			A.destroy();
		}), a({
			getContent: () => R.content.value,
			setContent: (e) => R.setContent(e),
			setTheme: oe,
			setThemeOverrides: J,
			create: Y.createTemplate,
			load: Y.loadTemplate,
			save: Y.saveTemplate,
			sendTestEmail: (e) => U.send(e)
		}), (t, r) => (s(), m("div", {
			ref_key: "rootEl",
			ref: k,
			class: i(["tpl tpl:relative tpl:h-full tpl:overflow-hidden", { "tpl:dark": b(R).state.darkMode }]),
			"data-tpl-theme": b(z).resolvedTheme.value,
			style: n(b(z).themeStyles.value),
			onDragover: r[6] ||= E(() => {}, ["prevent"]),
			onDrop: r[7] ||= E(() => {}, ["prevent"])
		}, [
			g(ae),
			g(O, {
				"enter-active-class": "tpl:transition-opacity tpl:duration-200",
				"enter-from-class": "tpl:opacity-100",
				"enter-to-class": "tpl:opacity-100",
				"leave-active-class": "tpl:transition-opacity tpl:duration-300",
				"leave-from-class": "tpl:opacity-100",
				"leave-to-class": "tpl:opacity-0"
			}, {
				default: l(() => [g(Ct, { visible: b(j) || b(R).state.isLoading }, null, 8, ["visible"])]),
				_: 1
			}),
			g(O, {
				"enter-active-class": "tpl:transition-opacity tpl:duration-200",
				"enter-from-class": "tpl:opacity-0",
				"enter-to-class": "tpl:opacity-100",
				"leave-active-class": "tpl:transition-opacity tpl:duration-300",
				"leave-from-class": "tpl:opacity-100",
				"leave-to-class": "tpl:opacity-0"
			}, {
				default: l(() => [g(kt, {
					error: b(N),
					visible: !!b(N) && !b(j),
					onRetry: b(A).initialize
				}, null, 8, [
					"error",
					"visible",
					"onRetry"
				])]),
				_: 1
			}),
			g(vt, {
				editor: b(R),
				core: b(z),
				"feature-flags": b(V),
				"panel-state": b(K),
				"snapshot-preview": b(q),
				"comments-instance": b(W),
				"test-email": b(U),
				websocket: b(I),
				collaboration: b(L),
				"is-collaboration-enabled": b(ee),
				"is-saving": b(R).state.isSaving || b(V).isSaveExporting.value,
				"is-save-disabled": b(R).state.isSaving || b(V).isSaveExporting.value || !b(R).state.isDirty,
				onSave: Z
			}, null, 8, [
				"editor",
				"core",
				"feature-flags",
				"panel-state",
				"snapshot-preview",
				"comments-instance",
				"test-email",
				"websocket",
				"collaboration",
				"is-collaboration-enabled",
				"is-saving",
				"is-save-disabled"
			]),
			g(rt, {
				open: b(X).modalOpen.value,
				issues: b(X).blockingIssues.value,
				onCancel: b(X).cancel,
				onConfirm: b(X).confirmAndSave
			}, null, 8, [
				"open",
				"issues",
				"onCancel",
				"onConfirm"
			]),
			g(Nt, {
				visible: b(q).isPreviewingSnapshot.value,
				onCancel: b(q).cancelPreview,
				onConfirm: me
			}, null, 8, ["visible", "onCancel"]),
			g(O, {
				"enter-active-class": "tpl:transition-all tpl:duration-200 tpl:ease-out",
				"enter-from-class": "tpl:translate-y-[-8px] tpl:opacity-0",
				"enter-to-class": "tpl:translate-y-0 tpl:opacity-100",
				"leave-active-class": "tpl:transition-all tpl:duration-300 tpl:ease-in",
				"leave-from-class": "tpl:translate-y-0 tpl:opacity-100",
				"leave-to-class": "tpl:translate-y-[-8px] tpl:opacity-0"
			}, {
				default: l(() => [g(Ft, { visible: b(re).collabUndoWarningVisible.value }, null, 8, ["visible"])]),
				_: 1
			}),
			T(g(ne, null, null, 512), [[D, !b(R).state.previewMode]]),
			p("div", {
				class: i(["tpl-body tpl:absolute tpl:bottom-0 tpl:overflow-auto", [b(R).state.previewMode ? "tpl:left-0 tpl:right-0" : b(K).rightPanelOpen.value ? "tpl:left-12 tpl:right-[680px]" : "tpl:left-12 tpl:right-[320px]", b(q).isPreviewingSnapshot.value ? "tpl:top-[104px]" : "tpl:top-14"]]),
				style: {
					transition: "all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
					"background-color": "var(--tpl-canvas-bg)"
				}
			}, [p("div", Lt, [g(O, { name: "tpl-restore-btn" }, {
				default: l(() => [b(z).conditionPreview.hasHiddenBlocks.value && b(z).appliesConditionFilter.value ? (s(), m("button", {
					key: 0,
					class: "tpl:absolute tpl:left-1/2 tpl:top-2 tpl:-translate-x-1/2 tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:rounded-full tpl:border tpl:px-3.5 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:whitespace-nowrap tpl:shadow-md tpl:hover:opacity-80",
					style: {
						"background-color": "var(--tpl-warning-light)",
						color: "var(--tpl-warning)",
						"border-color": "var(--tpl-warning)",
						"backdrop-filter": "blur(8px)"
					},
					"data-testid": "restore-hidden-blocks",
					onClick: r[0] ||= (e) => b(z).conditionPreview.reset()
				}, [g(b(ie), {
					size: 13,
					"stroke-width": 2
				}), y(" " + c(b(z).t.blockSettings.restoreHiddenBlocks), 1)])) : w("", !0)]),
				_: 1
			})]), p("main", Rt, [g(pe, {
				viewport: b(R).state.viewport,
				content: b(z).previewResolution.content.value,
				"selected-block-id": b(R).state.selectedBlockId,
				"dark-mode": b(R).state.darkMode,
				"preview-mode": b(R).state.previewMode,
				"locked-blocks": b(L)?.lockedBlocks.value ?? void 0,
				onSelectBlock: b(R).selectBlock,
				onOpenAiChat: r[1] ||= (e) => b(K).aiChatOpen.value = !0,
				onOpenDesignReference: r[2] ||= (e) => b(K).designReferenceOpen.value = !0
			}, null, 8, [
				"viewport",
				"content",
				"selected-block-id",
				"dark-mode",
				"preview-mode",
				"locked-blocks",
				"onSelectBlock"
			])])], 2),
			e.config.branding !== !1 && !b(V).isWhiteLabeled.value ? (s(), v(ue, {
				key: 0,
				"position-class": [b(R).state.previewMode ? "tpl:left-0 tpl:right-0" : b(K).rightPanelOpen.value ? "tpl:left-12 tpl:right-[680px]" : "tpl:left-12 tpl:right-[320px]"]
			}, null, 8, ["position-class"])) : w("", !0),
			p("div", {
				class: "tpl-sr-only",
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "true",
				"aria-label": b(z).t.landmarks.reorderAnnouncements
			}, c(b(z).keyboardReorder.announcement.value), 9, zt),
			T(g(de, {
				"selected-block": b(R).selectedBlock.value,
				settings: b(R).content.value.settings,
				"shifted-left": b(K).rightPanelOpen.value,
				onUpdateBlock: r[3] ||= (e) => b(R).updateBlock(b(R).selectedBlock.value.id, e),
				onDeleteBlock: r[4] ||= (e) => b(z).blockActions.deleteBlock(b(R).selectedBlock.value.id),
				onDuplicateBlock: r[5] ||= (e) => b(z).blockActions.duplicateBlock(b(R).selectedBlock.value),
				onUpdateSettings: b(R).updateSettings
			}, null, 8, [
				"selected-block",
				"settings",
				"shifted-left",
				"onUpdateSettings"
			]), [[D, !b(R).state.previewMode]]),
			!b(j) && b(M) ? (s(), v(yt, {
				key: 1,
				ref_key: "cloudPanelsRef",
				ref: C,
				config: x.config,
				editor: b(R),
				core: b(z),
				"panel-state": b(K),
				"plan-config-instance": b(F),
				"media-lib": b(te)
			}, null, 8, [
				"config",
				"editor",
				"core",
				"panel-state",
				"plan-config-instance",
				"media-lib"
			])) : w("", !0),
			b(G).isAvailable.value ? (s(), v(b(d), {
				key: 2,
				feature: b(G)
			}, null, 8, ["feature"])) : w("", !0),
			b(U).isAvailable.value ? (s(), v(b(f), {
				key: 3,
				feature: b(U)
			}, null, 8, ["feature"])) : w("", !0),
			p("div", {
				ref: (e) => b(z).popoverRoot.value = e,
				class: "tpl-popover-root"
			}, null, 512),
			g(se),
			g(fe),
			b(le) ? (s(), v(ce, { key: 4 })) : w("", !0)
		], 46, It));
	}
}), [["__scopeId", "data-v-16786f1a"]]);
//#endregion
export { Bt as default };
