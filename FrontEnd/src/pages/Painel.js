import React, { useState, useEffect, useCallback } from 'react';
import { MdStorage, MdCheckCircle, MdWarning, MdRefresh } from "react-icons/md";
import { FaSpider } from "react-icons/fa";
import api from '../api';
import '../styles/painel.css';

function Painel() {
    const [carregando, setCarregando] = useState(true);
    const [estatisticas, setEstatisticas] = useState({
        total: 0,
        verdadeiras: 0,
        falsas: 0,
        duvidosas: 0
    });
    const [rastreadores, setRastreadores] = useState([]);
    const [noticiasRecentes, setNoticiasRecentes] = useState([]);
    const [ultimaAtualizacao, setUltimaAtualizacao] = useState(new Date());

    // Função que busca os dados 
    const buscarDados = useCallback(async () => {
        try {
            // Tenta pegar do Back End
            const resposta = await api.get('/painel-resumo');
            const dados = resposta.data;
            
            setEstatisticas(dados.estatisticas);
            setRastreadores(dados.rastreadores);
            setNoticiasRecentes(dados.noticias_recentes);
            setUltimaAtualizacao(new Date()); 
            setCarregando(false);

        } catch (erro) {
            console.warn("API Offline. Usando dados de fallback.");
            if (carregando) {
               // Apenas dados de exemplo para não quebrar a tela na apresentação se a API cair
               setEstatisticas({ total: 324, verdadeiras: 142, falsas: 89, duvidosas: 93 });
               setRastreadores([
                   { nome: "Band Notícias", status: "ativo", tempo: "10 min atrás" },
                   { nome: "Metrópoles", status: "ativo", tempo: "15 min atrás" },
                   { nome: "LeoDias", status: "erro", tempo: "Falha na conexão" }
               ]);
               setCarregando(false);
            }
        }
    }, [carregando]);

    // Roda ao abrir E configura o relógio para rodar a cada 30 segundos
    useEffect(() => {
        buscarDados(); 

        const intervalo = setInterval(() => {
            buscarDados(); 
        }, 30000);

        // Limpeza: Se o usuário sair da tela, o relógio para (evita travar o pc)
        return () => clearInterval(intervalo);
    }, [buscarDados]);

    // LÓGICA DO GRÁFICO DINÂMICO

    const total = estatisticas.total || 1; 
    const pctVerdadeira = (estatisticas.verdadeiras / total) * 100;
    const pctFalsa = (estatisticas.falsas / total) * 100;
    // A duvidosa é o que sobra
    
    const estiloGrafico = {
        background: `conic-gradient(
            #28a745 0% ${pctVerdadeira}%, 
            #dc3545 ${pctVerdadeira}% ${pctVerdadeira + pctFalsa}%, 
            #ffc107 ${pctVerdadeira + pctFalsa}% 100%
        )`
    };

    return (
        <div className="container-painel">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h1 className="titulo-painel" style={{marginBottom: 0}}>Painel de Controle</h1>
                
                {/* Botão de Atualizar Manualmente */}
                <div style={{textAlign: 'right'}}>
                    <span style={{color: '#888', fontSize: '0.8rem', marginRight: '10px'}}>
                        Atualizado: {ultimaAtualizacao.toLocaleTimeString()}
                    </span>
                    <button onClick={buscarDados} className="botao-detalhes" style={{display: 'inline-flex', alignItems: 'center', gap: '5px'}}>
                        <MdRefresh /> Atualizar
                    </button>
                </div>
            </div>

            {/* CARTÕES DO TOPO */}
            <div className="grid-estatisticas">
                <div className="cartao-estatistica cartao-total">
                    <div className="info-estatistica">
                        <h3>Total Minerado</h3>
                        <p className="numero-estatistica">{estatisticas.total}</p>
                    </div>
                    <div className="caixa-icone">
                        <MdStorage />
                    </div>
                </div>

                <div className="cartao-estatistica cartao-verdadeira">
                    <div className="info-estatistica">
                        <h3>Verdadeiras</h3>
                        <p className="numero-estatistica">{estatisticas.verdadeiras}</p>
                    </div>
                    <div className="caixa-icone">
                        <MdCheckCircle />
                    </div>
                </div>

                <div className="cartao-estatistica cartao-falsa">
                    <div className="info-estatistica">
                        <h3>Notícias Falsas</h3>
                        <p className="numero-estatistica">{estatisticas.falsas}</p>
                    </div>
                    <div className="caixa-icone">
                        <MdWarning />
                    </div>
                </div>
            </div>

            {/* SEÇÃO DO MEIO */}
            <div className="secao-meio">
                <div className="cartao-painel">
                    <h3>Distribuição de Veracidade</h3>
                    <div className="container-grafico">

                        <div className="grafico-pizza" style={estiloGrafico}></div>
                        
                        <div className="legenda-grafico">
                            <ul>
                                <li><span className="ponto" style={{background: '#28a745'}}></span> Verdadeiras ({pctVerdadeira.toFixed(1)}%)</li>
                                <li><span className="ponto" style={{background: '#dc3545'}}></span> Falsas ({pctFalsa.toFixed(1)}%)</li>
                                <li><span className="ponto" style={{background: '#ffc107'}}></span> Duvidosas ({(100 - pctVerdadeira - pctFalsa).toFixed(1)}%)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="cartao-painel">
                    <h3>Status dos Coletores</h3>
                    <div className="lista-rastreadores">
                        {rastreadores.length > 0 ? rastreadores.map((robo, index) => (
                            <div className="item-rastreador" key={index}>
                                <div className="info-rastreador">
                                    <FaSpider color="#aaa" />
                                    <strong>{robo.nome}</strong>
                                </div>
                                <div className="status-rastreador text-right">
                                    <div style={{display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'flex-end'}}>
                                        <span 
                                            className="ponto-status" 
                                            style={{backgroundColor: robo.status === 'ativo' ? '#28a745' : '#dc3545'}}
                                        ></span>
                                        <span style={{fontSize: '0.9rem', color: robo.status === 'ativo' ? '#28a745' : '#dc3545'}}>
                                            {robo.status === 'ativo' ? 'Ativo' : 'Erro'}
                                        </span>
                                    </div>
                                    <small className="tempo-rastreador">{robo.tempo}</small>
                                </div>
                            </div>
                        )) : <p style={{color: '#888'}}>Nenhum coletor ativo.</p>}
                    </div>
                </div>
            </div>

            {/* TABELA INFERIOR */}
            <div className="cartao-painel">
                <h3>Últimas Notícias Processadas</h3>
                <div className="tabela-responsiva">
                    <table className="tabela-noticias">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Fonte</th>
                                <th>Status</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticiasRecentes.map((noticia) => (
                                <tr key={noticia.id || Math.random()}>
                                    <td>{noticia.titulo}</td>
                                    <td>{noticia.fonte}</td>
                                    <td>
                                        <span className={`selo-status ${noticia.status && noticia.status.toLowerCase() === 'verdadeira' ? 'verdadeira' : 'falsa'}`}>
                                            {noticia.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="botao-detalhes">Ver Detalhes</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Painel;