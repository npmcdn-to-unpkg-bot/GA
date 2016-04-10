// $(document).ready(function() {
//     console.log("ready!");
// });

//     $('#clickme').click(function() {
//     // total = total+1;
//     total++;
//     $('#click-num').text(total);


//   $(function() {
//     console.log( "ready!" );
// });
// ​
// var total = 0;



// $('box1').click(function () {
//   total = total - 32) / 1.8
//   $('box1Tote').html(total)
// }
// ​
// if (total>=100) {
//   $('.celci').css('background-color', rgb (255,124, 117));
// } else if (total<=100).css('background-color', rgb (117, 182, 255));
// } else {
//   $('.celci').css('background-color', rgb(117,255,122));
// }
// ​
// $('faren').click(function () {
//   total = total * 1.8 + 32
//   $('farenTote').html(total)
// }
// })

function convertTemp() {
 var c = document.getElementById('c'), f = document.getElementById('f');
 if(c.value != '') {
  f.value = Math.round(c.value * 9 / 5 + 32);
  c.value = '';
 } else  {
  c.value = Math.round((f.value - 32) * 5 / 9);
  f.value = '';
 }
}

