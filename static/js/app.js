// read json file with D3
d3.json("../../data/samples.json").then((data) => {
    console.log(data);

    var data = data;
//add "names" to drop down menu
    var names = data.names;

    names.forEach((name) => {
		d3.select("#selDataset").append("option").text(name);
	})

//Initialize page wit default plots
function init() {
    defaultDataset = data.samples.filter(sample => sample.id === "940")[0];
    console.log(defaultDataset);
}