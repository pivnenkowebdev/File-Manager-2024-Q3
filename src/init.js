import cliInterface from './interface.js';

const formattingUserName = () => {
    const argUserName = process.argv.find(arg => arg.startsWith('--username='));
    const formattedUserName = argUserName ? argUserName
        .split('=')[1]
        .replace(/_/g, ' ')
        .trim() : null;

    return formattedUserName;
}

const greetings = async(formattedName) => {
    const formattedUserName = formattedName;

    if (formattedUserName && formattedUserName.length > 0) {
        console.log(`Welcome to the File Manager, ${formattedUserName}!`);
        await cliInterface();
    } else {
        console.log("Invalid input");
        await cliInterface();
    }
}

greetings(formattingUserName());