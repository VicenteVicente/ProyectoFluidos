let canvas = d3.select('.flowLines')
  .append('svg')
  .attr('width', '1200px')
  .attr('height', '300px');


let botLine = [
  { x: -600, y: 35 },
  { x: -150, y: 40 },
  { x: 0, y: 110 },
  { x: 150, y: 40 },
  { x: 200, y: 20 },
  { x: 300, y: 0 },
]

let topLine = [
  { x: -600, y: -35 },
  { x: -150, y: -40 },
  { x: 0, y: -110 },
  { x: 150, y: -40 },
  { x: 200, y: -20 },
  { x: 300, y: 0 },
]

let lineFunction = d3.line()
  .x(d => (d.x))
  .y(d => (d.y))
  .curve(d3.curveCatmullRom.alpha(1));

let botPath = canvas.append('path')
  .attr('d', lineFunction(botLine))
  .attr('stroke', 'cyan')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('transform', 'translate(600, 150)');

let topPath = canvas.append('path')
  .attr('d', lineFunction(topLine))
  .attr('stroke', 'cyan')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('transform', 'translate(600, 150)');

let circleTop = canvas.append('circle')
  .attr('r', 7)
  .attr('fill', 'orange')
  .attr('transform', 'translate(900, 150)');

let circleBot = canvas.append('circle')
  .attr('r', 7)
  .attr('fill', 'orange')
  .attr('transform', 'translate(900, 150)');

function transition() {
  circleTop
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attrTween('transform', translateAlong(topPath.node()))
    .on('end', transition);
  circleBot
    .transition()
    .ease(d3.easeLinear)
    .duration(2000)
    .attrTween('transform', translateAlong(botPath.node()))
    .on('end', transition)
}

transition();

function translateAlong(path) {
  let l = path.getTotalLength();
  return () => {
    return (t) => {
      let p = path.getPointAtLength((1 - t) * l);
      return `translate(${p.x + 600},${p.y + 150})`
    }
  }
}