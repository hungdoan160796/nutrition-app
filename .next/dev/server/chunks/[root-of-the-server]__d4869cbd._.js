module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/foods/add/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/app [external] (firebase-admin/app, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
const runtime = 'nodejs';
;
;
;
;
const FOOD_GROUPS = [
    'starch',
    'meat',
    'fish',
    'seafood',
    'vegetables',
    'legumes',
    'fruits',
    'condiments',
    'seasonings'
];
const EMPTY_NUTRIENTS = {
    vitamin_a: 0,
    fat: 0,
    carbohydrate: 0,
    calories: 0,
    calcium: 0,
    potassium: 0,
    zinc: 0,
    protein: 0,
    iron: 0,
    magnesium: 0,
    sodium: 0,
    vitamin_c: 0,
    folate: 0,
    vitamin_b12: 0,
    vitamin_d: 0
};
/* ---------------- FIREBASE INIT ---------------- */ if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getApps"])().length) {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["initializeApp"])({
        credential: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["cert"])({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        })
    });
}
const db = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getFirestore"])();
async function POST(req) {
    try {
        // prefer an incoming per-user key (sent by client from user profile) via header
        const openaiKey = req.headers.get('x-openai-key') ?? process.env.NEXT_PUBLIC_OPENAI_API_KEY;
        if (!openaiKey) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing OpenAI key'
            }, {
                status: 401
            });
        }
        // Quick Content-Type check to help catch non-JSON requests early
        const contentType = req.headers.get('content-type') ?? '';
        if (!contentType.toLowerCase().includes('application/json')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid Content-Type: expected application/json'
            }, {
                status: 400
            });
        }
        // Safe JSON parsing with useful error message on failure
        let body;
        try {
            body = await req.json();
        } catch (parseErr) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid JSON body',
                detail: parseErr?.message ?? String(parseErr)
            }, {
                status: 400
            });
        }
        let { food, measurement, term, fdcId } = body ?? {};
        // If client only sent an fdcId (older client code), fetch full food details
        // from the USDA API server-side so we have `food.foodNutrients` available.
        if (!food && fdcId) {
            const usdaKey = process.env.USDA_API_KEY;
            if (!usdaKey) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'USDA API key missing'
                }, {
                    status: 500
                });
            }
            const res = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${encodeURIComponent(String(fdcId))}?api_key=${usdaKey}`);
            if (!res.ok) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Failed to fetch USDA food details'
                }, {
                    status: 500
                });
            }
            try {
                food = await res.json();
            } catch (e) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Invalid USDA response'
                }, {
                    status: 500
                });
            }
        }
        // More detailed validation feedback so the client knows what's missing
        const missing = [];
        if (!food) missing.push('food');
        else {
            if (!food.fdcId) missing.push('food.fdcId');
            if (!food.description) missing.push('food.description');
        // NOTE: we do NOT require `food.foodNutrients` here because search results
        // (and some USDA responses) may not include that array. We'll coerce or
        // fetch nutrients below before calling the normalizer. The OpenAI
        // normalization step will still run and return EMPTY_NUTRIENTS if no
        // usable nutrients are available.
        }
        if (missing.length) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid payload',
                missing
            }, {
                status: 400
            });
        }
        const openai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
            apiKey: openaiKey
        });
        // Coerce various USDA shapes into an array the normalizer expects.
        let nutrientsSource = [];
        if (Array.isArray(food.foodNutrients)) {
            nutrientsSource = food.foodNutrients;
        } else if (food.labelNutrients && typeof food.labelNutrients === 'object') {
            // Convert labelNutrients object -> [{ nutrient: { name }, amount }]
            nutrientsSource = Object.entries(food.labelNutrients).map(([k, v])=>({
                    nutrient: {
                        name: k
                    },
                    amount: v?.value ?? v
                }));
        } else if (food.foodNutrient && typeof food.foodNutrient === 'object') {
            nutrientsSource = [
                food.foodNutrient
            ];
        } else {
            nutrientsSource = [];
        }
        const [group, nutrients] = await Promise.all([
            classifyFoodGroup(openai, food.description),
            normalizeNutrients(openai, nutrientsSource)
        ]);
        const entry = {
            id: String(food.fdcId),
            group,
            term: term ?? null,
            measurement: measurement ?? null,
            name: food.description,
            nutrients,
            createdAt: new Date()
        };
        await db.collection('foods').doc(entry.id).set(entry, {
            merge: true
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            id: entry.id
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to add food',
            detail: err?.message ?? 'Unknown error'
        }, {
            status: 500
        });
    }
}
/* ---------------- HELPERS ---------------- */ async function classifyFoodGroup(openai, name) {
    try {
        const res = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0,
            messages: [
                {
                    role: 'system',
                    content: 'Return ONE category only.'
                },
                {
                    role: 'user',
                    content: `Food: "${name}"
Categories: ${FOOD_GROUPS.join(', ')}`
                }
            ]
        });
        const value = res.choices[0]?.message?.content?.trim().toLowerCase() ?? '';
        return FOOD_GROUPS.includes(value) ? value : 'seasonings';
    } catch  {
        return 'seasonings';
    }
}
async function normalizeNutrients(openai, foodNutrients) {
    try {
        const res = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0,
            messages: [
                {
                    role: 'system',
                    content: `
You are a nutrition data normalizer.

Map USDA nutrient entries into the EXACT JSON schema below.
Return ONLY valid JSON. No markdown. No explanations.

Schema:
{
  "vitamin_a": number,
  "fat": number,
  "carbohydrate": number,
  "calories": number,
  "calcium": number,
  "potassium": number,
  "zinc": number,
  "protein": number,
  "iron": number,
  "magnesium": number,
  "sodium": number,
  "vitamin_c": number,
  "folate": number,
  "vitamin_b12": number,
  "vitamin_d": number
}

Rules:
- Use the closest matching USDA nutrient names
- Convert units if needed
- If a nutrient is missing or null, set it to 0
- Do not include extra keys
          `.trim()
                },
                {
                    role: 'user',
                    content: JSON.stringify(foodNutrients)
                }
            ]
        });
        const raw = res.choices[0]?.message?.content;
        if (!raw) return EMPTY_NUTRIENTS;
        const parsed = JSON.parse(raw);
        return {
            vitamin_a: Number(parsed.vitamin_a) || 0,
            fat: Number(parsed.fat) || 0,
            carbohydrate: Number(parsed.carbohydrate) || 0,
            calories: Number(parsed.calories) || 0,
            calcium: Number(parsed.calcium) || 0,
            potassium: Number(parsed.potassium) || 0,
            zinc: Number(parsed.zinc) || 0,
            protein: Number(parsed.protein) || 0,
            iron: Number(parsed.iron) || 0,
            magnesium: Number(parsed.magnesium) || 0,
            sodium: Number(parsed.sodium) || 0,
            vitamin_c: Number(parsed.vitamin_c) || 0,
            folate: Number(parsed.folate) || 0,
            vitamin_b12: Number(parsed.vitamin_b12) || 0,
            vitamin_d: Number(parsed.vitamin_d) || 0
        };
    } catch  {
        return EMPTY_NUTRIENTS;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d4869cbd._.js.map