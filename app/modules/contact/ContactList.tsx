import { SVGIcon } from '~/components/icon/SVGIcon';
import * as styles from './styles.css';
import BlogConfig from '../../../blog.config';

export function ContactList() {
  return (
    <div className={styles.rowlist}>
      <Anchor label="GitHub 링크" href={BlogConfig.contacts.github}>
        <SVGIcon.GitHub />
      </Anchor>
      <Anchor label="Linkedin 링크" href={BlogConfig.contacts.linkedin}>
        <SVGIcon.LinkedIn />
      </Anchor>
      <Anchor label="X 링크" href={BlogConfig.contacts.twitter}>
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
