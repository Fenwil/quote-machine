var quote = '',
  $quoteDiv = $('.quote')

function getQuote () {
  $.ajax({
      url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
      type: 'GET',
      dataType: 'jsonp',
      success: function (data) {
          quote = data.quoteText + ' - ' + (data.quoteAuthor || 'Anonymous')
          $quoteDiv.fadeOut(500, function () {
              $(this).fadeIn(500).typed({
                  strings: [quote],
                  typeSpeed: 25,
                  backDelay: 750
                })
            })
        },
      error: function () {
          $quoteDiv.text("We couldn't get any quote. I'm sorry :(")
        }
    })
};

function translateQuote () {
  var targetLang = 'es',
      url = 'http://api.grimmstudios.biz/translate/' + targetLang + '/' + encodeURIComponent(quote)
  $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
          quote = data[0].Translated
          $quoteDiv.text(quote).fadeIn(500)
        },
      error: function () {
          $quoteDiv.text("We couldn't translate it. I'm sorry :(")
        }
    })
};
$(function () {
  getQuote()
  $('.js-get-quote').click(function () {
      getQuote()
    })
  $('.js-translate').click(function () {
      translateQuote()
    })
  $('.js-post-quote').click(function () {
      var linkTweet = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote)
      $(this).attr('href', linkTweet)
    })
})
