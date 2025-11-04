import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/Tabs";
import { SearchBar } from "../components/SearchBar";
import NewsCard from "../components/NewsCard";
import api from "../api";
import '../styles/app.css'
import '../styles/noticias.css'

const PaginaNoticias = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [veracityFilter, setVeracityFilter] = useState("todas");

  // Teste de Cards de noticias 
  // APENAS TESTE, PODE EXCLUIR ESSA PARTE QUANDO CONECTAR COM O BACK!
  const fetchArticles = async () => {
    setIsLoading(true);

    // Simula um pequeno atraso (para parecer uma API real)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Define o estado com os dados de simulação
    setArticles(MOCK_ARTICLES);

    setIsLoading(false);
  };


  // Busca no backend
  /*const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/");
      setArticles(response.data.articles || []);
    } catch (error) {
      console.error("Erro ao buscar artigos:", error);
      setArticles([]);
    }
    setIsLoading(false);
  };
  */

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleRefresh = () => {
    fetchArticles();
  };

  const filteredArticles = articles
  .filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((article) =>
    veracityFilter === "todas" ? true : article.veracity === veracityFilter
  );

  const recentArticles = articles.slice(0, 2);
  const verifiedArticles = articles.filter((a) => a.veracity === "verified");

  return (
    <div className="noticias-pagina">
      {/* conteúdo principal */}
      <div className="content-area">
        <h1 className="main-title">Central de Notícias</h1>
        <p className="subtitle">
          Acompanhe e analise todas as notícias monitoradas
        </p>

        {/* busca */}

        <div className="busca-container">
          <div className="container-busca-filtro">
            <SearchBar
              placeholder="Buscar notícias"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <Button onClick={handleRefresh} disabled={isLoading}>
              {isLoading ? "Atualizando..." : "Buscar"}
            </Button>
          </div>

          {/*Veracidade das noticias*/}
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

        {/* tabs */}
        <Tabs defaultValue="all">
          <TabsList className="tabs-list">
            <TabsTrigger value="all">Todas as noticias</TabsTrigger>
            <TabsTrigger value="recent">Mais Recentes</TabsTrigger>
            <TabsTrigger value="verified">Em Alta</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredArticles.length === 0 ? (

              <div className="mensagem-vazia mt-4">
                Nenhuma notícia encontrada.
              </div>
            ) : (

              //O mapeamento dos artigos 
              <div className="news-grid"> 
                {filteredArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  title={article.title}
                  source={article.source || 'Jornal Exemplo'}
                  date={article.date || '10/10/2025'}
                  veracity={article.veracity}
                />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent">
            {recentArticles.length === 0 ? (
              <div className="mensagem-vazia mt-4">Nenhuma notícia recente.</div>
            ) : (
              
              //Remove o aninhamento e use a sintaxe de props
              <div className="news-grid"> 
              {recentArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  title={article.title}
                  source={article.source || 'Jornal Exemplo'}
                  date={article.date || '10/10/2025'}
                  veracity={article.veracity}
                />
              ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="verified">
            {verifiedArticles.length === 0 ? (
              <div className="mensagem-vazia mt-4">Nenhuma notícia em Alta.</div>
            ) : (
              //Remove o aninhamento e use a sintaxe de props
              <div className="news-grid"> 
              {verifiedArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  title={article.title}
                  source={article.source || 'Jornal Exemplo'}
                  date={article.date || '10/10/2025'}
                  veracity={article.veracity}
                />
              ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default PaginaNoticias;

// Dados de simulação para testar o visual e o layout dos cards
const MOCK_ARTICLES = [
  { id: 101, title: 'Inteligência Artificial substituirá 40% dos empregos até 2030, diz estudo.', veracity: 'dubious', source: 'Tech News Brasil', date: '21/10/2025' },
  { id: 102, title: 'Novo tratamento COVID-19 aprovado pela Anvisa mostra eficácia de 95%.', veracity: 'verified', source: 'Portal G1', date: '20/10/2025' },
  { id: 103, title: 'Cura definitiva do câncer descoberta por cientista brasileiro.', veracity: 'fake', source: 'Ciência Hoje', date: '19/10/2025' },
  { id: 104, title: 'Investimento em educação pública aumenta 15% em 2024.', veracity: 'verified', source: 'Ministério da Educação', date: '18/10/2025' },
  { id: 105, title: 'Novo aplicativo promete detectar doenças através de selfies.', veracity: 'dubious', source: 'Inovação Digital', date: '17/10/2025' },
];  