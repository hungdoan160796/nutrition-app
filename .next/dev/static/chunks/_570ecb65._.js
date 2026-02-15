(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/app/log/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LogFoodPage
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
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [activeGroup, setActiveGroup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [foodTerm, setFoodTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [grams, setGrams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [foods, setFoods] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LogFoodPage.useEffect": ()=>{
            fetch("/api/foods").then({
                "LogFoodPage.useEffect": (res)=>res.json()
            }["LogFoodPage.useEffect"]).then(setFoods);
        }
    }["LogFoodPage.useEffect"], []);
    const allFoods = foods;
    const groupFoods = activeGroup ? allFoods.filter((f)=>f.group === activeGroup) : [];
    async function handleAdd() {
        if (!foodTerm || !grams) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nutritionEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logFood"])(foodTerm, Number(grams));
        router.push("/");
        router.refresh();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold",
                children: "Log Food"
            }, void 0, false, {
                fileName: "[project]/app/log/page.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            !activeGroup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-3",
                children: FOOD_GROUPS.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveGroup(g),
                        className: "aspect-square rounded-xl bg-[var(--muted)] flex items-center justify-center font-semibold capitalize",
                        children: g
                    }, g, false, {
                        fileName: "[project]/app/log/page.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/log/page.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this),
            activeGroup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setActiveGroup(null);
                                    setFoodTerm("");
                                },
                                className: "text-sm text-[var(--accent)]",
                                children: "← Back"
                            }, void 0, false, {
                                fileName: "[project]/app/log/page.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold capitalize",
                                children: activeGroup
                            }, void 0, false, {
                                fileName: "[project]/app/log/page.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/log/page.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3 max-h-64 overflow-y-auto",
                        children: groupFoods.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setFoodTerm(f.term),
                                className: `p-3 rounded-lg text-left ${foodTerm === f.term ? "bg-[var(--accent)] text-black" : "bg-[var(--muted)]"}`,
                                children: f.term
                            }, f.id, false, {
                                fileName: "[project]/app/log/page.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/log/page.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "number",
                placeholder: "Grams eaten",
                className: "w-full p-3 rounded bg-[var(--muted)] text-[var(--foreground)]",
                value: grams,
                onChange: (e)=>setGrams(e.target.value)
            }, void 0, false, {
                fileName: "[project]/app/log/page.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "w-full p-3 rounded bg-[var(--accent)] text-black font-semibold disabled:opacity-50",
                disabled: !foodTerm || !grams,
                onClick: handleAdd,
                children: "Add"
            }, void 0, false, {
                fileName: "[project]/app/log/page.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/log/page.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(LogFoodPage, "1CVsd8fsXHNrmHu2chUpKlDy9ds=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LogFoodPage;
var _c;
__turbopack_context__.k.register(_c, "LogFoodPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/is-plain-obj/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = (value)=>{
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.prototype;
};
}),
"[project]/node_modules/merge-options/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const isOptionObject = __turbopack_context__.r("[project]/node_modules/is-plain-obj/index.js [app-client] (ecmascript)");
const { hasOwnProperty } = Object.prototype;
const { propertyIsEnumerable } = Object;
const defineProperty = (object, name, value)=>Object.defineProperty(object, name, {
        value,
        writable: true,
        enumerable: true,
        configurable: true
    });
const globalThis = /*TURBOPACK member replacement*/ __turbopack_context__.e;
const defaultMergeOptions = {
    concatArrays: false,
    ignoreUndefined: false
};
const getEnumerableOwnPropertyKeys = (value)=>{
    const keys = [];
    for(const key in value){
        if (hasOwnProperty.call(value, key)) {
            keys.push(key);
        }
    }
    /* istanbul ignore else  */ if (Object.getOwnPropertySymbols) {
        const symbols = Object.getOwnPropertySymbols(value);
        for (const symbol of symbols){
            if (propertyIsEnumerable.call(value, symbol)) {
                keys.push(symbol);
            }
        }
    }
    return keys;
};
function clone(value) {
    if (Array.isArray(value)) {
        return cloneArray(value);
    }
    if (isOptionObject(value)) {
        return cloneOptionObject(value);
    }
    return value;
}
function cloneArray(array) {
    const result = array.slice(0, 0);
    getEnumerableOwnPropertyKeys(array).forEach((key)=>{
        defineProperty(result, key, clone(array[key]));
    });
    return result;
}
function cloneOptionObject(object) {
    const result = Object.getPrototypeOf(object) === null ? Object.create(null) : {};
    getEnumerableOwnPropertyKeys(object).forEach((key)=>{
        defineProperty(result, key, clone(object[key]));
    });
    return result;
}
/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {string[]} keys keys to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 */ const mergeKeys = (merged, source, keys, config)=>{
    keys.forEach((key)=>{
        if (typeof source[key] === 'undefined' && config.ignoreUndefined) {
            return;
        }
        // Do not recurse into prototype chain of merged
        if (key in merged && merged[key] !== Object.getPrototypeOf(merged)) {
            defineProperty(merged, key, merge(merged[key], source[key], config));
        } else {
            defineProperty(merged, key, clone(source[key]));
        }
    });
    return merged;
};
/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 *
 * see [Array.prototype.concat ( ...arguments )](http://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat)
 */ const concatArrays = (merged, source, config)=>{
    let result = merged.slice(0, 0);
    let resultIndex = 0;
    [
        merged,
        source
    ].forEach((array)=>{
        const indices = [];
        // `result.concat(array)` with cloning
        for(let k = 0; k < array.length; k++){
            if (!hasOwnProperty.call(array, k)) {
                continue;
            }
            indices.push(String(k));
            if (array === merged) {
                // Already cloned
                defineProperty(result, resultIndex++, array[k]);
            } else {
                defineProperty(result, resultIndex++, clone(array[k]));
            }
        }
        // Merge non-index keys
        result = mergeKeys(result, array, getEnumerableOwnPropertyKeys(array).filter((key)=>!indices.includes(key)), config);
    });
    return result;
};
/**
 * @param {*} merged already cloned
 * @param {*} source something to merge
 * @param {Object} config Config Object
 * @returns {*} cloned Object
 */ function merge(merged, source, config) {
    if (config.concatArrays && Array.isArray(merged) && Array.isArray(source)) {
        return concatArrays(merged, source, config);
    }
    if (!isOptionObject(source) || !isOptionObject(merged)) {
        return clone(source);
    }
    return mergeKeys(merged, source, getEnumerableOwnPropertyKeys(source), config);
}
module.exports = function(...options) {
    const config = merge(clone(defaultMergeOptions), this !== globalThis && this || {}, defaultMergeOptions);
    let merged = {
        _: {}
    };
    for (const option of options){
        if (option === undefined) {
            continue;
        }
        if (!isOptionObject(option)) {
            throw new TypeError('`' + option + '` is not an Option Object');
        }
        merged = merge(merged, {
            _: option
        }, config);
    }
    return merged._;
};
}),
"[project]/node_modules/merge-options/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * Thin ESM wrapper for CJS named exports.
 *
 * Ref: https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$merge$2d$options$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/merge-options/index.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$merge$2d$options$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/node_modules/@react-native-async-storage/async-storage/lib/module/AsyncStorage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$merge$2d$options$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/merge-options/index.mjs [app-client] (ecmascript)");
"use strict";
;
// eslint-disable-next-line @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/ban-types
const merge = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$merge$2d$options$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].bind({
    concatArrays: true,
    ignoreUndefined: true
});
function mergeLocalStorageItem(key, value) {
    const oldValue = window.localStorage.getItem(key);
    if (oldValue) {
        const oldObject = JSON.parse(oldValue);
        const newObject = JSON.parse(value);
        const nextValue = JSON.stringify(merge(oldObject, newObject));
        window.localStorage.setItem(key, nextValue);
    } else {
        window.localStorage.setItem(key, value);
    }
}
function createPromise(getValue, callback) {
    return new Promise((resolve, reject)=>{
        try {
            const value = getValue();
            callback?.(null, value);
            resolve(value);
        } catch (err) {
            callback?.(err);
            reject(err);
        }
    });
}
function createPromiseAll(promises, callback, processResult) {
    return Promise.all(promises).then((result)=>{
        const value = processResult?.(result) ?? null;
        callback?.(null, value);
        return Promise.resolve(value);
    }, (errors)=>{
        callback?.(errors);
        return Promise.reject(errors);
    });
}
const AsyncStorage = {
    /**
   * Fetches `key` value.
   */ getItem: (key, callback)=>{
        return createPromise(()=>window.localStorage.getItem(key), callback);
    },
    /**
   * Sets `value` for `key`.
   */ setItem: (key, value, callback)=>{
        return createPromise(()=>window.localStorage.setItem(key, value), callback);
    },
    /**
   * Removes a `key`
   */ removeItem: (key, callback)=>{
        return createPromise(()=>window.localStorage.removeItem(key), callback);
    },
    /**
   * Merges existing value with input value, assuming they are stringified JSON.
   */ mergeItem: (key, value, callback)=>{
        return createPromise(()=>mergeLocalStorageItem(key, value), callback);
    },
    /**
   * Erases *all* AsyncStorage for the domain.
   */ clear: (callback)=>{
        return createPromise(()=>window.localStorage.clear(), callback);
    },
    /**
   * Gets *all* keys known to the app, for all callers, libraries, etc.
   */ getAllKeys: (callback)=>{
        return createPromise(()=>{
            const numberOfKeys = window.localStorage.length;
            const keys = [];
            for(let i = 0; i < numberOfKeys; i += 1){
                const key = window.localStorage.key(i) || "";
                keys.push(key);
            }
            return keys;
        }, callback);
    },
    /**
   * (stub) Flushes any pending requests using a single batch call to get the data.
   */ flushGetRequests: ()=>undefined,
    /**
   * multiGet resolves to an array of key-value pair arrays that matches the
   * input format of multiSet.
   *
   *   multiGet(['k1', 'k2']) -> [['k1', 'val1'], ['k2', 'val2']]
   */ multiGet: (keys, callback)=>{
        const promises = keys.map((key)=>AsyncStorage.getItem(key));
        const processResult = (result)=>result.map((value, i)=>[
                    keys[i],
                    value
                ]);
        return createPromiseAll(promises, callback, processResult);
    },
    /**
   * Takes an array of key-value array pairs.
   *   multiSet([['k1', 'val1'], ['k2', 'val2']])
   */ multiSet: (keyValuePairs, callback)=>{
        const promises = keyValuePairs.map((item)=>AsyncStorage.setItem(item[0], item[1]));
        return createPromiseAll(promises, callback);
    },
    /**
   * Delete all the keys in the `keys` array.
   */ multiRemove: (keys, callback)=>{
        const promises = keys.map((key)=>AsyncStorage.removeItem(key));
        return createPromiseAll(promises, callback);
    },
    /**
   * Takes an array of key-value array pairs and merges them with existing
   * values, assuming they are stringified JSON.
   *
   *   multiMerge([['k1', 'val1'], ['k2', 'val2']])
   */ multiMerge: (keyValuePairs, callback)=>{
        const promises = keyValuePairs.map((item)=>AsyncStorage.mergeItem(item[0], item[1]));
        return createPromiseAll(promises, callback);
    }
};
const __TURBOPACK__default__export__ = AsyncStorage;
 //# sourceMappingURL=AsyncStorage.js.map
}),
"[project]/node_modules/@react-native-async-storage/async-storage/lib/module/hooks.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAsyncStorage",
    ()=>useAsyncStorage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$native$2d$async$2d$storage$2f$async$2d$storage$2f$lib$2f$module$2f$AsyncStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-native-async-storage/async-storage/lib/module/AsyncStorage.js [app-client] (ecmascript)");
"use strict";
;
function useAsyncStorage(key) {
    return {
        getItem: (...args)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$native$2d$async$2d$storage$2f$async$2d$storage$2f$lib$2f$module$2f$AsyncStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getItem(key, ...args),
        setItem: (...args)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$native$2d$async$2d$storage$2f$async$2d$storage$2f$lib$2f$module$2f$AsyncStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].setItem(key, ...args),
        mergeItem: (...args)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$native$2d$async$2d$storage$2f$async$2d$storage$2f$lib$2f$module$2f$AsyncStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].mergeItem(key, ...args),
        removeItem: (...args)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$native$2d$async$2d$storage$2f$async$2d$storage$2f$lib$2f$module$2f$AsyncStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].removeItem(key, ...args)
    };
} //# sourceMappingURL=hooks.js.map
}),
"[project]/node_modules/@react-native-async-storage/async-storage/lib/module/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$native$2d$async$2d$storage$2f$async$2d$storage$2f$lib$2f$module$2f$AsyncStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-native-async-storage/async-storage/lib/module/AsyncStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$native$2d$async$2d$storage$2f$async$2d$storage$2f$lib$2f$module$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-native-async-storage/async-storage/lib/module/hooks.js [app-client] (ecmascript)");
"use strict";
;
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$native$2d$async$2d$storage$2f$async$2d$storage$2f$lib$2f$module$2f$AsyncStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_570ecb65._.js.map