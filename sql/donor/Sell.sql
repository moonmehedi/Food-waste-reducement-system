-- this PROCEDURE takes data from front-end and inserts that data into sells and food table
CREATE OR REPLACE PROCEDURE InsertFoodAndSell(
    p_name           IN FOOD.NAME%TYPE,
    p_quantity       IN FOOD.QUANTITY%TYPE,
    p_exp_date       IN FOOD.EXP_DATE%TYPE,
    p_photo          IN FOOD.PHOTO%TYPE,
    p_verified       IN FOOD.VERIFIED%TYPE,
    p_volunteer_id   IN FOOD.VOLUNTEER_ID%TYPE,
    p_donor_id       IN FOOD.DONOR_ID%TYPE,
    p_date_f         IN FOOD.DATE_F%TYPE,
    p_sell_or_donate IN FOOD.SELL_OR_DONATE%TYPE,
    p_nid            IN SELLS.NID%TYPE,
    p_original_price IN SELLS.ORIGINAL_PRICE%TYPE,
    p_discounted_price IN SELLS.DISCOUNTED_PRICE%TYPE,
    p_date_s         IN SELLS.DATE_S%TYPE
)
IS
    v_food_id FOOD.FOOD_ID%TYPE;
BEGIN
    -- Insert into FOOD table
    INSERT INTO FOOD (
        NAME, QUANTITY, EXP_DATE, PHOTO, VERIFIED, VOLUNTEER_ID, DONOR_ID, DATE_F, SELL_OR_DONATE
    ) VALUES (
        p_name, p_quantity, p_exp_date, p_photo, p_verified, p_volunteer_id, p_donor_id, p_date_f, p_sell_or_donate
    ) RETURNING FOOD_ID INTO v_food_id;

    -- Insert into SELLS table if the food is for selling
        INSERT INTO SELLS (
            DONOR_ID, NID, FOOD_ID, ORIGINAL_PRICE, DISCOUNTED_PRICE, DATE_S
        ) VALUES (
            p_donor_id, p_nid, v_food_id, p_original_price, p_discounted_price, p_date_s
        );
END;
/


