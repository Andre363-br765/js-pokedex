export function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => (p.hidden = true));

      tab.classList.add("active");
      document
        .getElementById(tab.getAttribute("aria-controls"))
        .removeAttribute("hidden");
    });
  });
}
