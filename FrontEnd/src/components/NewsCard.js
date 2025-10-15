import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const NewsCard = ({ title, source, date, veracity, imageUrl }) => {

  // Lógica para definir a cor do selo (Badge)
  // getVeracityStyle = obtenha o estilo Veracidade
  const getVeracityStyle = (status) => {
    // VERIFICAÇÃO DE SEGURANÇA: Se o status for nulo ou vazio, retorna o default imediatamente.
    if (!status) {
      return { text: 'AGUARDANDO CLASSIFICAÇÃO', color: 'secondary' };
    }

    // Processa o status se ele existir
    switch (status.toLowerCase()) {
      case 'verified':
        return { text: 'VERIFICADA', color: 'success' }; // Verde
      case 'fake':
        return { text: 'FAKE NEWS', color: 'danger' }; // Vermelho
      case 'dubious':
        return { text: 'DUVIDOSA', color: 'warning' }; // Amarelo
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
        style={{ backgroundImage: `url(${imageUrl})` }}
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