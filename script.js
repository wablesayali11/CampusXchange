/* CAMPUSXCHANGE SEARCH & FILTER */

/* GET HTML ELEMENTS */

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


/* FILTER PRODUCTS */

function filterProducts() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    const selectedCategory =
        categoryFilter.value;

    let visibleProducts = 0;

    const currentProducts =
        document.querySelectorAll(".product-card");

    currentProducts.forEach(function(card) {

        const productName =
            card.querySelector("h3")
                .textContent
                .toLowerCase()
                .trim();

        const productCategory =
            card.dataset.category;

        const matchesSearch =
            productName.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

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


/* SEARCH EVENT */

searchInput.addEventListener(
    "input",
    filterProducts
);


/* CATEGORY EVENT */

categoryFilter.addEventListener(
    "change",
    filterProducts
);


/* RESET FILTER */

resetFilter.addEventListener(
    "click",
    function() {

        searchInput.value = "";
        categoryFilter.value = "all";

        filterProducts();

    }
);


/* UPDATE PRODUCT COUNT */

function updateProductCount() {

    const totalProducts =
        document.querySelectorAll(
            ".product-card"
        ).length;

    resultCount.textContent =
        `Showing ${totalProducts} product(s)`;

}


/* SELL ITEM FORM */

sellForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        /* GET FORM VALUES */

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

        const seller =
            document.getElementById(
                "seller"
            ).value.trim();

        const contact =
            document.getElementById(
                "contact"
            ).value.trim();

        const description =
            document.getElementById(
                "description"
            ).value.trim();


        /* VALIDATION */

        if (
            productName === "" ||
            category === "" ||
            price === "" ||
            condition === "" ||
            seller === "" ||
            contact === "" ||
            description === ""
        ) {

            alert(
                "Please fill all required fields."
            );

            return;

        }


        /* CREATE PRODUCT CARD */

        const productCard =
            document.createElement("div");

        productCard.classList.add(
            "product-card",
            "user-product"
        );


        /* STORE PRODUCT DATA */

        productCard.dataset.category =
            category;

        productCard.dataset.condition =
            condition;

        productCard.dataset.seller =
            seller;

        productCard.dataset.contact =
            contact;

        productCard.dataset.image =
            "📦";


        /* PRODUCT CARD HTML */

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


        /* ADD PRODUCT TO PAGE */

        productContainer.appendChild(
            productCard
        );


        /* SAVE PRODUCT */

        saveProducts();


        /* ADD VIEW DETAILS EVENT */

        attachViewDetailsEvent(
            productCard
        );


        /* RESET FORM */

        sellForm.reset();


        /* SUCCESS MESSAGE */

        alert(
            "Your item has been listed successfully! 🎉"
        );


        /* UPDATE COUNT */

        updateProductCount();

    }
);


/* SAVE USER PRODUCTS */

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

            condition:
                card.dataset.condition,

            seller:
                card.dataset.seller,

            contact:
                card.dataset.contact,

            image:
                card.dataset.image,

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


/* LOAD PRODUCTS */

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


/* CREATE PRODUCT CARD */

function createProductCard(product) {

    const productCard =
        document.createElement("div");


    productCard.classList.add(
        "product-card",
        "user-product"
    );


    productCard.dataset.category =
        product.category;

    productCard.dataset.condition =
        product.condition || "Good";

    productCard.dataset.seller =
        product.seller || "Student Seller";

    productCard.dataset.contact =
        product.contact || "";

    productCard.dataset.image =
        product.image || "📦";


    productCard.innerHTML = `

        <div class="product-image">
            ${product.image || "📦"}
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


    /* ATTACH VIEW DETAILS */

    attachViewDetailsEvent(
        productCard
    );

}


/* PRODUCT DETAILS ELEMENTS */

const detailsSection =
    document.getElementById("details");

const detailsImage =
    document.getElementById("detailsImage");

const detailsCategory =
    document.getElementById("detailsCategory");

const detailsName =
    document.getElementById("detailsName");

const detailsPrice =
    document.getElementById("detailsPrice");

const detailsCondition =
    document.getElementById("detailsCondition");

const detailsDescription =
    document.getElementById("detailsDescription");

const detailsSeller =
    document.getElementById("detailsSeller");


/* SHOW PRODUCT DETAILS */

function showProductDetails(card) {

    const productName =
        card.querySelector(
            "h3"
        ).textContent.trim();

    const productCategory =
        card.dataset.category;

    const productPrice =
        card.querySelector(
            ".product-bottom strong"
        ).textContent.trim();

    const productDescription =
        card.querySelector(
            ".product-info p"
        ).textContent.trim();

    const productCondition =
        card.dataset.condition ||
        "Good";

    const productSeller =
        card.dataset.seller ||
        "Student Seller";

    const productImage =
        card.dataset.image ||
        "📦";


    /* UPDATE DETAILS */

    detailsImage.textContent =
        productImage;

    detailsCategory.textContent =
        productCategory;

    detailsName.textContent =
        productName;

    detailsPrice.textContent =
        productPrice;

    detailsCondition.textContent =
        productCondition;

    detailsDescription.textContent =
        productDescription;

    detailsSeller.textContent =
        productSeller;


    /* SCROLL TO DETAILS */

    detailsSection.scrollIntoView({
        behavior: "smooth"
    });

}


/* ATTACH VIEW DETAILS EVENT */

function attachViewDetailsEvent(card) {

    const button =
        card.querySelector(
            ".product-bottom button"
        );


    if (!button) {
        return;
    }


    button.onclick = function() {

        showProductDetails(card);

    };

}


/* ATTACH EVENTS TO EXISTING PRODUCTS */

function attachViewDetailsEvents() {

    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    cards.forEach(function(card) {

        attachViewDetailsEvent(card);

    });

}


/* LOAD SAVED PRODUCTS */

loadProducts();


/* ATTACH EXISTING PRODUCT EVENTS */

attachViewDetailsEvents();


/* INITIAL PRODUCT COUNT */

updateProductCount();