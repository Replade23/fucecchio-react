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

          // Usa moment.js per correggere il fuso orario e formattare la data
          const localDate = moment(firebaseDate)
            .local() // Imposta la data nel fuso orario locale
            .format("YYYY-MM-DD"); // Formatta in "YYYY-MM-DD"
          return localDate;
        });

        setEventDates(events);
      } catch (error) {
        console.error("Errore nel recupero degli eventi:", error);
      }
    };

    fetchEvents();
  }, []);

  const holidays = [
    // Date fisse delle festività
    "01-01", // Capodanno
    "15-08", // Ferragosto
    "25-12", // Natale
    "01-11", // Ognissanti
  ];

  const isHoliday = (date) => {
    const formattedDate = moment(date).format("MM-DD"); // Formatta solo mese e giorno
    return holidays.includes(formattedDate) || moment(date).day() === 0; // Domenica
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = moment(date).format("YYYY-MM-DD");

      let classes = "";

      // Aggiungi la classe per i giorni con eventi
      if (eventDates.includes(formattedDate)) {
        classes += " event-day "; // Aggiunge una classe CSS per gli eventi
      }

      // Aggiungi la classe per le festività (domeniche o date fisse)
      if (isHoliday(date)) {
        classes += " holiday-day "; // Aggiungi una classe CSS per le festività
      }

      return classes.trim(); // Rimuove eventuali spazi extra tra le classi
    }
    return null;
  };

  return (
    <div className="flex justify-center items-center h-full w-full p-[10px]">
      <Calendar onChange={setValue} value={value} tileClassName={tileClassName} />
    </div>
  );
}
