const fs = require("fs");
const path = "./server/db/chat";

module.exports = {
    async load(req, res) {
        try {
            const result = await fs.readFileSync(path + "/chats.json", "UTF-8");
            if (result) {
                res.json(result);
            }
        } catch {
            res.sendStatus(500);
        }
    }
};