import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const NewsCard = ({ title, source, date, veracity, imageUrl }) => {

  // Lógica para definir a cor do selo (Badge)
  // getVeracityStyle = obtenha o estilo Veracidade
  const getVeracityStyle = (status) => {
    if (!status) {
      return { text: 'NÃO CLASSIFICADA', color: 'secondary' };
    }

    // Deixa o status em minúsculas para comparar
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
        return { text: 'NÃO CLASSIFICADA', color: 'secondary' };
    }
  };

  const statusData = getVeracityStyle(veracity);

  return (
    // O Card principal
    <Card className="news-card">

      {/* Imagem Placeholder */}
      <div
        className="card-image-placeholder"
        style={{ backgroundImage: `url(${imageUrl || '/noticia.webp'})` }}
      >
        {/* O Selo de Veracidade (Badge) deve ficar dentro do placeholder */}
        <Badge pill bg={statusData.color} className="veracity-badge">
          {statusData.text}
        </Badge>
      </div>

      <Card.Body className="p-3">

        {/* O Selo de Veracidade (Badge) */}
        <Badge pill bg={statusData.color} className="veracity-badge">
          {statusData.text}
        </Badge>

        {/* Título da Notícia */}
        <Card.Title className="card-title mt-2">{title}</Card.Title>

        {/* Rodapé (Fonte e Data) */}
        <div className="card-footer d-flex justify-content-between mt-3">
          <span className="card-source">{source}</span>
          <span className="card-date">{date}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;