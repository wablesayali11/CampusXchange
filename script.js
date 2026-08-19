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