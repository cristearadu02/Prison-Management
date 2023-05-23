// ----> ROUTING <----

// - FOR HTTP
const http = require('http');

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3005;


// - FOR MYSQL
const mysql = require('mysql');


// - FOR FILE SYSTEM and PATH
const fs = require('fs');
const path = require('path');

var loggedUser;

  const server = http.createServer((request, response) => {
    const { method, url } = request;
  
    if (method === 'GET') {
      if (url === '/') {
        const indexPath = path.join(__dirname, 'Project_Web', 'html', 'Index.html');
        response.setHeader('Content-type', 'text/html');
        response.statusCode = 200;
        response.end(fs.readFileSync(indexPath, 'utf8'));
      } else if (url === '/login.html') {
        // Andrei vezi tu ce faci aici
        loggedUser = 1;
        const loginPath = path.join(__dirname, 'Project_Web', 'html', 'login.html');
        response.setHeader('Content-type', 'text/html');
        response.statusCode = 200;
        response.end(fs.readFileSync(loginPath, 'utf8'));
      } else if (url === '/register.html') {
        // Si aici tot tu Andrei
        const registerPath = path.join(__dirname, 'Project_Web', 'html', 'register.html');
        response.setHeader('Content-type', 'text/html');
        response.statusCode = 200;
        response.end(fs.readFileSync(registerPath, 'utf8'));  
      } else if (url === '/Programare.html') {
        // Aici Robert
        const registerPath = path.join(__dirname, 'Project_Web', 'html', 'Programare.html');
        response.setHeader('Content-type', 'text/html');
        response.statusCode = 200;
        response.end(fs.readFileSync(registerPath, 'utf8'));
      }else if (url === '/user-profile.html') {
        // Aici Radu
        const registerPath = path.join(__dirname, 'Project_Web', 'html', 'user-profile.html');
        response.setHeader('Content-type', 'text/html');
        response.statusCode = 200;
        response.end(fs.readFileSync(registerPath, 'utf8'));
      }else if (url.match(/\.css$/)) {
        const cssPath = path.join(__dirname, 'Project_Web', url);
        const fileStream = fs.createReadStream(cssPath, 'UTF-8');
        response.writeHead(200, { 'Content-Type': 'text/css' });
        fileStream.pipe(response);
      }else if (url.match(/\.js$/)) {
        // Handle JavaScript files
        const jsPath = path.join(__dirname, 'Project_Web', url);
        const fileStream = fs.createReadStream(jsPath, 'UTF-8');
        response.writeHead(200, { 'Content-Type': 'text/javascript' });
        fileStream.pipe(response);
      } else if (url.match(/\.(jpg|jpeg|png|gif)$/)) {
        const imagePath = path.join(__dirname, 'Project_Web', url);
        const imageStream = fs.createReadStream(imagePath);
        response.writeHead(200, { 'Content-Type': `image/${path.extname(url).slice(1)}` });
        imageStream.pipe(response);
      } 
      else {
        // Handle page redirects
        const redirectPath = path.join(__dirname, 'Project_Web', 'html', url);
        console.log(redirectPath);
        if (fs.existsSync(redirectPath)) {
          const fileContent = fs.readFileSync(redirectPath, 'utf8');
          response.setHeader('Content-type', 'text/html');
          response.statusCode = 200;
          response.end(fileContent);
        } else {
          response.statusCode = 404;
          response.end('404 Not Found');
        }
    }
  } else {
      response.statusCode = 405;
      response.end('Method Not Allowed');
    }
  });

server.listen(port, host, () => { 
    console.log(`Server running at http://${host}:${port}/`);
});

