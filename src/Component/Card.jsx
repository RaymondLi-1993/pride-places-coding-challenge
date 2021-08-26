import React, { useState } from "react";
import Modal from "react-modal";

export default function Cards({ title, ...rest }) {
  //Used React modal package for easy access to modal component.
  //code below binds the modal to the application element  
  //passed state into cards where cards can than consume and display user data
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user, body } = rest;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    overlay: {
      background: "rgba(0,0,0,0.4)",
    },
    content: {
      width: "50%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="w-52 h-64 relative transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-90 bg-gray-800 rounded-xl mx-auto mt-2 cursor-pointer">
      <div
        className="absolute md:-right-5 -right-1 -bottom-4 bg-blue-600 w-full h-full rounded-xl "
        onClick={() => openModal()}
      >
        <h1 className="font-sans text-lg font-bold text-white text-center uppercase">
          Title
        </h1>
        <h1 className="font-sans text-base text-white text-center">{title}</h1>
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={closeModal}
        >
          <div>
            <h1>{`USERNAME  ${user.user}`}</h1>
            <h1>{`CATCHPHRASE ${user.catchphrase}`}</h1>
            <h1>{`BODY    ${body}`}</h1>

            <button
              onClick={() => closeModal()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32 h-12 mx-auto"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
