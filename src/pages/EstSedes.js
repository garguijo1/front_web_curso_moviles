import React from "react";
import Cookies from "universal-cookie";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

import BarChart from "../components/BarChart";

const cookies = new Cookies();

const scores = [1500,1259,1003];
const labels = ["Miraflores","San Isidro","La Molina"];

class EstSede extends React.Component {

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
                    HOLA DESDE LAS ESTADISTICAS DE LAS SEDES
                </h1>
                <BarChart labels={labels} scores={scores} />

            </div>
        );
    }

}


export default EstSede;