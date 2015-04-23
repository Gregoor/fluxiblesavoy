import React from 'react';
import ApplicationStore from '../stores/application-store';
import FluxibleMixin from 'fluxible/addons/FluxibleMixin';

let HTML = React.createClass({
  mixins: [FluxibleMixin],
  render() {
    return (
      <html>
      <head>
        <meta charSet="utf-8"/>
        <title>{this.getStore(ApplicationStore).getPageTitle()}</title>
        <meta name="viewport" content="width=device-width, user-scalable=no"/>
        <link rel="stylesheet" type="text/css" href="/public/assets/app.css"/>
        <link href="http://fonts.googleapis.com/css?family=Roboto:400,300,500"
              rel="stylesheet" type="text/css"/>
      </head>
      <body>
      <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}>
      </div>
      </body>
      <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
      <script src="/public/assets/main.js"></script>
      </html>
    );
  }
});

export default HTML;
