import loadPage from '../actions/load-page';
import loadMoviePage from '../actions/load-movie-page';

export default {
  movies: {
    path: '/',
    method: 'get',
    page: 'movies',
    title: 'Movies',
    action: loadMoviePage
  },
  about: {
    path: '/about',
    method: 'get',
    page: 'about',
    title: 'About',
    action: loadPage
  }
};
