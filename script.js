const margin = ({top: 20, right: 35, bottom: 20, left: 40});
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

let unemp = d3.csv('unemployment.csv', d3.autoType).then( d => {
    console.log(d)
    total_count = 0
    d.forEach(function(d) {
        total_count = 0
        total_count += d.Agriculture
        total_count += d['Wholesale and Retail Trade']
        total_count += d.Manufacturing
        total_count += d['Leisure and hospitality']
        total_count += d['Business services']
        total_count += d.Construction
        total_count += d['Education and Health']
        total_count += d.Government
        total_count += d.Finance
        total_count += d['Self-employed']
        total_count += d.Other
        total_count += d['Transportation and Utilities']
        total_count += d.Information
        total_count += d['Mining and Extraction']
        d['total'] = total_count // add total count to dataset
        let dat = d.date
        console.log(dat.substr(0,4))
    })
    console.log(d)
    updatedData = d
    AreaChart('.chart', d)
});

// input: selector for a chart container e.g., ".chart"
function AreaChart(container){

    // initialization 
    // create SVG with margin convention
    const svg = d3.select('.chart').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3.scaleTime()
        .range([0, width])
    
    const yScale = d3.scaleLinear()
        .range([height, 0])

    const xAxis = d3.axisBottom()
        .scale(xScale)
    
    const yAxis = d3.axisLeft()
        .scale(yScale)
    
    let line = d3.line()

    const path = d3.select('.chart')
        .append('path')
        .attr("d", line(d))
        .attr('stroke', 'black')

    svg.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
    
    svg.append("g")
        .attr("class", "y-axis axis")
        .call(yAxis)

	function update(data){ 

        // update scales, encodings, axes (use the total count)
        xScale.domain([0, max(data.map(d => d.date))])
        yScale.domain([0, data.map(d => d.total)])

        let area = d3.area()
            .x(data => x(data.date))
            .y1(data => y(data.total))
            .y0((y0));
        
        d3.select('.path-chart')
            .datum(data)
            .attr("d", area)

		
	}

	return {
		update // ES6 shorthand for "update": update
	};
}

const c = AreaChart();
c.update();