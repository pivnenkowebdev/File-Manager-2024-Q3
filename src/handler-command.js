import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { currentWorkDirectory, sayBi } from './init.js';
import changeDir from './checkout-dir.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const handlerCommand = async(userName = 'Guest', commandType) => {

    switch (commandType) {
        case '.exit':
            await currentWorkDirectory();
            await sayBi(userName);
            process.exit(0);
            break;

        case 'up':
            await changeDir();
            await currentWorkDirectory();
            break;

        default:
            process.stdout.write(`Invalid input: \n`);
            break;
    }
}

export default handlerCommand; 