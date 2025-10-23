import React from 'react';
// Importe o roteador e as rotas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Sua barra de navegação
import PaginaNoticias from './pages/PaginaNoticias';
import Sobre from './pages/Sobre'; // O componente que você acabou de criar
import './App.css';


const App = () => {
  return (
    // 1. Envolve toda a aplicação com o Router
    <Router>
      <div className="layout-container">
        {/* NavBar */}
        <NavBar />

        {/* 2. O <Routes> define onde o conteúdo da página será renderizado */}
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