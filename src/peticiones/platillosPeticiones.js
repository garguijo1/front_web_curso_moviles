import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const config = {
    headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
    },
};

class platillosPeticiones{
    constructor(){

    }

    find = async () =>{
        let respuesta;
        await axios.get(`${process.env.REACT_APP_API_URL}/v1/platillos?accion=5`,config)
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

    findOne = async (id) =>{
        let respuesta ;
        await axios.get(`${process.env.REACT_APP_API_URL}/v1/platillos/${id}?accion=5`,config)
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

    create = async (data)=>{
        let respuesta;
        await axios.post(`${process.env.REACT_APP_API_URL}/v1/platillos/add`,{
            accion : 4,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            foto: data.base_64,
            id_categoria : parseInt(data.categoria)
        }
        ,config)
        .then(res=>{
            respuesta = res.data;
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

        return respuesta
    }

    update = async (data,id) =>{
        let respuesta;
        await axios.put(`${process.env.REACT_APP_API_URL}/v1/platillos/${id}`, {
            accion : 6,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            id_categoria : parseInt(data.categoria),
            foto: data.base_64
        }, config)
            .then(res => {
                console.log(res);
                respuesta = res.data;
            })
            .catch(err => {
                console.log(err);
                respuesta =  err;
            })
        return respuesta;
    }

    delete = async (id) => {
        let respuesta ;
        await axios.delete(`${process.env.REACT_APP_API_URL}/v1/platillos/${id}?accion=7`,config)
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

    

}

export default platillosPeticiones;