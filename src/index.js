import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import json from './assets/deals.json';

const deals = json.deals;

class MobileList extends React.Component {
  render() {
    return (
      <ul>
        <li>Data:</li>
        <li>Minutes:</li>
        <li>Texts:</li>
        <li>Connection:</li>
      </ul>
    );
  }
}

class ChannelList extends React.Component {
  render() {
    return (
      <img src="" alt="" />
    );
  }
}

class DealRow extends React.Component {
  render() {
    return (
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td><img src="" alt="" /></td>
        <td><ChannelList/></td>
        <td><MobileList/></td>
        <td></td>
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
            Speed
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
            <DealRow/>
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
        <DealTable/>
      </div>
    );
  }
}

ReactDOM.render(
  <FilterableDealGrid deals={deals} />,
  document.getElementById('root')
);

