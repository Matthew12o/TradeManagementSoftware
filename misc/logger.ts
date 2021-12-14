import fs from 'fs';
import url from 'url';

class ApplicationLogger {
    filepath: string;

    constructor() {
        this.filepath = './misc/log.json';

    }

    writeToLog(log: Log) {
        const origin = url.format({
            protocol: log.origin.protocol,
            host: log.origin.get('host'),
            pathname: log.origin.originalUrl
        });
        const data = {
            origin : origin,
            message : log.message
        };
        fs.writeFile (this.filepath, JSON.stringify(data), function(err) {
            if (err) throw err;
            console.log('complete');
            }
        );
    };

};

class Log {
    origin: any;
    message: any;

    constructor(req: any, log: any) {
        this.origin = req
        this.message = log
    }
};

export { Log, ApplicationLogger };