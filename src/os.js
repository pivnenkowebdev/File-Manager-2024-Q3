import { EOL } from 'os';

const showEndLine = async(flag) => {

    if (!flag || flag !== '--EOL') {
        console.error('Invalide Input');
        return;
    }

    const lineEnd = EOL;
    console.log(`${lineEnd}`);
}

export {
    showEndLine
};