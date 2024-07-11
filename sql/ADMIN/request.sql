
--tells about donor and recipient request
CREATE OR REPLACE VIEW COMBINEDREQUEST AS
SELECT 
    'Donor' AS Request_Type,
    DONOR.EMAIL AS Email_Address,
    DONOR.STREETNO AS Request_Address,
    DONOR.PHONE,
    DONOR.INSTITUTION_TYPE,
    DONOR.INSTITUTION_NAME,
    DONOR.DATE_D AS Request_Date
FROM 
    DONOR
UNION ALL
SELECT 
    'Recipient' AS Request_Type,
    RECIPIENT.EMAIL AS Email_Address,
    RECIPIENT.STREETNO AS Request_Address,
    RECIPIENT.PHONE,
    RECIPIENT.INSTITUTION_TYPE,
    RECIPIENT.INSTITUTION_NAME,
    RECIPIENT.DATE_R AS Request_Date
FROM 
    RECIPIENT;


--tells about availabel volunteer

CREATE OR REPLACE VIEW available_volunteer AS
SELECT
    ROW_NUMBER() OVER (ORDER BY V.VOLUNTEER_ID) AS "No",
    V.NAME,
    V.EMAIL,
    V.DATE_OF_BIRTH AS "Date Of Birth",
    V.DIVISION || ', ' || V.DISTRICT || ', ' || V.CITY || ', ' || V.STREETNO AS "Address",
    V.PHONE
FROM
    VOLUNTEER V
where AVAILABILITY='Free';


SELECT * FROM available_volunteer;



update VOLUNTEER set AVAILABILITY='Free' where VOLUNTEER_ID IN (1,2,3,4,5);


-- available food or verified sub-query
CREATE OR REPLACE VIEW DONOR_FOOD_DONATION_REQUEST AS
SELECT
    D.INSTITUTION_NAME AS "Donor Name",
    F.NAME AS "Food Name",
    F.PHOTO AS "Food Image",
    F.QUANTITY AS "Food Quantity",
    F.EXP_DATE AS "Expiration Date",
    F.DATE_F AS "Date "
FROM
    DONOR D,FOOD F
WHERE
    F.donor_id=D.donor_id and
    F.VERIFIED = 'N' AND D.VERIFIED = 'Y'
    and f.food_id not in (select food_id from receives); 


SELECT * from DONOR_FOOD_DONATION_REQUEST;





UPDATE donor set verified='Y' WHERE donor_id=4;



SELECT * from donor;