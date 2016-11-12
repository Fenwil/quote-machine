"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuoteMachine = function () {
    function QuoteMachine() {
        _classCallCheck(this, QuoteMachine);

        this.quoteText = "";
        this.$div = $(".quote");
        this.apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?";
    }

    _createClass(QuoteMachine, [{
        key: "getQuote",
        value: function getQuote() {
            var _this = this;
            $.getJSON(this.apiUrl).done(function (json) {
                _this.displayQuote(_this, json);
            }).fail(function () {
                _this.$quoteDiv.text("We couldn't get any quote. I'm sorry :(");
            });
        }
    }, {
        key: "displayQuote",
        value: function displayQuote(scope, json) {
            scope.quoteText = json.quoteText + " - " + (json.quoteAuthor || "Anonymous");
            scope.$div.fadeOut(500, function () {
                return scope.$div.fadeIn(500).typed({
                    strings: [scope.quoteText],
                    typeSpeed: 25,
                    backDelay: 750
                });
            });
        }
    }, {
        key: "translateQuote",
        value: function translateQuote() {
            var targetLang = "es",
                url = "http://api.grimmstudios.biz/translate/" + targetLang + "/" + encodeURIComponent(this.quoteText),
                _this = this;
            $.getJSON(url).done(function (json) {
                _this.quoteText = json[0].Translated;
                _this.$div.text(quoteText).fadeIn(500);
            }).fail(function () {
                _this.$quoteDiv.text("We couldn't translate it. I'm sorry :(");
            });
        }
    }, {
        key: "tweetQuote",
        value: function tweetQuote() {
            var linkTweet = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(this.quoteText);
            $(".js-post-quote").attr("href", linkTweet);
        }
    }]);

    return QuoteMachine;
}();

$(function () {

    var quoteMachine = new QuoteMachine();

    quoteMachine.getQuote();

    $(".js-get-quote").click(function () {
        return quoteMachine.getQuote();
    });

    $(".js-translate").click(function () {
        return quoteMachine.translateQuote();
    });

    $(".js-post-quote").click(function () {
        return quoteMachine.tweetQuote();
    });
});