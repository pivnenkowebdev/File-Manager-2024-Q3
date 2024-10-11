import * as readline from 'node:readline/promises';
import process from 'node:process';
import { currentWorkDirectory } from './init.js';

const cliInterface = async (statusAutorization) => {
    const readableOtputStream = readline.createInterface({ 
        input: process.stdin, 
        output: process.stdout 
    });

    const message = statusAutorization ? 'Enter command: ' : 'Invalid input\nEnter command: ';
    const answer = await readableOtputStream.question(message);
    currentWorkDirectory();

    // хуйня не робит
    // process.on('SIGINT', async () => {
    //     process.stdout.write(`Прощай нахуй\n`);
    //     process.exit(0);
    // });

    readableOtputStream.close();
    return answer;
}

export default cliInterface;

