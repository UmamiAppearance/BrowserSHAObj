import puppeteer from "puppeteer";
import * as http from "http";
import {readFile} from "fs";
import * as path from "path"; 

const port = 9999;
http.createServer(function (request, response) {
    if (request.url === "/") {
        console.log("    + opening html test page");
    } else {
        console.log(`    + importing ${request.url.split("/")[2]}`);
    }

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
console.log(`- spinning up local test server at http://127.0.0.1:${port}/`);


async function main() {
    console.log("- running tests:");
    const browser = await puppeteer.launch();
    await browser.createIncognitoBrowserContext({ dumpio: true });
    
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:9999/");
    console.log("    => running test functions");
    const result = await page.evaluate(async () => 
        await window.makeTests()
    );
    await browser.close();
    console.log("- finished tests\n- shutting down test server");
    console.log("-------\nresults");
    console.log(JSON.stringify(result, null, 4));
    if (result.errors) {
        console.error(`${result.errors} error${ (result.errors > 1) ? "s" : "" } occurred!`);
        return 1;
    }
    console.log("Everything seems to work fine.");
    return 0;
}

await main();
