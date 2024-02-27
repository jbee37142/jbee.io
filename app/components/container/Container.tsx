import * as styles from './styles.css';

export function Container({ children }: { children:React.ReactNode }) {
  return (
    <main className={styles.root}>{children}</main>
  )
}
