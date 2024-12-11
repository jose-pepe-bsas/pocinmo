/*
 * Storage for agreement
 * implements: sqlite3 adapter
 * extends: <storage>
 *
 * */

import sqlite3 from "sqlite3";
import fs from "fs";

class StorageSQLI {
    constructor() {
        this.db = null;
        //TODO:Load this from config
        this.tables ={
          proposal:"proposal"
    }
    }

    prepare(dbFilePath, startSQL) {
        this.dbFilePath = dbFilePath;
        this.connect();

        //        this.executeSQLFromFile(startSQL); FIX: Commentaries broking up execution
        return this;
    }

    createTables(db) {
        db.exec(`
CREATE TABLE IF NOT EXISTS  ${this.tables.proposal} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    documents TEXT NOT NULL,
    offerent_id BIGINT  NOT NULL,
    demand_id BIGINT NOT NULL,
    proposed_validity_days INT NOT NULL,
    currency VARCHAR(10) NOT NULL,
    offering TEXT NOT NULL
);

`);
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbFilePath, (err) => {
                if (err) {
                    console.log("Getting funny error " + err);
                    reject(err);
                }
                this.createTables(this.db);
                resolve();
            });
        });
    }


  //TODO: Abstract this.
    async addRecord(record) {

const query = `
INSERT INTO proposal (
  documents,
  offerent_id,
  demand_id,
  proposed_validity_days,
  currency,
  offering
) VALUES (?, ?, ?, ?, ?, ?);
`;

const values = [
  record.documents,
  record.offerentID,
  record.demandID,
  record.proposed_validity_days,
  record.currency,
  record.offering,
];


            return new Promise((resolve, reject) => {
this.db.run(query, values, function (err) {
  if (err) {
    console.error('Error adding record:', err);
                    reject(err);
  }
                  console.log('Record added:', {
                        id: this.lastID
                    });
                    resolve({
                        id: this.lastID
                    });

});


        });
    }

    async saveProposal(proposal) {
        this.addRecord(proposal);
        const proposalResume =  await this.getRecords("proposal");
        return proposalResume

    }

    async getRecords(tableName, conditions = {}) {
        return new Promise((resolve, reject) => {
            const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
            const query = `SELECT * FROM ${tableName}${whereClause ? ` WHERE ${whereClause}` : ''}`;
            const values = Object.values(conditions);

            this.db.all(query, values, (err, rows) => {
                if (err) {
                    console.error('Error while getting records:', err);
                    reject(err);
                } else {
                    console.log('Records:', rows);
                    resolve(rows);
                }
            });
        });
    }


    executeSQLFromFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, sql) => {
                if (err) {
                    console.error('Error reading SQL file:', err);
                    reject(err);
                } else {
                    this.db.exec(sql, (err) => {
                        if (err) {
                            console.error('Error executing SQL from file:', err);
                            reject(err);
                        } else {
                            console.log(`Executed SQL from file: ${filePath}`);
                            resolve();
                        }
                    });
                }
            });
        });
    }

    
}

export {
    StorageSQLI
}
