import Crawler from 'crawler';
import dbConnect from '../db/connect';

const BASE_URL = 'http://www.savoy-filmtheater.de/';

let at = Date.now();
dbConnect().then(db => {
  let crawls = db.collection('crawls');
  crawls.insert({at, 'movies': []});

  let detailCrawler = new Crawler({
    callback(err, result, $) {
      console.log(err);
      $('.tx-spmovies-pi1').each(function () {
        let movie = {
          'title': $(this).find('h1').text(),
          'image': BASE_URL + $(this).find('img').attr('src'),
          'dates': {}
        };
        let sel = '.tx-spmovies-pi1-showtable-mobile td.tx-spmovies-pi1-day';
        $(this).find(sel).each(function () {
          let date = $(this).text().trim().split(', ')[1];
          let times = [];
          $(this).closest('tr').next('tr').find('.time a').each(function () {
            times.push($(this).text());
          });
          movie.dates[date] = times;
        });
        crawls.update({at}, {'$push': {'movies': movie}});
      });
    }
  });

  let baseCrawler = new Crawler({
    callback(err, result, $) {
      $('.tx-spmovies-pi1-listrow strong a').each(function () {
        detailCrawler.queue(BASE_URL + $(this).attr('href'));
      });
    }
  });
  baseCrawler.queue(`${BASE_URL}filmprogramm.html`);
});
