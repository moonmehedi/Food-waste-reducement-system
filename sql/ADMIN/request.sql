
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
    where VERIFIED='N'and volunteer_id is NULL
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
    RECIPIENT
    where VERIFIED='N' and volunteer_id is NULL;


--tells about availabel volunteer

SELECT * from COMBINEDREQUEST;


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
where TASK_COUNT<5;


SELECT * FROM available_volunteer;




-- available food or verified sub-query
CREATE OR REPLACE VIEW DONOR_FOOD_DONATION_REQUEST AS
SELECT
    F.FOOD_ID AS "FOOD ID",
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
    F.VERIFIED = 'N' AND D.VERIFIED = 'Y' and
    F.SELL_OR_DONATE='DONATE' and
    F.volunteer_id is NULL ; 


SELECT * from DONOR_FOOD_DONATION_REQUEST;



UPDATE donor set verified='Y' WHERE donor_id=4;



SELECT * from donor;








--update volunteer

create or REPLACE PROCEDURE assign_volunteer(
    MANAGER_ID in number,
    VOLUNTEER_ID in number,
    task in VARCHAR2,
    PHONE in VARCHAR2
)
is
BEGIN
insert into ASSIGN (manager_id, volunteer_id, task,phone) values (manager_id,volunteer_id,task,phone);
END assign_volunteer;
/



SHOW ERRORS PROCEDURE assign_volunteer;




BEGIN
    assign_volunteer(1, 2, 'Organize Event',4);
END;
/


delete from ASSIGN where MANAGER_ID=1 AND VOLUNTEER_ID=2;



--volunteer function
set SERVEROUTput on
CREATE OR REPLACE FUNCTION getVolunteerId(
    volunteerNumber VARCHAR2
) RETURN NUMBER
IS
    Id NUMBER;
BEGIN
   
    SELECT VOLUNTEER_ID INTO Id
    FROM VOLUNTEER
    WHERE PHONE = volunteerNumber;

    RETURN Id;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
       
        RETURN NULL;
    WHEN OTHERS THEN
      
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM); 
        RETURN NULL; 
END getVolunteerId;
/


show error FUNCTION get_volunteer_Id;

set SERVEROUTput on
DECLARE
ID number;
BEGIN
ID:=getVolunteerId(2223334444);
dbms_output.put_line(ID);
END;
/









--sequence
CREATE SEQUENCE volunteer_task_seq
START WITH 1
INCREMENT BY 1
MAXVALUE 5 -- Max availability is 5
;



CREATE OR REPLACE TRIGGER update_volunteer_on_task
AFTER INSERT ON ASSIGN
FOR EACH ROW
DECLARE
    current_task_count NUMBER;
BEGIN
    -- Get the current task count for the volunteer
    SELECT TASK_COUNT INTO current_task_count
    FROM VOLUNTEER
    WHERE VOLUNTEER_ID = :NEW.VOLUNTEER_ID;

    -- Check if the current task count is less than 5
    IF current_task_count < 5 THEN
        -- Increment the task count by 1 using a sequence (we just add 1, no need to use sequence here)
        UPDATE VOLUNTEER
        SET TASK_COUNT = TASK_COUNT + 1
        WHERE VOLUNTEER_ID = :NEW.VOLUNTEER_ID;
    ELSE
        -- Raise an error if the task count exceeds 5
        RAISE_APPLICATION_ERROR(-20002, 'Volunteer has exceeded the maximum task limit of 5.');
    END IF;

    -- Update related tables based on the task
    IF :NEW.TASK = 'Donor verification' AND :NEW.PHONE IS NOT NULL THEN
        UPDATE DONOR
        SET VOLUNTEER_ID = :NEW.VOLUNTEER_ID
        WHERE PHONE = :NEW.PHONE;
        
    ELSIF :NEW.TASK = 'Recipient verification' AND :NEW.PHONE IS NOT NULL THEN
        UPDATE RECIPIENT
        SET VOLUNTEER_ID = :NEW.VOLUNTEER_ID
        WHERE PHONE = :NEW.PHONE;
        
    ELSIF :NEW.TASK = 'food verification' AND :NEW.PHONE IS NOT NULL THEN
        UPDATE FOOD
        SET VOLUNTEER_ID = :NEW.VOLUNTEER_ID
        WHERE FOOD_ID = TO_NUMBER(:NEW.PHONE); -- Assuming PHONE field is used to pass FOOD_ID
    END IF;
END;
/






SELECT constraint_name, constraint_type
FROM user_constraints
WHERE table_name = 'ASSIGN' AND owner = 'ADMIN';




delete from assign;




update VOLUNTEER set task_count=3 where VOLUNTEER_ID=2;




update donor set VOLUNTEER_ID=NULL ,VERIFIED= 'Y' where FOOD_ID in(2,4,6,8);
update donor set VOLUNTEER_ID=NULL ,VERIFIED= 'N' where DONOR_ID in(2,4,6,8);

update RECIPIENT set VOLUNTEER_ID=NULL, VERIFIED= 'N' where RECIPIENT_ID in(2,4,6,8);
update food set VOLUNTEER_ID=NULL, VERIFIED= 'N' where FOOD_ID in(2,4,6,8);



UPDATE FOOD
SET EXP_DATE = SYSDATE + 30;







update  food set SELL_OR_DONATE='DONATE',VERIFIED='Y'  WHERE FOOD_ID IN (82,83,84,85)
update  RECEIVES set MANAGER_ID=1,FOOD_ID= 82 where REQ_ID=1;
update  RECEIVES set MANAGER_ID=1,FOOD_ID= 83 where REQ_ID=2;
update  RECEIVES set MANAGER_ID=1,FOOD_ID= 84 where REQ_ID=3;
update  RECEIVES set MANAGER_ID=1,FOOD_ID= 85 where REQ_ID=4;



,83,84,85)

