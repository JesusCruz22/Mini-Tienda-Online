package Stateless;

import classes.Producto;
import java.util.ArrayList;
import javax.ejb.Local;

@Local
public interface ProcesoComprarProductosLocal {

    ArrayList<Producto> GenerarBoleta(String txtJsp, String txtJsp2);

    Integer calcularTotalBoleta(ArrayList<Producto> productosEnBoleta);
    
}
