import {isAutorizated, currentUserName} from './init.js';
import process from 'node:process';

const handlerCommand = async(commandType) => {
    switch (commandType) {
        case '.exit':
            console.log(`Thank you for using File Manager, ${currentUserName}, goodbye!`);
            process.exit(0);
            break;
    
        default:
            process.stdout.write(`\nInvalid input\nEnter command: \n`);
            break;
    }
}

export default handlerCommand; 