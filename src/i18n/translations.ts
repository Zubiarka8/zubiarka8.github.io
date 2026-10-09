import type { RelationshipId } from '../data/connections';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const sectionIds = ['about', 'experience', 'languages', 'tools', 'ai', 'projects', 'contact'] as const;
export type SectionId = (typeof sectionIds)[number];

type Translation = {
  title: string;
  description: string;
  skip: string;
  language: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  projectsLink: string;
  githubLink: string;
  contactLink: string;
  featuredProject: {
    label: string;
    description: string;
    sourceLink: string;
  };
  sections: Record<SectionId, {
    title: string;
    description: string;
  }>;
  connections: {
    navigation: string;
    statement: string;
    title: string;
    instructions: string;
    disclaimer: string;
    selected: string;
    select: string;
    actualStack: string;
    internship: string;
    groups: Record<RelationshipId, { title: string; summary: string; description: string }>;
  };
  footer: string;
};

export const translations = {
  es: {
    title: 'Arkaitz Zubizarreta | Portfolio',
    description: 'Portfolio de Arkaitz Zubizarreta: desarrollo web, herramientas de IA y el proyecto MCP mini-consumes-tokens.',
    skip: 'Saltar al contenido',
    language: 'Seleccionar idioma',
    eyebrow: 'Desarrollo web · Tecnología · IA',
    heading: 'Arkaitz Zubizarreta',
    introduction: 'Me apasionan la tecnología y la innovación. Busco oportunidades de trabajo donde seguir aprendiendo y aportar con mis proyectos.',
    projectsLink: 'Ver proyectos',
    githubLink: 'Mi GitHub',
    contactLink: 'Contactar',
    featuredProject: {
      label: 'Proyecto destacado',
      description: 'Un servidor MCP que ayuda a las herramientas de IA a consultar código con menos contexto. Indexa el repositorio localmente y permite localizar símbolos, referencias y relaciones entre funciones sin releer archivos completos.',
      sourceLink: 'Ver código y documentación',
    },
    sections: {
      about: { title: 'Sobre mí', description: 'Soy Arkaitz. Me interesa crear aplicaciones y explorar cómo la inteligencia artificial puede ayudar en el desarrollo. En mini-consumes-tokens trabajo en una herramienta para reducir el contexto que necesitan los asistentes de IA al consultar código.' },
      experience: { title: 'Experiencia', description: 'Tres meses de prácticas dedicados a crear una web. Una experiencia con un proyecto concreto que forma parte de mi trayectoria en desarrollo.' },
      languages: { title: 'Lenguajes y tecnologías', description: 'Lenguajes, frameworks y tecnologías que conozco.' },
      tools: { title: 'Herramientas', description: 'Las herramientas que utilizo para desarrollar, gestionar datos y organizar mi trabajo.' },
      ai: { title: 'Herramientas de IA', description: 'Las herramientas de inteligencia artificial que utilizo.' },
      projects: { title: 'Proyectos', description: 'Mi proyecto destacado, con su código y documentación.' },
      contact: { title: 'Contacto', description: 'Puedes contactar conmigo a través de este enlace.' },
    },
    connections: {
      navigation: 'Navegación principal',
      statement: 'Conectar ideas. Crear herramientas útiles.',
      title: 'El código también tiene conexiones.',
      instructions: 'Selecciona un grupo para explorar sus herramientas y su papel en este mapa.',
      disclaimer: 'Mapa conceptual de mi perfil. Las conexiones no indican que todas estas herramientas se utilicen en el proyecto.',
      selected: 'Seleccionado',
      select: 'Explorar grupo',
      actualStack: 'Tecnologías del proyecto',
      internship: 'Prácticas de desarrollo web · 3 meses',
      groups: {
        knowledge: { title: 'Conocimientos', summary: 'Lenguajes y tecnologías', description: 'Los lenguajes y frameworks que conozco forman mi base para crear aplicaciones. Esta conexión representa mi perfil, no las dependencias del MCP.' },
        workflow: { title: 'Desarrollo', summary: 'Herramientas de trabajo', description: 'Editores, bases de datos y herramientas que utilizo para desarrollar y organizar mi trabajo. Su relación con el proyecto es conceptual.' },
        assistants: { title: 'Inteligencia artificial', summary: 'Herramientas que utilizo', description: 'Utilizo estas herramientas de IA. Mi proyecto MCP aborda un problema de este ámbito: localizar código relevante y reducir la lectura repetida de archivos. El mapa no afirma integraciones con cada herramienta.' },
        project: { title: 'Dentro del MCP', summary: 'Su stack real', description: 'mini-consumes-tokens es un servidor y CLI escrito en Rust. Utiliza SQLite y Tree-sitter para indexar código localmente y ofrece consultas a través de MCP.' },
      },
    },
    footer: 'Tecnología, aprendizaje y proyectos propios.',
  },
  en: {
    title: 'Arkaitz Zubizarreta | Portfolio',
    description: 'Arkaitz Zubizarreta’s portfolio: web development, AI tools, and the mini-consumes-tokens MCP project.',
    skip: 'Skip to content',
    language: 'Select language',
    eyebrow: 'Web development · Technology · AI',
    heading: 'Arkaitz Zubizarreta',
    introduction: 'I am passionate about technology and innovation. I am looking for work opportunities where I can keep learning and contribute through my projects.',
    projectsLink: 'View projects',
    githubLink: 'My GitHub',
    contactLink: 'Get in touch',
    featuredProject: {
      label: 'Featured project',
      description: 'An MCP server that helps AI tools query code with less context. It indexes the repository locally to find symbols, references, and relationships between functions without repeatedly reading entire files.',
      sourceLink: 'View code and documentation',
    },
    sections: {
      about: { title: 'About me', description: 'I am Arkaitz. I am interested in building applications and exploring how artificial intelligence can help with development. In mini-consumes-tokens, I am working on a tool to reduce the context AI assistants need when querying code.' },
      experience: { title: 'Experience', description: 'A three-month internship focused on building a website. This experience with a concrete project is part of my development background.' },
      languages: { title: 'Languages and technologies', description: 'Languages, frameworks, and technologies I know.' },
      tools: { title: 'Tools', description: 'The tools I use to develop, manage data, and organize my work.' },
      ai: { title: 'AI tools', description: 'The artificial intelligence tools I use.' },
      projects: { title: 'Projects', description: 'My featured project, with its source code and documentation.' },
      contact: { title: 'Contact', description: 'You can reach me through this link.' },
    },
    connections: {
      navigation: 'Main navigation',
      statement: 'Connect ideas. Build useful tools.',
      title: 'Code has connections, too.',
      instructions: 'Select a group to explore its tools and its role in this map.',
      disclaimer: 'A conceptual map of my profile. Connections do not mean that every tool is used in the project.',
      selected: 'Selected',
      select: 'Explore group',
      actualStack: 'Project technologies',
      internship: 'Web development internship · 3 months',
      groups: {
        knowledge: { title: 'Knowledge', summary: 'Languages and technologies', description: 'The languages and frameworks I know form my foundation for building applications. This connection represents my profile, not the MCP dependencies.' },
        workflow: { title: 'Development', summary: 'Tools for my work', description: 'Editors, databases, and tools I use to develop and organize my work. Their relationship to the project is conceptual.' },
        assistants: { title: 'Artificial intelligence', summary: 'Tools I use', description: 'I use these AI tools. My MCP project addresses a problem in this field: finding relevant code and reducing repeated file reading. This map does not claim integrations with every tool.' },
        project: { title: 'Inside the MCP', summary: 'Its actual stack', description: 'mini-consumes-tokens is a server and CLI written in Rust. It uses SQLite and Tree-sitter to index code locally and provides queries through MCP.' },
      },
    },
    footer: 'Technology, learning, and personal projects.',
  },
} satisfies Record<Locale, Translation>;
