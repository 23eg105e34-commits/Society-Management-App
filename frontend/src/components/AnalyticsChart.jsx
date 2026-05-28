import {

  Chart as ChartJS,

  ArcElement,

  Tooltip,

  Legend

} from "chart.js";

import { Pie }
from "react-chartjs-2";


// REGISTER CHART
ChartJS.register(

  ArcElement,

  Tooltip,

  Legend
);


function AnalyticsChart({

  paidPayments,

  pendingPayments

}) {

  // DATA
  const data = {

    labels: [

      "Paid Payments",

      "Pending Payments"
    ],

    datasets: [

      {

        data: [

          paidPayments,

          pendingPayments
        ],

        backgroundColor: [

          "#22c55e",

          "#ef4444"
        ],

        borderWidth: 1
      }
    ]
  };



  // OPTIONS
  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        position: "bottom"
      },



      title: {

        display: true,

        text:
          "Payments Overview",

        font: {

          size: 20
        }
      }
    }
  };


  return (

    <div className="bg-white p-6 rounded-lg shadow-md mt-10">

      <div className="w-full h- [400px] flex justify-center">

        <Pie
          data={data}
          options={options}
        />

      </div>

    </div>
  );
}

export default AnalyticsChart;