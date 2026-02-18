(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/data/nutrients.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"nutrients":[{"id":"protein","label":"Protein","unit":"g","category":"macronutrient","usda_names":["Protein"]},{"id":"carbohydrate","label":"Carbo","unit":"g","category":"macronutrient","usda_names":["Carbohydrate, by difference"]},{"id":"fat","label":"Fat","unit":"g","category":"macronutrient","usda_names":["Total lipid (fat)"]},{"id":"fiber","label":"Fiber","unit":"g","category":"macronutrient","usda_names":["Fiber, total dietary"]},{"id":"calories","label":"Calories","unit":"kcal","category":"macronutrient","usda_names":["Energy"]},{"id":"iron","label":"Iron","unit":"mg","category":"mineral","usda_names":["Iron, Fe"]},{"id":"calcium","label":"Calcium","unit":"mg","category":"mineral","usda_names":["Calcium, Ca"]},{"id":"magnesium","label":"Magnesium","unit":"mg","category":"mineral","usda_names":["Magnesium, Mg"]},{"id":"potassium","label":"Potassium","unit":"mg","category":"mineral","usda_names":["Potassium, K"]},{"id":"sodium","label":"Sodium","unit":"mg","category":"mineral","usda_names":["Sodium, Na"]},{"id":"zinc","label":"Zinc","unit":"mg","category":"mineral","usda_names":["Zinc, Zn"]},{"id":"vitamin_a","label":"Vitamin A","unit":"µg","category":"vitamin","usda_names":["Vitamin A, RAE"]},{"id":"vitamin_c","label":"Vitamin C","unit":"mg","category":"vitamin","usda_names":["Vitamin C, total ascorbic acid"]},{"id":"vitamin_d","label":"Vitamin D","unit":"IU","category":"vitamin","usda_names":["Vitamin D (D2 + D3)"]},{"id":"vitamin_e","label":"Vitamin E","unit":"mg","category":"vitamin","usda_names":["Vitamin E (alpha-tocopherol)"]},{"id":"vitamin_k","label":"Vitamin K","unit":"µg","category":"vitamin","usda_names":["Vitamin K (phylloquinone)"]},{"id":"vitamin_b12","label":"Vitamin B12","unit":"µg","category":"vitamin","usda_names":["Vitamin B-12"]},{"id":"vitamin_b6","label":"Folate","unit":"µg","category":"vitamin","usda_names":["Folate, total"]}]});}),
"[project]/lib/nutrientRegistry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getNutrientById",
    ()=>getNutrientById,
    "getNutrientByUsdaName",
    ()=>getNutrientByUsdaName
]);
// this file handles nutrients data format for food
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
async function getDailyTargets(profile) {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDB"])();
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
// lib/nutritionEngine.ts — Firebase-compatible, no React hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutrientRegistry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nutrientRegistry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/recommendationEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-client] (ecmascript)");
;
;
;
const WEEK_START = 2;
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
async function logFood(food) {
    const date = new Date().toISOString().slice(0, 10);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDB"])((db)=>{
        if (!db.foodLog[date]) db.foodLog[date] = [];
        // store both the original per-100g values and a precomputed per-entry
        // nutrients map (scaled by grams) so older entries and other UI
        // components can read either shape.
        const scaled = {};
        for (const [k, v] of Object.entries(food.nutrients ?? {})){
            if (typeof v === "number") scaled[k] = v * food.amount / food.standardAmount;
        }
        db.foodLog[date].push({
            term: food.term,
            name: food.name,
            amount: food.amount,
            standardNutrients: food.nutrients,
            standardAmount: food.standardAmount,
            // per-entry nutrient amounts (e.g., amount contributed by this logged food)
            nutrients: scaled,
            loggedAt: Date.now()
        });
    });
}
async function getWeeklyProgress(baseDate = new Date()) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initDB"])();
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDB"])();
    // debug: log keys / a small sample to help diagnose why totals are zero
    try {
        // eslint-disable-next-line no-console
        console.log("getWeeklyProgress: foodLog keys:", Object.keys(db.foodLog || {}).slice(0, 10));
        const firstKey = Object.keys(db.foodLog || {})[0];
        if (firstKey) {
            // eslint-disable-next-line no-console
            console.log("getWeeklyProgress: sample entry:", db.foodLog[firstKey] && db.foodLog[firstKey][0]);
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log("getWeeklyProgress: failed to log sample", e);
    }
    const { start, end } = getWeekRange(baseDate);
    // Prefer the profile stored in the app DB (keeps behaviour consistent with ProfileProvider)
    // Fall back to the exported userProfile defaults if DB doesn't have values.
    const dbProfile = db.userProfile ?? {};
    const profile = {
        recommendationSet: dbProfile.recommendationSet ?? "fda_dv_2024",
        sex: dbProfile.sex ?? "female",
        age: typeof dbProfile.age === "number" ? dbProfile.age : 30
    };
    const dailyTargets = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDailyTargets"])(profile);
    const weeklyTargets = {};
    for (const [id, daily] of Object.entries(dailyTargets)){
        weeklyTargets[id] = daily * 7;
    }
    const totals = {};
    for (const [date, foods] of Object.entries(db.foodLog)){
        if (!isWithinWeek(date, start, end)) continue;
        for (const entry of foods){
            // Support both shapes:
            // - legacy/other entries may have `nutrients` (already scaled for the
            //   logged grams),
            // - new entries have `nutrientsPer100g` + `grams`.
            if (entry.nutrients && Object.keys(entry.nutrients).length) {
                for (const [nutrientId, amount] of Object.entries(entry.nutrients)){
                    if (typeof amount !== "number") continue;
                    totals[nutrientId] = (totals[nutrientId] ?? 0) + amount;
                }
                continue;
            }
            if (!entry.nutrientsPer100g) continue;
            const factor = entry.grams / 100;
            for (const [nutrientId, per100g] of Object.entries(entry.nutrientsPer100g)){
                if (typeof per100g !== "number") continue;
                totals[nutrientId] = (totals[nutrientId] ?? 0) + per100g * factor;
            }
        }
    }
    const all = [];
    for (const [nutrientId, target] of Object.entries(weeklyTargets)){
        const intake = totals[nutrientId];
        if (!intake || !target) continue;
        const def = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutrientRegistry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNutrientById"])(nutrientId);
        if (!def) continue;
        all.push({
            id: nutrientId,
            name: def.label,
            progress: Math.min(100, Math.round(intake / target * 100))
        });
    }
    const overall = all.length === 0 ? 0 : all.reduce((s, n)=>s + n.progress, 0) / all.length;
    return {
        overall: Math.round(overall),
        all,
        focus: all.filter((n)=>n.progress < 100).sort((a, b)=>a.progress - b.progress)
    };
}
async function getNutrientDetail(nutrientId, baseDate = new Date()) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initDB"])();
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDB"])();
    const { start, end } = getWeekRange(baseDate);
    // Use DB-backed profile (same defaults as elsewhere)
    const dbProfile = db.userProfile ?? {};
    const profile = {
        recommendationSet: dbProfile.recommendationSet ?? "fda_dv_2024",
        sex: dbProfile.sex ?? "female",
        age: typeof dbProfile.age === "number" ? dbProfile.age : 30
    };
    const dailyTargets = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDailyTargets"])(profile);
    const target = dailyTargets[nutrientId] ? dailyTargets[nutrientId] * 7 : null;
    if (!target) return null;
    const def = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutrientRegistry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNutrientById"])(nutrientId);
    if (!def) return null;
    let total = 0;
    const grouped = {};
    for (const [date, foods] of Object.entries(db.foodLog)){
        if (!isWithinWeek(date, start, end)) continue;
        for (const entry of foods){
            // Accept per-entry nutrients if present
            if (entry.nutrients && typeof entry.nutrients[nutrientId] === "number") {
                const amount = entry.nutrients[nutrientId];
                total += amount;
                grouped[entry.name] = (grouped[entry.name] ?? 0) + amount;
                continue;
            }
            if (!entry.nutrientsPer100g) continue;
            const per100g = entry.nutrientsPer100g[nutrientId];
            if (!per100g) continue;
            const amount = entry.grams / 100 * per100g;
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
"[project]/app/nutrients/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NutrientDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutritionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nutritionEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function NutrientDetailPage() {
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const nutrientId = id; // MUST stay string (protein, fat, etc.)
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NutrientDetailPage.useEffect": ()=>{
            let cancelled = false;
            setLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutritionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNutrientDetail"])(nutrientId).then({
                "NutrientDetailPage.useEffect": (res)=>{
                    if (cancelled) return;
                    if (!res) {
                        setData(null);
                        setLoading(false);
                        return;
                    }
                    // nutritionEngine returns contributors keyed by foodId
                    const contributions = Object.values(res.contributions ?? {}).filter({
                        "NutrientDetailPage.useEffect.contributions": (c)=>c.amount > 0
                    }["NutrientDetailPage.useEffect.contributions"]);
                    setData({
                        ...res,
                        contributions
                    });
                    setLoading(false);
                }
            }["NutrientDetailPage.useEffect"]);
            return ({
                "NutrientDetailPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["NutrientDetailPage.useEffect"];
        }
    }["NutrientDetailPage.useEffect"], [
        nutrientId
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4",
            children: "Loading…"
        }, void 0, false, {
            fileName: "[project]/app/nutrients/[id]/page.tsx",
            lineNumber: 46,
            columnNumber: 12
        }, this);
    }
    if (!data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 text-red-400",
            children: "No data for this nutrient."
        }, void 0, false, {
            fileName: "[project]/app/nutrients/[id]/page.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold",
                children: data.name
            }, void 0, false, {
                fileName: "[project]/app/nutrients/[id]/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[var(--muted)] text-[var(--foreground)] rounded-xl p-4 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Progress"
                            }, void 0, false, {
                                fileName: "[project]/app/nutrients/[id]/page.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    data.progress,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/nutrients/[id]/page.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/nutrients/[id]/page.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2 bg-[var(--muted)] rounded",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-2 bg-[var(--accent)] rounded",
                            style: {
                                width: `${data.progress}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/nutrients/[id]/page.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/nutrients/[id]/page.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-neutral-400",
                        children: [
                            data.intake,
                            " / ",
                            data.target,
                            " ",
                            data.unit,
                            " this week"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/nutrients/[id]/page.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/nutrients/[id]/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm uppercase text-neutral-400",
                        children: "Top Contributors"
                    }, void 0, false, {
                        fileName: "[project]/app/nutrients/[id]/page.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    data.contributions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-neutral-500 text-sm",
                        children: "No foods logged yet."
                    }, void 0, false, {
                        fileName: "[project]/app/nutrients/[id]/page.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this),
                    data.contributions.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between bg-[var(--muted)] text-[var(--foreground)] p-3 rounded",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate",
                                    children: c.foodName
                                }, void 0, false, {
                                    fileName: "[project]/app/nutrients/[id]/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-neutral-400",
                                    children: [
                                        c.amount.toFixed(2),
                                        " ",
                                        data.unit
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/nutrients/[id]/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, c.foodId, true, {
                            fileName: "[project]/app/nutrients/[id]/page.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/nutrients/[id]/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/nutrients/[id]/page.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(NutrientDetailPage, "2sxqUyf+BfhpoOJLKCBhA8p6SGA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = NutrientDetailPage;
var _c;
__turbopack_context__.k.register(_c, "NutrientDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_9e413a86._.js.map