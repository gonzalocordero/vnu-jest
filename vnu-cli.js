const exec = require ( 'child_process' ).exec;
const vnu = require ( 'vnu-jar' );
const fs = require('fs');

function constructHTML (template) {
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>H</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${template}</body></html>`;
    
    return html;
}

function validateHTML(HTML) {
    const html = constructHTML(HTML);

    // removing previous validate file
    fs.existsSync('validate.html', (exists) => {
        if (exists) {
            fs.unlinkSync('validate.html', (error) => {
                throw error;
            });
        }
    });

    fs.writeFileSync("validate.html", html, (err) => {
        if(err) {
            throw (err);
        }
    });


    return new Promise((resolve, reject) => {
        exec (`java -jar ${vnu} validate.html`, ( error, results ) => {
            if (error) {
                resolve({error : error.message})
            } else {
                resolve({result : "no violations"})
            }
        });
    });
}


const toContainCorrectMarkUp = {
    toContainCorrectMarkUp(results) {
        if (results.error) {
            const message = results.error.substr(results.error.lastIndexOf('error: '));
            return {
                message: () =>
                message,
                pass: false,
            };        
        } else {
            return {
                message: () =>
                results.result,
                pass: true,
            };        
        }
    },
}

module.exports = {
    toContainCorrectMarkUp,
    validateHTML
}
