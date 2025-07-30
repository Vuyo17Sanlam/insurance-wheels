import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddVehicle from './pages/AddVehicle';
import EditVehicle from './pages/EditVehicle';
import Quotes from './pages/Quotes';
import ConfirmQuote from './pages/ConfirmQuote';
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehicles/new" element={<AddVehicle />} />
          <Route path="/vehicles/:id/edit" element={<EditVehicle />} />
          <Route path="/quotes/:vehicleId" element={<Quotes />} />
          <Route path="/confirm" element={<ConfirmQuote />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
