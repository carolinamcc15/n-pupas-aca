import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { formatDate } from 'utils/utils';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const isHour = typeof data[0].time === 'number';

  useEffect(() => {
    console.log(data);
    const timeLabels = data.map(item => {
      return isHour ? `${item.time}:00` : formatDate(new Date(item.date));
    });
    const totalData = data.map(item => item.total);

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: isHour ? 'Hora' : 'Fecha',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Total',
          },
        },
      },
    };

    const lineChart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: 'Total',
            data: totalData,
            fill: false,
            borderColor: '#4A3957',
            tension: 0.1,
          },
        ],
      },
      options: chartOptions,
    });

    // Cleanup on unmount
    return () => {
      lineChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
