module.exports = [
"[project]/data/nutrients.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"nutrients":[{"id":"protein","label":"Protein","unit":"g","category":"macronutrient","usda_names":["Protein"]},{"id":"carbohydrate","label":"Carbo","unit":"g","category":"macronutrient","usda_names":["Carbohydrate, by difference"]},{"id":"fat","label":"Fat","unit":"g","category":"macronutrient","usda_names":["Total lipid (fat)"]},{"id":"fiber","label":"Fiber","unit":"g","category":"macronutrient","usda_names":["Fiber, total dietary"]},{"id":"calories","label":"Calories","unit":"kcal","category":"macronutrient","usda_names":["Energy"]},{"id":"iron","label":"Iron","unit":"mg","category":"mineral","usda_names":["Iron, Fe"]},{"id":"calcium","label":"Calcium","unit":"mg","category":"mineral","usda_names":["Calcium, Ca"]},{"id":"magnesium","label":"Magnesium","unit":"mg","category":"mineral","usda_names":["Magnesium, Mg"]},{"id":"potassium","label":"Potassium","unit":"mg","category":"mineral","usda_names":["Potassium, K"]},{"id":"sodium","label":"Sodium","unit":"mg","category":"mineral","usda_names":["Sodium, Na"]},{"id":"zinc","label":"Zinc","unit":"mg","category":"mineral","usda_names":["Zinc, Zn"]},{"id":"vitamin_a","label":"Vitamin A","unit":"µg","category":"vitamin","usda_names":["Vitamin A, RAE"]},{"id":"vitamin_c","label":"Vitamin C","unit":"mg","category":"vitamin","usda_names":["Vitamin C, total ascorbic acid"]},{"id":"vitamin_d","label":"Vitamin D","unit":"IU","category":"vitamin","usda_names":["Vitamin D (D2 + D3)"]},{"id":"vitamin_e","label":"Vitamin E","unit":"mg","category":"vitamin","usda_names":["Vitamin E (alpha-tocopherol)"]},{"id":"vitamin_k","label":"Vitamin K","unit":"µg","category":"vitamin","usda_names":["Vitamin K (phylloquinone)"]},{"id":"vitamin_b12","label":"Vitamin B12","unit":"µg","category":"vitamin","usda_names":["Vitamin B-12"]},{"id":"vitamin_b6","label":"Folate","unit":"µg","category":"vitamin","usda_names":["Folate, total"]}]});}),
"[project]/lib/nutrientRegistry.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/recommendationEngine.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDailyTargets",
    ()=>getDailyTargets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$recommendations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/recommendations/index.ts [app-ssr] (ecmascript)");
;
;
async function getDailyTargets(profile) {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDB"])();
    const overrides = db.nutrientOverrides ?? {};
    const set = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$recommendations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RECOMMENDATION_SETS"][profile.recommendationSet];
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
}),
"[project]/lib/nutritionEngine.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutrientRegistry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nutrientRegistry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/recommendationEngine.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-ssr] (ecmascript)");
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDB"])((db)=>{
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initDB"])();
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDB"])();
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
    const dailyTargets = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDailyTargets"])(profile);
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
        const def = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutrientRegistry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNutrientById"])(nutrientId);
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
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initDB"])();
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDB"])();
    const { start, end } = getWeekRange(baseDate);
    // Use DB-backed profile (same defaults as elsewhere)
    const dbProfile = db.userProfile ?? {};
    const profile = {
        recommendationSet: dbProfile.recommendationSet ?? "fda_dv_2024",
        sex: dbProfile.sex ?? "female",
        age: typeof dbProfile.age === "number" ? dbProfile.age : 30
    };
    const dailyTargets = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDailyTargets"])(profile);
    const target = dailyTargets[nutrientId] ? dailyTargets[nutrientId] * 7 : null;
    if (!target) return null;
    const def = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutrientRegistry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNutrientById"])(nutrientId);
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
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/components/BottomNav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BottomNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.ts [app-ssr] (ecmascript)");
;
;
;
;
function logoutHandler() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"]);
    window.location.href = "/"; // Redirect to login page
}
function BottomNav() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t border-[var(--border)]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-md mx-auto flex justify-around py-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    children: "Progress"
                }, void 0, false, {
                    fileName: "[project]/components/BottomNav.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/log",
                    children: "Food"
                }, void 0, false, {
                    fileName: "[project]/components/BottomNav.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/history",
                    children: "History"
                }, void 0, false, {
                    fileName: "[project]/components/BottomNav.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/settings",
                    children: "Settings"
                }, void 0, false, {
                    fileName: "[project]/components/BottomNav.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/add",
                    children: "Add"
                }, void 0, false, {
                    fileName: "[project]/components/BottomNav.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: logoutHandler,
                    children: "Logout"
                }, void 0, false, {
                    fileName: "[project]/components/BottomNav.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/BottomNav.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/BottomNav.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/FoodNutrients.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>nutrients
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutrientRegistry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nutrientRegistry.ts [app-ssr] (ecmascript)");
"use client";
;
;
function nutrients({ nutrients, servingSize, amount }) {
    const safe = nutrients ?? {};
    const entries = Object.entries(safe).filter(([, v])=>Number.isFinite(v));
    if (!entries.length || !Number.isFinite(servingSize) || servingSize <= 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-xl p-4 border bg-[var(--background)] text-sm text-neutral-400",
            children: "No nutrient information available"
        }, void 0, false, {
            fileName: "[project]/components/FoodNutrients.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this);
    }
    const ratio = Number.isFinite(amount) && amount > 0 ? amount / servingSize : 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 gap-3",
        children: entries.map(([key, baseAmount])=>{
            const def = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutrientRegistry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNutrientById"])(String(key));
            const label = def?.label ?? String(key);
            const unit = def?.unit ?? "";
            const displayAmount = baseAmount * ratio;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl bg-[var(--background)] border border-[var(--border)] p-3 text-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-baseline",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-medium text-[var(--foreground)] text-xs",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/FoodNutrients.tsx",
                            lineNumber: 51,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-[var(--foreground)] text-xs",
                            children: Number.isFinite(displayAmount) ? `${Math.round(displayAmount * 100) / 100} ${unit}` : "-"
                        }, void 0, false, {
                            fileName: "[project]/components/FoodNutrients.tsx",
                            lineNumber: 54,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/FoodNutrients.tsx",
                    lineNumber: 50,
                    columnNumber: 13
                }, this)
            }, String(key), false, {
                fileName: "[project]/components/FoodNutrients.tsx",
                lineNumber: 46,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/FoodNutrients.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/log/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LogFoodPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutritionEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nutritionEngine.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2f$AuthProviders$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/providers/AuthProviders.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BottomNav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BottomNav.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FoodNutrients$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FoodNutrients.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const FOOD_GROUPS = [
    "starch",
    "meat",
    "fish",
    "seafood",
    "vegetables",
    "legumes",
    "fruits",
    "condiments",
    "seasonings"
];
function LogFoodPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [foods, setFoods] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeGroup, setActiveGroup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedFood, setSelectedFood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [unit, setUnit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("g");
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [limit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(50);
    const [loadingFoods, setLoadingFoods] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fetchError, setFetchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2f$AuthProviders$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!activeGroup || !user) return;
        let aborted = false;
        (async ()=>{
            setLoadingFoods(true);
            setFetchError(null);
            try {
                const token = await user.getIdToken();
                const res = await fetch(`/api/foods?group=${encodeURIComponent(activeGroup)}&page=${page}&limit=${limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!res.ok) {
                    const body = await res.json().catch(()=>({}));
                    if (!aborted) setFetchError(body?.error ?? `HTTP ${res.status}`);
                    return;
                }
                const data = await res.json();
                if (!aborted) setFoods(data?.foods ?? []);
            } catch (e) {
                if (!aborted) setFetchError(String(e?.message ?? e));
            } finally{
                if (!aborted) setLoadingFoods(false);
            }
        })();
        return ()=>{
            aborted = true;
        };
    }, [
        activeGroup,
        page,
        limit,
        user
    ]);
    const groupFoods = activeGroup ? foods.filter((f)=>f.group === activeGroup) : [];
    const computedAmount = (()=>{
        if (!selectedFood) return 0;
        const value = Number(amount);
        if (!value || value <= 0) return 0;
        if (unit === "g") return value;
        const servingSize = Number(selectedFood.servingSize) || 0;
        return servingSize > 0 ? value * servingSize / 100 : 0;
    })();
    async function handleAdd() {
        if (!selectedFood || !computedAmount) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutritionEngine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logFood"])({
            term: selectedFood.description,
            name: selectedFood.brandName,
            nutrients: selectedFood.nutrients,
            measurement: selectedFood.servingSizeUnit,
            amount: computedAmount,
            standardAmount: selectedFood.servingSize
        });
        router.push("/home");
        router.refresh();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 flex-wrap justify-center",
                        children: FOOD_GROUPS.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setActiveGroup(group);
                                    setSelectedFood(null);
                                    setPage(1);
                                },
                                className: `px-3 py-1 rounded-full text-sm border bg-[var(--background)] border-[var(--border)] ${activeGroup === group ? "bg-primary text-white" : ""}`,
                                children: group
                            }, group, false, {
                                fileName: "[project]/app/log/page.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/log/page.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    activeGroup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-4 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-2 space-y-2",
                                children: [
                                    loadingFoods ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl p-4 border bg-[var(--background)] text-sm text-neutral-400",
                                        children: "Loading foods…"
                                    }, void 0, false, {
                                        fileName: "[project]/app/log/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this) : fetchError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl p-4 border bg-[var(--background)] text-sm text-red-500",
                                        children: fetchError
                                    }, void 0, false, {
                                        fileName: "[project]/app/log/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 17
                                    }, this) : groupFoods.length > 0 ? groupFoods.map((food)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setSelectedFood(food);
                                                setAmount("");
                                                setUnit("g");
                                                console.log(food);
                                            },
                                            className: `w-full text-left px-3 py-2 rounded-lg border bg-[var(--background)] border-[var(--border)] ${selectedFood?.id === food.id ? "ring-2 ring-primary" : ""}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-medium text-[var(--foreground)]",
                                                children: food.description ?? food.brandName
                                            }, void 0, false, {
                                                fileName: "[project]/app/log/page.tsx",
                                                lineNumber: 200,
                                                columnNumber: 21
                                            }, this)
                                        }, food.id, false, {
                                            fileName: "[project]/app/log/page.tsx",
                                            lineNumber: 186,
                                            columnNumber: 19
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl p-4 border bg-[var(--background)] text-sm text-neutral-400",
                                        children: "No foods in this group."
                                    }, void 0, false, {
                                        fileName: "[project]/app/log/page.tsx",
                                        lineNumber: 206,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center gap-2 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                                disabled: page <= 1 || loadingFoods,
                                                className: "px-3 py-1 rounded border bg-[var(--background)]",
                                                children: "Prev"
                                            }, void 0, false, {
                                                fileName: "[project]/app/log/page.tsx",
                                                lineNumber: 212,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-neutral-500",
                                                children: page
                                            }, void 0, false, {
                                                fileName: "[project]/app/log/page.tsx",
                                                lineNumber: 221,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setPage((p)=>p + 1),
                                                disabled: loadingFoods,
                                                className: "px-3 py-1 rounded border bg-[var(--background)]",
                                                children: "Next"
                                            }, void 0, false, {
                                                fileName: "[project]/app/log/page.tsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/log/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/log/page.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-2",
                                children: selectedFood ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-[100%] space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-[100%] flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    placeholder: unit === "g" ? "Grams" : "Servings",
                                                    value: amount,
                                                    onChange: (e)=>setAmount(e.target.value),
                                                    className: "w-[50%] rounded-lg border px-3 py-2 bg-transparent"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/log/page.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: unit,
                                                    onChange: (e)=>setUnit(e.target.value),
                                                    className: "w-[50%] rounded-lg border px-3 py-2 bg-transparent",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "g",
                                                        children: "g"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/log/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/log/page.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleAdd,
                                                    disabled: !computedAmount,
                                                    className: "rounded-lg bg-primary py-2 px-4 font-medium",
                                                    children: "Add"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/log/page.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/log/page.tsx",
                                            lineNumber: 237,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm text-neutral-400 uppercase mb-2",
                                                children: [
                                                    "Nutrients",
                                                    " ",
                                                    computedAmount ? `for ${computedAmount} ${selectedFood.servingSizeUnit}` : "per 100g"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/log/page.tsx",
                                                lineNumber: 273,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/log/page.tsx",
                                            lineNumber: 272,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FoodNutrients$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            nutrients: selectedFood.nutrients,
                                            servingSize: selectedFood.servingSize,
                                            amount: computedAmount ?? selectedFood.servingSize
                                        }, void 0, false, {
                                            fileName: "[project]/app/log/page.tsx",
                                            lineNumber: 281,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/log/page.tsx",
                                    lineNumber: 236,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl p-4 border bg-[var(--background)] text-sm text-neutral-400",
                                    children: "Select a food to see its nutrients"
                                }, void 0, false, {
                                    fileName: "[project]/app/log/page.tsx",
                                    lineNumber: 288,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/log/page.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/log/page.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/log/page.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BottomNav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/log/page.tsx",
                lineNumber: 297,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/log/page.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a2544b15._.js.map