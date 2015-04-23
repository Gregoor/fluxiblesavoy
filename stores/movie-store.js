import {createStore} from 'fluxible/addons';
import _ from 'lodash';

let MovieStore = createStore({
  storeName: 'MovieStore',
  attrs: ['movies', 'timetable', 'selectedMovie'],
  handlers: {
    'REFRESH_STORE': 'handleRefresh'
  },
  initialize() {
    this.attrs.forEach(attr => this[attr] = null);
  },
  handleRefresh(data) {
    _.assign(this, _.pick(data, 'movies'));
    this.movies.forEach(movie => {
      let [title, tags] = movie.title.split(' (');
      movie.title = title;
    });
    this.emitChange();
  },
  getMovies() {
    return this.movies;
  },
  dehydrate() {
    return _.pick(this, this.attrs);
  },
  rehydrate(state) {
    _.assign(this, _.pick(state, this.attrs));
  }
});

export default MovieStore;
