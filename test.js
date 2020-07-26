import ConvertProcess from './index.js';
import path from 'path';

ConvertProcess.StartExecution(
    [
        '../Model1',
    ], './Models', {
        camelCase: false,
        usingDefaultInTsFile: true,
        usingClass: true
    }, [
        path.join('..', 'Model1', 'AddEmp.cs')
    ]
);