import childProcess from 'child_process';
import util from 'util';


export const execPromisify = util.promisify(childProcess.exec);