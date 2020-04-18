import React, { component } from 'react'
import { Pie } from 'react-chartjs-2'

class ChartjsPie extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
        // 圖表獲取資料的物件
      chartData: {
          //key的名稱
        labels: ['收入', '當月可儲蓄額', '支出'],
        datasets: [
          {
            //value
            data: [200, 30, 150],
            //圖表顏色
            backgroundColor: [
              'rgba(150,202,202,0.8)',
              'rgba(148,255,150,0.8)',
              'rgba(255,82,82,0.8)',
            ],
          },
        ],
      },

      //圖表樣式調整的物件
      option: {

        //備註種類名稱的設定區塊
        legend: {
          display: true,
          //位置放置左邊
          position: 'right',
          //樣式設定相關在此區塊
          labels: {
            fontColor: 'rgb(255, 212, 102)',
            padding: 50,
          },
        },
        //動畫設定區塊
        animation: {
          duration: 1500,
          easing: 'easeInQuart',
        },
        //圓心與圓周的距離
        cutoutPercentage: 10,
        //調整 width / height 時，是否要改變圖表大小
        maintainAspectRatio: false,

        //  滑鼠滑到的地方 會顯示的相關資訊
        tooltips: {
            
          callbacks: {
            beforeTitle: (e, data) => {
                //設定占比的計算
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

  //將收到的props資訊處理的區塊
  componentWillReceiveProps(nextProps, nextState) {
    let monthCost = nextProps.info.cost * nextProps.info.totalDay+nextProps.info.basicCost*1
    let targetSave
    if((nextProps.info.revenue-monthCost)<=0){
        targetSave=0
    }else{
        targetSave=nextProps.info.revenue-monthCost
    }
    
    console.log(targetSave)
    let newValueArr = [nextProps.info.revenue, targetSave, monthCost]

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
