import React from "react";
import Cookies from "universal-cookie";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import CardPlatillo from "../components/CardPlatillo";
import platillosPeticiones from "../peticiones/platillosPeticiones";
  

const cookies = new Cookies();
const peticiones = new platillosPeticiones();

let info_platillos = [];

class VerPlatillos extends React.Component {

    constructor(){
        super();
        this.state = {
            platillos : {
                data : []
            },
            card: {
                id_platillo: 0,
                id_categoria: 0,
                nombre: 'Nombre del platillo',
                descripcion: 'breve descripcion del platillo, no muy larga para no abrumar',
                categoria: 'carne',
                precio: 12.50,
                base_64: ""
            }
        };
    }

    async traerPlatillos(){
        info_platillos = await peticiones.find();
        console.log(info_platillos);
        await this.setState({
            platillos : {
                data : info_platillos
            }
        });
    }

    abrirModalPlatillo = (platillo)=>{
        this.setState({
            card: {
                id_platillo: platillo.id_platillo,
                id_categoria : platillo.id_categoria,
                nombre: platillo.nombre,
                descripcion: platillo.descripcion,
                categoria: platillo.categoria,
                precio: platillo.precio,
                base_64: platillo.foto
            }
        });
        document.getElementById('pop_up_plaillo').showModal();
    }

    eliminarPlatillo = async (e) =>{
        console.log(`vamos a eliminar el platillo con el id = ${this.state.card.id_platillo}`);
        let respuesta = await peticiones.delete(this.state.card.id_platillo);
        if(respuesta){
            document.getElementById('pop_up_plaillo').close();
            this.traerPlatillos();
        }else{
            document.getElementById('text_mensaje_pop').textContent = "error en la eliminacion";
            setTimeout(()=>{
                document.getElementById('text_mensaje_pop').textContent = "";
            },4000);
        }
    }
    
    componentDidMount() {
        if (!cookies.get('id')) {
            window.location.href = '/';
        }
        this.traerPlatillos();
    }
  
    render() {
        return (
            <>
            <div>
                <h1>
                    Modificar Platillos
                </h1>
                <div>
                    {
                        this.state.platillos.data.map((p) => 
                            <CardPlatillo 
                                key = {p.id_platillo}
                                nombre = {p.nombre} 
                                descripcion = {p.descripcion}
                                categoria = {p.categoria}
                                precio = {p.precio}
                                base_64 = {p.foto}
                                click = {()=>this.abrirModalPlatillo(p)}
                            />
                        )
                    }
                </div>
            </div>
            <dialog id="pop_up_plaillo">
                <div onClick={()=>document.getElementById('pop_up_plaillo').close()}>X</div>
                <CardPlatillo 
                    nombre={this.state.card.nombre}
                    descripcion={this.state.card.descripcion}
                    categoria={this.state.card.categoria}
                    precio = {this.state.card.precio}
                    base_64 = {this.state.card.base_64}
                />
                <div>
                    <div>
                        <NavLink to={`/platillo/${this.state.card.id_platillo}`}>Actualizar</NavLink>
                    </div>
                    <button onClick={this.eliminarPlatillo}>Eliminar</button>
                    <p id="text_mensaje_pop"></p>
                </div>
            </dialog>
            </>
        );
    }

}


export default VerPlatillos;