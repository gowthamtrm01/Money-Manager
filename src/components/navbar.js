import { Navbar, Nav } from 'react-bootstrap';
import React from "react";
import { Link } from "react-router-dom";

const AppNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand ><Link to="/" className="link move" >Money Manager</Link></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link ><Link to="/" className="link">Home</Link></Nav.Link>
                <Nav.Link ><Link to="/about" className="link">About</Link></Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default AppNavbar;