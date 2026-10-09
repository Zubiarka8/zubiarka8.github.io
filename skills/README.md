# Local Portfolio Skills

These copies come from skills already installed globally. Supporting files were copied and their contents verified; the global originals remain unchanged.

Six additional skills were retrieved from reviewed upstream repositories on 2026-10-09, pinned to commits, and copied with their licenses and supporting files. See [the research notes](../docs/design-brief.md) and [provenance manifest](../docs/remote-skills-installation.json).

| Skill | Purpose in this project |
| --- | --- |
| [ui-ux-pro-max](ui-ux-pro-max/SKILL.md) | Visual direction, typography, color, composition, and interaction patterns. |
| [frontend-ui-engineering](frontend-ui-engineering/SKILL.md) | Components, responsive layouts, semantic HTML, and accessibility. |
| [performance-optimization](performance-optimization/SKILL.md) | Measure and improve loading, images, fonts, and JavaScript when performance issues arise. |
| [code-review-and-quality](code-review-and-quality/SKILL.md) | Review correctness, clarity, and quality before integrating changes. |
| [git-workflow-and-versioning](git-workflow-and-versioning/SKILL.md) | Clear commits, branches, and small, reviewable changes. |
| [ci-cd-and-automation](ci-cd-and-automation/SKILL.md) | Checks and deployment automation through GitHub Actions. |
| [frontend-design](frontend-design/SKILL.md) | A distinctive personal visual concept, typography, composition, and design self-critique. |
| [gsap-core](gsap-core/SKILL.md) | Optional coordinated animation and reduced-motion behavior. |
| [gsap-performance](gsap-performance/SKILL.md) | Performance and cleanup for GSAP animations when used. |
| [prototype](prototype/SKILL.md) | Compare different visual proposals in an isolated prototype when explicitly requested. |
| [copywriting](copywriting/SKILL.md) | Write clear, personal presentation and project copy in both locales. |
| [emil-design-eng](emil-design-eng/SKILL.md) | Refine component behavior, interaction details, and motion. |

## Usage and Scope

The environment prevents writing to `.agents/` and `.codex/`. These copies therefore reside in `skills/`: **Codex does not automatically discover them as installed skills**. Request a skill by its path, such as `skills/frontend-ui-engineering/SKILL.md`.

When writing to `.agents/skills/` becomes possible, copy the twelve skill folders there with their supporting resources and licenses and open a new session to check discovery. `AGENTS.md` also directs agents to read relevant local copies by path.

## Design Skill Priorities

`frontend-design` remains the primary visual guide. Use `prototype` to explore alternatives only when explicitly requested, `copywriting` for presentation and project text, and `emil-design-eng` to refine interactions within the chosen design. Read only the skills relevant to the current task. The owner's decisions and repository rules take precedence over conflicting skill guidance, including suggestions to use Chrome.

The new copies include `prototype/PICKER.md`, the three copywriting reference guides, copywriting evaluation examples, and each upstream license. No runtime dependencies were installed and no skill scripts were executed.

The examples in `ui-ux-pro-max` point to a global path; use the equivalent local script:

```sh
python3 skills/ui-ux-pro-max/scripts/search.py "developer portfolio minimal" --design-system -p "Portfolio"
```

Some skills reference `../../references/*-checklist.md`. Those files are missing from the inspected global installation and were not invented. The main instructions are available; those additional references remain unavailable.

Apply only guidance relevant to a static portfolio. Examples involving React, databases, Vercel, or authentication do not determine the stack or hosting provider. Do not run Chrome tools or automation through Chrome without explicit authorization for the current task. Skills do not authorize publication or changes to external accounts.

Follow the project language policy: write code, identifiers, comments, documentation, test descriptions, commits, and pull request descriptions in English; communicate with the user in Spanish (Castilian). Localize public website content into Spanish and English.

No global skill dedicated to i18n was found. Project requirements are recorded in [portfolio-brief.md](../docs/portfolio-brief.md). Copy provenance and hashes are recorded in [skills-installation.json](../docs/skills-installation.json).
