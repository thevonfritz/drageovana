# LP — Dra. Geovana Camargo | Estética Facial & Corporal

Landing page para captação de leads — toxina botulínica, harmonização glútea e refinamento facial.

---

## Estrutura de pastas

```
Dra Geovana/
├── index.html
├── styles/
│   ├── main.css          # Design, paleta verde/areia, layout Atrium
│   └── responsive.css    # Media queries (mobile/tablet/desktop)
├── scripts/
│   ├── animations.js     # GSAP + validação + rastreamento
│   └── pixel.php         # Integração Meta Conversions API
├── img/
│   ├── img.png                  # Foto hero (desktop)
│   ├── imgmb.png                # Foto hero (mobile)
│   ├── favicon.ico              # Favicon
│   ├── favicon.png              # Apple Touch Icon (180x180)
│   ├── antes-depois-face.png    # Resultado Full Face
│   ├── antes-depois-labios.png  # Resultado Preenchimento Labial
│   ├── antes-depois-gluteo.png  # Resultado Harmonização Glútea
│   ├── dra-geovana-foto.png     # Foto sobre a especialista
│   ├── clinica-1.png            # Mosaico clínica (principal)
│   ├── clinica-2.png            # Mosaico clínica (lateral 1)
│   └── clinica-3.png            # Mosaico clínica (lateral 2)
└── README.md
```

---

## Paleta de cores

| Token | Hex | Uso |
|-------|-----|-----|
| `--green` | `#3E542A` | Botões, destaques, títulos em itálico |
| `--green-dark` | `#2D3D1E` | Hover de botões, footer |
| `--sand` | `#E8D295` | Acentos, specialty no footer |
| `--taupe` | `#AAA386` | Seção "Sobre" (background) |
| `--taupe-light` | `#F2EFE6` | Seção "Resultados" (background) |
| `--bg` | `#FAFDF6` | Background principal |
| `--text` | `#030303` | Texto principal |

---

## Seções

| # | Seção | Objetivo |
|---|-------|----------|
| 1 | Hero | Impacto imediato, CTA alinhado à esquerda |
| 2 | Resultados | 3 cards antes/depois (Face, Lábios, Glúteo) |
| 3 | Formulário | Captação com seletor de procedimento |
| 4 | Sobre | Autoridade da Dra. Geovana (fundo taupe) |
| 5 | Experiência | Mosaico da clínica + destaque editorial |
| 6 | Rodapé | Contato e links legais |

---

## Como rodar localmente

```bash
cd "Dra Geovana"
php -S localhost:8080
```

Abra `http://localhost:8080`.

---

## Configurações obrigatórias antes de publicar

| Arquivo | Campo | O que preencher |
|---------|-------|-----------------|
| `index.html` | `SEU_PIXEL_ID_AQUI` (2×) | ID do Meta Pixel |
| `scripts/pixel.php` | `SEU_PIXEL_ID_AQUI` | ID do Meta Pixel |
| `scripts/pixel.php` | `SEU_ACCESS_TOKEN_AQUI` | Token da Conversions API |
| `scripts/pixel.php` | `event_source_url` | URL real da LP |
| `index.html` | rodapé — WhatsApp | Número real da clínica |
| `index.html` | `og:url` | URL real da LP |

---

## Animações (GSAP)

| Elemento | Animação | Trigger |
|----------|----------|---------|
| Hero (tag, título, sub, CTA) | Fade + Slide-up sequencial | On load |
| Foto hero | Fade + Slide-right | On load |
| Quadrado decorativo | Scale + fade | On load |
| Cards resultado | Stagger fade-up | Scroll |
| Form | Fade-up | Scroll |
| Seção sobre | Slide-in bilateral | Scroll |
| Mosaico clínica | Slide-in bilateral | Scroll |
| Destaque editorial | Fade-up | Scroll |
| Campos com erro | Shake elástico | On submit |

---

## Meta Pixel — eventos

| Evento | Quando |
|--------|--------|
| `PageView` | Carregamento |
| `Lead` | Formulário enviado (inclui procedimento selecionado) |
| `InitiateCheckout` | Clique em qualquer CTA |
| `ScrollDepth` | Scroll em 25 %, 50 % e 75 % |

---

## Segurança

- Sem JavaScript inline
- Inputs sanitizados com `filter_var()` + whitelist de procedimentos permitidos
- Dados hasheados (SHA-256) antes do envio à Conversions API
- Erros da API logados, nunca expostos ao cliente

---

## Checklist pré-publicação

- [ ] Pixel ID e Access Token preenchidos
- [ ] URL da LP preenchida
- [ ] Imagens reais em `/img` (todas as listadas acima)
- [ ] WhatsApp do rodapé atualizado
- [ ] Testar formulário com Meta Pixel Helper
- [ ] Validar HTML em validator.w3.org
- [ ] Validar CSS em jigsaw.w3.org/css-validator
- [ ] Testar nos breakpoints: 320px, 768px, 1440px
- [ ] Testar em Chrome, Firefox e Safari
