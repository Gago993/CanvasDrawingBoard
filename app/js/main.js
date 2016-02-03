/**
 * Created by Gago on 11/24/2015.
 */

var s;
var NewsWidget = {

    settings: {
        numArticles: 5,
        articleList: $("#article-list"),
        moreButton: $("#more-button")
    },

    init: function() {
        // kick things off
        s = this.settings;
    },


    bindUIActions: function() {
        s.moreButton.on("click", function() {
            NewsWidget.getMoreArticles(s.numArticles);
        });
    },

    getMoreArticles: function(numToGet) {
        console.log("action");
    }

};