var colors = ["#91CFC9", "#E1AFD1", "#FFE60A", "#F6A348"]
var shapes = ["square", "polygon", "triangle", "circle"]

function choose(choices) {
  index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
