import { useState } from 'react';
import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTScontacts } from '../lib/queries';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';

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
    <main style={{ marginTop: '0px', background: '#ffa3d7' }}>
              <Sidebar />
              <div className="contactFirstBlock" >
              <div dangerouslySetInnerHTML={{ __html: data.contacts[0].info.html }}></div>
              </div>
        
       
        <div className="contactSecondBlock" style={{paddingTop:'10px',borderTop:'1px solid black'}}>
        <div className='normeFooter'>
        <h1 className='voiceName'>2024 rates</h1>
            <div className='divRate'>
                
                <div className="rateColonne">
                   <div style={{width:'90%'}} dangerouslySetInnerHTML={{ __html: data.contacts[0].firstRate.html }}></div>
                <div>
                <a className='enquire' href="mailto:example@example.com">Enquire</a>
                </div>
                </div>

                <div className="rateColonne">
                   <div style={{width:'90%'}} dangerouslySetInnerHTML={{ __html: data.contacts[0].firstRate.html }}></div>
                <div>
                <a className='enquire' href="mailto:example@example.com">Enquire</a>
                </div>
                </div>

                <div className="rateColonne">
                   <div style={{width:'90%'}} dangerouslySetInnerHTML={{ __html: data.contacts[0].secondRate.html }}></div>
                <div>
                <a className='enquire' href="mailto:example@example.com">Enquire</a>
                </div>
                </div>

                <div className="rateColonne">
                   <div style={{width:'90%'}} dangerouslySetInnerHTML={{ __html: data.contacts[0].thirdRate.html }}></div>
                <div>
                 <a className='enquire' href="mailto:example@example.com">Enquire</a>
                   </div>
                </div>

               
            </div>
          </div> 

        </div>

        
        <div style={{paddingTop:'10px',borderTop:'1px solid black',height:'50vH'}}>
        <div className='normeFooter'>
        <h1 className='voiceName'>cancellation Fees</h1>
            <p className='footerVoice'>{data.contacts[0].cancellationFees}</p>
          </div> 

          <div className='normeFooter'>
          <h1  className='voiceName'>hours</h1>
            <p className='footerVoice'>{data.contacts[0].hours}</p>
          </div> 

          <div className='normeFooter'>
          <h1  className='voiceName'>payment</h1>
          <p className='footerVoice'>{data.contacts[0].payment}</p>
          </div> 
        </div>
    </main>
  );
}

const styles = {
  sidebar: {
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: '45px',
    paddingRight: '45px',
    paddingTop: '20px',
    bottom: '0%',
    display:'none'
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