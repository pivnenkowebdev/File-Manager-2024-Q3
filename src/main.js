import process from 'node:process';

const greetings = () => {
    const argUserName = process.argv.find(arg => arg.startsWith('--username='));
    
    if (argUserName) {
        const userNameFromCLI = argUserName.split('=')[1];
        const formattedUserName = userNameFromCLI.split('_').join(' ').trim();
    
        if (formattedUserName.length > 0) {
        console.log(`Welcome to the File Manager, ${formattedUserName}!`);
        } else {
        console.log("Invalid input");
        }
    } else {
        console.log("Invalid input");
    }
}

greetings();