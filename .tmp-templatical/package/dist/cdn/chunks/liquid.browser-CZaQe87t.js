//#region ../../node_modules/.pnpm/liquidjs@10.28.0/node_modules/liquidjs/dist/liquid.browser.mjs
var e = class {
	constructor(e, t, n, r, i) {
		this.kind = e, this.input = t, this.begin = n, this.end = r, this.file = i;
	}
	getText() {
		return this.input.slice(this.begin, this.end);
	}
	getPosition() {
		let [e, t] = [1, 1];
		for (let n = 0; n < this.begin; n++) this.input[n] === "\n" ? (e++, t = 1) : t++;
		return [e, t];
	}
	size() {
		return this.end - this.begin;
	}
}, t = class {
	liquidMethodMissing(e, t) {}
}, n = Object.prototype.toString, r = String.prototype.toLowerCase, i = Object.hasOwnProperty;
function a(e) {
	return typeof e == "string";
}
function o(e) {
	return typeof e == "function";
}
function s(e) {
	return e && o(e.then);
}
function c(e) {
	return e && o(e.next) && o(e.throw) && o(e.return);
}
function l(e) {
	return e = p(e), a(e) ? e : h(e) ? "" : g(e) ? e.map((e) => l(e)).join("") : String(e);
}
function u(e, t, n) {
	if (t < 0 && (t = e.length + t), !(n && !i.call(e, t))) return e[t];
}
function d(e) {
	return e = p(e), g(e) ? e : a(e) && e.length > 0 ? [e] : ie(e) ? Array.from(e) : se(e) ? Object.keys(e).map((t) => [t, e[t]]) : [];
}
function f(e) {
	return e = p(e), h(e) ? [] : g(e) ? e : [e];
}
function p(e) {
	return e instanceof t && o(e.valueOf) ? e.valueOf() : e;
}
function ee(e) {
	return +p(e) || 0;
}
function m(e) {
	return typeof e == "number";
}
function te(e) {
	return e && o(e.toLiquid) ? te(e.toLiquid()) : e;
}
function h(e) {
	return e == null;
}
function ne(e) {
	return e === void 0;
}
function g(e) {
	return n.call(e) === "[object Array]";
}
function re(e) {
	return e && m(e.length);
}
function ie(e) {
	return se(e) && Symbol.iterator in e;
}
function ae(e, t) {
	e ||= {};
	for (let n in e) if (i.call(e, n) && t(e[n], n, e) === !1) break;
	return e;
}
function oe(e) {
	return e[e.length - 1];
}
function se(e) {
	let t = typeof e;
	return e !== null && (t === "object" || t === "function");
}
function ce(e, t, n = 1) {
	let r = [];
	for (let i = e; i < t; i += n) r.push(i);
	return r;
}
function _(e, t, n = " ") {
	return ue(e, t, n, (e, t) => t + e);
}
function le(e, t, n = " ") {
	return ue(e, t, n, (e, t) => e + t);
}
function ue(e, t, n, r) {
	e = String(e);
	let i = t - e.length;
	return i <= 0 ? e : r(e, n.repeat(i));
}
function de(e) {
	return e;
}
function fe(e) {
	return [...e].some((e) => e >= "a" && e <= "z") ? e.toUpperCase() : e.toLowerCase();
}
function pe(e, t) {
	return e.length > t ? e.slice(0, t - 3) + "..." : e;
}
function me(e, t) {
	return h(e) && h(t) ? 0 : h(e) ? 1 : h(t) || e < t ? -1 : +(e > t);
}
function he(e, t) {
	return h(e) && h(t) ? 0 : h(e) ? 1 : h(t) || (e = r.call(e), t = r.call(t), e < t) ? -1 : +(e > t);
}
function ge(e) {
	return function(...t) {
		return e.call(this, ...t.map(p));
	};
}
function v(e) {
	return function(...t) {
		return e.call(this, ...t.map(ee));
	};
}
function* y(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = JSON.stringify(n);
		t.has(e) || (t.add(e), yield n);
	}
}
var _e = "__liquidClass__", b = class extends Error {
	constructor(e, t) {
		super(typeof e == "string" ? e : e.message), this.context = "", typeof e != "string" && Object.defineProperty(this, "originalError", {
			value: e,
			enumerable: !1
		}), Object.defineProperty(this, "token", {
			value: t,
			enumerable: !1
		}), Object.defineProperty(this, _e, {
			value: "LiquidError",
			enumerable: !1
		});
	}
	update() {
		Object.defineProperty(this, "context", {
			value: Te(this.token),
			enumerable: !1
		}), this.message = Ee(this.message, this.token), this.stack = this.message + "\n" + this.context + "\n" + this.stack, this.originalError && (this.stack += "\nFrom " + this.originalError.stack);
	}
	static is(e) {
		return e?.[_e] === "LiquidError";
	}
}, ve = class extends b {
	constructor(e, t) {
		super(e, t), this.name = "TokenizationError", super.update();
	}
}, ye = class extends b {
	constructor(e, t) {
		super(e, t), this.name = "ParseError", this.message = e.message, super.update();
	}
}, be = class extends b {
	constructor(e, t) {
		super(e, t.token), this.name = "RenderError", this.message = e.message, super.update();
	}
	static is(e) {
		return e.name === "RenderError";
	}
}, xe = class extends b {
	constructor(e) {
		super(e[0], e[0].token), this.errors = e, this.name = "LiquidErrors";
		let t = e.length > 1 ? "s" : "";
		this.message = `${e.length} error${t} found`, super.update();
	}
	static is(e) {
		return e.name === "LiquidErrors";
	}
}, Se = class extends b {
	constructor(e, t) {
		super(e, t), this.name = "UndefinedVariableError", this.message = e.message, super.update();
	}
}, Ce = class extends Error {
	constructor(e) {
		super(`undefined variable: ${e}`), this.name = "InternalUndefinedVariableError", this.variableName = e;
	}
}, we = class extends Error {
	constructor(e) {
		super(e), this.name = "AssertionError", this.message = e + "";
	}
};
function Te(e) {
	let [t, n] = e.getPosition(), r = e.input.split("\n"), i = Math.max(t - 2, 1), a = Math.min(t + 3, r.length);
	return ce(i, a + 1).map((e) => {
		let i = `${e === t ? ">> " : "   "}${_(String(e), String(a).length)}| `, o = e === t ? "\n" + _("^", n + i.length) : "";
		return i += r[e - 1], i += o, i;
	}).join("\n");
}
function Ee(e, t) {
	t.file && (e += `, file:${t.file}`);
	let [n, r] = t.getPosition();
	return e += `, line:${n}, col:${r}`, e;
}
var x = [
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	20,
	4,
	4,
	4,
	20,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	20,
	2,
	8,
	0,
	0,
	0,
	0,
	8,
	0,
	0,
	0,
	64,
	0,
	65,
	0,
	0,
	33,
	33,
	33,
	33,
	33,
	33,
	33,
	33,
	33,
	33,
	0,
	0,
	2,
	2,
	2,
	1,
	0,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	0,
	0,
	0,
	0,
	1,
	0,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	0,
	0,
	0,
	0,
	0
], De = 1, S = 4, Oe = 8, ke = 16, Ae = 32, je = 64, Me = 128;
function Ne(e) {
	let t = e.charCodeAt(0);
	return t >= 128 ? !x[t] : !!(x[t] & De);
}
x[160] = x[5760] = x[6158] = x[8192] = x[8193] = x[8194] = x[8195] = x[8196] = x[8197] = x[8198] = x[8199] = x[8200] = x[8201] = x[8202] = x[8232] = x[8233] = x[8239] = x[8287] = x[12288] = S, x[8220] = x[8221] = Me;
function C(e, t) {
	if (!e) throw new we(typeof t == "function" ? t() : t || `expect ${e} to be true`);
}
function Pe(e, t = `unexpected ${JSON.stringify(e)}`) {
	C(!e, t);
}
var Fe = class extends t {
	equals(e) {
		return h(p(e));
	}
	gt() {
		return !1;
	}
	geq() {
		return !1;
	}
	lt() {
		return !1;
	}
	leq() {
		return !1;
	}
	valueOf() {
		return null;
	}
}, Ie = class e extends t {
	equals(t) {
		return t instanceof e ? !1 : (t = p(t), a(t) || g(t) ? t.length === 0 : se(t) ? Object.keys(t).length === 0 : !1);
	}
	gt() {
		return !1;
	}
	geq() {
		return !1;
	}
	lt() {
		return !1;
	}
	leq() {
		return !1;
	}
	valueOf() {
		return "";
	}
	static is(t) {
		return t instanceof e;
	}
}, Le = class e extends Ie {
	equals(e) {
		return e === !1 || h(p(e)) ? !0 : a(e) ? /^\s*$/.test(e) : super.equals(e);
	}
	static is(t) {
		return t instanceof e;
	}
}, Re = class extends t {
	constructor(e, t, n) {
		super(), this.i = 0, this.length = e, this.name = `${n}-${t}`;
	}
	next() {
		this.i++;
	}
	index0() {
		return this.i;
	}
	index() {
		return this.i + 1;
	}
	first() {
		return this.i === 0;
	}
	last() {
		return this.i === this.length - 1;
	}
	rindex() {
		return this.length - this.i;
	}
	rindex0() {
		return this.length - this.i - 1;
	}
	valueOf() {
		return JSON.stringify(this);
	}
}, ze = class {
	constructor() {
		this.buffer = "";
	}
	write(e) {
		this.buffer += l(e);
	}
}, Be = class {
	constructor() {
		throw this.buffer = "", this.stream = null, Error("streaming not supported in browser");
	}
}, Ve = class {
	constructor() {
		this.buffer = "";
	}
	write(e) {
		e = p(e), this.buffer = typeof e != "string" && this.buffer === "" ? e : l(this.buffer) + l(e);
	}
}, He = class extends t {
	constructor(e = () => "") {
		super(), this.superBlockRender = e;
	}
	*super() {
		let e = new ze();
		return yield this.superBlockRender(e), e.buffer;
	}
};
function w(e) {
	return e && o(e.equals) && o(e.gt) && o(e.geq) && o(e.lt) && o(e.leq);
}
var Ue = new Fe(), We = {
	true: !0,
	false: !1,
	nil: Ue,
	null: Ue,
	empty: new Ie(),
	blank: new Le()
}, Ge = /* @__PURE__ */ new WeakMap();
function Ke(e) {
	let t = Ge.get(e);
	if (t) return t;
	let n = {};
	for (let [t, r] of Object.entries(e)) {
		let e = n;
		for (let n = 0; n < t.length; n++) {
			let r = t[n];
			e[r] = e[r] || {}, n === t.length - 1 && Ne(t[n]) && (e[r].needBoundary = !0), e = e[r];
		}
		e.data = r, e.end = !0;
	}
	return Ge.set(e, n), n;
}
var qe = function() {
	return qe = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, qe.apply(this, arguments);
};
function T(e, t, n, r) {
	function i(e) {
		return e instanceof n ? e : new n(function(t) {
			t(e);
		});
	}
	return new (n ||= Promise)(function(n, a) {
		function o(e) {
			try {
				c(r.next(e));
			} catch (e) {
				a(e);
			}
		}
		function s(e) {
			try {
				c(r.throw(e));
			} catch (e) {
				a(e);
			}
		}
		function c(e) {
			e.done ? n(e.value) : i(e.value).then(o, s);
		}
		c((r = r.apply(e, t || [])).next());
	});
}
function Je(e, t) {
	let n = t || e;
	return (t, ...r) => t ? n(...r) : e(...r);
}
function E(e) {
	return T(this, void 0, void 0, function* () {
		if (!c(e)) return e;
		let t, n = !1, r = "next";
		do {
			let i = e[r](t);
			n = !!i.done, t = i.value, r = "next";
			try {
				c(t) && (t = E(t)), s(t) && (t = yield t);
			} catch (e) {
				r = "throw", t = e;
			}
		} while (!n);
		return t;
	});
}
function D(e) {
	if (!c(e)) return e;
	let t, n = !1, r = "next";
	do {
		let i = e[r](t);
		if (n = !!i.done, t = i.value, r = "next", c(t)) try {
			t = D(t);
		} catch (e) {
			r = "throw", t = e;
		}
	} while (!n);
	return t;
}
var Ye = /%([-_0^#:]+)?(\d+)?([EO])?(.)/;
function Xe(e) {
	return [
		31,
		$e(e) ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
}
function Ze(e) {
	let t = 0;
	for (let n = 0; n < e.getMonth(); ++n) t += Xe(e)[n];
	return t + e.getDate();
}
function Qe(e, t) {
	let n = Ze(e) + (t - e.getDay()), r = 7 - new Date(e.getFullYear(), 0, 1).getDay() + t;
	return String(Math.floor((n - r) / 7) + 1);
}
function $e(e) {
	let t = e.getFullYear();
	return !!(!(t & 3) && (t % 100 || t % 400 == 0 && t));
}
function et(e) {
	let t = e.getDate();
	if ([
		11,
		12,
		13
	].includes(t)) return "th";
	switch (t % 10) {
		case 1: return "st";
		case 2: return "nd";
		case 3: return "rd";
		default: return "th";
	}
}
function tt(e) {
	return parseInt(e.getFullYear().toString().substring(0, 2), 10);
}
var nt = {
	d: 2,
	e: 2,
	H: 2,
	I: 2,
	j: 3,
	k: 2,
	l: 2,
	L: 3,
	m: 2,
	M: 2,
	S: 2,
	U: 2,
	W: 2
}, rt = /* @__PURE__ */ new Set("aAbBceklpP");
function it(e, t) {
	let n = Math.abs(e.getTimezoneOffset()), r = Math.floor(n / 60), i = n % 60;
	return (e.getTimezoneOffset() > 0 ? "-" : "+") + _(r, 2, "0") + (t.flags[":"] ? ":" : "") + _(i, 2, "0");
}
var at = {
	a: (e) => e.getShortWeekdayName(),
	A: (e) => e.getLongWeekdayName(),
	b: (e) => e.getShortMonthName(),
	B: (e) => e.getLongMonthName(),
	c: (e) => e.toLocaleString(),
	C: (e) => tt(e),
	d: (e) => e.getDate(),
	e: (e) => e.getDate(),
	H: (e) => e.getHours(),
	I: (e) => String(e.getHours() % 12 || 12),
	j: (e) => Ze(e),
	k: (e) => e.getHours(),
	l: (e) => String(e.getHours() % 12 || 12),
	L: (e) => e.getMilliseconds(),
	m: (e) => e.getMonth() + 1,
	M: (e) => e.getMinutes(),
	N: (e, t) => {
		var n;
		let r = Number(t.width) || 9, i = _(String(e.getMilliseconds()), 3, "0").slice(0, r);
		return (n = t.memoryLimit) == null || n.use(r - i.length), le(i, r, "0");
	},
	p: (e) => e.getHours() < 12 ? "AM" : "PM",
	P: (e) => e.getHours() < 12 ? "am" : "pm",
	q: (e) => et(e),
	s: (e) => Math.floor(e.dateValue() / 1e3),
	S: (e) => e.getSeconds(),
	u: (e) => e.getDay() || 7,
	U: (e) => Qe(e, 0),
	w: (e) => e.getDay(),
	W: (e) => Qe(e, 1),
	x: (e) => e.toLocaleDateString(),
	X: (e) => e.toLocaleTimeString(),
	y: (e) => e.getFullYear().toString().slice(2, 4),
	Y: (e) => e.getFullYear(),
	z: it,
	Z: (e, t) => e.getTimeZoneName() || it(e, t),
	t: () => "	",
	n: () => "\n",
	"%": () => "%"
};
at.h = at.b;
function O(e, t, n) {
	let r = "", i = t, a;
	for (; a = Ye.exec(i);) r += i.slice(0, a.index), i = i.slice(a.index + a[0].length), r += ot(e, a, n);
	return r + i;
}
function ot(e, t, n) {
	let [r, i = "", a, o, s] = t, c = at[s];
	if (!c) return r;
	let l = {};
	for (let e of i) l[e] = !0;
	let u = String(c(e, {
		flags: l,
		width: a,
		modifier: o,
		memoryLimit: n
	})), d = rt.has(s) ? " " : "0", f = Number(a) || nt[s] || 0;
	return l["^"] ? u = u.toUpperCase() : l["#"] && (u = fe(u)), l._ ? d = " " : l[0] && (d = "0"), l["-"] && (f = 0), n?.use(Number(f) - u.length), _(u, f, d);
}
function st() {
	return typeof Intl < "u" ? Intl.DateTimeFormat : void 0;
}
var ct = 6e4, lt = /([zZ]|([+-])(\d{2}):?(\d{2}))$/, ut = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
], dt = ut.map((e) => e.slice(0, 3)), ft = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
], pt = ft.map((e) => e.slice(0, 3)), k = class e {
	constructor(t, n, r) {
		this.locale = n, this.DateTimeFormat = st(), this.date = new Date(t), this.timezoneFixed = r !== void 0, r === void 0 && (r = this.date.getTimezoneOffset()), this.timezoneOffset = a(r) ? e.getTimezoneOffset(r, this.date) : r, this.timezoneName = a(r) ? r : "";
		let i = (this.date.getTimezoneOffset() - this.timezoneOffset) * ct, o = this.date.getTime() + i;
		this.displayDate = new Date(o);
	}
	getTime() {
		return this.displayDate.getTime();
	}
	dateValue() {
		return this.date.getTime();
	}
	getMilliseconds() {
		return this.displayDate.getMilliseconds();
	}
	getSeconds() {
		return this.displayDate.getSeconds();
	}
	getMinutes() {
		return this.displayDate.getMinutes();
	}
	getHours() {
		return this.displayDate.getHours();
	}
	getDay() {
		return this.displayDate.getDay();
	}
	getDate() {
		return this.displayDate.getDate();
	}
	getMonth() {
		return this.displayDate.getMonth();
	}
	getFullYear() {
		return this.displayDate.getFullYear();
	}
	toLocaleString(e, t) {
		return t?.timeZone ? this.date.toLocaleString(e, t) : this.displayDate.toLocaleString(e, t);
	}
	toLocaleTimeString(e) {
		return this.displayDate.toLocaleTimeString(e);
	}
	toLocaleDateString(e) {
		return this.displayDate.toLocaleDateString(e);
	}
	getTimezoneOffset() {
		return this.timezoneOffset;
	}
	getTimeZoneName() {
		if (this.timezoneFixed) return this.timezoneName;
		if (this.DateTimeFormat) return this.DateTimeFormat().resolvedOptions().timeZone;
	}
	getLongMonthName() {
		return this.format({ month: "long" }) ?? ut[this.getMonth()];
	}
	getShortMonthName() {
		return this.format({ month: "short" }) ?? dt[this.getMonth()];
	}
	getLongWeekdayName() {
		return this.format({ weekday: "long" }) ?? ft[this.displayDate.getDay()];
	}
	getShortWeekdayName() {
		return this.format({ weekday: "short" }) ?? pt[this.displayDate.getDay()];
	}
	valid() {
		return !isNaN(this.getTime());
	}
	format(e) {
		return this.DateTimeFormat && this.DateTimeFormat(this.locale, e).format(this.displayDate);
	}
	static createDateFixedToTimezone(t, n) {
		let r = t.match(lt);
		if (r && r[1] === "Z") return new e(+new Date(t), n, 0);
		if (r && r[2] && r[3] && r[4]) {
			let [, , i, a, o] = r, s = (i === "+" ? -1 : 1) * (parseInt(a, 10) * 60 + parseInt(o, 10));
			return new e(+new Date(t), n, s);
		}
		return new e(t, n);
	}
	static getTimezoneOffset(e, t) {
		let n = t.toLocaleString("en-US", { timeZone: e }), r = t.toLocaleString("en-US", { timeZone: "UTC" }), i = new Date(n);
		return (new Date(r) - +i) / 6e4;
	}
}, mt = class {
	constructor(e, t) {
		this.base = 0, this.message = `${e} limit exceeded`, this.limit = t;
	}
	use(e) {
		+e > 0 && (C(this.base + +e <= this.limit, this.message), this.base += +e);
	}
	check(e) {
		+e > 0 && C(+e <= this.limit, this.message);
	}
}, ht = class extends e {
	constructor(e, [t, n], r, i, a, o, s, c) {
		super(e, r, i, a, c), this.trimLeft = !1, this.trimRight = !1;
		let l = r[t] === "-", u = r[n - 1] === "-", d = l ? t + 1 : t, f = u ? n - 1 : n;
		for (; d < f && x[r.charCodeAt(d)] & S;) d++;
		for (; f > d && x[r.charCodeAt(f - 1)] & S;) f--;
		this.contentRange = [d, f], this.trimLeft = l || o, this.trimRight = u || s;
	}
	get content() {
		return this.input.slice(this.contentRange[0], this.contentRange[1]);
	}
}, gt = class extends ht {
	constructor(e, t, n, r, i) {
		let { trimTagLeft: a, trimTagRight: o, tagDelimiterLeft: s, tagDelimiterRight: c } = r, [l, u] = [t + s.length, n - c.length];
		super(q.Tag, [l, u], e, t, n, a, o, i), this.tokenizer = new L(e, r.operators, i, this.contentRange, r.groupedExpressions), this.name = this.tokenizer.readTagName(), this.tokenizer.assert(this.name, "illegal tag syntax, tag name expected"), this.tokenizer.skipBlank(), this.args = this.tokenizer.input.slice(this.tokenizer.p, this.contentRange[1]);
	}
}, _t = class extends ht {
	constructor(e, t, n, r, i) {
		let { trimOutputLeft: a, trimOutputRight: o, outputDelimiterLeft: s, outputDelimiterRight: c } = r, l = [t + s.length, n - c.length];
		super(q.Output, l, e, t, n, a, o, i);
	}
}, vt = class extends e {
	constructor(e, t, n, r) {
		super(q.HTML, e, t, n, r), this.input = e, this.begin = t, this.end = n, this.file = r, this.trimLeft = 0, this.trimRight = 0;
	}
	getContent() {
		return this.input.slice(this.begin + this.trimLeft, this.end - this.trimRight);
	}
}, yt = class extends e {
	constructor(e, t, n, r) {
		super(q.Number, e, t, n, r), this.input = e, this.begin = t, this.end = n, this.file = r, this.content = Number(this.getText());
	}
}, bt = class extends e {
	constructor(e, t, n, r) {
		super(q.Word, e, t, n, r), this.input = e, this.begin = t, this.end = n, this.file = r, this.content = this.getText();
	}
}, xt = class extends e {
	constructor(e, t, n, r) {
		super(q.Literal, e, t, n, r), this.input = e, this.begin = t, this.end = n, this.file = r, this.literal = this.getText(), this.content = We[this.literal];
	}
}, St = {
	"==": 2,
	"!=": 2,
	">": 2,
	"<": 2,
	">=": 2,
	"<=": 2,
	contains: 2,
	not: 1,
	and: 0,
	or: 0
}, Ct = {
	"==": 0,
	"!=": 0,
	">": 0,
	"<": 0,
	">=": 0,
	"<=": 0,
	contains: 0,
	not: 1,
	and: 0,
	or: 0
}, wt = class extends e {
	constructor(e, t, n, r) {
		super(q.Operator, e, t, n, r), this.input = e, this.begin = t, this.end = n, this.file = r, this.operator = this.getText();
	}
	getPrecedence() {
		return this.operator in St ? St[this.operator] : 1;
	}
}, Tt = class extends e {
	constructor(e, t, n, r, i, a) {
		super(q.PropertyAccess, n, r, i, a), this.variable = e, this.props = t;
	}
}, Et = class extends e {
	constructor(e, t, n, r, i, a) {
		super(q.Filter, n, r, i, a), this.name = e, this.args = t;
	}
}, Dt = class extends e {
	constructor(e, t, n, r, i, a) {
		super(q.Hash, e, t, n, a), this.input = e, this.begin = t, this.end = n, this.name = r, this.value = i, this.file = a;
	}
}, Ot = /[\da-fA-F]/, kt = /[0-7]/, At = {
	b: "\b",
	f: "\f",
	n: "\n",
	r: "\r",
	t: "	",
	v: "\v"
};
function jt(e) {
	let t = e.charCodeAt(0);
	return t >= 97 ? t - 87 : t >= 65 ? t - 55 : t - 48;
}
function Mt(e) {
	let t = "";
	for (let n = 1; n < e.length - 1; n++) {
		if (e[n] !== "\\") {
			t += e[n];
			continue;
		}
		if (At[e[n + 1]] !== void 0) t += At[e[++n]];
		else if (e[n + 1] === "u") {
			let r = 0, i = n + 2;
			for (; i <= n + 5 && Ot.test(e[i]);) r = r * 16 + jt(e[i++]);
			n = i - 1, t += String.fromCharCode(r);
		} else if (!kt.test(e[n + 1])) t += e[++n];
		else {
			let r = n + 1, i = 0;
			for (; r <= n + 3 && kt.test(e[r]);) i = i * 8 + jt(e[r++]);
			n = r - 1, t += String.fromCharCode(i);
		}
	}
	return t;
}
var Nt = class extends e {
	constructor(e, t, n, r) {
		super(q.Quoted, e, t, n, r), this.input = e, this.begin = t, this.end = n, this.file = r, this.content = Mt(this.getText());
	}
}, Pt = class extends e {
	constructor(e, t, n, r, i, a) {
		super(q.Range, e, t, n, a), this.input = e, this.begin = t, this.end = n, this.lhs = r, this.rhs = i, this.file = a;
	}
}, Ft = class extends ht {
	constructor(e, t, n, r, i) {
		super(q.Tag, [t, n], e, t, n, !1, !1, i), this.tokenizer = new L(e, r.operators, i, this.contentRange, r.groupedExpressions), this.name = this.tokenizer.readTagName(), this.tokenizer.assert(this.name, "illegal liquid tag syntax"), this.tokenizer.skipBlank();
	}
	get args() {
		return this.tokenizer.input.slice(this.tokenizer.p, this.contentRange[1]);
	}
}, It = class extends e {
	constructor(e, t, n, r, i, a) {
		super(q.FilteredValue, n, r, i, a), this.initial = e, this.filters = t, this.input = n, this.begin = r, this.end = i, this.file = a;
	}
}, Lt = { now: () => Date.now() };
function Rt() {
	return typeof global == "object" && global.performance || typeof window == "object" && window.performance || Lt;
}
var zt = class {
	renderTemplatesToNodeStream(e, t) {
		let n = new Be();
		return Promise.resolve().then(() => E(this.renderTemplates(e, t, n))).then(() => n.end(), (e) => n.error(e)), n.stream;
	}
	*renderTemplates(e, t, n) {
		n ||= t.opts.keepOutputType ? new Ve() : new ze(), t.renderLimit.check(Rt().now());
		let r = [];
		for (let i of e) {
			t.renderLimit.check(Rt().now());
			try {
				let e = yield i.render(t, n);
				if (e && n.write(e), t.breakCalled || t.continueCalled) break;
			} catch (e) {
				let n = b.is(e) ? e : new be(e, i);
				if (t.opts.catchAllErrors) r.push(n);
				else throw n;
			}
		}
		if (r.length) throw new xe(r);
		return n.buffer;
	}
};
function Bt(e) {
	return g(e);
}
var Vt = class {
	constructor(e, t, n) {
		this.token = e, this.name = e.name, this.handler = o(t) ? t : o(t?.handler) ? t.handler : de, this.raw = !o(t) && !!t?.raw, this.args = e.args, this.liquid = n;
	}
	*render(e, t) {
		let n = [];
		for (let e of this.args) Bt(e) ? n.push([e[0], yield A(e[1], t)]) : n.push(yield A(e, t));
		return yield this.handler.apply({
			context: t,
			token: this.token,
			liquid: this.liquid
		}, [e, ...n]);
	}
}, Ht = class {
	constructor(e) {
		this.postfix = [...qt(e)];
	}
	*evaluate(e, t) {
		C(e, "unable to evaluate: context not defined");
		let n = [];
		for (let r of this.postfix) if (Gn(r)) {
			let t = n.pop(), i;
			if (Ct[r.operator] === 1) i = yield e.opts.operators[r.operator](t, e);
			else {
				let a = n.pop();
				i = yield e.opts.operators[r.operator](a, t, e);
			}
			n.push(i);
		} else n.push(yield A(r, e, t));
		return n[0];
	}
	valid() {
		return !!this.postfix.length;
	}
};
function* A(e, t, n = !1) {
	if (e) {
		if ("content" in e) return e.content;
		if (Xn(e)) return yield Wt(e, t, n);
		if (Qn(e)) return yield Kt(e, t);
		if ($n(e)) return yield Ut(e, t, n);
	}
}
function* Ut(e, t, n) {
	C(t.liquid, "FilteredValueToken evaluation requires liquid instance in context"), n ||= t.opts.lenientIf && e.filters.length > 0 && e.filters[0].name === "default";
	let r = yield e.initial.evaluate(t, n);
	for (let n of e.filters) {
		let e = t.liquid.filters[n.name];
		C(e || !t.liquid.options.strictFilters, () => `undefined filter: ${n.name}`), r = yield new Vt(n, e, t.liquid).render(r, t);
	}
	return r;
}
function* Wt(e, t, n) {
	let r = [];
	for (let n of e.props) r.push(yield A(n, t, !1));
	try {
		if (e.variable) {
			let i = yield A(e.variable, t, n);
			return yield t._getFromScope(i, r);
		}
		return yield t._get(r);
	} catch (t) {
		if (n && t.name === "InternalUndefinedVariableError") return null;
		throw new Se(t, e);
	}
}
function Gt(e) {
	return e.content;
}
function* Kt(e, t) {
	let n = yield A(e.lhs, t), r = yield A(e.rhs, t);
	return t.memoryLimit.use(r - n + 1), ce(+n, +r + 1);
}
function* qt(e) {
	let t = [];
	for (let n of e) if (Gn(n)) {
		for (; t.length && t[t.length - 1].getPrecedence() > n.getPrecedence();) yield t.pop();
		t.push(n);
	} else yield n;
	for (; t.length;) yield t.pop();
}
function j(e, t) {
	return !M(e, t);
}
function M(e, t) {
	return e = p(e), t.opts.jsTruthy ? !e : e === !1 || e == null;
}
var Jt = {
	"==": N,
	"!=": (e, t) => !N(e, t),
	">": (e, t) => w(e) ? e.gt(t) : w(t) ? t.lt(e) : p(e) > p(t),
	"<": (e, t) => w(e) ? e.lt(t) : w(t) ? t.gt(e) : p(e) < p(t),
	">=": (e, t) => w(e) ? e.geq(t) : w(t) ? t.leq(e) : p(e) >= p(t),
	"<=": (e, t) => w(e) ? e.leq(t) : w(t) ? t.geq(e) : p(e) <= p(t),
	contains: (e, t) => (e = p(e), g(e) ? e.some((e) => N(e, t)) : o(e?.indexOf) ? e.indexOf(p(t)) > -1 : !1),
	not: (e, t) => M(p(e), t),
	and: (e, t, n) => j(p(e), n) && j(p(t), n),
	or: (e, t, n) => j(p(e), n) || j(p(t), n)
};
function N(e, t) {
	return w(e) ? e.equals(t) : w(t) ? t.equals(e) : (e = p(e), t = p(t), g(e) ? g(t) && Yt(e, t) : e === t);
}
function Yt(e, t) {
	return e.length === t.length && !e.some((e, n) => !N(e, t[n]));
}
function Xt(e, t) {
	return e.some((e) => N(e, t));
}
var Zt = class {
	constructor(e, t, n, r) {
		this.key = e, this.value = t, this.next = n, this.prev = r;
	}
}, Qt = class {
	constructor(e, t = 0) {
		this.limit = e, this.size = t, this.cache = {}, this.head = new Zt("HEAD", null, null, null), this.tail = new Zt("TAIL", null, null, null), this.head.next = this.tail, this.tail.prev = this.head;
	}
	write(e, t) {
		if (this.cache[e]) this.cache[e].value = t;
		else {
			let n = new Zt(e, t, this.head.next, this.head);
			this.head.next.prev = n, this.head.next = n, this.cache[e] = n, this.size++, this.ensureLimit();
		}
	}
	read(e) {
		if (!this.cache[e]) return;
		let { value: t } = this.cache[e];
		return this.remove(e), this.write(e, t), t;
	}
	remove(e) {
		let t = this.cache[e];
		t.prev.next = t.next, t.next.prev = t.prev, delete this.cache[e], this.size--;
	}
	clear() {
		this.head.next = this.tail, this.tail.prev = this.head, this.size = 0, this.cache = {};
	}
	ensureLimit() {
		this.size > this.limit && this.remove(this.tail.prev.key);
	}
};
function $t(e, t) {
	let n = document.createElement("base");
	n.href = e;
	let r = document.getElementsByTagName("head")[0];
	r.insertBefore(n, r.firstChild);
	let i = document.createElement("a");
	i.href = t;
	let a = i.href;
	return r.removeChild(n), a;
}
function en(e, t, n) {
	return e.length && oe(e) !== "/" && (e += "/"), $t(e, t).replace(/^(\w+:\/\/[^/]+)(\/[^?]+)/, (e, t, r) => {
		let i = r.split("/").pop();
		return /\.\w+$/.test(i) ? e : t + r + n;
	});
}
function tn(e) {
	return T(this, void 0, void 0, function* () {
		return new Promise((t, n) => {
			let r = new XMLHttpRequest();
			r.onload = () => {
				r.status >= 200 && r.status < 300 ? t(r.responseText) : n(Error(r.statusText));
			}, r.onerror = () => {
				n(/* @__PURE__ */ Error("An error occurred whilst receiving the response."));
			}, r.open("GET", e), r.send();
		});
	});
}
function nn(e) {
	let t = new XMLHttpRequest();
	if (t.open("GET", e, !1), t.send(), t.status < 200 || t.status >= 300) throw Error(t.statusText);
	return t.responseText;
}
function rn(e) {
	return T(this, void 0, void 0, function* () {
		return !0;
	});
}
function an(e) {
	return !0;
}
function on(e) {
	return $t(e, ".");
}
var sn = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	resolve: en,
	readFile: tn,
	readFileSync: nn,
	exists: rn,
	existsSync: an,
	dirname: on,
	sep: "/"
});
function cn(e, t) {
	typeof t == "string" ? e.use(t.length) : t === null || typeof t == "number" || typeof t == "boolean" ? e.use(JSON.stringify(t).length) : Array.isArray(t) ? e.use(t.length + 1) : typeof t == "object" && e.use(2);
}
function ln(e, t, ...n) {
	return e = p(e), g(e) || a(e) ? e.length ? e : t : e === !1 && new Map(n).get("allow_false") ? !1 : M(e, this.context) ? t : e;
}
function un(e, t = 0) {
	let n = this.context.memoryLimit;
	return JSON.stringify(e, (e, t) => (cn(n, t), t), t);
}
function dn(e, t = 0) {
	let n = this.context.memoryLimit, r = [];
	return JSON.stringify(e, function(e, t) {
		if (typeof t != "object" || !t) return cn(n, t), t;
		for (; r.length > 0 && r[r.length - 1] !== this;) r.pop();
		return r.includes(t) ? (n.use(10), "[Circular]") : (r.push(t), cn(n, t), t);
	}, t);
}
function fn(e) {
	return Number(e);
}
var pn = {
	default: ln,
	raw: {
		raw: !0,
		handler: de
	},
	jsonify: un,
	to_integer: fn,
	json: un,
	inspect: dn
}, mn = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&#34;",
	"'": "&#39;"
}, hn = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&#34;": "\"",
	"&#39;": "'"
};
function P(e) {
	return e = l(e), this.context.memoryLimit.use(e.length), e.replace(/&|<|>|"|'/g, (e) => mn[e]);
}
function gn(e) {
	return P.call(this, e);
}
function _n(e) {
	return e = l(e), this.context.memoryLimit.use(e.length), e.replace(/&(amp|lt|gt|#34|#39);/g, (e) => hn[e]);
}
function vn(e) {
	return P.call(this, _n.call(this, e));
}
function yn(e) {
	let t = l(e);
	return this.context.memoryLimit.use(t.length), t.replace(/\r?\n/gm, "<br />\n");
}
function bn(e) {
	let t = l(e);
	this.context.memoryLimit.use(t.length);
	let n = /* @__PURE__ */ new Map([
		["<script", "<\/script>"],
		["<style", "</style>"],
		["<!--", "-->"],
		["<", ">"]
	]), r = "", i = 0;
	for (; i < t.length;) {
		let e = t.indexOf("<", i);
		if (e < 0) return r + t.slice(i);
		r += t.slice(i, e);
		for (let [r, a] of n) {
			if (!t.startsWith(r, e)) continue;
			let o = t.indexOf(a, e + r.length);
			if (o >= 0) {
				i = o + a.length;
				break;
			}
			n.delete(r);
		}
		if (i <= e) return r + t.slice(e);
	}
	return r;
}
var xn = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	escape: P,
	xml_escape: gn,
	escape_once: vn,
	newline_to_br: yn,
	strip_html: bn
}), Sn = class {
	constructor(e) {
		this.mapping = e, this.sep = "/";
	}
	exists(e) {
		return T(this, void 0, void 0, function* () {
			return this.existsSync(e);
		});
	}
	existsSync(e) {
		return !h(this.mapping[e]);
	}
	readFile(e) {
		return T(this, void 0, void 0, function* () {
			return this.readFileSync(e);
		});
	}
	readFileSync(e) {
		let t = this.mapping[e];
		if (h(t)) throw Error(`ENOENT: ${e}`);
		return t;
	}
	dirname(e) {
		let t = e.split(this.sep);
		return t.pop(), t.join(this.sep);
	}
	resolve(e, t, n) {
		if (t += n, e === ".") return t;
		let r = e.split(/\/+/);
		for (let e of t.split(this.sep)) if (e === "." || e === "") continue;
		else e === ".." ? (r.length > 1 || r[0] !== "") && r.pop() : r.push(e);
		return r.join(this.sep);
	}
}, F = {
	root: ["."],
	layouts: ["."],
	partials: ["."],
	relativeReference: !0,
	jekyllInclude: !1,
	keyValueSeparator: ":",
	cache: void 0,
	extname: "",
	fs: sn,
	dynamicPartials: !0,
	jsTruthy: !1,
	dateFormat: "%A, %B %-e, %Y at %-l:%M %P %z",
	locale: "",
	trimTagRight: !1,
	trimTagLeft: !1,
	trimOutputRight: !1,
	trimOutputLeft: !1,
	greedy: !0,
	tagDelimiterLeft: "{%",
	tagDelimiterRight: "%}",
	outputDelimiterLeft: "{{",
	outputDelimiterRight: "}}",
	preserveTimezones: !1,
	strictFilters: !1,
	strictVariables: !1,
	ownPropertyOnly: !0,
	lenientIf: !1,
	globals: {},
	keepOutputType: !1,
	operators: Jt,
	groupedExpressions: !1,
	memoryLimit: Infinity,
	parseLimit: Infinity,
	renderLimit: Infinity
};
function Cn(e) {
	if (e.hasOwnProperty("root") && (e.hasOwnProperty("partials") || (e.partials = e.root), e.hasOwnProperty("layouts") || (e.layouts = e.root)), e.hasOwnProperty("cache")) {
		let t;
		t = typeof e.cache == "number" ? e.cache > 0 ? new Qt(e.cache) : void 0 : typeof e.cache == "object" ? e.cache : e.cache ? new Qt(1024) : void 0, e.cache = t;
	}
	return e = Object.assign(Object.assign(Object.assign({}, F), e.jekyllInclude ? { dynamicPartials: !1 } : {}), e), (!e.fs.dirname || !e.fs.sep) && e.relativeReference && (console.warn("[LiquidJS] `fs.dirname` and `fs.sep` are required for relativeReference, set relativeReference to `false` to suppress this warning"), e.relativeReference = !1), e.root = I(e.root), e.partials = I(e.partials), e.layouts = I(e.layouts), e.outputEscape = e.outputEscape && wn(e.outputEscape), e.locale || (e.locale = st()?.().resolvedOptions().locale ?? "en-US"), e.templates && (e.fs = new Sn(e.templates), e.relativeReference = !0, e.root = e.partials = e.layouts = "."), e;
}
function wn(e) {
	return e === "escape" ? P : e === "json" ? pn.json : (C(o(e), "`outputEscape` need to be of type string or function"), e);
}
function I(e) {
	let t = [];
	return g(e) && (t = e), a(e) && (t = [e]), t;
}
function Tn(e, t) {
	let n = !1;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		Wn(i) && (!n && i.trimLeft && En(e[r - 1], t.greedy), J(i) && (i.name === "raw" ? n = !0 : i.name === "endraw" && (n = !1)), !n && i.trimRight && Dn(e[r + 1], t.greedy));
	}
}
function En(e, t) {
	if (!e || !Kn(e)) return;
	let n = t ? S : ke;
	for (; x[e.input.charCodeAt(e.end - 1 - e.trimRight)] & n;) e.trimRight++;
}
function Dn(e, t) {
	if (!e || !Kn(e)) return;
	let n = t ? S : ke;
	for (; x[e.input.charCodeAt(e.begin + e.trimLeft)] & n;) e.trimLeft++;
	e.input.charAt(e.begin + e.trimLeft) === "\n" && e.trimLeft++;
}
var L = class {
	constructor(e, t = F.operators, n, r, i = !1) {
		this.input = e, this.file = n, this.rawBeginAt = -1, this.p = r ? r[0] : 0, this.N = r ? r[1] : e.length, this.opTrie = Ke(t), this.literalTrie = Ke(We), this.groupedExpressions = i;
	}
	readExpression() {
		return new Ht(this.readExpressionTokens());
	}
	*readExpressionTokens() {
		for (; this.p < this.N;) {
			let e = this.readOperator();
			if (e) {
				yield e;
				continue;
			}
			let t = this.readValue();
			if (t) {
				yield t;
				continue;
			}
			return;
		}
	}
	readOperator() {
		this.skipBlank();
		let e = this.matchTrie(this.opTrie);
		if (e !== -1) return new wt(this.input, this.p, this.p = e, this.file);
	}
	matchTrie(e) {
		let t = e, n = this.p, r;
		for (; t[this.input[n]] && n < this.N;) t = t[this.input[n++]], t.end && (r = t);
		return !r || r.needBoundary && Ne(this.peek(n - this.p)) ? -1 : n;
	}
	readFilteredValue() {
		let e = this.p, t = this.readExpression();
		return this.assert(t.valid(), `invalid value expression: ${this.snapshot()}`), new It(t, this.readFilters(), this.input, e, this.p, this.file);
	}
	readFilters() {
		let e = [];
		for (;;) {
			let t = this.readFilter();
			if (!t) return e;
			e.push(t);
		}
	}
	readFilter() {
		if (this.skipBlank(), this.end() || this.peek() === ")") return null;
		this.assert(this.read() === "|", "expected \"|\" before filter");
		let e = this.readIdentifier();
		if (!e.size()) return this.assert(this.end(), "expected filter name"), null;
		let t = [];
		if (this.skipBlank(), this.peek() === ":") do {
			++this.p;
			let e = this.readFilterArg();
			e && t.push(e), this.skipBlank(), this.assert(this.end() || this.peek() === "," || this.peek() === "|" || this.peek() === ")", () => `unexpected character ${this.snapshot()}`);
		} while (this.peek() === ",");
		else if (!(this.peek() === "|" || this.peek() === ")" || this.end())) throw this.error("expected \":\" after filter name");
		return new Et(e.getText(), t, this.input, e.begin, this.p, this.file);
	}
	readFilterArg() {
		let e = this.readValue();
		if (!e) return;
		if (this.skipBlank(), this.peek() !== ":") return e;
		++this.p;
		let t = this.readValue();
		return [e.getText(), t];
	}
	readTopLevelTokens(e = F) {
		let t = [];
		for (; this.p < this.N;) {
			let n = this.readTopLevelToken(e);
			t.push(n);
		}
		return Tn(t, e), t;
	}
	readTopLevelToken(e) {
		let { tagDelimiterLeft: t, outputDelimiterLeft: n } = e;
		return this.rawBeginAt > -1 ? this.readEndrawOrRawContent(e) : this.match(t) ? this.readTagToken(e) : this.match(n) ? this.readOutputToken(e) : this.readHTMLToken([t, n]);
	}
	readHTMLToken(e) {
		let t = this.p;
		for (; this.p < this.N && !e.some((e) => this.match(e));) ++this.p;
		return new vt(this.input, t, this.p, this.file);
	}
	readTagToken(e) {
		let { file: t, input: n } = this, r = this.p;
		if (this.readToDelimiter(e.tagDelimiterRight) === -1) throw this.error(`tag ${this.snapshot(r)} not closed`, r);
		let i = new gt(n, r, this.p, e, t);
		return i.name === "raw" && (this.rawBeginAt = r), i;
	}
	readToDelimiter(e, t = !1) {
		for (this.skipBlank(); this.p < this.N;) {
			if (t && this.peekType() & Oe) {
				this.readQuoted();
				continue;
			}
			if (++this.p, this.rmatch(e)) return this.p;
		}
		return -1;
	}
	readOutputToken(e = F) {
		let { file: t, input: n } = this, { outputDelimiterRight: r } = e, i = this.p;
		if (this.readToDelimiter(r, !0) === -1) throw this.error(`output ${this.snapshot(i)} not closed`, i);
		return new _t(n, i, this.p, e, t);
	}
	readEndrawOrRawContent(e) {
		let { tagDelimiterLeft: t, tagDelimiterRight: n } = e, r = this.p, i = this.readTo(t) - t.length;
		for (; this.p < this.N;) {
			if (this.readIdentifier().getText() !== "endraw") {
				i = this.readTo(t) - t.length;
				continue;
			}
			for (; this.p <= this.N;) {
				if (this.rmatch(n)) {
					let t = this.p;
					return r === i ? (this.rawBeginAt = -1, new gt(this.input, r, t, e, this.file)) : (this.p = i, new vt(this.input, r, i, this.file));
				}
				if (this.rmatch(t)) break;
				this.p++;
			}
		}
		throw this.error(`raw ${this.snapshot(this.rawBeginAt)} not closed`, r);
	}
	readLiquidTagTokens(e = F) {
		let t = [];
		for (; this.p < this.N;) {
			let n = this.readLiquidTagToken(e);
			n && t.push(n);
		}
		return t;
	}
	readLiquidTagToken(e) {
		if (this.skipBlank(), this.end()) return;
		let t = this.p;
		this.readToDelimiter("\n");
		let n = this.p;
		return new Ft(this.input, t, n, e, this.file);
	}
	error(e, t = this.p) {
		return new ve(e, new bt(this.input, t, this.N, this.file));
	}
	assert(e, t, n) {
		if (!e) throw this.error(typeof t == "function" ? t() : t, n);
	}
	snapshot(e = this.p) {
		return JSON.stringify(pe(this.input.slice(e, this.N), 32));
	}
	readWord() {
		return this.readIdentifier();
	}
	readIdentifier() {
		this.skipBlank();
		let e = this.p;
		for (; !this.end() && Ne(this.peek());) ++this.p;
		return new bt(this.input, e, this.p, this.file);
	}
	readNonEmptyIdentifier() {
		let e = this.readIdentifier();
		return e.size() ? e : void 0;
	}
	readTagName() {
		return this.skipBlank(), this.input[this.p] === "#" ? this.input.slice(this.p, ++this.p) : this.readIdentifier().getText();
	}
	readHashes(e) {
		let t = [];
		for (;;) {
			let n = this.readHash(e);
			if (!n) return t;
			t.push(n);
		}
	}
	readHash(e) {
		this.skipBlank(), this.peek() === "," && ++this.p;
		let t = this.p, n = this.readNonEmptyIdentifier();
		if (!n) return;
		let r;
		this.skipBlank();
		let i = a(e) ? e : e ? "=" : ":";
		return this.peek() === i && (++this.p, r = this.readValue()), new Dt(this.input, t, this.p, n, r, this.file);
	}
	remaining() {
		return this.input.slice(this.p, this.N);
	}
	advance(e = 1) {
		this.p += e;
	}
	end() {
		return this.p >= this.N;
	}
	read() {
		return this.input[this.p++];
	}
	readTo(e) {
		for (; this.p < this.N;) if (++this.p, this.rmatch(e)) return this.p;
		return -1;
	}
	readValue() {
		this.skipBlank();
		let e = this.p, t = this.readLiteral() || this.readQuoted() || this.readNumber();
		!t && this.peek() === "(" && (t = this.readGroupOrRange());
		let n = this.readProperties(!t);
		return n.length ? new Tt(t, n, this.input, e, this.p) : t;
	}
	readScopeValue() {
		this.skipBlank();
		let e = this.p, t = this.readProperties();
		if (t.length) return new Tt(void 0, t, this.input, e, this.p);
	}
	readProperties(e = !0) {
		let t = [];
		for (;;) {
			if (this.peek() === "[") {
				this.p++;
				let e = this.readValue() || new bt(this.input, this.p, this.p, this.file);
				this.assert(this.readTo("]") !== -1, "[ not closed"), t.push(e);
				continue;
			}
			if (e && !t.length) {
				let e = this.readNonEmptyIdentifier();
				if (e) {
					t.push(e);
					continue;
				}
			}
			if (this.peek() === "." && this.peek(1) !== ".") {
				this.p++;
				let e = this.readNonEmptyIdentifier();
				if (!e) break;
				t.push(e);
				continue;
			}
			break;
		}
		return t;
	}
	readNumber() {
		this.skipBlank();
		let e = !1, t = !1, n = 0;
		for (this.peekType() & je && n++; this.p + n <= this.N;) if (this.peekType(n) & Ae) t = !0, n++;
		else if (this.peek(n) === "." && this.peek(n + 1) !== ".") {
			if (e || !t) return;
			e = !0, n++;
		} else break;
		if (t && !Ne(this.peek(n))) {
			let e = new yt(this.input, this.p, this.p + n, this.file);
			return this.advance(n), e;
		}
	}
	readLiteral() {
		this.skipBlank();
		let e = this.matchTrie(this.literalTrie);
		if (e === -1) return;
		let t = new xt(this.input, this.p, e, this.file);
		return this.p = e, t;
	}
	readGroupOrRange() {
		this.skipBlank();
		let e = this.p;
		if (this.peek() !== "(") return;
		++this.p;
		let t = this.readValueOrThrow();
		if (this.skipBlank(), this.peek() === "." && this.peek(1) === ".") {
			this.p += 2;
			let n = this.readValueOrThrow();
			return this.skipBlank(), this.assert(this.read() === ")", "invalid range syntax"), new Pt(this.input, e, this.p, t, n, this.file);
		}
		if (this.groupedExpressions) {
			let n = new Ht([t, ...this.readExpressionTokens()]);
			this.assert(n.valid(), () => `invalid value expression: ${this.snapshot()}`);
			let r = this.readFilters();
			return this.skipBlank(), this.assert(this.read() === ")", "unbalanced parentheses"), new It(n, r, this.input, e, this.p, this.file);
		}
		throw this.error("invalid range syntax");
	}
	readValueOrThrow() {
		let e = this.readValue();
		return this.assert(e, () => `unexpected token ${this.snapshot()}, value expected`), e;
	}
	readQuoted() {
		this.skipBlank();
		let e = this.p;
		if (!(this.peekType() & Oe)) return;
		++this.p;
		let t = !1;
		for (; this.p < this.N && (++this.p, !(this.input[this.p - 1] === this.input[e] && !t));) t ? t = !1 : this.input[this.p - 1] === "\\" && (t = !0);
		return new Nt(this.input, e, this.p, this.file);
	}
	*readFileNameTemplate(e) {
		let { outputDelimiterLeft: t } = e, n = [
			",",
			" ",
			"\r",
			"\n",
			"	",
			t
		], r = new Set(n);
		for (; this.p < this.N && !r.has(this.peek());) yield this.match(t) ? this.readOutputToken(e) : this.readHTMLToken(n);
	}
	match(e) {
		for (let t = 0; t < e.length; t++) if (e[t] !== this.input[this.p + t]) return !1;
		return !0;
	}
	rmatch(e) {
		for (let t = 0; t < e.length; t++) if (e[e.length - 1 - t] !== this.input[this.p - 1 - t]) return !1;
		return !0;
	}
	peekType(e = 0) {
		return this.p + e >= this.N ? 0 : x[this.input.charCodeAt(this.p + e)];
	}
	peek(e = 0) {
		return this.p + e >= this.N ? "" : this.input[this.p + e];
	}
	skipBlank() {
		for (; this.peekType() & S;) ++this.p;
	}
}, On = class {
	constructor(e, t) {
		this.handlers = {}, this.stopRequested = !1, this.tokens = e, this.parseToken = t;
	}
	on(e, t) {
		return this.handlers[e] = t, this;
	}
	trigger(e, t) {
		let n = this.handlers[e];
		return n ? (n.call(this, t), !0) : !1;
	}
	start() {
		this.trigger("start");
		let e;
		for (; !this.stopRequested && (e = this.tokens.shift());) {
			if (this.trigger("token", e) || J(e) && this.trigger(`tag:${e.name}`, e)) continue;
			let t = this.parseToken(e, this.tokens);
			this.trigger("template", t);
		}
		return this.stopRequested || this.trigger("end"), this;
	}
	stop() {
		return this.stopRequested = !0, this;
	}
}, kn = class {
	constructor(e) {
		this.token = e;
	}
}, R = class extends kn {
	constructor(e, t, n) {
		super(e), this.name = e.name, this.liquid = n, this.tokenizer = e.tokenizer;
	}
}, z = class {
	constructor(e, t) {
		this.hash = {};
		let n = e instanceof L ? e : new L(e, {});
		for (let e of n.readHashes(t)) this.hash[e.name.content] = e.value;
	}
	*render(e) {
		let t = {};
		for (let n of Object.keys(this.hash)) t[n] = this.hash[n] === void 0 ? !0 : yield A(this.hash[n], e);
		return t;
	}
};
function An(e) {
	return class extends R {
		constructor(t, n, r) {
			super(t, n, r), o(e.parse) && e.parse.call(this, t, n);
		}
		*render(t, n) {
			let r = yield new z(this.token.args, t.opts.keyValueSeparator).render(t);
			return yield e.render.call(this, t, n, r);
		}
	};
}
var B = class {
	constructor(e, t) {
		this.filters = [];
		let n = typeof e == "string" ? new L(e, t.options.operators, void 0, void 0, t.options.groupedExpressions).readFilteredValue() : e;
		this.initial = n.initial, this.filters = n.filters.map((e) => new Vt(e, this.getFilter(t, e.name), t));
	}
	*value(e, t) {
		t ||= e.opts.lenientIf && this.filters.length > 0 && this.filters[0].name === "default";
		let n = yield this.initial.evaluate(e, t);
		for (let t of this.filters) n = yield t.render(n, e);
		return n;
	}
	getFilter(e, t) {
		let n = e.filters[t];
		return C(n || !e.options.strictFilters, () => `undefined filter: ${t}`), n;
	}
}, jn = class extends kn {
	constructor(e, t) {
		super(e);
		let n = new L(e.input, t.options.operators, e.file, e.contentRange, t.options.groupedExpressions);
		this.value = new B(n.readFilteredValue(), t);
		let r = this.value.filters, i = t.options.outputEscape;
		if (!r[r.length - 1]?.raw && i) {
			let e = new Et(toString.call(i), [], "", 0, 0);
			r.push(new Vt(e, i, t));
		}
	}
	*render(e, t) {
		let n = yield this.value.value(e, !1);
		t.write(n);
	}
	*arguments() {
		yield this.value;
	}
}, Mn = class extends kn {
	constructor(e) {
		super(e), this.str = e.getContent();
	}
	*render(e, t) {
		t.write(this.str);
	}
}, V = class e {
	constructor(e, t) {
		this.segments = e, this.location = t;
	}
	toString() {
		return Hn(this.segments, !0);
	}
	toArray() {
		function* t(...n) {
			for (let r of n) r instanceof e ? yield Array.from(t(...r.segments)) : yield r;
		}
		return Array.from(t(...this.segments));
	}
}, Nn = class {
	constructor() {
		this.map = /* @__PURE__ */ new Map();
	}
	get(e) {
		let t = Hn([e.segments[0]]);
		return this.map.has(t) || this.map.set(t, []), this.map.get(t);
	}
	has(e) {
		return this.map.has(Hn([e.segments[0]]));
	}
	push(e) {
		this.get(e).push(e);
	}
	asObject() {
		return Object.fromEntries(this.map);
	}
}, Pn = { partials: !0 };
function* Fn(e, t, n) {
	let r = new Nn(), i = new Nn(), o = new Nn(), s = new In(/* @__PURE__ */ new Set()), c = /* @__PURE__ */ new Set();
	function l(e, t) {
		r.push(e);
		let n = t.alias(e);
		if (n !== void 0) {
			let e = n.segments[0];
			a(e) && !s.has(e) && i.push(n);
		} else {
			let n = e.segments[0];
			a(n) && !t.has(n) && i.push(e);
		}
		for (let n of e.segments) n instanceof V && l(n, t);
	}
	function* u(e, r) {
		if (e.arguments) for (let t of e.arguments()) for (let e of Ln(t)) l(e, r);
		if (e.localScope) for (let t of e.localScope()) {
			r.add(t.content), r.deleteAlias(t.content);
			let [e, n] = t.getPosition();
			o.push(new V([t.content], {
				row: e,
				col: n,
				file: t.file
			}));
		}
		if (e.children) if (e.partialScope) {
			let i = e.partialScope();
			if (i === void 0) {
				for (let i of yield e.children(t, n)) yield u(i, r);
				return;
			}
			if (c.has(i.name)) return;
			let o = /* @__PURE__ */ new Set(), s = i.isolated ? new In(o) : r.push(o);
			for (let e of i.scope) if (a(e)) o.add(e);
			else {
				let [t, n] = e;
				o.add(t);
				let r = Array.from(Ln(n));
				r.length && s.setAlias(t, r[0].segments);
			}
			for (let r of yield e.children(t, n)) yield u(r, s), c.add(i.name);
			s.pop();
		} else {
			e.blockScope && r.push(new Set(e.blockScope()));
			for (let i of yield e.children(t, n)) yield u(i, r);
			e.blockScope && r.pop();
		}
	}
	for (let t of e) yield u(t, s);
	return {
		variables: r.asObject(),
		globals: i.asObject(),
		locals: o.asObject()
	};
}
function H(e, t = {}) {
	return E(Fn(e, Object.assign(Object.assign({}, Pn), t).partials, !1));
}
function U(e, t = {}) {
	return D(Fn(e, Object.assign(Object.assign({}, Pn), t).partials, !0));
}
var In = class {
	constructor(e) {
		this.stack = [{
			names: e,
			aliases: /* @__PURE__ */ new Map()
		}];
	}
	has(e) {
		for (let t of this.stack) if (t.names.has(e)) return !0;
		return !1;
	}
	push(e) {
		return this.stack.push({
			names: e,
			aliases: /* @__PURE__ */ new Map()
		}), this;
	}
	pop() {
		return this.stack.pop()?.names;
	}
	add(e) {
		this.stack[0].names.add(e);
	}
	alias(e) {
		let t = e.segments[0];
		if (!a(t)) return;
		let n = this.getAlias(t);
		if (n !== void 0) return new V([...n, ...e.segments.slice(1)], e.location);
	}
	setAlias(e, t) {
		this.stack[this.stack.length - 1].aliases.set(e, t);
	}
	deleteAlias(e) {
		this.stack[this.stack.length - 1].aliases.delete(e);
	}
	getAlias(e) {
		for (let t of this.stack) {
			if (t.aliases.has(e)) return t.aliases.get(e);
			if (t.names.has(e)) return;
		}
	}
};
function* Ln(e) {
	Y(e) ? yield* W(e) : e instanceof B && (yield* Rn(e));
}
function* Rn(e) {
	for (let t of e.initial.postfix) Y(t) && (yield* W(t));
	for (let t of e.filters) for (let e of t.args) Bt(e) && e[1] ? yield* W(e[1]) : Y(e) && (yield* W(e));
}
function* W(e) {
	Qn(e) ? (yield* W(e.lhs), yield* W(e.rhs)) : $n(e) ? yield* zn(e) : Xn(e) && (yield Bn(e));
}
function* zn(e) {
	if ($n(e)) {
		for (let t of e.initial.postfix) Y(t) && (yield* W(t));
		for (let t of e.filters) for (let e of t.args) Bt(e) && e[1] ? yield* W(e[1]) : Y(e) && (yield* W(e));
	}
}
function Bn(e) {
	let t = [], n = e.file, r = e.props[0];
	n ||= r.file, Jn(r) || Yn(r) || Zn(r) ? t.push(r.content) : Xn(r) && t.push(...Bn(r).segments);
	for (let r of e.props.slice(1)) n ||= r.file, Jn(r) || Yn(r) || Zn(r) ? t.push(r.content) : Xn(r) && t.push(Bn(r));
	let [i, a] = e.getPosition();
	return new V(t, {
		row: i,
		col: a,
		file: n
	});
}
var Vn = /^[\u0080-\uFFFFa-zA-Z_][\u0080-\uFFFFa-zA-Z0-9_-]*$/;
function Hn(e, t = !1) {
	let n = [], r = e[0];
	a(r) && (!t || r.match(Vn) ? n.push(`${r}`) : n.push(`['${r}']`));
	for (let t of e.slice(1)) t instanceof V ? n.push(`[${Hn(t.segments)}]`) : a(t) ? t.match(Vn) ? n.push(`.${t}`) : n.push(`['${t}']`) : n.push(`[${t}]`);
	return n.join("");
}
var G;
(function(e) {
	e.Partials = "partials", e.Layouts = "layouts", e.Root = "root";
})(G ||= {});
var Un = class {
	constructor(e) {
		if (this.options = e, e.relativeReference) {
			let t = e.fs.sep;
			C(t, "`fs.sep` is required for relative reference");
			let n = [
				"." + t,
				".." + t,
				"./",
				"../"
			];
			this.shouldLoadRelative = (e) => n.some((t) => e.startsWith(t));
		} else this.shouldLoadRelative = (e) => !1;
		let t = e.fs;
		this.contains = Je(t.contains?.bind(t) || (() => T(this, void 0, void 0, function* () {
			return !0;
		})), t.containsSync?.bind(t) || (() => !0)), this.exists = Je(t.exists?.bind(t) || (() => T(this, void 0, void 0, function* () {
			return !1;
		})), t.existsSync?.bind(t));
	}
	*lookup(e, t, n, r) {
		let i = this.options[t];
		for (let t of this.candidates(e, i, r)) {
			let e = !1;
			for (let r of i) if (yield this.contains(!!n, r, t)) {
				e = !0;
				break;
			}
			if (e && (yield this.exists(!!n, t))) return t;
		}
		throw this.lookupError(e, i);
	}
	*candidates(e, t, n) {
		let { fs: r, extname: i } = this.options;
		this.shouldLoadRelative(e) && n && (yield r.resolve(this.dirname(n), e, i));
		for (let n of t) yield r.resolve(n, e, i);
		if (r.fallback !== void 0) {
			let t = r.fallback(e);
			t !== void 0 && (yield t);
		}
	}
	dirname(e) {
		let t = this.options.fs;
		return C(t.dirname, "`fs.dirname` is required for relative reference"), t.dirname(e);
	}
	lookupError(e, t) {
		let n = /* @__PURE__ */ Error("ENOENT");
		return n.message = `ENOENT: Failed to lookup "${e}" in "${t}"`, n.code = "ENOENT", n;
	}
}, K = class {
	constructor(e) {
		this.liquid = e, this.cache = this.liquid.options.cache, this.fs = this.liquid.options.fs, this.parseFile = this.cache ? this._parseFileCached : this._parseFile, this.loader = new Un(this.liquid.options), this.parseLimit = new mt("parse length", e.options.parseLimit), this.readFile = Je(this.fs.readFile?.bind(this.fs) || (() => T(this, void 0, void 0, function* () {
			throw Error("readFile not implemented");
		})), this.fs.readFileSync?.bind(this.fs));
	}
	parse(e, t) {
		e = String(e), this.parseLimit.use(e.length);
		let n = new L(e, this.liquid.options.operators, t, void 0, this.liquid.options.groupedExpressions).readTopLevelTokens(this.liquid.options);
		return this.parseTokens(n);
	}
	parseTokens(e) {
		let t, n = [], r = [];
		for (; t = e.shift();) try {
			n.push(this.parseToken(t, e));
		} catch (e) {
			if (this.liquid.options.catchAllErrors) r.push(e);
			else throw e;
		}
		if (r.length) throw new xe(r);
		return n;
	}
	parseToken(e, t) {
		try {
			if (J(e)) {
				let n = this.liquid.tags[e.name];
				return C(n, `tag "${e.name}" not found`), new n(e, t, this.liquid, this);
			}
			return qn(e) ? new jn(e, this.liquid) : new Mn(e);
		} catch (t) {
			throw b.is(t) ? t : new ye(t, e);
		}
	}
	parseStream(e) {
		return new On(e, (e, t) => this.parseToken(e, t));
	}
	*_parseFileCached(e, t, n = G.Root, r) {
		let i = this.cache, a = this.loader.shouldLoadRelative(e) ? r + "," + e : n + ":" + e, o = yield i.read(a);
		if (o) return o;
		let s = this._parseFile(e, t, n, r), c = t ? yield s : E(s);
		i.write(a, c);
		try {
			return yield c;
		} catch (e) {
			throw i.remove(a), e;
		}
	}
	*_parseFile(e, t, n = G.Root, r) {
		let i = yield this.loader.lookup(e, n, t, r);
		return this.parse(yield this.readFile(!!t, i), i);
	}
}, q;
(function(e) {
	e[e.Number = 1] = "Number", e[e.Literal = 2] = "Literal", e[e.Tag = 4] = "Tag", e[e.Output = 8] = "Output", e[e.HTML = 16] = "HTML", e[e.Filter = 32] = "Filter", e[e.Hash = 64] = "Hash", e[e.PropertyAccess = 128] = "PropertyAccess", e[e.Word = 256] = "Word", e[e.Range = 512] = "Range", e[e.Quoted = 1024] = "Quoted", e[e.Operator = 2048] = "Operator", e[e.FilteredValue = 4096] = "FilteredValue", e[e.GroupedExpression = 8192] = "GroupedExpression", e[e.Delimited = 12] = "Delimited";
})(q ||= {});
function Wn(e) {
	return !!(X(e) & q.Delimited);
}
function Gn(e) {
	return X(e) === q.Operator;
}
function Kn(e) {
	return X(e) === q.HTML;
}
function qn(e) {
	return X(e) === q.Output;
}
function J(e) {
	return X(e) === q.Tag;
}
function Jn(e) {
	return X(e) === q.Quoted;
}
function Yn(e) {
	return X(e) === q.Number;
}
function Xn(e) {
	return X(e) === q.PropertyAccess;
}
function Zn(e) {
	return X(e) === q.Word;
}
function Qn(e) {
	return X(e) === q.Range;
}
function $n(e) {
	return X(e) === q.FilteredValue;
}
function Y(e) {
	return (X(e) & 5763) > 0;
}
function X(e) {
	return e ? e.kind : -1;
}
function Z(e) {
	let t = Object.create(null);
	return e && Object.assign(t, e), t;
}
var Q = class e {
	constructor(e = {}, t = F, n = {}, { memoryLimit: r, renderLimit: i, liquid: a } = {}) {
		this.scopes = [Z()], this.registers = {}, this.breakCalled = !1, this.continueCalled = !1, this.sync = !!n.sync, this.opts = t, this.globals = n.globals ?? t.globals, this.environments = se(e) ? e : Object(e), this.strictVariables = n.strictVariables ?? this.opts.strictVariables, this.ownPropertyOnly = n.ownPropertyOnly ?? t.ownPropertyOnly, this.memoryLimit = r ?? new mt("memory alloc", n.memoryLimit ?? t.memoryLimit), this.renderLimit = i ?? new mt("template render", Rt().now() + (n.renderLimit ?? t.renderLimit)), this.liquid = a;
	}
	getRegister(e, t = void 0) {
		return this.registers[e] = this.registers[e] || t;
	}
	setRegister(e, t) {
		return this.registers[e] = t;
	}
	saveRegister(...e) {
		return e.map((e) => [e, this.getRegister(e)]);
	}
	restoreRegister(e) {
		return e.forEach(([e, t]) => this.setRegister(e, t));
	}
	getAll() {
		return [
			this.globals,
			this.environments,
			...this.scopes
		].reduce((e, t) => qe(e, t), {});
	}
	get(e) {
		return this.getSync(e);
	}
	getSync(e) {
		return D(this._get(e));
	}
	*_get(e) {
		let t = this.findScope(e[0]);
		return yield this._getFromScope(t, e);
	}
	getFromScope(e, t) {
		return D(this._getFromScope(e, t));
	}
	*_getFromScope(e, t, n = this.strictVariables) {
		a(t) && (t = t.split("."));
		for (let r = 0; r < t.length; r++) if (e = yield this.readProperty(e, t[r]), n && ne(e)) throw new Ce(t.slice(0, r + 1).join("."));
		return e;
	}
	push(e) {
		return this.scopes.push(e);
	}
	pop() {
		return this.scopes.pop();
	}
	bottom() {
		return this.scopes[0];
	}
	spawn(t = {}) {
		return new e(t, this.opts, {
			sync: this.sync,
			globals: this.globals,
			strictVariables: this.strictVariables,
			ownPropertyOnly: this.ownPropertyOnly
		}, {
			renderLimit: this.renderLimit,
			memoryLimit: this.memoryLimit,
			liquid: this.liquid
		});
	}
	findScope(e) {
		for (let t = this.scopes.length - 1; t >= 0; t--) {
			let n = this.scopes[t];
			if (e in n) return n;
		}
		return e in this.environments ? this.environments : this.globals;
	}
	readProperty(e, n) {
		if (e = te(e), n = p(n), h(e)) return e;
		if (g(e) && m(n)) return u(e, n, this.ownPropertyOnly);
		let r = er(e, n, this.ownPropertyOnly);
		return r === void 0 && e instanceof t ? e.liquidMethodMissing(n, this) : o(r) ? r.call(e) : n === "size" ? rr(e) : n === "first" ? tr(e, this.ownPropertyOnly) : n === "last" ? nr(e, this.ownPropertyOnly) : r;
	}
};
function er(e, n, r) {
	if (!(r && !i.call(e, n) && !(e instanceof t))) return e[n];
}
function tr(e, t) {
	return g(e) ? u(e, 0, t) : er(e, "first", t);
}
function nr(e, t) {
	return g(e) ? u(e, -1, t) : er(e, "last", t);
}
function rr(e) {
	if (i.call(e, "size") || e.size !== void 0) return e.size;
	if (g(e) || a(e)) return e.length;
	if (typeof e == "object") return Object.keys(e).length;
}
var $;
(function(e) {
	e[e.OUTPUT = 0] = "OUTPUT", e[e.STORE = 1] = "STORE";
})($ ||= {});
var ir = v(Math.abs), ar = v(Math.max), or = v(Math.min), sr = v(Math.ceil), cr = v((e, t, n = !1) => n ? Math.floor(e / t) : e / t), lr = v(Math.floor), ur = v((e, t) => e - t), dr = v((e, t) => e + t), fr = v((e, t) => (e % t + t) % t), pr = v((e, t) => e * t);
function mr(e, t = 0) {
	e = ee(e), t = ee(t);
	let n = 10 ** t, r = e * n * (1 + 2 ** -52);
	return Math.round(r) / n;
}
var hr = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	abs: ir,
	at_least: ar,
	at_most: or,
	ceil: sr,
	divided_by: cr,
	floor: lr,
	minus: ur,
	plus: dr,
	modulo: fr,
	times: pr,
	round: mr
}), gr = (e) => decodeURIComponent(l(e)).replace(/\+/g, " "), _r = (e) => encodeURIComponent(l(e)).replace(/%20/g, "+"), vr = (e) => encodeURIComponent(l(e)).replace(/%20/g, "+").replace(/[!'()*]/g, (e) => "%" + e.charCodeAt(0).toString(16).toUpperCase()), yr = (e) => encodeURI(l(e)).replace(/%5B/g, "[").replace(/%5D/g, "]"), br = /[^\p{M}\p{L}\p{Nd}]+/gu, xr = {
	raw: /\s+/g,
	default: br,
	pretty: /[^\p{M}\p{L}\p{Nd}._~!$&'()+,;=@]+/gu,
	ascii: /[^A-Za-z0-9]+/g,
	latin: br,
	none: null
};
function Sr(e, t = "default", n = !1) {
	e = l(e);
	let r = xr[t];
	return r && (t === "latin" && (e = Cr(e)), e = e.replace(r, "-").replace(/^-|-$/g, "")), n ? e : e.toLowerCase();
}
function Cr(e) {
	return e.replace(/[àáâãäå]/g, "a").replace(/[æ]/g, "ae").replace(/[ç]/g, "c").replace(/[èéêë]/g, "e").replace(/[ìíîï]/g, "i").replace(/[ð]/g, "d").replace(/[ñ]/g, "n").replace(/[òóôõöø]/g, "o").replace(/[ùúûü]/g, "u").replace(/[ýÿ]/g, "y").replace(/[ß]/g, "ss").replace(/[œ]/g, "oe").replace(/[þ]/g, "th").replace(/[ẞ]/g, "SS").replace(/[Œ]/g, "OE").replace(/[Þ]/g, "TH");
}
var wr = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	url_decode: gr,
	url_encode: _r,
	cgi_escape: vr,
	uri_escape: yr,
	slugify: Sr
}), Tr = ge(function(e, t) {
	let n = f(e), r = h(t) ? " " : l(t), i = r.length * Math.max(n.length - 1, 0);
	for (let e = 0; e < n.length; e++) i += String(n[e]).length;
	return this.context.memoryLimit.use(i), Array.prototype.join.call(n, r);
}), Er = ge(function(e) {
	return re(e) ? u(e, -1, this.context.ownPropertyOnly) : "";
}), Dr = ge(function(e) {
	return re(e) ? u(e, 0, this.context.ownPropertyOnly) : "";
}), Or = ge(function(e) {
	let t = f(e);
	return this.context.memoryLimit.use(t.length), [...t].reverse();
});
function* kr(e, t, n) {
	let r = [], i = f(e);
	this.context.memoryLimit.use(i.length);
	for (let e of i) r.push([e, t ? yield this.context._getFromScope(e, l(t).split("."), !1) : e]);
	return r.sort((e, t) => n(e[1], t[1])).map((e) => e[0]);
}
function* Ar(e, t) {
	return yield* kr.call(this, e, t, me);
}
function* jr(e, t) {
	return yield* kr.call(this, e, t, he);
}
var Mr = (e) => e && e.length || 0;
function* Nr(e, t) {
	let n = [], r = f(e);
	this.context.memoryLimit.use(r.length);
	for (let e of r) n.push(yield this.context._getFromScope(e, l(t), !1));
	return n;
}
function* Pr(e, t) {
	let n = 0, r = f(e);
	for (let e of r) {
		let r = Number(t ? yield this.context._getFromScope(e, l(t), !1) : e);
		n += Number.isNaN(r) ? 0 : r;
	}
	return n;
}
function Fr(e) {
	let t = f(e);
	return this.context.memoryLimit.use(t.length), Array.prototype.filter.call(t, (e) => !h(p(e)));
}
function Ir(e, t = []) {
	let n = f(e), r = f(t);
	return this.context.memoryLimit.use(n.length + r.length), Array.prototype.concat.call(n, r);
}
function Lr(e, t) {
	return Ir.call(this, e, [t]);
}
function Rr(e, t) {
	let n = f(e);
	this.context.memoryLimit.use(n.length);
	let r = [...n];
	return r.unshift(t), r;
}
function zr(e) {
	let t = f(e);
	this.context.memoryLimit.use(t.length);
	let n = [...t];
	return n.pop(), n;
}
function Br(e) {
	let t = f(e);
	this.context.memoryLimit.use(t.length);
	let n = [...t];
	return n.shift(), n;
}
function Vr(e, t, n = 1) {
	return e = p(e), h(e) ? [] : (g(e) || (e = l(e)), t = t < 0 ? e.length + t : t, t < 0 || n < 0 ? g(e) ? [] : "" : (this.context.memoryLimit.use(n), g(e) ? Array.prototype.slice.call(e, t, t + n) : String.prototype.slice.call(e, t, t + n)));
}
function Hr(e) {
	return this.context.opts.jekyllWhere ? (t) => Ie.is(e) ? N(t, e) : g(t) ? Xt(t, e) : N(t, e) : e === void 0 ? (e) => j(e, this.context) : (t) => N(t, e);
}
function* Ur(e, t, n, r) {
	let i = [];
	t = f(t), this.context.memoryLimit.use(t.length);
	let a = new L(l(n)).readScopeValue();
	for (let e of t) i.push(yield A(a, this.context.spawn(e)));
	let o = Hr.call(this, r);
	return Array.prototype.filter.call(t, (t, n) => o(i[n]) === e);
}
function* Wr(e, t, n, r) {
	let i = [], a = new B(l(r), this.liquid), o = f(t);
	this.context.memoryLimit.use(o.length);
	for (let t of o) {
		this.context.push({ [n]: t });
		let r = yield a.value(this.context);
		this.context.pop(), r === e && i.push(t);
	}
	return i;
}
function* Gr(e, t, n) {
	return yield* Ur.call(this, !0, e, t, n);
}
function* Kr(e, t, n) {
	return yield* Ur.call(this, !1, e, t, n);
}
function* qr(e, t, n) {
	return yield* Wr.call(this, !0, e, t, n);
}
function* Jr(e, t, n) {
	return yield* Wr.call(this, !1, e, t, n);
}
function* Yr(e, t) {
	let n = /* @__PURE__ */ new Map();
	e = d(e);
	let r = new L(l(t)).readScopeValue();
	this.context.memoryLimit.use(e.length);
	for (let t of e) {
		let e = yield A(r, this.context.spawn(t));
		n.has(e) || n.set(e, []), n.get(e).push(t);
	}
	return [...n.entries()].map(([e, t]) => ({
		name: e,
		items: t
	}));
}
function* Xr(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = new B(l(n), this.liquid);
	e = d(e), this.context.memoryLimit.use(e.length);
	for (let n of e) {
		this.context.push({ [t]: n });
		let e = yield i.value(this.context);
		this.context.pop(), r.has(e) || r.set(e, []), r.get(e).push(n);
	}
	return [...r.entries()].map(([e, t]) => ({
		name: e,
		items: t
	}));
}
function* Zr(e, t, n) {
	let r = new L(l(t)).readScopeValue(), i = f(e), a = Hr.call(this, n);
	for (let e = 0; e < i.length; e++) if (a(yield A(r, this.context.spawn(i[e])))) return [e, i[e]];
}
function* Qr(e, t, n) {
	let r = new B(l(n), this.liquid), i = f(e);
	for (let e = 0; e < i.length; e++) {
		this.context.push({ [t]: i[e] });
		let n = yield r.value(this.context);
		if (this.context.pop(), n) return [e, i[e]];
	}
}
function* $r(e, t, n) {
	return !!(yield* Zr.call(this, e, t, n));
}
function* ei(e, t, n) {
	return !!(yield* Qr.call(this, e, t, n));
}
function* ti(e, t, n) {
	let r = yield* Zr.call(this, e, t, n);
	return r ? r[0] : void 0;
}
function* ni(e, t, n) {
	let r = yield* Qr.call(this, e, t, n);
	return r ? r[0] : void 0;
}
function* ri(e, t, n) {
	let r = yield* Zr.call(this, e, t, n);
	return r ? r[1] : void 0;
}
function* ii(e, t, n) {
	let r = yield* Qr.call(this, e, t, n);
	return r ? r[1] : void 0;
}
function ai(e) {
	return e = f(e), this.context.memoryLimit.use(e.length), [...new Set(e)];
}
function oi(e, t = 1) {
	if (e = p(e), h(e)) return [];
	g(e) || (e = l(e)), this.context.memoryLimit.use(e.length);
	let n = [...e].sort(() => Math.random() - .5);
	return t === 1 ? n[0] : n.slice(0, t);
}
var si = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	join: Tr,
	last: Er,
	first: Dr,
	reverse: Or,
	sort: Ar,
	sort_natural: jr,
	size: Mr,
	map: Nr,
	sum: Pr,
	compact: Fr,
	concat: Ir,
	push: Lr,
	unshift: Rr,
	pop: zr,
	shift: Br,
	slice: Vr,
	where: Gr,
	reject: Kr,
	where_exp: qr,
	reject_exp: Jr,
	group_by: Yr,
	group_by_exp: Xr,
	has: $r,
	has_exp: ei,
	find_index: ti,
	find_index_exp: ni,
	find: ri,
	find_exp: ii,
	uniq: ai,
	sample: oi
});
function ci(e, t, n) {
	let r = (e?.length ?? 0) + (n?.length ?? 0);
	this.context.memoryLimit.use(r);
	let i = mi(e, this.context.opts, n);
	return i ? (t = p(t), t = h(t) ? this.context.opts.dateFormat : l(t), this.context.memoryLimit.use(t.length), O(i, t, this.context.memoryLimit)) : e;
}
function li(e) {
	return ci.call(this, e, "%Y-%m-%dT%H:%M:%S%:z");
}
function ui(e) {
	return ci.call(this, e, "%a, %d %b %Y %H:%M:%S %z");
}
function di(e, t, n) {
	return pi.call(this, e, "%b", t, n);
}
function fi(e, t, n) {
	return pi.call(this, e, "%B", t, n);
}
function pi(e, t, n, r) {
	let i = mi(e, this.context.opts);
	if (!i) return e;
	let a = this.context.memoryLimit;
	if (n === "ordinal") {
		let e = i.getDate();
		return r === "US" ? O(i, `${t} ${e}%q, %Y`, a) : O(i, `${e}%q ${t} %Y`, a);
	}
	return O(i, `%d ${t} %Y`, a);
}
function mi(e, t, n) {
	let r, i = n ?? t.timezoneOffset, o = t.locale;
	if (e = p(e), !h(e)) return r = e === "now" || e === "today" ? new k(Date.now(), o, i) : m(e) ? new k(e * 1e3, o, i) : a(e) ? /^\d+$/.test(e) ? new k(e * 1e3, o, i) : t.preserveTimezones && n === void 0 ? k.createDateFixedToTimezone(e, o) : new k(e, o, i) : new k(e, o, i), r.valid() ? r : void 0;
}
var hi = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	date: ci,
	date_to_xmlschema: li,
	date_to_rfc822: ui,
	date_to_string: di,
	date_to_long_string: fi
}), gi = /[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/gu, _i = /[^\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\s]+/gu;
function vi(e, t) {
	C(arguments.length === 2, "append expect 2 arguments");
	let n = l(e), r = l(t);
	return this.context.memoryLimit.use(n.length + r.length), n + r;
}
function yi(e, t) {
	C(arguments.length === 2, "prepend expect 2 arguments");
	let n = l(e), r = l(t);
	return this.context.memoryLimit.use(n.length + r.length), r + n;
}
function bi(e, t) {
	let n = l(e);
	if (this.context.memoryLimit.use(n.length), t) {
		t = l(t), this.context.memoryLimit.use(t.length);
		for (let e = 0, r = new Set(t); e < n.length; e++) if (!r.has(n[e])) return n.slice(e);
		return "";
	}
	return n.trimStart();
}
function xi(e) {
	let t = l(e);
	return this.context.memoryLimit.use(t.length), t.toLowerCase();
}
function Si(e) {
	let t = l(e);
	return this.context.memoryLimit.use(t.length), l(t).toUpperCase();
}
function Ci(e, t) {
	let n = l(e);
	return t = l(t), this.context.memoryLimit.use(n.length + t.length), n.split(t).join("");
}
function wi(e, t) {
	let n = l(e);
	return t = l(t), this.context.memoryLimit.use(n.length + t.length), n.replace(t, "");
}
function Ti(e, t) {
	let n = l(e), r = l(t);
	this.context.memoryLimit.use(n.length + r.length);
	let i = n.lastIndexOf(r);
	return i === -1 ? n : n.substring(0, i) + n.substring(i + r.length);
}
function Ei(e, t) {
	if (e = l(e), this.context.memoryLimit.use(e.length), t) {
		t = l(t), this.context.memoryLimit.use(t.length);
		for (let n = e.length - 1, r = new Set(t); n >= 0; n--) if (!r.has(e[n])) return e.slice(0, n + 1);
		return "";
	}
	return e.trimEnd();
}
function Di(e, t) {
	let n = l(e);
	this.context.memoryLimit.use(n.length);
	let r = n.split(l(t));
	for (; r.length && r[r.length - 1] === "";) r.pop();
	return r;
}
function Oi(e, t) {
	let n = l(e);
	if (this.context.memoryLimit.use(n.length), t) {
		let e = new Set(l(t));
		this.context.memoryLimit.use(e.size);
		let r = 0, i = n.length - 1;
		for (; e.has(n[r]);) r++;
		for (; i >= r && e.has(n[i]);) i--;
		return n.slice(r, i + 1);
	}
	return n.trim();
}
function ki(e) {
	let t = l(e);
	return this.context.memoryLimit.use(t.length), t.replace(/\r?\n/gm, "");
}
function Ai(e) {
	return e = l(e), this.context.memoryLimit.use(e.length), e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
}
function ji(e, t, n) {
	let r = l(e);
	t = l(t), n = l(n);
	let i = r.split(t), a = r.length + (i.length - 1) * (n.length - t.length);
	return this.context.memoryLimit.use(a), i.join(n);
}
function Mi(e, t, n) {
	let r = l(e);
	return t = l(t), n = l(n), this.context.memoryLimit.use(r.length + t.length + n.length), r.replace(t, () => n);
}
function Ni(e, t, n) {
	let r = l(e), i = l(t), a = l(n);
	this.context.memoryLimit.use(r.length + i.length + a.length);
	let o = r.lastIndexOf(i);
	return o === -1 ? r : r.substring(0, o) + a + r.substring(o + i.length);
}
function Pi(e, t = 50, n = "...") {
	let r = l(e);
	return n = l(n), this.context.memoryLimit.use(r.length + n.length), r.length <= t ? e : r.substring(0, t - n.length) + n;
}
function Fi(e, t = 15, n = "...") {
	let r = l(e);
	n = l(n), this.context.memoryLimit.use(r.length + n.length);
	let i = r.split(/\s+/);
	t <= 0 && (t = 1);
	let a = i.slice(0, t).join(" ");
	return i.length >= t && (a += n), a;
}
function Ii(e) {
	let t = l(e);
	return this.context.memoryLimit.use(t.length), t.replace(/\s+/g, " ");
}
function Li(e, t) {
	let n = l(e);
	if (this.context.memoryLimit.use(n.length), e = n.trim(), !e) return 0;
	switch (t) {
		case "cjk": return (e.match(gi) || []).length + (e.match(_i) || []).length;
		case "auto": return gi.test(e) ? e.match(gi).length + (e.match(_i) || []).length : e.split(/\s+/).length;
		default: return e.split(/\s+/).length;
	}
}
function Ri(e, t = "and") {
	t = l(t);
	let n = t.length + e.length * 2;
	for (let t = 0; t < e.length; t++) n += l(e[t]).length;
	switch (this.context.memoryLimit.use(n), e.length) {
		case 0: return "";
		case 1: return e[0];
		case 2: return `${e[0]} ${t} ${e[1]}`;
		default: return `${e.slice(0, -1).join(", ")}, ${t} ${e[e.length - 1]}`;
	}
}
var zi = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	append: vi,
	prepend: yi,
	lstrip: bi,
	downcase: xi,
	upcase: Si,
	remove: Ci,
	remove_first: wi,
	remove_last: Ti,
	rstrip: Ei,
	split: Di,
	strip: Oi,
	strip_newlines: ki,
	capitalize: Ai,
	replace: ji,
	replace_first: Mi,
	replace_last: Ni,
	truncate: Pi,
	truncatewords: Fi,
	normalize_whitespace: Ii,
	number_of_words: Li,
	array_to_sentence_string: Ri
});
function Bi(e) {
	return btoa(String.fromCharCode(...new TextEncoder().encode(e)));
}
function Vi(e) {
	return new TextDecoder().decode(Uint8Array.from(atob(e), (e) => e.charCodeAt(0)));
}
function Hi(e) {
	if (typeof Buffer < "u" && Buffer.isBuffer(e)) return this.context.memoryLimit.use(e.byteLength), e.toString("base64");
	let t = l(e);
	return this.context.memoryLimit.use(t.length), Bi(t);
}
function Ui(e) {
	let t = l(e);
	return this.context.memoryLimit.use(t.length), Vi(t);
}
var Wi = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	base64_encode: Hi,
	base64_decode: Ui
});
function Gi(e) {
	let t = new Uint8Array(e), n = "";
	for (let e = 0; e < t.length; e++) n += t[e].toString(16).padStart(2, "0");
	return n;
}
function Ki(e) {
	return T(this, void 0, void 0, function* () {
		let t = new TextEncoder().encode(e);
		return Gi(yield crypto.subtle.digest("SHA-256", t));
	});
}
function qi(e, t) {
	return T(this, void 0, void 0, function* () {
		let n = new TextEncoder(), r = yield crypto.subtle.importKey("raw", n.encode(t), {
			name: "HMAC",
			hash: "SHA-256"
		}, !1, ["sign"]);
		return Gi(yield crypto.subtle.sign("HMAC", r, n.encode(e)));
	});
}
function Ji(e) {
	let t = l(e);
	return this.context.memoryLimit.use(t.length), Ki(t);
}
function Yi(e, t) {
	let n = l(e), r = l(t);
	return this.context.memoryLimit.use(n.length + r.length), qi(n, r);
}
var Xi = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	sha256: Ji,
	hmac_sha256: Yi
}), Zi = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, xn), hr), wr), si), hi), zi), Wi), Xi), pn), Qi = class extends R {
	constructor(e, t, n) {
		super(e, t, n), this.identifier = this.tokenizer.readIdentifier(), this.key = this.identifier.content, this.tokenizer.assert(this.key, "expected variable name"), this.tokenizer.skipBlank(), this.tokenizer.assert(this.tokenizer.peek() === "=", "expected \"=\""), this.tokenizer.advance(), this.value = new B(this.tokenizer.readFilteredValue(), this.liquid);
	}
	*render(e) {
		e.bottom()[this.key] = yield this.value.value(e, this.liquid.options.lenientIf);
	}
	*arguments() {
		yield this.value;
	}
	*localScope() {
		yield this.identifier;
	}
}, $i = [
	"offset",
	"limit",
	"reversed"
], ea = class extends R {
	constructor(e, t, n, r) {
		super(e, t, n);
		let i = this.tokenizer.readIdentifier(), a = this.tokenizer.readIdentifier(), o = this.tokenizer.readValue();
		if (!i.size() || a.content !== "in" || !o) throw Error(`illegal tag: ${e.getText()}`);
		this.variable = i.content, this.collection = o, this.hash = new z(this.tokenizer, n.options.keyValueSeparator), this.templates = [], this.elseTemplates = [];
		let s, c = r.parseStream(t).on("start", () => s = this.templates).on("tag:else", (e) => {
			Pe(e.args), s = this.elseTemplates;
		}).on("tag:endfor", (e) => {
			Pe(e.args), c.stop();
		}).on("template", (e) => s.push(e)).on("end", () => {
			throw Error(`tag ${e.getText()} not closed`);
		});
		c.start();
	}
	*render(e, t) {
		let n = this.liquid.renderer, r = d(yield A(this.collection, e));
		if (!r.length) {
			yield n.renderTemplates(this.elseTemplates, e, t);
			return;
		}
		let i = "continue-" + this.variable + "-" + this.collection.getText();
		e.push(Z({ continue: e.getRegister(i, {}) }));
		let a = yield this.hash.render(e);
		e.pop(), r = (this.liquid.options.orderedFilterParameters ? Object.keys(a).filter((e) => $i.includes(e)) : $i.filter((e) => a[e] !== void 0)).reduce((e, t) => t === "offset" ? na(e, a.offset) : t === "limit" ? ra(e, a.limit) : ta(e), r), e.setRegister(i, (a.offset || 0) + r.length);
		let o = Z({ forloop: new Re(r.length, this.collection.getText(), this.variable) });
		e.push(o);
		for (let i of r) {
			if (o[this.variable] = i, e.continueCalled = e.breakCalled = !1, yield n.renderTemplates(this.templates, e, t), e.breakCalled) break;
			o.forloop.next();
		}
		e.continueCalled = e.breakCalled = !1, e.pop();
	}
	*children() {
		let e = this.templates.slice();
		return this.elseTemplates && e.push(...this.elseTemplates), e;
	}
	*arguments() {
		yield this.collection;
		for (let e of Object.values(this.hash.hash)) Y(e) && (yield e);
	}
	blockScope() {
		return [this.variable, "forloop"];
	}
};
function ta(e) {
	return [...e].reverse();
}
function na(e, t) {
	return e.slice(t);
}
function ra(e, t) {
	return e.slice(0, t);
}
var ia = class extends R {
	constructor(e, t, n, r) {
		for (super(e, t, n), this.templates = [], this.identifier = this.readVariable(), this.variable = this.identifier.content; t.length;) {
			let e = t.shift();
			if (J(e) && e.name === "endcapture") return;
			this.templates.push(r.parseToken(e, t));
		}
		throw Error(`tag ${e.getText()} not closed`);
	}
	readVariable() {
		let e = this.tokenizer.readIdentifier();
		if (e.content || (e = this.tokenizer.readQuoted(), e)) return e;
		throw this.tokenizer.error("invalid capture name");
	}
	*render(e) {
		let t = yield this.liquid.renderer.renderTemplates(this.templates, e);
		e.bottom()[this.variable] = t;
	}
	*children() {
		return this.templates;
	}
	*localScope() {
		yield this.identifier;
	}
}, aa = class extends R {
	constructor(e, t, n, r) {
		super(e, t, n), this.branches = [], this.elseTemplates = [], this.value = new B(this.tokenizer.readFilteredValue(), this.liquid), this.elseTemplates = [];
		let i = [], a = 0, o = r.parseStream(t).on("tag:when", (e) => {
			if (a > 0) return;
			i = [];
			let t = [];
			for (; !e.tokenizer.end();) t.push(e.tokenizer.readValueOrThrow()), e.tokenizer.skipBlank(), e.tokenizer.peek() === "," ? e.tokenizer.readTo(",") : e.tokenizer.readTo("or");
			this.branches.push({
				values: t,
				templates: i
			});
		}).on("tag:else", () => {
			a++, i = this.elseTemplates;
		}).on("tag:endcase", () => o.stop()).on("template", (e) => {
			(i !== this.elseTemplates || a === 1) && i.push(e);
		}).on("end", () => {
			throw Error(`tag ${e.getText()} not closed`);
		});
		o.start();
	}
	*render(e, t) {
		let n = this.liquid.renderer, r = p(yield this.value.value(e, e.opts.lenientIf)), i = !1;
		for (let a of this.branches) for (let o of a.values) if (N(r, yield A(o, e, e.opts.lenientIf))) {
			yield n.renderTemplates(a.templates, e, t), i = !0;
			break;
		}
		i || (yield n.renderTemplates(this.elseTemplates, e, t));
	}
	*arguments() {
		yield this.value, yield* this.branches.flatMap((e) => e.values);
	}
	*children() {
		let e = this.branches.flatMap((e) => e.templates);
		return this.elseTemplates && e.push(...this.elseTemplates), e;
	}
}, oa = class extends R {
	constructor(e, t, n) {
		for (super(e, t, n); t.length;) {
			let e = t.shift();
			if (J(e) && e.name === "endcomment") return;
		}
		throw Error(`tag ${e.getText()} not closed`);
	}
	render() {}
}, sa = class extends R {
	constructor(e, t, n, r) {
		super(e, t, n);
		let i = this.tokenizer;
		for (this.file = ca(i, this.liquid, r), this.currentFile = e.file; !i.end();) {
			i.skipBlank();
			let e = i.p, t = i.readIdentifier();
			if ((t.content === "with" || t.content === "for") && (i.skipBlank(), i.peek() !== ":")) {
				let e = i.readValue();
				if (e) {
					let n = i.p, r = i.readIdentifier(), a;
					r.content === "as" ? a = i.readIdentifier() : i.p = n;
					let o = {
						value: e,
						alias: a && a.content
					};
					t.content === "with" ? this.with = o : this.forBinding = o, i.skipBlank(), i.peek() === "," && i.advance();
					continue;
				}
			}
			i.p = e;
			break;
		}
		this.hash = new z(i, n.options.keyValueSeparator);
	}
	*render(e, t) {
		let { liquid: n, hash: r } = this, i = yield ua(this.file, e, n);
		C(i, () => `illegal file path "${i}"`);
		let a = e.spawn(), o = a.bottom();
		if (qe(o, yield r.render(e)), this.with) {
			let { value: t, alias: n } = this.with;
			o[n || i] = yield A(t, e);
		}
		if (this.forBinding) {
			let { value: r, alias: s } = this.forBinding, c = d(yield A(r, e));
			o.forloop = new Re(c.length, r.getText(), s);
			for (let e of c) {
				o[s] = e;
				let r = yield n._parsePartialFile(i, a.sync, this.currentFile);
				yield n.renderer.renderTemplates(r, a, t), o.forloop.next();
			}
		} else {
			let e = yield n._parsePartialFile(i, a.sync, this.currentFile);
			yield n.renderer.renderTemplates(e, a, t);
		}
	}
	*children(e, t) {
		return e && a(this.file) ? yield this.liquid._parsePartialFile(this.file, t, this.currentFile) : [];
	}
	partialScope() {
		if (a(this.file)) {
			let e = Object.keys(this.hash.hash);
			if (this.with) {
				let { value: t, alias: n } = this.with;
				a(n) ? e.push([n, t]) : a(this.file) && e.push([this.file, t]);
			}
			if (this.forBinding) {
				let { value: t, alias: n } = this.forBinding;
				a(n) ? e.push([n, t]) : a(this.file) && e.push([this.file, t]);
			}
			return {
				name: this.file,
				isolated: !0,
				scope: e
			};
		}
	}
	*arguments() {
		for (let e of Object.values(this.hash.hash)) Y(e) && (yield e);
		if (this.with) {
			let { value: e } = this.with;
			Y(e) && (yield e);
		}
		if (this.forBinding) {
			let { value: e } = this.forBinding;
			Y(e) && (yield e);
		}
	}
};
function ca(e, t, n) {
	if (t.options.dynamicPartials) {
		let t = e.readValue();
		return e.assert(t, "illegal file path"), t.getText() === "none" ? void 0 : Jn(t) ? la(n.parse(Gt(t))) : t;
	}
	let r = [...e.readFileNameTemplate(t.options)], i = la(n.parseTokens(r));
	return i === "none" ? void 0 : i;
}
function la(e) {
	return e.length === 1 && Kn(e[0].token) ? e[0].token.getContent() : e;
}
function* ua(e, t, n) {
	return typeof e == "string" ? e : Array.isArray(e) ? n.renderer.renderTemplates(e, t) : yield A(e, t);
}
var da = class extends R {
	constructor(e, t, n, r) {
		super(e, t, n);
		let { tokenizer: i } = e;
		this.file = ca(i, this.liquid, r), this.currentFile = e.file;
		let a = i.p;
		i.readIdentifier().content === "with" ? (i.skipBlank(), i.peek() === ":" ? i.p = a : this.withVar = i.readValue()) : i.p = a, this.hash = new z(i, n.options.jekyllInclude || n.options.keyValueSeparator);
	}
	*render(e, t) {
		let { liquid: n, hash: r, withVar: i } = this, { renderer: a } = n, o = yield ua(this.file, e, n);
		C(o, () => `illegal file path "${o}"`);
		let s = e.saveRegister("blocks", "blockMode");
		e.setRegister("blocks", {}), e.setRegister("blockMode", $.OUTPUT);
		let c = Z(yield r.render(e));
		i && (c[o] = yield A(i, e));
		let l = yield n._parsePartialFile(o, e.sync, this.currentFile);
		e.push(e.opts.jekyllInclude ? Z({ include: c }) : c), yield a.renderTemplates(l, e, t), e.pop(), e.restoreRegister(s);
	}
	*children(e, t) {
		return e && a(this.file) ? yield this.liquid._parsePartialFile(this.file, t, this.currentFile) : [];
	}
	partialScope() {
		if (a(this.file)) {
			let e;
			return this.liquid.options.jekyllInclude ? e = ["include"] : (e = Object.keys(this.hash.hash), this.withVar && e.push([this.file, this.withVar])), {
				name: this.file,
				isolated: !1,
				scope: e
			};
		}
	}
	*arguments() {
		yield* Object.values(this.hash.hash).filter(Y), Y(this.file) && (yield this.file), Y(this.withVar) && (yield this.withVar);
	}
}, fa = class extends R {
	constructor(e, t, n) {
		super(e, t, n), this.identifier = this.tokenizer.readIdentifier(), this.variable = this.identifier.content;
	}
	render(e, t) {
		let n = e.environments;
		m(n[this.variable]) || (n[this.variable] = 0), t.write(l(--n[this.variable]));
	}
	*localScope() {
		yield this.identifier;
	}
}, pa = class extends R {
	constructor(e, t, n) {
		super(e, t, n), this.candidates = [];
		let r = this.tokenizer.readValue();
		for (this.tokenizer.skipBlank(), r && (this.tokenizer.peek() === ":" ? (this.group = r, this.tokenizer.advance()) : this.candidates.push(r)); !this.tokenizer.end();) {
			let e = this.tokenizer.readValue();
			e && this.candidates.push(e), this.tokenizer.readTo(",");
		}
		this.tokenizer.assert(this.candidates.length, () => `empty candidates: "${e.getText()}"`);
	}
	*render(e, t) {
		let n = `cycle:${yield A(this.group, e)}:` + this.candidates.join(","), r = e.getRegister("cycle", {}), i = r[n];
		i === void 0 && (i = r[n] = 0);
		let a = this.candidates[i];
		return i = (i + 1) % this.candidates.length, r[n] = i, yield A(a, e);
	}
	*arguments() {
		yield* this.candidates, this.group && (yield this.group);
	}
}, ma = class extends R {
	constructor(e, t, n, r) {
		super(e, t, n), this.branches = [];
		let i = [];
		r.parseStream(t).on("start", () => this.branches.push({
			value: new B(e.tokenizer.readFilteredValue(), this.liquid),
			templates: i = []
		})).on("tag:elsif", (e) => {
			C(!this.elseTemplates, "unexpected elsif after else"), this.branches.push({
				value: new B(e.tokenizer.readFilteredValue(), this.liquid),
				templates: i = []
			});
		}).on("tag:else", (e) => {
			Pe(e.args), C(!this.elseTemplates, "duplicated else"), i = this.elseTemplates = [];
		}).on("tag:endif", function(e) {
			Pe(e.args), this.stop();
		}).on("template", (e) => i.push(e)).on("end", () => {
			throw Error(`tag ${e.getText()} not closed`);
		}).start();
	}
	*render(e, t) {
		let n = this.liquid.renderer;
		for (let { value: r, templates: i } of this.branches) if (j(yield r.value(e, e.opts.lenientIf), e)) {
			yield n.renderTemplates(i, e, t);
			return;
		}
		yield n.renderTemplates(this.elseTemplates || [], e, t);
	}
	*children() {
		let e = this.branches.flatMap((e) => e.templates);
		return this.elseTemplates && e.push(...this.elseTemplates), e;
	}
	arguments() {
		return this.branches.map((e) => e.value);
	}
}, ha = class extends R {
	constructor(e, t, n) {
		super(e, t, n), this.identifier = this.tokenizer.readIdentifier(), this.variable = this.identifier.content;
	}
	render(e, t) {
		let n = e.environments;
		m(n[this.variable]) || (n[this.variable] = 0);
		let r = n[this.variable];
		n[this.variable]++, t.write(l(r));
	}
	*localScope() {
		yield this.identifier;
	}
}, ga = class extends R {
	constructor(e, t, n, r) {
		super(e, t, n), this.file = ca(this.tokenizer, this.liquid, r), this.currentFile = e.file, this.args = new z(this.tokenizer, n.options.keyValueSeparator), this.templates = r.parseTokens(t);
	}
	*render(e, t) {
		let { liquid: n, args: r, file: i } = this, { renderer: a } = n;
		if (i === void 0) {
			e.setRegister("blockMode", $.OUTPUT), yield a.renderTemplates(this.templates, e, t);
			return;
		}
		let o = yield ua(this.file, e, n);
		C(o, () => `illegal file path "${o}"`);
		let s = yield n._parseLayoutFile(o, e.sync, this.currentFile);
		e.setRegister("blockMode", $.STORE);
		let c = yield a.renderTemplates(this.templates, e), l = e.getRegister("blocks", {});
		l[""] === void 0 && (l[""] = (e, t) => t.write(c)), e.setRegister("blockMode", $.OUTPUT), e.push(Z(yield r.render(e))), yield a.renderTemplates(s, e, t), e.pop();
	}
	*children(e) {
		let t = this.templates.slice();
		return e && a(this.file) && t.push(...yield this.liquid._parsePartialFile(this.file, !0, this.currentFile)), t;
	}
	*arguments() {
		for (let e of Object.values(this.args.hash)) Y(e) && (yield e);
		Y(this.file) && (yield this.file);
	}
	partialScope() {
		if (a(this.file)) return {
			name: this.file,
			isolated: !1,
			scope: Object.keys(this.args.hash)
		};
	}
}, _a = class extends R {
	constructor(e, t, n, r) {
		super(e, t, n), this.templates = [];
		let i = /\w+/.exec(e.args);
		for (this.block = i ? i[0] : ""; t.length;) {
			let e = t.shift();
			if (J(e) && e.name === "endblock") return;
			let n = r.parseToken(e, t);
			this.templates.push(n);
		}
		throw Error(`tag ${e.getText()} not closed`);
	}
	*render(e, t) {
		let n = this.getBlockRender(e);
		e.getRegister("blockMode") === $.STORE ? e.getRegister("blocks", {})[this.block] = n : yield n(new He(), t);
	}
	getBlockRender(e) {
		let t = this, { liquid: n, templates: r } = this, i = e.getRegister("blocks", {})[this.block], a = function* (i, a) {
			let o = e.getRegister("blockStack", []);
			if (o.includes(t)) throw Error("block tag cannot be nested");
			o.push(t), e.push(Z({ block: i })), yield n.renderer.renderTemplates(r, e, a), e.pop(), o.pop();
		};
		return i ? (e, t) => i(new He((t) => a(e, t)), t) : a;
	}
	*children() {
		return this.templates;
	}
	blockScope() {
		return ["block"];
	}
}, va = class extends R {
	constructor(e, t, n) {
		for (super(e, t, n), this.tokens = []; t.length;) {
			let e = t.shift();
			if (J(e) && e.name === "endraw") return;
			this.tokens.push(e);
		}
		throw Error(`tag ${e.getText()} not closed`);
	}
	render() {
		return this.tokens.map((e) => e.getText()).join("");
	}
}, ya = class extends Re {
	constructor(e, t, n, r) {
		super(e, n, r), this.length = e, this.cols = t;
	}
	row() {
		return Math.floor(this.i / this.cols) + 1;
	}
	col0() {
		return this.i % this.cols;
	}
	col() {
		return this.col0() + 1;
	}
	col_first() {
		return this.col0() === 0;
	}
	col_last() {
		return this.col() === this.cols;
	}
}, ba = {
	assign: Qi,
	for: ea,
	capture: ia,
	case: aa,
	comment: oa,
	include: da,
	render: sa,
	decrement: fa,
	increment: ha,
	cycle: pa,
	if: ma,
	layout: ga,
	block: _a,
	raw: va,
	tablerow: class extends R {
		constructor(e, t, n, r) {
			super(e, t, n);
			let i = this.tokenizer.readIdentifier();
			this.tokenizer.skipBlank();
			let a = this.tokenizer.readIdentifier(), o = this.tokenizer.readValue();
			if (a.content !== "in" || !o) throw Error(`illegal tag: ${e.getText()}`);
			this.variable = i.content, this.collection = o, this.args = new z(this.tokenizer, n.options.keyValueSeparator), this.templates = [];
			let s, c = r.parseStream(t).on("start", () => s = this.templates).on("tag:endtablerow", () => c.stop()).on("template", (e) => s.push(e)).on("end", () => {
				throw Error(`tag ${e.getText()} not closed`);
			});
			c.start();
		}
		*render(e, t) {
			let n = d(yield A(this.collection, e)), r = yield this.args.render(e), i = r.offset || 0;
			n = n.slice(i, i + (r.limit === void 0 ? n.length : r.limit));
			let a = r.cols || n.length, o = this.liquid.renderer, s = new ya(n.length, a, this.collection.getText(), this.variable), c = Z({ tablerowloop: s });
			e.push(c);
			for (let r = 0; r < n.length; r++, s.next()) c[this.variable] = n[r], s.col0() === 0 && (s.row() !== 1 && t.write("</tr>"), t.write(`<tr class="row${s.row()}">`)), t.write(`<td class="col${s.col()}">`), yield o.renderTemplates(this.templates, e, t), t.write("</td>");
			n.length && t.write("</tr>"), e.pop();
		}
		*children() {
			return this.templates;
		}
		*arguments() {
			yield this.collection;
			for (let e of Object.values(this.args.hash)) Y(e) && (yield e);
		}
		blockScope() {
			return [this.variable, "tablerowloop"];
		}
	},
	unless: class extends R {
		constructor(e, t, n, r) {
			super(e, t, n), this.branches = [], this.elseTemplates = [];
			let i = [], a = 0;
			r.parseStream(t).on("start", () => this.branches.push({
				value: new B(e.tokenizer.readFilteredValue(), this.liquid),
				test: M,
				templates: i = []
			})).on("tag:elsif", (e) => {
				if (a > 0) {
					i = [];
					return;
				}
				this.branches.push({
					value: new B(e.tokenizer.readFilteredValue(), this.liquid),
					test: j,
					templates: i = []
				});
			}).on("tag:else", () => {
				a++, i = this.elseTemplates;
			}).on("tag:endunless", function() {
				this.stop();
			}).on("template", (e) => {
				(i !== this.elseTemplates || a === 1) && i.push(e);
			}).on("end", () => {
				throw Error(`tag ${e.getText()} not closed`);
			}).start();
		}
		*render(e, t) {
			let n = this.liquid.renderer;
			for (let { value: r, test: i, templates: a } of this.branches) if (i(yield r.value(e, e.opts.lenientIf), e)) {
				yield n.renderTemplates(a, e, t);
				return;
			}
			yield n.renderTemplates(this.elseTemplates, e, t);
		}
		*children() {
			let e = this.branches.flatMap((e) => e.templates);
			return this.elseTemplates && e.push(...this.elseTemplates), e;
		}
		arguments() {
			return this.branches.map((e) => e.value);
		}
	},
	break: class extends R {
		render(e, t) {
			e.breakCalled = !0;
		}
	},
	continue: class extends R {
		render(e, t) {
			e.continueCalled = !0;
		}
	},
	echo: class extends R {
		constructor(e, t, n) {
			super(e, t, n), this.tokenizer.skipBlank(), this.tokenizer.end() || (this.value = new B(this.tokenizer.readFilteredValue(), this.liquid));
		}
		*render(e, t) {
			if (!this.value) return;
			let n = yield this.value.value(e, !1);
			t.write(n);
		}
		*arguments() {
			this.value && (yield this.value);
		}
	},
	liquid: class extends R {
		constructor(e, t, n, r) {
			super(e, t, n);
			let i = this.tokenizer.readLiquidTagTokens(this.liquid.options);
			this.templates = r.parseTokens(i);
		}
		*render(e, t) {
			yield this.liquid.renderer.renderTemplates(this.templates, e, t);
		}
		*children() {
			return this.templates;
		}
	},
	"#": class extends R {
		constructor(e, t, n) {
			if (super(e, t, n), e.args.search(/\n\s*[^#\s]/g) !== -1) throw Error("every line of an inline comment must start with a '#' character");
		}
		render() {}
	}
}, xa = class e {
	constructor(e = {}) {
		this.renderer = new zt(), this.filters = Object.create(null), this.tags = Object.create(null), this.options = Cn(e), this.parser = new K(this), ae(ba, (e, t) => this.registerTag(t, e)), ae(Zi, (e, t) => this.registerFilter(t, e));
	}
	parse(e, t) {
		return new K(this).parse(e, t);
	}
	_render(e, t, n) {
		let r = t instanceof Q ? t : new Q(t, this.options, n, { liquid: this });
		return this.renderer.renderTemplates(e, r);
	}
	render(e, t, n) {
		return T(this, void 0, void 0, function* () {
			return E(this._render(e, t, Object.assign(Object.assign({}, n), { sync: !1 })));
		});
	}
	renderSync(e, t, n) {
		return D(this._render(e, t, Object.assign(Object.assign({}, n), { sync: !0 })));
	}
	renderToNodeStream(e, t, n = {}) {
		let r = new Q(t, this.options, n, { liquid: this });
		return this.renderer.renderTemplatesToNodeStream(e, r);
	}
	_parseAndRender(e, t, n) {
		let r = this.parse(e);
		return this._render(r, t, n);
	}
	parseAndRender(e, t, n) {
		return T(this, void 0, void 0, function* () {
			return E(this._parseAndRender(e, t, Object.assign(Object.assign({}, n), { sync: !1 })));
		});
	}
	parseAndRenderSync(e, t, n) {
		return D(this._parseAndRender(e, t, Object.assign(Object.assign({}, n), { sync: !0 })));
	}
	_parsePartialFile(e, t, n) {
		return new K(this).parseFile(e, t, G.Partials, n);
	}
	_parseLayoutFile(e, t, n) {
		return new K(this).parseFile(e, t, G.Layouts, n);
	}
	_parseFile(e, t, n, r) {
		return new K(this).parseFile(e, t, n, r);
	}
	parseFile(e, t) {
		return T(this, void 0, void 0, function* () {
			return E(new K(this).parseFile(e, !1, t));
		});
	}
	parseFileSync(e, t) {
		return D(new K(this).parseFile(e, !0, t));
	}
	*_renderFile(e, t, n) {
		let r = yield this._parseFile(e, n.sync, n.lookupType);
		return yield this._render(r, t, n);
	}
	renderFile(e, t, n) {
		return T(this, void 0, void 0, function* () {
			return E(this._renderFile(e, t, Object.assign(Object.assign({}, n), { sync: !1 })));
		});
	}
	renderFileSync(e, t, n) {
		return D(this._renderFile(e, t, Object.assign(Object.assign({}, n), { sync: !0 })));
	}
	renderFileToNodeStream(e, t, n) {
		return T(this, void 0, void 0, function* () {
			let r = yield this.parseFile(e);
			return this.renderToNodeStream(r, t, n);
		});
	}
	_evalValue(e, t) {
		let n = new B(e, this), r = t instanceof Q ? t : new Q(t, this.options, {}, { liquid: this });
		return n.value(r);
	}
	evalValue(e, t) {
		return T(this, void 0, void 0, function* () {
			return E(this._evalValue(e, t));
		});
	}
	evalValueSync(e, t) {
		return D(this._evalValue(e, t));
	}
	registerFilter(e, t) {
		this.filters[e] = t;
	}
	registerTag(e, t) {
		this.tags[e] = o(t) ? t : An(t);
	}
	plugin(t) {
		return t.call(this, e);
	}
	express() {
		let e = this, t = !0;
		return function(n, r, i) {
			if (t) {
				t = !1;
				let n = I(this.root);
				e.options.root.unshift(...n), e.options.layouts.unshift(...n), e.options.partials.unshift(...n);
			}
			e.renderFile(n, r).then((e) => i(null, e), i);
		};
	}
	analyze(e, t = {}) {
		return T(this, void 0, void 0, function* () {
			return H(e, t);
		});
	}
	analyzeSync(e, t = {}) {
		return U(e, t);
	}
	parseAndAnalyze(e, t, n = {}) {
		return T(this, void 0, void 0, function* () {
			return H(this.parse(e, t), n);
		});
	}
	parseAndAnalyzeSync(e, t, n = {}) {
		return U(this.parse(e, t), n);
	}
	variables(e, t = {}) {
		return T(this, void 0, void 0, function* () {
			let n = yield H(a(e) ? this.parse(e) : e, t);
			return Object.keys(n.variables);
		});
	}
	variablesSync(e, t = {}) {
		let n = U(a(e) ? this.parse(e) : e, t);
		return Object.keys(n.variables);
	}
	fullVariables(e, t = {}) {
		return T(this, void 0, void 0, function* () {
			let n = yield H(a(e) ? this.parse(e) : e, t);
			return Array.from(new Set(Object.values(n.variables).flatMap((e) => e.map((e) => String(e)))));
		});
	}
	fullVariablesSync(e, t = {}) {
		let n = U(a(e) ? this.parse(e) : e, t);
		return Array.from(new Set(Object.values(n.variables).flatMap((e) => e.map((e) => String(e)))));
	}
	variableSegments(e, t = {}) {
		return T(this, void 0, void 0, function* () {
			let n = yield H(a(e) ? this.parse(e) : e, t);
			return Array.from(y(Object.values(n.variables).flatMap((e) => e.map((e) => e.toArray()))));
		});
	}
	variableSegmentsSync(e, t = {}) {
		let n = U(a(e) ? this.parse(e) : e, t);
		return Array.from(y(Object.values(n.variables).flatMap((e) => e.map((e) => e.toArray()))));
	}
	globalVariables(e, t = {}) {
		return T(this, void 0, void 0, function* () {
			let n = yield H(a(e) ? this.parse(e) : e, t);
			return Object.keys(n.globals);
		});
	}
	globalVariablesSync(e, t = {}) {
		let n = U(a(e) ? this.parse(e) : e, t);
		return Object.keys(n.globals);
	}
	globalFullVariables(e, t = {}) {
		return T(this, void 0, void 0, function* () {
			let n = yield H(a(e) ? this.parse(e) : e, t);
			return Array.from(new Set(Object.values(n.globals).flatMap((e) => e.map((e) => String(e)))));
		});
	}
	globalFullVariablesSync(e, t = {}) {
		let n = U(a(e) ? this.parse(e) : e, t);
		return Array.from(new Set(Object.values(n.globals).flatMap((e) => e.map((e) => String(e)))));
	}
	globalVariableSegments(e, t = {}) {
		return T(this, void 0, void 0, function* () {
			let n = yield H(a(e) ? this.parse(e) : e, t);
			return Array.from(y(Object.values(n.globals).flatMap((e) => e.map((e) => e.toArray()))));
		});
	}
	globalVariableSegmentsSync(e, t = {}) {
		let n = U(a(e) ? this.parse(e) : e, t);
		return Array.from(y(Object.values(n.globals).flatMap((e) => e.map((e) => e.toArray()))));
	}
};
/* istanbul ignore file */
//#endregion
export { xa as Liquid };

//# sourceMappingURL=liquid.browser-CZaQe87t.js.map