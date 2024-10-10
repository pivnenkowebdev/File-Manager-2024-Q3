import cliInterface from './interface.js';
import handlerCommand from './handler-command.js';

const formattingUserName = () => {
    const argUserName = process.argv.find(arg => arg.startsWith('--username='));
    const formattedUserName = argUserName ? argUserName
        .split('=')[1]
        .replace(/_/g, ' ')
        .trim() : null;

    return formattedUserName;
}

const greetings = async(formattedName) => {
    let formattedUserName = await formattedName;
    let autorizated = false;

    if (formattedUserName && formattedUserName.length > 0) {
        autorizated = true;
        console.log(`Welcome to the File Manager, ${formattedUserName}!`);
    } else {
        formattedUserName = await cliInterface(false);
        greetings(formattedUserName);
    }
}

greetings(formattingUserName());