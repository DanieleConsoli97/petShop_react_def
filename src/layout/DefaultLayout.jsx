import { Outlet,useLocation } from "react-router-dom"
import Navbar from '../components/Navbar'
import PathNav from '../components/PathNav'

const DefaultLayout = () => {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <>
            <Navbar />
            {
                location.pathname == "/" ? <></> : <PathNav /> 
            }
            <Outlet />
        </>
    )
}
export default DefaultLayout