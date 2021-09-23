import puppeteer from "puppeteer";
import * as http from "http";
import {readFile} from "fs";
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
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    readFile(filePath, function(error, content) {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
    });

}).listen(port);
console.log(`Starting local server at http://127.0.0.1:9999/`);


async function main() {
    const browser = await puppeteer.launch();
    await browser.createIncognitoBrowserContext({ dumpio: true });
    
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:9999/");
    const result = await page.evaluate(async () => 
        await window.makeTests()
    );
    await browser.close();
    console.log(result);
    if (result.errors) {
        console.error(`Errors occurred!`);
        return 1;
    }
    console.log("Everything seems to work fine.");
    return 0;
}

await main();
