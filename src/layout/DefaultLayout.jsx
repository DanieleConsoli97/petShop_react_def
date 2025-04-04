import { Outlet, useLocation } from "react-router-dom"
import Navbar from '../components/Navbar'
import PathNav from '../components/PathNav'
import Footer from "../components/Footer"
import ReactStateToast from "../components/Toasts"  // Importo il componente rinominato correttamente
import { useGlobalContext } from "../context/GlobalContext"
const DefaultLayout = () => {
    const location = useLocation();
    const { toastMessage } = useGlobalContext();
    
    return (
        <>
            <Navbar />
            {
                location.pathname === "/" || location.pathname === "/404" || location.pathname.includes("*") ? <></> : <PathNav />
            }
          <ReactStateToast {...toastMessage} />
            <div>
                
                <Outlet />
            </div>
            <Footer />
            {/* Aggiungo il componente Toast che sarà disponibile in tutta l'applicazione */}
            
            
        </>
    )
}
export default DefaultLayout