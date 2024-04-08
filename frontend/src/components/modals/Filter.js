import { Modal, Button, Form } from 'react-bootstrap';

//Components
import { filterRestaurants } from './../../services/api/restaurantAPI'

export default function Filter({ show, handleClose, setrestaurantTable, setIsLoading }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData(e.target);
            const data = await filterRestaurants(formData);
            setrestaurantTable(data);
            setIsLoading(false);
            handleClose();
        } catch (error) {
            console.log('Error al enviar los datos:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Filtro avanzado</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="restaurant_locate">
                        <Form.Label>Ubicación</Form.Label>
                        <Form.Control type="text" name="restaurant_locate" />
                    </Form.Group>
                    <Form.Group controlId="restaurant_food">
                        <Form.Label>Tipo de comida</Form.Label>
                        <Form.Control type="text" name="restaurant_food" />
                    </Form.Group>
                    <Form.Group controlId="restaurant_score">
                        <Form.Label>Calificación</Form.Label>
                        <Form.Control type="number" name="restaurant_score" min={0} max={5} step={0.1} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type='submit'>
                        Buscar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}