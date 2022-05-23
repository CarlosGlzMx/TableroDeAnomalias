
import {React,useState} from "react";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    Legend
  } from "recharts";

function Chart1() {
    const [data, setData] = useState([{ Datos: "Anomalías", users: 1254 },
      { Datos: "Datos regulares", users: 12536 }])
    const COLORS = ['#fe9000', '#ffba26'];

    const RADIAN = Math.PI / 180;
      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      const title = "Grafica 5";

      return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
  );
};

	return (
		<ResponsiveContainer width="100%" height="100%">
                    <PieChart dataKey="c1data">
                        <Pie
                        data={data}
                        innerRadius={80}
                        outerRadius={120}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        fill= "#fe9000"
                        paddingAngle={5}
                        dataKey="users"
                        wrapperStyle={{ position: 'relative' }}
                        >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                      </Pie>
                    </PieChart>
                    </ResponsiveContainer>
	);
}

export default Chart1;