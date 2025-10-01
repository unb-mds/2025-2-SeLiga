import "../App.css";

function NavBar() {
  return (
    /*
    <nav className='navbar'>
        <h1>Se SeLiga</h1>
        <div className='Sobre'></div>
        <div className='Painel'></div>
        <div className='Noticias'></div>
        <div className='Análise'></div>
    </nav>*/

    //navbar com button pois não temos rotas ainda*
    <nav className="navbar">
      <h1 className="logo">SeLiga</h1>
      <div className="menu">
        <button>Sobre</button>
        <button>Notícias</button>
        <button>Painel</button>
      </div>
    </nav>
  );
}
export default NavBar;
