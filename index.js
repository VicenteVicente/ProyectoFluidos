let GOLF = false;

const canvas = d3.select('#flowLines')
  .append('svg')
  .attr('width', 1200)
  .attr('height', 300);

const botLineGolf = [
  { x: -600, y: 35 },
  { x: -150, y: 40 },
  { x: 0, y: 110 },
  { x: 150, y: 40 },
  { x: 200, y: 20 },
  { x: 300, y: 0 },
]

const botLineNormal = [
  { x: -600, y: 80 },
  { x: -120, y: 80 },
  { x: 0, y: 110 },
  { x: 150, y: 40 },
  { x: 200, y: 20 },
  { x: 300, y: 0 },
]

const lineFunction = d3.line()
  .x(d => (d.x))
  .y(d => (d.y))
  .curve(d3.curveCatmullRom.alpha(1));

const botPath = canvas.append('path')
  .attr('d', lineFunction(botLineNormal))
  .attr('stroke', 'cyan')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('transform', 'translate(600, 150)');
const botPath2 = canvas.append('path')
  .attr('d', lineFunction(botLineNormal.map(d => ({ x: d.x, y: d.y + 30 }))))
  .attr('stroke', 'cyan')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('transform', 'translate(600, 150)');
const topPath = canvas.append('path')
  .attr('d', lineFunction(botLineNormal.map(d => ({ x: d.x, y: -d.y }))))
  .attr('stroke', 'cyan')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('transform', 'translate(600, 150)');
const topPath2 = canvas.append('path')
  .attr('d', lineFunction(botLineNormal.map(d => ({ x: d.x, y: -d.y - 30 }))))
  .attr('stroke', 'cyan')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('transform', 'translate(600, 150)');

const circleTop = canvas.append('circle')
  .attr('r', 7)
  .attr('fill', 'orange');
const circleTop2 = canvas.append('circle')
  .attr('r', 7)
  .attr('fill', 'orange');
const circleBot = canvas.append('circle')
  .attr('r', 7)
  .attr('fill', 'orange');
const circleBot2 = canvas.append('circle')
  .attr('r', 7)
  .attr('fill', 'orange');


function transition() {
  circleTop
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attrTween('transform', translateAlong(topPath.node()))
    .on('end', transition);

  circleTop2
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attrTween('transform', translateAlong(topPath2.node()))
    .on('end', transition);

  circleBot
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attrTween('transform', translateAlong(botPath.node()))
    .on('end', transition);

  circleBot2
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attrTween('transform', translateAlong(botPath2.node()))
    .on('end', transition);
}

transition();

function translateAlong(path) {
  const l = path.getTotalLength();
  return () => {
    return (t) => {
      const p = path.getPointAtLength((1 - t) * l);
      return `translate(${p.x + 600},${p.y + 150})`
    }
  }
}


d3.select('#btn').on('click', () => {
  const current = (GOLF) ? botLineNormal : botLineGolf;
  const img = (GOLF) ? 'normal.png' : 'golf.png';
  GOLF = !GOLF;

  botPath.transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr('d', lineFunction(current));

  botPath2.transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr('d', lineFunction(current.map(d => ({ x: d.x, y: d.y + 30 }))));

  topPath.transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr('d', lineFunction(current.map(d => ({ x: d.x, y: -d.y }))));

  topPath2.transition()
    .duration(500)
    .ease(d3.easeLinear)
    .attr('d', lineFunction(current.map(d => ({ x: d.x, y: -d.y - 30 }))));

  d3.select('#ball')
    .attr('src', img);

  d3.select('#btn')
    .text(GOLF ? 'Cambiar a pelota lisa' : 'Cambiar a pelota de golf')
    .style('background-color', 'cyan')
    .style('color', 'black')
    .transition()
    .duration(200)
    .ease(d3.easeLinear)
    .style('background-color', 'transparent')
    .style('color', 'cyan');
})