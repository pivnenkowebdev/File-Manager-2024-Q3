import cliInterface from './interface.js';
import handlerCommand from './handler-command.js';

let isAutorizated = false;

const formattingUserName = async(command) => {
    let userNameFromCLI;

    if (!command) {
        userNameFromCLI = process.argv.find(arg => arg.startsWith('--username='));
    } else {
        userNameFromCLI = command;
    }
    
    const formattedUserName = await userNameFromCLI ? userNameFromCLI
        .split('=')[1]
        .replace(/_/g, ' ')
        .trim() : null;

    return formattedUserName;
}

const proposeDirective = async(status) => {
    while (status) {
        const userAnswer = await cliInterface(status);
        handlerCommand(userAnswer);
    }
}

const greetings = async(formattedName) => {
    let formattedUserName = await formattedName;

    try {

        if (formattedUserName && formattedUserName.length > 0) {
            isAutorizated = true;
            console.log(`Welcome to the File Manager, ${formattedUserName}!`);
            proposeDirective(isAutorizated);
        } else {
            formattedUserName = await formattingUserName(await cliInterface(isAutorizated));
            return greetings(formattedUserName);
        }

    } catch (error) {
        console.error('Operation failed');
        proposeDirective(isAutorizated);
    }
}

greetings(formattingUserName());