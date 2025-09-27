# SeLiga, o portal da verdade

## Descrição

O projeto **SeLiga** tem o objetivo de verificar a veracidade de notícias online. Para isso, mineramos reportagens de mais de 10 jornais para alimentar um sistema de detecção automatizada de fake news. O objetivo principal é desenvolver uma aplicação web que permita ao usuário explorar e filtrar notícias e, por fim, descobrir se são falsas ou não.

---

## Funcionalidades principais

* Coleta (scraping/mineração) de artigos de imprensa de múltiplas fontes.
* Pipeline de pré-processamento (limpeza de texto, normalização, extração de metadados).
* Módulo de detecção automatizada de possível desinformação.
* API para servir dados das notícias e dos resultados da detecção.

---

## Como executar
* Clone o repositório:
```bash
git clone https://github.com/unb-mds/2025-2-SeLiga.git
```
* Para executar localmente, rode os seguintes para criar um **virtual environment** comandos no terminal:
```bash
python -m venv venv
```
* Se `python` não funcionar, tente `python3`.
* Ative o ambiente virtual (para desativar, simplesmente digite `deactivate`):
```bash
source venv/bin/activate
```
* Instale as dependências:
```bash
pip install -r requirements.txt
```
* Rode localmente:
```bash
uvicorn main:app --reload
```
---

## Documentação
* [GitPage](https://unb-mds.github.io/2025-2-SeLiga/)
* [Figma](https://www.figma.com/board/CIMdLiO4lAXoEHfFq4qZsg/Planjeamento---squad-05?node-id=2040-2433&t=aRCmAyRv7T7KCYYk-0)
