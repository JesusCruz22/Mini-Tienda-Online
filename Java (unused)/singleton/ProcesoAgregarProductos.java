package singleton;

import java.util.ArrayList;
import javax.ejb.Singleton;
import classes.Producto;

@Singleton
public class ProcesoAgregarProductos implements ProcesoAgregarProductosLocal {

    @Override
    public ArrayList<Producto> llenarCarrito(String txtJsp) {
        ArrayList<Producto> productosCarrito = new ArrayList();

        try {
            String[] productosSeleccionados = txtJsp.split("-");
            Producto[] productosRegistrados = Producto.registroProductos();

            for (String productoSeleccionado : productosSeleccionados) {
                for (Producto productoRegistrado : productosRegistrados) {
                    if (productoRegistrado.getId() == Integer.parseInt(productoSeleccionado)) {
                        productosCarrito.add(productoRegistrado);
                    }
                }
            }
        } catch (NumberFormatException e) {
            System.out.println(e);
        }

        return productosCarrito;
    }

    
}
