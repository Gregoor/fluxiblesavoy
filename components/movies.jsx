import React from 'react';
import connectToStores from 'fluxible/addons/connectToStores';
import classnames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import {Paper, FlatButton} from 'material-ui';
import MovieStore from '../stores/movie-store';
import Calendar from './calendar.jsx';

let Movies = React.createClass({
  getInitialState: () => ({}),
  render() {
    let {selected} = this.state;
    let moviesHTML = this.props.movies.map((movie, i) => {
      let {dates} = movie;
      let next = Object.keys(dates)[0];
      let isSelected = this.state.selected == i;

      return (
        <Paper zDepth={2} onClick={() => this.onSelect(i)}
               className={classnames(['row', 'movie', {selected: isSelected}])}>
          <div className="shortie">
            <img src={movie.image} style={{float: 'left'}}/>

            <div className="row">
              <div className="title">{movie.title}</div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <em>Nächste Vorstellung:</em>
                {moment(`${dates[next][0]}${next}`, 'HH:mm DD.MM.YY').calendar()}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="details"><Calendar dates={movie.dates}/></div>
            </div>
          </div>
        </Paper>
      );
    });
    return (
      <div>{moviesHTML}</div>
    );
  },
  onSelect(i) {
    let {selected} = this.state;
    this.setState({selected: selected == i ? null : i});
  }
});

Movies = connectToStores(Movies, [MovieStore], (stores, props) => ({
  movies: stores.MovieStore.getMovies()
}));

export default Movies;
