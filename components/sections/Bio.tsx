import { Container } from '@/components/ui/Container';

/** Short first-person bio: why and how, in the owner's own voice. */
export function Bio({ title, text }: { title: string; text: string }) {
  return (
    <section className="border-t border-border py-14">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-4 leading-8 text-fg-muted">{text}</p>
        </div>
      </Container>
    </section>
  );
}
