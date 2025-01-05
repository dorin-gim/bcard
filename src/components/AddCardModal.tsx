import { Modal } from "flowbite-react";
import { FunctionComponent } from "react";
import AddCard from "./AddCard";
import "../style/Modal.css";

interface AddCardModalProps {
    show: boolean;
    onClose: Function;
    refresh: Function;

}
 
const AddCardModal: FunctionComponent<AddCardModalProps> = ({show, onClose,refresh}) => {
  
    return ( <>
    <Modal
    show={show}
    onClose = {()=> onClose()}
    size="xlg"
    aria-labelledby="contained-modal-title-vcenter"
    >
    
   <Modal.Header id="modal-title">Add New Businness Card</Modal.Header>
      <Modal.Body>
        <AddCard onClose={onClose} refresh={refresh} show={false}/>
      </Modal.Body>

    </Modal>

    </> );
}
 
export default AddCardModal;