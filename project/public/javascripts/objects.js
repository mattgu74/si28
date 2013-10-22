var stage = new Kinetic.Stage({
  container: 'container',
  width: window.innerWidth - 300,
  height: window.innerHeight,
  x: 286,
  y: 100,
  offset: [289, 100]
});

var layer = new Kinetic.Layer();

var squareConfig = {
  x:100,
  y:200,
  color:"#FFE603"
}
var square = new Square(squareConfig);
square.init();

var polygonConfig = {
  x:250,
  y:225,
  color:"#FFACF8"
}
var polygon = new Polygon(polygonConfig);
polygon.init();

var triangleConfig = {
  x:400,
  y:225,
  color:"#78FBE0"
}
var triangle = new Triangle(triangleConfig);
triangle.init();

var circleConfig = {
  x:550,
  y:225,
  color:"#FFA543"
}
var circle = new Circle(circleConfig);
circle.init();


stage.add(layer);