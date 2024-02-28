import { NavLink } from '@remix-run/react';
import * as styles from './styles.css';
import { common } from '~/styles/element.css';

export function GlobalNavigationBar() {
  return (
    <nav className={styles.root}>
      <ul className={styles.list}>
        <GNBLink to="/">Home</GNBLink>
        <GNBLink to="/articles">Articles</GNBLink>
        <GNBLink to="/brand">Brand</GNBLink>
      </ul>
    </nav>
  );
}

function GNBLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li className={styles.listItem}>
      <NavLink className={common.anchor} prefetch='render' to={to}>{children}</NavLink>
    </li>
  ) 
}
