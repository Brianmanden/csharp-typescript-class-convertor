import ConvertProcess from './index.js';
import path from 'path';

ConvertProcess.StartExecution(
    [
        './CSharpModels',
    ], './Models', {
        camelCase: false,
        usingDefaultInTsFile: true,
        usingClass: true
    }, []
);