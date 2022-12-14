import React from "react";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
import usuariosPeticiones from "../peticiones/usuariosPeticiones";


const peticiones = new usuariosPeticiones();

const cookies = new Cookies();

const ItemMenu = (props) => {
    console.log(props);
    return(
        <li className="li_navbar">
            <NavLink to={props.url}>
                {props.texto}
            </NavLink>
        </li>
    );
}

class Inicio extends React.Component {

    constructor(){
        super();
        this.state = {
            menu : {
                data : [ ]
            }
        };
    }

    cerrarSesion = async (e) => {
        e.preventDefault();
        const res = await peticiones.deslogin(cookies.get('id'));
        console.log(res);
        if(res.estado){
            window.location.href = '/';
        }else{
            document.getElementById('text_mensaje').textContent = "error en el cierre de sesion"
        }
    }

    async traerMenu(){
        let res_menu = await peticiones.menu(cookies.get('rol'));
        console.log(res_menu);
        await this.setState({
            menu : {
                data : res_menu
            }
        })
    }

    async componentDidMount() {
        if (!cookies.get('id')) {
            window.location.href = '/';
        }
        await this.traerMenu();
        console.log(this.state.menu.data);
    }

  
    render() {
        return (
            <nav className="navbar">
                <ul className="list_link_navbar">
                    {this.state.menu.data.map(m => 
                            <ItemMenu  
                                key = {m.id_menu}
                                url = {m.url}
                                texto = {m.texto}
                            />
                        )}
                    <li className="li_navbar">
                        <a href="#" onClick={this.cerrarSesion}>Cerrar Sesion</a>
                    </li>
                </ul>
                <p id="text_mensaje"></p>
            </nav>
        );
    }

}


export default Inicio;