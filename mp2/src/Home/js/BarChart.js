import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const BarChart = ({ grade1, grade2, grade3, grade4, grade5, grade6 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',],
        datasets: [
          {
            label: 'Number of Students',
            data: [grade1, grade2, grade3, grade4, grade5, grade6],
            backgroundColor: ['#3498db', '#2e86c1', '#27ae60', '#16a085', '#7cc23a', '#27ae60'],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [grade1, grade2, grade3, grade4, grade5, grade6]);

  return <canvas ref={chartRef} width="400" height="110" />;
};

export default BarChart;
