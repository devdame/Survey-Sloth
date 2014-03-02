var dispatch = d3.dispatch("load", "statechange");

//groups would be the responses to the currently selected question
var groups = [
  "Response1",
  "Response2",
  "Response3",
  "Response4",
  "Response5",
  "Response6",
  "Response7"
];

d3.csv("../js/survey.csv", type, function(error, questions) {
  if (error) throw error;
  var questionById = d3.map(); //make a new array?
  questions.forEach(function(d) { questionById.set(d.id, d); }); //for each row 
  dispatch.load(questionById);
  dispatch.statechange(questionById.get("What is your favorite color?"));
});

// A drop-down menu for selecting a state; uses the "menu" namespace.
dispatch.on("load.menu", function(questionById) {
  var select = d3.select(".analytics")
    .append("div")
    .append("select")
      .on("change", function() { dispatch.statechange(questionById.get(this.value)); });

  select.selectAll("option")
      .data(questionById.values())
    .enter().append("option")
      .attr("value", function(d) { return d.id; })
      .text(function(d) { return d.id; });

  dispatch.on("statechange.menu", function(question) {
    select.property("value", questionById.id);
  });
});

// A pie chart to show population by age group; uses the "pie" namespace.
dispatch.on("load.pie", function(questionById) {
  var width = 880,
      height = 460,
      radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .domain(groups)
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 70);

  var pie = d3.layout.pie()
      .sort(null);

  var svg = d3.select(".analytics").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var path = svg.selectAll("path")
      .data(groups)
    .enter().append("path")
      .style("fill", color)
      .each(function() { this._current = {startAngle: 0, endAngle: 0}; });

  dispatch.on("statechange.pie", function(d) {
    path.data(pie.value(function(g) { return d[g]; })(groups)).transition()
        .attrTween("d", function(d) {
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            return arc(interpolate(t));
          };
        });
  });
});

// Coerce population counts to numbers and compute total per state.
function type(d) {
  d.total = d3.sum(groups, function(k) { return d[k] = +d[k]; });
  return d;
}
