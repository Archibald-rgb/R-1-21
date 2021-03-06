const fs = require('fs');
const path = './server/db/messages';

module.exports = {
    async load(req, res) {
        try {
            const result = await fs.readFileSync(`${path}/messages${req}.json`, 'utf-8');
            if (result) {
                res.json(result);
            }
        }
        catch {
            res.sendStatus('503');
        }
    }
}