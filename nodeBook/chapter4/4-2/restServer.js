const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const users = {};

http
  .createServer(async (req, res) => {
    try {
      console.log(req.method, req.url);

      if (req.method == "GET") {
        if (req.url == "/") {
          const data = await fs.readFile(
            path.join(__dirname, "restFront.html")
          );
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url == "/about") {
          const data = await fs.readFile(path.join(__dirname, "about.html"));
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url == "/users") {
          const data = await fs.readFile(path.join(__dirname, "about.html"));
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(JSON.stringify(users));
        }

        try {
          const data = await fs.readFile(path.join(__dirname, req.url));
          return res.end(data);
        } catch (error) {}
      } else if (req.method === "POST") {
        if (req.url === "/user") {
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("POST 본문(Body):", body);
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;

            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end("등록성공");
          });
        }
      } else if (req.method === "PUT") {
        //p182
      } else if (req.method === "DELETE") {
        //
      }
      res.writeHead(404);
      return res.end("NOT FOUND");
    } catch (error) {
      console.error(error);
      res.writeHead(500);
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end(error);
    }
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기중");
  });
