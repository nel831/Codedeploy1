/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var left;
var animating; //flag to prevent quick multi-click glitches

var nameRegex = /^[A-Za-z ]{3,50}$/;
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var phoneRegex = /^[0-9]{10}$/i;

function hasError(target) {
    target.prev().removeClass("icon-success");
    target.removeClass("input-success");
    target.removeClass("label-success");
    target.next().next().removeClass("success");
    target.prev().addClass("icon-error");
    target.addClass("input-error");
    target.next().addClass("label-error");
    target.next().next().addClass("error");
}

function hasSuccess(target) {
    target.prev().removeClass("icon-error");
    target.removeClass("input-error");
    target.removeClass("label-error");
    target.next().next().removeClass("error");
    target.prev().addClass("icon-success");
    target.addClass("input-success");
    target.next().addClass("label-success");
    target.next().next().addClass("success");
}

function validateEmail(email) {
    if ($.trim(email) === '') {
        return false;
    } else if (!emailRegex.test(email)) {
        return false;
    } else {
        return true;
    }
}

function validatePassword(pass) {
    if ($.trim(pass) === '') {
        return false;
    } else if (pass.length < 6 || pass.length > 15) {
        return false;
    } else {
        return true;
    }
}

function validateName(name) {
    if ($.trim(name) === '') {
        return false;
    } else if (!nameRegex.test(name)) {
        return false;
    } else {
        return true;
    }
}

$('#lemail, #email').on('focusout', function() {
    var email = $(this).val();
    if (validateEmail(email)) {
        hasSuccess($(this));
        $(this).next().next().html('Email is Okay');
    } else {
        hasError($(this));
        $(this).next().next().html('Invalid Email');
    }
});

$('#lpassword, #password').on('focusout', function() {
    var pass = $(this).val();
    if (validatePassword(pass)) {
        hasSuccess($(this));
        $(this).next().next().html('Password is Okay');
    } else {
        hasError($(this));
        $(this).next().next().html('Invalid Password');
    }
});

$('#first_name, #last_name').on('focusout', function() {
    var name = $(this).val();
    var temp = $(this).next().text();
    if (validateName(name)) {
        hasSuccess($(this));
        $(this).next().next().html(temp + ' is Okay');
    } else {
        hasError($(this));
        $(this).next().next().html('Invalid ' + temp);
    }
});

$('#cnf-password').on('focusout', function() {
    var pass = $(this).val();
    if (validatePassword(pass)) {
        if (pass === $('#password').val()) {
            hasSuccess($(this));
            $(this).next().next().html('Password Confirmed');
        } else {
            hasError($(this));
            $(this).next().next().html('Passwords don\'t match');
        }
    } else {
        hasError($(this));
        $(this).next().next().html('Invalid Password');
    }
});

$("#show-register").on('click', function() {
    if (animating)
        return false;
    animating = true;

    //hide the current div with style
    $('#login').animate({opacity: 0}, {
        step: function(now, mx) {
            opacity = 1 - now;
            $('#register').css({'opacity': opacity});
        },
        duration: 800,
        complete: function() {
            $('#login').hide();
            //show the next fieldset
            $('#register').show();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$("#show-login").on('click', function() {
    if (animating)
        return false;
    animating = true;

    $('#register').animate({opacity: 0}, {
        step: function(now, mx) {
            opacity = 1 - now;
            $('#login').css({'opacity': opacity});
        },
        duration: 800,
        complete: function() {
            $('#register').hide();
            $('#login').show();
            animating = false;
        },
        easing: 'easeInOutBack'
    });
});

//$(".next").on('click', function() {
//    if (animating)
//        return false;
//    animating = true;
//
//    current_fs = $(this).parent().parent();
//    console.log(current_fs);
//    next_fs = $(this).parent().parent().next();
//
//    //activate next step on progressbar using the index of next_fs
//    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
//
//    //hide the current fieldset with style
//    current_fs.animate({opacity: 0}, {
//        step: function(now, mx) {
//            //as the opacity of current_fs reduces to 0 - stored in "now"
//            //1. scale current_fs down to 80%
//            scale = 1 - (1 - now) * 0.2;
//            //2. bring next_fs from the right(50%)
//            left = (now * 50) + "%";
//            //3. increase opacity of next_fs to 1 as it moves in
//            opacity = 1 - now;
//            current_fs.css({'transform': 'scale(' + scale + ')'});
//            next_fs.css({'left': left, 'opacity': opacity});
//        },
//        duration: 800,
//        complete: function() {
//            current_fs.hide();
//            //show the next fieldset
//            next_fs.show();
//            animating = false;
//        },
//        //this comes from the custom easing plugin
//        easing: 'easeInOutBack'
//    });
//});
//
//$(".previous").on('click', function() {
//    if (animating)
//        return false;
//    animating = true;
//
//    current_fs = $(this).parent().parent();
//    previous_fs = $(this).parent().parent().prev();
//
//    //de-activate current step on progressbar
//    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
//
//    //hide the current fieldset with style
//    current_fs.animate({opacity: 0}, {
//        step: function(now, mx) {
//            //as the opacity of current_fs reduces to 0 - stored in "now"
//            //1. scale previous_fs from 80% to 100%
//            scale = 0.8 + (1 - now) * 0.2;
//            //2. take current_fs to the right(50%) - from 0%
//            left = ((1 - now) * 50) + "%";
//            //3. increase opacity of previous_fs to 1 as it moves in
//            opacity = 1 - now;
//            current_fs.css({'left': left});
//            previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
//        },
//        duration: 800,
//        complete: function() {
//            current_fs.hide();
//            //show the previous fieldset
//            previous_fs.show();
//            animating = false;
//        },
//        //this comes from the custom easing plugin
//        easing: 'easeInOutBack'
//    });
//});