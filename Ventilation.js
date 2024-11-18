//broiler_Day_Temp_Humidity_CO2_Weight_FeedIntake
function getCoopTemperature_day(day)
{
    var species = getSpecies();

    var temperature;
    if(dynamicInput.customValuesActive)
    {
        temperature = custom_Day_Temp_Humidity_CO2[day].temp;
    }
    else if(dynamicInput.coopTemperatureForMatureBirdsCheckbox)
    {
        temperature = dynamicInput.coopTemperatureForYoungBirds - 0.5*day;
        if(temperature < dynamicInput.coopTemperatureForMatureBirds)
        {
            temperature = dynamicInput.coopTemperatureForMatureBirds;
        }
    }
    else if(species == 'Broiler')
    {
        temperature = broiler_Day_Temp_Humidity_CO2_Weight_FeedIntake[day].temp;
    }

    //console.log('CoopTemperature is: '+ temperature);
    return temperature;
}
function getCoopHumidity_day(day)
{
    var species = getSpecies();

    var humidity;
    if(dynamicInput.customValuesActive)
    {
        humidity = custom_Day_Temp_Humidity_CO2[day].humidity;
    }
    else if(dynamicInput.fixedCoopHumidityCheckbox)
    {
        humidity = dynamicInput.fixedCoopHumidity /100;
    }else
    if(species == 'Broiler')
    {
        humidity = broiler_Day_Temp_Humidity_CO2_Weight_FeedIntake[day].humidity;
    }

    //console.log('CoopHumidity is: '+ humidity);
    return humidity;
}
function getCoopCO2_day(day)
{
    var species = getSpecies();

    var co2;
    if(dynamicInput.customValuesActive)
    {
        co2 = custom_Day_Temp_Humidity_CO2[day].co2;
    }
    else if(dynamicInput.fixedCoopCO2checkbox)
    {
        co2 = dynamicInput.fixedCoopCO2;
    }else
    if(species == 'Broiler')
    {
        co2 = broiler_Day_Temp_Humidity_CO2_Weight_FeedIntake[day].co2;
    }

    //console.log('CoopCO2 is: '+ co2);
    return co2;
}
function getBirdWeight_day(day)
{
    var species = getSpecies();

    var weight;
    if(species == 'Broiler')
    {
        weight = broiler_Day_Temp_Humidity_CO2_Weight_FeedIntake[day].weight;
    }

    //console.log('birdWeight is: '+ weight);
    return weight;
}
function getFeedIntake(day)
{
    var species = getSpecies();

    var feedIntake;
    if(species == 'Broiler')
    {
        feedIntake = broiler_Day_Temp_Humidity_CO2_Weight_FeedIntake[day].feedIntake;
    }

    //console.log('feedIntake is: '+ feedIntake);
    return feedIntake;
}

//dynamicInput
function getFinalWeight()
{
    var finalWeight;
    finalWeight = dynamicInput.finalWeight;
    
    //console.log('finalWeight is: '+ finalWeight);
    return finalWeight;
}
function getNominellAirFlowPerBird()
{
    var nominellAirFlowPerBird;
    nominellAirFlowPerBird = dynamicInput.nominellAirFlowPerBird;
    
    //console.log('nominellAirFlowPerBird is: '+ nominellAirFlowPerBird);
    return nominellAirFlowPerBird;
}
function getNumberOfBirds()
{
    var numberOfBirds;
    numberOfBirds = dynamicInput.numberOfBirds;
    
    //console.log('numberOfBirds is: '+ numberOfBirds);
    return numberOfBirds;
}
function getOutsideTemperature()
{
    var temperature;
    temperature = dynamicInput.outsideTemperature;

    //console.log('outsideTemperature is: '+ temperature);
    return temperature;
}
function getOutsideHumidity()
{
    var humidity;
    humidity = dynamicInput.outsideHumidity;

    //console.log('outsideHumidity is: '+ humidity);
    return humidity;
}
function getMinOutsideTemperature()
{
    var temperature;
    temperature = dynamicInput.minOutsideTemperature;

    //console.log('minOutsideTemperature is: '+ temperature);
    return temperature;
}
function getTotalNominellAirFlow()
{
    var totalNominellAirFlow;
    totalNominellAirFlow = dynamicInput.nominellAirFlowPerBird * dynamicInput.numberOfBirds;

    //console.log('totalNominellAirFlow is: '+ totalNominellAirFlow);
    return totalNominellAirFlow;
}

function getSpecies()
{
    var species;
    species = dynamicInput.birdSpecies;

    //console.log('species is: '+ species);
    return species;
}
function getFeedFactor()
{
    var feedFactor;
    feedFactor = dynamicInput.feedFactor;

    //console.log('feedFactor is: '+ feedFactor);
    return feedFactor;
}
function getDeltaTmaxHeat()
{
    var deltaTmaxHeat;
    deltaTmaxHeat = dynamicInput.deltaTmaxHeat;

    //console.log('deltaTmaxHeat is: '+ deltaTmaxHeat);
    return deltaTmaxHeat;
}
function getFanThroughputPerHour()
{
    var fanThroughputPerHour;
    fanThroughputPerHour = dynamicInput.fanThroughputPerHour;

    //console.log('fanThroughputPerHour is: '+ fanThroughputPerHour);
    return fanThroughputPerHour;
}
function getAirPressure()
{
    var airPressure = dynamicInput.airPressure;

    //console.log('airPressure is: '+ airPressure);
    return airPressure;
}
function getHeatingDelta_day(day)
{
    var heatingDeltaValue1 = dynamicInput.heatingDeltaValue1;
    var heatingDeltaValue2 = dynamicInput.heatingDeltaValue2;
    var heatingDeltaBreakpoint = dynamicInput.heatingDeltaBreakpoint;

    var heatingDelta;
    if(dynamicInput.customValuesActive)
    {
        heatingDelta = custom_Day_Temp_Humidity_CO2[day].heatingDelta;
    }
    else if(day > heatingDeltaBreakpoint)
    {
        heatingDelta = heatingDeltaValue2;
        //console.log("heatingDeltaValue1: " + heatingDelta);
    }
    else
    {
        heatingDelta = heatingDeltaValue1;
        //console.log("heatingDeltaValue2: " + heatingDelta);
    }
    //console.log("heating delta is: " + heatingDelta);
    return heatingDelta;
}


//Excel: Mastkurve Klima Row B
function getCoopTemperatureWithHeatingDelta_day(day)
{
    var temperature = getCoopTemperature_day(day);
    
    temperature += getHeatingDelta_day(day);
    
    //console.log('temperatureWithHeatingDelta is ' + temperature);
    return temperature;
}

//Excel: Mastkurve Klima Row F
function getMinAirFlowByCO2andH2O_day(day)
{
    var minAirFlowByCO2 = getMinAirFlowByCO2_day(day);
    var minAirFlowByH20 = getMinAirFlowByH2O_day(day);
    //console.log('minAirFlowByCO2 is ' + minAirFlowByCO2);
    //console.log('minAirFlowByH2O is ' + minAirFlowByH20);
    if(minAirFlowByCO2 >= minAirFlowByH20)
    {
        //console.log('MinAirFlowByCO2andH2O is minAirFlowByCO2: '+ minAirFlowByCO2);
        return minAirFlowByCO2;
    }
    else
    {
        //console.log('MinAirFlowByCO2andH2O is minAirFlowByH20: '+ minAirFlowByH20);
        return minAirFlowByH20;
    }
}
//Excel: Mastkurve Klima Row G
function getMinAirFlowByCO2andH2OrelativeToNominellAirFlow_day(day)
{
    var minAirFlowByCO2andH2OrelativeToNominellAirFlow;
    minAirFlowByCO2andH2OrelativeToNominellAirFlow = getMinAirFlowByCO2andH2O_day(day) / getNominellAirFlowPerBird();

    //console.log('minAirFlowByCO2andH2OrelativeToNominellAirFlow is: '+ minAirFlowByCO2andH2OrelativeToNominellAirFlow);
    return minAirFlowByCO2andH2OrelativeToNominellAirFlow;
}
function getTotalMinAirFlowByCO2andH2O_day(day)
{
    var totalMinAirFlowByCO2andH2O;
    totalMinAirFlowByCO2andH2O = getMinAirFlowByCO2andH2O_day(day) * getNumberOfBirds();

    //console.log('totalMinAirFlowByCO2andH2O is: '+ totalMinAirFlowByCO2andH2O);
    return totalMinAirFlowByCO2andH2O;
}

//Excel: Mastkurve Klima Row H
function getMinAirFlowByAll_day(day)
{
    var minAirFlowByCO2andH2O = getMinAirFlowByCO2andH2O_day(day);
    var minAirFlowByFeedFactor = getMinAirFlowByFeedFactor_day(day);
    //console.log('minAirFlowByCO2andH2O is ' + minAirFlowByCO2andH2O);
    //console.log('minAirFlowByFeedFactor is ' + minAirFlowByFeedFactor);
    if(minAirFlowByCO2andH2O >= minAirFlowByFeedFactor)
    {
        //console.log('MinAirFlowByAll is minAirFlowByCO2andH2O: '+ minAirFlowByCO2andH2O);
        return minAirFlowByCO2andH2O;
    }
    else
    {
        //console.log('MinAirFlowByAll is minAirFlowByFeedFactor: '+ minAirFlowByFeedFactor);
        return minAirFlowByFeedFactor;
    }
}
//Excel: Mastkurve Klima Row I
function getMinAirFlowByAllrelativeToNominellAirFlow_day(day)
{
    var minAirFlowByAllrelativeToNominellAirFlow;
    minAirFlowByAllrelativeToNominellAirFlow = getMinAirFlowByAll_day(day) / getNominellAirFlowPerBird();

    //console.log('minAirFlowByAllrelativeToNominellAirFlow is: '+ minAirFlowByAllrelativeToNominellAirFlow);
    return minAirFlowByAllrelativeToNominellAirFlow;
}

//Excel: Mastkurve Klima Row J
function getMaxAirFlowByHeatrelativeToNominellAirFlow_day(day)
{
    var maxAirFlowByHeatrelativeToNominellAirFlow;
    maxAirFlowByHeatrelativeToNominellAirFlow = getMaxAirFlowByHeat_day(day) / getNominellAirFlowPerBird() *1.2;

    //console.log('maxAirFlowByHeatrelativeToNominellAirFlow is: '+ maxAirFlowByHeatrelativeToNominellAirFlow);
    return maxAirFlowByHeatrelativeToNominellAirFlow;
}
function getMaxAirFlowByHeat_day(day)  //Public Function LuftvolumenstromTemp_Day_DeltaT(TierAlter, DeltaT)
{
    var airPressure;
    airPressure = getAirPressure();
    var maxAirFlowByHeat;
    maxAirFlowByHeat = getSensibleHeatoutputPerBird_day(day) / (getDeltaTmaxHeat() * 0.28) / getDensityOfWaterInAir_inside_day(true, day);

    //console.log('maxAirFlowByHeat is: '+ maxAirFlowByHeat);
    return maxAirFlowByHeat;
}

//Excel: Mastkurve Klima Row K
function getTotalMinAirFlowByAll_day(day)
{
    var totalMinAirFlowByAll;
    totalMinAirFlowByAll = getMinAirFlowByAll_day(day) * getNumberOfBirds();

    console.log('totalMinAirFlowByAll is: '+ totalMinAirFlowByAll);
    return totalMinAirFlowByAll;
}
//Excel: Mastkurve Klima Row L
function getMinutesOfFanRuntimePerHour_day(day)
{
    var minutesOfFanRuntimePerHour;
    minutesOfFanRuntimePerHour =  getTotalMinAirFlowByAll_day(day) / getFanThroughputPerHour(day) * 60;

    //console.log('minutesOfFanRuntimePerHour is: '+ minutesOfFanRuntimePerHour);
    return minutesOfFanRuntimePerHour;
}

function getMinAirFlowByFeedFactor_day(day)
{
    var minAirFlowByFeedFactor;
    minAirFlowByFeedFactor = getFeedIntake(day) * getFeedFactor() / 100;

    //console.log('minAirFlowByFeedFactor is: '+ minAirFlowByFeedFactor);
    return minAirFlowByFeedFactor;
}
function getMinAirFlowByFeedFactorRelativeToNominellAirFlow_day(day)
{
    var minAirFlowByFeedFactorRelativeToNominellAirFlow;
    minAirFlowByFeedFactorRelativeToNominellAirFlow = getMinAirFlowByFeedFactor_day(day) / getNominellAirFlowPerBird();

    //console.log('minAirFlowByFeedFactorRelativeToNominellAirFlow is: '+ minAirFlowByFeedFactorRelativeToNominellAirFlow);
    return minAirFlowByFeedFactorRelativeToNominellAirFlow;
}

//Die Watt Berechnung funktioniert nicht
//Excel: Mastkurve Klima Row Z
function getTotalWattUsageByMinAirFlow_day(day)  
{
    var totalWattUsageByMinAirFlow;
    //(B23-$B$17)*Dichte_rF(B23;D23;100000)*Y23/3,6/1000
    totalWattUsageByMinAirFlow = ((getCoopTemperatureWithHeatingDelta_day(day) - getMinOutsideTemperature()) * getDensityOfWaterInAir_inside_day(true, day) * getTotalMinAirFlowByAll_day(day) /3,6)/1000;

    //console.log('totalWattUsageByMinAirFlow is: '+ totalWattUsageByMinAirFlow);
    return totalWattUsageByMinAirFlow;
}
//Excel: Mastkurve Klima Row AA
function getWattUsagePerAreaByMinAirFlow_day(day)
{
    var minutesOfFanRuntimePerHour;
    minutesOfFanRuntimePerHour =  getTotalWattUsageByMinAirFlow(day) / getArea();

    //console.log('minutesOfFanRuntimePerHour is: '+ minutesOfFanRuntimePerHour);
    return minutesOfFanRuntimePerHour;
}
function getArea()
{
    var species = getSpecies();

    var area;
    if(species == 'Broiler')
    {
        area = getFinalWeight()*getNumberOfBirds() /39 /1000;
    }

    //console.log('area is: '+ area);
    return area;
}



function  getMinAirFlowByCO2_day(day)  //Public Function LuftvolumenstromCO2_Day(TierAlter)
{
    var airPressure = getAirPressure();
    var coopCO2 = getCoopCO2_day(day);

    var minAirFlowByCO2;
    minAirFlowByCO2 = getCO2perBird_day(day) / ((coopCO2 / 652) -0.6) / getDensityOfWaterInAir_inside_day(true, day);

    //console.log('minAirFlowByCO2 is: '+ minAirFlowByCO2);
    return minAirFlowByCO2;
}
function getMinAirFlowByCO2relativeToNominellAirFlow_day(day)
{
    var minAirFlowByCO2RelativeToNominellAirFlow;
    minAirFlowByCO2RelativeToNominellAirFlow = getMinAirFlowByCO2_day(day) / getNominellAirFlowPerBird();

    //console.log('minAirFlowByCO2RelativeToNominellAirFlow is: '+ minAirFlowByCO2RelativeToNominellAirFlow);
    return minAirFlowByCO2RelativeToNominellAirFlow;
}

function getCO2perBird_day(day)  //Public Function CO2_day(TierAlter)
{
    var species = getSpecies();

    var CO2perBird;
    if(species == 'Broiler' || species == 'Turkey')
    {
        CO2perBird = getHeatoutputPerBird_day(day) * 0.18 * 1.805;
    }

    //console.log('CO2perBird is: '+ CO2perBird);
    return CO2perBird;
}

function getHeatoutputPerBird_day(day)  //Public Function korrWaermeproduktion_Day(TierAlter)
{
    var heatoutputPerBirde = getTotalHeatoutputPerBird_day(day) * (1 + 0.02 * (20 - getCoopTemperature_day(day))); //DIN18910

    //console.log('heatoutputPerBirde is: '+ heatoutputPerBirde);
    return heatoutputPerBirde;
}

function getTotalHeatoutputPerBird_day(day)  //Public Function Gesamtwaermeproduktion_Day(TierAlter)
{
    var species = getSpecies();

    var totalHeatoutputPerBird;
    if(species == 'Broiler')
    {
        totalHeatoutputPerBird = 10.62 * (Math.pow(getBirdWeight_day(day), 0.75)); //DIN18910
    }
    if(species == 'Turkey')
    {
        totalHeatoutputPerBird = 9.86 * (Math.pow(getBirdWeight_day(day), 0.77)); //DIN18910
    }

    //console.log('totalHeatoutputPerBird is: '+ totalHeatoutputPerBird);
    return totalHeatoutputPerBird;
}

function getDensityOfWaterInAir_inside_day(inside, day)  //Public Function Dichte_rF(Temperatur, Luftfeuchte, Luftdruck) The inside boolean defines wether the value for inside or outside is requested
{
    var temperature;
    if(inside === true)
    {
        temperature = getCoopTemperature_day(day);
    }
    else
    {
        temperature = getOutsideTemperature();
    }

    var densityOfWaterInAir;
    //Dichte feuchter Luft in kg/m³ (Temperatur in °C; Luftfeuchte in %; Luftdruck in Pa)
    //Aus Recknagel Sprenger 03/04 Seite 135
    var vaporPressure = getVaporPressure_inside_day(inside, day);
    densityOfWaterInAir = 0.00348 * getAirPressure() / (273.15 + temperature) - 0.00132 * vaporPressure / (273.15 + temperature);

    //console.log('densityOfWaterInAir is: '+ densityOfWaterInAir);
    return densityOfWaterInAir;
}

function getVaporPressure_inside_day(inside, day) //The inside boolean defines wether the value for the inside or the outside is requested
{
    var humidity;
    if(inside === true)
    {
        humidity = getCoopHumidity_day(day);
    }
    else
    {
        humidity = getOutsideHumidity();
    }
    var vaporPressure;
    vaporPressure = getSaturationPressureOfWaterInAir_inside_day(inside, day) * humidity;
    return vaporPressure;
}

function getSaturationPressureOfWaterInAir_inside_day(inside, day)  //Public Function Saettigungsdruck(Temperatur) The inside boolean defines wether the value for the inside or the outside is requested
{
    var temperature;
    if(inside === true)
    {
        temperature = getCoopTemperature_day(day);
    }
    else
    {
        temperature = getOutsideTemperature();
    }
    var saturationPressureOfWaterInAir;
    //Berechnet den Sättigungsdruck in Pa(Temperatur in °C)  im Temperaturbereich -273..100°C ist der Fehler < 0,02% (Gleichung nach Glück)
    //D3>0;288,68*(1,098+D3/100)^8,02;4,68*(1,486+D3/100)^12,3)
    if(temperature < 0)
    {
        saturationPressureOfWaterInAir = (4.68 * Math.pow((1.486 + temperature / 100), 12.3));
    }
    else if(temperature < 100)
    {
        saturationPressureOfWaterInAir = (611 * Math.exp(0.07257 * temperature - 0.0002937 * Math.pow(temperature, 2) + 0.000000981 * Math.pow(temperature, 3) - 0.000000001901 * Math.pow(temperature, 4)));
    }
    else
    {
        saturationPressureOfWaterInAir = 'Temperature too high!';
    }

    //console.log('saturationPressureOfWaterInAir is: '+ saturationPressureOfWaterInAir);
    return saturationPressureOfWaterInAir;
}

function getMinAirFlowByH2O_day(day)  //Public Function LuftvolumenstromH2O_AussenTemp_Day_Aussenfeuchte(AussenTemp, TierAlter, Aussenfeuchte)
{
    var airPressure = getAirPressure();
    var minAirFlowByH2O;
    minAirFlowByH2O = (getWaterVaporPerBird_day(day) / ((getWaterProportionInAir_inside_day(true, day) - getWaterProportionInAir_inside_day(false, day)) * 1000)) / getDensityOfWaterInAir_inside_day(true, day);

    //console.log('minAirFlowByH2O is: '+ minAirFlowByH2O);
    return minAirFlowByH2O;
}
function getMinAirFlowByH2OrelativeToNominellAirFlow_day(day)
{
    var minAirFlowByH2ORelativeToNominellAirFlow;
    minAirFlowByH2ORelativeToNominellAirFlow = getMinAirFlowByH2O_day(day) / getNominellAirFlowPerBird();

    //console.log('minAirFlowByH2ORelativeToNominellAirFlow is: '+ minAirFlowByH2ORelativeToNominellAirFlow);
    return minAirFlowByH2ORelativeToNominellAirFlow;
}

function getWaterVaporPerBird_day(day)  //Public Function Wasserdampfabgabe(TierAlter)
{
    var waterVaporPerBird;
    waterVaporPerBird = getLatentHeatoutputPerBird_day(day) / 0.68; //DIN18910

    //console.log('waterVaporPerBird is: '+ waterVaporPerBird);
    return waterVaporPerBird;
}

function getLatentHeatoutputPerBird_day(day)  //Public Function latWaerme_Day(TierAlter)
{
    var latentHeatoutput;
    latentHeatoutput = getCorrectedHeatoutputPerBird_day(day) - getSensibleHeatoutputPerBird_day(day); //DIN18910

    //console.log('latentHeatoutput is: '+ latentHeatoutput);
    return latentHeatoutput;
}

function getSensibleHeatoutputPerBird_day(day)  //Public Function senWaerme_Day(TierAlter)
{
    var species = getSpecies();

    var sensibleHeatoutput;
    if(species == 'Broiler' || species == 'Turkey')
    {
        sensibleHeatoutput = 0.61 * getCorrectedHeatoutputPerBird_day(day) - getTotalHeatoutputPerBird_day(day) / 1000 * (0.228 * Math.pow(getCoopTemperature_day(day), 2)); //DIN18910
    }

    //console.log('sensibleHeatoutput is: '+ sensibleHeatoutput);
    return sensibleHeatoutput;
}

function getCorrectedHeatoutputPerBird_day(day)  //Public Function korrWaermeproduktion_Day(TierAlter)
{
    var correctedHeatoutput;
    //Geflügel
    correctedHeatoutput = getTotalHeatoutputPerBird_day(day) * (1 + 0.02 * (20 - getCoopTemperature_day(day))); //DIN18910

    //console.log('correctedHeatoutput is: '+ correctedHeatoutput);
    return correctedHeatoutput;
}

function getWaterProportionInAir_inside_day(inside, day)  //Public Function Wassergehalt_th(Temperatur, Luftfeuchte) The inside boolean defines wether the value for the inside or the outside is requested
{
    var airPressure = getAirPressure();
    var humidity;
    if(inside === true)
    {
        humidity = getCoopHumidity_day(day);
    }
    else
    {
        humidity = getOutsideHumidity();
    }
    var vaporPressure = getVaporPressure_inside_day(inside, day);

    //Berechnet den Wassergehalt  feuchter Luft in kg/kg (Temperatur in °C; Luftfeuchte in %; Luftdruck in Pa)
    var waterProportionInAir;
    waterProportionInAir = 0.6222 * vaporPressure / (airPressure - vaporPressure)
    //aus Recknagel Sprenger
    if(humidity > 1)
    {
        waterProportionInAir = 'Nebel';
    }

    //console.log('waterProportionInAir is: '+ waterProportionInAir);
    return waterProportionInAir;
}

function getCalculatedNominellAirFlowPerBird() //Public Function NominalLuft(TierGewicht, Tierart)
{
    var species = getSpecies();
    var finalWeight;
    finalWeight = getFinalWeight();

    var nominellAirFlow;
    if(species == 'Broiler')
    {
        nominellAirFlow = 0.086 * Math.pow(finalWeight, 3) - 0.8257 * Math.pow(finalWeight, 2) + 3.4566 * finalWeight;
    }
    if(species == 'Turkey')
    {
        nominellAirFlow = 0.0003 * Math.pow(finalWeight, 3) - 0.0259 * Math.pow(finalWeight, 2) + 1.5773 * finalWeight + 0.9127;
    }

    //console.log('nominellAirFlow is: '+ nominellAirFlow);
    return nominellAirFlow;
}