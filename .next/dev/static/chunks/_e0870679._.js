(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/components/FoodRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FoodRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// components/FoodRow.tsx
"use client";
;
const normalize = (s)=>s.trim().toLowerCase();
function FoodRow({ food, selected, onChange }) {
    _s();
    const normalizedName = normalize(food.name);
    const [foods, setFoods] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const foodsSelected = foods;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FoodRow.useEffect": ()=>{
            fetch("/api/foods").then({
                "FoodRow.useEffect": (res)=>res.json()
            }["FoodRow.useEffect"]).then(setFoods);
        }
    }["FoodRow.useEffect"], []);
    const catalogFood = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FoodRow.useMemo[catalogFood]": ()=>{
            return foodsSelected.find({
                "FoodRow.useMemo[catalogFood]": (f)=>normalize(f.name) === normalizedName
            }["FoodRow.useMemo[catalogFood]"]);
        }
    }["FoodRow.useMemo[catalogFood]"], [
        normalizedName
    ]);
    const term = catalogFood?.term ?? normalizedName;
    const name = catalogFood?.name ?? food.name;
    const quantity = food.grams;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FoodRow.useEffect": ()=>{
            if (!onChange) return;
            if (selected?.term !== term || selected?.name !== name || selected?.quantity !== quantity) {
                onChange({
                    term,
                    name,
                    quantity
                });
            }
        }
    }["FoodRow.useEffect"], [
        term,
        name,
        quantity,
        selected,
        onChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-[70%] flex justify-between text-sm text-[var(--accent)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: term
            }, void 0, false, {
                fileName: "[project]/components/FoodRow.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[var(--accent)]",
                children: quantity ?? ""
            }, void 0, false, {
                fileName: "[project]/components/FoodRow.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FoodRow.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(FoodRow, "S1WznszFJNZ1m8q1/B22fX1TR2U=");
_c = FoodRow;
var _c;
__turbopack_context__.k.register(_c, "FoodRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/WeekChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WeekChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
// components/WeekChart.tsx
"use client";
;
;
const DAY_LABELS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];
function WeekChart({ days }) {
    const data = days.map((d, i)=>({
            day: DAY_LABELS[i].slice(0, 2),
            value: d?.microAvg ?? null
        }));
    const tooltipFormatter = (value)=>[
            `${value}%`,
            "Micros"
        ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: 220,
            height: 96
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
            width: "100%",
            height: "100%",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
                data: data,
                margin: {
                    top: 8,
                    right: 8,
                    left: 0,
                    bottom: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                        dataKey: "day",
                        tick: (props)=>{
                            const { x, y, payload } = props;
                            const index = payload.index;
                            const isWeekend = index >= 5;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                x: x,
                                y: y + 10,
                                textAnchor: "middle",
                                fontSize: 10,
                                fill: isWeekend ? "var(--accent)" : "currentColor",
                                children: payload.value
                            }, void 0, false, {
                                fileName: "[project]/components/WeekChart.tsx",
                                lineNumber: 56,
                                columnNumber: 17
                            }, void 0);
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/WeekChart.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                        domain: [
                            0,
                            100
                        ],
                        tickFormatter: (v, index)=>`${v}%`,
                        tick: {
                            fontSize: 10
                        },
                        width: 40
                    }, void 0, false, {
                        fileName: "[project]/components/WeekChart.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                        formatter: tooltipFormatter,
                        labelFormatter: (label)=>`Day ${DAY_LABELS[data.findIndex((d)=>d.day === label)]}`
                    }, void 0, false, {
                        fileName: "[project]/components/WeekChart.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                        type: "monotone",
                        dataKey: "value",
                        stroke: "var(--accent)",
                        strokeWidth: 2,
                        dot: {
                            r: 3
                        },
                        activeDot: {
                            r: 4
                        },
                        connectNulls: false,
                        isAnimationActive: false
                    }, void 0, false, {
                        fileName: "[project]/components/WeekChart.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/WeekChart.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/WeekChart.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/WeekChart.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = WeekChart;
var _c;
__turbopack_context__.k.register(_c, "WeekChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/history/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>HistoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/recommendationEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FoodRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FoodRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WeekChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WeekChart.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// app/history/page.tsx
"use client";
;
;
;
;
;
;
await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initDB"])();
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDB"])();
const profile = db.userProfile;
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
const WEEK_START = 2; // 1 = Sunday, 2 = Monday
function startOfWeek(date) {
    const d = new Date(date);
    const diff = (d.getDay() - WEEK_START + 7) % 7;
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    return d;
}
const iso = (d)=>d.toISOString().slice(0, 10);
const addDays = (d, n)=>{
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
};
function buildWeeks(db) {
    const dates = Object.keys(db.foodLog || {}).sort();
    if (!dates.length) return [];
    const map = new Map();
    const targets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDailyTargets"])(profile);
    console.log("Daily targets:", targets);
    for (const dateStr of dates){
        const foods = db.foodLog[dateStr] ?? [];
        const date = new Date(dateStr);
        const weekStart = iso(startOfWeek(date));
        // 1️⃣ accumulate total intake per tracked micronutrient for the day
        const dailyTotals = {};
        for (const food of foods){
            const nutrients = food.nutrients ?? {};
            for (const id of MICROS){
                const amount = nutrients[id];
                if (typeof amount !== "number") continue;
                dailyTotals[id] = (dailyTotals[id] ?? 0) + amount;
            }
        }
        // 2️⃣ compute per-nutrient daily progress (%)
        const perNutrientProgress = [];
        for (const id of MICROS){
            const target = targets[id];
            const intake = dailyTotals[id];
            if (typeof target !== "number" || typeof intake !== "number") {
                continue; // nutrient not tracked or not present that day
            }
            const progress = Math.min(intake / target * 100, 100);
            perNutrientProgress.push(progress);
            console.log(`[${dateStr}] nutrient ${id}: intake=${intake}, target=${target}, progress=${progress.toFixed(2)}%`);
        }
        if (!perNutrientProgress.length) continue;
        // 3️⃣ average of nutrients for the day
        const dayAvg = Math.round(perNutrientProgress.reduce((s, v)=>s + v, 0) / perNutrientProgress.length * 100) / 100;
        console.log(`[${dateStr}] day avg (${perNutrientProgress.length} nutrients): ${dayAvg}%`);
        if (!map.has(weekStart)) {
            map.set(weekStart, new Map());
        }
        map.get(weekStart).set(dateStr, {
            date: dateStr,
            foods,
            microAvg: dayAvg
        });
    }
    // 4️⃣ simple weekly average (include missing days as 0%)
    const weeks = Array.from(map.entries()).map(([start, dayMap])=>{
        const base = new Date(start);
        const days = Array.from({
            length: 7
        }, (_, i)=>{
            const key = iso(addDays(base, i));
            const day = dayMap.get(key) ?? null;
            return day;
        });
        return {
            start,
            days
        };
    }).sort((a, b)=>b.start.localeCompare(a.start));
    /*
  // 4️⃣ cumulative weekly average (skip missing days)
  const weeks: WeekLog[] = Array.from(map.entries())
    .map(([start, dayMap]) => {
      const base = new Date(start);
      let runningSum = 0;
      let runningCount = 0;

      const days: (DayLog | null)[] = Array.from({ length: 7 }, (_, i) => {
        const key = iso(addDays(base, i));
        const day = dayMap.get(key) ?? null;

        if (!day) return null;

        runningSum += day.microAvg;
        runningCount += 1;

        const cumulative =
          Math.round((runningSum / runningCount) * 100) / 100;

        console.log(
          `[week ${start}] day ${key}: cumulative avg=${cumulative}%`
        );

        return {
          ...day,
          microAvg: cumulative, // value shown on chart
        };
      });

      return { start, days };
    })
    .sort((a, b) => b.start.localeCompare(a.start));
*/ return weeks;
}
function formatWeekRange(start) {
    const s = new Date(start);
    const e = addDays(s, 6);
    return `${s.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
    })} – ${e.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
    })}`;
}
function HistoryPage() {
    _s();
    const [weeks, setWeeks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const refresh = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initDB"])();
        setWeeks(buildWeeks((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDB"])()));
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HistoryPage.useEffect": ()=>{
            refresh();
        }
    }["HistoryPage.useEffect"], []);
    const deleteFood = async (date, index)=>{
        const ok = window.confirm("Delete this food entry?");
        if (!ok) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDB"])((db)=>{
            db.foodLog[date].splice(index, 1);
            if (db.foodLog[date].length === 0) {
                delete db.foodLog[date];
            }
        });
        refresh();
    };
    const deleteDay = async (date)=>{
        const ok = window.confirm("Delete this entire day and all its foods?");
        if (!ok) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDB"])((db)=>{
            delete db.foodLog[date];
        });
        refresh();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HistoryPage.useEffect": ()=>{
            ({
                "HistoryPage.useEffect": async ()=>{
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initDB"])();
                    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDB"])();
                    setWeeks(buildWeeks(db));
                }
            })["HistoryPage.useEffect"]();
        }
    }["HistoryPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold",
                children: "History"
            }, void 0, false, {
                fileName: "[project]/app/history/page.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            weeks.map((week)=>{
                const visibleDays = week.days.filter((d)=>d !== null);
                const missingCount = week.days.length - visibleDays.length;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-xl border border-muted/40 p-4 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-sm font-medium",
                                            children: formatWeekRange(week.start)
                                        }, void 0, false, {
                                            fileName: "[project]/app/history/page.tsx",
                                            lineNumber: 254,
                                            columnNumber: 17
                                        }, this),
                                        missingCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                missingCount,
                                                " day",
                                                missingCount > 1 ? "s" : "",
                                                " with no data"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/history/page.tsx",
                                            lineNumber: 258,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/history/page.tsx",
                                    lineNumber: 253,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WeekChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    days: week.days
                                }, void 0, false, {
                                    fileName: "[project]/app/history/page.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/history/page.tsx",
                            lineNumber: 252,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                ...visibleDays
                            ].reverse().map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-row items-center justify-between border-b pb-1 border-[var(--muted)]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-[70%] flex flex-row items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-xs font-medium items-center text-[var(--foreground)]",
                                                                children: day.date
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/history/page.tsx",
                                                                lineNumber: 273,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/history/page.tsx",
                                                            lineNumber: 272,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-muted-foreground items-center",
                                                            children: "Quantity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/history/page.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/history/page.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-xs text-red-500 items-center",
                                                    onClick: ()=>deleteDay(day.date),
                                                    children: "Delete day"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/history/page.tsx",
                                                    lineNumber: 281,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/history/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: day.foods.map((food, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-row items-center justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FoodRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            food: food
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/history/page.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "text-xs text-red-500",
                                                            onClick: ()=>deleteFood(day.date, i),
                                                            children: "✕"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/history/page.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/app/history/page.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/history/page.tsx",
                                            lineNumber: 289,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, day.date, true, {
                                    fileName: "[project]/app/history/page.tsx",
                                    lineNumber: 269,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/history/page.tsx",
                            lineNumber: 267,
                            columnNumber: 13
                        }, this)
                    ]
                }, week.start, true, {
                    fileName: "[project]/app/history/page.tsx",
                    lineNumber: 248,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/app/history/page.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}
_s(HistoryPage, "Cv2KWfn7afaneqpH51RHjL8vmO4=");
_c = HistoryPage;
var _c;
__turbopack_context__.k.register(_c, "HistoryPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
]);

//# sourceMappingURL=_e0870679._.js.map