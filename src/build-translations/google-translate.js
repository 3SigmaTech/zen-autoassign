
import * as querystring from 'querystring';
import * as https from 'https';
import * as languages from './google-languages.js';
export * as languages from './google-languages.js';

export function translate(text, opts) {
    opts = opts || {};

    var e;
    [opts.from, opts.to].forEach(function (lang) {
        if (lang && !languages.isSupported(lang)) {
            e = new Error();
            e.code = 400;
            e.message = 'The language \'' + lang + '\' is not supported';
        }
    });
    if (e) {
        return new Promise(function (resolve, reject) {
            reject(e);
        });
    }
    
    let from = languages.getCode((opts.from || 'auto'));
    let to = languages.getCode((opts.to || 'en'));

    if (opts.from != from) {
        console.log(`Using code ${from} for ${opts.from} for source language.`);
    }
    if (opts.to != to) {
        console.log(`Using code ${to} for ${opts.to} for destination language.`);
    }
    if (!Array.isArray(text)) {
        text = [text];
    }

    return refreshToken().then((tokendata) => {
        let options = {
            method: 'POST',
            host: 'translation.googleapis.com',
            path: '/language/translate/v2',
            headers: {
                'Authorization': 'Bearer ' + tokendata.access_token
            }
        };
        let post_data = {
            "q": text,
            "target": to,
            "source": from
        };

        return new Promise(function (resolve, reject) {
            const request = https.request(options, (response) => {

                let datastr = '';
                response.on('data', (chunk) => {
                    datastr = datastr + chunk.toString();
                });

                response.on('end', () => {
                    let data = JSON.parse(datastr);
                    if (isSuccess(data)) {
                        resolve(data.data.translations);
                    } else {
                        console.log(`ERROR IN POST: ${post_data}`);
                        reject(data.error);
                    }
                });

            });

            request.on('error', (error) => {
                var e;
                e = new Error();
                if (error.statusCode !== undefined && error.statusCode !== 200) {
                    e.code = 'BAD_REQUEST';
                } else {
                    e.code = 'BAD_NETWORK';
                }
                reject(e);
            });

            request.write(JSON.stringify(post_data));

            request.end();
        });
    });
}

function refreshToken() {
    let postdata = {
        'client_id': '541364961354-tgk907sjcr5n3ln8tqtbiq9t6sl78ps3.apps.googleusercontent.com',
        'client_secret': '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',
        'grant_type': 'refresh_token',
        'redirect_uri': 'https://oauth.pstmn.io/v1/callback',
        'refresh_token': '1//01Tt5lQaiknYnCgYIARAAGAESNwF-L9IrZwLrTkt5uSHk2G92B62SbUwCJW8Sx9LByYdFdUkbv66e_qctn1BPaO55_jjKRZqhvgU'
    };
    var post_data = querystring.stringify(postdata);
    var options = {
        method: 'POST',
        host: 'oauth2.googleapis.com',
        path: '/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            console.log(`${options.host}${options.path} : ${res.statusCode} (${res.statusMessage})`);
            res.setEncoding('utf8');
            let datastr = '';
            res.on('data', (data) => {
                datastr += data;
            });
            res.on('end', () => {
                let data = JSON.parse(datastr);
                if (isSuccess(data)) {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
        req.on('error', (err) => {
            console.log('error: ' + err.message);
            reject(err);
        });
        req.write(post_data);
        req.end();
    });
};


function isSuccess(data) {
    if (data.error != undefined) {
        if (data.error.message != undefined) {
            console.error('Error in Google Helpers: ' + data.error.message);
        } else if (data.error_description != undefined) {
            console.error('Error in Google Helpers: ' + data.error_description + ' ' + data.error);
        } else {
            console.error('Error in Google Helpers: ' + data.error);
        }
        console.error(data.error);
        return false;
    }
    return true;
};