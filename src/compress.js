import path from 'node:path';
import fs from 'node:fs';
import zlib from 'node:zlib';

const compress = async (origPath, newPath) => {
    if (!origPath || !newPath) {
        console.error('Invalide Input');
        return;
    }

    const pathToFileOrigFile = path.resolve(origPath);
    const pathToGZfile = path.resolve(newPath);

    try {
        const readableStream = fs.createReadStream(pathToFileOrigFile);
        const writableStream = fs.createWriteStream(pathToGZfile);
        const gzStream = zlib.createGzip();

        readableStream.pipe(gzStream).pipe(writableStream);

        writableStream.on('finish', () => {
            console.log('Invalide Input');
        });

        writableStream.on('error', (err) => {
            console.error('Invalide Input', err.message);
        });
        
    } catch (error) {
        console.error('Operation failed:', error.message);
    }
};

export default compress;
