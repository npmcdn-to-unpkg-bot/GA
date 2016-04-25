$(document).ready(function () {
})

$(window).scroll(function ()) {
  var scrollTop = $(window).scrollTop()

  if (scrollTop > 20) {
    $('header').css('background', 'red')
  }
  else{
    $('header').css('background', 'blue')
  }
})

})