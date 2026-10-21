import { MDXRemote } from 'next-mdx-remote/rsc';
import type { ComponentProps, ReactNode } from 'react';
import { Prose } from '@/components/ui/Card';

// Whitelisted MDX components: external links get rel=noopener; Latin runs are bidi-isolated.
const components = {
  a: ({ href = '', children, ...rest }: ComponentProps<'a'>) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  },
  Latin: ({ children }: { children: ReactNode }) => <bdi dir="ltr">{children}</bdi>,
};

export function MdxRenderer({ source }: { source: string }) {
  return (
    <Prose>
      <MDXRemote source={source} components={components} />
    </Prose>
  );
}
