import { useLocation, Link } from "react-router-dom";
// import { Home } from "lucide-react"; // Optional: Using lucide-react icons for better visuals

const routeNames = {
  "/": "Calculator",
  "/emi": "EMI",
  "/sip": "SIP",
  "/lumpsum": "Lumpsum",
  "/regular-income": "Regular Income",
  "/swp": "SWP",
  "/goal": "Goal Planning",
  "/retirement": "Retirement",
  "/education": "Education",
  "/revenue": "Revenue",
  "/compound": "Compound Interest",
  "/inflation": "Inflation",
  "/nps": "NPS"
};

const Breadcrumb = () => {
  const location = useLocation();
  const currentPage = routeNames[location.pathname] || "";

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <div className="d-flex align-items-center flex-wrap">
        {/* Home/Calculator Link */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="badge bg-primary d-inline-flex align-items-center gap-1">
            <i className="bi bi-house-door"></i> {/* Bootstrap icon */}
            Calculator
          </span>
        </Link>

        {/* Current Page (if not home) */}
        {currentPage && location.pathname !== "/" && (
          <>
            <span className="mx-2 text-secondary" aria-hidden="true">
              <i className="bi bi-chevron-right"></i> {/* Arrow icon */}
            </span>
            
            <span className="badge bg-success d-inline-flex align-items-center">
              {currentPage}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Breadcrumb;