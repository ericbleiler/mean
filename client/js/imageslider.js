

/*
window.onload = function () {
    x = document.getElementById("navi").childNodes;
    for (var i = 0; i < x.length; i++) {
         x[i].addEventListener("click", function(){
         
            alert(i);
    })
  };
}
  
*/

var image = document.getElementById("imageSlider");
var count = $("#navigator img").length;
var index = 1;
var interval = setInterval(function () {increaseIndex()}, 5000);

function increaseIndex(){
  if(index > 1){index = 0;}
  if(index < count){index++;}
  swapImage(index);
};

function swapImage(i){
    image.height = 400;  
    image.width = 500;
    image.src = "images/img" + i + ".jpg";
};
