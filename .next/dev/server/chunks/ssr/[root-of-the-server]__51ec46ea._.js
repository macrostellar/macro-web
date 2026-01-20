module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/supabase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-ssr] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://jbhdzfhzpxqhioxsclxj.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiaGR6Zmh6cHhxaGlveHNjbHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMzgxODIsImV4cCI6MjA3NzkxNDE4Mn0.KodEll_HGjjz_09g1fm_Bu-z0IzECoehZ3qv7i9abX0");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
// Singleton pattern to prevent multiple client instances
let supabaseInstance = null;
function getSupabaseClient() {
    if (!supabaseInstance) {
        supabaseInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            },
            global: {
                headers: {
                    'x-application-name': 'macrotracking'
                }
            },
            // Optimize realtime connections
            realtime: {
                params: {
                    eventsPerSecond: 10
                }
            }
        });
    }
    return supabaseInstance;
}
const supabase = getSupabaseClient();
}),
"[project]/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Permission definitions
const PERMISSIONS = {
    super_admin: [
        'manage_all_users',
        'manage_all_vehicles',
        'manage_all_drivers',
        'view_all_reports',
        'manage_billing',
        'manage_settings',
        'view_all_alerts',
        'manage_own_fleet',
        'manage_own_drivers',
        'manage_own_vehicles',
        'view_own_reports',
        'view_own_alerts',
        'view_assigned_vehicle',
        'view_own_trips',
        'manage_companies',
        'manage_subscriptions'
    ],
    owner: [
        'manage_own_fleet',
        'manage_own_drivers',
        'manage_own_vehicles',
        'view_own_reports',
        'view_own_alerts',
        'view_assigned_vehicle',
        'view_own_trips'
    ],
    driver: [
        'view_assigned_vehicle',
        'view_own_trips'
    ]
};
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchProfile = async (userId)=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('profiles').select('*').eq('id', userId).maybeSingle();
            if (data && !error) {
                setProfile(data);
                setRole(data.role);
                // Cache profile in localStorage
                window.localStorage.setItem('profile', JSON.stringify(data));
            } else if (error) {
                setError('Error fetching profile');
                console.error('Error fetching profile:', error);
            }
        } catch (error) {
            setError('Error fetching profile');
            console.error('Error fetching profile:', error);
        }
    };
    const refreshProfile = async ()=>{
        if (user) {
            await fetchProfile(user.id);
        }
    };
    // Initialize session and auth state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let isMounted = true;
        // Try to restore profile from localStorage instantly
        const cachedProfile = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const initAuth = async ()=>{
            try {
                // Increase timeout to handle cold starts and network latency
                const timeoutPromise = new Promise((_, reject)=>setTimeout(()=>reject(new Error('Auth timeout')), 15000));
                const sessionPromise = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
                const { data } = await Promise.race([
                    sessionPromise,
                    timeoutPromise
                ]);
                if (!isMounted) return;
                setSession(data.session);
                setUser(data.session?.user ?? null);
                if (data.session?.user) {
                    await fetchProfile(data.session.user.id);
                } else {
                    setProfile(null);
                    setRole(null);
                    window.localStorage.removeItem('profile');
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                // Don't show error banner for timeout - just use cached data if available
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                else {
                    setError('Connection timeout. Please refresh the page.');
                }
            } finally{
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        initAuth();
        const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange(async (_event, session)=>{
            if (!isMounted) return;
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setRole(null);
                window.localStorage.removeItem('profile');
            }
            setLoading(false);
        });
        return ()=>{
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);
    // Sign Up
    const signUp = async (email, password, fullName)=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
                email,
                password
            });
            if (error) throw error;
            if (data.user && fullName) {
                // update profile after signup with default role as 'owner'
                const { error: profileError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('profiles').update({
                    full_name: fullName,
                    role: 'owner'
                }).eq('id', data.user.id);
                if (profileError) throw profileError;
                // Cache profile instantly
                window.localStorage.setItem('profile', JSON.stringify({
                    ...data.user,
                    full_name: fullName,
                    role: 'owner'
                }));
            }
            return {
                error: null
            };
        } catch (error) {
            setError('SignUp Error');
            console.error('SignUp Error:', error);
            return {
                error: error
            };
        }
    };
    // Sign In
    const signIn = async (email, password)=>{
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
                email,
                password
            });
            if (error) throw error;
            // Cache profile instantly if available
            if (data?.user) {
                await fetchProfile(data.user.id);
            }
            return {
                error: null
            };
        } catch (error) {
            setError('SignIn Error');
            console.error('SignIn Error:', error);
            return {
                error: error
            };
        }
    };
    // Sign Out
    const signOut = async ()=>{
        try {
            // Clear state first to prevent stale UI
            setUser(null);
            setSession(null);
            setProfile(null);
            setRole(null);
            window.localStorage.removeItem('profile');
            // Then sign out from Supabase
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
            if (error) throw error;
        } catch (error) {
            setError('SignOut Error');
            console.error('SignOut Error:', error);
        }
    };
    // Role checks
    const isSuperAdmin = role === 'super_admin';
    const isOwner = role === 'owner';
    const isDriver = role === 'driver';
    // Permission check
    const hasPermission = (permission)=>{
        if (!role) return false;
        const rolePermissions = PERMISSIONS[role] || [];
        return rolePermissions.includes(permission);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            session,
            profile,
            role,
            loading,
            signUp,
            signIn,
            signOut,
            refreshProfile,
            isSuperAdmin,
            isOwner,
            isDriver,
            hasPermission
        },
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    background: '#f87171',
                    color: '#fff',
                    padding: '8px',
                    zIndex: 9999,
                    textAlign: 'center'
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/contexts/AuthContext.tsx",
                lineNumber: 252,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/contexts/AuthContext.tsx",
        lineNumber: 246,
        columnNumber: 5
    }, this);
}
// Hook for consuming auth context
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}
;
}),
"[project]/contexts/DriverContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DriverProvider",
    ()=>DriverProvider,
    "useDrivers",
    ()=>useDrivers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const DriverContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const DriverProvider = ({ children })=>{
    const [drivers, setDrivers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [localSelectedDriverId, setLocalSelectedDriverId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, loading: authLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const refreshDrivers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!user) {
            setDrivers([]);
            return;
        }
        setLoading(true);
        try {
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("drivers").select("*");
            setDrivers(data ?? []);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        } finally{
            setLoading(false);
        }
    }, [
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Only fetch drivers when user is authenticated
        if (!authLoading && user) {
            refreshDrivers();
        } else if (!authLoading && !user) {
            // Clear drivers when user logs out
            setDrivers([]);
        }
    }, [
        user,
        authLoading,
        refreshDrivers
    ]);
    const driversMap = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useMemo(()=>Object.fromEntries(drivers.map((d)=>[
                d.id,
                d
            ])), [
        drivers
    ]);
    const getDriver = (id)=>id ? driversMap[id] ?? null : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DriverContext.Provider, {
        value: {
            drivers,
            driversMap,
            refreshDrivers,
            getDriver,
            setLocalSelectedDriver: setLocalSelectedDriverId,
            localSelectedDriverId,
            loading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/DriverContext.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useDrivers = ()=>{
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DriverContext);
    if (!ctx) throw new Error("useDrivers must be used within DriverProvider");
    return ctx;
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__51ec46ea._.js.map