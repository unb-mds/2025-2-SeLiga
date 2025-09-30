import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/Tabs";
import { Card, CardContent } from "./components/Card";
import { SearchBar } from "./components/SearchBar";
import api from "./api";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Busca no backend
  const fetchArticles = async () => {
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

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleRefresh = () => {
    fetchArticles();
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentArticles = articles.slice(0, 2);
  const verifiedArticles = articles.filter(a => a.veracity === "verified");

  return (
    <div className="app">
      {/* navbar com button pois não temos rotas ainda*/}
      <nav className="navbar">
        <h1 className="logo">SeLiga</h1>
        <div className="menu">
          <button>Sobre</button>
          <button>Notícias</button>
          <button>Painel</button>
          <button>Análise</button>
        </div>
      </nav>

      {/* conteúdo principal */}
      <div className="content-area">
        <h1 className="main-title">Central de Notícias</h1>
        <p className="subtitle">
          Acompanhe e analise todas as notícias monitoradas
        </p>

        {/* busca */}
        <div className="busca-container">
          <SearchBar
            placeholder="Buscar notícias"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <Button onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? "Atualizando..." : "Buscar"}
          </Button>
        </div>

        {/* tabs */}
        <Tabs defaultValue="all">
          <TabsList className="tabs-list">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="recent">Mais Recentes</TabsTrigger>
            <TabsTrigger value="verified">Verificadas</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredArticles.length === 0 ? (
              <Card className="mt-4">
                <CardContent>Nenhuma notícia encontrada.</CardContent>
              </Card>
            ) : (
              filteredArticles.map(article => (
                <Card key={article.id} className="mt-4">
                  <CardContent>{article.title}</CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="recent">
            {recentArticles.length === 0 ? (
              <Card className="mt-4">
                <CardContent>Nenhuma notícia recente.</CardContent>
              </Card>
            ) : (
              recentArticles.map(article => (
                <Card key={article.id} className="mt-4">
                  <CardContent>{article.title}</CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="verified">
            {verifiedArticles.length === 0 ? (
              <Card className="mt-4">
                <CardContent>Nenhuma notícia verificada.</CardContent>
              </Card>
            ) : (
              verifiedArticles.map(article => (
                <Card key={article.id} className="mt-4">
                  <CardContent>{article.title}</CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default App;