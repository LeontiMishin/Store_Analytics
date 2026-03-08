import { getStockStatus } from "../services/stockService"

type Product = {
    id: number
    name: string
    category: string
    price: number
    quantities: number[]
    specs?: Record<string, string>
}

const container = document.getElementById("products") as HTMLElement
const form = document.getElementById("productForm") as HTMLFormElement
const filterInput = document.getElementById("filter") as HTMLInputElement
const sortSelect = document.getElementById("sort") as HTMLSelectElement

let products: Product[] = loadProducts()

renderProducts(products)

function loadProducts(): Product[] {
    const saved = localStorage.getItem("products")
    if (!saved) return []
    return JSON.parse(saved)
}

function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products))
}

function renderProducts(list: Product[]) {

    container.innerHTML = ""

    list.forEach(p => {

        const available = p.quantities.reduce((a, b) => a + b, 0)
        const status = getStockStatus(available)

        const card = document.createElement("div")
        card.className = "card mb-2"

        const statusClass =
            status === "IN_STOCK" ? "bg-success text-white" :
            status === "LOW" ? "bg-warning text-dark" :
            "bg-danger text-white"

        let specsText = ""

        if (p.specs) {
            const specs = Object.entries(p.specs)
                .map(([k, v]) => `${k}=${v}`)
                .join(", ")
            specsText = `<p>Specs: ${specs}</p>`
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
 `

        container.appendChild(card)

    })

}

form.addEventListener("submit", e => {

    e.preventDefault()

    const name = (document.getElementById("name") as HTMLInputElement).value
    const category = (document.getElementById("category") as HTMLInputElement).value
    const price = Number((document.getElementById("price") as HTMLInputElement).value)
    const quantitiesText = (document.getElementById("quantities") as HTMLInputElement).value
    const specsText = (document.getElementById("specs") as HTMLInputElement).value

    if (!name || !category || price < 0) {
        alert("Invalid input")
        return
    }

    const quantities = quantitiesText
        ? quantitiesText.split(",").map(x => Number(x.trim()))
        : []

    let specs: Record<string, string> | undefined

    if (specsText) {

        specs = {}

        specsText.split(",").forEach(pair => {
            const [k, v] = pair.split("=")
            if (k && v) {
                specs![k.trim()] = v.trim()
            }
        })

    }

    const product: Product = {
        id: Date.now(),
        name,
        category,
        price,
        quantities,
        specs
    }

    products.push(product)

    saveProducts()

    renderProducts(products)

    form.reset()

})

filterInput.addEventListener("input", () => {

    const value = filterInput.value.toLowerCase()

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    )

    renderProducts(filtered)

})

sortSelect.addEventListener("change", () => {

    const sorted = [...products]

    if (sortSelect.value === "price") {
        sorted.sort((a, b) => a.price - b.price)
    }

    if (sortSelect.value === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name))
    }

    renderProducts(sorted)

})