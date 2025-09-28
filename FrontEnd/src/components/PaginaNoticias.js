import React from "react";

function PaginaNoticias() {
  return (
    <div className="noticias-container">
      <div className="header">
        <h1>Central de Noticias</h1>
        <p>Acompanhe e analisetodas as notícias monitoradas</p>
        <button className="btn-atualizar">Atualizar</button>
      </div>

      <div className="busca-filtros">
        <h3>🔍 Busca e filtros</h3>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar notícias por título, fonte ou conteúdo..."
          />
          <button className="btn-buscar">Buscar</button>
        </div>

        <div className="filtros-veracidade">
          <button className="btn-verde">✅ Verificados</button>
          <button className="btn-amarelo">⚠️ Duvidosas</button>
          <button className="btn-vermelho">❌ Fake News</button>
        </div>
      </div>

      <div className="tabs-noticias">
        <button className="tab-ativa">Todas as Notícias</button>
        <button>Mais Recentes</button>
        <button>Em Alta</button>
      </div>

      <h2>Todas as Notícias</h2>
      <div className="news-grid">
       
        <div className="placeholder-card">Cartão de Notícia</div>
        <div className="placeholder-card">Cartão de Notícia</div>
        <div className="placeholder-card">Cartão de Notícia</div>
      </div>
    </div>
  );
}

export default PaginaNoticias;