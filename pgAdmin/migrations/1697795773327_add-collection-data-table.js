/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
    CREATE TABLE IF NOT EXISTS CollectionData (
        CollectionID UUID PRIMARY KEY,
        LoanCardAccountNo INTEGER,
        CustomerName TEXT,
        PrincipalOutstanding NUMERIC,
        EMIDate DATE,
        TotalDue NUMERIC,
        NoofEMI INTEGER,
        MobileNo TEXT,
        CustArea TEXT,
        PickupAddress1 TEXT,
        Pincode INTEGER,
        DataPriority INTEGER,
        Portfolio TEXT,
        Product TEXT,
        Region TEXT,
        City TEXT,
        State TEXT,
        UploadDate TIME,
        UploadUser TEXT,
        AgencyID TEXT,
        AgencyAllocationUser TEXT,
        FE_CODE TEXT
    )
  `);
};

exports.down = pgm => {};
