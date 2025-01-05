import { Modal } from "flowbite-react";
import { FunctionComponent } from "react";
import UpdateCard from "./UpdateCard";
import  CardInterface from "../interfaces/Card";

interface UpdateCardModalProps {
    show: boolean;
    onClose: Function;
    refresh: Function;
    card: CardInterface;
}
 
const UpdateCardModal: FunctionComponent<UpdateCardModalProps> = ({show, onClose, refresh, card}) => {
    return (<>
    <Modal 
     show={show}
    onClose = {()=> onClose()}
    size="xlg"
    aria-labelledby="contained-modal-title-vcenter"
    >
        <Modal.Header>Update Card</Modal.Header>
        <Modal.Body>
            <UpdateCard onClose={onClose}  show={false} refresh={refresh} card={card}/>
        </Modal.Body>
    </Modal>
    </>  );
}
 
export default UpdateCardModal;