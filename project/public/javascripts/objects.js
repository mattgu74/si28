var colors = ["#91CFC9", "#E1AFD1", "#FFE60A", "#F6A348"]
var shapes = ["square", "polygon", "triangle", "circle"]

function choose(choices) {
  index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

var shapeConfig = {
  x:200,
  y:200,
  last_x:200,
  last_y:200,
  color:choose(colors),
  shape: "square"
}
var obj1 = new Shape(shapeConfig);
obj1.init();

var shapeConfig = {
  x:100,
  y:200,
  last_x:100,
  last_y:200,
  color:choose(colors),
  shape: "polygon"
}
var obj2 = new Shape(shapeConfig);
obj2.init();

var shapeConfig = {
  x:300,
  y:200,
  last_x:300,
  last_y:200,
  color:choose(colors),
  shape: "triangle"
}
var obj3 = new Shape(shapeConfig);
obj3.init();

var shapeConfig = {
  x:400,
  y:200,
  last_x:400,
  last_y:200,
  color:choose(colors),
  shape: "circle"
}
var obj4 = new Shape(shapeConfig);
obj4.init();
