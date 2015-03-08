var paints = [];
var boxes = [];
var selectedColor = "red";
window.onload = function(){
  paints = document.getElementsByClassName("paint");
  for (var i = 0; i < paints.length; i ++){
    paints[i].addEventListener("click", selectPaint);
  }
  boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i ++){
    boxes[i].addEventListener("click", changeColor);
  }
}

selectPaint = function(){
  selectedColor = this.classList[0];
  this.id = "selected"
  for (var i = 0; i < paints.length; i ++){
    if (paints[i] != this){paints[i].id = ""};
  }
}

changeColor = function(){
  this.className = "box " + selectedColor;
}