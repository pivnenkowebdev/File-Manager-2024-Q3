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

        const directories = [];
        const regularFiles = [];

        await Promise.all(
            files.map(async (file) => {
                const filePath = `${currentDir}/${file}`;
                const stats = await fs.stat(filePath);

                if (stats.isDirectory()) {
                    directories.push({ Name: file, Type: 'directory' });
                } else {
                    regularFiles.push({ Name: file, Type: 'file' });
                }
            })
        );

        directories.sort((a, b) => a.Name.localeCompare(b.Name));
        regularFiles.sort((a, b) => a.Name.localeCompare(b.Name));

        console.table([...directories, ...regularFiles]);
    } catch (err) {
        console.error("Invalid Input");
    }
}

export { changeUpDir, changeDir, showInfoDir} ;
