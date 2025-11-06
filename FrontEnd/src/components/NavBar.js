import React, { useState } from 'react'; // Importamos o useState
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importamos os ícones de menu

function NavBar() {
  // Estado para controlar se o menu mobile está aberto ou fechado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Função para alternar o estado (abrir/fechar)
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Função para fechar o menu ao clicar em um link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className='navbar'>
        {/* Imagem da Logo*/}
        <Link to="/" className="logo">
          <div className="logo-img-wrapper">
            <img src="/logo512x512.png" alt="SeLiga Logo" className="logo-img" />
          </div>
          <h1 className="logo-text">SeLiga</h1>
        </Link>

        {/* Menu normal para Desktop) */}
        <div className='menu-links'>
          <Link to="/sobre" className='nav-link'>Sobre</Link>
          <span className="separator">|</span>
          <Link to="/noticias" className='nav-link'>Notícias</Link>
          <span className="separator">|</span>
          <Link to="/painel" className='nav-link'>Painel</Link>
        </div>

        {/* Ícone para Celular */}
        <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {/* Alterna o ícone com base no estado */}
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* O Menu Suspenso (Dropdown) */}
      <div className={`mobile-menu-dropdown ${isMobileMenuOpen ? 'show' : ''}`}>
        <Link to="/sobre" className='nav-link' onClick={closeMobileMenu}>Sobre</Link>
        <Link to="/noticias" className='nav-link' onClick={closeMobileMenu}>Notícias</Link>
        <Link to="/painel" className='nav-link' onClick={closeMobileMenu}>Painel</Link>
      </div>
    </>
  );
}
export default NavBar;