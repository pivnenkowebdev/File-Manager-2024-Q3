import { chdir, cwd } from 'node:process';
import { promises as fs } from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const changeUpDir = async() => {
    const currentDir = cwd();
    const parentDir = path.resolve(currentDir, '..');

    if (currentDir === parentDir) {
        console.log('Invalid input:\nAlready at the root directory. Cannot move up.\n');
    } else {
        chdir(parentDir);
    }
}

const changeDir = async (pathToDir) => {
    const normalizedPath = path.resolve(cwd(), pathToDir);
    
    try {
        await fs.access(normalizedPath);
        chdir(normalizedPath);
        process.stdout.write(`Changed directory to: ${normalizedPath}\n`);
    } catch (error) {
        console.error('Invalid input\n');
    }
}

export { changeUpDir, changeDir} ;
