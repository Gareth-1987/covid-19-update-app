import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(161, 20, 20, 0.952)', 'rgba(6, 9, 201, 0.925)', 'rgba(8, 8, 8, 0.801)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: 'rgba(161, 20, 20, 0.952)',
            backgroundColor: 'rgba(8, 8, 8, 0.099)',
            fill: true,
          }, /*{
            data: dailyData.map((data) => data.recovered),
            label: 'Recovered',
            borderColor: 'rgba(8, 11, 172, 0.856)',
            fill: true,
          },*/ {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'rgba(8, 8, 8, 0.801)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;
