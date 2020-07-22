# csharp-typescript-class-convertor
csharp-typescript-class-convertor is a nodejs based library for converting classess from .net into angular 8(typescript code)

## Installation
```bash
npm install dotnetcoreconvertor
```

In Your Javascript File 
```javascript
import ConvertYourClasses from "dotnetcoreconvertor/ConvertYourClasses.js";

var pathArray = [];
pathArray.push("C:/Users/EGMastersDeveloper1/source/Model1")
pathArray.push("C:/Users/EGMastersDeveloper1/source/Model2")
pathArray.push("C:/Users/EGMastersDeveloper1/source/Model3")

new ConvertYourClasses(pathArray, "C:/Users/EGMastersDeveloper1/source/UnitedModels");
```

the first argument containing pathes of the models that you want to upload.
the second one is the destination. if left undefined it will create DefaultFolder in the same project

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

https://github.com/SweHassanAhmed/ClassesConvertor.git


