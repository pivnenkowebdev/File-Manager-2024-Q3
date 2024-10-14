import fs from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async (fileName) => {

    const pathToFile = join(__dirname, fileName);

    try {
        await fs.writeFile(pathToFile, '', {flag: 'wx'});
    } catch (error) {
        if (error.code === 'EEXIST') {
            console.error('Operation failed');
        } else {
            console.error('Operation failed');
        }
    }
};

export default create;