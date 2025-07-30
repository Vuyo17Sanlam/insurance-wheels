import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">Insurance-Wheels</div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/vehicles/new">Add Vehicle</Link>
      </div>
    </nav>
  );
}
