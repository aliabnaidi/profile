const certificates = [
  { title: "Introduction to Microsoft Azure with Web Services", category: "Cloud" },
  { title: "Web Development Using Microsoft ASP.NET", category: "Programming" },
  { title: "Web Development Using Microsoft ASP.NET Active Server Pages", category: "Programming" },
  { title: "Security+", category: "Cybersecurity" },
  { title: "CCNA Cisco Certified Network Associate", category: "Networking" },
  { title: "Professional Training Certificate", category: "Other" },
  { title: "Cyber Security Specialization", category: "Cybersecurity" },
  { title: "Protect Systems From Penetrations", category: "Cybersecurity" },
  { title: "Introduction to Cyber Security", category: "Cybersecurity" },
  { title: "Cyber Security Attack Techniques", category: "Cybersecurity" },
  { title: "Career Path in Cyber Security", category: "Cybersecurity" },
  { title: "Cyber Security Basics", category: "Cybersecurity" },
  { title: "Databases Microsoft SQL Server", category: "Databases" },
  { title: "Introduction to Microsoft SQL Server Databases", category: "Databases" },
  { title: "Microsoft SQL Server Database Analysis and Modeling", category: "Databases" },
  { title: "Query Databases Using Transact-SQL (1)", category: "Databases" },
  { title: "Query Databases Using Transact-SQL (2)", category: "Databases" },
  { title: "Java Programming 3", category: "Programming" },
  { title: "Java Programming 2", category: "Programming" },
  { title: "Java Programming 1", category: "Programming" },
  { title: "Cloud Computing", category: "Cloud" },
];

const certificateIcons = ['<path d="M3 8h18M6 3h12l3 5-9 13L3 8z"/><path d="m9 8 3 13 3-13"/>', '<path d="M4 4h16v16H4z"/><path d="M4 10h16M10 4v16"/>', '<path d="M4 3h16v18H4z"/><path d="M8 8h8M8 12h8M8 16h5"/>', '<path d="M12 2 4 6v6c0 5 3 8 8 10 5-2 8-5 8-10V6z"/><path d="m9 12 2 2 4-4"/>', '<rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 8V5m12 3V5M6 16v3m12-3v3M8 12h.01M12 12h.01"/>', '<path d="M4 19V5l8-3 8 3v14l-8 3z"/><path d="M9 9h6M9 13h6M9 17h6"/>', '<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>', '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>', '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>', '<path d="M4 18 10 6l4 8 3-4 3 8z"/><path d="M4 18h16"/>', '<path d="M3 7h18M7 3v8M17 3v8M5 13h14v8H5z"/>', '<path d="M4 6h16v12H4z"/><path d="m8 10 4 4 4-4"/>', '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>', '<path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h4"/>', '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 3M7 12h2"/>', '<path d="m8 5-5 7 5 7m8-14 5 7-5 7M14 3l-4 18"/>', '<path d="M3 6h18v12H3z"/><path d="M7 10h10M7 14h7"/>', '<path d="M5 3h14v18H5z"/><path d="M9 7h6M9 11h6M9 15h3"/>', '<path d="M4 4h16v16H4z"/><path d="m9 9-3 3 3 3m6-6 3 3-3 3"/>', '<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h3"/>', '<path d="M5 17a4 4 0 0 1 1-8 6 6 0 0 1 12 1 4 4 0 0 1 1 7z"/><path d="M12 12v7m-3-3 3 3 3-3"/>'];
const categoryOrder = ["All", "Cybersecurity", "Cloud", "Programming", "Databases", "Networking", "Other"];
let activeCategory = "All";

function certificateImageFallback(img) {
  const original = img.dataset.file || "";
  const match = original.match(/^(.*?)(?:\.(jpg|jpeg|png|webp))$/i);
  if (!match) {
    img.classList.add("missing");
    img.nextElementSibling?.classList.add("show");
    return;
  }
  const base = match[1];
  const ext = match[2].toLowerCase();
  const alternatives = ["jpg", "jpeg", "png", "webp"].filter(e => e !== ext);
  const attempt = Number(img.dataset.attempt || 0);
  if (attempt < alternatives.length) {
    img.dataset.attempt = String(attempt + 1);
    img.src = `./${base}.${alternatives[attempt]}`;
  } else {
    img.classList.add("missing");
    img.nextElementSibling?.classList.add("show");
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[char]));
}

function certificateCardMarkup(cert, originalIndex) {
  const icon = certificateIcons[originalIndex] || certificateIcons[0];
  return `<article class="certificate-card certificate-text-card" tabindex="0" role="button" aria-label="View certificate details: ${escapeHtml(cert.title)}" data-certificate-index="${originalIndex}" data-category="${escapeHtml(cert.category)}">
    <span class="certificate-custom-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${icon}</svg></span>
    <div class="certificate-compact-copy"><h3>${escapeHtml(cert.title)}</h3><span class="certificate-compact-category">${escapeHtml(cert.category)}</span></div>
    <span class="certificate-compact-number">${String(originalIndex+1).padStart(2,'0')}</span>
  </article>`;
}

function renderCategoryTabs() {
  const bar = document.getElementById("certificateCategories");
  if (!bar) return;
  bar.innerHTML = categoryOrder.map(category => {
    const count = category === "All"
      ? certificates.length
      : certificates.filter(cert => cert.category === category).length;
    return `<button type="button" class="certificate-tab ${category === activeCategory ? "active" : ""}" data-category="${escapeHtml(category)}" aria-pressed="${category === activeCategory}">${escapeHtml(category)} <span>(${count})</span></button>`;
  }).join("");


}

document.getElementById("certificateCategories")?.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategoryTabs();
  renderCertificates();
});

function renderCertificates() {
  const grid = document.getElementById("certificatesGrid");
  const count = document.getElementById("certificateCount");
  if (!grid) return;

  const visible = activeCategory === "All"
    ? certificates
    : certificates.filter(cert => cert.category === activeCategory);

  if (count) count.textContent = visible.length;

  grid.innerHTML = visible.map(cert => certificateCardMarkup(cert, certificates.indexOf(cert))).join("");
}



// Delegated interactions continue to work after category filtering.
document.addEventListener("click", (event) => {
  const card = event.target.closest("#certificatesGrid .certificate-text-card");
  if (card) openCertificate(Number(card.dataset.certificateIndex));
});
document.addEventListener("keydown", (event) => {
  const card = event.target.closest("#certificatesGrid .certificate-text-card");
  if (card && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openCertificate(Number(card.dataset.certificateIndex));
  }
});

function openCertificate(index) {
  const cert = certificates[index];
  const modal = document.getElementById("certModal");
  if (!modal || !cert) return;
  const title = document.getElementById("modalTitle");
  const modalText = modal.querySelector(".modal-box p");
  const verify = modal.querySelector(".btn");

  title.textContent = cert.title;
  modalText.innerHTML = `<strong>${escapeHtml(cert.category)}</strong><br>Certificate and training record.`;
  if (verify) verify.style.display = "none";

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function initializeCertificates() {
  renderCategoryTabs();
  renderCertificates();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCertificates, {once:true});
} else {
  initializeCertificates();
}


document.addEventListener("DOMContentLoaded", () => {
  const profile = document.getElementById("profilePhoto");
  const fallback = profile?.nextElementSibling;
  profile?.addEventListener("error", () => {
    profile.style.display = "none";
    if (fallback) fallback.style.display = "grid";
  }, { once: true });
});
