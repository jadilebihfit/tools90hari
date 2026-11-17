/* LEBIHFIT — semua data user disimpan di localStorage device masing-masing. Tidak ada server. */
(function(){
"use strict";
const KEY = "lebihfit:v1";
try { const old = localStorage.getItem("fitlog:v1"); if (old && !localStorage.getItem(KEY)) { localStorage.setItem(KEY, old); localStorage.removeItem("fitlog:v1"); } } catch(e){}
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const r0 = n => Math.round(n || 0);
const r1 = n => Math.round((n || 0) * 10) / 10;
const fmt = n => r0(n).toLocaleString("id-ID");
const cap = s => String(s || "").replace(/\b\w/g, c => c.toUpperCase());

/* ---------- ikon ---------- */
const P = {
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  dumb:'<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
  food:'<path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 3c-2 0-3 2.5-3 6s1.2 4 3 4m0-10v18"/>',
  chart:'<path d="M5 20V11M12 20V4M19 20v-6"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  bell:'<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  next:'<path d="M9 5l7 7-7 7"/>',
  check:'<path d="M5 12.5 10 17 19 7"/>',
  fire:'<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.6 1.2 2.5 2 2.5 0-3-1-5 1-8z"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  drop:'<path d="M12 3.5c3 4 6 7 6 10.5a6 6 0 0 1-12 0c0-3.5 3-6.5 6-10.5z"/>',
  close:'<path d="M6 6l12 12M18 6 6 18"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/>',
  play:'<path d="M8 5.5v13l11-6.5z"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  phone:'<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  lock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  scale:'<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8.5 9.5a5 5 0 0 1 7 0L12 13z"/>',
  dl:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  up:'<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  heart:'<path d="M12 20s-7-4.5-8.5-9A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 4c-1.5 4.5-8.5 9-8.5 9z"/>',
  target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
  more:'<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>'
};
const LOGO = '<rect width="512" height="512" rx="120" fill="#cdf33a"/><g fill="#11140a"><rect x="140" y="300" width="232" height="50" rx="14"/><rect x="102" y="252" width="50" height="146" rx="16"/><rect x="360" y="252" width="50" height="146" rx="16"/><rect x="230" y="210" width="52" height="140" rx="14"/><path d="M256 104c6 0 11 3 15 8l68 88c7 9 1 22-11 22H184c-12 0-18-13-11-22l68-88c4-5 9-8 15-8z"/></g>';
const logoMark = (s = 34) => `<svg width="${s}" height="${s}" viewBox="0 0 512 512" aria-hidden="true" style="flex:none;display:block">${LOGO}</svg>`;
const brand = (s = 34) => `<span class="brand" aria-label="LEBIHFIT">${logoMark(s)}<span class="wm" style="font-size:${Math.round(s*0.66)}px">LEBIH<em>FIT</em></span></span>`;
const ic = (n, c = "ic") => `<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

/* ---------- data latihan ---------- */
const BP_ID = {"waist":"Perut/Core","upper arms":"Lengan atas","back":"Punggung","chest":"Dada","upper legs":"Paha & Glute","shoulders":"Bahu","lower arms":"Lengan bawah","lower legs":"Betis","neck":"Leher","full body":"Full body","cardio":"Kardio"};
const EQ_ID = {"body weight":"Tanpa alat","dumbbell":"Dumbbell","barbell":"Barbell","cable":"Cable","leverage machine":"Mesin","band":"Band","resistance band":"Resistance band","kettlebell":"Kettlebell","smith machine":"Smith machine","ez barbell":"EZ bar","suspension trainer":"TRX","weighted":"Beban tambahan","stability ball":"Gym ball","sled machine":"Sled/leg press","medicine ball":"Medicine ball","assisted":"Assisted","weight plate":"Plate","roller":"Foam roller","massage ball":"Massage ball","landmine":"Landmine","rope":"Rope"};
let EX = null, EXMAP = {}, exLoading = null;
/* Media gerakan (opsional): taruh file di media/still/<id>.webp dan media/clip/<id>.mp4.
   Kalau foldernya tidak ada, app tetap jalan dengan teks + link YouTube. */
let MEDIA = null;
function checkMedia(){
  if (MEDIA !== null) return Promise.resolve(MEDIA);
  return fetch("media/still/0025.webp", {method:"HEAD"})
    .then(r => MEDIA = r.ok && /image/.test(r.headers.get("content-type") || ""))
    .catch(() => MEDIA = false);
}
function loadExercises(){
  if (EX) return Promise.resolve(EX);
  if (exLoading) return exLoading;
  exLoading = fetch("data/exercises.json").then(r => r.json()).then(a => {
    EX = a.map(x => ({id:x[0], name:x[1], bp:x[2], eq:x[3], target:x[4], sec:x[5] ? x[5].split(",") : [], desc:x[6], steps:x[7]}));
    EX.forEach(e => EXMAP[e.id] = e);
    return EX;
  }).catch(e => { exLoading = null; throw e; });
  return exLoading;
}

const E = (id, name, sets, reps) => ({id, name, sets, reps});
const TPL = {
  push:{name:"Push", items:[E("0025","barbell bench press",4,"6-8"),E("0314","dumbbell incline bench press",3,"8-10"),E("0405","dumbbell seated shoulder press",3,"8-10"),E("0334","dumbbell lateral raise",4,"12-15"),E("0201","cable pushdown",3,"10-12"),E("0194","cable overhead triceps extension (rope attachment)",3,"10-12")]},
  pull:{name:"Pull", items:[E("0652","pull-up",4,"6-10"),E("0027","barbell bent over row",3,"8-10"),E("0861","cable seated row",3,"10-12"),E("11060","cable face pull with external rotation",3,"12-15"),E("0031","barbell curl",3,"8-10"),E("0313","dumbbell hammer curl",3,"10-12")]},
  legs:{name:"Legs", items:[E("0043","barbell full squat",4,"5-8"),E("0085","barbell romanian deadlift",3,"8-10"),E("0739","sled 45° leg press",3,"10-12"),E("0586","lever lying leg curl",3,"10-12"),E("0585","lever leg extension",3,"12-15"),E("0605","lever standing calf raise",4,"12-15")]},
  upper:{name:"Upper Body", items:[E("0025","barbell bench press",4,"6-8"),E("0027","barbell bent over row",4,"6-8"),E("0405","dumbbell seated shoulder press",3,"8-10"),E("0150","cable bar lateral pulldown",3,"10-12"),E("0334","dumbbell lateral raise",3,"12-15"),E("0031","barbell curl",2,"10-12"),E("0201","cable pushdown",2,"10-12")]},
  lower:{name:"Lower Body", items:[E("0043","barbell full squat",4,"5-8"),E("0085","barbell romanian deadlift",3,"8-10"),E("0739","sled 45° leg press",3,"10-12"),E("0599","lever seated leg curl",3,"10-12"),E("0605","lever standing calf raise",4,"12-15"),E("0472","hanging leg raise",3,"10-15")]},
  fba:{name:"Full Body A", items:[E("0043","barbell full squat",3,"6-8"),E("0025","barbell bench press",3,"6-8"),E("0027","barbell bent over row",3,"8-10"),E("0405","dumbbell seated shoulder press",3,"10-12"),E("0463","front plank",3,"30-60 dtk")]},
  fbb:{name:"Full Body B", items:[E("0032","barbell deadlift",3,"5"),E("0047","barbell incline bench press",3,"8-10"),E("0652","pull-up",3,"6-10"),E("0336","dumbbell lunge",3,"10/kaki"),E("0274","crunch floor",3,"15-20")]},
  chest:{name:"Chest & Triceps", items:[E("0025","barbell bench press",4,"6-8"),E("0047","barbell incline bench press",3,"8-10"),E("0308","dumbbell fly",3,"10-12"),E("0814","triceps dip",3,"8-12"),E("0201","cable pushdown",3,"10-12"),E("0194","cable overhead triceps extension (rope attachment)",3,"12-15")]},
  back:{name:"Back & Biceps", items:[E("0032","barbell deadlift",3,"5"),E("0652","pull-up",4,"6-10"),E("0027","barbell bent over row",3,"8-10"),E("0150","cable bar lateral pulldown",3,"10-12"),E("0031","barbell curl",3,"8-10"),E("0318","dumbbell incline curl",3,"10-12")]},
  shoulder:{name:"Shoulders & Arms", items:[E("0091","barbell seated overhead press",4,"6-8"),E("0334","dumbbell lateral raise",4,"12-15"),E("2487","dumbbell rear delt fly",3,"12-15"),E("0406","dumbbell shrug",3,"10-12"),E("0313","dumbbell hammer curl",3,"10-12"),E("0201","cable pushdown",3,"10-12")]},
  home:{name:"Home Workout", items:[E("0662","push-up",4,"max"),E("0336","dumbbell lunge",3,"10/kaki"),E("1760","dumbbell goblet squat",3,"12-15"),E("1236","dumbbell one arm row (rack support)",3,"10-12"),E("0463","front plank",3,"30-60 dtk")]},
  rest:{name:"Rest", items:[]}
};
const TPL_ORDER = ["push","pull","legs","upper","lower","fba","fbb","chest","back","shoulder","home","rest"];
const SPLITS = {
  ppl:{name:"Push / Pull / Legs", desc:"6 hari: Push, Pull, Legs, ulang. Minggu libur.", days:["push","pull","legs","push","pull","legs","rest"]},
  ul:{name:"Upper / Lower", desc:"4 hari: Upper, Lower, libur, Upper, Lower.", days:["upper","lower","rest","upper","lower","rest","rest"]},
  fb:{name:"Full Body", desc:"3 hari selang-seling: Sen, Rab, Jum.", days:["fba","rest","fbb","rest","fba","rest","rest"]},
  bro:{name:"Bro Split", desc:"5 hari, 1 grup otot per hari.", days:["chest","back","legs","shoulder","rest","upper","rest"]},
  custom:{name:"Custom per hari", desc:"Pilih sendiri latihan tiap hari.", days:["push","pull","rest","legs","upper","rest","rest"]}
};
const DAYS = ["Sen","Sel","Rab","Kam","Jum","Sab","Min"];
const DAYS_FULL = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];
function buildPlan(type, dayKeys){
  const keys = dayKeys || SPLITS[type].days;
  return {type, days: keys.map(k => ({tpl:k, name:TPL[k].name, items:TPL[k].items.map(i => ({...i}))}))};
}

/* ---------- state ---------- */
function blank(){
  return {v:1, access:null, profile:null, plan:null, logs:{}, weights:[], checklist:[
    {id:"kcal", t:"Kalori sesuai target (±10%)", auto:"kcal"},
    {id:"prot", t:"Target protein tercapai", auto:"prot"},
    {id:"wo", t:"Latihan hari ini selesai", auto:"wo"},
    {id:"water", t:"Minum air 8 gelas", auto:"water"},
    {id:"veg", t:"Makan sayur & buah"},
    {id:"sleep", t:"Tidur 7+ jam"}
  ], created:Date.now()};
}
let S;
try { S = JSON.parse(localStorage.getItem(KEY)) || blank(); } catch(e){ S = blank(); }
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){ toast("Penyimpanan penuh atau diblokir browser"); } }

const dkey = d => { const x = new Date(d); return x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0"); };
const today = () => dkey(new Date());
const parseKey = k => { const [y,m,d] = k.split("-").map(Number); return new Date(y, m-1, d); };
const addDays = (k, n) => { const d = parseKey(k); d.setDate(d.getDate()+n); return dkey(d); };
const wdIdx = k => (parseKey(k).getDay()+6)%7;
const niceDate = k => parseKey(k).toLocaleDateString("id-ID",{weekday:"long", day:"numeric", month:"short"});
function log(k){ if(!S.logs[k]) S.logs[k] = {foods:[], wo:null, water:0, checks:{}}; return S.logs[k]; }
function peek(k){ return S.logs[k] || {foods:[], wo:null, water:0, checks:{}}; }

/* ---------- kalkulator ---------- */
const ACT = [
  {v:1.2, t:"Jarang gerak", d:"Kerja duduk, hampir tidak olahraga"},
  {v:1.375, t:"Ringan", d:"Olahraga 1-3x seminggu"},
  {v:1.55, t:"Sedang", d:"Olahraga 3-5x seminggu"},
  {v:1.725, t:"Aktif", d:"Latihan berat 6-7x seminggu"},
  {v:1.9, t:"Sangat aktif", d:"Kerja fisik berat + latihan tiap hari"}
];
const PACE = {
  cut:[{v:-300,t:"Santai",d:"-300 kkal/hari, ±0,25 kg/minggu"},{v:-500,t:"Normal",d:"-500 kkal/hari, ±0,5 kg/minggu"},{v:-750,t:"Agresif",d:"-750 kkal/hari, ±0,75 kg/minggu"}],
  bulk:[{v:250,t:"Lean bulk",d:"+250 kkal/hari, minim lemak"},{v:400,t:"Normal",d:"+400 kkal/hari"},{v:600,t:"Agresif",d:"+600 kkal/hari, naik lebih cepat"}],
  maintain:[{v:0,t:"Maintain",d:"Kalori = TDEE, recomposition"}]
};
function calc(p){
  const bmr = 10*p.weight + 6.25*p.height - 5*p.age + (p.sex === "m" ? 5 : -161);
  const tdee = bmr * p.act;
  let kcal = Math.max(p.sex === "m" ? 1500 : 1200, tdee + (p.pace || 0));
  if (p.kcalOverride) kcal = p.kcalOverride;
  const protK = p.goal === "cut" ? 2.2 : p.goal === "bulk" ? 2.0 : 1.8;
  const prot = p.weight * protK;
  const fat = Math.max(p.weight*0.8, kcal*0.25/9);
  const carb = Math.max(0, (kcal - prot*4 - fat*9)/4);
  return {bmr:r0(bmr), tdee:r0(tdee), kcal:r0(kcal), p:r0(prot), c:r0(carb), f:r0(fat),
    fiber:r0(kcal/1000*14), sugar:r0(kcal*0.1/4), na:2000, chol:300, ca:1000, fe:p.sex === "m" ? 9 : 18, k:4700, vitc:p.sex === "m" ? 90 : 75};
}
const T = () => calc(S.profile);
const NUT = [["kcal","Kalori","kkal"],["p","Protein","g"],["c","Karbohidrat","g"],["f","Lemak","g"],["fiber","Serat","g"],["sugar","Gula","g"],["na","Natrium","mg"],["chol","Kolesterol","mg"],["ca","Kalsium","mg"],["fe","Zat besi","mg"],["k","Kalium","mg"],["vitc","Vitamin C","mg"]];
const LIMIT = {sugar:1, na:1, chol:1};

/* ---------- makanan ---------- */
const FOODS = [];
[["warteg", window.WARTEG || []], ["mall", window.MALL || []], ["umum", window.BASIC || []]].forEach(([src, groups]) => {
  groups.forEach(([grp, items]) => items.forEach(it => FOODS.push({src, grp, n:it[0], pt:it[1], v:it.slice(2)})));
});
const nv = (v, q = 1) => { const o = {}; window.FOOD_COLS.forEach((c, i) => o[c] = (v[i] || 0) * q); return o; };
function dayTotals(k){
  const t = {}; window.FOOD_COLS.forEach(c => t[c] = 0);
  peek(k).foods.forEach(f => { const x = nv(f.v, f.q); for (const c in x) t[c] += x[c]; });
  return t;
}
const MEALS = [["b","Sarapan"],["l","Makan siang"],["d","Makan malam"],["s","Snack"]];
function guessMeal(){ const h = new Date().getHours(); return h < 10 ? "b" : h < 15 ? "l" : h < 21 ? "d" : "s"; }

/* ---------- workout helpers ---------- */
function planFor(k){ return S.plan ? S.plan.days[wdIdx(k)] : null; }
function woStats(k){
  const day = planFor(k), w = peek(k).wo;
  const total = day ? day.items.reduce((a, i) => a + Number(i.sets || 0), 0) : 0;
  let done = 0;
  if (w && w.sets) Object.values(w.sets).forEach(arr => arr.forEach(s => { if (s.d) done++; }));
  return {total, done, finished: !!(w && w.finished), rest: !day || !day.items.length};
}
function estMin(day){ return day ? Math.max(10, r0(day.items.reduce((a, i) => a + Number(i.sets || 0), 0) * 2.6)) : 0; }
function estBurn(min){ return r0(5 * (S.profile?.weight || 70) * min / 60); }

/* ---------- checklist ---------- */
function checkState(k, item){
  const L = peek(k), t = dayTotals(k), tg = T();
  if (item.auto === "kcal") return t.kcal > 0 && Math.abs(t.kcal - tg.kcal) <= tg.kcal * 0.1;
  if (item.auto === "prot") return t.p >= tg.p * 0.95;
  if (item.auto === "wo") { const s = woStats(k); return s.rest ? true : s.finished; }
  if (item.auto === "water") return (L.water || 0) >= 8;
  return !!(L.checks && L.checks[item.id]);
}
function checkPct(k){ const n = S.checklist.length; return n ? S.checklist.filter(i => checkState(k, i)).length / n : 0; }

/* ---------- UI infra ---------- */
const app = $("#app");
let view = "home", curDate = today(), progRange = "day";
function toast(msg){ const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 1900); }

let sheetEls = null;
function openSheet(title, html, mount){
  closeSheet(true);
  const scrim = document.createElement("div"); scrim.className = "scrim";
  const sh = document.createElement("div"); sh.className = "sheet"; sh.setAttribute("role","dialog"); sh.setAttribute("aria-modal","true");
  sh.innerHTML = `<div class="sheet-grip"></div><div class="sheet-head"><h3>${title}</h3><button class="icon-btn" data-x aria-label="Tutup">${ic("close","ic-sm")}</button></div><div class="sheet-body">${html}</div>`;
  document.body.append(scrim, sh);
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => { scrim.classList.add("show"); sh.classList.add("show"); });
  scrim.onclick = () => closeSheet(); $("[data-x]", sh).onclick = () => closeSheet();
  sheetEls = {scrim, sh};
  if (mount) mount($(".sheet-body", sh), sh);
  return sh;
}
function closeSheet(instant){
  if (!sheetEls) return;
  const {scrim, sh} = sheetEls; sheetEls = null;
  document.body.style.overflow = "";
  if (instant) { scrim.remove(); sh.remove(); return; }
  scrim.classList.remove("show"); sh.classList.remove("show");
  setTimeout(() => { scrim.remove(); sh.remove(); }, 260);
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });

function ring(pct, size, stroke, inner){
  const r = (size - stroke) / 2, C = 2 * Math.PI * r, p = Math.max(0, Math.min(1, pct));
  return `<div class="ring-wrap" style="width:${size}px;height:${size}px;max-width:100%"><svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="max-width:100%;height:auto;transform:rotate(-90deg)"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="${stroke}"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${pct > 1.1 ? "var(--amber)" : "var(--lime)"}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-p)}" style="transition:stroke-dashoffset .6s ease"/></svg>${inner}</div>`;
}
function gauge(pct){
  const p = Math.max(0, Math.min(1, pct)), W = 220, R = 88, cx = 110, cy = 104;
  const pt = a => [cx + R*Math.cos(a), cy + R*Math.sin(a)];
  const a0 = Math.PI*0.8, a1 = Math.PI*2.2, ae = a0 + (a1-a0)*p;
  const [x0,y0] = pt(a0), [x1,y1] = pt(a1), [xe,ye] = pt(ae);
  return `<svg viewBox="0 0 ${W} 170" style="width:100%;max-width:240px;display:block;margin:0 auto"><path d="M${x0} ${y0} A${R} ${R} 0 1 1 ${x1} ${y1}" fill="none" stroke="var(--surface-2)" stroke-width="16" stroke-linecap="round"/>${p > 0 ? `<path d="M${x0} ${y0} A${R} ${R} 0 ${ae-a0 > Math.PI ? 1 : 0} 1 ${xe} ${ye}" fill="none" stroke="var(--lime)" stroke-width="16" stroke-linecap="round"/>` : ""}<text x="${cx}" y="${cy+4}" text-anchor="middle" fill="var(--fg)" style="font:800 44px var(--body)">${r0(p*100)}<tspan style="font-size:20px">%</tspan></text><text x="${cx}" y="${cy+30}" text-anchor="middle" fill="var(--muted)" style="font:500 13px var(--body)">Checklist selesai</text></svg>`;
}

/* ================== GATE ================== */
let installEvt = null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; });
const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

/* Data contoh khusus untuk preview di landing page (tidak pernah disimpan) */
function demoState(){
  const d = blank(); d.access = "web";
  d.profile = {name:"Raka", sex:"m", age:24, height:172, weight:70, act:1.55, goal:"bulk", pace:250, kcalOverride:0};
  d.plan = buildPlan("ppl");
  const k = today();
  const menu = [["Kopi Susu Gula Aren (reguler)","b",1],["Telur rebus","b",2],["Roti tawar gandum","b",1],["Nasi putih porsi warteg","l",1],["Ayam bakar kecap","l",1],["Tempe goreng","l",2],["Sayur asem","l",1],["PaNas 1 (Ayam + Nasi)","d",1],["Whey protein","s",1],["Pisang ambon","s",2]];
  for (let i = 0; i < 7; i++) {
    const key = addDays(k, -i), L = d.logs[key] = {foods:[], wo:null, water:i ? 8 : 6, checks:{veg:true, sleep:i % 3 !== 0}};
    menu.slice(0, i ? menu.length - (i % 3) : 7).forEach(([n, m, q]) => { const f = FOODS.find(x => x.n === n); if (f) L.foods.push({n:f.n, pt:f.pt, v:f.v, q, m, src:f.src}); });
    const day = d.plan.days[wdIdx(key)];
    if (day.items.length) {
      const sets = {};
      day.items.forEach((it, x) => { sets[x] = Array.from({length:it.sets}, (_, s) => ({kg:String(20 + x*5), r:String(it.reps).split("-")[0], d: i > 0 || (x < 2)})); });
      const min = estMin(day);
      L.wo = {sets, ids:day.items.map(it => it.id), finished: i > 0, min, kcal: r0(5*70*min/60), name:day.name};
    }
  }
  d.weights = Array.from({length:8}, (_, i) => ({d:addDays(k, (i-7)*4), kg:r1(68.2 + i*0.26 + (i % 2 ? 0.1 : -0.1))}));
  return d;
}
function previewScreens(){
  const real = S, rv = view, rp = progRange, rd = curDate;
  let out = [];
  try {
    S = demoState(); curDate = today();
    out = [["home","Dashboard",vHome],["food","Log makan",vFood],["progress","Progress",vProgress]].map(([k, l, fn]) => {
      view = k; progRange = "week";
      return {l, html:`<div class="screen">${fn()}</div>${nav()}`};
    });
  } finally { S = real; view = rv; progRange = rp; curDate = rd; }
  return out;
}
function renderGate(){
  const shots = previewScreens();
  app.innerHTML = `<div class="gate">
    <div class="row between">${brand(36)}<span class="tag">Gratis · Offline</span></div>
    <div class="gate-hero">
      <h1 class="display">Push <span>Your Limits</span> Every Day</h1>
      <p class="gate-sub">Checklist diet, log makan warteg sampai mall, dan program latihan kamu sendiri.</p>
    </div>
    <div class="pv-wrap">
      <div class="row between" style="margin-bottom:12px"><b class="small">Intip isi aplikasinya</b><span class="tag">Data contoh</span></div>
      <div class="pv-strip">${shots.map(s => `<figure class="pv"><div class="pv-phone"><div class="pv-inner" aria-hidden="true" inert>${s.html}</div></div><figcaption>${s.l}</figcaption></figure>`).join("")}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <p class="small muted" style="font-weight:600">Mau akses lewat mana?</p>
      <button class="choice primary" id="gWeb"><span class="ci">${ic("globe")}</span><span class="grow"><b>Akses via Web</b><small>Langsung pakai di browser, tanpa install</small></span>${ic("arrow")}</button>
      <button class="choice" id="gApp"><span class="ci">${ic("phone")}</span><span class="grow"><b>Install sebagai Aplikasi</b><small>Ikon di home screen, bisa dipakai offline</small></span>${ic("arrow")}</button>
      <p class="privacy">${ic("lock","ic-sm")}<span>Tidak ada akun dan tidak ada server. Semua data (profil, makanan, latihan) disimpan di device ini saja.</span></p>
    </div></div>`;
  $("#gWeb").onclick = () => { S.access = "web"; save(); go(); };
  $("#gApp").onclick = installFlow;
}
function installFlow(){
  if (installEvt) {
    installEvt.prompt();
    installEvt.userChoice.finally(() => { installEvt = null; S.access = "app"; save(); go(); });
    return;
  }
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/i.test(ua);
  const steps = ios
    ? ["Buka halaman ini di <b>Safari</b>.","Tap tombol <b>Share</b> (kotak dengan panah ke atas).","Pilih <b>Add to Home Screen</b> / <b>Tambah ke Layar Utama</b>.","Buka LEBIHFIT dari ikon di home screen."]
    : ["Buka halaman ini di <b>Chrome</b> (Android) atau Chrome/Edge (laptop).","Tap menu <b>⋮</b> di pojok kanan atas.","Pilih <b>Install app</b> atau <b>Tambahkan ke layar utama</b>.","Buka LEBIHFIT dari ikon yang muncul."];
  openSheet("Install LEBIHFIT", `<p class="muted small">Browser ini belum menampilkan tombol install otomatis. Caranya:</p>
    <ol class="steps-list">${steps.map(s => `<li><span>${s}</span></li>`).join("")}</ol>
    <p class="note">Data aplikasi dan web tersimpan terpisah per browser. Kalau pindah, pakai Backup &amp; Restore di menu Profil.</p>
    <button class="btn btn-lime btn-block" id="contWeb">Lanjut dulu di browser ${ic("arrow","ic-sm")}</button>`, b => {
      $("#contWeb", b).onclick = () => { closeSheet(); S.access = "app"; save(); go(); };
  });
}

/* ================== ONBOARDING ================== */
let O = null, oStep = 0, oMode = "new";
function startOnb(mode){
  oMode = mode; oStep = mode === "plan" ? 4 : 0;
  const p = S.profile || {};
  O = {name:p.name||"", sex:p.sex||"m", age:p.age||"", height:p.height||"", weight:p.weight||"", act:p.act||1.55, goal:p.goal||"bulk", pace:p.pace ?? 250, kcalOverride:p.kcalOverride||"",
       split:S.plan?.type||"ppl", custom:S.plan ? S.plan.days.map(d => d.tpl) : SPLITS.custom.days.slice()};
  renderOnb();
}
function renderOnb(){
  const total = oMode === "new" ? 5 : (oMode === "plan" ? 1 : 4);
  const idx = oMode === "plan" ? 0 : oStep;
  const bar = `<div class="steps">${Array.from({length:total}, (_, i) => `<i class="${i <= idx ? "on" : ""}"></i>`).join("")}</div>`;
  let body = "", canNext = true;
  if (oStep === 0) {
    body = `<div><p class="small muted" style="font-weight:600">Langkah 1 · Data diri</p><h2 class="onb-title" style="margin-top:6px">Kenalan dulu</h2></div>
    <div class="field"><label for="oName">Nama panggilan</label><input class="input" id="oName" value="${esc(O.name)}" placeholder="mis. Raka" autocomplete="given-name"></div>
    <div class="field"><label>Jenis kelamin</label><div class="seg" id="oSex"><button data-v="m" class="${O.sex==="m"?"on":""}">Laki-laki</button><button data-v="f" class="${O.sex==="f"?"on":""}">Perempuan</button></div></div>
    <div class="grid3">
      <div class="field"><label for="oAge">Umur</label><input class="input num" id="oAge" type="number" inputmode="numeric" value="${esc(O.age)}" placeholder="24"></div>
      <div class="field"><label for="oH">Tinggi (cm)</label><input class="input num" id="oH" type="number" inputmode="decimal" value="${esc(O.height)}" placeholder="172"></div>
      <div class="field"><label for="oW">Berat (kg)</label><input class="input num" id="oW" type="number" inputmode="decimal" value="${esc(O.weight)}" placeholder="68"></div>
    </div>`;
  } else if (oStep === 1) {
    body = `<div><p class="small muted" style="font-weight:600">Langkah 2 · Aktivitas</p><h2 class="onb-title" style="margin-top:6px">Seberapa aktif kamu?</h2></div>
    <div class="opt-list">${ACT.map(a => `<button class="opt ${O.act==a.v?"on":""}" data-act="${a.v}"><span class="dot"></span><span><b>${a.t}</b><small>${a.d}</small></span></button>`).join("")}</div>`;
  } else if (oStep === 2) {
    const goals = [["bulk","Bulking","Nambah massa otot, kalori surplus"],["cut","Cutting","Turunin lemak, kalori defisit"],["maintain","Maintain","Jaga berat, recomposition"]];
    body = `<div><p class="small muted" style="font-weight:600">Langkah 3 · Goal</p><h2 class="onb-title" style="margin-top:6px">Mau bulking atau cutting?</h2></div>
    <div class="opt-list">${goals.map(g => `<button class="opt ${O.goal===g[0]?"on":""}" data-goal="${g[0]}"><span class="dot"></span><span><b>${g[1]}</b><small>${g[2]}</small></span></button>`).join("")}</div>
    ${O.goal !== "maintain" ? `<div class="field"><label>Kecepatan</label><div class="opt-list">${PACE[O.goal].map(p => `<button class="opt ${O.pace==p.v?"on":""}" data-pace="${p.v}"><span class="dot"></span><span><b>${p.t}</b><small>${p.d}</small></span></button>`).join("")}</div></div>` : ""}`;
  } else if (oStep === 3) {
    const t = calc(numO());
    body = `<div><p class="small muted" style="font-weight:600">Langkah 4 · Hasil kalkulator TDEE</p><h2 class="onb-title" style="margin-top:6px">Target harian kamu</h2></div>
    <div class="big-stat"><span class="small" style="font-weight:700">${O.goal==="bulk"?"Bulking":O.goal==="cut"?"Cutting":"Maintain"} · kalori per hari</span><span class="v num">${fmt(t.kcal)}</span><span class="small">kkal</span></div>
    <div class="kv"><div><b class="num">${fmt(t.bmr)}</b><span>BMR</span></div><div><b class="num">${fmt(t.tdee)}</b><span>TDEE</span></div><div><b class="num">${t.kcal-t.tdee>0?"+":""}${fmt(t.kcal-t.tdee)}</b><span>Selisih</span></div></div>
    <div class="macro-pills"><div><b class="num">${t.p}g</b><span>Protein</span></div><div><b class="num">${t.c}g</b><span>Karbo</span></div><div><b class="num">${t.f}g</b><span>Lemak</span></div><div><b class="num">${t.fiber}g</b><span>Serat</span></div></div>
    <div class="field"><label for="oK">Mau atur kalori manual? (opsional)</label><input class="input num" id="oK" type="number" inputmode="numeric" value="${esc(O.kcalOverride)}" placeholder="Kosongkan untuk pakai hitungan otomatis"></div>
    <p class="note">Rumus Mifflin-St Jeor × faktor aktivitas. Protein ${O.goal==="cut"?"2,2":O.goal==="bulk"?"2,0":"1,8"} g/kg BB, lemak ±25% kalori, sisanya karbo. Ini titik awal: pantau berat 2-3 minggu lalu sesuaikan.</p>`;
  } else if (oStep === 4) {
    body = `<div><p class="small muted" style="font-weight:600">${oMode==="new"?"Langkah 5 · Program":"Program latihan"}</p><h2 class="onb-title" style="margin-top:6px">Pilih program latihan</h2></div>
    <div class="opt-list">${Object.entries(SPLITS).map(([k, s]) => `<button class="opt ${O.split===k?"on":""}" data-split="${k}"><span class="dot"></span><span><b>${s.name}</b><small>${s.desc}</small></span></button>`).join("")}</div>
    ${O.split === "custom" ? `<div class="field"><label>Atur tiap hari</label><div class="list">${DAYS.map((d, i) => `<div class="day-row"><span class="d">${d}</span><select id="cd${i}" data-cd="${i}" aria-label="Latihan hari ${DAYS_FULL[i]}">${TPL_ORDER.map(k => `<option value="${k}" ${O.custom[i]===k?"selected":""}>${TPL[k].name}</option>`).join("")}</select></div>`).join("")}</div><p class="note">Gerakan tiap hari bisa ditambah, dihapus, atau diganti nanti di tab Latihan.</p></div>`
      : `<div class="list">${SPLITS[O.split].days.map((k, i) => `<div class="day-row"><span class="d">${DAYS[i]}</span><span class="grow ${k==="rest"?"muted":""}">${TPL[k].name}</span><span class="tiny muted">${TPL[k].items.length ? TPL[k].items.length+" gerakan" : ""}</span></div>`).join("")}</div>`}
    ${S.plan && oMode !== "new" ? `<p class="note">Ganti program akan mengganti daftar gerakan per hari. Riwayat latihan tetap aman.</p>` : ""}`;
  }
  const last = (oMode === "new" && oStep === 4) || (oMode === "edit" && oStep === 3) || oMode === "plan";
  app.innerHTML = `<div class="screen" style="padding-bottom:0;gap:20px">
    <div class="row between"><button class="icon-btn" id="oBack" aria-label="Kembali">${ic("back","ic-sm")}</button><div class="grow">${bar}</div></div>
    ${body}
    <div class="onb-foot"><button class="btn btn-lime btn-block" id="oNext">${last ? (oMode==="new" ? "Masuk Dashboard" : "Simpan") : "Lanjut"} ${ic("arrow","ic-sm")}</button></div>
  </div>`;
  bindOnb(last);
}
function numO(){ return {...O, age:+O.age, height:+O.height, weight:+O.weight, act:+O.act, pace:O.goal==="maintain" ? 0 : +O.pace, kcalOverride:+O.kcalOverride || 0}; }
function bindOnb(last){
  const v = id => { const e = $("#"+id); return e ? e.value.trim() : ""; };
  const sync = () => { if ($("#oName")) { O.name = v("oName"); O.age = v("oAge"); O.height = v("oH"); O.weight = v("oW"); } if ($("#oK")) O.kcalOverride = v("oK"); };
  $$("#oSex button").forEach(b => b.onclick = () => { sync(); O.sex = b.dataset.v; renderOnb(); });
  $$("[data-act]").forEach(b => b.onclick = () => { O.act = +b.dataset.act; renderOnb(); });
  $$("[data-goal]").forEach(b => b.onclick = () => { O.goal = b.dataset.goal; O.pace = {bulk:250, cut:-500, maintain:0}[O.goal]; renderOnb(); });
  $$("[data-pace]").forEach(b => b.onclick = () => { O.pace = +b.dataset.pace; renderOnb(); });
  $$("[data-split]").forEach(b => b.onclick = () => { O.split = b.dataset.split; renderOnb(); });
  $$("[data-cd]").forEach(s => s.onchange = () => { O.custom[+s.dataset.cd] = s.value; });
  $("#oBack").onclick = () => {
    sync();
    if (oMode === "plan" || (oStep === 0)) { if (S.profile && S.plan) { view = "profile"; go(); } else { S.access = null; save(); go(); } return; }
    oStep--; renderOnb();
  };
  $("#oNext").onclick = () => {
    sync();
    if (oStep === 0) {
      const n = numO();
      if (!O.name) return toast("Isi nama dulu ya");
      if (!(n.age >= 13 && n.age <= 90)) return toast("Umur 13-90 tahun");
      if (!(n.height >= 120 && n.height <= 230)) return toast("Tinggi badan 120-230 cm");
      if (!(n.weight >= 30 && n.weight <= 250)) return toast("Berat badan 30-250 kg");
    }
    if (!last) { oStep++; renderOnb(); window.scrollTo(0,0); return; }
    if (oMode !== "plan") {
      const n = numO();
      const prevW = S.profile?.weight;
      S.profile = {name:O.name, sex:O.sex, age:n.age, height:n.height, weight:n.weight, act:n.act, goal:O.goal, pace:n.pace, kcalOverride:n.kcalOverride || 0};
      if (prevW !== n.weight) addWeight(n.weight);
    }
    if (oMode !== "edit") {
      const keep = S.plan && S.plan.type === O.split && O.split !== "custom";
      if (!keep) S.plan = buildPlan(O.split, O.split === "custom" ? O.custom : null);
    }
    save();
    toast(oMode === "new" ? "Siap! Data tersimpan di device ini" : "Tersimpan");
    view = oMode === "new" ? "home" : "profile"; O = null; go();
  };
}
function addWeight(kg){
  const k = today(); S.weights = (S.weights || []).filter(w => w.d !== k); S.weights.push({d:k, kg:+kg}); S.weights.sort((a, b) => a.d < b.d ? -1 : 1);
}

/* ================== APP SHELL ================== */
function nav(){
  const items = [["home","Home","home"],["train","Latihan","dumb"],["food","Makan","food"],["progress","Progress","chart"],["profile","Profil","user"]];
  return `<nav class="nav" aria-label="Navigasi"><div class="nav-in">${items.map(([k, t, i]) => `<button data-nav="${k}" class="${view===k?"on":""}" ${view===k?'aria-current="page"':""}>${ic(i)}<span>${t}</span></button>`).join("")}</div></nav>`;
}
function go(){
  if (!S.access && !isStandalone()) return renderGate();
  if (!S.access && isStandalone()) { S.access = "app"; save(); }
  if (!S.profile || !S.plan) { if (!O) startOnb("new"); else renderOnb(); return; }
  const V = {home:vHome, train:vTrain, food:vFood, progress:vProgress, profile:vProfile}[view] || vHome;
  app.innerHTML = `<div class="screen">${V()}</div>${nav()}`;
  $$("[data-nav]").forEach(b => b.onclick = () => { view = b.dataset.nav; curDate = today(); go(); window.scrollTo(0,0); });
  ({home:bHome, train:bTrain, food:bFood, progress:bProgress, profile:bProfile}[view] || bHome)();
}

/* ================== HOME ================== */
function vHome(){
  const k = today(), t = dayTotals(k), tg = T(), day = planFor(k), ws = woStats(k), L = peek(k);
  const tomorrow = S.plan.days[(wdIdx(k)+1)%7];
  const kpct = t.kcal / tg.kcal;
  const wk = weekKeys(k);
  const woWeek = wk.filter(x => woStats(x).finished).length;
  const kcalWeek = wk.reduce((a, x) => a + dayTotals(x).kcal, 0);
  const minWeek = wk.reduce((a, x) => a + (peek(x).wo?.finished ? (peek(x).wo.min || 0) : 0), 0);
  return `
  <div class="top">${brand(32)}<button class="icon-btn lime" id="hAdd" aria-label="Tambah makanan">${ic("plus")}</button></div>
  <div class="hello" style="margin-top:-6px"><h1>Hi ${esc(S.profile.name)} 👋</h1><p>Siap kejar target hari ini?</p></div>
  <div class="wo-scroll">
    <div class="wo-card lime">
      <span class="lbl">Latihan hari ini · ${DAYS_FULL[wdIdx(k)]}</span>
      <h2>${ws.rest ? "Rest Day" : esc(day.name)}</h2>
      <span class="badge">${ic(ws.rest ? "heart" : "dumb")}</span>
      <div class="meta">${ws.rest ? `<span>Pemulihan otot. Jalan santai & stretching.</span>` : `<span class="num">${day.items.length} gerakan</span><span class="num">${estMin(day)} menit · ${ws.done}/${ws.total} set</span>`}</div>
      ${ws.rest ? "" : `<button class="btn btn-dark btn-sm" data-goto="train">${ws.finished ? "Selesai ✓ Lihat" : ws.done ? "Lanjutkan" : "Mulai Latihan"} ${ic("arrow","ic-sm")}</button>`}
    </div>
    <div class="wo-card dark">
      <span class="lbl muted">Besok · ${DAYS_FULL[(wdIdx(k)+1)%7]}</span>
      <h2>${esc(tomorrow.name)}</h2>
      <span class="badge" style="color:var(--lime)">${ic(tomorrow.items.length ? "dumb" : "heart")}</span>
      <div class="meta muted">${tomorrow.items.length ? `<span class="num">${tomorrow.items.length} gerakan</span><span class="num">${estMin(tomorrow)} menit</span>` : `<span>Istirahat</span>`}</div>
    </div>
  </div>

  <div class="card">
    <div class="section-head"><h3>Kalori hari ini</h3><button class="link" data-goto="food">Log makan</button></div>
    <div class="row" style="gap:18px;align-items:center">
      ${ring(kpct, 132, 13, `<div class="ring-center"><b class="num" style="font-size:28px">${fmt(t.kcal)}</b><span>/ ${fmt(tg.kcal)} kkal</span></div>`)}
      <div class="macros grow">
        ${mbar("Protein", t.p, tg.p)}${mbar("Karbo", t.c, tg.c)}${mbar("Lemak", t.f, tg.f)}
      </div>
    </div>
    <p class="small muted" style="margin-top:14px">${t.kcal < tg.kcal ? `Sisa <b style="color:var(--fg)" class="num">${fmt(tg.kcal - t.kcal)} kkal</b> dan <b style="color:var(--fg)" class="num">${Math.max(0, r0(tg.p - t.p))}g protein</b> lagi.` : `Target kalori tercapai${t.kcal > tg.kcal*1.1 ? ", sudah lewat >10%" : ""}.`}</p>
  </div>

  <div class="card">
    <div class="section-head"><h3>Checklist diet hari ini</h3><span class="small muted num">${S.checklist.filter(i => checkState(k, i)).length}/${S.checklist.length}</span></div>
    ${gauge(checkPct(k))}
    <div style="margin-top:6px">${S.checklist.map(i => { const on = checkState(k, i); return `<button class="check ${on?"on":""}" data-chk="${i.id}" ${i.auto && i.auto !== "water" ? 'aria-disabled="true"' : ""}><span class="box">${on ? ic("check","ic-sm") : ""}</span><span class="t grow">${esc(i.t)}</span>${i.auto ? `<span class="auto">otomatis</span>` : ""}</button>`; }).join("")}</div>
    <div style="margin-top:14px"><div class="row between small" style="margin-bottom:8px"><span class="row" style="gap:6px;color:var(--sky)">${ic("drop","ic-sm")}<b>Air putih</b></span><span class="muted num">${L.water || 0}/8 gelas</span></div>
    <div class="water">${Array.from({length:10}, (_, i) => `<button class="${i < (L.water||0) ? "on" : ""}" data-water="${i+1}" aria-label="${i+1} gelas"></button>`).join("")}</div></div>
  </div>

  <div>
    <div class="section-head"><h3>Aktivitas minggu ini</h3><button class="link" data-goto="progress">Lihat semua</button></div>
    <div class="card trio">
      <div>${ic("dumb")}<span>Latihan</span><b class="num">${woWeek}</b><small>minggu ini</small></div>
      <div>${ic("fire")}<span>Kalori masuk</span><b class="num">${fmt(kcalWeek)}</b><small>minggu ini</small></div>
      <div>${ic("clock")}<span>Waktu latihan</span><b class="num">${minWeek >= 60 ? Math.floor(minWeek/60)+"j "+(minWeek%60)+"m" : minWeek+"m"}</b><small>minggu ini</small></div>
    </div>
  </div>`;
}
function mbar(l, v, t){ const p = t ? v/t : 0; return `<div><div class="bar-l"><span>${l}</span><span class="muted num">${r0(v)}/${t}g</span></div><div class="bar ${p>1.15?"over":""}"><i style="width:${Math.min(100, p*100)}%"></i></div></div>`; }
function weekKeys(k){ const s = addDays(k, -wdIdx(k)); return Array.from({length:7}, (_, i) => addDays(s, i)); }
function bHome(){
  const k = today();
  $("#hAdd").onclick = () => { curDate = k; openFoodPicker(); };
  $$("[data-goto]").forEach(b => b.onclick = () => { view = b.dataset.goto; go(); window.scrollTo(0,0); });
  $$("[data-chk]").forEach(b => b.onclick = () => {
    const it = S.checklist.find(i => i.id === b.dataset.chk);
    if (it.auto === "water") { const L = log(k); L.water = (L.water||0) >= 8 ? 0 : 8; save(); go(); return; }
    if (it.auto) return toast(it.auto === "wo" ? "Otomatis tercentang saat latihan selesai" : "Otomatis dari log makanan kamu");
    const L = log(k); L.checks[it.id] = !L.checks[it.id]; save(); go();
  });
  $$("[data-water]").forEach(b => b.onclick = () => { const L = log(k), n = +b.dataset.water; L.water = L.water === n ? n-1 : n; save(); go(); });
}

/* ================== LATIHAN ================== */
let trainTab = "log";
function vTrain(){
  const k = curDate, di = wdIdx(k), day = S.plan.days[di], L = peek(k), ws = woStats(k);
  const wk = weekKeys(k);
  const head = `<div class="top"><h1 class="page-title">Latihan</h1><div class="seg" style="width:200px"><button data-tt="log" class="${trainTab==="log"?"on":""}">Hari ini</button><button data-tt="lib" class="${trainTab==="lib"?"on":""}">Library</button></div></div>`;
  if (trainTab === "lib") return head + libraryHTML("lib");
  return `${head}
  <div class="days">${wk.map((x, i) => `<button data-day="${x}" class="${x===k?"on":""} ${x===today()?"today":""}"><span>${DAYS[i]}</span><b class="num">${parseKey(x).getDate()}</b>${S.plan.days[i].items.length ? `<i class="pip"></i>` : `<i class="pip" style="opacity:0"></i>`}</button>`).join("")}</div>
  <div class="row between">
    <div class="grow"><p class="small muted">${niceDate(k)}</p><h2 style="font-size:22px;font-weight:800;margin-top:2px">${esc(day.name)}</h2></div>
    <button class="btn btn-line btn-sm" id="tRename">${ic("edit","ic-sm")} Ubah hari</button>
  </div>
  ${day.items.length ? `
  <div class="card" style="padding:14px 16px"><div class="row between small"><span class="muted">Progres set</span><b class="num">${ws.done}/${ws.total}</b></div><div class="bar" style="margin-top:8px"><i style="width:${ws.total ? ws.done/ws.total*100 : 0}%"></i></div></div>
  <div class="list">${day.items.map((it, idx) => exCard(it, idx, L)).join("")}</div>
  <button class="btn btn-line btn-block" id="tAddEx">${ic("plus","ic-sm")} Tambah gerakan</button>
  <button class="btn ${ws.finished ? "btn-ghost" : "btn-lime"} btn-block" id="tFinish">${ws.finished ? "Latihan selesai ✓ (tap untuk batal)" : "Selesai latihan"} </button>`
  : `<div class="card" style="text-align:center;padding:28px 18px"><span class="icon-btn lime" style="margin:0 auto 12px;width:56px;height:56px">${ic("heart")}</span><b style="font-size:17px">Rest day</b><p class="muted small" style="margin-top:6px">Otot tumbuh waktu istirahat. Jalan kaki 20-30 menit & stretching tetap oke.</p><button class="btn btn-line btn-sm" id="tAddEx" style="margin-top:16px">${ic("plus","ic-sm")} Tambah gerakan ke hari ini</button></div>`}
  <p class="note">Tap nama gerakan untuk tutorial. Isi kg & reps lalu centang tiap set. Teks tutorial dari katalog openGym (bahasa Inggris).</p>`;
}
function exCard(it, idx, L){
  const sets = (L.wo && L.wo.sets && L.wo.sets[idx]) || [];
  const n = Number(it.sets) || 0;
  const allDone = n && Array.from({length:n}, (_, i) => sets[i]?.d).every(Boolean);
  return `<div class="ex">
    <div class="ex-head">
      <button class="thumb" data-tut="${it.id}" aria-label="Tutorial ${esc(it.name)}" style="width:46px;height:46px;border-radius:14px;background:${allDone?"var(--lime)":"var(--surface-2)"};color:${allDone?"var(--lime-ink)":"var(--lime)"};display:grid;place-items:center;flex:none">${ic(allDone ? "check" : "play","ic-sm")}</button>
      <button class="grow" data-tut="${it.id}" style="text-align:left"><div class="name">${esc(it.name)}</div><div class="small muted num">${n} set × ${esc(it.reps)} reps · lihat tutorial</div></button>
      <button class="icon-btn" style="width:36px;height:36px" data-exm="${idx}" aria-label="Opsi">${ic("more","ic-sm")}</button>
    </div>
    <div class="sets"><div class="set-h"><span>Set</span><span>Kg</span><span>Reps</span><span>✓</span></div>
    ${Array.from({length:n}, (_, i) => { const s = sets[i] || {}; return `<div class="set"><span class="n">${i+1}</span><input id="kg-${idx}-${i}" inputmode="decimal" data-sk="${idx}.${i}.kg" value="${esc(s.kg ?? "")}" placeholder="${esc(lastFor(it.id, i, "kg") || "-")}" aria-label="Kg set ${i+1}"><input id="rp-${idx}-${i}" inputmode="numeric" data-sk="${idx}.${i}.r" value="${esc(s.r ?? "")}" placeholder="${esc(lastFor(it.id, i, "r") || String(it.reps).split("-")[0])}" aria-label="Reps set ${i+1}"><button class="ok ${s.d?"on":""}" data-sd="${idx}.${i}" aria-label="Selesai set ${i+1}">${ic("check","ic-sm")}</button></div>`; }).join("")}
    </div></div>`;
}
function lastFor(exId, setI, field){
  const keys = Object.keys(S.logs).filter(x => x < curDate).sort().reverse();
  for (const k of keys) {
    const L = S.logs[k], day = S.plan.days[wdIdx(k)];
    if (!L.wo || !L.wo.sets) continue;
    const names = L.wo.ids || (day ? day.items.map(i => i.id) : []);
    const idx = names.indexOf(exId);
    if (idx >= 0 && L.wo.sets[idx] && L.wo.sets[idx][setI] && L.wo.sets[idx][setI][field]) return L.wo.sets[idx][setI][field];
  }
  return "";
}
function woLog(k){ const L = log(k); if (!L.wo) L.wo = {sets:{}, finished:false}; L.wo.ids = S.plan.days[wdIdx(k)].items.map(i => i.id); return L.wo; }
function bTrain(){
  $$("[data-tt]").forEach(b => b.onclick = () => { trainTab = b.dataset.tt; go(); });
  if (trainTab === "lib") return bindLibrary($(".screen"), "lib");
  const k = curDate, di = wdIdx(k), day = S.plan.days[di];
  $$("[data-day]").forEach(b => b.onclick = () => { curDate = b.dataset.day; go(); });
  $$("[data-tut]").forEach(b => b.onclick = () => openTutorial(b.dataset.tut));
  $$("[data-sk]").forEach(inp => inp.onchange = () => {
    const [i, s, f] = inp.dataset.sk.split("."); const w = woLog(k);
    w.sets[i] = w.sets[i] || []; w.sets[i][s] = w.sets[i][s] || {}; w.sets[i][s][f] = inp.value.trim(); save();
  });
  $$("[data-sd]").forEach(b => b.onclick = () => {
    const [i, s] = b.dataset.sd.split("."); const w = woLog(k);
    w.sets[i] = w.sets[i] || []; const cur = w.sets[i][s] = w.sets[i][s] || {};
    const kg = $(`#kg-${i}-${s}`), rp = $(`#rp-${i}-${s}`);
    if (!cur.kg && kg.placeholder !== "-") cur.kg = kg.value || kg.placeholder;
    if (!cur.r) cur.r = rp.value || rp.placeholder;
    cur.d = !cur.d; save();
    const y = window.scrollY; go(); window.scrollTo(0, y);
  });
  $$("[data-exm]").forEach(b => b.onclick = () => exMenu(+b.dataset.exm));
  const add = $("#tAddEx"); if (add) add.onclick = () => openLibrary("pick", di);
  const fin = $("#tFinish"); if (fin) fin.onclick = () => {
    const w = woLog(k); w.finished = !w.finished;
    if (w.finished) { w.min = estMin(day); w.kcal = estBurn(w.min); w.name = day.name; toast(`Mantap! ±${w.min} menit, ±${w.kcal} kkal terbakar`); }
    save(); go();
  };
  $("#tRename").onclick = () => {
    openSheet(`Ubah latihan hari ${DAYS_FULL[di]}`, `<p class="small muted">Ganti isi hari ini dengan template, atau ubah namanya saja.</p>
      <div class="field"><label for="dn">Nama hari</label><input class="input" id="dn" value="${esc(day.name)}"></div>
      <button class="btn btn-lime btn-block" id="dnSave">Simpan nama</button>
      <div class="field"><label>Ganti dengan template</label><div class="opt-list">${TPL_ORDER.map(t => `<button class="opt" data-tpl="${t}"><span class="dot"></span><span><b>${TPL[t].name}</b><small>${TPL[t].items.length ? TPL[t].items.length+" gerakan" : "Hari istirahat"}</small></span></button>`).join("")}</div></div>`, b => {
      $("#dnSave", b).onclick = () => { day.name = $("#dn", b).value.trim() || day.name; if (S.plan.type !== "custom") S.plan.type = "custom"; save(); closeSheet(); go(); };
      $$("[data-tpl]", b).forEach(x => x.onclick = () => { const t = x.dataset.tpl; S.plan.days[di] = {tpl:t, name:TPL[t].name, items:TPL[t].items.map(i => ({...i}))}; S.plan.type = "custom"; save(); closeSheet(); go(); toast(`${DAYS_FULL[di]}: ${TPL[t].name}`); });
    });
  };
}
function exMenu(idx){
  const di = wdIdx(curDate), day = S.plan.days[di], it = day.items[idx];
  openSheet(cap(it.name), `
    <div class="grid2"><div class="field"><label for="es">Jumlah set</label><input class="input num" id="es" type="number" inputmode="numeric" min="1" max="10" value="${esc(it.sets)}"></div>
    <div class="field"><label for="er">Target reps</label><input class="input" id="er" value="${esc(it.reps)}"></div></div>
    <button class="btn btn-lime btn-block" id="eSave">Simpan</button>
    <div class="grid2"><button class="btn btn-line" id="eUp" ${idx===0?"disabled":""}>Geser ke atas</button><button class="btn btn-line" id="eDown" ${idx===day.items.length-1?"disabled":""}>Geser ke bawah</button></div>
    <button class="btn btn-line btn-block" id="eSwap">Ganti gerakan</button>
    <button class="btn btn-danger btn-block" id="eDel">${ic("trash","ic-sm")} Hapus dari ${DAYS_FULL[di]}</button>
    <p class="note">Perubahan berlaku untuk semua ${DAYS_FULL[di]} berikutnya.</p>`, b => {
    $("#eSave", b).onclick = () => { it.sets = Math.max(1, Math.min(10, +$("#es", b).value || 3)); it.reps = $("#er", b).value.trim() || it.reps; save(); closeSheet(); go(); };
    const mv = d => { const a = day.items; [a[idx], a[idx+d]] = [a[idx+d], a[idx]]; const w = peek(curDate).wo; if (w && w.sets) { const s = w.sets; [s[idx], s[idx+d]] = [s[idx+d], s[idx]]; } save(); closeSheet(); go(); };
    $("#eUp", b).onclick = () => idx > 0 && mv(-1);
    $("#eDown", b).onclick = () => idx < day.items.length-1 && mv(1);
    $("#eSwap", b).onclick = () => openLibrary("swap", di, idx);
    $("#eDel", b).onclick = () => { day.items.splice(idx, 1); const w = peek(curDate).wo; if (w && w.sets) { const ns = {}; Object.keys(w.sets).forEach(i => { i = +i; if (i < idx) ns[i] = w.sets[i]; else if (i > idx) ns[i-1] = w.sets[i]; }); w.sets = ns; } save(); closeSheet(); go(); toast("Gerakan dihapus"); };
  });
}

/* ---------- library ---------- */
const LIB = {q:"", bp:"", eq:"", n:40};
function libraryHTML(mode){
  return `<div class="search">${ic("search")}<input class="input" id="lq" type="search" placeholder="Cari gerakan (mis. bench, squat, curl)" value="${esc(LIB.q)}" autocomplete="off"></div>
  <div class="chips" id="lbp"><button class="chip ${!LIB.bp?"on":""}" data-bp="">Semua otot</button>${Object.entries(BP_ID).map(([k, v]) => `<button class="chip ${LIB.bp===k?"on":""}" data-bp="${k}">${v}</button>`).join("")}</div>
  <div class="chips" id="leq"><button class="chip ${!LIB.eq?"on":""}" data-eq="">Semua alat</button>${Object.entries(EQ_ID).map(([k, v]) => `<button class="chip ${LIB.eq===k?"on":""}" data-eq="${k}">${v}</button>`).join("")}</div>
  <div id="lres" class="list"><div class="empty">Memuat 5.600+ gerakan…</div></div>`;
}
function bindLibrary(root, mode, di, swapIdx){
  const render = () => {
    const res = $("#lres", root); if (!EX) return;
    const q = LIB.q.toLowerCase().split(/\s+/).filter(Boolean);
    const list = EX.filter(e => (!LIB.bp || e.bp === LIB.bp) && (!LIB.eq || e.eq === LIB.eq) && q.every(w => e.name.includes(w) || e.target.includes(w)));
    res.innerHTML = `<p class="small muted num">${fmt(list.length)} gerakan</p>` + list.slice(0, LIB.n).map(e => `<button class="item" data-ex="${e.id}"><span class="thumb">${MEDIA ? `<img src="media/still/${e.id}.webp" alt="" loading="lazy" onerror="this.remove()">` : ic("dumb","ic-sm")}</span><span class="grow"><span class="name">${esc(e.name)}</span><span class="sub" style="display:block">${(window.VIDEOS || {})[e.id] ? `<span class="tag vid">▶ Video</span> ` : ""}${BP_ID[e.bp] || e.bp} · ${EQ_ID[e.eq] || cap(e.eq)} · ${esc(e.target)}</span></span>${mode !== "lib" ? `<span class="icon-btn lime" style="width:34px;height:34px">${ic("plus","ic-sm")}</span>` : ic("next","ic-sm")}</button>`).join("")
      + (list.length > LIB.n ? `<button class="btn btn-line btn-block" id="lmore">Muat lagi (${fmt(list.length - LIB.n)} tersisa)</button>` : "")
      + (!list.length ? `<div class="empty">Tidak ketemu. Coba kata kunci bahasa Inggris, mis. "row", "press", "fly".</div>` : "");
    $$("[data-ex]", res).forEach(b => b.onclick = () => {
      if (mode === "lib") return openTutorial(b.dataset.ex);
      const e = EXMAP[b.dataset.ex], day = S.plan.days[di];
      if (mode === "swap") { day.items[swapIdx] = {...day.items[swapIdx], id:e.id, name:e.name}; toast("Gerakan diganti"); }
      else { day.items.push({id:e.id, name:e.name, sets:3, reps:"8-12"}); if (day.tpl === "rest" && day.name === "Rest") day.name = "Custom"; toast(`Ditambahkan ke ${DAYS_FULL[di]}`); }
      if (S.plan.type !== "custom") S.plan.type = "custom";
      save(); closeSheet(); go();
    });
    const m = $("#lmore", res); if (m) m.onclick = () => { LIB.n += 40; render(); };
  };
  let tmr;
  $("#lq", root).oninput = e => { clearTimeout(tmr); tmr = setTimeout(() => { LIB.q = e.target.value; LIB.n = 40; render(); }, 160); };
  $$("[data-bp]", root).forEach(b => b.onclick = () => { LIB.bp = b.dataset.bp; LIB.n = 40; $$("[data-bp]", root).forEach(x => x.classList.toggle("on", x === b)); render(); });
  $$("[data-eq]", root).forEach(b => b.onclick = () => { LIB.eq = b.dataset.eq; LIB.n = 40; $$("[data-eq]", root).forEach(x => x.classList.toggle("on", x === b)); render(); });
  Promise.all([loadExercises(), checkMedia()]).then(render).catch(() => { $("#lres", root).innerHTML = `<div class="empty">Gagal memuat data gerakan. Cek koneksi lalu buka lagi.</div>`; });
}
function openLibrary(mode, di, swapIdx){
  openSheet(mode === "swap" ? "Ganti gerakan" : `Tambah ke ${DAYS_FULL[di]}`, libraryHTML(mode), b => bindLibrary(b, mode, di, swapIdx));
}
function openTutorial(id){
  openSheet("Tutorial gerakan", `<div class="empty">Memuat…</div>`, b => {
    Promise.all([loadExercises(), checkMedia()]).then(() => {
      const e = EXMAP[id];
      if (!e) { b.innerHTML = `<div class="empty">Gerakan tidak ditemukan.</div>`; return; }
      const yt = "https://www.youtube.com/results?search_query=" + encodeURIComponent(e.name + " exercise proper form");
      const vid = (window.VIDEOS || {})[e.id];
      const video = vid
        ? `<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/${vid}?rel=0&playsinline=1&modestbranding=1" title="Video tutorial ${esc(e.name)}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
           <div class="yt-links"><a href="https://www.youtube.com/watch?v=${vid}" target="_blank" rel="noopener">Video tidak bisa diputar? Buka di YouTube</a><a href="${yt}" target="_blank" rel="noopener">Cari video lain</a></div>`
        : "";
      b.innerHTML = `${video}${!vid && MEDIA ? `<div class="tut-media"><video src="media/clip/${e.id}.mp4" poster="media/still/${e.id}.webp" autoplay muted loop playsinline aria-label="Animasi ${esc(e.name)}"></video></div>` : ""}
        <div><h2 style="font-size:24px;font-weight:800;text-transform:capitalize;line-height:1.2">${esc(e.name)}</h2>
        <div class="row" style="gap:6px;margin-top:10px;flex-wrap:wrap"><span class="tag">${BP_ID[e.bp] || e.bp}</span><span class="tag">${EQ_ID[e.eq] || e.eq}</span></div></div>
        <p style="color:var(--muted)">${esc(e.desc)}</p>
        <div><p class="small" style="font-weight:700;margin-bottom:8px">Otot yang dilatih</p><div class="muscle"><span class="tag p">${esc(e.target)}</span>${e.sec.map(m => `<span class="tag">${esc(m)}</span>`).join("")}</div></div>
        <div><p class="small" style="font-weight:700;margin-bottom:10px">Langkah-langkah</p><ol class="steps-list">${e.steps.map(s => `<li><span>${esc(s)}</span></li>`).join("")}</ol></div>
        ${vid ? "" : `<a class="btn btn-lime btn-block" href="${yt}" target="_blank" rel="noopener">${ic("play","ic-sm")} Cari video di YouTube</a>`}
        <p class="note">Sumber teks: katalog latihan openGym (github.com/DuarteSantos8/openGym), lisensi AGPL-3.0. ${vid ? "Video diputar dari YouTube." : "Gerakan ini belum punya video pilihan, tombol di atas membuka pencarian YouTube."}</p>`;
      const v = $("video", b); if (v) v.onerror = () => { const m = v.closest(".tut-media"); if (m) m.remove(); };
    }).catch(() => { b.innerHTML = `<div class="empty">Gagal memuat data gerakan.</div>`; });
  });
}

/* ================== MAKAN ================== */
function vFood(){
  const k = curDate, L = peek(k), t = dayTotals(k), tg = T();
  return `<div class="top"><h1 class="page-title">Makan</h1><button class="icon-btn lime" id="fAdd" aria-label="Tambah makanan">${ic("plus")}</button></div>
  <div class="row between card" style="padding:10px 12px;border-radius:999px">
    <button class="icon-btn" style="width:38px;height:38px" id="fPrev" aria-label="Hari sebelumnya">${ic("back","ic-sm")}</button>
    <b>${k === today() ? "Hari ini" : niceDate(k)}</b>
    <button class="icon-btn" style="width:38px;height:38px" id="fNext" aria-label="Hari berikutnya" ${k >= today() ? "disabled" : ""}>${ic("next","ic-sm")}</button>
  </div>
  <div class="card">
    <div class="row" style="gap:16px">
      ${ring(t.kcal/tg.kcal, 112, 11, `<div class="ring-center"><b class="num" style="font-size:22px">${fmt(t.kcal)}</b><span class="tiny">/ ${fmt(tg.kcal)}</span></div>`)}
      <div class="macros grow">${mbar("Protein", t.p, tg.p)}${mbar("Karbo", t.c, tg.c)}${mbar("Lemak", t.f, tg.f)}</div>
    </div>
    <button class="link" id="fMicro" style="margin-top:14px">Lihat mikronutrisi harian →</button>
  </div>
  ${MEALS.map(([m, name]) => { const items = L.foods.map((f, i) => ({f, i})).filter(x => x.f.m === m); const kc = items.reduce((a, x) => a + x.f.v[0]*x.f.q, 0);
    return `<div><div class="meal-h"><b>${name}</b><span class="small muted num">${fmt(kc)} kkal</span></div>
    <div class="list">${items.map(({f, i}) => `<button class="item" data-fi="${i}"><span class="grow"><span class="name" style="text-transform:none">${esc(f.n)}</span><span class="sub" style="display:block">${f.q !== 1 ? f.q+" × " : ""}${esc(f.pt)} · P ${r0(f.v[1]*f.q)}g · K ${r0(f.v[2]*f.q)}g · L ${r0(f.v[3]*f.q)}g</span></span><span class="kcal num">${fmt(f.v[0]*f.q)}<span class="tiny muted" style="display:block;font-weight:500">kkal</span></span></button>`).join("")}
    <button class="item" data-addm="${m}" style="border-style:dashed;justify-content:center;color:var(--muted)">${ic("plus","ic-sm")} Tambah ${name.toLowerCase()}</button></div></div>`; }).join("")}`;
}
function bFood(){
  $("#fAdd").onclick = () => openFoodPicker();
  $("#fPrev").onclick = () => { curDate = addDays(curDate, -1); go(); };
  $("#fNext").onclick = () => { if (curDate < today()) { curDate = addDays(curDate, 1); go(); } };
  $("#fMicro").onclick = () => openMicro(curDate);
  $$("[data-addm]").forEach(b => b.onclick = () => openFoodPicker(b.dataset.addm));
  $$("[data-fi]").forEach(b => b.onclick = () => { const i = +b.dataset.fi; const f = peek(curDate).foods[i]; openFoodDetail(f, {edit:i}); });
}
function nutTable(v, q, showPct){
  const tg = T(), x = nv(v, q);
  return `<table class="nut"><tbody>${NUT.map(([c, l, u], i) => `<tr class="${i<4?"h":""}"><td>${l}</td><td>${c==="kcal"?fmt(x[c]):r1(x[c])} ${u}</td>${showPct ? `<td>${tg[c] ? r0(x[c]/tg[c]*100)+"%" : ""}</td>` : ""}</tr>`).join("")}</tbody></table>`;
}
function openMicro(k){
  const t = dayTotals(k), tg = T();
  openSheet("Nutrisi harian", `<p class="small muted">${niceDate(k)} · persen dari target harian kamu.</p>
    <div class="list">${NUT.map(([c, l, u]) => { const p = tg[c] ? t[c]/tg[c] : 0; const lim = LIMIT[c]; return `<div><div class="bar-l"><span>${l}${lim ? ` <span class="tiny muted">(batas maks)</span>` : ""}</span><span class="muted num">${c==="kcal"?fmt(t[c]):r1(t[c])} / ${fmt(tg[c])} ${u}</span></div><div class="bar ${lim ? (p>1?"over":"") : (p>1.15?"over":"")}"><i style="width:${Math.min(100,p*100)}%"></i></div></div>`; }).join("")}</div>
    <p class="note">Target mikro mengacu AKG Kemenkes 2019 dan batas WHO (gula &lt;10% kalori, natrium &lt;2.000 mg). Angka makanan adalah estimasi.</p>`);
}
let FP = {src:"warteg", q:"", meal:null};
function openFoodPicker(meal){
  FP.meal = meal || guessMeal();
  const srcs = [["warteg","Warteg"],["mall","Mall & resto"],["umum","Umum"],["recent","Terakhir"],["manual","Manual"]];
  openSheet("Tambah makanan", `<div class="chips" id="fsrc">${srcs.map(([k, l]) => `<button class="chip ${FP.src===k?"on":""}" data-src="${k}">${l}</button>`).join("")}</div>
    <div id="fbody"></div>`, b => {
    const draw = () => {
      const fb = $("#fbody", b);
      if (FP.src === "manual") {
        fb.innerHTML = `<div class="list"><div class="field"><label for="mn">Nama makanan</label><input class="input" id="mn" placeholder="mis. Nasi bebek"></div>
        <div class="field"><label for="mp">Porsi</label><input class="input" id="mp" placeholder="1 porsi"></div>
        <div class="grid2">${[["mk","Kalori (kkal)"],["mpr","Protein (g)"],["mc","Karbo (g)"],["mf","Lemak (g)"]].map(([id, l]) => `<div class="field"><label for="${id}">${l}</label><input class="input num" id="${id}" type="number" inputmode="decimal"></div>`).join("")}</div>
        <button class="btn btn-lime btn-block" id="mAdd">Tambah</button></div>`;
        $("#mAdd", fb).onclick = () => {
          const n = $("#mn", fb).value.trim(), kc = +$("#mk", fb).value;
          if (!n || !kc) return toast("Isi nama dan kalori");
          const v = [kc, +$("#mpr", fb).value || 0, +$("#mc", fb).value || 0, +$("#mf", fb).value || 0, 0,0,0,0,0,0,0,0];
          openFoodDetail({n, pt:$("#mp", fb).value.trim() || "1 porsi", v, src:"manual"});
        };
        return;
      }
      fb.innerHTML = `<div class="search">${ic("search")}<input class="input" id="fq" type="search" placeholder="Cari: ayam, rendang, McD, latte…" value="${esc(FP.q)}" autocomplete="off"></div><div id="flist" class="list" style="margin-top:14px"></div>`;
      const list = () => {
        const q = FP.q.toLowerCase().split(/\s+/).filter(Boolean);
        let pool;
        if (FP.src === "recent") {
          const seen = new Map();
          Object.keys(S.logs).sort().reverse().forEach(k => S.logs[k].foods.forEach(f => { if (!seen.has(f.n)) seen.set(f.n, {src:f.src, grp:"Terakhir dimakan", n:f.n, pt:f.pt, v:f.v}); }));
          pool = [...seen.values()].slice(0, 60);
        } else pool = q.length ? FOODS : FOODS.filter(f => f.src === FP.src);
        const res = pool.filter(f => q.every(w => (f.n+" "+f.grp).toLowerCase().includes(w)));
        let html = "", g = null;
        res.slice(0, 200).forEach(f => {
          const gl = q.length && FP.src !== "recent" ? (f.src === "warteg" ? "Warteg · " : f.src === "mall" ? "" : "Umum · ") + f.grp : f.grp;
          if (gl !== g) { g = gl; html += `<p class="small" style="font-weight:700;color:var(--lime);margin-top:8px">${esc(gl)}</p>`; }
          html += `<button class="item" data-food="${FOODS.indexOf(f) >= 0 ? FOODS.indexOf(f) : "r:"+esc(f.n)}"><span class="grow"><span class="name" style="text-transform:none">${esc(f.n)}</span><span class="sub" style="display:block">${esc(f.pt)} · P ${r1(f.v[1])}g · K ${r1(f.v[2])}g · L ${r1(f.v[3])}g</span></span><span class="kcal num">${fmt(f.v[0])}<span class="tiny muted" style="display:block;font-weight:500">kkal</span></span></button>`;
        });
        $("#flist", fb).innerHTML = html || `<div class="empty">${FP.src === "recent" ? "Belum ada riwayat makanan." : "Tidak ketemu. Coba kata lain atau pakai tab Manual."}</div>`;
        $$("[data-food]", fb).forEach(x => x.onclick = () => {
          const id = x.dataset.food;
          const f = id.startsWith("r:") ? res.find(r => r.n === id.slice(2)) : FOODS[+id];
          openFoodDetail({n:f.n, pt:f.pt, v:f.v, src:f.src, grp:f.grp});
        });
      };
      let tm; $("#fq", fb).oninput = e => { clearTimeout(tm); tm = setTimeout(() => { FP.q = e.target.value; list(); }, 120); };
      list();
    };
    $$("[data-src]", b).forEach(x => x.onclick = () => { FP.src = x.dataset.src; $$("[data-src]", b).forEach(y => y.classList.toggle("on", y === x)); draw(); });
    draw();
  });
}
function openFoodDetail(f, opt = {}){
  let q = opt.edit != null ? f.q : 1, meal = opt.edit != null ? f.m : FP.meal || guessMeal();
  openSheet(esc(f.n), `<div id="fd"></div>`, b => {
    const draw = () => {
      const x = nv(f.v, q);
      $("#fd", b).innerHTML = `<div class="list" style="gap:16px">
        <p class="small muted">${f.grp ? esc(f.grp)+" · " : ""}${esc(f.pt)} per porsi</p>
        <div class="macro-pills"><div><b class="num">${fmt(x.kcal)}</b><span>kkal</span></div><div><b class="num">${r1(x.p)}g</b><span>Protein</span></div><div><b class="num">${r1(x.c)}g</b><span>Karbo</span></div><div><b class="num">${r1(x.f)}g</b><span>Lemak</span></div></div>
        <div class="row between"><span style="font-weight:700">Jumlah porsi</span><div class="stepper"><button id="qm" aria-label="Kurangi">−</button><b class="num">${q}</b><button id="qp" aria-label="Tambah">+</button></div></div>
        <div class="field"><label>Waktu makan</label><div class="seg">${MEALS.map(([m, n]) => `<button data-ml="${m}" class="${meal===m?"on":""}">${n.replace("Makan ","")}</button>`).join("")}</div></div>
        <div><p class="small" style="font-weight:700;margin-bottom:4px">Nutrisi lengkap <span class="muted" style="font-weight:500">(% dari target harian)</span></p>${nutTable(f.v, q, true)}</div>
        <button class="btn btn-lime btn-block" id="fdAdd">${opt.edit != null ? "Simpan perubahan" : "Tambah ke " + MEALS.find(m => m[0]===meal)[1].toLowerCase()}</button>
        ${opt.edit != null ? `<button class="btn btn-danger btn-block" id="fdDel">${ic("trash","ic-sm")} Hapus</button>` : ""}
        <p class="note">Angka gizi adalah estimasi per porsi umum. Porsi tiap warung/outlet bisa beda.</p></div>`;
      $("#qm", b).onclick = () => { q = Math.max(0.5, r1(q - 0.5)); draw(); };
      $("#qp", b).onclick = () => { q = Math.min(10, r1(q + 0.5)); draw(); };
      $$("[data-ml]", b).forEach(x => x.onclick = () => { meal = x.dataset.ml; draw(); });
      $("#fdAdd", b).onclick = () => {
        const L = log(curDate);
        if (opt.edit != null) { L.foods[opt.edit].q = q; L.foods[opt.edit].m = meal; }
        else L.foods.push({n:f.n, pt:f.pt, v:f.v, q, m:meal, src:f.src || "manual", t:Date.now()});
        save(); closeSheet(); toast(`${f.n} ${opt.edit != null ? "diperbarui" : "ditambahkan"}`);
        if (view !== "food" && view !== "home") view = "food";
        go();
      };
      const del = $("#fdDel", b); if (del) del.onclick = () => { log(curDate).foods.splice(opt.edit, 1); save(); closeSheet(); go(); toast("Dihapus"); };
    };
    draw();
  });
}

/* ================== PROGRESS ================== */
function vProgress(){
  const k = today(), tg = T();
  const seg = `<div class="seg">${[["day","Hari"],["week","Minggu"],["month","Bulan"],["q90","90 Hari"]].map(([v, l]) => `<button data-rg="${v}" class="${progRange===v?"on":""}">${l}</button>`).join("")}</div>`;
  let main = "";
  if (progRange === "day") {
    const t = dayTotals(k), ws = woStats(k), w = peek(k).wo;
    main = `<div class="card" style="display:flex;flex-direction:column;align-items:center;gap:18px;padding-top:24px">
      <div style="position:relative">${ring(t.kcal/tg.kcal, 200, 16, `<div class="ring-center"><span>Hari ini</span><b class="num">${fmt(t.kcal)}</b><span>kkal masuk</span></div>`)}<span class="ring-pill num">Target: ${fmt(tg.kcal)}</span></div></div>
    <div class="grid3">
      ${miniStat("fire", "Kalori keluar", fmt(w?.finished ? w.kcal : 0), "kkal")}
      ${miniStat("clock", "Waktu latihan", w?.finished ? w.min+"m" : "0m", "estimasi")}
      ${miniStat("target", "Protein", r0(t.p)+"g", "/ "+tg.p+"g")}
    </div>
    <div class="card"><div class="section-head"><h3>Nutrisi hari ini</h3></div>${nutTable(window.FOOD_COLS.map(c => t[c]), 1, true)}</div>`;
  } else {
    const n = {week:7, month:30, q90:90}[progRange];
    const keys = Array.from({length:n}, (_, i) => addDays(k, i-n+1));
    const data = keys.map(x => ({k:x, t:dayTotals(x), ws:woStats(x), cp:checkPct(x), logged:peek(x).foods.length > 0}));
    const logged = data.filter(d => d.logged);
    const avg = c => logged.length ? logged.reduce((a, d) => a + d.t[c], 0) / logged.length : 0;
    const wos = data.filter(d => d.ws.finished).length;
    const onTarget = logged.filter(d => Math.abs(d.t.kcal - tg.kcal) <= tg.kcal*0.1).length;
    if (progRange === "q90") main = view90(data, logged, avg, wos, onTarget, tg);
    else main = `<div class="card"><div class="section-head"><h3>Kalori per hari</h3><span class="small muted">${n} hari terakhir</span></div>
      ${barChart(data.map(d => ({l: progRange === "week" ? DAYS[wdIdx(d.k)] : String(parseKey(d.k).getDate()), v:d.t.kcal, on:d.ws.finished})), tg.kcal, n)}
      <div class="legend" style="margin-top:10px"><span><i style="background:var(--lime)"></i>Kalori</span><span><i style="background:var(--amber)"></i>Lewat &gt;10%</span><span><i style="background:transparent;border-top:2px dashed var(--muted);height:0;border-radius:0"></i>Target</span></div></div>
    <div class="grid3">
      ${miniStat("dumb", "Latihan", wos, "sesi")}
      ${miniStat("fire", "Rata² kalori", fmt(avg("kcal")), "kkal/hari")}
      ${miniStat("target", "Sesuai target", onTarget+"/"+logged.length, "hari dilog")}
    </div>
    <div class="card"><div class="section-head"><h3>Rata-rata harian</h3><span class="small muted">${logged.length} hari dilog</span></div>
      <div class="macros">${mbar("Protein", avg("p"), tg.p)}${mbar("Karbo", avg("c"), tg.c)}${mbar("Lemak", avg("f"), tg.f)}${mbar("Serat", avg("fiber"), tg.fiber)}</div>
      <p class="small muted" style="margin-top:12px">Checklist rata-rata: <b style="color:var(--fg)" class="num">${r0(data.reduce((a, d) => a + d.cp, 0)/n*100)}%</b></p></div>`;
  }
  const recent = Object.keys(S.logs).filter(x => S.logs[x].wo?.finished).sort().reverse().slice(0, 6);
  return `<div class="top"><h1 class="page-title">Progress</h1></div>${seg}${main}
  <div class="card"><div class="section-head"><h3>Berat badan</h3><button class="link" id="pW">+ Catat berat</button></div>${weightChart(progRange === "q90" ? 90 : 0)}</div>
  <div><div class="section-head"><h3>Latihan terakhir</h3></div>
  <div class="list">${recent.length ? recent.map(x => { const w = S.logs[x].wo; return `<div class="item"><span class="thumb">${ic("dumb","ic-sm")}</span><span class="grow"><span class="name">${esc(w.name || "Latihan")}</span><span class="sub" style="display:block">${niceDate(x)} · ${w.min || 0} mnt · ${w.kcal || 0} kkal</span></span><span class="done-tick">${ic("check","ic-sm")}</span></div>`; }).join("") : `<div class="empty">Belum ada latihan selesai. Tap "Selesai latihan" di tab Latihan.</div>`}</div></div>`;
}
/* ---------- tampilan 90 hari ---------- */
function view90(data, logged, avg, wos, onTarget, tg){
  // streak hari berturut-turut yang dilog
  let best = 0, run = 0; data.forEach(d => { run = d.logged ? run + 1 : 0; best = Math.max(best, run); });
  let cur = 0; for (let i = data.length - 1; i >= 0 && data[i].logged; i--) cur++;
  const ws = (S.weights || []).filter(x => x.d >= data[0].k);
  const wDiff = ws.length > 1 ? r1(ws[ws.length-1].kg - ws[0].kg) : null;
  const good = wDiff == null ? true : (S.profile.goal === "bulk" ? wDiff >= 0 : S.profile.goal === "cut" ? wDiff <= 0 : Math.abs(wDiff) <= 1);
  // per minggu (13 minggu, Senin-Minggu)
  const weeks = [];
  for (let s = addDays(today(), -wdIdx(today()) - 7*12); s <= today(); s = addDays(s, 7)) {
    const ks = Array.from({length:7}, (_, i) => addDays(s, i)).filter(x => x <= today());
    const lg = ks.filter(x => peek(x).foods.length);
    const tt = lg.map(dayTotals);
    const wk = (S.weights || []).filter(x => x.d >= s && x.d <= addDays(s, 6));
    weeks.push({s, wo:ks.filter(x => woStats(x).finished).length, n:lg.length,
      kcal: tt.length ? tt.reduce((a, t) => a + t.kcal, 0)/tt.length : 0,
      p: tt.length ? tt.reduce((a, t) => a + t.p, 0)/tt.length : 0,
      kg: wk.length ? wk[wk.length-1].kg : null});
  }
  const short = k => parseKey(k).toLocaleDateString("id-ID", {day:"numeric", month:"short"});
  return `
  <div class="grid2">
    ${miniStat("dumb", "Total latihan", wos, "sesi · 90 hari")}
    ${miniStat("fire", "Rata² kalori", fmt(avg("kcal")), "target " + fmt(tg.kcal))}
    ${miniStat("target", "Hari sesuai target", onTarget + "/" + logged.length, "hari dilog")}
    ${miniStat("scale", "Perubahan berat", wDiff == null ? "–" : (wDiff > 0 ? "+" : "") + wDiff + " kg", wDiff == null ? "catat minimal 2x" : good ? "sesuai goal" : "belum sesuai goal")}
  </div>
  <div class="card"><div class="section-head"><h3>Tren kalori 90 hari</h3><span class="small muted">${logged.length} hari dilog</span></div>
    ${trendChart(data, tg.kcal)}
    <div class="legend" style="margin-top:10px"><span><i style="background:var(--lime);opacity:.35"></i>Harian</span><span><i style="background:var(--lime)"></i>Rata-rata 7 hari</span><span><i style="background:transparent;border-top:2px dashed var(--muted);height:0;border-radius:0"></i>Target</span></div></div>
  <div class="card"><div class="section-head"><h3>Konsistensi 13 minggu</h3><span class="small muted num">Streak ${cur} hari · terbaik ${best}</span></div>
    ${heatmap()}
    <div class="legend" style="margin-top:10px"><span><i style="background:var(--surface-2)"></i>Kosong</span><span><i style="background:#4d5a22"></i>Dilog</span><span><i style="background:#93b62a"></i>Checklist ≥67%</span><span><i style="background:var(--lime)"></i>Latihan selesai</span></div></div>
  <div class="card"><div class="section-head"><h3>Rata-rata 90 hari</h3></div>
    <div class="macros">${mbar("Protein", avg("p"), tg.p)}${mbar("Karbo", avg("c"), tg.c)}${mbar("Lemak", avg("f"), tg.f)}${mbar("Serat", avg("fiber"), tg.fiber)}</div></div>
  <div class="card"><div class="section-head"><h3>Ringkasan per minggu</h3><span class="small muted">terbaru di atas</span></div>
    <div style="overflow-x:auto"><table class="nut wk-table"><thead><tr><td>Minggu</td><td>Latihan</td><td>Kalori</td><td>Protein</td><td>Berat</td></tr></thead><tbody>
    ${weeks.slice().reverse().map(w => `<tr><td>${short(w.s)}</td><td>${w.wo}</td><td>${w.n ? fmt(w.kcal) : "–"}</td><td>${w.n ? r0(w.p) + "g" : "–"}</td><td>${w.kg ?? "–"}</td></tr>`).join("")}
    </tbody></table></div></div>`;
}
function trendChart(data, target){
  const W = 320, H = 160, pl = 30, pb = 18, pt = 8, n = data.length;
  const vals = data.map(d => d.t.kcal);
  const max = Math.max(target*1.3, ...vals, 1);
  const bw = (W-pl)/n, X = i => pl + i*bw + bw/2, Y = v => pt + (H-pt-pb)*(1 - v/max);
  // rata-rata bergerak 7 hari, hanya dari hari yang dilog
  const ma = data.map((_, i) => { const win = data.slice(Math.max(0, i-6), i+1).filter(d => d.logged); return win.length ? win.reduce((a, d) => a + d.t.kcal, 0)/win.length : null; });
  let path = "", pen = false;
  ma.forEach((v, i) => { if (v == null) { pen = false; return; } path += (pen ? "L" : "M") + X(i).toFixed(1) + " " + Y(v).toFixed(1) + " "; pen = true; });
  const ticks = [0, Math.round(max/2/100)*100, Math.round(max/100)*100];
  const months = data.map((d, i) => ({i, d:parseKey(d.k)})).filter(o => o.d.getDate() === 1 || o.i === 0);
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tren kalori 90 hari">
    ${ticks.map(t => `<line x1="${pl}" x2="${W}" y1="${Y(t)}" y2="${Y(t)}" stroke="var(--line)"/><text x="${pl-4}" y="${Y(t)+3}" text-anchor="end">${t >= 1000 ? r1(t/1000)+"k" : t}</text>`).join("")}
    ${months.map(o => `<line x1="${X(o.i)}" x2="${X(o.i)}" y1="${pt}" y2="${H-pb}" stroke="var(--line)" stroke-dasharray="2 3"/><text x="${X(o.i)+2}" y="${H-5}">${o.d.toLocaleDateString("id-ID",{month:"short"})}</text>`).join("")}
    ${data.map((d, i) => d.logged ? `<rect x="${X(i)-bw*0.35}" y="${Y(d.t.kcal)}" width="${bw*0.7}" height="${Y(0)-Y(d.t.kcal)}" fill="${d.t.kcal > target*1.1 ? "var(--amber)" : "var(--lime)"}" opacity=".35"/>` : "").join("")}
    <line x1="${pl}" x2="${W}" y1="${Y(target)}" y2="${Y(target)}" stroke="var(--fg)" stroke-opacity=".55" stroke-dasharray="4 4" stroke-width="1.2"/>
    <path d="${path}" fill="none" stroke="var(--lime)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
}
function heatmap(){
  const start = addDays(today(), -wdIdx(today()) - 7*12), cs = 19, gap = 4, pl = 26, ptop = 16;
  const W = pl + 13*(cs+gap), H = ptop + 7*(cs+gap);
  let cells = "", mlabels = "", lastM = -1;
  for (let w = 0; w < 13; w++) {
    const wk = addDays(start, w*7), m = parseKey(wk).getMonth();
    if (m !== lastM) { mlabels += `<text x="${pl + w*(cs+gap)}" y="10">${parseKey(wk).toLocaleDateString("id-ID",{month:"short"})}</text>`; lastM = m; }
    for (let d = 0; d < 7; d++) {
      const k = addDays(start, w*7 + d);
      if (k > today()) continue;
      const L = peek(k), lv = woStats(k).finished ? 3 : (L.foods.length && checkPct(k) >= 0.67) ? 2 : L.foods.length ? 1 : 0;
      const fill = ["var(--surface-2)", "#4d5a22", "#93b62a", "var(--lime)"][lv];
      cells += `<rect x="${pl + w*(cs+gap)}" y="${ptop + d*(cs+gap)}" width="${cs}" height="${cs}" rx="5" fill="${fill}" ${k === today() ? 'stroke="var(--fg)" stroke-width="1.5"' : ""}><title>${niceDate(k)}</title></rect>`;
    }
  }
  const dl = [0, 2, 4, 6].map(d => `<text x="0" y="${ptop + d*(cs+gap) + 13}">${DAYS[d]}</text>`).join("");
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Konsistensi 13 minggu">${mlabels}${dl}${cells}</svg>`;
}
function miniStat(i, l, v, s){ return `<div class="card" style="padding:14px 8px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px;border-radius:var(--r-md)"><span style="color:var(--lime)">${ic(i)}</span><span class="tiny muted">${l}</span><b class="num" style="font-size:18px">${v}</b><span class="tiny" style="color:var(--dim)">${s}</span></div>`; }
function barChart(items, target, n){
  const W = 320, H = 150, pl = 30, pb = 18, pt = 8;
  const max = Math.max(target*1.25, ...items.map(i => i.v), 1);
  const bw = (W-pl)/items.length, y = v => pt + (H-pt-pb)*(1 - v/max);
  const ticks = [0, Math.round(max/2/100)*100, Math.round(max/100)*100].filter((v, i, a) => a.indexOf(v) === i && v <= max);
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik kalori">
    ${ticks.map(t => `<line x1="${pl}" x2="${W}" y1="${y(t)}" y2="${y(t)}" stroke="var(--line)" stroke-width="1"/><text x="${pl-4}" y="${y(t)+3}" text-anchor="end">${t >= 1000 ? r1(t/1000)+"k" : t}</text>`).join("")}
    ${items.map((it, i) => { const h = Math.max(0, y(0) - y(it.v)); const x = pl + i*bw + bw*0.18; const over = it.v > target*1.1; return `<rect x="${x}" y="${y(it.v)}" width="${bw*0.64}" height="${h}" rx="${Math.min(4, bw*0.3)}" fill="${over ? "var(--amber)" : "var(--lime)"}" opacity="${it.v ? 1 : 0}"/>${n <= 7 || i % 5 === 0 || i === items.length-1 ? `<text x="${pl + i*bw + bw/2}" y="${H-4}" text-anchor="middle">${it.l}</text>` : ""}`; }).join("")}
    <line x1="${pl}" x2="${W}" y1="${y(target)}" y2="${y(target)}" stroke="var(--fg)" stroke-opacity=".55" stroke-dasharray="4 4" stroke-width="1.2"/>
  </svg>`;
}
function weightChart(days){
  const from = days ? addDays(today(), -days + 1) : "";
  const w = days ? (S.weights || []).filter(x => x.d >= from) : (S.weights || []).slice(-30);
  if (!w.length) return `<div class="empty">Belum ada data berat.</div>`;
  const cur = w[w.length-1].kg, first = w[0].kg, diff = r1(cur - first);
  const head = `<div class="row" style="gap:18px;margin-bottom:10px"><div><span class="tiny muted">Sekarang</span><b class="num" style="display:block;font-size:24px">${cur} kg</b></div><div><span class="tiny muted">Perubahan</span><b class="num" style="display:block;font-size:24px;color:${(S.profile.goal==="bulk" ? diff >= 0 : diff <= 0) ? "var(--lime)" : "var(--amber)"}">${diff > 0 ? "+" : ""}${diff} kg</b></div></div>`;
  if (w.length < 2) return head + `<p class="small muted">Catat lagi minggu depan untuk melihat grafik.</p>`;
  const W = 320, H = 120, pl = 30, pb = 16, pt = 10;
  const mn = Math.min(...w.map(x => x.kg)) - 0.5, mx = Math.max(...w.map(x => x.kg)) + 0.5;
  const X = i => pl + (W-pl-8) * i/(w.length-1), Y = v => pt + (H-pt-pb)*(1-(v-mn)/(mx-mn));
  const pts = w.map((x, i) => `${X(i)},${Y(x.kg)}`).join(" ");
  return head + `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik berat badan">
    ${[mn+0.5, (mn+mx)/2, mx-0.5].map(v => `<line x1="${pl}" x2="${W}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${pl-4}" y="${Y(v)+3}" text-anchor="end">${r1(v)}</text>`).join("")}
    <polygon points="${X(0)},${H-pb} ${pts} ${X(w.length-1)},${H-pb}" fill="var(--lime)" opacity=".12"/>
    <polyline points="${pts}" fill="none" stroke="var(--lime)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${X(w.length-1)}" cy="${Y(cur)}" r="5" fill="var(--lime)" stroke="var(--bg)" stroke-width="2"/>
    <text x="${X(0)}" y="${H-2}" text-anchor="start">${parseKey(w[0].d).toLocaleDateString("id-ID",{day:"numeric",month:"short"})}</text><text x="${X(w.length-1)}" y="${H-2}" text-anchor="end">${parseKey(w[w.length-1].d).toLocaleDateString("id-ID",{day:"numeric",month:"short"})}</text>
  </svg>`;
}
function bProgress(){
  $$("[data-rg]").forEach(b => b.onclick = () => { progRange = b.dataset.rg; go(); });
  $("#pW").onclick = () => openSheet("Catat berat badan", `<div class="field"><label for="wk">Berat hari ini (kg)</label><input class="input num" id="wk" type="number" inputmode="decimal" step="0.1" value="${S.profile.weight}"></div>
    <label class="row small" style="gap:10px"><input type="checkbox" id="wr" checked style="width:20px;height:20px;accent-color:#cdf33a"> Hitung ulang target kalori dengan berat baru</label>
    <button class="btn btn-lime btn-block" id="wSave">Simpan</button>`, b => {
    $("#wSave", b).onclick = () => { const kg = +$("#wk", b).value; if (!(kg >= 30 && kg <= 250)) return toast("Berat 30-250 kg"); addWeight(kg); if ($("#wr", b).checked) S.profile.weight = kg; save(); closeSheet(); go(); toast("Berat tercatat"); };
  });
}

/* ================== PROFIL / SETTINGS ================== */
function vProfile(){
  const p = S.profile, t = T();
  const gl = {bulk:"Bulking", cut:"Cutting", maintain:"Maintain"}[p.goal];
  return `<div class="top"><h1 class="page-title">Profil & Settings</h1></div>
  <div class="card row" style="gap:16px"><span class="avatar">${esc(p.name[0] || "?").toUpperCase()}</span><div class="grow"><b style="font-size:19px">${esc(p.name)}</b><p class="small muted num">${p.sex==="m"?"Laki-laki":"Perempuan"} · ${p.age} th · ${p.height} cm · ${p.weight} kg</p><span class="tag" style="background:var(--lime);color:var(--lime-ink);margin-top:6px;text-transform:none">${gl} · ${fmt(t.kcal)} kkal</span></div></div>
  <div class="kv"><div><b class="num">${fmt(t.tdee)}</b><span>TDEE</span></div><div><b class="num">${t.p}g</b><span>Protein</span></div><div><b class="num">${t.c}g / ${t.f}g</b><span>Karbo / Lemak</span></div></div>
  <div class="card" style="padding:4px 18px">
    <button class="settings-row" id="sEdit"><span class="ci">${ic("edit","ic-sm")}</span><span class="grow"><b>Edit data & kalkulator TDEE</b><span class="small muted" style="display:block">Nama, umur, berat, aktivitas, goal bulking/cutting</span></span>${ic("next","ic-sm")}</button>
    <button class="settings-row" id="sPlan"><span class="ci">${ic("dumb","ic-sm")}</span><span class="grow"><b>Program latihan</b><span class="small muted" style="display:block">${SPLITS[S.plan.type]?.name || "Custom"} · ganti PPL / Upper-Lower / custom</span></span>${ic("next","ic-sm")}</button>
    <button class="settings-row" id="sCheck"><span class="ci">${ic("list","ic-sm")}</span><span class="grow"><b>Atur checklist diet</b><span class="small muted" style="display:block">${S.checklist.length} item</span></span>${ic("next","ic-sm")}</button>
    <button class="settings-row" id="sAccess"><span class="ci">${ic(S.access==="app"?"phone":"globe","ic-sm")}</span><span class="grow"><b>Mode akses</b><span class="small muted" style="display:block">${isStandalone() ? "Aplikasi (terinstall)" : S.access==="app" ? "Aplikasi" : "Web"} · ganti / install</span></span>${ic("next","ic-sm")}</button>
  </div>
  <div class="card" style="padding:4px 18px">
    <button class="settings-row" id="sExport"><span class="ci">${ic("dl","ic-sm")}</span><span class="grow"><b>Backup data</b><span class="small muted" style="display:block">Simpan file .json untuk pindah device</span></span></button>
    <button class="settings-row" id="sImport"><span class="ci">${ic("up","ic-sm")}</span><span class="grow"><b>Restore data</b><span class="small muted" style="display:block">Muat dari file backup</span></span></button>
    <button class="settings-row" id="sReset"><span class="ci" style="color:var(--red)">${ic("trash","ic-sm")}</span><span class="grow"><b style="color:var(--red)">Hapus semua data</b><span class="small muted" style="display:block">Mulai dari awal di device ini</span></span></button>
  </div>
  <p class="note">${ic("lock","ic-sm")} Semua data disimpan di penyimpanan browser device ini (localStorage). Tidak dikirim ke server mana pun. Membersihkan data browser akan menghapusnya, jadi rutin backup.</p>
  <p class="note">Data latihan: openGym exercise catalogue (AGPL-3.0). Data gizi: estimasi dari TKPI, USDA, dan info gizi publik brand.</p>`;
}
function bProfile(){
  $("#sEdit").onclick = () => startOnb("edit");
  $("#sPlan").onclick = () => startOnb("plan");
  $("#sCheck").onclick = checklistEditor;
  $("#sAccess").onclick = () => openSheet("Mode akses", `<div class="opt-list">
      <button class="opt ${S.access!=="app"?"on":""}" data-acc="web"><span class="dot"></span><span><b>Web</b><small>Pakai di browser</small></span></button>
      <button class="opt ${S.access==="app"?"on":""}" data-acc="app"><span class="dot"></span><span><b>Aplikasi</b><small>Install ke home screen, bisa offline</small></span></button></div>
      <p class="note">Data tetap di device ini. Versi web dan versi terinstall bisa punya penyimpanan terpisah, pakai Backup & Restore untuk memindahkan.</p>`, b => {
      $$("[data-acc]", b).forEach(x => x.onclick = () => { S.access = x.dataset.acc; save(); closeSheet(); if (S.access === "app" && !isStandalone()) installFlow(); else go(); });
  });
  $("#sExport").onclick = () => {
    const data = JSON.stringify(S);
    const name = `lebihfit-backup-${today()}.json`;
    try { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([data], {type:"application/json"})); a.download = name; document.body.append(a); a.click(); a.remove(); } catch(e){}
    openSheet("Backup data", `<p class="small muted">File <b>${name}</b> sedang diunduh. Kalau unduhan tidak jalan, salin teks di bawah dan simpan di catatan.</p>
      <textarea class="input" id="bk" readonly style="min-height:160px;font-size:12px">${esc(data)}</textarea>
      <button class="btn btn-lime btn-block" id="bkCopy">Salin teks backup</button>`, b => {
      $("#bkCopy", b).onclick = () => { const ta = $("#bk", b); (navigator.clipboard ? navigator.clipboard.writeText(ta.value) : Promise.reject()).then(() => toast("Tersalin")).catch(() => { ta.select(); toast("Teks terpilih, salin manual"); }); };
    });
  };
  $("#sImport").onclick = () => openSheet("Restore data", `<p class="small muted">Pilih file backup .json, atau tempel teks backup.</p>
      <input type="file" id="rf" accept="application/json,.json" class="input" style="padding-top:13px">
      <textarea class="input" id="rt" placeholder="…atau tempel teks backup di sini"></textarea>
      <button class="btn btn-lime btn-block" id="rGo">Restore</button>
      <p class="note">Restore akan mengganti semua data di device ini.</p>`, b => {
    const apply = txt => { try { const d = JSON.parse(txt); if (!d || !d.v || !("logs" in d)) throw 0; S = d; save(); closeSheet(); view = "home"; go(); toast("Data berhasil di-restore"); } catch(e){ toast("File/teks backup tidak valid"); } };
    $("#rGo", b).onclick = () => { const f = $("#rf", b).files[0]; if (f) { const rd = new FileReader(); rd.onload = () => apply(rd.result); rd.readAsText(f); } else apply($("#rt", b).value); };
  });
  $("#sReset").onclick = () => openSheet("Hapus semua data?", `<p>Profil, log makanan, latihan, dan berat badan di device ini akan dihapus permanen.</p>
      <div class="field"><label for="rc">Ketik HAPUS untuk konfirmasi</label><input class="input" id="rc" autocomplete="off"></div>
      <button class="btn btn-danger btn-block" id="rcGo">Hapus permanen</button>`, b => {
    $("#rcGo", b).onclick = () => { if ($("#rc", b).value.trim().toUpperCase() !== "HAPUS") return toast("Ketik HAPUS dulu"); S = blank(); save(); closeSheet(); O = null; view = "home"; go(); };
  });
}
function checklistEditor(){
  openSheet("Checklist diet", `<div id="cl"></div>`, b => {
    const draw = () => {
      $("#cl", b).innerHTML = `<div class="list">${S.checklist.map((i, x) => `<div class="day-row"><span class="grow">${esc(i.t)}${i.auto ? ` <span class="tiny muted">· otomatis</span>` : ""}</span><button class="icon-btn" style="width:36px;height:36px" data-cdel="${x}" aria-label="Hapus">${ic("trash","ic-sm")}</button></div>`).join("")}</div>
      <div class="field"><label for="cnew">Tambah item baru</label><input class="input" id="cnew" placeholder="mis. Tidak minum manis, 10.000 langkah"></div>
      <button class="btn btn-lime btn-block" id="cAdd">Tambah</button>
      <button class="btn btn-line btn-block" id="cDef">Kembalikan ke default</button>`;
      $$("[data-cdel]", b).forEach(x => x.onclick = () => { S.checklist.splice(+x.dataset.cdel, 1); save(); draw(); });
      $("#cAdd", b).onclick = () => { const t = $("#cnew", b).value.trim(); if (!t) return; S.checklist.push({id:"c"+Date.now(), t}); save(); draw(); };
      $("#cDef", b).onclick = () => { S.checklist = blank().checklist; save(); draw(); };
    };
    draw();
  });
  const obs = setInterval(() => { if (!sheetEls) { clearInterval(obs); go(); } }, 300);
}

/* ---------- boot ---------- */
go();
if ("serviceWorker" in navigator && location.protocol === "https:" ) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
// preload exercises in background so tutorials open instantly
setTimeout(() => { loadExercises().catch(() => {}); checkMedia(); }, 1200);
})();
