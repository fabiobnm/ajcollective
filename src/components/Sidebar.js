import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTSHomePage } from '../lib/queries';


const Sidebar = () => {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const isCreativesPage = router.pathname === '/creatives';
  const isContactsPage = router.pathname === '/contacts';
  const isWinningJobsPage = router.pathname === '/winningjobs';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Stato per il menu mobile
  const { loading, error, data } = useQuery(GET_POSTSHomePage, { client });

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert('err');
    console.log('ciaoooo');
    console.log(data);

    console.error('Errore nella query:', error.message);
    console.error('Dettagli dell\'errore:', error.graphQLErrors);
    console.error('Dettagli della risposta:', error.networkError);
    return <p>Error: {error.message}</p>;
  }

  console.log('Dati sidebar:', data.homePages[0].headerText.html);

  return (
    <aside className='sideBar' style={isContactsPage ? styles.pink : styles.white}>
      {/* Menu Desktop */}
      <ul className="headerDesktop" style={styles.ul}>
        <li style={styles.left}>
          <Link href="/" style={styles.linkHome}>AJ COLLECTIVE</Link>

          {/* Visualizza questo testo solo se siamo nella home */}
          {isHome && (
            <div style={{width:'85%'}}>
            <p style={styles.link2}>
            <div className='textMenu' style={{width:'100%'}} dangerouslySetInnerHTML={{ __html: data.homePages[0].headerText.html }}></div>
            </p>
            </div>
          )}
        </li>

        <li style={isCreativesPage ? styles.otherPage : styles.other}>
          <Link href="/creatives" style={styles.link}>P01</Link>
          <Link href="/creatives" style={styles.link}>Creatives</Link>
        </li>
        <li style={isWinningJobsPage ? styles.otherPage : styles.other}>
          <Link href="/winningjobs" style={styles.link}>P02</Link>
          <Link href="/winningjobs" style={styles.link}>Winning Jobs</Link>
        </li>
       
        <li style={isContactsPage ? styles.otherPage : styles.other}>
          <Link href="/contacts" style={styles.link}>P03</Link>
          <Link href="/contacts" style={styles.link}>Contacts</Link>
        </li>
      </ul>

      {/* Menu Mobile */}
      <div className="headerMobile">
        <Link href="/" style={styles.linkHome}>AJ COLLECTIVE</Link>
        {isHome && (
            <div style={{width:'85%'}}>
            <p style={styles.link2}>
            <div style={{width:'100%'}} dangerouslySetInnerHTML={{ __html: data.homePages[0].headerText.html }}></div>
            </p>
            </div>
          )}

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
            <li style={isCreativesPage ? styles.otherPageMobile : styles.otherMobile}>
              <Link href="/creatives" style={styles.link}>P01</Link>
              <Link href="/creatives" style={styles.link}>Creatives</Link>
            </li>
            <li style={isWinningJobsPage ? styles.otherPageMobile : styles.otherMobile}>
              <Link href="/winningjobs" style={styles.link}>P02</Link>
              <Link href="/winningjobs" style={styles.link}>Winning Jobs</Link>
            </li>
           
            <li style={isContactsPage ? styles.otherPageMobile : styles.otherMobile}>
              <Link href="/contacts" style={styles.link}>P03</Link>
              <Link href="/contacts" style={styles.link}>Contacts</Link>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

const styles = {
  white:{
    background:'white'
  },
  pink:{
    background:'#ffa3d7'
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
  otherMobile: {
    width: '100%',
  },
  otherPageMobile: {
    width: '100%',
    paddingBottom: '15px',
    borderBottom: '.1px solid black',
  },
  linkHome: {
    display: 'block',
    padding: '0',
    textDecoration: 'none',
    color: 'black',
    fontSize: '12px',
  },
  link: {
    display: 'block',
    padding: '0',
    textDecoration: 'none',
    color: 'black',
    fontSize: '12px',
  },
  link2: {
    fontSize: '12px',
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
    marginBottom: '10px'
  },
};

export default Sidebar;
