import type { SectionId } from '../i18n/translations';

export const expertise: Partial<Record<SectionId, readonly string[]>> = {
  languages: [
    'HTML', 'CSS', 'Bootstrap', 'JavaScript', 'Python', 'Flask', 'Django',
    'PHP', 'SQL', 'NoSQL', 'Java', 'C#', '.NET MAUI', 'Markdown',
  ],
  tools: [
    'Visual Studio Code', 'Cursor', 'SQLite', 'MySQL', 'IntelliJ IDEA',
    'Eclipse', 'DBeaver', 'Docker', 'GitHub', 'Apache', 'Git', 'Trello',
  ],
  ai: ['Cursor', 'GitHub Copilot', 'Codex', 'ChatGPT', 'Claude'],
};
