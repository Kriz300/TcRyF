//Basic imports
import { Link } from 'react-router-dom';
import '../css/NotFound.css'

//404
export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>Oops! Página no encontrada.</p>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
}