import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const EventGrid = () => {
  const [eventi, setEventi] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const eventiQuery = query(collection(db, "eventi"), orderBy("data", "desc"));
      const querySnapshot = await getDocs(eventiQuery);
      setEventi(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchData();
  }, []);

  const openModal = (evento) => {
    setSelectedEvento(evento);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvento(null);
  };

  return (

    <div className="h-full overflow-y-scroll pl-50 overflow-x-hidden pr-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8">
        {eventi.map((evento) => (
          <div
            key={evento.id}
            onClick={() => openModal(evento)}
            className="bg-white border-5 border-white rounded-4xl overflow-hidden transform transition duration-300 hover:border-gray-300 hover:grayscale-50 hover:bg-gray-300 cursor-pointer"
            style={{ height: "400px", position: "relative" }}
          >
            <img
              src={evento.imageUrl || "https://scontent.fflr2-1.fna.fbcdn.net/v/t39.30808-6/326478136_544416744321998_3057692449536040479_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VJHTUH-wVn8Q7kNvgHhZzVg&_nc_oc=Adi0LauFqGDXsuKND_Y51_sibpwWZRkybjRMdNDF88OH47p90E3cglqtvT_rsg7Bqyg&_nc_zt=23&_nc_ht=scontent.fflr2-1.fna&_nc_gid=zRNY3IW_UEeDdQ_7l1Fjkw&oh=00_AYE0pWMiLFCxHlGS3V9YBgdgA4F3PVhH7yuDPpKbxYWjbA&oe=67DF4151"}
              alt={evento.titolo}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg text-gray-800 font-semibold">{evento.titolo}</h3>
              <p className="text-sm text-gray-600 mt-2 text-ellipsis overflow-hidden h-16">{evento.descrizione}</p>
              <small className="text-xs text-gray-500 block mt-3">
                {evento.data ? evento.data.toDate().toLocaleDateString() : "Data non disponibile"}
              </small>
            </div>
          </div>
        ))}
      </div>


      {/* Modale */}
      {modalOpen && selectedEvento && (
        <div className="fixed inset-0 bg-white/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-4xl max-w-4xl w-full p-6 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center items-center">
              <img
                src={selectedEvento.imageUrl || "https://scontent.fflr2-1.fna.fbcdn.net/v/t39.30808-6/326478136_544416744321998_3057692449536040479_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VJHTUH-wVn8Q7kNvgHhZzVg&_nc_oc=Adi0LauFqGDXsuKND_Y51_sibpwWZRkybjRMdNDF88OH47p90E3cglqtvT_rsg7Bqyg&_nc_zt=23&_nc_ht=scontent.fflr2-1.fna&_nc_gid=zRNY3IW_UEeDdQ_7l1Fjkw&oh=00_AYE0pWMiLFCxHlGS3V9YBgdgA4F3PVhH7yuDPpKbxYWjbA&oe=67DF4151"}
                alt={selectedEvento.titolo}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl text-gray-800 font-semibold">{selectedEvento.titolo}</h3>
                <button onClick={closeModal} className="text-gray-600 text-2xl">×</button>
              </div>
              <small className="text-xs text-gray-500 block mt-3">
                {selectedEvento.data ? selectedEvento.data.toDate().toLocaleDateString() : "Data non disponibile"}
              </small>
              <div className="mt-4 overflow-y-auto max-h-96">
                <p className="text-gray-600">{selectedEvento.descrizione}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGrid;
