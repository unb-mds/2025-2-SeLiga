import React, { useState, useEffect, useCallback } from 'react';
import { MdStorage, MdCheckCircle, MdCancel, MdError, MdRefresh, MdHelp, MdTrendingUp, MdAssignment } from "react-icons/md";
import api from '../api';
import '../styles/painel.css';

function Painel() {
    const [carregando, setCarregando] = useState(true);
    const [estatisticas, setEstatisticas] = useState({
        total: 0,
        verdadeiras: 0,
        falsas: 0,
        duvidosas: 0,
        pendentes: 0
    });
    const [noticiasRecentes, setNoticiasRecentes] = useState([]);
    const [ultimaAtualizacao, setUltimaAtualizacao] = useState(new Date());

    const getVeracityStatus = (article) => {
        const status = (article.verificacao?.classificacao || article.status_verificacao || 'pendente').toString().toLowerCase();

        if (['falsa', 'fake'].some(k => status.includes(k))) return 'fake';
        if (['verdadeira', 'verificado', 'verified', 'true'].some(k => status.includes(k))) return 'verified';
        if (['duvidosa', 'inconclusiva', 'dubious'].some(k => status.includes(k))) return 'dubious';
        if (article.status_verificacao === 'verificado') return 'verified';

        return 'pendente';
    };

    const buscarDados = useCallback(async () => {
        setCarregando(true);
        try {
            // Busca TODAS as rotas possíveis para não perder nenhuma notícia
            const requests = [
                api.get("/"), 
                api.get("/noticias/status/pendente"),
                api.get("/noticias/status/Pendente"),
                api.get("/noticias/status/verificado"),
                api.get("/noticias/status/fake"),
                api.get("/noticias/status/falsa"),
                api.get("/noticias/status/Falsa"),
                api.get("/noticias/status/duvidosa"),
                api.get("/noticias/status/Duvidosa")
            ];

            const responses = await Promise.all(
                requests.map(req => req.catch(() => ({ data: { noticias: [] } })))
            );

            let todasNoticias = [];
            responses.forEach(res => {
                if (res.data && Array.isArray(res.data.noticias)) {
                    todasNoticias = [...todasNoticias, ...res.data.noticias];
                }
            });

            // Remove duplicatas
            const noticiasUnicas = Array.from(new Set(todasNoticias.map(a => a._id)))
                .map(id => todasNoticias.find(a => a._id === id));

            // Contagem
            let contagem = {
                total: noticiasUnicas.length,
                verdadeiras: 0,
                falsas: 0,
                duvidosas: 0,
                pendentes: 0
            };

            noticiasUnicas.forEach(n => {
                const s = getVeracityStatus(n);
                if (s === 'fake') contagem.falsas++;
                else if (s === 'verified') contagem.verdadeiras++;
                else if (s === 'dubious') contagem.duvidosas++;
                else contagem.pendentes++;
            });

            setEstatisticas(contagem);

            // Tabela Recentes
            const recentes = noticiasUnicas.slice().reverse().slice(0, 5);
            setNoticiasRecentes(recentes);
            setUltimaAtualizacao(new Date());

        } catch (erro) {
            console.error("Erro ao calcular painel:", erro);
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        buscarDados();
        const intervalo = setInterval(buscarDados, 30000);
        return () => clearInterval(intervalo);
    }, [buscarDados]);

    const totalClassificadas = estatisticas.verdadeiras + estatisticas.falsas + estatisticas.duvidosas || 1;
    
    const pctVerdadeira = (estatisticas.verdadeiras / totalClassificadas) * 100;
    const pctFalsa = (estatisticas.falsas / totalClassificadas) * 100;
    // O restante é duvidosa

    const stop1 = pctVerdadeira;
    const stop2 = pctVerdadeira + pctFalsa;

    const estiloGrafico = {
        background: `conic-gradient(
            #28a745 0% ${stop1}%, 
            #dc3545 ${stop1}% ${stop2}%, 
            #ffc107 ${stop2}% 100%
        )`
    };

    // Cálculo da Produtividade
    const totalGeral = estatisticas.total || 1;
    const analisadas = totalGeral - estatisticas.pendentes;
    const porcentagemAnalise = (analisadas / totalGeral) * 100;

    return (
        <div className="container-painel">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                <h1 className="titulo-painel" style={{marginBottom: 0}}>Painel de Controle</h1>
                
                <div style={{textAlign: 'right'}}>
                    <span style={{color: '#888', fontSize: '0.8rem', marginRight: '10px'}}>
                        Atualizado: {ultimaAtualizacao.toLocaleTimeString()}
                    </span>
                    <button onClick={buscarDados} className="botao-detalhes" style={{display: 'inline-flex', alignItems: 'center', gap: '5px'}}>
                        <MdRefresh /> Atualizar
                    </button>
                </div>
            </div>

            {/* CARDS SUPERIORES */}
            <div className="grid-estatisticas">
                <div className="cartao-estatistica cartao-total">
                    <div className="info-estatistica">
                        <h3>Total Coletado</h3>
                        <p className="numero-estatistica">{estatisticas.total}</p>
                    </div>
                    <div className="caixa-icone"><MdStorage /></div>
                </div>

                <div className="cartao-estatistica cartao-verdadeira">
                    <div className="info-estatistica">
                        <h3>Verdadeiras</h3>
                        <p className="numero-estatistica">{estatisticas.verdadeiras}</p>
                    </div>
                    <div className="caixa-icone"><MdCheckCircle /></div>
                </div>

                <div className="cartao-estatistica cartao-duvidosa">
                    <div className="info-estatistica">
                        <h3>Duvidosas</h3>
                        <p className="numero-estatistica">{estatisticas.duvidosas}</p>
                    </div>
                    <div className="caixa-icone"><MdHelp /></div>
                </div>

                <div className="cartao-estatistica cartao-falsa">
                    <div className="info-estatistica">
                        <h3>Fake News</h3>
                        <p className="numero-estatistica">{estatisticas.falsas}</p>
                    </div>
                    <div className="caixa-icone"><MdCancel /></div>
                </div>
            </div>

            <div className="secao-meio">
                
                {/* GRÁFICO */}
                <div className="cartao-painel">
                    <h3>Proporção das Notícias Analisadas</h3>
                    <div className="container-grafico">
                        {totalClassificadas > 0 ? (
                            <>
                                <div className="grafico-pizza" style={estiloGrafico}></div>
                                <div className="legenda-grafico">
                                    <ul>
                                        <li>
                                            <span className="ponto" style={{background: '#28a745'}}></span> 
                                            Verdadeiras: <strong>{pctVerdadeira.toFixed(0)}%</strong>
                                        </li>
                                        <li>
                                            <span className="ponto" style={{background: '#dc3545'}}></span> 
                                            Fakes: <strong>{pctFalsa.toFixed(0)}%</strong>
                                        </li>
                                        <li>
                                            <span className="ponto" style={{background: '#ffc107'}}></span> 
                                            Duvidosas: <strong>{(100 - pctVerdadeira - pctFalsa).toFixed(0)}%</strong>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : <p className="sem-dados">Ainda não há notícias classificadas.</p>}
                    </div>
                </div>

                {/* MONITOR DE PRODUTIVIDADE */}
                <div className="cartao-painel">
                    <h3>Eficiência do Sistema</h3>
                    <div className="painel-progresso-container">
                        
                        {/* Card de Destaque */}
                        <div className="destaque-box">
                            <div className="destaque-icon">
                                <MdTrendingUp size={32} color="#F67655" />
                            </div>
                            <div className="destaque-info">
                                <h4>Volume Processado</h4>
                                <p>A IA já analisou <strong>{analisadas}</strong> de {totalGeral} notícias coletadas </p>
                            </div>
                        </div>

                        {/* Barra de Progresso */}
                        <div className="barra-container">
                            <div className="barra-label">
                                <span>Progresso da Fila</span>
                                <span>{porcentagemAnalise.toFixed(1)}%</span>
                            </div>
                            <div className="barra-trilho">
                                <div 
                                    className="barra-preenchimento" 
                                    style={{width: `${porcentagemAnalise}%`}}
                                ></div>
                            </div>
                        </div>

                        {/* Mini Status */}
                        <div className="mini-status-grid">
                            <div className="mini-status-item">
                                <MdAssignment className="status-icon-mini" />
                                <span><strong>{estatisticas.pendentes}</strong> aguardando análise</span>
                            </div>
                            <div className="mini-status-item">
                                <span className="dot-status success"></span>
                                <span>IA Operante</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cartao-painel">
                <h3>Últimas Notícias Mineradas</h3>
                <div className="tabela-responsiva">
                    <table className="tabela-noticias">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Fonte</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticiasRecentes.map((news) => {
                                const s = getVeracityStatus(news);
                                let classe = 'pendente';
                                let texto = 'Em Análise';
                                if(s === 'fake') { classe = 'falsa'; texto = 'Fake News'; }
                                if(s === 'verified') { classe = 'verdadeira'; texto = 'Verdadeira'; }
                                if(s === 'dubious') { classe = 'duvidosa'; texto = 'Duvidosa'; }

                                return (
                                    <tr key={news._id}>
                                        <td>{news.titulo}</td>
                                        <td>{news.fonte || "Desconhecida"}</td>
                                        <td>
                                            <span className={`selo-status ${classe}`}>
                                                {texto}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Painel;