"use strict";

/**
 * Advanced iPhone Hardware Detector 2025
 * Matches Viewport, DPR, and Renderer to specific Model IDs and Specs.
 */

const getIPhoneModel = () => {
    const width = Math.min(window.screen.width, window.screen.height);
    const height = Math.max(window.screen.width, window.screen.height);
    const dpr = window.devicePixelRatio;

    // WebGL Renderer check for Chipset (e.g., A19, A18)
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const debugInfo = gl ? gl.getExtension('WEBGL_debug_renderer_info') : null;
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "";

    let device = { full_name: "Unknown iPhone", modelNumber: "iPhone?,?", specs: "N/A" };

    // --- 2025 NEW MODELS ---
    if (width === 440 && height === 956) {
        if (renderer.includes("A19")) {
            device = { full_name: "iPhone 17 Pro Max", modelNumber: "iPhone18,1", specs: "6.9\" OLED, A19 Pro, 120Hz" };
        } else {
            device = { full_name: "iPhone 16 Pro Max", modelNumber: "iPhone17,4", specs: "6.9\" OLED, A18 Pro, 120Hz" };
        }
    } 
    else if (width === 420 && height === 912) {
        device = { full_name: "iPhone Air", modelNumber: "iPhone18,4", specs: "6.5\" Slim OLED, A19, 120Hz" };
    }

    // --- MODERN NOTCH / DYNAMIC ISLAND ---
    else if (width === 430 && height === 932) {
        if (renderer.includes("A18")) {
            device = { full_name: "iPhone 16 Plus", modelNumber: "iPhone17,2", specs: "6.7\" OLED, A18, 60Hz" };
        } else {
            device = { full_name: "iPhone 15 Pro Max / 14 Pro Max", modelNumber: "iPhone16,2", specs: "6.7\" OLED, ProMotion" };
        }
    }
    else if (width === 402 && height === 874) {
        device = renderer.includes("A19") ? 
            { full_name: "iPhone 17 / 17 Pro", modelNumber: "iPhone18,2", specs: "6.3\" OLED, A19" } :
            { full_name: "iPhone 16 Pro", modelNumber: "iPhone17,3", specs: "6.3\" OLED, A18 Pro" };
    }
    else if (width === 393 && height === 852) {
        device = renderer.includes("A18") ? 
            { full_name: "iPhone 16", modelNumber: "iPhone17,1", specs: "6.1\" OLED, A18" } :
            { full_name: "iPhone 15 / 15 Pro / 14 Pro", modelNumber: "iPhone15,2", specs: "6.1\" OLED" };
    }
    else if (width === 428 && height === 926) {
        device = { full_name: "iPhone 14 Plus / 13 Pro Max", modelNumber: "iPhone15,1", specs: "6.7\" OLED" };
    }
    else if (width === 390 && height === 844) {
        if (renderer.includes("A18")) {
            device = { full_name: "iPhone 16e", modelNumber: "iPhone17,5", specs: "6.1\" OLED, A18" };
        } else {
            device = { full_name: "iPhone 14 / 13 / 12 Pro", modelNumber: "iPhone14,2", specs: "6.1\" OLED" };
        }
    }

    // --- LEGACY ALL-SCREEN ---
    else if (width === 414 && height === 896) {
        device = dpr === 3 ? 
            { full_name: "iPhone 11 Pro Max / XS Max", modelNumber: "iPhone12,5", specs: "6.5\" OLED" } :
            { full_name: "iPhone 11 / XR", modelNumber: "iPhone12,1", specs: "6.1\" Liquid Retina LCD" };
    }
    else if (width === 375 && height === 812) {
        device = { full_name: "iPhone X / XS / 11 Pro", modelNumber: "iPhone10,3", specs: "5.8\" OLED" };
    }

    // --- CLASSIC FORM FACTORS (HOME BUTTON) ---
    else if (width === 414 && height === 736) {
        device = { full_name: "iPhone 6 Plus / 7 Plus / 8 Plus", modelNumber: "iPhone10,2", specs: "5.5\" LCD" };
    }
    else if (width === 375 && height === 667) {
        device = { full_name: "iPhone 6 / 7 / 8 / SE (Gen 2/3)", modelNumber: "iPhone12,8", specs: "4.7\" LCD" };
    }
    else if (width === 320 && height === 568) {
        device = { full_name: "iPhone 5 / 5s / 5c / SE (Gen 1)", modelNumber: "iPhone8,4", specs: "4.0\" LCD" };
    }
    else if (width === 320 && height === 480) {
        device = dpr === 2 ? 
            { full_name: "iPhone 4 / 4s", modelNumber: "iPhone3,1", specs: "3.5\" Retina LCD" } :
            { full_name: "iPhone 2G / 3G / 3GS", modelNumber: "iPhone1,1", specs: "3.5\" Non-Retina" };
    }

    return device;
};

// UI Logic
window.addEventListener('DOMContentLoaded', () => {
    const data = getIPhoneModel();
    document.body.innerHTML = `
        <div style="font-family: -apple-system, sans-serif; padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); max-width: 350px; margin: 50px auto; background: #fff;">
            <h1 style="font-size: 1.4em; margin-bottom: 5px;">${data.full_name}</h1>
            <p style="color: #0071e3; font-weight: bold; margin-bottom: 15px;">${data.modelNumber}</p>
            <hr style="border: 0; border-top: 1px solid #eee;">
            <p style="font-size: 0.9em; color: #555;"><strong>Specs:</strong> ${data.specs}</p>
        </div>
    `;
});