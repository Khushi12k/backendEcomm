// import data from "./data.js";
// import http from "http";

// const server = http.createServer((req, res) => {
//   //GET API
//   if (req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(data));
//   }
//   //POST API
//   else if (req.method === "POST") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });
//     req.on("end", () => {
//       const newData = JSON.parse(body);
//       data.push(newData);
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(data));
//     });
//     //PUT API
//   } else if (req.method === "PUT") {
//     const idToEdit = parseInt(req.url.split("/")[1]);
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
   
//     });
//     req.on("end", () => {
//       const updateData= data.map((obj) => (obj.id === idToEdit ? JSON.parse(body) : obj));

//      res.writeHead(200, { "Content-type": "application/json" });
//      res.end(JSON.stringify(updateData));
// })
//   }
//   else if (req.method === 'DELETE') {
//         const idToDelete = Number(req.url.split('/')[1]);
//         const filteredData = data.filter((obj) => obj.id !== idToDelete);
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(filteredData));
//     }
// });

// server.listen(3000, () => console.log("server started on port 3000"));