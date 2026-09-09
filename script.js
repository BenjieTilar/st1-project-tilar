const credentials = [
  // ADD YOUR CERTIFICATES AND BADGES HERE.
  // Put the image file inside the assets folder, then use: image: "assets/filename.jpg"
  // Copy the example below and replace the details.

  {
    id: "cert-1",
    type: "certificate",
    title: "Cybersecurity Foundations",
    issuer: "Online Learning Academy",
    date: "2026-08-19",
    tags: ["Cybersecurity", "Security", "IT"],
    notes: "Replace this sample entry with your actual certificate details and reflection.",
    link: "",
    image: ""
  },
  {
    id: "badge-1",
    type: "badge",
    title: "Data Analytics Explorer",
    issuer: "Skills Platform",
    date: "2026-08-24",
    tags: ["Data", "Analytics", "Excel"],
    notes: "Replace this sample entry with your actual badge details.",
    link: "",
    image: ""
  },
  {
    id: "cert-2",
    type: "certificate",
    title: "IoT & Artificial Intelligence",
    issuer: "Technology Webinar Series",
    date: "2026-08-18",
    tags: ["IoT", "AI"],
    notes: "Replace this sample entry with your actual seminar certificate details.",
    link: "",
    image: ""
  }
];

let activeFilter = "all";
const grid = document.getElementById("credentialGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const detailDialog = document.getElementById("detailDialog");

function formatDate(dateString) {
  if (!dateString) return "Date not added";
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function escapeHtml(text = "") {
  return String(text).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function render() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = credentials.filter(item => {
    const matchesFilter = activeFilter === "all" || item.type === activeFilter;
    const searchable = [item.title, item.issuer, ...(item.tags || []), item.notes].join(" ").toLowerCase();
    return matchesFilter && searchable.includes(term);
  });

  grid.innerHTML = filtered.map(item => `
    <article class="credential-card">
      <div class="thumb">
        ${item.image
          ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">`
          : `<div class="thumb-placeholder">${item.type === "badge" ? "★" : "✓"}</div>`}
        <span class="card-type">${escapeHtml(item.type)}</span>
      </div>
      <div class="card-body">
        <h3>${escapeHtml(item.title)}</h3>
        <p class="issuer">${escapeHtml(item.issuer || "Issuer not added")}</p>
        <div class="tags">
          ${(item.tags || []).slice(0, 3).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="card-meta">
          <span class="date">${formatDate(item.date)}</span>
          <button class="view-btn" data-id="${escapeHtml(item.id)}">View details →</button>
        </div>
      </div>
    </article>`).join("");

  emptyState.classList.toggle("hidden", filtered.length > 0);
  grid.classList.toggle("hidden", filtered.length === 0);
  document.getElementById("totalCount").textContent = credentials.length;
  document.getElementById("certificateCount").textContent = credentials.filter(i => i.type === "certificate").length;
  document.getElementById("badgeCount").textContent = credentials.filter(i => i.type === "badge").length;
}

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render();
  });
});

searchInput.addEventListener("input", render);

grid.addEventListener("click", event => {
  const button = event.target.closest(".view-btn");
  if (button) openDetail(button.dataset.id);
});

function openDetail(id) {
  const item = credentials.find(i => i.id === id);
  if (!item) return;

  document.getElementById("detailType").textContent = item.type;
  document.getElementById("detailTitle").textContent = item.title;
  document.getElementById("detailIssuer").textContent = item.issuer || "Issuer not added";
  document.getElementById("detailNotes").textContent = item.notes || "No notes or reflection added yet.";
  document.getElementById("detailImageWrap").innerHTML = item.image
    ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">`
    : `<div class="thumb-placeholder">${item.type === "badge" ? "★" : "✓"}</div>`;
  document.getElementById("detailMeta").innerHTML = `
    <span class="tag">${formatDate(item.date)}</span>
    ${(item.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}`;
  document.getElementById("detailActions").innerHTML = item.link
    ? `<a class="btn btn-primary" href="${escapeHtml(item.link)}" target="_blank" rel="noopener">Open credential ↗</a>`
    : "";
  detailDialog.showModal();
}

document.getElementById("closeDetail").addEventListener("click", () => detailDialog.close());

detailDialog.addEventListener("click", event => {
  const rect = detailDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) detailDialog.close();
});

document.getElementById("year").textContent = new Date().getFullYear();
render();
