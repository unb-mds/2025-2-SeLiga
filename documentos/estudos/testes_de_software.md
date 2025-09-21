# Estudo sobre Testes de Software

## Conceito
Testes de software são atividades realizadas para avaliar a qualidade de um sistema ou aplicação e garantir que ele atenda aos requisitos especificados.  
O objetivo principal é **encontrar defeitos antes que o software chegue ao usuário final**.

---

## Objetivos dos Testes
- Avaliar características de um produto como **requisitos, histórias de usuários e designs**.
- **Causar** falhas e **identificar** defeitos.
- Verificar se o software funciona conforme o **esperado**.  
- **Corrigir** defeitos.
- **Reduzir** o nível de **risco** de um software inadequado.  
- Garantir **qualidade, confiabilidade e segurança**.  
- Aumentar a **confiança** do stakeholder e da equipe.  
- **Reduzir custos** a longo prazo (detectar erros cedo é mais barato).
- Melhorar a **experiência do usuário**.

---

## Teste x Debug
- **Teste e debugging** são duas atividades **distintas**.

### → Teste
- Pode **acionar falhas** do sistema, causadas por **defeitos** no software ou pode descobrir **diretamente** esses defeitos no **objeto de teste**.

### → Debugging
- Quando uma falha é acionada pelo teste, o **debugging** participa e acha as **causas** da falha, **analisando-as** e as **eliminando**.
- O processo se resume à:  
    * **1. Reproduzir a falha.**  
    * **2. Encontrar o defeito.**  
    * **3. Diagnosticar o defeito.**   
     
---

## Tipos de Testes

### 1 - Quanto ao Nível
- **Testes de Unidade**: verificam funções/módulos isolados.  
- **Testes de Integração**: verificam a interação entre módulos.  
- **Testes de Sistema**: verificam o sistema completo.  
- **Testes de Aceitação**: verificam se o sistema atende às necessidades do cliente.  

### 2 - Quanto à Abordagem
- **Teste Caixa Branca**: avalia a lógica interna do código.  
- **Teste Caixa Preta**: avalia entradas e saídas, sem olhar o código.  
- **Teste Caixa Cinza**: mistura das duas abordagens.  

### 3 - Quanto ao Propósito
- **Testes Funcionais**: verificam se funcionalidades atendem requisitos.  
- **Testes Não Funcionais**: avaliam desempenho, segurança, usabilidade.  
- **Testes de Regressão**: garantem que alterações não quebrem funcionalidades existentes.  
- **Testes de Stress e Carga**: verificam como o sistema reage sob alta demanda.  

---

## Técnicas de Teste
- **Particionamento de Equivalência**: dividir entradas em classes representativas.  
- **Análise de Valor Limite**: testar valores nos extremos de intervalos.  
- **Tabela de Decisão**: testar combinações de condições.  
- **Testes Baseados em Estado**: avaliar transições entre estados do sistema.  

---

## Automação de Testes
- Usada para agilizar processos e aumentar cobertura.  
- Ferramentas populares:  
  - **JUnit, NUnit, PyTest** → Testes de unidade.  
  - **Selenium, Cypress, Playwright** → Testes de interface.  
  - **JMeter, Locust** → Testes de carga e desempenho.  

---

## Ciclo de Vida dos Testes (STLC)
1. **Análise de Requisitos**  
2. **Planejamento de Testes**  
3. **Design de Casos de Teste**  
4. **Configuração do Ambiente**  
5. **Execução dos Testes**  
6. **Registro de Defeitos**  
7. **Encerramento dos Testes**

---

## Boas Práticas
- Escrever casos de teste claros e objetivos.  
- Priorizar testes críticos.  
- Manter testes atualizados junto com o código.  
- Automatizar sempre que possível.  
- Registrar e analisar resultados.  

---

# Níveis de Teste de Software

## Teste Unitário
O **teste unitário** verifica pequenas partes isoladas do código, geralmente funções, métodos ou classes.  
O objetivo dele é garantir que cada “unidade” do programa funciona corretamente de forma independente.  
Normalmente quem faz esses testes são os **desenvolvedores**, logo após escreverem o código.  

### Exemplo prático
Imagina que temos uma função em Java que soma dois números:
```java
public class Calculadora {
    public int somar(int a, int b) {
        return a + b;
    }
}
```
Escrevendo um teste unitário usando JUnit (framework de testes em Java):
```import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class CalculadoraTest {
    @Test
    public void testSomar() {
        Calculadora calc = new Calculadora();
        int resultado = calc.somar(2, 3);

        // Verifica se a soma de 2 + 3 é igual a 5
        assertEquals(5, resultado);
    }
}
```
Esse teste testa apenas uma unidade do código (o método somar),
não depende de banco de dados, rede ou outro sistema externo,
além de ser rápido e fácil de rodar.

---

## Referências
- ISTQB Foundation Level Syllabus.  
- Myers, G. J. *The Art of Software Testing*.  
