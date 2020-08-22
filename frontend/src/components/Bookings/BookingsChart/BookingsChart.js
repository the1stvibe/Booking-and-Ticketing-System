import React from 'react';
import { Bar as BarChart } from 'react-chartjs';
import './BookingChart.css'

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 100
  },
  Normal: {
    min: 100,
    max: 200
  },
  Expensive: {
    min: 200,
    max: 10000000
  }
};

const bookingsChart = props => {
  const chartData = { labels: [], datasets: [] };
  let values = [];
  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    values.push(filteredBookingsCount);
    chartData.labels.push(bucket);
    chartData.datasets.push({
      
      fillColor: '#861919',
      strokeColor: '#4169e1',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'black',
      data: values,
      
    });
    values = [...values];
    values[values.length - 1] = 0;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <BarChart data={chartData} 
      width={"700px"} height={"300px"}options={{mainAspectRaio: false}}/>
      <div className="classifiers">
        <p>
          Cheap: 0-100
        </p>
        <p>
          Normal: 101-200
        </p>
        <p>
         Expensive: 201-
        </p>
      </div>
    </div>
  );
};

export default bookingsChart;