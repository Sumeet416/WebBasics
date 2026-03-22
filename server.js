const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  // --- ADD COMMENT API ROUTE ---
  if (req.method === 'POST' && req.url === '/add-comment') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const newComment = JSON.parse(body);
        const commentsFile = path.join(__dirname, 'comment.json');
        
        // 1. Read existing data
        fs.readFile(commentsFile, 'utf8', (err, data) => {
          let comments = [];
          if (!err && data) {
            try { comments = JSON.parse(data); } catch(e) {}
          }
          
          // 2. Append new comment to end of array
          comments.push(newComment);
          
          // 3. Write it back to the physical file
          fs.writeFile(commentsFile, JSON.stringify(comments, null, 2), err => {
            if (err) {
              res.writeHead(500, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({ error: 'Failed to write to file' }));
              return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, comment: newComment }));
          });
        });
      } catch (err) {
        res.writeHead(400);
        res.end("Invalid JSON");
      }
    });
    return;
  }

  // --- SERVE STATIC FILES ---
  // Strip query strings to find the true file path
  let parsedUrl = req.url.split('?')[0];
  let filePath = path.join(__dirname, parsedUrl === '/' ? 'index.html' : parsedUrl);
  let extname = String(path.extname(filePath)).toLowerCase();
  
  // Security precaution
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  let contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('404: File Not Found');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running!`);
  console.log(`Open http://localhost:${PORT} in your web browser`);
  console.log(`Comments will now be physically saved to comment.json`);
});
