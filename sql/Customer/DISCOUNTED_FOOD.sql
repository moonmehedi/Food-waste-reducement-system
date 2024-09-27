
CREATE OR REPLACE VIEW DISCOUNTED_FOOD AS 
  SELECT 
    s.food_id AS "FOOD ID",
    f.NAME AS "Food Name",
    f.QUANTITY AS "Quantity",
    f.EXP_DATE AS "Expiration Date",
    f.PHOTO AS "Food Image",
    s.ORIGINAL_PRICE AS "Original Price",
    s.DISCOUNTED_PRICE AS "Discounted Price",
    d.INSTITUTION_NAME AS "Seller Name"
FROM
    FOOD f,DONOR d, SELLS s
WHERE 
    s.food_id = f.food_id
AND
    f.donor_id = d.donor_id
AND
    s.ORDER_STATUS IS NULL
AND
    f.SELL_OR_DONATE = 'SELL'
AND
    f.EXP_DATE > f.DATE_F;



