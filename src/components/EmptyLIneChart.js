import { ResponsiveLine } from '@nivo/line';
import { tempemptydata as data } from '../data/emptyData';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const EmptyLineChart = ({props}) => {
    return (<ResponsiveLine
        data={data}
        theme={{
            axis: {
              domain: {
                line: {
                  stroke: '#5F5B5B',
                },
              },
              legend: {
                text: {
                  fill: '#5F5B5B',
                  fontFamily: 'Poppins'
                },
              },
              ticks: {
                line: {
                  stroke:'#5F5B5B',
                  strokeWidth: 1,
                },
                text: {
                  fill: '#5F5B5B',
                  fontFamily: 'Poppins'
                },
              },
            },
            legends: {
              text: {
                fill: '#5F5B5B',
                fontFamily: 'Poppins'
              },
            },
            tooltip: {
              container: {
                color: '#5F5B5B',
              },
            },
          }}
        colors={'#388E3C'}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
    /> )
}


export default EmptyLineChart;