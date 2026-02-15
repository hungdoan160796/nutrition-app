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
    // components/NutrientCard.tsx
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/nutrients/${id}`,
        className: `rounded-xl bg-[var(--background)] border border-[var(--border)] ${compact ? "p-2" : "p-4"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `font-medium text-[var(--foreground)] ${compact ? "text-xs" : "text-sm"}`,
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/components/NutrientCard.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-[var(--foreground)]",
                        children: [
                            progress,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NutrientCard.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NutrientCard.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mt-2 bg-[var(--border)] rounded ${compact ? "h-1.5" : "h-2"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[var(--accent)] rounded h-full",
                    style: {
                        width: `${progress}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/NutrientCard.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/NutrientCard.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/NutrientCard.tsx",
        lineNumber: 19,
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
        className: "w-40 h-40 rounded-full border-8 border-[var(--border)] flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-3xl font-bold text-[var(--foreground)]",
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
                    className: "text-xs text-[var(--foreground)]",
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
"[project]/data/nutrients.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"nutrients":[{"id":"protein","label":"Protein","unit":"g","category":"macronutrient","usda_names":["Protein"]},{"id":"carbohydrate","label":"Carbo","unit":"g","category":"macronutrient","usda_names":["Carbohydrate, by difference"]},{"id":"fat","label":"Fat","unit":"g","category":"macronutrient","usda_names":["Total lipid (fat)"]},{"id":"fiber","label":"Fiber","unit":"g","category":"macronutrient","usda_names":["Fiber, total dietary"]},{"id":"calories","label":"Calories","unit":"kcal","category":"macronutrient","usda_names":["Energy"]},{"id":"iron","label":"Iron","unit":"mg","category":"mineral","usda_names":["Iron, Fe"]},{"id":"calcium","label":"Calcium","unit":"mg","category":"mineral","usda_names":["Calcium, Ca"]},{"id":"magnesium","label":"Magnesium","unit":"mg","category":"mineral","usda_names":["Magnesium, Mg"]},{"id":"potassium","label":"Potassium","unit":"mg","category":"mineral","usda_names":["Potassium, K"]},{"id":"sodium","label":"Sodium","unit":"mg","category":"mineral","usda_names":["Sodium, Na"]},{"id":"zinc","label":"Zinc","unit":"mg","category":"mineral","usda_names":["Zinc, Zn"]},{"id":"vitamin_a","label":"Vitamin A","unit":"µg","category":"vitamin","usda_names":["Vitamin A, RAE"]},{"id":"vitamin_c","label":"Vitamin C","unit":"mg","category":"vitamin","usda_names":["Vitamin C, total ascorbic acid"]},{"id":"vitamin_d","label":"Vitamin D","unit":"IU","category":"vitamin","usda_names":["Vitamin D (D2 + D3)"]},{"id":"vitamin_e","label":"Vitamin E","unit":"mg","category":"vitamin","usda_names":["Vitamin E (alpha-tocopherol)"]},{"id":"vitamin_k","label":"Vitamin K","unit":"µg","category":"vitamin","usda_names":["Vitamin K (phylloquinone)"]},{"id":"vitamin_b12","label":"Vitamin B12","unit":"µg","category":"vitamin","usda_names":["Vitamin B-12"]},{"id":"folate","label":"Folate","unit":"µg","category":"vitamin","usda_names":["Folate, total"]}]});}),
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
"[project]/lib/localStore.native.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadLocalDB",
    ()=>loadLocalDB,
    "saveLocalDB",
    ()=>saveLocalDB
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$native$2d$async$2d$storage$2f$async$2d$storage$2f$lib$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-native-async-storage/async-storage/lib/module/index.js [app-client] (ecmascript) <locals>");
;
const KEY = "nutrition_app_db";
async function loadLocalDB() {
    try {
        const raw = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$native$2d$async$2d$storage$2f$async$2d$storage$2f$lib$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].getItem(KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (err) {
        console.warn("Failed to load local DB:", err);
        return null;
    }
}
async function saveLocalDB(data) {
    try {
        const serialized = JSON.stringify(data);
        await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$native$2d$async$2d$storage$2f$async$2d$storage$2f$lib$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].setItem(KEY, serialized);
    } catch (err) {
        console.warn("Failed to save local DB:", err);
    }
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
// db.ts (replace in-memory-only logic)
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStore$2e$native$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/localStore.native.ts [app-client] (ecmascript)");
const DB_NAME = "nutrition_app";
const DB_VERSION = 1;
const STORE_INTAKE = "intake_log";
;
let db = {
    foodLog: {},
    userProfile: {},
    nutrientOverrides: {}
};
async function initDB() {
    const stored = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStore$2e$native$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadLocalDB"])();
    if (stored) {
        db = {
            foodLog: stored.foodLog ?? {},
            userProfile: stored.userProfile ?? null,
            nutrientOverrides: stored.nutrientOverrides ?? {}
        };
    }
}
function getDB() {
    return db;
}
async function updateDB(mutator) {
    await initDB(); // 🔑 ensure DB is hydrated
    mutator(db);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStore$2e$native$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveLocalDB"])(db);
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
"[project]/data/recommended_intake_fda.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"id":"fda_dv_2024","label":"FDA Daily Values (Age 4+)","source":"FDA","recommendations":[{"nutrient_id":"calories","unit":"kcal","sex":"any","age_min":4,"age_max":120,"daily_value":2000},{"nutrient_id":"protein","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":50},{"nutrient_id":"fat","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":78},{"nutrient_id":"saturated_fat","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":20},{"nutrient_id":"carbohydrate","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":275},{"nutrient_id":"fiber","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":28},{"nutrient_id":"added_sugars","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":50},{"nutrient_id":"cholesterol","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":300},{"nutrient_id":"sodium","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":2300},{"nutrient_id":"vitamin_a","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":900},{"nutrient_id":"vitamin_c","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":90},{"nutrient_id":"vitamin_d","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":20},{"nutrient_id":"vitamin_e","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":15},{"nutrient_id":"vitamin_k","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":120},{"nutrient_id":"thiamin","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":1.2},{"nutrient_id":"riboflavin","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":1.3},{"nutrient_id":"niacin","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":16},{"nutrient_id":"vitamin_b6","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":1.7},{"nutrient_id":"folate","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":400},{"nutrient_id":"vitamin_b12","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":2.4},{"nutrient_id":"biotin","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":30},{"nutrient_id":"pantothenic_acid","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":5},{"nutrient_id":"calcium","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":1300},{"nutrient_id":"iron","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":18},{"nutrient_id":"phosphorus","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":1250},{"nutrient_id":"iodine","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":150},{"nutrient_id":"magnesium","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":420},{"nutrient_id":"zinc","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":11},{"nutrient_id":"selenium","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":55},{"nutrient_id":"copper","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":0.9},{"nutrient_id":"manganese","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":2.3},{"nutrient_id":"chromium","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":35},{"nutrient_id":"molybdenum","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":45},{"nutrient_id":"chloride","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":2300},{"nutrient_id":"potassium","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":4700},{"nutrient_id":"choline","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":550}]});}),
"[project]/data/recommended_intake_generated.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"id\":\"generated_from_csv\",\"label\":\"Generated Recommended Intake\",\"source\":\"CSV Import\",\"recommendations\":[{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":1000.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":1200.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1600.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1800.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1800.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":2000.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1800.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":2200.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1600.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":2000.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":13.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":19.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":19.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":34.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":34.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":46.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":52.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":46.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":56.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":46.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":56.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":46.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":56.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":130.0},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":14.0},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":16.8},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":19.6},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":22.4},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":25.2},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":25.2},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":30.8},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":28.0},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":33.6},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":25.2},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":30.8},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":22.4},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":28.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":7.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":10.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":10.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":10.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":12.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":11.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":16.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":12.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":17.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":12.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":17.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":11.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":14.0},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.7},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.9},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.9},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.0},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.2},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.1},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.6},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.1},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.6},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.1},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.6},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.1},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.6},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":700.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1300.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1300.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1300.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1300.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1200.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":1200.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":7.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":10.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":10.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":8.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":8.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":15.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":11.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":18.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":8.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":18.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":8.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":8.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":8.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":80.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":130.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":130.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":240.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":240.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":360.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":410.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":310.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":400.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":320.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":420.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":320.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":420.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":460.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":500.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":500.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1250.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1250.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1250.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1250.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":700.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":700.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":700.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":700.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":700.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":3000.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":3800.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":3800.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":4500.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":4500.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":4700.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":1500.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":1900.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":1900.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":2200.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":2200.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":2300.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":3.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":5.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":5.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":8.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":8.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":9.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":11.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":8.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":11.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":8.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":11.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":8.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":11.0},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.34},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.44},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.44},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.7},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.7},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":0.89},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":0.89},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":0.9},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":0.9},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":0.9},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":0.9},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":0.9},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":0.9},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":1.2},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":1.5},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":1.5},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.6},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.9},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.6},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":2.2},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.8},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":2.3},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.8},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":2.3},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.8},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":2.3},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":20.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":30.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":30.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":40.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":40.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":55.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":300.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":400.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":400.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":700.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":900.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":700.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":900.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":700.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":900.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":700.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":900.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":6.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":7.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":7.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":11.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":11.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":25.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":25.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":45.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":45.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":65.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":90.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":90.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":90.0},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.5},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.9},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.9},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.0},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.2},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.1},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.2},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.1},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.2},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.1},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.2},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.5},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.9},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.9},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.0},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.3},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.1},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.3},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.1},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.3},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.1},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.3},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":6.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":8.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":8.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":12.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":12.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":14.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":16.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":14.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":16.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":14.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":16.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":14.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":16.0},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.5},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.0},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.0},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.2},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.3},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.3},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.3},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.3},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.3},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.5},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.7},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.9},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":1.2},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":1.2},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.8},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.8},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":2.4},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":200.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":250.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":250.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":375.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":375.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":400.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":550.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":425.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":550.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":425.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":550.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":425.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":550.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":30.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":55.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":55.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":60.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":60.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":90.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":120.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":90.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":120.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":90.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":120.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":150.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":200.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":200.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":300.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":300.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":400.0}]}"));}),
"[project]/data/recommendations/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RECOMMENDATION_SETS",
    ()=>RECOMMENDATION_SETS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$recommended_intake_fda$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/recommended_intake_fda.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$recommended_intake_generated$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/recommended_intake_generated.json (json)");
;
;
const RECOMMENDATION_SETS = {
    fda_dv_2024: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$recommended_intake_fda$2e$json__$28$json$29$__["default"],
    usda_dri: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$recommended_intake_generated$2e$json__$28$json$29$__["default"]
};
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
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
async function logFood(foodTerm, grams) {
    _s();
    const [foods, setFoods] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "logFood.useEffect": ()=>{
            fetch("/api/foods").then({
                "logFood.useEffect": (res)=>res.json()
            }["logFood.useEffect"]).then(setFoods);
        }
    }["logFood.useEffect"], []);
    const food = foods.find((f)=>f.term === foodTerm);
    if (!food) return;
    const date = new Date().toISOString().slice(0, 10);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDB"])((db)=>{
        if (!db.foodLog[date]) db.foodLog[date] = [];
        db.foodLog[date].push({
            term: food.term,
            name: food.name,
            grams,
            nutrients: food.nutrients,
            loggedAt: Date.now()
        });
    });
}
_s(logFood, "YMM5M0iTqzJSbBHkFT1Cq0yNesc=");
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
"[project]/lib/firebase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript)");
;
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyCaU7fY19TXmHzxaIaldjcjlc1ZItvr8hQ"),
    authDomain: ("TURBOPACK compile-time value", "nutrition-f3c5d.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "nutrition-f3c5d"),
    storageBucket: ("TURBOPACK compile-time value", "nutrition-f3c5d.firebasestorage.app"),
    messagingSenderId: ("TURBOPACK compile-time value", "82378108308"),
    appId: ("TURBOPACK compile-time value", "1:82378108308:web:80398d9c5fa3b585bdb381")
};
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApp"])() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
console.log("Firebase auth:", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"]);
console.log("Firestore:", __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"]);
const THEME_REGEX = /data[-–]theme\s*=\s*"([^"]+)"/g;
const MACROS = [
    "protein",
    "fat",
    "carbohydrate"
];
const MICROS = [
    "vitamin_a",
    "vitamin_k",
    "vitamin_e",
    "calcium",
    "potassium",
    "zinc",
    "vitamin_c",
    "folate",
    "vitamin_b12",
    "fiber",
    "iron",
    "magnesium",
    "sodium",
    "vitamin_d"
];
function HomePage() {
    _s();
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [themes, setThemes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // load saved theme
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            const saved = localStorage.getItem("theme");
            if (saved) {
                document.documentElement.setAttribute("data-theme", saved);
                setTheme(saved);
            }
        }
    }["HomePage.useEffect"], []);
    // apply theme
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            if (!theme) return;
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    }["HomePage.useEffect"], [
        theme
    ]);
    // read themes from themes.md
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            ({
                "HomePage.useEffect": async ()=>{
                    const res = await fetch("/themes.md");
                    const text = await res.text();
                    const found = new Set();
                    let match;
                    while(match = THEME_REGEX.exec(text)){
                        found.add(match[1]);
                    }
                    setThemes(Array.from(found).sort());
                }
            })["HomePage.useEffect"]();
        }
    }["HomePage.useEffect"], []);
    // nutrition data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutritionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWeeklyProgress"])().then(setProgress);
        }
    }["HomePage.useEffect"], []);
    if (!progress) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4",
        children: "Loading…"
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 76,
        columnNumber: 25
    }, this);
    const calories = progress.all.find((n)=>n.id === "calories");
    const macros = progress.all.filter((n)=>MACROS.includes(n.id));
    const micros = progress.all.filter((n)=>MICROS.includes(n.id));
    const microAvg = micros.length === 0 ? 0 : Math.round(micros.reduce((sum, n)=>sum + n.progress, 0) / micros.length * 100) / 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: theme,
                    onChange: (e)=>setTheme(e.target.value),
                    className: "border rounded px-2 py-1 bg-transparent",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: "System"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this),
                        themes.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: t,
                                children: t
                            }, t, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold",
                children: "This Week"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm uppercase text-neutral-400 ",
                        children: "Calorie"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3",
                        children: calories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NutrientCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            ...calories
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 121,
                            columnNumber: 24
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm uppercase text-neutral-400",
                        children: "Macros"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-3",
                        children: macros.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NutrientCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                ...n
                            }, n.id, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-sm uppercase text-neutral-400",
                children: "Micros"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProgressRing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    value: microAvg
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 135,
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
                            lineNumber: 142,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(HomePage, "VBWlRohGfaO+WN7vJjaGMCPW0u0=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_19eb1e46._.js.map