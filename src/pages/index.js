import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import Sidebar from '../components/Sidebar';
import { GET_POSTSHomePage } from '../lib/queries';
import FooterContact from '@/components/footerContact';

export default function Home() {
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

  console.log('Dati ricevuti:', data.homePages[0].gallery);

  return (
    <main style={{ marginTop: '0', background: '', overflow:'hidden' }}>
      <div className="divHome" style={{}}>
        {data.homePages[0].gallery.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Gallery Image ${index + 1}`}
            style={{
              width: '50vW',
              height: 'auto',
              maxHeight:'45vH',
              objectFit: 'cover',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
        ))}
      </div>

      <Sidebar />
      <img className="ajImg" src="/AJCOLLECTIVE_LOGO.png" />
    </main>
  );
}
