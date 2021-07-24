d3.json("data/samples.json").then((data) => {
    console.log(data)
    var data = data;
//add "names" to drop down menu
    var names = data.names;

    names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    });


	// Initializes the page with default plots
	function init() {

        defaultDataset = data.samples.filter(sample => sample.id === "940")[0];		console.log(defaultDataset);
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

		