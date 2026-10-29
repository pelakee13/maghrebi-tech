import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { pinnedRepos } from '@/lib/github-repos';

type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
};

const USER = 'pelakee13';

async function getRepos(): Promise<Repo[] | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const all = (await res.json()) as Repo[];
    // Curated: pinned order, not "latest activity".
    return pinnedRepos
      .map((p) => {
        const repo = all.find((r) => r.name === p.name);
        return repo ? { ...repo, description: p.desc?.fa ?? repo.description } : null;
      })
      .filter((r): r is Repo => r !== null);
  } catch {
    return null;
  }
}

/** Build-time curated GitHub section. Renders nothing when the fetch fails. */
export async function GitHubActivity({
  title,
  lead,
  locale,
}: {
  title: string;
  lead: string;
  locale: 'en' | 'fa';
}) {
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
          {repos.map((repo) => {
            const pinned = pinnedRepos.find((p) => p.name === repo.name);
            const desc = pinned?.desc?.[locale] ?? repo.description;
            return (
              <Card key={repo.name} className="flex h-full flex-col gap-2">
                <h3 className="text-lg font-semibold">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {repo.name}
                  </a>
                </h3>
                {desc && <p className="text-sm leading-7 text-fg-muted">{desc}</p>}
                {repo.language && <p className="mt-auto text-xs text-fg-muted">{repo.language}</p>}
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
