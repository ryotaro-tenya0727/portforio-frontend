import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import CircularProgress from '@mui/material/CircularProgress';

ChartJS.register(ArcElement, Tooltip, Legend);

const PolaroidGraph = () => {
  const { useGetRecommendedMembers } = useRecommendedMembersApi();
  const { data: recommendedMembers, isLoading } = useGetRecommendedMembers();
  const polaroidCounts =
    recommendedMembers === undefined
      ? []
      : recommendedMembers
          .filter(
            (member) => member.attributes.total_member_polaroid_count !== 0
          )
          .map((member) => member.attributes.total_member_polaroid_count);

  const sum = polaroidCounts.reduce((a, b = 0) => {
    return a + b;
  }, 0);

  const members =
    recommendedMembers === undefined
      ? []
      : recommendedMembers
          .filter(
            (member) => member.attributes.total_member_polaroid_count !== 0
          )
          .map(
            (member) =>
              `${member.attributes.nickname}: ${
                member.attributes.total_member_polaroid_count
              }枚 (${Math.round(
                (member.attributes.total_member_polaroid_count / sum) * 100
              )}%)`
          );

  const data = {
    labels: members,

    datasets: [
      {
        data: polaroidCounts,
        radius: '90%',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgb(255 , 105 , 180 , 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgb(255 , 105 , 180 , 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    // circumference: Math.PI,
    // rotation: 100 * Math.PI,
    cutout: '80%',
    borderRadius: 20,
    offset: 10,
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10,
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: true,
        labels: {
          padding: 20,
        },
      },
    },
  };

  // legend margin
  const legendMargin = {
    id: 'legendMargin',
    beforeInit(chart) {
      // Get reference to the original fit function
      const originalFit = chart.legend.fit;
      // Override the fit function
      chart.legend.fit = function fit() {
        // Call original function and bind scope in order to use `this` correctly inside it
        originalFit.bind(chart.legend)();
        // Change the height as suggested in another answers
        this.height -= 8;
      };
    },
  };

  // doughnutLabelsLine
  const doughnutLabelsLine = {
    id: 'doughnutLabelsLine',
    afterDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;

      if (window.outerWidth > 810) {
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
            const { x, y } = datapoint.tooltipPosition();
            // ctx.fillStyle = dataset.borderColor[index];
            // ctx.fillRect(x, y, 0, 0);

            // drawline
            const halfwidth = width / 2;
            const halfheight = height / 2;
            const xLine = x >= halfwidth ? x + 40 : x - 40;
            const yLine = y >= halfheight ? y + 35 : y - 35;
            const extraLine = x >= halfwidth ? 20 : -20;

            // line
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(xLine, yLine);
            ctx.lineTo(xLine + extraLine, yLine);
            ctx.strokeStyle = dataset.borderColor[index];
            ctx.stroke();

            // text
            ctx.font = '13px "M PLUS Rounded"';

            // control the position
            const textXPosition = x >= halfwidth ? 'left' : 'right';
            const plusFivePx = x >= halfwidth ? 5 : -5;
            ctx.textAlign = textXPosition;
            ctx.textBaseLine = 'middle';
            ctx.fillStyle = dataset.borderColor[index];
            ctx.fillText(
              chart.data.labels[index],
              xLine + extraLine + plusFivePx,
              yLine + 5
            );
          });
        });
      }
    },
  };
  return (
    <>
      {isLoading ? (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <br />
          <CircularProgress size={130} sx={{ mt: '100px', color: '#ff7bd7' }} />
        </div>
      ) : (
        <>
          {sum === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              現在、総チェキ数は0枚です
            </div>
          ) : (
            <Doughnut
              data={data}
              options={options}
              width={1000}
              height={500}
              plugins={[doughnutLabelsLine, legendMargin]}
            />
          )}
        </>
      )}
    </>
  );
};

export default PolaroidGraph;
