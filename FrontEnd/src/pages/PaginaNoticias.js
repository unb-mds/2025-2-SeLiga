import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/Tabs";
import { SearchBar } from "../components/SearchBar";
import NewsCard from "../components/NewsCard";
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

  /*

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
   */
  // --- FUNÇÃO PARA LISTAR TODAS AS NOTÍCIAS (USANDO MOCK DATA) ---
  const fetchArticlesList = async () => {
    setIsLoading(true);

    // Simula um pequeno atraso (para parecer uma API real)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Define o estado com os dados de simulação
    setArticles(MOCK_ARTICLES);

    setIsLoading(false);
  };

  // --- FUNÇÃO PARA BUSCAR DETALHE DE UMA ÚNICA NOTÍCIA (CHAMADA NO clique) ---
  const fetchArticleDetail = async (article) => {
    // 1. CORREÇÃO: Usa '_id' (do MongoDB) para encontrar o artigo
    const noticiaId = article._id;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    // 2. CORREÇÃO: Procura por '_id' no MOCK_ARTICLES
    // Note que o MOCK_ARTICLES só precisa de 'id' se você estiver usando ele na busca
    const articleDetail = MOCK_ARTICLES.find(a => a._id === noticiaId);

    if (articleDetail) {
      setSelectedNews(articleDetail);
      setIsModalOpen(true);
    } else {
      console.error("Artigo não encontrado no mock data.");
    }
    setIsLoading(false);
  };
  // --- CICLO DE VIDA (useEffect) ---
  useEffect(() => {
    // Chamamos a função de LISTAR ao carregar a página
    fetchArticlesList();
  }, []);

  // --- HANDLERS ---
  const handleRefresh = () => {
    fetchArticlesList(); // Botão 'Buscar' chama a lista
  };

  const filteredArticles = articles
  .filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
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
    fetchArticleDetail(article);
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
              {isLoading ? "Atualizando..." : "Buscar"}
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
                      veracity={article.status_verificacao || "pendente"}
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

// Dados de simulação para testar o visual e o layout dos cards
const MOCK_ARTICLES = [
  {
    _id: "65432101",
    titulo: 'Inteligência Artificial substituirá 40% dos empregos até 2030, diz estudo.',
    status_verificacao: 'dubious',
    source: 'Tech News Brasil',
    data_coleta: '21/10/2025',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9d13?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullText: 'Pesquisa recente afirma que a evolução da IA e da automação deve impactar significativamente o mercado de trabalho global. Este texto detalha os setores mais afetados e as projeções de crescimento de novas áreas, alertando para a necessidade de requalificação profissional.',
    originalLink: 'http://tech.news.com/ia',
    author: 'Equipe Tech',
  },
  {
    _id: "65432102",
    titulo: 'Novo tratamento COVID-19 aprovado pela Anvisa mostra eficácia de 95%.',
    status_verificacao: 'verified',
    source: 'Portal G1',
    data_coleta: '20/10/2025',
    imageUrl: 'https://images.unsplash.com/photo-1584339695679-588040d34157?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullText: 'Detalhes sobre os resultados dos testes clínicos do novo medicamento e as declarações da Agência Nacional de Vigilância Sanitária sobre o processo de aprovação emergencial no país, confirmando a validade do tratamento.',
    originalLink: 'http://g1.globo.com/tratamento',
    author: 'Dr. João Silva',
  },
  {
    _id: "65432103",
    titulo: 'Cura definitiva do câncer descoberta por cientista brasileiro.',
    status_verificacao: 'fake',
    source: 'Ciência Hoje',
    data_coleta: '19/10/2025',
    imageUrl: 'https://images.unsplash.com/photo-1532185265430-8d5917812c3f?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullText: 'A notícia afirma uma cura milagrosa, mas o texto contém informações não verificadas e referências a estudos falsos. Esta informação é classificada como desinformação e requer atenção redobrada.',
    originalLink: 'http://cienciahoje.com/cura',
    author: 'Sem Autoria',
  },
  {
    _id: "65432104",
    titulo: 'Investimento em educação pública aumenta 15% em 2024.',
    status_verificacao: 'verified',
    source: 'Ministério da Educação',
    data_coleta: '18/10/2025',
    imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d58?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullText: 'Dados oficiais confirmam aumento no orçamento destinado à educação básica e superior, com foco em infraestrutura e bolsas de estudo para o próximo ano fiscal, demonstrando o compromisso do governo.',
    originalLink: 'http://mec.gov.br/investimento',
    author: 'Ministério da Educação',
  },
  {
    _id: "65432105",
    titulo: 'Novo aplicativo promete detectar doenças através de selfies.',
    status_verificacao: 'dubious',
    source: 'Inovação Digital',
    data_coleta: '17/10/2025',
    imageUrl: 'https://images.unsplash.com/photo-1526628953110-d87f58e1d51a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    fullText: 'A startup afirma que o app usa IA para fazer diagnósticos, mas a tecnologia ainda está em fase experimental e não possui validação médica completa, o que a classifica como duvidosa e carente de fontes oficiais.',
    originalLink: 'http://inovacao.com/app',
    author: 'Startup X',
  },
];