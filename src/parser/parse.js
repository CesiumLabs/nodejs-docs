const fetch = require("node-fetch");
const DOCS_FOLDER = "doc";

module.exports = {
    fetchFiles,
    parse
};

function fetchFiles(version) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/repos/nodejs/node/contents/${DOCS_FOLDER}/api?ref=${version}`, {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
            .then(res => res.json())
            .then(json => {
                if (!json.length) return reject(new Error("No files found!"));
                const arr = [];
                json.forEach(file => {
                    if (file.type !== "file" || ["documentation", "embedding", "policy"].includes(file.name.replace(".md", ""))) return;
                    arr.push({
                        name: file.name.replace(".md", ""),
                        size: file.size,
                        url: `https://nodejs.org/dist/latest-${file.url.split("ref=")[1].replace("master", "v12.x")}/docs/api/${file.name.replace(".md", "")}.html`,
                        github: file.html_url,
                        raw: file.download_url,
                        path: file.path,
                        version: file.url.split("ref=")[1].replace("master", "v12.x")
                    });
                });
                resolve(arr);
            })
            .catch(e => {
                reject(new Error("Error parsing dcos: " + e));
            });
    });
}

function parse(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.text())
            .then(data => resolve(data))
            .catch(e => {
                reject(new Error("Couldn't parse files: " + e));
            });
    });
}