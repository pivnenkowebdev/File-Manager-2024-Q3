import { chdir, cwd } from 'node:process';
import fs from 'node:fs/promises';
import path from 'node:path';

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
    } catch (error) {
        console.error('Invalid input\n');
    }
}

const showInfoDir = async() => {
    const currentDir = cwd();

    try {
        const files = await fs.readdir(currentDir);
        
        const fileStats = await Promise.all(
            files.map(async (file) => {
                const filePath = `${currentDir}/${file}`;
                const stats = await fs.stat(filePath);
                return {
                    Name: file,
                    Type: stats.isDirectory() ? 'directory' : 'file',
                };
            })
        );

        fileStats.sort((a, b) => {
            if (a.Type === 'directory' && b.Type === 'file') {
                return -1;
            }
            if (a.Type === 'file' && b.Type === 'directory') {
                return 1;
            }
            return a.Name.localeCompare(b.Name);
        });

        console.table(fileStats);
    } catch (err) {
        console.error("Invalide Input");
    } 
}

export { changeUpDir, changeDir, showInfoDir} ;
