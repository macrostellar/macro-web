(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(dashboard)/live-tracking/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiveTrackingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mapbox-gl/dist/mapbox-gl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mapbox$2f$mapbox$2d$gl$2d$draw$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mapbox/mapbox-gl-draw/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/navigation.js [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Signal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/signal.js [app-client] (ecmascript) <export default as Signal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gauge.js [app-client] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crosshair.js [app-client] (ecmascript) <export default as Crosshair>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skip$2d$back$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SkipBack$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/skip-back.js [app-client] (ecmascript) <export default as SkipBack>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skip$2d$forward$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SkipForward$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/skip-forward.js [app-client] (ecmascript) <export default as SkipForward>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/compass.js [app-client] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radio.js [app-client] (ecmascript) <export default as Radio>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].accessToken = "pk.eyJ1Ijoic2FyYWhhc2lmIiwiYSI6ImNtaWlvdGZ5bTA1Z24zZXNoazZwb3p6Y3kifQ.2olx4jcsvmvcXOoblHiRFA";
// Point in polygon check using ray casting algorithm
const isPointInPolygon = (point, polygon)=>{
    const [x, y] = point;
    let inside = false;
    for(let i = 0, j = polygon.length - 1; i < polygon.length; j = i++){
        const xi = polygon[i][0], yi = polygon[i][1];
        const xj = polygon[j][0], yj = polygon[j][1];
        const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
};
const MAP_STYLES = {
    streets: "mapbox://styles/mapbox/streets-v12",
    satellite: "mapbox://styles/mapbox/satellite-streets-v12",
    dark: "mapbox://styles/mapbox/dark-v11",
    light: "mapbox://styles/mapbox/light-v11"
};
function LiveTrackingPage() {
    _s();
    const mapContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const vehicleMarkersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const drawRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // State
    const [vehicles, setVehicles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredVehicles, setFilteredVehicles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedVehicle, setSelectedVehicle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSideOpen, setIsSideOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mapStyle, setMapStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("streets");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showStylePicker, setShowStylePicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Geofence state
    const [geofences, setGeofences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showGeofences, setShowGeofences] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const geofenceLayersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    // Alert state
    const [liveAlerts, setLiveAlerts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showAlertBanner, setShowAlertBanner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const vehicleGeofenceStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map()); // Track which vehicles are in which geofences
    const defaultSpeedLimit = 120; // Default speed limit in km/h
    // Geofence creation state
    const [isDrawingGeofence, setIsDrawingGeofence] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showGeofenceModal, setShowGeofenceModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [drawnGeometry, setDrawnGeometry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [geofenceForm, setGeofenceForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        description: "",
        vehicle_id: "",
        type: "both"
    });
    // Realtime connection status
    const [realtimeStatus, setRealtimeStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('connecting');
    const reconnectTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Playback state
    const [playbackPoints, setPlaybackPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const playbackMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playbackAnimationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [playbackIdx, setPlaybackIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [playbackDuration, setPlaybackDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [playbackSpeed, setPlaybackSpeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showPlaybackPanel, setShowPlaybackPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [playbackVehicle, setPlaybackVehicle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Realtime channel ref
    const realtimeChannelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Stats - memoized to prevent recalculation on every render
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveTrackingPage.useMemo[stats]": ()=>({
                total: vehicles.length,
                moving: vehicles.filter({
                    "LiveTrackingPage.useMemo[stats]": (v)=>v.status === "moving" || v.status === "online" || v.status === "in_motion"
                }["LiveTrackingPage.useMemo[stats]"]).length,
                stopped: vehicles.filter({
                    "LiveTrackingPage.useMemo[stats]": (v)=>v.status === "stopped" || v.status === "parked"
                }["LiveTrackingPage.useMemo[stats]"]).length,
                offline: vehicles.filter({
                    "LiveTrackingPage.useMemo[stats]": (v)=>v.status === "offline" || !v.status
                }["LiveTrackingPage.useMemo[stats]"]).length
            })
    }["LiveTrackingPage.useMemo[stats]"], [
        vehicles
    ]);
    // --- Load vehicles with latest tracking data ---
    const loadVehicles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LiveTrackingPage.useCallback[loadVehicles]": async ()=>{
            setIsLoading(true);
            try {
                // Fetch vehicles and latest tracking in parallel
                const [vehiclesResult, trackingResult] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("vehicles").select("id, registration_number, last_known_location, last_update, status, assigned_driver_id, company_id, model, vehicle_type, brand, image_url").limit(100),
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("tracking_data").select("vehicle_id, location, timestamp, speed, ignition_status, heading").order("timestamp", {
                        ascending: false
                    }).limit(200)
                ]);
                const vehiclesData = vehiclesResult.data;
                const latestTracking = trackingResult.data;
                if (!vehiclesData) {
                    setIsLoading(false);
                    return;
                }
                // Create a map of latest tracking per vehicle (more efficient)
                const latestByVehicle = new Map();
                if (latestTracking) {
                    for (const t of latestTracking){
                        if (!latestByVehicle.has(t.vehicle_id)) {
                            latestByVehicle.set(t.vehicle_id, t);
                        }
                    }
                }
                // Parse location helper - handles multiple formats including PostGIS geometry
                const parseLocation = {
                    "LiveTrackingPage.useCallback[loadVehicles].parseLocation": (loc)=>{
                        if (!loc) return null;
                        // Already an object with lat/lng
                        if (typeof loc === 'object' && loc !== null) {
                            const obj = loc;
                            if (typeof obj.lat === 'number' && typeof obj.lng === 'number') {
                                return {
                                    lat: obj.lat,
                                    lng: obj.lng
                                };
                            }
                            // GeoJSON Point format
                            if ('coordinates' in obj && Array.isArray(obj.coordinates)) {
                                const coords = obj.coordinates;
                                if (coords.length >= 2) {
                                    return {
                                        lng: coords[0],
                                        lat: coords[1]
                                    };
                                }
                            }
                            // Object with x/y
                            if (typeof obj.x === 'number' && typeof obj.y === 'number') {
                                return {
                                    lng: obj.x,
                                    lat: obj.y
                                };
                            }
                        }
                        // WKT string (including SRID prefix)
                        if (typeof loc === 'string') {
                            // Remove SRID prefix if present
                            const cleanLoc = loc.replace(/^SRID=\d+;/, '');
                            const pointMatch = cleanLoc.match(/POINT\s*\(\s*([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)\s*\)/i);
                            if (pointMatch) {
                                return {
                                    lng: parseFloat(pointMatch[1]),
                                    lat: parseFloat(pointMatch[2])
                                };
                            }
                        }
                        return null;
                    }
                }["LiveTrackingPage.useCallback[loadVehicles].parseLocation"];
                const normalized = vehiclesData.map({
                    "LiveTrackingPage.useCallback[loadVehicles].normalized": (v)=>{
                        const latestTrack = latestByVehicle.get(v.id);
                        // Use tracking_data if it's more recent than vehicles table
                        let location = v.last_known_location && typeof v.last_known_location === "object" ? v.last_known_location : null;
                        let lastUpdate = v.last_update;
                        let status = v.status;
                        let speed = null;
                        let heading = null;
                        let latitude = null;
                        let longitude = null;
                        let ignition_status = null;
                        if (latestTrack) {
                            // Parse the location column (PostGIS geometry or JSON)
                            const parsedLoc = parseLocation(latestTrack.location);
                            if (parsedLoc) {
                                const trackTime = new Date(latestTrack.timestamp).getTime();
                                const vehicleTime = lastUpdate ? new Date(lastUpdate).getTime() : 0;
                                if (trackTime > vehicleTime) {
                                    location = parsedLoc;
                                    latitude = parsedLoc.lat;
                                    longitude = parsedLoc.lng;
                                    lastUpdate = latestTrack.timestamp;
                                    status = latestTrack.ignition_status ? "moving" : "stopped";
                                    speed = typeof latestTrack.speed === 'number' ? latestTrack.speed : null;
                                    heading = typeof latestTrack.heading === 'number' ? latestTrack.heading : null;
                                    ignition_status = latestTrack.ignition_status ?? null;
                                }
                            }
                        }
                        return {
                            ...v,
                            last_known_location: location,
                            last_update: lastUpdate,
                            status: status,
                            speed: speed,
                            heading: heading,
                            latitude: latitude,
                            longitude: longitude,
                            ignition_status: ignition_status
                        };
                    }
                }["LiveTrackingPage.useCallback[loadVehicles].normalized"]);
                // Sort vehicles: moving/active first, then by last update
                const sortedVehicles = normalized.sort({
                    "LiveTrackingPage.useCallback[loadVehicles].sortedVehicles": (a, b)=>{
                        const aActive = a.status === 'moving' || a.status === 'online' || a.status === 'in_motion';
                        const bActive = b.status === 'moving' || b.status === 'online' || b.status === 'in_motion';
                        if (aActive && !bActive) return -1;
                        if (!aActive && bActive) return 1;
                        // Then by last update (most recent first)
                        const aTime = a.last_update ? new Date(a.last_update).getTime() : 0;
                        const bTime = b.last_update ? new Date(b.last_update).getTime() : 0;
                        return bTime - aTime;
                    }
                }["LiveTrackingPage.useCallback[loadVehicles].sortedVehicles"]);
                const uniqueVehicles = Array.from(new Map(sortedVehicles.map({
                    "LiveTrackingPage.useCallback[loadVehicles].uniqueVehicles": (v)=>[
                            v.id,
                            v
                        ]
                }["LiveTrackingPage.useCallback[loadVehicles].uniqueVehicles"])).values());
                setVehicles(uniqueVehicles);
            } catch (error) {
                console.error("Error loading vehicles:", error);
            } finally{
                setIsLoading(false);
            }
        }
    }["LiveTrackingPage.useCallback[loadVehicles]"], []);
    // --- Load geofences ---
    const loadGeofences = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LiveTrackingPage.useCallback[loadGeofences]": async ()=>{
            // Use RPC to get boundary as GeoJSON since PostGIS stores it as binary WKB
            // The RPC function needs to be created in Supabase first
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('get_geofences_with_geojson');
            if (error) {
                // Fallback to regular query if RPC doesn't exist
                console.log('RPC not available, trying direct query with ST_AsGeoJSON');
                const { data: fallbackData } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("geofences").select("id, name, boundary, active, vehicle_id, type").eq("active", true);
                // Try to parse the boundary - it might be WKB hex
                const parsedGeofences = (fallbackData || []).map({
                    "LiveTrackingPage.useCallback[loadGeofences].parsedGeofences": (g)=>{
                        // If boundary is a hex string (WKB), we can't parse it client-side easily
                        // But if it's already GeoJSON object, use it
                        let parsedBoundary = g.boundary;
                        if (typeof g.boundary === 'object' && g.boundary?.type && g.boundary?.coordinates) {
                            parsedBoundary = g.boundary;
                        }
                        return {
                            ...g,
                            boundary: parsedBoundary
                        };
                    }
                }["LiveTrackingPage.useCallback[loadGeofences].parsedGeofences"]);
                setGeofences(parsedGeofences);
                return;
            }
            setGeofences(data || []);
        }
    }["LiveTrackingPage.useCallback[loadGeofences]"], []);
    // Check geofence violations for a vehicle
    const checkGeofenceViolations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LiveTrackingPage.useCallback[checkGeofenceViolations]": async (vehicleId, vehicleName, lat, lng, speed)=>{
            if (geofences.length === 0) return;
            const currentVehicleState = vehicleGeofenceStateRef.current.get(vehicleId) || new Set();
            const newGeofenceState = new Set();
            for (const geofence of geofences){
                const geometry = parseBoundary(geofence.boundary);
                if (!geometry || geometry.type !== 'Polygon') continue;
                // Check if vehicle is inside geofence
                const coordinates = geometry.coordinates[0]; // First ring (outer polygon)
                const isInside = isPointInPolygon([
                    lng,
                    lat
                ], coordinates);
                if (isInside) {
                    newGeofenceState.add(geofence.id);
                    // Check for entry alert
                    if (!currentVehicleState.has(geofence.id)) {
                        // Vehicle just entered geofence
                        if (geofence.type === 'entry' || geofence.type === 'both') {
                            const alert1 = {
                                id: `${vehicleId}-${geofence.id}-entry-${Date.now()}`,
                                message: `${vehicleName} entered geofence: ${geofence.name}`,
                                severity: 'medium',
                                alert_type: 'geofence_entry',
                                vehicle_id: vehicleId,
                                geofence_id: geofence.id,
                                created_at: new Date().toISOString(),
                                acknowledged: false
                            };
                            setLiveAlerts({
                                "LiveTrackingPage.useCallback[checkGeofenceViolations]": (prev)=>[
                                        alert1,
                                        ...prev
                                    ].slice(0, 50)
                            }["LiveTrackingPage.useCallback[checkGeofenceViolations]"]);
                            setShowAlertBanner(true);
                            // Save to database
                            saveAlert(alert1, vehicleId, geofence.id);
                        }
                    }
                    // Check speed limit within geofence
                    if (geofence.speed_limit && speed && speed > geofence.speed_limit) {
                        const alert1 = {
                            id: `${vehicleId}-speed-${geofence.id}-${Date.now()}`,
                            message: `${vehicleName} speeding in ${geofence.name}: ${speed.toFixed(0)} km/h (limit: ${geofence.speed_limit} km/h)`,
                            severity: 'high',
                            alert_type: 'speed_violation',
                            vehicle_id: vehicleId,
                            geofence_id: geofence.id,
                            speed_recorded: speed,
                            speed_limit: geofence.speed_limit,
                            created_at: new Date().toISOString(),
                            acknowledged: false
                        };
                        setLiveAlerts({
                            "LiveTrackingPage.useCallback[checkGeofenceViolations]": (prev)=>[
                                    alert1,
                                    ...prev
                                ].slice(0, 50)
                        }["LiveTrackingPage.useCallback[checkGeofenceViolations]"]);
                        setShowAlertBanner(true);
                        saveAlert(alert1, vehicleId, geofence.id);
                    }
                } else {
                    // Check for exit alert
                    if (currentVehicleState.has(geofence.id)) {
                        // Vehicle just exited geofence
                        if (geofence.type === 'exit' || geofence.type === 'both') {
                            const alert1 = {
                                id: `${vehicleId}-${geofence.id}-exit-${Date.now()}`,
                                message: `${vehicleName} exited geofence: ${geofence.name}`,
                                severity: 'medium',
                                alert_type: 'geofence_exit',
                                vehicle_id: vehicleId,
                                geofence_id: geofence.id,
                                created_at: new Date().toISOString(),
                                acknowledged: false
                            };
                            setLiveAlerts({
                                "LiveTrackingPage.useCallback[checkGeofenceViolations]": (prev)=>[
                                        alert1,
                                        ...prev
                                    ].slice(0, 50)
                            }["LiveTrackingPage.useCallback[checkGeofenceViolations]"]);
                            setShowAlertBanner(true);
                            saveAlert(alert1, vehicleId, geofence.id);
                        }
                    }
                }
            }
            // Update vehicle geofence state
            vehicleGeofenceStateRef.current.set(vehicleId, newGeofenceState);
            // Check global speed limit
            if (speed && speed > defaultSpeedLimit) {
                // Only alert once per 60 seconds per vehicle for speed
                const lastSpeedAlertKey = `${vehicleId}-speed-global`;
                const lastAlert = liveAlerts.find({
                    "LiveTrackingPage.useCallback[checkGeofenceViolations].lastAlert": (a)=>a.id.startsWith(lastSpeedAlertKey)
                }["LiveTrackingPage.useCallback[checkGeofenceViolations].lastAlert"]);
                const shouldAlert = !lastAlert || Date.now() - new Date(lastAlert.created_at).getTime() > 60000;
                if (shouldAlert) {
                    const alert1 = {
                        id: `${lastSpeedAlertKey}-${Date.now()}`,
                        message: `${vehicleName} exceeded speed limit: ${speed.toFixed(0)} km/h (limit: ${defaultSpeedLimit} km/h)`,
                        severity: 'high',
                        alert_type: 'speed_violation',
                        vehicle_id: vehicleId,
                        speed_recorded: speed,
                        speed_limit: defaultSpeedLimit,
                        created_at: new Date().toISOString(),
                        acknowledged: false
                    };
                    setLiveAlerts({
                        "LiveTrackingPage.useCallback[checkGeofenceViolations]": (prev)=>[
                                alert1,
                                ...prev
                            ].slice(0, 50)
                    }["LiveTrackingPage.useCallback[checkGeofenceViolations]"]);
                    setShowAlertBanner(true);
                    saveAlert(alert1, vehicleId, null);
                }
            }
        }
    }["LiveTrackingPage.useCallback[checkGeofenceViolations]"], [
        geofences,
        liveAlerts
    ]);
    // Save alert to database
    const saveAlert = async (alert1, vehicleId, geofenceId)=>{
        try {
            const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
            if (!user) return;
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('alerts').insert({
                user_id: user.id,
                vehicle_id: vehicleId,
                geofence_id: geofenceId,
                message: alert1.message,
                severity: alert1.severity,
                alert_type: alert1.alert_type,
                speed_recorded: alert1.speed_recorded,
                speed_limit: alert1.speed_limit,
                acknowledged: false
            });
        } catch (error) {
            console.error('Failed to save alert:', error);
        }
    };
    // Parse WKT to GeoJSON
    const wktToGeoJson = (wkt)=>{
        try {
            const cleanWkt = wkt.replace(/^SRID=\d+;/, "");
            const polygonMatch = cleanWkt.match(/POLYGON\s*\(\((.+)\)\)/i);
            if (!polygonMatch) return null;
            const coordsStr = polygonMatch[1];
            const rings = coordsStr.split("),(").map((ring)=>ring.replace(/[()]/g, "").split(",").map((pair)=>{
                    const [lng, lat] = pair.trim().split(/\s+/).map(Number);
                    return [
                        lng,
                        lat
                    ];
                }));
            return {
                type: "Polygon",
                coordinates: rings
            };
        } catch  {
            return null;
        }
    };
    // Parse boundary to GeoJSON
    const parseBoundary = (boundary)=>{
        if (!boundary) return null;
        try {
            if (typeof boundary === "string") {
                // Check if WKT format
                if (boundary.includes("POLYGON") || boundary.includes("POINT")) {
                    return wktToGeoJson(boundary);
                }
                // Try JSON parse
                const parsed = JSON.parse(boundary);
                if (parsed.type && parsed.coordinates) {
                    return parsed;
                }
            } else if (typeof boundary === "object" && boundary !== null) {
                const b = boundary;
                if (b.type && b.coordinates) {
                    return {
                        type: b.type,
                        coordinates: b.coordinates
                    };
                }
            }
        } catch  {
            return null;
        }
        return null;
    };
    // Apply filters
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveTrackingPage.useEffect": ()=>{
            const list = vehicles.filter({
                "LiveTrackingPage.useEffect.list": (v)=>{
                    if (search.trim()) {
                        const s = search.toLowerCase();
                        const rn = String(v.registration_number || "").toLowerCase();
                        const brand = String(v.brand || "").toLowerCase();
                        const model = String(v.model || "").toLowerCase();
                        if (!rn.includes(s) && !brand.includes(s) && !model.includes(s)) return false;
                    }
                    if (statusFilter) {
                        // Handle "moving" filter to include in_motion, moving, and online statuses
                        if (statusFilter === "moving") {
                            if (v.status !== "moving" && v.status !== "in_motion" && v.status !== "online") return false;
                        } else if (statusFilter === "stopped") {
                            if (v.status !== "stopped" && v.status !== "parked") return false;
                        } else if (statusFilter === "offline") {
                            if (v.status && v.status !== "offline") return false;
                        } else if (v.status !== statusFilter) {
                            return false;
                        }
                    }
                    return true;
                }
            }["LiveTrackingPage.useEffect.list"]);
            setFilteredVehicles(list);
        }
    }["LiveTrackingPage.useEffect"], [
        vehicles,
        search,
        statusFilter
    ]);
    // --- Init map ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveTrackingPage.useEffect": ()=>{
            if (mapRef.current) return;
            if (!mapContainerRef.current) return;
            const map = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Map({
                container: mapContainerRef.current,
                style: MAP_STYLES[mapStyle],
                center: [
                    67.0011,
                    24.8607
                ],
                zoom: 11,
                pitch: 0,
                bearing: 0
            });
            mapRef.current = map;
            // Add draw control for geofence creation
            const draw = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mapbox$2f$mapbox$2d$gl$2d$draw$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                displayControlsDefault: false,
                controls: {
                    polygon: false,
                    trash: false
                }
            });
            map.addControl(draw, "top-left");
            drawRef.current = draw;
            // Handle draw events
            map.on("draw.create", {
                "LiveTrackingPage.useEffect": (e)=>{
                    const feature = e.features[0];
                    if (feature?.geometry) {
                        setDrawnGeometry(feature.geometry);
                        setShowGeofenceModal(true);
                        setIsDrawingGeofence(false);
                    }
                }
            }["LiveTrackingPage.useEffect"]);
            // Ensure map resizes properly after mount
            map.on('load', {
                "LiveTrackingPage.useEffect": ()=>{
                    map.resize();
                }
            }["LiveTrackingPage.useEffect"]);
            map.addControl(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].NavigationControl({
                showCompass: true
            }), "bottom-right");
            // Only add GeolocateControl if geolocation is supported and available
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && 'geolocation' in navigator) {
                // Check if geolocation is actually available (not just the API)
                navigator.permissions?.query({
                    name: 'geolocation'
                }).then({
                    "LiveTrackingPage.useEffect": (result)=>{
                        if (result.state !== 'denied') {
                            map.addControl(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].GeolocateControl({
                                positionOptions: {
                                    enableHighAccuracy: true
                                },
                                trackUserLocation: true
                            }), "bottom-right");
                        }
                    }
                }["LiveTrackingPage.useEffect"]).catch({
                    "LiveTrackingPage.useEffect": ()=>{
                        // Permissions API not supported, try adding anyway
                        map.addControl(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].GeolocateControl({
                            positionOptions: {
                                enableHighAccuracy: true
                            },
                            trackUserLocation: true
                        }), "bottom-right");
                    }
                }["LiveTrackingPage.useEffect"]);
            }
            // Also resize after a short delay to handle layout shifts
            const resizeTimer = setTimeout({
                "LiveTrackingPage.useEffect.resizeTimer": ()=>{
                    map.resize();
                }
            }["LiveTrackingPage.useEffect.resizeTimer"], 100);
            return ({
                "LiveTrackingPage.useEffect": ()=>{
                    clearTimeout(resizeTimer);
                    map.remove();
                    mapRef.current = null;
                }
            })["LiveTrackingPage.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["LiveTrackingPage.useEffect"], []);
    // Update map style
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveTrackingPage.useEffect": ()=>{
            if (mapRef.current) {
                mapRef.current.setStyle(MAP_STYLES[mapStyle]);
            }
        }
    }["LiveTrackingPage.useEffect"], [
        mapStyle
    ]);
    // Resize map when sidebar toggles
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveTrackingPage.useEffect": ()=>{
            if (mapRef.current) {
                setTimeout({
                    "LiveTrackingPage.useEffect": ()=>{
                        mapRef.current?.resize();
                    }
                }["LiveTrackingPage.useEffect"], 350);
            }
        }
    }["LiveTrackingPage.useEffect"], [
        isSideOpen
    ]);
    // --- Draw geofences on map ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveTrackingPage.useEffect": ()=>{
            const map = mapRef.current;
            if (!map) return;
            const drawGeofences = {
                "LiveTrackingPage.useEffect.drawGeofences": ()=>{
                    // Remove old geofence layers and sources (layers first, then sources)
                    geofenceLayersRef.current.forEach({
                        "LiveTrackingPage.useEffect.drawGeofences": (sourceId)=>{
                            const fillLayerId = `geofence-fill-${sourceId.replace('geofence-', '')}`;
                            const outlineLayerId = `geofence-outline-${sourceId.replace('geofence-', '')}`;
                            try {
                                if (map.getLayer(fillLayerId)) map.removeLayer(fillLayerId);
                                if (map.getLayer(outlineLayerId)) map.removeLayer(outlineLayerId);
                                if (map.getSource(sourceId)) map.removeSource(sourceId);
                            } catch (e) {
                                console.warn("Error removing geofence layer:", e);
                            }
                        }
                    }["LiveTrackingPage.useEffect.drawGeofences"]);
                    geofenceLayersRef.current.clear();
                    if (!showGeofences) return;
                    // Add new geofence layers
                    geofences.forEach({
                        "LiveTrackingPage.useEffect.drawGeofences": (geofence)=>{
                            const geometry = parseBoundary(geofence.boundary);
                            if (!geometry) return;
                            const sourceId = `geofence-${geofence.id}`;
                            const layerId = `geofence-fill-${geofence.id}`;
                            const outlineId = `geofence-outline-${geofence.id}`;
                            // Skip if source already exists
                            if (map.getSource(sourceId)) {
                                geofenceLayersRef.current.add(sourceId);
                                return;
                            }
                            // Determine color based on type
                            let fillColor = "#3b82f6"; // blue default
                            let outlineColor = "#2563eb";
                            if (geofence.type === "entry") {
                                fillColor = "#22c55e"; // green
                                outlineColor = "#16a34a";
                            } else if (geofence.type === "exit") {
                                fillColor = "#ef4444"; // red
                                outlineColor = "#dc2626";
                            }
                            try {
                                map.addSource(sourceId, {
                                    type: "geojson",
                                    data: {
                                        type: "Feature",
                                        properties: {
                                            name: geofence.name,
                                            type: geofence.type
                                        },
                                        geometry: geometry
                                    }
                                });
                                map.addLayer({
                                    id: layerId,
                                    type: "fill",
                                    source: sourceId,
                                    paint: {
                                        "fill-color": fillColor,
                                        "fill-opacity": 0.2
                                    }
                                });
                                map.addLayer({
                                    id: outlineId,
                                    type: "line",
                                    source: sourceId,
                                    paint: {
                                        "line-color": outlineColor,
                                        "line-width": 2,
                                        "line-dasharray": [
                                            2,
                                            2
                                        ]
                                    }
                                });
                                geofenceLayersRef.current.add(sourceId);
                                // Add popup on click
                                map.on("click", layerId, {
                                    "LiveTrackingPage.useEffect.drawGeofences": (e)=>{
                                        const coordinates = e.lngLat;
                                        const name = geofence.name;
                                        const type = geofence.type || "both";
                                        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Popup().setLngLat(coordinates).setHTML(`
                <div class="p-2">
                  <p class="font-semibold text-slate-900">${name}</p>
                  <p class="text-sm text-slate-600">Trigger: ${type}</p>
                </div>
              `).addTo(map);
                                    }
                                }["LiveTrackingPage.useEffect.drawGeofences"]);
                                map.on("mouseenter", layerId, {
                                    "LiveTrackingPage.useEffect.drawGeofences": ()=>{
                                        map.getCanvas().style.cursor = "pointer";
                                    }
                                }["LiveTrackingPage.useEffect.drawGeofences"]);
                                map.on("mouseleave", layerId, {
                                    "LiveTrackingPage.useEffect.drawGeofences": ()=>{
                                        map.getCanvas().style.cursor = "";
                                    }
                                }["LiveTrackingPage.useEffect.drawGeofences"]);
                            } catch (e) {
                                console.error("Error adding geofence layer:", e);
                            }
                        }
                    }["LiveTrackingPage.useEffect.drawGeofences"]);
                }
            }["LiveTrackingPage.useEffect.drawGeofences"];
            // Wait for map style to load before adding layers
            if (map.isStyleLoaded()) {
                drawGeofences();
            } else {
                map.on("style.load", drawGeofences);
            }
            return ({
                "LiveTrackingPage.useEffect": ()=>{
                    map.off("style.load", drawGeofences);
                }
            })["LiveTrackingPage.useEffect"];
        }
    }["LiveTrackingPage.useEffect"], [
        geofences,
        showGeofences,
        mapStyle
    ]);
    // --- Update vehicle markers ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveTrackingPage.useEffect": ()=>{
            const map = mapRef.current;
            if (!map) return;
            // Remove old markers that no longer exist
            vehicleMarkersRef.current.forEach({
                "LiveTrackingPage.useEffect": (marker, id)=>{
                    if (!vehicles.find({
                        "LiveTrackingPage.useEffect": (v)=>v.id === id
                    }["LiveTrackingPage.useEffect"])) {
                        marker.remove();
                        vehicleMarkersRef.current.delete(id);
                    }
                }
            }["LiveTrackingPage.useEffect"]);
            // Update or add markers
            vehicles.forEach({
                "LiveTrackingPage.useEffect": (v)=>{
                    if (!v.last_known_location?.lng || !v.last_known_location?.lat) return;
                    const isSelected = selectedVehicle?.id === v.id;
                    const isMoving = v.status === "moving" || v.status === "online" || v.status === "in_motion";
                    const vehicleName = v.registration_number || v.brand || 'Vehicle';
                    // Remove existing marker to recreate with updated state
                    if (vehicleMarkersRef.current.has(v.id)) {
                        vehicleMarkersRef.current.get(v.id).remove();
                        vehicleMarkersRef.current.delete(v.id);
                    }
                    // Create marker with current state
                    const el = document.createElement("div");
                    el.className = "vehicle-marker";
                    el.innerHTML = `
        <div class="relative cursor-pointer group flex flex-col items-center">
          <!-- Vehicle Label -->
          <div class="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <div class="px-2 py-0.5 bg-slate-900/90 backdrop-blur-sm rounded text-xs font-medium text-white shadow-lg border border-slate-700">
              ${vehicleName}
            </div>
          </div>
          <!-- Vehicle Icon -->
          <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isMoving ? "bg-green-500" : "bg-slate-600"} ${isSelected ? "ring-4 ring-blue-400 scale-125" : ""}">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          ${isMoving ? '<div class="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>' : ''}
        </div>
      `;
                    const marker = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker({
                        element: el
                    }).setLngLat([
                        v.last_known_location.lng,
                        v.last_known_location.lat
                    ]).addTo(map);
                    el.addEventListener("click", {
                        "LiveTrackingPage.useEffect": ()=>{
                            setSelectedVehicle(v);
                            map.flyTo({
                                center: [
                                    v.last_known_location.lng,
                                    v.last_known_location.lat
                                ],
                                zoom: 16,
                                duration: 1000
                            });
                        }
                    }["LiveTrackingPage.useEffect"]);
                    vehicleMarkersRef.current.set(v.id, marker);
                }
            }["LiveTrackingPage.useEffect"]);
        }
    }["LiveTrackingPage.useEffect"], [
        vehicles,
        selectedVehicle
    ]);
    // --- Realtime subscription ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveTrackingPage.useEffect": ()=>{
            const setupRealtimeSubscription = {
                "LiveTrackingPage.useEffect.setupRealtimeSubscription": ()=>{
                    if (realtimeChannelRef.current) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(realtimeChannelRef.current);
                    }
                    setRealtimeStatus('connecting');
                    const handleTrackingUpdate = {
                        "LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate": (payload)=>{
                            console.log('📍 Realtime tracking update received:', payload.new);
                            const record = payload.new;
                            // Handle various location formats
                            let lng;
                            let lat;
                            // First check direct latitude/longitude columns (primary format from mobile app)
                            if (record?.latitude != null && record?.longitude != null) {
                                lat = typeof record.latitude === 'number' ? record.latitude : parseFloat(String(record.latitude));
                                lng = typeof record.longitude === 'number' ? record.longitude : parseFloat(String(record.longitude));
                            } else if (record?.location) {
                                const loc = record.location;
                                // Format 1: GeoJSON Point { type: "Point", coordinates: [lng, lat] }
                                if (typeof loc === 'object' && 'coordinates' in loc && Array.isArray(loc.coordinates)) {
                                    [lng, lat] = loc.coordinates;
                                } else if (typeof loc === 'string') {
                                    const pointMatch = loc.match(/POINT\s*\(\s*([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)\s*\)/i);
                                    if (pointMatch) {
                                        lng = parseFloat(pointMatch[1]);
                                        lat = parseFloat(pointMatch[2]);
                                    }
                                } else if (typeof loc === 'object') {
                                    const locObj = loc;
                                    if (typeof locObj.lng === 'number' && typeof locObj.lat === 'number') {
                                        lng = locObj.lng;
                                        lat = locObj.lat;
                                    } else if (typeof locObj.x === 'number' && typeof locObj.y === 'number') {
                                        lng = locObj.x;
                                        lat = locObj.y;
                                    }
                                }
                            }
                            if (!lat || !lng || isNaN(lat) || isNaN(lng) || !record.vehicle_id) {
                                console.log('⚠️ Could not parse location from payload:', record);
                                return;
                            }
                            console.log(`🚗 Updating vehicle ${record.vehicle_id} to [${lat}, ${lng}]`);
                            // Parse speed to number
                            const speed = record.speed != null ? typeof record.speed === 'number' ? record.speed : parseFloat(String(record.speed)) : null;
                            // Parse heading
                            const heading = record.heading != null ? typeof record.heading === 'number' ? record.heading : parseFloat(String(record.heading)) : null;
                            const updateData = {
                                last_known_location: {
                                    lat,
                                    lng
                                },
                                latitude: lat,
                                longitude: lng,
                                last_update: record.timestamp || new Date().toISOString(),
                                status: record.ignition_status ? "moving" : "stopped",
                                speed: speed,
                                heading: heading,
                                ignition_status: record.ignition_status ?? null
                            };
                            setVehicles({
                                "LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate": (prev)=>{
                                    const existingVehicle = prev.find({
                                        "LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate.existingVehicle": (v)=>v.id === record.vehicle_id
                                    }["LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate.existingVehicle"]);
                                    if (existingVehicle) {
                                        // Update existing vehicle
                                        return prev.map({
                                            "LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate": (v)=>v.id === record.vehicle_id ? {
                                                    ...v,
                                                    ...updateData
                                                } : v
                                        }["LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate"]);
                                    } else if (record.vehicle_id) {
                                        // Add new vehicle if it doesn't exist in the list
                                        console.log(`📥 Adding new vehicle ${record.vehicle_id} to tracking list`);
                                        const newVehicle = {
                                            id: record.vehicle_id,
                                            registration_number: null,
                                            ...updateData
                                        };
                                        return [
                                            newVehicle,
                                            ...prev
                                        ];
                                    }
                                    return prev;
                                }
                            }["LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate"]);
                            // Check for geofence violations and speed alerts
                            const vehicleName = vehicles.find({
                                "LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate": (v)=>v.id === record.vehicle_id
                            }["LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate"])?.registration_number || 'Vehicle';
                            checkGeofenceViolations(record.vehicle_id, vehicleName, lat, lng, speed);
                            // Also update selected vehicle if it's the same one
                            setSelectedVehicle({
                                "LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate": (prev)=>{
                                    if (prev?.id === record.vehicle_id) {
                                        return {
                                            ...prev,
                                            ...updateData
                                        };
                                    }
                                    return prev;
                                }
                            }["LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate"]);
                        }
                    }["LiveTrackingPage.useEffect.setupRealtimeSubscription.handleTrackingUpdate"];
                    const channel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel("vehicle_tracking").on("postgres_changes", {
                        event: "INSERT",
                        schema: "public",
                        table: "tracking_data"
                    }, handleTrackingUpdate).on("postgres_changes", {
                        event: "UPDATE",
                        schema: "public",
                        table: "tracking_data"
                    }, handleTrackingUpdate).subscribe({
                        "LiveTrackingPage.useEffect.setupRealtimeSubscription.channel": (status)=>{
                            if (status === 'SUBSCRIBED') {
                                setRealtimeStatus('connected');
                                console.log('✅ Realtime connected to tracking_data');
                            } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                                setRealtimeStatus('disconnected');
                                console.log('❌ Realtime disconnected, attempting reconnect...');
                                // Auto-reconnect after 3 seconds
                                if (reconnectTimeoutRef.current) {
                                    clearTimeout(reconnectTimeoutRef.current);
                                }
                                reconnectTimeoutRef.current = setTimeout({
                                    "LiveTrackingPage.useEffect.setupRealtimeSubscription.channel": ()=>{
                                        setupRealtimeSubscription();
                                    }
                                }["LiveTrackingPage.useEffect.setupRealtimeSubscription.channel"], 3000);
                            } else if (status === 'CLOSED') {
                                setRealtimeStatus('disconnected');
                            }
                        }
                    }["LiveTrackingPage.useEffect.setupRealtimeSubscription.channel"]);
                    realtimeChannelRef.current = channel;
                }
            }["LiveTrackingPage.useEffect.setupRealtimeSubscription"];
            setupRealtimeSubscription();
            return ({
                "LiveTrackingPage.useEffect": ()=>{
                    if (reconnectTimeoutRef.current) {
                        clearTimeout(reconnectTimeoutRef.current);
                    }
                    if (realtimeChannelRef.current) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].removeChannel(realtimeChannelRef.current);
                    }
                }
            })["LiveTrackingPage.useEffect"];
        }
    }["LiveTrackingPage.useEffect"], []);
    // Load initial data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveTrackingPage.useEffect": ()=>{
            loadVehicles();
            loadGeofences();
        }
    }["LiveTrackingPage.useEffect"], [
        loadVehicles,
        loadGeofences
    ]);
    // Polling fallback - only poll when realtime is disconnected
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveTrackingPage.useEffect": ()=>{
            // Only poll if realtime is not connected
            if (realtimeStatus === 'connected') return;
            const pollInterval = setInterval({
                "LiveTrackingPage.useEffect.pollInterval": ()=>{
                    loadVehicles();
                }
            }["LiveTrackingPage.useEffect.pollInterval"], 15000); // 15 seconds when disconnected
            return ({
                "LiveTrackingPage.useEffect": ()=>clearInterval(pollInterval)
            })["LiveTrackingPage.useEffect"];
        }
    }["LiveTrackingPage.useEffect"], [
        loadVehicles,
        realtimeStatus
    ]);
    // --- Playback functions ---
    const fetchHistory = async (vehicleId, hours = 6)=>{
        const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("tracking_data").select("timestamp, location, speed").eq("vehicle_id", vehicleId).gte("timestamp", since).order("timestamp", {
            ascending: true
        }).limit(5000);
        if (error) {
            console.error("Error fetching history:", error);
            return [];
        }
        if (!data || data.length === 0) {
            console.log("No tracking data found for vehicle", vehicleId, "since", since);
            return [];
        }
        console.log(`Found ${data.length} tracking records for playback`);
        return data.map((p)=>{
            let lat;
            let lng;
            // Parse location column (PostGIS geometry or JSON)
            if (p.location) {
                const loc = p.location;
                // Format 1: Object with lat/lng
                if (typeof loc === 'object' && loc !== null) {
                    const obj = loc;
                    if (typeof obj.lat === 'number' && typeof obj.lng === 'number') {
                        lat = obj.lat;
                        lng = obj.lng;
                    } else if ('coordinates' in obj && Array.isArray(obj.coordinates)) {
                        const coords = obj.coordinates;
                        if (coords.length >= 2) {
                            [lng, lat] = coords;
                        }
                    }
                } else if (typeof loc === 'string') {
                    const cleanLoc = loc.replace(/^SRID=\d+;/, '');
                    const pointMatch = cleanLoc.match(/POINT\s*\(\s*([+-]?\d+\.?\d*)\s+([+-]?\d+\.?\d*)\s*\)/i);
                    if (pointMatch) {
                        lng = parseFloat(pointMatch[1]);
                        lat = parseFloat(pointMatch[2]);
                    }
                }
            }
            // Parse speed (could be string or number)
            const speed = p.speed != null ? typeof p.speed === 'number' ? p.speed : undefined : undefined;
            return {
                lat: lat ?? NaN,
                lng: lng ?? NaN,
                timestamp: p.timestamp,
                speed: speed
            };
        }).filter((p)=>!isNaN(p.lat) && !isNaN(p.lng)); // Filter out invalid points
    };
    const handleStartPlayback = async (vehicle, hours = 6)=>{
        const points = await fetchHistory(vehicle.id, hours);
        if (!points.length) {
            alert("No history found for this vehicle in the selected timeframe.");
            return;
        }
        // Validate first point has valid coordinates
        if (isNaN(points[0].lat) || isNaN(points[0].lng)) {
            alert("Unable to parse location data for playback.");
            return;
        }
        setPlaybackVehicle(vehicle);
        setPlaybackPoints(points);
        setPlaybackIdx(0);
        setPlaybackDuration(points.length - 1);
        setShowPlaybackPanel(true);
        setIsPlaying(true);
        drawPlaybackLine(points);
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [
                    points[0].lng,
                    points[0].lat
                ],
                zoom: 14
            });
        }
        if (playbackMarkerRef.current) {
            playbackMarkerRef.current.remove();
        }
        const el = document.createElement("div");
        el.innerHTML = `
      <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        </svg>
      </div>
    `;
        const marker = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker({
            element: el
        }).setLngLat([
            points[0].lng,
            points[0].lat
        ]).addTo(mapRef.current);
        playbackMarkerRef.current = marker;
    };
    const drawPlaybackLine = (points)=>{
        const map = mapRef.current;
        if (map.getLayer("playback-line")) map.removeLayer("playback-line");
        if (map.getSource("playback-line")) map.removeSource("playback-line");
        map.addSource("playback-line", {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: points.map((p)=>[
                            p.lng,
                            p.lat
                        ])
                }
            }
        });
        map.addLayer({
            id: "playback-line",
            type: "line",
            source: "playback-line",
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": "#3b82f6",
                "line-width": 4,
                "line-opacity": 0.8
            }
        });
    };
    // Animation loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveTrackingPage.useEffect": ()=>{
            if (!isPlaying || playbackPoints.length === 0) {
                if (playbackAnimationRef.current) {
                    cancelAnimationFrame(playbackAnimationRef.current);
                    playbackAnimationRef.current = null;
                }
                return;
            }
            let currentIdx = playbackIdx;
            const fps = 10 * playbackSpeed;
            const stepMs = 1000 / fps;
            const loop = {
                "LiveTrackingPage.useEffect.loop": ()=>{
                    if (currentIdx >= playbackPoints.length) {
                        setIsPlaying(false);
                        return;
                    }
                    const p = playbackPoints[currentIdx];
                    if (playbackMarkerRef.current) {
                        playbackMarkerRef.current.setLngLat([
                            p.lng,
                            p.lat
                        ]);
                    }
                    setPlaybackIdx(currentIdx);
                    currentIdx++;
                    playbackAnimationRef.current = requestAnimationFrame({
                        "LiveTrackingPage.useEffect.loop": ()=>{
                            setTimeout(loop, stepMs);
                        }
                    }["LiveTrackingPage.useEffect.loop"]);
                }
            }["LiveTrackingPage.useEffect.loop"];
            loop();
            return ({
                "LiveTrackingPage.useEffect": ()=>{
                    if (playbackAnimationRef.current) {
                        cancelAnimationFrame(playbackAnimationRef.current);
                    }
                }
            })["LiveTrackingPage.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["LiveTrackingPage.useEffect"], [
        isPlaying,
        playbackSpeed
    ]);
    const closePlayback = ()=>{
        setShowPlaybackPanel(false);
        setIsPlaying(false);
        setPlaybackPoints([]);
        setPlaybackVehicle(null);
        if (playbackMarkerRef.current) {
            playbackMarkerRef.current.remove();
            playbackMarkerRef.current = null;
        }
        const map = mapRef.current;
        if (map) {
            if (map.getLayer("playback-line")) map.removeLayer("playback-line");
            if (map.getSource("playback-line")) map.removeSource("playback-line");
        }
    };
    const getStatusIcon = (status)=>{
        switch(status){
            case "moving":
            case "online":
            case "in_motion":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                    className: "w-4 h-4 text-green-400"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1275,
                    columnNumber: 16
                }, this);
            case "stopped":
            case "parked":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                    className: "w-4 h-4 text-amber-400"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1278,
                    columnNumber: 16
                }, this);
            case "alert":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                    className: "w-4 h-4 text-red-400"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1280,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Signal$3e$__["Signal"], {
                    className: "w-4 h-4 text-slate-400"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1282,
                    columnNumber: 16
                }, this);
        }
    };
    const getStatusColor = (status)=>{
        switch(status){
            case "moving":
            case "online":
            case "in_motion":
                return "text-green-400 bg-green-500/10";
            case "stopped":
            case "parked":
                return "text-amber-400 bg-amber-500/10";
            case "alert":
                return "text-red-400 bg-red-500/10";
            default:
                return "text-slate-400 bg-slate-500/10";
        }
    };
    const formatTime = (t)=>{
        if (!t) return "N/A";
        const date = new Date(t);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
        return date.toLocaleDateString();
    };
    // Convert heading degrees to compass direction
    const getCompassDirection = (heading)=>{
        const directions = [
            'N',
            'NE',
            'E',
            'SE',
            'S',
            'SW',
            'W',
            'NW'
        ];
        const index = Math.round(heading / 45) % 8;
        return directions[index];
    };
    // --- Geofence creation functions ---
    const toggleDrawingMode = ()=>{
        if (!drawRef.current) return;
        if (isDrawingGeofence) {
            // Cancel drawing
            drawRef.current.deleteAll();
            drawRef.current.changeMode("simple_select");
            setIsDrawingGeofence(false);
        } else {
            // Start drawing
            drawRef.current.changeMode("draw_polygon");
            setIsDrawingGeofence(true);
        }
    };
    // Convert GeoJSON geometry to WKT format for PostGIS
    const geoJsonToWkt = (geometry)=>{
        if (geometry.type === "Polygon") {
            const coords = geometry.coordinates;
            const rings = coords.map((ring)=>{
                const points = ring.map((coord)=>`${coord[0]} ${coord[1]}`).join(", ");
                return `(${points})`;
            });
            return `SRID=4326;POLYGON(${rings.join(", ")})`;
        }
        return "";
    };
    const handleSaveGeofence = async ()=>{
        if (!drawnGeometry) {
            alert("Please draw a geofence area on the map");
            return;
        }
        if (!geofenceForm.name.trim()) {
            alert("Please enter a name for the geofence");
            return;
        }
        try {
            const wktBoundary = geoJsonToWkt(drawnGeometry);
            if (!wktBoundary) {
                alert("Invalid geometry. Please draw a polygon.");
                return;
            }
            const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
            if (!user) {
                alert("You must be logged in to create a geofence");
                return;
            }
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("geofences").insert([
                {
                    name: geofenceForm.name,
                    description: geofenceForm.description || null,
                    vehicle_id: geofenceForm.vehicle_id || null,
                    type: geofenceForm.type || "both",
                    boundary: wktBoundary,
                    user_id: user.id,
                    active: true
                }
            ]);
            if (error) {
                console.error("Geofence save error:", error);
                alert(`Failed to save geofence: ${error.message}`);
                return;
            }
            // Clear everything
            if (drawRef.current) {
                drawRef.current.deleteAll();
            }
            setShowGeofenceModal(false);
            setDrawnGeometry(null);
            setGeofenceForm({
                name: "",
                description: "",
                vehicle_id: "",
                type: "both"
            });
            // Reload geofences
            loadGeofences();
            alert("Geofence created successfully!");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to save geofence";
            console.error("Error saving geofence:", err);
            alert(`Error: ${errorMessage}`);
        }
    };
    const cancelGeofenceCreation = ()=>{
        if (drawRef.current) {
            drawRef.current.deleteAll();
        }
        setShowGeofenceModal(false);
        setDrawnGeometry(null);
        setIsDrawingGeofence(false);
        setGeofenceForm({
            name: "",
            description: "",
            vehicle_id: "",
            type: "both"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: 'calc(100vh)',
            minHeight: '100vh'
        },
        className: "jsx-964634e7fa37e70b" + " " + "relative w-full overflow-hidden bg-slate-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapContainerRef,
                style: {
                    width: '100%',
                    height: '100%'
                },
                className: "jsx-964634e7fa37e70b" + " " + "absolute inset-0 z-0"
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 1422,
                columnNumber: 7
            }, this),
            showAlertBanner && liveAlerts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-964634e7fa37e70b" + " " + "absolute top-0 left-0 right-0 z-30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-964634e7fa37e70b" + " " + "bg-red-500/90 backdrop-blur-sm border-b border-red-600 px-4 py-2 animate-pulse",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-964634e7fa37e70b" + " " + "flex items-center justify-between max-w-screen-xl mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "w-5 h-5 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1430,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-964634e7fa37e70b" + " " + "text-white font-medium",
                                        children: liveAlerts[0].message
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1431,
                                        columnNumber: 17
                                    }, this),
                                    liveAlerts.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-964634e7fa37e70b" + " " + "bg-white/20 px-2 py-0.5 rounded text-xs text-white",
                                        children: [
                                            "+",
                                            liveAlerts.length - 1,
                                            " more"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1433,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                lineNumber: 1429,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const alertsPanel = document.getElementById('alerts-panel');
                                            if (alertsPanel) alertsPanel.classList.toggle('hidden');
                                        },
                                        className: "jsx-964634e7fa37e70b" + " " + "px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-white text-sm transition-colors",
                                        children: "View All"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1439,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAlertBanner(false),
                                        className: "jsx-964634e7fa37e70b" + " " + "p-1 hover:bg-white/20 rounded transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-4 h-4 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1452,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1448,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                lineNumber: 1438,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                        lineNumber: 1428,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1427,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 1426,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "alerts-panel",
                className: "jsx-964634e7fa37e70b" + " " + "hidden absolute top-16 right-4 z-30 w-96 max-h-96 overflow-y-auto bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-964634e7fa37e70b" + " " + "p-4 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "w-5 h-5 text-red-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1467,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-964634e7fa37e70b" + " " + "text-white font-semibold",
                                        children: "Live Alerts"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1468,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-964634e7fa37e70b" + " " + "bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs",
                                        children: liveAlerts.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1469,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                lineNumber: 1466,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setLiveAlerts([]),
                                className: "jsx-964634e7fa37e70b" + " " + "text-slate-400 hover:text-white text-sm",
                                children: "Clear All"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                lineNumber: 1471,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                        lineNumber: 1465,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-964634e7fa37e70b" + " " + "p-2 space-y-2",
                        children: liveAlerts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-964634e7fa37e70b" + " " + "text-slate-400 text-center py-4",
                            children: "No alerts"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1480,
                            columnNumber: 13
                        }, this) : liveAlerts.map((alert1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-964634e7fa37e70b" + " " + `p-3 rounded-lg border ${alert1.severity === 'high' || alert1.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/10 border-amber-500/30'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            className: `w-4 h-4 mt-0.5 ${alert1.severity === 'high' || alert1.severity === 'critical' ? 'text-red-400' : 'text-amber-400'}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1492,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-white text-sm",
                                                    children: alert1.message
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1496,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-slate-400 text-xs mt-1",
                                                    children: new Date(alert1.created_at).toLocaleTimeString()
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1497,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1495,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1491,
                                    columnNumber: 17
                                }, this)
                            }, alert1.id, false, {
                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                lineNumber: 1483,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                        lineNumber: 1478,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 1461,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-964634e7fa37e70b" + " " + "absolute top-4 left-1/2 -translate-x-1/2 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2 bg-slate-900/90 backdrop-blur-sm rounded-xl p-2 shadow-xl border border-slate-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2 px-4 py-2 border-r border-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                                    className: "w-5 h-5 text-blue-400"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1512,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                            children: "Total"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1514,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-lg font-bold text-white",
                                            children: stats.total
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1515,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1513,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1511,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2 px-4 py-2 border-r border-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                    className: "w-5 h-5 text-green-400"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1519,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                            children: "Moving"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1521,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-lg font-bold text-green-400",
                                            children: stats.moving
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1522,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1520,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1518,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2 px-4 py-2 border-r border-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                    className: "w-5 h-5 text-amber-400"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1526,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                            children: "Stopped"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1528,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-lg font-bold text-amber-400",
                                            children: stats.stopped
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1529,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1527,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1525,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2 px-4 py-2 border-r border-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$signal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Signal$3e$__["Signal"], {
                                    className: "w-5 h-5 text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1533,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                            children: "Offline"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1535,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-lg font-bold text-slate-400",
                                            children: stats.offline
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1536,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1534,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1532,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2 px-4 py-2",
                            children: realtimeStatus === 'connected' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-964634e7fa37e70b" + " " + "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-964634e7fa37e70b" + " " + "w-3 h-3 bg-green-500 rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                lineNumber: 1545,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-964634e7fa37e70b" + " " + "absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                lineNumber: 1546,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1544,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-964634e7fa37e70b",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-xs text-green-400 font-medium",
                                            children: "LIVE"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1549,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1548,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : realtimeStatus === 'connecting' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-964634e7fa37e70b" + " " + "w-3 h-3 bg-amber-500 rounded-full animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1554,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-964634e7fa37e70b",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-xs text-amber-400 font-medium",
                                            children: "Connecting..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1556,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1555,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-964634e7fa37e70b" + " " + "w-3 h-3 bg-red-500 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1561,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-964634e7fa37e70b",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-xs text-red-400 font-medium",
                                            children: "Disconnected"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1563,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1562,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1541,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1510,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 1509,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-964634e7fa37e70b" + " " + `absolute top-0 left-0 h-full z-20 transition-all duration-300 ${isSideOpen ? "w-96" : "w-0"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-964634e7fa37e70b" + " " + "h-full bg-slate-900/95 backdrop-blur-sm border-r border-slate-700 flex flex-col overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "p-4 border-b border-slate-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "w-5 h-5 text-blue-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                        lineNumber: 1583,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1582,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-964634e7fa37e70b",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "jsx-964634e7fa37e70b" + " " + "text-lg font-bold text-white",
                                                            children: "Live Tracking"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                            lineNumber: 1586,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                                            children: [
                                                                filteredVehicles.length,
                                                                " vehicles"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                            lineNumber: 1587,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1585,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1581,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>loadVehicles(),
                                            title: "Refresh",
                                            className: "jsx-964634e7fa37e70b" + " " + "p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                                className: `w-4 h-4 text-slate-400 ${isLoading ? "animate-spin" : ""}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                lineNumber: 1595,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1590,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1580,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "relative mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1601,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: search,
                                            onChange: (e)=>setSearch(e.target.value),
                                            placeholder: "Search vehicles...",
                                            className: "jsx-964634e7fa37e70b" + " " + "w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1602,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1600,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "flex gap-2",
                                    children: [
                                        {
                                            value: "",
                                            label: "All"
                                        },
                                        {
                                            value: "moving",
                                            label: "Moving"
                                        },
                                        {
                                            value: "stopped",
                                            label: "Stopped"
                                        },
                                        {
                                            value: "offline",
                                            label: "Offline"
                                        }
                                    ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setStatusFilter(f.value),
                                            className: "jsx-964634e7fa37e70b" + " " + `flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${statusFilter === f.value ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`,
                                            children: f.label
                                        }, f.value, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1618,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1611,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1579,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex-1 overflow-y-auto p-4 space-y-2",
                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-964634e7fa37e70b" + " " + "flex items-center justify-center h-40",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1637,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                lineNumber: 1636,
                                columnNumber: 15
                            }, this) : filteredVehicles.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-964634e7fa37e70b" + " " + "text-center py-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                                        className: "w-12 h-12 text-slate-600 mx-auto mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1641,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-964634e7fa37e70b" + " " + "text-slate-400",
                                        children: "No vehicles found"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1642,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                lineNumber: 1640,
                                columnNumber: 15
                            }, this) : filteredVehicles.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>{
                                        setSelectedVehicle(v);
                                        if (v.last_known_location?.lng && v.last_known_location?.lat) {
                                            mapRef.current?.flyTo({
                                                center: [
                                                    v.last_known_location.lng,
                                                    v.last_known_location.lat
                                                ],
                                                zoom: 16,
                                                duration: 1000
                                            });
                                        }
                                    },
                                    className: "jsx-964634e7fa37e70b" + " " + `p-4 rounded-xl cursor-pointer transition-all duration-200 ${selectedVehicle?.id === v.id ? "bg-blue-500/20 border border-blue-500/50" : "bg-slate-800/50 border border-slate-700 hover:bg-slate-800 hover:border-slate-600"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "flex items-start justify-between mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-964634e7fa37e70b" + " " + `w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(v.status)}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                                                                className: "w-5 h-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                                lineNumber: 1667,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                            lineNumber: 1666,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-964634e7fa37e70b",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "jsx-964634e7fa37e70b" + " " + "text-white font-semibold",
                                                                    children: v.registration_number || v.id.slice(0, 8)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                                    lineNumber: 1670,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "jsx-964634e7fa37e70b" + " " + "text-slate-400 text-xs",
                                                                    children: [
                                                                        v.brand,
                                                                        " ",
                                                                        v.model
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                                    lineNumber: 1673,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                            lineNumber: 1669,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1665,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-964634e7fa37e70b" + " " + `flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(v.status)}`,
                                                    children: [
                                                        getStatusIcon(v.status),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-964634e7fa37e70b" + " " + "capitalize",
                                                            children: v.status || "offline"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                            lineNumber: 1680,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1678,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1664,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "grid grid-cols-2 gap-3 mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            className: "w-3.5 h-3.5 text-slate-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                            lineNumber: 1686,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-964634e7fa37e70b" + " " + "text-slate-400 text-xs",
                                                            children: formatTime(v.last_update)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                            lineNumber: 1687,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1685,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
                                                            className: "w-3.5 h-3.5 text-slate-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                            lineNumber: 1690,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-964634e7fa37e70b" + " " + "text-slate-400 text-xs",
                                                            children: [
                                                                v.speed || 0,
                                                                " km/h"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                            lineNumber: 1691,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1689,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1684,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        if (v.last_known_location?.lng && v.last_known_location?.lat) {
                                                            mapRef.current?.flyTo({
                                                                center: [
                                                                    v.last_known_location.lng,
                                                                    v.last_known_location.lat
                                                                ],
                                                                zoom: 17,
                                                                duration: 1000
                                                            });
                                                        }
                                                    },
                                                    className: "jsx-964634e7fa37e70b" + " " + "flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-slate-300 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__["Crosshair"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                            lineNumber: 1709,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Focus"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1696,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        handleStartPlayback(v, 6);
                                                    },
                                                    className: "jsx-964634e7fa37e70b" + " " + "flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-xs text-blue-400 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                            lineNumber: 1719,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Playback"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1712,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1695,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, v.id, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1646,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1634,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1577,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 1572,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsSideOpen(!isSideOpen),
                className: "jsx-964634e7fa37e70b" + " " + `absolute top-1/2 -translate-y-1/2 z-30 p-2 bg-slate-800 border border-slate-700 rounded-r-lg shadow-lg hover:bg-slate-700 transition-all duration-300 ${isSideOpen ? "left-96" : "left-0"}`,
                children: isSideOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                    className: "w-4 h-4 text-slate-400"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1738,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                    className: "w-4 h-4 text-slate-400"
                }, void 0, false, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1740,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 1731,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-964634e7fa37e70b" + " " + "absolute top-20 right-4 z-10 flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowGeofences(!showGeofences),
                        title: showGeofences ? "Hide Geofences" : "Show Geofences",
                        className: "jsx-964634e7fa37e70b" + " " + `p-3 border rounded-lg shadow-lg transition-colors ${showGeofences ? "bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30" : "bg-slate-800 border-slate-700 hover:bg-slate-700"}`,
                        children: showGeofences ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                            className: "w-5 h-5 text-blue-400"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1757,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                            className: "w-5 h-5 text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1759,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                        lineNumber: 1747,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleDrawingMode,
                        title: isDrawingGeofence ? "Cancel Drawing" : "Create Geofence",
                        className: "jsx-964634e7fa37e70b" + " " + `p-3 border rounded-lg shadow-lg transition-colors ${isDrawingGeofence ? "bg-green-500/20 border-green-500 text-green-400" : "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-400"}`,
                        children: isDrawingGeofence ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1774,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1776,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                        lineNumber: 1764,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-964634e7fa37e70b" + " " + "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowStylePicker(!showStylePicker),
                                title: "Map Style",
                                className: "jsx-964634e7fa37e70b" + " " + "p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-lg hover:bg-slate-700 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                                    className: "w-5 h-5 text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1787,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                lineNumber: 1782,
                                columnNumber: 11
                            }, this),
                            showStylePicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-964634e7fa37e70b" + " " + "absolute top-full right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden",
                                children: Object.keys(MAP_STYLES).map((style)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setMapStyle(style);
                                            setShowStylePicker(false);
                                        },
                                        className: "jsx-964634e7fa37e70b" + " " + `block w-full px-4 py-2 text-left text-sm capitalize hover:bg-slate-700 transition-colors ${mapStyle === style ? "bg-blue-500/10 text-blue-400" : "text-slate-300"}`,
                                        children: style
                                    }, style, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1792,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                lineNumber: 1790,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                        lineNumber: 1781,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 1745,
                columnNumber: 7
            }, this),
            isDrawingGeofence && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-964634e7fa37e70b" + " " + "absolute top-20 left-1/2 -translate-x-1/2 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-964634e7fa37e70b" + " " + "bg-green-500/20 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-green-500 flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                            className: "w-5 h-5 text-green-400"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1816,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-964634e7fa37e70b" + " " + "text-green-400 text-sm font-medium",
                            children: "Drawing Mode: Click on the map to draw a geofence polygon"
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1817,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleDrawingMode,
                            className: "jsx-964634e7fa37e70b" + " " + "text-green-400 hover:text-green-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                lineNumber: 1824,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1820,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1815,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 1814,
                columnNumber: 9
            }, this),
            showGeofences && geofences.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-964634e7fa37e70b" + " " + "absolute top-20 left-1/2 -translate-x-1/2 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-964634e7fa37e70b" + " " + "bg-slate-900/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-slate-700 flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "w-3 h-3 bg-blue-500/30 border border-blue-500 rounded"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1835,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                    children: "Both"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1836,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1834,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "w-3 h-3 bg-green-500/30 border border-green-500 rounded"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1839,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                    children: "Entry"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1840,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1838,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "w-3 h-3 bg-red-500/30 border border-red-500 rounded"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1843,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                    children: "Exit"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1844,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1842,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-500 ml-2",
                            children: [
                                "(",
                                geofences.length,
                                " geofences)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1846,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1833,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 1832,
                columnNumber: 9
            }, this),
            showPlaybackPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-964634e7fa37e70b" + " " + "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-964634e7fa37e70b" + " " + "bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl p-4 shadow-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center justify-between mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                                className: "w-5 h-5 text-red-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                lineNumber: 1858,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1857,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-white font-semibold",
                                                    children: [
                                                        playbackVehicle?.registration_number || "Vehicle",
                                                        " - Route Playback"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1861,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-slate-400 text-xs",
                                                    children: playbackPoints[playbackIdx]?.timestamp ? new Date(playbackPoints[playbackIdx].timestamp).toLocaleString() : ""
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1864,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1860,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1856,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: closePlayback,
                                    className: "jsx-964634e7fa37e70b" + " " + "p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4 text-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1875,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1871,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1855,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: 0,
                                    max: Math.max(0, playbackDuration),
                                    value: playbackIdx,
                                    onChange: (e)=>{
                                        const val = Number(e.target.value);
                                        setPlaybackIdx(val);
                                        if (playbackMarkerRef.current && playbackPoints[val]) {
                                            playbackMarkerRef.current.setLngLat([
                                                playbackPoints[val].lng,
                                                playbackPoints[val].lat
                                            ]);
                                        }
                                    },
                                    className: "jsx-964634e7fa37e70b" + " " + "w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1881,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "flex justify-between mt-1 text-xs text-slate-500",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-964634e7fa37e70b",
                                            children: [
                                                playbackIdx + 1,
                                                " / ",
                                                playbackDuration + 1,
                                                " points"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1899,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-964634e7fa37e70b",
                                            children: [
                                                playbackPoints[playbackIdx]?.speed || 0,
                                                " km/h"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1900,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1898,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1880,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        const newIdx = Math.max(0, playbackIdx - 10);
                                        setPlaybackIdx(newIdx);
                                        if (playbackMarkerRef.current && playbackPoints[newIdx]) {
                                            playbackMarkerRef.current.setLngLat([
                                                playbackPoints[newIdx].lng,
                                                playbackPoints[newIdx].lat
                                            ]);
                                        }
                                    },
                                    className: "jsx-964634e7fa37e70b" + " " + "p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skip$2d$back$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SkipBack$3e$__["SkipBack"], {
                                        className: "w-5 h-5 text-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1919,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1906,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsPlaying(!isPlaying),
                                    className: "jsx-964634e7fa37e70b" + " " + "p-4 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors",
                                    children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                        className: "w-6 h-6 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1927,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        className: "w-6 h-6 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1929,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1922,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        const newIdx = Math.min(playbackDuration, playbackIdx + 10);
                                        setPlaybackIdx(newIdx);
                                        if (playbackMarkerRef.current && playbackPoints[newIdx]) {
                                            playbackMarkerRef.current.setLngLat([
                                                playbackPoints[newIdx].lng,
                                                playbackPoints[newIdx].lat
                                            ]);
                                        }
                                    },
                                    className: "jsx-964634e7fa37e70b" + " " + "p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skip$2d$forward$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SkipForward$3e$__["SkipForward"], {
                                        className: "w-5 h-5 text-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 1946,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1933,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2 ml-4 px-3 py-1 bg-slate-800 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                            children: "Speed:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1951,
                                            columnNumber: 17
                                        }, this),
                                        [
                                            0.5,
                                            1,
                                            2,
                                            4
                                        ].map((speed)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setPlaybackSpeed(speed),
                                                className: "jsx-964634e7fa37e70b" + " " + `px-2 py-1 text-xs rounded ${playbackSpeed === speed ? "bg-blue-500 text-white" : "text-slate-400 hover:text-white"}`,
                                                children: [
                                                    speed,
                                                    "x"
                                                ]
                                            }, speed, true, {
                                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                lineNumber: 1953,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1950,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1905,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1854,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 1853,
                columnNumber: 9
            }, this),
            selectedVehicle && !showPlaybackPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-964634e7fa37e70b" + " " + "absolute bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-4xl w-full px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-964634e7fa37e70b" + " " + "bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-xl shadow-xl overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "bg-gradient-to-r from-green-500/20 to-blue-500/20 px-4 py-2 border-b border-slate-700 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "w-2 h-2 bg-green-500 rounded-full animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1978,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-green-400 text-xs font-medium",
                                            children: "LIVE TRACKING"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1979,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-slate-500 text-xs",
                                            children: "|"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1980,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                            className: "w-3 h-3 text-blue-400"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1981,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-slate-400 text-xs",
                                            children: "Real-time updates"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1982,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1977,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-964634e7fa37e70b" + " " + "text-slate-500 text-xs",
                                    children: [
                                        "Last update: ",
                                        formatTime(selectedVehicle.last_update)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1984,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1976,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "p-4 flex items-center gap-4 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + `w-14 h-14 rounded-xl flex items-center justify-center ${getStatusColor(selectedVehicle.status)}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                                                className: "w-7 h-7"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                lineNumber: 1993,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1992,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-white font-bold text-lg",
                                                    children: selectedVehicle.registration_number || selectedVehicle.id.slice(0, 8)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1996,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-slate-400 text-sm",
                                                    children: [
                                                        selectedVehicle.brand,
                                                        " ",
                                                        selectedVehicle.model
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 1999,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 1995,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 1991,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "h-12 w-px bg-slate-700"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2006,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "text-center min-w-[70px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center justify-center gap-1 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                    className: "w-3 h-3 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2011,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                                    children: "Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2012,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2010,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + `font-bold capitalize text-sm ${selectedVehicle.status === 'moving' || selectedVehicle.status === 'online' || selectedVehicle.status === 'in_motion' ? 'text-green-400' : selectedVehicle.status === 'stopped' || selectedVehicle.status === 'parked' ? 'text-amber-400' : 'text-slate-400'}`,
                                            children: selectedVehicle.status || "Offline"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2014,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2009,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "text-center min-w-[70px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center justify-center gap-1 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"], {
                                                    className: "w-3 h-3 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2028,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                                    children: "Speed"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2029,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2027,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-white font-bold text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-964634e7fa37e70b" + " " + ((selectedVehicle.speed && selectedVehicle.speed > 80 ? 'text-red-400' : 'text-white') || ""),
                                                    children: selectedVehicle.speed?.toFixed(1) || '0'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2032,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-slate-500 text-xs ml-1",
                                                    children: "km/h"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2035,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2031,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2026,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "text-center min-w-[70px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center justify-center gap-1 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"], {
                                                    className: "w-3 h-3 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2042,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                                    children: "Heading"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2043,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2041,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-white font-bold text-sm",
                                            children: [
                                                selectedVehicle.heading ? `${selectedVehicle.heading.toFixed(0)}°` : '—',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-slate-500 text-xs ml-1",
                                                    children: selectedVehicle.heading ? getCompassDirection(selectedVehicle.heading) : ''
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2047,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2045,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2040,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "text-center min-w-[120px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center justify-center gap-1 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    className: "w-3 h-3 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2056,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                                    children: "Coordinates"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2057,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2055,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-white font-mono text-xs",
                                            children: [
                                                selectedVehicle.latitude?.toFixed(6) || selectedVehicle.last_known_location?.lat?.toFixed(6) || '—',
                                                ",",
                                                selectedVehicle.longitude?.toFixed(6) || selectedVehicle.last_known_location?.lng?.toFixed(6) || '—'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2059,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2054,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "text-center min-w-[70px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center justify-center gap-1 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                    className: "w-3 h-3 text-slate-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2068,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-964634e7fa37e70b" + " " + "text-xs text-slate-400",
                                                    children: "Ignition"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2069,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2067,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-964634e7fa37e70b" + " " + `font-bold text-sm ${selectedVehicle.ignition_status ? 'text-green-400' : 'text-slate-500'}`,
                                            children: selectedVehicle.ignition_status ? 'ON' : 'OFF'
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2071,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2066,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "flex-1"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2077,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleStartPlayback(selectedVehicle, 6),
                                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm font-medium transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2085,
                                                    columnNumber: 19
                                                }, this),
                                                "History"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2081,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                if (mapRef.current && selectedVehicle.last_known_location) {
                                                    mapRef.current.flyTo({
                                                        center: [
                                                            selectedVehicle.last_known_location.lng,
                                                            selectedVehicle.last_known_location.lat
                                                        ],
                                                        zoom: 16,
                                                        essential: true
                                                    });
                                                }
                                            },
                                            title: "Center on vehicle",
                                            className: "jsx-964634e7fa37e70b" + " " + "p-2.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crosshair$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crosshair$3e$__["Crosshair"], {
                                                className: "w-4 h-4 text-slate-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                lineNumber: 2104,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2088,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedVehicle(null),
                                            className: "jsx-964634e7fa37e70b" + " " + "p-2.5 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-4 h-4 text-slate-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                lineNumber: 2110,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2106,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2080,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 1989,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 1974,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 1973,
                columnNumber: 9
            }, this),
            showGeofenceModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-964634e7fa37e70b" + " " + "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-964634e7fa37e70b" + " " + "bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex items-center justify-between mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b" + " " + "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-964634e7fa37e70b" + " " + "w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                className: "w-5 h-5 text-green-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                lineNumber: 2125,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2124,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-964634e7fa37e70b" + " " + "text-xl font-semibold text-white",
                                            children: "Create Geofence"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2127,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2123,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: cancelGeofenceCreation,
                                    className: "jsx-964634e7fa37e70b" + " " + "p-2 hover:bg-slate-700 rounded-lg transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5 text-slate-400"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                        lineNumber: 2133,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2129,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 2122,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-964634e7fa37e70b" + " " + "block text-sm font-medium text-slate-300 mb-2",
                                            children: "Geofence Name *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2139,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: geofenceForm.name,
                                            onChange: (e)=>setGeofenceForm({
                                                    ...geofenceForm,
                                                    name: e.target.value
                                                }),
                                            placeholder: "e.g., Warehouse Zone, Parking Area",
                                            className: "jsx-964634e7fa37e70b" + " " + "w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2142,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2138,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-964634e7fa37e70b" + " " + "block text-sm font-medium text-slate-300 mb-2",
                                            children: "Description"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2152,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: geofenceForm.description,
                                            onChange: (e)=>setGeofenceForm({
                                                    ...geofenceForm,
                                                    description: e.target.value
                                                }),
                                            placeholder: "Optional description...",
                                            rows: 2,
                                            className: "jsx-964634e7fa37e70b" + " " + "w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 resize-none"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2155,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2151,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-964634e7fa37e70b" + " " + "block text-sm font-medium text-slate-300 mb-2",
                                            children: "Alert Type"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2165,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: geofenceForm.type,
                                            onChange: (e)=>setGeofenceForm({
                                                    ...geofenceForm,
                                                    type: e.target.value
                                                }),
                                            className: "jsx-964634e7fa37e70b" + " " + "w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "both",
                                                    className: "jsx-964634e7fa37e70b",
                                                    children: "Both (Entry & Exit)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2173,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "entry",
                                                    className: "jsx-964634e7fa37e70b",
                                                    children: "Entry Only"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2174,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "exit",
                                                    className: "jsx-964634e7fa37e70b",
                                                    children: "Exit Only"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2175,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2168,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2164,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-964634e7fa37e70b",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "jsx-964634e7fa37e70b" + " " + "block text-sm font-medium text-slate-300 mb-2",
                                            children: "Assign to Vehicle (Optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2180,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: geofenceForm.vehicle_id,
                                            onChange: (e)=>setGeofenceForm({
                                                    ...geofenceForm,
                                                    vehicle_id: e.target.value
                                                }),
                                            className: "jsx-964634e7fa37e70b" + " " + "w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    className: "jsx-964634e7fa37e70b",
                                                    children: "All Vehicles"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                    lineNumber: 2188,
                                                    columnNumber: 19
                                                }, this),
                                                vehicles.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: v.id,
                                                        className: "jsx-964634e7fa37e70b",
                                                        children: [
                                                            v.registration_number,
                                                            " ",
                                                            v.vehicle_type ? `- ${v.vehicle_type}` : ""
                                                        ]
                                                    }, v.id, true, {
                                                        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                                        lineNumber: 2190,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2183,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2179,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 2137,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-964634e7fa37e70b" + " " + "flex gap-3 mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: cancelGeofenceCreation,
                                    className: "jsx-964634e7fa37e70b" + " " + "flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2199,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSaveGeofence,
                                    className: "jsx-964634e7fa37e70b" + " " + "flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                            lineNumber: 2209,
                                            columnNumber: 17
                                        }, this),
                                        "Save Geofence"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                                    lineNumber: 2205,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                            lineNumber: 2198,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                    lineNumber: 2121,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
                lineNumber: 2120,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "964634e7fa37e70b",
                children: ".vehicle-marker{z-index:1}.vehicle-marker:hover{z-index:10}.mapboxgl-popup-content{color:#fff!important;background:#0f172a!important;border:1px solid #334155!important;border-radius:12px!important;padding:16px!important}.mapboxgl-popup-tip{border-top-color:#0f172a!important}.mapboxgl-ctrl-group{background:#1e293b!important;border:1px solid #334155!important}.mapboxgl-ctrl-group button{background:0 0!important}.mapboxgl-ctrl-group button:hover{background:#334155!important}.mapboxgl-ctrl-icon{filter:invert()!important}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(dashboard)/live-tracking/page.tsx",
        lineNumber: 1420,
        columnNumber: 5
    }, this);
}
_s(LiveTrackingPage, "cSLAFm50ynqvq8etPztYunwh0ZI=");
_c = LiveTrackingPage;
var _c;
__turbopack_context__.k.register(_c, "LiveTrackingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28dashboard%29_live-tracking_page_tsx_d308e457._.js.map