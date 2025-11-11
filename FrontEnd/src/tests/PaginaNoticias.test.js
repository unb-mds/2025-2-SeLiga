import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import api from '../api';
import PaginaNoticias from '../pages/PaginaNoticias';

jest.mock('../api');            // mock da api para evitar falha desnecessárias nos testes devido a falhas de conexão

jest.mock('react-icons/io', () => ({
    IoIosSearch: () => <span>Texto exemplo</span>,      // texto que substitui o ícone
}))

// mock dos dados de simulação para testes
const DADOS_MOCK = [
    {
        _id: '1',
        titulo: 'Noticia teste 1',
        texto: 'Este é o corpo de teste da notícia 1...',
        fonte: 'Blog da falsidade',
        url: 'http://exemplo.com/1',
        data_coleta: '2025-11-10',
        status_verificacao: 'falsa',
        verificacao: { classificacao: 'falsa' }
    },
    {
        _id: '2',
        titulo: 'Noticia teste 2',
        texto: 'Este é o corpo de teste da notícia 2...',
        fonte: 'Blog da verdade',
        url: 'http://exemplo.com/2',
        data_coleta: '2024-02-01',
        status_verificacao: 'verificado',
        verificacao: { classificacao: 'verdadeira' }
    }
];

// TESTES
describe('PaginaNoticias', () => {
    // setup dos dados pela api mockada
    beforeEach(() => {
        jest.clearAllMocks();
        api.get.mockResolvedValue({
            data: {
                noticias: DADOS_MOCK,
            },
        });
    });

    // teste 1: carregamento e exibição
    test('carregar e exibir as notícias da API usando os componentes', async() => {
        render(<PaginaNoticias/>);      // carrega a pagina de notícias

        // o botão deve mostrar "Atualizando..."
        expect(screen.getByRole('button', {name: /Atualizando.../i})).toBeInTheDocument();
        await waitFor(() => {
            // newsCard deve renderizar o título da notícia
            expect(screen.getByText('Noticia teste 1')).toBeInTheDocument();
        });
        // verifica se a outra notícia também está la
        expect(screen.getByText('Noticia teste 2')).toBeInTheDocument();

        // botão voltou ao estado "Buscar"
        expect(screen.getByRole('button', {name: /Buscar/i})).toBeInTheDocument();
    });

    // teste 2: SearchBar
    test('filtrar as notícias ao digitar na SearchBar', async() => {
        render(<PaginaNoticias/>);      // carrega a pagina de noticias

        await waitFor(() => {
            // newsCard deve renderizar o título da notícia
            expect(screen.getByText('Noticia teste 1')).toBeInTheDocument();
        });
        // verifica se a outra notícia também está la
        expect(screen.getByText('Noticia teste 2')).toBeInTheDocument();

        // simulação do usuário utilizando a search bar
        const inputBusca = screen.getByPlaceholderText('Buscar notícias')       // placeholder presente em PaginaNoticias.js
        await userEvent.type(inputBusca, 'Noticia teste 2');

        // verificação do resultado da busca pela notícia
        expect(screen.queryByText('Noticia teste 1')).not.toBeInTheDocument();      // não queremos que a notícia 1 esteja no documento já que o usuário pesquisou 'Notícia 2'
        expect(screen.getByText('Noticia teste 2')).toBeInTheDocument();            // 'Noticia teste 2' deve aparecer no documento  
    });
    
    // teste 3: integração dos filtros
    test('filtrar notícias ao clicar no botão de filtro', async() => {
        render(<PaginaNoticias/>);

        await waitFor(() => {
            // newsCard deve renderizar o título da notícia
            expect(screen.getByText('Noticia teste 1')).toBeInTheDocument();
        });

        // clica no botão de filtro
        const botaoFake = screen.getByRole('button', {name: /❌ Fake News/i });
        await userEvent.click(botaoFake);

        // verificação do resultado do filtro pelo botão
        expect(screen.queryByText('Noticia teste 2')).not.toBeInTheDocument();      // como 'Noticia teste 2' é verdadeira, não deveria aparecer no documento
        expect(screen.getByText('Noticia teste 1')).toBeInTheDocument();            // como 'Noticia teste 1' é falsa, deveria aparecer no documento
    });
});
