//מגישות: קורל צלח 318609500 וקארין ואנונו 212132898

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath = '';
    let contentType = 'text/html; charset=utf-8';

    if (req.url === '/' || req.url === '/page.html') {
        filePath = path.join(__dirname, 'templates', 'page.html');
    } else if (req.url === '/about' || req.url === '/about.html') {
        filePath = path.join(__dirname, 'templates', 'about.html');
    } else if (req.url === '/contact' || req.url === '/contact.html') {
        filePath = path.join(__dirname, 'templates', 'contact.html');
    } else if (req.url === '/style.css') {
        filePath = path.join(__dirname, 'templates', 'style.css');
        contentType = 'text/css';
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - הדף לא נמצא</h1>');
        return;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('שגיאת שרת פנימית');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});