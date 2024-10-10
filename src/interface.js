import * as readline from 'node:readline/promises';
import process from 'node:process';

const cliInterface = async () => {
    const readableOtputStream = readline.createInterface({ 
        input: process.stdin, 
        output: process.stdout 
    });
    
    const answer = await readableOtputStream.question('Enter command');
    readableOtputStream.close();
    return answer;
}

export default cliInterface;