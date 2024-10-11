import {isAutorizated, currentUserName} from './init.js';

const handlerCommand = async(commandType) => {
    switch (commandType) {
        case '.exit':
            console.log(`Thank you for using File Manager, ${currentUserName}, goodbye!`);
            process.exit(0);
            break;
    
        default:
            break;
    }
}

export default handlerCommand; 