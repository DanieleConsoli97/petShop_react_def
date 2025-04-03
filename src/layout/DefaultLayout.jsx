import { Outlet, useLocation } from "react-router-dom"
import Navbar from '../components/Navbar'
import PathNav from '../components/PathNav'
import Footer from "../components/Footer"

const DefaultLayout = () => {
    const location = useLocation();
    return (
        <>
            <Navbar />
            {
                location.pathname == "/" ? <></> : <PathNav />   //|| location.pathname == "*"  ? <></> : <PathNav />
            }
            <div>
                <Outlet />

            </div>
            <Footer />
        </>
    )
}
export default DefaultLayout