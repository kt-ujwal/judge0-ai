function setThemeMode(themeMode, saveToLocalStorage = false) {
    const actualThemeMode = themeMode === "system" ? getSystemTheme() : themeMode;
    const isLightMode = actualThemeMode === "light";

    document.body.style.background = `url("./images/logo_${isLightMode ? "white" : "black"}.svg") center center / 33% no-repeat ${isLightMode ? "#e0e1e2" : "#1b1c1d"} `;

    document.getElementById("judge0-golden-layout-dark-theme-stylesheet").disabled = isLightMode;
    document.getElementById("judge0-golden-layout-light-theme-stylesheet").disabled = !isLightMode;

    monaco.editor.setTheme(isLightMode ? "vs-light" : "vs-dark");

    [".ui.menu", ".ui.input"].forEach(selector => document.querySelectorAll(selector).forEach(menu => {
        if (isLightMode) {
            menu.classList.remove("inverted");
        } else {
            menu.classList.add("inverted");
        }
    }));

    document.querySelectorAll(".label").forEach(menu => {
        if (isLightMode) {
            menu.classList.remove("black");
        } else {
            menu.classList.add("black");
        }
    });

    document.getElementById("judge0-theme-toggle-btn").setAttribute("data-content", `Switch between dark, light, and system theme (currently ${themeMode} theme)`);
    const themeToggleBtnIcon = document.getElementById("judge0-theme-toggle-btn-icon");
    if (themeMode === "dark") {
        themeToggleBtnIcon.classList = "moon icon";
    } else if (themeMode === "light") {
        themeToggleBtnIcon.classList = "sun icon";
    } else {
        themeToggleBtnIcon.classList = "adjust icon";
    }

    document.querySelectorAll("[data-content]").forEach(e => {
        if (isLightMode) {
            e.setAttribute("data-variation", "very wide");
        } else {
            e.setAttribute("data-variation", "inverted very wide");
        }
    });

    if (saveToLocalStorage) {
        localStorageSetItem("JUDGE0_THEME_MODE", themeMode);
    }
}

function getThemeMode() {
    return localStorageGetItem("JUDGE0_THEME_MODE") || "system";
}

function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function toggleThemeMode() {
    const currentThemeMode = getThemeMode();
    if (currentThemeMode === "system") {
        if (getSystemTheme() === "dark") {
            setThemeMode("light", true);
        } else {
            setThemeMode("dark", true);
        }
    } else if (currentThemeMode === "dark") {
        if (getSystemTheme() === "dark") {
            setThemeMode("system", true);
        } else {
            setThemeMode("light", true);
        }
    } else if (currentThemeMode === "light") {
        if (getSystemTheme() === "light") {
            setThemeMode("system", true);
        } else {
            setThemeMode("dark", true);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    require(["vs/editor/editor.main"], function (ignorable) {
        const queryThemeMode = getQueryVariable("theme");
        const supportedThemeModes = ["dark", "light", "system"];
        setThemeMode(supportedThemeModes.includes(queryThemeMode) ? queryThemeMode : getThemeMode(), true);
    });
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (getThemeMode() === "system") {
        setThemeMode("system");
    }
});
