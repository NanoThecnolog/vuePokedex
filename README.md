# Pokedex

Este é um projeto de Pokedex que lista todos os Pokémon existentes.

## A Aplicação

Nesta aplicação, os usuários podem explorar todos os Pokémon disponíveis. A interface apresenta um quadro de cards que exibe a imagem, o ID de identificação e o nome de cada Pokémon.

### Funcionalidades

- **Scroll Infinito**: Os primeiros Pokémon são carregados ao iniciar a página. À medida que o usuário rola para baixo, mais Pokémon são apresentados automaticamente, proporcionando uma navegação contínua.
  
- **Favoritos**: Os usuários podem marcar seus Pokémon favoritos clicando no ícone de favorito próximo ao ID do Pokémon. Os Pokémon favoritos são salvos em uma lista acessível ao clicar no botão "Favoritos", localizado ao lado dos filtros.

- **Filtragem**: É possível filtrar a lista de Pokémon por nome, ID e tipo (tanto tipos únicos quanto duplos).

- **Modal de Informações**: Ao clicar em um card de Pokémon, um modal se abrirá com informações detalhadas, incluindo altura, peso, tipos, habilidades, árvore evolutiva, status base, experiência base e movimentos que o Pokémon pode aprender. Os usuários também podem ouvir o som que o Pokémon faz e alternar a imagem do Pokémon entre as versões masculina e feminina, caso existam.

## Instruções para Instalação do Projeto

### Setup do Projeto

Para instalar as dependências, execute:

```sh
npm install

```
### Compilar para Ambiente de Desenvolvimento com Hot-Reload

```sh
npm run dev

```

### Preparar para Ambiente de Produção

```sh
npm run build
```

### Testes com Vitest

```sh
npm run test:unit
```

### Testes End-to-End com Cypress

```sh
npm run test:e2e:dev
```

Embora essa opção seja mais rápida, recomenda-se executar testes de produção antes do deployment. Para isso, faça:

```sh
npm run build
npm run test:e2e
```


### Lint com ESLINT código:

```sh
npm run lint
```



## IDE Recomendadas

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (Desative o Vetur para evitar conflitos).

## Suporte de Tipagem para .vue deve ser importado em arquivos TS

Por padrão, o TypeScript não suporta tipagem para arquivos `.vue`. Para resolver isso, utilizamos `vue-tsc` em vez de `tsc` para verificação de tipagem. Nos editores, precisamos do [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para que o TypeScript reconheça as tipagens de `.vue`.

Nota: O TypeScript não pode lidar com informações de tipo para imports `.vue` por padrão, por isso substituímos o comando `.tsc` pelo `vue-tsc` para a verificação de tipos.
Certifique-se de ter o Volar instalado para uma integração adequada com o TypeScript.
