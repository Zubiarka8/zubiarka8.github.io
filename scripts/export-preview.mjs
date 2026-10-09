import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { translations, locales } from '../src/i18n/translations.ts';
import { relationshipIds, relationshipItems } from '../src/data/connections.ts';
import { expertise } from '../src/data/expertise.ts';
import { featuredProject, profile } from '../src/data/profile.ts';

// This dependency-free visual preview is not an Astro production build.
const previewRoot = new URL('../preview/', import.meta.url);
const css = (await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'))
  .replace('@import "tailwindcss";', '')
  .replace('@theme {', ':root {');
const explorerSource = await readFile(new URL('../src/components/RelationshipExplorer.astro', import.meta.url), 'utf8');
const enhancement = stripTypeScriptTypes(explorerSource.match(/<script>([\s\S]*?)<\/script>/)[1]);
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const list = (items, className, label) => `<ul class="${className}"${label ? ` aria-label="${escape(label)}"` : ''}>${items.map((item) => `<li>${escape(item)}</li>`).join('')}</ul>`;
const sectionIds = ['languages', 'tools', 'ai'];
await mkdir(previewRoot, { recursive: true });
await writeFile(new URL('styles.css', previewRoot), `${css}\na { color: inherit; }\n.language-switcher { display: flex; gap: 0.25rem; font-size: 0.875rem; }\n.language-link { padding: 0.75rem 1rem; border-radius: 999px; text-decoration: none; color: var(--color-muted); }\n.language-link[aria-current="page"] { background: var(--color-ink); color: var(--color-paper); }\n.language-link:hover { text-decoration: underline; }\nbutton { appearance: none; }\n`);
await writeFile(new URL('explorer.js', previewRoot), `${enhancement}\ndocument.querySelectorAll('[data-language]').forEach((link) => { link.addEventListener('click', () => { link.hash = window.location.hash; }); });\n`);
for (const locale of locales) {
  const text = translations[locale];
  const groups = relationshipIds.map((id) => {
    const group = text.connections.groups[id];
    const symbol = { knowledge: '{ }', workflow: '+ /', assistants: '✳', project: '⌘' }[id];
    return `<button type="button" hidden class="group-node group-${id}" data-group="${id}" aria-pressed="false" aria-controls="relationship-${id}"><span class="node-symbol" aria-hidden="true">${symbol}</span><span class="node-title">${escape(group.title)}</span><span class="node-summary">${escape(group.summary)}</span><span class="node-action"><span data-selected hidden>${escape(text.connections.selected)}</span><span data-select>${escape(text.connections.select)}</span><span aria-hidden="true">↗</span></span></button>`;
  }).join('');
  const panels = relationshipIds.map((id) => `<div id="relationship-${id}" class="relationship-panel" data-panel="${id}"><h3>${escape(text.connections.groups[id].title)}</h3><p>${escape(text.connections.groups[id].description)}</p>${list(relationshipItems[id], 'item-list')}</div>`).join('');
  const connectors = explorerSource.match(/<svg class="connectors"[\s\S]*?<\/svg>/)[0];
  const projectMark = explorerSource.match(/<div class="project-mark"[\s\S]*?<\/div>/)[0];
  const html = `<!doctype html>
<html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escape(text.description)}"><meta name="theme-color" content="#edf3fa"><title>${escape(text.title)}</title><link rel="stylesheet" href="/styles.css"><link rel="icon" href="/favicon.svg"></head>
<body><a href="#main" class="skip-link">${escape(text.skip)}</a><div class="site-shell">
<header class="site-header"><a href="/${locale}/" class="wordmark" aria-label="${escape(profile.publicName)}">az<span aria-hidden="true">⋆</span></a><nav class="main-navigation" aria-label="${escape(text.connections.navigation)}"><a href="#projects">${escape(text.sections.projects.title)}</a><a href="#experience">${escape(text.sections.experience.title)}</a><a href="#languages">${escape(text.sections.languages.title)}</a></nav><nav class="language-switcher" aria-label="${escape(text.language)}">${locales.map((language) => `<a data-language class="language-link" href="/${language}/" hreflang="${language}" lang="${language}"${locale === language ? ' aria-current="page"' : ''}>${language === 'es' ? 'Español' : 'English'}</a>`).join('')}</nav></header>
<main id="main"><section class="introduction" aria-labelledby="introduction-title"><div class="name-block"><h1 id="introduction-title"><span>Arkaitz</span><span>Zubizarreta<span class="name-dot" aria-hidden="true">.</span></span></h1><p class="personal-statement">${escape(text.connections.statement)}</p></div><div class="introduction-copy"><p>${escape(text.introduction)}</p><div class="intro-links"><a href="#projects" class="primary-link">${escape(text.projectsLink)}<span aria-hidden="true">↓</span></a><a href="${escape(profile.githubUrl)}" class="quiet-link">${escape(text.githubLink)}<span aria-hidden="true">↗</span></a></div></div></section>
<section id="projects" class="relationship-section" aria-labelledby="projects-title"><div class="map-heading"><h2 id="projects-title">${escape(text.connections.title)}</h2><p>${escape(text.connections.instructions)}</p></div><div class="relationship-map" data-explorer>${connectors}<article class="project-sheet" aria-labelledby="featured-project-title">${projectMark}<p class="project-label">${escape(text.featuredProject.label)}</p><h3 id="featured-project-title">mini-<wbr>consumes-<wbr>tokens</h3><p class="project-description">${escape(text.featuredProject.description)}</p>${list(featuredProject.technologies, 'project-stack', text.connections.actualStack)}<a class="project-link" href="${escape(featuredProject.repositoryUrl)}">${escape(text.featuredProject.sourceLink)}<span aria-hidden="true">↗</span></a></article>${groups}<div class="relationship-details" aria-live="polite" aria-atomic="true">${panels}</div></div><p class="concept-note"><span aria-hidden="true">⊙</span>${escape(text.connections.disclaimer)}</p></section>
<div class="background-sections"><section id="about" aria-labelledby="about-title"><h2 id="about-title">${escape(text.sections.about.title)}</h2><p>${escape(text.sections.about.description)}</p></section><section id="experience" class="experience-section" aria-labelledby="experience-title"><h2 id="experience-title">${escape(text.sections.experience.title)}</h2><h3>${escape(text.connections.internship)}</h3><p>${escape(text.sections.experience.description)}</p></section></div>
<div class="skill-sections">${sectionIds.map((id) => `<section id="${id}" class="skill-section" aria-labelledby="${id}-title"><div><h2 id="${id}-title">${escape(text.sections[id].title)}</h2><p>${escape(text.sections[id].description)}</p></div>${list(expertise[id], 'item-list')}</section>`).join('')}</div></main>
<footer class="site-footer"><p>${escape(profile.publicName)}</p><p>${escape(text.footer)}</p><a href="https://github.com/Zubiarka8/zubiarka8.github.io">GitHub <span aria-hidden="true">↗</span></a></footer></div><script src="/explorer.js" defer></script></body></html>`;
  await mkdir(new URL(`${locale}/`, previewRoot), { recursive: true });
  const standalone = html
    .replace('<link rel="stylesheet" href="/styles.css">', `<style>${css}
a { color: inherit; }
.language-switcher { display: flex; gap: 0.25rem; font-size: 0.875rem; }
.language-link { padding: 0.75rem 1rem; border-radius: 999px; text-decoration: none; color: var(--color-muted); }
.language-link[aria-current="page"] { background: var(--color-ink); color: var(--color-paper); }
.language-link:hover { text-decoration: underline; }
button { appearance: none; }
</style>`)
    .replace('href="/favicon.svg"', 'href="../favicon.svg"')
    .replaceAll('href="/es/"', 'href="../es/index.html"')
    .replaceAll('href="/en/"', 'href="../en/index.html"')
    .replace('<script src="/explorer.js" defer></script>', `<script>${enhancement}
document.querySelectorAll('[data-language]').forEach((link) => { link.addEventListener('click', () => { link.hash = window.location.hash; }); });
</script>`);
  await writeFile(new URL(`${locale}/index.html`, previewRoot), standalone);
}
await writeFile(new URL('index.html', previewRoot), '<!doctype html><html lang="es"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=es/index.html"><title>Connections</title><a href="es/index.html">Español</a></html>');
await writeFile(new URL('favicon.svg', previewRoot), await readFile(new URL('../public/favicon.svg', import.meta.url)));
console.log(`Exported Spanish and English previews to ${previewRoot.pathname}`);
