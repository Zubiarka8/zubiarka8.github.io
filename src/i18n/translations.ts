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
  journey: {
    navigation: string;
    role: string;
    statement: string;
    projectHeading: string;
    projectSubtitle: string;
    stagesLabel: string;
    stages: Record<'problem' | 'approach' | 'result', { title: string; description: string; short: string }>;
    internship: string;
    demo: {
      label: string; title: string; query: string; controls: string;
      full: string; focused: string; fullDescription: string; focusedDescription: string; disclaimer: string;
    };
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
    journey: {
      navigation: 'Navegación principal',
      role: 'Desarrollo web e inteligencia artificial',
      statement: 'De una idea a una herramienta útil.',
      projectHeading: 'El código ya está ahí. El contexto hay que encontrarlo.',
      projectSubtitle: 'Así aborda mini-consumes-tokens la consulta de código desde herramientas de IA.',
      stagesLabel: 'Cómo funciona la consulta de código',
      stages: {
        problem: { short: 'Leer', title: 'Volver a leer el mismo código', description: 'Para encontrar una función o saber dónde se usa, un asistente de IA puede acabar leyendo archivos completos una y otra vez. Esa lectura ocupa parte de su contexto disponible.' },
        approach: { short: 'Indexar', title: 'Crear un índice local', description: 'mini-consumes-tokens analiza el código con Tree-sitter y guarda símbolos y relaciones en SQLite. El servidor MCP y la CLI permiten consultar ese índice en el propio equipo.' },
        result: { short: 'Consultar', title: 'Acceder al contexto relevante', description: 'Las consultas localizan definiciones, referencias y llamadas. Los paquetes de contexto reúnen información sobre un símbolo para que el asistente pueda centrarse en el código que necesita.' },
      },
      internship: 'Tres meses creando una web',
      demo: {
        label: 'Ejemplo ilustrativo', title: 'Una consulta, una selección',
        query: 'Consulta de ejemplo: localizar calculateTotal y su dependencia taxRate.',
        controls: 'Elegir la vista del ejemplo de código', full: 'Archivo completo', focused: 'Contexto relevante',
        fullDescription: 'Las líneas resaltadas son la función calculateTotal y la constante taxRate que utiliza. El resto del archivo sigue visible.',
        focusedDescription: 'La selección muestra la función y su dependencia, con los números de línea del archivo original.',
        disclaimer: 'Código sintético. La selección está preparada para explicar la idea; esta demostración no ejecuta consultas MCP ni mide el ahorro de tokens.',
      },
    },
    footer: 'Portfolio en construcción.',
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
    journey: {
      navigation: 'Main navigation',
      role: 'Web development and artificial intelligence',
      statement: 'From an idea to a useful tool.',
      projectHeading: 'The code is there. The context needs finding.',
      projectSubtitle: 'How mini-consumes-tokens approaches code lookup for AI tools.',
      stagesLabel: 'How code lookup works',
      stages: {
        problem: { short: 'Read', title: 'Reading the same code again', description: 'To find a function or discover where it is used, an AI assistant can end up reading entire files repeatedly. That reading takes up part of its available context.' },
        approach: { short: 'Index', title: 'Build a local index', description: 'mini-consumes-tokens parses code with Tree-sitter and stores symbols and relationships in SQLite. Its MCP server and CLI let tools query that index on the local computer.' },
        result: { short: 'Query', title: 'Access relevant context', description: 'Queries locate definitions, references, and calls. Context packs gather information about a symbol so the assistant can focus on the code it needs.' },
      },
      internship: 'Three months building a website',
      demo: {
        label: 'Illustrative example', title: 'One query, one selection',
        query: 'Example query: locate calculateTotal and its taxRate dependency.',
        controls: 'Choose the code example view', full: 'Full file', focused: 'Relevant context',
        fullDescription: 'Highlighted lines show calculateTotal and the taxRate constant it uses. The rest of the file remains visible.',
        focusedDescription: 'The selection shows the function and its dependency, keeping the original file line numbers.',
        disclaimer: 'Synthetic code. This prepared selection explains the idea; the demonstration does not run MCP queries or measure token savings.',
      },
    },
    footer: 'Portfolio under construction.',
  },
} satisfies Record<Locale, Translation>;
