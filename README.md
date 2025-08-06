# Dashboard Portfólio 

Este é um projeto full stack de dashboard para portfólio de desenvolvedor, construído com Next.js, Prisma, TailwindCSS e gráficos com Recharts. A aplicação conta com autenticação via NextAuth, tema dark/light, e um painel administrativo para gerenciamento dos projetos.

A ideia nasceu da minha necessidade pessoal por uma ferramenta que permitisse gerenciar meu portfólio de forma mais dinâmica e prática, sem precisar editar o código-fonte a cada atualização. Queria uma solução fácil de usar, escalável e que me desse autonomia para cadastrar, editar e visualizar meus projetos rapidamente, além de oferecer uma interface moderna e responsiva. Por isso, decidi construir este dashboard, combinando tecnologias modernas para atender exatamente essa demanda.

Durante o desenvolvimento, busquei ir além da funcionalidade básica: estruturei a aplicação com foco em modularidade, design responsivo e alta performance. O estado da aplicação é gerenciado de forma leve com Zustand, e o upload de imagens foi integrado para enriquecer a apresentação dos projetos.

Essa experiência foi uma excelente oportunidade para aplicar boas práticas de arquitetura full stack moderna, priorizando usabilidade, organização do código e autonomia na gestão de conteúdo do portfólio.

## Preview

Acesse o projeto em: https://nextjs-dashboard-portfolio.vercel.app/login

## Screenshots

<img width="1920" height="914" alt="1  Login" src="https://github.com/user-attachments/assets/f534d036-48a1-4119-9a16-0069005c4445" />
<img width="1908" height="915" alt="2  Dashborad_light" src="https://github.com/user-attachments/assets/b68add03-3ac8-4963-9def-9a99ba357b8b" />
<img width="1908" height="916" alt="image" src="https://github.com/user-attachments/assets/752d876c-79c1-49f1-a5e6-1bdf4f60f264" />

## Funcionalidades

- Autenticação com NextAuth (GitHub/Google)
- Alternância de tema (dark/light)
- Dashboard com gráficos de projetos por mês
- Gerenciamento de projetos com título, descrição, tecnologias e imagens
- Upload de imagens com `UploadThing`
- Painel administrativo com controle total dos dados
- UI moderna e responsiva com TailwindCSS + componentes customizados
- Estrutura modular com componentes reutilizáveis
- Prisma + PostgreSQL para persistência de dados
- Layout responsivo (mobile e desktop)

## Tecnologias e Ferramentas

| Stack              | Descrição                                                 |
| ------------------ | --------------------------------------------------------- |
| **Next.js 15**     | Framework React com App Router e Server Actions           |
| **React 19**       | Biblioteca base para componentes interativos              |
| **TailwindCSS 4**  | Framework utilitário para estilização responsiva          |
| **Lucide React**   | Ícones modernos e personalizáveis para a interface        |
| **Recharts**       | Biblioteca para visualização de dados em gráficos         |
| **React Spinners** | Indicadores de carregamento para melhor UX                |
| **React Modal**    | Modal acessível e responsivo para interações pontuais     |
| **Zustand**        | Gerenciamento de estado leve e eficiente para UI          |
| **Sonner**         | Toasts modernos e configuráveis para feedback instantâneo |
| **Prisma ORM 6**   | ORM para modelagem e acesso ao banco de dados             |
| **NextAuth**       | Autenticação com provedores OAuth e JWT                   |
| **Formidable**     | Manipulação de uploads multipart/form-data                |
| **PostgreSQL**     | Banco de dados relacional utilizado pela aplicação        |

## Aviso Importante sobre o Banco de Dados

Este projeto foi desenvolvido utilizando Prisma ORM com suporte para bancos de dados como PostgreSQL e SQLite. No entanto, para fins de demonstração neste repositório, a alimentação dos dados está sendo feita por meio de um arquivo local estático, para facilitar o uso e evitar configurações adicionais.

Apesar disso, toda a arquitetura da API está implementada e disponível no código, pronta para funcionar com um banco de dados real assim que configurado.

## Aprendizados

Durante esse projeto, aprofundei meu conhecimento em:

- Autenticação segura com NextAuth, incluindo integração com provedores OAuth e tokens JWT.
- Criação de temas dinâmicos com **Tailwind CSS** usando dados externos.
- Gerenciamento global de estado com Zustand para controle de UI e interações administrativas.
- Visualização de dados com Recharts, construindo gráficos interativos e personalizados.
- Upload e manipulação de arquivos com Formidable, integrando com o banco de dados via Prisma ORM.
- Implementação de feedback instantâneo via Sonner, melhorando a experiência do usuário no painel admin.

## Instalação

- Clone o repositório
  ```bash
  git clone https://github.com/jsevitor/nextjs-dashboard-portfolio.git
  ```
- Instale as dependências
  ```bash
  npm install
  ```
- Rode localmente
  ```bash
  npm run dev
  ```

## Configuração do Ambiente (.env)
Para rodar a aplicação localmente ou em produção, é necessário configurar as variáveis de ambiente no arquivo .env, na raiz do projeto.

Variáveis principais usadas:
  - **DATABASE_URL**: URL de conexão com o banco PostgreSQL (exemplo para produção usando Neon DB):
   ```bash
   postgresql://portfolio_owner:npg_yuN8f2PZzwTk@ep-orange-unit-ace6kizo-pooler.sa-east-1.aws.neon.tech/portfolio?sslmode=require
   ```
- **GITHUB_ID** e **GITHUB_SECRET**: Credenciais do OAuth para autenticação com GitHub.
- **GOOGLE_CLIENT_ID** e **GOOGLE_CLIENT_SECRET**: Credenciais OAuth para Google (usado no demo).
- **NEXTAUTH_SECRET**: Chave secreta para a criptografia das sessões do NextAuth.
- **NEXTAUTH_URL**: URL base da aplicação (exemplo: http://localhost:3000 ou URL do deploy).
- **UPLOADTHING_APP_ID** e **UPLOADTHING_TOKEN**: Credenciais para upload de arquivos.

**Observações**
  - No repositório de demonstração, a alimentação dos dados é feita via arquivo local estático, portanto a configuração do banco (DATABASE_URL) pode ser omitida inicialmente.
  - A arquitetura da API está totalmente preparada para funcionar com banco de dados real usando Prisma; basta configurar o .env adequadamente para usar PostgreSQL, SQLite, ou outro compatível.
  - Por segurança, as variáveis sensíveis não devem ser expostas em repositórios públicos.



## Documentação

A documentação completa do projeto foi gerada com [TypeDoc](https://typedoc.org/) e está disponível em:

🔗 [Documentação Técnica (GitHub Pages)](https://jsevitor.github.io/restaurant-menu-challenge/)

Ela inclui descrições de tipos, estruturas, funções e lógica central do projeto — útil para entendimento rápido da base de código.

## Possibilidades de melhoria

- Persistência do carrinho com localStorage
- Integração com API de pedidos (checkout)
- Feedback visual com toast para ações do usuário
- Autenticação e rotas protegidas (login)

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões ou melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto é apenas para fins de avaliação técnica.

## Contato

Caso queira entrar em contato, me encontre em:

- LinkedIn: [linkedin.com/in/josevitoroliveira](https://linkedin.com/in/josevitoroliveira)
- E-mail: [vitorjseo@gmail.com](mailto:vitorjseo@gmail.com)

---

Desenvolvido por **Vitor Oliveira**.
