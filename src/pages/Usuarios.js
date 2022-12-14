import React from "react";
import Cookies from "universal-cookie";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import sedesPeticiones from "../peticiones/sedesPeticiones";
import usuariosPeticiones from "../peticiones/usuariosPeticiones";

const cookies = new Cookies();

const peticiones = new usuariosPeticiones();
const peticionesSedes = new sedesPeticiones();

class Usuarios extends React.Component {

    constructor(){
        super();
        this.state = {
            sedes : {
                data : []
            }
        };
    }

    async traerSedes(){
        let info_sedes = await peticionesSedes.find();
        console.log(info_sedes);
        await this.setState({
            sedes : {
                data : info_sedes
            }
        });
    }

    async guardarUsuario(){
        let usuario = {
            nombres : document.getElementById('user-name').value,
            apellidos : document.getElementById('user-apellidos').value,
            usuario : document.getElementById('user-usuario').value,
            pass : document.getElementById('user-pass').value,
            id_sede : document.getElementById('user-sede').value,
        }
        // console.log(usuario);
        let respuesta = await peticiones.create(usuario);
        // console.log(respuesta);
        if(respuesta){
            document.getElementById('user-name').value = ""
            document.getElementById('user-apellidos').value = ""
            document.getElementById('user-usuario').value = ""
            document.getElementById('user-pass').value = ""
            document.getElementById("user-sede").selectedIndex = "0";

            document.getElementById('text-mensaje').textContent = "usuario creado correctamente"
        }else{
            document.getElementById('text-mensaje').textContent = "error en la creacion del usuario"

        }

        setTimeout(()=>{
            document.getElementById('text-mensaje').textContent = ""
        },4000);


    }



    componentDidMount() {
        if (!cookies.get('id')) window.location.href = '/';
        this.traerSedes();
    }

  
    render() {
        return (
            <div>
                <h1>
                    Registrar Usuario Administrador
                </h1>
                <div>
                    <div>
                        <label htmlFor="user-name">Nombres</label>
                        <input type="text" id="user-name"></input>
                    </div>
                    <div>
                        <label htmlFor="user-apellidos">Apellidos</label>
                        <input type="text" id="user-apellidos"></input>
                    </div>
                    <div>
                        <label htmlFor="user-usuario">Usuario</label>
                        <input type="text" id="user-usuario"></input>
                    </div>
                    <div>
                        <label htmlFor="user-pass">Contraseña</label>
                        <input type="password" id="user-pass"></input>
                    </div>
                    <div>
                        <label htmlFor="user-sede">sede</label>
                        <select id="user-sede">
                            {this.state.sedes.data.map(s => 
                                    <option
                                        key = {s.id_sede}
                                        value = {s.id_sede}
                                    >
                                        {s.sede}
                                    </option>
                                )}
                        </select>
                    </div>
                    <div>
                        <button onClick={this.guardarUsuario}>Guardar</button>
                        <p id="text-mensaje"></p>
                    </div>
                    
                </div>
            </div>
        );
    }

}


export default Usuarios;