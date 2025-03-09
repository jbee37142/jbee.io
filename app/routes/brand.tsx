import { MetaFunction } from 'react-router';
import { TextLink } from '~/components/text-link/TextLink';
import { ContactList } from '~/modules/contact/ContactList';
import { generateMeta } from '~/utils/meta/generate-meta';
import { pathJoin } from '~/utils/path';
import BlogConfig from '../../blog.config';
import * as styles from './brand.css';

export const meta: MetaFunction = () => {
  return generateMeta({
    title: ['Brand', BlogConfig.seo.title],
    description: BlogConfig.seo.description,
    image: pathJoin(BlogConfig.site, BlogConfig.image.main),
    url: pathJoin(BlogConfig.site, 'brand'),
    logo: pathJoin(BlogConfig.site, 'logo.jpeg'),
  });
};

export default function BrandPage() {
  return (
    <section className={styles.root}>
      <article>
        <h3>👋 Product Engineer, Frontend Engineer, Jbee</h3>
        <p>Resume: <TextLink href={BlogConfig.contacts.resume}>🇰🇷 한국어</TextLink> | <TextLink href="https://docs.google.com/document/d/1aiSYwhp9h8QI2KvbzcAFEepTjWg9Bo6bU18qXGD-qIY/edit?usp=sharing">🇺🇸 English</TextLink></p>
        <article>
          <h4>Community</h4>
          <ul className={styles.list}>
            <li>
              <TextLink href="https://2024.feconf.kr/">FEConf Organizer</TextLink> (18.06 - current)
            </li>
          </ul>
        </article>
        <article>
          <h4>Mentoring</h4>
          <ul className={styles.list}>
            <li>
              <TextLink href="https://f-lab.kr/">F-lab Mentor</TextLink> (22.11 - 24.10)
            </li>
            <li>
              <TextLink href="https://www.woowacourse.io/">우아한테크코스 리뷰어</TextLink> (21.02 - 21.06)
            </li>
            <li>
              <TextLink href="https://boostcamp.connect.or.kr/">CONNECT 부스트캠프 리뷰어</TextLink> (20.08 - 20.10)
            </li>
          </ul>
        </article>
        <article>
          <h4>Presentations</h4>
          <ul className={styles.list}>
            <li><TextLink href='https://www.youtube.com/watch?v=qlNzmQEuMjQ'>너디너리 데모데이: 개발자의 학과습</TextLink> (2023.09.09)</li>
            <li><TextLink href='https://speakerdeck.com/jaeyeophan/yunanhan-ende'>프런트엔드 다이빙 클럽: 유난한 엔데</TextLink> (2023.06.30)</li>
            <li><TextLink href='https://www.youtube.com/watch?v=fR8tsJ2r7Eg&themeRefresh=1'>SLASH22: Effective Component 지속 가능한 성장과 컴포넌트</TextLink> (2022.06.08)</li>
            <li><TextLink href='https://speakerdeck.com/jaeyeophan/mentoseuwa-inteonkolra'>GDG Intern Special: 멘토스와 인턴콜라</TextLink> (2019.07.06)</li>
            <li><TextLink href='https://speakerdeck.com/jaeyeophan/miri-alassdamyeon-johasseul-geosdeul'>NAVER Boostcamp: 미리 알았다면 좋았을 것 들</TextLink> (2019.06.24)</li>
            <li><TextLink href='https://speakerdeck.com/jaeyeophan/uxbbaemyeon-sice-peureonteuendeu'>GDG Frontendgame: UX빼면 시체 프런트엔드</TextLink> (2019.06.22)</li>
            <li><TextLink href='https://speakerdeck.com/jaeyeophan/junieo-gaebaljayi-seongjange-daehaeseo'>NAVER Tech Concert: 주니어 개발자의 성장에 대한 뻔하지만 뻔하지 않은 이야기</TextLink> (2019.04.11)</li>
            <li><TextLink href='https://slides.com/jbee/devfest_seoul_2018_performance_optimization_with_chrome_devtools'>GDG Devfest Seoul: Chrome Devtools를 활용한 웹 프런트엔드 성능 측정과 개선</TextLink> (2018.11.10)</li>
            <li><TextLink href='https://speakerdeck.com/jaeyeophan/gdg-campus-2018-meetup-balpyojaryo-hamgge-ilhago-sipeun-gaebalja'>GDG Campus Meetup: 함께 일하고 싶은 개발자</TextLink> (2018.02.11)</li>
          </ul>
        </article>
        <article>
          <h4>Articles</h4>
          <ul className={styles.list}>
            <li>
              <TextLink href="https://toss.tech/article/restructuring">달리는 기차의 바퀴 교체하기 2. Restructuring</TextLink>
            </li>
            <li>
              <TextLink href="https://toss.tech/article/restructuring-planning">달리는 기차의 바퀴 교체하기 1. Planning</TextLink>
            </li>
            <li>
              <TextLink href="https://toss.tech/article/faster-initial-rendering">조금만 신경써서 초기 렌더링 빠르게 하기 (feat. JAM Stack)</TextLink>
            </li>
          </ul>
        </article>
        <article>
          <h4>Books</h4>
          <ul className={styles.list}>
            <li>
              <TextLink href="https://fastcampus.co.kr/books/212106">커리어 속에서 성장하는 방법</TextLink>
            </li>
          </ul>
        </article>
      </article>
      <article>
        <h4>One more thing</h4>
        <p>{'I\'m scuba diver'}</p>
        <ul className={styles.list}>
          <li>Instagram: <TextLink href={BlogConfig.contacts.instagram} /></li>
          <li>Youtube: <TextLink href={BlogConfig.contacts.youtube} /></li>
        </ul>
      </article>
      <article>
        <h4>Contacts</h4>
        <p>Feel free to contact</p>
        <ContactList />
      </article>
    </section>
  );
}

