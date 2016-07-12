var maintrigger = 'click';
var downtrigger = 'mousedown';
var uptrigger = 'mouseup';
var movetrigger = 'mousemove';

if ('ontouchend' in window) {
	maintrigger = 'touchend';
	downtrigger = 'touchstart';
	uptrigger = 'touchend';
	movetrigger = 'touchmove';
}

if (!('onorientationchange' in window)) {
	//$('.turntoportrait').remove();
}
if ($(window).width() < 500) {
  $('#viewport')[0].setAttribute("content", "width=500");
}

//var books set by books.php

var SITE_BASE_URL = 'http://playjudgey.com'; //don't trail slash
var MILESTONE_INTERVAL = 10;

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); };
}

var person_id = (Date.now()*1)+''+(10000000+Math.floor((Math.random() * 1000000)));

var books_judged = 0;
var books_cookie_offset = 0;

var personadescriptions = {
	"monster":"<h3>你的内涵已爆表！</h3>只要这是一本好书，就算用凤姐照片做封面也无法阻止你去阅读它",
	"asleep":"<h3>有自己独特的审美</h3>平凡中带着坚持，你就是你，是颜色不一样的烟火/h3>",
	"damn":"<h3>其实你是封面党</h3>封面党又怎样，看脸并不可耻，对美的事物没有追求才叫可耻呢！",
	"fair":"<h3>终极颜控！</h3>让我们高举颜控的大旗，一切丑逼都退散吧，内涵是什么，可以吃吗？",
	"judgeyest":"<h3>发现一个隐藏很深的处女座</h3>不轻易透露自己的喜恶，但其实内心十分挑剔，有着自己独特的品味",
	"supreme":"<h3>完美主义者</h3>在你心目中，大多数人都活得太糙了，居然连98分的合格分都没达到",
	"theresa":"<h3>你的审美已杂裂</h3>你已超过世人对美丑的认识，世间万物对美丑的认识，世间万物在你超凡脱俗的审美面前，都会瞬间变得凌乱"
};
var personaurls = {
	"monster":"a-like-monster",
	"asleep":"asleep-at-the-wheel",
	"damn":"pretty-damn-judgey",
	"fair":"pretty-damn-fair",
	"judgeyest":"the-judgeyest",
	"supreme":"supreme-court-worthy",
	"theresa":"mother-freakin-theresa"
};
var personatweets = {
	"monster"  :"I'm A Like Monster...like, I totally like everything.",
	"asleep"   :"Apparently I'm Asleep At The Wheel. Whatever, this is hard!",
	"damn"     :"I got Pretty Damn Judgey, but really I just have super high standards.",
	"fair"     :"I'm Pretty Damn Fair according to this game. So everyone listen to me from now on, ok?",
	"judgeyest":"Welp, I'm The Judgeyest...when I judged these LITERAL books by their LITERAL covers.",
	"supreme"  :"I'm Supreme Court Worthy. I see books for what they REALLY are. Now hand me my gavel.",
	"theresa"  :"I'm Mother Freakin Theresa and waaay too generous when it comes to rating book covers."
};
var score = {
	"accuracy" : 0,
	"booksrated" : 0,
	"judginess" : 0,
	"persona" : ""
};

if (typeof $.cookie('books_cookie_offset') === 'undefined') {
	$.cookie('books_cookie_offset', 0, { expires: 7, path: '/' });
} else {
	books_cookie_offset = parseInt($.cookie('books_cookie_offset'),10)%books.length;
}



























function connect_listeners() {
	$('.startbutton').on(maintrigger,startbutton);
	$('.nextbook').on(maintrigger,nextbook);
	$('.keepplaying').on(maintrigger,keepplaying);
	$('.startover').on(maintrigger,startover);
	$('.resetbutton').on(maintrigger,startover);
	$('.cool').on(maintrigger,cool);
	$('.aboutbutton').on(maintrigger,function(e){
		e.preventDefault();
		if ($('.abouttext').css('display') !== 'block') {
			$('.abouttext').show();
			$('.blurbtext').hide();
			$('.resetbutton').hide();
			$('.shares').hide();
		} else {
			$('.abouttext').hide();
			$('.blurbtext').show();
			$('.resetbutton').show();
			$('.shares').show();
		}
	});
	$('.milestonescreen .sharefb').on(maintrigger,sharemilestonefb);
	$('.milestonescreen .sharetw').on(maintrigger,sharemilestonetw);
	$('.menu .fbshare').on(maintrigger,function(e){ e.preventDefault();fb_share(SITE_BASE_URL+'/'); });
	$('.menu .twshare').on(maintrigger,function(e){ e.preventDefault();tw_share(SITE_BASE_URL+'/','You judge books by their covers, then we judge you.'); });
	$('.showmilestone').on(maintrigger,showmilestone);
	$('.judgebutton').on(maintrigger,function(e){
		e.preventDefault();
		//console.log($judgeslider.data('rating'));
		judge(parseFloat($judgeslider.data('rating')));
	});
	$('.openmenu').on(maintrigger,function(e){
		e.preventDefault();
		$('.menu').addClass('open');
	});
	$('.closemenu').on(maintrigger,function(e){
		e.preventDefault();
		if ($('.abouttext').css('display') === 'block') {
			$('.abouttext').hide();
			$('.blurbtext').show();
			$('.resetbutton').show();
			$('.shares').show();
		} else {
			$('.menu').removeClass('open');
		}
	});
}





























function book() {
	return books[(books_judged + books_cookie_offset) % books.length];
}










function startbutton(e) {
	e.preventDefault();

	$('.homescreen').hide();
	$('.howtoscreen').show();
	
	$('.samplerating').addClass('animate');
}

function cool(e) {
	e.preventDefault();

	showcurrentbook();

	$('.howtoscreen').hide();
	$('.judgescreen').show();

	$('.samplerating').removeClass('animate');

}

function showcurrentbook() {

	reset_rater();

	$('.judgescreen .booknumber').html(books_judged+1+'/'+10);
	$('.postjudgescreen .booknumber').html(books_judged+1+'/'+10);

	$('.judgescreen .book').css('background-image','url('+book().cover+')');
	$('.postjudgescreen .book').css('background-image','url('+book().cover+')');

	$('.judgescreen .amazonlink').attr('href',book().amz_assoc_shortlink);
	$('.postjudgescreen .amazonlink').attr('href',book().amz_assoc_shortlink);

	$('.judgescreen .amazonlink').attr('title',book().title);
	$('.postjudgescreen .amazonlink').attr('title',book().title);

	if (book().title.length > 40) {
		$('.judgescreen .amazonlink').html(book().title.slice(0,40)+'&hellip;');
		$('.postjudgescreen .amazonlink').html(book().title.slice(0,40)+'&hellip;');
	} else {
		$('.judgescreen .amazonlink').html(book().title);
		$('.postjudgescreen .amazonlink').html(book().title);
	}

	if (book().amz_assoc_shortlink === '') {
		$('.judgescreen .amazonlink').attr('href','http://www.amazon.com/s/?url=search-alias%3Dstripbooks&field-keywords='+book().title);
		$('.postjudgescreen .amazonlink').attr('href','http://www.amazon.com/s/?url=search-alias%3Dstripbooks&field-keywords='+book().title);
	}

}

function judge(stars) {
	//console.log('Judge '+stars+' stars');
	if ($('.judgebutton').hasClass('disabled')) {
		return false;
	}

	//set up all the stuff on the post judge screen
	//if this was the 10n-th result show the judgeme

	book().user_rating = stars;

	_gaq.push(['_trackEvent','RatingBook'+book().book_id, stars+'', '']);
	//_gaq.push(['_trackEvent','PersonRatingBook'+book().book_id, person_id+':'+stars+'', '']);

	flashfeedback(Math.abs(book().average_rating - stars));

	$('.postjudgescreen .averagerating .ratingnumber').html('豆瓣评分');// is '+books().average_rating);
	$('.postjudgescreen .averagerating .highlightedstars').css('width',book().average_rating*62);

	$('.postjudgescreen .yourrating .ratingnumber').html('你的评分');// was '+stars);
	$('.postjudgescreen .yourrating .highlightedstars').css('width',stars * 62);

	if (books_judged > 0 && (books_judged + 1) % MILESTONE_INTERVAL === 0) {
		$('.postjudgescreen .nextbook').hide();
		$('.postjudgescreen .showmilestone').show();
	} else {
		$('.postjudgescreen .nextbook').show();
		$('.postjudgescreen .showmilestone').hide();
	}

	books_judged++;

	update_score();

	$.cookie('books_cookie_offset', books_cookie_offset+books_judged, { expires: 7, path: '/' });

	$('.judgescreen').hide();
	$('.postjudgescreen').show();
}
var imgs = '';
function showmilestone(e) {
	e.preventDefault();

	$('.staraccuracy').text(''+parseInt(score['accuracy']*20,10)+'% accuracy (last '+MILESTONE_INTERVAL+' books)');
	$('.numberofbooks').text(books_judged+' total');

	//$('.starjudginess').text('Averaging '+(-score['judginess'])+' stars judginess');
	//$('.staraccuracy').text('Off by '+(5-score['accuracy'])+' stars on average');

	$('.persona').css('background-image','url(/img/'+imgs+'.png)');
	$('.personadescription').html(personadescriptions[score['persona']]);

	_gaq.push(['_trackEvent','Level',(books_judged/MILESTONE_INTERVAL)+'',(books_judged/MILESTONE_INTERVAL)+'']);
	_gaq.push(['_trackEvent','Persona',personaurls[score['persona']],personaurls[score['persona']]]);
	_gaq.push(['_trackEvent','Accuracy',score['accuracy']+'',score['accuracy']+'']);
	_gaq.push(['_trackEvent','Judginess',score['judginess']+'',score['judginess']+'']);

	//do something with score[judginess]

	$('.milestonescreen').show();
	$('.postjudgescreen').hide();
	$('.judgescreen').hide();
}

function flashfeedback(wrongness) {

	if (wrongness > 3.5) {
		$('.result_world').text("（╯－＿－）╯╧╧");
	} else if (wrongness > 3) {
		$('.result_world').text('真的?');
	} else if (wrongness > 2.5) {
		$('.result_world').text('马马虎虎');
	} else if (wrongness > 2) {
		$('.result_world').text('呃。。。');
	} else if (wrongness > 1.5) {
		$('.result_world').text('嗯，接近了');
	} else if (wrongness > 1) {
		$('.result_world').text('还行');
	} else if (wrongness > 0.8) {
		$('.result_world').text('不错');
	} else if (wrongness > 0.6) {
		$('.result_world').text('棒！');
	} else if (wrongness > 0.4) {
		$('.result_world').text('很好!');
	} else if (wrongness > 0.2) {
		$('.result_world').text('厉害');
	} else if (wrongness > 0.1) {
		$('.result_world').text('太好了!');
	} else if (wrongness > 0) {
		$('.result_world').text('好厉害!');
	} else {
		$('.result_world').text('是在下输了!');
	}

	$('.instantresult').finish();
	$('.instantresult').css('margin-top','-80px').css('opacity','1').show();
	$('.instantresult').animate({
		'margin-top':'-150px',
		'opacity':0
	}, 1600, "linear", function() {
		$('.instantresult').hide();
	});

	$('.instantbg').finish();
	$('.instantbg').css('opacity','1').show();
	$('.instantbg').animate({
		'opacity':0
	}, 600, "linear", function() {
		$('.instantbg').hide();
	});
}
























function update_score() {

	score['booksrated'] = 1+((books_judged-1) % MILESTONE_INTERVAL);

	var i2 = (books_judged + books_cookie_offset) % books.length;
	var i1 = i2 - score['booksrated'];

	var judginess_total = 0;
	var accuracy_total = 0;
	for (var i=i1;i<i2;i++) {
		var delta = (books[i].user_rating - books[i].average_rating);
		judginess_total += delta;
		accuracy_total += 5-Math.abs(delta);
		//console.log(i,delta);
	}
	score['accuracy'] = Math.round(10*accuracy_total/score['booksrated'])/10;
	score['judginess'] = Math.round(10*judginess_total/score['booksrated'])/10;

	if (score['accuracy'] > 4.5) {
		score['persona'] = 'supreme';
		imgs = 'expression/expression_1';
	} else {
		switch (true) {
			case (score['judginess'] < -1.1):
			score['persona'] = 'judgeyest';
				imgs = 'expression/expression_2';
			break;
			case (score['judginess'] < -0.4):
			score['persona'] = 'damn';
				imgs = 'expression/expression_3';
			break;
			case (score['judginess'] > 1.1):
			score['persona'] = 'theresa';
				imgs = 'expression/expression_4';
			break;
			case (score['judginess'] > 0.4):
			score['persona'] = 'monster';
				imgs = 'expression/expression_5';
			break;
			default:
			if (score['accuracy'] > 3.5) {
				score['persona'] = 'fair';
				imgs = 'expression/expression_6';
			} else {
				score['persona'] = 'asleep';
				imgs = 'expression/expression_6';
			}
		}
	}
}



function keepplaying(e) {
	e.preventDefault();

	score = {
		"accuracy" : 0,
		"booksrated" : 0,
		"judginess" : 0,
		"persona" : ""
	};

	nextbook(e);
}


function nextbook(e) {
	e.preventDefault();

	showcurrentbook();

	$('.milestonescreen').hide();
	$('.postjudgescreen').hide();
	$('.judgescreen').show();
}

function startover(e) {
	e.preventDefault();

	books_cookie_offset = books_cookie_offset+books_judged;
	books_judged = 0;
	score = {
		"accuracy" : 0,
		"booksrated" : 0,
		"judginess" : 0,
		"persona" : ""
	};

	showcurrentbook();

	$('.homescreen').show();
	$('.howtoscreen').hide();
	$('.milestonescreen').hide();
	$('.postjudgescreen').hide();
	$('.judgescreen').hide();

	$('.abouttext').hide();
	$('.blurbtext').show();
	$('.resetbutton').show();
	$('.shares').show();
	$('.menu').removeClass('open');
}

function reset_rater() {
	$judgeslider.data('rating',0);
	$highlightedstars.css('width',0);
	$slider.css('left',0);
	$ratingnumber.html('');
	$('.judgebutton').addClass('disabled');
}

function sharemilestonefb(e) {
	e.preventDefault();
	fb_share(SITE_BASE_URL+'/#!'+personaurls[score['persona']]);
}

function sharemilestonetw(e) {
	e.preventDefault();
	tw_share(SITE_BASE_URL+'/#!'+personaurls[score['persona']],personatweets[score['persona']]);
}

function fb_share (url) {
    window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(url),'fb_share','toolbar=0,status=0,width=560,height=436');

    _gaq.push(['_trackEvent', 'Share', 'Facebook', url]);
    return false;
}

function tw_share (url, text) {
    window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text)+'&related=deancasalena%3ACo-creator%20of%20Judgey%20and%20more,nateyg%3ACo-creator%20of%20Judgey%20and%20more','tw_share','toolbar=0,status=0,width=626,height=436');

    _gaq.push(['_trackEvent', 'Share', 'Twitter', url]);
    return false;
}

/*
function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}
*/



var is_dragging = false;
var $judgeslider = $('#judgeslider');
var $slidercontainer = $('#judgeslider .slidercontainer');
var $slider = $('#judgeslider .slider');
var $highlightedstars = $('#judgeslider .highlightedstars');
var $ratingnumber = $('#judgeslider .ratingnumber');

function initialize_slider() {
    //document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", function (e) { e.preventDefault(); }, true);
    //document.addEventListener("touchend", touchHandler, true);
    //document.addEventListener("touchcancel", touchHandler, true);

    $slidercontainer.on(downtrigger,function(e) {
		is_dragging = true;

		$('.judgebutton').removeClass('disabled');
		
		var moveoffsetstart = $slidercontainer.offset();
		var xpos1 = ('ontouchend' in window) ? e.originalEvent.touches[0].pageX : e.pageX;
		var calculatedoffsetstart = Math.max(0,Math.min(300,xpos1-moveoffsetstart.left-12));
		$slider.css('left',calculatedoffsetstart);
		$highlightedstars.css('width',calculatedoffsetstart+3);

		$(document).on(movetrigger,function(e){
			var moveoffset = $slidercontainer.offset();
			var xpos2 = ('ontouchend' in window) ? e.originalEvent.touches[0].pageX : e.pageX;
			var calculatedoffset = Math.max(0,Math.min(300,xpos2-moveoffset.left-12));
			
			$slider.css('left',calculatedoffset);
			$highlightedstars.css('width',calculatedoffset+3);

			var rating = Math.round(Math.round(calculatedoffset/6))/10;
			//console.log('1 '+rating);
			if (rating == Math.round(rating)) {
				$ratingnumber.text(rating+'.0');
			} else {
				$ratingnumber.text(rating);
			}
			$judgeslider.data('rating',rating);
		});
	});
	$(document).on(uptrigger,function(){
		$(document).off(movetrigger);
		if (is_dragging) {

			var roundedoffset = Math.round(parseInt($slider.css('left'),10)/6)*6;

			$slider.css('left',roundedoffset);
			$highlightedstars.css('width',roundedoffset+3);

			var rating = Math.round(Math.round(roundedoffset/6))/10;
			//console.log('2 '+rating);
			if (rating == Math.round(rating)) {
				$ratingnumber.text(rating+'.0');
			} else {
				$ratingnumber.text(rating);
			}
			$judgeslider.data('rating',rating);

		}
		is_dragging = false;
	});
}


$(document).ready(function(){
	connect_listeners();
	initialize_slider();
});