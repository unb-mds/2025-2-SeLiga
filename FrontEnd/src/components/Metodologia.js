// src/components/Metodologia.js
import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { IoMdColorPalette } from "react-icons/io";
import { BsBoxes } from "react-icons/bs";
import { LuTarget } from "react-icons/lu";
import { GiBorderedShield } from "react-icons/gi";

function Metodologia() {
    return (
        <Container fluid className="metodologia-section py-1">

            {/* Título Principal da Seção */}
            <div className='sobre-equipe-container'>
                <div className='icon-titulo'>
                    <h2 className='subtitulo'> Metodologia e Dados </h2>
                </div>
                <p className="header-subtitle">Aplicação prática dos conceitos aprendidos na disciplina</p>
            </div>


            {/* Layout de Duas Colunas (Propósito e Arquitetura) */}
            <Row className="justify-content-center">

                {/* Coluna 1: NOSSO PROPÓSITO (Metodologia) */}
                <Col md={6}>
                    <Card className="metodologia-card">
                        <Card.Body>
                            <div className="titulo-com-icone">
                                <div className='quadrado'>
                                    <LuTarget className='alvo2'/>    
                                </div>                                
                                <h3 className="card-title-icon"> Framework Ágil</h3>
                            </div>
                            <p className='header-subtitle-small'>
                                Como projeto acadêmico, aplicamos metodologia Scrum para 
                                aprender na prática sobre gestão ágil e desenvolvimento em equipe.
                            </p>
                            {/* Tags de Reunião */}
                            <div className="metodologia-tags">
                                
                                <Badge className="tag-sprint"> <h5 className='numero-sprint'> 1 </h5> Semana por Sprint</Badge>
                                <div className="metodologia-tags-menores">
                                    <Badge className="tag-reuniao">Daily Standups</Badge>
                                    <Badge className="tag-reuniao">Retrospectivas</Badge>
                                    <Badge className="tag-reuniao">Code Review</Badge>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Coluna 2: ARQUITETURA E DADOS */}
                <Col md={6}>
                    <Card className="metodologia-card">
                        <Card.Body>

                            <div className='titulo-com-icone'>
                                <div className='quadrado'>
                                        <BsBoxes className='caixa'/>
                                </div>
                                <h3 className="card-title-icon"> Arquitetura e Dados </h3>
                            </div>
                            <p className='header-subtitle-small'>
                                O projeto simula um sistema real de análise de notícias, 
                                implementando arquitetura moderna e boas práticas de desenvolvimento de software.
                            </p>
                            {/* Cards Internos (Processamento IA e Visualização) */}
                            <div className="internal-card-ia">       
                                <img src="/brain.svg" className='brain' />  
                                <div className='card-text-content'>  
                                    <h4 className='subtitulo-metod-card2'> Processamento IA </h4>
                                    <p className='text-metod'>Análise semântica e classificação</p>
                                </div> 
                            </div>


                            <div className="internal-card-vis">
                                    <IoMdColorPalette className='palette'/>
                                <div className='card-text-content'>
                                    <h4 className='subtitulo-metod-card2'> Visualização </h4>
                                    <p className='text-metod'>Interface intuitiva e dashboards</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Seção Final: Citação de Encerramento */}
            <Row className="justify-content-center mt-5">
                <Col md={11}>
                    <div className="citacao-container text-center py-5">
                        <div className="citacao-icone-decorativo">
                            <div className='circulo-grande'>
                                <GiBorderedShield className='escudo-citacao'/>
                            </div>
                        </div>

                        {/* A Citação */}
                        <p className="citacao-texto">
                            "Este projeto representa nossa jornada de aprendizado em Métodos de Desenvolvimento de Software,
                             aplicando teoria à prática para criar uma solução tecnológica real."
                        </p>
                        <div className="citacao-assinatura-bloco">
                            <span className="assinatura-texto">Estudantes UnB - MDS 2024</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}export default Metodologia;