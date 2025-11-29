import React from 'react';
import '../styles/popUp.css';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Clock, ExternalLink, Scale } from 'lucide-react';

const PopUp = ({ isOpen, onClose, news }) => {
    if (!isOpen || !news) return null;

    // --- 1. CONFIGURAÇÃO VISUAL (Classes em Português) ---
    const getVeracidadeInfo = (status) => {
        const lowerStatus = (status || 'pendente').toString().toLowerCase();

        if (['verdadeira', 'verificado', 'verified', 'true'].some(k => lowerStatus.includes(k))) {
            return { texto: 'VERIFICADA', Icone: CheckCircle, classe: 'verdadeira' };
        }
        if (['falsa', 'fake', 'false'].some(k => lowerStatus.includes(k))) {
            return { texto: 'FAKE NEWS', Icone: XCircle, classe: 'falsa' };
        }
        if (['duvidosa', 'inconclusiva', 'dubious'].some(k => lowerStatus.includes(k))) {
            return { texto: 'DUVIDOSA', Icone: AlertTriangle, classe: 'duvidosa' };
        }
        return { texto: 'EM ANÁLISE', Icone: Clock, classe: 'pendente' };
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Data n/d';
        try {
            const dateObj = new Date(dateString);
            if (isNaN(dateObj.getTime())) return dateString; 
            return dateObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch { return dateString; }
    };

    const info = getVeracidadeInfo(news.verificacao?.classificacao || news.status_verificacao || news.veracityStatus);
    const justificativaIA = news.verificacao?.justificativa || "A análise detalhada desta notícia ainda está sendo processada pelos nossos sistemas.";

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                
                {/* --- CABEÇALHO --- */}
                <div className="popup-header">
                    <button className="popup-back-button" onClick={onClose}>
                        <ArrowLeft size={18} /> Voltar
                    </button>
                    <div className={`popup-status-badge ${info.classe}`}>
                        <info.Icone size={16} strokeWidth={2.5} />
                        {info.texto}
                    </div>
                </div>

                <div className="popup-scroll-area">
                    
                    {/* --- TÍTULO E META --- */}
                    <div className="popup-article-header">
                        <h1 className="popup-news-title">{news.titulo}</h1>
                        <div className="popup-news-meta">
                            <span className="popup-source-tag">{news.fonte || "FONTE DESCONHECIDA"}</span>
                            <span className="popup-date-text">{formatDate(news.data_coleta)}</span>
                        </div>
                    </div>

                    {/* --- BOX DO VEREDITO --- */}
                    <div className={`popup-verdict-box ${info.classe}`}>
                        <div className="popup-verdict-header">
                            <info.Icone size={28} strokeWidth={2.5} />
                            <span>Veredito: {info.texto}</span>
                        </div>
                        
                        <div className="popup-justification">
                            <span className="justification-label"><Scale size={14} /> Análise da IA:</span>
                            <p>"{justificativaIA}"</p>
                        </div>
                    </div>

                    {/* --- CONTEÚDO --- */}
                    <div className="popup-article-body">
                        <h3 className="popup-section-label">Matéria Original</h3>
                        <p className="popup-full-text">
                            {news.texto || "Texto da notícia não disponível."}
                        </p>
                    </div>

                    {/* --- RODAPÉ --- */}
                    <div className="popup-article-footer">
                        {news.url && (
                            <a href={news.url} target="_blank" rel="noopener noreferrer" className="popup-original-link">
                                Ler na íntegra <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUp;