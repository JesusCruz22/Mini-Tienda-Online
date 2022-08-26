package servlets;

import Stateless.ProcesoComprarProductosLocal;
import java.io.IOException;
import java.util.ArrayList;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "Comprar", urlPatterns = {"/Comprar.do"})
public class Comprar extends HttpServlet {

    @EJB
    private ProcesoComprarProductosLocal procesoComprarProductos;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            String txtJsp = request.getParameter("txtJsp");
            String txtJsp2 = request.getParameter("txtJsp2");
            ArrayList productosEnBoleta = procesoComprarProductos.GenerarBoleta(txtJsp, txtJsp2);
            int precioTotal = procesoComprarProductos.calcularTotalBoleta(productosEnBoleta);
            
            request.setAttribute("arrayDetalleCompra", productosEnBoleta);
            request.setAttribute("precioTotalCompra", precioTotal);
            request.setAttribute("txtJsp", txtJsp);
            request.setAttribute("txtJsp2", txtJsp2);
            request.getRequestDispatcher("DetalleCompra.jsp").forward(request, response);

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
