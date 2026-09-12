const credentials = [
  // ADD YOUR CERTIFICATES AND BADGES HERE.
  // Put the image file inside the assets folder, then use: image: "assets/filename.jpg"
  // Copy the example below and replace the details.

  {
    id: "cert-1",
    type: "certificate",
    title: "Cyber Threat Management",
    issuer: "Cisco Networking Academy",
    date: "2026-08-24",
    tags: ["Cybersecurity", "Threat Management", "Network Security"],
    notes: "Taking the Cyber Threat Management course helped me better understand how cyber threats can affect individuals and organizations. I learned the importance of identifying threats, managing security risks, and applying proper cybersecurity practices. This course improved my awareness of cybersecurity and motivated me to continue developing my skills in protecting digital information and systems.",
    link: "https://www.netacad.com/courses/cyber-threat-management?courseLang=en-US",
    image: "assets/Cyber Threat Management.png"
  },
  {
    id: "cert-2",
    type: "certificate",
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    date: "2026-08-27",
    tags: ["Data Science", "Data Analytics"],
    notes: "The Introduction to Data Science course gave me a better understanding of how data is collected, analyzed, and used to generate meaningful insights. I learned about the roles of data science, data analytics, and data engineering. This experience strengthened my interest in working with data and encouraged me to further develop my skills in data analysis and technology..",
    link: "https://www.netacad.com/courses/introduction-data-science?courseLang=en-US",
    image: "assets/Introduction to Data Science.png"
  },
  {
    id: "cert-3",
    type: "certificate",
    title: "Introduction to IoT and Digital Transformation",
    issuer: "Cisco Networking Academy",
    date: "2026-09-06",
    tags: ["IoT", "Digital Transformation", "Networking"],
    notes: "The Introduction to IoT course helped me understand how connected devices collect and exchange data to make everyday processes smarter and more efficient. I gained a better understanding of IoT concepts and its role in digital transformation. This course also encouraged me to explore how IoT can be applied to real-world technologies and systems.",
    link: "https://www.netacad.com/courses/introduction-iot?courseLang=en-US",
    image: "assets/Introduction to IoT and Digital Transformation.png"
  },
    {
    id: "cert-4",
    type: "certificate",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2026-09-11",
    tags: ["Cybersecurity", "Information Security", "Cyber Threats", "Cyber Attacks"],
    notes: "This course gave me a better understanding of cybersecurity and the importance of staying safe online. I learned about common cyber threats, how attackers can compromise information, and ways to protect personal data and privacy. It also increased my awareness of the role cybersecurity plays in both personal and professional environments.",
    link: "https://www.netacad.com/courses/introduction-to-cybersecurity?courseLang=en-US",
    image: "assets/Introduction to Cybersecurity.png"
  },
    {
    id: "cert-5",
    type: "certificate",
    title: "IT Customer Support Basics",
    issuer: "Cisco Networking Academy",
    date: "2026-09-12",
    tags: ["IT Support", "Customer Support", "Technical Support", "Troubleshooting", "Problem Solving"],
    notes: "This course helped me understand the fundamentals of IT customer support and the importance of assisting users with technical issues. I learned how communication, problem-solving, and patience are essential when providing support. The lessons also improved my understanding of how IT support professionals troubleshoot problems and help users resolve their concerns effectively.",
    link: "https://www.netacad.com/courses/it-customer-support-basics?courseLang=en-US",
    image: "assets/IT Customer Support Basics.png"
  },
   {
    id: "badge-1",
    type: "badge",
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    date: "2026-08-27",
    tags: ["Data Science", "Data Analytics"],
    notes: "",
    link: "",
    image: ""
  },
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
