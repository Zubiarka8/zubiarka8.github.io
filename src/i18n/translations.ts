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
  frequency: {
    navigation: string;
    current: string;
    role: string;
    signature: string;
    projectHeading: string;
    purposeTitle: string;
    purpose: string;
    processLabel: string;
    steps: { index: string; find: string; context: string };
    internship: string;
    duration: string;
    stack: string;
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
    frequency: {
      navigation: 'Explorar el portfolio',
      current: 'Estás en',
      role: 'Desarrollo web e interés por la IA',
      signature: 'Una firma geométrica a partir de mis iniciales.',
      projectHeading: 'Código que ayuda a consultar código.',
      purposeTitle: 'Contexto centrado en lo que necesitas',
      purpose: 'Cuando un asistente consulta un repositorio, puede acabar leyendo archivos completos una y otra vez. Este proyecto crea un índice local para localizar las partes relevantes del código.',
      processLabel: 'Cómo se consulta el código',
      steps: { index: 'Indexar el repositorio local', find: 'Localizar símbolos y relaciones', context: 'Consultar contexto específico' },
      internship: 'Creación de una web',
      duration: 'Tres meses de prácticas',
      stack: 'Tecnologías del proyecto',
    },
    footer: 'Tecnología, curiosidad y proyectos propios.',
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
    frequency: {
      navigation: 'Explore the portfolio',
      current: 'You are in',
      role: 'Web development and an interest in AI',
      signature: 'A geometric signature made from my initials.',
      projectHeading: 'Code that helps you query code.',
      purposeTitle: 'Context focused on what you need',
      purpose: 'When an assistant queries a repository, it can end up reading entire files repeatedly. This project builds a local index to find the relevant parts of the code.',
      processLabel: 'How code is queried',
      steps: { index: 'Index the local repository', find: 'Find symbols and relationships', context: 'Query specific context' },
      internship: 'Building a website',
      duration: 'Three-month internship',
      stack: 'Project technologies',
    },
    footer: 'Technology, curiosity, and personal projects.',
  },
} satisfies Record<Locale, Translation>;
