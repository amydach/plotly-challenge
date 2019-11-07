function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
d3.json(`/metadata/${sample}`).then((people) => {

    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select('#sample-metadata');
    // Use `.html("") to clear any existing metadata
    panel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
Object.entries(people).forEach(([column, values]) => {
   panel.append("h5").text(`${column}:${values}`);
});
});

}

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  //d3.json(`/samples/${sample}`).then((bacteria) => {

  // }

    // @TODO: Build a Bubble Chart using the sample data
    // ATTEMPT BELOW TO GATHER DATA AND PRODUCE PLOT!!!
    //  Step 1 - Data pull code below to sum data modified to this one from bigfoot exercise 15-3-2
    // Per Gaurav - Move data query to the PY file.  Move plot to the HTML file.  Call from the JS file.

//     # Query the database and return the jsonified results
// @app.route("/germdata")
// def germdata():
//   sel = [otu_ids, func.sum(sample_values)]
//   results = db.session.query(*sel).\
//       group_by(otu_ids).all()
//   df = pd.DataFrame(results, columns=['out_ids', 'samples'])
//   return jsonify(df.to_dict(orient="records"))

// if __name__ == "__main__":
//     app.run()


    /* germdata route */
// const url = "/germdata";

// async function buildPlot() {
//     const response = await d3.json(url)
//     console.log(response);
//     const trace = {
//         type: "scatter",
//         mode: "markers",
//         name: "Bellybutton Germ Samples",
//         x: response.map(data => data.otu_ids),
//         y: response.map(data => data.samples)
//     };

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
