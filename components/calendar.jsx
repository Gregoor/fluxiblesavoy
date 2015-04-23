import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

let Calendar = React.createClass({
  render() {
    let {dates} = this.props;
    let allDates = [];
    let allTimes = [];

    let addDateTime = (dateM, times = []) => {
      if (dateM.isBefore(moment(), 'day')) return;
      let isToday = dateM.isSame(moment(), 'day');
      allDates.push({isToday, date: dateM});
      allTimes.push({isToday, times});
    };
    let prevDateM = moment().startOf('day').subtract(1, 'day');
    _.each(dates, (times, date) => {
      let dateM = moment(date, 'DD.MM.YY');
      let diffDays = dateM.diff(prevDateM, 'days');

      if (diffDays > 7) {
        diffDays = diffDays % 7;
        prevDateM = dateM.clone().subtract(diffDays, 'days');
      }
      while (diffDays > 1) {
        let betweenDate = prevDateM.add(1, 'day');
        addDateTime(betweenDate.clone());
        diffDays--;
      }

      prevDateM = dateM.clone();

      addDateTime(dateM, times);
    });
    let missingDays = 7 - allDates.length % 7;
    while (missingDays > 0) {
      prevDateM.add(1, ' day');
      addDateTime(prevDateM.clone());
      missingDays--;
    }

    if (_.isEmpty(allDates)) return '';
    let allDatesHTML = allDates.map(o => {
      return (
        <th className={o.isToday ? 'today' : ''}>
          {o.isToday ? 'HEUTE' : o.date.format('dd').toUpperCase()}
          <br/>
          {o.date.format('DD.MM')}
        </th>
      )
    });
    let allTimesHTML = allTimes.map(o => {
      let timesHTML = o.times.map(time => [time, (<br/>)]);
      if (_.isEmpty(o.times)) timesHTML = <br/>;

      return (
        <td className={classnames({
                today: o.isToday,
                empty: _.isEmpty(o.times)
              })}>
          {timesHTML}
        </td>
      );
    });

    let dateTimeRowsHTML = [];
    for (let i = Math.floor(allDates.length / 7) * 7; i >= 0; i -= 7) {
      let end = i + 7;
      dateTimeRowsHTML.unshift(
        (<tr>{allDatesHTML.splice(i, end)}</tr>),
        (<tr>{allTimesHTML.splice(i, end)}</tr>)
      );
    }

    return (<table>{dateTimeRowsHTML}</table>);
  }
});

export default Calendar;
