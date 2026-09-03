import { Link } from "react-router-dom";
export default function NotFound() {
  return <section className="page-section"><div className="panel not-found"><h1>Page not found</h1><p>The page you requested does not exist.</p><Link className="button primary" to="/">Return to Dashboard</Link></div></section>;
}
