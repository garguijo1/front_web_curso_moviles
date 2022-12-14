import React from "react";
import Cookies from "universal-cookie";
import platillosPeticiones from "../peticiones/platillosPeticiones";
import categoriasPeticiones from "../peticiones/categoriasPeticiones";
import CardPlatillo from "../components/CardPlatillo";
import { useParams } from 'react-router-dom';



function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}
  

const cookies = new Cookies();
const peticiones = new platillosPeticiones ();
const peticionesCategorias = new categoriasPeticiones ();


class Platillos extends React.Component {

    constructor(){
        super();
        this.state = {
            card: {
                nombre: "nombre del platillo",
                descripcion: 'breve descripcion del platillo, no muy larga para no abrumar',
                categoria: 'carnes',
                precio: "SS.CC",
                base_64: ""
            } 
        };

        this.capturarCambios = this.capturarCambios.bind(this);
        this.capturarImagen = this.capturarImagen.bind(this);
        this.capturarCategoria= this.capturarCategoria.bind(this);
      
    }

    async traerCategorias(){
        let info_categorias = await peticionesCategorias.find();

        const categorias = document.createDocumentFragment();
        info_categorias.forEach(i =>{
            let opt = document.createElement('option');
            opt.value = i.id_categoria;
            opt.textContent = i.categoria;
            opt.classList.add('opt-categoria')
            categorias.append(opt);
        })
        document.getElementById('plat-categoria').append(categorias);   

    }

    async capturarCambios(e){
        await this.setState({
            card:{
                ...this.state.card,
                [e.target.name]: e.target.value
            }
        });
    }

    async capturarCategoria(e){
        await this.setState({
            card:{
                ...this.state.card,
                [e.target.name]: e.target.selectedOptions[0].textContent
            }
        });
    }


    async capturarImagen(e){
        if(e.target.files[0]){
            let img =  e.target.files[0];
            let fileReader = new FileReader(); //declaramos el objeto 
            fileReader.readAsDataURL(img); //leemos la imagen
            fileReader.onload = ()=>{
                this.setState({
                    card:{
                        ...this.state.card,
                        base_64: fileReader.result
                    }
                });
            }
        }else{
            console.log('salio indefinido');
        }
    }

    async traerInfoPlatillo(){
        let { id } = this.props.params;
        if(id != 0){
            let infoPlatillo = await peticiones.findOne(id);
            await this.setState({
                card: {
                    nombre: infoPlatillo[0].nombre,
                    descripcion: infoPlatillo[0].descripcion,
                    categoria: infoPlatillo[0].categoria,
                    precio: infoPlatillo[0].precio,
                    base_64: infoPlatillo[0].foto
                }
            });

            document.getElementById('plat-nombre').value = infoPlatillo[0].nombre;
            document.getElementById('plat-precio').value = infoPlatillo[0].precio;
            document.getElementById('plat-desc').value = infoPlatillo[0].descripcion;

            const categorias = [...document.querySelectorAll('.opt-categoria')];
            categorias.forEach(c => {
                console.log(c.value,infoPlatillo[0].id_categoria);
                if(c.value == infoPlatillo[0].id_categoria ){
                    c.setAttribute('selected',true)
                }
            })

        }
        
        
    }

    gestionarBoton = async ()=>{
        let { id } = this.props.params;
        let platillo  = {
            nombre: this.state.card.nombre,
            descripcion: this.state.card.descripcion,
            categoria: document.getElementById('plat-categoria').value,
            precio: this.state.card.precio,
            base_64: this.state.card.base_64,
        }

        if(id == 0){
            await this.guardarPlatillo(platillo);
        }else{
            await this.actualizarPlatillo(id,platillo);
        }


    }



    actualizarPlatillo = async (id,platillo) =>{
        let resultado = await peticiones.update(platillo,id);
        let mensaje = ""
        if(resultado){
            mensaje = "platillo actualizado exitosamente";
        }else{
            mensaje = "error en la actulizacion del platillo";
            
        }

        document.getElementById('text_mensaje').textContent=mensaje;
        setTimeout(()=>{
            document.getElementById('text_mensaje').textContent="";
        },4000)
    }

    guardarPlatillo = async (platillo)=>{
        let resultado = await peticiones.create(platillo);
        let mensaje = ""
        if(resultado.data){
            this.setState({
                card: {
                    nombre: 'Nombre del platillo',
                    descripcion: 'breve descripcion del platillo, no muy larga para no abrumar',
                    categoria: 'carnes',
                    precio: "SS.CC",
                    base_64: ""
                }
            });
            mensaje = "platillo creado exitosamente";
        }else{
            mensaje = "error en la creacion del platillo";
            
        }

        document.getElementById('text_mensaje').textContent=mensaje;
        setTimeout(()=>{
            document.getElementById('text_mensaje').textContent="";
        },4000)
    
    }

    async componentDidMount() {
        if (!cookies.get('id')) window.location.href = '/';
        this.traerCategorias();
        await this.traerInfoPlatillo();
    }

  
    render() {
        return (
            <div>
                <div>
                    <h1> Registrar un platillo </h1>
                        <div>
                            <label htmlFor="plat-nombre">Nombre del platillo</label>
                            <input type="text" placeholder="nombre" id="plat-nombre" name="nombre" onChange={this.capturarCambios}></input>
                        </div>
                        <div>
                            <label htmlFor="plat-precio">Precio del platillo</label>
                            <input type="text" placeholder="12.50" id="plat-precio" name="precio" onChange={this.capturarCambios}></input>
                        </div>
                        <div>
                            <label htmlFor="plat-categoria">Categoria</label>
                            <select id="plat-categoria" name="categoria" onChange={this.capturarCategoria}>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="plat-desc">descripcion del platillo</label>
                            <textarea  placeholder="descripcion" id="plat-desc" name="descripcion" onChange={this.capturarCambios}></textarea>
                        </div>
                        <div>
                            <label htmlFor="plat-img">Imagen del platillo</label>
                            <input type="file" placeholder="12.50" id="plat-img" name="base_64" onChange={this.capturarImagen}></input>
                        </div>
                        <button onClick={ this.gestionarBoton }>Guardar</button>
                        <p id="text_mensaje"></p>
                        
                
                </div>
                <div>
                    <CardPlatillo 
                        nombre={this.state.card.nombre}
                        descripcion={this.state.card.descripcion}
                        categoria={this.state.card.categoria}
                        precio = {this.state.card.precio}
                        base_64 = {this.state.card.base_64}
                    />
                </div>
            </div>
        );
    }

}


export default withParams(Platillos);