var Shape = function(config) {
  var that = this; 
  var obj = null;
  
  this.config = $.extend({
    shape: "square"
  }, config);
  
  this.createShape = function() {
    switch(that.config.shape) {
        case "square":
            obj = new Square(config);
            break;
        case "polygon":
            obj = new Polygon(config);
            break;
        case "triangle":
            obj = new Triangle(config);
            break;
        case "circle":
            obj = new Circle(config);
            break;
        default:
            console.log("Shape " + that.config.shape + " unknown");
    
    }
  }

  this.destroy = function() {
    obj.destroy();
  }

  this.init = function() {
    this.createShape();
    obj.createShape();
  }
}
