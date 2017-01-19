class QuoteMachine {
  constructor () {
    this.quoteText = ''
    this.$div = $('.quote')
    this.apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?'
  }
  getQuote () {
    $.getJSON(this.apiUrl)
      .done(json => this.displayQuote(json))
      .fail(() => this.$quoteDiv.text("We couldn't get any quote. I'm sorry :("))
  }
  displayQuote (json) {
    this.quoteText = json.quoteText + ' - ' + (json.quoteAuthor || 'Anonymous')
    this.$div.fadeOut(500, () =>
      this.$div.fadeIn(500).typed({
        strings: [this.quoteText],
        typeSpeed: 25,
        backDelay: 750
      })
    )
  }
  translateQuote () {
    let targetLang = 'es'
    let url = 'http://api.grimmstudios.biz/translate/' + targetLang + '/' + encodeURIComponent(this.quoteText)
    $.getJSON(url)
      .done((json) => {
        this.quoteText = json[0].Translated
        this.$div.text(this.quoteText).fadeIn(500)
      })
      .fail(() => this.$quoteDiv.text("We couldn't translate it. I'm sorry :("))
  }
  tweetQuote () {
    let linkTweet = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(this.quoteText)
    $('.js-post-quote').attr('href', linkTweet)
  }
}

$(() => {
  let quoteMachine = new QuoteMachine()
  quoteMachine.getQuote()
  $('.js-get-quote').click(() => quoteMachine.getQuote())
  $('.js-translate').click(() => quoteMachine.translateQuote())
  $('.js-post-quote').click(() => quoteMachine.tweetQuote())
})
