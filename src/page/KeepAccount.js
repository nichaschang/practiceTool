import React from 'react'
import '../css/main.scss'
import ChartjsPie from '../component/ChartjsPie'

class KeepAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      revenue: 0,
      save: 0,
      basicCost:0,
      cost: 0,
      Result: '',
      totalDay: 0,
    }
    this.getCal = this.getCal.bind(this)
  }

  //設定基本花費
  getBasicCost(e) {
    let userCost = e.target.value
    this.setState({ basicCost: userCost })
  }
  //設定平均每日花費預算
  getCost(e) {
    let cal = this.state.revenue - this.state.cost * this.state.totalDay
    let userCost = e.target.value
    this.setState({ cost: userCost })
  }

  //設定收入
  getRevenue(e) {
    let userRevenue = e.target.value
    this.setState({ revenue: userRevenue })
  }

  //設定目標儲蓄額
  getSave(e) {
    let userSave = e.target.value
    this.setState({ save: userSave })
  }

  //欲得到結果
  getCal() {
    let cal = this.state.revenue - this.state.cost * this.state.totalDay-this.state.basicCost
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

  //獲取當月總天數
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
              <span className="cost-color">基本花費: </span>
              {/* <span>{this.state.cost}</span> */}
              <input
                type="text"
                name="cost"
                onChange={this.getBasicCost.bind(this)}
              />
              <span className="cost-color">平均每日花費預算: </span>
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
            <ChartjsPie info={this.state} />
          </div>
        </div>
      </>
    )
  }
}

export default KeepAccount
