import fs from 'node:fs/promises';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async (oldFileName, newFileName) => {
    if (!oldFileName) {
        console.error('Operation failed');
        return; 
    }

    const pathToFile = join(__dirname, oldFileName);
    const directoryPath = dirname(pathToFile);
    const fileExtension = extname(pathToFile);
    const newNameWithExtension = newFileName ? newFileName + fileExtension : oldFileName + fileExtension;
    const pathToNewFile = join(directoryPath, newNameWithExtension);

    try {
        await fs.access(pathToFile);
        await fs.rename(pathToFile, pathToNewFile);
        console.log(`File renamed from "${oldFileName}" to "${newNameWithExtension}" successfully.`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Operation failed: File not found.');
        } else {
            console.error('Operation failed: ', error.message);
        }
    }
};

export default rename;
