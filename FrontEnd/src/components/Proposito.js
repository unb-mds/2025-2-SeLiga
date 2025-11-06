// src/components/Proposito.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AiFillThunderbolt } from "react-icons/ai";
import { LuShield } from "react-icons/lu";
import { BsBoxes, BsPeople } from "react-icons/bs";

function Proposito() {
    return (
        <Container fluid className="mt-5 mb-5">

            <Row className="justify-content-center">

                {/*  NOSSO PROPÓSITO */}
                <Col md={7} className="mb-3">
                    <Card className="proposito-card h-100">
                        <Card.Body>
                            <div className='titulo-com-icone'>
                                <div className='quadrado'>
                                    <AiFillThunderbolt className='raio' />
                            </div>
                            <h3 className="card-title-icon"> Nosso Propósito</h3>
                            
                            </div>
                            <p>
                                Este projeto foi desenvolvido como trabalho da disciplina 
                                Métodos de Desenvolvimento de Software da Universidade de Brasília (UnB), 
                                aplicando conceitos de engenharia de software na prática.
                            </p>
                            <p>
                                O objetivo é criar uma plataforma de análise de notícias que utiliza 
                                tecnologias modernas para demonstrar metodologias ágeis, arquitetura de software e 
                                trabalho em equipe.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Os Três Cartões Menores */}
                <Col md={4} className="mb-3">
                    <div className="valor-cards-proposito">

                        {/* CARD: Verificação Confiável */}
                        <Card className="valor-cards-Confiavel bg-success-dark mb-3">
                            <Card.Body className="proposito-section d-flex align-items-center">
                                <LuShield className='shild'/>
                                <div>
                                    <h5 className='titulo-proposito'>Verificação Confiável</h5>
                                    <p>Algoritmos avançados para identificar e classificar conteúdo suspeito</p>
                                </div>
                            </Card.Body>
                        </Card>
                        {/* CARD: Monitoramento */}
                        <Card className="valor-cards-monitoramento bg-danger-dark mb-3">
                            <Card.Body className="d-flex align-items-center">
                                    <BsBoxes className='boxes'/>
                                <div>
                                    <h5 className='titulo-proposito'>Monitoramento</h5>
                                    <p>Coleta contínua de dados de múltiplas fontes jornalísticas</p>
                                </div>
                            </Card.Body>
                        </Card>
                        {/* CARD: Transparência Total */}
                            <Card className="valor-cards-trasparencia">
                            <Card.Body className="d-flex align-items-center">
                                    <BsPeople className='people'/>
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