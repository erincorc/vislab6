let unemp = d3.csv('unemployment.csv', d3.autoType).then( d => {
    console.log(d)
    console.log(d3.sum(d))
});