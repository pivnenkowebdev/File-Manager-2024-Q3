import { createReadStream } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFileStream = async (relativePath) => {
    const filePath = join(__dirname, relativePath); 

    const stream = createReadStream(filePath, { encoding: 'utf8' });

    stream.on('data', (chunk) => {
        console.log(chunk);
    });

    stream.on('end', () => {
        console.log('File reading completed.');
    });

    stream.on('error', (err) => {
        console.error('Invalid input', err.message);
    });
};

export default readFileStream;
