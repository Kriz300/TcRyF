import { Modal, Button, Form } from 'react-bootstrap';

//Components
import { putRestaurants } from './../../services/api/restaurantAPI'

export default function EditLine({ show, restaurantData, handleClose }) {
    if (!restaurantData) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const visitedValue = formData.get('restaurant_visited') ? 1 : 0;
            formData.set('restaurant_visited', visitedValue);
            await putRestaurants(formData);
            window.location.reload();
        } catch (error) {
            console.log('Error al enviar los datos:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <input type="hidden" name="restaurant_id" value={restaurantData[0]} />
                    <Form.Group controlId="restaurant_name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="restaurant_name" defaultValue={restaurantData[1]} />
                    </Form.Group>
                    <Form.Group controlId="restaurant_locate">
                        <Form.Label>Ubicación</Form.Label>
                        <Form.Control type="text" name="restaurant_locate" defaultValue={restaurantData[2]} />
                    </Form.Group>
                    <Form.Group controlId="restaurant_food">
                        <Form.Label>Tipo de comida</Form.Label>
                        <Form.Control type="text" name="restaurant_food" defaultValue={restaurantData[3]} />
                    </Form.Group>
                    <Form.Group controlId="restaurant_score">
                        <Form.Label>Calificación</Form.Label>
                        <Form.Control type="number" name="restaurant_score" min={0} max={5} step={0.1} defaultValue={restaurantData[4]} />
                    </Form.Group>
                    <Form.Group controlId="restaurant_visited">
                        <Form.Check type="checkbox" label="Visitado" name="restaurant_visited" defaultChecked={restaurantData[5] === 1} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type='submit'>
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}