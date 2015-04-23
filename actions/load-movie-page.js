import loadPage from './load-page';

export default (context, payload, done) => {
  context.getService('refreshMovieStore').run().then(data => {
    context.dispatch('REFRESH_STORE', data);
    context.executeAction(loadPage, payload, done);
  });
};
