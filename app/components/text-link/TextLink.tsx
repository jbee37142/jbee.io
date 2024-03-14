import { ReactNode } from 'react';
import { common } from '~/styles/element.css';

export interface TextLinkProps {
  href: string;
  children?: ReactNode;
  external?: boolean;
}

export function TextLink({ href, children, external }: TextLinkProps) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={common.link}>
        {children ?? href}
      </a>
    );
  }

  return <a href={href} className={common.link}>{children ?? href}</a>;
}
