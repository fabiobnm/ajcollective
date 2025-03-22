import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import client from "../lib/apolloClient";
import Sidebar from "../components/Sidebar";
import { GET_POSTSHomePage } from "../lib/queries";
import FooterContact from "@/components/footerContact";

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTSHomePage, { client });

// Ref per il div che vogliamo scrollare
const commissionsDivRef = useRef(null);
const isDragging = useRef(false);
const startX = useRef(0);
const scrollLeft = useRef(0);

const handleMouseDown = (e) => {
  isDragging.current = true;
  startX.current = e.clientX - commissionsDivRef.current.offsetLeft;
  scrollLeft.current = commissionsDivRef.current.scrollLeft;
};

const handleMouseLeave = () => {
  isDragging.current = false;
};

const handleMouseUp = () => {
  console.log('up');
  isDragging.current = false;
};

const handleMouseMove = (e) => {
  console.log('entra');
  
  if (!isDragging.current) return;
  e.preventDefault();
  const x = e.clientX - commissionsDivRef.current.offsetLeft;
  const scroll = x - startX.current;
  commissionsDivRef.current.scrollLeft = scrollLeft.current - scroll;
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main style={{ marginTop: "0", overflow: "hidden" , background:'yellow'}}>
      <div
       ref={commissionsDivRef}
       onMouseDown={handleMouseDown}
       onMouseLeave={handleMouseLeave}
       onMouseUp={handleMouseUp}
       onMouseMove={handleMouseMove}
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
              userSelect: 'none', /* Evita la selezione */
              webkitUserDrag:' none', /* Disabilita il trascinamento su browser WebKit */
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
