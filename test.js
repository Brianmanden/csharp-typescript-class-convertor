import ConvertProcess from './index.js';
import path from 'path';

ConvertProcess.StartExecution(
    [
        './CSharpModels',
    ], './Models', {
        camelCase: true,
        usingDefaultInTsFile: true,
        usingClass: true
    }, []
);