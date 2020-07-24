import ConvertProcess from './index.js';

ConvertProcess.StartExecution(
    [
        '../Model1',
        '../Model2',
        '../Model3'
    ], './Models', {
        camelCase: false,
        usingDefaultInTsFile: true,
        usingClass: true
    }
);


// var line = `public class Shit : Account`;
// var indexOfDot = line.indexOf(`:`);

// var sperator = line.indexOf(`,`, indexOfDot + 1);
// if (sperator == -1) {
//     sperator = line.indexOf(`{`, indexOfDot + 1);
//     if (sperator == -1) {
//         sperator = line.length + 1;
//     }
// }

// var exportClass = line.substring(ind + 1, sperator).trim();
//console.log(exportClass);