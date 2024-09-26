// const express = require("express");
// const https = require("https");

// const app = express();
// const port = 10101;

// app.get("/proxy", (req, res) => {
//     const targetUrl = "http://localtest.apps.lab-okd.cfhlab.studio/auth/admin/master/console/#/foobar/users";

//     const target = new URL(targetUrl);

//     const options = {
//         hostname: target.hostname,
//         port: 443,
//         path: target.pathname + target.search,
//         method: "GET",
//         rejectUnauthorized: false
//     };
//     console.log(`Proxying request to: ${target.hostname}${target.pathname}${target.search}`);
//     const proxy = https.request(options, (_res) => {

//         const mimeTypes = {
//             '.css': 'text/css',
//             '.js': 'application/javascript',
//             '.html': 'text/html',
//         };

//         const extension = target.pathname.substring(target.pathname.lastIndexOf('.'));
//         const contentType = mimeTypes[extension] || _res.headers['content-type'];
//         res.setHeader('Content-Type', contentType);

//         const fieldsToRemove = ["x-frame-options", "content-security-policy"];
//         Object.keys(_res.headers).forEach((field) => {
//             if (!fieldsToRemove.includes(field.toLowerCase())) {
//                 res.setHeader(field, _res.headers[field]);
//             }
//         });

//         _res.pipe(res, {
//             end: true,
//         });
//     });

//     proxy.on("error", (err) => {
//         console.error("Error with proxy request:", err.message);
//         res.status(500).send("Error occurred in proxy request: " + err.message);
//     });

//     req.pipe(proxy, {
//         end: true,
//     });
// });

// app.listen(port, () => {
//     console.log(`Proxy server listening at http://localhost:${port}`);
// });
