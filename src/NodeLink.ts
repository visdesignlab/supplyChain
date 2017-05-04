import * as events from 'phovea_core/src/event';


import {select, selectAll,event} from 'd3-selection';
import {
  scaleLinear,
  scaleOrdinal,
  schemeCategory20
} from 'd3-scale';

import {forceSimulation,forceLink,forceManyBody,forceCenter} from 'd3-force';

import{drag} from 'd3-drag';

import {
  max,
  min
} from 'd3-array';

import {json} from 'd3-request';
import {isUndefined} from 'util';

/**
 * Creates the nodeLink Diagram view
 */
class NodeLink {

  private $node;

  private simulation;

  constructor(parent: Element) {
    this.$node = select(parent);
  }

  /**
   * Initialize the view and return a promise
   * that is resolved as soon the view is completely initialized.
   * @returns {Promise<FamilySelector>}
   */
  init() {
    this.build();
    // return the promise directly as long there is no dynamical data to update
    return Promise.resolve(this);
  }


  /**
   * Build the basic DOM elements and binds the change function
   */
  private build() {

    const graph = {
      'nodes': [
        {'id': 'Orbital ATK', 'group': 1},
        // {'id': 'TCR', 'group': 8},
        {'id': 'Composite One', 'group': 5},
        {'id': 'Advanced  Composite Technologies "ACT"', 'group': 1},
        {'id': 'Hexcel', 'group': 4},
        {'id': 'Albany', 'group': 1},
        {'id': 'Janicki', 'group': 4},
        {'id': 'Lockheed Martin', 'group': 6},
        // {'id': 'Boeing', 'group': 5},
        {'id': 'BTG', 'group': 1},
        {'id': 'Northrop Grumman', 'group': 6},
        {'id': 'Affiliated Metals', 'group': 1}

      ],
      'links': [
        {'source': 'Orbital ATK', 'target': 'Janicki', 'value': 1},
        {'source': 'Janicki', 'target': 'Albany', 'value': 8},
        {'source': 'Affiliated Metals', 'target': 'Orbital ATK', 'value': 10},
        {'source': 'Affiliated Metals', 'target': 'Janicki', 'value': 6},
        {'source': 'Affiliated Metals', 'target': 'Albany', 'value': 6},
        {'source': 'Affiliated Metals', 'target': 'Advanced  Composite Technologies "ACT"', 'value': 6},
        {'source': 'BTG', 'target': 'Advanced  Composite Technologies "ACT"', 'value': 8},
        {'source': 'BTG', 'target': 'Albany', 'value': 8},
        {'source': 'Hexcel', 'target': 'Albany', 'value': 8},
        {'source': 'Hexcel', 'target': 'Advanced  Composite Technologies "ACT"', 'value': 8},
        {'source': 'Hexcel', 'target': 'Orbital ATK', 'value': 8},
        {'source': 'Hexcel', 'target': 'Northrop Grumman', 'value': 8},
        {'source': 'Albany', 'target': 'Orbital ATK', 'value': 8},
        {'source': 'Composite One', 'target': 'Orbital ATK', 'value': 8},
        {'source': 'Advanced  Composite Technologies "ACT"', 'target': 'Orbital ATK', 'value': 8},
        {'source': 'Orbital ATK', 'target': 'Northrop Grumman', 'value': 8},
        {'source': 'Orbital ATK', 'target': 'Lockheed Martin', 'value': 8}
      ]
    }


    const  width = 600;
    const height = 500;

    const svg = select('#nodeLink').append('svg')
      .attr('width',width)
      .attr('height',height)


    const color = scaleOrdinal(schemeCategory20);

   this.simulation = forceSimulation()
      .force('link', forceLink().id(function (d:any) {
        return d.id;
      }).distance(100))
      .force('charge', forceManyBody().strength(-100))
      .force('center', forceCenter(width / 2, height / 2));


      let link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graph.links);

      const linkEnter = link.enter().append('line');

      link = linkEnter.merge(link);

      link
        .attr('stroke-width', function (d:any) {
          return Math.sqrt(d.value);
        });

      let node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(graph.nodes);

      const nodeEnter = node
        .enter().append('g');

      nodeEnter
        .append('circle');

      node = nodeEnter.merge(node);

      node.select('circle')
        .attr('r', 8)
        .attr('fill', function (d) {
          return color(String(d.group));
        })
        // .call(drag()
        //   .on('start', dragstarted)
        //   .on('drag', dragged)
        //   .on('end', dragended));

      nodeEnter.append('title');

      node.select('title')
        .text(function (d) {
          return d.id;
        });

    nodeEnter.append('text')
      .classed('label',true);

    node.select('.label')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text(function(d) {return d.id; });

      this.simulation
        .nodes(graph.nodes)
        .on('tick', ticked);
      //
      this.simulation.force('link')
        .links(graph.links);

    function ticked() {
      link
          .attr('x1', function (d:any) {
            return d.source.x;
          })
          .attr('y1', function (d:any) {
            return d.source.y;
          })
          .attr('x2', function (d:any) {
            return d.target.x;
          })
          .attr('y2', function (d:any) {
            return d.target.y;
          });

        // node
        //   .attr('cx', function (d:any) {
        //     return d.x;
        //   })
        //   .attr('cy', function (d:any) {
        //     return d.y;
        //   });

      node.attr('transform', function(d:any) { return 'translate(' + d.x + ',' + d.y + ')'; });

    }


  function dragstarted(d:any) {
      if (!event.active) {
        this.simulation.alphaTarget(0.8).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

  function  dragged(d:any) {
      d.fx = event.x;
      d.fy = event.y;
    }

  function dragended(d:any) {
      if (!event.active) {
        this.simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }


  };







}


/**
 * Factory method to create a new instance of the attributePanel
 * @param parent
 * @param options
 * @returns {attributePanel}
 */
export function create(parent:Element) {
  return new NodeLink(parent);
}
