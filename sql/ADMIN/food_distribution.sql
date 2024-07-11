CREATE OR REPLACE VIEW DONOR_FOOD_VIEW AS
SELECT
    D.INSTITUTION_NAME AS "Donor Name",
    F.NAME AS "Food Name",
    F.PHOTO AS "Food Image",
    F.QUANTITY AS "Food Quantity",
    F.EXP_DATE AS "Expiration Date",
    F.DATE_F AS "Date"
FROM
    DONOR D,FOOD F
WHERE
    F.donor_id=D.donor_id and
    F.VERIFIED = 'Y' AND D.VERIFIED = 'Y'
    and f.food_id not in (select food_id from receives); 

    

-- VERIFIED recipient
-- gives all info of RECIPIENT
CREATE OR REPLACE VIEW RECIPIENT_INFO_food_distribution AS
SELECT
    R.EMAIL,
    R.INSTITUTION_NAME,
    R.INSTITUTION_TYPE,
    R.NUMBER_OF_PEOPLE AS "Number Of People",
    R.DATE_R AS "Date"
FROM
    RECIPIENT R
WHERE
    R.VERIFIED = 'Y';


