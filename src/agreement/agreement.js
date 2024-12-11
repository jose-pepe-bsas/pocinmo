import { StorageSQLI } from "./storage.sqli.js";
/*
 * Agreement module
 *
 * Cases: create proposal
 *
 * */


class Agreement{

    
  constructor(storage) {
    this.storage = new StorageSQLI().prepare("src/agreement/agreement.db","src/agreement/Proposal.sql")

  }

  async proposal(proposalDTO){
    let proposalResume = await this.storage.saveProposal(proposalDTO)
    return proposalResume;

  }

}

export {
  Agreement
}
