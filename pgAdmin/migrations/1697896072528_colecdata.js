/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE colecdata (
        CollectionID UUID PRIMARY KEY DEFAULT NULL,
        CRMID TEXT,
        CRM_TC_USER TEXT,
        CRM_TC_REMARKS TEXT,
        LoanCardAccountNo TEXT,
        CustomerName TEXT,
        BucketCycle TEXT,
        PrincipalOutstanding TEXT,
        EMI TEXT,
        EMIDate TEXT,
        TotalDue TEXT,
        NoofEMI TEXT,
        MobileNo TEXT,
        CustArea TEXT,
        PickupAddress1 TEXT,
        PickupAddress2 TEXT,
        PickupAddress3 TEXT,
        Pincode TEXT,
        CPUDate TEXT,
        DataType TEXT,
        DataPriority TEXT,
        Portfolio TEXT,
        Product TEXT,
        Region TEXT,
        City TEXT,
        State TEXT,
        UploadDate TEXT,
        UploadUser TEXT,
        AgencyID TEXT,
        AgencyAllocationDate TEXT,
        AgencyAllocationUser TEXT,
        FEAllocationDate TEXT,
        FEAllocationUser TEXT,
        FE_CODE TEXT,
        FE_STATUS TEXT,
        FE_DISPOSITION1 TEXT,
        FE_DISPOSITION2 TEXT,
        FE_REMARKS TEXT,
        FOLLOWUP_TIME TEXT,
        FE_TYPE TEXT,
        FE_DATE TEXT,
        FE_USER TEXT,
        Ranking TEXT,
        PaymentMode TEXT,
        PaymentAmount TEXT,
        TransactionID TEXT,
        PaymentDate TEXT,
        ChequeType TEXT,
        ChequeNo TEXT,
        ChequeDate TEXT,
        ChequeBank TEXT,
        TCFeedback TEXT,
        ContactStatus TEXT,
        ContactPersonName TEXT,
        ContactPersonNo TEXT,
        RelativeName TEXT,
        RelationshipStatus TEXT,
        NewAddress TEXT,
        AlternateNo TEXT,
        Landmark TEXT,
        Occupation TEXT,
        LatLong TEXT,
        LLLocation TEXT,
        GPSMatchStatus TEXT,
        SignatureImage TEXT,
        CollectionAttemptsID TEXT,
        NoOfAttempt TEXT,
        ClientName TEXT,
        Priority TEXT
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE IF EXISTS colecdata;
  `);
};
