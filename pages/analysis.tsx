import type { NextPage } from "next";
import { LineChart, Line } from "recharts";
import { Navbar } from "../components/navbar";

const Analysis: NextPage = () => {
  const data = [
    { name: "Page A", uv: 0, pv: 0, amt: 2400 },
    { name: "Page B", uv: 400, pv: 0, amt: 2400 },
    { name: "Page C", uv: 500, pv: 0, amt: 2400 },
  ];

  return (
    <div>
      <Navbar />
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Analysis;
