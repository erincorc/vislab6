const margin = ({top: 20, right: 35, bottom: 20, left: 40})
const width = 800 - margin.left - margin.right
const height = 300 - margin.top - margin.bottom


d3.csv('unemployment.csv', d3.autoType).then( d => {
    console.log(d);
    dataset = d;
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
     //   let dat = d.date
     //   console.log(d.substr(0,4))
        })
    console.log(dataset)
    const areaChart = AreaChart('.chart')
    areaChart.update(dataset)
    })


// input: selector for a chart container e.g., ".chart"
function AreaChart(container){

    // INITIALIZATION

    // create SVG with margin convention
    const svg = d3.selectAll(container).append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    const x = d3.scaleTime()
        .range([0, width])

    const y = d3.scaleLinear()
        .range([height, 0])

    const xAxis = d3.axisBottom()
        .scale(x)
        .ticks(10)

    const yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10)

    svg.append("g")
        .attr("class", "x-axis")
    //    .attr("transform", `translate(0, ${height})`)
    
    svg.append("g")
        .attr("class", "y-axis")
    
    // Create a single path for the area and assign a class name so that you can select it in update
    svg.append("path")
        .attr('class', 'path-class')

    xAxis.ticks(10)
    yAxis.ticks(8)
    

	function update(data){ 
        //  Update the domains of the scales using the data passed to update
        // update scales, encodings, axes (use the total count)

        x.domain(d3.extent(data, d => d.date))

        y.domain([0, d3.max(data, d => d.total)])

        // Create an area generator using d3.area
        let area = d3.area()
            .x(d => x(d.date))
            .y1(d => y(d.total))
            .y0(d => y.range()[0])
        
        d3.select('.path-class')
            .datum(data)
            .attr("d", area)
            .attr("fill", "navy")

        svg.select('.x-axis')
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)

        svg.select('.y-axis')
            .call(yAxis)
	}

	return {
		update // ES6 shorthand for "update": update
	};
}




d3.csv('unemployment.csv', d3.autoType).then( d => {
    console.log(d);
    dataset2 = d;
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
     //   let dat = d.date
     //   console.log(d.substr(0,4))
        })
    console.log(dataset2)
    const stackedChart =StackedAreaChart('.stacked')
    stackedChart.update(dataset2)
    })


function StackedAreaChart(container) {


	// initialization
    const svg2 = d3.selectAll(container).append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


    const x = d3.scaleTime()
        .range([0, width])

    const y = d3.scaleLinear()
        .range([height, 0])

    const xAxis = d3.axisBottom()
        .scale(x)
        .ticks(10)

    const yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10)

    const categories = d3.scaleOrdinal()
        .range(d3.schemeAccent)

    // x = scaleTime
    // y = scaleLinear

    svg2.append("g")
        .attr("class", "x-axis-stack2")
      //  .attr("transform", `translate(0, ${height})`)

    svg2.append("g")
        .attr("class", "y-axis-stack2")

    svg2.append('path')
        .attr('class', 'stackpath')


	function update(data){ 

        const keys = data.columns.slice(1)

        let stack = d3.stack()
            .keys(keys)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);

        let stacked = stack(data)

        console.log(data)

        x.domain(d3.extent(data, d => d.date))
        y.domain([0, d3.max(stacked, c => d3.max(c, d => d[1]))])
        categories.domain(keys)

        const stackArea = d3.area()
            .x(d => x(d.data.date))
            .y0(d => y(d[0]))
            .y1(d => y(d[1]))

        const areas = svg2.selectAll('stack')
            .data(stacked, d => d.key);

        areas.enter()
            .append('path')
            .style('fill', d => categories(d.key))
            .merge(areas)
            .attr("d", stackArea)

        areas.exit().remove()

        svg2.select('.x-axis-stack2')
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)

        svg2.select('.y-axis-stack2')
            .call(yAxis)

    

    }
    
	return {
		update
	}
}