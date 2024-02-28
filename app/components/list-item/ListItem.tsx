import * as styles from './styles.css';

export function ListItem({ children }: { children: React.ReactNode }) {
  return <li className={styles.root}>{children}</li>;
}
