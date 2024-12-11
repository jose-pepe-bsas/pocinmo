import toml from "toml";
import fs from "fs";
let meta = toml.parse(fs.readFileSync("src/config/config.toml", 'utf-8'));

class ABS {
    constructor(subname,data) {
        Object.assign(this, data);
        this.validateMandatoryFields(subname);
    }

    validateMandatoryFields(subname) {

        const mandatoryFields = meta[subname].mandatory;

        for (const field of mandatoryFields) {
            if (!this[field] || (Array.isArray(this[field]) && this[field].length === 0)) {
                throw new Error();
            }
        }
    }
}

export {
  ABS
}
