import React from "react";
import Cookies from "universal-cookie";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import LineChart from "../components/LineChart";

const cookies = new Cookies();

class EstReservas extends React.Component {

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
                    HOLA DESDE LAS ESTADISTICAS DE RESERVACIONES
                </h1>
                <LineChart />
            </div>
        );
    }

}


export default EstReservas;