import { Modal, Button } from 'react-bootstrap';

//Components
import { deleteRestaurants } from './../../services/api/restaurantAPI'

export default function DeleteLine({ show, handleClose, restaurantID }) {
    if (!restaurantID) return null;

    const handleSubmit = async () => {
        try {
            await deleteRestaurants(restaurantID);
            window.location.reload();
        } catch (error) {
            console.log('Error al enviar los datos:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Borrar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas borrar este elemento?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleSubmit}>
                    Borrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}