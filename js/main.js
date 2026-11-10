const NAV_ITEMS = [
  ["ပင်မစာမျက်နှာ", "index.html", "⌂"],
  ["မာတိကာ", "contents.html", "📑"],
  ["သင်ခန်းစာများ", "lessons.html", "📚"],
  ["မေးခွန်းများ", "quiz.html", "❓"],
  ["လမ်းညွှန်ချက်", "references.html", "📖"],
  ["နည်းပညာများ", "technology.html", "⚙️"],
  ["ကျွန်ုပ်တို့အကြောင်း", "about.html", "ℹ"],
  ["ကျေးဇူးတင်လွှာ", "acknowledgement.html", "🙏"]
];

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".menu-toggle");
  const current = location.pathname.split("/").pop() || "index.html";

  if (nav) {
    nav.innerHTML =
      `<button class="menu-close" type="button" aria-label="မီနူးပိတ်ရန်">×</button>` +
      NAV_ITEMS.map(([label, href, icon]) =>
        `<a href="${href}" data-icon="${icon}" class="${href === current ? "active" : ""}">${label}</a>`
      ).join("");
  }

  const closeMenu = () => {
    if (!nav || !toggle) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-is-open");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(opened));
      document.body.classList.toggle("menu-is-open", opened);
    });

    nav.querySelector(".menu-close")?.addEventListener("click", closeMenu);

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }
});


// Make each lesson image + title group a fully clickable, keyboard-accessible link.
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'lessons') return;
  document.querySelectorAll('.wp-block-stackable-columns.alignwide .stk-block-column').forEach((card) => {
    const link = card.querySelector('a.stk-block-link[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', card.querySelector('p')?.innerText?.trim() || 'သင်ခန်းစာသို့ သွားရန်');
    card.addEventListener('click', (event) => {
      if (event.target.closest('a')) return;
      window.location.href = href;
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.location.href = href;
      }
    });
  });
});
