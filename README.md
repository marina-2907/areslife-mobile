# AresLife Mobile 

Aplicativo mobile desenvolvido em **React Native + Expo + TypeScript** para simular o gerenciamento de uma colônia em Marte, com foco em turismo espacial, monitoramento de recursos vitais, controle de visitantes e alertas inteligentes.

## Integrantes

| Nome                          | RM        |
| ----------------------------- | --------- |
| Felipe Maglio Filho           | RM 563512 |
| João Pedro Bitencourt Goldoni | RM 564339 |
| Marina Tamagnini Magalhães    | RM 561786 |
| Mateus Granja dos Santos      | RM 564930 |
| Vitória Valentina Maglio      | RM 563509 |

## Repositórios

**Repositório da entrega/Classroom:**  
https://github.com/2TDSPX/global-solution-areslife.git

**Repositório pessoal:**  
https://github.com/marina-2907/areslife-mobile.git

## Sobre o projeto

O **AresLife Mobile** é um aplicativo criado para apoiar a proposta da solução AresLife, uma plataforma de simulação de colonização de Marte e turismo espacial.

A ideia do projeto é representar como um sistema mobile poderia auxiliar no controle de uma base marciana, permitindo o acompanhamento de recursos essenciais, turistas espaciais e alertas operacionais do habitat.

O aplicativo possui uma interface futurista, com tema inspirado no espaço sideral, fundo escuro, elementos visuais neon, cards informativos e navegação inferior entre as principais telas.

## Objetivo da solução

O objetivo do AresLife é simular o gerenciamento de um habitat em Marte, conectando tecnologia, exploração espacial e controle de dados em ambientes extremos.

A aplicação permite visualizar informações importantes da colônia, como:

* nível de oxigênio;
* nível de água;
* energia disponível;
* temperatura do habitat;
* turistas espaciais cadastrados;
* status de saúde dos visitantes;
* alertas inteligentes sobre riscos da missão.

## Tecnologias utilizadas

* React Native
* Expo
* TypeScript
* Expo Router
* AsyncStorage
* Ionicons
* Git e GitHub

## Funcionalidades implementadas

* Tela inicial com identidade visual do AresLife;
* Navegação inferior entre as telas principais;
* Dashboard da colônia;
* Exibição de recursos vitais do habitat;
* Listagem de turistas espaciais;
* Cadastro local de novos turistas;
* Busca de turistas pelo nome;
* Exclusão local de turistas;
* Alertas inteligentes baseados nos dados dos turistas e da colônia;
* Armazenamento local com AsyncStorage;
* Estrutura preparada para integração futura com API REST.

## Telas do aplicativo

### Home

Tela inicial do aplicativo, com acesso rápido para:

* Dashboard da Colônia;
* Turistas Espaciais;
* Alertas Inteligentes.

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

### Turistas Espaciais

Tela responsável pelo controle dos visitantes da colônia.

Funcionalidades:

* listar turistas;
* pesquisar turistas pelo nome;
* cadastrar novos turistas;
* visualizar dados de missão;
* visualizar status de saúde;
* excluir turistas.

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

## Armazenamento local

Atualmente, o aplicativo utiliza **AsyncStorage** para salvar os turistas localmente.

Isso permite que o app funcione mesmo antes da integração com a API, simulando um CRUD básico no próprio dispositivo.

Funcionalidades usando AsyncStorage:

* carregar turistas cadastrados;
* salvar novo turista;
* pesquisar turista;
* excluir turista;
* utilizar dados dos turistas para gerar alertas inteligentes.

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

Ou utilize o aplicativo **Expo Go** para escanear o QR Code.

## Dependência importante

Caso o AsyncStorage não esteja instalado, execute:

```bash
npx expo install @react-native-async-storage/async-storage
```

## Link do projeto

```txt
https://github.com/marina-2907/areslife-mobile.git

```

## Link do Video 

```txt
https://youtu.be/Rl2GAqV5bUU

```

## Link do Video 

```txt
https://youtu.be/Rl2GAqV5bUU
```

