import fs from 'fs-extra';
import fswin from 'fswin';
import path from 'path';
import readlines from 'n-readlines';

export class Utility {
    constructor() {}

    static emptyDirectory = (_path) => {
        fs.readdirSync(_path).filter(a => fs.lstatSync(path.join(_path, a)).isFile()).forEach(fileName => {
            fs.unlinkSync(path.join(_path, fileName));
        });
    }

    // static gettingFileName = (className) => {
    //     var newString = className.charAt(0).toLowerCase();
    //     for (let index = 1; index < className.length; index++) {
    //         if (className.charAt(index).toUpperCase() == className.charAt(index)) {
    //             if (!isNaN(className.charAt(index))) {
    //                 newString += className.charAt(index);
    //             } else {
    //                 newString += `-` + className.charAt(index).toString().toLowerCase();
    //             }
    //         } else {
    //             newString += `${className.charAt(index)}`;
    //         }
    //     }
    //     return newString += `.ts`;
    // }

    // static ettingClassName = (fileName) => {
    //     // Getting Number Of Dash
    //     var numberOfDashes = 0;
    //     for (let index = 0; index < fileName.length; index++) {
    //         if (fileName.charAt(index) == `-`) {
    //             numberOfDashes++;
    //         }
    //     }

    //     fileName = fileName.replace(fileName.charAt(0), fileName.charAt(0).toUpperCase());

    //     for (let index = 0; index < numberOfDashes; index++) {
    //         var nextIndex = fileName.indexOf(`-`);
    //         fileName = fileName.replace(`${fileName.charAt(nextIndex)}${fileName.charAt(nextIndex + 1)}`, fileName.charAt(nextIndex + 1).toUpperCase());
    //     }
    //     var indexOfDot = fileName.indexOf(`.`);
    //     fileName = fileName.slice(0, indexOfDot);
    //     return fileName;
    // }

    static checkDirAndGenerateMissingDir = (path) => {
        if (!fs.existsSync(path)) {
            var lastIndex = path.lastIndexOf("/");
            if (lastIndex != -1) {
                var newPath = path.slice(0, lastIndex);
                this.checkDirAndGenerateMissingDir(newPath);
            }
            fs.mkdirSync(path);
        }
    }

    static assignObjectToArray = (object, array, property = undefined, objectProperty = false) => {
        if (property) {
            if (objectProperty) {
                if (array.findIndex(v => v[property] == object[property]) == -1) {
                    array.push(object);
                }
            } else {
                if (array.findIndex(v => v[property] == object) == -1) {
                    array.push(object);
                }
            }
        } else {
            if (array.findIndex(v => v == object) == -1) {
                array.push(object);
            }
        }
    }

    // static changeToDataType = (fileNames) => {
    //     var newArrayToDataTypes = new Array(0);
    //     fileNames.forEach(a => {
    //         newArrayToDataTypes.push({
    //             className: this.gettingClassName(a),
    //             fileName: a
    //         });
    //     });
    //     return newArrayToDataTypes;
    // }

    static hideFile = (path) => {
        fswin.setAttributesSync(path, {
            IS_HIDDEN: true
        });
    }

    static deleteDirectory = (path, withInside = false) => {
        if (withInside) {
            this.emptyDirectory(path);
        }
        fs.removeSync(path);
    }

    static copyAllFromTo = (from, to, excludedModels, condition) => {
        var filesToCopy = fs.readdirSync(from).filter(a => fs.lstatSync(path.join(from, a)).isFile());

        if (condition) {
            filesToCopy = filesToCopy.filter(condition);
        }

        if (excludedModels) {
            excludedModels.forEach(fil => {
                var indexToRemove = filesToCopy.findIndex(a => path.join(from, a) == fil);
                if (indexToRemove != -1) {
                    console.log(`Excluding File ... ${fil}`);
                    filesToCopy.splice(indexToRemove, 1);
                }
            });
        }

        filesToCopy.forEach(file => {
            var fromFilePath = path.join(from, file);
            var toFilePath = path.join(to, file);
            fs.copyFileSync(fromFilePath, toFilePath);
            console.log(`Logging ... from ${fromFilePath} to ${toFilePath}`);
        });
    }

    static checkValid = (arrayOfPathes) => {
        var valid = false;
        for (let index = 0; index < arrayOfPathes.length; index++) {
            if (fs.existsSync(arrayOfPathes[index])) {
                valid = true;
                break;
            }
        }
        return valid;
    }

    static readLineByLine = (_path) => {
        var liner = new readlines(_path);
        var lines = [];
        var next;
        while (next = liner.next()) {
            lines.push(next.toString('ascii'));
        }
        return lines;
    }

    static writeIntoFile = (_path, _data) => {
        fs.writeFileSync(_path, _data)
    }

    // with account-view.ts  using true                         return AccountView
    // with AccountView      using false which is the default   return account-view.ts
    static switchingName = (nameToSwitch, toClassName = false) => {
        console.log('Name To Switch ... ', nameToSwitch);
        var nameToReturn = '';
        if (toClassName) {
            nameToSwitch = nameToSwitch.substring(0, nameToSwitch.lastIndexOf('.'));
            var i = 0;
            nameToReturn = nameToSwitch.charAt(0).toUpperCase();
            i++;
            while (i < nameToSwitch.length) {
                if (nameToSwitch.charAt(i) == '-') {
                    i++;
                    if (isNaN(nameToSwitch.charAt(i))) {
                        nameToReturn += nameToSwitch.charAt(i).toUpperCase();
                    } else {
                        nameToReturn += nameToSwitch.charAt(i);
                    }
                } else {
                    nameToReturn += nameToSwitch.charAt(i);
                }
                i++;
            }
        } else {
            var i = 0;
            nameToReturn = nameToSwitch.charAt(i).toLowerCase();
            i++;
            while (i < nameToSwitch.length) {
                if (nameToSwitch.charAt(i).toUpperCase() == nameToSwitch.charAt(i)) {
                    if (!isNaN(nameToSwitch.charAt(i))) {
                        nameToReturn += nameToSwitch.charAt(i);
                    } else {
                        nameToReturn += `-` + nameToSwitch.charAt(i).toString().toLowerCase();
                    }
                } else {
                    nameToReturn += nameToSwitch.charAt(i);
                }
                i++;
            }
            if (nameToReturn.includes('<') || nameToReturn.includes('>')) {
                nameToReturn = nameToReturn.substring(0, nameToReturn.indexOf('<'));
            }
            nameToReturn += `.ts`;
        }
        console.log("Name To Return ... ", nameToReturn);
        return nameToReturn;
    }

    static splitFilesFromDirectoryBasedOnClasses = (fromDir, toDir) => {
        var files = fs.readdirSync(fromDir).filter(a => fs.lstatSync(path.join(fromDir, a)).isFile());
        files.forEach(file => {
            console.log(`Spliting File ${file}`);
            var filePath = path.join(fromDir, file);
            var linesOfFile = this.readLineByLine(filePath);
            var fileContent = [];
            linesOfFile.forEach(line => {
                if (line.includes(' class ') && !this.checkIfValueIsComment(line, 'class')) {
                    fileContent.push([]);
                }
                var index = fileContent.length - 1;
                if (index >= 0) {
                    if (line.trim() != '') {
                        fileContent[index].push(line.trim());
                    }
                }
            });
            fileContent.forEach((content, inde) => {
                var toFilePath = path.join(toDir, `${file}${inde == 0 ? '' : inde}`);
                console.log(`Writing Into File ${toFilePath}`);
                this.writeIntoFile(toFilePath, content.join('\n'));
            });
        });
    }

    static checkIfValueIsComment = (line, value) => {
        if (line.indexOf('//') == -1 && line.indexOf('/*') == -1) {
            return false;
        } else {
            var indexOfValue = line.indexOf(value);
            var indexOfComment = line.indexOf('//');
            if (indexOfComment != -1) {
                if (indexOfComment < indexOfValue) {
                    return true;
                }
            }
            var indexOfFirstComment = line.indexOf('/*');
            if (indexOfFirstComment != -1) {
                var indexOfLastComment = line.indexOf('*/');
                if (indexOfLastComment == -1) {
                    return true;
                } else if (indexOfFirstComment < indexOfValue && indexOfLastComment > indexOfValue) {
                    return true;
                }
            }
            return false;
        }
    }

    static initConvertFile = (filePath, to, config) => {
        var lines = this.readLineByLine(filePath);
        var fileContent = ``;
        var propertyArr = [];
        var classType = {};
        for (let index = 0; index < lines.length; index++) {
            var line = lines[index];

            console.log(`Start Converting File ${filePath} Line Number => ${index + 1}`);

            if ((line.includes('using') && !this.checkIfValueIsComment(line, 'using')) ||
                line.trim() == '' || line.trim() == '{' || line.trim() == '}' ||
                (line.includes('namespace') && !this.checkIfValueIsComment(line, 'namespace'))) {
                continue;
            } else if (line.includes(' class ') && !this.checkIfValueIsComment(line, 'class')) {
                var classNameObj = ConvertingProcess.extractClassName(line);
                var className = classNameObj.className;

                if (config.usingDefaultInTsFile) {
                    if (config.usingClass) {
                        fileContent = `export default class ${className} {\n`;
                    } else {
                        fileContent = `export default interface ${className} {\n`;
                    }
                } else {
                    if (config.usingClass) {
                        fileContent = `export class ${className} {\n`;
                    } else {
                        fileContent = `export interface ${className} {\n`;
                    }
                }

                classType.tsFile = this.switchingName(className);
                classType.tsClass = className;
                classType.parentClass = classNameObj.parentClass;
            } else if (line.includes('public ') && line.includes('get;') && line.includes('set;')) {
                propertyArr.push(ConvertingProcess.gettingPropertyLine(ConvertingProcess.gettingVariableData(line), config));
            }
        }

        console.log(`Preparing Class ${classType.tsClass} For File ${classType.tsFile}`);
        fileContent = ConvertingProcess.AddingConstructorAndFinalLine(fileContent, propertyArr, config);

        var toFilePath = path.join(to, classType.tsFile);
        console.log(`Writing Into File ${toFilePath}`);
        this.writeIntoFile(toFilePath, fileContent);

        return classType;
    }

    static startReplacingAny = (_path, file, arrayOfFiles, config) => {
        console.log(`Start Adding Models Into File => ${_path}/${file}`);
        var lines = this.readLineByLine(path.join(_path, file));
        var currentClassName = this.switchingName(file, true);
        var classObject = arrayOfFiles.find(a => a.tsClass == currentClassName);
        var extendsClass = undefined;
        if (classObject) {
            if (classObject.parentClass) {
                extendsClass = arrayOfFiles.find(a => a.tsClass == classObject.parentClass);
            }
        }
        var imports = [];
        if (extendsClass) {
            var outDataType = extendsClass.tsFile.substring(0, extendsClass.tsFile.lastIndexOf('.'));
            if (config.usingDefaultInTsFile) {
                var importObj = {
                    dataType: outDataType,
                    importLine: `import ${extendsClass.tsClass} from './${outDataType}';`
                };
                Utility.assignObjectToArray(importObj, imports, 'dataType', true);
            } else {
                var importObj = {
                    dataType: outDataType,
                    importLine: `import { ${extendsClass.tsClass} } from './${outDataType}';`
                };
                Utility.assignObjectToArray(importObj, imports, 'dataType', true);
            }
        }
        //console.log(arrayOfFiles);
        lines.forEach((line, index) => {
            if (line.includes(` class `) || line.includes(` interface `)) {
                if (extendsClass) {
                    console.log(lines[index]);
                    console.log("dsdad", currentClassName);
                    lines[index] = this.replaceInLine(line, `${currentClassName} extends ${extendsClass.tsClass}`, currentClassName);
                    console.log(lines[index]);
                }
            }

            if (line.includes('constructor') && extendsClass) {
                lines[index] = line + `\n\t\tsuper();`;
            }

            if (line.includes(`//*****`)) {
                var className = this.gettingClassNameFromComment(line, `//*****`);
                var dataTypeObj = arrayOfFiles.find(f => f.tsClass == className);
                var newLine = line;
                if (dataTypeObj != undefined) {
                    newLine = this.replaceInLine(line, className, 'any', line.indexOf(`:`));
                    if (dataTypeObj.tsFile != file) {
                        var classFilePath = dataTypeObj.tsFile.substring(0, dataTypeObj.tsFile.lastIndexOf('.'));
                        if (config.usingDefaultInTsFile) {
                            var importObj = {
                                dataType: classFilePath,
                                importLine: `import ${className} from './${classFilePath}';`
                            };
                            Utility.assignObjectToArray(importObj, imports, 'dataType', true);
                        } else {
                            var importObj = {
                                dataType: classFilePath,
                                importLine: `import { ${className} } from './${classFilePath}';`
                            };
                            Utility.assignObjectToArray(importObj, imports, 'dataType', true);
                        }
                    }
                }
                newLine = this.deleteComment(newLine);
                lines[index] = newLine;
            }
        });

        if (imports.length > 0) {
            imports.push({
                importLine: ''
            });
        }

        lines.unshift(...imports.map(a => a.importLine));

        console.log(`End Adding Models Into File => ${_path}/${file}`);

        var newFileContent = ``;
        lines.forEach(line => {
            newFileContent += line + '\n';
        });

        return newFileContent;
    }

    static replaceInLine = (line, replaceTo, replaceValue, startIndex = 0) => {
        var firstSection = line.indexOf(replaceValue, startIndex);
        var newLine = line.substring(0, firstSection) + replaceTo + line.substring(firstSection + (replaceValue.length), line.length);
        return newLine;
    }

    static gettingClassNameFromComment = (line, str) => {
        var index = line.indexOf(str);
        return line.substring(index + str.length, line.length).trim();
    }

    static deleteComment = (line) => {
        return line.substring(0, line.indexOf(`;`) + 1);
    }
}

export class ConvertingProcess {
    static extractClassName = (line) => {
        var index = line.indexOf('class ');
        var nameFirstIndex = index + 6;

        var spaceIndexAfterName = line.indexOf(' ', nameFirstIndex);

        if (spaceIndexAfterName != -1 && line.indexOf('>', spaceIndexAfterName) != -1) {
            spaceIndexAfterName = line.indexOf('>') + 1;
        }

        if (spaceIndexAfterName == -1) {
            spaceIndexAfterName = line.indexOf('{', nameFirstIndex);
            if (spaceIndexAfterName == -1) {
                spaceIndexAfterName = line.length;
            }
        }

        var indexOfDots = line.indexOf(`:`);
        if (indexOfDots != -1) {

        }

        return {
            className: line.slice(nameFirstIndex, spaceIndexAfterName),
            parentClass: this.gettingExportClass(line)
        };
    }

    static gettingExportClass = (line) => {
        var indexOfDot = line.indexOf(`:`);
        if (indexOfDot != -1) {
            var sperator = line.indexOf(`,`, indexOfDot + 1);
            if (sperator == -1) {
                sperator = line.indexOf(`{`, indexOfDot + 1);
                if (sperator == -1) {
                    sperator = line.length + 1;
                }
            }

            var exportClass = line.substring(indexOfDot + 1, sperator).trim();
            return exportClass;
        } else {
            return '';
        }
    }

    static gettingVariableData = (line) => {
        var index = line.indexOf('public ');

        var numberOfIndexes = 7;
        if (line.includes(`public virtual `)) {
            numberOfIndexes = 15;
        }

        var firstIndexOfDataType = index + numberOfIndexes;
        var spaceIndexAfterDataType = line.indexOf(' ', firstIndexOfDataType);
        var nextBackUpIndex = line.indexOf(`>`, spaceIndexAfterDataType);
        if (nextBackUpIndex != -1) {
            spaceIndexAfterDataType = line.indexOf(' ', nextBackUpIndex);
        }

        var dataType = line.slice(firstIndexOfDataType, spaceIndexAfterDataType);

        var propertyNameIndexStart = spaceIndexAfterDataType + 1;
        var propertyNameIndexEnd = line.indexOf(' ', propertyNameIndexStart);
        var propertyName = line.slice(propertyNameIndexStart, propertyNameIndexEnd);

        return {
            dataType,
            propertyName
        };
    }

    static gettingPropertyLine = (propObj, config) => {
        console.log("FIXES", propObj);
        var _propertyName = propObj.propertyName;
        var _dataType = propObj.dataType;

        //Getting DataType And Orignal DataType
        var propertyInfo = this.convertDataType(_dataType);
        console.log("Property Info", propertyInfo);

        var propertyName = _propertyName;
        if (config.camelCase) {
            propertyName = this.fixPropertyName(_propertyName)
        }

        propertyInfo.propertyName = propertyName;
        return this.creatingPropertyLineObject(propertyInfo, config);
    }

    static creatingPropertyLineObject = (propertyInfo, config) => {
        var propertyLine = ``;
        var initLine = `\t\t`;
        if (config.usingClass) {
            propertyLine = `\tpublic ${propertyInfo.propertyName}: ${propertyInfo.dataType}`;

            if (propertyInfo.initalize) {
                initLine += `this.${propertyInfo.propertyName} = new ${propertyInfo.dataType}()`;
                if (propertyInfo.originalDataType != undefined) {
                    initLine += `;\t\t\t\t//*****${propertyInfo.originalDataType}\n`;
                } else {
                    initLine += `;\n`;
                }
            }
        } else {
            propertyLine = `\t${propertyInfo.propertyName}: ${propertyInfo.dataType}`;
        }

        if (propertyInfo.originalDataType != undefined) {
            propertyInfo.propertyTsFile = Utility.switchingName(propertyInfo.originalDataType);
            propertyLine += `;\t\t\t\t//*****${propertyInfo.originalDataType}\n`;
        } else {
            propertyLine += `;\n`;
        }

        return {
            propertyLine,
            initLine,
            propertyInfo
        }
    }

    static convertDataType = (_dataType) => {
        var dataType = ``;
        var initalize = false;
        var originalDataType = undefined;

        if (
            _dataType == `byte` ||
            _dataType == `byte?` ||
            _dataType == `int` ||
            _dataType == `int?` ||
            _dataType == `short` ||
            _dataType == `short?` ||
            _dataType == `long` ||
            _dataType == `long?` ||
            _dataType == `sbyte` ||
            _dataType == `sbyte?` ||
            _dataType == `ushort` ||
            _dataType == `ushort?` ||
            _dataType == `uint` ||
            _dataType == `uint?` ||
            _dataType == `ulong` ||
            _dataType == `ulong?` ||
            _dataType == `float` ||
            _dataType == `float?` ||
            _dataType == `double` ||
            _dataType == `double?` ||
            _dataType == `decimal` ||
            _dataType == `decimal?`
        ) {
            dataType = `number`;
        } else if (_dataType.includes('Expression')) {
            dataType = `any`;
            initalize = false;
            originalDataType = undefined;
        } else if (
            _dataType == `string` ||
            _dataType == `char`
        ) {
            dataType = `string`;
        } else if (
            _dataType == `bool` ||
            _dataType == `bool?`
        ) {
            dataType = `boolean`;
        } else if (
            _dataType == `DateTime` ||
            _dataType == `DateTime?`
        ) {
            dataType = `Date`;
            initalize = true;
        } else if (
            _dataType.includes(`List<`) ||
            _dataType.includes(`IList<`) ||
            _dataType.includes(`IEnumerable<`) ||
            _dataType.includes(`ICollection<`) ||
            _dataType.includes(`DbSet<`) ||
            _dataType.includes(`HashSet<`)
        ) {
            initalize = true;
            var originalObj = this.gettingDataTypeBetweenPractices(_dataType);
            if (originalObj.twoD) {
                var tempObj = this.convertDataType(originalObj.firstOne)
                dataType = `Array<${tempObj.dataType}>`;
                if (dataType != `Array<any>` && dataType != `Array<Array<any>>`) {
                    originalDataType = undefined;
                } else {
                    originalDataType = originalObj.originalDataType;
                }
            } else {
                dataType = `Array<${this.convertDataType(originalObj.originalDataType).dataType}>`;
                if (dataType != `Array<any>` && dataType != `Array<Array<any>>`) {
                    originalDataType = undefined;
                } else {
                    originalDataType = originalObj.originalDataType;
                }
            }
        } else if (
            _dataType == `TimeSpan?` ||
            _dataType == `TimeSpan`
        ) {
            dataType = `any`;
            initalize = false;
        } else {
            dataType = `any`;
            initalize = false;
            originalDataType = _dataType;
        }

        if (_dataType.includes(`[]`)) {
            initalize = true;
            originalDataType = this.gettingDataTypeFromArray(_dataType);
            dataType = `Array<${this.convertDataType(originalDataType).dataType}>`;
            if (dataType != `Array<any>` && dataType != `Array<Array<any>>`) {
                originalDataType = undefined;
            }
        }

        return {
            dataType,
            initalize,
            originalDataType
        }
    }

    static fixPropertyName = (propertyName, toCamelCase = true) => {
        if (toCamelCase) {
            return propertyName.replace(propertyName.charAt(0), propertyName.charAt(0).toLowerCase());
        } else {
            return propertyName.replace(propertyName.charAt(0), propertyName.charAt(0).toUpperCase());
        }
    }

    static AddingConstructorAndFinalLine = (fileContent, propertyArray, config) => {
        if (config.usingClass) {
            fileContent += `\tconstructor() {\n`;
            // Adding The Init Lines
            propertyArray.filter(property => property.propertyInfo.initalize).forEach(property => {
                fileContent += `${property.initLine}`;
            });

            // Adding The Constructor Final Line
            fileContent += `\t}\n\n`;
        }

        // Adding The Property One By One
        propertyArray.forEach(property => {
            fileContent += `${property.propertyLine}`;
        });

        // Adding The Last Line
        fileContent += `}`;

        return fileContent;
    }

    // Data Type string[] Getting string
    static gettingDataTypeFromArray = (dataType) => {
        var firstSquare = dataType.indexOf(`[`);
        return dataType.slice(0, firstSquare);
    }

    // Data Type List<string> Getting string
    static gettingDataTypeBetweenPractices = (dataType) => {
        var originalDataType = "";
        var twoD = false;
        var firstChar = dataType.indexOf(`<`);
        var secondOne = dataType.indexOf('<', firstChar + 1);
        var firstOne = '';
        if (secondOne != -1) {
            var inLastChar = dataType.indexOf(`>`, secondOne);
            originalDataType = dataType.slice(secondOne + 1, inLastChar);
            firstOne = dataType.slice(firstChar + 1, dataType.lastIndexOf('>'));
            twoD = true;
        } else if (dataType.includes(`<`) && dataType.includes(`>`)) {
            var lastChar = dataType.indexOf(`>`);
            originalDataType = dataType.slice(firstChar + 1, lastChar);
            twoD = false;
        }
        return {
            originalDataType,
            twoD,
            firstOne
        };
    }
}