import { r as e } from "./rolldown-runtime-B0aSnxlc.js";
import { J as t, X as n, Y as r, Z as i, f as a, z as o } from "./draggable-BRF_Q_jB.js";
import { I as s, t as c } from "./src-CZjSXPYq.js";
//#region ../core/src/cloud/auth.ts
var l = class e {
	static DEFAULT_BASE_URL = "https://templatical.com";
	accessToken = null;
	expiresAt = null;
	_projectId = null;
	_tenantId = null;
	_tenantSlug = null;
	_testEmailConfig = null;
	_userConfig = null;
	url;
	baseUrl;
	requestOptions;
	onError;
	refreshPromise = null;
	static REFRESH_THRESHOLD_MS = 6e4;
	constructor(t) {
		this.url = t.url, this.baseUrl = (t.baseUrl ?? e.DEFAULT_BASE_URL).replace(/\/$/, ""), this.requestOptions = t.requestOptions ?? {}, this.onError = t.onError;
	}
	resolveUrl(e) {
		if (e.startsWith("http://") || e.startsWith("https://")) return e;
		let t = e.startsWith("/") ? e : `/${e}`;
		return `${this.baseUrl}${t}`;
	}
	get projectId() {
		if (!this._projectId) throw Error("Project ID not available. Call initialize() first.");
		return this._projectId;
	}
	get tenantId() {
		if (!this._tenantId) throw Error("Tenant ID not available. Call initialize() first.");
		return this._tenantId;
	}
	get tenantSlug() {
		if (!this._tenantSlug) throw Error("Tenant slug not available. Call initialize() first.");
		return this._tenantSlug;
	}
	get testEmailConfig() {
		return this._testEmailConfig;
	}
	get userConfig() {
		return this._userConfig;
	}
	get accessTokenValue() {
		return this.accessToken;
	}
	async initialize() {
		await this.ensureToken();
	}
	async ensureToken() {
		return this.accessToken && !this.isTokenExpiringSoon() ? this.accessToken : this.refreshToken();
	}
	isTokenExpiringSoon() {
		return !this.expiresAt || this.expiresAt.getTime() - Date.now() < e.REFRESH_THRESHOLD_MS;
	}
	async refreshToken() {
		if (this.refreshPromise) return this.refreshPromise;
		this.refreshPromise = this.performRefresh();
		try {
			return await this.refreshPromise;
		} finally {
			this.refreshPromise = null;
		}
	}
	async performRefresh() {
		try {
			let e = this.requestOptions.method ?? "POST", t = {
				Accept: "application/json",
				...this.requestOptions.headers
			}, n = {
				method: e,
				headers: t,
				credentials: this.requestOptions.credentials ?? "include"
			};
			e === "POST" && this.requestOptions.body && (t["Content-Type"] = "application/json", n.body = JSON.stringify(this.requestOptions.body));
			let r = await fetch(this.url, n);
			if (!r.ok) throw new c(`Token refresh failed: ${r.status}`, r.status);
			let i = await r.json();
			if (!i.token || !i.expires_at || !i.project_id || !i.tenant) throw Error("Invalid token response: missing token, expires_at, project_id, or tenant");
			return this.accessToken = i.token, this.expiresAt = /* @__PURE__ */ new Date(i.expires_at * 1e3), this._projectId = i.project_id, this._tenantSlug = i.tenant, this._testEmailConfig = i.test_email?.allowed_emails && i.test_email?.signature ? {
				allowedEmails: i.test_email.allowed_emails,
				signature: i.test_email.signature
			} : null, this._userConfig = i.user?.id && i.user?.name && i.user?.signature ? {
				id: i.user.id,
				name: i.user.name,
				signature: i.user.signature
			} : null, this.accessToken;
		} catch (e) {
			let t = e instanceof Error ? e : Error("Token refresh failed", { cause: e });
			throw this.onError?.(t), t;
		}
	}
	async authenticatedFetch(e, t = {}) {
		let n = await this.ensureToken(), r = this.resolveUrl(e), i = async (e) => fetch(r, {
			...t,
			headers: {
				...t.headers,
				Authorization: `Bearer ${e}`
			}
		}), a = await i(n);
		return a.status === 401 && (a = await i(await this.refreshToken())), a;
	}
};
function u(e, t) {
	return e.mode === "direct" ? new l({
		url: `${(e.baseUrl ?? "https://templatical.com").replace(/\/$/, "")}/api/v1/auth/token`,
		baseUrl: e.baseUrl,
		requestOptions: {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: {
				client_id: e.clientId,
				client_secret: e.clientSecret,
				tenant: e.tenant,
				client_type: "sdk"
			}
		},
		onError: t
	}) : new l({
		url: e.url,
		baseUrl: e.baseUrl,
		requestOptions: e.requestOptions,
		onError: t
	});
}
//#endregion
//#region ../core/src/cloud/url-builder.ts
function d(e, t) {
	return e.replace(/\{(\w+)\}/g, (e, n) => encodeURIComponent(t[n] ?? ""));
}
var f = "/api/v1/projects/{project}/tenants/{tenant}", p = `${f}/templates/{template}`, m = `${p}/ai`, h = `${f}/media`, g = `${h}/folders`, _ = `${f}/saved-modules`, v = {
	health: "/api/v1/health",
	"projects.config": `${f}/config`,
	"broadcasting.auth": `${f}/broadcasting/auth`,
	"templates.store": `${f}/templates`,
	"templates.show": `${p}`,
	"templates.update": `${p}`,
	"templates.destroy": `${p}`,
	"templates.export": `${p}/export`,
	"templates.importFromBeefree": `${f}/templates/import/from-beefree`,
	"templates.sendTestEmail": `${p}/send-test-email`,
	"snapshots.index": `${p}/snapshots`,
	"snapshots.store": `${p}/snapshots`,
	"snapshots.show": `${p}/snapshots/{snapshot}`,
	"snapshots.restore": `${p}/snapshots/{snapshot}/restore`,
	"comments.index": `${p}/comments`,
	"comments.store": `${p}/comments`,
	"comments.update": `${p}/comments/{comment}`,
	"comments.destroy": `${p}/comments/{comment}`,
	"comments.resolve": `${p}/comments/{comment}/resolve`,
	"ai.generate": `${m}/generate`,
	"ai.conversationMessages": `${m}/conversation-messages`,
	"ai.suggestions": `${m}/suggestions`,
	"ai.rewriteText": `${m}/rewrite-text`,
	"ai.score": `${m}/score`,
	"ai.fixFinding": `${m}/fix-finding`,
	"ai.generateFromDesign": `${m}/generate-from-design`,
	"media.upload": `${h}/upload`,
	"media.browse": `${h}/browse`,
	"media.delete": `${h}/delete`,
	"media.move": `${h}/move`,
	"media.update": `${h}/{media}`,
	"media.replace": `${h}/{media}/replace`,
	"media.checkUsage": `${h}/check-usage`,
	"media.frequentlyUsed": `${h}/frequently-used`,
	"media.importFromUrl": `${h}/import-from-url`,
	"folders.index": `${g}`,
	"folders.store": `${g}`,
	"folders.update": `${g}/{mediaFolder}`,
	"folders.destroy": `${g}/{mediaFolder}`,
	"savedModules.index": `${_}`,
	"savedModules.store": `${_}`,
	"savedModules.update": `${_}/{savedModule}`,
	"savedModules.destroy": `${_}/{savedModule}`
}, y = class {
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
			let e = await n.json().catch(() => ({ message: `HTTP error ${n.status}` })), t = this.extractFirstValidationError(e);
			throw new c(t, n.status);
		}
		if (n.status !== 204) return (await n.json()).data;
	}
	extractFirstValidationError(e) {
		if (e.errors) {
			let t = Object.keys(e.errors)[0];
			if (t && e.errors[t]?.length > 0) return e.errors[t][0];
		}
		return e.message;
	}
	async createTemplate(e) {
		return this.request(d(v["templates.store"], this.baseParams), {
			method: "POST",
			body: JSON.stringify({ content: e })
		});
	}
	async getTemplate(e) {
		return this.request(d(v["templates.show"], {
			...this.baseParams,
			template: e
		}));
	}
	async updateTemplate(e, t) {
		return this.request(d(v["templates.update"], {
			...this.baseParams,
			template: e
		}), {
			method: "PUT",
			body: JSON.stringify({ content: t })
		});
	}
	async createSnapshot(e, t) {
		return this.request(d(v["snapshots.store"], {
			...this.baseParams,
			template: e
		}), {
			method: "POST",
			body: JSON.stringify({ content: t })
		});
	}
	async deleteTemplate(e) {
		return this.request(d(v["templates.destroy"], {
			...this.baseParams,
			template: e
		}), { method: "DELETE" });
	}
	async getSnapshots(e) {
		return this.request(d(v["snapshots.index"], {
			...this.baseParams,
			template: e
		}));
	}
	async restoreSnapshot(e, t) {
		return this.request(d(v["snapshots.restore"], {
			...this.baseParams,
			template: e,
			snapshot: t
		}), { method: "POST" });
	}
	async exportTemplate(e, t) {
		let n = t ? JSON.stringify({
			custom_fonts: t.customFonts,
			default_fallback: t.defaultFallback
		}) : void 0;
		return this.request(d(v["templates.export"], {
			...this.baseParams,
			template: e
		}), {
			method: "POST",
			body: n
		});
	}
	async sendTestEmail(e, t) {
		await this.request(d(v["templates.sendTestEmail"], {
			...this.baseParams,
			template: e
		}), {
			method: "POST",
			body: JSON.stringify(t)
		});
	}
	commentsUrl(e, t) {
		return t ? d(v["comments.update"], {
			...this.baseParams,
			template: e,
			comment: t
		}) : d(v["comments.index"], {
			...this.baseParams,
			template: e
		});
	}
	async getComments(e) {
		return this.request(this.commentsUrl(e));
	}
	async createComment(e, t, n) {
		return this.request(this.commentsUrl(e), {
			method: "POST",
			body: JSON.stringify(t),
			headers: n
		});
	}
	async updateComment(e, t, n, r) {
		return this.request(this.commentsUrl(e, t), {
			method: "PUT",
			body: JSON.stringify(n),
			headers: r
		});
	}
	async deleteComment(e, t, n, r) {
		return this.request(this.commentsUrl(e, t), {
			method: "DELETE",
			body: JSON.stringify(n),
			headers: r
		});
	}
	async resolveComment(e, t, n, r) {
		return this.request(d(v["comments.resolve"], {
			...this.baseParams,
			template: e,
			comment: t
		}), {
			method: "POST",
			body: JSON.stringify(n),
			headers: r
		});
	}
	async fetchConfig() {
		return this.request(d(v["projects.config"], this.baseParams));
	}
	async listModules(e, t) {
		let n = d(v["savedModules.index"], this.baseParams), r = new URLSearchParams();
		e && r.set("search", e), t && r.set("category", t);
		let i = r.size > 0 ? `?${r}` : "";
		return this.request(`${n}${i}`);
	}
	async createModule(e) {
		return this.request(d(v["savedModules.store"], this.baseParams), {
			method: "POST",
			body: JSON.stringify(e)
		});
	}
	async updateModule(e, t) {
		return this.request(d(v["savedModules.update"], {
			...this.baseParams,
			savedModule: e
		}), {
			method: "PUT",
			body: JSON.stringify(t)
		});
	}
	async deleteModule(e) {
		return this.request(d(v["savedModules.destroy"], {
			...this.baseParams,
			savedModule: e
		}), { method: "DELETE" });
	}
};
//#endregion
//#region ../core/src/cloud/websocket-client.ts
function b(e) {
	return {
		host: e.host,
		port: e.port,
		appKey: e.app_key
	};
}
var x = class {
	pusher = null;
	authManager;
	config;
	onError;
	constructor(e) {
		this.authManager = e.authManager, this.config = e.config, this.onError = e.onError;
	}
	async connect() {
		if (this.pusher) return;
		let t;
		try {
			({default: t} = await import("./pusher-kUlkqMvR.js").then((t) => /* @__PURE__ */ e(t.t(), 1)));
		} catch {
			throw Error("Cloud features require the optional peer dependency 'pusher-js'. Install it with: npm install pusher-js");
		}
		let { host: n, port: r, appKey: i } = this.config, a = this.authManager.resolveUrl(d(v["broadcasting.auth"], {
			project: this.authManager.projectId,
			tenant: this.authManager.tenantSlug
		}));
		this.pusher = new t(i, {
			wsHost: n,
			wsPort: r,
			wssPort: r,
			forceTLS: !0,
			disableStats: !0,
			enabledTransports: ["ws", "wss"],
			cluster: "",
			channelAuthorization: {
				transport: "ajax",
				endpoint: a,
				headers: {
					Authorization: `Bearer ${this.authManager.accessTokenValue}`,
					Accept: "application/json"
				},
				params: {
					user_id: this.authManager.userConfig?.id ?? "",
					user_name: this.authManager.userConfig?.name ?? "",
					user_signature: this.authManager.userConfig?.signature ?? ""
				}
			}
		}), this.pusher.connection.bind("error", (e) => {
			this.onError?.(e instanceof Error ? e : /* @__PURE__ */ Error("WebSocket connection error"));
		});
	}
	subscribePresence(e) {
		if (!this.pusher) throw Error("WebSocketClient not connected. Call connect() first.");
		return this.pusher.subscribe(e);
	}
	unsubscribe(e) {
		this.pusher?.unsubscribe(e);
	}
	getChannel(e) {
		return this.pusher?.channel(e);
	}
	disconnect() {
		this.pusher &&= (this.pusher.disconnect(), null);
	}
	getSocketId() {
		return this.pusher?.connection.socket_id ?? null;
	}
	get isConnected() {
		return this.pusher?.connection.state === "connected";
	}
};
//#endregion
//#region ../core/src/cloud/mcp-operation-handler.ts
function S(e, t) {
	let { operation: n, data: r } = t;
	switch (n) {
		case "add_block":
			e.addBlock(r.block, r.section_id, r.column_index, r.index);
			break;
		case "update_block":
			e.updateBlock(r.block_id, r.updates);
			break;
		case "delete_block":
			e.removeBlock(r.block_id);
			break;
		case "move_block":
			e.moveBlock(r.block_id, r.index, r.section_id, r.column_index);
			break;
		case "update_settings":
			e.updateSettings(r.updates);
			break;
		case "set_content":
			e.setContent(r.content);
			break;
		case "update_block_style": e.updateBlock(r.block_id, { styles: r.styles });
	}
}
//#endregion
//#region ../core/src/cloud/editor.ts
function C(e) {
	return e === "1" ? 1 : e === "3" ? 3 : 2;
}
function w(e) {
	let t = new y(e.authManager), i = r({
		template: null,
		content: s(e.defaultFontFamily, e.templateDefaults),
		selectedBlockId: null,
		viewport: "desktop",
		darkMode: !1,
		previewMode: !1,
		isDirty: !1,
		isSaving: !1,
		isLoading: !1,
		uiTheme: "auto"
	}), o = a({
		get: () => i.content,
		set: (e) => {
			i.content = e, i.isDirty = !0;
		}
	}), l = a(() => i.selectedBlockId ? d(i.content.blocks, i.selectedBlockId) : null), u = a(() => {
		let e = /* @__PURE__ */ new Set(), t = i.template?.content?.blocks;
		if (!t) return e;
		for (let n of t) if (e.add(n.id), n.type === "section") for (let t of n.children) for (let n of t) e.add(n.id);
		return e;
	});
	function d(e, t) {
		for (let n of e) {
			if (n.id === t) return n;
			if (n.type === "section") for (let e of n.children) {
				let n = d(e, t);
				if (n) return n;
			}
		}
		return null;
	}
	function f(e, t, n = { blocks: e }) {
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (i.id === t) return n;
			if (i.type === "section") for (let e = 0; e < i.children.length; e++) {
				let n = f(i.children[e], t, {
					blocks: i.children[e],
					sectionId: i.id,
					columnIndex: e
				});
				if (n) return n;
			}
		}
		return null;
	}
	function p(t) {
		return e.lockedBlocks?.value.has(t) ?? !1;
	}
	function m(e, t = !0) {
		i.content = e, t && (i.isDirty = !0);
	}
	function h(e) {
		e && p(e) || (i.selectedBlockId = e);
	}
	function g(e) {
		i.viewport = e;
	}
	function _(e) {
		i.darkMode = e;
	}
	function v(e) {
		i.uiTheme = e;
	}
	function b(e) {
		i.previewMode = e, e && (i.selectedBlockId = null);
	}
	function x(e, t) {
		if (p(e)) return;
		let n = d(i.content.blocks, e);
		n && (Object.assign(n, t), i.isDirty = !0);
	}
	function S(e) {
		i.content.settings = {
			...i.content.settings,
			...e
		}, i.isDirty = !0;
	}
	function w(e, t, n = 0, r) {
		if (t) {
			let a = d(i.content.blocks, t);
			if (a && a.type === "section") {
				a.children[n] = a.children[n] || [];
				let t = a.children[n];
				r !== void 0 && r < t.length ? t.splice(r, 0, e) : t.push(e);
			}
		} else r !== void 0 && r < i.content.blocks.length ? i.content.blocks.splice(r, 0, e) : i.content.blocks.push(e);
		i.isDirty = !0;
	}
	function T(e) {
		if (p(e)) return;
		let t = f(i.content.blocks, e);
		if (t) {
			let n = t.blocks.findIndex((t) => t.id === e);
			n !== -1 && (t.blocks.splice(n, 1), i.selectedBlockId === e && (i.selectedBlockId = null), i.isDirty = !0);
		}
	}
	function E(e, t, n, r = 0) {
		let a = f(i.content.blocks, e);
		if (!a) return;
		let o = a.blocks.findIndex((t) => t.id === e);
		if (o === -1) return;
		let s;
		if (n) {
			let e = d(i.content.blocks, n);
			if (!e || e.type !== "section" || r < 0 || r >= C(e.columns)) return;
			e.children[r] = e.children[r] || [], s = e.children[r];
		} else s = i.content.blocks;
		let [c] = a.blocks.splice(o, 1);
		s.splice(t, 0, c), i.isDirty = !0;
	}
	async function D(n) {
		i.isLoading = !0;
		try {
			n && (i.content = n);
			let e = await t.createTemplate(i.content);
			return i.template = e, i.isDirty = !1, e;
		} catch (t) {
			throw e.onError?.(t), t;
		} finally {
			i.isLoading = !1;
		}
	}
	async function O(n) {
		i.isLoading = !0;
		try {
			let e = await t.getTemplate(n);
			return i.template = e, i.content = e.content, i.isDirty = !1, e;
		} catch (t) {
			throw e.onError?.(t), t;
		} finally {
			i.isLoading = !1;
		}
	}
	async function k() {
		if (!i.template?.id) throw new c("No template loaded. Call create() or load() before saving.");
		i.isSaving = !0;
		try {
			let e = await t.updateTemplate(i.template.id, i.content);
			return i.template = e, i.isDirty = !1, e;
		} catch (t) {
			throw e.onError?.(t), t;
		} finally {
			i.isSaving = !1;
		}
	}
	async function A() {
		if (i.template?.id) try {
			await t.createSnapshot(i.template.id, i.content);
		} catch (t) {
			throw e.onError?.(t), t;
		}
	}
	function j() {
		return i.template?.id !== void 0;
	}
	function M() {
		i.isDirty = !0;
	}
	function N(e) {
		let t = f(i.content.blocks, e);
		if (!t) return null;
		let n = t.blocks.findIndex((t) => t.id === e);
		return n === -1 ? null : {
			targetSectionId: t.sectionId,
			columnIndex: t.columnIndex,
			index: n
		};
	}
	return {
		state: n(i),
		content: o,
		selectedBlock: l,
		savedBlockIds: u,
		isBlockLocked: p,
		findBlockLocation: N,
		setContent: m,
		selectBlock: h,
		setViewport: g,
		setDarkMode: _,
		setUiTheme: v,
		setPreviewMode: b,
		updateBlock: x,
		updateSettings: S,
		addBlock: w,
		removeBlock: T,
		moveBlock: E,
		create: D,
		load: O,
		save: k,
		createSnapshot: A,
		hasTemplate: j,
		markDirty: M
	};
}
//#endregion
//#region ../core/src/cloud/ai-chat.ts
var T = 0;
function E() {
	return `msg_${Date.now()}_${++T}`;
}
function D(e) {
	let { authManager: t, getTemplateId: n, onApply: r, onError: a } = e, o = i([]), s = i(!1), c = i(!1), l = i(null), u = i(null), f = i(null), p = i(null), m = i(null), h = i(null), g = i(!1), _ = i([]), y = i(!1);
	function b(e, t) {
		let n = o.value.findIndex((t) => t.id === e);
		if (n === -1) return;
		let r = {
			...o.value[n],
			...t
		};
		o.value = [
			...o.value.slice(0, n),
			r,
			...o.value.slice(n + 1)
		];
	}
	async function x() {
		let e = n();
		if (e) {
			c.value = !0;
			try {
				let n = d(v["ai.conversationMessages"], {
					project: t.projectId,
					tenant: t.tenantSlug,
					template: e
				}), r = await t.authenticatedFetch(n, {
					method: "GET",
					headers: { Accept: "application/json" }
				});
				if (!r.ok) return;
				let i = await r.json();
				i.conversation_id && (f.value = i.conversation_id), Array.isArray(i.data) && i.data.length > 0 && (o.value = i.data.map((e) => ({
					id: e.id,
					role: e.role,
					content: e.content,
					timestamp: new Date(e.created_at).getTime()
				})));
			} catch {} finally {
				c.value = !1;
			}
		}
	}
	async function S(e, r) {
		let i = n();
		if (i) {
			y.value = !0;
			try {
				let n = d(v["ai.suggestions"], {
					project: t.projectId,
					tenant: t.tenantSlug,
					template: i
				}), a = await t.authenticatedFetch(n, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "text/event-stream"
					},
					body: JSON.stringify({
						current_content: e,
						merge_tags: r.map((e) => ({
							label: e.label,
							value: e.value
						}))
					})
				});
				if (!a.ok) return;
				let o = a.body?.getReader();
				if (!o) return;
				let s = new TextDecoder(), c = "";
				for (;;) {
					let { done: e, value: t } = await o.read();
					if (e) break;
					c += s.decode(t, { stream: !0 });
					let n = c.split("\n");
					c = n.pop() ?? "";
					for (let e of n) {
						if (!e.startsWith("data: ")) continue;
						let t;
						try {
							t = JSON.parse(e.slice(6));
						} catch {
							continue;
						}
						t.type === "done" && Array.isArray(t.suggestions) && (_.value = t.suggestions.slice(0, 3));
					}
				}
			} catch {} finally {
				y.value = !1;
			}
		}
	}
	async function C(e, i, c) {
		let y = n();
		if (!y) throw Error("Template must be saved before using AI generation");
		s.value = !0, l.value = null, u.value = null, _.value = [];
		let x = E();
		o.value = [...o.value, {
			id: x,
			role: "user",
			content: e,
			timestamp: Date.now()
		}];
		let S = E();
		o.value = [...o.value, {
			id: S,
			role: "assistant",
			content: "",
			timestamp: Date.now()
		}];
		try {
			let n = d(v["ai.generate"], {
				project: t.projectId,
				tenant: t.tenantSlug,
				template: y
			}), a = await t.authenticatedFetch(n, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "text/event-stream"
				},
				body: JSON.stringify({
					prompt: e,
					current_content: i,
					merge_tags: c.map((e) => ({
						label: e.label,
						value: e.value
					})),
					conversation_id: f.value
				})
			});
			if (!a.ok) {
				let e = await a.json().catch(() => null);
				throw Error(a.status === 403 ? "ai_generation_not_available" : e?.message || "Failed to generate template");
			}
			let s = a.body?.getReader();
			if (!s) throw Error("Failed to read stream");
			let u = new TextDecoder(), _ = "", x = null;
			try {
				for (;;) {
					let { done: e, value: t } = await s.read();
					if (e) break;
					_ += u.decode(t, { stream: !0 });
					let n = _.split("\n");
					_ = n.pop() ?? "";
					for (let e of n) {
						if (!e.startsWith("data: ")) continue;
						let t = e.slice(6), n;
						try {
							n = JSON.parse(t);
						} catch {
							continue;
						}
						if (n.type === "text") b(S, { content: (o.value.find((e) => e.id === S)?.content ?? "") + n.text });
						else if (n.type === "error") throw Error(n.message || "Failed to generate template");
						else n.type === "done" && (n.conversation_id && (f.value = n.conversation_id), b(S, { content: n.text }), x = n.content ?? null, x ? (m.value = i, h.value = x, p.value = S, g.value = !1, r?.(x)) : l.value = "ai_apply_failed");
					}
				}
			} finally {
				s.cancel().catch(() => {});
			}
			return x;
		} catch (t) {
			let n = t instanceof Error ? t : Error("Failed to generate template", { cause: t });
			return l.value = n.message, u.value = e, a?.(n), o.value = o.value.filter((e) => e.id !== x && e.id !== S), null;
		} finally {
			s.value = !1;
		}
	}
	function w() {
		g.value ? (h.value && r?.(h.value), g.value = !1) : (m.value && r?.(m.value), g.value = !0);
	}
	function T() {
		o.value = [], f.value = null, l.value = null, p.value = null, m.value = null, h.value = null, g.value = !1;
	}
	return {
		messages: o,
		isGenerating: s,
		isLoadingHistory: c,
		isLastChangeReverted: g,
		lastApplyMessageId: p,
		error: l,
		failedPrompt: u,
		suggestions: _,
		isLoadingSuggestions: y,
		sendPrompt: C,
		toggleLastRevert: w,
		loadConversation: x,
		loadSuggestions: S,
		clearChat: T
	};
}
//#endregion
//#region ../core/src/cloud/ai-config.ts
function O(e) {
	function t(t) {
		return e !== !1 && e?.[t] !== !1;
	}
	return {
		isFeatureEnabled: t,
		hasAnyMenuFeature: a(() => t("chat") || t("scoring") || t("designToTemplate"))
	};
}
//#endregion
//#region ../core/src/cloud/template-scoring.ts
function k(e) {
	let { authManager: t, getTemplateId: n } = e, r = i(!1), a = i(null), o = i(null), s = i(null), c = i(""), l = i(null);
	async function u(e, i) {
		let s = n();
		if (!s) return null;
		r.value = !0, o.value = null, a.value = null;
		try {
			let n = d(v["ai.score"], {
				project: t.projectId,
				tenant: t.tenantSlug,
				template: s
			}), r = await t.authenticatedFetch(n, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "text/event-stream"
				},
				body: JSON.stringify({
					current_content: e,
					merge_tags: i.map((e) => ({
						label: e.label,
						value: e.value
					}))
				})
			});
			if (!r.ok) {
				if (r.status === 403) throw Error("ai_generation_not_available");
				let e = await r.json().catch(() => null);
				throw Error(e?.message || "Failed to score template");
			}
			let o = r.body?.getReader();
			if (!o) throw Error("Failed to read stream");
			let c = new TextDecoder(), l = "", u = null;
			for (;;) {
				let { done: e, value: t } = await o.read();
				if (e) break;
				l += c.decode(t, { stream: !0 });
				let n = l.split("\n");
				l = n.pop() ?? "";
				for (let e of n) {
					if (!e.startsWith("data: ")) continue;
					let t;
					try {
						t = JSON.parse(e.slice(6));
					} catch {
						continue;
					}
					if (t.type === "error") throw Error(t.message || "Failed to score template");
					t.type === "done" && (u = t.result ?? null);
				}
			}
			if (u) for (let [e, t] of Object.entries(u.categories)) for (let n of t.findings) n.category = e;
			return a.value = u, u;
		} catch (e) {
			return o.value = e instanceof Error ? e.message : "Failed to score template", null;
		} finally {
			r.value = !1;
		}
	}
	async function f(e, r, i) {
		let a = n();
		if (!a) return null;
		s.value = r.id, c.value = "", l.value = null;
		try {
			let n = d(v["ai.fixFinding"], {
				project: t.projectId,
				tenant: t.tenantSlug,
				template: a
			}), o = await t.authenticatedFetch(n, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "text/event-stream"
				},
				body: JSON.stringify({
					content: e,
					finding: {
						id: r.id,
						message: r.message,
						suggestion: r.suggestion,
						category: r.category
					},
					merge_tags: i.map((e) => ({
						label: e.label,
						value: e.value
					}))
				})
			});
			if (!o.ok) {
				if (o.status === 403) throw Error("ai_generation_not_available");
				let e = await o.json().catch(() => null);
				throw Error(e?.message || "Failed to fix finding");
			}
			let s = o.body?.getReader();
			if (!s) throw Error("Failed to read stream");
			let l = new TextDecoder(), u = "", f = null;
			for (;;) {
				let { done: e, value: t } = await s.read();
				if (e) break;
				u += l.decode(t, { stream: !0 });
				let n = u.split("\n");
				u = n.pop() ?? "";
				for (let e of n) {
					if (!e.startsWith("data: ")) continue;
					let t;
					try {
						t = JSON.parse(e.slice(6));
					} catch {
						continue;
					}
					if (t.type === "text") c.value += t.text;
					else if (t.type === "error") throw Error(t.message || "Failed to fix finding");
					else t.type === "done" && (f = t.content ?? null);
				}
			}
			return f;
		} catch (e) {
			return l.value = e instanceof Error ? e.message : "Failed to fix finding", null;
		} finally {
			s.value = null;
		}
	}
	function p(e, t) {
		if (!a.value) return;
		let n = a.value.categories[e];
		n && (n.findings = n.findings.filter((e) => e.id !== t));
	}
	function m() {
		r.value = !1, a.value = null, o.value = null, s.value = null, c.value = "", l.value = null;
	}
	return {
		isScoring: r,
		scoringResult: a,
		error: o,
		fixingFindingId: s,
		fixStreamingText: c,
		fixError: l,
		score: u,
		fixFinding: f,
		removeFinding: p,
		reset: m
	};
}
//#endregion
//#region ../core/src/cloud/design-reference.ts
function A(e) {
	let { authManager: t, getTemplateId: n, onApply: r, onError: a } = e, o = i(!1), s = i(null);
	async function c(e) {
		let i = n();
		if (!i) throw Error("Template must be saved before using design reference");
		o.value = !0, s.value = null;
		try {
			let n = new FormData();
			e.prompt && n.append("prompt", e.prompt), e.imageUpload && n.append("image_upload", e.imageUpload), e.pdfUpload && n.append("pdf_upload", e.pdfUpload);
			let a = d(v["ai.generateFromDesign"], {
				project: t.projectId,
				tenant: t.tenantSlug,
				template: i
			}), o = await t.authenticatedFetch(a, {
				method: "POST",
				headers: { Accept: "text/event-stream" },
				body: n
			});
			if (!o.ok) {
				let e = await o.json().catch(() => null);
				throw Error(o.status === 403 ? "ai_generation_not_available" : e?.message || "Failed to generate template from design");
			}
			let s = o.body?.getReader();
			if (!s) throw Error("Failed to read stream");
			let c = new TextDecoder(), l = "", u = null;
			for (;;) {
				let { done: e, value: t } = await s.read();
				if (e) break;
				l += c.decode(t, { stream: !0 });
				let n = l.split("\n");
				l = n.pop() ?? "";
				for (let e of n) {
					if (!e.startsWith("data: ")) continue;
					let t = e.slice(6), n;
					try {
						n = JSON.parse(t);
					} catch {
						continue;
					}
					if (n.type === "error") throw Error(n.message || "Failed to generate template from design");
					n.type === "done" && (u = n.content ?? null, u && r?.(u));
				}
			}
			return u;
		} catch (e) {
			let t = e instanceof Error ? e : Error("Failed to generate template from design", { cause: e });
			return s.value = t.message, a?.(t), null;
		} finally {
			o.value = !1;
		}
	}
	function l() {
		o.value = !1, s.value = null;
	}
	return {
		isGenerating: o,
		error: s,
		generate: c,
		reset: l
	};
}
//#endregion
//#region ../core/src/cloud/comments.ts
function j(e) {
	let { authManager: t, getTemplateId: n, getSocketId: r, onComment: o, onError: s, hasCommentingFeature: c } = e, l = new y(t), u = i([]), d = i(!1), f = i(!1), p = a(() => (c?.() ?? !1) && t.userConfig !== null), m = a(() => {
		let e = 0;
		for (let t of u.value) e += 1 + (t.replies?.length ?? 0);
		return e;
	}), h = a(() => u.value.filter((e) => !e.resolved_at).length), g = a(() => {
		let e = /* @__PURE__ */ new Map();
		for (let t of u.value) t.block_id && e.set(t.block_id, (e.get(t.block_id) ?? 0) + 1 + (t.replies?.length ?? 0));
		return e;
	});
	function _() {
		let e = t.userConfig;
		if (!e) throw Error("User config not available");
		return {
			user_id: e.id,
			user_name: e.name,
			user_signature: e.signature
		};
	}
	function v() {
		let e = r?.();
		if (e) return { "X-Socket-ID": e };
	}
	function b(e, t) {
		o?.({
			type: e,
			comment: t
		});
	}
	function x(e) {
		for (let t of u.value) {
			if (t.id === e) return t;
			for (let n of t.replies ?? []) if (n.id === e) return n;
		}
		return null;
	}
	async function S() {
		let e = n();
		if (e) {
			d.value = !0;
			try {
				u.value = await l.getComments(e);
			} catch (e) {
				let t = e instanceof Error ? e : Error("Failed to load comments", { cause: e });
				s?.(t);
			} finally {
				d.value = !1;
			}
		}
	}
	async function C(e, t, r) {
		let i = n();
		if (!i) return null;
		f.value = !0;
		try {
			let n = await l.createComment(i, {
				body: e,
				block_id: t,
				parent_id: r,
				..._()
			}, v());
			if (r) {
				let e = x(r);
				e && (e.replies = [...e.replies ?? [], n]);
			} else u.value = [...u.value, n];
			return b("created", n), n;
		} catch (e) {
			let t = e instanceof Error ? e : Error("Failed to create comment", { cause: e });
			return s?.(t), null;
		} finally {
			f.value = !1;
		}
	}
	async function w(e, t) {
		let r = n();
		if (!r) return null;
		f.value = !0;
		try {
			let n = await l.updateComment(r, e, {
				body: t,
				..._()
			}, v());
			return A(e, n), b("updated", n), n;
		} catch (e) {
			let t = e instanceof Error ? e : Error("Failed to update comment", { cause: e });
			return s?.(t), null;
		} finally {
			f.value = !1;
		}
	}
	async function T(e) {
		let t = n();
		if (!t) return !1;
		let r = x(e);
		if (!r) return !1;
		let i = {
			...r,
			replies: [...r.replies ?? []]
		};
		f.value = !0;
		try {
			if (await l.deleteComment(t, e, _(), v()), r.parent_id) {
				let t = x(r.parent_id);
				t && (t.replies = (t.replies ?? []).filter((t) => t.id !== e));
			} else u.value = u.value.filter((t) => t.id !== e);
			return b("deleted", i), !0;
		} catch (e) {
			let t = e instanceof Error ? e : Error("Failed to delete comment", { cause: e });
			return s?.(t), !1;
		} finally {
			f.value = !1;
		}
	}
	async function E(e) {
		let t = n();
		if (!t) return null;
		f.value = !0;
		try {
			let n = await l.resolveComment(t, e, _(), v());
			return A(e, n), b(n.resolved_at ? "resolved" : "unresolved", n), n;
		} catch (e) {
			let t = e instanceof Error ? e : Error("Failed to toggle comment resolution", { cause: e });
			return s?.(t), null;
		} finally {
			f.value = !1;
		}
	}
	function D(e) {
		if (e.parent_id) {
			let t = x(e.parent_id);
			t && (t.replies = [...t.replies ?? [], e]);
		} else u.value = [...u.value, e];
		b("created", e);
	}
	function O(e) {
		A(e.id, e), b("updated", e);
	}
	function k(e, t) {
		let n = x(e), r = n ? {
			...n,
			replies: [...n.replies ?? []]
		} : null;
		if (t) {
			let n = x(t);
			n && (n.replies = (n.replies ?? []).filter((t) => t.id !== e));
		} else u.value = u.value.filter((t) => t.id !== e);
		r && b("deleted", r);
	}
	function A(e, t) {
		for (let n = 0; n < u.value.length; n++) {
			if (u.value[n].id === e) {
				u.value = [
					...u.value.slice(0, n),
					{
						...t,
						replies: u.value[n].replies
					},
					...u.value.slice(n + 1)
				];
				return;
			}
			let r = u.value[n].replies ?? [];
			for (let i = 0; i < r.length; i++) if (r[i].id === e) {
				let e = [
					...r.slice(0, i),
					t,
					...r.slice(i + 1)
				];
				u.value = [
					...u.value.slice(0, n),
					{
						...u.value[n],
						replies: e
					},
					...u.value.slice(n + 1)
				];
				return;
			}
		}
	}
	return {
		comments: u,
		isLoading: d,
		isSubmitting: f,
		isEnabled: p,
		commentCountByBlock: g,
		totalCount: m,
		unresolvedCount: h,
		loadComments: S,
		addComment: C,
		editComment: w,
		removeComment: T,
		toggleResolve: E,
		applyRemoteCreate: D,
		applyRemoteUpdate: O,
		applyRemoteDelete: k
	};
}
//#endregion
//#region ../core/src/cloud/comment-listener.ts
function M(e) {
	let { comments: n, channel: r } = e;
	o(r, (e, t) => {
		t && t.unbind("comment-broadcast"), e && e.bind("comment-broadcast", (e) => {
			N(n, e);
		});
	}), t(() => {
		r.value?.unbind("comment-broadcast");
	});
}
function N(e, t) {
	switch (t.action) {
		case "comment_created":
			e.applyRemoteCreate(t.comment);
			break;
		case "comment_updated":
			e.applyRemoteUpdate(t.comment);
			break;
		case "comment_deleted":
			e.applyRemoteDelete(t.comment.id, t.comment.parent_id);
			break;
		case "comment_resolved":
		case "comment_unresolved": e.applyRemoteUpdate(t.comment);
	}
}
//#endregion
//#region ../core/src/cloud/collaboration.ts
var P = [
	"pusher:member_added",
	"pusher:member_removed",
	"client-block_locked",
	"client-block_unlocked",
	"client-operation",
	"mcp-operation"
];
function F(e) {
	for (let t of P) e.unbind(t);
}
var I = [
	"#3b82f6",
	"#ef4444",
	"#10b981",
	"#f59e0b",
	"#8b5cf6",
	"#ec4899",
	"#06b6d4",
	"#f97316",
	"#6366f1",
	"#14b8a6"
];
function L(e) {
	let { authManager: n, editor: r, channel: s } = e, c = i([]), l = i(/* @__PURE__ */ new Map()), u = 0, d = !1, f = a(() => n.userConfig?.id ?? "");
	function p() {
		let e = I[u % I.length];
		return u++, e;
	}
	function m(e) {
		if (e.id === f.value || c.value.some((t) => t.id === e.id)) return;
		let t = {
			id: e.id,
			name: e.name,
			color: p(),
			selectedBlockId: null
		};
		return c.value = [...c.value, t], t;
	}
	function h(e) {
		let t = new Map(l.value);
		for (let [n, r] of t) r.id === e && t.delete(n);
		l.value = t, c.value = c.value.filter((t) => t.id !== e);
	}
	function g(e) {
		let t = c.value.find((t) => t.id === e.userId);
		if (!t) return;
		c.value = c.value.map((t) => t.id === e.userId ? {
			...t,
			selectedBlockId: e.blockId
		} : t);
		let n = new Map(l.value);
		for (let [t, r] of n) r.id === e.userId && n.delete(t);
		n.set(e.blockId, {
			...t,
			selectedBlockId: e.blockId
		}), l.value = n, r.state.selectedBlockId === e.blockId && r.selectBlock(null);
	}
	function _(e) {
		let t = new Map(l.value), n = t.get(e.blockId);
		t.delete(e.blockId), l.value = t, n && (c.value = c.value.map((e) => e.id === n.id ? {
			...e,
			selectedBlockId: null
		} : e));
	}
	function v(e) {
		d = !0;
		try {
			S(r, e);
		} finally {
			d = !1;
		}
	}
	function y(e) {
		!s.value || d || s.value.trigger("client-operation", e);
	}
	function b(e) {
		s.value && s.value.trigger("client-block_locked", {
			blockId: e,
			userId: f.value
		});
	}
	function x(e) {
		s.value && s.value.trigger("client-block_unlocked", { blockId: e });
	}
	return o(() => r.state.selectedBlockId, (e, t) => {
		d || (t && x(t), e && b(e));
	}), o(s, (t, n) => {
		if (n && F(n), !t) {
			c.value = [], l.value = /* @__PURE__ */ new Map(), u = 0;
			return;
		}
		let r = t.members;
		r && r.each((e) => {
			m(e.info);
		}), t.bind("pusher:member_added", (t) => {
			let n = m(t.info);
			n && e.onCollaboratorJoined?.(n);
		}), t.bind("pusher:member_removed", (t) => {
			let n = c.value.find((e) => e.id === t.id);
			h(t.id), n && e.onCollaboratorLeft?.(n);
		}), t.bind("client-block_locked", (t) => {
			g(t);
			let n = c.value.find((e) => e.id === t.userId);
			n && e.onBlockLocked?.({
				blockId: t.blockId,
				collaborator: n
			});
		}), t.bind("client-block_unlocked", (t) => {
			let n = l.value.get(t.blockId);
			_(t), n && e.onBlockUnlocked?.({
				blockId: t.blockId,
				collaborator: n
			});
		}), t.bind("client-operation", (e) => {
			v(e);
		}), t.bind("mcp-operation", (e) => {
			v(e);
		});
	}), t(() => {
		s.value && F(s.value);
	}), {
		collaborators: c,
		lockedBlocks: l,
		_broadcastOperation: y,
		_isProcessingRemoteOperation: () => d
	};
}
//#endregion
//#region ../core/src/cloud/collaboration-broadcast.ts
function R(e, t) {
	let n = e.addBlock, r = e.updateBlock, i = e.removeBlock, a = e.moveBlock, o = e.updateSettings, s = e.setContent;
	e.addBlock = (e, r, i, a) => {
		n(e, r, i, a), t._broadcastOperation({
			operation: "add_block",
			data: {
				block: e,
				section_id: r,
				column_index: i,
				index: a
			},
			timestamp: Date.now()
		});
	}, e.updateBlock = (e, n) => {
		r(e, n), t._broadcastOperation({
			operation: "update_block",
			data: {
				block_id: e,
				updates: n
			},
			timestamp: Date.now()
		});
	}, e.removeBlock = (e) => {
		i(e), t._broadcastOperation({
			operation: "delete_block",
			data: { block_id: e },
			timestamp: Date.now()
		});
	}, e.moveBlock = (e, n, r, i) => {
		a(e, n, r, i), t._broadcastOperation({
			operation: "move_block",
			data: {
				block_id: e,
				index: n,
				section_id: r,
				column_index: i
			},
			timestamp: Date.now()
		});
	}, e.updateSettings = (e) => {
		o(e), t._broadcastOperation({
			operation: "update_settings",
			data: { updates: e },
			timestamp: Date.now()
		});
	}, e.setContent = (e, n) => {
		s(e, n), t._broadcastOperation({
			operation: "set_content",
			data: { content: e },
			timestamp: Date.now()
		});
	};
}
//#endregion
//#region ../core/src/cloud/web-socket.ts
function z(e) {
	let { authManager: t, onError: n } = e, r = i(null), a = i(!1), o = null, s = null;
	async function c(e, i) {
		if (o) return;
		o = new x({
			authManager: t,
			config: i,
			onError: n
		}), await o.connect(), s = `presence-template.${e}`;
		let c = o.subscribePresence(s);
		c.bind("pusher:subscription_succeeded", () => {
			a.value = !0, r.value = c;
		}), c.bind("pusher:subscription_error", (e) => {
			a.value = !1, r.value = null, n?.(e instanceof Error ? e : /* @__PURE__ */ Error("Failed to subscribe to template channel"));
		});
	}
	function l() {
		s && o && o.unsubscribe(s), o?.disconnect(), o = null, s = null, r.value = null, a.value = !1;
	}
	function u() {
		return o?.getSocketId() ?? null;
	}
	return {
		channel: r,
		isConnected: a,
		connect: c,
		disconnect: l,
		getSocketId: u
	};
}
//#endregion
//#region ../core/src/cloud/saved-blocks-provider.ts
function B(e) {
	let t = new y(e);
	return {
		list(e) {
			return t.listModules(e?.search, e?.category);
		},
		create(e) {
			return t.createModule(e);
		},
		update(e, n) {
			return t.updateModule(e, n);
		},
		delete(e) {
			return t.deleteModule(e);
		}
	};
}
//#endregion
//#region ../core/src/cloud/snapshots.ts
function V(e) {
	let t = new y(e.authManager), n = i([]), r = i(!1), a = i(!1);
	async function o() {
		r.value = !0;
		try {
			n.value = await t.getSnapshots(e.templateId);
		} catch (t) {
			throw e.onError?.(t), t;
		} finally {
			r.value = !1;
		}
	}
	async function s(n) {
		a.value = !0;
		try {
			let r = await t.restoreSnapshot(e.templateId, n);
			return e.onRestore?.(r), r;
		} catch (t) {
			throw e.onError?.(t), t;
		} finally {
			a.value = !1;
		}
	}
	return {
		snapshots: n,
		isLoading: r,
		isRestoring: a,
		loadSnapshots: o,
		restoreSnapshot: s
	};
}
//#endregion
//#region ../core/src/cloud/test-email.ts
function H(e) {
	let { authManager: t, isAuthReady: n } = e, r = i(null);
	n && o(n, (e) => {
		e && (r.value = t.testEmailConfig);
	}, { immediate: !0 });
	let s = a(() => r.value !== null), c = a(() => r.value?.allowedEmails ?? []);
	function l() {
		return r.value?.signature ?? null;
	}
	return {
		isEnabled: s,
		allowedEmails: c,
		getSignature: l
	};
}
//#endregion
//#region ../core/src/cloud/test-email-provider.ts
function U(e) {
	let t = new y(e.authManager);
	return {
		get allowedRecipients() {
			return e.allowedEmails.value;
		},
		async send({ recipient: n }) {
			let r = e.getSignature();
			if (r === null) throw Error("Test email is not enabled for this project");
			let i = e.getTemplateId();
			if (i === null) throw Error("Template must be saved before sending a test email");
			await e.save();
			let { html: a } = await e.exportHtml(i);
			e.onBeforeTestEmail && (a = await e.onBeforeTestEmail(a)), await t.sendTestEmail(i, {
				recipient: n,
				html: a,
				allowed_emails: e.allowedEmails.value,
				signature: r
			});
		}
	};
}
//#endregion
//#region ../core/src/cloud/export.ts
function W(e) {
	let { authManager: t, getFontsConfig: n, canUseCustomFonts: r } = e, i = new y(t);
	function a() {
		let e = n?.();
		return {
			customFonts: (r?.() ?? !0) && e?.customFonts ? e.customFonts : [],
			defaultFallback: e?.defaultFallback ?? "Arial, sans-serif"
		};
	}
	async function o(e) {
		let t = a(), n = await i.exportTemplate(e, t);
		return {
			html: n.html,
			mjml: n.mjml
		};
	}
	async function s(e) {
		let t = a();
		return (await i.exportTemplate(e, t)).mjml;
	}
	return {
		exportHtml: o,
		getMjmlSource: s
	};
}
//#endregion
//#region ../core/src/cloud/plan-config.ts
function G(e) {
	let { authManager: t, onError: n } = e, r = i(null), o = i(!1), s = new y(t), c = a(() => r.value?.features ?? null);
	function l(e) {
		return r.value?.features[e] ?? !1;
	}
	async function u() {
		if (!o.value) {
			o.value = !0;
			try {
				r.value = await s.fetchConfig();
			} catch (e) {
				n?.(e instanceof Error ? e : Error("Failed to fetch config", { cause: e }));
			} finally {
				o.value = !1;
			}
		}
	}
	return {
		config: r,
		isLoading: o,
		hasFeature: l,
		features: c,
		fetchConfig: u
	};
}
//#endregion
//#region ../core/src/cloud/health-check.ts
var K = 5e3;
function q(e) {
	return e.authManager ? e.authManager.resolveUrl(v.health) : `${(e.baseUrl ?? "https://templatical.com").replace(/\/$/, "")}${v.health}`;
}
async function J(e, t) {
	let n = performance.now();
	try {
		let r = t ? await t.authenticatedFetch(v.health, {
			method: "GET",
			headers: { Accept: "application/json" }
		}) : await fetch(e, {
			method: "GET",
			headers: { Accept: "application/json" }
		}), i = Math.round(performance.now() - n);
		if (r.status === 401) return {
			api: {
				ok: !0,
				latency: i
			},
			auth: {
				ok: !1,
				error: "HTTP 401"
			}
		};
		if (!r.ok) return {
			api: {
				ok: !1,
				latency: i
			},
			auth: {
				ok: !t,
				error: t ? `HTTP ${r.status}` : void 0
			}
		};
		let a = await r.json();
		return {
			api: {
				ok: a.status === "ok",
				latency: i
			},
			auth: { ok: !0 },
			wsConfig: a.websocket
		};
	} catch (e) {
		return {
			api: {
				ok: !1,
				latency: Math.round(performance.now() - n)
			},
			auth: {
				ok: !t,
				error: t ? e instanceof Error ? e.message : "Authentication check failed" : void 0
			}
		};
	}
}
async function Y(e) {
	if (!e?.host || !e?.app_key) return {
		ok: !1,
		error: "WebSocket configuration not available"
	};
	if (typeof WebSocket > "u") return {
		ok: !1,
		error: "WebSocket not supported in this environment"
	};
	let t = `${e.port === 443 ? "wss" : "ws"}://${e.host}:${e.port}/app/${e.app_key}?protocol=7&client=js&version=8.4.0-rc2&flash=false`;
	return new Promise((e) => {
		let n = null, r = setTimeout(() => {
			n?.close(), e({
				ok: !1,
				error: "WebSocket connection timed out"
			});
		}, K);
		try {
			n = new WebSocket(t);
		} catch (t) {
			clearTimeout(r), e({
				ok: !1,
				error: t instanceof Error ? t.message : "WebSocket connection failed"
			});
			return;
		}
		n.onopen = () => {
			clearTimeout(r), n?.close(), e({ ok: !0 });
		}, n.onerror = () => {
			clearTimeout(r), e({
				ok: !1,
				error: "WebSocket connection failed"
			});
		};
	});
}
async function X(e = {}) {
	let t = await J(q(e), e.authManager), n = await Y(t.wsConfig);
	return {
		api: t.api,
		websocket: n,
		auth: t.auth,
		overall: t.api.ok && t.auth.ok
	};
}
//#endregion
//#region ../core/src/cloud/mcp-listener.ts
function Z(e) {
	let { editor: t, channel: n, onOperation: r } = e;
	o(n, (e, n) => {
		n && n.unbind("mcp-operation"), e && e.bind("mcp-operation", (e) => {
			S(t, e), r?.(e);
		});
	});
}
//#endregion
export { l as C, d as S, D as _, U as a, y as b, B as c, L as d, M as f, O as g, k as h, W as i, z as l, A as m, X as n, H as o, j as p, G as r, V as s, Z as t, R as u, w as v, u as w, v as x, b as y };

//# sourceMappingURL=cloud-CxNsW3hp.js.map