import * as styles from './styles.css';

export function List({ children }: { children: React.ReactNode }) {
  return <ul className={styles.root}>{children}</ul>;
}
