import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const scores = [180,79,250,103,160,96,126,206];
const labels = ["Platillo 1","Platillo 2","Platillo 3","Platillo 4","Platillo 5","Platillo 6","Platillo 7","Platillo 8"];

const options = {
    fill : true,
    responsive : true,
    scale : {
        y : {
            min : 0,
        },
    },
    plugins : {
        legend : {
            display : true,
        }
    }
}


export default function BarChart(props){
    const data = useMemo(function(){
        return {
            datasets : [
                {
                    label : "Reservaciones por mes",
                    data : props.scores,
                    tension: 0.3,
                    borderColor : "rgb(176,49,49)",
                    backgroundColor : "rgba(176,49,49,0.2)",
                    borderWidth: 1
                }
            ],
            labels : props.labels
        }
    }, []);

    return <Bar data={data} options={options} />
}