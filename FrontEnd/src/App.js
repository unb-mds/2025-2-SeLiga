
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar'; 
import PaginaNoticias from './components/PaginaNoticias'; 
import './App.css'; 
import api from "./api";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Chamando dados do backend pela api
    api.get("/")
    .then(response => {
      setArticles(response.data.articles);
    })
    .catch(error => {
      console.error("Erro! Falha ao buscar notícias: ", error);
    });
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    // Chamando dados do backend pela api
    api.get("/")
      .then(response => {
        setArticles(response.data.articles);
      })
      .catch(error => {
        console.error("Erro! Falha ao atualizar noticias: ", error);
      })
      .finally(() => setIsLoading(false));
  };

  // página oficial do produto

  /*
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-news-header">Central de Notícias</h1>
          <p className="text-news-subtitle">Acompanhe e analise todas as notícias monitoradas</p>
        </div>
        <Button onClick={handleRefresh} disabled={isLoading} className="flex items-center gap-2">
          <RefreshCw className={h-4 w-4 ${isLoading ? 'animate-spin' : ''}} />
          Atualizar
        </Button>
      </div>

      { Search and Filters }
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Busca e Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchBar
            searchTerm={filters.searchTerm}
            onSearchChange={updateSearchTerm}
            placeholder="Buscar notícias por título, fonte ou conteúdo..."
          />
          <NewsFilters
            activeFilter={filters.veracity}
            onFilterChange={updateVeracity}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todas as Notícias</TabsTrigger>
          <TabsTrigger value="recent">Mais Recentes</TabsTrigger>
          <TabsTrigger value="trending">Em Alta</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-news-header">
              {filters.searchTerm 
                ? Resultados para "${filters.searchTerm}" 
                : 'Todas as Notícias'
              }
            </h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'notícia' : 'notícias'}
              </Badge>
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Newspaper className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">Nenhuma notícia encontrada</p>
                <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou termo de busca</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-news-header">Notícias Mais Recentes</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-news-header">Notícias Verificadas em Alta</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trendingNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
  */

  // pagina para testes

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Central de Notícias</h1>
      <p className="text-news-subtitle">Consumindo dados do backend FastAPI</p>

      <button 
        onClick={handleRefresh} 
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isLoading ? "Atualizando..." : "Atualizar"}
      </button>

      {articles.length === 0 ? (
        <p>Nenhuma notícia carregada</p>
      ) : (
        <ul>
          {articles.map(article => (
            <li key={article.id}>
              {article.title} ({article.veracity})
            </li>
          ))}
        </ul>
      )}
    </div>
  );

};


export default App;