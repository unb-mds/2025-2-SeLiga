import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import PaginaNoticias from './pages/PaginaNoticias';
import Sobre from './pages/Sobre'; 
import './styles/app.css';



const App = () => {
  return (
    // Envolve toda a aplicação com o Router
    <Router>
      <div className="layout-container">
        {/* NavBar */}
        <NavBar />

        {/* Define onde o conteúdo da página será renderizado */}
        <main className="main-content">
          <Routes>
            {/* Rota para a página de Notícias */}
            <Route path="/" element={<PaginaNoticias />} />
            <Route path="/noticias" element={<PaginaNoticias />} />

            {/* Rota para a página Sobre */}
            <Route path="/sobre" element={<Sobre />} />

            {/* Rota para a página de painel */}
            <Route path="/painel" element={<h2>Em Breve: Painel</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;