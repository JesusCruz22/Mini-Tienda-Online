package Stateless;

import classes.Producto;
import java.util.ArrayList;
import javax.ejb.Stateless;

@Stateless
public class ProcesoComprarProductos implements ProcesoComprarProductosLocal {

    @Override
    public ArrayList<Producto> GenerarBoleta(String txtJsp, String txtJsp2) {
        ArrayList<Producto> productosEnBoleta = new ArrayList();
        try {
            String[] idProductosCarrito = txtJsp.split("-");
            Producto[] productosRegistrados = Producto.registroProductos();
            if ("".equals(txtJsp2) || txtJsp2 == null) {
                txtJsp2 = "1";
                for (int i = 1; i < idProductosCarrito.length; i++) {
                    txtJsp2 += "-1";
                }
            }
            String[] cantidadesProductos = txtJsp2.split("-");

            int i = 0;
            for (Producto producto : productosRegistrados) {
                for (String idProducto : idProductosCarrito) {
                    if (producto.getId() == Integer.parseInt(idProducto)) {
                        producto.setCantidad(Integer.parseInt(cantidadesProductos[i]));
                        producto.setPrecioTotal(producto.getPrecioUnidad() * producto.getCantidad());
                        productosEnBoleta.add(producto);
                        i++;
                    }
                }
            }
        } catch (NumberFormatException e) {
            System.out.println(e);
        }
        return productosEnBoleta;
    }

    @Override
    public Integer calcularTotalBoleta(ArrayList<Producto> productosEnBoleta) {
        int total = 0;
        try {
            for (Producto producto : productosEnBoleta) {
                total += producto.getPrecioTotal();
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        return total;
    }

}
