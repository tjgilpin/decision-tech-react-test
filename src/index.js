import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import json from './assets/deals.json';

const deals = json.deals;

class MobileList extends React.Component {
  render() {
    const mobile = this.props.mobile

    if (!mobile) {
      return (
        "N/A"
      );
    }  
    return (
      <ul>
        <li>Data: {mobile.data.label}</li>
        <li>Minutes: {mobile.minutes.label}</li>
        <li>Texts: {mobile.texts.label}</li>
        <li>Connection Type: {mobile.connectionType.label}</li>
      </ul>
    );  
  }
}

class ChannelItem extends React.Component {
  render() {
    const popularChannel = this.props.popularChannel;

    return (
      <img src={popularChannel.logo} alt={popularChannel.name} />
    );
  }
}

class DealRow extends React.Component {
  render() {
    const deal = this.props.deal;
    const mbUsage = `${(deal.speed.sortValue) / 1024} mb`;  
    const channelList =[];      

    deal.popularChannels.forEach((popularChannel, index) => {
      channelList.push(
        <ChannelItem
          popularChannel={popularChannel}
          key={index}
        />
      );
    });

    return (
      <tr>
        <td>{deal.title}</td>
        <td>{deal.contractLength}months</td>
        <td>{mbUsage}<br/>{deal.usage.label}</td>
        <td><img src={deal.offer.smallLogo} alt={deal.offer.title} /></td>
        <td>{channelList}</td>
        <td><MobileList mobile={deal.mobile} /></td>
        <td>&pound;{deal.prices[0].firstYear}</td>
      </tr>
    );
  }
}

class DealFilter extends React.Component {
  render() {
    return (
      <div className="deal-grid-filter">
        <form>

          <label>
            <input type="checkbox" name="" id=""/>
            Broadband
          </label>
          <label>
            <input type="checkbox" name="" id=""/>
            TV
          </label>
          <label>
            <input type="checkbox" name="" id=""/>
            Mobile
          </label>
          <label>
            Speed/Usage
            <select name="" id="">
              <option value="any">Any</option>
              <option value="76mb">76mb</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

class DealTable extends React.Component {
  render() {
    const rows = [];

    this.props.deals.forEach((deal) => {
      rows.push(
        <DealRow
          deal={deal}
          key={deal.id}
        />
      );
    });

    return (
      <div className="deal-grid-content">
        <table className="deal-grid-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Contract Length</th>
              <th>Speed/Usage</th>
              <th>Offer</th>
              <th>TV</th>
              <th>Mobile</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>  
    );
  }
}

class NavMenu extends React.Component {
  constructor () {
    super()
    this.state = {
      visible: false
    }
  }
  toggleVisible () {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    return (
      <nav className="deal-grid-nav" onClick={this.toggleVisible.bind(this)}>
        <svg height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg">
          <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
        </svg>
        {
          this.state.visible &&
            <DealFilter/>
        }
      </nav>
    );
  }  
}

class Header extends React.Component {
  render() {
    return (
      <header className="deal-grid-header">
        <img src="" alt="" />
        <NavMenu/>
      </header>
    );
  }
}

class FilterableDealGrid extends React.Component {
  render() {
    return (
      <div className="deal-grid-container">
        <Header/>
        <DealTable
          deals={this.props.deals}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <FilterableDealGrid deals={deals} />,
  document.getElementById('root')
);

