# Dra. Geovana Camargo — Landing Page

Landing page institucional e de captação de leads para a Dra. Geovana Camargo,
especialista em harmonização facial e glútea.

---

## Estrutura de pastas

```
/
├── index.html         # Marcação semântica das 5 dobras
├── styles.css         # Design system + responsividade
├── script.js          # Antes/Depois, form, Pixel client-side
├── pixel.php          # Conversions API (CAPI) — Meta
├── README.md          # Este arquivo
└── img/               # Imagens reais (substituir placeholders)
    ├── img.png        # Hero — desktop
    ├── imgmb.png      # Hero — mobile
    ├── dra.png        # Retrato Dra. (seção Sobre)
    ├── ba-face-*.png  # Antes/Depois — Full Face
    ├── ba-lips-*.png  # Antes/Depois — Lábios
    ├── ba-glut-*.png  # Antes/Depois — Glúteo
    └── clinic-*.png   # Mosaico da clínica
```

> Os SVGs com listras na página atual são **placeholders**. Para publicar,
> substitua os blocos `.photo-ph` em `index.html` por `<img>` com as imagens
> reais do diretório `img/`. Recomendado: WebP, largura máxima 1600px.

## Bibliotecas / dependências

Nenhuma. A página é construída com **HTML, CSS e JS vanilla**. As fontes
são carregadas via Google Fonts (`Red Hat Display`, `Red Hat Text`,
`Red Hat Mono`).

## Sistema visual

| Token        | Valor      | Uso                                |
|--------------|------------|------------------------------------|
| `--color-primary`   | `#928575` | CTA secundário, detalhes, hovers |
| `--color-secondary` | `#E8E4D9` | Fundos suaves, chips             |
| `--color-accent`    | `#CCC1AF` | Destaques, gradientes            |
| `--color-bg`        | `#FFFFFF` | Background padrão                |
| `--color-text`      | `#030303` | Texto e CTA primário             |

Tipografia: títulos em **Red Hat Display** (400/500), corpo em
**Red Hat Text** (400/500). Tamanhos usam `clamp()` para escalar entre
mobile e desktop sem media queries adicionais.

## Funcionalidades por seção

### Hero (Dobra 1) — `index.html` (linhas ~38–98)
Apresenta a headline principal, subheadline, CTA primário e CTA de
exploração ("Ver resultados"). Card de prova social em vidro
(glassmorphism) posicionado sobre a foto.

### Resultados — Antes & Depois (Dobra 2) — `index.html` (linhas ~100–186)
Três cards com **slider Antes/Depois interativo**. O usuário arrasta a alça
(mouse/touch) para comparar. Implementação em `script.js` (`.ba-frame`).
Cada card tem CTA contextual no fim da seção.

### Sobre a especialista (Dobra 4) — `index.html` (linhas ~188–230)
Bloco em fundo preto contrastante. Retrato grande, biografia, lista de
áreas de atuação e CTA primário.

### Experiência (Dobra 5) — `index.html` (linhas ~232–278)
Mosaico assimétrico (CSS Grid) com 5 frames da clínica + faixa de
destaque com a frase âncora "Equipe completa…".

### Formulário (Dobra 3) — `index.html` (linhas ~280–340)
Posicionado ao final como conversão. Validação client-side em
`script.js`, máscara de telefone, mensagem de sucesso e disparo do
evento `Lead` no Pixel.

## Integrações — Meta Pixel / CAPI

### Client-side (`index.html`)
O snippet do Pixel está incluído mas comentado. Para ativar:

```js
fbq('init', 'SEU_PIXEL_ID');
fbq('track', 'PageView');
```

`script.js` dispara `fbq('track', 'Lead', { content_name, content_category })`
ao enviar o formulário.

### Server-side (`pixel.php`)
Endpoint para Conversions API. Edite no topo do arquivo:

```php
const META_PIXEL_ID     = 'SEU_PIXEL_ID';
const META_ACCESS_TOKEN = 'SEU_TOKEN_CAPI';
const ALLOWED_ORIGIN    = 'https://seudominio.com.br';
```

Para enviar o lead também via CAPI, descomente em `script.js`:

```js
fetch('pixel.php', { method:'POST', body: new FormData(form) });
```

Eventos rastreados: `PageView` (no load) e `Lead` (no submit).

## Responsividade

Breakpoints utilizados em `styles.css`:

- **Mobile** (≤ 700px): grid 1 coluna, navbar sem links, mosaico empilhado.
- **Tablet** (701–900px): hero 1 coluna, grid de resultados 1 coluna.
- **Desktop** (≥ 901px): layout completo com 2/3 colunas.

Testado em:
- Chrome DevTools (mobile 375/414, tablet 768, desktop 1024/1440)
- Safari iOS / Chrome Android

## Segurança

- **Inputs sanitizados** em `pixel.php` com `filter_input(... FILTER_SANITIZE_SPECIAL_CHARS)`.
- **PII hasheada** (SHA-256) antes do envio à Meta, conforme exigido.
- **CORS** controlado por `ALLOWED_ORIGIN`.
- **Validação client-side** em `script.js` antes do envio.
- Recomendado servir o site sempre sob **HTTPS** e adicionar **rate-limit**
  no servidor para `pixel.php` (ex.: nginx `limit_req`) em produção.
- Considerar adicionar token CSRF ao formulário em produção
  (sessão PHP + campo oculto + verificação em `pixel.php`).

## Validação de código

- HTML: validar em <https://validator.w3.org/>
- CSS: validar em <https://jigsaw.w3.org/css-validator/>
- JS: rodar em ESLint (config `recommended`)
- PHP: `phpstan analyse pixel.php --level=5`

## Favicon

Embutido como SVG inline (data URI) no `<head>` do `index.html`,
exibindo as iniciais **GC** sobre fundo gradiente em tons da marca.

## Como contribuir

- Para adicionar **uma nova seção**, crie um `<section>` no `index.html`
  seguindo o padrão `.section` ou `.section-soft`, com a classe `.reveal`
  nos elementos que devem animar à entrada na viewport.
- **Estilos**: adicione blocos no fim de `styles.css` mantendo o uso de
  variáveis CSS para cor/tipografia.
- **Imagens**: substitua os `.photo-ph` por `<img loading="lazy">` com
  `alt` descritivo e tamanho fixo em CSS para evitar layout shift.
- Antes de publicar: minificar `styles.css` e `script.js`, exportar
  imagens em WebP/AVIF, ativar gzip/brotli no servidor.
