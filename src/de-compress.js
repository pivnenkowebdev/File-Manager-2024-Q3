import path from 'node:path';
import fs from 'node:fs';
import zlib from 'node:zlib';

const decompress = async (pathToZip, newDir) => {
    if (!pathToZip || !newDir) {
        console.error('Invalid Input');
        return;
    }

    const pathToGZfile = path.resolve(pathToZip);
    const pathToUnCompressedFile = path.resolve(newDir, path.basename(pathToZip, '.gz'));

    try {
        if (!fs.existsSync(pathToGZfile)) {
            console.error('File does not exist:', pathToGZfile);
            return;
        }

        const readableStream = fs.createReadStream(pathToGZfile);
        const writableStream = fs.createWriteStream(pathToUnCompressedFile);
        const gzUnPack = zlib.createGunzip();

        readableStream.pipe(gzUnPack).pipe(writableStream);

        writableStream.on('finish', () => {
            console.log('Decompression successful!');
        });

        readableStream.on('error', (err) => {
            console.error('Error reading the zip file:', err.message);
        });

        writableStream.on('error', (err) => {
            console.error('Error writing the uncompressed file:', err.message);
        });

        gzUnPack.on('error', (err) => {
            console.error('Error during decompression:', err.message);
        });

    } catch (error) {
        console.error('Operation failed:', error.message);
    }
};

export default decompress;
