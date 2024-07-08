import React, { useEffect, useState } from 'react';
import 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { useSurveyStore } from '../../store';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export default function BarChart() {
  const responses = useSurveyStore((state) => state.responses);
  const [barData, setBarData] = useState({ labels: [], datasets: [] });
  const translations = {
    advice: "לייעץ לסטארטאפים",
    collaboration: 'רעיון לשת"פ',
    contentEvents: "להשתתף בתוכן ובאירועים",
    entrepreneur: "יזמ/ת בנשמה",
    firstJob: "בחיפוש עבודה ראשונה בהייטק",
    founder: "פאונדר/ית בסטארטאפ",
    investor: "מועדון האנג'לים",
    lecture: "להעביר הרצאה",
    networking: "להכיר אנשים חכמים",
    nextJob: "מחפש/ת את התפקיד הבא",
    promoteTechArea: "קידום הייטק באזור",
    promoteWomenTech: "קידום נשים בהייטק",
    recruiting: "מחפש/ת עובדים/ות",
    resume: "להעביר קורות חיים למשרות רלוונטיות",
    startup: "להקים לסטארטאפ",
    teenagers: "לחשוף נוער להייטק",
  };

  useEffect(() => {
    const booleanFields = [
      'advice', 'collaboration', 'contentEvents', 'entrepreneur', 'firstJob',
      'founder', 'investor', 'lecture', 'networking', 'nextJob',
      'promoteTechArea', 'promoteWomenTech', 'recruiting', 'resume', 'startup', 'teenagers'
    ];

    const booleanCounts = booleanFields.reduce((acc, field) => {
      acc[field] = 0;
      return acc;
    }, {});

    responses.forEach(response => {
      booleanFields.forEach(field => {
        if (response[field]) {
          booleanCounts[field] += 1;
        }
      });
    });

    const sortedBooleanCounts = Object.entries(booleanCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    const labels = sortedBooleanCounts.map(([field]) => translations[field] || field);
    const counts = sortedBooleanCounts.map(([, count]) => count);
    const backgroundColors = ['#fff', '#007072', '#83e1d1', '#90e702'];

    setBarData({
      labels: labels,
      datasets: [
        {
          label: 'Count',
          data: counts,
          backgroundColor: backgroundColors,
          borderColor: '#07161b',
          borderWidth: 1,
        },
      ],
    });
  }, [responses]);

  return (
    <Bar
      data={barData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: '',
            font: {
              size: 18,
            },
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            color: '#fff', // צבע לבן לתוויות
            font: {
              size: 18, // גודל הפונט של התוויות
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff', // צבע לבן לציר ה-y
              font: {
                size: 10, // גודל הפונט של התוויות בציר ה-y
                
              },
            },
          },
          x: {
            ticks: {
              color: '#fff', // צבע לבן לציר ה-x
              font: {
                size: 18, // גודל הפונט של התוויות בציר ה-x
              },
            },
          },
        },
      }}
    />
  );
}
