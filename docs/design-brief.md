# Portfolio Design Brief

## Required Identity

The owner explicitly wants a special, distinctive portfolio with a clear personal character. Treat the current starter as scaffolding, not the final design. A skill can guide decisions; it cannot guarantee worldwide uniqueness.

Before implementing the final design, define a concept based on the owner's confirmed interests, working style, and real projects. Record the intended audience, palette, typography, composition, and one memorable visual element or interaction. The specific aesthetic remains pending the owner's preference; no direction has been approved yet.

The confirmed audience is recruiters and people reviewing projects. Public name: Arkaitz Zubizarreta. Interests: technology and innovation. The featured project is `mini-consumes-tokens`, a local code-indexing MCP server for AI tools. Use these facts as the basis for the personality. Ten references and a proposed context-comparison interaction are recorded in `visual-references.md` for owner review. Contact is prepared but hidden; see `portfolio-brief.md`.

## Preferred References and Animation Proposal

The owner prefers Tamal Sen and Henry Heffernan; the other eight references did not resonate. Use Tamal as a reference for professional content and Henry for an exploratory computer/desktop interaction. The specific layout, palette, and extent of 3D remain undecided.

Recommended starting point: Tailwind/CSS for small state transitions and GSAP for coordinated sequences and scroll-triggered effects. Use `@gsap/react` only where animations live inside React components. Motion is an alternative for React-centered window/layout interactions; avoid adding two animation engines for the same role. Astro view transitions are optional for page or locale navigation. Three.js is optional only if a real 3D scene becomes part of the approved concept; a desktop-style interface can be implemented in HTML/CSS.

Keep essential content accessible independently of effects. Preserve native scrolling, keyboard navigation, reduced motion, and a straightforward mobile layout. Coordinate animation ownership so two engines do not control the same properties. These are proposals; no animation runtime dependencies have been added.

## Acceptance Criteria

- Explain the relationship between the visual concept and the owner's personality.
- Use an intentional hierarchy and layouts suited to each section's content.
- Give the introduction a recognizable element beyond a generic headline and button.
- Keep project evidence and readable content central to the experience.
- Use motion to communicate or respond to an action; preserve reduced-motion alternatives and native scrolling.
- Retain keyboard access, visible focus, contrast, responsive layouts, and equal functionality in Spanish and English.
- Do not invent experience, skill levels, achievements, or project details.

## Skill Research and Selection

Research date: 2026-10-09. Discovery used skills.sh; source content, licenses, repository activity, and ownership were checked directly on GitHub. Copies are pinned to upstream commits in `remote-skills-installation.json`.

| Local addition | Source | Purpose |
| --- | --- | --- |
| `frontend-design` | [Anthropic](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Personal visual direction, deliberate typography, composition, and self-critique. |
| `gsap-core` | [GreenSock](https://github.com/greensock/gsap-skills/tree/main/skills/gsap-core) | Optional coordinated animation, responsive behavior, and reduced motion. |
| `gsap-performance` | [GreenSock](https://github.com/greensock/gsap-skills/tree/main/skills/gsap-performance) | Optional animation performance and cleanup. |
| `prototype` | [Emil Kowalski](https://github.com/emilkowalski/skills/tree/main/skills/prototype) | Compare different design variants when explicitly requested. |
| `emil-design-eng` | [Emil Kowalski](https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng) | Refine interaction details within the chosen identity. |
| `copywriting` | [Corey Haines](https://github.com/coreyhaines31/marketingskills/tree/main/skills/copywriting) | Write clear, factual presentation and project copy. |

The owner selected the three recommendations: `prototype`, `copywriting`, and `emil-design-eng`. Keep `frontend-design` as the primary visual guide and consult these additions for their specific roles. The style-specific alternatives were not installed.

Existing local skills already cover UI implementation, design references, general performance, review, Git, and deployment. The new copies include their licenses and do not install the GSAP runtime dependency or change the website.

Community Astro and i18n skills were also considered. Some had limited adoption; others were tied to unrelated repository layouts or prescribed unnecessary client-side libraries. For this static bilingual site, use [official Astro i18n documentation](https://docs.astro.build/en/guides/internationalization/) and the existing translation checks instead.
