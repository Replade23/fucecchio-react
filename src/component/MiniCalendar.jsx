import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment"; // Importiamo moment.js
import "../component/MiniCalendar.css";

export default function MiniCalendar() {
  const [value, setValue] = useState(new Date());
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "eventi"));
        const events = querySnapshot.docs.map((doc) => {
          const firebaseDate = doc.data().data.toDate(); // Converti Timestamp in Date
          console.log("firebasedate ", firebaseDate);

          // Usa moment.js per correggere il fuso orario e formattare la data
          const localDate = moment(firebaseDate)
            .local() // Imposta la data nel fuso orario locale
            .format("YYYY-MM-DD"); // Formatta in "YYYY-MM-DD"
          
          console.log("localdate ", localDate);
          return localDate;
        });

        setEventDates(events);
      } catch (error) {
        console.error("Errore nel recupero degli eventi:", error);
      }
    };

    fetchEvents();
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      // Usa moment.js per normalizzare la data
      const formattedDate = moment(date).format("YYYY-MM-DD"); // "YYYY-MM-DD"
      // Confronta la data con quelle degli eventi
      if (eventDates.includes(formattedDate)) {
        console.log(eventDates);
        return <div className="event-indicator"></div>;
      }
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center h-full w-full p-[10px]">
      <Calendar onChange={setValue} value={value} tileContent={tileContent} />
    </div>
  );
}
