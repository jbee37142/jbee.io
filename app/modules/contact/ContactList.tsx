import { SVGIcon } from '~/components/icon/SVGIcon';
import * as styles from './styles.css';

export function ContactList() {
  return (
    <div className={styles.rowlist}>
      <Anchor label="GitHub 링크" href="https://github.com/JaeYeopHan">
        <SVGIcon.GitHub />
      </Anchor>
      <Anchor label="Linkedin 링크" href="https://www.linkedin.com/in/jbee0">
        <SVGIcon.LinkedIn />
      </Anchor>
      <Anchor label="X 링크" href="https://twitter.com/JbeeLjyhanll">
        <SVGIcon.X />
      </Anchor>
    </div>
  )
}
function Anchor({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a className={styles.icon} aria-label={label} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  )
}
