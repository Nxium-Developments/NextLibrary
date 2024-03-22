#!/usr/bin/env node

const args = process.argv.slice(2);
const user = args[0];
const repo = args[1];
const reg = args[2];

if (args[3]) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

const shouldRun = args[4];
const parameters = args.splice(5);

const resolve = require("path").resolve;
const http = require("http");
const https = require("https");
const fs = require("fs");
const execFile = require("child_process").execFile;

const getReleases = async () => {
  return new Promise((r, e) => {
    https
      .request(
        {
          hostname: `api.github.com`,
          path: `/repos/${user}/${repo}/releases`,
          headers: { "User-Agent": "Mozilla/5.0" },
          method: "GET",
        },
        (res) => {
          res.setEncoding("utf8");
          let body = "";
          res.on("data", (chunk) => {
            body += chunk;
          });
          res.on("end", () => {
            body = JSON.parse(body);
            r(body);
          });
        }
      )
      .end();
  });
};

const downloadRelase = (url, wStream, progress = () => {}) => {
  return new Promise((resolve, reject) => {
    let protocol = /^https:/.exec(url) ? https : http;

    progress(0);

    protocol
      .get(url, (res1) => {
        protocol = /^https:/.exec(res1.headers.location) ? https : http;

        protocol
          .get(res1.headers.location, (res2) => {
            const total = parseInt(res2.headers["content-length"], 10);
            let completed = 0;
            res2.pipe(wStream);
            res2.on("data", (data) => {
              completed += data.length;
              progress(completed / total);
            });
            res2.on("progress", progress);
            res2.on("error", reject);
            res2.on("end", resolve);
          })
          .on("error", reject);
      })
      .on("error", reject);
  });
};

const downloadAndRun = async function (cb) {
  const releases = await getReleases();
  const asset = releases[0].assets.find((a) =>
    new RegExp(reg, "gi").test(a.name)
  );
  const executablePath = resolve("../../release/downloads/", asset.name);
  const url = asset.browser_download_url;

  if (fs.existsSync(executablePath)) {
    cb(executablePath);
  } else {
    console.log("Starting downloading...");
    let progressNow = 0;
    const nextLine = "\033[0G";
    let interval = setInterval(() => {
      process.stdout.write(
        `Downloading ${(progressNow * 100).toFixed(1) + "%"}${nextLine}`
      );
    }, 2000);
    const file = fs.createWriteStream(executablePath);
    file.on("finish", function () {
      file.close(() => cb(executablePath));
      clearInterval(interval);
    });
    downloadRelase(url, file, (progress) => {
      progressNow = progress;
    });
  }
};

downloadAndRun((executablePath) => {
  console.log("The file has been downloaded!", executablePath);

  if (shouldRun) {
    execFile(executablePath, parameters, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
});