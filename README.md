# AresLife Mobile

Aplicativo mobile desenvolvido em **React Native + Expo + TypeScript** para simular o gerenciamento de uma colônia em Marte, com foco em turismo espacial, monitoramento de recursos vitais, controle de visitantes e alertas inteligentes.

O projeto possui integração com **API REST**, permitindo que o aplicativo mobile se comunique com o back-end para consultar, cadastrar, pesquisar e excluir dados dos turistas espaciais.

---

## Integrantes

| Nome                          | RM        |
| ----------------------------- | --------- |
| Felipe Maglio Filho           | RM 563512 |
| João Pedro Bitencourt Goldoni | RM 564339 |
| Marina Tamagnini Magalhães    | RM 561786 |
| Mateus Granja dos Santos      | RM 564930 |
| Vitória Valentina Maglio      | RM 563509 |

---

## Repositórios

**Repositório da entrega/Classroom:**
https://github.com/2TDSPX/global-solution-areslife.git

**Repositório pessoal:**
https://github.com/marina-2907/areslife-mobile.git

---

## Link do vídeo

https://youtu.be/Rl2GAqV5bUU

---

## Sobre o projeto

O **AresLife Mobile** é um aplicativo criado para apoiar a proposta da solução **AresLife**, uma plataforma de simulação de colonização de Marte e turismo espacial.

A ideia do projeto é representar como um sistema mobile poderia auxiliar no controle de uma base marciana, permitindo o acompanhamento de recursos essenciais, turistas espaciais, dados operacionais e alertas inteligentes do habitat.

O aplicativo possui uma interface futurista, com tema inspirado no espaço sideral, fundo escuro, elementos visuais neon, cards informativos e navegação inferior entre as principais telas.

---

## Objetivo da solução

O objetivo do AresLife é simular o gerenciamento de um habitat em Marte, conectando tecnologia, exploração espacial e controle de dados em ambientes extremos.

A aplicação permite visualizar informações importantes da colônia, como:

* nível de oxigênio;
* nível de água;
* energia disponível;
* temperatura do habitat;
* turistas espaciais cadastrados;
* status de saúde dos visitantes;
* dados de missão;
* alertas inteligentes sobre riscos da missão.

---

## Tecnologias utilizadas

* React Native
* Expo
* TypeScript
* Expo Router
* API REST
* Requisições HTTP
* Ionicons
* Git e GitHub

---

## Funcionalidades implementadas

* Tela inicial com identidade visual do AresLife;
* Navegação inferior entre as telas principais;
* Dashboard da colônia;
* Exibição de recursos vitais do habitat;
* Listagem de turistas espaciais;
* Cadastro de novos turistas;
* Busca de turistas pelo nome;
* Exclusão de turistas;
* Visualização de dados de missão;
* Visualização do status de saúde dos visitantes;
* Alertas inteligentes baseados nos dados dos turistas e da colônia;
* Integração com API REST;
* Consumo de dados do back-end.

---

## Telas do aplicativo

### Home

Tela inicial do aplicativo, com acesso rápido para:

* Dashboard da Colônia;
* Turistas Espaciais;
* Alertas Inteligentes.

---

### Dashboard da Colônia

Tela responsável por exibir os principais indicadores da base AresLife.

Recursos exibidos:

* oxigênio;
* água;
* energia;
* temperatura;
* população;
* estruturas;
* produção;
* eficiência geral.

---

### Turistas Espaciais

Tela responsável pelo controle dos visitantes da colônia.

Funcionalidades:

* listar turistas;
* pesquisar turistas pelo nome;
* cadastrar novos turistas;
* visualizar dados de missão;
* visualizar status de saúde;
* excluir turistas.

---

### Cadastro de Turistas

Tela de formulário para registrar novos turistas espaciais.

Dados cadastrados:

* nome;
* idade;
* nacionalidade;
* origem;
* destino;
* tipo de missão;
* status de saúde;
* status do bilhete;
* status geral;
* nível de oxigênio;
* batimentos cardíacos;
* dias de missão.

---

### Alertas Inteligentes

Tela responsável por gerar alertas automáticos com base nos dados cadastrados.

Exemplos de alertas:

* oxigênio baixo;
* temperatura crítica;
* água em nível reduzido;
* turista em status de atenção;
* turista em status crítico;
* batimentos cardíacos elevados;
* bilhete pendente.

---

## Integração com API REST

Atualmente, o aplicativo utiliza uma **API REST** para realizar a comunicação entre o front-end mobile e o back-end do projeto.

Essa integração permite que os dados dos turistas sejam consultados, cadastrados, pesquisados e excluídos por meio de requisições HTTP, deixando o aplicativo mais próximo de uma solução real.

Funcionalidades usando a API REST:

* carregar turistas cadastrados;
* cadastrar novo turista;
* pesquisar turista;
* excluir turista;
* consumir dados do back-end;
* utilizar dados dos turistas para gerar alertas inteligentes.

A comunicação com a API está centralizada no arquivo:

```txt
src/services/api.ts
```

Para que a integração funcione corretamente, a API utilizada pelo projeto deve estar em execução e acessível pelo aplicativo.

---

## Modelo de dados

A entidade principal do projeto é o **Turista Espacial**.

```ts
export type TouristStatus = "Seguro" | "Atenção" | "Crítico";

export type Tourist = {
  id: string;
  name: string;
  age: number;
  nationality: string;
  origin: string;
  destination: string;
  missionType: string;
  healthStatus: string;
  ticketStatus: string;
  status: TouristStatus;
  oxygenLevel: number;
  heartRate: number;
  missionDays: number;
};
```

---

## Estrutura de pastas

```txt
areslife-mobile
├── assets
│   └── images
│       └── logo-1.png
├── src
│   ├── app
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── dashboard.tsx
│   │   ├── alerts.tsx
│   │   └── turistas
│   │       ├── index.tsx
│   │       ├── create.tsx
│   │       └── edit.tsx
│   ├── components
│   │   ├── AppButton.tsx
│   │   ├── BottomNav.tsx
│   │   ├── SpaceBackground.tsx
│   │   └── TouristCard.tsx
│   ├── constants
│   │   └── colors.ts
│   ├── services
│   │   └── api.ts
│   └── types
│       └── tourist.ts
├── app.json
├── package.json
└── README.md
```

---

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/marina-2907/areslife-mobile.git
```

### 2. Entrar na pasta do projeto

```bash
cd areslife-mobile
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Rodar o projeto

```bash
npx expo start
```

### 5. Abrir no Android

No terminal do Expo, pressione:

```bash
a
```

Ou utilize o aplicativo **Expo Go** para escanear o QR Code exibido no terminal.

---

## Observação sobre a API

Para que o aplicativo funcione com a integração, é necessário que a **API REST** esteja rodando corretamente.

Verifique se a URL da API está configurada no arquivo:

```txt
src/services/api.ts
```

Caso esteja utilizando emulador Android, é importante conferir se o endereço da API está acessível pelo emulador.

---

## Observação sobre dependências

A pasta `node_modules` não deve ser enviada para o GitHub, pois ela é gerada automaticamente ao executar:

```bash
npm install
```

---

## Entrega

Este projeto foi desenvolvido para a disciplina **Mobile Application Development**, como parte da Global Solution, com o objetivo de apresentar uma solução mobile integrada a uma API REST para simulação de gerenciamento de uma colônia em Marte.


