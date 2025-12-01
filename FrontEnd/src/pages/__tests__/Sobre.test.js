import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Sobre from "../Sobre";
import api from "../../api";

// mocks
jest.mock('../../api');

jest.mock('../../components/MembroCard', () => {
    return ({ nome }) => <div data-testid="membro-card">{nome}</div>;
});

jest.mock('../../components/Proposito', () => {
    return () => <div data-testid="proposito-component">Mock Proposito</div>;
});

jest.mock('../../components/Metodologia', () => {
    return () => <div data-testid="metodologia-component">Mock Metodologia</div>;
});

jest.mock('react-icons/bi', () => ({
    BiShieldAlt2: () => <svg data-testid="icon-shield" />
}));

jest.mock('react-icons/fi', () => ({
    FiTarget: () => <svg data-testid="icon-target" />
}));

jest.mock('react-icons/bs', () => ({
    BsPeople: () => <svg data-testid="icon-people" />
}));

describe('Componente <Sobre />', () => {
    
    // Limpa os mocks após cada teste para evitar interferência
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('deve exibir o Spinner de carregamento inicialmente', () => {
        api.get.mockImplementation(() => new Promise(() => {}));

        render(<Sobre />);

        // Verifica se o Spinner está presente (react-bootstrap spinners geralmente têm role="status" ou classe específica)
        // Se o role="status" não for encontrado, podemos buscar pela classe ou estrutura
        const spinner = document.querySelector('.spinner-border');
        expect(spinner).toBeInTheDocument();
    });

    test('deve renderizar o conteúdo e a lista de membros após buscar dados da API com sucesso', async () => {
        const mockData = {
            data: {
                membros: [
                    { nome: 'Arthur', papeis: 'PO', imagem_url: 'Arthur.jpg' },
                    { nome: 'Gustavo', papeis: 'Scrum master', imagem_url: 'Gustavo.jpg' },
                    { nome: 'Amanda', papeis: 'Front end', imagem_url: 'Amanda.jpg' },
                    { nome: 'Marcus', papeis: 'Banco de dados', imagem_url: 'Marcus.jpg' },
                    { nome: 'Erick', papeis: 'DevOps', imagem_url: 'Erick.jpg' },
                    { nome: 'Enzo', papeis: 'Backend', imagem_url: 'Enzo.jpg' },
                ]
            }
        };

        api.get.mockResolvedValue(mockData);

        render(<Sobre />);

        // Aguarda o carregamento sumir e o título aparecer
        await waitFor(() => {
            expect(screen.getByText('Sobre o Projeto')).toBeInTheDocument();
        });

        // Verifica se a API foi chamada corretamente
        expect(api.get).toHaveBeenCalledWith('/sobre');
        expect(api.get).toHaveBeenCalledTimes(1);

        // Verifica se os componentes estáticos estão presentes
        expect(screen.getByTestId('proposito-component')).toBeInTheDocument();
        expect(screen.getByTestId('metodologia-component')).toBeInTheDocument();

        // Verifica se os membros foram renderizados
        // Como mockamos o MembroCard para exibir o nome, buscamos pelo texto
        expect(screen.getByText('Arthur')).toBeInTheDocument();
        expect(screen.getByText('Gustavo')).toBeInTheDocument();
        expect(screen.getByText('Enzo')).toBeInTheDocument();
        expect(screen.getByText('Marcus')).toBeInTheDocument();
        expect(screen.getByText('Amanda')).toBeInTheDocument();
        expect(screen.getByText('Erick')).toBeInTheDocument();
        
        // Verifica a quantidade de cards renderizados
        const cards = screen.getAllByTestId('membro-card');
        expect(cards).toHaveLength(6);
    });

    test('deve lidar com erro na API e renderizar a página sem membros', async () => {
        // Espiona o console.error para suprimir a mensagem de erro no terminal de teste
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Configura o mock da API para falhar
        api.get.mockRejectedValue(new Error('Erro interno do servidor'));

        render(<Sobre />);

        // Aguarda o componente processar o erro e remover o loading
        await waitFor(() => {
            expect(screen.getByText('Sobre o Projeto')).toBeInTheDocument();
        });

        // Verifica se a seção da equipe renderizou, mas vazia (sem cards)
        expect(screen.getByText('Nossa Equipe')).toBeInTheDocument();
        const cards = screen.queryAllByTestId('membro-card');
        expect(cards).toHaveLength(6);

        // Restaura o console.error original
        consoleSpy.mockRestore();
    });
});
