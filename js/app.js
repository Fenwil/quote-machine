class QuoteMachine {
    constructor() {
        this.quoteText = "";
        this.$div = $(".quote");
        this.apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?"
    }
    getQuote() {
        let _this = this;
        $.getJSON(this.apiUrl)
            .done(function (json) {
                _this.displayQuote(_this, json)
            })
            .fail(function () {
                _this.$quoteDiv.text("We couldn't get any quote. I'm sorry :(");
            });
    }
    displayQuote(scope, json) {
        scope.quoteText = json.quoteText + " - " + (json.quoteAuthor || "Anonymous");
        scope.$div.fadeOut(500, function () {
            $(this).fadeIn(500).typed({
                strings: [scope.quoteText],
                typeSpeed: 25,
                backDelay: 750,
            })
        })
    }
    translateQuote() {
        let targetLang = "es",
            url = "http://api.grimmstudios.biz/translate/" + targetLang + "/" + encodeURIComponent(this.quoteText),
            _this = this;
        $.getJSON(url)
            .done(function (json) {
                _this.quoteText = json[0].Translated;
                _this.$div.text(quoteText).fadeIn(500);
            })
            .fail(function () {
                _this.$quoteDiv.text("We couldn't translate it. I'm sorry :(");
            });
    };
    tweetQuote() {
        let linkTweet = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(this.quoteText);
        $(".js-post-quote").attr("href", linkTweet);
    }
}

$(function () {

    let quoteMachine = new QuoteMachine();

    quoteMachine.getQuote();

    $(".js-get-quote").click(() =>
        quoteMachine.getQuote()
    );

    $(".js-translate").click(() =>
        quoteMachine.translateQuote()
    );

    $(".js-post-quote").click(() =>
        quoteMachine.tweetQuote()
    );

});