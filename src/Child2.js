import { useEffect, useRef } from 'react';
import * as d3 from "d3";

const Child2 = ({ data }) => {
    const svgWhole = useRef();

    useEffect(() => {
        if (data.length === 0) return;

        const tipPerDay = d3.rollup(data, (v) => d3.mean(v,(d) => d.tip), (d) => d.day);
        const days = Array.from(tipPerDay.keys());
        const tipAvg = Array.from(tipPerDay.values());

        const margin = { top: 20, right: 30, bottom: 50, left: 50 };
        const width = 500 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const svg = d3.select(svgWhole.current).attr("width", 500).attr("height", 300).append("g").attr("transform", `translate(${margin.left}, ${margin.right})`);
        const xScale = d3.scaleBand().domain(days).range([0,width]).padding(0.3);
        const yScale = d3.scaleLinear().domain([0, d3.max(tipAvg)]).range([height,0]);

        svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(xScale));
        svg.append("g").call(d3.axisLeft(yScale));
        svg.selectAll(".bar").data(days).enter().append("rect").attr("class","bar").attr("x", (d) => xScale(d)).attr("y", (d,i) => yScale(tipAvg[i])).attr("width", xScale.bandwidth()).attr("height", (d,i) => height - yScale(tipAvg[i])).attr("fill", "#69b3a2");
        svg.append("text").attr("x", width/2).attr("y", height + 40).attr("text-anchor", "middle").text("Day");
        svg.append("text").attr("transform", "rotate(-90)").attr("x", -height/2).attr("y", -40).attr("text-anchor", "middle").text("Average Tip");;
        svg.append("text").attr("x", width/2).attr("y", -10).attr("text-anchor", "middle").style("font-size", "16px").text("Average Tip by Day");

    }, [data]);

    return <svg ref={svgWhole}></svg>;
};

export default Child2;