const parser = require("./parser/parse");
const dataset = [];

module.exports.fetch = async (version = "master", options = { force: false, all: false }) => {
    if (!dataset.find(x => x.version === version) || !!force) {
        const data = await parser.fetchFiles(version);
        const content = {
            version: version,
            data: data
        };

        // remove existing
        dataset.filter(x => x.version !== version);

        // update data
        dataset.push(content);
    }

    return options.all ? dataset : dataset.find(x => x.version === version);
};

module.exports.find = async (content, version) => {
    if (!content || typeof content !== "string") throw new Error("Invalid content query");
    if (!version || typeof version !== "string") throw new Error("Invalid version");
    if (content.includes(" ")) throw new Error("Content query may not include space");
    const data = await this.fetch(version);
    const parsed = data.data.find(x => x.name === content.toLowerCase());
    if (!parsed) return null;
    const contentData = {
        info: parsed,
        content: await parser.parse(parsed.raw)
    };
    return contentData;
};