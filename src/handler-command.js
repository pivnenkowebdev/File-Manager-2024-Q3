// import {isAutorizated} from './init.js';
import process from 'node:process';
import { currentWorkDirectory, sayBi } from './init.js';
import cliInterface from './interface.js';

const handlerCommand = async(userName = 'Guest', commandType) => {

    switch (commandType) {
        case '.exit':
            await currentWorkDirectory();
            await sayBi(userName);
            process.exit(0);
            break;

        case 'a':
            await currentWorkDirectory();
            break;

        default:
            process.stdout.write(`Invalid input: \n`);
            break;
    }
}

export default handlerCommand; 