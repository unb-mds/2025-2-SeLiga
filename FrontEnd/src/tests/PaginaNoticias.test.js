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
    test('deve carregar e exibir as notícias da API usando os componentes reais', async() => {
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
    
});
