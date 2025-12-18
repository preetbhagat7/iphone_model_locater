const StrictIPhoneDetector = (() => {
    return {
        identify: () => {
            const h = Math.max(window.screen.width, window.screen.height);
            const ram = navigator.deviceMemory || 0;
            const dpr = window.devicePixelRatio;

            // WebGL Check for GPU (The ultimate tie-breaker)
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl");
            const dbg = gl ? gl.getExtension("WEBGL_debug_renderer_info") : null;
            const gpu = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "";

            // --- 956pt Class (2025 Flagships) ---
            if (h === 956) return ram > 8 ? "A3257" : "A3296"; // 17 Pro Max vs 16 Pro Max

            // --- 932pt Class (Dynamic Island Large) ---
            if (h === 932) {
                if (gpu.includes("A18")) return "A3290"; // 16 Plus
                if (gpu.includes("A17")) return "A2849"; // 15 Pro Max
                return "A2651"; // 14 Pro Max
            }

            // --- 926pt Class (Large Notch) ---
            if (h === 926) {
                if (gpu.includes("A15")) return "A2484"; // 13 Pro Max
                if (gpu.includes("A14")) return "A2342"; // 12 Pro Max
                return "A2632"; // 14 Plus
            }

            // --- 912pt Class ---
            if (h === 912) return "A3114"; // iPhone 17 Air

            // --- 896pt Class (XR / 11 / XS Max) ---
            if (h === 896) {
                if (dpr < 3) {
                    // Liquid Retina (2x)
                    return (ram > 3 || gpu.includes("A13")) ? "A2111" : "A1984"; // 11 vs XR
                }
                return (gpu.includes("A13")) ? "A2218" : "A1921"; // 11 Pro Max vs XS Max
            }

            // --- 874pt Class ---
            if (h === 874) {
                if (gpu.includes("A19 Pro")) return "A3256"; // 17 Pro
                if (gpu.includes("A19")) return "A3526";     // 17 Standard
                return "A3293";                             // 16 Pro
            }

            // --- 852pt Class (Dynamic Island Era) ---
            if (h === 852) {
                if (gpu.includes("A18")) return "A3287"; // 16
                if (gpu.includes("A17")) return "A2848"; // 15 Pro
                if (ram > 6) return "A3090";             // 15 Standard (8GB RAM in some regions)
                return "A2650";                          // 14 Pro
            }

            // --- 844pt Class (Standard Notch/Dynamic) ---
            if (h === 844) {
                if (gpu.includes("A18")) return "A3543"; // 16e (SE 4)
                
                const isProMotion = window.matchMedia("(pre-refresh-rate: 120hz)").matches;

                if (gpu.includes("A15")) {
                    return isProMotion ? "A2483" : "A2649"; // 13 Pro vs 14 Standard
                }
                if (gpu.includes("A14")) {
                    return (ram > 4) ? "A2341" : "A2172"; // 12 Pro vs 12 Standard
                }
                return "A2846"; // 15 Standard
            }

            // --- 812pt Class (Mini & X/XS/11Pro) ---
            if (h === 812) {
                if (gpu.includes("A15")) return "A2481"; // 13 mini
                if (gpu.includes("A14")) return "A2176"; // 12 mini
                if (gpu.includes("A13")) return "A2097"; // 11 Pro
                if (gpu.includes("A12") || ram > 3) return "A1920"; // XS
                return "A1865"; // X
            }

            // --- 667pt Class (Home Button / SE) ---
            if (h === 667) {
                if (ram > 3) return "A2595"; // SE 3rd Gen
                if (ram > 2) return "A2275"; // SE 2nd Gen
                return "A1863";             // iPhone 8
            }

            // --- Legacy ---
            if (h === 568) return gpu.includes("A7") ? "A1453" : "A1428"; // 5s vs 5
            if (h === 480) return "A1332"; // iPhone 4

            return "A1203"; // Default Original
        }
    };
})();
//<!-- git test change -->
