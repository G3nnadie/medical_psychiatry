function declension(forms, val) {
  const cases = [ 2, 0, 1, 1, 1, 2 ];
  return forms[(val % 100 > 4 && val % 100 < 20) ? 2 : cases[(val % 10 < 5) ? val % 10 : 5]];
}

(function ($) {
  $.fn.downCount = function (options, callback) {
     var settings = $.extend({
       date: null,
       offset: null
     }, options);
    
    // Throw error if date is not set
     if (!settings.date) {
        $.error('Date is not defined.');
     }

     // Throw error if date is set incorectly
     if(!Date.parse(settings.date)) {
        $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
     }

     // Save container
     var container = this;

     /**
        * Change client's local date to match offset timezone
        * @return {Object} Fixed Date object.
     */
     var currentDate = function () {
        // get client's current date
        var date = new Date();

        // turn date to utc
        var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

        // set new Date object
        var new_date = new Date(utc + (3600000*settings.offset))

        return new_date;
     };

     /**
       * Main downCount function that calculates everything
     */
     function countdown () {
        var target_date = new Date(settings.date), // set target date
        current_date = currentDate(); // get fixed current date

        // difference of dates
        var difference = target_date - current_date;

        // if difference is negative than it's pass the target date
        if (difference < 0) {
        // stop timer
        clearInterval(interval);

        if (callback && typeof callback === 'function') callback();
          return;
        }

        // basic math variables
        var _second = 1000,
            _minute = _second * 60,
            _hour = _minute * 60,
            _day = _hour * 24;

       // calculate dates
       var days = Math.floor(difference / _day),
           hours = Math.floor((difference % _day) / _hour),
           minutes = Math.floor((difference % _hour) / _minute),
           seconds = Math.floor((difference % _minute) / _second);

           // fix dates so that it will show two digets
           days = (String(days).length >= 2) ? days : '0' + days;
           hours = (String(hours).length >= 2) ? hours : '0' + hours;
           minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
           seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

        // based on the date change the refrence wording
        var ref_days = declension([ 'день', 'дня', 'дней' ], days),
            ref_hours = declension([ 'час', 'часа', 'часов' ], hours),
            ref_minutes = declension([ 'минута', 'минуты', 'минут' ], minutes),
            ref_seconds = declension([ 'секунда', 'секунды', 'секунд' ], seconds);

        // set to DOM
        container.find('.m-countdown__days').text(days);
        container.find('.m-countdown__hours').text(hours);
        container.find('.m-countdown__minutes').text(minutes);
        container.find('.m-countdown__seconds').text(seconds);

        container.find('.m-countdown__days-ref').text(ref_days);
        container.find('.m-countdown__hours-ref').text(ref_hours);
        container.find('.m-countdown__minutes-ref').text(ref_minutes);
        container.find('.m-countdown__seconds-ref').text(ref_seconds);
     };
     // start
     var interval = setInterval(countdown, 1000);
  };
})(jQuery);