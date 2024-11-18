var climateChart = document.getElementById("ChartCanvas").getContext("2d");

var chartLenght = 50;
var createdChart;

var data;
var config

function createChart()
{
    var coopTemperature = [];
    var coopTemperatureWithHeatingDelta = [];
    var coopHumidity = [];
    var minimumVentilationByCO2 = [];
    var minimumVentilationByH2O = [];
    var minimumVentilationByFeedFactor = [];
    var maximumVentilationAtHeatThreshold = [];

    for(var i = 0; i < chartLenght; i++) //iterate throught all the days and store the data for them in the created arrays
    {
        coopTemperature.push(getCoopTemperature_day(i));
        coopTemperatureWithHeatingDelta.push(getCoopTemperatureWithHeatingDelta_day(i));
        coopHumidity.push(getCoopHumidity_day(i)*100);
        minimumVentilationByCO2.push(getMinAirFlowByCO2relativeToNominellAirFlow_day(i)*100);
        minimumVentilationByH2O.push(getMinAirFlowByH2OrelativeToNominellAirFlow_day(i)*100);
        minimumVentilationByFeedFactor.push(getMinAirFlowByFeedFactorRelativeToNominellAirFlow_day(i)*100);
        maximumVentilationAtHeatThreshold.push(getMaxAirFlowByHeatrelativeToNominellAirFlow_day(i)*100);
    }
    

    data = //fill the dataset object with all the data arrays
    {
        labels:  Array.from(Array(chartLenght).keys()),
        datasets: 
        [
            {
                data: coopTemperature,
                label: "Coop Temperature",
                backgroundColor: 'rgb(255, 163, 0)',
                borderColor: 'rgb(255, 163, 0)',
                yAxisID: 'degree',
            },
            {
                data: coopTemperatureWithHeatingDelta,
                label: "Coop Temperature with Delta",
                backgroundColor: 'rgb(221, 87, 28)',
                borderColor: 'rgb(221, 87, 28)',
                yAxisID: 'degree',
            },
            {
                data: coopHumidity,
                label: "Coop Humidity",
                backgroundColor: 'rgb(64, 160, 255)',
                borderColor: 'rgb(64, 160, 255)',
                yAxisID: 'percentage',
            },
            {
                data: minimumVentilationByCO2,
                label: "Minimum Ventilation by CO2",
                backgroundColor: 'rgb(211, 211, 211)',
                borderColor: 'rgb(211, 211, 211)',
                yAxisID: 'percentage',
            },
            {
                data: minimumVentilationByH2O,
                label: "Minimum Ventilation by H20",
                backgroundColor: 'rgb(173, 216, 230)',
                borderColor: 'rgb(173, 216, 230)',
                yAxisID: 'percentage',
            },
            {
                data: minimumVentilationByFeedFactor,
                label: "Minimum Ventilation by Feed Factor",
                backgroundColor: 'rgb(144, 238, 144)',
                borderColor: 'rgb(144, 238, 144)',
                yAxisID: 'percentage',
            },
            {
                data: maximumVentilationAtHeatThreshold,
                label: "Maximum Ventilation at Heat Threshold",
                backgroundColor: 'rgb(216, 36, 41)',
                borderColor: 'rgb(216, 36, 41)',
                yAxisID: 'percentage',
            }
        ]
    };
    
    config = //put the settings for the chart and the data object into the config object
    {
        type: "line",
        data: data,
        options: 
        {
            scales: 
            { 
                percentage:
                {
                    suggestedMin: 0,
                    suggestedMax: 80,
                    type: 'linear',
                    position: 'left',
                    ticks: 
                    {
                        callback: function(value, index, ticks) 
                        {
                            return value + ' %';
                        }
                    }
                },
                degree:
                {
                    suggestedMin: 0,
                    suggestedMax: 40,
                    type: 'linear',
                    position: 'right',
                    ticks: 
                    {
                        callback: function(value, index, ticks) 
                        {
                            return value + '°C';
                        }
                    }
                }
            }
        }
    };
    
    //console.log(config);
    createdChart = new Chart(climateChart, config); //create the chart in the climateChart canvas with the config done above
}

function updateChart() //create a new dataset
{
    var coopTemperature = [];
    var coopTemperatureWithHeatingDelta = [];
    var coopHumidity = [];
    var minimumVentilationByCO2 = [];
    var minimumVentilationByH2O = [];
    var minimumVentilationByFeedFactor = [];
    var maximumVentilationAtHeatThreshold = [];

    for(var i = 0; i < chartLenght; i++)
    {
        coopTemperature.push(getCoopTemperature_day(i));
        coopTemperatureWithHeatingDelta.push(getCoopTemperatureWithHeatingDelta_day(i));
        coopHumidity.push(getCoopHumidity_day(i)*100);
        minimumVentilationByCO2.push(getMinAirFlowByCO2relativeToNominellAirFlow_day(i)*100);
        minimumVentilationByH2O.push(getMinAirFlowByH2OrelativeToNominellAirFlow_day(i)*100);
        minimumVentilationByFeedFactor.push(getMinAirFlowByFeedFactorRelativeToNominellAirFlow_day(i)*100);
        maximumVentilationAtHeatThreshold.push(getMaxAirFlowByHeatrelativeToNominellAirFlow_day(i)*100);
    }

    var datasets = //create a new dataset
    [
        {
            data: coopTemperature,
            label: "Coop Temperature",
            backgroundColor: 'rgb(255, 163, 0)',
            borderColor: 'rgb(255, 163, 0)',
            yAxisID: 'degree',
        },
        {
            data: coopTemperatureWithHeatingDelta,
            label: "Coop Temperature with Delta",
            backgroundColor: 'rgb(221, 87, 28)',
            borderColor: 'rgb(221, 87, 28)',
            yAxisID: 'degree',
        },
        {
            data: coopHumidity,
            label: "Coop Humidity",
            backgroundColor: 'rgb(64, 160, 255)',
            borderColor: 'rgb(64, 160, 255)',
            yAxisID: 'percentage',
        },
        {
            data: minimumVentilationByCO2,
            label: "Minimum Ventilation by CO2",
            backgroundColor: 'rgb(211, 211, 211)',
            borderColor: 'rgb(211, 211, 211)',
            yAxisID: 'percentage',
        },
        {
            data: minimumVentilationByH2O,
            label: "Minimum Ventilation by H20",
            backgroundColor: 'rgb(173, 216, 230)',
            borderColor: 'rgb(173, 216, 230)',
            yAxisID: 'percentage',
        },
        {
            data: minimumVentilationByFeedFactor,
            label: "Minimum Ventilation by Feed Factor",
            backgroundColor: 'rgb(144, 238, 144)',
            borderColor: 'rgb(144, 238, 144)',
            yAxisID: 'percentage',
        },
        {
            data: maximumVentilationAtHeatThreshold,
            label: "Maximum Ventilation at Heat Threshold",
            backgroundColor: 'rgb(216, 36, 41)',
            borderColor: 'rgb(216, 36, 41)',
            yAxisID: 'percentage',
        }
    ];

    createdChart.config.data.datasets = datasets; //replace the old dataset in the config object
    createdChart.update(); //update the chart
}