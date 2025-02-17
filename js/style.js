function applyMinimalStyleMode() {
    applyDefaultStyleMode();

    document.querySelectorAll(".judge0-hidden-for-minimal-style").forEach(e => {
        e.classList.add("judge0-hidden");
    });
}

function reverseMinimalStyleMode() {
    document.querySelectorAll(".judge0-hidden-for-minimal-style").forEach(e => {
        e.classList.remove("judge0-hidden");
    });
}

function applyDefaultStyleMode() {
    reverseMinimalStyleMode();
}

function applyStyleMode(styleMode) {
    if (styleMode === "minimal") {
        applyMinimalStyleMode();
    } else {
        applyDefaultStyleMode();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const styleMode = getQueryVariable("style");
    const supportedStyleModes = ["default", "minimal"];
    const defaultStyleMode = "default";
    applyStyleMode(supportedStyleModes.includes(styleMode) ? styleMode : defaultStyleMode);
});
