import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/Tabs";
import { SearchBar } from "../components/SearchBar";
import NewsCard from "../components/NewsCard";
import { IoIosSearch } from "react-icons/io";
import PopUp from "../components/PopUp";
import api from "../api";
import '../styles/app.css'
import '../styles/noticias.css'


const PaginaNoticias = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [veracityFilter, setVeracityFilter] = useState("todas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  

  // FUNÇÃO PARA LISTAR TODAS AS NOTÍCIAS 
  const fetchArticlesList = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/noticias");
      setArticles(response.data.noticias || []);
    } catch (error) {
      console.error("Erro ao buscar lista de artigos:", error);
      setArticles([]);
    }
    setIsLoading(false);
  };

  // FUNÇÃO PARA BUSCAR DETALHE DE UMA ÚNICA NOTÍCIA 
  const fetchArticleDetail = async (article) => {
    const noticiaId = article._id;
    setIsLoading(true);
    try {
      const response = await api.get(`/noticias/${noticiaId}`);
      setSelectedNews(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(`Erro ao buscar detalhes da notícia ${noticiaId}:`, error);
    }
    setIsLoading(false);
  };
   
  useEffect(() => {
    // Chamamos a função de LISTAR ao carregar a página
    fetchArticlesList();
  }, []);

  const handleRefresh = () => {
    fetchArticlesList(); // Botão 'Buscar' chama a lista
  };

  const filteredArticles = articles.filter((article) =>
    article.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
  )
    .filter((article) =>
      veracityFilter === "todas" ? true : article.veracity === veracityFilter
    );
  

  const recentArticles = articles.slice(0, 2);
  const verifiedArticles = articles.filter(
    (a) => a.status_verificacao === "verificado"
  );

  // O clique do Card chama a busca de detalhes
  const handleCardClick = (article) => {
    setSelectedNews(article); // Define o artigo selecionado
    setIsModalOpen(true);     // Abre o modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  return (
    <div className="noticias-pagina">
      <div className="content-area">
        <h1 className="main-title">Central de Notícias</h1>
        <p className="subtitle">
          Acompanhe e analise todas as notícias monitoradas
        </p>

        <div className="busca-container">
          <div className="container-busca-filtro">
            
            <SearchBar
              placeholder="Buscar notícias"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <Button onClick={handleRefresh} disabled={isLoading}>
              <IoIosSearch className="pesquisa" />
              <span className="texto-botao">
                {isLoading ? "Atualizando..." : "Buscar"}
              </span>
            </Button>
          </div>
          <div className="veracidade-filtros">
            <button
              onClick={() => setVeracityFilter("verified")}
              className={veracityFilter === "verified" ? "ativo" : ""}
            >
            ✅ Verificadas
            </button>

            <button
              onClick={() => setVeracityFilter("dubious")}
              className={veracityFilter === "dubious" ? "ativo" : ""}
            >
            ⚠️ Duvidosas
            </button>

            <button
              onClick={() => setVeracityFilter("fake")}
              className={veracityFilter === "fake" ? "ativo" : ""}
            >
            ❌ Fake News
            </button>

            <button
              onClick={() => setVeracityFilter("todas")}
              className={veracityFilter === "todas" ? "ativo" : ""}
            >
            📋 Todas
            </button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="tabs-list">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="recent">Recentes</TabsTrigger>
            <TabsTrigger value="em-alta ">Em alta</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredArticles.length === 0 ? (
              <div className="mensagem-vazia mt-4">Nenhuma notícia encontrada.</div>
            ) : (
              <div className="news-grid">
                {filteredArticles.map((article) => (
                  <div key={article._id} onClick={() => handleCardClick(article)}>
                    <NewsCard
                      title={article.titulo}
                      source={article.fonte || "Fonte desconhecida"}
                      date={article.data_coleta || "Data não informada"}
                      veracity={article.verificacao?.classificacao || article.status_verificacao}
                      imageUrl={article.imageUrl}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent">
            {recentArticles.length === 0 ? (
              <div className="mensagem-vazia mt-4">Nenhuma notícia recente.</div>
            ) : (
              <div className="news-grid">
                {recentArticles.map((article) => (
                  <div key={article._id} onClick={() => handleCardClick(article)}>
                    <NewsCard
                      title={article.titulo}
                      source={article.fonte}
                      date={article.data_coleta}
                      veracity={article.status_verificacao}
                      imageUrl={article.imageUrl}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="verified">
            {verifiedArticles.length === 0 ? (
              <div className="mensagem-vazia mt-4">Nenhuma notícia verificada.</div>
            ) : (
              <div className="news-grid">
                {verifiedArticles.map((article) => (
                  <div key={article._id} onClick={() => handleCardClick(article)}>
                    <NewsCard
                      title={article.titulo}
                      source={article.fonte}
                      date={article.data_coleta}
                      veracity={article.status_verificacao}
                      imageUrl={article.imageUrl}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <PopUp
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        news={selectedNews}
      />
    </div>
  );
};
export default PaginaNoticias;

