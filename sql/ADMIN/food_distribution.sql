CREATE OR REPLACE VIEW DONOR_CURRENT_FOOD_VIEW AS
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
    F.VERIFIED = 'Y' AND D.VERIFIED = 'Y' and TRUNC(F.EXP_DATE)>TRUNC(SYSDATE)
    and F.QUANTITY >0
    ORDER BY F.QUANTITY;


    

select * FROM DONOR_CURRENT_FOOD_VIEW;

-- VERIFIED recipient
CREATE OR REPLACE VIEW RECIPIENT_INFO_food_distribution AS
SELECT
    R.INSTITUTION_NAME,
    R.INSTITUTION_TYPE,
    R.EMAIL,
    RE.NUMBER_OF_PEOPLE AS "Quantity",
    "DIVISION" || ', ' || "DISTRICT" || ', ' || "CITY" || ', ' || "STREETNO" AS "ADDRESS",
    RE.REQ_DATE AS "Date",
    R.RECIPIENT_ID AS "ID",
    Re.REQ_ID as "Request_Id"
FROM
    RECIPIENT R,
    RECEIVES RE
WHERE
    R.VERIFIED = 'Y' 
    AND R.RECIPIENT_ID = RE.RECIPIENT_ID and (re.Number_Of_People - re.received_amount)>0
    AND TRUNC(RE.REQ_DATE) = TRUNC(SYSDATE) ;



select * from RECIPIENT_INFO_FOOD_DISTRIBUTION;







--donation procedure


CREATE OR REPLACE PROCEDURE DISTRIBUTE_FOOD (
    p_manager_id    IN RECEIVES.MANAGER_ID%TYPE,
    p_food_id       IN RECEIVES.FOOD_ID%TYPE,
    p_food_quantity IN FOOD.QUANTITY%TYPE,
    p_num_people    IN RECEIVES.NUMBER_OF_PEOPLE%TYPE,
    p_recipient_id  IN RECEIVES.RECIPIENT_ID%TYPE,
    p_req_id in  RECEIVES.REQ_ID%TYPE
) AS
BEGIN
    IF p_food_quantity - p_num_people >= 0 THEN
        -- Case 1: Food quantity is sufficient
        -- Update the received amount and number of people in the RECEIVES table
        UPDATE RECEIVES
        SET
            received_amount = p_num_people,
            MANAGER_ID = p_manager_id,
            FOOD_ID = p_food_id
        WHERE
            REQ_ID = p_req_id;
        
        -- Update the quantity in the FOOD table
        UPDATE FOOD
        SET QUANTITY = p_food_quantity - p_num_people
        WHERE FOOD_ID = p_food_id;
        
    ELSIF p_num_people - p_food_quantity > 0 THEN
        -- Case 2: Food quantity is not sufficient
        -- Update the received amount and number of people in the RECEIVES table for the fulfilled part
        UPDATE RECEIVES
        SET
            received_amount = p_food_quantity,
            MANAGER_ID = p_manager_id,
            FOOD_ID = p_food_id,
            NUMBER_OF_PEOPLE = p_food_quantity
        WHERE
            REQ_ID = p_req_id;
        
        -- Insert the remaining people as a separate entry with null manager_id and food_id
        INSERT INTO RECEIVES (REQ_ID,MANAGER_ID, FOOD_ID, RECIPIENT_ID, NUMBER_OF_PEOPLE, received_amount, REQ_DATE)
        VALUES (RECEIVES_SEQ.NEXTVAL,NULL, NULL, p_recipient_id, p_num_people - p_food_quantity, 0, SYSDATE);
        
        -- Update the quantity in the FOOD table to 0
        UPDATE FOOD
        SET QUANTITY = 0
        WHERE FOOD_ID = p_food_id;
        
    ELSE
        -- Catch-all case, should not occur if data integrity is maintained
        DBMS_OUTPUT.PUT_LINE('Unexpected case. Please check inputs.');
    END IF;

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('An error occurred: ' || SQLERRM);
END DISTRIBUTE_FOOD;
/







DECLARE
    v_manager_id    RECEIVES.MANAGER_ID%TYPE := 1; -- Sample manager ID
    v_food_id       RECEIVES.FOOD_ID%TYPE := 4;  -- Sample food ID
    v_food_quantity FOOD.QUANTITY%TYPE := 400;      -- Sample food quantity available
    v_num_people    RECEIVES.NUMBER_OF_PEOPLE%TYPE := 500; -- Number of people to distribute food to
    v_recipient_id  RECEIVES.RECIPIENT_ID%TYPE := 1;   -- Sample recipient ID
BEGIN
    -- Call the DISTRIBUTE_FOOD procedure with the defined variables
    DISTRIBUTE_FOOD(
        p_manager_id    => v_manager_id,
        p_food_id       => v_food_id,
        p_food_quantity => v_food_quantity,
        p_num_people    => v_num_people,
        p_recipient_id  => v_recipient_id
    );

    DBMS_OUTPUT.PUT_LINE('Procedure executed successfully.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('An error occurred: ' || SQLERRM);
END;
/



update food set QUANTITY=600 where FOOD_ID=1;
update RECEIVES set received_amount=0,MANAGER_ID=NULL,FOOD_ID=NULL where  RECIPIENT_ID=1;




update RECEIVES set MANAGER_ID=NULL ,FOOD_ID=NULL;
update RECEIVES set REQ_DATE=SYSDATE ;
update RECEIVES set Number_Of_People=500 where RECIPIENT_ID=1 ;
update RECEIVES set NUMBER_OF_PEOPLE=10 where RECIPIENT_ID=2 ;
