import cliInterface from './interface.js';
import handlerCommand from './handler-command.js';

const formattingUserName = async(command) => {
    let userNameFromCLI;

    if (!command) {
        userNameFromCLI = await process.argv.find(arg => arg.startsWith('--username='));
    } else {
        userNameFromCLI = command;
    }
    
    const formattedUserName = await userNameFromCLI ? userNameFromCLI
        .split('=')[1]
        .replace(/_/g, ' ')
        .trim() : null;

    return formattedUserName;
}

const greetings = async(formattedName) => {
    let isAutorizated = false;
    let formattedUserName = await formattedName;

    if (formattedUserName && formattedUserName.length > 0) {
        let isAutorizated = true;
        console.log(`Welcome to the File Manager, ${formattedUserName}!`);

        while (isAutorizated) {
            const userAnswer = await cliInterface(isAutorizated);
            handlerCommand(userAnswer);
        }

    } else {
        formattedUserName = await formattingUserName(await cliInterface(isAutorizated));
        console.log(formattedUserName);
        return greetings(formattedUserName);
    }
}

greetings(formattingUserName());