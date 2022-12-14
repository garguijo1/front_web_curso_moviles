import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const config = {
    headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
    },
};

class usuariosPeticiones{
    constructor(){

    }

    login = async (user,pass) =>{
        await axios.post(`${process.env.REACT_APP_API_URL}/v1/usuarios/login`,{
            usuario : user,
            pass: pass
        })
        .then(res =>{
            if (res.data) {
                return res.data;
            }else {
                console.log('error en la peticion');
            }
        })
        .then(res=>{
            console.log(res.data);
            if (res.data) {
                console.log("informacion: ",res.data);            
                cookies.set('id',res.data.id_usuario,{path:'/'});
                cookies.set('nombre',res.data.nombre,{path:'/'});
                cookies.set('rol',res.data.id_rol,{path:'/'});
                cookies.set('sede',res.data.id_sede,{path:'/'});
                cookies.set('token',res.data.token,{path:'/'});
            }else {
                console.log('usuario o contraseña incorrecta');
            }
        })
        .catch(err =>{
            console.log(err);
        })
    }

    deslogin = async (id)=>{
        let respuesta;
        await axios.put(`${process.env.REACT_APP_API_URL}/v1/usuarios/deslogin/${id}`, {
            accion: 17,
        }, config)
            .then(res => {
                console.log(res);
                respuesta = res.data;
                if(res.data.estado){
                    // console.log("informacion: ",res.data);            
                    cookies.remove('id',{path:'/'});
                    cookies.remove('nombre',{path:'/'});
                    cookies.remove('rol',{path:'/'});
                    cookies.remove('sede',{path:'/'});
                    cookies.remove('token',{path:'/'});
                }
            })
            .catch(err => {
                console.log(err);
                respuesta =  err;
            })
        return respuesta;
    }

    menu = async (rol)=>{
        let respuesta;
        await axios.get(`${process.env.REACT_APP_API_URL}/v1/usuarios/menu/${rol}?accion=19`,config)
        .then(res =>{
            if (res.data) {return res.data;
            }else { console.log('error en la peticion');}
        })
        .then(res=>{
            respuesta = res
            console.log(res);
        })
        .catch(err =>{
            console.log(err);
        });
        return respuesta
    }

    create = async (data) =>{
        let respuesta;
        await axios.post(`${process.env.REACT_APP_API_URL}/v1/usuarios/add`,{
            accion : 8,
            usuario: data.usuario,
            pass : data.pass,
            nombre: data.nombres,
            apellido: data.apellidos,
            id_rol: 1,
            id_sede: parseInt(data.id_sede)
        },config)
        .then(res =>{
            if (res.data) {
               return res.data;
            }else {
                console.log('error en la peticion');
            }
        })
        .then(res =>{
            respuesta = res.data
        })
        .catch(err =>{
            console.log(err);
        });

        return respuesta;

    }

}

export default usuariosPeticiones;