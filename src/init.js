import process from 'node:process';
import cliInterface from './interface.js';

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

const proposeInput = async(message) => {
    const userAnswer = await cliInterface(message);
    return userAnswer;
}

const sayHi = async(formattedName) => {
    process.stdout.write(`\nWelcome to the File Manager, ${formattedName}!\n`);
}

const greetings = async(formattedName) => {

    if (formattedName) {
        statusAutorizated = true;
        const message = `\nEnter command: `;

        await currentWorkDirectory();
        await sayHi(formattedName);
        await proposeInput(message);
        
    } else {
        await currentWorkDirectory();
        const message = '\nInvalid input\nEnter command:\n';
        const userName = await cliInterface(message);
        const formattedName = await formattingUserName(userName);
        return greetings(formattedName);
    }
}

greetings(await formattingUserName());
