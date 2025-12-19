/**
 * iPhone Strict Identifier - 51-Device Fingerprint Matrix
 * Each device is isolated by H, DPR, RAM, and GPU.
 */

const StrictIPhoneDetector = (() => {
    const identify = () => {
        // Core System Variables
        const h = Math.max(window.screen.width, window.screen.height);
        const dpr = window.devicePixelRatio;
        const ram = navigator.deviceMemory || 0;

        // GPU Unmasking
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        const dbg = gl ? gl.getExtension("WEBGL_debug_renderer_info") : null;
        const gpu = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "";

        // --- 1. THE 956pt CLASS (Pro Max 6.9") ---
        if (h === 956 && dpr === 3 && gpu.includes("A19")) return "A3257"; // 17 Pro Max
        if (h === 956 && dpr === 3 && gpu.includes("A18")) return "A3296"; // 16 Pro Max

        // --- 2. THE 932pt CLASS (Pro Max 6.7" / Plus) ---
        if (h === 932 && dpr === 3 && gpu.includes("A18")) return "A3290"; // 16 Plus
        if (h === 932 && dpr === 3 && gpu.includes("A17")) return "A2849"; // 15 Pro Max
        if (h === 932 && dpr === 3 && gpu.includes("A16")) return "A2651"; // 14 Pro Max

        // --- 3. THE 926pt CLASS (Pro Max 6.7") ---
        if (h === 926 && dpr === 3 && gpu.includes("A16")) return "A2847"; // 15 Plus
        if (h === 926 && dpr === 3 && gpu.includes("A15")) return "A2632"; // 14 Plus
        if (h === 926 && dpr === 3 && ram > 4) return "A2484";            // 13 Pro Max
        if (h === 926 && dpr === 3 && ram <= 4) return "A2342";           // 12 Pro Max

        // --- 4. THE 912pt CLASS (6.6" Slim) ---
        if (h === 912 && gpu.includes("A19")) return "A3114";             // 17 Air

        // --- 5. THE 896pt CLASS (6.1" LCD / 6.5" OLED) ---
        if (h === 896 && dpr === 3 && gpu.includes("A13")) return "A2218"; // 11 Pro Max
        if (h === 896 && dpr === 3 && gpu.includes("A12")) return "A1921"; // XS Max
        if (h === 896 && dpr === 2 && gpu.includes("A13")) return "A2111"; // 11
        if (h === 896 && dpr === 2 && gpu.includes("A12")) return "A1984"; // XR

        // --- 6. THE 874pt CLASS (Pro 6.3") ---
        if (h === 874 && gpu.includes("A19")) return "A3256";             // 17 Pro
        if (h === 874 && gpu.includes("A18")) return "A3293";             // 16 Pro

        // --- 7. THE 852pt CLASS (6.1" Dynamic Island) ---
        if (h === 852 && dpr === 3 && gpu.includes("A18")) return "A3287"; // 16
        if (h === 852 && dpr === 3 && gpu.includes("A17")) return "A2848"; // 15 Pro
        if (h === 852 && dpr === 3 && gpu.includes("A16") && ram > 6) return "A2846"; // 15
        if (h === 852 && dpr === 3 && gpu.includes("A16") && ram <= 6) return "A2650"; // 14 Pro

        // --- 8. THE 844pt CLASS (6.1" OLED Collision Group) ---
        if (h === 844 && gpu.includes("A18")) return "A3543";             // 16e
        if (h === 844 && gpu.includes("A15") && ram > 4) return "A2483";  // 13 Pro
        if (h === 844 && gpu.includes("A15") && ram <= 4) return "A2482"; // 13 
        if (h === 844 && gpu.includes("A15") && ram > 4) return "A2649";  // 14 Pro
        if (h === 844 && gpu.includes("A14") && ram > 4) return "A2341";  // 12 Pro
        if (h === 844 && gpu.includes("A14") && ram <= 4) return "A2172"; // 12

        // --- 9. THE 812pt CLASS (5.4" Mini / 5.8" OLED) ---
        if (h === 812 && gpu.includes("A15")) return "A2481";             // 13 mini
        if (h === 812 && gpu.includes("A14")) return "A2176";             // 12 mini
        if (h === 812 && gpu.includes("A13")) return "A2097";             // 11 Pro
        if (h === 812 && gpu.includes("A12")) return "A1920";             // XS
        if (h === 812 && gpu.includes("A11")) return "A1865";             // X

        // --- 10. THE 736pt CLASS (5.5" Plus) ---
        if (h === 736 && dpr === 3 && gpu.includes("A11")) return "A1864"; // 8 Plus
        if (h === 736 && dpr === 3 && gpu.includes("A10")) return "A1661"; // 7 Plus
        if (h === 736 && dpr === 3 && gpu.includes("A9")) return "A1634";  // 6s Plus
        if (h === 736 && dpr === 3 && gpu.includes("A8")) return "A1522";  // 6 Plus

        // --- 11. THE 667pt CLASS (4.7" Home Button) ---
        if (h === 667 && gpu.includes("A15")) return "A2595";             // SE 3rd Gen
        if (h === 667 && gpu.includes("A13")) return "A2275";             // SE 2nd Gen
        if (h === 667 && gpu.includes("A11")) return "A1863";             // 8
        if (h === 667 && gpu.includes("A10")) return "A1660";             // 7
        if (h === 667 && gpu.includes("A9")) return "A1633";              // 6s
        if (h === 667 && gpu.includes("A8")) return "A1549";              // 6

        // --- 12. THE 568pt CLASS (4" Legacy) ---
        if (h === 568 && gpu.includes("A9")) return "A1662";              // SE 1st Gen
        if (h === 568 && gpu.includes("A7")) return "A1453";              // 5s
        if (h === 568 && gpu.includes("A6")) return "A1428";              // 5
        if (h === 568 && gpu.includes("A6") && ram < 1) return "A1507";    // 5c

        // --- 13. THE 480pt CLASS (3.5" Vintage) ---
        if (h === 480 && dpr === 2 && gpu.includes("A5")) return "A1387"; // 4s
        if (h === 480 && dpr === 2 && gpu.includes("A4")) return "A1332"; // 4
        if (h === 480 && dpr === 1) return "A1203";                       // Original / 3G / 3GS

        return "UNKNOWN_IPHONE";
    };

    return { identify };
})();

// Attach to window for global access
window.StrictIPhoneDetector = StrictIPhoneDetector;