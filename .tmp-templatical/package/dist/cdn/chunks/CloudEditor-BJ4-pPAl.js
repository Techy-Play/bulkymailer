import { $ as e, A as t, H as n, J as r, M as i, N as a, P as o, V as s, Z as c, _ as l, b as u, ct as d, f, g as p, h as m, it as h, j as g, l as _, m as v, n as y, ot as b, p as x, s as S, st as C, u as w, v as T, x as E, y as D, z as O } from "./draggable-BRF_Q_jB.js";
import { t as k } from "./timeouts-SsLMC4a3.js";
import { B as A } from "./src-CZjSXPYq.js";
import { T as j, b as M, j as ee, t as N } from "./useEditorCore-CTYH6u4r.js";
import { _ as P } from "./dist-Dp46rwVY.js";
import { t as F } from "./dist-BLF-S9_A.js";
import { M as I, c as te, d as L, i as R, l as z, t as B, z as ne } from "./keys-CZOBuCQd.js";
import { t as V } from "./useI18n-aRMtgYRj.js";
import { E as H, I as U, L as W, Lt as G, Mt as K, N as q, at as J, kt as Y, nt as re, u as ie } from "./icons-DN008liP.js";
import { t as ae } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { n as X } from "./useCloudI18n-CML0BxqX.js";
import { a as Z, c as oe, d as Q, f as se, i as ce, l as le, m as ue, n as de, o as fe, p as pe, r as me, s as he, t as ge, u as _e } from "./styles-BzP13r-I.js";
import { d as $ } from "./ColorPicker-yxvrro60.js";
import { n as ve, t as ye } from "./MergeTagModeToggle-CiYbOKzd.js";
import { C as be, a as xe, c as Se, d as Ce, f as we, g as Te, h as Ee, i as De, l as Oe, n as ke, o as Ae, p as je, r as Me, s as Ne, t as Pe, u as Fe, v as Ie, y as Le } from "./cloud-CxNsW3hp.js";
//#region src/cloud/composables/useSnapshotPreview.ts
function Re(t) {
	let { authManager: n, editor: i, history: a, conditionPreview: o, autoSave: s, onError: l } = t, u = e(null), d = c(null), p = c(null), m = !1;
	r(() => {
		m = !0;
	});
	let h = f(() => d.value !== null), g = f(() => u.value?.snapshots.value ?? []), _ = f(() => u.value?.isLoading.value ?? !1), v = f(() => u.value?.isRestoring.value ?? !1);
	function y() {
		i.state.template?.id && !u.value && (u.value = Ne({
			authManager: n,
			templateId: i.state.template.id,
			onRestore: b,
			onError: l
		}), u.value.loadSnapshots());
	}
	function b(e) {
		i.setContent(e.content, !1), a.clear(), o.reset();
	}
	async function x(e) {
		if (!m) {
			if (d.value) {
				d.value = e, i.setContent(e.content, !1);
				return;
			}
			i.state.isDirty && i.hasTemplate() && (await i.createSnapshot(), m) || (p.value = structuredClone(i.content.value), s?.pause(), d.value = e, i.setContent(e.content, !1));
		}
	}
	async function S() {
		if (!(!d.value || !u.value)) try {
			if (await u.value.restoreSnapshot(d.value.id), m || (await u.value.loadSnapshots(), m)) return;
		} catch (e) {
			throw !m && p.value && i.setContent(p.value, !1), e;
		} finally {
			m || (d.value = null, p.value = null, s?.resume());
		}
	}
	function C() {
		!d.value || !p.value || (i.setContent(p.value, !1), d.value = null, p.value = null, s?.resume());
	}
	async function w() {
		m || u.value && await u.value.loadSnapshots();
	}
	return {
		snapshotHistoryInstance: u,
		previewingSnapshot: d,
		contentBeforePreview: p,
		isPreviewingSnapshot: h,
		snapshotHistorySnapshots: g,
		snapshotHistoryIsLoading: _,
		snapshotHistoryIsRestoring: v,
		initSnapshotHistory: y,
		handleRestore: b,
		handleSnapshotNavigate: x,
		confirmRestoreSnapshot: S,
		cancelPreview: C,
		loadSnapshotHistory: w
	};
}
//#endregion
//#region src/cloud/composables/useCloudPanelState.ts
function ze() {
	let e = c(null), t = f({
		get: () => e.value === "ai-chat",
		set: (t) => e.value = t ? "ai-chat" : null
	}), n = f({
		get: () => e.value === "scoring",
		set: (t) => e.value = t ? "scoring" : null
	}), r = f({
		get: () => e.value === "design-reference",
		set: (t) => e.value = t ? "design-reference" : null
	}), i = f({
		get: () => e.value === "comments",
		set: (t) => e.value = t ? "comments" : null
	}), a = c(!1), o = c(void 0), s = c(!1), l = c(null), u = f(() => e.value !== null), d = f(() => {
		let t = e.value;
		return t === "ai-chat" || t === "design-reference" || t === "scoring" ? t : null;
	}), p = f(() => s.value || e.value === "ai-chat" || e.value === "design-reference" || e.value === "scoring");
	function m() {
		s.value = !s.value;
	}
	function h(t) {
		s.value = !1, e.value = e.value === t ? null : t;
	}
	return F(l, () => {
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
		aiMenuRef: l,
		rightPanelOpen: u,
		activeAiFeature: d,
		aiButtonActive: p,
		toggleAiMenu: m,
		handleAiFeatureSelect: h
	};
}
//#endregion
//#region src/cloud/composables/useCollabUndoWarning.ts
function Be(e) {
	let { isCollaborationEnabled: t, getCollaboratorCount: n, canUndo: r } = e, i = c(!1), a = c(!1), { start: o } = P(() => {
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
function Ve(e) {
	let { planConfigInstance: t, aiConfig: n, editor: r } = e, i = f(() => t.hasFeature("ai_generation") && n.hasAnyMenuFeature.value), a = f(() => t.hasFeature("test_email")), o = f(() => !!r.state.template?.id), s = f(() => t.hasFeature("white_label")), l = f(() => t.config.value?.limits.max_templates ?? null), u = f(() => t.config.value?.template_count ?? 0), d = c(!1), p = c("idle"), m = c(""), { start: h } = P(() => {
		p.value = "idle";
	}, 3e3, { immediate: !1 });
	return {
		canUseAiGeneration: i,
		canSendTestEmail: a,
		hasTemplateSaved: o,
		isWhiteLabeled: s,
		templateLimit: l,
		templateCount: u,
		isSaveExporting: d,
		saveStatus: p,
		saveErrorMessage: m,
		startSaveStatusClear: h
	};
}
//#endregion
//#region src/cloud/composables/useCloudMediaLibrary.ts
function He(e) {
	let { onRequestMedia: t, mediaLibraryOpen: n, mediaLibraryAccept: i, authManager: a, getMediaConfig: o, onError: s } = e, c = null;
	function l(e) {
		return {
			url: e.url,
			alt: e.alt_text || void 0
		};
	}
	async function u(e) {
		let r = e?.accept ?? ["images"];
		if (e?.files?.length) {
			if (t) {
				let n = await t({
					accept: r,
					files: e.files
				});
				return n ? l(n) : null;
			}
			return d(e.files[0]);
		}
		if (t) {
			let e = await t({ accept: r });
			return e ? l(e) : null;
		}
		return c &&= (c(null), null), i.value = r, n.value = !0, new Promise((e) => {
			c = (t) => {
				e(t);
			};
		});
	}
	async function d(e) {
		let t = f(e);
		if (t) return s?.(t), null;
		try {
			let { MediaApiClient: t } = await import("./src-B2LpXMIw.js");
			return l(await new t(a).uploadMedia(e));
		} catch (e) {
			return s?.(e), null;
		}
	}
	function f(e) {
		let t = o?.() ?? null;
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
	return r(() => {
		c &&= (c(null), null);
	}), {
		handleRequestMedia: u,
		handleMediaSelect: p,
		handleMediaLibraryClose: m
	};
}
//#endregion
//#region src/cloud/composables/useCloudInitialization.ts
function Ue(e) {
	let { config: t, translations: n, fontsManager: r, emit: i, getCommentsSidebar: o } = e, s = c(!0), l = c(!1), u = c(null), d = !1, p = { value: null }, m = null, h = null, g = new be({
		...t.auth,
		onError: t.onError
	}), _ = Me({
		authManager: g,
		onError: t.onError
	}), v = c(/* @__PURE__ */ new Map()), y = Ie({
		authManager: g,
		defaultFontFamily: t.fonts?.defaultFont,
		templateDefaults: t.templateDefaults,
		onError: t.onError,
		lockedBlocks: v
	}), b = Oe({
		authManager: g,
		onError: t.onError
	});
	t.mcp?.enabled && Pe({
		editor: y,
		channel: b.channel,
		onOperation: t.mcp.onOperation
	});
	let x = null;
	t.collaboration?.enabled && (x = Ce({
		authManager: g,
		editor: y,
		channel: b.channel,
		onError: t.onError,
		onCollaboratorJoined: t.collaboration.onCollaboratorJoined,
		onCollaboratorLeft: t.collaboration.onCollaboratorLeft,
		onBlockLocked: t.collaboration.onBlockLocked,
		onBlockUnlocked: t.collaboration.onBlockUnlocked
	}), O(() => x.lockedBlocks.value, (e) => {
		v.value = e;
	}, { immediate: !0 }), Fe(y, x));
	let S = f(() => !!t.collaboration?.enabled && _.hasFeature("collaboration")), C = N({
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
			lint: Q(t),
			onSave: () => {
				p.value?.().catch((e) => {
					t.onError?.(e);
				});
			}
		},
		translations: n,
		fontsManager: r,
		historyOptions: x ? { isRemoteOperation: () => x._isProcessingRemoteOperation() } : void 0,
		autoSaveOptions: {
			onChange: async () => {
				y.hasTemplate() && (await y.createSnapshot(), m?.snapshotHistoryInstance.value?.loadSnapshots());
			},
			debounce: t.autoSaveDebounce ?? 5e3,
			enabled: () => t.autoSave !== !1 && _.hasFeature("auto_save")
		},
		themeExtraStyles: () => ({ "--tpl-drop-text": `"${n.canvas.dropHere}"` }),
		keyboardOptions: { onBeforeUndo: () => h?.showCollabUndoWarning() },
		editorRoot: e.editorRoot,
		containerEl: e.containerEl
	}), w = Be({
		isCollaborationEnabled: S,
		getCollaboratorCount: () => x?.collaborators.value.length ?? 0,
		canUndo: C.history.canUndo
	});
	h = w;
	let T = Re({
		authManager: g,
		editor: y,
		history: C.history,
		conditionPreview: C.conditionPreview,
		autoSave: C.autoSave,
		onError: t.onError
	});
	m = T;
	let E = ze(), D = Te(t.ai), k = Ve({
		planConfigInstance: _,
		aiConfig: D,
		editor: y
	}), A = He({
		onRequestMedia: t.onRequestMedia,
		mediaLibraryOpen: E.mediaLibraryOpen,
		mediaLibraryAccept: E.mediaLibraryAccept,
		authManager: g,
		getMediaConfig: () => _.config.value?.media ?? null,
		onError: t.onError
	});
	j({
		onBlockMove: y.moveBlock,
		onBlockAdd: y.addBlock
	});
	let M = De({
		authManager: g,
		getFontsConfig: () => t.fonts,
		canUseCustomFonts: () => _.hasFeature("custom_fonts")
	}), P = Ae({
		authManager: g,
		isAuthReady: l
	}), F = t.testEmail ?? null, z = se({
		provider: F ?? xe({
			authManager: g,
			getTemplateId: () => y.state.template?.id ?? null,
			save: () => y.save(),
			exportHtml: (e) => M.exportHtml(e),
			allowedEmails: P.allowedEmails,
			getSignature: P.getSignature,
			onBeforeTestEmail: t.onBeforeTestEmail
		}),
		getContent: () => y.content.value,
		renderMjml: () => pe({
			getContent: () => y.content.value,
			renderCustomBlock: C.registry.renderCustomBlock,
			getCustomBlockStylesheet: (e) => C.registry.getDefinition(e)?.stylesheet
		}),
		onError: t.onError,
		isAvailable: F ? () => !0 : () => P.isEnabled.value && k.canSendTestEmail.value && k.hasTemplateSaved.value
	}), V = je({
		authManager: g,
		getTemplateId: () => y.state.template?.id ?? null,
		getSocketId: () => b.getSocketId(),
		onComment: t.onComment,
		onError: t.onError,
		isAuthReady: l,
		hasCommentingFeature: () => t.commenting !== !1 && _.hasFeature("commenting")
	});
	we({
		comments: V,
		channel: b.channel
	});
	let H = typeof t.savedBlocks == "object" && t.savedBlocks !== null ? t.savedBlocks : null, U = ue({
		provider: H ?? Se(g),
		editor: y,
		onError: t.onError,
		isAvailable: H ? () => !0 : () => t.savedBlocks !== !1 && _.hasFeature("saved_modules")
	}), W = Ee({
		authManager: g,
		getTemplateId: () => y.state.template?.id ?? null
	});
	function G(e) {
		E.commentsOpen.value = !0, queueMicrotask(() => {
			o()?.filterByBlock(e);
		});
	}
	a(I, A.handleRequestMedia), a(R, g), a(B, D), a(L, V), a(ne, W), a(te, {
		plan: _,
		ai: D,
		comments: {
			getBlockCount: (e) => V.commentCountByBlock.value.get(e) ?? 0,
			openForBlock: G
		},
		savedBlocks: U.capability,
		testEmail: z.capability
	});
	function K(e) {
		_.hasFeature("theme_customization") && (C.themeOverrides.value = e);
	}
	function q(e) {
		y.setUiTheme(e);
	}
	async function J() {
		s.value = !0, u.value = null;
		try {
			if (await g.initialize(), d) return;
			l.value = !0;
			let e = await ke({ authManager: g });
			if (d) return;
			if (!e.api.ok) throw Error("Health check failed: API is not reachable");
			if (!e.auth.ok) throw Error(`Health check failed: authentication error${e.auth.error ? ` - ${e.auth.error}` : ""}`);
			if (e.websocket.ok || ee.warn("WebSocket health check failed:", e.websocket.error ?? "unknown error", "-- real-time features will be disabled."), await _.fetchConfig(), d) return;
			r.setCustomFontsEnabled(_.hasFeature("custom_fonts")), t.customBlocks?.length && _.hasFeature("custom_blocks") && C.registerCustomBlocks(t.customBlocks), t.theme && _.hasFeature("theme_customization") && (C.themeOverrides.value = t.theme), i("ready");
		} catch (e) {
			if (d) return;
			let n = e instanceof Error ? e : Error("Initialization failed", { cause: e });
			u.value = n, t.onError?.(n);
		} finally {
			d || (s.value = !1);
		}
	}
	function Y() {
		d = !0, r.cleanupFontLinks(), b.disconnect(), C.destroy(), t.onUnmount?.();
	}
	return {
		isInitializing: s,
		isAuthReady: l,
		initError: u,
		isDestroyed: () => d,
		authManager: g,
		planConfigInstance: _,
		websocket: b,
		collaboration: x,
		isCollaborationEnabled: S,
		editor: y,
		core: C,
		aiConfig: D,
		featureFlags: k,
		mediaLib: A,
		exporter: M,
		testEmail: z,
		commentsInstance: V,
		savedBlocks: U,
		scoringInstance: W,
		panelState: E,
		snapshotPreview: T,
		collabWarning: w,
		onSaveHook: p,
		initialize: J,
		destroy: Y,
		setThemeOverrides: K,
		setUiTheme: q,
		openCommentsForBlock: G
	};
}
//#endregion
//#region src/utils/preRenderCustomBlocks.ts
async function We(e, t) {
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
function Ge(e) {
	let { config: t, editor: n, websocket: r, planConfigInstance: i, snapshotPreview: a, core: o, exporter: s, featureFlags: c, isDestroyed: l } = e;
	function u() {
		return Le(i.config.value.websocket);
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
			if (await We(n.content.value, o.registry), l()) throw Error("Component unmounted during save");
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
function Ke(e) {
	let t = c(!1), n = null, r = f(() => e.planConfig.value?.accessibility?.blockOnError === !0), i = f(() => r.value ? e.issues.value.filter((e) => e.severity === "error") : []), a = f(() => i.value.length > 0);
	async function o(e) {
		return a.value ? (n = e, t.value = !0, !1) : (await e(), !0);
	}
	async function s() {
		let e = n;
		n = null, t.value = !1, e && await e();
	}
	function l() {
		n = null, t.value = !1;
	}
	return {
		shouldBlock: a,
		blockingIssues: i,
		modalOpen: t,
		tryRunSave: o,
		confirmAndSave: s,
		cancel: l
	};
}
//#endregion
//#region src/cloud/components/CloudSaveGateModal.vue?vue&type=script&setup=true&lang.ts
var qe = ["aria-label"], Je = { class: "tpl:flex tpl:max-h-[80vh] tpl:w-full tpl:max-w-md tpl:flex-col tpl:gap-4 tpl:rounded-lg tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg-elevated)] tpl:p-5 tpl:shadow-[var(--tpl-shadow-md)]" }, Ye = { class: "tpl:flex tpl:items-center tpl:gap-2" }, Xe = { class: "tpl:m-0 tpl:text-base tpl:font-semibold tpl:text-[var(--tpl-text)]" }, Ze = { class: "tpl:m-0 tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, Qe = { class: "tpl:m-0 tpl:flex tpl:max-h-64 tpl:list-none tpl:flex-col tpl:gap-1.5 tpl:overflow-y-auto tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:p-2" }, $e = { class: "tpl:text-xs tpl:text-[var(--tpl-text)]" }, et = { class: "tpl:font-mono tpl:text-[10px] tpl:text-[var(--tpl-text-dim)]" }, tt = { class: "tpl:flex tpl:justify-end tpl:gap-2" }, nt = /* @__PURE__ */ E({
	__name: "CloudSaveGateModal",
	props: {
		open: { type: Boolean },
		issues: {}
	},
	emits: ["cancel", "confirm"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = X();
		return (t, a) => (i(), v(y, {
			"enter-active-class": "tpl:transition-opacity tpl:duration-150",
			"leave-active-class": "tpl:transition-opacity tpl:duration-150",
			"enter-from-class": "tpl:opacity-0",
			"leave-to-class": "tpl:opacity-0"
		}, {
			default: s(() => [e.open ? (i(), p("div", {
				key: 0,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": h(r).saveGate.title,
				class: "tpl:fixed tpl:inset-0 tpl:z-50 tpl:flex tpl:items-center tpl:justify-center tpl:bg-black/40 tpl:p-6",
				onClick: a[2] ||= _((e) => n("cancel"), ["self"])
			}, [x("div", Je, [
				x("header", Ye, [D(h(ie), {
					size: 18,
					"stroke-width": 2,
					class: "tpl:text-[var(--tpl-warning)]"
				}), x("h2", Xe, d(h(r).saveGate.title), 1)]),
				x("p", Ze, d(h(r).saveGate.body), 1),
				x("ul", Qe, [(i(!0), p(w, null, o(e.issues, (e) => (i(), p("li", {
					key: `${e.ruleId}-${e.blockId ?? "template"}`,
					class: "tpl:flex tpl:flex-col tpl:gap-0.5 tpl:rounded tpl:px-2 tpl:py-1.5"
				}, [x("span", $e, d(e.message), 1), x("span", et, d(e.ruleId), 1)]))), 128))]),
				x("footer", tt, [x("button", {
					type: "button",
					class: "tpl:rounded-md tpl:border tpl:border-[var(--tpl-border)] tpl:bg-[var(--tpl-bg)] tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:text-[var(--tpl-text)]",
					onClick: a[0] ||= (e) => n("cancel")
				}, d(h(r).saveGate.cancel), 1), x("button", {
					type: "button",
					class: "tpl:rounded-md tpl:bg-[var(--tpl-danger)] tpl:px-3 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:text-white",
					onClick: a[1] ||= (e) => n("confirm")
				}, d(h(r).saveGate.confirm), 1)])
			])], 8, qe)) : m("", !0)]),
			_: 1
		}));
	}
}), rt = {
	class: "tpl-header tpl:absolute tpl:top-0 tpl:right-0 tpl:left-0 tpl:z-50 tpl:grid tpl:h-14 tpl:grid-cols-[1fr_auto_1fr] tpl:items-center tpl:px-4",
	style: {
		"background-color": "color-mix(in srgb, var(--tpl-bg) 80%, transparent)",
		"backdrop-filter": "blur(12px)",
		"-webkit-backdrop-filter": "blur(12px)",
		"box-shadow": "var(--tpl-shadow-md)",
		"border-bottom": "1px solid var(--tpl-border)"
	}
}, it = { class: "tpl-header-left tpl:flex tpl:min-w-[200px] tpl:items-center tpl:gap-3" }, at = {
	key: 0,
	class: "tpl:text-xs tpl:opacity-60 tpl:text-[var(--tpl-text-muted)]"
}, ot = { class: "tpl-header-center tpl:flex tpl:items-center tpl:justify-center tpl:gap-10" }, st = { class: "tpl-header-right tpl:flex tpl:min-w-[200px] tpl:items-center tpl:justify-end tpl:gap-3" }, ct = ["data-tooltip"], lt = {
	key: 1,
	"aria-live": "polite",
	class: "tpl-status tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-xs tpl:text-[var(--tpl-success)]"
}, ut = {
	key: 2,
	"aria-live": "polite",
	class: "tpl-status tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-xs tpl:text-[var(--tpl-text-muted)]"
}, dt = ["aria-label", "aria-expanded"], ft = {
	key: 0,
	class: "tpl:inline-flex tpl:size-4.5 tpl:items-center tpl:justify-center tpl:rounded-full tpl:text-[10px] tpl:font-semibold tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]"
}, pt = ["aria-expanded"], mt = {
	key: 0,
	class: "tpl:absolute tpl:right-0 tpl:top-full tpl:z-50 tpl:mt-1 tpl:origin-top-right"
}, ht = ["disabled"], gt = ["disabled"], _t = /* @__PURE__ */ E({
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
		let t = u(() => import("./CollaboratorBar-SeUOuLeJ.js")), n = u(() => import("./SnapshotHistory-CYVi7fvQ.js")), r = u(() => import("./AiFeatureMenu-BtEcjxLL.js")), { t: a } = V(), { t: o, format: c } = X();
		return (l, u) => (i(), p("header", rt, [
			x("div", it, [e.featureFlags.templateLimit.value === null ? m("", !0) : (i(), p("span", at, d(h(c)(h(o).header.templatesUsed, {
				used: e.featureFlags.templateCount.value,
				max: e.featureFlags.templateLimit.value
			})), 1))]),
			x("div", ot, [
				D(ve, {
					viewport: e.editor.state.viewport,
					onChange: e.editor.setViewport
				}, null, 8, ["viewport", "onChange"]),
				D(ce, {
					"dark-mode": e.editor.state.darkMode,
					onChange: e.editor.setDarkMode
				}, null, 8, ["dark-mode", "onChange"]),
				D(Z, {
					"preview-mode": e.editor.state.previewMode,
					onChange: e.editor.setPreviewMode
				}, null, 8, ["preview-mode", "onChange"]),
				e.editor.state.previewMode && !e.core.previewResolution.supersedesSamples.value ? (i(), v(ye, {
					key: 0,
					"sample-mode": e.core.mergeTagSampleMode.value,
					onChange: u[0] ||= (t) => e.core.mergeTagSampleMode.value = t
				}, null, 8, ["sample-mode"])) : m("", !0),
				e.collaboration && e.isCollaborationEnabled ? (i(), v(h(t), {
					key: 1,
					collaborators: e.collaboration.collaborators.value,
					"is-connected": e.websocket.isConnected.value
				}, null, 8, ["collaborators", "is-connected"])) : m("", !0),
				e.snapshotPreview.snapshotHistoryInstance.value ? (i(), v(h(n), {
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
				])) : m("", !0)
			]),
			x("div", st, [
				e.featureFlags.saveStatus.value === "error" ? (i(), p("div", {
					key: 0,
					"aria-live": "assertive",
					class: "tpl-tooltip tpl-status tpl:flex tpl:items-center tpl:gap-1.5 tpl:text-xs tpl:text-[var(--tpl-danger)]",
					"data-tooltip": e.featureFlags.saveErrorMessage.value
				}, [D(h(K), {
					size: 12,
					"stroke-width": 2.5
				}), T(" " + d(h(o).header.saveFailed), 1)], 8, ct)) : e.featureFlags.saveStatus.value === "saved" ? (i(), p("div", lt, [D(h(G), {
					size: 12,
					"stroke-width": 2.5
				}), T(" " + d(h(o).header.saved), 1)])) : e.editor.state.isDirty ? (i(), p("div", ut, [u[5] ||= x("span", { class: "tpl-pulse tpl:size-1.5 tpl:rounded-full tpl:bg-[var(--tpl-primary)]" }, null, -1), T(" " + d(h(o).header.unsaved), 1)])) : m("", !0),
				e.commentsInstance.isEnabled.value && e.featureFlags.hasTemplateSaved.value ? (i(), p("button", {
					key: 3,
					"aria-label": e.commentsInstance.unresolvedCount.value > 0 ? `${h(o).comments.button} (${e.commentsInstance.unresolvedCount.value})` : h(o).comments.button,
					"aria-expanded": e.panelState.commentsOpen.value,
					class: b(h($)),
					style: C({
						backgroundColor: e.panelState.commentsOpen.value ? "var(--tpl-primary)" : "transparent",
						color: e.panelState.commentsOpen.value ? "var(--tpl-bg)" : "var(--tpl-primary)",
						borderColor: "var(--tpl-primary)"
					}),
					onClick: u[1] ||= (t) => e.panelState.commentsOpen.value = !e.panelState.commentsOpen.value
				}, [
					D(h(re), {
						size: 16,
						"stroke-width": 2
					}),
					T(" " + d(h(o).comments.button) + " ", 1),
					e.commentsInstance.unresolvedCount.value > 0 && !e.panelState.commentsOpen.value ? (i(), p("span", ft, d(e.commentsInstance.unresolvedCount.value), 1)) : m("", !0)
				], 14, dt)) : m("", !0),
				e.featureFlags.canUseAiGeneration.value && e.featureFlags.hasTemplateSaved.value ? (i(), p("div", {
					key: 4,
					ref: (t) => e.panelState.aiMenuRef.value = t,
					class: "tpl:relative"
				}, [x("button", {
					"aria-expanded": e.panelState.aiMenuOpen.value,
					class: b(["tpl-ai-btn tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:rounded-[var(--tpl-radius-sm)] tpl:border-none tpl:px-4 tpl:py-2 tpl:text-sm tpl:font-semibold tpl:whitespace-nowrap tpl:transition-all tpl:duration-200", e.panelState.aiButtonActive.value ? "tpl-ai-btn--active" : "tpl-ai-btn--idle"]),
					onClick: u[2] ||= _((...t) => e.panelState.toggleAiMenu && e.panelState.toggleAiMenu(...t), ["stop"])
				}, [D(h(H), {
					size: 16,
					"stroke-width": 2,
					class: "tpl-ai-btn-icon"
				}), T(" " + d(h(o).aiChat.button), 1)], 10, pt), D(y, {
					"enter-active-class": "tpl:transition-all tpl:duration-150 tpl:ease-out",
					"enter-from-class": "tpl:scale-95 tpl:opacity-0",
					"enter-to-class": "tpl:scale-100 tpl:opacity-100",
					"leave-active-class": "tpl:transition-all tpl:duration-100 tpl:ease-in",
					"leave-from-class": "tpl:scale-100 tpl:opacity-100",
					"leave-to-class": "tpl:scale-95 tpl:opacity-0"
				}, {
					default: s(() => [e.panelState.aiMenuOpen.value ? (i(), p("div", mt, [D(h(r), {
						"active-feature": e.panelState.activeAiFeature.value,
						onSelect: e.panelState.handleAiFeatureSelect
					}, null, 8, ["active-feature", "onSelect"])])) : m("", !0)]),
					_: 1
				})], 512)) : m("", !0),
				e.testEmail.isAvailable.value ? (i(), p("button", {
					key: 5,
					class: b(h($)),
					"data-testid": "test-email-trigger",
					style: {
						"background-color": "transparent",
						color: "var(--tpl-primary)",
						"border-color": "var(--tpl-primary)"
					},
					disabled: e.testEmail.isSending.value,
					onClick: u[3] ||= (t) => e.testEmail.open()
				}, [e.testEmail.isSending.value ? (i(), v(h(J), {
					key: 1,
					class: "tpl-spinner",
					size: 16,
					"stroke-width": 2
				})) : (i(), v(h(q), {
					key: 0,
					size: 16,
					"stroke-width": 2
				})), T(" " + d(h(a).testEmail.button), 1)], 10, ht)) : m("", !0),
				x("button", {
					class: b(h($)),
					style: {
						"background-color": "transparent",
						color: "var(--tpl-primary)",
						"border-color": "var(--tpl-primary)"
					},
					disabled: e.isSaveDisabled,
					onClick: u[4] ||= (e) => l.$emit("save")
				}, [e.isSaving ? (i(), v(h(J), {
					key: 1,
					class: "tpl-spinner",
					size: 16,
					"stroke-width": 2
				})) : (i(), v(h(U), {
					key: 0,
					size: 16,
					"stroke-width": 2
				})), T(" " + d(e.isSaving ? h(o).header.saving : h(o).header.save), 1)], 10, gt)
			])
		]));
	}
}), vt = /* @__PURE__ */ E({
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
		let n = u(() => import("./AiChatSidebar-D6jGwb4y.js")), r = u(() => import("./CommentsSidebar-FPbg-FuU.js")), a = u(() => import("./DesignReferenceSidebar-ChB_HBK1.js")), o = u(() => import("./TemplateScoringPanel-D0KrxVnr.js")), s = u(async () => {
			try {
				return (await import("./src-B2LpXMIw.js")).MediaLibraryModal;
			} catch {
				throw Error("[Templatical] Cloud media library requires the optional peer dependency '@templatical/media-library'. Please install it.");
			}
		});
		function l(e, t, n) {
			t.history.record(), n.setContent(e), t.conditionPreview.reset();
		}
		let d = c(null);
		function f(e) {
			d.value?.filterByBlock(e);
		}
		return t({ filterCommentsByBlock: f }), (t, c) => (i(), p(w, null, [
			D(h(n), {
				visible: e.panelState.aiChatOpen.value,
				"on-apply": (t) => l(t, e.core, e.editor),
				onClose: c[0] ||= (t) => e.panelState.aiChatOpen.value = !1
			}, null, 8, ["visible", "on-apply"]),
			D(h(o), {
				visible: e.panelState.scoringPanelOpen.value,
				onClose: c[1] ||= (t) => e.panelState.scoringPanelOpen.value = !1
			}, null, 8, ["visible"]),
			D(h(a), {
				visible: e.panelState.designReferenceOpen.value,
				"has-existing-blocks": e.editor.content.value.blocks.length > 0,
				onClose: c[2] ||= (t) => e.panelState.designReferenceOpen.value = !1,
				onApply: c[3] ||= (t) => l(t, e.core, e.editor)
			}, null, 8, ["visible", "has-existing-blocks"]),
			D(h(r), {
				ref_key: "commentsSidebar",
				ref: d,
				visible: e.panelState.commentsOpen.value,
				onClose: c[4] ||= (t) => e.panelState.commentsOpen.value = !1
			}, null, 8, ["visible"]),
			D(h(s), {
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
}), yt = {
	key: 0,
	class: "tpl-loading tpl:absolute tpl:inset-0 tpl:z-overlay tpl:flex tpl:flex-col tpl:bg-[var(--tpl-bg)]"
}, bt = { class: "tpl:flex tpl:flex-1 tpl:overflow-hidden" }, xt = { class: "tpl:flex tpl:w-12 tpl:shrink-0 tpl:flex-col tpl:items-center tpl:gap-4 tpl:py-5 tpl:border-r tpl:border-[var(--tpl-border)]" }, St = /* @__PURE__ */ E({
	__name: "CloudLoadingOverlay",
	props: { visible: { type: Boolean } },
	setup(e) {
		return (t, n) => e.visible ? (i(), p("div", yt, [n[1] ||= l("<div class=\"tpl:flex tpl:h-14 tpl:shrink-0 tpl:items-center tpl:justify-between tpl:px-4 tpl:border-b tpl:border-[var(--tpl-border)]\"><div class=\"tpl-shimmer tpl:h-5 tpl:w-28 tpl:rounded-[var(--tpl-radius-sm)]\"></div><div class=\"tpl:flex tpl:gap-3\"><div class=\"tpl-shimmer tpl:h-8 tpl:w-20 tpl:rounded-[var(--tpl-radius-sm)]\"></div><div class=\"tpl-shimmer tpl:h-8 tpl:w-20 tpl:rounded-[var(--tpl-radius-sm)]\"></div></div></div>", 1), x("div", bt, [x("div", xt, [(i(), p(w, null, o(5, (e) => x("div", {
			key: e,
			class: "tpl-shimmer tpl:size-7 tpl:rounded-[var(--tpl-radius-sm)]"
		})), 64))]), n[0] ||= l("<div class=\"tpl:flex tpl:flex-1 tpl:items-start tpl:justify-center tpl:overflow-auto tpl:p-8 tpl:bg-[var(--tpl-canvas-bg)]\"><div class=\"tpl:w-full tpl:max-w-[600px] tpl:rounded-[var(--tpl-radius)] tpl:p-6 tpl:bg-[var(--tpl-bg)] tpl:shadow-[var(--tpl-shadow-sm)]\"><div class=\"tpl:space-y-2 tpl:py-4\"><div class=\"tpl-shimmer tpl:h-3 tpl:w-3/4 tpl:rounded\"></div><div class=\"tpl-shimmer tpl:h-3 tpl:w-full tpl:rounded\"></div><div class=\"tpl-shimmer tpl:h-3 tpl:w-5/6 tpl:rounded\"></div></div><div class=\"tpl:py-4\"><div class=\"tpl-shimmer tpl:h-44 tpl:w-full tpl:rounded-[var(--tpl-radius-sm)]\"></div></div><div class=\"tpl:space-y-2 tpl:py-4\"><div class=\"tpl-shimmer tpl:h-3 tpl:w-full tpl:rounded\"></div><div class=\"tpl-shimmer tpl:h-3 tpl:w-2/3 tpl:rounded\"></div></div><div class=\"tpl:flex tpl:justify-center tpl:py-4\"><div class=\"tpl-shimmer tpl:h-10 tpl:w-36 tpl:rounded-[var(--tpl-radius-sm)]\"></div></div><div class=\"tpl:space-y-2 tpl:py-4\"><div class=\"tpl-shimmer tpl:mx-auto tpl:h-2.5 tpl:w-1/2 tpl:rounded\"></div><div class=\"tpl-shimmer tpl:mx-auto tpl:h-2.5 tpl:w-1/3 tpl:rounded\"></div></div></div></div><div class=\"tpl:flex tpl:w-[320px] tpl:shrink-0 tpl:flex-col tpl:gap-4 tpl:p-4 tpl:border-l tpl:border-[var(--tpl-border)]\"><div class=\"tpl-shimmer tpl:h-8 tpl:rounded-[var(--tpl-radius-sm)]\"></div><div class=\"tpl-shimmer tpl:h-32 tpl:rounded-[var(--tpl-radius)]\"></div><div class=\"tpl-shimmer tpl:h-32 tpl:rounded-[var(--tpl-radius)]\"></div></div>", 2)])])) : m("", !0);
	}
}), Ct = {
	key: 0,
	role: "alert",
	class: "tpl-error tpl:absolute tpl:inset-0 tpl:z-overlay tpl:flex tpl:flex-col tpl:items-center tpl:justify-center tpl:gap-6 tpl:px-8 tpl:bg-[var(--tpl-bg)]"
}, wt = { class: "tpl:flex tpl:size-16 tpl:items-center tpl:justify-center tpl:rounded-full tpl:bg-[var(--tpl-danger-light)]" }, Tt = { class: "tpl:flex tpl:flex-col tpl:items-center tpl:gap-2 tpl:text-center" }, Et = { class: "tpl:text-lg tpl:font-semibold tpl:text-[var(--tpl-text)]" }, Dt = { class: "tpl:max-w-md tpl:text-sm tpl:text-[var(--tpl-text-muted)]" }, Ot = /* @__PURE__ */ E({
	__name: "CloudErrorOverlay",
	props: {
		error: {},
		visible: { type: Boolean }
	},
	emits: ["retry"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = X();
		function a(e) {
			return "isUnauthorized" in e && e.isUnauthorized ? r.error.authFailed : "isNotFound" in e && e.isNotFound ? r.error.templateNotFound : r.error.defaultMessage;
		}
		function o(e) {
			return "isNotFound" in e && !!e.isNotFound;
		}
		return (t, s) => e.visible && e.error ? (i(), p("div", Ct, [
			x("div", wt, [D(h(K), {
				size: 32,
				"stroke-width": 1.5,
				class: "tpl:text-[var(--tpl-danger)]"
			})]),
			x("div", Tt, [x("h2", Et, d(h(r).error.title), 1), x("p", Dt, d(a(e.error)), 1)]),
			o(e.error) ? m("", !0) : (i(), p("button", {
				key: 0,
				class: "tpl-btn tpl-btn-primary tpl:inline-flex tpl:items-center tpl:gap-2 tpl:rounded-md tpl:px-4 tpl:py-2.5 tpl:text-sm tpl:font-medium tpl:shadow-xs tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
				onClick: s[0] ||= (e) => n("retry")
			}, d(h(r).error.retry), 1))
		])) : m("", !0);
	}
}), kt = {
	key: 0,
	class: "tpl-preview-banner tpl:absolute tpl:top-14 tpl:right-0 tpl:left-0 tpl:z-40 tpl:flex tpl:items-center tpl:justify-center tpl:gap-4 tpl:px-4 tpl:py-3 tpl:bg-[var(--tpl-primary-light)] tpl:border-b tpl:border-[var(--tpl-primary)]"
}, At = { class: "tpl:flex tpl:items-center tpl:gap-2 tpl:text-sm tpl:text-[var(--tpl-text)]" }, jt = { class: "tpl:flex tpl:items-center tpl:gap-2" }, Mt = /* @__PURE__ */ E({
	__name: "SnapshotPreviewBanner",
	props: { visible: { type: Boolean } },
	emits: ["cancel", "confirm"],
	setup(e, { emit: t }) {
		let n = t, { t: r } = X();
		return (t, a) => e.visible ? (i(), p("div", kt, [x("div", At, [D(h(Y), {
			size: 18,
			"stroke-width": 2,
			class: "tpl:text-[var(--tpl-primary)]"
		}), x("span", null, d(h(r).snapshotPreview.message), 1)]), x("div", jt, [x("button", {
			class: "tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:transition-all tpl:duration-150 tpl:text-[var(--tpl-text-muted)] tpl:border tpl:border-[var(--tpl-border)]",
			style: { "background-color": "transparent" },
			onClick: a[0] ||= (e) => n("cancel")
		}, d(h(r).snapshotPreview.cancel), 1), x("button", {
			class: "tpl:rounded-md tpl:px-3 tpl:py-1.5 tpl:text-sm tpl:font-medium tpl:transition-all tpl:duration-150 tpl:hover:opacity-90 tpl:bg-[var(--tpl-primary)] tpl:text-[var(--tpl-bg)]",
			onClick: a[1] ||= (e) => n("confirm")
		}, d(h(r).snapshotPreview.restore), 1)])])) : m("", !0);
	}
}), Nt = {
	key: 0,
	role: "status",
	"aria-live": "polite",
	class: "tpl:absolute tpl:top-16 tpl:left-1/2 tpl:z-toast tpl:-translate-x-1/2 tpl:rounded-[var(--tpl-radius)] tpl:px-4 tpl:py-2.5 tpl:text-sm tpl:shadow-lg",
	style: {
		"background-color": "var(--tpl-warning-light)",
		color: "var(--tpl-text)",
		border: "1px solid var(--tpl-warning)"
	}
}, Pt = /* @__PURE__ */ E({
	__name: "CollabUndoToast",
	props: { visible: { type: Boolean } },
	setup(e) {
		let { t } = V();
		return (n, r) => e.visible ? (i(), p("div", Nt, d(h(t).history.collabWarning), 1)) : m("", !0);
	}
}), Ft = ["data-tpl-theme"], It = { class: "tpl:sticky tpl:top-0 tpl:z-40 tpl:h-0" }, Lt = { class: "tpl-main tpl:flex tpl:justify-center tpl:p-8" }, Rt = ["aria-label"], zt = /*#__PURE__*/ ae(/* @__PURE__ */ E({
	__name: "CloudEditor",
	props: {
		config: {},
		translations: {},
		cloudTranslations: {},
		fontsManager: {},
		shadowRoot: {}
	},
	emits: ["ready"],
	setup(e, { expose: r, emit: o }) {
		let l = u(() => import("./SavedBlocksPanels-BDd8FH6l.js")), f = u(() => import("./TestEmailPanel-BAnKtbSu.js")), w = e;
		a(z, w.cloudTranslations);
		let E = o, O = c(null), k = c(null), A = Ue({
			config: w.config,
			translations: w.translations,
			fontsManager: w.fontsManager,
			emit: E,
			getCommentsSidebar: () => O.value ? { filterByBlock: O.value.filterCommentsByBlock } : null,
			editorRoot: w.shadowRoot,
			containerEl: k
		}), { isInitializing: j, isAuthReady: ee, initError: N, planConfigInstance: P, websocket: F, collaboration: I, isCollaborationEnabled: te, editor: L, core: R, featureFlags: B, mediaLib: ne, exporter: V, testEmail: H, commentsInstance: U, savedBlocks: G, panelState: K, snapshotPreview: q, collabWarning: J, setThemeOverrides: Y, setUiTheme: re } = A, { showNotice: ie } = M(() => w.config.smallScreenNotice);
		async function ae() {
			try {
				await q.confirmRestoreSnapshot();
			} catch {}
		}
		let X = Ge({
			config: w.config,
			editor: L,
			websocket: F,
			planConfigInstance: P,
			snapshotPreview: q,
			core: R,
			exporter: V,
			featureFlags: B,
			isDestroyed: A.isDestroyed
		}), Z = Ke({
			issues: R.templateLint ? R.templateLint.issues : c([]),
			planConfig: P.config
		});
		async function Q() {
			await Z.tryRunSave(() => X.saveTemplate().catch((e) => w.config.onError?.(e)));
		}
		return A.onSaveHook.value = Q, t(() => {
			A.initialize();
		}), g(() => {
			A.destroy();
		}), r({
			getContent: () => L.content.value,
			setContent: (e) => L.setContent(e),
			setTheme: re,
			setThemeOverrides: Y,
			create: X.createTemplate,
			load: X.loadTemplate,
			save: X.saveTemplate,
			sendTestEmail: (e) => H.send(e)
		}), (t, r) => (i(), p("div", {
			ref_key: "rootEl",
			ref: k,
			class: b(["tpl tpl:relative tpl:h-full tpl:overflow-hidden", { "tpl:dark": h(L).state.darkMode }]),
			"data-tpl-theme": h(R).resolvedTheme.value,
			style: C(h(R).themeStyles.value),
			onDragover: r[6] ||= _(() => {}, ["prevent"]),
			onDrop: r[7] ||= _(() => {}, ["prevent"])
		}, [
			D(le),
			D(y, {
				"enter-active-class": "tpl:transition-opacity tpl:duration-200",
				"enter-from-class": "tpl:opacity-100",
				"enter-to-class": "tpl:opacity-100",
				"leave-active-class": "tpl:transition-opacity tpl:duration-300",
				"leave-from-class": "tpl:opacity-100",
				"leave-to-class": "tpl:opacity-0"
			}, {
				default: s(() => [D(St, { visible: h(j) || h(L).state.isLoading }, null, 8, ["visible"])]),
				_: 1
			}),
			D(y, {
				"enter-active-class": "tpl:transition-opacity tpl:duration-200",
				"enter-from-class": "tpl:opacity-0",
				"enter-to-class": "tpl:opacity-100",
				"leave-active-class": "tpl:transition-opacity tpl:duration-300",
				"leave-from-class": "tpl:opacity-100",
				"leave-to-class": "tpl:opacity-0"
			}, {
				default: s(() => [D(Ot, {
					error: h(N),
					visible: !!h(N) && !h(j),
					onRetry: h(A).initialize
				}, null, 8, [
					"error",
					"visible",
					"onRetry"
				])]),
				_: 1
			}),
			D(_t, {
				editor: h(L),
				core: h(R),
				"feature-flags": h(B),
				"panel-state": h(K),
				"snapshot-preview": h(q),
				"comments-instance": h(U),
				"test-email": h(H),
				websocket: h(F),
				collaboration: h(I),
				"is-collaboration-enabled": h(te),
				"is-saving": h(L).state.isSaving || h(B).isSaveExporting.value,
				"is-save-disabled": h(L).state.isSaving || h(B).isSaveExporting.value || !h(L).state.isDirty,
				onSave: Q
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
			D(nt, {
				open: h(Z).modalOpen.value,
				issues: h(Z).blockingIssues.value,
				onCancel: h(Z).cancel,
				onConfirm: h(Z).confirmAndSave
			}, null, 8, [
				"open",
				"issues",
				"onCancel",
				"onConfirm"
			]),
			D(Mt, {
				visible: h(q).isPreviewingSnapshot.value,
				onCancel: h(q).cancelPreview,
				onConfirm: ae
			}, null, 8, ["visible", "onCancel"]),
			D(y, {
				"enter-active-class": "tpl:transition-all tpl:duration-200 tpl:ease-out",
				"enter-from-class": "tpl:translate-y-[-8px] tpl:opacity-0",
				"enter-to-class": "tpl:translate-y-0 tpl:opacity-100",
				"leave-active-class": "tpl:transition-all tpl:duration-300 tpl:ease-in",
				"leave-from-class": "tpl:translate-y-0 tpl:opacity-100",
				"leave-to-class": "tpl:translate-y-[-8px] tpl:opacity-0"
			}, {
				default: s(() => [D(Pt, { visible: h(J).collabUndoWarningVisible.value }, null, 8, ["visible"])]),
				_: 1
			}),
			n(D(oe, null, null, 512), [[S, !h(L).state.previewMode]]),
			x("div", {
				class: b(["tpl-body tpl:absolute tpl:bottom-0 tpl:overflow-auto", [h(L).state.previewMode ? "tpl:left-0 tpl:right-0" : h(K).rightPanelOpen.value ? "tpl:left-12 tpl:right-[680px]" : "tpl:left-12 tpl:right-[320px]", h(q).isPreviewingSnapshot.value ? "tpl:top-[104px]" : "tpl:top-14"]]),
				style: {
					transition: "all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
					"background-color": "var(--tpl-canvas-bg)"
				}
			}, [x("div", It, [D(y, { name: "tpl-restore-btn" }, {
				default: s(() => [h(R).conditionPreview.hasHiddenBlocks.value && h(R).appliesConditionFilter.value ? (i(), p("button", {
					key: 0,
					class: "tpl:absolute tpl:left-1/2 tpl:top-2 tpl:-translate-x-1/2 tpl:inline-flex tpl:items-center tpl:gap-1.5 tpl:rounded-full tpl:border tpl:px-3.5 tpl:py-1.5 tpl:text-xs tpl:font-medium tpl:whitespace-nowrap tpl:shadow-md tpl:hover:opacity-80",
					style: {
						"background-color": "var(--tpl-warning-light)",
						color: "var(--tpl-warning)",
						"border-color": "var(--tpl-warning)",
						"backdrop-filter": "blur(8px)"
					},
					"data-testid": "restore-hidden-blocks",
					onClick: r[0] ||= (e) => h(R).conditionPreview.reset()
				}, [D(h(W), {
					size: 13,
					"stroke-width": 2
				}), T(" " + d(h(R).t.blockSettings.restoreHiddenBlocks), 1)])) : m("", !0)]),
				_: 1
			})]), x("main", Lt, [D(_e, {
				viewport: h(L).state.viewport,
				content: h(R).previewResolution.content.value,
				"selected-block-id": h(L).state.selectedBlockId,
				"dark-mode": h(L).state.darkMode,
				"preview-mode": h(L).state.previewMode,
				"locked-blocks": h(I)?.lockedBlocks.value ?? void 0,
				onSelectBlock: h(L).selectBlock,
				onOpenAiChat: r[1] ||= (e) => h(K).aiChatOpen.value = !0,
				onOpenDesignReference: r[2] ||= (e) => h(K).designReferenceOpen.value = !0
			}, null, 8, [
				"viewport",
				"content",
				"selected-block-id",
				"dark-mode",
				"preview-mode",
				"locked-blocks",
				"onSelectBlock"
			])])], 2),
			e.config.branding !== !1 && !h(B).isWhiteLabeled.value ? (i(), v(me, {
				key: 0,
				"position-class": [h(L).state.previewMode ? "tpl:left-0 tpl:right-0" : h(K).rightPanelOpen.value ? "tpl:left-12 tpl:right-[680px]" : "tpl:left-12 tpl:right-[320px]"]
			}, null, 8, ["position-class"])) : m("", !0),
			x("div", {
				class: "tpl-sr-only",
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "true",
				"aria-label": h(R).t.landmarks.reorderAnnouncements
			}, d(h(R).keyboardReorder.announcement.value), 9, Rt),
			n(D(he, {
				"selected-block": h(L).selectedBlock.value,
				settings: h(L).content.value.settings,
				"shifted-left": h(K).rightPanelOpen.value,
				onUpdateBlock: r[3] ||= (e) => h(L).updateBlock(h(L).selectedBlock.value.id, e),
				onDeleteBlock: r[4] ||= (e) => h(R).blockActions.deleteBlock(h(L).selectedBlock.value.id),
				onDuplicateBlock: r[5] ||= (e) => h(R).blockActions.duplicateBlock(h(L).selectedBlock.value),
				onUpdateSettings: h(L).updateSettings
			}, null, 8, [
				"selected-block",
				"settings",
				"shifted-left",
				"onUpdateSettings"
			]), [[S, !h(L).state.previewMode]]),
			!h(j) && h(ee) ? (i(), v(vt, {
				key: 1,
				ref_key: "cloudPanelsRef",
				ref: O,
				config: w.config,
				editor: h(L),
				core: h(R),
				"panel-state": h(K),
				"plan-config-instance": h(P),
				"media-lib": h(ne)
			}, null, 8, [
				"config",
				"editor",
				"core",
				"panel-state",
				"plan-config-instance",
				"media-lib"
			])) : m("", !0),
			h(G).isAvailable.value ? (i(), v(h(l), {
				key: 2,
				feature: h(G)
			}, null, 8, ["feature"])) : m("", !0),
			h(H).isAvailable.value ? (i(), v(h(f), {
				key: 3,
				feature: h(H)
			}, null, 8, ["feature"])) : m("", !0),
			x("div", {
				ref: (e) => h(R).popoverRoot.value = e,
				class: "tpl-popover-root"
			}, null, 512),
			D(de),
			D(ge),
			h(ie) ? (i(), v(fe, { key: 4 })) : m("", !0)
		], 46, Ft));
	}
}), [["__scopeId", "data-v-16786f1a"]]);
//#endregion
export { zt as default };

//# sourceMappingURL=CloudEditor-BJ4-pPAl.js.map