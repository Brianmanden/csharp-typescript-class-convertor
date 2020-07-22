# csharp-typescript-class-convertor
csharp-typescript-class-convertor is a nodejs based library for converting classess from .net into angular 8(typescript code)

## Installation
```bash
npm i csharp-typescript-class-convertor --save-dev
```

In Your Javascript File 
```javascript
import ConvertProcess from "csharp-typescript-class-convertor";

var pathArray = [];
pathArray.push("path1")
pathArray.push("path2")

var destinationPath = 'toPath';
var config = {
    camelCase: false,
    usingDefaultInTsFile: false
}

ConvertProcess.StartExecution(pathArray, destinationPath, config);
```

the first argument containing pathes of the models that you want to upload.
the second one is the destination. if left undefined it will create DefaultFolder in the same project
the third parameter is config to specific the camel case in converting property name 

and the default key word in exporting ts class

## Agnular Using

1- create a javascript file in assets
2- import the package inside of it and run the static function
3- write a package.json command to run the packge with node - node ./src/assets/convert.js
4- every time you want to run the file just write npm run <fileName.js>

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
