import React from "react";
import Cookies from "universal-cookie";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

const cookies = new Cookies();

class Reservaciones extends React.Component {

    cerrarSesion(e) {
        e.preventDefault();
    }

    componentDidMount() {
        if (!cookies.get('id')) {
            window.location.href = '/';
        }
    }

  
    render() {
        return (
            <div>
                <h1>
                    HOLA DESDE RESERVACIONES
                </h1>
            </div>
        );
    }

}


export default Reservaciones;