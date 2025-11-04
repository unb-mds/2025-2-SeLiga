import React from 'react';
import { Card } from 'react-bootstrap';

// Este componente exibe um único membro da equipe
function MembroCard({ nome, papeis, imageUrl }) {
    return (
        <Card className="membro-card" bg="dark" text="white">
            {/* Imagem do Membro */}
            <div className="membro-foto" style={{ backgroundImage: `url(${imageUrl})` }}>
                {/* Aqui vai a foto */}
            </div>

            <Card.Body>
                {/* Nome e Papel */}
                <Card.Title>{nome}</Card.Title>
                <Card.Text className="text-secondary">
                    {/* Junta os papéis em uma string (ex: "Scrum Master, Back-end") */}
                    {papeis.join(', ')}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default MembroCard;