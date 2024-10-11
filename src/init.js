import cliInterface from './interface.js';
import handlerCommand from './handler-command.js';
import process from 'node:process';

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
        await handlerCommand(userAnswer);
    }
}

const currentWorkDirectory = () => {
    const currentDir = process.cwd();
    process.stdout.write(`You are currently in ${currentDir}\n`);
}

const greetings = async(formattedName) => {
        try {
            let formattedUserName = await formattedName;
    
            if (formattedUserName && formattedUserName.length > 0) {
                isAutorizated = true;
                currentUserName = formattedUserName;

                process.stdout.write(`Welcome to the File Manager, ${formattedUserName}!\n`);
                currentWorkDirectory();

                proposeDirective(isAutorizated);
            } else {
                formattedUserName = await formattingUserName(await cliInterface(isAutorizated));
                currentWorkDirectory();
                return greetings(formattedUserName);
            }
    
        } catch (error) {
            let formattedUserName = await formattingUserName(await cliInterface(isAutorizated));
            currentWorkDirectory();
            return greetings(formattedUserName);
        }
}

greetings(await formattingUserName());

export {isAutorizated, currentUserName, currentWorkDirectory}


// техдолг
// //команда выхода из программы согласно тз -