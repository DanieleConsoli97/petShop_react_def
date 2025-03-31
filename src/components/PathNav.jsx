
//NOTE - Aggiungere logica
import { FaHome } from "react-icons/fa";
const PathNav = () =>{
    return(
      <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-chevron p-3 bg-body-tertiary rounded-3">
          <li className="breadcrumb-item">
            <a className="link-body-emphasis" href="#">
              <FaHome className={"bi text-black "} width={16} height={16} />
              <span className="visually-hidden">Home</span>
            </a>
          </li>
          <li className="breadcrumb-item">
            <a className="link-body-emphasis fw-semibold text-decoration-none" href="#">Library</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
    </div>
    )
}
export default PathNav
