import fs from 'node:fs';
import path from 'node:path';

const copyWithStreams = async (pathToOldFile, pathToNewDirectory) => {
    if (!pathToOldFile || !pathToNewDirectory) {
        console.error('Invalide Input');
        return;
    }
    
    const fullPathToOriginFilesDir = path.resolve(pathToOldFile);
    const fullPathToCopyFilesDir = path.resolve(pathToNewDirectory);

    try {
        await fs.promises.access(fullPathToOriginFilesDir);
        const originContent = await fs.promises.readdir(fullPathToOriginFilesDir);
        try {
            await fs.promises.access(fullPathToCopyFilesDir);
            throw new Error();
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.promises.mkdir(fullPathToCopyFilesDir);
                for (const file of originContent) {
                    const srcFilePath = path.join(fullPathToOriginFilesDir, file);
                    const newSrcFilePath = path.join(fullPathToCopyFilesDir, file);

                    const readStream = fs.createReadStream(srcFilePath);
                    const writeStream = fs.createWriteStream(newSrcFilePath);
                    readStream.pipe(writeStream);
                }
            } else {
                console.error('Operation Failed');
            }
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Operation Failed');
        }
    }
};

export default copyWithStreams;
