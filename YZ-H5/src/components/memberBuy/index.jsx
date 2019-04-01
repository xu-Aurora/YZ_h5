import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render(){
    return (
      <div>
        <div>会员购买</div>
      </div>
    );
  }

};

App.propTypes = {
  router: PropTypes.object
};

export default App;
