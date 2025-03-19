import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const EventGrid = () => {
  const [eventi, setEventi] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const eventiQuery = query(collection(db, "eventi"), orderBy("data","desc"));
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-h-[580px] overflow-y-auto pl-50 overflow-x-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {eventi.map((evento) => (
            <div
              key={evento.id}
              onClick={() => openModal(evento)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-lg cursor-pointer"
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
      </div>

      {/* Modale */}
      {modalOpen && selectedEvento && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl text-gray-800 font-semibold">{selectedEvento.titolo}</h3>
              <button onClick={closeModal} className="text-gray-600 text-2xl">×</button>
            </div>
            <div className="mt-4">
              <img
                src={selectedEvento.imageUrl || "https://scontent.fflr2-1.fna.fbcdn.net/v/t39.30808-6/326478136_544416744321998_3057692449536040479_n.png?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=VJHTUH-wVn8Q7kNvgHhZzVg&_nc_oc=Adi0LauFqGDXsuKND_Y51_sibpwWZRkybjRMdNDF88OH47p90E3cglqtvT_rsg7Bqyg&_nc_zt=23&_nc_ht=scontent.fflr2-1.fna&_nc_gid=zRNY3IW_UEeDdQ_7l1Fjkw&oh=00_AYE0pWMiLFCxHlGS3V9YBgdgA4F3PVhH7yuDPpKbxYWjbA&oe=67DF4151"}
                alt={selectedEvento.titolo}
                className="w-full h-80 object-cover"
              />
              <p className="mt-4 text-gray-600">{selectedEvento.descrizione}</p>
              <small className="text-xs text-gray-500 block mt-3">
                {selectedEvento.data ? selectedEvento.data.toDate().toLocaleDateString() : "Data non disponibile"}
              </small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGrid;
