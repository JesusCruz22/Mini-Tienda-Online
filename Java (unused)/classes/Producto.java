package classes;

public class Producto {
    private int id;
    private String imagen;
    private String nombre;
    private String descripcion;
    private int precioUnidad; 
    private int cantidad = 0;
    private int precioTotal = 0;
    private static Producto[] productos = new Producto[12];

    public Producto() {
    }

    public Producto(int id, String imagen, String nombre, String descripcion, int precioUnidad) {
        this.id = id;
        this.imagen = imagen;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precioUnidad = precioUnidad;
    }

    public static Producto[] registroProductos() {
        productos[0] = (new Producto(1, "Recursos/imagenes/ImagenChurrascoItaliano.jpg", "Churrasco Italiano",
                "- Carne \n-Tomate \n-Palta \n-Mayo", 2800));
        productos[1] = (new Producto(2, "Recursos/imagenes/ImagenPapasFritas.png", "Papas Fritas",
                "Un plato grande de Papas Fritas. Porcion Familiar.", 2000));
        productos[2] = (new Producto(3, "Recursos/imagenes/ImagenEmpanadasDePino.png", "Empanada de Pino",
                "Empanada cacera de pino. Ingredientes : \n-Cebolla \n-Carne de Vacuno \n-Condimentos \n-Huevo \n-Aceitunas",
                1100));
        productos[3] = (new Producto(4, "Recursos/imagenes/ImagenCompletoItaliano.png", "Completo Italiano",
                "-Vianesa \n-Tomate \n-Palta", 1500));
        productos[4] = (new Producto(5, "Recursos/imagenes/ImagenJugoDeDurazno.png", "Jugo de Durazno",
                "1 Litro de jugo", 1000));
        productos[5] = (new Producto(6, "Recursos/imagenes/ImagenJugoDeFrutilla.png", "Jugo de Frutilla",
                "1 Litro de jugo", 1000));
        productos[6] = (new Producto(7, "Recursos/imagenes/ImagenJugoDePiña.png", "Jugo de Piña",
                "1 Litro de jugo", 1000));
        productos[7] = (new Producto(8, "Recursos/imagenes/ImagenJugoDeNaranja.png", "Jugo de Naranja",
                "1 Litro de jugo", 1000));
        productos[8] = (new Producto(9, "Recursos/imagenes/ImagenFlanDeChocolate.png", "Flan de Chocolate",
                "-Leche \n-Chocolate en polvo \n-Extracto de vainilla \n-Azucar", 750));
        productos[9] = (new Producto(10, "Recursos/imagenes/ImagenTartaDeLimon.png", "Tarta de Limon",
                "-Gelatina de Limon \n-Masa de galleta \n-Azucar \n-Leche Entera \n-Queso Philadelphia", 1000));
        productos[10] = (new Producto(11, "Recursos/imagenes/ImagenBananaSplit.png", "Banana Split",
                "-Platano \n-Helado de chocolate \n-Helado de frutilla \n-Helado de vainilla \n-Salsa de chocolate \n-Crema Batida",
                1200));
        productos[11] = (new Producto(12, "Recursos/imagenes/ImagenPastelDeMinecraft.png", "Pastel",
                "-Leche \n-Azucar \n-Huevo \n-Trigo", 4500));

        return productos;
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public int getPrecioUnidad() {
        return precioUnidad;
    }

    public void setPrecioUnidad(int precioUnidad) {
        this.precioUnidad = precioUnidad;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public int getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(int precioTotal) {
        this.precioTotal = precioTotal;
    }
    
}
