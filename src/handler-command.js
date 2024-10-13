import process from 'node:process';

import { currentWorkDirectory, sayBi } from './init.js';
import { changeUpDir, changeDir } from './checkout-dir.js';

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

        default:
            process.stdout.write(`Invalid input: \n`);
            break;
    }
}
export default handlerCommand; 