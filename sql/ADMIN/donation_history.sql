CREATE OR REPLACE FORCE EDITIONABLE VIEW "ADMIN"."DONATION_HISTORY" ("DONOR_NAME", "FOOD_NAME", "FOOD_IMAGE", "FOOD_QUANTITY", "EXP_DATE", "RECIPIENT_NAME", "INSTITUTION_TYPE", "NUMBER_OF_PEOPLE", "FOOD_DATE") AS 
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
    where f.food_id=rec.food_id
    and 
    rec.recipient_id=R.recipient_id
    and 
    f.donor_id=d.donor_id
ORDER BY
    F.DATE_F;
