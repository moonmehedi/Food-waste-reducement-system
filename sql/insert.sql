-- Insert statements for MANAGER table
INSERT INTO MANAGER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'manager1@example.com',
    'manager1pass',
    'John Doe',
    TO_DATE('1980-05-15', 'YYYY-MM-DD'),
    'City A',
    'District 1',
    'Division X',
    '123',
    '1234567890'
);

INSERT INTO MANAGER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'manager2@example.com',
    'manager2pass',
    'Jane Smith',
    TO_DATE('1975-08-20', 'YYYY-MM-DD'),
    'City B',
    'District 2',
    'Division Y',
    '456',
    '9876543210'
);

-- Insert statements for VOLUNTEER table
INSERT INTO VOLUNTEER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'volunteer1@example.com',
    'volunteer1pass',
    'Michael Johnson',
    TO_DATE('1990-03-25', 'YYYY-MM-DD'),
    'City A',
    'District 1',
    'Division X',
    '321',
    '1112223333'
);

INSERT INTO VOLUNTEER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'volunteer2@example.com',
    'volunteer2pass',
    'Sarah Lee',
    TO_DATE('1985-12-10', 'YYYY-MM-DD'),
    'City A',
    'District 2',
    'Division Y',
    '654',
    '4445556666'
);

INSERT INTO VOLUNTEER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'volunteer3@example.com',
    'volunteer3pass',
    'David Brown',
    TO_DATE('1993-07-18', 'YYYY-MM-DD'),
    'City B',
    'District 1',
    'Division Z',
    '987',
    '7778889999'
);

INSERT INTO VOLUNTEER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'volunteer4@example.com',
    'volunteer4pass',
    'Emily White',
    TO_DATE('1988-09-05', 'YYYY-MM-DD'),
    'City C',
    'District 3',
    'Division W',
    '741',
    '1234567890'
);

INSERT INTO VOLUNTEER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'volunteer5@example.com',
    'volunteer5pass',
    'Jessica Green',
    TO_DATE('1991-11-30', 'YYYY-MM-DD'),
    'City D',
    'District 2',
    'Division X',
    '852',
    '9876543210'
);

INSERT INTO VOLUNTEER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'volunteer6@example.com',
    'volunteer6pass',
    'Andrew Wilson',
    TO_DATE('1987-04-12', 'YYYY-MM-DD'),
    'City E',
    'District 4',
    'Division Y',
    '963',
    '5554443333'
);

INSERT INTO VOLUNTEER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'volunteer7@example.com',
    'volunteer7pass',
    'Olivia Taylor',
    TO_DATE('1995-02-08', 'YYYY-MM-DD'),
    'City F',
    'District 3',
    'Division Z',
    '159',
    '2223334444'
);

INSERT INTO VOLUNTEER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'volunteer8@example.com',
    'volunteer8pass',
    'Daniel Martinez',
    TO_DATE('1989-06-27', 'YYYY-MM-DD'),
    'City G',
    'District 2',
    'Division W',
    '357',
    '9998887777'
);

INSERT INTO VOLUNTEER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'volunteer9@example.com',
    'volunteer9pass',
    'Sophia Garcia',
    TO_DATE('1994-10-14', 'YYYY-MM-DD'),
    'City H',
    'District 1',
    'Division X',
    '258',
    '6667778888'
);

INSERT INTO VOLUNTEER (
    EMAIL,
    PASSWORD,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    'volunteer10@example.com',
    'volunteer10pass',
    'James Robinson',
    TO_DATE('1986-12-03', 'YYYY-MM-DD'),
    'City I',
    'District 4',
    'Division Y',
    '456',
    '1112223333'
);


INSERT INTO ASSIGN (MANAGER_ID, VOLUNTEER_ID, TASK)
VALUES (1, 1, 'Task 1');

INSERT INTO ASSIGN (MANAGER_ID, VOLUNTEER_ID, TASK)
VALUES (1, 2, 'Task 2');

INSERT INTO ASSIGN (MANAGER_ID, VOLUNTEER_ID, TASK)
VALUES (1, 3, 'Task 3');

INSERT INTO ASSIGN (MANAGER_ID, VOLUNTEER_ID, TASK)
VALUES (2, 4, 'Task 4');

INSERT INTO ASSIGN (MANAGER_ID, VOLUNTEER_ID, TASK)
VALUES (2, 5, 'Task 5');

INSERT INTO ASSIGN (MANAGER_ID, VOLUNTEER_ID, TASK)
VALUES (2, 6, 'Task 6');

INSERT INTO ASSIGN (MANAGER_ID, VOLUNTEER_ID, TASK)
VALUES (2, 7, 'Task 7');

INSERT INTO DONOR (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    VERIFIED,
    POINTS,
    VOLUNTEER_ID,
    DATE_D
) VALUES (
    'donor1@example.com',
    'password1',
    'Institution One',
    'Type1',
    'City1',
    'District1',
    'Division1',
    'Street1',
    '111-111-1111',
    'Y',
    10,
    1,
    SYSDATE
);

INSERT INTO DONOR (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    VERIFIED,
    POINTS,
    VOLUNTEER_ID,
    DATE_D
) VALUES (
    'donor2@example.com',
    'password2',
    'Institution Two',
    'Type2',
    'City2',
    'District2',
    'Division2',
    'Street2',
    '222-222-2222',
    'N',
    20,
    2,
    SYSDATE
);

INSERT INTO DONOR (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    VERIFIED,
    POINTS,
    VOLUNTEER_ID,
    DATE_D
) VALUES (
    'donor3@example.com',
    'password3',
    'Institution Three',
    'Type3',
    'City3',
    'District3',
    'Division3',
    'Street3',
    '333-333-3333',
    'Y',
    30,
    1,
    SYSDATE
);

INSERT INTO DONOR (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    VERIFIED,
    POINTS,
    VOLUNTEER_ID,
    DATE_D
) VALUES (
    'donor4@example.com',
    'password4',
    'Institution Four',
    'Type4',
    'City4',
    'District4',
    'Division4',
    'Street4',
    '444-444-4444',
    'N',
    40,
    2,
    SYSDATE
);

INSERT INTO DONOR (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    VERIFIED,
    POINTS,
    VOLUNTEER_ID,
    DATE_D
) VALUES (
    'donor5@example.com',
    'password5',
    'Institution Five',
    'Type5',
    'City5',
    'District5',
    'Division5',
    'Street5',
    '555-555-5555',
    'Y',
    50,
    1,
    SYSDATE
);

INSERT INTO DONOR (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    VERIFIED,
    POINTS,
    VOLUNTEER_ID,
    DATE_D
) VALUES (
    'donor6@example.com',
    'password6',
    'Institution Six',
    'Type6',
    'City6',
    'District6',
    'Division6',
    'Street6',
    '666-666-6666',
    'N',
    60,
    2,
    SYSDATE
);

INSERT INTO DONOR (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    VERIFIED,
    POINTS,
    VOLUNTEER_ID,
    DATE_D
) VALUES (
    'donor7@example.com',
    'password7',
    'Institution Seven',
    'Type7',
    'City7',
    'District7',
    'Division7',
    'Street7',
    '777-777-7777',
    'Y',
    70,
    1,
    SYSDATE
);

INSERT INTO DONOR (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    VERIFIED,
    POINTS,
    VOLUNTEER_ID,
    DATE_D
) VALUES (
    'donor8@example.com',
    'password8',
    'Institution Eight',
    'Type8',
    'City8',
    'District8',
    'Division8',
    'Street8',
    '888-888-8888',
    'N',
    80,
    2,
    SYSDATE
);

INSERT INTO DONOR (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    VERIFIED,
    POINTS,
    VOLUNTEER_ID,
    DATE_D
) VALUES (
    'donor9@example.com',
    'password9',
    'Institution Nine',
    'Type9',
    'City9',
    'District9',
    'Division9',
    'Street9',
    '999-999-9999',
    'Y',
    90,
    1,
    SYSDATE
);

INSERT INTO DONOR (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    VERIFIED,
    POINTS,
    VOLUNTEER_ID,
    DATE_D
) VALUES (
    'donor10@example.com',
    'password10',
    'Institution Ten',
    'Type10',
    'City10',
    'District10',
    'Division10',
    'Street10',
    '1010-1010-1010',
    'N',
    100,
    2,
    SYSDATE
);

INSERT INTO FOOD (
    NAME,
    QUANTITY,
    EXP_DATE,
    PHOTO,
    VERIFIED,
    VOLUNTEER_ID,
    DONOR_ID,
    DATE_F
) VALUES (
    'Food1',
    100,
    TO_DATE('2024-12-31', 'YYYY-MM-DD'),
    EMPTY_BLOB(),
    'Y',
    21,
    26,
    SYSDATE
);

INSERT INTO FOOD (
    NAME,
    QUANTITY,
    EXP_DATE,
    PHOTO,
    VERIFIED,
    VOLUNTEER_ID,
    DONOR_ID,
    DATE_F,
    SELL_OR_DONATE
) VALUES (
    'Food2',
    200,
    TO_DATE('2024-12-30', 'YYYY-MM-DD'),
    EMPTY_BLOB(),
    'N',
    22,
    27,
    SYSDATE,
    'SELL'
);

INSERT INTO FOOD (
    NAME,
    QUANTITY,
    EXP_DATE,
    PHOTO,
    VERIFIED,
    VOLUNTEER_ID,
    DONOR_ID,
    DATE_F,
    SELL_OR_DONATE
) VALUES (
    'Food3',
    300,
    TO_DATE('2024-12-29', 'YYYY-MM-DD'),
    EMPTY_BLOB(),
    'Y',
    23,
    28,
    SYSDATE,
    'DONATE'
);

INSERT INTO FOOD (
    NAME,
    QUANTITY,
    EXP_DATE,
    PHOTO,
    VERIFIED,
    VOLUNTEER_ID,
    DONOR_ID,
    DATE_F,
    SELL_OR_DONATE
) VALUES (
    'Food4',
    400,
    TO_DATE('2024-12-28', 'YYYY-MM-DD'),
    EMPTY_BLOB(),
    'N',
    24,
    29,
    SYSDATE,
    'SELL'
);

INSERT INTO FOOD (
    NAME,
    QUANTITY,
    EXP_DATE,
    PHOTO,
    VERIFIED,
    VOLUNTEER_ID,
    DONOR_ID,
    DATE_F,
    SELL_OR_DONATE
) VALUES (
    'Food5',
    500,
    TO_DATE('2024-12-27', 'YYYY-MM-DD'),
    EMPTY_BLOB(),
    'Y',
    25,
    30,
    SYSDATE,
    'DONATE'
);

INSERT INTO FOOD (
    NAME,
    QUANTITY,
    EXP_DATE,
    PHOTO,
    VERIFIED,
    VOLUNTEER_ID,
    DONOR_ID,
    DATE_F,
    SELL_OR_DONATE
) VALUES (
    'Food6',
    600,
    TO_DATE('2024-12-26', 'YYYY-MM-DD'),
    EMPTY_BLOB(),
    'N',
    41,
    31,
    SYSDATE,
    'SELL'
);

INSERT INTO FOOD (
    NAME,
   NAME,
    QUANTITY,
    EXP_DATE,
    PHOTO,
    VERIFIED,
    VOLUNTEER_ID,
    DONOR_ID,
    DATE_F,
    SELL_OR_DONATE
) VALUES (
    'Food7',
    700,
    TO_DATE('2024-12-25', 'YYYY-MM-DD'),
    EMPTY_BLOB(),
    'Y',
    42,
    32,
    SYSDATE,
    'SELL'
);

INSERT INTO FOOD (
    NAME,
    QUANTITY,
    EXP_DATE,
    PHOTO,
    VERIFIED,
    VOLUNTEER_ID,
    DONOR_ID,
    DATE_F
) VALUES (
    'Food8',
    800,
    TO_DATE('2024-12-24', 'YYYY-MM-DD'),
    EMPTY_BLOB(),
    'N',
    2,
    8,
    SYSDATE
);

INSERT INTO FOOD (
    NAME,
    QUANTITY,
    EXP_DATE,
    PHOTO,
    VERIFIED,
    VOLUNTEER_ID,
    DONOR_ID,
    DATE_F
) VALUES (
    'Food9',
    900,
    TO_DATE('2024-12-23', 'YYYY-MM-DD'),
    EMPTY_BLOB(),
    'Y',
    1,
    9,
    SYSDATE
);

INSERT INTO FOOD (
    NAME,
    QUANTITY,
    EXP_DATE,
    PHOTO,
    VERIFIED,
    VOLUNTEER_ID,
    DONOR_ID,
    DATE_F
) VALUES (
    'Food10',
    1000,
    TO_DATE('2024-12-22', 'YYYY-MM-DD'),
    EMPTY_BLOB(),
    'N',
    2,
    10,
    SYSDATE
);

INSERT INTO GET_POINT (
    DONOR_ID,
    FOOD_ID,
    POINTS
) VALUES (
    1,
    1,
    10
);

INSERT INTO GET_POINT (
    DONOR_ID,
    FOOD_ID,
    POINTS
) VALUES (
    2,
    2,
    20
);

INSERT INTO GET_POINT (
    DONOR_ID,
    FOOD_ID,
    POINTS
) VALUES (
    3,
    3,
    30
);

INSERT INTO GET_POINT (
    DONOR_ID,
    FOOD_ID,
    POINTS
) VALUES (
    4,
    4,
    40
);

INSERT INTO GET_POINT (
    DONOR_ID,
    FOOD_ID,
    POINTS
) VALUES (
    5,
    5,
    50
);

INSERT INTO GET_POINT (
    DONOR_ID,
    FOOD_ID,
    POINTS
) VALUES (
    6,
    6,
    60
);

INSERT INTO GET_POINT (
    DONOR_ID,
    FOOD_ID,
    POINTS
) VALUES (
    7,
    7,
    70
);

INSERT INTO GET_POINT (
    DONOR_ID,
    FOOD_ID,
    POINTS
) VALUES (
    8,
    8,
    80
);

INSERT INTO GET_POINT (
    DONOR_ID,
    FOOD_ID,
    POINTS
) VALUES (
    9,
    9,
    90
);

INSERT INTO GET_POINT (
    DONOR_ID,
    FOOD_ID,
    POINTS
) VALUES (
    10,
    10,
    100
);

INSERT INTO VULNERABLECITIZEN (
    NID,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    1,
    'Citizen One',
    TO_DATE('1950-01-01', 'YYYY-MM-DD'),
    'City1',
    'District1',
    'Division1',
    'Street1',
    '111-111-1111'
);

INSERT INTO VULNERABLECITIZEN (
    NID,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    2,
    'Citizen Two',
    TO_DATE('1951-02-02', 'YYYY-MM-DD'),
    'City2',
    'District2',
    'Division2',
    'Street2',
    '222-222-2222'
);

INSERT INTO VULNERABLECITIZEN (
    NID,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    3,
    'Citizen Three',
    TO_DATE('1952-03-03', 'YYYY-MM-DD'),
    'City3',
    'District3',
    'Division3',
    'Street3',
    '333-333-3333'
);

INSERT INTO VULNERABLECITIZEN (
    NID,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    4,
    'Citizen Four',
    TO_DATE('1953-04-04', 'YYYY-MM-DD'),
    'City4',
    'District4',
    'Division4',
    'Street4',
    '444-444-4444'
);

INSERT INTO VULNERABLECITIZEN (
    NID,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    5,
    'Citizen Five',
    TO_DATE('1954-05-05', 'YYYY-MM-DD'),
    'City5',
    'District5',
    'Division5',
    'Street5',
    '555-555-5555'
);

INSERT INTO VULNERABLECITIZEN (
    NID,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    6,
    'Citizen Six',
    TO_DATE('1955-06-06', 'YYYY-MM-DD'),
    'City6',
    'District6',
    'Division6',
    'Street6',
    '666-666-6666'
);

INSERT INTO VULNERABLECITIZEN (
    NID,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    7,
    'Citizen Seven',
    TO_DATE('1956-07-07', 'YYYY-MM-DD'),
    'City7',
    'District7',
    'Division7',
    'Street7',
    '777-777-7777'
);

INSERT INTO VULNERABLECITIZEN (
    NID,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    8,
    'Citizen Eight',
    TO_DATE('1957-08-08', 'YYYY-MM-DD'),
    'City8',
    'District8',
    'Division8',
    'Street8',
    '888-888-8888'
);

INSERT INTO VULNERABLECITIZEN (
    NID,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    9,
    'Citizen Nine',
    TO_DATE('1958-09-09', 'YYYY-MM-DD'),
    'City9',
    'District9',
    'Division9',
    'Street9',
    '999-999-9999'
);

INSERT INTO VULNERABLECITIZEN (
    NID,
    NAME,
    DATE_OF_BIRTH,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE
) VALUES (
    10,
    'Citizen Ten',
    TO_DATE('1959-10-10', 'YYYY-MM-DD'),
    'City10',
    'District10',
    'Division10',
    'Street10',
    '1010-1010-1010'
);

INSERT INTO SELLS (
    DONOR_ID,
    NID,
    FOOD_ID,
    ORIGINAL_PRICE,
    DISCOUNTED_PRICE,
    DATE_S
) VALUES (
    26,
    1,
    59,
    100,
    90,
    SYSDATE
);

INSERT INTO SELLS (
    DONOR_ID,
    NID,
    FOOD_ID,
    ORIGINAL_PRICE,
    DISCOUNTED_PRICE,
    DATE_S
) VALUES (
    2,
    2,
    2,
    200,
    180,
    SYSDATE
);

INSERT INTO SELLS (
    DONOR_ID,
    NID,
    FOOD_ID,
    ORIGINAL_PRICE,
    DISCOUNTED_PRICE,
    DATE_S
) VALUES (
    3,
    3,
    3,
    300,
    270,
    SYSDATE
);

INSERT INTO SELLS (
    DONOR_ID,
    NID,
    FOOD_ID,
    ORIGINAL_PRICE,
    DISCOUNTED_PRICE,
    DATE_S
) VALUES (
    4,
    4,
    4,
    400,
    360,
    SYSDATE
);

INSERT INTO SELLS (
    DONOR_ID,
    NID,
    FOOD_ID,
    ORIGINAL_PRICE,
    DISCOUNTED_PRICE,
    DATE_S
) VALUES (
    5,
    5,
    5,
    500,
    450,
    SYSDATE
);

INSERT INTO SELLS (
    DONOR_ID,
    NID,
    FOOD_ID,
    ORIGINAL_PRICE,
    DISCOUNTED_PRICE,
    DATE_S
) VALUES (
    6,
    6,
    6,
    600,
    540,
    SYSDATE
);

INSERT INTO SELLS (
    DONOR_ID,
    NID,
    FOOD_ID,
    ORIGINAL_PRICE,
    DISCOUNTED_PRICE,
    DATE_S
) VALUES (
    7,
    7,
    7,
    700,
    630,
    SYSDATE
);

INSERT INTO SELLS (
    DONOR_ID,
    NID,
    FOOD_ID,
    ORIGINAL_PRICE,
    DISCOUNTED_PRICE,
    DATE_S
) VALUES (
    8,
    8,
    8,
    800,
    720,
    SYSDATE
);

INSERT INTO SELLS (
    DONOR_ID,
    NID,
    FOOD_ID,
    ORIGINAL_PRICE,
    DISCOUNTED_PRICE,
    DATE_S
) VALUES (
    9,
    9,
    9,
    900,
    810,
    SYSDATE
);

INSERT INTO SELLS (
    DONOR_ID,
    NID,
    FOOD_ID,
    ORIGINAL_PRICE,
    DISCOUNTED_PRICE,
    DATE_S
) VALUES (
    10,
    10,
    10,
    1000,
    900,
    SYSDATE
);

INSERT INTO RECIPIENT (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    NUMBER_OF_PEOPLE,
    VOLUNTEER_ID,
    DATE_R,
    VERIFIED
) VALUES (
    'recipient1@example.com',
    'password1',
    'Recipient One',
    'Type1',
    'City1',
    'District1',
    'Division1',
    'Street1',
    '111-111-1111',
    100,
    1,
    SYSDATE,
    'Y'
);

INSERT INTO RECIPIENT (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    NUMBER_OF_PEOPLE,
    VOLUNTEER_ID,
    DATE_R,
    VERIFIED
) VALUES (
    'recipient2@example.com',
    'password2',
    'Recipient Two',
    'Type2',
    'City2',
    'District2',
    'Division2',
    'Street2',
    '222-222-2222',
    200,
    2,
    SYSDATE,
    'N'
);

INSERT INTO RECIPIENT (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    NUMBER_OF_PEOPLE,
    VOLUNTEER_ID,
    DATE_R,
    VERIFIED
) VALUES (
    'recipient3@example.com',
    'password3',
    'Recipient Three',
    'Type3',
    'City3',
    'District3',
    'Division3',
    'Street3',
    '333-333-3333',
    300,
    1,
    SYSDATE,
    'Y'
);

INSERT INTO RECIPIENT (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    NUMBER_OF_PEOPLE,
    VOLUNTEER_ID,
    DATE_R,
    VERIFIED
) VALUES (
    'recipient4@example.com',
    'password4',
    'Recipient Four',
    'Type4',
    'City4',
    'District4',
    'Division4',
    'Street4',
    '444-444-4444',
    400,
    2,
    SYSDATE,
    'N'
);

INSERT INTO RECIPIENT (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    NUMBER_OF_PEOPLE,
    VOLUNTEER_ID,
    DATE_R,
    VERIFIED
) VALUES (
    'recipient5@example.com',
    'password5',
    'Recipient Five',
    'Type5',
    'City5',
    'District5',
    'Division5',
    'Street5',
    '555-555-5555',
    500,
    1,
    SYSDATE,
    'Y'
);

INSERT INTO RECIPIENT (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    NUMBER_OF_PEOPLE,
    VOLUNTEER_ID,
    DATE_R,
    VERIFIED
) VALUES (
    'recipient6@example.com',
    'password6',
    'Recipient Six',
    'Type6',
    'City6',
    'District6',
    'Division6',
    'Street6',
    '666-666-6666',
    600,
    2,
    SYSDATE,
    'N'
);

INSERT INTO RECIPIENT (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    NUMBER_OF_PEOPLE,
    VOLUNTEER_ID,
    DATE_R,
    VERIFIED
) VALUES (
    'recipient7@example.com',
    'password7',
    'Recipient Seven',
    'Type7',
    'City7',
    'District7',
    'Division7',
    'Street7',
    '777-777-7777',
    700,
    1,
    SYSDATE,
    'Y'
);

INSERT INTO RECIPIENT (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    NUMBER_OF_PEOPLE,
    VOLUNTEER_ID,
    DATE_R,
    VERIFIED
) VALUES (
    'recipient8@example.com',
    'password8',
    'Recipient Eight',
    'Type8',
    'City8',
    'District8',
    'Division8',
    'Street8',
    '888-888-8888',
    800,
    2,
    SYSDATE,
    'N'
);

INSERT INTO RECIPIENT (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    NUMBER_OF_PEOPLE,
    VOLUNTEER_ID,
    DATE_R,
    VERIFIED
) VALUES (
    'recipient9@example.com',
    'password9',
    'Recipient Nine',
    'Type9',
    'City9',
    'District9',
    'Division9',
    'Street9',
    '999-999-9999',
    900,
    1,
    SYSDATE,
    'Y'
);

INSERT INTO RECIPIENT (
    EMAIL,
    PASSWORD,
    INSTITUTION_NAME,
    INSTITUTION_TYPE,
    CITY,
    DISTRICT,
    DIVISION,
    STREETNO,
    PHONE,
    NUMBER_OF_PEOPLE,
    VOLUNTEER_ID,
    DATE_R,
    VERIFIED
) VALUES (
    'recipient10@example.com',
    'password10',
    'Recipient Ten',
    'Type10',
    'City10',
    'District10',
    'Division10',
    'Street10',
    '1010-1010-1010',
    1000,
    2,
    SYSDATE,
    'N'
);

INSERT INTO RECEIVES (
    MANAGER_ID,
    FOOD_ID,
    RECIPIENT_ID,
    DATE_RECEIVES
) VALUES (
    1,
    1,
    1,
    SYSDATE
);

INSERT INTO RECEIVES (
    MANAGER_ID,
    FOOD_ID,
    RECIPIENT_ID,
    DATE_RECEIVES
) VALUES (
    2,
    2,
    2,
    SYSDATE
);

INSERT INTO RECEIVES (
    MANAGER_ID,
    FOOD_ID,
    RECIPIENT_ID,
    DATE_RECEIVES
) VALUES (
    3,
    3,
    3,
    SYSDATE
);

INSERT INTO RECEIVES (
    MANAGER_ID,
    FOOD_ID,
    RECIPIENT_ID,
    DATE_RECEIVES
) VALUES (
    4,
    4,
    4,
    SYSDATE
);

INSERT INTO RECEIVES (
    MANAGER_ID,
    FOOD_ID,
    RECIPIENT_ID,
    DATE_RECEIVES
) VALUES (
    5,
    5,
    5,
    SYSDATE
);

INSERT INTO RECEIVES (
    MANAGER_ID,
    FOOD_ID,
    RECIPIENT_ID,
    DATE_RECEIVES
) VALUES (
    6,
    6,
    6,
    SYSDATE
);

INSERT INTO RECEIVES (
    MANAGER_ID,
    FOOD_ID,
    RECIPIENT_ID,
    DATE_RECEIVES
) VALUES (
    7,
    7,
    7,
    SYSDATE
);

INSERT INTO RECEIVES (
    MANAGER_ID,
    FOOD_ID,
    RECIPIENT_ID,
    DATE_RECEIVES
) VALUES (
    8,
    8,
    8,
    SYSDATE
);

INSERT INTO RECEIVES (
    MANAGER_ID,
    FOOD_ID,
    RECIPIENT_ID,
    DATE_RECEIVES
) VALUES (
    9,
    9,
    9,
    SYSDATE
);

INSERT INTO RECEIVES (
    MANAGER_ID,
    FOOD_ID,
    RECIPIENT_ID,
    DATE_RECEIVES
) VALUES (
    10,
    10,
    10,
    SYSDATE
);