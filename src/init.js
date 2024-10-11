import cliInterface from './interface.js';
import handlerCommand from './handler-command.js';

let isAutorizated = false;
let currentUserName = '';

const formattingUserName = async(command) => {
    let userNameFromCLI;

    if (!command) {
        userNameFromCLI = process.argv.find(arg => arg.startsWith('--username='));
    } else {
        userNameFromCLI = command;
    }
        
    if (userNameFromCLI) {
        const formattedUserName = userNameFromCLI.split('=')[1]?.replace(/_/g, ' ').trim();
        return formattedUserName || null;
    }
}

const proposeDirective = async(status) => {
    while (status) {
        const userAnswer = await cliInterface(status);
        handlerCommand(userAnswer);
    }
}

const greetings = async(formattedName) => {
        try {
            let formattedUserName = await formattedName;
    
            if (formattedUserName && formattedUserName.length > 0) {
                isAutorizated = true;
                currentUserName = formattedUserName;

                console.log(`Welcome to the File Manager, ${formattedUserName}!`);

                proposeDirective(isAutorizated);
            } else {
                formattedUserName = await formattingUserName(await cliInterface(isAutorizated));

                return greetings(formattedUserName);
            }
    
        } catch (error) {
            let formattedUserName = await formattingUserName(await cliInterface(isAutorizated));
            return greetings(formattedUserName);
        }
}

greetings(await formattingUserName());

export {isAutorizated, currentUserName}

// 1. имя не должно меняться, если пользователь авторизирован
// 2. команда выхода из программы согласно тз