export type Project = {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: 'PointerRAG',
    description:
      'Chat with your documents. Documents are chunked and embedded into a vector store, retrieved by semantic search, reranked, then answered by a custom pointer-generator network built over T5 that copies exact spans, reducing hallucination.',
    tags: [
      'Next.js',
      'FastAPI',
      'ChromaDB',
      'PostgreSQL',
      'PyTorch',
      'Transformers',
    ],
    github: 'https://github.com/PointerRAG/Project',
    featured: true,
  },
  {
    name: 'Signalyze',
    description:
      'Traffic sign recognition built for Indian roads. A custom YOLOv8 model that detects and classifies 37 distinct traffic signs in real time and gives drivers audio feedback. Dashboard built with Next.js to view detection history and analytics.',
    tags: ['YOLOv8', 'Next.js', 'FastAPI', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com/Signalyze',
    live: 'https://signalyze.vercel.app',
    featured: true,
  },
  {
    name: 'Hive',
    description:
      'A social networking platform with profiles, threads ("buzzes"), communities, multi-level comments and search.',
    tags: ['Next.js', 'TypeScript', 'Mongoose', 'MongoDB'],
    github: 'https://github.com/alvinsjoy/Hive',
    featured: true,
  },
  {
    name: 'Socket Chat',
    description:
      'Temporary, disposable chatrooms with realtime messaging. No accounts, no history, just a link or a four-digit code.',
    tags: ['Next.js', 'Socket.io', 'Express'],
    github: 'https://github.com/alvinsjoy/socket-chat',
    live: 'https://chat.alvin.is-a.dev',
    featured: true,
  },
  {
    name: 'Links',
    description:
      'Linktree, but better. My personal link-in-bio page with springy motion and a tiny footprint.',
    tags: ['Next.js', 'Motion', 'Tailwind CSS'],
    github: 'https://github.com/alvinsjoy/links',
    live: 'https://aj.is-a.dev',
    featured: true,
  },
];
