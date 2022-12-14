
import React from "react";

const CardPlatillo = (props)=>{
    return(
        <div className="card_platillo">
            <div className="card_cont_img">
                <img src={props.base_64} onClick={props.click} />
            </div>
            <div className="card_cont_info">
                <h3>{props.nombre}</h3>
                <p>{props.descripcion}</p>
                <p>{props.categoria}</p>
                <div>
                    <span>{props.precio}</span>
                </div>
                
            </div>
        </div>
    );
}

export default CardPlatillo;