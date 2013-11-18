var shapeConfig = {
  x:100,
  y:200,
  last_x:100,
  last_y: 200,
  color:"#FFE603"
}

var Shape = function(config) {
  var that = this; 

  this.config = $.extend({
    x:200,
    y:200,
    last_x: 100,
    last_y: 200,
    color:"#F00",
    size: 40,
    shape: "square"
  }, config);

  this.createShape = function() {
    switch(that.config.shape) {
        case "square":
            that = Square(config);
        default:
            console.log("Shape " + that.config.shape + " unknown");
    
    }
  }

  this.init = function() {
    this.createShape();
  }
}

var obj1 = Shape(shapeConfig);
