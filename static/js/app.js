d3.json("data/samples.json").then((data) => {
    console.log(data)
    var data = data;

//add "names" to drop down menu
    var names = data.names;

    names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    })


	// Initializes the page with default plots
	function init() {

        defaultDataset = data.samples.filter(sample => sample.id === "940")[0];		
        console.log(defaultDataset);

        //Get all sample_values, otu_ids and otu_labels for selected test id
        allsample_valuesDefault = defaultDataset.sample_values;
        allotu_idsDefault = defaultDataset.otu_ids;
        allotu_labelsDefault = defaultDataset.otu_labels;


        //Get top 10 sample_values, otu_ids and otu_labels per ID
        top10sample_values = allsample_valuesDefault.slice(0,10);
        top10otu_ids = allotu_idsDefault.slice(0,10);
        top10otu_labels = allotu_labelsDefault.slice(0,10);


		console.log(top10sample_values);
		console.log(top10otu_ids);
		console.log(top10otu_labels);

		// Add trace for the Bar Chart 
		var trace1 = {
			x: top10sample_values,
			y: top10otu_ids.map(outId => `OTU ${outId}`),
			text: top10otu_labels,
			type: "bar",
			orientation: "h"
		};

        var barData = [trace1];

        // create layout for bar chart
        var barlayout = {
            title: `<b>Top 10 OTUs found in selected Test Subject ID No<b>`,
            xaxis: { title: "Sample Value"},
            yaxis: { title: "OTU ID"},
            autosize: false,
            width: 450,
            height: 600
        
        }

        Plotly.newPlot("bar", barData, barlayout);
       
         // add trace for bubble chart
        var trace2 = {
            x: allotu_idsDefault,
            y: allsample_valuesDefault,
            text: allotu_labelsDefault,
            mode: 'markers',
            marker: {
                color: allotu_idsDefault,
                size: allsample_valuesDefault
            }
        };
        
        var bubbleData = [trace2];
        // create layout for bubble chart
        var bubblelayout = {
            title: '<b>Bubble Chart displaying sample values of OTU IDs of the selected individual<b>',
            xaxis: { title: "OTU ID"},
            yaxis: { title: "Sample Value"}, 
            showlegend: false,
        };
        
        Plotly.newPlot('bubble', bubbleData, bubblelayout);

        // Display the sample metadata, i.e., an individual's demographic information
        demoDefault = data.metadata.filter(sample => sample.id === 940)[0];
        console.log(demoDefault);

        // Display each key-value pair from the metadata JSON object somewhere on the page
        Object.entries(demoDefault).forEach(
            ([key, value]) => d3.select("#sample-metadata")
                .append("p").text(`${key}: ${value}`));


    }
    init();

    //  Update all of the plots any time that a new sample is selected
    d3.selectAll("#selDataset").on("change", updatePage);

    
    function updatePage() {

            var inputElement = d3.select("#selDataset");
            var inputValue = inputElement.property("value");

            dataset = data.samples.filter(sample => sample.id === inputValue)[0];

            // get sample data
            allsample_values = dataset.sample_values;
            allotu_ids = dataset.otu_ids;
            allotu_labels = dataset.otu_labels;

        // get the top 10 for the ID with their sample_values, otu_ids and otu_labels
        top10values = allsample_values.slice(0, 10);
        top10ids = allotu_ids.slice(0, 10);
        top10labels = allotu_labels.slice(0, 10);

        // BAR CHART
        Plotly.restyle("bar", "x", [top10values]);
        Plotly.restyle("bar", "y", [top10ids.map(outId => `OTU ${outId}`)]);
        Plotly.restyle("bar", "text", [top10labels]);

        // BUBBLE CHART
        Plotly.restyle('bubble', "x", [allotu_ids]);
        Plotly.restyle('bubble', "y", [allsample_values]);
        Plotly.restyle('bubble', "text", [allotu_labels]);
        Plotly.restyle('bubble', "marker.color", [allotu_ids]);
        Plotly.restyle('bubble', "marker.size", [allsample_values]);

        // Metadata
        metainfo = data.metadata.filter(sample => sample.id == inputValue)[0];

        // delete everything in the metadata panel
        d3.select("#sample-metadata").html("");

        // shows key value pairs again
        Object.entries(metainfo).forEach(([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`));

    }

});
