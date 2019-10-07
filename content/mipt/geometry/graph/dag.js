d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vQJZL2mLFzWAIQgVQL3WYhmMOSdTi_rXYTtWoSAO1N9k3zD5lhLNsp9qQ6Qm-eFYLmbPMeD3O__Gm2q/pub?output=csv", function(error, table) {
  if (error) throw error;
  table = prepare(table)
  draw(table)
})

function prepare(table){
  table = table.filter(t => t['Идентификатор'].length > 0).map(function(t){
    t['id'] = t['Идентификатор'];
    t['parentIds'] = t['Зависимости']
    .split(', ').filter(t => t.length > 0);
    if (t['parentIds'].length == 0) t['parentIds'].push('origin')
    return t;
  })
  table.push({
    id: 'origin'    
  })
  return table;
}


function DAG(table){
  var dagStratify = d3.dagStratify();
  //dagStratify.id('Идентификатор')
  //dagStratify.parentIds('Зависимости')
  //console.log(prepare(dummy1))
  return dagStratify(table)
}




function draw(table){
  const nodeWidth = 60;
  const nodeHeight = 20;
  const width = 900;
  const height = 900;

  const svgSelection = d3.select('svg');
  svgSelection.attr('width', width+nodeWidth)
              .attr('height', height+nodeHeight)
              .attr('viewbox', `${-nodeWidth} ${-nodeHeight} ${width + 2 * nodeWidth} ${height + 2 * nodeHeight}`);
  const defs = svgSelection.append('defs'); // For gradients
  // see variants here https://observablehq.com/@erikbrinkman/d3-dag-sugiyama
  var dag = DAG(table)
  var layout = d3.sugiyama()
    .size([width, height])
    .layering(d3.layeringSimplex())
    .decross(d3.decrossOpt())
    .coord(d3.coordGreedy())

  dag = layout(dag)
  
  const steps = dag.size();
  const interp = d3.interpolateCool;
  const colorMap = {};
  dag.each((node, i) => {
    colorMap[node.id] = interp(i / steps);
  });
  
  // How to draw edges
  const line = d3.line()
    .curve(d3.curveCatmullRom)
    .x(d => d.x)
    .y(d => d.y);
    
  // Plot edges
  svgSelection.append('g')
    .selectAll('path')
    .data(dag.links())
    .enter()
    .append('path')
    .attr('d', ({ data }) => line(data.points))
    .attr('fill', 'none')
    .attr('stroke-width', 3)
    .attr('stroke', ({source, target}) => {
      const gradId = `${source.id}-${target.id}`;
      const grad = defs.append('linearGradient')
        .attr('id', gradId)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', source.x)
        .attr('x2', target.x)
        .attr('y1', source.y)
        .attr('y2', target.y);
      grad.append('stop').attr('offset', '0%').attr('stop-color', colorMap[source.id]);
      grad.append('stop').attr('offset', '100%').attr('stop-color', colorMap[target.id]);
      return `url(#${gradId})`;
    });
    
  // Select nodes
  const nodes = svgSelection.append('g')
    .selectAll('g')
    .data(dag.descendants())
    .enter()
    .append('g')
    .attr('transform', ({x, y}) => `translate(${x}, ${y})`);
  
  // Plot node circles
  nodes.append('rect')
    .attr("width", 2*nodeWidth)
    .attr("height", 2*nodeHeight)
    .attr('fill', n => colorMap[n.id])
    .append('title')
    .text(d => table.find(t=>t['id']==d.id)['Тема']);

  // Add text to nodes
  nodes.append('text')
    .text(d => d.id)//
    .attr('font-weight', 'bold')
    .attr('font-family', 'sans-serif')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('fill', 'black')
    .attr('width', 2*nodeWidth)
    .attr('height', 2*nodeHeight)
    .attr('transform', ({x, y}) => `translate(${nodeWidth}, ${nodeHeight})`)
    .append('title')
    .text(d => table.find(t=>t['id']==d.id)['Тема']);
  
}

