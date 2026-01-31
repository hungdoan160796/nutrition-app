(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/NutrientCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NutrientCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// app/components/NutrientCard.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function NutrientCard({ id, name, progress, compact = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/nutrients/${id}`,
        className: `rounded-xl bg-neutral-900 ${compact ? "p-2" : "p-4"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `font-medium ${compact ? "text-xs" : "text-sm"}`,
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/components/NutrientCard.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-neutral-400",
                        children: [
                            progress,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NutrientCard.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NutrientCard.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-2 bg-neutral-800 rounded ${compact ? "h-1.5" : "h-2"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-emerald-500 rounded h-full",
                    style: {
                        width: `${progress}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/NutrientCard.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/NutrientCard.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/NutrientCard.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = NutrientCard;
var _c;
__turbopack_context__.k.register(_c, "NutrientCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ProgressRing.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProgressRing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function ProgressRing({ value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-40 h-40 rounded-full border-8 border-neutral-700 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-3xl font-bold",
                    children: [
                        value,
                        "%"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ProgressRing.tsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs text-neutral-400",
                    children: "weekly"
                }, void 0, false, {
                    fileName: "[project]/components/ProgressRing.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ProgressRing.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ProgressRing.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = ProgressRing;
var _c;
__turbopack_context__.k.register(_c, "ProgressRing");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/nutrientRegistry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllNutrients",
    ()=>getAllNutrients,
    "getNutrientById",
    ()=>getNutrientById,
    "getNutrientByUsdaName",
    ()=>getNutrientByUsdaName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$nutrients$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/nutrients.json (json)");
;
const nutrients = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$nutrients$2e$json__$28$json$29$__["default"].nutrients;
// Map USDA name → nutrient ID
const usdaNameToId = new Map();
for (const n of nutrients){
    for (const name of n.usda_names){
        usdaNameToId.set(name, n);
    }
}
function getNutrientByUsdaName(name) {
    return usdaNameToId.get(name);
}
function getNutrientById(id) {
    return nutrients.find((n)=>n.id === id);
}
function getAllNutrients() {
    return nutrients;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/userProfile.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserProfile",
    ()=>getUserProfile,
    "updateUserProfile",
    ()=>updateUserProfile
]);
let userProfile = {
    recommendationSet: "fda_dv_2024",
    sex: "female",
    age: 30
};
function getUserProfile() {
    return userProfile;
}
function updateUserProfile(update) {
    userProfile = {
        ...userProfile,
        ...update
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/db.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addIntake",
    ()=>addIntake,
    "getAllIntake",
    ()=>getAllIntake,
    "getDB",
    ()=>getDB,
    "initDB",
    ()=>initDB,
    "updateDB",
    ()=>updateDB
]);
(()=>{
    const e = new Error("Cannot find module './localStore'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const DB_NAME = "nutrition_app";
const DB_VERSION = 1;
const STORE_INTAKE = "intake_log";
;
let db = {
    foodLog: {},
    userProfile: null,
    nutrientOverrides: {}
};
async function initDB() {
    const stored = await loadLocalDB();
    if (stored) db = stored;
}
function getDB() {
    return db;
}
async function updateDB(mutator) {
    mutator(db);
    await saveLocalDB(db);
}
let dbPromise = null;
function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject)=>{
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = ()=>{
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_INTAKE)) {
                db.createObjectStore(STORE_INTAKE, {
                    keyPath: "id",
                    autoIncrement: true
                });
            }
        };
        request.onsuccess = ()=>resolve(request.result);
        request.onerror = ()=>reject(request.error);
    });
    return dbPromise;
}
async function addIntake(entry) {
    const db = await openDB();
    const tx = db.transaction(STORE_INTAKE, "readwrite");
    tx.objectStore(STORE_INTAKE).add(entry);
    return tx.oncomplete;
}
async function getAllIntake() {
    const db = await openDB();
    const tx = db.transaction(STORE_INTAKE, "readonly");
    const store = tx.objectStore(STORE_INTAKE);
    return new Promise((resolve)=>{
        const request = store.getAll();
        request.onsuccess = ()=>resolve(request.result);
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/recommendationEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDailyTargets",
    ()=>getDailyTargets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$recommendations$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/recommendations/index.ts [app-client] (ecmascript)");
;
;
function getDailyTargets(profile) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDB"])();
    const overrides = db.nutrientOverrides ?? {};
    const set = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$recommendations$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RECOMMENDATION_SETS"][profile.recommendationSet];
    const targets = {};
    for (const r of set.recommendations){
        if ((r.sex === "any" || r.sex === profile.sex) && profile.age >= r.age_min && profile.age <= r.age_max) {
            targets[r.nutrient_id] = r.daily_value;
        }
    }
    // overrides always win
    for (const [id, value] of Object.entries(overrides)){
        targets[id] = value;
    }
    return targets;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/nutritionEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WEEK_START",
    ()=>WEEK_START,
    "getNutrientDetail",
    ()=>getNutrientDetail,
    "getWeeklyProgress",
    ()=>getWeeklyProgress,
    "logFood",
    ()=>logFood
]);
// /lib/nutritionEngine.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutrientRegistry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nutrientRegistry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$userProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/userProfile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/recommendationEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$foods_clean$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/foods_clean.json (json)");
;
;
;
;
;
const WEEK_START = 1;
// ---------- Week Helpers ----------
function getWeekRange(baseDate = new Date()) {
    const d = new Date(baseDate);
    const diff = (d.getDay() - WEEK_START + 7) % 7;
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    const start = new Date(d);
    const end = new Date(d);
    end.setDate(end.getDate() + 7);
    return {
        start: start.toISOString().slice(0, 10),
        end: end.toISOString().slice(0, 10)
    };
}
function isWithinWeek(dateIso, startIso, endIso) {
    return dateIso >= startIso && dateIso < endIso;
}
async function logFood(foodId, grams) {
    const food = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$foods_clean$2e$json__$28$json$29$__["default"].find((f)=>f.id === foodId);
    if (!food) return;
    const date = new Date().toISOString().slice(0, 10);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDB"])((db)=>{
        if (!db.foodLog[date]) db.foodLog[date] = [];
        db.foodLog[date].push({
            id: food.id,
            name: food.name,
            grams,
            nutrients: food.nutrients,
            loggedAt: Date.now()
        });
    });
}
async function getWeeklyProgress(baseDate = new Date()) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initDB"])();
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDB"])();
    const { start, end } = getWeekRange(baseDate);
    const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$userProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserProfile"])();
    const dailyTargets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDailyTargets"])(profile);
    const weeklyTargets = {};
    for (const [nutrientId, daily] of Object.entries(dailyTargets)){
        weeklyTargets[nutrientId] = daily * 7;
    }
    const totals = {};
    for (const [date, foods] of Object.entries(db.foodLog)){
        if (!isWithinWeek(date, start, end)) continue;
        for (const entry of foods){
            const factor = entry.grams / 100;
            for (const [nutrientId, amountPer100g] of Object.entries(entry.nutrients)){
                totals[nutrientId] = (totals[nutrientId] ?? 0) + amountPer100g * factor;
            }
        }
    }
    const nutrientProgress = [];
    for (const [nutrientId, target] of Object.entries(weeklyTargets)){
        if (!target || !(nutrientId in totals)) continue;
        const def = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutrientRegistry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNutrientById"])(nutrientId);
        if (!def) continue;
        const intake = totals[nutrientId];
        nutrientProgress.push({
            id: nutrientId,
            name: def.label,
            progress: Math.min(100, Math.round(intake / target * 100))
        });
    }
    const overall = nutrientProgress.length === 0 ? 0 : nutrientProgress.reduce((s, n)=>s + n.progress, 0) / nutrientProgress.length;
    return {
        overall: Math.round(overall),
        all: nutrientProgress,
        focus: nutrientProgress.filter((n)=>n.progress < 100).sort((a, b)=>a.progress - b.progress)
    };
}
async function getNutrientDetail(nutrientId, baseDate = new Date()) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initDB"])();
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDB"])();
    const { start, end } = getWeekRange(baseDate);
    const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$userProfile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserProfile"])();
    const dailyTargets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDailyTargets"])(profile);
    const target = dailyTargets[nutrientId] ? dailyTargets[nutrientId] * 7 : null;
    if (!target) return null;
    const def = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutrientRegistry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNutrientById"])(nutrientId);
    if (!def) return null;
    let total = 0;
    const grouped = {};
    for (const [date, foods] of Object.entries(db.foodLog)){
        if (!isWithinWeek(date, start, end)) continue;
        for (const entry of foods){
            const factor = entry.grams / 100;
            const amountPer100g = entry.nutrients?.[nutrientId];
            if (!amountPer100g) continue;
            const amount = amountPer100g * factor;
            total += amount;
            grouped[entry.name] = (grouped[entry.name] ?? 0) + amount;
        }
    }
    const contributions = Object.entries(grouped).map(([foodName, amount])=>({
            foodName,
            amount: Number(amount.toFixed(2))
        })).sort((a, b)=>b.amount - a.amount).slice(0, 5);
    return {
        name: def.label,
        unit: def.unit,
        intake: Number(total.toFixed(2)),
        target,
        progress: Math.min(100, Math.round(total / target * 100)),
        contributions
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NutrientCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NutrientCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProgressRing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ProgressRing.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutritionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nutritionEngine.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// app/page.tsx
"use client";
;
;
;
;
const MACROS = [
    "protein",
    "fat",
    "carbohydrate"
];
function HomePage() {
    _s();
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutritionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWeeklyProgress"])().then(setProgress);
        }
    }["HomePage.useEffect"], []);
    if (!progress) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4",
            children: "Loading…"
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 20,
            columnNumber: 12
        }, this);
    }
    const calories = progress.all.find((n)=>n.id === "calories");
    const macros = progress.all.filter((n)=>MACROS.includes(n.id));
    macros.forEach((n)=>{
        console.log(n.id, n.progress);
    });
    if (!progress) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4",
            children: "Loading…"
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 28,
            columnNumber: 12
        }, this);
    }
    const micros = progress.all.filter((n)=>!MACROS.includes(n.id) && n.id !== "calories");
    micros.forEach((n)=>{
        console.log(n.id, n.progress);
    });
    const microAvg = micros.length === 0 ? 0 : Math.round(micros.reduce((sum, n)=>sum + n.progress, 0) / micros.length * 100) / 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold",
                children: "This Week"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm uppercase text-neutral-400",
                        children: "Calorie"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid  gap-3",
                        children: calories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NutrientCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            ...calories
                        }, calories.id, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 48,
                            columnNumber: 26
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm uppercase text-neutral-400",
                        children: "Macros"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-3",
                        children: macros.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NutrientCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                ...n
                            }, n.id, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-sm uppercase text-neutral-400",
                children: "Micros"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProgressRing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    value: microAvg
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 gap-2",
                    children: micros.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NutrientCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            ...n,
                            compact: true
                        }, n.id, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 72,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(HomePage, "UR/JOHKu9jArvWBekRn1NNAb0dw=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_924578b0._.js.map