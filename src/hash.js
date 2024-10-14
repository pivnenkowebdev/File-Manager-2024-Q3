import { createHmac } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const hashing = async (pathFile) => {

    if (!pathFile) {
        console.error('Invalid Input');
        return;
    }

    const pathToFile = path.resolve(pathFile);

    if (!fs.existsSync(pathToFile)) {
        console.error('Invalid Input');
        return;
    }

    const key = 'yaustal';
    const hash = createHmac('sha256', key);

    try {
        return new Promise((resolve, reject) => {
            const fileStream = fs.createReadStream(pathToFile);

            fileStream.on('data', (chunk) => {
                hash.update(chunk);
            });

            fileStream.on('end', () => {
                const digest = hash.digest('hex');
                console.log(digest);
                resolve(digest);
            });

            fileStream.on('error', (error) => {
                console.error('Operation Failed', error);
                reject(error);
            });
        });
    } catch (error) {
        console.error('Operation Failed');
    }
};

export default hashing;
