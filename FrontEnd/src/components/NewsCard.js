import React from 'react';
import { Card } from 'react-bootstrap';

const NewsCard = ({ title, source, date, veracity, imageUrl, statusIcon }) => {

  const getStatusConfig = (status) => {
    const s = (status || "").toLowerCase();

    if (['verdadeira', 'verificado', 'verified'].some(k => s.includes(k))) {
      return { text: 'VERDADEIRA', className: 'status-verified' };
    }

    if (['falsa', 'fake'].some(k => s.includes(k))) {
      return { text: 'FAKE NEWS', className: 'status-fake' };
    }

    if (['duvidosa', 'inconclusiva', 'dubious'].some(k => s.includes(k))) {
      return { text: 'DUVIDOSA', className: 'status-dubious' };
    }

    return { text: 'EM ANÁLISE', className: 'status-pending' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Data n/d';

    try {
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) return dateString;
      return dateObj.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  const config = getStatusConfig(veracity);

  return (
    <Card
      className="news-card professional-style"
      style={{ borderLeftColor: config.color }}
    >
      <Card.Body className="p-4 d-flex flex-column">

        {/* CABEÇALHO: Status + Data */}
        <div className="card-header-row mb-3">
          <div className={`status-tag ${config.className}`}>
            {React.isValidElement(statusIcon)
              ? React.cloneElement(statusIcon, { size: 18, strokeWidth: 3 })
              : null}
            <span>{config.text}</span>
          </div>

          <span className="card-date">{formatDate(date)}</span>
        </div>

        {/* TÍTULO */}
        <Card.Title className="card-title mb-3">
          {title}
        </Card.Title>

        {/* RODAPÉ: Fonte */}
        <div className="card-footer-row mt-auto">
          <span className="source-label">FONTE:</span>
          <span className="source-name">{source}</span>
        </div>

      </Card.Body>
    </Card>
  );
};

export default NewsCard;
