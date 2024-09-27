
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
    where DONOR.VERIFIED='N'and DONOR.volunteer_id is not NULL and DONOR.AUTHENTICITY='pending'
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
    where RECIPIENT.VERIFIED='N' and RECIPIENT.volunteer_id is NOT NULL and RECIPIENT.AUTHENTICITY='pending';





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
    and f.food_id not in (select food_id from receives)
    AND F.AUTHENTICITY='pending'
    ; 


SELECT * FROM DONOR_FOOD_DONATION_PENDING_REQUEST;



--query for accept button
CREATE OR REPLACE PROCEDURE update_request_status(
  id IN NUMBER,                
  request_type IN VARCHAR2,
  table_type IN VARCHAR,    
  action IN VARCHAR2          
) IS
BEGIN
  --action is 'Accept'
  IF action = 'Accept' THEN
    --request type 
    IF request_type = 'Donor' THEN
      UPDATE DONOR
      SET verified = 'Y'
      WHERE DONOR_ID = id;

    ELSIF request_type = 'Recipient' THEN
      UPDATE RECIPIENT
      SET verified = 'Y'
      WHERE RECIPIENT_ID = id;

    ELSIF table_type = 'food' THEN
      UPDATE FOOD
      SET verified = 'Y'
      WHERE FOOD_ID = id;

    ELSE
      -- Handle unexpected request types
      DBMS_OUTPUT.PUT_LINE('Invalid request type specified.');
    END IF;

  --  action is 'Reject'
  ELSIF action = 'Reject' THEN
    -- Check request type and delete from corresponding table
    IF request_type = 'Donor' THEN
      DELETE FROM DONOR
      WHERE DONOR_ID = id;

    ELSIF request_type = 'Recipient' THEN
      DELETE FROM RECIPIENT
      WHERE RECIPIENT_ID = id;

    ELSIF request_type = 'food' THEN
      DELETE FROM FOOD
      WHERE FOOD_ID = id;

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



