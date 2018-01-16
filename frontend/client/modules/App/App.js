import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Snackbar from 'material-ui/Snackbar';
import {closeSnackBar} from '../App/AppActions';
import {isOpen, getMessage} from '../App/AppReducer';
import { browserHistory } from 'react-router';

export class App extends Component {
  state = {isMounted: false};

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
    browserHistory.push('/reviews');
  }

  readSnackBarMessage = () => {
    let message = this.props.message;
    return message ? message : '';
  };

  render() {
    return (

      <div className="col-xs-12">

        <div className="box">
          {this.state.isMounted && !window.devToolsExtension && <DevTools />}
          <div className="row">
            <Helmet
              title="Accommodation Reviews"
              meta={[
                {charset: 'utf-8'},
                {
                  'http-equiv': 'X-UA-Compatible',
                  content: 'IE=edge',
                },
                {
                  name: 'viewport',
                  content: 'width=device-width, initial-scale=1',
                },
              ]}
            />

            <div className="col-xs-12">
              <div className="box">
                {this.props.children}
              </div>
            </div>

            <Snackbar
              open={this.props.isOpen}
              message={this.readSnackBarMessage()}
              autoHideDuration={5000}
              onRequestClose={this.props.closeSnackBar}
            />

          </div>
        </div>
      </div>


    );
  }
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isOpen: isOpen(store),
    message: getMessage(store),
  };
}

const actions = {
  closeSnackBar,
};

export default connect(mapStateToProps, actions)(App);
