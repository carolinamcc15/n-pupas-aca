import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { generateRandomColors } from 'utils/utils';

const RingChart = ({ data = [] }) => {
  console.log(data);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const chartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    };

    const chartConfig = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: data?.map(item => item.total),
            backgroundColor: generateRandomColors(data.length),
          },
        ],
        labels: data?.map(item => item.title),
      },
      options: chartOptions,
    };

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, chartConfig);

    return () => {
      chartInstanceRef.current.destroy();
    };
  }, [data]);

  return (
    <div className='flex m-auto h-[130px]'>
      <canvas ref={chartRef} className='flex-1' />
    </div>
  );
};

export default RingChart;
