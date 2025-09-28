# Estudo de React

React é uma **biblioteca de JavaScript** criada pelo Facebook para construir interfaces de usuário de forma prática, declarativa e eficiente. Ou seja, para usar React, é essencial conhecer bem **JavaScript moderno (ES6+)**, pois toda a lógica e manipulação de dados são feitas usando JS.

Com React, conseguimos:

* Criar **componentes reutilizáveis**, que podem ser usados em diferentes partes da aplicação.
* Usar **JSX**, que permite escrever HTML dentro do JavaScript de forma clara e organizada.
* Gerenciar **estado** e **efeitos colaterais** de componentes usando **hooks**.
* Navegar entre páginas de forma fluida com **React Router**, sem recarregar a página.

---

## 1. JavaScript Moderno (ES6+)

### 1.1 Arrow Functions

* São funções mais curtas e fáceis de ler.
* Mantêm automaticamente o contexto do `this`  do escopo em que foram criadas.

```javascript
// Função tradicional
function soma(a, b) {
  return a + b;
}

// Arrow function
const soma = (a, b) => a + b;
```

### 1.2 Destructuring

* Permite extrair valores de arrays ou objetos de forma prática.
* Facilita a leitura e evita repetir código.

```javascript
// Array
const numeros = [1, 2, 3];
const [a, b] = numeros; // a=1, b=2

// Objeto
const pessoa = { nome: "Amanda", idade: 24 };
const { nome, idade } = pessoa; // nome="Amanda", idade=25
```

### 1.3 Módulos

* Organizam o código em arquivos separados.
* Permite exportar e importar funções, objetos ou constantes.

```javascript
// math.js
export const soma = (a, b) => a + b;

// app.js
import { soma } from './math.js';
console.log(soma(2,3)); // 5
```

### 1.4 Promises

* Tratam operações assíncronas, como requisições de API
* Permitem lidar com sucesso (resolve) ou erro (reject) de maneira organizada.

```javascript
const promessa = new Promise((resolve, reject) => {
  const sucesso = true;
  if(sucesso) resolve("Feito!");
  else reject("Erro");
});

promessa
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

### 1.5 Async/Await

* Sintaxe mais limpa para lidar com Promises.
* Evita o encadeamento de `.then()` e melhora a legibilidade.
* Pode ser combinado com `try/catch` para tratar erros.

```javascript
const fetchDados = async () => {
  try {
    const res = await fetch("https://api.example.com/dados");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Erro:", err);
  }
};
fetchDados();
```

---

## 2. Conceitos Básicos de React

### 2.1 Componentes

* São blocos de código que representam partes da interface.
* Podem ser reutilizados em vários lugares.
* Tipos:

  * Função (mais usada atualmente)
  * Classe (mais antiga, hoje em dia é usado mais o hooks)

```jsx
function Botao() {
  return <button>Clique aqui</button>;
}
```

### 2.2 JSX

* Sintaxe que mistura HTML e JS.
* Facilita a criação de elementos visuais diretamente dentro do código.

```jsx
const elemento = <h1>hiiiii/h1>;
```

### 2.3 Props (Propriedades)

* Passam dados do componente pai para o filho.
* São **imutáveis** dentro do componente filho.

```jsx
function Saudacao({ nome }) {
  return <h1>Oie, {nome}!</h1>;
}
<Saudacao nome="Amanda" />
```

### 2.4 State (Estado)

* Armazena informações que podem mudar e atualizar a UI.
* Usado com `useState`.

```jsx
import { useState } from "react";
function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contagem: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

---

## 3. Hooks Principais

### 3.1 useState

* Cria e gerencia estado interno de um componente.

```jsx
const [valor, setValor] = useState(0);
```

### 3.2 useEffect

* Executa efeitos colaterais, como requisições ou manipulação de DOM.
* Pode ser executado uma vez ou sempre que uma variável mudar.

```jsx
useEffect(() => {
  console.log("Componente montado");
}, []); // [] = executa apenas uma vez
```

### 3.3 useContext

* Compartilha estado entre componentes sem precisar passar props manualmente.

```jsx
import { createContext, useContext } from "react";
const ThemeContext = createContext("light");

function Componente() {
  const tema = useContext(ThemeContext);
  return <div>O tema atual é {tema}</div>;
}
```

### 3.4 useMemo

* Memoriza valores calculados para **evitar recomputações desnecessárias**.

```jsx
const resultado = useMemo(() => calcularValorComplexo(a, b), [a, b]);
```

### 3.5 useCallback

* Memoriza funções para **evitar recriações a cada renderização**.

```jsx
const handleClick = useCallback(() => {
  console.log("Clicado");
}, []);
```

---

## 4. Renderização Condicional e Listas

### 4.1 Renderização Condicional

* Mostrar elementos dependendo de condições.

```jsx
{logado ? <Dashboard /> : <Login />}
```

* Outras formas:

  * **if/else** fora do JSX
  * **&&** para condições simples

### 4.2 Listas e Chaves

* Renderizar arrays com `.map()`.
* Cada item precisa de **key única**.

```jsx
const frutas = ["Maçã", "Banana"];
return (
  <ul>
    {frutas.map((f, i) => <li key={i}>{f}</li>)}
  </ul>
);
```

* O React usa a key para identificar itens e atualizar somente o necessário.

---

## 5. Roteamento com React Router

* Permite criar **Single Page Applications (SPA)** com navegação entre páginas.

```jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

<Router>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/sobre">Sobre</Link>
  </nav>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sobre" element={<Sobre />} />
  </Routes>
</Router>
```

* `Link` substitui `<a>` para evitar recarregar a página.
* React Router organiza a navegação de forma declarativa e simples.

---
## 6. Estilização no React

### 6.1 CSS Tradicional
```css
/* App.css */
.titulo {
  color: purple;
}

import "./App.css";

function App() {
  return <h1 className="titulo">Hello CSS!</h1>;
}
```
### 6.2 CSS Modules
```css
/* Botao.module.css */
.btn {
  background: teal;
  color: white;
}

import styles from "./Botao.module.css";

function Botao() {
  return <button className={styles.btn}>Clique</button>;
}
```
### 6.3 Styled Components
```css
import styled from "styled-components";

const Botao = styled.button`
  background: blue;
  color: white;
  padding: 10px;
`;

function App() {
  return <Botao>Styled!</Botao>;
}
```
## 7. Integração com APIs

### 7.1 Fetch API
```jsx
import { useEffect, useState } from "react";

function Usuarios() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setDados(data));
  }, []);

  return <ul>{dados.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```
### 7.2 Axios
```jsx
import axios from "axios";
import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(res => setPosts(res.data));
  }, []);

  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```
## 8. Hooks Avançados
### 8.1 useRef
```jsx
import { useRef } from "react";
function App() {
  const inputRef = useRef();
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focar no input</button>
    </>
  );
}
```
### 8.2 useReducer
```jsx
import { useReducer } from "react";
function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    default: return state;
  }
}
function Contador() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}

```


---

## Referências

1. W3Schools. **JavaScript ES6**. Disponível em: <https://www.w3schools.com/js/js_es6.asp>. Acesso em: 5 set. 2025.
2. GeeksforGeeks. **Introduction to ES6 in JavaScript**. Disponível em: <https://www.geeksforgeeks.org/javascript/introduction-to-es6/>. Acesso em: 5 set. 2025.
3. Mukesh B. **JavaScript ES6 Features: A Complete Overview**. Dev.to, 2021. Disponível em: <https://dev.to/mukeshb/javascript-es6-features-a-complete-overview-15a7>. Acesso em: 6 set. 2025.

4. React. **Hooks Reference**. Disponível em: <https://legacy.reactjs.org/docs/hooks-reference.html>. Acesso em: 6 set. 2025.
5. K. Shravan. **14 Days of React – Day 5: React Hooks (useState, useRef, useEffect, useMemo, useCallback)**. Medium, 2021. Disponível em: <https://medium.com/@ksshravan667/14-days-of-react-day-5-react-hooks-usestate-useref-useeffect-usememo-usecallback-8599a14c4e2b>. Acesso em: 8 set. 2025.
6. GeeksforGeeks. **ReactJS Hooks**. Disponível em: <https://www.geeksforgeeks.org/reactjs/reactjs-hooks/>. Acesso em: 10 set. 2025.

7. React Router. **React Router Documentation**. Disponível em: <https://reactrouter.com/start/framework/routing>. Acesso em: 11 set. 2025.
8. W3Schools. **React Router**. Disponível em: <https://www.w3schools.com/react/react_router.asp>. Acesso em: 11 set. 2025.
9. Luqman Shaban. **React Router: A Step-by-Step Guide**. Medium, 2021. Disponível em: <https://luqmanshaban.medium.com/react-router-a-step-by-step-guide-4c5ec964d2e9>. Acesso em: 12 set. 2025.

  