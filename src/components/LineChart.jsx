import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const scores = [6,5,5,3,4,6,4,5];
const labels = ["uno","dos","tres","cuatro","cinco","seis","siete","ocho"];

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


export default function LineChart(){
    const data = useMemo(function(){
        return {
            datasets : [
                {
                    label : "Reservaciones por mes",
                    data : scores,
                    tension: 0.3,
                    borderColor : "rgb(75,192,192)",
                    pointRadius : 4,
                    pointBackgroundColor : "rgb(75,192,192)",
                    backgroundColor : "rgba(75,192,192,0.3)",
                }
            ],
            labels
        }
    }, []);

    return <Line data={data} options={options} />
}