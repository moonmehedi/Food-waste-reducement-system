
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
    where VERIFIED='N'
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
    where VERIFIED='N';


--tells about availabel volunteer

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
where AVAILABILITY='Free';


SELECT * FROM available_volunteer;



update VOLUNTEER set AVAILABILITY='Free' where VOLUNTEER_ID IN (1,2,3,4,5);


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
    F.VERIFIED = 'N' AND D.VERIFIED = 'Y'
    and f.food_id not in (select food_id from receives); 


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
    volunteerNumber NUMBER
) RETURN NUMBER
IS
    Id NUMBER;
    hi varchar(20);
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
ID:=getVolunteerId(6667778888);
dbms_output.put_line(ID);
END;
/









CREATE OR REPLACE TRIGGER update_volunteer_on_task
AFTER INSERT ON ASSIGN
FOR EACH ROW
BEGIN
    -- Case 1: If task is 'Donor verification' and phone is provided
    IF :NEW.TASK = 'Donor verification' AND :NEW.PHONE IS NOT NULL THEN
        UPDATE DONOR
        SET VOLUNTEER_ID = :NEW.VOLUNTEER_ID
        WHERE PHONE = :NEW.PHONE;
        
    -- Case 2: If task is 'Recipient verification' and phone is provided
    ELSIF :NEW.TASK = 'Recipient verification' AND :NEW.PHONE IS NOT NULL THEN
        UPDATE RECIPIENT
        SET VOLUNTEER_ID = :NEW.VOLUNTEER_ID
        WHERE PHONE = :NEW.PHONE;
        
    -- Case 3: If task is 'Food verification' and food ID is given in the phone field
    ELSIF :NEW.TASK = 'food verification' AND :NEW.PHONE IS NOT NULL THEN
        UPDATE FOOD
        SET VOLUNTEER_ID = :NEW.VOLUNTEER_ID
        WHERE FOOD_ID = TO_NUMBER(:NEW.PHONE); -- Assuming PHONE field is used to pass FOOD_ID
    END IF;
END;
/

