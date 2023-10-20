import { useContext } from "react";
import { GraphContext } from "../context/GraphContext";
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'

export default function Graph(){

  const {interactionsData} = useContext(GraphContext);

  const data = {
    labels: interactionsData.map((data) => data.name),
    datasets: [
      {
        label: '% of interactions',
        data: interactionsData.map((data) => data.count),
        backgroundColor: [
          "#426EE1"
        ],
        borderColor: "black",
        borderWidth: .8,
      },
    ]
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks:{
          color: "#717380",
        }
      },
      y: {
        display: true,
        grid: {
          display: true
        },
        ticks: {
          display: true,
          color: "#717380",
        },
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    }
  }

  console.log(interactionsData);
  return(
    <div className="bar-chart-container">
      <h1>Dashboard</h1>
      <div className="bar-chart">
        <h3>Sector interaction</h3>
        <Bar data ={data}  options={options} ></Bar>
      </div>
    </div>
  )
}
