import React from 'react'
import '../css/main.scss'
import ChartjsPie from '../component/ChartjsPie'

class KeepAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      revenue: 0,
      save: 0,
      cost: 0,
      Result: '',
      totalDay: 0,
    }
    this.getCal = this.getCal.bind(this)
  }

  getCost(e) {
    let cal = this.state.revenue - this.state.cost * this.state.totalDay
    let userCost = e.target.value
    this.setState({ cost: userCost })
  }

  getRevenue(e) {
    let userRevenue = e.target.value
    this.setState({ revenue: userRevenue })
  }
  getSave(e) {
    let userSave = e.target.value
    this.setState({ save: userSave })
  }

  getCal() {
    let cal = this.state.revenue - this.state.cost * this.state.totalDay
    let res

    if (cal > this.state.save) {
      res = `超厲害！
      扣除後還剩下 $ ${cal} 大於您的目標儲蓄額 $ ${cal - this.state.save}`
    } else if (cal === this.state.save) {
      res = `剛剛好打平您的目標儲蓄額唷 ! 加油!! 目標額: $  ${this.state.save}`
    } else {
      res = `這個月花費太多，需要再重新規劃理財方式唷! 目標額: $ ${
        this.state.save
      }，距離目標額有 ${cal - this.state.save}`
    }
    this.setState({ Result: res })
  }

  componentWillMount(a) {
    let today = new Date()
    let thisYear = today.getFullYear()
    let thisMonth = today.getMonth()
    let monthDay = new Date(thisYear, thisMonth + 1, 0)
    let thisDay = monthDay.getDate()
    this.setState({ totalDay: thisDay })
  }

  render() {
    return (
      <>
        <div className="basic-box">
          <div className="content">
            <div className="num-input">
              <span className="revenue-color">月收入: </span>
              {/* <span>{this.state.revenue}</span> */}
              <input
                type="text"
                name="revenue"
                onChange={this.getRevenue.bind(this)}
              />
              <span className="save-color">希望每月存入金額</span>
              {/* <span>{this.state.save}</span> */}
              <input
                type="text"
                name="save"
                onChange={this.getSave.bind(this)}
              />
              <span className="cost-color">今日花費: </span>
              {/* <span>{this.state.cost}</span> */}
              <input
                type="text"
                name="cost"
                onChange={this.getCost.bind(this)}
              />
              <div>
                <button onClick={this.getCal}>計算</button>
              </div>
              <p>結果：</p>
              <p>{this.state.Result}</p>
            </div>
            {/* <Chart onClick={() => this.state} /> */}
            <ChartjsPie info={this.state} />
          </div>
        </div>
      </>
    )
  }
}

export default KeepAccount
