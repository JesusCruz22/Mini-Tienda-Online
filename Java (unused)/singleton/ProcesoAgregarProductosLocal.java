package singleton;

import java.util.ArrayList;
import javax.ejb.Local;
import classes.Producto;

@Local
public interface ProcesoAgregarProductosLocal {

    ArrayList<Producto> llenarCarrito(String txtJsp);

    

        
}
