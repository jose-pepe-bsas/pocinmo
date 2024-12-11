import {
    ABS
} from '../config/abs.js'


class ProposalDTO extends ABS {

    constructor(data) {

        try {
            super("ProposalDTO",data)
        } catch (error) {
            throw error;
        }
        Object.assign(this, arguments);
        this.documents = this.documents.map(doc => doc.path).toString();


    }



}


export {
    ProposalDTO,
}
