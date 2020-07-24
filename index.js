import path from 'path';
import fs from 'fs-extra';

import {
    Utility
} from './package.js'

export default class ConvertProcess {
    static StartExecution = (arrayOfPathes, toDirectory, _config) => {
        //camelCase: false,
        //usingDefaultInTsFile: false
        //usingClass:true
        this.config = _config;
        if (Utility.checkValid(arrayOfPathes)) {
            this.prepareDestination(arrayOfPathes, toDirectory);
            this.startMovingFilesToTemp();
            this.startSplitingFiles();
            this.startConvertingFilesStep1();
            this.deletingTempDirs();
            this.replaceAnyInTsFiles();
        } else {
            console.log('Not Valid Destination.');
        }
    }

    // After this.startSplitingFiles() Called.
    // this.destinationPath         -> like     './Front-End/src/app/shared/models'
    // this.destinationPathTemp     -> like     './Front-End/src/app/shared/models/TempDirectory'
    // this.sourcePath              -> like     './Front-End/src/app/shared/models/TempDirectory/SourcePath'
    static prepareDestination = (arrayOfPathes, toDirectory) => {
        if (toDirectory == undefined) {
            toDirectory = "./DefaultFolder"
        }
        this.arrayOfSources = arrayOfPathes;
        this.destinationPath = toDirectory;
        this.destinationPathTemp = `${this.destinationPath}/TempDirectory`;
        Utility.checkDirAndGenerateMissingDir(this.destinationPath);
        Utility.emptyDirectory(this.destinationPath);
        if (!fs.existsSync(this.destinationPathTemp)) {
            fs.mkdirSync(this.destinationPathTemp);
        }
        Utility.emptyDirectory(this.destinationPathTemp);
        Utility.hideFile(this.destinationPathTemp);
    }

    static startMovingFilesToTemp = () => {
        console.log('Start Moving Files To Temp.');
        this.arrayOfSources.forEach(path => {
            Utility.copyAllFromTo(path, this.destinationPathTemp, a => a.endsWith('.cs'));
        });
        console.log('End Moving Files To Temp.');
    }

    static startSplitingFiles = (_path) => {
        console.log('Start Spliting Files.');
        this.sourcePath = path.join(this.destinationPathTemp, 'SourcePath');
        Utility.checkDirAndGenerateMissingDir(this.sourcePath);
        Utility.emptyDirectory(this.sourcePath);
        Utility.splitFilesFromDirectoryBasedOnClasses(this.destinationPathTemp, this.sourcePath);
        console.log('End Spliting Files.');
    }

    // Converting each file into a ts file to the this.destinationPath
    static startConvertingFilesStep1 = () => {
        /* 
            array contain objects with definition
            [
                {
                    tsFile : account-view.ts,
                    tsClass : AccountView,
                    parentClass: Shift
                }
            ]        
        */
        this.tsArray = [];
        var allFiles = fs.readdirSync(this.sourcePath);
        allFiles.forEach(file => {
            var tsObj = Utility.initConvertFile(path.join(this.sourcePath, file), this.destinationPath, this.config);
            Utility.assignObjectToArray(tsObj, this.tsArray, 'tsClass', true);
        });

        console.log(this.tsArray);
    }

    static deletingTempDirs = () => {
        console.log(`Deleting Temp Files...`);
        Utility.deleteDirectory(this.sourcePath);
        Utility.deleteDirectory(this.destinationPathTemp);
    }

    static replaceAnyInTsFiles = () => {
        var files = fs.readdirSync(this.destinationPath).filter(a => fs.lstatSync(path.join(this.destinationPath, a)).isFile());
        files.forEach(file => {
            var newFileContent = Utility.startReplacingAny(this.destinationPath, file, this.tsArray, this.config);
            Utility.writeIntoFile(path.join(this.destinationPath, file), newFileContent);
            console.log(`Done Updating Model ==> ${this.destinationPath}/${file}`);
        });
    }

}