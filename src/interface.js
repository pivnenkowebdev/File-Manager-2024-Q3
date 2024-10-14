import * as readline from 'node:readline/promises';
import process from 'node:process';
import { sayBi } from './init.js';

const cliInterface = async (message, userName) => {
    const readableOtputStream = readline.createInterface({ 
        input: process.stdin, 
        output: process.stdout 
    });

    readableOtputStream.on('SIGINT', () => {
        sayBi(userName);
        readableOtputStream.close(); 
        process.exit();
    });
    
    const answer = await readableOtputStream.question(message);
    
    readableOtputStream.close();
    return answer;
}

export default cliInterface;
