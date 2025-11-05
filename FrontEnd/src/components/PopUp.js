import React from 'react';
import '../styles/popUp.css';
import { FaArrowLeft, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { RiExternalLinkLine } from 'react-icons/ri';
import { FaCircleXmark } from "react-icons/fa6";

const PopUp = ({ isOpen, onClose, news }) => {
    // Se o PopUp não estiver aberto ou não houver dados, não renderiza nada
    if (!isOpen || !news) return null;

    // Define o estilo e ícone de acordo com o status de veracidade
    const getVeracidadeInfo = (status) => {
        const lowerStatus = status?.toLowerCase() || 'pendente'; // Garante que nunca seja nulo

        if (lowerStatus === 'verdadeira' || lowerStatus === 'verificado' || lowerStatus === 'verified') {
            return { texto: 'VERIFICADA', Icone: FaCheckCircle, classe: 'verified' };
        }
        if (lowerStatus === 'falsa' || lowerStatus === 'fake') {
            return { texto: 'FAKE NEWS', Icone: FaCircleXmark, classe: 'fake' };
        }
        if (lowerStatus === 'inconclusiva' || lowerStatus === 'dubious') {
            return { texto: 'DUVIDOSA', Icone: FaExclamationTriangle, classe: 'dubious' };
        }
        return { texto: 'NÃO CLASSIFICADA', Icone: FaExclamationTriangle, classe: 'dubious' };
    };

    const veracidadeInfo = getVeracidadeInfo(news.verificacao?.classificacao || news.status_verificacao);

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                {/* Cabeçalho */}
                <div className="modal-header">
                    <button className="back-button" onClick={onClose}>
                        <FaArrowLeft /> Voltar para Notícias
                    </button>

                    {veracidadeInfo.classe && (
                        <div className={`status-tag ${veracidadeInfo.classe}`}>
                            <veracidadeInfo.Icone className="status-icon" />
                            {veracidadeInfo.texto}
                        </div>
                    )}
                </div>

                {/* Corpo da notícia */}
                <div className="modal-body">
                    <h1 className="news-title">{news.titulo}</h1>

                    <div className="news-meta">
                        <span className="news-source">{news.source || news.fonte}</span>
                        <span className="news-separator">|</span>
                        <span className="news-date">{news.data_coleta}</span>
                    </div>

                    <img
                        src={news.imageUrl || '/noticia.webp'}
                        alt={news.titulo}
                        className="news-image"
                    />

                    <p className="news-full-text">{news.texto}</p>

                    {news.url && (
                        <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="original-link"
                        >
                            Ver notícia original <RiExternalLinkLine />
                        </a>
                    )}
                </div>

                {/* Rodapé */}
                <div className={`modal-footer ${veracidadeInfo.classe}`}>

                    <div className="status-line">
                        <veracidadeInfo.Icone className="footer-icon" /> 
                        <span> {veracidadeInfo.texto}</span>
                    </div>
                    <p className="footer-text">
                        {veracidadeInfo.classe === 'verified' &&
                            'Esta notícia foi verificada e confirmada por fontes confiáveis.'}
                        {veracidadeInfo.classe === 'fake' &&
                            'ATENÇÃO: Esta notícia é classificada como desinformação. Verifique a fonte original.'}
                        {veracidadeInfo.classe === 'dubious' &&
                            'Esta notícia exige verificação. As fontes não são totalmente claras.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
