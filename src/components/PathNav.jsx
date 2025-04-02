import { FaHome } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

const PathNav = () => {
  const location = useLocation();

  let currentLink = "";
  const pathItems = location.pathname.split('/').filter(crumb => crumb !== '');

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
      <ol className="breadcrumb breadcrumb-chevron my-4 p-3 bg-body-tertiary rounded-3">
          <li className="breadcrumb-item">
            <Link to="/" className="link-body-emphasis text-decoration-none">
              <FaHome className="bi" width="16" height="16" />
              <span className="ms-1"></span>
            </Link>
          </li>

          {pathItems.map((crumb, index, array) => {
            currentLink += `/${crumb}`;
            const isLast = index === array.length - 1;
            return (
              <li key={index} className={`breadcrumb-item ${isLast ? "active" : ""}`} aria-current={isLast ? "page" : undefined}>
                {isLast ? (<span>{formatCrumbName(crumb)}</span>) : (
                  <Link to={currentLink} className="link-body-emphasis fw-semibold text-decoration-none">
                    {formatCrumbName(crumb)}
                  </Link>
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