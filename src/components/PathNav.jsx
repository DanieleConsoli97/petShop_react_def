// import { FaHome } from "react-icons/fa";
// import { useLocation, Link } from "react-router-dom";

// const PathNav = () => {
//   const location = useLocation();

//   let currentLink = "";
//   const pathItems = location.pathname.split('/').filter(crumb => crumb !== '');

//   return (
//     <div className="container">
//       <nav aria-label="breadcrumb">
//         <ol className="breadcrumb breadcrumb-chevron p-3 bg-body-tertiary rounded-3">
//           <li className="breadcrumb-item">
//             <Link to="/" className="link-body-emphasis text-decoration-none">
//               <FaHome className="bi" width="16" height="16" />
//               <span className="ms-1"></span>
//             </Link>
//           </li>

//           {pathItems.map((crumb, index, array) => {
//             currentLink += `/${crumb}`;
//             const isLast = index === array.length - 1;
//             return (
//               <li key={index} className={`breadcrumb-item ${isLast ? "active" : ""}`} aria-current={isLast ? "page" : undefined}>
//                 {isLast ? (<span>{formatCrumbName(crumb)}</span>) : (
//                   <Link to={currentLink} className="link-body-emphasis fw-semibold text-decoration-none">
//                     {formatCrumbName(crumb)}
//                   </Link>
//                 )}
//               </li>
//             );
//           })}
//         </ol>
//       </nav>
//     </div>
//   );
// };

// // Helper function to format crumb names
// const formatCrumbName = (crumb) => {
//   return crumb
//     .split('-')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };

// export default PathNav;


import { FaHome } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

const PathNav = () => {
  const location = useLocation();

  // Array di percorsi dove non mostrare la breadcrumb
  const hiddenPaths = ['/carrello', '/checkout', '/checkoutDone', '/wishlist'];
  
  // Se il percorso corrente è nella lista dei percorsi nascosti, non renderizzare nulla
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  let currentLink = "";
  const pathItems = location.pathname.split('/').filter(crumb => crumb !== '');
  
  let stopRendering = false;  // Variabile per fermare la visualizzazione dei breadcrumb dopo "search"

  return (
    <div className="container"> {/*se si vuole mettere a sinistra tutto usiamo w-75 ms-5 e togliamo margin nel css */}
      <nav aria-label="breadcrumb">
      <ol className="breadcrumb breadcrumb-chevron my-4 p-3 rounded-3">
          <li className="breadcrumb-item">
            <Link to="/" className="link-body-emphasis text-decoration-none">
              <FaHome className="bi" width="16" height="16" />
              <span className="ms-1 font-size-small"></span>
            </Link>
          </li>

          {pathItems.map((crumb, index, array) => {
            // Se abbiamo già trovato "search", fermiamo il rendering
            if (stopRendering) return null;

            currentLink += `/${crumb}`;
            const isLast = index === array.length - 1;

            // Se il "crumb" è "search", lo sostituiamo con "Risultati della ricerca" e fermiamo il rendering dei breadcrumb successivi
            const formattedCrumb = crumb === "search" ? "Risultati della ricerca" : formatCrumbName(crumb);
            if (crumb === "search") {
              stopRendering = true; // Fermiamo l'aggiunta di altri breadcrumb
            }

            return (

              <li key={index} className={`breadcrumb-item ${isLast || crumb === "search" ? "active" : ""}`} aria-current={isLast || crumb === "search" ? "page" : undefined}>
                {crumb === "search" ? (
                  <span>{formattedCrumb}</span>
                ) : (
                  isLast ? (
                    <span>{formattedCrumb}</span>
                  ) : (
                    <Link to={currentLink} className="link-body-emphasis fw-semibold text-decoration-none">
                      {formattedCrumb}
                    </Link>
                  )
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

// Helper function to format crumb names
const formatCrumbName = (crumb) => {
  return crumb
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default PathNav;
