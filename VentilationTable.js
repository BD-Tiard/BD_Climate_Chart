
function onEnter(event, i)
{     
   var code = 0;
   code = event.keyCode;
   if (code==13)
   {
       updateRow(i);
   }
}

function addElementsToTable() //calculate the data for the js table
{
    var table = document.getElementById("tableContent"); //to check if the table is already created or not
    ventilationTable = [];

    var rows = 8;
    var daysInTable = [];
    if(table.rows.length == 0) //if the table isnt created yet, the default days will be set
    {
        daysInTable = [0, 7, 14, 21, 28, 35, 42, 49,]
    }
    else
    {
        daysInTable = [
        parseInt(table.rows[0].cells.item(0).innerHTML),
        parseInt(table.rows[1].cells.item(0).innerHTML),
        parseInt(table.rows[2].cells.item(0).innerHTML),
        parseInt(table.rows[3].cells.item(0).innerHTML),
        parseInt(table.rows[4].cells.item(0).innerHTML),
        parseInt(table.rows[5].cells.item(0).innerHTML),
        parseInt(table.rows[6].cells.item(0).innerHTML),
        parseInt(table.rows[7].cells.item(0).innerHTML),
        ]
    }

    for(var i = 0; i < rows; i++){
        
        var day = daysInTable[i];
        ventilationTable.push({
            day: day,
            coopTemperature: getCoopTemperature_day(day),
            heatingDelta: getHeatingDelta_day(day),
            relativeHumidity: getCoopHumidity_day(day),
            co2: getCoopCO2_day(day),
            minimumVentilationByCO2: Math.round(getMinAirFlowByCO2_day(day)*100)/100,
            relativeVentilationByCO2: Math.round(getMinAirFlowByCO2relativeToNominellAirFlow_day(day)*100),
            minimumVentilationByH2O: Math.round(getMinAirFlowByH2O_day(day)*100)/100,
            relativeVentilationByH2O: Math.round(getMinAirFlowByH2OrelativeToNominellAirFlow_day(day)*100),
            minimumVentilationByFeedFactor: Math.round(getMinAirFlowByFeedFactor_day(day)*100)/100,
            relativeVentilationByFeedFactor: Math.round(getMinAirFlowByFeedFactorRelativeToNominellAirFlow_day(day)*100),
            maximumVentilationAtHeatThreshold: Math.round(getMaxAirFlowByHeatrelativeToNominellAirFlow_day(day)*100),
        });

    }									
}

function updateTable() //fill the html table with the js data
{
    var table = document.getElementById("tableContent");

    table.innerHTML = ""; //clear the table
    var i = 0;

    ventilationTable.forEach(element => { //iterate throught the table rows and fill them
        let row = table.insertRow();

        //console.log("doing row: "+i);

        let day = row.insertCell(0);
        day.innerHTML = element.day;
        day.contentEditable = true;
        day.setAttribute("onfocusout", "updateRow("+i+");");
        day.setAttribute("onKeyPress", "onEnter(event,"+i+")");

        let coopTemperature = row.insertCell(1);
        coopTemperature.innerHTML = element.coopTemperature + '°C';
        coopTemperature.contentEditable = true;
        coopTemperature.setAttribute("onfocusout", "updateRow("+i+");");
        coopTemperature.setAttribute("onKeyPress", "onEnter(event,"+i+")");

        let heatingDelta = row.insertCell(2);
        heatingDelta.innerHTML = element.heatingDelta + '°C';
        heatingDelta.contentEditable = true;
        heatingDelta.setAttribute("onfocusout", "updateRow("+i+");");
        heatingDelta.setAttribute("onKeyPress", "onEnter(event,"+i+")");

        let relativeHumidity = row.insertCell(3);
        relativeHumidity.innerHTML = element.relativeHumidity*100 + '%';
        relativeHumidity.contentEditable = true;
        relativeHumidity.setAttribute("onfocusout", "updateRow("+i+");");
        relativeHumidity.setAttribute("onKeyPress", "onEnter(event,"+i+")");

        let co2 = row.insertCell(4);
        co2.innerHTML = element.co2 + 'ppm';
        co2.contentEditable = true;
        co2.setAttribute("onfocusout", "updateRow("+i+");");
        co2.setAttribute("onKeyPress", "onEnter(event,"+i+")");

        let minimumVentilationByCO2 = row.insertCell(5);
        minimumVentilationByCO2.innerHTML = element.minimumVentilationByCO2 + ' m\u00b3/h/bird';
        let relativeVentilationByCO2 = row.insertCell(6);
        relativeVentilationByCO2.innerHTML = element.relativeVentilationByCO2 + '%';

        let minimumVentilationByH2O = row.insertCell(7);
        minimumVentilationByH2O.innerHTML = element.minimumVentilationByH2O + ' m\u00b3/h/bird';
        let relativeVentilationByH2O = row.insertCell(8);
        relativeVentilationByH2O.innerHTML = element.relativeVentilationByH2O + '%';

        let minimumVentilationByFeedFactor = row.insertCell(9);
        minimumVentilationByFeedFactor.innerHTML = element.minimumVentilationByFeedFactor + ' m\u00b3/h/bird';
        let relativeVentilationByFeedFactor = row.insertCell(10);
        relativeVentilationByFeedFactor.innerHTML = element.relativeVentilationByFeedFactor + '%';

        let maximumVentilationAtHeatThreshold = row.insertCell(11);
        maximumVentilationAtHeatThreshold.innerHTML = element.maximumVentilationAtHeatThreshold + '%';

        i++;
    })
}

function updateRow(rowNumber)
{
    var table = document.getElementById("tableContent");

    var day = parseInt(table.rows[rowNumber].cells.item(0).innerHTML);

    if(day < 0)
    {
        table.rows[rowNumber].cells.item(0).innerHTML = "Days must be positive!";
        return;
    }
    if(day > 70)
    {
        table.rows[rowNumber].cells.item(0).innerHTML = "Days must be smaller than 71";
        return;
    }
    if(rowNumber >0)
    {
        var dayInRowBefore = parseInt(table.rows[rowNumber -1].cells.item(0).innerHTML);
        if(day < dayInRowBefore)
        {
            table.rows[rowNumber].cells.item(0).innerHTML = "Days must be in descending order!";
            return;
        }
    }
    if(rowNumber <7)
    {
        var dayInRowAfter = parseInt(table.rows[rowNumber+1].cells.item(0).innerHTML);
        if(day > dayInRowAfter)
        {
            table.rows[rowNumber].cells.item(0).innerHTML = "Days must be in descending order!";
            return;
        }
    }

    var temp = parseInt(table.rows[rowNumber].cells.item(1).innerHTML);
    var heatingDelta = parseInt(table.rows[rowNumber].cells.item(2).innerHTML);
    var humidity = parseInt(table.rows[rowNumber].cells.item(3).innerHTML)/100;
    var co2 = parseInt(table.rows[rowNumber].cells.item(4).innerHTML);

    //change all the values before the day of the current row
    if(day == 0) //if the day of the current row is 0 only the one entry in the custom setpoints for 0 needs to be changed
    {
        custom_Day_Temp_Humidity_CO2[day].temp = temp;
        custom_Day_Temp_Humidity_CO2[day].heatingDelta = heatingDelta;
        custom_Day_Temp_Humidity_CO2[day].humidity = humidity;
        custom_Day_Temp_Humidity_CO2[day].co2 = co2;
    }
    else if(rowNumber == 0) //if the row is the first row it will override all the entries in the custom setpoints before it
    {
        var i = day;

        while(i>=0)
        {
            custom_Day_Temp_Humidity_CO2[i].temp = temp;
            custom_Day_Temp_Humidity_CO2[i].heatingDelta = heatingDelta;
            custom_Day_Temp_Humidity_CO2[i].humidity = humidity;
            custom_Day_Temp_Humidity_CO2[i].co2 = co2;

            i--;
        }
    }
    else
    {
        var tempInRowBefore = parseInt(table.rows[rowNumber-1].cells.item(1).innerHTML);
        var heatingDeltaInRowBefore = parseInt(table.rows[rowNumber-1].cells.item(2).innerHTML);
        var humidityInRowBefore = parseInt(table.rows[rowNumber-1].cells.item(3).innerHTML)/100;
        var co2InRowBefore = parseInt(table.rows[rowNumber-1].cells.item(4).innerHTML);
        
        var dayDelta = dayInRowBefore - day;
        var tempDeltaPerDay = (tempInRowBefore - temp) / dayDelta;
        var heatingDeltaDeltaPerDay = (heatingDeltaInRowBefore - heatingDelta) / dayDelta;
        var humidityDeltaPerDay = (humidityInRowBefore - humidity) / dayDelta;
        var co2DeltaPerDay = (co2InRowBefore - co2) / dayDelta;

        var i = day;

        while(i>dayInRowBefore)
        {
            custom_Day_Temp_Humidity_CO2[i].temp = temp + tempDeltaPerDay * (i - day);
            custom_Day_Temp_Humidity_CO2[i].heatingDelta = heatingDelta + heatingDeltaDeltaPerDay * (i - day);
            custom_Day_Temp_Humidity_CO2[i].humidity = humidity + humidityDeltaPerDay * (i - day);
            custom_Day_Temp_Humidity_CO2[i].co2 = co2 + co2DeltaPerDay * (i - day);

            i--;
        }
    }

    //change all the values after the day of the current row
    if(day == 70) //if the day of the current row is 70 only the one entry in the custom setpoints for 70 needs to be changed
    {
        custom_Day_Temp_Humidity_CO2[day].temp = temp;
        custom_Day_Temp_Humidity_CO2[day].heatingDelta = heatingDelta;
        custom_Day_Temp_Humidity_CO2[day].humidity = humidity;
        custom_Day_Temp_Humidity_CO2[day].co2 = co2;
    }
    else if(rowNumber == 7) //if the row is the last row it will override all the entries in the custom setpoints after it
    {
        var i = day;

        while(i<=70)
        {
            custom_Day_Temp_Humidity_CO2[i].temp = temp;
            custom_Day_Temp_Humidity_CO2[i].heatingDelta = heatingDelta;
            custom_Day_Temp_Humidity_CO2[i].humidity = humidity;
            custom_Day_Temp_Humidity_CO2[i].co2 = co2;

            i++;
        }
    }
    else
    {
        var dayInRowAfter = parseInt(table.rows[rowNumber+1].cells.item(0).innerHTML);
        var tempInRowAfter = parseInt(table.rows[rowNumber+1].cells.item(1).innerHTML);
        var heatingDeltaInRowAfter = parseInt(table.rows[rowNumber+1].cells.item(2).innerHTML);
        var humidityInRowAfter = parseInt(table.rows[rowNumber+1].cells.item(3).innerHTML)/100;
        var co2InRowAfter = parseInt(table.rows[rowNumber+1].cells.item(4).innerHTML);
        
        var dayDelta = dayInRowAfter - day;
        var tempDeltaPerDay = (tempInRowAfter - temp) / dayDelta;
        var heatingDeltaDeltaPerDay = (heatingDeltaInRowAfter - heatingDelta) / dayDelta;
        var humidityDeltaPerDay = (humidityInRowAfter - humidity) / dayDelta;
        var co2DeltaPerDay = (co2InRowAfter - co2) / dayDelta;

        var i = day;

        while(i<dayInRowAfter)
        {
            custom_Day_Temp_Humidity_CO2[i].temp = temp + tempDeltaPerDay * (i - day);
            custom_Day_Temp_Humidity_CO2[i].heatingDelta = heatingDelta + heatingDeltaDeltaPerDay * (i - day);
            custom_Day_Temp_Humidity_CO2[i].humidity = humidity + humidityDeltaPerDay * (i - day);
            custom_Day_Temp_Humidity_CO2[i].co2 = co2 + co2DeltaPerDay * (i - day);

            i++;
        }
    }

    dynamicInput.customValuesActive = true;
    
    updateData();
}

var ventilationTable = //js table
    [ 
      {
        day: 1,
        coopTemperature: 32,
        heatingDelta: -1,
        relativeHumidity: 0.75,
        co2: 3000,
        minimumVentilationByCO2: 0.04,
        relativeVentilatonByCO2: 0.01,
        minimumVentilationByCO2: 0.04,
        relativeVentilationByH2O: 0.01,
        minimumVentilatonByFeedFactor: 0.09,
        relativeVentilationByFeedFactor: 0.01,
        maximumVentilationAtHeatThreshold: 9
      }
    ];