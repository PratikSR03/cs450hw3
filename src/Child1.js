import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

const Child1 = ({ data }) => {
    const svgWhole = useRef();

    useEffect(() => {
        if (data.length === 0) return;

        const margin = { top: 20, right: 30, bottom: 50, left: 50 };
        const width = 500 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const svg = d3.select(svgWhole.current).attr("width", 500).attr("height", 300).append("g").attr("transform", `translate(${margin.left}, ${margin.right})`);
        const xScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.total_bill)]).range([0,width]);
        const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.tip)]).range([height,0]);

        svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(xScale));
        svg.append("g").call(d3.axisLeft(yScale));
        svg.selectAll("circle").data(data).enter().append("circle").attr("cx", (d) => xScale(d.total_bill)).attr("cy", (d) => yScale(d.tip)).attr("r",4).attr("fill", "#69b3a2");
        svg.append("text").attr("x", width/2).attr("y", height + 40).attr("text-anchor", "middle").text("Total Bill");
        svg.append("text").attr("transform", "rotate(-90)").attr("x", -height/2).attr("y", -40).attr("text-anchor", "middle").text("Tips");;
        svg.append("text").attr("x", width/2).attr("y", -10).attr("text-anchor", "middle").style("font-size", "16px").text("Total Bill VS. Tips");
    }, [data]);

    return <svg ref={svgWhole}></svg>;
}

export default Child1;