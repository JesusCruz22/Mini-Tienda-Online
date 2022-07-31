var productosSeleccionados = new Array();
var cantidades = new Array();
var cantidadProductos = 12;

function llenarProductosSeleccionados() {
    var txtJsp = document.getElementById("txtJsp").value;
    productosSeleccionados = [...txtJsp];
    console.log(productosSeleccionados);

    for (var i = 0; i < productosSeleccionados.length; i++) {
        if (i !== productosSeleccionados.length - 1) {
            if (productosSeleccionados[i] === "-" && productosSeleccionados[i + 1] !== "-") {
                if (productosSeleccionados[i + 2] !== "-") {
                    productosSeleccionados[i + 1] = productosSeleccionados[i + 1] + productosSeleccionados[i + 2];
                    productosSeleccionados.splice(i + 2, 1);
                    productosSeleccionados.splice(i, 1);
                }
            } else if (productosSeleccionados[i + 1] === "-") {
                productosSeleccionados.splice(i + 1, 1);
            } else if (productosSeleccionados[i + 1] !== "-") {
                productosSeleccionados[i] = productosSeleccionados[i] + productosSeleccionados[i + 1];
                productosSeleccionados.splice(i + 1, 1);
            } else {
                break;
            }
        }
    }

    for (var i = 0; i < productosSeleccionados.length; i++) {
        if (productosSeleccionados[i] === "-") {
            productosSeleccionados.splice(i, 1);
        }
    }

    var txtJsp2 = document.getElementById("txtJsp2").value;
    cantidades = [...txtJsp2];
    console.log(cantidades);

    for (var i = 0; i < cantidades.length; i++) {
        if (i !== cantidades.length - 1) {
            if (cantidades[i] === "-" && cantidades[i + 1] !== "-") {
                if (cantidades[i + 2] !== "-") {
                    cantidades[i + 1] = cantidades[i + 1] + cantidades[i + 2];
                    cantidades.splice(i + 2, 1);
                    cantidadescantidades.splice(i, 1);
                }
            } else if (cantidades[i + 1] === "-") {
                cantidades.splice(i + 1, 1);
            } else if (cantidades[i + 1] !== "-") {
                cantidades[i] = cantidades[i] + cantidades[i + 1];
                cantidades.splice(i + 1, 1);
            } else {
                break;
            }
        }
    }

    for (var i = 0; i < cantidades.length; i++) {
        if (cantidades[i] === "-") {
            cantidades.splice(i, 1);
        }
    }
}

function getProductosSeleccionados() {
    llenarProductosSeleccionados();

    for (var i = 0; i <= cantidadProductos; i++) {
        var id = (i + 1).toString();
        var id2 = id + "cp";
        if (productosSeleccionados.includes(id)) {
            document.getElementById(id).src = "Recursos/imagenes/Añadido.png";
            document.getElementById(id2).className = "cuadroProductoSeleccionado";
            if (id === document.getElementById("id")) {
                document.getElementById("btnAñadir").innerHTML = "<label>Quitar del</label><label class='bold'> Carro</label>";
            }
        }
    }
}

function setOverImageAñadir(id) {
    if (!productosSeleccionados.includes(id)) {
        document.getElementById(id).src = "Recursos/imagenes/AñadirAlCarroActivo.png";
    } else if (productosSeleccionados.includes(id)) {
        document.getElementById(id).src = "Recursos/imagenes/quitarDelCarro.png";
    }
}

function setOverImageQuitar(id) {
    var id2 = id + "cp";
    document.getElementById(id).src = "Recursos/imagenes/quitarDelCarro.png";
    document.getElementById(id2).className = "productoCarroEliminado";
}

function setOutImageAñadir(id) {
    if (!productosSeleccionados.includes(id)) {
        document.getElementById(id).src = "Recursos/imagenes/AñadirAlCarro.png";
    } else if (productosSeleccionados.includes(id)) {
        document.getElementById(id).src = "Recursos/imagenes/Añadido.png";
    }
}

function setOutImageQuitar(id) {
    var id2 = id + "cp";
    document.getElementById(id).src = "Recursos/imagenes/quitarActivo.png";
    document.getElementById(id2).className = "productoCarro";
}

function clickAñadir(id) {
    var id2 = id + "cp";
    if (!productosSeleccionados.includes(id)) {
        document.getElementById(id).src = "Recursos/imagenes/Añadido.png";
        document.getElementById(id2).className = "cuadroProductoSeleccionado";
        productosSeleccionados.push(id);
    } else if (productosSeleccionados.includes(id)) {
        document.getElementById(id).src = "Recursos/imagenes/AñadirAlCarro.png";
        document.getElementById(id2).className = "cuadroProducto";
        productosSeleccionados.splice(productosSeleccionados.indexOf(id), 1);
    }
}

function clickQuitar(id) {
    var id2 = id + "cp";
    var padre = document.getElementById("carroDeCompras");
    var hijo = document.getElementById(id2);
    if (productosSeleccionados.length > 1) {
        productosSeleccionados.splice(productosSeleccionados.indexOf(id), 1);
        cantidades.splice(productosSeleccionados.indexOf(id), 1);
        padre.removeChild(hijo);
    } else {
        productosSeleccionados.splice(productosSeleccionados.indexOf(id), 1);
        cantidades.splice(productosSeleccionados.indexOf(id), 1);
        padre.removeChild(hijo);
        padre.innerHTML = "<hr/><h1>Carro de Compras Vacio</h1><br><h2>Seguir Comprando</h2><hr/>";
    }
}

function setProductosSeleccionados() {
    var txtProductos = "";
    for (var i = 0; i < productosSeleccionados.length; i++) {
        if (txtProductos === "") {
            txtProductos = productosSeleccionados[i];
        } else {
            txtProductos = txtProductos + "-" + productosSeleccionados[i];
        }
    }
    document.getElementById("txtJsp").value = txtProductos;
    console.log(document.getElementById("txtJsp").value);
}

function modificarCantidad(idBoton, idProducto) {
    if (idBoton === "botonMas" + idProducto) {
        if (document.getElementById("cantidad" + idProducto).value <= 21)
            document.getElementById("cantidad" + idProducto).value++;
    } else if (idBoton === "botonMenos" + idProducto) {
        if (document.getElementById("cantidad" + idProducto).value > 1)
            document.getElementById("cantidad" + idProducto).value--;
    }
}

function setProductosCarrito() {
    setProductosSeleccionados();
    var txtCantidades = "";
    for (var i = 0; i < productosSeleccionados.length; i++) {
        var idCantidad = "cantidad" + productosSeleccionados[i];
        if (txtCantidades === "") {
            txtCantidades = document.getElementById(idCantidad).value;
        } else {
            txtCantidades = txtCantidades + "-" + document.getElementById(idCantidad).value;
        }
    }
    document.getElementById("txtJsp2").value = txtCantidades;
    console.log(document.getElementById("txtJsp2").value);
}

function realizarPago() {
    var padre = document.getElementById("pagina");
    var hijo = document.getElementById("detalleCompra");
    padre.removeChild(hijo);
    productosSeleccionados = new Array();
    padre.innerHTML = "<hr/><h1>Pago Exitoso!!!</h1><br><h2>Gracias por tu compra.</h2><hr/>";
}

function verProducto() {
    if (productosSeleccionados.includes(document.getElementById("id").value)) {
        document.getElementById("btnAñadir").className = "btnQuitar";
        document.getElementById("btnAñadir").innerHTML = "<label>Quitar del</label><label class='bold'> Carro</label>";
    } else {
        document.getElementById("btnAñadir").className = "btnAñadir";
        document.getElementById("btnAñadir").innerHTML = "<label>Añadir al</label><label class='bold'> Carro</label>";
    }
    document.getElementById("nombrePopup").innerHTML = document.getElementById("nombre").innerHTML;
    document.getElementById("imagenPopup").src = document.getElementById("imagen").src;
    document.getElementById("descripcionPopup").innerHTML = document.getElementById("descripcion").value;
    document.getElementById("precioPopup").innerHTML = document.getElementById("precio").innerHTML;

    document.getElementById("overlay").style.visibility = "visible";
    document.getElementById("popupProducto").style.opacity = "100";
}

function cerrarPopUp() {
    document.getElementById("overlay").style.visibility = "hidden";
    document.getElementById("popupProducto").style.opacity = "0";
}

function añadirPopUp() {
    var id = document.getElementById("id").value;
    clickAñadir(id);
    if (productosSeleccionados.includes(id)) {
        document.getElementById("btnAñadir").className = "btnQuitar";
        document.getElementById("btnAñadir").innerHTML = "<label>Quitar del</label><label class='bold'> Carro</label>";
    } else {
        document.getElementById("btnAñadir").className = "btnAñadir";
        document.getElementById("btnAñadir").innerHTML = "<label>Añadir al</label><label class='bold'> Carro</label>";
    }
}