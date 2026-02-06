# Autenticação com Next.js + Auth.js

Aplicação de autenticação completa construída com Next.js 16 (App Router), Auth.js v5 (NextAuth), Prisma e PostgreSQL. O projeto demonstra implementações modernas de autenticação incluindo login tradicional, OAuth, magic links e recuperação de senha, integrados a uma UI reativa com React 19 e Tailwind CSS 4.

> **⚠️ Projeto de Estudo**
> 
> Este é um projeto desenvolvido para fins educacionais e experimentação. Você pode encontrar diferentes abordagens e padrões de implementação ao longo do código, pois foram testadas diversas formas de resolver os mesmos problemas. A componentização e organização podem não seguir um padrão único, já que o objetivo principal foi explorar e aprender diferentes técnicas e soluções disponíveis no ecossistema Next.js + Auth.js.
> 

## Funcionalidades

### Autenticação
- **Login com credenciais** (email/senha) com hash bcrypt;
- **Google OAuth 2.0** com proteção contra duplicação de emails;
- **Magic Link** via email;
- **Vinculação manual de contas** OAuth em `/dashboard/settings`;
- **Cadastro de usuários** com confirmação de senha;
- **Sessões JWT** personalizadas com propagação de roles.

### Segurança
- **Recuperação de senha** com código de 8 dígitos;
- **Rate limiting** (máx. 5 tentativas em 4 horas);
- **Códigos temporários** hasheados (SHA-256) com expiração de 5 minutos;
- **Proteção de rotas** com middleware(proxy) customizado;
- **Controle de acesso** baseado em roles (USER/ADMIN).

### Interface
- **UI** com Tailwind CSS 4 e shadcn/ui;
- **Formulários reativos** com React Hook Form + Zod;
- **Validação** em tempo real com feedback visual;
- **Notificações** toast com Sonner.
  
## Pré-requisitos

- Node.js 18 (recomendado 20)
- Yarn ou outro package manager
- PostgreSQL (local ou remoto) ou Docker/Docker Compose (recomendado)
- Conta no [Google Cloud Console](https://console.cloud.google.com/) (para OAuth)
- Conta no [Resend](https://resend.com) (para envio de emails)

## Configuração do Providers
### Google Auth

1. Access o [Google Cloud Console](https://console.cloud.google.com/);
2. Crie um novo projeto;
3. Navegue até **APIs e Serviços** -> **Credenciais**;
4. Clique em **Criar credenciais** -> **ID do cliente OAuth 2.0**;
5. Configure as URLs autorizadas:
   - **Origens JavaScript autorizadas**: `http://localhost:3000`;
   - **URIs de redirecionamento**: `http://localhost:3000/api/auth/callback/google`.
6. Copiei o **Client ID** e **Client Secret** para o `.env`(`AUTH_GOOGLE_ID` e `AUTH_GOOGLE_SECRET`).

> Para mais informações: [Google OAuth](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow?hl=pt-br)
### Resend

1. Crie uma conta em [resend](https://resend.com);
2. Gere uma **API Key** no dashboard;
3. Configure um domínio verificado ou use o domínio de teste `onboarding@resend.dev`(Já configurado);
4. Adicione a chave  ao `.env`(`AUTH_RESEND_KEY`).

> Para mais informações: [RESEND - API KEY](https://resend.com/docs/dashboard/api-keys/introduction)

## Instalação

### 1. Clone e instale as dependências

```bash
git clone https://github.com/nivaldoandrade/projects-nextjs.git

cd auth-authjs-nextjs

#Instale as dependências
yarn
#ou
npm install
```
### 2. Configure o PostgreSQL
Você tem duas opcões para configurar o banco de dados PostgreSQL:

#### Opcão A: Docker Compose(Recomendado)
Execute o arquivo `docker-compose.yml` na raiz do projeto.

Inicie o container:
```bash
docker-compose up -d

#Verifique se está rodando
docker-compose ps
```

Sua `DATABASE_URL` será:
```text
postgresql://root:root@localhost:5432/prisma-db-demo
```
> [Instalar Docker Componse](https://docs.docker.com/compose/install)

#### Opção B: Docker CLI
```bash
# Crie e inicie um container PostgreSQL
docker run --name postgres-authjs \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=root \
  -e POSTGRES_DB=prisma-db-demo \
  -p 5432:5432 \
  -d postgres

# Verifique se está rodando
docker ps
```

Sua `DATABASE_URL` será:
```text
postgresql://root:root@localhost:5432/prisma-db-demo
```
> [Instalar Docker](https://docs.docker.com/desktop/)

#### Opcão C: PostgreSQL Local
Se você já tem o PostgreSQL instalado localmente:
1. Crie o banco de dados:
```bash
psql -U postgres
CREATE DATABASE prisma-db-demo;
\q
```
2. Configure a URL de conexão com suas credenciais locais. 

> [Instalar PostgreSQL local](https://www.postgresql.org/download/)



### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:

```bash
#Copie o arquivo de exemplo
cp .env.example .env
```

Edite o `.env` com seus credenciais:

```bash
#Database
DATABASE_URL=postgresql://user:password@localhost:5432/prisma-db-demo

#Auth.js Secret (Gerar: npx auth secret ou openssl rand -base64 32)
AUTH_SECRET=sua-chave-secreta-gerada

#Google OAuth
AUTH_GOOGLE_ID=xxxxxxxx.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=xxxxxxxx

#Resend (magic link + reset da senha)
AUTH_RESEND_KEY=re_xxxxxxxxxx

```

### 4. Configure o banco de dados

```bash
#Gere o cliente Prisma + crie/aplique as migrações
npx prisma migrate dev

#ou

#Gere o cliente Prisma + sincronize o schema sem migração
npx prisma generate
npx prisma db push

#(Opcional) Abra o Prisma Studio para visualizar os dados
npx prisma studio
```
### 5. Inicie o servidor de Desenvolvimento

```bash
yarn dev
# ou
npm run dev
```
Acesse: http://localhost:3000

## Fluxo de Autenticação

### Cadastro de Usuário (`/signup`)
- Validação de formulário em tempo real com Zod;
- Verificação de email único no banco;
- Hash de senha com bcrypt(12 salt);
- Redirecionamento para login com o email preenchido.
   
### Login com Credenciais (`/login`)
- Validação de email/senha;
- Comparação segura de hash com bcrypt;
- Geração de sessão JWT;
- Redirecionamento para o dashboard.

### Login com Google OAuth
- Fluxo OAuth padrão;
- Criação automática de conta se não existir;
- **Proteção contra vinculação automática:** Se o email já existe com crendeciais, exibe um erro e solicita o login manual primeiro;
- Vinculação manual disponível em `/dashboard/settings`após autenticação;
- Armazenamento de email do provider.

### Magic Link
- Envio de link por email via Resend;
- Token com expiração configurável;
- Login automático ao clicar no link;
- Tratamento de links expirados.

### Recuperação de Senha (`/forgot-password`)
#### Passo 1 - Solicitar código:
- Usuário informa o email;
- Sistema gera código de 8 dígitos;
- Hash SHA-256 do código armazenado no banco;
- Código enviado por email via Resend;
- Expiração em 5 minutos.

#### Passo 2 - Redefinir senha:
- Validação do código informado;
- Verificação de expiração;
- Atualização da senha(hash bcrypt);
- Remoção do código usado;
- Redirecionamento para login.

#### Rate Limiting:
- Máximo 5 tentativas de envio;
- Cooldown de 60 segundos entre envios;
- Reset automático após 4 horas;
- Proteção contra ataques de força bruta.

### Vinculação de Conta OAuth(`/dashboard/settings`)
#### Vincular conta google:
- Usuário autenticado clica em "Conectar" na página de configurações;
- Fluxo OAuth completo com o google;
- Verificação: se o email já está vinculado a outro usuário, exibe erro;
- Sucesso: conta google vinculado e email armazenado.

#### Desvincular conta google:
- Validação de segurança: impede desvincular se for o único método de autenticação sem senha;
- Se usuário tem senha definida: permite desvincular;
- Remove a entrada na tabela `Account`;
- Revalida a página para atualizar a UI.

## Proteção de Rotas

### Middleware ou Proxy (`src/proxy.ts`)
Protege rotas automaticamente:

```typescript
export const config = {
	matcher: [
		'/signup',
		'/login',
		'/dashboard/:path*',
	],
};
```

**Regras:**
- Usuários não autenticados: redirecionados para `/login`;
- Usuários autenticados: redirecionados para `/dashboard`;
- Preserva a URL de callback para retorno pós-login.

### Role Guard (`src/lib/withRoleGuard.ts`)
Protege páginas por role:

```typescript
//EXEMPLO:
//src/app/dashboard/settings/page.tsx(57)
export default withRoleGuard(SettingsPage, 'ADMIN');
```

## Segurança
### Senhas
- Hash com **bycrypt**(12 salts);
- Nunca armazenadas em texto plano;
- Validação de tamanho mínima(8 caracteres) para senha.

### Códigos de Recuperação
- Hash com SHA-256 antes de armazenar;
- Expiração automática (5min);
- Rate limiting configurável;
- Remoção após uso bem sucedido.

### Sessões
- JWT com secret forte (256bits);
- Renovação automática;
- Logout seguro com limpeza de sessão.

### Validação
- Zod para validação de dados;
- Sanitazação de inputs;
- Prevenção de SQL injection (Prisma);
- Proteção CSRF (Auth.js).

## Deploy
Configure variáveis de ambiente em produção:

```bash
AUTH_URL=https://seu-dominio.com
AUTH_TRUST_HOST=true
DATABASE_URL=postgresql://...  
AUTH_RESEND_KEY=re_live_...    
```

## Stack Tecnológia

### Core
- **Framework**: Next.js 16 (App Router, Server Actions, React 19);
- **Autenticação**: Auth.js v5 (NextAuth) com Prisma Adapter;
- **Banco** de dados: PostgreSQL com Prisma ORM 7;
- **Validação**: Zod v4;
- **Criptografia**: bcryptjs para senhas e SHA-256 para códigos.

### UI/UX
- **Estilização**: Tailwind CSS v4 + shadcn/ui;
- **Componentes**: Radix UI primitives(Padrão shadcn);
- **Ícones**: lucide-react(Padrão shadcn);
- **Formulários**: React Hook Form + @hookform/resolvers.

### Serviços
- **Email**: Resend(magic links e recuperação de senha);
- **OAuth**: Google.


## Sobre o Projeto

Este projeto foi criado com propósito educacional e experimental. Durante o desenvolvimento, foram testadas diferentes abordagens para resolver os mesmos problemas, o que pode resultar em:

- **Padrões variados de componetização**: Alguns componentes podem estar organizados de forma diferente de outros;
- **Múltiplas forma de implementação**: Você pode encontrar server actions, client components e diferentes patterns em páginas similares;
- **Experimentação de features**: Testes com diferentes bibliotecas e técnicas do ecossistema Next.js/React;
- **Código não uniformizado**: Como o foco foi aprendizado, nem tudo segue o mesmo padrão arquitetural.

O que você pode aprender aqui:
- Diferentes formas de implementar autenticação com Auth.js;
- Padrões de validação com Zod e React Hook Form;
- Integração com Prisma ORM e PostgreSQL;
- Server Actions vs Client Components;
- Middleware de autenticação e proteção de rotas;
- Envio de emails transacionais com Resend;
- Componentização com shadcn/ui.