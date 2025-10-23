import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import MembroCard from '../components/MembroCard'; 
import api from '../api'; // Para fazer a requisição

// --- 1. Defina a Estrutura da Página Sobre  ---
function Sobre() {
    // --- 2. ADICIONE A LÓGICA DE ESTADO E BUSCA ---
    const [squadData, setSquadData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEquipe = async () => {
            try {
                //Chama a nova rota equipe do backend
                const response = await api.get("/equipe");
                setSquadData(response.data); // Recebe o objeto completo (squad e membros)
            } catch (error) {
                console.error("Erro ao buscar dados da equipe:", error);
                setSquadData({ membros: [] }); // Evita quebrar o app
            } finally {
                setIsLoading(false);
            }
        };

        fetchEquipe();
    }, []);

    // --- Lógica de Renderização ---
    // Opcional: Se os dados ainda não chegaram
    if (isLoading) {
        return <Container className="text-center py-5"><Spinner animation="border" variant="light" /></Container>;
    }

    const membros = squadData?.membros || []; // Garante que a lista não é nula

    return (
        <Container className="py-5 sobre-container">
            <Row className="mb-5">
                <Col>
                    <h1 className="text-white">O Projeto Se Liga</h1>
                    <p className="lead text-secondary">
                        Informações sobre o projeto e a equipe.
                    </p>
                </Col>
            </Row>

            {/* 3. SEÇÃO: NOSSA EQUIPE (Onde a mágica acontece) */}
            <Row className="mb-5">
                <Col>
                    {/* Exibe o nome do Squad que veio do backend */}
                    <h2>A Equipe ({squadData?.squad || 'Squad'})</h2>

                    {/* O grid onde os cartões serão organizados */}
                    <div className="equipe-grid mt-4">
                        {membros.map(membro => (
                            <MembroCard
                                key={membro.nome}
                                nome={membro.nome}
                                papeis={membro.papeis}
                                imageUrl={membro.imagem_url} // Passa a URL da imagem
                            />
                        ))}
                    </div>
                </Col>
            </Row>

            {/* 4. SEÇÃO: METODOLOGIA (Pode ser estático por enquanto) */}
            <Row>
                <Col>
                    <h2>Tecnologia e Metodologia</h2>
                    <p>
                        Utilizamos a metodologia Ágil (Scrum) e a arquitetura Full-Stack (Python/FastAPI e React)...
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Sobre;