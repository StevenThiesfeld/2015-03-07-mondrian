var paints = [];
var boxes = [];
var selectedColor = "red";
var currentMondrian = "";
window.onload = function(){
  paints = document.getElementsByClassName("paint");
  for (var i = 0; i < paints.length; i ++){
    paints[i].addEventListener("click", selectPaint);
  }
  boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i ++){
    boxes[i].addEventListener("click", changeColor);
  }
  document.getElementById("save_button").addEventListener("click", savePainting);
  document.getElementById("load_form").addEventListener("submit", loadMondrian);
}

var selectPaint = function(){
  selectedColor = this.classList[0];
  this.id = "selected"
  for (var i = 0; i < paints.length; i ++){
    if (paints[i] != this){paints[i].id = ""};
  }
}

var changeColor = function(){
  this.className = "box " + selectedColor;
}

var savePainting = function(){
  var request = new XMLHttpRequest();
  var form = new FormData();
  if (currentMondrian === ""){
  request.open("post", "http://127.0.0.1:4567/new");
  form.append("name", prompt("Enter Mondrian Name"));
  }else{
    request.open("post", "http://127.0.0.1:4567/save");
    form.append("id", currentMondrian.id);
  }
  form.append("box_colors", setBox_colors()); 
  request.send(form);
  request.addEventListener("load", function(){
    setCurrentMondrian(this);
  });
}

var loadMondrian = function(event){
  event.preventDefault();
  console.log("hello from loadMondrian");
  var request = new XMLHttpRequest();
  request.open("post", "http://127.0.0.1:4567/load");
  request.send(new FormData(this));
  request.addEventListener("load", mondrianLoaded);
}

var mondrianLoaded = function(){
  console.log("hello from mondrianLoaded");
  setCurrentMondrian(this);
  setColors();
}

function setColors(){
  var colorsArray = currentMondrian.box_colors.split(" ");
  colorsArray.pop();
  for (var i = 0; i < boxes.length; i ++){
    boxes[i].className = "box " + colorsArray[i];
  }
}

var setCurrentMondrian = function(request){
  currentMondrian = JSON.parse(request.response);
  document.getElementById("currentMondrian").innerHTML = currentMondrian.name;
}

function setBox_colors(){
  var box_colors = "";
  for (var i = 0; i < boxes.length; i ++){
    box_colors += boxes[i].classList[1] + " ";
  }
  return box_colors;
}