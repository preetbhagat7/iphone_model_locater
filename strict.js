const StrictIPhoneDetector = (() => {
    return {
        identify: () => {
            const h = Math.max(window.screen.width, window.screen.height);
            const ram = navigator.deviceMemory || 0; 
            const dpr = window.devicePixelRatio;
            
            // WebGL Check for GPU (The ultimate tie-breaker)
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl');
            const dbg = gl ? gl.getExtension('WEBGL_debug_renderer_info') : null;
            const gpu = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "";

            // --- 2025 Generation ---
            if (h === 956) return (ram > 8) ? "A3257" : "A3296"; // 17 Pro Max (12GB) vs 16 Pro Max (8GB)
            if (h === 912) return "A3114"; // iPhone 17 Air
            if (h === 874) {
                if (gpu.includes("A19 Pro")) return "A3256"; // 17 Pro
                if (gpu.includes("A19")) return "A3526";     // 17 Standard
                return "A3293";                             // 16 Pro
            }

            // --- 852pt Class (Dynamic Island) ---
            if (h === 852) {
                if (gpu.includes("A18")) return "A3287";     // iPhone 16
                if (ram > 6) return "A2848";                 // 15 Pro
                return "A2650";                              // 14 Pro
            }

            // --- 844pt Class (Standard Notch) ---
            if (h === 844) {
                if (gpu.includes("A18")) return "A3543";     // iPhone 16e (SE 4)
                if (ram > 4) return "A2846";                 // 15 Standard
                if (gpu.includes("A15")) return "A2649";     // 14/13
                return "A2172";                              // 12
            }

            // --- Home Button / SE Class ---
            if (h === 667) {
                if (ram > 3) return "A2595";                 // SE 3rd Gen
                if (ram > 2) return "A2275";                 // SE 2nd Gen
                return "A1863";                             // iPhone 8
            }

            // --- Legacy ---
            if (h === 568) return (gpu.includes("A7")) ? "A1453" : "A1428"; // 5s vs 5
            if (h === 480) return "A1332"; // iPhone 4
            
            return "A1203"; // Default for Unknown/Original
        }
    };
})();