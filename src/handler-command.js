import process from 'node:process';

import { currentWorkDirectory, sayBi } from './init.js';
import { changeUpDir, changeDir, showInfoDir } from './checkout-dir.js';
import readFileStream from './read-file.js';
import create from './add.js';
import rename from './rename.js';
import copy from './copy.js';
import remove from './remove.js';
import moveFile from './move.js';
import hashing from './hash.js';
import compress from './compress.js';
import decompress from './de-compress.js';
import { showEndLine } from './os.js';

const handlerCommand = async (userName = 'Guest', commandInput) => {
    const [commandType, ...args] = commandInput.split(' ');

    switch (commandType) {
        case '.exit':
            await currentWorkDirectory();
            await sayBi(userName);
            process.exit(0);
            break;

        case 'up':
            await changeUpDir();
            await currentWorkDirectory();
            break;

        case 'cd':
            const pathToDirectory = args.join(' ');
            await changeDir(pathToDirectory);
            await currentWorkDirectory();
            break;

        case 'ls':
            await showInfoDir();
            await currentWorkDirectory();
            break;

        case 'cat':
            const pathToFile = args.join(' ');
            await readFileStream(pathToFile);
            await currentWorkDirectory();
            break;

        case 'add':
            const pathToNewFile = args.join(' ');
            await create(pathToNewFile);
            await currentWorkDirectory();
            break;

        case 'rn':
            const pathToOldFile = args[0];
            const newName = args[1];
            await rename(pathToOldFile, newName);
            await currentWorkDirectory();
            break;

        case 'cp':
            const pathToCopyFile = args[0];
            const  newPath = args[1];
            await copy(pathToCopyFile, newPath);
            await currentWorkDirectory();
            break;

        case 'rm':
            const pathToDeleteFile = args[0];
            await remove(pathToDeleteFile);
            await currentWorkDirectory();
            break;

        case 'mv':
            const pathToOrigFile = args[0];
            const pathToMove = args[1];
            await moveFile(pathToOrigFile, pathToMove);
            await currentWorkDirectory();
            break;

        case 'hash':
            const pathToHashingFile = args[0];
            await hashing(pathToHashingFile);
            await currentWorkDirectory();
            break;

        case 'compress':
            const pathToCompressFile = args[0];
            const pathToNewDir = args[1];
            await compress(pathToCompressFile, pathToNewDir);
            await currentWorkDirectory();
            break;

        case 'decompress':
            const pathToZip = args[0];
            const pathToNewDest = args[1];
            await decompress(pathToZip, pathToNewDest);
            await currentWorkDirectory();
            break;

        case 'os':
            const arg = args[0];            
            await showEndLine(arg);
            await currentWorkDirectory();
            break;

        default:
            process.stdout.write(`Invalid input: \n`);
            break;
    }
}
export default handlerCommand; 