var utils = require('./utils.js');
var manhattanDistance = 0
loadData()
//test();

function loadData() {
    let array;
    let wireArray = utils.create2DArray(20000)
    let wireNumber = 0;
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('input.txt')
    });

    lineReader.on('line', function (line) {
        wire = line.split(',');
        buildArray(wireArray, wire, wireNumber);
        wireNumber++
        printArray(wireArray, 100);
        console.log("Manhattan Distance " + manhattanDistance)
    }).on('close', () => {
    });
}

function printArray(wireArray, size) {
    // Start at top left corner
    size = 19
    for (yLooper = size - 1; yLooper >= -10; yLooper--) {
        var row = new String("");
        for (xLooper = -10; xLooper < size; xLooper++) {
            if (typeof wireArray[xLooper][yLooper] !== "undefined") {
                row = row + wireArray[xLooper][yLooper]
            } else {
                row = row + " "
            }

        }
        console.log(row);
    }
}

// determine Manhattan Distance and Store if it's smaller than the existing
function determineManhattanDistance(x, y) {
    console.log ("Found intersection " + x + " " + y)
    xDistance = Math.abs(x) 
    yDistance = Math.abs(y) 
    manDistance = xDistance + yDistance
    if (manhattanDistance === 0) {
        manhattanDistance = manDistance
        return
    }
    if (manDistance < manhattanDistance) {
        manhattanDistance = manDistance
    }
}

function updatePoint(wireArray, wireNumber, x, y) {
    console.log("x " + x + " y " + y )
    if (typeof (wireArray[x][y]) === 'undefined') {
        wireArray[x][y] = wireNumber
    } else {
        if (wireArray[x][y] === wireNumber) {
            wireArray[x][y] = '+'
            return
        } 
        wireArray[x][y] = 'X'
        determineManhattanDistance(x, y)
    }
}

// For each wire update the wireArray  
function buildArray(wireArray, wire, wireNumber) {
    // loop through input array 
    let x = 0;
    let y = 0;
    for (inputLooper = 0; inputLooper < wire.length; inputLooper++) {
        var directionCode = wire[inputLooper]
        console.log ("Parsing : "  + directionCode)
        var direction = directionCode.charAt(0)
        var directionCount = Number(directionCode.substring(1))

        switch (direction) {
            case ("U"):
                for (posLooper = 0; posLooper <= directionCount; posLooper++) {
                    updatePoint(wireArray, wireNumber, x, y + posLooper)
                }
                y = y + directionCount
                break
            case ("D"):
                for (posLooper = directionCount; posLooper >= 0; posLooper--) {
                    updatePoint(wireArray, wireNumber, x, y - posLooper)
                }
                y = y - directionCount
                break
            case ("L"):
                for (posLooper = directionCount; posLooper >= 0; posLooper--) {
                    updatePoint(wireArray, wireNumber, x-posLooper,y)
                }
                x = x - directionCount
                break
            case ("R"):
                for (posLooper = 0; posLooper <= directionCount; posLooper++) {
                    updatePoint(wireArray, wireNumber, x + posLooper, y)
                }
                x = x + directionCount
                break
            default:
                console.log("Direction Code " + directionCode + " not recognized")
        }
        console.log("Y is now " + y)
        console.log("X is now " + x)
    }
}

function intCode(intArray, noun, verb) {
    let array = intArray.slice()
    array[1] = noun
    array[2] = verb
    for (i = 0; i < intArray.length; i = i + 4) {
        //console.log("Operator " + array[i])
        //console.log("value1 " + array[array[i + 1]])
        //console.log("value2 " + array[array[i + 2]])
        //console.log("Result into position " + array[i + 3])
        // exit
        if (array[i] == 99) {
            //console.log("Final output " + array)
            console.log("Address 0 " + array[0])
            return array[0]
        }
        //addition
        if (array[i] == 1) {
            array[array[i + 3]] = Number(array[array[i + 2]]) + Number(array[array[i + 1]])
        }
        // multiply
        if (array[i] == 2) {
            array[array[i + 3]] = Number(array[array[i + 2]]) * Number(array[array[i + 1]])
        }
    }

}

