calculation()

function massToFuel(mass) {
    fuel = Math.floor(mass/3)-2
    return fuel;
}

function calculation () {
    var fuel = 0;
    var fuelFuel = 0;
    var moduleFuel = 0;
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('input.txt')
      });
     
      lineReader.on('line', function (line) {
        //console.log ("Read in " + line.toString())

        moduleFuel = massToFuel(line) 
        // figure out how much the fuel to launch the fuel is..
        fuelFuel = massToFuel(moduleFuel)
        while (fuelFuel > 0) { 
          fuel = fuel + fuelFuel
          fuelFuel = massToFuel(fuelFuel)
       }
       fuel = moduleFuel + fuel
      
        
      }).on('close', () => {
         console.log ("Final output "  + fuel)
      });
      
}

