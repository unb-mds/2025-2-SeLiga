import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import MembroCard from '../components/MembroCard'; 
import Proposito from '../components/Proposito'; 
import api from '../api';
import '../styles/app.css';
import '../styles/sobre.css';
import Metodologia from '../components/Metodologia';


// --- Defina a Estrutura da Página Sobre  ---
function Sobre() {
    // --- ADICIONE A LÓGICA DE ESTADO E BUSCA ---
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

            <div className="sobre-header-container text-center py-5">

                <div className="shield-icon-background">
                    <svg xmlns="http://www.w3.org/2000/svg" width="275" height="275" fill="currentColor" class="escudo-fundo" viewBox="0 0 16 16">
                        <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
                    </svg>
                </div>

                <h1 className="header-title">Sobre o Projeto</h1>
                <p className="header-subtitle">Trabalho Acadêmico - Métodos de Desenvolvimento de Software</p>

                {/* O Círculo e a Linha de Destaque */}
                <div className="decorative-line-container">
                    <div class="retangulo1"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="alvo" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
                        <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                    <div class="retangulo2"></div>
                </div>
            </div>

            {/* SEÇÃO: PROPÓSITO */}
            <Row className="mb-5">
                <Col>
                    <Proposito />        
                </Col>
            </Row>

            {/* SEÇÃO: NOSSA EQUIPE */}
            <Row className="mb-5">
                <Col>
                    {/* Exibe o nome do Squad que veio do backend */}
                    <div className='sobre-equipe-container'>
                        <div className='icon-titulo'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="people2" viewBox="0 1 14 16">
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                            </svg>
                            <h2 className='subtitulo'> Nossa Equipe </h2>
                        </div>
                    <p className='header-subtitle'>Estudantes da UnB aplicando conhecimentos em Desenvolvimento de Software</p>
                     </div>

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

            {/* SEÇÃO: METODOLOGIA */}
            <Row>
                <Col>
                    <Metodologia />
                </Col>
            </Row>
        </Container>
    );
}

export default Sobre;