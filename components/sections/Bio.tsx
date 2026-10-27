import Image from 'next/image';
import { Container } from '@/components/ui/Container';

/** Short first-person bio: why and how, in the owner's own voice. */
export function Bio({ title, text, photoAlt }: { title: string; text: string; photoAlt: string }) {
  return (
    <section className="border-t border-border py-14">
      <Container>
        <div className="grid items-start gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <Image
            src="/images/about/amin.jpg"
            alt={photoAlt}
            width={480}
            height={600}
            className="w-full max-w-xs rounded-xl object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
            <p className="mt-4 leading-8 text-fg-muted">{text}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
