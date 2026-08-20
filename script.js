// =========================================
// CAMPUSXCHANGE SEARCH & FILTER
// =========================================


// Get HTML elements

const searchInput = document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const resetFilter =
    document.getElementById("resetFilter");

const resultCount =
    document.getElementById("resultCount");

const productCards =
    document.querySelectorAll(".product-card");


// =========================================
// FILTER PRODUCTS
// =========================================

function filterProducts() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedCategory =
        categoryFilter.value;

    let visibleProducts = 0;


    productCards.forEach(function(card) {

        const productName =
            card.querySelector("h3")
                .textContent
                .toLowerCase();

        const productCategory =
            card.dataset.category;


        // Check search

        const matchesSearch =
            productName.includes(searchText);


        // Check category

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;


        // Show / Hide

        if (matchesSearch && matchesCategory) {

            card.style.display = "";

            visibleProducts++;

        } else {

            card.style.display = "none";

        }

    });


    // Update result count

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

const sellForm =
    document.getElementById("sellForm");


// Product container

const productContainer =
    document.querySelector(".product-container");


// =========================================
// SELL FORM SUBMIT
// =========================================

sellForm.addEventListener(
    "submit",
    function(event) {

        // Stop page refresh

        event.preventDefault();


        // Get form values

        const productName =
            document.getElementById("product-name")
                .value
                .trim();

        const category =
            document.getElementById("category")
                .value;

        const price =
            document.getElementById("price")
                .value;

        const condition =
            document.getElementById("condition")
                .value;

        const description =
            document.getElementById("description")
                .value
                .trim();


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
            "product-card"
        );


        // Category stored for filter

        productCard.dataset.category =
            category;


        // Product card HTML

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
        // RESET FORM
        // =====================================

        sellForm.reset();


        // Success message

        alert(
            "Your item has been listed successfully! 🎉"
        );


        // Update product count

        updateProductCount();

    }
);