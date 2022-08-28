import { getDatabase, ref, set, child } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js';
import { buyContainer, mainSectionLoader } from './MenuNavigation.js';
import { selectedProductsList, selectedProductsQuantities, FormatPrice, SetSelectedProducts } from './ProductsCatalog.js';

export {
    SetBuyProcess
}

let totalPrice = 0;
let payMethod = '';
let buyProductsList = [];

const database = getDatabase();

// Check if selectedProducts isn't empty to start buy process
function SetBuyProcess() {
    if (selectedProductsList.length > 0) {
        SetBuy();
    } else {
        buyContainer.innerHTML = `<div class="message">Elige los productos que quieres comprar<br>(･_･)</div>`;
    }

}

// Build buy section
function SetBuy() {
    SetProductTable();
    SetPaySection();
}

// Create and fill resume products table
function SetProductTable() {
    // Clean buy container and buyProductsList to show and set new information
    buyContainer.innerHTML = '';
    buyProductsList = [];

    // Create a new table stylized
    const productsTable = document.createElement('table');
    productsTable.classList.add('products-table');

    // Set Table header
    productsTable.innerHTML =
        `<caption>Productos en carrito</caption>
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Precio Total</th>
            </tr>
        </thead>
        <tbody id="product-table-body">
        </tbody>`;

    buyContainer.appendChild(productsTable);

    // Set Table body / Fill table
    const productTableBody = document.getElementById('product-table-body');

    selectedProductsList.forEach(selectedProduct => {
        const productIndex = selectedProductsList.indexOf(selectedProduct);
        const productTableElement = document.createElement('tr');

        let quantity = selectedProductsQuantities[productIndex];
        let productsPrice = selectedProduct.price * quantity;
        totalPrice += productsPrice;

        productTableElement.innerHTML =
            `<td>${selectedProduct.name}</td>
            <td>${quantity}</td>
            <td>${FormatPrice(selectedProduct.price)}</td>
            <td>${FormatPrice(productsPrice)}</td>`;

        productTableBody.appendChild(productTableElement);
        SetBuyProductsList(selectedProduct, quantity, productsPrice);
    });

    // Set Table foot
    const productTableFoot = document.createElement('tfoot');
    productTableFoot.innerHTML =
        `<tr>
        <td class="empty-cell"></td>
        <td class="empty-cell"></td>
        <th>TOTAL</th>
        <td>${FormatPrice(totalPrice)}</td>
    </tr>`;

    productsTable.appendChild(productTableFoot);
}

// Create and Set pay section
function SetPaySection() {
    // Set pay method buttons and pay button
    const payMethodsButtons = document.createElement('section');
    payMethodsButtons.classList.add('pay-section');

    payMethodsButtons.innerHTML =
        `<label>Selecciona un metodo de pago:</label>
        <section class="pay-methods-buttons">
            <button id="cash-method-button">
                Efectivo
                <img class="icon" src="Recursos/imagenes/WEBP/cash-method-icon.webp">
            </button>
            <button id="card-method-button"> 
                Debito / Credito
                <img class="icon" src="Recursos/imagenes/WEBP/card-method-icon.webp">
            </button>
        </section>
        <button id="pay-button" class="pay-button">Pagar</button>`;

    buyContainer.appendChild(payMethodsButtons);
    SetPaySectionButtons();

    // Let a message to user
    const message = document.createElement('span');
    message.classList.add('info');
    message.innerHTML = 'Simulación de compra, no te pediremos ningún dato (ᵔᵕᵔ)';
    buyContainer.appendChild(message);
}

// Set style and event for pay methods button
function SetPaySectionButtons() {
    const payButton = document.getElementById('pay-button');
    payButton.addEventListener('click', () => {
        SetPayButton();
    });

    const cashMethodButton = document.getElementById('cash-method-button');
    const cardMethodButton = document.getElementById('card-method-button');

    cashMethodButton.addEventListener('click', () => {
        payMethod = 'Efectivo';
        cashMethodButton.classList.add('method-button-selected');
        cardMethodButton.classList.remove('method-button-selected');
        if (payButton.style.display != 'flex') payButton.style.display = 'inline-block';
    });

    cardMethodButton.addEventListener('click', () => {
        payMethod = 'Debito/Credito';
        cashMethodButton.classList.remove('method-button-selected');
        cardMethodButton.classList.add('method-button-selected');
        if (payButton.style.display != 'flex') payButton.style.display = 'inline-block';
    });
}

// Set style and event for payButton
function SetPayButton() {
    let timeoutTime = 5000;

    mainSectionLoader.style.display = 'inline-block';
    buyContainer.innerHTML = '<div class="info">Procesando pago...</div>';

    SaveBuy();

    setTimeout(() => {
        buyContainer.innerHTML =
            `<div class="info">COMPRA EXITOSA!!!</div>
            <img class="success-buy-icon" src="Recursos/imagenes/WEBP/success-buy-icon.webp" alt="">
            <div class="info">Gracias por tu preferencia<br>(ᵔ▽ᵔ)</div>`;
        buyContainer.style.display = 'flex';

        mainSectionLoader.style.display = 'none';


    }, timeoutTime);
}

// Fill array to save data of selected products to buy
function SetBuyProductsList(selectedProduct, quantity, productsPrice) {
    const productBuyData = {
        name: selectedProduct.name,
        quantity: quantity,
        unitPrice: Number(selectedProduct.price),
        productsPrice: productsPrice
    }

    buyProductsList.push(productBuyData);
}

// Save buy data into the database
function SaveBuy() {
    const date = new Date();
    const purchaseData = {
        buyProductsList: buyProductsList,
        totalPrice: totalPrice,
        payMethod: payMethod
    }

    set(child(ref(database), 'Purchases/' + date), {
        purchaseData: purchaseData
    })
        .then(() => {
            selectedProductsList.splice(0, selectedProductsList.length);
            selectedProductsQuantities.splice(0, selectedProductsQuantities.length);
            SetSelectedProducts();
        })

        .catch((error) => {
            console.error(error);
        });
}