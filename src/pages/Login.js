import React from "react";
import '../css/css_pages/Login.css'
import logo from '../img/logo.svg';
import axios from "axios";
import Cookies from "universal-cookie";
import usuariosPeticiones from "../peticiones/usuariosPeticiones";

const cookies = new Cookies();
const peticiones = new usuariosPeticiones();

class Login extends React.Component{

    constructor() {
        super();
        this.state = {
        };   
    }


    iniciarSesion = async (e)=>{
        e.preventDefault();
        const user= document.getElementById('lg_user').value;
        const pass= document.getElementById('lg_pass').value;
        console.log(user,pass);
        let mensaje = await peticiones.login(user,pass);
        if(cookies.get('id')){
            window.location.href = './inicio';
        }else{
            document.getElementById('text_mensaje').textContent = mensaje;
        }
       
    }

    componentDidMount(){
        if(cookies.get('id')){
            window.location.href = './inicio';
        }
    }


    render(){
        return(
            <>
            <div className="cont_login">
                <div className="login">
                    <div className="titulo_login">
                        {/* <img src={logo} alt="" /> */}
                        <h1>LA BISTCA - sistema de administracion </h1>
                    </div>
                    <div className="form_login">
                        <div>
                            <label htmlFor="lg_user">Usuario</label>
                            <input type="text" placeholder="Usuario" id="lg_user" name="usuario"/>
                            <label htmlFor="lg_pass">Contraseña</label>
                            <input type="password" id="lg_pass" placeholder="Contraseña" name="password"/>
                            <button onClick={this.iniciarSesion}>
                                Ingresar
                            </button>
                            <p id="text_mensaje" className="text_mensaje"></p>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }

}


export default Login;