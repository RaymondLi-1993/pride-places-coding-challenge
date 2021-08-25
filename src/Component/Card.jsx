import React, {useState} from 'react'
import Modal from "react-modal";



export default function Cards({title, ...rest}) {
    Modal.setAppElement("#root");
    const {user, body} = rest

    console.log(user);

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
       setIsOpen(!modalIsOpen); 
       console.log(modalIsOpen);
    }



    return (
        <div>
            <div onClick={() => openModal()}>
            <h1>{title}</h1> 
            </div>
            <div onClick={() => openModal()}>
               <Modal isOpen={modalIsOpen} >
                    <h1>{body}</h1>
                    <h1>{user.user}</h1>
                    <h1>{user.catchphrase}</h1>    
               </Modal>
            </div>
            
        </div>
    )
}
