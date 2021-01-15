var width = 1600;
var height = 32000;

var svg = d3.select("#my_dataviz").append('svg').attr('height', height).attr('width', width);

d3.csv("data.csv", function(data){
    console.log(data)
    var rich_Arr = [];
    var poor_Arr = [];
    var ratio = [];
    var rich = [];
    var poor = [];
    var rich_gdp = [];
    var poor_gdp = [];

    for( var i = 0; i< data.length; i++){
        rich_Arr.push(data[i]['GDP_rich']);
        poor_Arr.push(data[i]['GDP_poor']);
        ratio.push(data[i]['Ratio']);
        rich.push(data[i]['Richer_country']);
        poor.push(data[i]['Poorer_country']);
        rich_gdp.push(data[i]['GDP_rich']);
        poor_gdp.push(data[i]['GDP_poor']);
    }

    console.log(rich_gdp[0])


    rich_Arr = rich_Arr.map(Number);
    poor_Arr = poor_Arr.map(Number);
    ratio =  ratio.map(Number);

    

    var rich_max = Math.max(...rich_Arr);
    var rich_min = Math.min(...rich_Arr);

    var poor_max = Math.max(...poor_Arr);
    var poor_min = Math.min(...poor_Arr);

    var ratio_max = Math.max(...ratio);
    var ratio_min = Math.min(...ratio);

    console.log(ratio_min)
    console.log(ratio_max)
    console.log(ratio[39])

    var continents = ['Africa', 'Asia', 'Africa / Asia', 'Americas', 'Asia / Africa', 'Asia / Oceania',
                        'Europe', 'Europe / Africa', 'Europe / Asia'];

    var lin_scale = d3.scaleLinear().domain([poor_min, rich_max]).range([50, 800]);
    var ratio_scale = d3.scaleLinear().domain([ratio[39], ratio_max]).range([200, 1000]);
    var color_scale = d3.scaleOrdinal(d3.schemeSet3).domain(continents);

    console.log(rich_Arr + "is converted to : " + lin_scale(rich_Arr));
    console.log(poor_Arr + "is converted to : " + lin_scale(poor_Arr));

    var xcoord =  800
    var ycoord = 800

    for(var i = 20;i <40; i++){
        /* console.log(rich_Arr[i] + "is converted to : " + lin_scale(rich_Arr[i]));
        console.log(poor_Arr[i] + "is converted to : " + lin_scale(poor_Arr[i])); */

        




        var coord = xcoord - lin_scale(rich_Arr[i])
        svg.append('rect')
               .attr('x', coord)
               .attr('y', ycoord)
               .attr('width', lin_scale(rich_Arr[i]))
               .attr('opacity', 1)
               .attr('height', lin_scale(rich_Arr[i]))
               .attr('fill', "#de4b4b")
               //.attr('stroke', stroke)
               //.attr('transform', `rotate(45,${coord},${0})`);

        svg.append('text')
        .attr('class', 'rich')
                .attr('x', xcoord - lin_scale(rich_Arr[i])/2)
                .attr('y', ycoord + lin_scale(rich_Arr[i])+30)
               .attr('text-anchor', 'middle')
               .attr('fill', '#de4b4b')
               .style("font-size", "30px")
               .text(function(){
                    var my_str = rich[i]
                    my_str = my_str.replace(/[^A-Z, a-z]/g, '');
                    return my_str;
                })

        svg.append('text')
                .attr('class', 'richgdp')
                        .attr('x', xcoord - lin_scale(rich_Arr[i])/2)
                        .attr('y', ycoord + lin_scale(rich_Arr[i])+60)
                       .attr('text-anchor', 'middle')
                       .attr('fill', '#de4b4b')
                       .style("font-size", "28px")
                       .text(function(){
                            var my_str = rich_gdp[i]
                            //my_str = my_str.replace(/[^A-Z, a-z]/g, '');
                            return my_str;
                        })

        svg.append('rect')
               .attr('x', xcoord)
               .attr('y', ycoord + lin_scale(rich_Arr[i])/2 - lin_scale(poor_Arr[i])/2)
               .attr('width', lin_scale(poor_Arr[i]))
               .attr('opacity', 1)
               .attr('height', lin_scale(poor_Arr[i]))
               .attr('fill', "#45a6a3")
               //.attr('stroke', stroke)
               //.attr('transform', `rotate(45,${coord + coord + coord2},${lin_scale(rich_Arr[i])})`);


        svg.append('text')
        .attr('class', 'poor')
                .attr('x', xcoord + lin_scale(poor_Arr[i])/2)
                .attr('y', ycoord + lin_scale(rich_Arr[i])/2 + lin_scale(poor_Arr[i])/2 +30)
               .attr('text-anchor', 'middle')
               .attr('fill', '#45a6a3')
               .style("font-size", "30px")
               .text(function(){
                    var my_str = poor[i]
                    my_str = my_str.replace(/[^A-Z, a-z]/g, '');
                    return my_str;
               })


        svg.append('text')
               .attr('class', 'poorgdp')
                       .attr('x', xcoord + lin_scale(poor_Arr[i])/2)
                       .attr('y', ycoord + lin_scale(rich_Arr[i])/2 + lin_scale(poor_Arr[i])/2 +60)
                      .attr('text-anchor', 'middle')
                      .attr('fill', '#45a6a3')
                      .style("font-size", "28px")
                      .text(function(){
                           var my_str = poor_gdp[i]
                           //my_str = my_str.replace(/[^A-Z, a-z]/g, '');
                           return my_str;
                      })

        svg.append('rect')
               .attr('x', xcoord)
               .attr('y', ycoord)
               .attr('width', 2)
               .attr('opacity', 1)
               .attr('height', ratio_scale(ratio[i]))
               .attr('fill', "black")
               .attr('class', ratio[i])
               //.attr('stroke', stroke)
               //.attr('transform', `rotate(45,${coord + coord + coord2},${lin_scale(rich_Arr[i])})`);

        svg.append('text')
               .attr('class', 'ratio')
                       .attr('x', xcoord)
                       .attr('y', ycoord +ratio_scale(ratio[i])+30)
                      .attr('text-anchor', 'middle')
                      .attr('fill', 'black')
                      .style("font-size", "30px")
                      .text(ratio[i])


        


        /* svg.append('path')
        .attr('class', 'lines')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.9)
        //.style("stroke-dasharray", ("5, 3"))
        .attr('d', 'M800,' + ycoord + 'V10' ) */

        
        ycoord = ycoord+800;
}



    /* var coord = lin_scale(rich_Arr[0])/ (Math.sqrt(2))
    svg.append('rect')
               .attr('x', coord)
               .attr('y', 0)
               .attr('width', lin_scale(rich_Arr[0]))
               .attr('opacity', 1)
               .attr('height', lin_scale(rich_Arr[0]))
               .attr('fill', "red")
               //.attr('stroke', stroke)
               .attr('transform', `rotate(45,${coord},${0})`);

    var coord2 = lin_scale(poor_Arr[0])/ (Math.sqrt(2))
    svg.append('rect')
               .attr('x', coord + coord + coord2)
               .attr('y', lin_scale(rich_Arr[0]))
               .attr('width', lin_scale(poor_Arr[0]))
               .attr('opacity', 1)
               .attr('height', lin_scale(poor_Arr[0]))
               .attr('fill', "red")
               //.attr('stroke', stroke)
               .attr('transform', `rotate(45,${coord + coord + coord2},${lin_scale(rich_Arr[0])})`); */


})