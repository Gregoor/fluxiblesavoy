import React from 'react';
import Fluxible from 'fluxible';
import serviceProxyPlugin from 'fluxible-plugin-service-proxy';
import routrPlugin from 'fluxible-plugin-routr';
import moment from 'moment';

moment.locale('de');

let app = new Fluxible({
  component: React.createFactory(require('./components/application.jsx'))
});

app.plug(serviceProxyPlugin());

app.plug(routrPlugin({
  routes: require('./configs/routes')
}));

app.registerStore(require('./stores/application-store'));
app.registerStore(require('./stores/movie-store'));

export default app;
