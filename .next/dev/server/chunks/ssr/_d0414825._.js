module.exports = [
"[project]/lib/localStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadLocalDB",
    ()=>loadLocalDB,
    "saveLocalDB",
    ()=>saveLocalDB
]);
// lib/localStore.ts
// Cross-platform local persistence:
// - Web: localStorage
// - Mobile (React Native / Expo): AsyncStorage
let AsyncStorage = null;
const isWeb = ("TURBOPACK compile-time value", "undefined") !== "undefined" && typeof window.localStorage !== "undefined";
if ("TURBOPACK compile-time truthy", 1) {
    try {
        AsyncStorage = (()=>{
            const e = new Error("Cannot find module '@react-native-async-storage/async-storage'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
        })().default;
    } catch  {
        AsyncStorage = null;
    }
}
const KEY = "nutrition_app_db";
async function loadLocalDB() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (AsyncStorage) {
        const raw = await AsyncStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : null;
    }
    return null;
}
async function saveLocalDB(data) {
    const serialized = JSON.stringify(data);
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (AsyncStorage) {
        await AsyncStorage.setItem(KEY, serialized);
    }
}
}),
"[project]/lib/db.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/localStore.ts [app-ssr] (ecmascript)");
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
    const stored = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadLocalDB"])();
    if (stored) db = stored;
}
function getDB() {
    return db;
}
async function updateDB(mutator) {
    mutator(db);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveLocalDB"])(db);
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
}),
"[project]/data/recommended_intake_fda.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"id":"fda_dv_2024","label":"FDA Daily Values (Age 4+)","source":"FDA","recommendations":[{"nutrient_id":"calories","unit":"kcal","sex":"any","age_min":4,"age_max":120,"daily_value":2000},{"nutrient_id":"protein","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":50},{"nutrient_id":"fat","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":78},{"nutrient_id":"saturated_fat","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":20},{"nutrient_id":"carbohydrate","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":275},{"nutrient_id":"fiber","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":28},{"nutrient_id":"added_sugars","unit":"g","sex":"any","age_min":4,"age_max":120,"daily_value":50},{"nutrient_id":"cholesterol","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":300},{"nutrient_id":"sodium","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":2300},{"nutrient_id":"vitamin_a","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":900},{"nutrient_id":"vitamin_c","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":90},{"nutrient_id":"vitamin_d","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":20},{"nutrient_id":"vitamin_e","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":15},{"nutrient_id":"vitamin_k","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":120},{"nutrient_id":"thiamin","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":1.2},{"nutrient_id":"riboflavin","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":1.3},{"nutrient_id":"niacin","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":16},{"nutrient_id":"vitamin_b6","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":1.7},{"nutrient_id":"folate","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":400},{"nutrient_id":"vitamin_b12","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":2.4},{"nutrient_id":"biotin","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":30},{"nutrient_id":"pantothenic_acid","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":5},{"nutrient_id":"calcium","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":1300},{"nutrient_id":"iron","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":18},{"nutrient_id":"phosphorus","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":1250},{"nutrient_id":"iodine","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":150},{"nutrient_id":"magnesium","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":420},{"nutrient_id":"zinc","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":11},{"nutrient_id":"selenium","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":55},{"nutrient_id":"copper","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":0.9},{"nutrient_id":"manganese","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":2.3},{"nutrient_id":"chromium","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":35},{"nutrient_id":"molybdenum","unit":"mcg","sex":"any","age_min":4,"age_max":120,"daily_value":45},{"nutrient_id":"chloride","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":2300},{"nutrient_id":"potassium","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":4700},{"nutrient_id":"choline","unit":"mg","sex":"any","age_min":4,"age_max":120,"daily_value":550}]});}),
"[project]/data/recommended_intake_generated.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"id\":\"generated_from_csv\",\"label\":\"Generated Recommended Intake\",\"source\":\"CSV Import\",\"recommendations\":[{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":1000.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":1200.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1600.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1800.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1800.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":2000.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1800.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":2200.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1600.0},{\"nutrient_id\":\"calorie\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":2000.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":13.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":19.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":19.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":34.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":34.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":46.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":52.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":46.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":56.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":46.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":56.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":46.0},{\"nutrient_id\":\"protein\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":56.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":130.0},{\"nutrient_id\":\"carbohydrate\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":130.0},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":14.0},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":16.8},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":19.6},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":22.4},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":25.2},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":25.2},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":30.8},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":28.0},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":33.6},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":25.2},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":30.8},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":22.4},{\"nutrient_id\":\"fiber\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":28.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":7.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":10.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":10.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":10.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":12.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":11.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":16.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":12.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":17.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":12.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":17.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":11.0},{\"nutrient_id\":\"linoleic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":14.0},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.7},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.9},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.9},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.0},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.2},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.1},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.6},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.1},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.6},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.1},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.6},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.1},{\"nutrient_id\":\"linolenic_acid\",\"unit\":\"g\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.6},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":700.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1300.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1300.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1300.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1300.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":1000.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1200.0},{\"nutrient_id\":\"calcium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":1200.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":7.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":10.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":10.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":8.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":8.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":15.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":11.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":18.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":8.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":18.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":8.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":8.0},{\"nutrient_id\":\"iron\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":8.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":80.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":130.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":130.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":240.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":240.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":360.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":410.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":310.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":400.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":320.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":420.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":320.0},{\"nutrient_id\":\"magnesium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":420.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":460.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":500.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":500.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1250.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1250.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1250.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1250.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":700.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":700.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":700.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":700.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":700.0},{\"nutrient_id\":\"phosphorus\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":3000.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":3800.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":3800.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":4500.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":4500.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":4700.0},{\"nutrient_id\":\"potassium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":4700.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":1500.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":1900.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":1900.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":2200.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":2200.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":2300.0},{\"nutrient_id\":\"sodium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":2300.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":3.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":5.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":5.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":8.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":8.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":9.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":11.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":8.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":11.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":8.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":11.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":8.0},{\"nutrient_id\":\"zinc\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":11.0},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.34},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.44},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.44},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.7},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.7},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":0.89},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":0.89},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":0.9},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":0.9},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":0.9},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":0.9},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":0.9},{\"nutrient_id\":\"copper\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":0.9},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":1.2},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":1.5},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":1.5},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.6},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.9},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.6},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":2.2},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.8},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":2.3},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.8},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":2.3},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.8},{\"nutrient_id\":\"manganese\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":2.3},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":20.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":30.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":30.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":40.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":40.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":55.0},{\"nutrient_id\":\"selenium\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":55.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":300.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":400.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":400.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":700.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":900.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":700.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":900.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":700.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":900.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":700.0},{\"nutrient_id\":\"vitamin_a\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":900.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":6.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":7.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":7.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":11.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":11.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_e\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_d\",\"unit\":\"IU\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":600.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":15.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":25.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":25.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":45.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":45.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":65.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":90.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":90.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_c\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":90.0},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.5},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.9},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.9},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.0},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.2},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.1},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.2},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.1},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.2},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.1},{\"nutrient_id\":\"thiamin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.2},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.5},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.9},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":0.9},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.0},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.3},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.1},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.3},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.1},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.3},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.1},{\"nutrient_id\":\"riboflavin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.3},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":6.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":8.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":8.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":12.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":12.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":14.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":16.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":14.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":16.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":14.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":16.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":14.0},{\"nutrient_id\":\"niacin\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":16.0},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.5},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":0.6},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.0},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.0},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.2},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":1.3},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.3},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":1.3},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.3},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":1.3},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.5},{\"nutrient_id\":\"vitamin_b6\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":1.7},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":0.9},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":1.2},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":1.2},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.8},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":1.8},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":2.4},{\"nutrient_id\":\"vitamin_b12\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":2.4},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":200.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":250.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":250.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":375.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":375.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":400.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":550.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":425.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":550.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":425.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":550.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":425.0},{\"nutrient_id\":\"choline\",\"unit\":\"mg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":550.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":30.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":55.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":55.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":60.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":60.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":75.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":90.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":120.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":90.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":120.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":90.0},{\"nutrient_id\":\"vitamin_k\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":120.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"any\",\"age_min\":1,\"age_max\":3,\"daily_value\":150.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":4,\"age_max\":8,\"daily_value\":200.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":4,\"age_max\":8,\"daily_value\":200.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":9,\"age_max\":13,\"daily_value\":300.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":9,\"age_max\":13,\"daily_value\":300.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":14,\"age_max\":18,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":14,\"age_max\":18,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":19,\"age_max\":30,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":19,\"age_max\":30,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":31,\"age_max\":50,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":31,\"age_max\":50,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"female\",\"age_min\":51,\"age_max\":120,\"daily_value\":400.0},{\"nutrient_id\":\"folate\",\"unit\":\"mcg\",\"sex\":\"male\",\"age_min\":51,\"age_max\":120,\"daily_value\":400.0}]}"));}),
"[project]/data/recommendations/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/recommendationResolver.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getResolvedRecommendations",
    ()=>getResolvedRecommendations
]);
// lib/recommendationResolver.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$recommendations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/recommendations/index.ts [app-ssr] (ecmascript)");
;
;
function getResolvedRecommendations() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDB"])();
    const profile = db.userProfile;
    const overrides = db.nutrientOverrides ?? {};
    const set = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$recommendations$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RECOMMENDATION_SETS"][profile.standard]; // ✅ now safe
    const rows = {};
    for (const r of set.recommendations){
        if ((r.sex === "any" || r.sex === profile.sex) && profile.age >= r.age_min && profile.age <= r.age_max) {
            rows[r.nutrient_id] = {
                id: r.nutrient_id,
                unit: r.unit,
                recommended: r.daily_value,
                value: overrides[r.nutrient_id] ?? r.daily_value,
                overridden: r.nutrient_id in overrides
            };
        }
    }
    return Object.values(rows);
}
}),
"[project]/lib/userProfile.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/app/recommendations/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RecommendationsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationResolver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/recommendationResolver.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$userProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/userProfile.ts [app-ssr] (ecmascript)");
// app/recommendations/page.tsx
"use client";
;
;
;
;
;
function RecommendationsPage() {
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [standard, setStandard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("fda_dv_2024");
    const [sex, setSex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("female");
    const [age, setAge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(30);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (async ()=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initDB"])();
            const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDB"])();
            const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$userProfile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserProfile"])();
            setStandard(db.userProfile?.standard ?? "fda_dv_2024");
            setSex(profile.sex ?? "female");
            setAge(profile.age ?? 30);
            setRows((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationResolver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResolvedRecommendations"])());
        })();
    }, []);
    async function changeStandard(next) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDB"])((db)=>{
            db.userProfile ??= {};
            db.userProfile.standard = next;
        });
        setStandard(next);
        setRows((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationResolver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResolvedRecommendations"])());
    }
    async function changeSex(next) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDB"])((db)=>{
            db.userProfile ??= {};
            db.userProfile.sex = next;
        });
        setSex(next);
        setRows((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationResolver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResolvedRecommendations"])());
    }
    async function changeAge(next) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDB"])((db)=>{
            db.userProfile ??= {};
            db.userProfile.age = next;
        });
        setAge(next);
        setRows((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationResolver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResolvedRecommendations"])());
    }
    async function updateValue(id, value) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDB"])((db)=>{
            db.nutrientOverrides[id] = value;
        });
        setRows((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationResolver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResolvedRecommendations"])());
    }
    async function resetAll() {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateDB"])((db)=>{
            db.nutrientOverrides = {};
        });
        setRows((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$recommendationResolver$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResolvedRecommendations"])());
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold",
                children: "Recommended Intake"
            }, void 0, false, {
                fileName: "[project]/app/recommendations/page.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: standard,
                        onChange: (e)=>changeStandard(e.target.value),
                        className: "p-2 rounded bg-neutral-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "fda_dv_2024",
                                children: "FDA Daily Values"
                            }, void 0, false, {
                                fileName: "[project]/app/recommendations/page.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "usda_dri",
                                children: "USDA DRI (Age / Sex)"
                            }, void 0, false, {
                                fileName: "[project]/app/recommendations/page.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/recommendations/page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: sex,
                        onChange: (e)=>changeSex(e.target.value),
                        className: "p-2 rounded bg-neutral-900",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "female",
                                children: "Female"
                            }, void 0, false, {
                                fileName: "[project]/app/recommendations/page.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "male",
                                children: "Male"
                            }, void 0, false, {
                                fileName: "[project]/app/recommendations/page.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/recommendations/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        min: 1,
                        max: 120,
                        value: age,
                        onChange: (e)=>changeAge(Number(e.target.value)),
                        className: "p-2 w-20 rounded bg-neutral-900 text-right"
                    }, void 0, false, {
                        fileName: "[project]/app/recommendations/page.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/recommendations/page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3 bg-neutral-900 p-3 rounded",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-medium capitalize",
                                        children: r.id.replace("_", " ")
                                    }, void 0, false, {
                                        fileName: "[project]/app/recommendations/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-neutral-400",
                                        children: [
                                            "Default: ",
                                            r.recommended,
                                            " ",
                                            r.unit
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/recommendations/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/recommendations/page.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                value: r.value,
                                onChange: (e)=>updateValue(r.id, Number(e.target.value)),
                                className: "w-24 p-2 rounded bg-neutral-800 text-right"
                            }, void 0, false, {
                                fileName: "[project]/app/recommendations/page.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        ]
                    }, r.id, true, {
                        fileName: "[project]/app/recommendations/page.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/recommendations/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: resetAll,
                className: "w-full p-3 rounded bg-neutral-700 text-sm",
                children: "Restore Defaults"
            }, void 0, false, {
                fileName: "[project]/app/recommendations/page.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/recommendations/page.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_d0414825._.js.map