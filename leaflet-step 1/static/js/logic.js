var myMap= L.map("map",{
    center:[37.0902,-95.7192],
    zoom:5
});

L.tileLayer("http://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{
    id: "mapbox/light-v10",
    maxZoom: 18,
    accessToken: API_KEY
}).addTo(myMap);

var link ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

function chooseColor(magnitude){
    var color;
    if(magnitude>0 && magnitude<=1){
        color="rgb(0,255,51)";
    }
    else if (magnitude>1 && magnitude<=2){
        color="yellow";
    }
    else if (magnitude>2 && magnitude<=3){
        color="rgb(255,204,0)";
    }
    else if (magnitude>3 && magnitude<=4){
        color="rgb(255,153,0)";
    }
    else if (magnitude>4 && magnitude<=5){
        color="orange";
    }
    else if (magnitude>5){
        color="red";
    }

    return color;
}


d3.json(link,function(data){
    console.log(data);
    L.geoJson(data,{
        style: function(feature){
        return L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]],{
            color: "gray",
            fillColor: chooseColor(feature.properties.mag),
            weight:0.5,
            fillOpacity:0.7,
            radius: feature.properties.mag*15000
        }).bindPopup("<h3>"+feature.properties.place+ "</h3> <hr> <h3>Magnitude: "+feature.properties.mag+"</h3>").addTo(myMap);
        }

        // Add legend (don't forget to add the CSS from index.html)
         
    })
})

var legend = L.control({ position: 'bottomright' });
        legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend')
        var limits = ["0-1","1-2","2-3","3-4","4-5","5+"]
        var colors = ["rgb(0,255,51)","yellow","rgb(255,204,0)","rgb(255,153,0)","orange","red"]
        var labels = []

        // Add min & max
        //div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div>'+ '<div class="mid">'+limits[1]+'</div>'+
          //      '<div class="max">' + limits[limits.length - 1] + '</div></div>'

        limits.forEach(function (limit, index) {
        // labels.push('<li style="background-color: ' + colors[index] + '"><span class="labels" class="min" style="background-color: black">asd</span>'+''+limit+'</li>')
        // labels.push('<li><span class="labels" class="min" style="background-color:'+ colors[index] +'">&nbsp&nbsp&nbsp&nbsp</span>'+''+limit+'</li>')
        labels.push('<li><table><tr><td><span style="background-color:' + colors[index] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span><span>&nbsp'+limit+'</span></td></tr></table></li>')
    })
        console.log(labels);
        //div.innerHTML += '<ul>' + labels.join('') + '</ul>'
        div.innerHTML += '<ul>' +labels.join('')+'</ul>';
        return div
    }
    legend.addTo(myMap)
