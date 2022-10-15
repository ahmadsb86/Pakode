const scrollTime = 500


$(function(){


  /* ----------------------- Super Sketchy Typing Effect ---------------------- */
  function addChar(elm, speed, idx){
    let string = elm.attr('to-type')
    setTimeout(function(){
      elm.empty().append(string.slice(0,idx+1) + '|')
      idx++
      if(idx < string.length)
        addChar(elm, speed, idx)
      else{
        blink(elm)
      }
    }, speed);
  }
  function blink(elm){
    let string = elm.attr('to-type')
    setTimeout(function(){
      elm.empty().append(string + '&nbsp;');
      setTimeout(function(){
        elm.empty().append(string + '|');
        blink(elm)
      }, 700);
    }, 700);
    
  }

  function type(elm){
    
  }

  $('.typed').each(function(){
    addChar($(this), $(this).attr('speed'), 0)
  })


  // ad dChar($('.typed'), $('.typed').attr('speed'))




  /* ----------------------------- Mobile Nav bar ----------------------------- */
    $("#hamburger").click(function(){
      $("#nav").animate({width:'toggle'},350).toggleClass("open");
    })
    $(".page").click(function(){
      if($("#nav").hasClass("open")){
        $("#nav").animate({width:'toggle'},350);
        $("#nav").removeClass("open");
      }
    })


  /* ----------------------------- Page Navigation ---------------------------- */


  //fancy scroll effect
  pages = $('.page')
  activePage = $('#home')
  activePageIndex = 0
  function scrollTo(page){

    pages.fadeOut(scrollTime/2)
    setTimeout(function(){
      page.fadeIn(scrollTime/2)
    }, scrollTime/2)

    $(".nav-el").removeClass("text-green")
    $(".nav-el").addClass("text-front")
    $(".nav-el").removeClass("scale-150")
    elmSelector = '[toPage=' + page.attr('id') + ']'
    $( elmSelector ).addClass('text-green')
    $( elmSelector ).removeClass('text-front')

    activePage = page
    activePageIndex= activePage.index()

  }

  
  //Detect scroll (its harder than it sounds)
  function onScroll(callback){

    //computer
    var canScroll = true,
    scrollController = null;
    pages.eq(activePageIndex).fadeIn(scrollTime)
  
    $(this).on('mousewheel DOMMouseScroll', function(e){
  
      e.preventDefault();
      var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;
      if (delta > 50 && canScroll){
        callback(1)
      }
      else if (delta < -50 && canScroll) {
        callback(-1)
      } 
      else return

      canScroll = false;
      clearTimeout(scrollController);
      scrollController = setTimeout(function(){
        canScroll = true;
      }, scrollTime);

    });

    //mobile

    var hammer = new Hammer($('body')[0]);
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    hammer.on("swipeup", function (e) { 
      console.log(e)
      callback(1)
    });
    hammer.on("swipedown", function (e) { 
      console.log(e)
      callback(-1)
    });

  }

  //scroll behaviour
  onScroll(function(dir){

    if(dir==1){
      activePageIndex= (activePageIndex+1)%pages.length
    }
    else{
      activePageIndex-=1
      if(activePageIndex<0) activePageIndex= pages.length-1
    }

    scrollTo(pages.eq(activePageIndex))

  })


  //Nav bar behaviour
  $(".nav-el").click(function(){
    scrollTo( $( '#' + $(this).attr('toPage') ) )
  })




});

