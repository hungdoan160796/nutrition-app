module.exports = [
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
}),
"[project]/lib/localStore.web.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadLocalDB",
    ()=>loadLocalDB,
    "saveLocalDB",
    ()=>saveLocalDB
]);
const KEY = "nutrition_app_db";
async function loadLocalDB() {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
}
async function saveLocalDB(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}
}),
"[project]/components/FoodRow.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FoodRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStore$2e$web$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/localStore.web.ts [app-ssr] (ecmascript)");
// components/FoodRow.tsx
"use client";
;
;
;
function FoodRow({ food }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!food.term) return;
        (async ()=>{
            const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStore$2e$web$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadLocalDB"])() ?? {
                foods_selected: []
            };
            const idx = db.foods_selected.findIndex((f)=>f.term === food.term);
            if (idx === -1) {
                db.foods_selected.push(food);
            } else {
                db.foods_selected[idx] = food;
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStore$2e$web$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveLocalDB"])(db);
        })();
    }, [
        food.term,
        food.quantity,
        food.name
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-between text-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: food.term
            }, void 0, false, {
                fileName: "[project]/components/FoodRow.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-muted-foreground",
                children: food.quantity ?? ""
            }, void 0, false, {
                fileName: "[project]/components/FoodRow.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FoodRow.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/history/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HistoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FoodRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FoodRow.tsx [app-ssr] (ecmascript)");
// app/history/page.tsx
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
const WEEK_START = 1; // 0 = Sunday, 1 = Monday
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
    for (const dateStr of dates){
        const date = new Date(dateStr);
        const weekStart = iso(startOfWeek(date));
        const foods = db.foodLog[dateStr] ?? [];
        const micros = foods.flatMap((f)=>(f.progress?.focus ?? []).filter((n)=>!MACROS.includes(n.id)));
        const microAvg = micros.length === 0 ? 0 : Math.round(micros.reduce((s, n)=>s + n.progress, 0) / micros.length * 100) / 100;
        if (!map.has(weekStart)) map.set(weekStart, new Map());
        map.get(weekStart).set(dateStr, {
            date: dateStr,
            foods,
            microAvg
        });
    }
    return Array.from(map.entries()).map(([start, dayMap])=>{
        const base = new Date(start);
        const days = Array.from({
            length: 7
        }, (_, i)=>dayMap.get(iso(addDays(base, i))) ?? null);
        return {
            start,
            days
        };
    }).sort((a, b)=>b.start.localeCompare(a.start));
}
function WeekChart({ days }) {
    const w = 220;
    const h = 56;
    const p = 8;
    let sum = 0;
    let count = 0;
    const values = days.map((d)=>{
        if (!d) return null;
        sum += d.microAvg;
        count++;
        return Math.min(100, sum / count);
    });
    const segments = [];
    let curr = [];
    values.forEach((v, i)=>{
        if (v === null) {
            if (curr.length > 1) segments.push(curr.join(" "));
            curr = [];
            return;
        }
        const x = p + i / 6 * (w - p * 2);
        const y = h - p - v / 100 * (h - p * 2);
        curr.push(`${x},${y}`);
    });
    if (curr.length > 1) segments.push(curr.join(" "));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: w,
        height: h,
        className: "text-muted-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: p,
                x2: w - p,
                y1: p,
                y2: p,
                stroke: "currentColor",
                strokeDasharray: "4 4",
                opacity: "0.35"
            }, void 0, false, {
                fileName: "[project]/app/history/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            segments.map((pts, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    points: pts
                }, i, false, {
                    fileName: "[project]/app/history/page.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/app/history/page.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
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
    const [weeks, setWeeks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (async ()=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initDB"])();
            setWeeks(buildWeeks((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDB"])()));
        })();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold",
                children: "History"
            }, void 0, false, {
                fileName: "[project]/app/history/page.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            weeks.map((week)=>{
                const visibleDays = week.days.filter((d)=>d !== null);
                const missingCount = week.days.length - visibleDays.length;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-xl border border-muted/40 p-4 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-sm font-medium",
                                            children: formatWeekRange(week.start)
                                        }, void 0, false, {
                                            fileName: "[project]/app/history/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, this),
                                        missingCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                missingCount,
                                                " day",
                                                missingCount > 1 ? "s" : "",
                                                " with no data"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/history/page.tsx",
                                            lineNumber: 179,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/history/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WeekChart, {
                                    days: week.days
                                }, void 0, false, {
                                    fileName: "[project]/app/history/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/history/page.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: visibleDays.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xs font-medium text-muted-foreground",
                                            children: day.date
                                        }, void 0, false, {
                                            fileName: "[project]/app/history/page.tsx",
                                            lineNumber: 190,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: day.foods.map((food, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FoodRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    food: food
                                                }, i, false, {
                                                    fileName: "[project]/app/history/page.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/history/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, day.date, true, {
                                    fileName: "[project]/app/history/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/history/page.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, this)
                    ]
                }, week.start, true, {
                    fileName: "[project]/app/history/page.tsx",
                    lineNumber: 169,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/app/history/page.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_b6a225b1._.js.map