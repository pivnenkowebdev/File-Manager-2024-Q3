import os from 'node:os';

const showEndLine = async() => {
    const lineEnd = EOL;
    console.log(`${lineEnd}`);
}

const printHomeDirectory = async() => {
    const homeDir = os.homedir();
    console.log(homeDir);
};

const printCurrentUserName = async() => {
    const userInfo = os.userInfo();
    const currentUserName = userInfo.username;
    console.log(`Current system user name: ${currentUserName}`);
};

const printCpuArchitecture = async() => {
    const cpuArchitecture = process.arch;
    console.log(`CPU Architecture: ${cpuArchitecture}`);
};

const chooceFunc = async(mainFlag) => {

    switch (mainFlag) {
        case '--EOL':
            await showEndLine();
            break;

        case '--homedir':
            await printHomeDirectory();
            break;

        case '--username':
            await printCurrentUserName();
            break;

        case '--architecture':
            await printCpuArchitecture();
            break;
    
        default:
            return
            break;
    }

}

export default chooceFunc;