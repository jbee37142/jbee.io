import { ReactNode } from 'react';

export interface TextLinkProps {
  href: string;
  children?: ReactNode;
  external?: boolean;
}

export function TextLink({ href, children, external }: TextLinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children ?? href}
      </a>
    );
  }

  return <a href={href}>{children ?? href}</a>;
}
