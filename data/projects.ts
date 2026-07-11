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
      'Chat with your documents. A full RAG pipeline with vector search, CrossEncoder reranking and a local pointer-generator model for grounded, low-latency answers.',
    tags: ['Next.js', 'FastAPI', 'ChromaDB', 'PostgreSQL'],
    github: 'https://github.com/PointerRAG/Project',
    featured: true,
  },
  {
    name: 'Signalyze',
    description:
      'Traffic sign recognition built for Indian roads. A YOLOv8 model detects and classifies 37 sign categories in real time and gives drivers audio feedback.',
    tags: ['YOLOv8', 'Next.js', 'FastAPI', 'Prisma'],
    github: 'https://github.com/Signalyze',
    live: 'https://signalyze.vercel.app',
    featured: true,
  },
  {
    name: 'Hive',
    description:
      'A social networking platform with profiles, threads ("buzzes"), communities, multi-level comments and search.',
    tags: ['Next.js', 'TypeScript', 'MongoDB'],
    github: 'https://github.com/alvinsjoy/Hive',
    featured: true,
  },
  {
    name: 'Socket Chat',
    description:
      'Temporary, disposable chatrooms with realtime messaging. No accounts, no history, just a link.',
    tags: ['Next.js', 'Socket.io', 'Express'],
    github: 'https://github.com/alvinsjoy/socket-chat',
    live: 'https://chat.alvin.is-a.dev',
    featured: true,
  },
  {
    name: 'Todo',
    description:
      'A todo app with advanced controls: auth, filters and realtime sync, wrapped in a clean shadcn/ui interface.',
    tags: ['Next.js', 'Supabase', 'shadcn/ui'],
    github: 'https://github.com/alvinsjoy/todo',
    live: 'https://todo.alvin.is-a.dev',
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
