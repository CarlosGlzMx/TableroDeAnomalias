import React from "react";

const [grisNormal, naranjaAnomalia] = ['#485458', '#FF9900'];

const DateTooltip = props => {
  const { active, payload } = props;
  if (active) {
    const itemData = payload && payload.length ? payload[0].payload : null;
    return (
      <div className = "date-tooltip p-2">
        <p className="m-1">
          {itemData.Fecha}
        </p>
        <p className="m-1" style={{color: grisNormal}}>
          Registros: {itemData["Registros"]}
        </p>
        <p className="m-1" style={{color: naranjaAnomalia}}>
            Anomalías: {itemData["Anomalías"]}
        </p>
      </div>
    );
  }

  return null;
};

export default DateTooltip;