import {React, useContext} from "react";
import { ConfigContext } from "./Dashboard";


const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

const BubblesTooltip = props => {
    // Contexto para el encabezado de las variables
    const { config } = useContext(ConfigContext);
    const { active, payload } = props;
    if (active) {
        const itemData = payload && payload.length ? payload[0].payload : null;
        return (
            <div className="date-tooltip p-2">
                {(itemData.tipo === "Datos regulares") ?
                    <p className="m-1" style={{ color: grisNormal }}>
                        <b>Datos regulares: {itemData.count}</b>
                    </p>
                    :
                    <p className="m-1" style={{ color: naranjaAnomalia }}>
                        <b>Anomalías: {itemData.count}</b>
                    </p>
                }
                <p className="m-1"><b>{config["filtro_g6_1"]}</b></p>
                <p className="m-1"><li>{itemData.v1}</li></p>
                <p className="m-1"><b>{config["filtro_g6_2"]}</b></p>
                <p className="m-1"><li>{itemData.v2}</li></p>
                
            </div>
        );
    }

    return null;
};

export default BubblesTooltip;