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
  constructor(props) {
    super(props)
    window.matchMedia("(min-width: 960px)").matches
    ? this.state = { visible: true }
    : this.state = { visible: false }

    this.handleBroadbandChange = this.handleBroadbandChange.bind(this);
    this.handleTvChange = this.handleTvChange.bind(this);
    this.handleMobileChange = this.handleMobileChange.bind(this);
  }

  handleBroadbandChange(e) {
    this.props.onBroadbandChange(e.target.checked);
  }
  handleTvChange(e) {
    this.props.onTvChange(e.target.checked);
  }
  handleMobileChange(e) {
    this.props.onMobileChange(e.target.checked);
  }

  toggleVisible () {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    return (
      <nav className="deal-grid-nav">
        <svg  onClick={this.toggleVisible.bind(this)} height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg">
          <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
        </svg>
        {
          this.state.visible &&
          <div className="deal-grid-filter">
            <form>
              <label>
                <input
                  type="checkbox"
                  checked={this.props.broadbandFilter}
                  onChange={this.handleBroadbandChange}
                />
                Broadband
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={this.props.tvFilter}
                  onChange={this.handleTvChange}
                />
                TV
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={this.props.mobileFilter}
                  onChange={this.handleMobileChange}
                />
                Mobile
              </label>

            </form>
          </div>
        }
      </nav>      
    );
  }
}

class DealTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      broadbandFilter: true,
      tvFilter: true,
      mobileFilter: true,
    }    

    this.handleBroadbandChange = this.handleBroadbandChange.bind(this);
    this.handleTvChange = this.handleTvChange.bind(this);
    this.handleMobileChange = this.handleMobileChange.bind(this);

  }

  handleBroadbandChange(broadbandFilter) {
    this.setState({
      broadbandFilter: broadbandFilter
    })
  }

  handleTvChange(tvFilter) {
    this.setState({
      tvFilter: tvFilter
    })
  }

  handleMobileChange(mobileFilter) {
    this.setState({
      mobileFilter: mobileFilter
    })
  }

    // const rowsMobileFiltered = this.props.deals.includes('Mobile');

    // console.log(rowsMobileFiltered)
    
    // if (!this.state.mobileFilter)
    // {
    //   rowsFiltered.filter(rowFiltered => rowFiltered.productTypes.includes('Mobile'))
    //   console.log(rowsFiltered)
    // }    




    // if (!this.state.mobileFilter) {
    //   this.props.deals.filter(deal => deal.productTypes.includes('TV'))
    //   console.log(deal)
    // }    
        
    // !this.state.mobileFilter ? '' : ''

    // if (!this.state.mobileFilter) {
    //   this.props.deals.filter(item => item.productTypes.includes('TV'))
    //   console.log(item)
    // }

    // console.log(rowsFiltered)
  

  render() {
    const rows = [];

    this.props.deals.forEach((deal) => {
      if (!this.state.broadbandFilter && deal.productTypes.includes('Broadband'))
      {
        return
      }      
      if (!this.state.broadbandFilter && deal.productTypes.includes('Fibre Broadband'))
      {
        return
      }      
      if (!this.state.mobileFilter && deal.productTypes.includes('Mobile'))
      {
        return
      }      
      if (!this.state.tvFilter && deal.productTypes.includes('TV'))
      {
        return
      } 
      
      rows.push(
        <DealRow
          deal={deal}
          key={deal.id}
        />
      );
    });

    return (
      <>
      <DealFilter
        broadbandFilter={this.state.broadbandFilter}
        tvFilter={this.state.tvFilter}
        mobileFilter={this.state.mobileFilter}

        onBroadbandChange={this.handleBroadbandChange}        
        onTvChange={this.handleTvChange}        
        onMobileChange={this.handleMobileChange}        

      />
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
      </>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header className="deal-grid-header">
        <img src="" alt="" />
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

