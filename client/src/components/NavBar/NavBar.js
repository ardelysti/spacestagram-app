import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";

import brand from '../../assets/images/brand.svg';

import './NavBar.css';

const NavBar = () => {

    return (
        <Navbar className="sticky-nav color-nav" variant="dark" sticky="top">
            <Container className="justify-content-center">
                <Nav>
                    <Navbar.Brand className="align-middle brand">
                        <img
                            src={brand}
                            alt="spacestagram-logo"
                        />
                        <a href="https://www.linkedin.com/in/ardelysti-kardi/"
                            target="_blank"
                            rel="noopener noreferrer">
                            By Ardelysti Kardi
                        </a>
                    </Navbar.Brand>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;