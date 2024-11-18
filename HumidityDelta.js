
function getTotalHumidityDelta(day, temperatureIn, humidityIn, temperatureOut, humidityOut) //get the amount of water the coop has "absorbed"; if negative, it has lost water
{
    var humidityDelta;
    humidityDelta = getHumidityDeltaPerBird(day, temperatureIn, humidityIn, temperatureOut, humidityOut) * getNumberOfBirds();

    console.log('totalHumidityDelta is: '+ humidityDelta);
    return humidityDelta;
}

function getHumidityDeltaPerBird(day, temperatureIn, humidityIn, temperatureOut, humidityOut) //get the amount of water one bird has brought into the coop; if negative, the water per bird got carried away
{
    var airPressure = getAirPressure();
    var humidityDelta;
    humidityDelta = getMinAirFlowByAll_day(day) * (getWaterProportionInAir_temperature_humidity_airPressure(temperatureIn, humidityIn, airPressure) - getWaterProportionInAir_temperature_humidity_airPressure(temperatureOut, humidityOut, airPressure)) *100000*24;

    //console.log('humidityDelta is: '+ humidityDelta);
    return humidityDelta;
}

function getWaterProportionInAir_temperature_humidity_airPressure(temperature, humidity, airPressure)  //Public Function Wassergehalt_th(Temperatur, Luftfeuchte)
{
    //Berechnet den Wassergehalt  feuchter Luft in kg/kg (Temperatur in °C; Luftfeuchte in %; Luftdruck in Pa)
    var waterProportionInAir;
    var vaporPressure = getVaporPressure_temperature_humidity(temperature, humidity);

    waterProportionInAir = 0.6222 * vaporPressure / (airPressure - vaporPressure)
    //aus Recknagel Sprenger
    if(humidity > 1)
    {
        waterProportionInAir = 'Nebel';
    }

    //console.log('waterProportionInAir is: '+ waterProportionInAir);
    return waterProportionInAir;
}

function getVaporPressure_temperature_humidity(temperature, humidity)
{
    var vaporPressure;
    vaporPressure = (getSaturationPressureOfWaterInAir_temperature(temperature) * humidity);
    return vaporPressure;
}

function getSaturationPressureOfWaterInAir_temperature(temperature)  //Public Function Saettigungsdruck(Temperatur)
{
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