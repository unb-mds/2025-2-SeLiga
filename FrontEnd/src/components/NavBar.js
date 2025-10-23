import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function NavBar() {
  return (
    <nav className='navbar'>
      <h1 className="logo">SeLiga</h1>

      <div className='menu-links'>

        {/* Link para a Página Sobre */}
        
        <Link to="/sobre" className='nav-link'>Sobre</Link>

        {/* Link para a Página de Notícias*/}
        <span className="separator">|</span>
        <Link to="/noticias" className='nav-link'>Notícias</Link>
        
        {/* Link para o Painel */}
        <span className="separator">|</span>
        <Link to="/painel" className='nav-link'>Painel</Link>


      </div>
    </nav>
  );
}
export default NavBar;