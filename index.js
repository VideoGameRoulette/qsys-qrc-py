const button = document.getElementById("dropdown-button");
const menu = document.getElementById("dropdown-menu");

button.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    const currentState = button.getAttribute("data-state");
    if (!currentState || currentState === "closed") {
        button.setAttribute("data-state", "opened");
        button.setAttribute("aria-expanded", "true");
    } else {
        button.setAttribute("data-state", "closed");
        button.setAttribute("aria-expanded", "false");
    }
});

menu.querySelectorAll("a").forEach((option) => {
    option.addEventListener("click", () => {
        button.focus();
        menu.classList.add("hidden");
        button.classList.remove("focus:ring", "focus:ring-indigo-500");
    });
});

document.addEventListener("click", (event) => {
    if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.add("hidden");
        button.classList.remove("focus:ring", "focus:ring-indigo-500");
    }
});

button.addEventListener("focusin", () => {
    button.classList.add("focus:ring", "focus:ring-indigo-500");
});

button.addEventListener("focusout", () => {
    if (!menu.classList.contains("hidden")) {
        button.classList.add("focus:ring", "focus:ring-indigo-500");
    } else {
        button.classList.remove("focus:ring", "focus:ring-indigo-500");
        const currentState = button.getAttribute("data-state");
        button.setAttribute("data-state", "closed");
        button.setAttribute("aria-expanded", "false");
    }
});
