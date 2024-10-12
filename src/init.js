import process from 'node:process';
import cliInterface from './interface.js';
import handlerCommand from './handler-command.js';

let statusAutorizated = false;

const formattingUserName = async (name) => {
    const userNameFromCLI = name || process.argv.find(arg => arg.startsWith('--username='));

    if (userNameFromCLI) {
        const parts = userNameFromCLI.split('=');
        if (parts[1]) {
            const formattedName = parts[1].replace(/_/g, ' ').trim();
            return formattedName;
        }
    }
    return null;
};

const currentWorkDirectory = async() => {
    const currentDir = process.cwd();
    process.stdout.write(`\nYou are currently in ${currentDir}\n`);
}

const sayHi = async(formattedName) => {
    process.stdout.write(`\nWelcome to the File Manager, ${formattedName}!\n`);
}

const sayBi = async(formattedName) => {
    process.stdout.write(`Thank you for using File Manager, ${formattedName}, goodbye!\n`);
}

const proposeInput = async(message, userName) => {
    const userAnswer = await cliInterface(message, userName);
    return userAnswer;
}

const greetings = async(formattedName) => {

    if (formattedName) {
        statusAutorizated = true;
        const message = `Enter command\n`;

        await currentWorkDirectory();
        await sayHi(formattedName);
        
        while (statusAutorizated) {
            const userAnswer = await proposeInput(message, formattedName);
            await handlerCommand(formattedName, userAnswer);
        }
        
    } else {
        await currentWorkDirectory();
        const message = '\nInvalid input\nEnter command:\n';
        const userName = await cliInterface(message);
        const formattedName = await formattingUserName(userName);
        return greetings(formattedName);
    }
}

greetings(await formattingUserName());

export { currentWorkDirectory, sayBi };


// 1. не может использовать другие команды пока не ввёл имя (через статус)
// 2. обработка остальных команд