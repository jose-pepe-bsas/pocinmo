// *POC* envio de documentacion SIN SFTP
import { ProposalDTO } from "./src/agreement/proposal.dto.js";
import { RentOfferingDTO, ServiceOfferingDTO } from "./src/agreement/absoffering.dto.js";
import { Agreement } from "./src/agreement/agreement.js";

import express from 'express';
import multer from 'multer';


const app = express();
app.use(express.urlencoded({ extended: true }));
const path = "/chat/2/proposal/3";

const upload = multer({ dest: "uploads/" });

app.get(path,  (req, res) => {
    res.send("Hola! hace un post");
});

app.get("/",  (req, res) => {
    res.send("Hola! hace un post a "+path);
});

//CASE: proponer un contrato
app.post(path, upload.array('files', 10), async function (req, res) {
  let proposalDTO = new ProposalDTO({
    documents : req.files,
    offerentID : req.body.offerentID,
    demandID: req.body.demandID,
    proposed_validity_days: req.body.proposed_validity_days,
    currency: req.body.currency,
    offering : req.body.offering
  })
    let resp = await new Agreement().proposal(proposalDTO)
    res.send(resp);
});

app.listen(8001, () => console.log("sirviendo en http://localhost:8001"));
