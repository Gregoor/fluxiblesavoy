export default (context, payload, done) => {
  context.dispatch('UPDATE_PAGE_TITLE', {
    pageTitle: payload.config.title || ''
  });
  done();
};
