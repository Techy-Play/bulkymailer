import { t as e } from "./rolldown-runtime-Dy4uBu1J.js";
import { E as t, G as n, L as r, Q as i, T as a, V as o, Y as s, Z as ee, _ as c, k as l, nt as te, q as u, v as ne, w as re, y as d } from "./vue.runtime.esm-bundler-0R1UhmZB.js";
import { r as f } from "./runtime-dom.esm-bundler-BkOsapVg.js";
import { $ as ie, $t as ae, A as oe, At as se, B as ce, Bt as le, C as ue, Ct as p, D as m, Dt as h, E as g, Et as _, F as v, Ft as y, G as b, Gt as x, H as S, Ht as C, I as w, It as T, J as E, Jt as D, K as O, Kt as k, L as A, Lt as j, M, Mt as N, N as P, Nt as F, O as I, Ot as L, P as R, Pt as z, Q as B, Qt as V, R as H, Rt as U, S as de, St as fe, T as pe, Tt as me, U as he, Ut as ge, V as _e, Vt as ve, W as ye, Wt as be, X as xe, Xt as Se, Y as Ce, Yt as we, Z as Te, Zt as Ee, _ as De, _t as Oe, a as ke, an as Ae, at as je, b as Me, bt as Ne, c as Pe, cn as Fe, ct as Ie, d as Le, dn as Re, dt as ze, en as W, et as Be, f as G, fn as Ve, ft as He, g as Ue, gn as We, gt as Ge, h as Ke, hn as qe, ht as Je, i as Ye, in as Xe, it as Ze, j as Qe, jt as $e, k as et, kt as tt, l as K, ln as nt, lt as rt, m as it, mn as at, mt as ot, n as st, nn as ct, nt as lt, o as ut, on as dt, ot as ft, p as pt, pn as mt, pt as ht, q as gt, qt as _t, r as vt, rn as yt, rt as bt, s as xt, sn as St, st as Ct, t as wt, tn as Tt, tt as Et, u as Dt, un as Ot, ut as kt, v as At, vt as q, w as jt, wt as Mt, x as Nt, xt as Pt, y as Ft, yt as It, z as Lt, zt as Rt } from "./dist-CcQFPJMF.js";
//#region ../../node_modules/.pnpm/@tiptap+vue-3@3.29.2_@floating-ui+dom@1.8.0_@tiptap+core@3.29.2_@tiptap+pm@3.29.2__@tip_82ae703f9716de2fe82106636b634245/node_modules/@tiptap/vue-3/dist/index.js
var zt = /* @__PURE__ */ e({
	CommandManager: () => wt,
	Editor: () => Y,
	EditorContent: () => Bt,
	Extendable: () => vt,
	Extension: () => Ye,
	Fragment: () => ke,
	InputRule: () => ut,
	MappablePosition: () => xt,
	Mark: () => Pe,
	MarkView: () => K,
	MarkViewContent: () => Wt,
	Node: () => Dt,
	NodePos: () => Le,
	NodeView: () => G,
	NodeViewContent: () => Vt,
	NodeViewWrapper: () => X,
	PasteRule: () => pt,
	ResizableNodeView: () => it,
	ResizableNodeview: () => Ke,
	Tracker: () => Ue,
	VueMarkView: () => Q,
	VueMarkViewRenderer: () => Gt,
	VueNodeViewRenderer: () => $,
	VueRenderer: () => Z,
	attrsEqual: () => De,
	callOrReturn: () => At,
	canInsertNode: () => Ft,
	combineTransactionSteps: () => Me,
	commands: () => Nt,
	createAtomBlockMarkdownSpec: () => de,
	createBlockMarkdownSpec: () => ue,
	createChainableState: () => jt,
	createDocument: () => pe,
	createElement: () => q,
	createInlineMarkdownSpec: () => g,
	createMappablePosition: () => m,
	createNodeFromContent: () => I,
	createStyleTag: () => et,
	decodeHtmlEntities: () => oe,
	defaultBlockAt: () => Qe,
	deleteProps: () => M,
	elementFromString: () => P,
	encodeHtmlEntities: () => R,
	escapeForRegEx: () => v,
	extensions: () => w,
	findChildren: () => A,
	findChildrenInRange: () => H,
	findDuplicates: () => Lt,
	findParentNode: () => ce,
	findParentNodeClosestToPos: () => _e,
	flattenExtensions: () => S,
	fromString: () => he,
	generateHTML: () => ye,
	generateJSON: () => b,
	generateText: () => O,
	getAttributes: () => gt,
	getAttributesFromExtensions: () => E,
	getChangedRanges: () => Ce,
	getDebugJSON: () => xe,
	getExtensionField: () => Te,
	getHTMLFromFragment: () => B,
	getMarkAttributes: () => ie,
	getMarkRange: () => Be,
	getMarkType: () => Et,
	getMarksBetween: () => lt,
	getNodeAtPosition: () => bt,
	getNodeAttributes: () => Ze,
	getNodeType: () => je,
	getRenderedAttributes: () => ft,
	getSchema: () => Ct,
	getSchemaByResolvedExtensions: () => Ie,
	getSchemaTypeByName: () => rt,
	getSchemaTypeNameByName: () => kt,
	getSplittedAttributes: () => ze,
	getStyleProperty: () => He,
	getText: () => ht,
	getTextBetween: () => ot,
	getTextContentFromNodes: () => Je,
	getTextSerializersFromSchema: () => Ge,
	getUpdatedPosition: () => Oe,
	h: () => q,
	injectExtensionAttributesToParseRule: () => It,
	inputRulesPlugin: () => Ne,
	isActive: () => Pt,
	isAndroid: () => fe,
	isAtEndOfNode: () => p,
	isAtStartOfNode: () => Mt,
	isEmptyObject: () => me,
	isExtensionRulesEnabled: () => _,
	isFirefox: () => h,
	isFunction: () => L,
	isList: () => tt,
	isMacOS: () => se,
	isMarkActive: () => $e,
	isNodeActive: () => N,
	isNodeEmpty: () => F,
	isNodeSelection: () => z,
	isNodeViewSelected: () => y,
	isNumber: () => T,
	isPlainObject: () => j,
	isRegExp: () => U,
	isSafari: () => Rt,
	isString: () => le,
	isTextSelection: () => ve,
	isiOS: () => C,
	markInputRule: () => ge,
	markPasteRule: () => be,
	markViewProps: () => Ut,
	markdown: () => x,
	marksEqual: () => k,
	mergeAttributes: () => _t,
	mergeDeep: () => D,
	minMax: () => we,
	nodeInputRule: () => Se,
	nodePasteRule: () => Ee,
	nodeViewProps: () => Kt,
	objectIncludes: () => V,
	parseAttributes: () => ae,
	parseIndentedBlocks: () => W,
	pasteRulesPlugin: () => Tt,
	posToDOMRect: () => ct,
	removeDuplicates: () => yt,
	renderNestedMarkdownContent: () => Xe,
	resolveExtensions: () => Ae,
	resolveFocusPosition: () => dt,
	rewriteUnknownContent: () => St,
	selectionToInsertionEnd: () => Fe,
	serializeAttributes: () => nt,
	sortExtensions: () => Ot,
	splitExtensions: () => Re,
	textInputRule: () => Ve,
	textPasteRule: () => mt,
	textblockTypeInputRule: () => at,
	updateMarkViewAttributes: () => qe,
	useEditor: () => Ht,
	wrappingInputRule: () => We
});
function J(e) {
	return o((t, n) => ({
		get() {
			return t(), e;
		},
		set(t) {
			e = t, requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					n();
				});
			});
		}
	}));
}
var Y = class extends st {
	constructor(e = {}) {
		return super(e), this.contentComponent = null, this.appContext = null, this.reactiveState = J(this.view.state), this.reactiveExtensionStorage = J(this.extensionStorage), this.on("beforeTransaction", ({ nextState: e }) => {
			this.reactiveState.value = e, this.reactiveExtensionStorage.value = this.extensionStorage;
		}), n(this);
	}
	get state() {
		return this.reactiveState ? this.reactiveState.value : this.view.state;
	}
	get storage() {
		return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
	}
	registerPlugin(e, t) {
		let n = super.registerPlugin(e, t);
		return this.reactiveState && (this.reactiveState.value = n), n;
	}
	unregisterPlugin(e) {
		let t = super.unregisterPlugin(e);
		return this.reactiveState && t && (this.reactiveState.value = t), t;
	}
}, Bt = c({
	name: "EditorContent",
	props: { editor: {
		default: null,
		type: Object
	} },
	setup(e) {
		let t = s(), n = ne();
		return r(() => {
			let r = e.editor;
			r && r.options.element && t.value && re(() => {
				if (!t.value || !r.view.dom?.parentNode) return;
				let e = te(t.value);
				t.value.append(...r.view.dom.parentNode.childNodes), r.contentComponent = n.ctx._, n && (r.appContext = {
					...n.appContext,
					provides: n.provides
				}), r.setOptions({ element: e }), r.createNodeViews();
			});
		}), a(() => {
			let t = e.editor;
			t && (t.contentComponent = null, t.appContext = null);
		}), { rootEl: t };
	},
	render() {
		return d("div", { ref: (e) => {
			this.rootEl = e;
		} });
	}
}), Vt = c({
	name: "NodeViewContent",
	props: { as: {
		type: String,
		default: "div"
	} },
	inject: { nodeViewContentRef: { default: void 0 } },
	mounted() {
		let e = this.nodeViewContentRef;
		e && this.$el && e(this.$el);
	},
	beforeUnmount() {
		let e = this.nodeViewContentRef;
		e && e(null);
	},
	render() {
		return d(this.as, {
			style: { whiteSpace: "pre-wrap" },
			"data-node-view-content": ""
		});
	}
}), X = c({
	name: "NodeViewWrapper",
	props: { as: {
		type: String,
		default: "div"
	} },
	inject: ["onDragStart", "decorationClasses"],
	render() {
		var e;
		return d(this.as, {
			class: this.decorationClasses,
			style: { whiteSpace: "normal" },
			"data-node-view-wrapper": "",
			onDragstart: this.onDragStart
		}, (e = this.$slots).default?.call(e));
	}
}), Ht = (e = {}) => {
	let n = ee();
	return t(() => {
		n.value = new Y(e);
	}), a(() => {
		var e;
		(e = n.value) == null || e.destroy();
	}), n;
}, Z = class {
	constructor(e, { props: t = {}, editor: r }) {
		this.destroyed = !1, this.editor = r, this.component = n(e), this.el = document.createElement("div"), this.props = u(t), this.renderedComponent = this.renderComponent();
	}
	get element() {
		return this.renderedComponent.el;
	}
	get ref() {
		return this.renderedComponent.vNode?.component?.exposed ? this.renderedComponent.vNode.component.exposed : this.renderedComponent.vNode?.component?.proxy;
	}
	renderComponent() {
		if (this.destroyed) return this.renderedComponent;
		let e = d(this.component, this.props);
		return this.editor.appContext && (e.appContext = this.editor.appContext), typeof document < "u" && this.el && f(e, this.el), {
			vNode: e,
			destroy: () => {
				this.el && f(null, this.el), this.el = null, e = null;
			},
			el: this.el ? this.el.firstElementChild : null
		};
	}
	updateProps(e = {}) {
		this.destroyed || (Object.entries(e).forEach(([e, t]) => {
			this.props[e] = t;
		}), this.renderComponent());
	}
	destroy() {
		this.destroyed || (this.destroyed = !0, this.renderedComponent.destroy());
	}
}, Ut = {
	editor: {
		type: Object,
		required: !0
	},
	mark: {
		type: Object,
		required: !0
	},
	extension: {
		type: Object,
		required: !0
	},
	inline: {
		type: Boolean,
		required: !0
	},
	view: {
		type: Object,
		required: !0
	},
	updateAttributes: {
		type: Function,
		required: !0
	},
	HTMLAttributes: {
		type: Object,
		required: !0
	}
}, Wt = c({
	name: "MarkViewContent",
	props: { as: {
		type: String,
		default: "span"
	} },
	render() {
		return d(this.as, {
			style: { whiteSpace: "inherit" },
			"data-mark-view-content": ""
		});
	}
}), Q = class extends K {
	constructor(e, t, n) {
		super(e, t, n);
		let r = {
			...t,
			updateAttributes: this.updateAttributes.bind(this)
		}, i = c({
			extends: { ...e },
			props: Object.keys(r),
			template: this.component.template,
			setup: (t) => e.setup?.call(e, t, { expose: () => void 0 }),
			__scopeId: e.__scopeId,
			__cssModules: e.__cssModules,
			__name: e.__name,
			__file: e.__file
		});
		this.renderer = new Z(i, {
			editor: this.editor,
			props: r
		});
	}
	get dom() {
		return this.renderer.element;
	}
	get contentDOM() {
		return this.dom.querySelector("[data-mark-view-content]");
	}
	updateAttributes(e) {
		let t = i(this.mark);
		super.updateAttributes(e, t);
	}
	destroy() {
		this.renderer.destroy();
	}
};
function Gt(e, t = {}) {
	return (n) => n.editor.contentComponent ? new Q(e, n, t) : {};
}
var Kt = {
	editor: {
		type: Object,
		required: !0
	},
	node: {
		type: Object,
		required: !0
	},
	decorations: {
		type: Object,
		required: !0
	},
	selected: {
		type: Boolean,
		required: !0
	},
	extension: {
		type: Object,
		required: !0
	},
	getPos: {
		type: Function,
		required: !0
	},
	updateAttributes: {
		type: Function,
		required: !0
	},
	deleteNode: {
		type: Function,
		required: !0
	},
	view: {
		type: Object,
		required: !0
	},
	innerDecorations: {
		type: Object,
		required: !0
	},
	HTMLAttributes: {
		type: Object,
		required: !0
	}
}, qt = class extends G {
	constructor(e, t, n) {
		super(e, t, n), this.cachedExtensionWithSyncedStorage = null, this.handlePositionUpdate = () => {
			let e = this.getPos();
			typeof e == "number" && e !== this.currentPos && (this.currentPos = e, this.renderer.updateProps({ getPos: () => this.getPos() }));
		}, this.options.trackNodeViewPosition && this.editor.on("update", this.handlePositionUpdate);
	}
	get extensionWithSyncedStorage() {
		if (!this.cachedExtensionWithSyncedStorage) {
			let e = this.editor, t = this.extension;
			this.cachedExtensionWithSyncedStorage = new Proxy(t, { get(n, r, i) {
				return r === "storage" ? e.storage[t.name] ?? {} : Reflect.get(n, r, i);
			} });
		}
		return this.cachedExtensionWithSyncedStorage;
	}
	mount() {
		let e = {
			editor: this.editor,
			node: this.node,
			decorations: this.decorations,
			innerDecorations: this.innerDecorations,
			view: this.view,
			selected: !1,
			extension: this.extensionWithSyncedStorage,
			HTMLAttributes: this.HTMLAttributes,
			getPos: () => this.getPos(),
			updateAttributes: (e = {}) => this.updateAttributes(e),
			deleteNode: () => this.deleteNode()
		}, t = e, n = this.onDragStart.bind(this);
		this.decorationClasses = s(this.getDecorationClasses());
		let r = c({
			extends: { ...this.component },
			props: Object.keys(e),
			template: this.component.template,
			setup: (e) => {
				var t;
				return l("onDragStart", n), l("decorationClasses", this.decorationClasses), l("nodeViewContentRef", (e) => {
					if (!(!e || e === this.contentDOMElement)) {
						if (this.contentDOMElement) for (; this.contentDOMElement.firstChild;) e.appendChild(this.contentDOMElement.firstChild);
						this.contentDOMElement = e;
					}
				}), (t = this.component).setup?.call(t, e, { expose: () => void 0 });
			},
			__scopeId: this.component.__scopeId,
			__cssModules: this.component.__cssModules,
			__name: this.component.__name,
			__file: this.component.__file
		});
		this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this), this.editor.on("selectionUpdate", this.handleSelectionUpdate), this.currentPos = this.getPos(), this.node.isLeaf || (this.contentDOMElement = this.options.contentDOMElementTag ? document.createElement(this.options.contentDOMElementTag) : document.createElement(this.node.isInline ? "span" : "div"), this.contentDOMElement.style.whiteSpace = "inherit", this.contentDOMElement.dataset.nodeViewContentVue = ""), this.renderer = new Z(r, {
			editor: this.editor,
			props: t
		});
	}
	get dom() {
		if (!this.renderer.element || !this.renderer.element.hasAttribute("data-node-view-wrapper")) throw Error("Please use the NodeViewWrapper component for your node view.");
		return this.renderer.element;
	}
	get contentDOM() {
		return this.node.isLeaf ? null : this.contentDOMElement;
	}
	handleSelectionUpdate() {
		let e = this.getPos();
		if (typeof e == "number") if (y({
			selection: this.editor.state.selection,
			pos: e,
			nodeSize: this.node.nodeSize,
			selectedOnTextSelection: this.options.selectedOnTextSelection
		})) {
			if (this.renderer.props.selected) return;
			this.selectNode();
		} else {
			if (!this.renderer.props.selected) return;
			this.deselectNode();
		}
	}
	update(e, t, n) {
		let r = (e) => {
			this.decorationClasses.value = this.getDecorationClasses(), this.renderer.updateProps(e);
		};
		if (typeof this.options.update == "function") {
			let i = this.node, a = this.decorations, o = this.innerDecorations;
			return this.node = e, this.decorations = t, this.innerDecorations = n, this.options.update({
				oldNode: i,
				oldDecorations: a,
				newNode: e,
				newDecorations: t,
				oldInnerDecorations: o,
				innerDecorations: n,
				updateProps: () => r({
					node: e,
					decorations: t,
					innerDecorations: n,
					extension: this.extensionWithSyncedStorage
				})
			});
		}
		if (e.type !== this.node.type) return !1;
		if (e === this.node) return this.node = e, this.decorations = t, this.innerDecorations = n, this.decorationClasses.value = this.getDecorationClasses(), !0;
		this.node = e, this.decorations = t, this.innerDecorations = n, this.currentPos = this.getPos();
		let i = {
			node: e,
			decorations: t,
			innerDecorations: n,
			extension: this.extensionWithSyncedStorage
		};
		return this.options.trackNodeViewPosition && (i.getPos = () => this.getPos()), r(i), !0;
	}
	selectNode() {
		this.renderer.updateProps({ selected: !0 }), this.renderer.element && this.renderer.element.classList.add("ProseMirror-selectednode");
	}
	deselectNode() {
		this.renderer.updateProps({ selected: !1 }), this.renderer.element && this.renderer.element.classList.remove("ProseMirror-selectednode");
	}
	getDecorationClasses() {
		return this.decorations.flatMap((e) => e.type.attrs.class).join(" ");
	}
	destroy() {
		this.renderer.destroy(), this.editor.off("selectionUpdate", this.handleSelectionUpdate), this.options.trackNodeViewPosition && this.editor.off("update", this.handlePositionUpdate), this.contentDOMElement = null;
	}
};
function $(e, t) {
	return (n) => n.editor.contentComponent ? new qt(typeof e == "function" && "__vccOpts" in e ? e.__vccOpts : e, n, t) : {};
}
//#endregion
export { $ as n, zt as r, X as t };
