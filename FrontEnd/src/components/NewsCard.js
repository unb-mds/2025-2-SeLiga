import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const NewsCard = ({ title, source, date, veracity, imageUrl, statusIcon }) => {

  const getVeracityStyle = (status) => {
    if (!status) {
      return { text: 'EM ANÁLISE', color: 'secondary' };
    }

    const lowerStatus = status.toLowerCase();

    switch (lowerStatus) {
      case 'verdadeira':
      case 'verificado':
      case 'verified':
        return { text: 'VERIFICADA', color: 'success' };

      case 'falsa':
      case 'fake':
        return { text: 'FAKE NEWS', color: 'danger' };

      case 'inconclusiva':
      case 'dubious':
        return { text: 'DUVIDOSA', color: 'warning' };

      case 'pendente':
      default:
        return { text: 'EM ANÁLISE', color: 'secondary' };
    }
  }; 

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não informada';
    try {
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) return dateString; 
      return dateObj.toLocaleDateString('pt-BR');
    } catch (error) {
      return dateString; 
    }
  };

  const statusData = getVeracityStyle(veracity);

  return (
    <Card className="news-card">
      <div
        className="card-image-placeholder"
        style={{ backgroundImage: `url(${imageUrl || '/noticia.webp'})` }}
      >
        <Badge 
          pill 
          bg={statusData.color} 
          className="veracity-badge d-flex align-items-center gap-1"
        >
          {statusIcon}
          <span>{statusData.text}</span>
        </Badge>
      </div>

      <Card.Body className="p-3">
        <Card.Title className="card-title mt-2">{title}</Card.Title>

        <div className="card-footer d-flex justify-content-between mt-3">
          <span className="card-source">{source}</span>
          <span className="card-date">{formatDate(date)}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;