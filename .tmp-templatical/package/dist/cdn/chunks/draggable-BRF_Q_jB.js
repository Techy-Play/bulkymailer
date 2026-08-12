//#region ../../node_modules/.pnpm/@vue+shared@3.5.41/node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function e(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var t = {}, n = [], r = () => {}, i = () => !1, a = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), o = (e) => e.startsWith("onUpdate:"), s = Object.assign, c = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, T = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), E = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ee = /-\w/g, D = E((e) => e.replace(ee, (e) => e.slice(1).toUpperCase())), te = /\B([A-Z])/g, O = E((e) => e.replace(te, "-$1").toLowerCase()), ne = E((e) => e.charAt(0).toUpperCase() + e.slice(1)), re = E((e) => e ? `on${ne(e)}` : ""), k = (e, t) => !Object.is(e, t), ie = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, A = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, ae = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, oe = (e) => {
	let t = g(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, se, ce = () => se ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function le(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? pe(r) : le(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	}
	if (g(e) || v(e)) return e;
}
var ue = /;(?![^(]*\))/g, de = /:([^]+)/, fe = /\/\*[^]*?\*\//g;
function pe(e) {
	let t = {};
	return e.replace(fe, "").split(ue).forEach((e) => {
		if (e) {
			let n = e.split(de);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function me(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = me(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var he = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ge = /* @__PURE__ */ e(he);
he + "";
function _e(e) {
	return !!e || e === "";
}
function ve(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = ye(e[r], t[r]);
	return n;
}
function ye(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? ve(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !ye(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function be(e, t) {
	return e.findIndex((e) => ye(e, t));
}
var xe = (e) => !!(e && e.__v_isRef === !0), Se = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? xe(e) ? Se(e.value) : JSON.stringify(e, Ce, 2) : String(e), Ce = (e, t) => xe(t) ? Ce(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[we(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => we(e)) } : _(t) ? we(t) : v(t) && !d(t) && !C(t) ? String(t) : t, we = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, j, Te = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && j && (j.active ? (this.parent = j, this.index = (j.scopes || (j.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].pause();
			}
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) {
				let n = this.scopes.slice();
				for (e = 0, t = n.length; e < t; e++) n[e].resume();
			}
			let n = this.effects.slice();
			for (e = 0, t = n.length; e < t; e++) n[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = j;
			try {
				return j = this, e();
			} finally {
				j = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = j, j = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (j === this) j = this.prevScope;
			else {
				let e = j;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				let e = this.scopes.slice();
				for (t = 0, n = e.length; t < n; t++) e[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Ee() {
	return j;
}
function De(e, t = !1) {
	j && j.cleanups.push(e);
}
var M, Oe = /* @__PURE__ */ new WeakSet(), ke = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, j && (j.active ? j.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Oe.has(this) && (Oe.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ne(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Ke(this), Ie(this);
		let e = M, t = He;
		M = this, He = !0;
		try {
			return this.fn();
		} finally {
			Le(this), M = e, He = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Be(e);
			this.deps = this.depsTail = void 0, Ke(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Oe.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Re(this) && this.run();
	}
	get dirty() {
		return Re(this);
	}
}, Ae = 0, je, Me;
function Ne(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Me, Me = e;
		return;
	}
	e.next = je, je = e;
}
function Pe() {
	Ae++;
}
function Fe() {
	if (--Ae > 0) return;
	if (Me) {
		let e = Me;
		for (Me = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; je;) {
		let t = je;
		for (je = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Ie(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Le(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Be(r), Ve(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Re(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (ze(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function ze(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === qe) || (e.globalVersion = qe, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Re(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = M, r = He;
	M = e, He = !0;
	try {
		Ie(e);
		let n = e.fn(e._value);
		(t.version === 0 || k(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		M = n, He = r, Le(e), e.flags &= -3;
	}
}
function Be(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Be(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ve(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var He = !0, Ue = [];
function We() {
	Ue.push(He), He = !1;
}
function Ge() {
	let e = Ue.pop();
	He = e === void 0 || e;
}
function Ke(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = M;
		M = void 0;
		try {
			t();
		} finally {
			M = e;
		}
	}
}
var qe = 0, Je = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Ye = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!M || !He || M === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== M) t = this.activeLink = new Je(M, this), M.deps ? (t.prevDep = M.depsTail, M.depsTail.nextDep = t, M.depsTail = t) : M.deps = M.depsTail = t, Xe(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = M.depsTail, t.nextDep = void 0, M.depsTail.nextDep = t, M.depsTail = t, M.deps === t && (M.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, qe++, this.notify(e);
	}
	notify(e) {
		Pe();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Fe();
		}
	}
};
function Xe(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Xe(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Ze = /* @__PURE__ */ new WeakMap(), Qe = /* @__PURE__ */ Symbol(""), $e = /* @__PURE__ */ Symbol(""), et = /* @__PURE__ */ Symbol("");
function N(e, t, n) {
	if (He && M) {
		let t = Ze.get(e);
		t || Ze.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Ye()), r.map = t, r.key = n), r.track();
	}
}
function tt(e, t, n, r, i, a) {
	let o = Ze.get(e);
	if (!o) {
		qe++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Pe(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === et || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(et)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Qe)), f(e) && s(o.get($e)));
				break;
			case "delete":
				i || (s(o.get(Qe)), f(e) && s(o.get($e)));
				break;
			case "set": f(e) && s(o.get(Qe));
		}
	}
	Fe();
}
function nt(e, t) {
	let n = Ze.get(e);
	return n && n.get(t);
}
function rt(e) {
	let t = /* @__PURE__ */ P(e);
	return t === e ? t : (N(t, "iterate", et), /* @__PURE__ */ Gt(e) ? t : t.map(Jt));
}
function it(e) {
	return N(e = /* @__PURE__ */ P(e), "iterate", et), e;
}
function at(e, t) {
	return /* @__PURE__ */ Wt(e) ? Yt(/* @__PURE__ */ Ut(e) ? Jt(t) : t) : Jt(t);
}
var ot = {
	__proto__: null,
	[Symbol.iterator]() {
		return st(this, Symbol.iterator, (e) => at(this, e));
	},
	concat(...e) {
		return rt(this).concat(...e.map((e) => d(e) ? rt(e) : e));
	},
	entries() {
		return st(this, "entries", (e) => (e[1] = at(this, e[1]), e));
	},
	every(e, t) {
		return lt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return lt(this, "filter", e, t, (e) => e.map((e) => at(this, e)), arguments);
	},
	find(e, t) {
		return lt(this, "find", e, t, (e) => at(this, e), arguments);
	},
	findIndex(e, t) {
		return lt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return lt(this, "findLast", e, t, (e) => at(this, e), arguments);
	},
	findLastIndex(e, t) {
		return lt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return lt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return dt(this, "includes", e);
	},
	indexOf(...e) {
		return dt(this, "indexOf", e);
	},
	join(e) {
		return rt(this).join(e);
	},
	lastIndexOf(...e) {
		return dt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return lt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return ft(this, "pop");
	},
	push(...e) {
		return ft(this, "push", e);
	},
	reduce(e, ...t) {
		return ut(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return ut(this, "reduceRight", e, t);
	},
	shift() {
		return ft(this, "shift");
	},
	some(e, t) {
		return lt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return ft(this, "splice", e);
	},
	toReversed() {
		return rt(this).toReversed();
	},
	toSorted(e) {
		return rt(this).toSorted(e);
	},
	toSpliced(...e) {
		return rt(this).toSpliced(...e);
	},
	unshift(...e) {
		return ft(this, "unshift", e);
	},
	values() {
		return st(this, "values", (e) => at(this, e));
	}
};
function st(e, t, n) {
	let r = it(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Gt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var ct = Array.prototype;
function lt(e, t, n, r, i, a) {
	let o = it(e), s = o !== e && !/* @__PURE__ */ Gt(e), c = o[t];
	if (c !== ct[t]) {
		let t = c.apply(e, a);
		return s ? Jt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, at(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function ut(e, t, n, r) {
	let i = it(e), a = i !== e && !/* @__PURE__ */ Gt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = at(e, t)), n.call(this, t, at(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? at(e, c) : c;
}
function dt(e, t, n) {
	let r = /* @__PURE__ */ P(e);
	N(r, "iterate", et);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Kt(n[0]) ? (n[0] = /* @__PURE__ */ P(n[0]), r[t](...n)) : i;
}
function ft(e, t, n = []) {
	We(), Pe();
	let r = (/* @__PURE__ */ P(e))[t].apply(e, n);
	return Fe(), Ge(), r;
}
var pt = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), mt = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function ht(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ P(this);
	return N(t, "has", e), t.hasOwnProperty(e);
}
var gt = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? It : Ft : i ? Pt : Nt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = ot[t])) return e;
			if (t === "hasOwnProperty") return ht;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ F(e) ? e : n);
		if ((_(t) ? mt.has(t) : pt(t)) || (r || N(e, "get", t), i)) return o;
		if (/* @__PURE__ */ F(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Bt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Bt(o) : /* @__PURE__ */ Rt(o) : o;
	}
}, _t = class extends gt {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Wt(i);
			if (!/* @__PURE__ */ Gt(n) && !/* @__PURE__ */ Wt(n) && (i = /* @__PURE__ */ P(i), n = /* @__PURE__ */ P(n)), !a && /* @__PURE__ */ F(i) && !/* @__PURE__ */ F(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ F(e) ? e : r);
		return e === /* @__PURE__ */ P(r) && s && (o ? k(n, i) && tt(e, "set", t, n, i) : tt(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && tt(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !mt.has(t)) && N(e, "has", t), n;
	}
	ownKeys(e) {
		return N(e, "iterate", d(e) ? "length" : Qe), Reflect.ownKeys(e);
	}
}, vt = class extends gt {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, yt = /* @__PURE__ */ new _t(), bt = /* @__PURE__ */ new vt(), xt = /* @__PURE__ */ new _t(!0), St = /* @__PURE__ */ new vt(!0), Ct = (e) => e, wt = (e) => Reflect.getPrototypeOf(e);
function Tt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ P(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? Ct : t ? Yt : Jt;
		return !t && N(a, "iterate", l ? $e : Qe), s(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: c ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function Et(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Dt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ P(r), a = /* @__PURE__ */ P(n);
			e || (k(n, a) && N(i, "get", n), N(i, "get", a));
			let { has: o } = wt(i), s = t ? Ct : e ? Yt : Jt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && N(/* @__PURE__ */ P(t), "iterate", Qe), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ P(n), i = /* @__PURE__ */ P(t);
			return e || (k(t, i) && N(r, "has", t), N(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ P(a), s = t ? Ct : e ? Yt : Jt;
			return !e && N(o, "iterate", Qe), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: Et("add"),
		set: Et("set"),
		delete: Et("delete"),
		clear: Et("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ P(this), r = wt(n), i = /* @__PURE__ */ P(e), a = !t && !/* @__PURE__ */ Gt(e) && !/* @__PURE__ */ Wt(e) ? i : e;
			return r.has.call(n, a) || k(e, a) && r.has.call(n, e) || k(i, a) && r.has.call(n, i) || (n.add(a), tt(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Gt(n) && !/* @__PURE__ */ Wt(n) && (n = /* @__PURE__ */ P(n));
			let r = /* @__PURE__ */ P(this), { has: i, get: a } = wt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ P(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? k(n, s) && tt(r, "set", e, n, s) : tt(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ P(this), { has: n, get: r } = wt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ P(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && tt(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ P(this), t = e.size !== 0, n = e.clear();
			return t && tt(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Tt(r, e, t);
	}), n;
}
function Ot(e, t) {
	let n = Dt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var kt = { get: /* @__PURE__ */ Ot(!1, !1) }, At = { get: /* @__PURE__ */ Ot(!1, !0) }, jt = { get: /* @__PURE__ */ Ot(!0, !1) }, Mt = { get: /* @__PURE__ */ Ot(!0, !0) }, Nt = /* @__PURE__ */ new WeakMap(), Pt = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ new WeakMap();
function Lt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function Rt(e) {
	return /* @__PURE__ */ Wt(e) ? e : Ht(e, !1, yt, kt, Nt);
}
// @__NO_SIDE_EFFECTS__
function zt(e) {
	return Ht(e, !1, xt, At, Pt);
}
// @__NO_SIDE_EFFECTS__
function Bt(e) {
	return Ht(e, !0, bt, jt, Ft);
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
	return Ht(e, !0, St, Mt, It);
}
function Ht(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Lt(S(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
	return /* @__PURE__ */ Wt(e) ? /* @__PURE__ */ Ut(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Wt(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Gt(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Kt(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function P(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ P(t) : e;
}
function qt(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && A(e, "__v_skip", !0), e;
}
var Jt = (e) => v(e) ? /* @__PURE__ */ Rt(e) : e, Yt = (e) => v(e) ? /* @__PURE__ */ Bt(e) : e;
// @__NO_SIDE_EFFECTS__
function F(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Xt(e) {
	return Qt(e, !1);
}
// @__NO_SIDE_EFFECTS__
function Zt(e) {
	return Qt(e, !0);
}
function Qt(e, t) {
	return /* @__PURE__ */ F(e) ? e : new $t(e, t);
}
var $t = class {
	constructor(e, t) {
		this.dep = new Ye(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ P(e), this._value = t ? e : Jt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Gt(e) || /* @__PURE__ */ Wt(e);
		e = n ? e : /* @__PURE__ */ P(e), k(e, t) && (this._rawValue = e, this._value = n ? e : Jt(e), this.dep.trigger());
	}
};
function en(e) {
	e.dep && e.dep.trigger();
}
function I(e) {
	return /* @__PURE__ */ F(e) ? e.value : e;
}
function tn(e) {
	return h(e) ? e() : I(e);
}
var nn = {
	get: (e, t, n) => t === "__v_raw" ? e : I(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ F(i) && !/* @__PURE__ */ F(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function rn(e) {
	return /* @__PURE__ */ Ut(e) ? e : new Proxy(e, nn);
}
var an = class {
	constructor(e) {
		this.__v_isRef = !0, this._value = void 0;
		let t = this.dep = new Ye(), { get: n, set: r } = e(t.track.bind(t), t.trigger.bind(t));
		this._get = n, this._set = r;
	}
	get value() {
		return this._value = this._get();
	}
	set value(e) {
		this._set(e);
	}
};
function on(e) {
	return new an(e);
}
// @__NO_SIDE_EFFECTS__
function sn(e) {
	let t = d(e) ? Array(e.length) : {};
	for (let n in e) t[n] = dn(e, n);
	return t;
}
var cn = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = _(t) ? t : String(t), this._raw = /* @__PURE__ */ P(e);
		let r = !0, i = e;
		if (!d(e) || _(this._key) || !w(this._key)) do
			r = !/* @__PURE__ */ Kt(i) || /* @__PURE__ */ Gt(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = I(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ F(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ F(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return nt(this._raw, this._key);
	}
}, ln = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function un(e, t, n) {
	return /* @__PURE__ */ F(e) ? e : h(e) ? new ln(e) : v(e) && arguments.length > 1 ? dn(e, t, n) : /* @__PURE__ */ Xt(e);
}
function dn(e, t, n) {
	return new cn(e, t, n);
}
var fn = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Ye(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qe - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && M !== this) return Ne(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return ze(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function pn(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new fn(r, i, n);
}
var mn = {}, hn = /* @__PURE__ */ new WeakMap(), gn = void 0;
function _n(e, t = !1, n = gn) {
	if (n) {
		let t = hn.get(n);
		t || hn.set(n, t = []), t.push(e);
	}
}
function vn(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ Gt(e) || o === !1 || o === 0 ? yn(e, 1) : yn(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ F(e) ? (g = () => e.value, y = /* @__PURE__ */ Gt(e)) : /* @__PURE__ */ Ut(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Ut(e) || /* @__PURE__ */ Gt(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ F(e)) return e.value;
		if (/* @__PURE__ */ Ut(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			We();
			try {
				_();
			} finally {
				Ge();
			}
		}
		let t = gn;
		gn = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			gn = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => yn(e(), t);
	}
	let x = Ee(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			let n = e(...t);
			return S(), n;
		};
	}
	let C = b ? Array(e.length).fill(mn) : mn, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (n) {
			let t = m.run();
			if (e || o || y || (b ? t.some((e, t) => k(e, C[t])) : k(t, C))) {
				_ && _();
				let e = gn;
				gn = m;
				try {
					let e = [
						t,
						C === mn ? void 0 : b && C[0] === mn ? [] : C,
						v
					];
					C = t, f ? f(n, 3, e) : n(...e);
				} finally {
					gn = e;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new ke(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => _n(e, !1, m), _ = m.onStop = () => {
		let e = hn.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			hn.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function yn(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ F(e)) yn(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) yn(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		yn(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) yn(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && yn(e[r], t, n);
	}
	return e;
}
//#endregion
//#region ../../node_modules/.pnpm/@vue+runtime-core@3.5.41/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function bn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		Sn(e, t, n);
	}
}
function xn(e, t, n, r) {
	if (h(e)) {
		let i = bn(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			Sn(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(xn(e[a], t, n, r));
		return i;
	}
}
function Sn(e, n, r, i = !0) {
	let a = n ? n.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = n && n.appContext.config || t;
	if (n) {
		let t = n.parent, i = n.proxy, a = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; t;) {
			let n = t.ec;
			if (n) {
				for (let t = 0; t < n.length; t++) if (n[t](e, i, a) === !1) return;
			}
			t = t.parent;
		}
		if (o) {
			We(), bn(o, null, 10, [
				e,
				i,
				a
			]), Ge();
			return;
		}
	}
	Cn(e, r, a, i, s);
}
function Cn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var wn = [], Tn = -1, En = [], Dn = null, On = 0, kn = /* @__PURE__ */ Promise.resolve(), An = null;
function jn(e) {
	let t = An || kn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Mn(e) {
	let t = Tn + 1, n = wn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = wn[r], a = Rn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Nn(e) {
	if (!(e.flags & 1)) {
		let t = Rn(e), n = wn[wn.length - 1];
		!n || !(e.flags & 2) && t >= Rn(n) ? wn.push(e) : wn.splice(Mn(t), 0, e), e.flags |= 1, Pn();
	}
}
function Pn() {
	An ||= kn.then(zn);
}
function Fn(e) {
	if (!d(e)) Dn && e.id === -1 ? Dn.splice(On + 1, 0, e) : e.flags & 1 || (En.push(e), e.flags |= 1);
	else for (let t = 0; t < e.length; t++) En.push(e[t]);
	Pn();
}
function In(e, t, n = Tn + 1) {
	for (; n < wn.length; n++) {
		let t = wn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			wn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function Ln(e) {
	if (En.length) {
		let e = [...new Set(En)].sort((e, t) => Rn(e) - Rn(t));
		if (En.length = 0, Dn) {
			for (let t = 0; t < e.length; t++) Dn.push(e[t]);
			return;
		}
		for (Dn = e, On = 0; On < Dn.length; On++) {
			let e = Dn[On];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		Dn = null, On = 0;
	}
}
var Rn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function zn(e) {
	try {
		for (Tn = 0; Tn < wn.length; Tn++) {
			let e = wn[Tn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), bn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; Tn < wn.length; Tn++) {
			let e = wn[Tn];
			e && (e.flags &= -2);
		}
		Tn = -1, wn.length = 0, Ln(e), An = null, (wn.length || En.length) && zn(e);
	}
}
var L = null, Bn = null;
function Vn(e) {
	let t = L;
	return L = e, Bn = e && e.type.__scopeId || null, t;
}
function Hn(e, t = L, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && La(-1);
		let i = Vn(t), a = Ma.length, o;
		try {
			o = e(...n);
		} finally {
			for (let e = Ma.length; e > a; e--) Fa();
			Vn(i), r._d && La(1);
		}
		return o;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Un(e, n) {
	if (L === null) return e;
	let r = So(L), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && yn(o), i.push({
			dir: a,
			instance: r,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function Wn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (We(), xn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Ge());
	}
}
function Gn(e, t) {
	if (B) {
		let n = B.provides, r = B.parent && B.parent.provides;
		r === n && (n = B.provides = Object.create(r)), n[e] = t;
	}
}
function Kn(e, t, n = !1) {
	let r = oo();
	if (r || Ri) {
		let i = Ri ? Ri._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
function qn() {
	return !!(oo() || Ri);
}
var Jn = /* @__PURE__ */ Symbol.for("v-scx"), Yn = () => Kn(Jn);
function Xn(e, t) {
	return $n(e, null, t);
}
function Zn(e, t) {
	return $n(e, null, { flush: "sync" });
}
function Qn(e, t, n) {
	return $n(e, t, n);
}
function $n(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (po) {
		if (c === "sync") {
			let e = Yn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = B;
	u.call = (e, t, n) => xn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		ga(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : Nn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = vn(e, n, u);
	return po && (f ? f.push(h) : d && h()), h;
}
function er(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? tr(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = lo(this), s = $n(i, a.bind(r), n);
	return o(), s;
}
function tr(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var nr = /* @__PURE__ */ new WeakMap(), rr = /* @__PURE__ */ Symbol("_vte"), ir = (e) => e.__isTeleport, ar = (e) => e && (e.disabled || e.disabled === ""), or = (e) => e && (e.defer || e.defer === ""), sr = (e) => typeof SVGElement < "u" && e instanceof SVGElement, cr = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, lr = (e, t) => {
	let n = e && e.to;
	return g(n) ? t ? t(n) : null : n;
}, ur = {
	name: "Teleport",
	__isTeleport: !0,
	process(e, t, n, r, i, a, o, s, c, l) {
		let { mc: u, pc: d, pbc: f, o: { insert: p, querySelector: m, createText: h, createComment: g, parentNode: _ } } = l, v = ar(t.props), { dynamicChildren: y } = t, b = (e, t, n) => {
			e.shapeFlag & 16 && u(e.children, t, n, i, a, o, s, c);
		}, x = (e = t) => {
			let n = ar(e.props), r = e.target = lr(e.props, m), a = hr(r, e, h, p);
			r && (o !== "svg" && sr(r) ? o = "svg" : o !== "mathml" && cr(r) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r), n || (b(e, r, a), mr(e, !1)));
		}, S = (e) => {
			let t = () => {
				if (nr.get(e) === t) {
					if (nr.delete(e), ar(e.props)) {
						let t = _(e.el) || n;
						b(e, t, e.anchor), mr(e, !0);
					}
					x(e);
				}
			};
			nr.set(e, t), ga(t, a);
		};
		if (e == null) {
			let e = t.el = h(""), i = t.anchor = h("");
			if (p(e, n, r), p(i, n, r), or(t.props) || a && a.pendingBranch) {
				S(t);
				return;
			}
			v && (b(t, n, i), mr(t, !0)), x();
		} else {
			t.el = e.el;
			let r = t.anchor = e.anchor, u = nr.get(e);
			if (u) {
				u.flags |= 8, nr.delete(e), S(t);
				return;
			}
			t.targetStart = e.targetStart;
			let p = t.target = e.target, h = t.targetAnchor = e.targetAnchor, g = ar(e.props), _ = g ? n : p, b = g ? r : h;
			if (o === "svg" || sr(p) ? o = "svg" : (o === "mathml" || cr(p)) && (o = "mathml"), y ? (f(e.dynamicChildren, y, _, i, a, o, s), Sa(e, t, !0)) : c || d(e, t, _, b, i, a, o, s, !1), v) g ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : dr(t, n, r, l, 1);
			else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
				let e = lr(t.props, m);
				e && (t.target = e, dr(t, e, null, l, 0));
			} else g && dr(t, p, h, l, 1);
			mr(t, v);
		}
	},
	remove(e, t, n, { um: r, o: { remove: i } }, a) {
		let { shapeFlag: o, children: s, anchor: c, targetStart: l, targetAnchor: u, target: d, props: f } = e, p = ar(f), m = a || !p, h = nr.get(e);
		if (h && (h.flags |= 8, nr.delete(e)), d && (i(l), i(u)), a && i(c), !h && (p || d) && o & 16) for (let e = 0; e < s.length; e++) {
			let i = s[e];
			r(i, t, n, m, !!i.dynamicChildren);
		}
	},
	move: dr,
	hydrate: fr
};
function dr(e, t, n, { o: { insert: r }, m: i }, a = 2) {
	a === 0 && r(e.targetAnchor, t, n);
	let { el: o, anchor: s, shapeFlag: c, children: l, props: u } = e, d = a === 2;
	if (d && r(o, t, n), !nr.has(e) && (!d || ar(u)) && c & 16) for (let e = 0; e < l.length; e++) i(l[e], t, n, 2);
	d && r(s, t, n);
}
function fr(e, t, n, r, i, a, { o: { nextSibling: o, parentNode: s, querySelector: c, insert: l, createText: u } }, d) {
	function f(e, n) {
		let r = n;
		for (; r;) {
			if (r && r.nodeType === 8) {
				if (r.data === "teleport start anchor") t.targetStart = r;
				else if (r.data === "teleport anchor") {
					t.targetAnchor = r, e._lpa = t.targetAnchor && o(t.targetAnchor);
					break;
				}
			}
			r = o(r);
		}
	}
	function p(e, t) {
		t.anchor = d(o(e), t, s(e), n, r, i, a);
	}
	let m = t.target = lr(t.props, c), h = ar(t.props);
	if (m) {
		let c = m._lpa || m.firstChild;
		t.shapeFlag & 16 && (h ? (p(e, t), f(m, c), t.targetAnchor || hr(m, t, u, l, s(e) === m ? e : null)) : (t.anchor = o(e), f(m, c), t.targetAnchor || hr(m, t, u, l), d(c && o(c), t, m, n, r, i, a))), mr(t, h);
	} else h && t.shapeFlag & 16 && (p(e, t), t.targetStart = e, t.targetAnchor = o(e));
	return t.anchor && o(t.anchor);
}
var pr = ur;
function mr(e, t) {
	let n = e.ctx;
	if (n && n.ut) {
		let r, i;
		for (t ? (r = e.el, i = e.anchor) : (r = e.targetStart, i = e.targetAnchor); r && r !== i;) r.nodeType === 1 && r.setAttribute("data-v-owner", n.uid), r = r.nextSibling;
		n.ut();
	}
}
function hr(e, t, n, r, i = null) {
	let a = t.targetStart = n(""), o = t.targetAnchor = n("");
	return a[rr] = o, e && (r(a, e, i), r(o, e, i)), o;
}
var gr = /* @__PURE__ */ Symbol("_leaveCb"), _r = /* @__PURE__ */ Symbol("_enterCb");
function vr() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return Xr(() => {
		e.isMounted = !0;
	}), $r(() => {
		e.isUnmounting = !0;
	}), e;
}
var yr = [Function, Array], br = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: yr,
	onEnter: yr,
	onAfterEnter: yr,
	onEnterCancelled: yr,
	onBeforeLeave: yr,
	onLeave: yr,
	onAfterLeave: yr,
	onLeaveCancelled: yr,
	onBeforeAppear: yr,
	onAppear: yr,
	onAfterAppear: yr,
	onAppearCancelled: yr
}, xr = (e) => {
	let t = e.subTree;
	return t.component ? xr(t.component) : t;
}, Sr = {
	name: "BaseTransition",
	props: br,
	setup(e, { slots: t }) {
		let n = oo(), r = vr();
		return () => {
			let i = t.default && Ar(t.default(), !0), a = i && i.length ? Cr(i) : n.subTree ? Za() : void 0;
			if (!a) return;
			let o = /* @__PURE__ */ P(e), { mode: s } = o;
			if (r.isLeaving) return Dr(a);
			let c = Or(a);
			if (!c) return Dr(a);
			let l = Er(c, o, r, n, (e) => l = e);
			c.type !== R && kr(c, l);
			let u = n.subTree && Or(n.subTree);
			if (u && u.type !== R && !Ha(u, c) && xr(n).type !== R) {
				let e = Er(u, o, r, n);
				if (kr(u, e), s === "out-in" && c.type !== R) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, Dr(a);
				s === "in-out" && c.type !== R ? e.delayLeave = (e, t, n) => {
					let i = Tr(r, u);
					i[String(u.key)] = u, e[gr] = () => {
						t(), e[gr] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function Cr(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== R) {
			t = n;
			break;
		}
	}
	return t;
}
var wr = Sr;
function Tr(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Er(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: p, onLeave: m, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: _, onAppear: v, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = Tr(n, e), C = (e, t) => {
		e && xn(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), d(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, T = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) if (a) r = _ || c;
			else return;
			t[gr] && t[gr](!0);
			let i = S[x];
			i && Ha(e, i) && i.el[gr] && i.el[gr](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = f;
			if (!n.isMounted) if (a) r = v || l, i = y || u, o = b || f;
			else return;
			let s = !1;
			t[_r] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), T.delayedLeave && T.delayedLeave(), t[_r] = void 0);
			};
			let c = t[_r].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[_r] && t[_r](!0), n.isUnmounting) return r();
			C(p, [t]);
			let a = !1;
			t[gr] = (n) => {
				a || (a = !0, r(), C(n ? g : h, [t]), t[gr] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[gr].bind(null, !1);
			S[i] = e, m ? w(m, [t, o]) : o();
		},
		clone(e) {
			let a = Er(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return T;
}
function Dr(e) {
	if (Hr(e)) return e = Ja(e), e.children = null, e;
}
function Or(e) {
	if (!Hr(e)) return ir(e.type) && e.children ? Cr(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && h(n.default)) return n.default();
	}
}
function kr(e, t) {
	if (e.shapeFlag & 6 && e.component) {
		e.transition = t;
		let n = e.component.subTree;
		kr(ir(n.type) && Or(n) || n, t);
	} else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ar(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === ka ? (o.patchFlag & 128 && i++, r = r.concat(Ar(o.children, t, s))) : (t || o.type !== R) && r.push(s == null ? o : Ja(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
// @__NO_SIDE_EFFECTS__
function jr(e, t) {
	return h(e) ? /* @__PURE__ */ s({ name: e.name }, t, { setup: e }) : e;
}
function Mr(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Nr(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Pr = /* @__PURE__ */ new WeakMap();
function Fr(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => Fr(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (zr(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && Fr(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? So(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ P(v), b = v === t ? i : (e) => !Nr(_, e) && u(y, e), x = (e, t) => !(t && Nr(_, t));
	if (m != null && m !== p) {
		if (Ir(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ F(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) bn(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ F(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? v[p] : _[p] : x(p) || !e.k ? p.value : _[e.k];
					if (o) d(n) && c(n, s);
					else if (d(n)) n.includes(s) || n.push(s);
					else if (t) _[p] = [s], b(p) && (v[p] = _[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (_[e.k] = t);
					}
				} else t ? (_[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (_[e.k] = l));
			};
			if (l) {
				let t = () => {
					i(), Pr.delete(e);
				};
				t.id = -1, Pr.set(e, t), ga(t, r);
			} else Ir(e), i();
		}
	}
}
function Ir(e) {
	let t = Pr.get(e);
	t && (t.flags |= 8, Pr.delete(e));
}
var Lr = (e) => e.nodeType === 8;
ce().requestIdleCallback, ce().cancelIdleCallback;
function Rr(e, t) {
	if (Lr(e) && e.data === "[") {
		let n = 1, r = e.nextSibling;
		for (; r;) {
			if (r.nodeType === 1) {
				if (t(r) === !1) break;
			} else if (Lr(r)) if (r.data === "]") {
				if (--n === 0) break;
			} else r.data === "[" && n++;
			r = r.nextSibling;
		}
	} else t(e);
}
var zr = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function Br(e) {
	h(e) && (e = { loader: e });
	let { loader: t, loadingComponent: n, errorComponent: r, delay: i = 200, hydrate: a, timeout: o, suspensible: s = !0, onError: c } = e, l = null, u, d = 0, f = () => (d++, l = null, p()), p = () => {
		let e;
		return l || (e = l = t().catch((e) => {
			if (e = e instanceof Error ? e : Error(String(e)), c) return new Promise((t, n) => {
				c(e, () => t(f()), () => n(e), d + 1);
			});
			throw e;
		}).then((t) => e !== l && l ? l : (t && (t.__esModule || t[Symbol.toStringTag] === "Module") && (t = t.default), u = t, t)));
	};
	return /* @__PURE__ */ jr({
		name: "AsyncComponentWrapper",
		__asyncLoader: p,
		__asyncHydrate(e, t, n) {
			let r = e.isConnected, i = !1;
			(t.bu ||= []).push(() => i = !0);
			let o = () => {
				i || !e.parentNode || r && !e.isConnected || n();
			}, s = a ? () => {
				let n = a(o, (t) => Rr(e, t));
				n && (t.bum ||= []).push(n);
			} : o;
			u ? s() : p().then(() => !t.isUnmounted && s());
		},
		get __asyncResolved() {
			return u;
		},
		setup() {
			let e = B;
			if (Mr(e), u) return () => Vr(u, e);
			let t = (t) => {
				l = null, Sn(t, e, 13, !r);
			};
			if (s && e.suspense || po) return p().then((t) => () => Vr(t, e)).catch((e) => (t(e), () => r ? z(r, { error: e }) : null));
			let a = /* @__PURE__ */ Xt(!1), c = /* @__PURE__ */ Xt(), d = /* @__PURE__ */ Xt(!!i), f, m;
			return ei(() => {
				f != null && clearTimeout(f), m != null && clearTimeout(m);
			}), i && (m = setTimeout(() => {
				e.isUnmounted || (d.value = !1);
			}, i)), o != null && (f = setTimeout(() => {
				if (!e.isUnmounted && !a.value && !c.value) {
					let e = /* @__PURE__ */ Error(`Async component timed out after ${o}ms.`);
					t(e), c.value = e;
				}
			}, o)), p().then(() => {
				e.isUnmounted || (a.value = !0, e.parent && Hr(e.parent.vnode) && e.parent.update());
			}).catch((n) => {
				if (e.isUnmounted) {
					l = null;
					return;
				}
				t(n), c.value = n;
			}), () => {
				if (a.value && u) return Vr(u, e);
				if (c.value && r) return z(r, { error: c.value });
				if (n && !d.value) return Vr(n, e);
			};
		}
	});
}
function Vr(e, t) {
	let { ref: n, props: r, children: i, ce: a } = t.vnode, o = z(e, r, i);
	return o.ref = n, o.ce = a, delete t.vnode.ce, o;
}
var Hr = (e) => e.type.__isKeepAlive;
function Ur(e, t) {
	Gr(e, "a", t);
}
function Wr(e, t) {
	Gr(e, "da", t);
}
function Gr(e, t, n = B) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (qr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Hr(e.parent.vnode) && Kr(r, t, n, e), e = e.parent;
	}
}
function Kr(e, t, n, r) {
	let i = qr(t, e, r, !0);
	ei(() => {
		c(r[t], i);
	}, n);
}
function qr(e, t, n = B, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			We();
			let i = lo(n), a = xn(t, n, e, r);
			return i(), Ge(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Jr = (e) => (t, n = B) => {
	(!po || e === "sp") && qr(e, (...e) => t(...e), n);
}, Yr = Jr("bm"), Xr = Jr("m"), Zr = Jr("bu"), Qr = Jr("u"), $r = Jr("bum"), ei = Jr("um"), ti = Jr("sp"), ni = Jr("rtg"), ri = Jr("rtc");
function ii(e, t = B) {
	qr("ec", e, t);
}
var ai = "components";
function oi(e, t) {
	return li(ai, e, !0, t) || e;
}
var si = /* @__PURE__ */ Symbol.for("v-ndc");
function ci(e) {
	return g(e) ? li(ai, e, !1) || e : e || si;
}
function li(e, t, n = !0, r = !1) {
	let i = L || B;
	if (i) {
		let n = i.type;
		if (e === ai) {
			let e = Co(n, !1);
			if (e && (e === t || e === D(t) || e === ne(D(t)))) return n;
		}
		let a = ui(i[e] || n[e], t) || ui(i.appContext[e], t);
		return !a && r ? n : a;
	}
}
function ui(e, t) {
	return e && (e[t] || e[D(t)] || e[ne(D(t))]);
}
function di(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ Ut(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Gt(e), s = /* @__PURE__ */ Wt(e), e = it(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Yt(Jt(e[n])) : Jt(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (v(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
	else {
		let n = Object.keys(e);
		i = Array(n.length);
		for (let r = 0, o = n.length; r < o; r++) {
			let o = n[r];
			i[r] = t(e[o], o, r, a && a[r]);
		}
	}
	else i = [];
	return n && (n[r] = i), i;
}
function fi(e, t, n, r, i, a) {
	if (n ??= {}, L.ce || L.parent && zr(L.parent) && L.parent.ce) {
		let e = a != null && n.key == null ? s({}, n, { key: a }) : n, i = Object.keys(e).length > 0;
		return t !== "default" && (e.name = t), Pa(), Ba(ka, null, [z("slot", e, r && r())], i ? -2 : 64);
	}
	let o = e[t];
	o && o._c && (o._d = !1);
	let c = Ma.length;
	Pa();
	let l;
	try {
		let i = o && pi(o(n)), s = n.key || a || i && i.key;
		l = Ba(ka, { key: (s && !_(s) ? s : `_${t}`) + (!i && r ? "_fb" : "") }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
	} catch (e) {
		for (let e = Ma.length; e > c; e--) Fa();
		throw e;
	} finally {
		o && o._c && (o._d = !0);
	}
	return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), l;
}
function pi(e) {
	return e.some((e) => !Va(e) || !(e.type === R || e.type === ka && !pi(e.children))) ? e : null;
}
var mi = (e) => e ? fo(e) ? So(e) : mi(e.parent) : null, hi = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => mi(e.parent),
	$root: (e) => mi(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Ti(e),
	$forceUpdate: (e) => e.f ||= () => {
		Nn(e.update);
	},
	$nextTick: (e) => e.n ||= jn.bind(e.proxy),
	$watch: (e) => er.bind(e)
}), gi = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), _i = {
	get({ _: e }, n) {
		if (n === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (n[0] !== "$") {
			let e = s[n];
			if (e !== void 0) switch (e) {
				case 1: return i[n];
				case 2: return a[n];
				case 4: return r[n];
				case 3: return o[n];
			}
			else if (gi(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else bi && (s[n] = 0);
		}
		let d = hi[n], f, p;
		if (d) return n === "$attrs" && N(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return gi(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || gi(n, c) || u(o, c) || u(i, c) || u(hi, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function vi(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function yi(e, t) {
	return !e || !t ? e || t : d(e) && d(t) ? e.concat(t) : s({}, vi(e), vi(t));
}
var bi = !0;
function xi(e) {
	let t = Ti(e), n = e.proxy, i = e.ctx;
	bi = !1, t.beforeCreate && Ci(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: T, renderTracked: E, renderTriggered: ee, errorCaptured: D, serverPrefetch: te, expose: O, inheritAttrs: ne, components: re, directives: k, filters: ie } = t;
	if (u && Si(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ Rt(t));
	}
	if (bi = !0, o) for (let e in o) {
		let t = o[e], a = To({
			get: h(t) ? t.bind(n, n) : h(t.get) ? t.get.bind(n, n) : r,
			set: !h(t) && h(t.set) ? t.set.bind(n) : r
		});
		Object.defineProperty(i, e, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		});
	}
	if (c) for (let e in c) wi(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Gn(t, e[t]);
		});
	}
	f && Ci(f, e, "c");
	function A(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (A(Yr, p), A(Xr, m), A(Zr, g), A(Qr, _), A(Ur, y), A(Wr, b), A(ii, D), A(ri, E), A(ni, ee), A($r, S), A(ei, w), A(ti, te), d(O)) if (O.length) {
		let t = e.exposed ||= {};
		O.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	T && e.render === r && (e.render = T), ne != null && (e.inheritAttrs = ne), re && (e.components = re), k && (e.directives = k), te && Mr(e);
}
function Si(e, t, n = r) {
	d(e) && (e = Ai(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? Kn(r.from || n, r.default, !0) : Kn(r.from || n) : Kn(r), /* @__PURE__ */ F(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Ci(e, t, n) {
	xn(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function wi(e, t, n, r) {
	let i = r.includes(".") ? tr(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && Qn(i, n);
	} else if (h(e)) Qn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => wi(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && Qn(i, r, e);
	}
}
function Ti(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Ei(c, e, o, !0)), Ei(c, t, o)), v(t) && a.set(t, c), c;
}
function Ei(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Ei(e, a, n, !0), i && i.forEach((t) => Ei(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Di[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Di = {
	data: Oi,
	props: Ni,
	emits: Ni,
	methods: Mi,
	computed: Mi,
	beforeCreate: ji,
	created: ji,
	beforeMount: ji,
	mounted: ji,
	beforeUpdate: ji,
	updated: ji,
	beforeDestroy: ji,
	beforeUnmount: ji,
	destroyed: ji,
	unmounted: ji,
	activated: ji,
	deactivated: ji,
	errorCaptured: ji,
	serverPrefetch: ji,
	components: Mi,
	directives: Mi,
	watch: Pi,
	provide: Oi,
	inject: ki
};
function Oi(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function ki(e, t) {
	return Mi(Ai(e), Ai(t));
}
function Ai(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function ji(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Mi(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ni(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), vi(e), vi(t ?? {})) : t;
}
function Pi(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = ji(e[r], t[r]);
	return n;
}
function Fi() {
	return {
		app: null,
		config: {
			isNativeTag: i,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var Ii = 0;
function Li(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = Fi(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Ii++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Do,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && h(e.install) ? (a.add(e), e.install(l, ...t)) : h(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, s) {
				if (!c) {
					let u = l._ceVNode || z(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, So(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (xn(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = Ri;
				Ri = l;
				try {
					return e();
				} finally {
					Ri = t;
				}
			}
		};
		return l;
	};
}
var Ri = null;
function zi(e, n, r = t) {
	let i = oo(), a = D(n), o = O(n), s = Bi(e, a), c = on((s, c) => {
		let l, u = t, d;
		return Zn(() => {
			let t = e[a];
			k(l, t) && (l = t, c());
		}), {
			get() {
				return s(), r.get ? r.get(l) : l;
			},
			set(e) {
				let s = r.set ? r.set(e) : e;
				if (!k(s, l) && !(u !== t && k(e, u))) return;
				let f = i.vnode.props, p = !!(f && (n in f || a in f || o in f) && (`onUpdate:${n}` in f || `onUpdate:${a}` in f || `onUpdate:${o}` in f));
				p || (l = e, c()), i.emit(`update:${n}`, s), k(e, u) && (k(e, s) && !k(s, d) || p && u !== t && !k(s, l)) && c(), u = e, d = s;
			}
		};
	});
	return c[Symbol.iterator] = () => {
		let e = 0;
		return { next() {
			return e < 2 ? {
				value: e++ ? s || t : c,
				done: !1
			} : { done: !0 };
		} };
	}, c;
}
var Bi = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${D(t)}Modifiers`] || e[`${O(t)}Modifiers`];
function Vi(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && Bi(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(ae)));
	let c, l = i[c = re(n)] || i[c = re(D(n))];
	!l && o && (l = i[c = re(O(n))]), l && xn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, xn(u, e, 6, a);
	}
}
var Hi = /* @__PURE__ */ new WeakMap();
function Ui(e, t, n = !1) {
	let r = n ? Hi : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = Ui(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function Wi(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, O(t)) || u(e, t));
}
function Gi(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = Vn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r;
			v = Qa(u.call(e, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = Qa(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : Ki(c);
		}
	} catch (t) {
		Ma.length = 0, Sn(t, e, 1), v = z(R);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = qi(y, a)), b = Ja(b, y, !1, !0));
	}
	return n.dirs && (b = Ja(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && kr(ir(b.type) && Or(b) || b, n.transition), v = b, Vn(_), v;
}
var Ki = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, qi = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function Ji(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? Yi(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (Xi(o, r, n) && !Wi(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? !o || Yi(r, o, l) : !!o;
	return !1;
}
function Yi(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (Xi(t, e, a) && !Wi(n, a)) return !0;
	}
	return !1;
}
function Xi(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !ye(r, i) : r !== i;
}
function Zi({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Qi = {}, $i = () => Object.create(Qi), ea = (e) => Object.getPrototypeOf(e) === Qi;
function ta(e, t, n, r = !1) {
	let i = {}, a = $i();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), ra(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	e.props = n ? r ? i : /* @__PURE__ */ zt(i) : e.type.props ? i : a, e.attrs = a;
}
function na(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ P(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (Wi(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = D(o);
					i[t] = ia(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		ra(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = O(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = ia(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && tt(e.attrs, "set", "");
}
function ra(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (T(t)) continue;
		let l = n[t], d;
		a && u(a, d = D(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : Wi(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ P(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = ia(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function ia(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = lo(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === O(n)) && (r = !0));
	}
	return r;
}
var aa = /* @__PURE__ */ new WeakMap();
function oa(e, r, i = !1) {
	let a = i ? aa : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = oa(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = D(c[e]);
		sa(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = D(e);
		if (sa(t)) {
			let n = c[e], r = l[t] = d(n) || h(n) ? { type: n } : s({}, n), i = r.type, a = !1, o = !0;
			if (d(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = h(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				}
				n === "String" && (o = !1);
			}
			else a = h(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || u(r, "default")) && f.push(t);
		}
	}
	let m = [l, f];
	return v(e) && a.set(e, m), m;
}
function sa(e) {
	return e[0] !== "$" && !T(e);
}
var ca = (e) => e === "_" || e === "_ctx" || e === "$stable", la = (e) => d(e) ? e.map(Qa) : [Qa(e)], ua = (e, t, n) => {
	if (t._n) return t;
	let r = Hn((...e) => la(t(...e)), n);
	return r._c = !1, r;
}, da = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (ca(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = ua(n, i, r);
		else if (i != null) {
			let e = la(i);
			t[n] = () => e;
		}
	}
}, fa = (e, t) => {
	let n = la(t);
	e.slots.default = () => n;
}, pa = (e, t, n) => {
	for (let r in t) (n || !ca(r)) && (e[r] = t[r]);
}, ma = (e, t, n) => {
	let r = e.slots = $i();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (pa(r, t, n), n && A(r, "_", e, !0)) : da(t, r);
	} else t && fa(e, t);
}, ha = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : pa(a, n, r) : (o = !n.$stable, da(n, a)), s = n;
	} else n && (fa(e, n), s = { default: 1 });
	if (o) for (let e in a) !ca(e) && s[e] == null && delete a[e];
}, ga = Oa;
function _a(e) {
	return va(e);
}
function va(e, i) {
	let a = ce();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Ha(e, t) && (r = ve(e), pe(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Aa:
				y(e, t, n, r);
				break;
			case R:
				b(e, t, n, r);
				break;
			case ja:
				e ?? x(t, n, r, o);
				break;
			case ka:
				re(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? k(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, xe);
		}
		u != null && i ? Fr(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && Fr(e.ref, null, a, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) E(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), te(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, E = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && D(e.children, d, null, r, i, ya(e, a), s, u), _ && Wn(e, null, r, "created"), ee(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !T(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && no(f, r, e);
		}
		_ && Wn(e, null, r, "beforeMount");
		let v = xa(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && ga(() => {
			try {
				f && no(f, r, e), v && g.enter(d), _ && Wn(e, null, r, "mounted");
			} finally {}
		}, i);
	}, ee = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Da(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ee(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, D = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) {
			let c = e[l] = s ? $a(e[l]) : Qa(e[l]);
			v(null, c, t, n, r, i, a, o, s);
		}
	}, te = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && ba(r, !1), (g = h.onVnodeBeforeUpdate) && no(g, r, n, e), f && Wn(n, e, r, "beforeUpdate"), r && ba(r, !0), d && (!e.dynamicChildren || e.dynamicChildren.length !== d.length) && (u = 0, s = !1, d = null), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? O(e.dynamicChildren, d, l, r, i, ya(n, a), o) : s || le(e, n, l, null, r, i, ya(n, a), o, !1), u > 0) {
			if (u & 16) ne(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && ne(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && ga(() => {
			g && no(g, r, n, e), f && Wn(n, e, r, "updated");
		}, i);
	}, O = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s], u = c.el && (c.type === ka || !Ha(c, l) || c.shapeFlag & 198) ? m(c.el) : n;
			v(c, l, u, null, r, i, a, o, !0);
		}
	}, ne = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !T(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (T(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, re = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), D(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (O(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Sa(e, t, !0)) : le(e, t, n, f, i, a, s, c, l);
	}, k = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : A(t, n, r, i, a, o, c) : ae(e, t, c);
	}, A = (e, t, n, r, i, a, o) => {
		let s = e.component = ao(e, r, i);
		if (Hr(e) && (s.ctx.renderer = xe), mo(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, oe, o), !e.el) {
				let r = s.subTree = z(R);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else oe(s, e, t, n, i, a, o);
	}, ae = (e, t, n) => {
		let r = t.component = e.component;
		if (Ji(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			se(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, oe = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = wa(e);
					if (n) {
						t && (t.el = c.el, se(e, t, o)), n.asyncDep.then(() => {
							ga(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				ba(e, !1), t ? (t.el = c.el, se(e, t, o)) : t = c, n && ie(n), (d = t.props && t.props.onVnodeBeforeUpdate) && no(d, s, t, c), ba(e, !0);
				let f = Gi(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ve(p), e, i, a), t.el = f.el, u === null && Zi(e, f.el), r && ga(r, i), (d = t.props && t.props.onVnodeUpdated) && ga(() => no(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = zr(t);
				if (ba(e, !1), l && ie(l), !m && (o = c && c.onVnodeBeforeMount) && no(o, d, t), ba(e, !0), s && Ce) {
					let t = () => {
						e.subTree = Gi(e), Ce(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = Gi(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && ga(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					ga(() => no(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && zr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && ga(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new ke(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Nn(u), ba(e, !0), l();
	}, se = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, na(e, t.props, r, n), ha(e, t.children, n), We(), In(e), Ge();
	}, le = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				de(l, d, n, r, i, a, o, s, c);
				return;
			}
			if (f & 256) {
				ue(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && _e(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? de(l, d, n, r, i, a, o, s, c) : _e(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && D(d, n, r, i, a, o, s, c));
	}, ue = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? $a(t[p]) : Qa(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? _e(e, a, o, !0, !1, f) : D(t, r, i, a, o, s, c, l, f);
	}, de = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? $a(t[u]) : Qa(t[u]);
			if (Ha(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? $a(t[p]) : Qa(t[p]);
			if (Ha(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? $a(t[u]) : Qa(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) pe(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? $a(t[u]) : Qa(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					pe(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Ha(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? pe(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Ca(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Ea(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? fe(n, r, p, 2) : _--);
			}
		}
	}, fe = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			fe(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, xe);
			return;
		}
		if (c === ka) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) fe(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === ja) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.persisted && !a[gr] ? o(a, t, n) : (l.beforeEnter(a), o(a, t, n), ga(() => l.enter(a), i));
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				let e = a._isLeaving || !!a[gr];
				a._isLeaving && a[gr](!0), l.persisted && !e ? u() : r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, pe = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (We(), Fr(s, null, n, e, !0), Ge()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !zr(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && no(_, t, e), u & 6) ge(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Wn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, xe, r) : l && !l.hasOnce && (a !== ka || d > 0 && d & 64) ? _e(l, t, n, !1, !0) : (a === ka && d & 384 || !i && u & 16) && _e(c, t, n), r && me(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && ga(() => {
			_ && no(_, t, e), h && Wn(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, me = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === ka) {
			he(n, r);
			return;
		}
		if (t === ja) {
			C(e);
			return;
		}
		let a = () => {
			s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (e.shapeFlag & 1 && i && !i.persisted) {
			let { leave: t, delayLeave: r } = i, o = () => t(n, a);
			r ? r(e.el, a, o) : o();
		} else a();
	}, he = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, ge = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Ta(c), Ta(l), r && ie(r), i.stop(), a && (a.flags |= 8, pe(o, e, t, n)), s && ga(s, t), ga(() => {
			e.isUnmounted = !0;
		}, t);
	}, _e = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) pe(e[o], t, n, r, i);
	}, ve = (e) => {
		if (e.shapeFlag & 6) return ve(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[rr];
		return n ? h(n) : t;
	}, ye = !1, be = (e, t, n) => {
		let r;
		e == null ? t._vnode && (pe(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ye ||= (ye = !0, In(r), Ln(), !1);
	}, xe = {
		p: v,
		um: pe,
		m: fe,
		r: me,
		mt: A,
		mc: D,
		pc: le,
		pbc: O,
		n: ve,
		o: e
	}, Se, Ce;
	return i && ([Se, Ce] = i(xe)), {
		render: be,
		hydrate: Se,
		createApp: Li(be, Se)
	};
}
function ya({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ba({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function xa(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Sa(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = $a(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Sa(t, a)), a.type === Aa && (a.patchFlag === -1 && (a = i[e] = $a(a)), a.el = t.el), a.type === R && !a.el && (a.el = t.el);
	}
}
function Ca(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function wa(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : wa(t);
}
function Ta(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Ea(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Ea(t.subTree) : null;
}
var Da = (e) => e.__isSuspense;
function Oa(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : Fn(e);
}
var ka = /* @__PURE__ */ Symbol.for("v-fgt"), Aa = /* @__PURE__ */ Symbol.for("v-txt"), R = /* @__PURE__ */ Symbol.for("v-cmt"), ja = /* @__PURE__ */ Symbol.for("v-stc"), Ma = [], Na = null;
function Pa(e = !1) {
	Ma.push(Na = e ? null : []);
}
function Fa() {
	Ma.pop(), Na = Ma[Ma.length - 1] || null;
}
var Ia = 1;
function La(e, t = !1) {
	Ia += e, e < 0 && Na && t && (Na.hasOnce = !0);
}
function Ra(e) {
	return e.dynamicChildren = Ia > 0 ? Na || n : null, Fa(), Ia > 0 && Na && Na.push(e), e;
}
function za(e, t, n, r, i, a) {
	return Ra(Ga(e, t, n, r, i, a, !0));
}
function Ba(e, t, n, r, i) {
	return Ra(z(e, t, n, r, i, !0));
}
function Va(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Ha(e, t) {
	return e.type === t.type && e.key === t.key;
}
var Ua = ({ key: e }) => e ?? null, Wa = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ F(e) || h(e) ? {
	i: L,
	r: e,
	k: t,
	f: !!n
} : e);
function Ga(e, t = null, n = null, r = 0, i = null, a = e === ka ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Ua(t),
		ref: t && Wa(t),
		scopeId: Bn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: L
	};
	return s ? (eo(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), Ia > 0 && !o && Na && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Na.push(c), c;
}
var z = Ka;
function Ka(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === si) && (e = R), Va(e)) {
		let r = Ja(e, t, !0);
		return n && eo(r, n), Ia > 0 && !a && Na && (r.shapeFlag & 6 ? Na[Na.indexOf(e)] = r : Na.push(r)), r.patchFlag = -2, r;
	}
	if (wo(e) && (e = e.__vccOpts), t) {
		t = qa(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = me(e)), v(n) && (/* @__PURE__ */ Kt(n) && !d(n) && (n = s({}, n)), t.style = le(n));
	}
	let o = g(e) ? 1 : Da(e) ? 128 : ir(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return Ga(e, t, n, r, i, o, a, !0);
}
function qa(e) {
	return e ? /* @__PURE__ */ Kt(e) || ea(e) ? s({}, e) : e : null;
}
function Ja(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? to(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Ua(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(Wa(t)) : [a, Wa(t)] : Wa(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== ka ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Ja(e.ssContent),
		ssFallback: e.ssFallback && Ja(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && kr(u, c.clone(u)), u;
}
function Ya(e = " ", t = 0) {
	return z(Aa, null, e, t);
}
function Xa(e, t) {
	let n = z(ja, null, e);
	return n.staticCount = t, n;
}
function Za(e = "", t = !1) {
	return t ? (Pa(), Ba(R, null, e)) : z(R, null, e);
}
function Qa(e) {
	return e == null || typeof e == "boolean" ? z(R) : d(e) ? z(ka, null, e.slice()) : Va(e) ? $a(e) : z(Aa, null, String(e));
}
function $a(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ja(e);
}
function eo(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), eo(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !ea(t) ? t._ctx = L : r === 3 && L && (L.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else if (h(t)) {
		if (r & 65) {
			eo(e, { default: t });
			return;
		}
		t = {
			default: t,
			_ctx: L
		}, n = 32;
	} else t = String(t), r & 64 ? (n = 16, t = [Ya(t)]) : n = 8;
	e.children = t, e.shapeFlag |= n;
}
function to(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = me([t.class, r.class]));
		else if (e === "style") t.style = le([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !o(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function no(e, t, n, r = null) {
	xn(e, t, 7, [n, r]);
}
var ro = Fi(), io = 0;
function ao(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || ro, o = {
		uid: io++,
		vnode: e,
		type: i,
		parent: n,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Te(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: n ? n.provides : Object.create(a.provides),
		ids: n ? n.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: oa(i, a),
		emitsOptions: Ui(i, a),
		emit: null,
		emitted: null,
		propsDefaults: t,
		inheritAttrs: i.inheritAttrs,
		ctx: t,
		data: t,
		props: t,
		attrs: t,
		slots: t,
		refs: t,
		setupState: t,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = Vi.bind(null, o), e.ce && e.ce(o), o;
}
var B = null, oo = () => B || L, so, co;
{
	let e = ce(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	so = t("__VUE_INSTANCE_SETTERS__", (e) => B = e), co = t("__VUE_SSR_SETTERS__", (e) => po = e);
}
var lo = (e) => {
	let t = B;
	return so(e), e.scope.on(), () => {
		e.scope.off(), so(t);
	};
}, uo = () => {
	B && B.scope.off(), so(null);
};
function fo(e) {
	return e.vnode.shapeFlag & 4;
}
var po = !1;
function mo(e, t = !1, n = !1) {
	t && co(t);
	let { props: r, children: i } = e.vnode, a = fo(e);
	ta(e, r, a, t), ma(e, i, n || t);
	let o = a ? ho(e, t) : void 0;
	return t && co(!1), o;
}
function ho(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, _i);
	let { setup: r } = n;
	if (r) {
		We();
		let n = e.setupContext = r.length > 1 ? xo(e) : null, i = lo(e), a = bn(r, e, 0, [e.props, n]), o = y(a);
		if (Ge(), i(), (o || e.sp) && !zr(e) && Mr(e), o) {
			if (a.then(uo, uo), t) return a.then((n) => {
				co(!0);
				try {
					go(e, n, t);
				} finally {
					co(!1);
				}
			}).catch((t) => {
				Sn(t, e, 0);
			});
			e.asyncDep = a;
		} else go(e, a, t);
	} else yo(e, t);
}
function go(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = rn(t)), yo(e, n);
}
var _o, vo;
function yo(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && _o && !i.render) {
			let t = i.template || Ti(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: r } = e.appContext.config, { delimiters: a, compilerOptions: o } = i;
				i.render = _o(t, s(s({
					isCustomElement: n,
					delimiters: a
				}, r), o));
			}
		}
		e.render = i.render || r, vo && vo(e);
	}
	{
		let t = lo(e);
		We();
		try {
			xi(e);
		} finally {
			Ge(), t();
		}
	}
}
var bo = { get(e, t) {
	return N(e, "get", ""), e[t];
} };
function xo(e) {
	return {
		attrs: new Proxy(e.attrs, bo),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function So(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(rn(qt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in hi) return hi[n](e);
		},
		has(e, t) {
			return t in e || t in hi;
		}
	}) : e.proxy;
}
function Co(e, t = !0) {
	return h(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function wo(e) {
	return h(e) && "__vccOpts" in e;
}
var To = (e, t) => /* @__PURE__ */ pn(e, t, po);
function Eo(e, t, n) {
	try {
		La(-1);
		let r = arguments.length;
		return r === 2 ? v(t) && !d(t) ? Va(t) ? z(e, null, [t]) : z(e, t) : z(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Va(n) && (n = [n]), z(e, t, n));
	} finally {
		La(1);
	}
}
var Do = "3.5.41", Oo = void 0, ko = typeof window < "u" && window.trustedTypes;
if (ko) try {
	Oo = /* @__PURE__ */ ko.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Ao = Oo ? (e) => Oo.createHTML(e) : (e) => e, jo = "http://www.w3.org/2000/svg", Mo = "http://www.w3.org/1998/Math/MathML", No = typeof document < "u" ? document : null, Po = No && /* @__PURE__ */ No.createElement("template"), Fo = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? No.createElementNS(jo, e) : t === "mathml" ? No.createElementNS(Mo, e) : n ? No.createElement(e, { is: n }) : No.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => No.createTextNode(e),
	createComment: (e) => No.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => No.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Po.innerHTML = Ao(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Po.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Io = "transition", Lo = "animation", Ro = /* @__PURE__ */ Symbol("_vtc"), zo = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
}, Bo = /* @__PURE__ */ s({}, br, zo), Vo = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = Bo, e))((e, { slots: t }) => Eo(wr, Wo(e), t)), Ho = (e, t = []) => {
	d(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, Uo = (e) => e ? d(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function Wo(e) {
	let t = {};
	for (let n in e) n in zo || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: l = a, appearActiveClass: u = o, appearToClass: d = c, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = Go(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: T = b } = t, E = (e, t, n, r) => {
		e._enterCancelled = r, Jo(e, t ? d : c), Jo(e, t ? u : o), n && n();
	}, ee = (e, t) => {
		e._isLeaving = !1, Jo(e, f), Jo(e, m), Jo(e, p), t && t();
	}, D = (e) => (t, n) => {
		let i = e ? w : y, o = () => E(t, e, n);
		Ho(i, [t, o]), Yo(() => {
			Jo(t, e ? l : a), qo(t, e ? d : c), Uo(i) || Zo(t, r, g, o);
		});
	};
	return s(t, {
		onBeforeEnter(e) {
			Ho(v, [e]), qo(e, a), qo(e, o);
		},
		onBeforeAppear(e) {
			Ho(C, [e]), qo(e, l), qo(e, u);
		},
		onEnter: D(!1),
		onAppear: D(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => ee(e, t);
			qo(e, f), qo(e, p), Yo(() => {
				e._isLeaving && (Jo(e, f), qo(e, m), Uo(x) || Zo(e, r, _, n));
			}), Ho(x, [e, n]);
		},
		onEnterCancelled(e) {
			E(e, !1, void 0, !0), Ho(b, [e]);
		},
		onAppearCancelled(e) {
			E(e, !0, void 0, !0), Ho(T, [e]);
		},
		onLeaveCancelled(e) {
			ee(e), Ho(S, [e]);
		}
	});
}
function Go(e) {
	if (e == null) return null;
	if (v(e)) return [Ko(e.enter), Ko(e.leave)];
	{
		let t = Ko(e);
		return [t, t];
	}
}
function Ko(e) {
	return oe(e);
}
function qo(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[Ro] || (e[Ro] = /* @__PURE__ */ new Set())).add(t);
}
function Jo(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[Ro];
	n && (n.delete(t), n.size || (e[Ro] = void 0));
}
function Yo(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var Xo = 0;
function Zo(e, t, n, r) {
	let i = e._endId = ++Xo, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = Qo(e, t);
	if (!o) return r();
	let l = o + "end", u = 0, d = () => {
		e.removeEventListener(l, f), a();
	}, f = (t) => {
		t.target === e && ++u >= c && d();
	};
	setTimeout(() => {
		u < c && d();
	}, s + 1), e.addEventListener(l, f);
}
function Qo(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${Io}Delay`), a = r(`${Io}Duration`), o = $o(i, a), s = r(`${Lo}Delay`), c = r(`${Lo}Duration`), l = $o(s, c), u = null, d = 0, f = 0;
	t === Io ? o > 0 && (u = Io, d = o, f = a.length) : t === Lo ? l > 0 && (u = Lo, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? Io : Lo : null, f = u ? u === Io ? a.length : c.length : 0);
	let p = u === Io && /\b(?:transform|all)(?:,|$)/.test(r(`${Io}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function $o(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => es(t) + es(e[n])));
}
function es(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function ts(e, t, n) {
	let r = e[Ro];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var ns = /* @__PURE__ */ Symbol("_vod"), rs = /* @__PURE__ */ Symbol("_vsh"), is = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[ns] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : as(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), as(e, !0), r.enter(e)) : r.leave(e, () => {
			as(e, !1);
		}) : as(e, t));
	},
	beforeUnmount(e, { value: t }) {
		as(e, t);
	}
};
function as(e, t) {
	e.style.display = t ? e[ns] : "none", e[rs] = !t;
}
var os = /* @__PURE__ */ Symbol(""), ss = /(?:^|;)\s*display\s*:/;
function cs(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) if (g(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? us(r, t, "");
		}
		else for (let e in t) n[e] ?? us(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? us(r, i, "") : ms(e, i, !g(t) && t ? t[i] : void 0, o) || us(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[os];
			e && (n += ";" + e), r.cssText = n, a = ss.test(n);
		}
	} else t && e.removeAttribute("style");
	ns in e && (e[ns] = a ? r.display : "", e[rs] && (r.display = "none"));
}
var ls = /\s*!important$/;
function us(e, t, n) {
	if (d(n)) n.forEach((n) => us(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = ps(e, t);
		ls.test(n) ? e.setProperty(O(r), n.replace(ls, ""), "important") : e[r] = n;
	}
}
var ds = [
	"Webkit",
	"Moz",
	"ms"
], fs = {};
function ps(e, t) {
	let n = fs[t];
	if (n) return n;
	let r = D(t);
	if (r !== "filter" && r in e) return fs[t] = r;
	r = ne(r);
	for (let n = 0; n < ds.length; n++) {
		let i = ds[n] + r;
		if (i in e) return fs[t] = i;
	}
	return t;
}
function ms(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && g(r) && n === r;
}
var hs = "http://www.w3.org/1999/xlink";
function gs(e, t, n, r, i, a = ge(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(hs, t.slice(6, t.length)) : e.setAttributeNS(hs, t, n) : n == null || a && !_e(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function _s(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Ao(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = _e(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function vs(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function ys(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var bs = /* @__PURE__ */ Symbol("_vei");
function xs(e, t, n, r, i = null) {
	let a = e[bs] || (e[bs] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = ws(t);
		r ? vs(e, n, a[t] = Os(r, i), s) : o && (ys(e, n, o, s), a[t] = void 0);
	}
}
var Ss = /(Once|Passive|Capture)$/, Cs = /^on:?(?:Once|Passive|Capture)$/;
function ws(e) {
	let t, n;
	for (; (n = e.match(Ss)) && !Cs.test(e);) t ||= {}, e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
	return [e[2] === ":" ? e.slice(3) : O(e.slice(2)), t];
}
var Ts = 0, Es = /* @__PURE__ */ Promise.resolve(), Ds = () => Ts ||= (Es.then(() => Ts = 0), Date.now());
function Os(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (d(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && xn(e, t, 5, a);
			}
		} else xn(r, t, 5, [e]);
	};
	return n.value = e, n.attached = Ds(), n;
}
var ks = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, As = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? ts(e, r, c) : t === "style" ? cs(e, n, r) : a(t) ? o(t) || xs(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : js(e, t, r, c)) ? (_s(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && gs(e, t, r, c, s, t !== "value")) : e._isVueCE && (Ms(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? _s(e, D(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), gs(e, t, r, c));
};
function js(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && ks(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return ks(t) && g(n) ? !1 : t in e;
}
function Ms(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = D(t);
	return Array.isArray(n) ? n.some((e) => D(e) === r) : Object.keys(n).some((e) => D(e) === r);
}
var Ns = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => ie(t, e) : t;
};
function Ps(e) {
	e.target.composing = !0;
}
function Fs(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Is = /* @__PURE__ */ Symbol("_assign"), Ls = /* @__PURE__ */ Symbol("_initialValue");
function Rs(e, t, n) {
	return t && (e = e.trim()), n && (e = ae(e)), e;
}
var zs = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e.parentNode && (e.type === "text" ? e[Ls] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Ls] = e.defaultValue.replace(/\r\n?/g, "\n"))), e[Is] = Ns(i);
		let a = r || i.props && i.props.type === "number";
		vs(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Is](Rs(e.value, n, a));
		}), (n || a) && vs(e, "change", () => {
			e.value = Rs(e.value, n, a);
		}), t || (vs(e, "compositionstart", Ps), vs(e, "compositionend", Fs), vs(e, "change", Fs));
	},
	mounted(e, { value: t, modifiers: { trim: n, number: r } }) {
		let i = t ?? "", a = e[Ls];
		delete e[Ls], a !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== a ? e[Is](Rs(e.value, n, r)) : e.value = i;
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Is] = Ns(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? ae(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Bs = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		e._modelValue = t, vs(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? ae(Hs(e)) : Hs(e));
			e[Is](e.multiple ? p(e._modelValue) ? new Set(t) : t : t[0]), e._assigning = !0, jn(() => {
				e._assigning = !1;
			});
		}), e[Is] = Ns(r);
	},
	mounted(e, { value: t }) {
		Vs(e, t);
	},
	beforeUpdate(e, { value: t }, n) {
		e._modelValue = t, e[Is] = Ns(n);
	},
	updated(e, { value: t }) {
		e._assigning || Vs(e, t);
	}
};
function Vs(e, t) {
	let n = e.multiple, r = d(t);
	if (!(n && !r && !p(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Hs(a);
			if (n) if (r) {
				let e = typeof o;
				a.selected = e === "string" || e === "number" ? t.some((e) => String(e) === String(o)) : be(t, o) > -1;
			} else a.selected = t.has(o);
			else if (ye(Hs(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Hs(e) {
	return "_value" in e ? e._value : e.value;
}
var Us = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Ws = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => Us.some((n) => e[`${n}Key`] && !t.includes(n))
}, Gs = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Ws[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Ks = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, qs = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = O(n.key);
		if (t.some((e) => e === r || Ks[e] === r)) return e(n);
	}));
}, Js = /* @__PURE__ */ s({ patchProp: As }, Fo), Ys;
function Xs() {
	return Ys ||= _a(Js);
}
var Zs = ((...e) => {
	Xs().render(...e);
}), Qs = ((...e) => {
	let t = Xs().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = ec(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, $s(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function $s(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function ec(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region ../../node_modules/.pnpm/vue-draggable-plus@0.6.1_@types+sortablejs@1.15.9/node_modules/vue-draggable-plus/dist/vue-draggable-plus.js
var tc = Object.defineProperty, nc = Object.getOwnPropertySymbols, rc = Object.prototype.hasOwnProperty, ic = Object.prototype.propertyIsEnumerable, ac = (e, t, n) => t in e ? tc(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, oc = (e, t) => {
	for (var n in t ||= {}) rc.call(t, n) && ac(e, n, t[n]);
	if (nc) for (var n of nc(t)) ic.call(t, n) && ac(e, n, t[n]);
	return e;
}, sc = (e, t) => {
	var n = {};
	for (var r in e) rc.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && nc) for (var r of nc(e)) t.indexOf(r) < 0 && ic.call(e, r) && (n[r] = e[r]);
	return n;
}, cc = "[vue-draggable-plus]: ";
function lc(e) {
	console.warn(cc + e);
}
function uc(e) {
	console.error(cc + e);
}
function dc(e, t, n) {
	return n >= 0 && n < e.length && e.splice(n, 0, e.splice(t, 1)[0]), e;
}
function fc(e) {
	return e.replace(/-(\w)/g, (e, t) => t ? t.toUpperCase() : "");
}
function pc(e) {
	return Object.keys(e).reduce((t, n) => (e[n] !== void 0 && (t[fc(n)] = e[n]), t), {});
}
function mc(e, t) {
	return Array.isArray(e) && e.splice(t, 1), e;
}
function hc(e, t, n) {
	return Array.isArray(e) && e.splice(t, 0, n), e;
}
function gc(e) {
	return e === void 0;
}
function _c(e) {
	return typeof e == "string";
}
function vc(e, t, n) {
	e.insertBefore(t, e.children[n]);
}
function yc(e) {
	e.parentNode && e.parentNode.removeChild(e);
}
function bc(e, t = document) {
	let n = null;
	return n = typeof t?.querySelector == "function" ? (t?.querySelector)?.call(t, e) : document.querySelector(e), n || lc(`Element not found: ${e}`), n;
}
function xc(e, t, n = null) {
	return function(...r) {
		return e.apply(n, r), t.apply(n, r);
	};
}
function Sc(e, t) {
	let n = oc({}, e);
	return Object.keys(t).forEach((r) => {
		n[r] ? n[r] = xc(e[r], t[r]) : n[r] = t[r];
	}), n;
}
function Cc(e) {
	return e instanceof HTMLElement;
}
function wc(e, t) {
	Object.keys(e).forEach((n) => {
		t(n, e[n]);
	});
}
function Tc(e) {
	return e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97);
}
var Ec = Object.assign;
function Dc(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Oc(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Dc(Object(n), !0).forEach(function(t) {
			Ac(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Dc(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function kc(e) {
	"@babel/helpers - typeof";
	return kc = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, kc(e);
}
function Ac(e, t, n) {
	return t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function jc() {
	return jc = Object.assign || function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, jc.apply(this, arguments);
}
function Mc(e, t) {
	if (e == null) return {};
	var n = {}, r = Object.keys(e), i, a;
	for (a = 0; a < r.length; a++) i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
	return n;
}
function Nc(e, t) {
	if (e == null) return {};
	var n = Mc(e, t), r, i;
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (i = 0; i < a.length; i++) r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
	}
	return n;
}
var Pc = "1.15.2";
function Fc(e) {
	if (typeof window < "u" && window.navigator) return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var Ic = Fc(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Lc = Fc(/Edge/i), Rc = Fc(/firefox/i), zc = Fc(/safari/i) && !Fc(/chrome/i) && !Fc(/android/i), Bc = Fc(/iP(ad|od|hone)/i), Vc = Fc(/chrome/i) && Fc(/android/i), Hc = {
	capture: !1,
	passive: !1
};
function V(e, t, n) {
	e.addEventListener(t, n, !Ic && Hc);
}
function H(e, t, n) {
	e.removeEventListener(t, n, !Ic && Hc);
}
function Uc(e, t) {
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
function Wc(e) {
	return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function Gc(e, t, n, r) {
	if (e) {
		n ||= document;
		do {
			if (t != null && (t[0] === ">" ? e.parentNode === n && Uc(e, t) : Uc(e, t)) || r && e === n) return e;
			if (e === n) break;
		} while (e = Wc(e));
	}
	return null;
}
var Kc = /\s+/g;
function qc(e, t, n) {
	e && t && (e.classList ? e.classList[n ? "add" : "remove"](t) : e.className = ((" " + e.className + " ").replace(Kc, " ").replace(" " + t + " ", " ") + (n ? " " + t : "")).replace(Kc, " "));
}
function U(e, t, n) {
	var r = e && e.style;
	if (r) {
		if (n === void 0) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
		!(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px");
	}
}
function Jc(e, t) {
	var n = "";
	if (typeof e == "string") n = e;
	else do {
		var r = U(e, "transform");
		r && r !== "none" && (n = r + " " + n);
	} while (!t && (e = e.parentNode));
	var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
	return i && new i(n);
}
function Yc(e, t, n) {
	if (e) {
		var r = e.getElementsByTagName(t), i = 0, a = r.length;
		if (n) for (; i < a; i++) n(r[i], i);
		return r;
	}
	return [];
}
function Xc() {
	return document.scrollingElement || document.documentElement;
}
function W(e, t, n, r, i) {
	if (!(!e.getBoundingClientRect && e !== window)) {
		var a, o, s, c, l, u, d;
		if (e !== window && e.parentNode && e !== Xc() ? (a = e.getBoundingClientRect(), o = a.top, s = a.left, c = a.bottom, l = a.right, u = a.height, d = a.width) : (o = 0, s = 0, c = window.innerHeight, l = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (i ||= e.parentNode, !Ic)) do
			if (i && i.getBoundingClientRect && (U(i, "transform") !== "none" || n && U(i, "position") !== "static")) {
				var f = i.getBoundingClientRect();
				o -= f.top + parseInt(U(i, "border-top-width")), s -= f.left + parseInt(U(i, "border-left-width")), c = o + a.height, l = s + a.width;
				break;
			}
		while (i = i.parentNode);
		if (r && e !== window) {
			var p = Jc(i || e), m = p && p.a, h = p && p.d;
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
function Zc(e, t, n) {
	for (var r = rl(e, !0), i = W(e)[t]; r;) {
		var a = W(r)[n], o = void 0;
		if (o = i >= a, !o) return r;
		if (r === Xc()) break;
		r = rl(r, !1);
	}
	return !1;
}
function Qc(e, t, n, r) {
	for (var i = 0, a = 0, o = e.children; a < o.length;) {
		if (o[a].style.display !== "none" && o[a] !== Q.ghost && (r || o[a] !== Q.dragged) && Gc(o[a], n.draggable, e, !1)) {
			if (i === t) return o[a];
			i++;
		}
		a++;
	}
	return null;
}
function $c(e, t) {
	for (var n = e.lastElementChild; n && (n === Q.ghost || U(n, "display") === "none" || t && !Uc(n, t));) n = n.previousElementSibling;
	return n || null;
}
function el(e, t) {
	var n = 0;
	if (!e || !e.parentNode) return -1;
	for (; e = e.previousElementSibling;) e.nodeName.toUpperCase() !== "TEMPLATE" && e !== Q.clone && (!t || Uc(e, t)) && n++;
	return n;
}
function tl(e) {
	var t = 0, n = 0, r = Xc();
	if (e) do {
		var i = Jc(e), a = i.a, o = i.d;
		t += e.scrollLeft * a, n += e.scrollTop * o;
	} while (e !== r && (e = e.parentNode));
	return [t, n];
}
function nl(e, t) {
	for (var n in e) if (e.hasOwnProperty(n)) {
		for (var r in t) if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
	}
	return -1;
}
function rl(e, t) {
	if (!e || !e.getBoundingClientRect) return Xc();
	var n = e, r = !1;
	do
		if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
			var i = U(n);
			if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
				if (!n.getBoundingClientRect || n === document.body) return Xc();
				if (r || t) return n;
				r = !0;
			}
		}
	while (n = n.parentNode);
	return Xc();
}
function il(e, t) {
	if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
	return e;
}
function al(e, t) {
	return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var ol;
function sl(e, t) {
	return function() {
		if (!ol) {
			var n = arguments, r = this;
			n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), ol = setTimeout(function() {
				ol = void 0;
			}, t);
		}
	};
}
function cl() {
	clearTimeout(ol), ol = void 0;
}
function ll(e, t, n) {
	e.scrollLeft += t, e.scrollTop += n;
}
function ul(e) {
	var t = window.Polymer, n = window.jQuery || window.Zepto;
	return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function dl(e, t, n) {
	var r = {};
	return Array.from(e.children).forEach(function(i) {
		if (!(!Gc(i, t.draggable, e, !1) || i.animated || i === n)) {
			var a = W(i);
			r.left = Math.min(r.left ?? Infinity, a.left), r.top = Math.min(r.top ?? Infinity, a.top), r.right = Math.max(r.right ?? -Infinity, a.right), r.bottom = Math.max(r.bottom ?? -Infinity, a.bottom);
		}
	}), r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
var fl = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function pl() {
	var e = [], t;
	return {
		captureAnimationState: function() {
			e = [], this.options.animation && [].slice.call(this.el.children).forEach(function(t) {
				if (U(t, "display") !== "none" && t !== Q.ghost) {
					e.push({
						target: t,
						rect: W(t)
					});
					var n = Oc({}, e[e.length - 1].rect);
					if (t.thisAnimationDuration) {
						var r = Jc(t, !0);
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
			e.splice(nl(e, { target: t }), 1);
		},
		animateAll: function(n) {
			var r = this;
			if (!this.options.animation) {
				clearTimeout(t), typeof n == "function" && n();
				return;
			}
			var i = !1, a = 0;
			e.forEach(function(e) {
				var t = 0, n = e.target, o = n.fromRect, s = W(n), c = n.prevFromRect, l = n.prevToRect, u = e.rect, d = Jc(n, !0);
				d && (s.top -= d.f, s.left -= d.e), n.toRect = s, n.thisAnimationDuration && al(c, s) && !al(o, s) && (u.top - s.top) / (u.left - s.left) === (o.top - s.top) / (o.left - s.left) && (t = hl(u, c, l, r.options)), al(s, o) || (n.prevFromRect = o, n.prevToRect = s, t ||= r.options.animation, r.animate(n, u, s, t)), t && (i = !0, a = Math.max(a, t), clearTimeout(n.animationResetTimer), n.animationResetTimer = setTimeout(function() {
					n.animationTime = 0, n.prevFromRect = null, n.fromRect = null, n.prevToRect = null, n.thisAnimationDuration = null;
				}, t), n.thisAnimationDuration = t);
			}), clearTimeout(t), i ? t = setTimeout(function() {
				typeof n == "function" && n();
			}, a) : typeof n == "function" && n(), e = [];
		},
		animate: function(e, t, n, r) {
			if (r) {
				U(e, "transition", ""), U(e, "transform", "");
				var i = Jc(this.el), a = i && i.a, o = i && i.d, s = (t.left - n.left) / (a || 1), c = (t.top - n.top) / (o || 1);
				e.animatingX = !!s, e.animatingY = !!c, U(e, "transform", "translate3d(" + s + "px," + c + "px,0)"), this.forRepaintDummy = ml(e), U(e, "transition", "transform " + r + "ms" + (this.options.easing ? " " + this.options.easing : "")), U(e, "transform", "translate3d(0,0,0)"), typeof e.animated == "number" && clearTimeout(e.animated), e.animated = setTimeout(function() {
					U(e, "transition", ""), U(e, "transform", ""), e.animated = !1, e.animatingX = !1, e.animatingY = !1;
				}, r);
			}
		}
	};
}
function ml(e) {
	return e.offsetWidth;
}
function hl(e, t, n, r) {
	return Math.sqrt((t.top - e.top) ** 2 + (t.left - e.left) ** 2) / Math.sqrt((t.top - n.top) ** 2 + (t.left - n.left) ** 2) * r.animation;
}
var gl = [], _l = { initializeByDefault: !0 }, vl = {
	mount: function(e) {
		for (var t in _l) _l.hasOwnProperty(t) && !(t in e) && (e[t] = _l[t]);
		gl.forEach(function(t) {
			if (t.pluginName === e.pluginName) throw `Sortable: Cannot mount plugin ${e.pluginName} more than once`;
		}), gl.push(e);
	},
	pluginEvent: function(e, t, n) {
		var r = this;
		this.eventCanceled = !1, n.cancel = function() {
			r.eventCanceled = !0;
		};
		var i = e + "Global";
		gl.forEach(function(r) {
			t[r.pluginName] && (t[r.pluginName][i] && t[r.pluginName][i](Oc({ sortable: t }, n)), t.options[r.pluginName] && t[r.pluginName][e] && t[r.pluginName][e](Oc({ sortable: t }, n)));
		});
	},
	initializePlugins: function(e, t, n, r) {
		for (var i in gl.forEach(function(r) {
			var i = r.pluginName;
			if (!(!e.options[i] && !r.initializeByDefault)) {
				var a = new r(e, t, e.options);
				a.sortable = e, a.options = e.options, e[i] = a, jc(n, a.defaults);
			}
		}), e.options) if (e.options.hasOwnProperty(i)) {
			var a = this.modifyOption(e, i, e.options[i]);
			a !== void 0 && (e.options[i] = a);
		}
	},
	getEventProperties: function(e, t) {
		var n = {};
		return gl.forEach(function(r) {
			typeof r.eventProperties == "function" && jc(n, r.eventProperties.call(t[r.pluginName], e));
		}), n;
	},
	modifyOption: function(e, t, n) {
		var r;
		return gl.forEach(function(i) {
			e[i.pluginName] && i.optionListeners && typeof i.optionListeners[t] == "function" && (r = i.optionListeners[t].call(e[i.pluginName], n));
		}), r;
	}
};
function yl(e) {
	var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, a = e.cloneEl, o = e.toEl, s = e.fromEl, c = e.oldIndex, l = e.newIndex, u = e.oldDraggableIndex, d = e.newDraggableIndex, f = e.originalEvent, p = e.putSortable, m = e.extraEventProperties;
	if (t ||= n && n[fl], t) {
		var h, g = t.options, _ = "on" + r.charAt(0).toUpperCase() + r.substr(1);
		window.CustomEvent && !Ic && !Lc ? h = new CustomEvent(r, {
			bubbles: !0,
			cancelable: !0
		}) : (h = document.createEvent("Event"), h.initEvent(r, !0, !0)), h.to = o || n, h.from = s || n, h.item = i || n, h.clone = a, h.oldIndex = c, h.newIndex = l, h.oldDraggableIndex = u, h.newDraggableIndex = d, h.originalEvent = f, h.pullMode = p ? p.lastPutMode : void 0;
		var v = Oc(Oc({}, m), vl.getEventProperties(r, t));
		for (var y in v) h[y] = v[y];
		n && n.dispatchEvent(h), g[_] && g[_].call(t, h);
	}
}
var bl = ["evt"], xl = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.evt, i = Nc(n, bl);
	vl.pluginEvent.bind(Q)(e, t, Oc({
		dragEl: G,
		parentEl: K,
		ghostEl: q,
		rootEl: J,
		nextEl: Cl,
		lastDownEl: wl,
		cloneEl: Y,
		cloneHidden: Tl,
		dragStarted: Bl,
		putSortable: X,
		activeSortable: Q.active,
		originalEvent: r,
		oldIndex: El,
		oldDraggableIndex: Ol,
		newIndex: Dl,
		newDraggableIndex: kl,
		hideGhostForTarget: iu,
		unhideGhostForTarget: au,
		cloneNowHidden: function() {
			Tl = !0;
		},
		cloneNowShown: function() {
			Tl = !1;
		},
		dispatchSortableEvent: function(e) {
			Sl({
				sortable: t,
				name: e,
				originalEvent: r
			});
		}
	}, i));
};
function Sl(e) {
	yl(Oc({
		putSortable: X,
		cloneEl: Y,
		targetEl: G,
		rootEl: J,
		oldIndex: El,
		oldDraggableIndex: Ol,
		newIndex: Dl,
		newDraggableIndex: kl
	}, e));
}
var G, K, q, J, Cl, wl, Y, Tl, El, Dl, Ol, kl, Al, X, jl = !1, Ml = !1, Nl = [], Pl, Fl, Il, Ll, Rl, zl, Bl, Vl, Hl, Ul = !1, Wl = !1, Gl, Z, Kl = [], ql = !1, Jl = [], Yl = typeof document < "u", Xl = Bc, Zl = Lc || Ic ? "cssFloat" : "float", Ql = Yl && !Vc && !Bc && "draggable" in document.createElement("div"), $l = function() {
	if (Yl) {
		if (Ic) return !1;
		var e = document.createElement("x");
		return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
	}
}(), eu = function(e, t) {
	var n = U(e), r = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), i = Qc(e, 0, t), a = Qc(e, 1, t), o = i && U(i), s = a && U(a), c = o && parseInt(o.marginLeft) + parseInt(o.marginRight) + W(i).width, l = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + W(a).width;
	return n.display === "flex" ? n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal" : n.display === "grid" ? n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal" : i && o.float && o.float !== "none" ? a && (s.clear === "both" || s.clear === (o.float === "left" ? "left" : "right")) ? "vertical" : "horizontal" : i && (o.display === "block" || o.display === "flex" || o.display === "table" || o.display === "grid" || c >= r && n[Zl] === "none" || a && n[Zl] === "none" && c + l > r) ? "vertical" : "horizontal";
}, tu = function(e, t, n) {
	var r = n ? e.left : e.top, i = n ? e.right : e.bottom, a = n ? e.width : e.height, o = n ? t.left : t.top, s = n ? t.right : t.bottom, c = n ? t.width : t.height;
	return r === o || i === s || r + a / 2 === o + c / 2;
}, nu = function(e, t) {
	var n;
	return Nl.some(function(r) {
		var i = r[fl].options.emptyInsertThreshold;
		if (!(!i || $c(r))) {
			var a = W(r), o = e >= a.left - i && e <= a.right + i, s = t >= a.top - i && t <= a.bottom + i;
			if (o && s) return n = r;
		}
	}), n;
}, ru = function(e) {
	function t(e, n) {
		return function(r, i, a, o) {
			if (e == null && (n || r.options.group.name && i.options.group.name && r.options.group.name === i.options.group.name)) return !0;
			if (e == null || e === !1) return !1;
			if (n && e === "clone") return e;
			if (typeof e == "function") return t(e(r, i, a, o), n)(r, i, a, o);
			var s = (n ? r : i).options.group.name;
			return e === !0 || typeof e == "string" && e === s || e.join && e.indexOf(s) > -1;
		};
	}
	var n = {}, r = e.group;
	(!r || kc(r) != "object") && (r = { name: r }), n.name = r.name, n.checkPull = t(r.pull, !0), n.checkPut = t(r.put), n.revertClone = r.revertClone, e.group = n;
}, iu = function() {
	!$l && q && U(q, "display", "none");
}, au = function() {
	!$l && q && U(q, "display", "");
};
Yl && !Vc && document.addEventListener("click", function(e) {
	if (Ml) return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Ml = !1, !1;
}, !0);
var ou = function(e) {
	if (G) {
		e = e.touches ? e.touches[0] : e;
		var t = nu(e.clientX, e.clientY);
		if (t) {
			var n = {};
			for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
			n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[fl]._onDragOver(n);
		}
	}
}, su = function(e) {
	G && G.parentNode[fl]._isOutsideThisEl(e.target);
};
function Q(e, t) {
	if (!(e && e.nodeType && e.nodeType === 1)) throw `Sortable: \`el\` must be an HTMLElement, not ${{}.toString.call(e)}`;
	this.el = e, this.options = t = jc({}, t), e[fl] = this;
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
			return eu(e, this.options);
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
		supportPointer: Q.supportPointer !== !1 && "PointerEvent" in window && !zc,
		emptyInsertThreshold: 5
	};
	for (var r in vl.initializePlugins(this, e, n), n) !(r in t) && (t[r] = n[r]);
	for (var i in ru(t), this) i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
	this.nativeDraggable = !t.forceFallback && Ql, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? V(e, "pointerdown", this._onTapStart) : (V(e, "mousedown", this._onTapStart), V(e, "touchstart", this._onTapStart)), this.nativeDraggable && (V(e, "dragover", this), V(e, "dragenter", this)), Nl.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), jc(this, pl());
}
Q.prototype = {
	constructor: Q,
	_isOutsideThisEl: function(e) {
		!this.el.contains(e) && e !== this.el && (Vl = null);
	},
	_getDirection: function(e, t) {
		return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, G) : this.options.direction;
	},
	_onTapStart: function(e) {
		if (e.cancelable) {
			var t = this, n = this.el, r = this.options, i = r.preventOnFilter, a = e.type, o = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (o || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, l = r.filter;
			if (_u(n), !G && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !c.isContentEditable && !(!this.nativeDraggable && zc && s && s.tagName.toUpperCase() === "SELECT") && (s = Gc(s, r.draggable, n, !1), !(s && s.animated) && wl !== s)) {
				if (El = el(s), Ol = el(s, r.draggable), typeof l == "function") {
					if (l.call(this, e, s, this)) {
						Sl({
							sortable: t,
							rootEl: c,
							name: "filter",
							targetEl: s,
							toEl: n,
							fromEl: n
						}), xl("filter", t, { evt: e }), i && e.cancelable && e.preventDefault();
						return;
					}
				} else if (l && (l = l.split(",").some(function(r) {
					if (r = Gc(c, r.trim(), n, !1), r) return Sl({
						sortable: t,
						rootEl: r,
						name: "filter",
						targetEl: s,
						fromEl: n,
						toEl: n
					}), xl("filter", t, { evt: e }), !0;
				}), l)) {
					i && e.cancelable && e.preventDefault();
					return;
				}
				r.handle && !Gc(c, r.handle, n, !1) || this._prepareDragStart(e, o, s);
			}
		}
	},
	_prepareDragStart: function(e, t, n) {
		var r = this, i = r.el, a = r.options, o = i.ownerDocument, s;
		if (n && !G && n.parentNode === i) {
			var c = W(n);
			if (J = i, G = n, K = G.parentNode, Cl = G.nextSibling, wl = n, Al = a.group, Q.dragged = G, Pl = {
				target: G,
				clientX: (t || e).clientX,
				clientY: (t || e).clientY
			}, Rl = Pl.clientX - c.left, zl = Pl.clientY - c.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, G.style["will-change"] = "all", s = function() {
				if (xl("delayEnded", r, { evt: e }), Q.eventCanceled) {
					r._onDrop();
					return;
				}
				r._disableDelayedDragEvents(), !Rc && r.nativeDraggable && (G.draggable = !0), r._triggerDragStart(e, t), Sl({
					sortable: r,
					name: "choose",
					originalEvent: e
				}), qc(G, a.chosenClass, !0);
			}, a.ignore.split(",").forEach(function(e) {
				Yc(G, e.trim(), uu);
			}), V(o, "dragover", ou), V(o, "mousemove", ou), V(o, "touchmove", ou), V(o, "mouseup", r._onDrop), V(o, "touchend", r._onDrop), V(o, "touchcancel", r._onDrop), Rc && this.nativeDraggable && (this.options.touchStartThreshold = 4, G.draggable = !0), xl("delayStart", this, { evt: e }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(Lc || Ic))) {
				if (Q.eventCanceled) {
					this._onDrop();
					return;
				}
				V(o, "mouseup", r._disableDelayedDrag), V(o, "touchend", r._disableDelayedDrag), V(o, "touchcancel", r._disableDelayedDrag), V(o, "mousemove", r._delayedDragTouchMoveHandler), V(o, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && V(o, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
			} else s();
		}
	},
	_delayedDragTouchMoveHandler: function(e) {
		var t = e.touches ? e.touches[0] : e;
		Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
	},
	_disableDelayedDrag: function() {
		G && uu(G), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
	},
	_disableDelayedDragEvents: function() {
		var e = this.el.ownerDocument;
		H(e, "mouseup", this._disableDelayedDrag), H(e, "touchend", this._disableDelayedDrag), H(e, "touchcancel", this._disableDelayedDrag), H(e, "mousemove", this._delayedDragTouchMoveHandler), H(e, "touchmove", this._delayedDragTouchMoveHandler), H(e, "pointermove", this._delayedDragTouchMoveHandler);
	},
	_triggerDragStart: function(e, t) {
		t ||= e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? V(document, "pointermove", this._onTouchMove) : t ? V(document, "touchmove", this._onTouchMove) : V(document, "mousemove", this._onTouchMove) : (V(G, "dragend", this), V(J, "dragstart", this._onDragStart));
		try {
			document.selection ? vu(function() {
				document.selection.empty();
			}) : window.getSelection().removeAllRanges();
		} catch {}
	},
	_dragStarted: function(e, t) {
		if (jl = !1, J && G) {
			xl("dragStarted", this, { evt: t }), this.nativeDraggable && V(document, "dragover", su);
			var n = this.options;
			!e && qc(G, n.dragClass, !1), qc(G, n.ghostClass, !0), Q.active = this, e && this._appendGhost(), Sl({
				sortable: this,
				name: "start",
				originalEvent: t
			});
		} else this._nulling();
	},
	_emulateDragOver: function() {
		if (Fl) {
			this._lastX = Fl.clientX, this._lastY = Fl.clientY, iu();
			for (var e = document.elementFromPoint(Fl.clientX, Fl.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(Fl.clientX, Fl.clientY), e !== t);) t = e;
			if (G.parentNode[fl]._isOutsideThisEl(e), t) do {
				if (t[fl]) {
					var n = void 0;
					if (n = t[fl]._onDragOver({
						clientX: Fl.clientX,
						clientY: Fl.clientY,
						target: e,
						rootEl: t
					}), n && !this.options.dragoverBubble) break;
				}
				e = t;
			} while (t = t.parentNode);
			au();
		}
	},
	_onTouchMove: function(e) {
		if (Pl) {
			var t = this.options, n = t.fallbackTolerance, r = t.fallbackOffset, i = e.touches ? e.touches[0] : e, a = q && Jc(q, !0), o = q && a && a.a, s = q && a && a.d, c = Xl && Z && tl(Z), l = (i.clientX - Pl.clientX + r.x) / (o || 1) + (c ? c[0] - Kl[0] : 0) / (o || 1), u = (i.clientY - Pl.clientY + r.y) / (s || 1) + (c ? c[1] - Kl[1] : 0) / (s || 1);
			if (!Q.active && !jl) {
				if (n && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < n) return;
				this._onDragStart(e, !0);
			}
			if (q) {
				a ? (a.e += l - (Il || 0), a.f += u - (Ll || 0)) : a = {
					a: 1,
					b: 0,
					c: 0,
					d: 1,
					e: l,
					f: u
				};
				var d = `matrix(${a.a},${a.b},${a.c},${a.d},${a.e},${a.f})`;
				U(q, "webkitTransform", d), U(q, "mozTransform", d), U(q, "msTransform", d), U(q, "transform", d), Il = l, Ll = u, Fl = i;
			}
			e.cancelable && e.preventDefault();
		}
	},
	_appendGhost: function() {
		if (!q) {
			var e = this.options.fallbackOnBody ? document.body : J, t = W(G, !0, Xl, !0, e), n = this.options;
			if (Xl) {
				for (Z = e; U(Z, "position") === "static" && U(Z, "transform") === "none" && Z !== document;) Z = Z.parentNode;
				Z !== document.body && Z !== document.documentElement ? (Z === document && (Z = Xc()), t.top += Z.scrollTop, t.left += Z.scrollLeft) : Z = Xc(), Kl = tl(Z);
			}
			q = G.cloneNode(!0), qc(q, n.ghostClass, !1), qc(q, n.fallbackClass, !0), qc(q, n.dragClass, !0), U(q, "transition", ""), U(q, "transform", ""), U(q, "box-sizing", "border-box"), U(q, "margin", 0), U(q, "top", t.top), U(q, "left", t.left), U(q, "width", t.width), U(q, "height", t.height), U(q, "opacity", "0.8"), U(q, "position", Xl ? "absolute" : "fixed"), U(q, "zIndex", "100000"), U(q, "pointerEvents", "none"), Q.ghost = q, e.appendChild(q), U(q, "transform-origin", Rl / parseInt(q.style.width) * 100 + "% " + zl / parseInt(q.style.height) * 100 + "%");
		}
	},
	_onDragStart: function(e, t) {
		var n = this, r = e.dataTransfer, i = n.options;
		if (xl("dragStart", this, { evt: e }), Q.eventCanceled) {
			this._onDrop();
			return;
		}
		xl("setupClone", this), Q.eventCanceled || (Y = ul(G), Y.removeAttribute("id"), Y.draggable = !1, Y.style["will-change"] = "", this._hideClone(), qc(Y, this.options.chosenClass, !1), Q.clone = Y), n.cloneId = vu(function() {
			xl("clone", n), !Q.eventCanceled && (n.options.removeCloneOnHide || J.insertBefore(Y, G), n._hideClone(), Sl({
				sortable: n,
				name: "clone"
			}));
		}), !t && qc(G, i.dragClass, !0), t ? (Ml = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (H(document, "mouseup", n._onDrop), H(document, "touchend", n._onDrop), H(document, "touchcancel", n._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(n, r, G)), V(document, "drop", n), U(G, "transform", "translateZ(0)")), jl = !0, n._dragStartId = vu(n._dragStarted.bind(n, t, e)), V(document, "selectstart", n), Bl = !0, zc && U(document.body, "user-select", "none");
	},
	_onDragOver: function(e) {
		var t = this.el, n = e.target, r, i, a, o = this.options, s = o.group, c = Q.active, l = Al === s, u = o.sort, d = X || c, f, p = this, m = !1;
		if (ql) return;
		function h(o, s) {
			xl(o, p, Oc({
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
					return lu(J, t, G, r, n, W(n), e, i);
				},
				changed: v
			}, s));
		}
		function g() {
			h("dragOverAnimationCapture"), p.captureAnimationState(), p !== d && d.captureAnimationState();
		}
		function _(r) {
			return h("dragOverCompleted", { insertion: r }), r && (l ? c._hideClone() : c._showClone(p), p !== d && (qc(G, X ? X.options.ghostClass : c.options.ghostClass, !1), qc(G, o.ghostClass, !0)), X !== p && p !== Q.active ? X = p : p === Q.active && X && (X = null), d === p && (p._ignoreWhileAnimating = n), p.animateAll(function() {
				h("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
			}), p !== d && (d.animateAll(), d._ignoreWhileAnimating = null)), (n === G && !G.animated || n === t && !n.animated) && (Vl = null), !o.dragoverBubble && !e.rootEl && n !== document && (G.parentNode[fl]._isOutsideThisEl(e.target), !r && ou(e)), !o.dragoverBubble && e.stopPropagation && e.stopPropagation(), m = !0;
		}
		function v() {
			Dl = el(G), kl = el(G, o.draggable), Sl({
				sortable: p,
				name: "change",
				toEl: t,
				newIndex: Dl,
				newDraggableIndex: kl,
				originalEvent: e
			});
		}
		if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = Gc(n, o.draggable, t, !0), h("dragOver"), Q.eventCanceled) return m;
		if (G.contains(e.target) || n.animated && n.animatingX && n.animatingY || p._ignoreWhileAnimating === n) return _(!1);
		if (Ml = !1, c && !o.disabled && (l ? u || (a = K !== J) : X === this || (this.lastPutMode = Al.checkPull(this, c, G, e)) && s.checkPut(this, c, G, e))) {
			if (f = this._getDirection(e, n) === "vertical", r = W(G), h("dragOverValid"), Q.eventCanceled) return m;
			if (a) return K = J, g(), this._hideClone(), h("revert"), Q.eventCanceled || (Cl ? J.insertBefore(G, Cl) : J.appendChild(G)), _(!0);
			var y = $c(t, o.draggable);
			if (!y || pu(e, f, this) && !y.animated) {
				if (y === G) return _(!1);
				if (y && t === e.target && (n = y), n && (i = W(n)), lu(J, t, G, r, n, i, e, !!n) !== !1) return g(), y && y.nextSibling ? t.insertBefore(G, y.nextSibling) : t.appendChild(G), K = t, v(), _(!0);
			} else if (y && fu(e, f, this)) {
				var b = Qc(t, 0, o, !0);
				if (b === G) return _(!1);
				if (n = b, i = W(n), lu(J, t, G, r, n, i, e, !1) !== !1) return g(), t.insertBefore(G, b), K = t, v(), _(!0);
			} else if (n.parentNode === t) {
				i = W(n);
				var x = 0, S, C = G.parentNode !== t, w = !tu(G.animated && G.toRect || r, n.animated && n.toRect || i, f), T = f ? "top" : "left", E = Zc(n, "top", "top") || Zc(G, "top", "top"), ee = E ? E.scrollTop : void 0;
				Vl !== n && (S = i[T], Ul = !1, Wl = !w && o.invertSwap || C), x = mu(e, n, i, f, w ? 1 : o.swapThreshold, o.invertedSwapThreshold == null ? o.swapThreshold : o.invertedSwapThreshold, Wl, Vl === n);
				var D;
				if (x !== 0) {
					var te = el(G);
					do
						te -= x, D = K.children[te];
					while (D && (U(D, "display") === "none" || D === q));
				}
				if (x === 0 || D === n) return _(!1);
				Vl = n, Hl = x;
				var O = n.nextElementSibling, ne = !1;
				ne = x === 1;
				var re = lu(J, t, G, r, n, i, e, ne);
				if (re !== !1) return (re === 1 || re === -1) && (ne = re === 1), ql = !0, setTimeout(du, 30), g(), ne && !O ? t.appendChild(G) : n.parentNode.insertBefore(G, ne ? O : n), E && ll(E, 0, ee - E.scrollTop), K = G.parentNode, S !== void 0 && !Wl && (Gl = Math.abs(S - W(n)[T])), v(), _(!0);
			}
			if (t.contains(G)) return _(!1);
		}
		return !1;
	},
	_ignoreWhileAnimating: null,
	_offMoveEvents: function() {
		H(document, "mousemove", this._onTouchMove), H(document, "touchmove", this._onTouchMove), H(document, "pointermove", this._onTouchMove), H(document, "dragover", ou), H(document, "mousemove", ou), H(document, "touchmove", ou);
	},
	_offUpEvents: function() {
		var e = this.el.ownerDocument;
		H(e, "mouseup", this._onDrop), H(e, "touchend", this._onDrop), H(e, "pointerup", this._onDrop), H(e, "touchcancel", this._onDrop), H(document, "selectstart", this);
	},
	_onDrop: function(e) {
		var t = this.el, n = this.options;
		if (Dl = el(G), kl = el(G, n.draggable), xl("drop", this, { evt: e }), K = G && G.parentNode, Dl = el(G), kl = el(G, n.draggable), Q.eventCanceled) {
			this._nulling();
			return;
		}
		jl = !1, Wl = !1, Ul = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), yu(this.cloneId), yu(this._dragStartId), this.nativeDraggable && (H(document, "drop", this), H(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), zc && U(document.body, "user-select", ""), U(G, "transform", ""), e && (Bl && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), q && q.parentNode && q.parentNode.removeChild(q), (J === K || X && X.lastPutMode !== "clone") && Y && Y.parentNode && Y.parentNode.removeChild(Y), G && (this.nativeDraggable && H(G, "dragend", this), uu(G), G.style["will-change"] = "", Bl && !jl && qc(G, X ? X.options.ghostClass : this.options.ghostClass, !1), qc(G, this.options.chosenClass, !1), Sl({
			sortable: this,
			name: "unchoose",
			toEl: K,
			newIndex: null,
			newDraggableIndex: null,
			originalEvent: e
		}), J === K ? Dl !== El && Dl >= 0 && (Sl({
			sortable: this,
			name: "update",
			toEl: K,
			originalEvent: e
		}), Sl({
			sortable: this,
			name: "sort",
			toEl: K,
			originalEvent: e
		})) : (Dl >= 0 && (Sl({
			rootEl: K,
			name: "add",
			toEl: K,
			fromEl: J,
			originalEvent: e
		}), Sl({
			sortable: this,
			name: "remove",
			toEl: K,
			originalEvent: e
		}), Sl({
			rootEl: K,
			name: "sort",
			toEl: K,
			fromEl: J,
			originalEvent: e
		}), Sl({
			sortable: this,
			name: "sort",
			toEl: K,
			originalEvent: e
		})), X && X.save()), Q.active && ((Dl == null || Dl === -1) && (Dl = El, kl = Ol), Sl({
			sortable: this,
			name: "end",
			toEl: K,
			originalEvent: e
		}), this.save()))), this._nulling();
	},
	_nulling: function() {
		xl("nulling", this), J = G = K = q = Cl = Y = wl = Tl = Pl = Fl = Bl = Dl = kl = El = Ol = Vl = Hl = X = Al = Q.dragged = Q.ghost = Q.clone = Q.active = null, Jl.forEach(function(e) {
			e.checked = !0;
		}), Jl.length = Il = Ll = 0;
	},
	handleEvent: function(e) {
		switch (e.type) {
			case "drop":
			case "dragend":
				this._onDrop(e);
				break;
			case "dragenter":
			case "dragover":
				G && (this._onDragOver(e), cu(e));
				break;
			case "selectstart": e.preventDefault();
		}
	},
	toArray: function() {
		for (var e = [], t, n = this.el.children, r = 0, i = n.length, a = this.options; r < i; r++) t = n[r], Gc(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || gu(t));
		return e;
	},
	sort: function(e, t) {
		var n = {}, r = this.el;
		this.toArray().forEach(function(e, t) {
			var i = r.children[t];
			Gc(i, this.options.draggable, r, !1) && (n[e] = i);
		}, this), t && this.captureAnimationState(), e.forEach(function(e) {
			n[e] && (r.removeChild(n[e]), r.appendChild(n[e]));
		}), t && this.animateAll();
	},
	save: function() {
		var e = this.options.store;
		e && e.set && e.set(this);
	},
	closest: function(e, t) {
		return Gc(e, t || this.options.draggable, this.el, !1);
	},
	option: function(e, t) {
		var n = this.options;
		if (t === void 0) return n[e];
		var r = vl.modifyOption(this, e, t);
		n[e] = r === void 0 ? t : r, e === "group" && ru(n);
	},
	destroy: function() {
		xl("destroy", this);
		var e = this.el;
		e[fl] = null, H(e, "mousedown", this._onTapStart), H(e, "touchstart", this._onTapStart), H(e, "pointerdown", this._onTapStart), this.nativeDraggable && (H(e, "dragover", this), H(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(e) {
			e.removeAttribute("draggable");
		}), this._onDrop(), this._disableDelayedDragEvents(), Nl.splice(Nl.indexOf(this.el), 1), this.el = e = null;
	},
	_hideClone: function() {
		if (!Tl) {
			if (xl("hideClone", this), Q.eventCanceled) return;
			U(Y, "display", "none"), this.options.removeCloneOnHide && Y.parentNode && Y.parentNode.removeChild(Y), Tl = !0;
		}
	},
	_showClone: function(e) {
		if (e.lastPutMode !== "clone") {
			this._hideClone();
			return;
		}
		if (Tl) {
			if (xl("showClone", this), Q.eventCanceled) return;
			G.parentNode == J && !this.options.group.revertClone ? J.insertBefore(Y, G) : Cl ? J.insertBefore(Y, Cl) : J.appendChild(Y), this.options.group.revertClone && this.animate(G, Y), U(Y, "display", ""), Tl = !1;
		}
	}
};
function cu(e) {
	e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function lu(e, t, n, r, i, a, o, s) {
	var c, l = e[fl], u = l.options.onMove, d;
	return window.CustomEvent && !Ic && !Lc ? c = new CustomEvent("move", {
		bubbles: !0,
		cancelable: !0
	}) : (c = document.createEvent("Event"), c.initEvent("move", !0, !0)), c.to = t, c.from = e, c.dragged = n, c.draggedRect = r, c.related = i || t, c.relatedRect = a || W(t), c.willInsertAfter = s, c.originalEvent = o, e.dispatchEvent(c), u && (d = u.call(l, c, o)), d;
}
function uu(e) {
	e.draggable = !1;
}
function du() {
	ql = !1;
}
function fu(e, t, n) {
	var r = W(Qc(n.el, 0, n.options, !0)), i = dl(n.el, n.options, q), a = 10;
	return t ? e.clientX < i.left - a || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - a || e.clientY < r.bottom && e.clientX < r.left;
}
function pu(e, t, n) {
	var r = W($c(n.el, n.options.draggable)), i = dl(n.el, n.options, q), a = 10;
	return t ? e.clientX > i.right + a || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + a || e.clientX > r.right && e.clientY > r.top;
}
function mu(e, t, n, r, i, a, o, s) {
	var c = r ? e.clientY : e.clientX, l = r ? n.height : n.width, u = r ? n.top : n.left, d = r ? n.bottom : n.right, f = !1;
	if (!o) {
		if (s && Gl < l * i) {
			if (!Ul && (Hl === 1 ? c > u + l * a / 2 : c < d - l * a / 2) && (Ul = !0), Ul) f = !0;
			else if (Hl === 1 ? c < u + Gl : c > d - Gl) return -Hl;
		} else if (c > u + l * (1 - i) / 2 && c < d - l * (1 - i) / 2) return hu(t);
	}
	return f ||= o, f && (c < u + l * a / 2 || c > d - l * a / 2) ? c > u + l / 2 ? 1 : -1 : 0;
}
function hu(e) {
	return el(G) < el(e) ? 1 : -1;
}
function gu(e) {
	for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--;) r += t.charCodeAt(n);
	return r.toString(36);
}
function _u(e) {
	Jl.length = 0;
	for (var t = e.getElementsByTagName("input"), n = t.length; n--;) {
		var r = t[n];
		r.checked && Jl.push(r);
	}
}
function vu(e) {
	return setTimeout(e, 0);
}
function yu(e) {
	return clearTimeout(e);
}
Yl && V(document, "touchmove", function(e) {
	(Q.active || jl) && e.cancelable && e.preventDefault();
}), Q.utils = {
	on: V,
	off: H,
	css: U,
	find: Yc,
	is: function(e, t) {
		return !!Gc(e, t, e, !1);
	},
	extend: il,
	throttle: sl,
	closest: Gc,
	toggleClass: qc,
	clone: ul,
	index: el,
	nextTick: vu,
	cancelNextTick: yu,
	detectDirection: eu,
	getChild: Qc
}, Q.get = function(e) {
	return e[fl];
}, Q.mount = function() {
	var e = [...arguments];
	e[0].constructor === Array && (e = e[0]), e.forEach(function(e) {
		if (!e.prototype || !e.prototype.constructor) throw `Sortable: Mounted plugin must be a constructor function, not ${{}.toString.call(e)}`;
		e.utils && (Q.utils = Oc(Oc({}, Q.utils), e.utils)), vl.mount(e);
	});
}, Q.create = function(e, t) {
	return new Q(e, t);
}, Q.version = Pc;
var $ = [], bu, xu, Su = !1, Cu, wu, Tu, Eu;
function Du() {
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
			this.sortable.nativeDraggable ? V(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? V(document, "pointermove", this._handleFallbackAutoScroll) : t.touches ? V(document, "touchmove", this._handleFallbackAutoScroll) : V(document, "mousemove", this._handleFallbackAutoScroll);
		},
		dragOverCompleted: function(e) {
			var t = e.originalEvent;
			!this.options.dragOverBubble && !t.rootEl && this._handleAutoScroll(t);
		},
		drop: function() {
			this.sortable.nativeDraggable ? H(document, "dragover", this._handleAutoScroll) : (H(document, "pointermove", this._handleFallbackAutoScroll), H(document, "touchmove", this._handleFallbackAutoScroll), H(document, "mousemove", this._handleFallbackAutoScroll)), ku(), Ou(), cl();
		},
		nulling: function() {
			Tu = xu = bu = Su = Eu = Cu = wu = null, $.length = 0;
		},
		_handleFallbackAutoScroll: function(e) {
			this._handleAutoScroll(e, !0);
		},
		_handleAutoScroll: function(e, t) {
			var n = this, r = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, a = document.elementFromPoint(r, i);
			if (Tu = e, t || this.options.forceAutoScrollFallback || Lc || Ic || zc) {
				Au(e, this.options, a, t);
				var o = rl(a, !0);
				Su && (!Eu || r !== Cu || i !== wu) && (Eu && ku(), Eu = setInterval(function() {
					var a = rl(document.elementFromPoint(r, i), !0);
					a !== o && (o = a, Ou()), Au(e, n.options, a, t);
				}, 10), Cu = r, wu = i);
			} else {
				if (!this.options.bubbleScroll || rl(a, !0) === Xc()) {
					Ou();
					return;
				}
				Au(e, this.options, rl(a, !1), !1);
			}
		}
	}, jc(e, {
		pluginName: "scroll",
		initializeByDefault: !0
	});
}
function Ou() {
	$.forEach(function(e) {
		clearInterval(e.pid);
	}), $ = [];
}
function ku() {
	clearInterval(Eu);
}
var Au = sl(function(e, t, n, r) {
	if (t.scroll) {
		var i = (e.touches ? e.touches[0] : e).clientX, a = (e.touches ? e.touches[0] : e).clientY, o = t.scrollSensitivity, s = t.scrollSpeed, c = Xc(), l = !1, u;
		xu !== n && (xu = n, Ou(), bu = t.scroll, u = t.scrollFn, bu === !0 && (bu = rl(n, !0)));
		var d = 0, f = bu;
		do {
			var p = f, m = W(p), h = m.top, g = m.bottom, _ = m.left, v = m.right, y = m.width, b = m.height, x = void 0, S = void 0, C = p.scrollWidth, w = p.scrollHeight, T = U(p), E = p.scrollLeft, ee = p.scrollTop;
			p === c ? (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll" || T.overflowX === "visible"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll" || T.overflowY === "visible")) : (x = y < C && (T.overflowX === "auto" || T.overflowX === "scroll"), S = b < w && (T.overflowY === "auto" || T.overflowY === "scroll"));
			var D = x && (Math.abs(v - i) <= o && E + y < C) - (Math.abs(_ - i) <= o && !!E), te = S && (Math.abs(g - a) <= o && ee + b < w) - (Math.abs(h - a) <= o && !!ee);
			if (!$[d]) for (var O = 0; O <= d; O++) $[O] || ($[O] = {});
			($[d].vx != D || $[d].vy != te || $[d].el !== p) && ($[d].el = p, $[d].vx = D, $[d].vy = te, clearInterval($[d].pid), (D != 0 || te != 0) && (l = !0, $[d].pid = setInterval(function() {
				r && this.layer === 0 && Q.active._onTouchMove(Tu);
				var t = $[this.layer].vy ? $[this.layer].vy * s : 0, n = $[this.layer].vx ? $[this.layer].vx * s : 0;
				typeof u == "function" && u.call(Q.dragged.parentNode[fl], n, t, e, Tu, $[this.layer].el) !== "continue" || ll($[this.layer].el, n, t);
			}.bind({ layer: d }), 24))), d++;
		} while (t.bubbleScroll && f !== c && (f = rl(f, !1)));
		Su = l;
	}
}, 30), ju = function(e) {
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
function Mu() {}
Mu.prototype = {
	startIndex: null,
	dragStart: function(e) {
		var t = e.oldDraggableIndex;
		this.startIndex = t;
	},
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable;
		this.sortable.captureAnimationState(), n && n.captureAnimationState();
		var r = Qc(this.sortable.el, this.startIndex, this.options);
		r ? this.sortable.el.insertBefore(t, r) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
	},
	drop: ju
}, jc(Mu, { pluginName: "revertOnSpill" });
function Nu() {}
Nu.prototype = {
	onSpill: function(e) {
		var t = e.dragEl, n = e.putSortable || this.sortable;
		n.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), n.animateAll();
	},
	drop: ju
}, jc(Nu, { pluginName: "removeOnSpill" }), Q.mount(new Du()), Q.mount(Nu, Mu);
function Pu(e) {
	return e == null ? e : JSON.parse(JSON.stringify(e));
}
function Fu(e) {
	oo() && ei(e);
}
function Iu(e) {
	oo() ? Xr(e) : jn(e);
}
var Lu = null, Ru = null;
function zu(e = null, t = null) {
	Lu = e, Ru = t;
}
function Bu() {
	return {
		data: Lu,
		clonedData: Ru
	};
}
var Vu = Symbol("cloneElement");
function Hu(...e) {
	let t = oo()?.proxy, n = null, r = e[0], [, i, a] = e;
	Array.isArray(I(i)) || (a = i, i = null);
	let o = null, { immediate: s = !0, clone: c = Pu, forceFallback: l, fallbackOnBody: u, customUpdate: d } = I(a) ?? {};
	function f(e) {
		let { from: t, oldIndex: r, item: a } = e, o = Array.from(t.childNodes);
		n = l && !u ? o.slice(0, -1) : o;
		let s = I(I(i)?.[r]), d = c(s);
		zu(s, d), a[Vu] = d;
	}
	function p(e) {
		let t = e.item[Vu];
		if (!gc(t)) {
			if (yc(e.item), /* @__PURE__ */ F(i)) {
				let n = [...I(i)];
				i.value = hc(n, e.newDraggableIndex, t);
				return;
			}
			hc(I(i), e.newDraggableIndex, t);
		}
	}
	function m(e) {
		let { from: t, item: n, oldIndex: r, oldDraggableIndex: a, pullMode: o, clone: s } = e;
		if (vc(t, n, r), o === "clone") {
			yc(s);
			return;
		}
		if (/* @__PURE__ */ F(i)) {
			let e = [...I(i)];
			i.value = mc(e, a);
			return;
		}
		mc(I(i), a);
	}
	function h(e) {
		if (d) {
			d(e);
			return;
		}
		let { from: t, item: n, oldIndex: r, oldDraggableIndex: a, newDraggableIndex: o } = e;
		if (yc(n), vc(t, n, r), /* @__PURE__ */ F(i)) {
			let e = [...I(i)];
			i.value = dc(e, a, o);
			return;
		}
		dc(I(i), a, o);
	}
	function g(e) {
		let { newIndex: t, oldIndex: r, from: i, to: a } = e, o = null, s = t === r && i === a;
		try {
			if (s) {
				let e = null;
				n?.some((t, r) => {
					if (e && n?.length !== a.childNodes.length) return i.insertBefore(e, t.nextSibling), !0;
					e = a?.replaceChild(t, a.childNodes[r]);
				});
			}
		} catch (e) {
			o = e;
		} finally {
			n = null;
		}
		jn(() => {
			if (zu(), o) throw o;
		});
	}
	let _ = {
		onUpdate: h,
		onStart: f,
		onAdd: p,
		onRemove: m,
		onEnd: g
	};
	function v(e) {
		let n = I(r);
		return e ||= _c(n) ? bc(n, t?.$el) : n, e && !Cc(e) && (e = e.$el), e || uc("Root element not found"), e;
	}
	function y() {
		let e = I(a) ?? {}, { immediate: t, clone: n } = e, r = sc(e, ["immediate", "clone"]);
		return wc(r, (e, t) => {
			Tc(e) && (r[e] = (e, ...n) => (Ec(e, Bu()), t(e, ...n)));
		}), Sc(i === null ? {} : _, r);
	}
	let b = (e) => {
		e = v(e), o && x.destroy(), o = new Q(e, y());
	};
	Qn(() => a, () => {
		o && wc(y(), (e, t) => {
			o?.option(e, t);
		});
	}, { deep: !0 });
	let x = {
		option: (e, t) => o?.option(e, t),
		destroy: () => {
			o?.destroy(), o = null;
		},
		save: () => o?.save(),
		toArray: () => o?.toArray(),
		closest: (...e) => o?.closest(...e)
	};
	return Iu(() => {
		s && b();
	}), Fu(x.destroy), oc({
		start: b,
		pause: () => x?.option("disabled", !0),
		resume: () => x?.option("disabled", !1)
	}, x);
}
var Uu = [
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
], Wu = /* @__PURE__ */ jr({
	name: "VueDraggable",
	model: {
		prop: "modelValue",
		event: "update:modelValue"
	},
	props: [
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
		...Uu.map((e) => `on${e.replace(/^\S/, (e) => e.toUpperCase())}`)
	],
	emits: ["update:modelValue", ...Uu],
	setup(e, { slots: t, emit: n, expose: r, attrs: i }) {
		let a = Uu.reduce((e, t) => {
			let r = `on${t.replace(/^\S/, (e) => e.toUpperCase())}`;
			return e[r] = (...e) => n(t, ...e), e;
		}, {}), o = To(() => {
			let t = /* @__PURE__ */ sn(e), { modelValue: n } = t, r = sc(t, ["modelValue"]), o = Object.entries(r).reduce((e, [t, n]) => {
				let r = I(n);
				return r !== void 0 && (e[t] = r), e;
			}, {});
			return oc(oc({}, a), pc(oc(oc({}, i), o)));
		}), s = To({
			get: () => e.modelValue,
			set: (e) => n("update:modelValue", e)
		}), c = /* @__PURE__ */ Xt(), l = /* @__PURE__ */ Rt(Hu(e.target || c, s, o));
		return r(l), () => Eo(e.tag || "div", { ref: c }, (t?.default)?.call(t, l));
	}
});
//#endregion
export { Zt as $, Xr as A, Xn as B, Eo as C, to as D, yi as E, fi as F, Ee as G, Un as H, oi as I, De as J, F as K, ci as L, Pa as M, Gn as N, jn as O, di as P, Vt as Q, zi as R, oo as S, Kn as T, pn as U, Hn as V, on as W, Bt as X, Rt as Y, Xt as Z, Xa as _, Bs as a, vn as at, Br as b, qs as c, Se as ct, pr as d, P as et, To as f, za as g, Za as h, Zs as i, I as it, ei as j, $r as k, Gs as l, Ba as m, Vo as n, tn as nt, zs as o, me as ot, Ga as p, qt as q, Qs as r, en as rt, is as s, le as st, Wu as t, un as tt, ka as u, Ya as v, qn as w, jr as x, z as y, Qn as z };

//# sourceMappingURL=draggable-BRF_Q_jB.js.map