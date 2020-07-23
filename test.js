import ConvertProcess from './index.js';

ConvertProcess.StartExecution(
    [
        '../Model1',
        '../Model2',
        '../Model3'
    ], './Models', {
        camelCase: false,
        usingDefaultInTsFile: true,
        usingClass: false
    }
);