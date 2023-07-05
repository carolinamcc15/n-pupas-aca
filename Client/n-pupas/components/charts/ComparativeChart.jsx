import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ComparativeChartLabel } from 'components/common/ComparativeChartLabel';

const ComparisonChart = ({ data, label, color }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const pastSales = data?.past?.totalSales;
    const presentSales = data?.present?.totalSales;

    const chartOptions = {
      responsive: true,
      scales: {
        y: {
          display: false,
        },
        x: {
          display: false,
        },
      },
      elements: {
        bar: {
          borderRadius: 10,
          with: '20px',
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    const chartData = {
      labels: ['Monto ($)'],
      datasets: [
        {
          backgroundColor: color || '#715884',
          data: [pastSales],
        },
        {
          backgroundColor: color || '#715884',
          data: [presentSales],
        },
      ],
    };

    const ctx = chartRef.current.getContext('2d');

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <div className='grid grid-cols-8 px-1 md:px-2 place-end flex-1'>
      <div className='flex flex-col gap-3 items-center col-span-2'>
        <p className='text-sm px-2 py-0.5 flex flex-col font-semibold bg-gray-200 rounded-full mb-1'>
          Mes anterior
        </p>
        <ComparativeChartLabel
          name='Monto total'
          value={data?.past?.totalSales.toFixed(2)}
          isMoney={true}
        />
        {label && <ComparativeChartLabel name={label} value={data?.past?.salesQuantity} />}
      </div>
      <div className='flex items-end col-span-4'>
        <canvas ref={chartRef}></canvas>
      </div>
      <div className='flex flex-col gap-3 items-center col-span-2'>
        <p className='text-sm px-2 py-0.5 flex flex-col font-semibold bg-gray-200 rounded-full mb-1'>
          Mes actual
        </p>
        <ComparativeChartLabel
          name='Monto total'
          value={data?.present?.totalSales.toFixed(2)}
          isMoney={true}
        />
        {label && <ComparativeChartLabel name={label} value={data?.present?.salesQuantity} />}
      </div>
    </div>
  );
};

export default ComparisonChart;