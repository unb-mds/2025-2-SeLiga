// src/components/Metodologia.js
import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';


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
                <Col md={6} className="mb-4">
                    <Card className="proposito-card">
                        <Card.Body>
                            <div className="titulo-com-icone">
                                <div className='quadrado'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-bullseye" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
                                        <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    </svg>
                                </div>                                
                                <h3 className="card-title-icon"> Framework Ágil</h3>
                            </div>
                            <p className='header-subtitle-small'>
                                Como projeto acadêmico, aplicamos metodologia Scrum para 
                                aprender na prática sobre gestão ágil e desenvolvimento em equipe.
                            </p>
                            {/* Tags de Reunião */}
                            <div className="metodologia-tags">
                                <Badge className="tag-sprint">Semana por Sprint</Badge>
                                <Badge className="tag-reuniao">Daily Standups</Badge>
                                <Badge className="tag-reuniao">Retrospectivas</Badge>
                                <Badge className="tag-reuniao">Code Review</Badge>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Coluna 2: ARQUITETURA E DADOS */}
                <Col md={6} className="mb-4">
                    <Card className="proposito-card">
                        <Card.Body>

                            <div className='titulo-com-icone'>
                                <div className='quadrado'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="caixa" viewBox="0 0 16 16">
                                      <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"/>
                                    </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="40" fill="currentColor" class="palette" viewBox="0 0 16 16">
                                    <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                    <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7" />
                                </svg>
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
                <Col md={10} className="text-center citacao-block">
                    {/* Ícone decorativo (círculo) no fundo do texto */}
                    <div className="decoracao-fundo-citacao"></div>
                    <p className="citacao">
                        "Este projeto representa nossa jornada de aprendizado em **Métodos de Desenvolvimento de Software**, aplicando teoria à prática para criar uma solução tecnológica real."
                    </p>
                    <p className="assinatura-citacao">Estudantes UnB - MDS 2024</p>
                </Col>
            </Row>

        </Container>
    );
}

export default Metodologia;