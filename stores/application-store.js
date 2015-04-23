import {createStore} from 'fluxible/addons';
import _ from 'lodash';
import routesConfig from '../configs/routes';

let ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  attrs: [
    'currentPageName', 'currentPage', 'pages', 'currentRoute', 'pageTitle'
  ],
  handlers: {
    'UPDATE_PAGE_TITLE': 'handlePageTitle',
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate'
  },
  initialize() {
    this.currentPageName = null;
    this.currentPage = null;
    this.currentRoute = null;
    this.pages = routesConfig;
    this.pageTitle = '';
  },
  handlePageTitle(data) {
    this.pageTitle = data.pageTitle;
  },
  handleNavigate(route) {
    if (this.currentRoute && (this.currentRoute.url == route.url)) {
      return;
    }

    let currentPageName = route.config.page;
    _.assign(this, {
      currentPageName,
      currentPage: this.pages[currentPageName],
      currentRoute: route
    });

    this.emitChange();
  },
  getCurrentPageName() {
    return this.currentPageName;
  },
  getPageTitle() {
    return this.pageTitle;
  },
  getCurrentRoute() {
    return this.currentRoute;
  },
  getPages() {
    return this.pages;
  },
  dehydrate() {
    return _.pick(this, this.attrs);
  },
  rehydrate(state) {
    _.assign(this, _.pick(state, this.attrs));
  }
});

export default ApplicationStore;
