function e(e, t, n, r) {
	let i = new Date(e).getTime();
	if (Number.isNaN(i)) return null;
	let a = Date.now() - i;
	if (a < -6e4) return null;
	let o = Math.floor(a / 6e4), s = Math.floor(a / 36e5), c = Math.floor(a / 864e5);
	return o < 1 ? t.justNow : o < 60 ? n ? n(t.minutesAgo, { minutes: o }) : t.minutesAgo.replace("{minutes}", String(o)) : s < 24 ? n ? n(t.hoursAgo, { hours: s }) : t.hoursAgo.replace("{hours}", String(s)) : r !== void 0 && c >= r ? null : n ? n(t.daysAgo, { days: c }) : t.daysAgo.replace("{days}", String(c));
}
//#endregion
export { e as t };
