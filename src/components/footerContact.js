import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FooterContact = () => {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const isCreativesPage = router.pathname === '/creatives';
  const isMoodFilmsPage = router.pathname === '/moodfilms';
  const isContactsPage = router.pathname === '/contacts';
  const isWinningJobPage = router.pathname === '/winningjobs';




  return (
    <aside style={styles.sidebar}>
      <ul style={styles.ul}>
        <li style={styles.left}>
          <a style={styles.linkHome}>2024 rates</a>

          {/* Visualizza questo testo solo se siamo nella home */}
        
        </li>

        <li style={isCreativesPage ? styles.otherPage : styles.other}>
          <a style={styles.link}>JPEG Research PDF
Treatment
2 Days Min for both images
and layout required
DAY RATE (11H)
£500
OVERTIME
£250
NB Please contact AJ
regarding stock + archive
as fees may vary
Enquire</a>
        </li>
        <li style={isMoodFilmsPage ? styles.otherPage : styles.other}>
          <a style={styles.link}>GIF + Image Rese
3 Days Min for b
images/gif and l
required
DAY RATE (11H)
£550
OVERTIME
£275
Enquire</a>
        </li>
        <li style={isWinningJobPage ? styles.otherPage : styles.other}>        
          <a style={styles.linkAbout}>P03</a>
          <Link href="/winningjobs" style={styles.link}>Winning Jobs</Link>
        </li>
        <li style={isContactsPage ? styles.otherPage : styles.other}>
          <Link href="/contacts" style={styles.linkAbout}>P04</Link>
          <Link href="/contacts" style={styles.link}>Contacts</Link>
        </li>
      </ul>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: '45px',
    paddingRight: '45px',
    paddingTop: '20px',
    position: 'absolute',
    bottom: '0%',
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    width: '100%',
  },
  left: {
    width: '25%',
  },
  other: {
    width: '16.66%',
  },
  otherPage:{
    width: '16.66%',
    paddingBottom: '15px',
    borderBottom: '1px solid black',
  },
  otherAbout: {
    width: '25%',
  },
  linkHome: {
    display: 'block',
    padding: '0',
    textDecoration: 'none',
    color: 'black',
    fontSize: '15px',
  },
  link: {
    display: 'block',
    padding: '0',
    textDecoration: 'none',
    color: 'black',
    fontSize: '15px',
  },
  link2: {
    display: 'block',
    width: '88%',
    lineHeight: '1',
    padding: '0',
    textDecoration: 'none',
    color: 'black',
    fontSize: '15px',
  },
  linkAbout: {
    display: 'block',
    padding: '0',
    textDecoration: 'none',
    color: 'black',
    fontSize: '15px',
    width: '25%',
  },
};

export default FooterContact;
