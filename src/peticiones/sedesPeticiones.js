import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const config = {
    headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
    },
};

class sedesPeticiones{
    constructor(){

    }

    find = async () =>{
        let informacion = []
        await axios.get(`${process.env.REACT_APP_API_URL}/v1/sedes?accion=20`,config)
        .then(res =>{
            if (res.data) {return res.data;
            }else { console.log('error en la peticion');}
        })
        .then(res=>{
            informacion = res.datos;
        })
        .catch(err =>{
            console.log(err);
        });

        return informacion;
    }

}

export default sedesPeticiones;