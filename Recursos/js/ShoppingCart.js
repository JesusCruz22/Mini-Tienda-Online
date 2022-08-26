import { cartContainer } from './MenuNavigation.js';
import { selectedProductsList, selectedProductsQuantities, FormatPrice, SetSelectedProducts } from './ProductsCatalog.js';

export {
    SetShoppingCartProcess
}

// Function to check if the cart is empty
function SetShoppingCartProcess() {
    if (selectedProductsList.length > 0) {
        SetShoppingCart();
    } else {
        cartContainer.innerHTML = '<span class="message">El Carro esta vacio<br>(⊙.☉)</span>';
    }
}

function SetShoppingCart() {
    let totalPrice = 0;

    cartContainer.innerHTML =
    `<div id="total-price-section" class="total-price-section">
        Total
    </div>`;

    selectedProductsList.forEach(selectedProduct => {
        let productIndex = selectedProductsList.indexOf(selectedProduct);
        let productQuantity = selectedProductsQuantities[productIndex];

        const cartProduct = document.createElement('article');
        cartProduct.id = productIndex;
        cartProduct.classList.add('cart-product');

        cartProduct.innerHTML =
            `<div id="cart-image-loader-${productIndex}" class="loader">
                '<div></div><div></div><div></div><div></div>
            </div>
            <img id="cart-image-${productIndex}" class="cart-product-image" src="${selectedProduct.imageURL}" alt="" />
            <div class="cart-product-description-group">
                <span class="cart-product-name">${selectedProduct.name}</span>
                <span class="cart-product-description">${selectedProduct.description}</span>
            </div>
            <div class="cart-product-details-group">
                <span class="cart-product-price">${FormatPrice(selectedProduct.price)}</span>
                 <div class="product-quantity-group">
                    <button id="decrease-quantity-button-${productIndex}">-</button>
                    <input id="cart-product-quantity-${productIndex}" class="cart-product-quantity" type="number" placeholder="Cantidad"
                        value="${productQuantity}" readonly>
                    <button id="increase-quantity-button-${productIndex}">+</button>
                </div>
                <button id="remove-cart-product-button-${productIndex}" class="remove-cart-product-button">
                    Eliminar del Carro
                    <img src="Recursos/imagenes/WEBP/quitarActivo.webp" alt="" />
                </button>
            </div>`;

        cartContainer.appendChild(cartProduct);

        SetCartProductButtons(productIndex);
        ShowImageLoader(productIndex);

        totalPrice += selectedProduct.price * productQuantity;
    });

    SetCleanCartButton();
    SetTotalPrice(totalPrice);
}

// Function to show or hide loader of products images on the cart
function ShowImageLoader(productIndex) {
    const image = document.getElementById('cart-image-' + productIndex);
    image.style.display = 'none';

    const imageLoader = document.getElementById('cart-image-loader-' + productIndex);
    imageLoader.style.display = 'flex';

    image.onload = () => {
        image.style.display = 'block';
        imageLoader.style.display = 'none';
    }
}

// Function to add events to buttons in cart section
function SetCartProductButtons(productIndex) {
    const increaseQuantityButton = document.getElementById('increase-quantity-button-' + productIndex);
    increaseQuantityButton.addEventListener('click', () => {
        IncreaseCartProductQuantity(productIndex);
    });

    const decreaseQuantityButton = document.getElementById('decrease-quantity-button-' + productIndex);
    decreaseQuantityButton.addEventListener('click', () => {
        DecreaseCartProductQuantity(productIndex);
    });

    const removeProductButton = document.getElementById('remove-cart-product-button-' + productIndex);
    removeProductButton.addEventListener('click', () => {
        RemoveCartProduct(productIndex);
    });
}

// Function to increase the product quantity on the cart
function IncreaseCartProductQuantity(productIndex) {
    const cartProductQuantity = document.getElementById('cart-product-quantity-' + productIndex);
    const maxQuantity = Number(selectedProductsList[productIndex].stock);

    let quantity = Number(cartProductQuantity.value);
    if (quantity < maxQuantity) {
        quantity++;
    }

    selectedProductsQuantities[productIndex] = quantity
    cartProductQuantity.value = quantity;

    SetSelectedProducts();
    SetShoppingCart();
}

// Function to decrease the product quantity on the cart
function DecreaseCartProductQuantity(productIndex) {
    const cartProductQuantity = document.getElementById('cart-product-quantity-' + productIndex);

    let quantity = Number(cartProductQuantity.value);
    if (quantity > 1) {
        quantity--;
    }

    selectedProductsQuantities[productIndex] = quantity;
    cartProductQuantity.value = quantity;

    SetSelectedProducts();
    SetShoppingCart();
}

// Function to remove product form selectedProductsList
function RemoveCartProduct(productIndex) {
    selectedProductsList.splice(productIndex, 1);
    selectedProductsQuantities.splice(productIndex, 1);

    SetShoppingCartProcess();
    SetSelectedProducts();
}

// Function to calculate and show the total price of the cart
function SetTotalPrice(totalPrice) {
    const totalPriceSection = document.getElementById('total-price-section');
    totalPriceSection.innerHTML =
        `TOTAL | ${FormatPrice(totalPrice)}`;
}

function SetCleanCartButton() {
    const cleanCartButton = document.createElement('button');
    cleanCartButton.innerHTML = 
        `Vaciar el Carro
        <img src="Recursos/imagenes/WEBP/IconoCarritoCompras.webp" alt="" />`;
    cleanCartButton.id = 'clean-cart-button';
    cleanCartButton.classList.add('clean-cart-button');

    cleanCartButton.addEventListener('click', () => {
        CleanCart();
    });

    cartContainer.appendChild(cleanCartButton);
}

// Function to clear the selectedProductsList and show the cart empty
function CleanCart() {
    selectedProductsList.splice(0, selectedProductsList.length);
    selectedProductsQuantities.splice(0, selectedProductsQuantities.length);
    SetShoppingCartProcess();
    SetSelectedProducts();
}