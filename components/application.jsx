import React from 'react';
import Nav from './nav.jsx';
import Movies from './movies.jsx';
import About from'./about.jsx';
import ApplicationStore from '../stores/application-store';
import {RouterMixin} from 'flux-router-component';
import FluxibleMixin from 'fluxible/addons/FluxibleMixin';

let Application = React.createClass({
  mixins: [RouterMixin, FluxibleMixin],
  statics: {
    storeListeners: [ApplicationStore]
  },
  getInitialState() {
    return this.getState()
  },
  getState() {
    let appStore = this.getStore(ApplicationStore);
    return {
      currentPageName: appStore.getCurrentPageName(),
      pageTitle: appStore.getPageTitle(),
      route: appStore.getCurrentRoute(),
      pages: appStore.getPages()
    };
  },
  onChange() {
    this.setState(this.getState());
  },
  render() {
    let output = {
      movies: <Movies/>,
      about: <About/>
    }[this.state.currentPageName];

    return (
      <div>
        <img className="logo" alt="Savoy" src="/public/savoy.png"/>
        {/*<Nav selected={this.state.currentPageName} links={this.state.pages}/>*/}
        <div id="content">{output}</div>
      </div>
    );
  },

  componentDidUpdate(prevProps, prevState) {
    let newState = this.state;
    if (newState.pageTitle === prevState.pageTitle) {
      return;
    }
    document.title = newState.pageTitle;
  }
});

export default Application;
