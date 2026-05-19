# Blueprint — Studio Note Site (replicable template)

> **Scopo di questo file:** descrivere l'architettura completa del sito di studio
> "peer-to-peer-website-notes" affinché un agente Claude possa replicare la
> stessa struttura per un corso diverso senza aver visto la repo originale.
> Incolla questo file in una nuova sessione Claude Code sulla repo del nuovo corso.

---

## Cos'è questo progetto

Sito web statico per studio personale di un corso universitario. Features:

- **Lettore lezioni** — markdown delle lezioni del corso renderizzato con syntax highlighting (Shiki), KaTeX per formule, callout Obsidian → HTML, immagini.
- **Navigazione modulare** — lezioni raggruppate in moduli, sidebar con progress.
- **Quick check** — 3 domande a scelta multipla per lezione, sbloccate dopo aver letto; feedback immediato.
- **Quiz per modulo** — 10 domande a scelta multipla, score + XP.
- **Laboratori interattivi** — componenti React con sezione teoria espandibile + parte pratica animata.
- **Sistema gamification** — XP accumulato, badge sbloccabili, pagina progressi.
- **Dark mode** automatica (CSS `data-theme`).
- **Deploy su GitHub Pages** (SPA con 404.html fallback).

---

## Stack tecnologico

| Tool | Versione | Uso |
|------|----------|-----|
| React | 19 | UI |
| TypeScript | ~6 | Type safety (strict) |
| Vite | 8 | Bundler + dev server |
| react-router-dom | 7 | SPA routing (hash history per GH Pages) |
| framer-motion | 12 | Animazioni lab interattivi |
| react-markdown | 10 | Rendering markdown lezioni |
| remark-gfm | 4 | GFM tables/strikethrough |
| remark-math + rehype-katex | latest | Formule LaTeX |
| rehype-raw | 7 | Raw HTML (callout blocks) |
| Shiki | 4 | Syntax highlighting codice |
| KaTeX | 0.16 | Render formule (bundle CSS) |
| @fontsource-variable/inter | 5 | Font Inter variabile |
| clsx | 2 | CSS class utility |
| gh-pages | 6 | Deploy a GitHub Pages |
| SubtleCrypto (nativa browser) | — | SHA-256 nei lab |

**Nessuna dipendenza backend.** Tutto client-side + file statici.

---

## Struttura repo

```
<repo>/
├── build/               # Input content (NON committato spesso, generato da Obsidian)
│   ├── md/              # Lezioni come file .md (Lezione 1 - Titolo.md, ecc.)
│   └── images/          # Immagini referenziate nelle lezioni
└── frontend/            # App React
    ├── scripts/
    │   └── build-content.mjs   # Prebuild pipeline: md → manifest + lessons
    ├── public/
    │   ├── 404.html            # SPA fallback per GH Pages
    │   └── images/             # Copiate da build/images/ dal prebuild
    ├── src/
    │   ├── content/
    │   │   ├── manifest.ts     # AUTO-GENERATO dal prebuild (non editare)
    │   │   └── lessons/        # AUTO-GENERATO: un .md per lezione
    │   ├── components/
    │   │   ├── LabShell.tsx    # Wrapper condiviso per tutti i lab
    │   │   ├── Sidebar.tsx     # Navigazione moduli/lezioni
    │   │   ├── Header.tsx      # Top bar con dark mode toggle
    │   │   └── LabBanner.tsx   # Banner "vai al lab" in fondo alle lezioni
    │   ├── data/
    │   │   ├── modules.ts      # MODULES[], LABS[], tipi LabMeta/ModuleMeta
    │   │   └── quizzes/        # Un .ts per modulo con le domande quiz
    │   ├── hooks/
    │   │   └── useProgress.ts  # Hook React per stato XP/badge/lezioni viste
    │   ├── labs/               # Componenti lab interattivi
    │   │   ├── KademliaXOR.tsx
    │   │   ├── ConsistentHashing.tsx
    │   │   ├── PoWSimulator.tsx
    │   │   ├── MerkleTree.tsx
    │   │   ├── BloomFilter.tsx
    │   │   ├── UTXOBuilder.tsx
    │   │   └── ECDSASign.tsx
    │   ├── routes/
    │   │   ├── Home.tsx        # Landing page con moduli
    │   │   ├── ModulePage.tsx  # Lista lezioni di un modulo
    │   │   ├── LessonPage.tsx  # Singola lezione (markdown reader)
    │   │   ├── QuizPage.tsx    # Quiz per modulo
    │   │   ├── LabPage.tsx     # Router lab (switch su slug)
    │   │   └── ProgressPage.tsx # Pagina progressi + badge
    │   ├── styles/
    │   │   ├── global.css      # CSS tokens (variabili colore, font, radius)
    │   │   ├── markdown.css    # Stili contenuto lezione + callout
    │   │   ├── labs.css        # Stili lab interattivi
    │   │   └── quiz.css        # Stili quiz/quick-check
    │   └── utils/
    │       ├── crypto.ts       # sha256Hex() via SubtleCrypto
    │       ├── progress.ts     # BADGE_CATALOG, ProgressState, xpForQuiz()
    │       ├── bloomHash.ts    # bloomHashes(), falsePositiveRate(), occupancy()
    │       └── ecMath.ts       # Aritmetica curva ellittica didattica
    ├── index.html              # Entry point (contiene snippet decode SPA)
    ├── vite.config.ts          # base: '/<repo-name>/'
    ├── tsconfig.json           # strict: true, paths: { "@/*": ["src/*"] }
    └── package.json
```

---

## Pipeline contenuti (build-content.mjs)

Il prebuild trasforma i file Obsidian in contenuto web. Si esegue automaticamente prima di `dev` e `build`.

### Input atteso

File in `build/md/` con naming convention:
```
Lezione 1 - Titolo della lezione.md
Lezione 2 - Altro titolo.md
Progetto - Nome progetto.md   ← skippato (o incluso se vuoi)
```

### Output generato

1. **`src/content/lessons/lezione-01.md`** ecc. — lezioni preprocessate:
   - Rimozione frontmatter YAML
   - Conversione callout Obsidian (`> [!definition] Titolo`) → `<div class="callout callout-definition">`
   - Conversione blocchi mermaid → placeholder informativo
   - Stripping sezioni amministrative (es. sezioni con header "Risorse", "Link", ecc.)

2. **`src/content/manifest.ts`** — file TypeScript auto-generato con:
   ```ts
   export const LESSONS: readonly LessonMeta[] = [...]
   export const LESSONS_BY_SLUG: Record<string, LessonMeta> = {...}
   export function lessonsForModule(moduleId): LessonMeta[]
   export function neighbourLessons(slug): { prev, next }
   ```

### Mappe da configurare in build-content.mjs

```js
// Numero lezione → ID modulo (stringa che corrisponde a ModuleId in modules.ts)
const MODULE_MAP = {
  1: 'module-a', 2: 'module-a', 3: 'module-a',
  4: 'module-b', 5: 'module-b',
  // ...
}

// Numero lezione → slug del lab interattivo (o assente se nessun lab)
const LAB_FOR_LESSON = {
  3: 'my-lab-slug',
  7: 'another-lab',
}
```

---

## Moduli e lezioni (data/modules.ts)

### ModuleMeta

```ts
export type ModuleMeta = {
  id: ModuleId        // stringa unica, es. 'networking', 'storage', 'virtualization'
  num: number         // numero progressivo
  title: string       // titolo breve
  subtitle: string    // sottotitolo
  description: string // paragrafo descrittivo (Home page)
  color: string       // colore hex per accent (sidebar, card header)
}
```

### LabMeta

```ts
export type LabMeta = {
  slug: string        // URL slug, es. 'my-lab'
  title: string       // titolo visualizzato
  blurb: string       // descrizione breve (card index lab)
  lessonSlug: string  // 'lezione-XX' di riferimento
}
```

### Come il manifest usa questi dati

`LessonMeta` (generata dal prebuild) include `moduleId: ModuleId` e `labSlug: LabSlug | null`.
La sidebar raggruppa per `moduleId`. Il `LabBanner` appare nella lesson se `labSlug !== null`.

---

## CSS Design System (styles/global.css)

Variabili CSS (light mode):

```css
:root {
  --bg: #fbfbfd;
  --bg-elevated: #ffffff;
  --bg-muted: #f3f4f7;
  --border: #e2e4ea;
  --border-strong: #c9ccd4;
  --text: #1a1c22;
  --text-soft: #545865;
  --text-muted: #8a8e9b;
  --link: #4a6cf7;
  --accent: #4a6cf7;
  --accent-soft: rgba(74, 108, 247, 0.12);
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px;
  --sidebar-width: 280px;
  --header-height: 60px;
  --content-max-width: 760px;
  --sans: 'Inter Variable', system-ui, sans-serif;
  --mono: ui-monospace, Menlo, Consolas, monospace;

  /* Per modulo — uno per ciascun ModuleId (usato in sidebar/card accent) */
  --mod-networking: #5b8def;
  --mod-storage: #f7931a;
  --mod-virtualization: #7b3ff2;
  --mod-security: #22a06b;
}

:root[data-theme='dark'] {
  --bg: #0e1014;
  --bg-elevated: #161922;
  /* ... stesse variabili con valori dark */
}
```

Dark mode toggling: `document.documentElement.setAttribute('data-theme', 'dark')`.
Theme preference salvata in `localStorage['theme']`.

---

## Sistema progressi e gamification (utils/progress.ts)

### ProgressState (localStorage)

```ts
type ProgressState = {
  lessonsViewed: Record<string, { viewedAt: string; quickCheckScore?: number; quickCheckTotal?: number }>
  moduleQuizzes: Partial<Record<ModuleId, { score: number; attempts: number; bestAt: string }>>
  xp: number
  badges: string[]           // array di badge ID sbloccati
  labStats: Record<string, { uses: number; lastAt: string }>
  lastVisited: { moduleId: ModuleId; lessonSlug: string } | null
}
```

Chiave localStorage: stringa configurabile, es. `'ddo-study:state'`.

### Badge catalog (BADGE_CATALOG)

Array di `{ id, title, description, icon }`. Esempio:

```ts
{ id: 'first-step', title: 'Primo passo', description: 'Prima lezione aperta.', icon: '🚀' }
{ id: 'module-a-done', title: 'Module A Expert', description: 'Quiz modulo A superato ≥80%.', icon: '🏅' }
{ id: 'my-lab-badge', title: 'Lab Expert', description: 'Hai completato X nel lab.', icon: '🔬' }
```

### recordLabUse (hook useProgress)

```ts
recordLabUse(labSlug: string, badgeId?: string, threshold?: number)
```

Incrementa `labStats[labSlug].uses`. Se `badgeId` fornito e `uses >= threshold`, sblocca il badge.

### XP

- Aprire una lezione: +10 XP (prima visita)
- Quick check completato: +5 XP
- Quiz modulo ≥80%: +100 XP; ≥60%: +50 XP; altrimenti +10 XP
- Badge: visuale, non XP extra

---

## Quick check (domande per lezione)

Ogni lezione può avere 3 domande a risposta multipla, definite inline nel componente `LessonPage.tsx` o in un file separato `data/quickChecks.ts`.

Formato:

```ts
type QuickCheck = {
  lessonSlug: string
  questions: Array<{
    q: string
    options: string[]
    correct: number   // indice della risposta corretta
  }>
}
```

Il quick check appare in fondo alla pagina lezione. Una volta completato, la lezione è "done" (checkmark in sidebar).

---

## Quiz per modulo

File in `data/quizzes/<moduleId>.ts`:

```ts
export const QUIZ_MODULE_A: QuizQuestion[] = [
  {
    q: 'Domanda 1?',
    options: ['A', 'B', 'C', 'D'],
    correct: 2,
    explanation: 'La risposta è C perché...',
  },
  // 10 domande totali
]
```

`QuizPage.tsx` carica il quiz del modulo, mostra le domande una alla volta, calcola score, assegna XP e sblocca badge modulo.

---

## Laboratori interattivi

### Pattern LabShell

Ogni lab è un componente React che usa `LabShell` come wrapper:

```tsx
import { LabShell } from '@/components/LabShell'

function MyLabTheory() {
  return (
    <>
      <h4>Concetto chiave</h4>
      <p>Spiegazione...</p>
      <code className="formula">formula = qui</code>
    </>
  )
}

export function MyLab() {
  const { recordLabUse } = useProgress()
  // ... state del lab

  return (
    <LabShell
      title="Titolo Lab"
      subtitle="Descrizione breve cosa fa il lab."
      lessonSlug="lezione-XX"
      theory={<MyLabTheory />}
    >
      <div className="lab-shell">
        {/* controlli + visualizzazione */}
      </div>
    </LabShell>
  )
}
```

`LabShell` renderizza:
1. Header (title, subtitle, link "← Torna alla lezione X")
2. `<details className="lab__theory">` — pannello teoria espandibile chiuso di default
3. Children — la parte interattiva

### CSS classi lab (styles/labs.css)

Classi standard riusabili:
- `.lab-shell` — wrapper con flex column e gap
- `.lab-controls` — row di controlli (flex wrap)
- `.lab-control` — singolo controllo (label + input/select/button)
- `.lab-vis` — area visualizzazione principale
- `.lab-stats` — grid statistiche (`.lab-stat` → `.lab-stat__label` + `.lab-stat__value`)
- `.btn.btn--primary` / `.btn.btn--ghost` — bottoni
- `.card` — card generica con bordo e padding

### Wiring lab in LabPage.tsx

```tsx
import { MyLab } from '@/labs/MyLab'

// In LabPage switch:
case 'my-lab':
  return <MyLab />
```

E in `data/modules.ts`:
```ts
{ slug: 'my-lab', title: 'My Lab', blurb: '...', lessonSlug: 'lezione-XX' }
```

---

## Routing (react-router-dom v7)

```
/                          → Home (lista moduli)
/modulo/:moduleId          → ModulePage (lista lezioni del modulo)
/modulo/:moduleId/lezione/:slug → LessonPage (singola lezione)
/modulo/:moduleId/quiz     → QuizPage
/lab                       → LabIndex (griglia card di tutti i lab)
/lab/:slug                 → LabPage (lab specifico)
/progressi                 → ProgressPage
```

Router configurato in `main.tsx` con `createHashRouter` (non BrowserRouter) se GH Pages non supporta history API, oppure BrowserRouter con il 404.html fallback del repo.

**Nota:** il 404.html SPA fallback (rafgraph/spa-github-pages) codifica l'URL nella query string e un snippet in `index.html` la decodifica al load. Il file `404.html` deve essere incluso in `public/` e copiato in `dist/` dal build.

---

## Deploy GitHub Pages

1. `vite.config.ts`: `base: '/<nome-repo>/'`
2. `package.json`: `"deploy": "npm run build && gh-pages -d dist"`
3. `public/404.html`: SPA fallback (vedi file originale — copia invariato, cambia solo il `<title>`)
4. `index.html`: snippet di decode URL (copia dall'originale)
5. GH Pages settings: source = branch `gh-pages`, root `/`

Workflow deploy:
```bash
cd frontend
npm run deploy   # → prebuild + tsc + vite build + gh-pages push
```

---

## Adattamento per nuovo corso

Per replicare questo sito per il corso **Datacenter Design and Operation** (o qualsiasi altro corso), eseguire questi passaggi nell'ordine:

### 1. Setup repo e dipendenze

```bash
git clone <nuova-repo>
cd <nuova-repo>
mkdir -p frontend build/md build/images
cd frontend
npm create vite@latest . -- --template react-ts
npm install react-router-dom framer-motion react-markdown remark-gfm \
  remark-math rehype-katex rehype-raw shiki katex clsx \
  @fontsource-variable/inter gh-pages
npm install -D @types/katex
```

Poi copiare dall'originale:
- `frontend/scripts/build-content.mjs` (adattare le mappe)
- `frontend/public/404.html` (aggiornare `<title>`)
- `frontend/src/styles/` (tutti e 4 i CSS)
- `frontend/src/components/LabShell.tsx`
- `frontend/src/utils/crypto.ts`
- `frontend/src/utils/progress.ts` (adattare BADGE_CATALOG e STORAGE_KEY)
- Pattern dei componenti di routing (Home, ModulePage, LessonPage, QuizPage, LabPage, ProgressPage)

### 2. Definire moduli (data/modules.ts)

Creare `ModuleId` come union type e `MODULES[]` con un entry per topic principale del corso.
Per DDO esempio:
```ts
type ModuleId = 'infrastructure' | 'networking' | 'storage' | 'virtualization' | 'operations'
```

Scegliere un colore hex distinto per ciascun modulo. Aggiungere variabili CSS `--mod-<id>: <hex>` in `global.css`.

### 3. Aggiungere file markdown lezioni

Copiare le note del corso in `build/md/` con la naming convention:
```
Lezione 1 - Titolo.md
Lezione 2 - Altro titolo.md
```

### 4. Configurare build-content.mjs

Aggiornare `MODULE_MAP` (numero lezione → moduleId) e `LAB_FOR_LESSON` (numero lezione → lab slug, inizialmente vuoto).

### 5. Aggiornare vite.config.ts

```ts
base: '/<nome-nuova-repo>/',
```

### 6. Scrivere quick check e quiz

Per ogni lezione: 3 domande in `data/quickChecks.ts`.
Per ogni modulo: 10 domande in `data/quizzes/<moduleId>.ts`.

### 7. Creare lab interattivi (opzionale)

Se il corso ha concetti visualizzabili interattivamente, creare componenti in `src/labs/` usando il pattern LabShell. Aggiungere a `LABS[]` in modules.ts, case in LabPage switch, e entry in `LAB_FOR_LESSON`.

### 8. Build e deploy

```bash
cd frontend
npm run dev        # verifica locale
npm run deploy     # push su gh-pages branch
```

---

## Checklist adattamento completa

- [ ] Nuovo repo GitHub creato, GH Pages abilitato su branch `gh-pages`
- [ ] `vite.config.ts` aggiornato con `base: '/<repo>/'`
- [ ] `public/404.html` `<title>` aggiornato
- [ ] `STORAGE_KEY` in progress.ts aggiornato (es. `'ddo-study:state'`)
- [ ] `ModuleId` definito in manifest.ts (dopo prebuild) e modules.ts
- [ ] `MODULES[]` con tutti i moduli, colori, descrizioni
- [ ] `--mod-<id>` CSS vars per ciascun modulo
- [ ] `MODULE_MAP` in build-content.mjs: numero lezione → moduleId
- [ ] File .md lezioni in build/md/ con naming corretto
- [ ] `npm run prebuild-content` → manifest generato correttamente
- [ ] Quick check (3 domande × lezione) scritti
- [ ] Quiz (10 domande × modulo) scritti
- [ ] `BADGE_CATALOG` aggiornato con badge rilevanti al corso
- [ ] `MODULE_BADGE` map aggiornata (moduleId → badgeId)
- [ ] Lab interattivi (se presenti) cablati
- [ ] Build pulito (no TypeScript errors)
- [ ] Deploy e verifica su GH Pages

---

## Note importanti

- **manifest.ts è auto-generato** — non editarlo mai a mano. Se le lezioni cambiano, rieseguire `npm run prebuild-content`.
- **`@/` alias** punta a `src/` — configurato in vite.config.ts `resolve.alias` e `tsconfig.json` `paths`.
- **Nessuna dipendenza npm aggiuntiva** rispetto a quelle elencate — SubtleCrypto è nativa del browser, tutte le operazioni crittografiche dei lab la usano.
- **Quick check "completes" a lesson** — `lessonsViewed[slug].quickCheckScore` diverso da `undefined` = lezione done per la sidebar.
- **Callout Obsidian** — supportati: `[!definition]`, `[!note]`, `[!warning]`, `[!example]`, `[!tip]`, `[!abstract]`. Il CSS `markdown.css` li stila con colori distinti.
- **Formule matematiche** — nei markdown usa la sintassi KaTeX: `$formula$` inline, `$$formula$$` block.
