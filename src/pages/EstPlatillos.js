import React from "react";
import Cookies from "universal-cookie";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import BarChart from "../components/BarChart";

const cookies = new Cookies();

const scores = [180,79,250,103,160,96,126,206];
const labels = ["Platillo 1","Platillo 2","Platillo 3","Platillo 4","Platillo 5","Platillo 6","Platillo 7","Platillo 8"];

class EstPlatillos extends React.Component {

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
                    HOLA DESDE LAS ESTADISTICAS DE PLATILLOS
                </h1>
                <BarChart labels={labels} scores={scores} />
            </div>
        );
    }

}


export default EstPlatillos;