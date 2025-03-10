import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import client from "../lib/apolloClient";
import Sidebar from "../components/Sidebar";
import { GET_POSTSHomePage } from "../lib/queries";
import FooterContact from "@/components/footerContact";

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTSHomePage, { client });
  const divHomeRef = useRef(null);

  useEffect(() => {
    const scrollDiv = () => {
      if (divHomeRef.current) {
        divHomeRef.current.scrollLeft += 1; // Scorrimento orizzontale
      }
    };

    const interval = setInterval(scrollDiv, 25); // Velocità dello scroll
    return () => clearInterval(interval); // Pulizia al cambio di componente
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main style={{ marginTop: "0", overflow: "hidden" }}>
      <div
        ref={divHomeRef}
        className="divHome"
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
        }}
      >
        {data.homePages[0].gallery.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Gallery Image ${index + 1}`}
            style={{
              width: "50vw",
              height: "auto",
              maxHeight: "45vh",
              objectFit: "cover",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              marginRight: "10px",
            }}

            
          />
        ))}
           {data.homePages[0].gallery.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Gallery Image ${index + 1}`}
            style={{
              width: "50vw",
              height: "auto",
              maxHeight: "45vh",
              objectFit: "cover",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              marginRight: "10px",
            }}

            
          />
        ))}
           {data.homePages[0].gallery.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Gallery Image ${index + 1}`}
            style={{
              width: "50vw",
              height: "auto",
              maxHeight: "45vh",
              objectFit: "cover",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              marginRight: "10px",
            }}

            
          />
        ))}
      </div>

      <Sidebar />
      <img className="ajImg" src="/AJCOLLECTIVE_LOGO.png" />
    </main>
  );
}
