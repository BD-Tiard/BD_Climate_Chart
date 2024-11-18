
function createData()
{
    changeInput();
    updateReadOnlyFields();
    addElementsToTable();
    updateTable();
    createChart();
}
function updateData()
{
    changeInput();
    updateReadOnlyFields();
    addElementsToTable();
    updateTable();
    updateChart();
}
function overrideData()
{
    dynamicInput.customValuesActive = false;
    custom_Day_Temp_Humidity_CO2 = defaultCustom_Day_Temp_Humidity_CO2;
    changeInput();
    updateReadOnlyFields();
    addElementsToTable();
    updateTable();
    updateChart();
}

function changeInput() //take the normal settings values and write them into the js table
{
    dynamicInput.finalWeight = document.getElementById("finalWeight").value;
    dynamicInput.numberOfBirds = document.getElementById("numberOfBirds").value;

    dynamicInput.outsideTemperature = document.getElementById("outsideTemperature").value;
    dynamicInput.minOutsideTemperature = document.getElementById("minOutsideTemperature").value;
    dynamicInput.outsideHumidity = document.getElementById("outsideHumidity").value /100;

    dynamicInput.nominellAirFlowPerBird = document.getElementById("nominellAirFlowPerBird").value;

    //console.log(dynamicInput);
}

function updateReadOnlyFields() //set the values of the read only input fields
{
    document.getElementById("calculatedNominellAirFlowPerBird").value = getCalculatedNominellAirFlowPerBird();
    document.getElementById("totalNominellAirFlow").value = getTotalNominellAirFlow();
}

function showCurrentAdvancedSettings() //fill the advanced Settings html fields with the js object values
{
    if(dynamicInput.birdSpecies == "Broiler")
    {
        document.getElementById("birdSpecies").value = 1;
    }
    if(dynamicInput.birdSpecies == "Turkey")
    {
        document.getElementById("birdSpecies").value = 2;
    }
    document.getElementById("feedFactor").value = dynamicInput.feedFactor;
    document.getElementById("fixedCoopCO2checkbox").checked = dynamicInput.fixedCoopCO2checkbox;
    document.getElementById("fixedCoopCO2").value = dynamicInput.fixedCoopCO2;
    document.getElementById("fixedCoopHumidityCheckbox").checked = dynamicInput.fixedCoopHumidityCheckbox;
    document.getElementById("fixedCoopHumidity").value = dynamicInput.fixedCoopHumidity;
    document.getElementById("fixedCoopTemperatureCheckbox").checked = dynamicInput.fixedCoopTemperatureCheckbox;
    document.getElementById("coopTemperatureForYoungBirds").value = dynamicInput.coopTemperatureForYoungBirds;
    document.getElementById("coopTemperatureForMatureBirds").value = dynamicInput.coopTemperatureForMatureBirds;
    document.getElementById("heatingDeltaValue1").value = dynamicInput.heatingDeltaValue1;
    document.getElementById("heatingDeltaValue2").value = dynamicInput.heatingDeltaValue2;
    document.getElementById("heatingDeltaBreakpoint").value = dynamicInput.heatingDeltaBreakpoint;
    //document.getElementById("deltaTmaxHeat").value = dynamicInput.deltaTmaxHeat;
    //document.getElementById("fanThroughputPerHour").value = dynamicInput.fanThroughputPerHour;
    document.getElementById("airPressure").value = dynamicInput.airPressure;
}

function saveAdvancedSettings() //write the adavanced Settings html fields into the js object
{
    if(document.getElementById("birdSpecies").value == 1)
    {
        dynamicInput.birdSpecies = "Broiler";
    }
    if(document.getElementById("birdSpecies").value == 2)
    {
        dynamicInput.birdSpecies == "Turkey";
    }
    dynamicInput.feedFactor = document.getElementById("feedFactor").value;
    dynamicInput.fixedCoopCO2checkbox = document.getElementById("fixedCoopCO2checkbox").checked;
    dynamicInput.fixedCoopCO2 = document.getElementById("fixedCoopCO2").value;
    dynamicInput.fixedCoopHumidityCheckbox = document.getElementById("fixedCoopHumidityCheckbox").checked;
    dynamicInput.fixedCoopHumidity = document.getElementById("fixedCoopHumidity").value;
    dynamicInput.fixedCoopTemperatureCheckbox = document.getElementById("fixedCoopTemperatureCheckbox").checked;
    dynamicInput.coopTemperatureForYoungBirds = document.getElementById("coopTemperatureForYoungBirds").value;
    dynamicInput.coopTemperatureForMatureBirds = document.getElementById("coopTemperatureForMatureBirds").value;
    dynamicInput.heatingDeltaValue1 = document.getElementById("heatingDeltaValue1").value;
    dynamicInput.heatingDeltaValue2 = document.getElementById("heatingDeltaValue2").value;
    dynamicInput.heatingDeltaBreakpoint = document.getElementById("heatingDeltaBreakpoint").value;
    //dynamicInput.deltaTmaxHeat = document.getElementById("deltaTmaxHeat").value;
    //dynamicInput.fanThroughputPerHour = document.getElementById("fanThroughputPerHour").value;
    dynamicInput.airPressure = document.getElementById("airPressure").value;
    updateData();
}

function setDefaultAdvancedSettings() //fill the advanced Settings hml fields with the default values from the default advanced Settings object
{
    if(dynamicInput.birdSpecies == "Broiler")
    {
        document.getElementById("birdSpecies").value = 1;
    }
    if(dynamicInput.birdSpecies == "Turkey")
    {
        document.getElementById("birdSpecies").value = 2;
    }
    document.getElementById("feedFactor").value = defaultAdvancedSettings.feedFactor;
    document.getElementById("fixedCoopCO2checkbox").checked = defaultAdvancedSettings.fixedCoopCO2checkbox;
    document.getElementById("fixedCoopCO2").value = defaultAdvancedSettings.fixedCoopCO2;
    document.getElementById("fixedCoopHumidityCheckbox").checked = defaultAdvancedSettings.fixedCoopHumidityCheckbox;
    document.getElementById("fixedCoopHumidity").value = defaultAdvancedSettings.fixedCoopHumidity;
    document.getElementById("coopTemperatureForMatureBirds").checked = defaultAdvancedSettings.coopTemperatureForMatureBirdsCheckbox;
    document.getElementById("coopTemperatureForMatureBirds").value = defaultAdvancedSettings.coopTemperatureForYoungBirds;
    document.getElementById("coopTemperatureForYoungBirds").value = defaultAdvancedSettings.coopTemperatureForMatureBirds;
    document.getElementById("heatingDeltaValue1").value = defaultAdvancedSettings.heatingDeltaValue1;
    document.getElementById("heatingDeltaValue2").value = defaultAdvancedSettings.heatingDeltaValue2;
    document.getElementById("heatingDeltaBreakpoint").value = defaultAdvancedSettings.heatingDeltaBreakpoint;
    //document.getElementById("deltaTmaxHeat").value = defaultAdvancedSettings.deltaTmaxHeat;
    //document.getElementById("fanThroughputPerHour").value = defaultAdvancedSettings.fanThroughputPerHour;
    document.getElementById("airPressure").value = defaultAdvancedSettings.airPressure;
}

const fixInput = //not used, Excel: Mastkurve Klima, feste Werte
[ 
	{
        day: 1,
        comfortDeltaT: 2
	},
    {
        day: 7,
        comfortDeltaT: 3
	},
    {
        day: 14,
        comfortDeltaT: 4
	},
    {
        day: 21,
        comfortDeltaT: 4
	},
    {
        day: 28,
        comfortDeltaT: 4
	},
    {
        day: 35,
        comfortDeltaT: 4
	},
    {
        day: 42,
        comfortDeltaT: 4
	},
    {
        day: 49,
        comfortDeltaT: 4
	}
];

var dynamicInput = //Excel: Mastkurve Klima, dynamische Werte
{
    finalWeight: 2.56,
    numberOfBirds: 40_000,

    outsideTemperature: -10,
    minOutsideTemperature: -20,
    outsideHumidity: 0.8,
    
    totalNominellAirFlow: 160000,
	nominellAirFlowPerBird: 3.9,
    calculatedNominellAirFlowPerBird: 4.88,

    customValuesActive: false,

    birdSpecies: 'Broiler',
    feedFactor: 0.7,
    fixedCoopCO2checkbox: false,
    fixedCoopCO2: null,
    fixedCoopHumidityCheckbox: false,
    fixedCoopHumidity: null,
    fixedCoopTemperatureCheckbox: false,
    coopTemperatureForYoungBirds: 31,
    coopTemperatureForMatureBirds: 23,
    heatingDeltaValue1: -1,
    heatingDeltaValue2: -2,
    heatingDeltaBreakpoint: 20,
    deltaTmaxHeat: 3.0,
    fanThroughputPerHour: 40000,
    airPressure: 101325
};

const defaultAdvancedSettings = //the default values for the advanced settings fields
{
    birdSpecies: 1,
    feedFactor: 0.7,
    fixedCoopCO2checkbox: false,
    fixedCoopCO2: null,
    fixedCoopHumidityCheckbox: false,
    fixedCoopHumidity: null,
    coopTemperatureForMatureBirdsCheckbox: false,
    coopTemperatureForYoungBirds: 31,
    coopTemperatureForMatureBirds: 23,
    heatingDeltaValue1: 1,
    heatingDeltaValue2: 2,
    heatingDeltaBreakpoint: 20,
    deltaTmaxHeat: 3.0,
    fanThroughputPerHour: 40000,
    airPressure: 101325
};