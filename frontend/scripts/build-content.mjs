// Prebuild content pipeline: build/md/*.md -> src/content/lessons + manifest.ts
// Copies build/images -> public/images.

import { readdir, readFile, writeFile, mkdir, rm, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', '..') // repo root
const FRONTEND = resolve(__dirname, '..')
const MD_SRC = join(ROOT, 'build', 'md')
const IMG_SRC = join(ROOT, 'build', 'images')
const LESSONS_OUT = join(FRONTEND, 'src', 'content', 'lessons')
const MANIFEST_OUT = join(FRONTEND, 'src', 'content', 'manifest.ts')
const IMG_OUT = join(FRONTEND, 'public', 'images')

const MODULE_MAP = {
  1: 'foundations',
  2: 'foundations',
  3: 'power-cooling',
  4: 'power-cooling',
  5: 'network',
  6: 'network',
  7: 'network',
  8: 'network',
  9: 'network',
  10: 'storage',
  11: 'storage',
  12: 'storage',
  13: 'compute',
  14: 'compute',
  15: 'virt-cloud',
  16: 'virt-cloud',
  17: 'virt-cloud',
  18: 'virt-cloud',
}

const LAB_FOR_LESSON = {
  3: 'pue-calculator',
  6: 'fat-tree-vis',
  16: 'vm-live-migration',
}

const CALLOUT_TYPES = new Set([
  'definition',
  'note',
  'warning',
  'example',
  'tip',
  'abstract',
  'info',
  'important',
  'caution',
  'danger',
  'success',
  'question',
  'quote',
  'summary',
  'todo',
  'failure',
  'bug',
])

const STRIP_HEADERS = /^#{1,6}\s+(Risorse|Link[\s—-]+|Bibliografia|Riferimenti|Approfondimenti)\b/i

function stripFrontmatter(md) {
  if (md.startsWith('---\n')) {
    const end = md.indexOf('\n---', 4)
    if (end !== -1) return md.slice(end + 4).replace(/^\s*\n/, '')
  }
  return md
}

function convertCallouts(md) {
  // Obsidian callout: `> [!type] Title?` then `> body lines`
  const lines = md.split('\n')
  const out = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const m = line.match(/^>\s*\[!(\w+)\]([+-])?\s*(.*)$/)
    if (m) {
      const rawType = m[1].toLowerCase()
      const type = CALLOUT_TYPES.has(rawType) ? rawType : 'note'
      const title = m[3].trim()
      const body = []
      i++
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        body.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      out.push(`<div class="callout callout-${type}">`)
      if (title) out.push(`<div class="callout__title">${escapeHtml(title)}</div>`)
      out.push('')
      out.push(body.join('\n'))
      out.push('')
      out.push('</div>')
      continue
    }
    out.push(line)
    i++
  }
  return out.join('\n')
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function convertMermaid(md) {
  return md.replace(/```mermaid\n([\s\S]*?)```/g, (_match, _body) => {
    return `<div class="mermaid-placeholder">Diagramma mermaid (renderizzato nella versione originale degli appunti)</div>`
  })
}

function stripAdminSections(md) {
  // Drop sections whose heading matches STRIP_HEADERS, up to next heading of same or higher level
  const lines = md.split('\n')
  const out = []
  let skipLevel = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const h = line.match(/^(#{1,6})\s+/)
    if (skipLevel > 0) {
      if (h && h[1].length <= skipLevel) {
        skipLevel = 0
        // re-process current line below
      } else {
        continue
      }
    }
    if (h && STRIP_HEADERS.test(line)) {
      skipLevel = h[1].length
      continue
    }
    out.push(line)
  }
  return out.join('\n')
}

function resolveWikilinks(md) {
  // ![[Image-hash.png]] -> ![](images/Image-hash.png)
  return md.replace(/!\[\[([^\]]+?)\]\]/g, (_m, target) => {
    const file = target.split('|')[0].trim()
    return `![](images/${file})`
  })
}

function extractTitle(rawMd, fallback) {
  const m = rawMd.match(/^#\s+(.+?)\s*$/m)
  if (!m) return fallback
  // Remove "Lezione N — " prefix if present
  return m[1].replace(/^Lezione\s+\d+\s*[—-]\s*/i, '').trim()
}

function slugForLesson(num) {
  return `lezione-${String(num).padStart(2, '0')}`
}

async function main() {
  if (!existsSync(MD_SRC)) {
    console.error('Missing build/md/. Aborting.')
    process.exit(1)
  }

  await mkdir(LESSONS_OUT, { recursive: true })
  await mkdir(IMG_OUT, { recursive: true })

  // Clean stale lesson files
  for (const f of await readdir(LESSONS_OUT)) {
    if (f.endsWith('.md')) await rm(join(LESSONS_OUT, f))
  }

  const files = (await readdir(MD_SRC)).filter((f) => f.endsWith('.md'))
  const lessons = []

  for (const file of files) {
    const m = file.match(/^Lezione\s+(\d+)\s*-\s*(.+)\.md$/i)
    if (!m) {
      console.warn(`Skip (no match): ${file}`)
      continue
    }
    const num = Number(m[1])
    const fallbackTitle = m[2].trim()
    const moduleId = MODULE_MAP[num]
    if (!moduleId) {
      console.warn(`Skip (no module mapping): ${file}`)
      continue
    }

    let md = await readFile(join(MD_SRC, file), 'utf8')
    md = stripFrontmatter(md)
    md = resolveWikilinks(md)
    md = convertMermaid(md)
    md = stripAdminSections(md)
    md = convertCallouts(md)

    const title = extractTitle(md, fallbackTitle)
    const slug = slugForLesson(num)
    await writeFile(join(LESSONS_OUT, `${slug}.md`), md, 'utf8')

    lessons.push({
      num,
      slug,
      title,
      moduleId,
      labSlug: LAB_FOR_LESSON[num] ?? null,
    })
  }

  lessons.sort((a, b) => a.num - b.num)

  // Copy images
  if (existsSync(IMG_SRC)) {
    const imgs = await readdir(IMG_SRC)
    for (const img of imgs) {
      await copyFile(join(IMG_SRC, img), join(IMG_OUT, img))
    }
    console.log(`Copied ${imgs.length} images.`)
  }

  // Emit manifest.ts
  const manifest = renderManifest(lessons)
  await writeFile(MANIFEST_OUT, manifest, 'utf8')
  console.log(`Wrote manifest with ${lessons.length} lessons.`)
}

function renderManifest(lessons) {
  const moduleIds = ['foundations', 'power-cooling', 'network', 'storage', 'compute', 'virt-cloud']
  const labSlugs = ['pue-calculator', 'fat-tree-vis', 'vm-live-migration']
  const ts = `// AUTO-GENERATED by scripts/build-content.mjs — do not edit by hand.

export type ModuleId =
${moduleIds.map((id) => `  | '${id}'`).join('\n')}

export type LabSlug =
${labSlugs.map((s) => `  | '${s}'`).join('\n')}

export type LessonMeta = {
  num: number | 'P'
  slug: string
  title: string
  moduleId: ModuleId
  labSlug: LabSlug | null
}

export const LESSONS: readonly LessonMeta[] = [
${lessons
  .map(
    (l) =>
      `  { num: ${l.num}, slug: '${l.slug}', title: ${JSON.stringify(l.title)}, moduleId: '${l.moduleId}', labSlug: ${l.labSlug ? `'${l.labSlug}'` : 'null'} },`,
  )
  .join('\n')}
]

export const LESSONS_BY_SLUG: Record<string, LessonMeta> = Object.fromEntries(
  LESSONS.map((l) => [l.slug, l]),
)

export function lessonsForModule(id: ModuleId): LessonMeta[] {
  return LESSONS.filter((l) => l.moduleId === id)
}

export function neighbourLessons(slug: string): { prev: LessonMeta | null; next: LessonMeta | null } {
  const idx = LESSONS.findIndex((l) => l.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? LESSONS[idx - 1] : null,
    next: idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null,
  }
}
`
  return ts
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
