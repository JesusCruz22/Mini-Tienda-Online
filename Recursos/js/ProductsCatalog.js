import { getDatabase, ref, onValue, query, orderByChild } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js';
import { main, productsContainer, mainSectionLoader } from './MenuNavigation.js';

export {
    selectedProductsList,
    selectedProductsQuantities,
    orderBySelect,
    FormatPrice,
    SetSelectedProducts,
    AddProductsCards
}

// variables
let selectedProduct;
let maxProductQuantity;
let lastButtonText = '';
let buttonTextMouseEnter = 'Añadir al Carro <img class="add-product" src="Recursos/imagenes/WEBP/AñadirAlCarro.webp" alt="" />';
let buttonTextMouseOut = 'Añadir al Carro <img class="add-product" src="Recursos/imagenes/WEBP/AñadirAlCarro.webp" alt="" />';


/* ---------------------------------------------------------- */
// Database reference
const database = getDatabase();

/* ---------------------------------------------------------- */
// Array to save list of products from database
const productsList = [];
// Array to save selected products
const selectedProductsList = [];
// Array to save quantities to selected products
const selectedProductsQuantities = [];

/* ---------------------------------------------------------- */
// DOM Pop Up Elements references
const popUpBackground = document.querySelector('#pop-up-background');
const popUpCloseArea = document.querySelector('#pop-up-close-area');
const productPopUp = document.querySelector('#product-pop-up');
const popUpImage = document.querySelector('#pop-up-image');
const popUpName = document.querySelector('#pop-up-name');
const popUpPrice = document.querySelector('#pop-up-price');
const popUpStock = document.querySelector('#pop-up-stock');
const popUpDescription = document.querySelector('#pop-up-description');
const popUpProductQuantity = document.querySelector('#pop-up-product-quantity');
const increaseQuantityButton = document.querySelector('#increase-quantity-button');
const decreaseQuantityButton = document.querySelector('#decrease-quantity-button');
const popUpAddProductButton = document.querySelector('#pop-up-add-product-button');
const popUpCloseButton = document.querySelector('#pop-up-close-button');
// Order by select reference
const orderBySelect = document.getElementById('order-by-select');

/* ---------------------------------------------------------- */
// DOM Events

// On load window event
window.addEventListener('load', () => {
    GetProducts();
});

// Pop Up Buttons Events
// Quantity:
increaseQuantityButton.addEventListener('click', () => {
    IncreaseProductQuantity();
});
decreaseQuantityButton.addEventListener('click', () => {
    DecreaseProductQuantity();
});


// Add Product
popUpAddProductButton.addEventListener('click', () => {
    AddProductProcess();
});
popUpAddProductButton.addEventListener('mouseenter', () => {
    SetEnterAddButtonText();
});
popUpAddProductButton.addEventListener('mouseout', () => {
    SetOutAddButtonText();
});


// Close Pop Up
popUpCloseArea.addEventListener('click', () => {
    HideProductPopUp();
});
popUpCloseButton.addEventListener('click', () => {
    HideProductPopUp();
});

// OrderBySelect event
orderBySelect.onchange = () => {
    OrderProductsCatalog(orderBySelect.value);
}


/* ---------------------------------------------------------- */
/* FUNCTIONS */

// Function to get all products from database
function GetProducts() {
    ShowProductsLoader(true);

    onValue(ref(database, 'Products'), (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            let childData = childSnapshot.val();
            productsList.push(childData);
        });

        GetSelectedProducts();
        AddProductsCards();
        ShowProductsLoader(false);
    });
}

// Function to get selected products from local storage
function GetSelectedProducts() {
    let selectedProductsSaved = JSON.parse(localStorage.getItem('selectedProductsList'));
    let productsQuantitiesSaved = JSON.parse(localStorage.getItem('selectedProductsQuantities'));

    if (selectedProductsSaved !== null) {
        selectedProductsSaved.forEach(product => {
            selectedProductsList.push(product);
        });
    }

    if (productsQuantitiesSaved !== null) {
        productsQuantitiesSaved.forEach(quantity => {
            selectedProductsQuantities.push(quantity);
        });
    }

}

// Function to set selected product into local storage
function SetSelectedProducts() {
    localStorage.setItem('selectedProductsList', JSON.stringify(selectedProductsList));
    localStorage.setItem('selectedProductsQuantities', JSON.stringify(selectedProductsQuantities));
}

// Function to create products cards with products list
function AddProductsCards() {
    productsContainer.innerHTML = '';

    productsList.forEach(product => {
        selectedProduct = product;

        let productIndex = productsList.indexOf(product);
        const productCard = document.createElement('article');

        productCard.id = productIndex;
        productCard.classList.add('product-card');

        productCard.addEventListener('click', () => {
            ShowProductPopUp(productIndex);
        });

        productCard.innerHTML =
            `<div id="image-loader-${productIndex}" class="loader">
                '<div></div><div></div><div></div><div></div>
            </div>
            <img id="image-${productIndex}" class="product-image" src="${product.imageURL}" alt="" />
            <span id="product-quantity-${productIndex}" class="product-quantity">1</span>
            <span class="product-name">${product.name}</span>
            <span class="product-price">${FormatPrice(product.price)}</span>
            <div id="add-product-button-${productIndex}" class="add-product-button">
                Añadir al Carro 
                <img class="add-product" src="Recursos/imagenes/WEBP/AñadirAlCarro.webp" alt=""/>
            </div>`;

        productsContainer.appendChild(productCard);
        SetProductCardStyle(IsProductSelected(), productIndex);
        ShowImageLoader(productIndex);

    });
}

// Get order data by one of the options and set products catalog view
function OrderProductsCatalog(option) {
    if (option == 'Más Barato') {
        OrderBy('price', false);
        return;
    }
    if (option == 'Más Caro') {
        OrderBy('price', true);
        return
    }
    if (option == 'A - Z') {
        OrderBy('name', false);
        return
    }
    if (option == 'Z - A') {
        OrderBy('name', true);
        return
    }
}

// Get order data by one of the options and set products catalog view
function OrderBy(property, reverse) {
    productsList.splice(0, productsList.length);
    ShowProductsLoader(true);

    onValue(
        query(ref(database, 'Products/'), orderByChild(property)), (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                let childData = childSnapshot.val();
                productsList.push(childData);
            });

            if (reverse) productsList.reverse();
            AddProductsCards();
            ShowProductsLoader(false);
        });
}

// Function to show or hide loader element on request products from database
function ShowProductsLoader(show) {
    if (show) {
        mainSectionLoader.style.display = 'inline-block';
        main.style.height = '100vh';
    } else {
        mainSectionLoader.style.display = 'none';
        main.style.height = 'fit-content';
    }
}

// Function to show or hide products card image loader on load product image
function ShowImageLoader(productIndex) {
    const image = document.getElementById('image-' + productIndex);
    image.style.display = 'none';

    const imageLoader = document.getElementById('image-loader-' + productIndex);
    imageLoader.style.display = 'flex';

    image.onload = () => {
        image.style.display = 'block';
        imageLoader.style.display = 'none';
    }
}

// Function to show or hide products card image loader on load product image
function ShowPopUpImageLoader() {
    popUpImage.style.display = 'none';

    const popUpImageLoader = document.getElementById('pop-up-image-loader');
    popUpImageLoader.style.display = 'flex';

    popUpImage.onload = () => {
        popUpImage.style.display = 'block';
        popUpImageLoader.style.display = 'none';
    }
}

// Function to set data on product pop up
function ShowProductPopUp(productIndex) {
    selectedProduct = productsList[productIndex];

    let selectedProductIndex = GetSelectedProductIndex();
    let selectedProductQuantity = selectedProductsQuantities[selectedProductIndex];

    let productImageURL = selectedProduct.imageURL;
    let productName = selectedProduct.name;
    let productPrice = selectedProduct.price;
    let productStock = selectedProduct.stock;
    let productDescription = selectedProduct.description;

    popUpImage.src = productImageURL;
    popUpName.innerHTML = productName;
    popUpPrice.innerHTML = `$${productPrice}`;
    popUpStock.innerHTML = `Stock: ${productStock}`;
    popUpDescription.innerHTML = productDescription;

    ShowPopUpImageLoader();
    popUpBackground.style.display = 'flex';
    maxProductQuantity = productStock;

    SetAddButtonStyle(IsProductSelected());
    if (IsProductSelected()) popUpProductQuantity.value = selectedProductQuantity;
    popUpAddProductButton.innerHTML = buttonTextMouseOut;

    popUpBackground.animate([
        { opacity: '0' },
        { opacity: '1' }
    ], {
        duration: 250,
        fill: 'forwards'
    });

    productPopUp.animate([
        { transform: 'scale(0)' },
        { transform: 'scale(1)' }
    ], {
        duration: 350,
        fill: 'forwards'
    });
}

// Function to hide product pop up
function HideProductPopUp() {
    popUpProductQuantity.value = '';

    const popUpBackgroundAnimation = popUpBackground.animate([
        { opacity: '1' },
        { opacity: '0' }
    ], {
        duration: 350,
        fill: 'forwards'
    });

    popUpBackgroundAnimation.onfinish = function () {
        popUpBackground.style.display = 'none';
    }

    productPopUp.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(0)' }
    ], {
        duration: 250,
        fill: 'forwards'
    });
}

// Function to increase product quantity
function IncreaseProductQuantity() {
    let productQuantity = Number(popUpProductQuantity.value);

    if (productQuantity < maxProductQuantity) {
        productQuantity++;
        popUpProductQuantity.value = productQuantity;
        if (IsProductSelected()) AddProduct();
    }

}

// Function to decrease product quantity
function DecreaseProductQuantity() {
    let productQuantity = Number(popUpProductQuantity.value);

    if (productQuantity > 1) {
        productQuantity--;
        popUpProductQuantity.value = productQuantity;
        if (IsProductSelected()) AddProduct();
    } else {
        popUpProductQuantity.value = '';
    }

}

// Function to check if quantity input is empty
function AddProductProcess() {
    if (popUpProductQuantity.value != '') {
        AddProduct();
    } else {
        popUpProductQuantity.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.25)' },
            { transform: 'scale(1)' }
        ], {
            duration: 250,
            iterations: 1
        });
    }
}

// Function to save selected products into a list
function AddProduct() {
    let productQuantity = Number(popUpProductQuantity.value);
    let selectedProductIndex = productsList.indexOf(selectedProduct);

    if (!IsProductSelected()) {
        selectedProductsList.push(selectedProduct);
        selectedProductsQuantities.push(productQuantity);
        SetAddButtonStyle(true);
        SetProductCardStyle(true, selectedProductIndex);
    } else {
        let addedProductIndex = GetSelectedProductIndex();

        selectedProductsList.splice(addedProductIndex, 1);
        selectedProductsQuantities.splice(addedProductIndex, 1);
        SetAddButtonStyle(false);
        SetProductCardStyle(false, selectedProductIndex);
    }

    popUpAddProductButton.innerHTML = buttonTextMouseEnter;
    SetSelectedProducts();
}

// Function to set selected product quantity into the product pop up
function GetSelectedProductIndex() {
    let selectedProductIndex = 0;

    selectedProductsList.forEach(product => {
        if (JSON.stringify(selectedProduct) === JSON.stringify(product)) {
            selectedProductIndex = selectedProductsList.indexOf(product);
        }
    });

    return selectedProductIndex;
}

// Function to change add product button style from pop up
function SetAddButtonStyle(isAddedStyle) {
    if (isAddedStyle) {
        buttonTextMouseEnter = 'Eliminar <img class="add-product" src="Recursos/imagenes/WEBP/quitarActivo.webp" alt="" />';
        buttonTextMouseOut = 'En el Carro <img class="add-product" src="Recursos/imagenes/WEBP/IconoCarritoCompras-Activo.webp" alt="" />';
        popUpAddProductButton.classList.add('pop-up-remove-product-button');
    } else {
        buttonTextMouseEnter = 'Añadir al Carro <img class="add-product" src="Recursos/imagenes/WEBP/AñadirAlCarro.webp" alt="" />';
        buttonTextMouseOut = 'Añadir al Carro <img class="add-product" src="Recursos/imagenes/WEBP/AñadirAlCarro.webp" alt="" />';
        popUpAddProductButton.classList.remove('pop-up-remove-product-button');
    }
}

// Function to change product card style
function SetProductCardStyle(isAddedStyle, addedProductIndex) {
    let selectedProductIndex = GetSelectedProductIndex();
    let selectedProductQuantity = selectedProductsQuantities[selectedProductIndex];

    const addedProductQuantity = document.getElementById('product-quantity-' + addedProductIndex);
    const addedProductCard = document.getElementById(addedProductIndex);
    const addedCardButton = document.getElementById('add-product-button-' + addedProductIndex);

    if (isAddedStyle) {
        addedProductQuantity.style.opacity = '1';
        addedProductQuantity.innerHTML = selectedProductQuantity;
        addedProductCard.classList.add('added-product-card');
        addedCardButton.classList.add('added-product-button');
        addedCardButton.innerHTML = 'En el Carro <img class="add-product" src="Recursos/imagenes/WEBP/IconoCarritoCompras-Activo.webp" alt=""/>';
    } else {
        addedProductQuantity.style.opacity = '0';
        addedProductQuantity.innerHTML = '';
        addedProductCard.classList.remove('added-product-card');
        addedCardButton.classList.remove('added-product-button');
        addedCardButton.innerHTML = 'Añadir al Carro <img class="add-product" src="Recursos/imagenes/WEBP/AñadirAlCarro.webp" alt=""/>';
    }

}

// Function to check if selected product is into selectedProductsList
function IsProductSelected() {
    let isProductSelected = false;

    selectedProductsList.forEach(product => {
        if (JSON.stringify(selectedProduct) === JSON.stringify(product)) {
            isProductSelected = true;
        }
    });

    return isProductSelected;
}

// Function to change text of the add product button from pop up when user pointer is over
function SetEnterAddButtonText() {
    if (lastButtonText != buttonTextMouseEnter) {
        popUpAddProductButton.innerHTML = buttonTextMouseEnter;
        lastButtonText = buttonTextMouseEnter;
    }
}

// Function to change text of the add product button from pop up when user pointer is over
function SetOutAddButtonText() {
    if (lastButtonText != buttonTextMouseOut) {
        popUpAddProductButton.innerHTML = buttonTextMouseOut;
        lastButtonText = buttonTextMouseOut;
    }
}

// Set price format
function FormatPrice(number) {
    return '$' + new Intl.NumberFormat().format(number) + ' CLP';
};


