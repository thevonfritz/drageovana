# **📌 Briefing para Claude Code: Geração de Landing Pages (LPs) - v2**
*Versão: 2.0 | Data: 11/05/2026 | Autor: Eduardo G. Rodrigues*
*Objetivo: Gerar LPs responsivas, otimizadas para SEO, com animações suaves, integração ao Meta Pixel/API e favicon, seguindo um fluxo modular e validado.*

---
---

## **🎯 Visão Geral (Alto Nível)**
**Objetivo:**
Gerar uma **Landing Page (LP)** responsiva, otimizada para **SEO**, com **animações interativas** (GSAP/AOS), integração ao **Meta Pixel e API do Meta**, e **favicon**, seguindo as diretrizes de design, estrutura e segurança definidas pelo usuário.

**Público-alvo:**
- Usuários finas (mobile, tablet, desktop).
- Navegadores modernos (Chrome, Firefox, Safari, Edge).
- Sistemas operacionais: Windows, macOS, Linux.

**Critérios de sucesso:**
- [ ] LP 100% responsiva (testada em 320px, 768px, 1024px+).
- [ ] Design alinhado às referências visuais e aspectos gráficos.
- [ ] **SEO otimizado**: Meta tags, alt texts, semântica HTML.
- [ ] **Animações suaves** (GSAP/AOS) em seções-chave (hero, cards, formulário).
- [ ] Integração com **Meta Pixel** e **API do Meta** funcionando (validado com Meta Pixel Helper).
- [ ] Código validado em **W3C (HTML/CSS)** e **PHPStan (PHP)**.
- [ ] **Favicon** implementado (formato `.ico` ou `.png`).
- [ ] Documentação completa no `README.md`.
- [ ] Sem erros de segurança (XSS, CSRF, injeção de SQL).

---
---

## **📂 1. Aspectos Gráficos**
*Defina os elementos visuais base da LP. O Claude Code usará essas informações para gerar o CSS, design e animações.*

### **1.1. Fontes**
- **Títulos:** [Ex: "Poppins", peso: 700 (bold), tamanho: 32px]
- **Corpo de texto:** [Ex: "Open Sans", peso: 400 (regular), tamanho: 16px]
- **Botões:** [Ex: "Poppins", peso: 600 (semi-bold), tamanho: 18px]

### **1.2. Paleta de Cores**
| Elemento       | Cor (Hex)       | Uso                          |
|----------------|-----------------|------------------------------|
| Primária       | `#3E542A`       | Botões, links, destaques     |
| Secundária     | `#E8D295`       | Acentos, hover               |
| Fundo          | `#FAFDF6`       | Background principal         |
| Texto          | `#030303`       | Texto principal              |
| Fundo escuro   | `#AAA386`       | Seções alternadas            |
| Glassmorphism  | `rgba(250, 253, 246, 0.1)` | Efeito de vidro (background) |

### **1.3. Estilo do Site**
- **Layout:** Atrium — espaço central aberto, hierarquia clara - Hero com CTA justificado a esquerda
- **Efeitos visuais:**
  - Glassmorphism (backgrounds com `backdrop-filter: blur(10px)`).
  - Sombras suaves: `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1)`.
  - Transições suaves: `transition: all 0.3s ease`.

### **1.4. Sombras**
- **Botões:** `box-shadow: 0 4px 10px`
- **Cards:** `box-shadow: 0 6px 15px`

### **1.5. Animações** *(Novo)*
*Escolha uma biblioteca (GSAP ou AOS) e defina as animações para cada seção.*

- **Biblioteca:** [GSAP / AOS] *(Recomendação: GSAP para controle fino, AOS para simplicidade)*
- **Animações por seção:**
  | Seção       | Tipo de Animação               | Trigger          | Duração  |
  |-------------|--------------------------------|------------------|----------|
  | Hero        | Fade-in + Slide-up             | On page load     | 1s       |
  | Cards       | Stagger (entrada sequencial)   | Scroll           | 0.5s     |
  | Formulário  | Shake (ao erro) + Fade-in      | On submit/error  | 0.3s     |
  | Botões      | Hover: Scale(1.05) + Shadow     | Hover            | 0.2s     |

- **Exemplo de código GSAP:**
  ```javascript
  // Hero Animation
  gsap.from(".hero__title", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out"
  });

  // Cards Animation (Stagger)
  gsap.from(".card", {
    opacity: 0,
    y: 30,
    duration: 0.5,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".cards-section",
      start: "top 80%"
    }
  });
  ```

- **Exemplo de código AOS:**
  ```html
  <!-- No HTML -->
  <div class="hero" data-aos="fade-up" data-aos-duration="1000"></div>
  <div class="card" data-aos="zoom-in" data-aos-delay="200"></div>
  ```
  ```javascript
  // Inicialização AOS
  AOS.init({
    once: true, // Animações acontecem apenas uma vez
    mirror: false
  });
  ```

---
---

## **📄 2. Briefing**
*Copie e cole o briefing **EXATAMENTE** como recebido. Não edite ou resuma.*
Copy da Landing Page: Dra. Geovana Camargo
[DOBRA 1: HERO - O IMPACTO]
Visual: Foto da Dra. Geovana, à direita. À esquerda, o texto.
Headline: O EQUILÍBRIO PERFEITO PARA A SUA MELHOR VERSÃO.
Subheadline: Referência na aplicação de toxina botulínica e refinamento facial, a Dra. Geovana Camargo agora traz sua assinatura para a Harmonização Glútea. Uma experiência de cuidado absoluto em um ambiente desenhado para o seu máximo conforto
CTA (Botão): [QUERO AGENDAR MINHA AVALIAÇÃO]
[DOBRA 2: PROVA SOCIAL]
Título: Transformação com Naturalidade.
 Resultados reais.
Visual: Fotos de "Antes e Depois" 
Legendas:
Bloco A (Face): Full Face. Botox preventivo, Realçamos seus traços mantendo sua identidade.
Bloco B (Lábios): Lábios.Preenchimento labial refinado. Volume sob medida e contornos definidos para um sorriso naturalmente atraente. 
Bloco C (Glúteo): Harmonização Glútea. Volume, projeção, correção de celulites e flacidez.
CTA (Botão): [QUERO UM RESULTADO ASSIM]
[DOBRA 3: FORMULÁRIO DE QUALIFICAÇÃO]
Título: AGENDE SUA AVALIAÇÃO.
Subtexto:Preencha os dados e aguarde o contato da nossa equipe.
Campos:
Nome Completo
WhatsApp (com DDD)
Qual procedimento mais te interessa? (Botox / Harmonização Glútea / Preenchimento Labial / Full Face / Outros)
Botão: [CONFIRMAR MINHA RESERVA]

[DOBRA 4: — SOBRE A ESPECIALISTA]
[Título Principal - Fonte Grande/Impacto - Foto Dra]
Dra. GEOVANA CAMARGO
[Corpo da Copy] Especialista em aplicação de injetáveis e protocolos de rejuvenescimento Full Face. A Dra. Geovana é reconhecida pela precisão técnica e pelo olhar artístico que preserva a naturalidade de cada traço.
Unindo sua expertise facial ao novo padrão de Harmonização Glútea, ela transforma a estética em uma experiência de cuidado absoluto. À frente de uma estrutura exclusiva e acolhedora, sua entrega vai além do procedimento: é a construção da sua melhor versão em um ambiente de puro conforto e sofisticação.
CTA (Botão): [QUERO AGENDAR MINHA AVALIAÇÃO]
[DOBRA 5: A EXPERIÊNCIA ]
Visual: Carrossel de fotos ou mosaico elegante da estrutura da clínica, incluindo o cardápio de mimos e salas de atendimento.
Título: Muito além de um procedimento, um momento de cuidado.
Copy: Projetamos um espaço onde você encontra o acolhimento. Desfrute de um atendimento exclusivo, equipe multidisciplinar para cuidar de cada detalhe da sua beleza.
Destaque: "Equipe completa para procedimentos faciais e corporais."
---
---

## **📁 3. Documentação de Arquivos e Pastas**
*Estrutura local e naming conventions para o Claude Code seguir.*

### **3.1. Caminho da Pasta Raiz**
- **Local:** `/Users/eduardo/Projetos/[NomeProjeto]/LP/`

### **3.2. Pasta de Imagens**
- **Nome:** `img` (fixo).
- **Localização:** `/Users/eduardo/Projetos/[NomeProjeto]/LP/img/`
- **Nomenclatura:**
  - Hero (desktop): `img.png`
  - Hero (mobile): `imgmb.png`
  - Favicon: `favicon.ico` ou `favicon.png` *(Novo)*
  - Outras imagens: `[nome]-descricao.png` (ex: `logo-curso.png`, `icon-beneficio1.png`).

### **3.3. Pasta de Scripts** *(Atualizado)*
- **Localização:** `/Users/eduardo/Projetos/[NomeProjeto]/LP/scripts/`
- **Arquivos:**
  - `pixel.php` (Integração Meta Pixel).
  - `animations.js` *(Novo: para GSAP/AOS)*.
  - `main.js` *(Opcional: para lógica adicional)*.

---
---

## **🖼️ 4. Referências Visuais**
*Inclua links ou descrições detalhadas das referências para o Claude Code entender o estilo desejado.*
Sem referências no momento.

---
---

## **🔗 5. Integrações Externas (Meta Pixel e API)**
*Detalhes para o Claude Code gerar o arquivo `.php` de integração.*

### **5.1. Meta Pixel**
- **ID do Pixel:** `[Inserir ID do Pixel, ex: 1234567890]`
- **Eventos a rastrear:**
  - `PageView` (em todas as páginas).
  - `Lead` (ao submeter o formulário).
  - `Click` (em botões de CTA).
  - `Scroll` (para rastrear engajamento com a página). *(Novo)*

- **Dados adicionais para o evento `Lead`:** *(Novo)*
  - Campos do formulário a serem enviados:
    - `email` (obrigatório).
    - `nome` (obrigatório).
    - `telefone` (opcional).
    - `curso_interesse` (opcional, valor dinâmico).

### **5.2. API do Meta**
- **Endpoint:** `https://graph.facebook.com/v18.0/[ID_DA_API]`
- **Chave de acesso:** `[Inserir chave de acesso, ex: EAAXXXXXXXXXXXXX]`
- **Funções necessárias:**
  - Enviar dados de lead para o Meta (nome, email, telefone, curso_interesse).
  - Validar respostas da API (tratar erros 4xx/5xx).
  - Log de erros em arquivo (opcional, para debug).

- **Exemplo de payload para a API:** *(Novo)*
  ```json
  {
    "data": [
      {
        "event_name": "Lead",
        "event_time": [timestamp],
        "event_source_url": "[URL_DA_LP]",
        "event_id": "[ID_UNICO]",
        "user_data": {
          "email": "[EMAIL_DO_USUARIO]",
          "first_name": "[NOME_DO_USUARIO]",
          "phone": "[TELEFONE_DO_USUARIO]",
          "custom_data": {
            "curso_interesse": "[CURSO_SELECIONADO]"
          }
        }
      }
    ]
  }
  ```

---
---

## **🔍 6. SEO (Otimização para Mecanismos de Busca)** *(Novo)*
*Requisitos para otimizar a LP para SEO.*

### **6.1. Meta Tags**
*Incluir no `<head>` do `index.html`:*
```html
<!-- Meta Tags Básicas -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="[Descrição da LP: Ex: 'Curso online de Marketing Digital para alavancar suas vendas. Inscreva-se agora!']">
<meta name="keywords" content="[Palavras-chave: Ex: 'curso marketing digital, vendas online, treinamento']">
<meta name="author" content="[Nome do Autor ou Empresa]">

<!-- Open Graph (para compartilhamento em redes sociais) -->
<meta property="og:title" content="[Título da LP]">
<meta property="og:description" content="[Mesma descrição do meta description]">
<meta property="og:image" content="[URL da imagem de pré-visualização: Ex: 'https://seudominio.com/img/og-image.png']">
<meta property="og:url" content="[URL da LP]">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Título da LP]">
<meta name="twitter:description" content="[Mesma descrição do meta description]">
<meta name="twitter:image" content="[URL da imagem de pré-visualização]">

<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/img/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/img/favicon.png">
```

### **6.2. Alt Texts**
*Todas as imagens devem ter atributos `alt` descritivos:*
- **Hero:** `alt="[Descrição da imagem hero: Ex: 'Pessoa sorrindo usando um laptop com o curso de marketing digital']"`
- **Cards:** `alt="[Descrição do card: Ex: 'Ícone de gráfico representando crescimento de vendas']"`
- **Logo:** `alt="[Nome da Empresa] - Logo"`

### **6.3. Semântica HTML**
*Usar tags semânticas para melhorar o SEO:*
- `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- `<h1>` para o título principal (apenas um por página).
- `<h2>` a `<h6>` para subtítulos (em ordem hierárquica).
- `<strong>` ou `<b>` para destaques (evitar `<i>` para ícones; usar `<span class="icon">`).

### **6.4. URL Amigável**
*Se a LP for hospedada em um subdiretório:*
- **Exemplo:** `seudominio.com/curso-marketing-digital` (evitar `?id=123`).

### **6.5. Sitemap (Opcional)**
*Para LPs em domínios próprios, incluir um `sitemap.xml`:*
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seudominio.com/curso-marketing-digital</loc>
    <lastmod>2026-05-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---
---

## **✅ 7. Verificação de Integridade**
*Requisitos para o Claude Code validar o código gerado.*

### **7.1. Responsividade**
- **Testar em:**
  - Mobile: 320px a 767px.
  - Tablet: 768px a 1023px.
  - Desktop: 1024px+.
  - Sistemas operacionais: Windows, macOS, Linux.
- **Ferramentas:**
  - Chrome DevTools.
  - BrowserStack (opcional).

### **7.2. Segurança**
- **HTML/CSS:**
  - Nenhum JavaScript inline (usar arquivos `.js` separados).
  - Sanitização de inputs em formulários.
- **PHP:**
  - Usar `filter_var()` para sanitizar inputs.
  - Proteção contra XSS/CSRF.
  - Validação de dados no backend.
  - Uso de HTTPS em links externos.

### **7.3. Validação de Código**
- **HTML:** Validar no [W3C Validator](https://validator.w3.org/).
- **CSS:** Validar no [CSS Validator](https://jigsaw.w3.org/css-validator/).
- **PHP:** Validar com `PHPStan` ou `PSalm`.
- **SEO:** Validar meta tags com [Meta Tags Validator](https://metatags.io/).

### **7.4. Animações** *(Novo)*
- **GSAP:**
  - Verificar se todas as animações são disparadas corretamente (usar `console.log` para debug).
  - Garantir que não haja conflitos com outros scripts.
- **AOS:**
  - Testar em todos os breakpoints (mobile, tablet, desktop).
  - Verificar se `data-aos` está aplicado corretamente nos elementos.

### **7.5. Favicon** *(Novo)*
- **Formato:** `.ico` (recomendado) ou `.png` (16x16, 32x32, 180x180 para Apple Touch).
- **Localização:** `/img/favicon.ico` ou `/img/favicon.png`.
- **Validação:**
  - Verificar se o favicon aparece no navegador (aba e bookmarks).
  - Usar [Favicon Validator](https://realfavicongenerator.net/) para testar.

---
---

## **📝 8. Documentação**
*Requisitos para o Claude Code documentar o código gerado.*

### **8.1. Formato**
- **Arquivo:** `README.md` na pasta raiz.
- **Linguagem:** Português.

### **8.2. Conteúdo Obrigatório**
1. **Estrutura de pastas:** Mapa visual do projeto.
2. **Bibliotecas/Frameworks:** Lista de dependências (ex: GSAP, AOS, Bootstrap).
3. **Funcionalidades:** Descrição de cada seção da LP e seu propósito.
4. **Integrações:** Como o Pixel/API do Meta estão implementados.
5. **Responsividade:** Como foi testada e ajustada.
6. **SEO:** Meta tags, alt texts e semântica HTML implementadas. *(Novo)*
7. **Animações:** Biblioteca usada (GSAP/AOS) e como foram aplicadas. *(Novo)*
8. **Favicon:** Localização e formato. *(Novo)*
9. **Segurança:** Medidas implementadas (ex: "Inputs sanitizados com `filter_var()`").
10. **Como contribuir:** Instruções para outros desenvolvedores.

---
---

## **🔄 9. Fluxo de Trabalho para o Claude Code**
*Como o Claude Code deve executar as tarefas de forma modular.*

### **9.1. Fases do Projeto**
| Fase | Tarefa | Arquivos Envolvidos | Validação |
|------|--------|---------------------|-----------|
| 1 | Estrutura HTML + SEO | `index.html` | W3C Validator, Meta Tags Validator |
| 2 | CSS Responsivo | `styles/main.css`, `styles/responsive.css` | CSS Validator, Chrome DevTools |
| 3 | Animações (GSAP/AOS) | `scripts/animations.js` | Testar visualmente em todos os breakpoints |
| 4 | Integração Meta Pixel | `scripts/pixel.php` | Meta Pixel Helper, `php -l` |
| 5 | Favicon | `img/favicon.ico` | Favicon Validator |
| 6 | Documentação | `README.md` | Revisão humana |

### **9.2. Prompts para o Claude Code**
*Exemplos de como dividir o trabalho em prompts menores.*

#### **Fase 1: Estrutura HTML + SEO**
```text
"Claude, você é um especialista em HTML semântico e SEO. Com base nas seções **1 (Aspectos Gráficos)**, **2 (Briefing)** e **6 (SEO)** desta especificação, crie o arquivo `index.html` para a LP.

**Requisitos:**
1. Inclua as seções: Hero, Benefícios, Depoimentos, Formulário.
2. Use tags semânticas (`<header>`, `<main>`, `<section>`, `<footer>`).
3. Adicione todas as meta tags da **Seção 6.1** no `<head>`.
4. Inclua atributos `alt` em todas as imagens (veja **Seção 6.2**).
5. Adicione o favicon (veja **Seção 6.5**).
6. Siga a estrutura de pastas em **3.1**.

**Restrições:**
- ✅ Sempre: Use `<h1>` apenas uma vez por página.
- 🚫 Nunca: Use `<div>` para botões ou links.

**Entrega:**
Retorne o arquivo `index.html` e confirme que:
1. Passa no W3C Validator.
2. As meta tags estão corretas (validar com Meta Tags Validator)."
```

#### **Fase 2: CSS Responsivo**
*(Sem alterações em relação à versão anterior, mas agora inclui suporte a classes para animações GSAP/AOS.)*
```text
"Claude, você é um especialista em CSS e design responsivo. Com base no arquivo `index.html` gerado na Fase 1 e nas seções **1 (Aspectos Gráficos)** e **3 (Documentação de Arquivos)**, crie os arquivos `styles/main.css` e `styles/responsive.css`.

**Requisitos:**
1. Implemente o design Glassmorphism (veja **1.3**).
2. Use a paleta de cores em **1.2**.
3. Adicione media queries para mobile (320px-767px), tablet (768px-1023px) e desktop (1024px+).
4. Inclua classes para animações (ex: `.fade-in`, `.slide-up`) para ser usado pelo GSAP/AOS.
5. Adicione transições suaves para hover (veja **1.3**).

**Restrições:**
- ✅ Sempre: Use variáveis CSS para cores (ex: `--primary-color: #4A6BFF`).
- 🚫 Nunca: Use `!important`.

**Entrega:**
Retorne os arquivos `main.css` e `responsive.css` e confirme que passam no CSS Validator."
```

#### **Fase 3: Animações (GSAP ou AOS)** *(Novo)*
```text
"Claude, você é um especialista em animações web. Com base no arquivo `index.html` e `styles/main.css` gerados nas Fases 1 e 2, e na **Seção 1.5 (Animações)**, implemente as animações usando [GSAP/AOS].

**Requisitos:**
1. Use a biblioteca escolhida: [GSAP/AOS].
2. Implemente as animações conforme a tabela em **1.5**:
   - Hero: Fade-in + Slide-up.
   - Cards: Stagger (entrada sequencial).
   - Formulário: Shake (ao erro) + Fade-in.
   - Botões: Hover: Scale(1.05) + Shadow.
3. Para GSAP:
   - Inclua o CDN no `index.html`: `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>`.
   - Crie o arquivo `scripts/animations.js` com o código.
4. Para AOS:
   - Inclua o CDN no `index.html`: `<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">` e `<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>`.
   - Adicione os atributos `data-aos` nos elementos do HTML.
   - Inicialize o AOS no `scripts/animations.js`.

**Restrições:**
- ✅ Sempre: Teste as animações em mobile, tablet e desktop.
- 🚫 Nunca: Deixe animações quebrem o layout ou atrapalhem a usabilidade.

**Entrega:**
Retorne o arquivo `scripts/animations.js` (e atualizações no `index.html` se necessário) e confirme que:
1. Todas as animações funcionam corretamente.
2. Não há conflitos com outros scripts."
```

#### **Fase 4: Integração Meta Pixel** *(Atualizado com mais detalhes)*
```text
"Claude, você é um especialista em PHP e integrações com APIs. Com base nas seções **5 (Integrações Externas)** e **3 (Documentação de Arquivos)**, crie o arquivo `scripts/pixel.php`.

**Requisitos:**
1. Inicialize o Meta Pixel com o ID **[Inserir ID do Pixel]**.
2. Implemente os eventos:
   - `PageView` (ao carregar a página).
   - `Lead` (ao submeter o formulário, com dados de `email`, `nome`, `telefone`, `curso_interesse`).
   - `Click` (em botões de CTA).
   - `Scroll` (para rastrear engajamento).
3. Sanitize todos os inputs do formulário (use `filter_var()`).
4. Envie os dados para a API do Meta conforme o **payload em 5.2**.
5. Inclua comentários no código explicando cada etapa.
6. Adicione o script do Meta Pixel no `index.html`:
   ```html
   <!-- Meta Pixel Code -->
   <script>
     !function(f,b,e,v,n,t,s)
     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
     n.queue=[];t=b.createElement(e);t.async=!0;
     t.src=v;s=b.getElementsByTagName(e)[0];
     s.parentNode.insertBefore(t,s)}(window, document,'script',
     'https://connect.facebook.net/en_US/fbevents.js');
     fbq('init', '[Inserir ID do Pixel]');
     fbq('track', 'PageView');
   </script>
   <noscript>
     <img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=[Inserir ID do Pixel]&ev=PageView&noscript=1"/>
   </noscript>
   ```

**Restrições:**
- ✅ Sempre: Valide o código com `php -l pixel.php`.
- 🚫 Nunca: Exiba erros em produção (`error_reporting(0)`).

**Entrega:**
Retorne o arquivo `pixel.php` e as atualizações no `index.html` e confirme que:
1. Não há erros de sintaxe (`php -l`).
2. Os eventos são disparados corretamente (testar com Meta Pixel Helper).
3. Os dados do formulário são enviados para a API do Meta."
```

#### **Fase 5: Favicon** *(Novo)*
```text
"Claude, você é um especialista em assets para web. Com base na **Seção 3.2 (Pasta de Imagens)** e **6.5 (Favicon)**, implemente o favicon para a LP.

**Requisitos:**
1. Crie o arquivo `img/favicon.ico` (ou `img/favicon.png`).
2. Inclua no `index.html` as tags para favicon (veja **Seção 6.1**).
3. Para favicon em múltiplos formatos (recomendado):
   - `favicon.ico` (16x16, 32x32).
   - `favicon.png` (180x180 para Apple Touch).
4. Use a logo da empresa ou um ícone representativo da LP.

**Restrições:**
- ✅ Sempre: Teste o favicon em diferentes navegadores (Chrome, Firefox, Safari).
- 🚫 Nunca: Use um favicon genérico (ex: "favicon.ico" padrão do navegador).

**Entrega:**
Retorne o arquivo `favicon.ico` (ou `favicon.png`) e confirme que:
1. O favicon aparece corretamente no navegador (aba e bookmarks).
2. Passa no Favicon Validator (https://realfavicongenerator.net/)."
```

#### **Fase 6: Documentação**
*(Atualizado para incluir SEO, animações e favicon)*
```text
"Claude, você é um especialista em documentação técnica. Com base em todo o projeto gerado (HTML, CSS, PHP, JS), crie o arquivo `README.md` na pasta raiz.

**Requisitos:**
1. Inclua as seções listadas em **8.2 (Conteúdo Obrigatório)**.
2. Use formatação Markdown (títulos, listas, código em bloco).
3. Adicione exemplos de como executar o projeto localmente.
4. Detalhe:
   - Como as animações foram implementadas (GSAP/AOS).
   - Como o SEO foi otimizado (meta tags, alt texts).
   - Onde o favicon está localizado e como substituí-lo.

**Restrições:**
- ✅ Sempre: Seja claro e objetivo.
- 🚫 Nunca: Inclua segredos (IDs, chaves de API).

**Entrega:**
Retorne o arquivo `README.md` para revisão."
```

---
---

## **🔍 10. Autoverificações e Validação Final**
*Checklist para o Claude Code e para você validar o projeto.*

### **10.1. Checklist de Responsividade**
- [ ] Mobile (320px): Layout ajustado, textos legíveis, botões clicáveis.
- [ ] Tablet (768px): Seções reorganizadas, imagens escaladas.
- [ ] Desktop (1440px): Layout completo, sem sobreposições.

### **10.2. Checklist de Segurança**
- [ ] Nenhum JavaScript inline.
- [ ] Inputs sanitizados no PHP (`filter_var()`).
- [ ] Nenhum segredo (IDs, chaves) no código.
- [ ] Uso de HTTPS em links externos.

### **10.3. Checklist de Código**
- [ ] HTML válido (W3C).
- [ ] CSS válido (CSS Validator).
- [ ] PHP válido (`php -l` e PHPStan).
- [ ] Meta Pixel funcionando (Meta Pixel Helper).

### **10.4. Checklist de SEO** *(Novo)*
- [ ] Meta tags implementadas (validar com Meta Tags Validator).
- [ ] Alt texts em todas as imagens.
- [ ] Tags semânticas (`<header>`, `<main>`, `<section>`, etc.).
- [ ] Favicon implementado e testado.

### **10.5. Checklist de Animações** *(Novo)*
- [ ] GSAP/AOS inicializado corretamente.
- [ ] Animações funcionam em todos os breakpoints.
- [ ] Nenhum conflito com outros scripts.

---
---

## **📌 11. Entrega Final**
*Formato e checklist de entrega para o Claude Code.*

### **11.1. Arquivos a Entregar**
- [ ] `index.html` (com meta tags, favicon e estrutura semântica).
- [ ] `styles/main.css`
- [ ] `styles/responsive.css`
- [ ] `scripts/pixel.php`
- [ ] `scripts/animations.js` *(Novo)*
- [ ] `README.md`
- [ ] Pasta `/img` com:
  - `img.png` (hero desktop).
  - `imgmb.png` (hero mobile).
  - `favicon.ico` ou `favicon.png` *(Novo)*
  - Outras imagens (ex: `logo-curso.png`).

### **11.2. Formato de Compressão**
- **Nome do ZIP:** `[NomeProjeto]_LP_[Data].zip`
  *(Ex: "ClienteX_LP_2026-05-11.zip")*

### **11.3. Checklist de Validação Final**
- [ ] Todos os arquivos estão na pasta correta (veja **3.1**).
- [ ] Código 100% responsivo (testado em 3+ dispositivos).
- [ ] Sem erros de console (Chrome/Firefox).
- [ ] Meta Pixel e API do Meta funcionando.
- [ ] SEO otimizado (meta tags, alt texts, semântica).
- [ ] Animações funcionando (GSAP/AOS).
- [ ] Favicon implementado e visível.
- [ ] Documentação completa no `README.md`.
- [ ] Imagens otimizadas (formato WebP ou compressão sem perda).

---
---
## **💡 Dicas para Otimizar o Trabalho com o Claude Code**
1. **Use o Modo Plano (Shift+Tab):**
   - Antes de gerar código, peça ao Claude Code para **criar um plano detalhado** com base nesta especificação.
   - Exemplo:
     ```
     "Claude, com base nesta especificação, crie um plano passo a passo para gerar a LP. Inclua:
     1. Ordem das fases (HTML → CSS → Animações → Meta Pixel → Favicon → Documentação).
     2. Arquivos a serem criados em cada fase.
     3. Testes necessários."
     ```

2. **Valide Cada Fase:**
   - Após cada fase, **valide o código** antes de prosseguir.
   - Exemplo para animações:
     ```
     "Claude, execute o projeto localmente e verifique se as animações do GSAP/AOS estão funcionando em todos os breakpoints."
     ```

3. **Documentação Contínua:**
   - Peça ao Claude Code para **atualizar o `README.md`** conforme o projeto avança.
   - Exemplo:
     ```
     "Claude, adicione ao README.md a descrição das animações implementadas na Fase 3."
     ```

4. **Reutilize o Contexto:**
   - Se precisar reiniciar o Claude Code, **cole esta especificação** para manter o contexto.

---
---
## **⚠️ Armadilhas Comuns a Evitar**
1. **Especificações vagas para SEO:**
   - ❌ "Melhore o SEO."
   - ✅ "Adicione meta tags para descrição, keywords e Open Graph, com alt texts em todas as imagens."

2. **Animações que quebram o layout:**
   - ❌ "Adicione animações legais."
   - ✅ "Use GSAP para animar a seção Hero com fade-in + slide-up, sem conflitos com o CSS."

3. **Favicon esquecido:**
   - ❌ "O favicon é opcional."
   - ✅ "Inclua um favicon no formato .ico (16x16, 32x32) e .png (180x180 para Apple Touch)."

4. **Integração com Meta incompleta:**
   - ❌ "Adicione o Meta Pixel."
   - ✅ "Implemente o Meta Pixel com eventos PageView, Lead (com dados do formulário) e Click, e envie os dados para a API do Meta com o payload especificado."

---
---
## **🚀 Próximos Passos para Você, Eduardo**
1. **Preencha os campos em branco** nesta especificação (ex: ID do Pixel, briefing, referências visuais, biblioteca de animações).
2. **Salve este arquivo** como `SPEC_LP_[NomeProjeto]_v2.md` na pasta do projeto.
3. **Inicie o Claude Code** e cole a **Fase 1 (Estrutura HTML + SEO)** para começar.
4. **Valide cada entrega** antes de prosseguir para a próxima fase.

---
**Pergunta:**
Você gostaria que eu **adicionasse mais algum detalhe específico**? Por exemplo:
- Um **exemplo completo de `index.html`** com SEO e favicon?
- Um **guia de como testar as animações** no navegador?
- **Detalhes sobre como hospedar a LP** (ex: Netlify, Vercel)?