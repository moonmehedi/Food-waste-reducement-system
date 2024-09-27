CREATE OR REPLACE VIEW CART_VIEW AS 
  SELECT 
    s.NID AS "Customer ID",
    s.FOOD_ID AS "Food ID",
    d.INSTITUTION_NAME AS "Seller Name",
    f.NAME AS "Food Name",
    f.PHOTO AS "Food Image",
    s.ORIGINAL_PRICE AS "Original Price",
    s.DISCOUNTED_PRICE AS "Discounted Price",
    (s.ORIGINAL_PRICE - s.DISCOUNTED_PRICE) AS "Discount Amount", -- Virtual column
    s.DATE_S AS "Date of Sale"
FROM 
    SELLS s, DONOR d, FOOD f
WHERE
    s.FOOD_ID = f.FOOD_ID
AND
    s.DONOR_ID = d.DONOR_ID;





CREATE OR REPLACE TRIGGER update_food_stock
BEFORE UPDATE OF QUANTITY ON FOOD
FOR EACH ROW
BEGIN
    -- Case 1: Check if the current quantity is zero (using :OLD to get the value before update)
    IF :OLD.QUANTITY = 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Warning: Food stock not available.');
    END IF;

    -- Case 2: Check if the new quantity being updated is greater than the current stock
    IF :NEW.QUANTITY > :OLD.QUANTITY THEN
        RAISE_APPLICATION_ERROR(-20003, 'Warning: Requested quantity exceeds available stock.');
    END IF;
    
    -- Additional logic can be added here if needed
END;





