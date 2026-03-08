import { getStockStatus } from "../services/stockService.js";
const container = document.getElementById("products");
const form = document.getElementById("productForm");
const filterInput = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
let products = loadProducts();
renderProducts(products);
function loadProducts() {
    const saved = localStorage.getItem("products");
    if (!saved)
        return [];
    return JSON.parse(saved);
}
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}
function renderProducts(list) {
    container.innerHTML = "";
    list.forEach(p => {
        const available = p.quantities.reduce((a, b) => a + b, 0);
        const status = getStockStatus(available);
        const card = document.createElement("div");
        card.className = "card mb-2";
        const statusClass = status === "IN_STOCK" ? "bg-success text-white" :
            status === "LOW" ? "bg-warning text-dark" :
                "bg-danger text-white";
        let specsText = "";
        if (p.specs) {
            const specs = Object.entries(p.specs)
                .map(([k, v]) => `${k}=${v}`)
                .join(", ");
            specsText = `<p>Specs: ${specs}</p>`;
        }
        card.innerHTML = `
  <div class="card-body">
    <h5 class="card-title">${p.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${p.category}</h6>
    <p class="card-text">Price: $${p.price.toFixed(2)}</p>
    <p class="card-text">Available: ${available}</p>
    <span class="badge ${statusClass}">${status.replace('_', ' ')}</span>
    ${specsText}
  </div>
 `;
        container.appendChild(card);
    });
}
form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = Number(document.getElementById("price").value);
    const quantitiesText = document.getElementById("quantities").value;
    const specsText = document.getElementById("specs").value;
    if (!name || !category || price < 0) {
        alert("Invalid input");
        return;
    }
    const quantities = quantitiesText
        ? quantitiesText.split(",").map(x => Number(x.trim()))
        : [];
    let specs;
    if (specsText) {
        specs = {};
        specsText.split(",").forEach(pair => {
            const [k, v] = pair.split("=");
            if (k && v) {
                specs[k.trim()] = v.trim();
            }
        });
    }
    const product = {
        id: Date.now(),
        name,
        category,
        price,
        quantities,
        specs
    };
    products.push(product);
    saveProducts();
    renderProducts(products);
    form.reset();
});
filterInput.addEventListener("input", () => {
    const value = filterInput.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(value));
    renderProducts(filtered);
});
sortSelect.addEventListener("change", () => {
    const sorted = [...products];
    if (sortSelect.value === "price") {
        sorted.sort((a, b) => a.price - b.price);
    }
    if (sortSelect.value === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    renderProducts(sorted);
});
