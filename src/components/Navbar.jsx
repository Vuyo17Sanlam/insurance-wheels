import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './Navbar.css';

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="navbar">
      <div className="navbar-title">Insurance-Wheels</div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/vehicles/new">Add Vehicle</Link>
        <IconButton
          onClick={toggleDarkMode}
          color="inherit"
          sx={{
            marginLeft: 'auto',
            color: darkMode ? '#fff' : '#000'
          }}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>
    </nav>
  );
}
