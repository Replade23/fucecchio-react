import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebaseConfig";
import { collection, query, orderBy, getDocs, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const EventGrid = () => {
  const [eventi, setEventi] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

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

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "eventi", id));
    setEventi(eventi.filter(evento => evento.id !== id));
    closeModal();
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
              src={evento.imageUrl || "https://raw.githubusercontent.com/Replade23/f-l_website_storage/refs/heads/main/logos/logo_base_fel.png"}
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

      {modalOpen && selectedEvento && (
        <div className="fixed inset-0 bg-white/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-4xl max-w-4xl w-full p-6 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <div className="flex justify-center items-center">
              <img
                src={selectedEvento.imageUrl || "https://raw.githubusercontent.com/Replade23/f-l_website_storage/refs/heads/main/logos/logo_base_fel.png"}
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

            {user && (
              <div className="absolute bottom-5 right-40 mt-4 mr-4 flex space-x-4">
                <button onClick={() => handleDelete(selectedEvento.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Elimina</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGrid;