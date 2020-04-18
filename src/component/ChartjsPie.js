import React, { component } from 'react'
import { Pie } from 'react-chartjs-2'

class ChartjsPie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {
        labels: ['收入', '儲蓄', '支出'],
        datasets: [
          {
            data: [200, 30, 150],
            backgroundColor: [
              'rgba(150,202,202,0.8)',
              'rgba(148,255,150,0.8)',
              'rgba(255,82,82,0.8)',
            ],
          },
        ],
      },
      option: {
        legend: {
          display: true,
          position: 'right',
          padding: 10,
          labels: {
            fontColor: 'rgb(255, 212, 102)',
          },
        },
        animation: {
          duration: 1500,
          easing: 'easeInQuart',
        },
        cutoutPercentage: 10,
        maintainAspectRatio: false,
        ticks: {
          display: true,
        },
        tooltips: {
          callbacks: {
            beforeTitle: (e, data) => {
              let getIndex = e[0].index
              let getData = data.datasets[0].data
              const reducer = (accumulator, currentValue) =>
                accumulator * 1 + currentValue * 1
              let getPercent =
                ((getData[getIndex] / getData.reduce(reducer)) * 100).toFixed(
                  2
                ) + '%'
              return getPercent
            },
          },
        },
      },
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    let monthCost = nextProps.info.cost * nextProps.info.totalDay
    let newValueArr = [nextProps.info.revenue, nextProps.info.save, monthCost]

    let overSave = [
      'rgba(150,202,202,0.8)',
      'rgba(148,255,150,0.8)',
      'rgba(255,82,82,0.8)',
    ]

    let newDatasets = [
      {
        data: newValueArr,
        backgroundColor: overSave,
      },
    ]
    this.setState({
      chartData: { ...this.state.chartData, datasets: newDatasets },
    })
  }

  render() {
    return (
      <div className="chart" style={{ width: '500px', height: '500px' }}>
        {this.test}
        <Pie data={this.state.chartData} options={this.state.option} />
      </div>
    )
  }
}

export default ChartjsPie
