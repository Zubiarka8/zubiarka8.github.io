# Personal Portfolio: Initial Requirements

## Confirmed Goal

Create a personal web portfolio for Arkaitz Zubizarreta, primarily to find work and showcase projects. GitHub account: `zubiarka8`. Publish on GitHub Pages with Spanish (`es`) and English (`en`) content. The selected stack is Astro with React, TypeScript, and Tailwind CSS. A local starter is present; local Git initialization and dependency installation remain blocked by the environment.

## Language Policy

Write project code, identifiers, comments, documentation, test descriptions, commit messages, and pull request descriptions in English. Communicate with the user in Spanish (Castilian). Public website content must be localized into Spanish and English.

## Visual Identity

The portfolio must have a distinctive personal identity, with intentional typography, composition, and a memorable visual element or interaction. The owner prefers a technology theme. The current starter is provisional. Follow `design-brief.md` and review `visual-references.md` before implementing the final visual direction.

## Confirmed Content

- Programming languages the author knows.
- Development tools the author uses.
- AI tools and how the author uses them at work.
- One featured project: `mini-consumes-tokens`.
- Experience: a three-month internship focused on creating a website.
- Public name: Arkaitz Zubizarreta. Interests: technology and innovation.

Use a professional, approachable voice. The biography connects the owner's interest in technology and AI with the confirmed MCP project. Company, internship dates, education, qualifications, and additional projects have not been supplied.

Confirmed technologies: HTML, CSS, Bootstrap, JavaScript, Python, Flask, Django, PHP, SQL, NoSQL, Java, C#, .NET MAUI, and Markdown.

Confirmed tools: Visual Studio Code, Cursor, SQLite, MySQL, IntelliJ IDEA, Eclipse, DBeaver, Docker, GitHub, Apache, Git, and Trello. Trello and GitHub are presented as tools rather than programming languages.

Confirmed AI tools: Cursor, GitHub Copilot, Codex, ChatGPT, and Claude. Product names are shared between locales in `src/data/expertise.ts`; section descriptions are localized.

Confirmed organization: introduction, about me, experience, languages, tools, AI, and projects. Prepare contact but keep it disabled. Do not invent skills, proficiency levels, outcomes, or career history.

## Featured Project Evidence

The sibling checkout is `../mini-consume-tokens/mini-consumes-tokens/`. Its `README.md`, `Cargo.toml`, and Git remote identify [mini-consumes-tokens](https://github.com/Zubiarka8/mini-consumes-tokens), a Rust MCP server and CLI for local code indexing. SQLite and Tree-sitter support symbol lookup, references, relationships, and focused context for AI tools.

Describe its purpose as reducing repeated file reading and the context needed by AI assistants. Do not publish a universal token-saving percentage. The repository's benchmark uses small fixtures and character-based token estimates, which need qualification. Publish one project card; add projects only when the owner supplies them.

## Hidden Contact Section

`src/data/profile.ts` holds `contact.enabled: false` and `contact.url: null`. Localized copy and conditional rendering are prepared. Disabled contact must produce no section or contact link in generated HTML. Existing GitHub source/profile links remain available.

To enable it later, obtain an approved public destination (for example, a profile URL or `mailto:` URL), set `contact.url`, and set `contact.enabled` to `true`. Review both languages and update the hidden-contact test. Do not invent an email address, LinkedIn URL, CV, or contact form backend.

## Internationalization

- Keep content and translations separate from components.
- Use stable translation keys and verify that both languages contain them.
- Translate navigation, buttons, descriptions, accessible text, and metadata.
- Label the language selector “Español” and “English”.
- Set the document language correctly and preserve the equivalent section when switching languages.
- Generate static `/es/` and `/en/` pages; the root page redirects to Spanish.
- Verify both versions on mobile and desktop, including longer translated text.

## Publication and Quality

The implementation must produce static files suitable for GitHub Pages. The selected repository is `Zubiarka8/zubiarka8.github.io`, with the intended public URL `https://zubiarka8.github.io/` and site base path `/`. The local GitHub Actions workflow checks, builds, tests, and deploys the site. Install dependencies and commit the generated lockfile before using it.

Prepare build, link, translation, and accessibility checks. Prioritize keyboard navigation, visible focus, contrast, reduced motion, and lightweight assets. Add metadata for each language and, once URLs are defined, canonical links, language alternatives, and a sitemap.

## Pending Decisions

Select a visual direction from the references. Optional future content includes internship details, education, a CV, and approved public contact information. The name, initial biography, expertise, featured project, stack, and repository name are confirmed. Dependency installation, build verification, synchronization, and publication remain pending.
