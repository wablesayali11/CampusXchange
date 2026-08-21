// =========================================
// CAMPUSXCHANGE SEARCH & FILTER
// =========================================


// =========================================
// GET HTML ELEMENTS
// =========================================

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const resetFilter =
    document.getElementById("resetFilter");

const resultCount =
    document.getElementById("resultCount");

const sellForm =
    document.getElementById("sellForm");

const productContainer =
    document.querySelector(".product-container");


// =========================================
// FILTER PRODUCTS
// =========================================

function filterProducts() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedCategory =
        categoryFilter.value;

    let visibleProducts = 0;


    // Get current products
    const currentProducts =
        document.querySelectorAll(
            ".product-card"
        );


    currentProducts.forEach(function(card) {

        const productName =
            card.querySelector("h3")
                .textContent
                .toLowerCase()
                .trim();

        const productCategory =
            card.dataset.category;


        // Search match
        const matchesSearch =
            productName.includes(searchText);


        // Category match
        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;


        // Show / Hide
        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.style.display = "";

            visibleProducts++;

        } else {

            card.style.display = "none";

        }

    });


    resultCount.textContent =
        `Showing ${visibleProducts} product(s)`;

}


// =========================================
// SEARCH EVENT
// =========================================

searchInput.addEventListener(
    "input",
    filterProducts
);


// =========================================
// CATEGORY EVENT
// =========================================

categoryFilter.addEventListener(
    "change",
    filterProducts
);


// =========================================
// RESET FILTER
// =========================================

resetFilter.addEventListener(
    "click",
    function() {

        searchInput.value = "";

        categoryFilter.value = "all";

        filterProducts();

    }
);


// =========================================
// UPDATE PRODUCT COUNT
// =========================================

function updateProductCount() {

    const totalProducts =
        document.querySelectorAll(
            ".product-card"
        ).length;


    resultCount.textContent =
        `Showing ${totalProducts} product(s)`;

}


// =========================================
// SELL ITEM FORM
// =========================================

sellForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // =====================================
        // GET FORM VALUES
        // =====================================

        const productName =
            document.getElementById(
                "product-name"
            ).value.trim();


        const category =
            document.getElementById(
                "category"
            ).value;


        const price =
            document.getElementById(
                "price"
            ).value;


        const condition =
            document.getElementById(
                "condition"
            ).value;


        const description =
            document.getElementById(
                "description"
            ).value.trim();


        // =====================================
        // VALIDATION
        // =====================================

        if (
            productName === "" ||
            category === "" ||
            price === "" ||
            condition === "" ||
            description === ""
        ) {

            alert(
                "Please fill all required fields."
            );

            return;

        }


        // =====================================
        // CREATE PRODUCT CARD
        // =====================================

        const productCard =
            document.createElement("div");


        productCard.classList.add(
            "product-card",
            "user-product"
        );


        productCard.dataset.category =
            category;


        productCard.innerHTML = `

            <div class="product-image">
                📦
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${category}
                </span>

                <h3>
                    ${productName}
                </h3>

                <p>
                    ${description}
                </p>

                <div class="product-bottom">

                    <strong>
                        ₹${price}
                    </strong>

                    <button type="button">
                        View Details
                    </button>

                </div>

            </div>

        `;


        // =====================================
        // ADD PRODUCT TO PAGE
        // =====================================

        productContainer.appendChild(
            productCard
        );


        // =====================================
        // SAVE PRODUCT
        // =====================================

        saveProducts();


        // =====================================
        // RESET FORM
        // =====================================

        sellForm.reset();


        // =====================================
        // SUCCESS MESSAGE
        // =====================================

        alert(
            "Your item has been listed successfully! 🎉"
        );


        // =====================================
        // UPDATE COUNT
        // =====================================

        updateProductCount();

    }
);


// =========================================
// SAVE USER PRODUCTS
// =========================================

function saveProducts() {

    const userProducts =
        document.querySelectorAll(
            ".product-card.user-product"
        );


    const productData = [];


    userProducts.forEach(function(card) {

        const product = {

            name:
                card.querySelector(
                    "h3"
                ).textContent.trim(),

            category:
                card.dataset.category,

            description:
                card.querySelector(
                    ".product-info p"
                ).textContent.trim(),

            price:
                card.querySelector(
                    ".product-bottom strong"
                ).textContent.trim()

        };


        productData.push(product);

    });


    localStorage.setItem(
        "campusProducts",
        JSON.stringify(productData)
    );

}


// =========================================
// LOAD PRODUCTS
// =========================================

function loadProducts() {

    const savedProducts =
        localStorage.getItem(
            "campusProducts"
        );


    if (!savedProducts) {

        return;

    }


    const products =
        JSON.parse(savedProducts);


    products.forEach(function(product) {

        createProductCard(product);

    });

}


// =========================================
// CREATE PRODUCT CARD
// =========================================

function createProductCard(product) {

    const productCard =
        document.createElement("div");


    productCard.classList.add(
        "product-card",
        "user-product"
    );


    productCard.dataset.category =
        product.category;


    productCard.innerHTML = `

        <div class="product-image">
            📦
        </div>

        <div class="product-info">

            <span class="product-category">
                ${product.category}
            </span>

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.description}
            </p>

            <div class="product-bottom">

                <strong>
                    ${product.price}
                </strong>

                <button type="button">
                    View Details
                </button>

            </div>

        </div>

    `;


    productContainer.appendChild(
        productCard
    );

}


// =========================================
// LOAD SAVED PRODUCTS
// =========================================

loadProducts();


// =========================================
// INITIAL PRODUCT COUNT
// =========================================

updateProductCount();