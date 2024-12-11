// *POC* envio de documentacion SIN SFTP
import { ProposalDTO } from "./src/agreement/proposal.dto.js";
import { RentOfferingDTO, ServiceOfferingDTO } from "./src/agreement/absoffering.dto.js";
import { Agreement } from "./src/agreement/agreement.js";

import express from 'express';
import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.urlencoded({ extended: true }));
const agreement_path = "/chat/2/proposal/3";
const documentsPath = __dirname+"/uploads"

 

const upload = multer({ dest: "uploads/" });

app.get(agreement_path,  (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get("/",  (req, res) => {
    res.send("Hola! hace un post a "+agreement_path);
});

//CASE: proponer un contrato
app.post(agreement_path, upload.array('files', 10), async function (req, res) {
if (!fs.existsSync(documentsPath)) {
  fs.mkdirSync(documentsPath);
}
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
