import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Platillos from './pages/Platillos';
import VerPlantillos from './pages/VerPlatillos';
import EstPlatillos from './pages/EstPlatillos';
import EstReservas from './pages/EstReservas';
import Reservaciones from './pages/Reservaciones';
import Usuarios from './pages/Usuarios';
import EstSede from './pages/EstSedes';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path='/' exact={true} element={<Login />} />
          <Route path='inicio' element={<Inicio  />} />
          <Route path='platillo/:id' element={<Platillos/>} />
          <Route path='ver_platillos' element={<VerPlantillos />} />
          <Route path='reservaciones' element={<Reservaciones />} />
          <Route path='estadistica_platillos' element={<EstPlatillos />} />
          <Route path='estadistica_reserva' element={<EstReservas />} />
          <Route path='usuarios' element={<Usuarios />} />
          <Route path='estadisticas_sede' element={<EstSede />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
