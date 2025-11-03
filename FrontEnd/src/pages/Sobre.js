import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import MembroCard from '../components/MembroCard'; 
import Proposito from '../components/Proposito'; 
import api from '../api';
import '../styles/app.css';
import '../styles/sobre.css';
import Metodologia from '../components/Metodologia';
import { BiShieldAlt2 } from "react-icons/bi";
import { FiTarget } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";


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
                    <BiShieldAlt2 className='escudo-fundo'/>
                </div>

                <h1 className="header-title">Sobre o Projeto</h1>
                <p className="header-subtitle">Trabalho Acadêmico - Métodos de Desenvolvimento de Software</p>

                {/* O Círculo e a Linha de Destaque */}
                <div className="decorative-line-container">
                    <div class="retangulo1"></div>
                        <FiTarget className='alvo'/>
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
                                <BsPeople className='people2'/>
                            <h2 className='subtitulo'> Nossa Equipe </h2>
                        </div>
                    <p className='header-subtitle'>Estudantes da UnB aplicando conhecimentos em desenvolvimento de software</p>
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