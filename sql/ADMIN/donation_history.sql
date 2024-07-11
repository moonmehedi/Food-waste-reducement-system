CREATE OR REPLACE  VIEW DONATION_HISTORY as
SELECT
    D.INSTITUTION_NAME AS Donor_Name,
    F.NAME AS Food_Name,
    F.PHOTO AS Food_Image,
    F.QUANTITY AS Food_Quantity,
    F.EXP_DATE AS Exp_Date,
    R.INSTITUTION_NAME AS Recipient_Name,
    R.INSTITUTION_TYPE AS Institution_Type,
    R.NUMBER_OF_PEOPLE AS Number_Of_People,
    F.DATE_F AS Food_Date

FROM
    FOOD F,donor D,recipient R,receives Rec
    where rec.food_id=f.food_id
    and 
    rec.recipient_id=R.recipient_id
    and 
    f.donor_id=d.donor_id
ORDER BY
    F.DATE_F;


SELECT * FROM DONATION_HISTORY;
