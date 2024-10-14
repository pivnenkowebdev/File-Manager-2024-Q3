import fs from 'node:fs/promises';
import path from 'node:path';

const remove = async (pathToDeleteFile) => {
    const pathToFile = path.resolve(pathToDeleteFile);
    try {
        await fs.access(pathToFile);
        await fs.unlink(pathToFile);
    } catch (error) {
        console.error(`Operation Failed`);
        if (error.code === 'ENOENT') {
            console.error('Invalid input');
        } else {
            console.error(`Operation Failed`);
        }
    }
};

export default remove;
