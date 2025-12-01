import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Shield, Target, Users, BookOpen } from 'lucide-react';
import { TbShield } from "react-icons/tb";
import MembroCard from '../components/MembroCard'; 
import Proposito from '../components/Proposito'; 
import api from '../api';
import '../styles/app.css';
import '../styles/sobre.css';
import Metodologia from '../components/Metodologia';

function Sobre() {
    const [squadData, setSquadData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const equipeBackup = [
        { nome: "Gustavo", papeis: ["Scrum Master", "Back-end"], imagem_url: "/imagens_equipe/gustavo.jpg" },
        { nome: "Arthur", papeis: ["Product Owner", "Back-end"], imagem_url: "/imagens_equipe/arthur.jpg" },
        { nome: "Marcus", papeis: ["Front-end", "Banco de Dados"], imagem_url: "/imagens_equipe/marcus.jpg" },
        { nome: "Amanda", papeis: ["Front-end", "Banco de Dados"], imagem_url: "/imagens_equipe/amanda.jpg" },
        { nome: "Enzo", papeis: ["Back-end", "Arquitetura"], imagem_url: "/imagens_equipe/enzo.jpg" },
        { nome: "Erick", papeis: ["DevOps", "Arquitetura"], imagem_url: "/imagens_equipe/erick.jpg" }
    ];

    useEffect(() => {
        const fetchEquipe = async () => {
            try {
                // Tenta buscar do Back End
                const response = await api.get("/sobre"); 
                setSquadData(response.data); 
            } catch (error) {
                console.warn("API Offline ou Bloqueada. Carregando dados de backup...");
                setSquadData({ membros: equipeBackup }); 
            } finally {
                setIsLoading(false);
            }
        };

        fetchEquipe();
    }, []);

    if (isLoading) {
        return <Container className="text-center py-5"><Spinner animation="border" variant="light" /></Container>;
    }

    const membros = squadData?.membros || [];

    return (
        <Container className="py-5 sobre-container">

            <div className="sobre-header-container text-center py-5">
                {/* ESCUDO DE FUNDO */}
                <div className="shield-icon-background">
                    <TbShield className="escudo-fundo" strokeWidth={1.2} />
                </div>

                <h1 className="header-title">Sobre o Projeto</h1>
                <p className="header-subtitle">Trabalho Acadêmico - Métodos de Desenvolvimento de Software</p>

                {/* ÍCONE DE ALVO E LINHAS */}
                <div className="decorative-line-container">
                    <div className="retangulo1"></div>
                    <Target size={40} className="alvo" />
                    <div className="retangulo2"></div>
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
                    <div className='sobre-equipe-container'>
                        <div className='icon-titulo'>
                            {/* ÍCONE DE PESSOAS */}
                            <Users size={55} className="people2" />
                            <h2 className='subtitulo'> Nossa Equipe </h2>
                        </div>
                        <p className='header-subtitle'>Estudantes da UnB aplicando conhecimentos em Desenvolvimento de Software</p>
                    </div>

                    <div className="equipe-grid mt-4">
                        {membros.map((membro, index) => (
                            <MembroCard
                                key={index}
                                nome={membro.nome}
                                papeis={membro.papeis}
                                imageUrl={membro.imagem_url}
                            />
                        ))}
                    </div>
                </Col>
            </Row>

            {/* SEÇÃO: METODOLOGIA */}
            <Row>
                <Col>
                    <div className='icon-titulo mb-4' style={{justifyContent: 'center'}}>
                         {/* Se quiser adicionar ícone na metodologia também */}
                         {/* <BookOpen size={40} className="me-3" color="#F67655"/> */}
                    </div>
                    <Metodologia />
                </Col>
            </Row>
        </Container>
    );
}

export default Sobre;