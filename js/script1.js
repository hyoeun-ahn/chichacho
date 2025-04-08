$(document).ready(function(){

  // top-menu_____________________
  $(".gnb-main").hover(function(){
    $(this).find(".gnb-sub").stop().slideDown();
  }, function(){
    $(this).find(".gnb-sub").stop().slideUp();
  });
  


// main___________________________
let slideWrapper = $('.main'),
slides = slideWrapper.find('.slide-list li'),
currentIdx = 0,
slideIndicator = slideWrapper.find('.indicator a');

slides.each(function(idx){
  $(this).css({left:`${idx*100}%`});
});

slideIndicator.click(function(e){
  e.preventDefault();
  let idx = $(this).index();
  moveSlide(idx);
});



//moveSlide함수__________________________
function moveSlide(i){
  if(currentIdx === i) return;

  let currentSlide = slides.eq(currentIdx);
  let nextSlide = slides.eq(i);

  nextSlide.css({left:'100%'}).animate({left:'0%'});
  currentSlide.css({left:'0%'}).animate({left:'-100%'});
  currentIdx = i;

  slideIndicator.removeClass('active');
  slideIndicator.eq(currentIdx).addClass('active');
};

function autoSlide(){
  slideTimer = setInterval(function(){
    let ni = (currentIdx + 1)%slides.length;
    moveSlide(ni);
  },5000);
};
autoSlide();


slideWrapper.mouseenter(function(){
clearInterval(slideTimer);
})
.mouseleave(function(){
autoSlide()
});






// menu__________________________
let slideContainer = $('.menu-slide'),
    slideWidth = slideContainer.width(),
    slideHeight = slideContainer.height(),
    slideCount = $('.menu-card').length,
    slideItemsWidth = slideWidth * slideCount,
    slidePrev = slideContainer.find('.menu-btn .prev'),
    slideNext = slideContainer.find('.menu-btn .next');

  $('.menu-card-item').css({'width': slideWidth, 'height': slideHeight}); 
  $('.menu-card').css({'width': slideItemsWidth, 'height': slideHeight}); 
  $('.menu-card-item:last-child').prependTo($('.menu-card')); 
  $('.menu-card').css({'margin-left': -slideWidth}); 


  function slideLeft(){
    $('.menu-card').stop().animate({left: -slideWidth}, 1000, function(){
      $('.menu-card').css({'left': 0}); 
      $('.menu-card-item:first-child').appendTo('.menu-card'); 
    });   
  };

  function slideRight(){
    $('.menu-card').stop().animate({left: slideWidth}, 1000, function(){
      $('.menu-card').css({'left': 0});  //최종위치
      $('.menu-card-item:last-child').prependTo('.menu-card'); 
    });   
  };

  slideAuto = setInterval(slideLeft, 5000);


slidePrev.click(function(e){
  e.preventDefault(); 
  slideRight();
});

slideNext.click(function(e){
  e.preventDefault();
  slideLeft();
});

//마우스오버 멈춤
slideContainer.mouseenter(function(){
  clearInterval(slideAuto);
})
.mouseleave(function(){
  slideAuto = setInterval(slideLeft, 5000);
});




});