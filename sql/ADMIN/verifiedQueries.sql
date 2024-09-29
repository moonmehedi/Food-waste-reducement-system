--selects all verified donor
Create or REPLACE VIEW VERIFIED_DONOR as
SELECT "EMAIL", "INSTITUTION_TYPE", "INSTITUTION_NAME", "PHONE",
       "DIVISION" || ', ' || "DISTRICT" || ', ' || "CITY" || ', ' || "STREETNO" AS "ADDRESS",
       "DATE_D"
FROM "ADMIN"."DONOR" where verified='Y';


select * from VERIFIED_DONOR;

-- selects all the VOLUNTEER from VOLUNTEER table
CREATE OR REPLACE VIEW VOLUNTEER_INFO AS
SELECT
    ROW_NUMBER() OVER (ORDER BY V.VOLUNTEER_ID) AS "No",
    V.NAME,
    V.EMAIL,
    V.DATE_OF_BIRTH AS "Date Of Birth",
    V.DIVISION || ', ' || V.DISTRICT || ', ' || V.CITY || ', ' || V.STREETNO AS "Address",
    V.PHONE
FROM
    VOLUNTEER V;
SELECT * FROM VOLUNTEER_INFO;




-- gives all info of RECIPIENT
CREATE OR REPLACE VIEW RECIPIENT_INFO AS
SELECT
    ROW_NUMBER() OVER (ORDER BY R.RECIPIENT_ID) AS "No",
    R.EMAIL,
    R.INSTITUTION_NAME,
    R.INSTITUTION_TYPE,
    "DIVISION" || ', ' || "DISTRICT" || ', ' || "CITY" || ', ' || "STREETNO" AS "ADDRESS",
    R.DATE_R AS "Date"
FROM
    RECIPIENT R
WHERE
    R.VERIFIED = 'Y';

SELECT * from RECIPIENT_INFO;


-- available food or verified sub-query
CREATE OR REPLACE VIEW DONOR_FOOD_VIEW AS
SELECT
    D.INSTITUTION_NAME AS "Donor Name",
    F.NAME AS "Food Name",
    F.PHOTO AS "Food Image",
    F.QUANTITY AS "Food Quantity",
    F.EXP_DATE AS "Expiration Date",
    F.DATE_F AS "Date"
FROM
    DONOR D,FOOD F ,RECEIVES
WHERE
    F.donor_id=D.donor_id and
    F.VERIFIED = 'Y' AND D.VERIFIED = 'Y'
    and F.food_id not in (RECEIVES.FOOD_ID); 




CREATE OR REPLACE VIEW DONOR_FOOD_VIEW AS
SELECT
    D.INSTITUTION_NAME AS "Donor Name",
    F.NAME AS "Food Name",
    F.PHOTO AS "Food Image",
    F.QUANTITY AS "Food Quantity",
    F.EXP_DATE AS "Expiration Date",
    F.DATE_F AS "Date",
    F.FOOD_ID AS "ID"
FROM
    DONOR D,FOOD F
WHERE
    F.donor_id=D.donor_id and
    F.VERIFIED = 'Y' AND D.VERIFIED = 'Y' and TRUNC(F.EXP_DATE)>=TRUNC(SYSDATE)
    and F.QUANTITY >0
    ORDER BY F.QUANTITY;









SELECT * FROM DONOR_FOOD_VIEW
DELETE FROM ACCOUNT
WHERE
    ACCOUNT_ID = NUMBER;
