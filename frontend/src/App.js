import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { ButtonGroup, Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/App.css';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
				<Container fluid>
					<Navbar.Brand href="/">Restaurantes</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse className="justify-content-end">
						{
						<Form className="d-flex">
							<FormControl
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
							/>
							<Button variant="outline-success">Search</Button>
						</Form>
						}
					</Navbar.Collapse>
				</Container>
			</Navbar>
            <div className="App">
                <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
