import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  fork: boolean;
};

const USER = 'pelakee13';

async function getRepos(): Promise<Repo[] | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=12`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const repos = (await res.json()) as Repo[];
    return repos.filter((r) => !r.fork).slice(0, 6);
  } catch {
    return null;
  }
}

/** Build-time GitHub activity feed. Renders nothing when the fetch fails. */
export async function GitHubActivity({ title, lead }: { title: string; lead: string }) {
  const repos = await getRepos();
  if (!repos?.length) return null;
  return (
    <section className="border-t border-border py-14 sm:py-20">
      <Container>
        <header className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-3 text-fg-muted">{lead}</p>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <Card key={repo.name} className="flex h-full flex-col gap-2">
              <h3 className="text-lg font-semibold">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {repo.name}
                </a>
              </h3>
              {repo.description && <p className="text-sm leading-7 text-fg-muted">{repo.description}</p>}
              {repo.language && (
                <p className="mt-auto text-xs text-fg-muted">{repo.language}</p>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
