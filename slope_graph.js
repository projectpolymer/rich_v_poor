var width = 1200;
var height = 1200;

var svg = d3.select("#my_dataviz").append('svg').attr('height', height).attr('width', width);

d3.csv("data.csv", function(data){

    var rich_Arr = [];
    var poor_Arr = [];

    for( var i = 0; i< data.length; i++){
        rich_Arr.push(data[i]['GDP_rich'])
        poor_Arr.push(data[i]['GDP_poor'])
    }

    
    rich_Arr = rich_Arr.map(Number);
    poor_Arr = poor_Arr.map(Number);

    var rich_max = Math.max(...rich_Arr);
    var rich_min = Math.min(...rich_Arr);

    var poor_max = Math.max(...poor_Arr);
    var poor_min = Math.min(...poor_Arr);

    console.log(rich_max,
        rich_min,
        poor_max,
        poor_min,);

    var continents = ['Africa', 'Asia', 'Africa / Asia', 'Americas', 'Asia / Africa', 'Asia / Oceania',
                        'Europe', 'Europe / Africa', 'Europe / Asia']
    var lin_scale = d3.scaleLinear().domain([poor_min, rich_max]).range([50, 800]);
    var color_scale = d3.scaleOrdinal(d3.schemeSet3).domain(continents)

    for( var i = 0; i< rich_Arr.length; i++){

        data[i].rich_x = 250;
        data[i].poor_x = 750;

        data[i].rich_y = 900 - lin_scale(rich_Arr[i]);
        data[i].poor_y = 900 - lin_scale(poor_Arr[i]);

        data[i].difference = data[i]['GDP_rich'] - data[i]['GDP_poor'];

    }



    //svg shapes 

    //console.log(data);
    var final_data = data;

    console.log(final_data);

    var ordered_data = final_data.slice().sort((a,b) => d3.descending(a.difference, b.difference));

    var top_20 = ordered_data.slice(0, 20);

    console.log(top_20);

    var line_colour = '#566573';
    var border_colour = '#808B96';

    var parent_group = svg.append('g').attr('class', 'parent_group');

    var line_group = parent_group.append('g').attr('class', 'line_group');
    line_group.append('line').attr('x1', 250).attr('y1', 100)
                             .attr('x2', 250).attr('y2', 900)
                             .attr("stroke-width", 1)
                             .attr("stroke", line_colour)
                             .attr("fill", "none")
                             .attr("class", "rich_line");

    line_group.append('line').attr('x1', 750).attr('y1', 100)
                             .attr('x2', 750).attr('y2', 900)
                             .attr("stroke-width", 1)
                             .attr("stroke", line_colour)
                             .attr("fill", "none")
                             .attr("class", "poor_line");


    var border_group = parent_group.append('g').attr('class', 'border_group');

    var borders = border_group.selectAll('.border_lines').data(top_20).enter().append('line');

    borders.attr('class', 'border_lines').attr('x1', function(d){
        return d.rich_x;    
    })
    .attr('y1', function(d){
        return d.rich_y
    })
    .attr('x2', function(d){
        return d.poor_x;    
    })
    .attr('y2', function(d){
        return d.poor_y
    })
    .attr("stroke-width", 1)
    .attr("stroke", border_colour)
    .attr("fill", "none");

    var text_group = parent_group.append('g').attr('class', 'text_group');

    var r_text = text_group.selectAll('.c_text').data(top_20).enter().append('text')

    r_text.attr('x', function(d){
        return d.rich_x - 10;
    })
    .attr('y', function(d){
        return d.rich_y;
    })
    .attr('text-anchor', 'end')
    .attr('fill', '#808B96')
    .text(function(d){

        var my_str = d.Richer_country
        my_str = my_str.replace(/[^A-Z, a-z]/g, '');
        return my_str;
    })
    /* .attr('transform', function(d){
        var x = d.rich_x - 10;
        var y = d.rich_y;
        var r = 30;
        return `rotate(${r}, ${x}, ${y})`
    }); */

    var p_text = text_group.selectAll('.p_text').data(top_20).enter().append('text');
    p_text.attr('x', function(d){
        return d.poor_x + 10;
    })
    .attr('y', function(d){
        return d.poor_y;
    })
    .attr('text-anchor', 'start')
    .attr('fill', '#808B96')
    .text(function(d){
        var my_str = d.Richer_country
        my_str = my_str.replace(/[^A-Z, a-z]/g, '');
        return my_str;
    })


    var circle_group = parent_group.append('g').attr('class', 'circle_group');
    var r_circles = circle_group.selectAll('.r_circles').data(top_20).enter().append('circle');
    var radius = 6;
    r_circles.attr('cx', function(d){
        return d.rich_x
    }).attr('cy', function(d){
        return d.rich_y
    }).attr('r', radius)
    .attr('fill', function(d){
        return color_scale(d.Continent);
    })
    .attr('stroke', 'white')
    .attr('stroke-width', 2)



    var p_circles = circle_group.selectAll('.p_circles').data(top_20).enter().append('circle');

    p_circles.attr('cx', function(d){
        return d.poor_x
    }).attr('cy', function(d){
        return d.poor_y
    }).attr('r', radius)
    .attr('fill', function(d){
        return color_scale(d.Continent);
    })
    .attr('stroke', 'white')
    .attr('stroke-width', 2)




})