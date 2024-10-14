import fs from 'node:fs';
import path from 'node:path';

const moveFile = async (pathToFile, pathToNewDirectory) => {
    const fullPathToFile = path.resolve(pathToFile);
    const fullPathToNewDir = path.resolve(pathToNewDirectory);
    const fileName = path.basename(fullPathToFile);
    const newFilePath = path.join(fullPathToNewDir, fileName);

    try {
        await fs.promises.access(fullPathToFile);
    } catch (error) {
        console.error('Source file does not exist.');
        return;
    }

    try {
        await fs.promises.access(fullPathToNewDir);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.promises.mkdir(fullPathToNewDir, { recursive: true });
        } else {
            console.error('Invalid input', error.message);
            return;
        }
    }

    const readStream = fs.createReadStream(fullPathToFile);
    const writeStream = fs.createWriteStream(newFilePath);

    readStream.pipe(writeStream);

    writeStream.on('finish', async () => {
        try {
            await fs.promises.unlink(fullPathToFile);
        } catch (error) {
            console.error('Invalid input', error.message);
        }
    });

    writeStream.on('error', (error) => {
        console.error('Operation Filed', error.message);
    });

    readStream.on('error', (error) => {
        console.error('Operation Filed', error.message);
    });
};

export default moveFile;
