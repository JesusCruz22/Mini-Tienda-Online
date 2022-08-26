import { getDatabase, ref, set, child, get, remove }
  from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js';

import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL, deleteObject }
  from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js';

// Variables to use
let fileName;
let imageToUpload;

// Database and Storage references
const database = getDatabase();
const storage = getStorage();

// DOM Elements references
const outputImage = document.querySelector('#product-image');
const productInfo = document.querySelector('#product-info');
const productsButtonsSection = document.querySelector('#products-buttons-section');
const productFormLoader = document.querySelector('#product-form-loader');

// DOM Inputs references
const inputImage = document.querySelector('#input-image');
const inputName = document.querySelector('#input-name');
const inputPrice = document.querySelector('#input-price');
const inputStock = document.querySelector('#input-stock');
const inputDescription = document.querySelector('#input-description');

// DOM Buttons references
const setButton = document.querySelector('#set-button');
const getButton = document.querySelector('#get-button');
const removeButton = document.querySelector('#remove-button');

/* BUTTONS EVENTS */
setButton.onclick = SetProductProcess;
getButton.onclick = GetProductProcess;
removeButton.onclick = RemoveProductProcess;


// Event listener to input type file
inputImage.onchange = () => {
  const [file] = inputImage.files
  if (file) {
    fileName = file.name;
    imageToUpload = file;
    outputImage.src = URL.createObjectURL(file);
    productInfo.innerHTML = '';
  }
}

/* FUNCTIONS */

// Process to set or update product data
function SetProductProcess() {
  if (imageToUpload && inputName.value != '') UploadImage();
  else productInfo.innerHTML = 'Ingresá IMAGÉN y NOMBRE del producto.';
  AnimateProductInfo();
}

// Process to get product data
function GetProductProcess() {
  if (inputName.value != '') GetProduct();
  else productInfo.innerHTML = 'Ingresá NOMBRE del producto.';
  AnimateProductInfo();
}

// Process to delete or remove a product data
function RemoveProductProcess() {
  if (inputName.value != '') RemoveProduct();
  else productInfo.innerHTML = 'Ingresá NOMBRE del producto.';
  AnimateProductInfo();
}

// Function to upload image
function UploadImage() {
  ShowProductLoader(true);

  const metaData = { contentType: imageToUpload.type };
  const storageRef = sRef(storage, 'Images/' + fileName);
  const uploadTask = uploadBytesResumable(storageRef, imageToUpload, metaData);

  uploadTask.on('state-changed', (snapshot) => {
    let uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    productInfo.innerHTML = uploadProgress + '%';
    AnimateProductInfo();
  },

    (error) => {
      console.error(error);
      productInfo.innerHTML = 'ERROR AL SUBIR IMAGÉN (҂◡_◡)';
      AnimateProductInfo();
      ShowProductLoader(false);
    },

    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
        SetProduct(downloadURL);
      });
    }
  );
}

// Function to delete or remove product image from Firebase storage
function DeleteImage(imageName) {
  deleteObject(sRef(storage, 'Images/' + imageName)).then(() => {
    console.log('Imagen del producto eliminada.');
  })
    .catch((error) => {
      console.error(error);
    });
}

// Function to insert data in database
function SetProduct(downloadURL) {
  set(child(ref(database), 'Products/' + inputName.value), {
    imageName: fileName,
    imageURL: downloadURL,
    name: inputName.value,
    price: inputPrice.value,
    stock: inputStock.value,
    description: inputDescription.value
  })

    .then(() => {
      productInfo.innerHTML = 'PRODUCTO REGISTRADO!!!';
      ShowProductLoader(false);
      AnimateProductInfo();
    })

    .catch((error) => {
      productInfo.innerHTML = 'ERROR AL REGISTRAR PRODUCTO (҂◡_◡)';
      console.error(error);
      ShowProductLoader(false);
      AnimateProductInfo();
    });
}

// Function to get product data
function GetProduct() {
  productInfo.innerHTML = '';
  ShowProductLoader(true);

  get(ref(database, 'Products/' + inputName.value)).then((snapshot) => {
    if (snapshot.exists()) {
      fileName = snapshot.val().imageName;
      outputImage.src = snapshot.val().imageURL;
      inputPrice.value = snapshot.val().price;
      inputStock.value = snapshot.val().stock;
      inputDescription.value = snapshot.val().description;

      ShowProductLoader(false);
    } else {
      productInfo.innerHTML = 'NO SE ENCONTRO EL PRODUCTO';
      ClearProductInputs();
      ShowProductLoader(false);
      AnimateProductInfo();
    }
  }).catch((error) => {
    productInfo.innerHTML = 'ERROR AL BUSCAR EL PRODUCTO (҂◡_◡)';
    console.error(error);
    ShowProductLoader(false);
    AnimateProductInfo();
  });
}

// Function to delete or remove a product with its name
function RemoveProduct() {
  GetProduct();
  ShowProductLoader(true);

  remove(ref(database, 'Products/' + inputName.value))
    .then(() => {
      productInfo.innerHTML = 'PRODUCTO ELIMINADO';
      ClearProductInputs();
      ShowProductLoader(false);
      AnimateProductInfo();
      DeleteImage(fileName);
    })
    .catch((error) => {
      productInfo.innerHTML = 'ERROR AL ELIMINAR EL PRODUCTO (҂◡_◡)';
      console.error(error);
      ShowProductLoader(false);
      AnimateProductInfo();
    });
}

// Function to controll loading view
function ShowProductLoader(show) {
  if (show) {
    // Hide DOM Elements
    outputImage.style.display = 'none';
    productsButtonsSection.style.display = 'none';
    // Show loader
    productFormLoader.style.display = 'inline-block';
  }
  else {
    // Show DOM Elements
    outputImage.style.display = 'block';
    productsButtonsSection.style.display = 'flex';
    // Show loader
    productFormLoader.style.display = 'none';
  }
}

// Function to clear all inputs elements
function ClearProductInputs() {
  outputImage.src = '';
  inputPrice.value = '';
  inputStock.value = '';
  inputDescription.value = '';
}

function AnimateProductInfo() {
  productInfo.animate([
    // fotogramas clave
    { transform: 'scale(1)' },
    { transform: 'scale(1.1)' },
    { transform: 'scale(1)' }
  ], {
    // opciones de sincronización
    duration: 250,
    iterations: 1
  });
}