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
        <DealFilter/>
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
  render() {
    return (
      <ul>
        <li></li>
      </ul>
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

