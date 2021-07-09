<template>
  <div class="analysis">
    <div>
      <div id="chart"></div>
      <!-- <svg id="chart"></svg> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as d3 from "d3";

export default {
  data: function () {
    return {
      applications: [],
      width: 1200,
      height: 800,
      margin: {
        top: 12,
        right: 12,
        left: 12,
        bottom: 12,
      },
    };
  },

  created: function () {
    axios.get("/applications").then((response) => {
      console.log("Applications array", response.data);
      this.applications = response.data;
      console.log(this.init(this.applications));
    });
  },

  methods: {
    init(data) {
      //We are accessing the div with the id chart using d3's select method and appending svg
      // /* eslint-disable no-unused-vars */
      let svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .style(
          "transform",
          `translate(${this.margin.left}px, ${this.margin.top}px)`
        );

      // a Set is a convenient way to remove duplicates
      let distances = Array.from(new Set(data.map((d) => d.Distance)));
      // we'll separate our parallel swarms by 50 pixels each
      let xCoords = distances.map((d, i) => 50 + i * 50);
      let xScale = d3.scaleOrdinal().domain(distances).range(xCoords);

      // Y-Scale
      let yScale = d3
        .scaleLinear()
        .domain(d3.extent(data.map((d) => +d["distance"])))
        .range([this.height - 100, 100]); // using 100 just to provide some margin at the top and bottom

      // Color Scale: each sector gets its own color
      let color = d3.scaleOrdinal().domain(distances).range(d3.schemePaired);

      // Maps an attribute to the circle radius
      let enthusiasmDomain = d3.extent(data.map((d) => d["enthusiasm"]));
      // we'll use the square root of enthusiasm for a better scale
      enthusiasmDomain = enthusiasmDomain.map((d) => Math.sqrt(d));
      // our circle radii will range from 5-30px
      let size = d3.scaleLinear().domain(enthusiasmDomain).range([5, 30]);

      // Adds circle elements
      svg
        .selectAll(".circ")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circ")
        .attr("stroke", "black")
        .attr("fill", (d) => color(d.Sector))
        .attr("r", (d) => size(Math.sqrt(d["enthusiasm"])))
        .attr("cx", (d) => xScale(d.Sector))
        .attr("cy", (d) => yScale(d.Return));
    },
    // /* eslint-disable no-unused-vars */
  },
};
</script>
