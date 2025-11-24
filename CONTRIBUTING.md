# Guia de Contribuição - Woman GO Safe

Olá! Ficamos muito felizes com seu interesse em contribuir para o **Woman GO Safe**. 🎉

Este documento serve como um guia para ajudá-lo a contribuir de forma eficaz, garantindo que o código permaneça limpo, testável e alinhado com a nossa missão de segurança e qualidade.

## 🌟 Código de Conduta

Ao participar deste projeto, espera-se que todos mantenham um ambiente respeitoso, inclusivo e livre de assédio. Lembre-se: este é um projeto focado em segurança e empoderamento feminino, e nossa comunidade deve refletir esses valores.

## 🛠️ Como Posso Contribuir?

### 1. Reportando Bugs
Se você encontrou um erro, abra uma **Issue** detalhando:
* Passos para reproduzir o erro.
* O que aconteceu x O que deveria ter acontecido.
* Screenshots ou logs do console.

### 2. Sugerindo Novas Funcionalidades
Tem uma ideia incrível? Abra uma **Issue** com a tag `new-idea` explicando sua proposta e como ela beneficia as usuárias.

### 3. Enviando Pull Requests (PRs)

Siga o fluxo abaixo para enviar código:

1.  **Fork** o repositório.
2.  Crie uma **Branch** para sua feature ou correção:
    * Use o padrão: `feat/nome-da-feature` ou `fix/nome-do-bug`.
    * Exemplo: `feat/adicionar-filtro-preco`
3.  Faça suas alterações e **Commit**:
    * Siga o padrão de *Conventional Commits*.
4.  Faça o **Push** para sua branch.
5.  Abra um **Pull Request** (PR) descrevendo suas mudanças.

## 🎨 Padrões de Estilo e Código

Para manter a consistência, seguimos algumas regras:

* **TypeScript:** Evite o uso de `any`. Utilize as interfaces definidas em `types.ts` ou crie novas se necessário.
* **Componentes:** Utilize *Functional Components* com React Hooks.
* **Estilização:** Utilize as classes utilitárias do **Tailwind CSS**. Evite CSS inline ou arquivos `.css` separados, a menos que estritamente necessário (como animações customizadas).
* **Ícones:** Utilize os ícones localizados em `src/components/icons` para manter o padrão visual SVG.

## 📝 Padrão de Commits

Recomendamos o uso de mensagens semânticas:

* `feat`: Uma nova funcionalidade.
* `fix`: Correção de um bug.
* `docs`: Alterações apenas na documentação.
* `style`: Alterações que não afetam o significado do código (espaços, formatação).
* `refactor`: Alteração de código que não corrige um bug nem adiciona uma feature.

## ✅ Checklist Antes de Enviar

[ ] O código roda **sem erros** no console? <br>
[ ] Verificou a **responsividade** (Mobile/Desktop)? <br>
[ ] O código **segue o estilo** do projeto (Tailwind/TS)? <br>
[ ] A funcionalidade **foi testada** com os dados mockados (src/data/mockData.ts)? <br>

Obrigada por contribuir para tornar as viagens mais seguras para todas as mulheres! 💜
