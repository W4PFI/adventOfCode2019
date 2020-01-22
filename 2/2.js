loadData()

function loadData() {
  let array;
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
  });

  lineReader.on('line', function (line) {
    array = line.split(',');
    for (let nounCount = 0; nounCount < 100; nounCount++ ) {
      for(let verbCount = 0; verbCount < 100; verbCount++) {
        if (intCode(array,nounCount,verbCount)==19690720) {
          console.log ("Noun " + nounCount)
          console.log ("Verb " + verbCount)
          val =  (100*nounCount) + verbCount
          console.log ("Value : " + val);
          return
        }
      }
    }
    intCode(array)
  }).on('close', () => {
  });
  
}

function intCode(intArray, noun, verb) {
  let array = intArray.slice()
  array[1]=noun
  array[2]=verb
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

