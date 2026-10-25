# TDW Mini-Project M1A - CI/CD Pipeline

**Estudante:** Mariana Tavares
**Disciplina:** Tecnologias e Desenvolvimento Web (2026/2027)

## 🚀 Repositórios e Links do Projeto

- **Repositório GitHub:** `https://github.com/deca-ua/tdw-mp1-mariana-lopes`
- **Repositório GitLab (2ª Plataforma):** `https://gitlab.com/deca-ua/tdw-mp1-mariana-lopes`
- **URL de Produção (Cloudflare):** `https://tdw-mp1-mariana-lopes.workers.dev`

---

## ⚙️ Variáveis de Ambiente e Segredos Requeridos (CI/CD)

Para executar a pipeline com sucesso nas plataformas de CI/CD, são necessárias as seguintes variáveis configuradas no repositório (em _Secrets_ e _Variables_):

| Variável / Secret                 | Descrição                                         | Tipo             |
| :-------------------------------- | :------------------------------------------------ | :--------------- |
| `CONTENTFUL_SPACE_ID`             | Identificador do Space no Contentful              | Variable / Plain |
| `CONTENTFUL_ACCESS_TOKEN`         | Access Token (Content Delivery API)               | Secret / Masked  |
| `CONTENTFUL_PREVIEW_ACCESS_TOKEN` | Preview Access Token                              | Secret / Masked  |
| `CLOUDFLARE_ACCOUNT_ID`           | Account ID da conta do Cloudflare                 | Variable / Plain |
| `CLOUDFLARE_API_TOKEN`            | Token de API do Cloudflare (Workers Script: Edit) | Secret / Masked  |

---

## 🔁 Gatilhos da Pipeline (Triggers)

1. **Push e Pull Requests:** Execução automática em todas as branches.
2. **CMS Webhook (`repository_dispatch`):** Recompilação automática do site em `main` quando um conteúdo é alterado no Contentful.
3. **Cron Schedule (`0 0 * * *`):** Execução diária agendada (desativada/comentada após validação para contenção de minutos).

---

# Documentação Original do Projeto (Contentful & Next.js)

This example showcases Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using [Contentful](https://www.contentful.com/) as the data source.

## How to use

Execute

```bash
npx create-next-app --example cms-contentful cms-contentful-app
```
