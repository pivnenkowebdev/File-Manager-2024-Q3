import { chdir, cwd } from 'node:process';
import path from 'node:path';

const changeDir = async() => {
    const currentDir = cwd();
    const parentDir = path.resolve(currentDir, '..');

    if (currentDir === parentDir) {
        console.log('Already at the root directory. Cannot move up.');
    } else {
        chdir(parentDir);
    }
}

export default changeDir;