import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class FilterableDealGrid extends React.Component {
  render() {
    return (
      <h1>Deal Grid</h1>
    );
  }
}

ReactDOM.render(
  <FilterableDealGrid />,
  document.getElementById('root')
);

