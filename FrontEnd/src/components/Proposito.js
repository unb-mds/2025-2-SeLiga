// src/components/Proposito.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Proposito() {
    return (
        <Container fluid className="mt-5 mb-5">

            {/* O Layout de Duas Colunas (Bloco 1 e Bloco 2) */}
            <Row className="justify-content-center">

                {/* Coluna 1 (7 de 12): NOSSO PROPÓSITO - Ocupa mais espaço */}
                <Col md={7} className="mb-3">
                    <Card className="proposito-card h-100">
                        <Card.Body>
                            <div className='titulo-com-icone'>

                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="63" fill="currentColor" class="raio" viewBox="0 0 16 16">
                                <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
                            </svg>
                            <h3 className="card-title-icon"> Nosso Propósito</h3>
                            
                            </div>
                            <p>
                                Este projeto foi desenvolvido como trabalho da disciplina Métodos de Desenvolvimento de Software da Universidade de Brasília (UnB), aplicando conceitos de engenharia de software na prática.
                            </p>
                            <p>
                                O objetivo é criar uma plataforma de análise de notícias que utiliza tecnologias modernas para demonstrar metodologias ágeis, arquitetura de software e trabalho em equipe.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                {/*CARDS DE VALOR - Os Três Cartões Menores */}
                <Col md={5}>
                    <div className="valor-cards-proposito">

                        {/* 1. CARD: Verificação Confiável */}
                        <Card className="valor-cards-Confiavel bg-success-dark mb-3">
                            <Card.Body className="d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="shild" viewBox="0 0 16 16">
                                    <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
                                </svg>
                                <div>
                                    <h5 className='titulo-proposito'>Verificação Confiável</h5>
                                    <p>Algoritmos avançados para identificar e classificar conteúdo suspeito</p>
                                </div>
                            </Card.Body>
                        </Card>
                        {/* 2. CARD: Monitoramento */}
                        <Card className="valor-cards-monitoramento bg-danger-dark mb-4">
                            <Card.Body className="d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="boxes" viewBox="0 0 16 16">
                                    <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z" />
                                </svg>
                                <div>
                                    <h5 className='titulo-proposito'>Monitoramento</h5>
                                    <p>Coleta contínua de dados de múltiplas fontes jornalísticas</p>
                                </div>
                            </Card.Body>
                        </Card>
                        {/* 3. CARD: Transparência Total */}
                            <Card className="valor-cards-trasparencia">
                            <Card.Body className="d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="people" viewBox="0 0 16 16">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                </svg>
                                <div>
                                    <h5 className='titulo-proposito'>Transparência Total</h5>
                                    <p>Interface clara e democrática para acesso à informação verificada</p>
                                </div>
                            </Card.Body>
                        </Card>

                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Proposito;