import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { CheckCircle, AlertTriangle, XCircle, List, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/Tabs";
import { SearchBar } from "../components/SearchBar";
import NewsCard from "../components/NewsCard";
import { IoIosSearch } from "react-icons/io";
import PopUp from "../components/PopUp";
import api from "../api";
import '../styles/app.css';
import '../styles/noticias.css';

const ITEMS_PER_PAGE = 9;

// --- COMPONENTE DE PAGINAÇÃO ---
const PaginationControl = ({ lista, currentPage, setCurrentPage }) => {
  if (lista.length === 0) return null;

  const totalPages = Math.ceil(lista.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = lista.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const pageNumbers = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  return (
    <>
      <div className="news-grid">
        {currentItems.map((article) => (
          <div key={article._id} onClick={() => article.onClick(article)}>
            <NewsCard
              title={article.titulo}
              source={article.fonte || "Fonte desconhecida"}
              date={article.data_coleta || "Data não informada"}
              veracity={article.veracityStatus}
              statusIcon={article.statusIcon} 
              imageUrl={article.imageUrl}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="paginacao-container">
          <button 
            className="btn-paginacao" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>
          
          {pageNumbers.map(number => (
            <button
              key={number}
              className={`btn-paginacao ${currentPage === number ? 'ativo' : ''}`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}

          <button 
            className="btn-paginacao" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
};

const PaginaNoticias = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [veracityFilter, setVeracityFilter] = useState("todas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // --- BUSCA DAS NOTÍCIAS ---
  const fetchArticlesList = async () => {
    setIsLoading(true);
    try {
      const endpoints = [
        "/", 
        "/noticias/status/pendente",
        "/noticias/status/Pendente",
        "/noticias/status/verificado",
        "/noticias/status/fake",
        "/noticias/status/falsa"
      ];

      const responses = await Promise.all(
        endpoints.map(url => api.get(url).catch(() => ({ data: { noticias: [] } })))
      );

      const allNews = responses.flatMap(res => res.data.noticias || []);
      const uniqueNews = Array.from(new Map(allNews.map(item => [item._id, item])).values());
      
      setArticles(uniqueNews.reverse());

    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };
   
  useEffect(() => { fetchArticlesList(); }, []);
  useEffect(() => { setCurrentPage(1); }, [searchTerm, veracityFilter]);

  const handleRefresh = () => fetchArticlesList();

  const handleCardClick = (article) => {
    setSelectedNews(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // --- LÓGICA DE ÍCONES ---
  const getVeracityStatus = (article) => {
    const status = (article.verificacao?.classificacao || article.status_verificacao || 'pendente').toString().toLowerCase();
    
    if (['falsa', 'fake', 'false'].some(k => status.includes(k))) return 'fake';
    if (['verdadeira', 'verificado', 'verified', 'true'].some(k => status.includes(k))) return 'verified';
    if (['duvidosa', 'inconclusiva', 'dubious'].some(k => status.includes(k))) return 'dubious';
    
    return 'pendente';
  };

  const getStatusIcon = (status) => {
    const iconSize = 20;

    switch (status) {
      case 'verified': return <CheckCircle size={iconSize} />;
      case 'fake': return <XCircle size={iconSize} />;
      case 'dubious': return <AlertTriangle size={iconSize} />;
      case 'pendente': return <Clock size={iconSize} />;
      default: return <Clock size={iconSize} />;
    }
  };
  const processedArticles = articles.map(a => {
    const status = getVeracityStatus(a);
    return {
      ...a,
      veracityStatus: status,
      statusIcon: getStatusIcon(status),
      onClick: handleCardClick
    };
  });

  // Filtros
  const pendingList = processedArticles.filter(a => a.veracityStatus === 'pendente');
  const mainList = processedArticles.filter(a => a.veracityStatus !== 'pendente');

  const displayedMainArticles = mainList.filter(article => {
    const matchSearch = article.titulo?.toLowerCase().includes(searchTerm.toLowerCase());
    if (veracityFilter === "todas") return matchSearch;
    return matchSearch && article.veracityStatus === veracityFilter;
  });

  const displayedPendingArticles = pendingList.filter(a => 
    a.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="noticias-pagina">
      <div className="content-area">
        <h1 className="main-title">Central de Notícias</h1>
        <p className="subtitle">Acompanhe e analise todas as notícias monitoradas</p>

        <div className="busca-container">
          <div className="container-busca-filtro">
            <SearchBar
              placeholder="Buscar notícias"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <Button onClick={handleRefresh} disabled={isLoading}>
              <IoIosSearch className="pesquisa" />
              <span className="texto-botao">{isLoading ? "..." : "Buscar"}</span>
            </Button>
          </div>
          
          <div className="veracidade-filtros">
            {[
              { id: 'verified', icon: <CheckCircle size={18} />, label: 'Verificadas' },
              { id: 'dubious', icon: <AlertTriangle size={18} />, label: 'Duvidosas' },
              { id: 'fake', icon: <XCircle size={18} />, label: 'Fake News' },
              { id: 'todas', icon: <List size={18} />, label: 'Todas' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setVeracityFilter(btn.id)}
                className={veracityFilter === btn.id ? "ativo" : ""}
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="main" onValueChange={() => { setCurrentPage(1); setVeracityFilter("todas"); }}>
          <TabsList className="tabs-list">
            <TabsTrigger value="main">Mural de Notícias</TabsTrigger>
            <TabsTrigger value="analysis">Em Análise </TabsTrigger>
          </TabsList>

          <TabsContent value="main">
            {displayedMainArticles.length === 0 && !isLoading ? (
              <div className="mensagem-vazia mt-4" style={{textAlign: 'center', color: '#888'}}>
                Nenhuma notícia encontrada com este filtro.
              </div>
            ) : (
              <PaginationControl 
                lista={displayedMainArticles} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
              />
            )}
          </TabsContent>

          <TabsContent value="analysis">
            {displayedPendingArticles.length === 0 && !isLoading ? (
              <div className="mensagem-vazia mt-4" style={{textAlign: 'center', color: '#888'}}>
                Tudo limpo! Nenhuma notícia aguardando análise.
              </div>
            ) : (
              <PaginationControl 
                lista={displayedPendingArticles} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
              />
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