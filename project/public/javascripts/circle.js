var Circle = function(config, shape) {
  var that = this;

  this.config = $.extend({
    radius: 23
  }, config);
  
  this.createShape = function() {
    shape.objectGroup = new Kinetic.Group({
      shape: that,
      x: that.config.x,
      y: that.config.y,
      last_x: that.config.last_x,
      last_y: that.config.last_y,
      color: that.config.color,
      shape: "circle",
      draggable: true
    });

    shape.object = new Kinetic.Circle({
      x: 0,
      y: 0,
      radius:this.config.radius,
      fill: that.config.color
    });

    shape.objectBorder = new Kinetic.Circle({
      x: 0,
      y: 0,
      radius:this.config.radius + 9,
      fill: 'transparent',
      stroke: that.config.color,
      strokeWidth: 1
    });

    shape.objectOuterBorder = new Kinetic.Circle({
      x: 0,
      y: 0,
      radius:this.config.radius + 17,
      fill: 'black',
      stroke: that.config.color,
      strokeWidth: 5
    });
  }
  
  this.loadAnimation = function(duration) {
  /* CIRCLE DESTROY ANIMATION */
    var arc = new Kinetic.Shape({
      drawFunc: function(context) {
          var x = 0;
          var y = 0;
          var radius = 39;
          var startAngle = -0.5 * Math.PI;
          var endAngle = this.getAttr('pourcent') * Math.PI;
          context.beginPath();
          context.arc(x, y, radius, startAngle, endAngle, false);
          context.fillStrokeShape(this);
      },
      stroke:"#000000",
      strokeWidth:9,
      pourcent:-0.49
    });
    
    shape.objectGroup.add(arc);

    var tween = new Kinetic.Tween({
      node:arc,
      duration:duration,
      pourcent:1.5,
      onFinish:function() {
        shape.destroyAnimation();
      }
    });
    
    shape.tweens = [tween];
  }
  
}
