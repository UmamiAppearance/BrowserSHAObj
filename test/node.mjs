import puppeteer from "puppeteer";
import * as http from "http";
import * as fs from "fs";
import * as path from "path"; 

const port = 9999;
http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './test/test.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(port);
console.log(`Server running at http://127.0.0.1:9999/`);


//const puppeteer = require('puppeteer');

async function main() {
    let output;
    const browser = await puppeteer.launch({ dumpio: true });
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:9999/");
    await page.evaluate(() => console.log(window.tests));
    await browser.close();
    //console.log(output.errors);
}

await main();
