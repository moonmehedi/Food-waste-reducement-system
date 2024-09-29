
--tells about donor and recipient request
CREATE OR REPLACE VIEW COMBINEDPENDINGREQUEST AS
SELECT 
    DONOR.DONOR_ID,
    'Donor' AS Request_Type,
    DONOR.EMAIL AS Email_Address,
    DONOR.STREETNO AS Request_Address,
    DONOR.PHONE,
    DONOR.INSTITUTION_TYPE,
    DONOR.INSTITUTION_NAME,
    DONOR.DATE_D AS Request_Date,
    DONOR.AUTHENTICITY 
FROM 
    DONOR
    where DONOR.VERIFIED='N'and DONOR.volunteer_id is not NULL 
UNION ALL
SELECT 
    RECIPIENT.RECIPIENT_ID,
    'Recipient' AS Request_Type,
    RECIPIENT.EMAIL AS Email_Address,
    RECIPIENT.STREETNO AS Request_Address,
    RECIPIENT.PHONE,
    RECIPIENT.INSTITUTION_TYPE,
    RECIPIENT.INSTITUTION_NAME,
    RECIPIENT.DATE_R AS Request_Date,
    RECIPIENT.AUTHENTICITY
FROM 
    RECIPIENT
    where RECIPIENT.VERIFIED='N' and RECIPIENT.volunteer_id is NOT NULL;





SELECT * FROM COMBINEDPENDINGREQUEST;






-- available food or verified sub-query
CREATE OR REPLACE VIEW DONOR_FOOD_DONATION_PENDING_REQUEST AS
SELECT
    F.FOOD_ID AS "FOOD ID",
    D.INSTITUTION_NAME AS "Donor Name",
    F.NAME AS "Food Name",
    F.PHOTO AS "Food Image",
    F.QUANTITY AS "Food Quantity",
    F.EXP_DATE AS "Expiration Date",
    F.DATE_F AS "Date ",
    F.AUTHENTICITY 
FROM
    DONOR D,FOOD F
WHERE
    F.donor_id=D.donor_id and
    F.VERIFIED = 'N' AND D.VERIFIED = 'Y' and
    F.volunteer_id is NOT NULL
    ; 


SELECT * FROM DONOR_FOOD_DONATION_PENDING_REQUEST;


CREATE OR REPLACE PROCEDURE update_request_status(
  id IN NUMBER,                -- The ID of the record to update/delete
  request_type IN VARCHAR2,     -- Type of request: Donor, Recipient, or Food
  table_type IN VARCHAR2,       -- Table type: Donor, Recipient, Food
  action IN VARCHAR2            -- The action to perform: Accept or Reject
) IS
  v_volunteer_id NUMBER;
  v_quantity NUMBER;
  v_donor_id NUMBER;
BEGIN
  -- Action is 'Accept'
  IF action = 'Accept' THEN
    
    -- For Donor requests
    IF request_type = 'Donor' THEN
      UPDATE DONOR
      SET verified = 'Y'
      WHERE DONOR_ID = id
      RETURNING VOLUNTEER_ID INTO v_volunteer_id;

      -- Reduce the volunteer's task count
      UPDATE VOLUNTEER
      SET TASK_COUNT = TASK_COUNT - 1
      WHERE VOLUNTEER_ID = v_volunteer_id;

    -- For Recipient requests
    ELSIF request_type = 'Recipient' THEN
      UPDATE RECIPIENT
      SET verified = 'Y'
      WHERE RECIPIENT_ID = id
      RETURNING VOLUNTEER_ID INTO v_volunteer_id;

      -- Reduce the volunteer's task count
      UPDATE VOLUNTEER
      SET TASK_COUNT = TASK_COUNT - 1
      WHERE VOLUNTEER_ID = v_volunteer_id;

    -- For Food requests
    ELSIF table_type = 'food' THEN
       -- Set the food as verified
      UPDATE FOOD
      SET verified = 'Y'
      WHERE FOOD_ID = id
      RETURNING VOLUNTEER_ID, DONOR_ID, QUANTITY INTO v_volunteer_id, v_donor_id, v_quantity;

      -- Reduce the volunteer's task count
      UPDATE VOLUNTEER
      SET TASK_COUNT = TASK_COUNT - 1
      WHERE VOLUNTEER_ID = v_volunteer_id;

      -- Award points to the donor based on quantity/10
      UPDATE DONOR
      SET POINTS = NVL(POINTS, 0) + (v_quantity / 10)
      WHERE DONOR_ID = v_donor_id;

    ELSE
      -- Handle unexpected request types
      DBMS_OUTPUT.PUT_LINE('Invalid request type specified.');
    END IF;

  -- Action is 'Reject'
  ELSIF action = 'Reject' THEN
    -- For Donor requests
    IF request_type = 'Donor' THEN
      DELETE FROM DONOR
      WHERE DONOR_ID = id
      RETURNING VOLUNTEER_ID INTO v_volunteer_id;

      -- Reduce the volunteer's task count
      UPDATE VOLUNTEER
      SET TASK_COUNT = TASK_COUNT - 1
      WHERE VOLUNTEER_ID = v_volunteer_id;

    -- For Recipient requests
    ELSIF request_type = 'Recipient' THEN
      DELETE FROM RECIPIENT
      WHERE RECIPIENT_ID = id
      RETURNING VOLUNTEER_ID INTO v_volunteer_id;

      -- Reduce the volunteer's task count
      UPDATE VOLUNTEER
      SET TASK_COUNT = TASK_COUNT - 1
      WHERE VOLUNTEER_ID = v_volunteer_id;

    -- For Food requests
    ELSIF table_type = 'food' THEN
      DELETE FROM FOOD
      WHERE FOOD_ID = id
      RETURNING VOLUNTEER_ID INTO v_volunteer_id;

      -- Reduce the volunteer's task count
      UPDATE VOLUNTEER
      SET TASK_COUNT = TASK_COUNT - 1
      WHERE VOLUNTEER_ID = v_volunteer_id;

    ELSE
      -- Handle unexpected request types
      DBMS_OUTPUT.PUT_LINE('Invalid request type specified.');
    END IF;

  ELSE
    -- Handle unexpected actions
    DBMS_OUTPUT.PUT_LINE('Invalid action specified.');
  END IF;

EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('An error occurred: ' || SQLERRM);
END update_request_status;





BEGIN
 
  update_request_status(
    id => 24,            
    request_type => 'donor',
    action => 'Accept'   
  );
END;



UPDATE DONOR set VERIFIED='N' where DONOR_ID=24;





update RECIPIENT SET AUTHENTICITY='authentic' where RECIPIENT_ID=42;