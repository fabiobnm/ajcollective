import { useState } from 'react';
import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTScontacts } from '../lib/queries';
import Sidebar from '../components/Sidebar';
import FooterContact from '../components/footerContact';

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTScontacts, { client });
  const [selectedCreative, setSelectedCreative] = useState(null); // Stato per tracciare il creative cliccato

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert('err');
    console.error('Errore nella query:', error.message);
    return <p>Error: {error.message}</p>;
  }
  console.log('seeee'+data.contacts[0].info);
  console.log('yo' + data);

  const handleClick = (id) => {
    // Seleziona o deseleziona il creative cliccato
    setSelectedCreative(selectedCreative === id ? null : id);
  };

  return (
    <main style={{ marginTop: '125px', background: '' }}>
              <Sidebar />

       <div className='contactFirstBlock'>{data.contacts[0].info}</div>
      <div style={{ display: 'block', color: 'black', width: 'max-content',  }}>
             </div>
      <FooterContact/>

    </main>
  );
}
