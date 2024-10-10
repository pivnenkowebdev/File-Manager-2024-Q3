import * as readline from 'node:readline/promises';
import process from 'node:process';

const cliInterface = async (status) => {

    const readableOtputStream = readline.createInterface({ 
        input: process.stdin, 
        output: process.stdout 
    });

    const message = status ? 'Enter command: ' : 'Invalid input\nEnter command: ';
    const answer = await readableOtputStream.question(message);

    readableOtputStream.close();
    return answer;
}

export default cliInterface;