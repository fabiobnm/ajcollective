import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const isCreativesPage = router.pathname === '/creatives';
  const isMoodFilmsPage = router.pathname === '/moodfilms';
  const isContactsPage = router.pathname === '/contacts';
  const isWinningJobPage = router.pathname === '/winningjobs';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Stato per il menu mobile

  return (
    <aside className='sideBar'>
      {/* Menu Desktop */}
      <ul className="headerDesktop" style={styles.ul}>
        <li style={styles.left}>
          <Link href="/" style={styles.linkHome}>AJ COLLECTIVE</Link>

          {/* Visualizza questo testo solo se siamo nella home */}
          {isHome && (
            <Link href="/" style={styles.link2}>
              Creative Research. Directors Interpretation. Commercial -
              Film - Music Video Treatments. Creative Writing. Mood Films.
            </Link>
          )}
        </li>

        <li style={isCreativesPage ? styles.otherPage : styles.other}>
          <Link href="/creatives" style={styles.link}>P01</Link>
          <Link href="/creatives" style={styles.link}>Creatives</Link>
        </li>
        <li style={isMoodFilmsPage ? styles.otherPage : styles.other}>
          <Link href="/moodfilms" style={styles.link}>P02</Link>
          <Link href="/moodfilms" style={styles.link}>Mood Films</Link>
        </li>
        <li style={isWinningJobPage ? styles.otherPage : styles.other}>
          <Link href="/winningjobs" style={styles.linkAbout}>P03</Link>
          <Link href="/winningjobs" style={styles.link}>Winning Jobs</Link>
        </li>
        <li style={isContactsPage ? styles.otherPage : styles.other}>
          <Link href="/contacts" style={styles.linkAbout}>P04</Link>
          <Link href="/contacts" style={styles.link}>Contacts</Link>
        </li>
      </ul>

      {/* Menu Mobile */}
      <div className="headerMobile">
        <Link href="/" style={styles.linkHome}>AJ COLLECTIVE</Link>

        {/* Bottone per aprire/chiudere il menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={styles.mobileButton}
        >
          {isMobileMenuOpen ? '-' : '+'}
        </button>

        {/* Mostra/Nasconde il menu mobile */}
        {isMobileMenuOpen && (
          <ul className="menuOpenMobile" style={styles.mobileMenu}>
            <li style={isCreativesPage ? styles.otherPage : styles.other}>
              <Link href="/creatives" style={styles.link}>P01</Link>
              <Link href="/creatives" style={styles.link}>Creatives</Link>
            </li>
            <li style={isMoodFilmsPage ? styles.otherPage : styles.other}>
              <Link href="/moodfilms" style={styles.link}>P02</Link>
              <Link href="/moodfilms" style={styles.link}>Mood Films</Link>
            </li>
            <li style={isWinningJobPage ? styles.otherPage : styles.other}>
              <Link href="/winningjobs" style={styles.linkAbout}>P03</Link>
              <Link href="/winningjobs" style={styles.link}>Winning Jobs</Link>
            </li>
            <li style={isContactsPage ? styles.otherPage : styles.other}>
              <Link href="/contacts" style={styles.linkAbout}>P04</Link>
              <Link href="/contacts" style={styles.link}>Contacts</Link>
            </li>
          </ul>
        )}
      </div>
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
    position: 'fixed',
    top: '0%',
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
  otherPage: {
    width: '16.66%',
    paddingBottom: '15px',
    borderBottom: '1px solid black',
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
  mobileButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  mobileMenu: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    marginTop: '10px',
  },
};

export default Sidebar;
