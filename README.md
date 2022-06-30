# csharp-typescript-class-convertor
csharp-typescript-class-convertor is a Node.js based library for converting classess from .Net into Angular 8 (TypeScript code)

## Installation
```bash
npm i csharp-typescript-class-convertor --save-dev
```

In your JavaScript File 
```javascript
import ConvertProcess from "csharp-typescript-class-convertor";
import path from 'path';

var pathArray = [];
pathArray.push("path1")
pathArray.push("path2")

var destinationPath = 'toPath';
var config = {
    camelCase: false,
    usingDefaultInTsFile: false,    
    usingClass:true                 // to use class declaration true - use false for interface declaration
}

var excludedModels = [
    path.join('..','Models1','excludedFile.cs')
]
ConvertProcess.StartExecution(pathArray, destinationPath, config, excludedModels);
```

Note --> there is a testing file in the package called test.js that demonstrate how to use this package.

The first argument containing paths of the models that you want to upload.

The second one is the destination. If left undefined it will create DefaultFolder in the same project

The third parameter is config to specificy the camel case in converting property name and the default key word in exporting ts class

The fourth parameter is the excluded model...you need to use path.join(params paths) to exclude them

## Angular Using

1. Create a javascript file in assets

2. Import the package inside of it and run the static function

3. Write a package.json command to run the packge with node - node ./src/assets/convert.js

4. Every time you want to run the file just write npm run <fileName.js>

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
