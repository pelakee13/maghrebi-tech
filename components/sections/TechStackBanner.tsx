import { Container } from '@/components/ui/Container';

const TECHS = [
  'Python',
  'Node.js',
  'TypeScript',
  'React / Next.js',
  'Telegram Bot API',
  'OpenAI API',
  'n8n / Make',
  'PostgreSQL',
  'Docker',
];

/** Calm, static tech banner between Services and Featured Work. No marquee motion. */
export function TechStackBanner({ title, lead }: { title: string; lead: string }) {
  return (
    <section className="border-y border-border bg-surface/40 py-12">
      <Container>
        <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
        <p className="mt-2 text-fg-muted">{lead}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {TECHS.map((tech) => (
            <li key={tech} className="rounded-full border border-border bg-bg px-4 py-2 text-sm text-fg-muted">
              {tech}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
