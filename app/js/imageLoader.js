/**
 * Created by Gago on 12/28/2015.
 */

$(document).ready(function(){

    $('.thumb img').click(function(){
        var imgSrc = $(this).attr('src');

        TestModul.initImage(imgSrc);

    });


});