-- Create Manager table
CREATE TABLE MANAGER (
    MANAGER_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    EMAIL VARCHAR2(50) CONSTRAINT MANAGER_EMAIL_FORMAT CHECK (REGEXP_LIKE(EMAIL, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')),
    PASSWORD VARCHAR2(50),
    NAME VARCHAR2(40),
    DATE_OF_BIRTH DATE,
    CITY VARCHAR2(40),
    DISTRICT VARCHAR2(40),
    DIVISION VARCHAR2(40),
    STREETNO VARCHAR2(20),
    PHONE VARCHAR2(20)
);

-- Create Volunteer table
CREATE TABLE VOLUNTEER (
    VOLUNTEER_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    EMAIL VARCHAR2(50) CONSTRAINT VOLUNTEER_EMAIL_FORMAT CHECK (REGEXP_LIKE(EMAIL, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')),
    PASSWORD VARCHAR2(100),
    NAME VARCHAR2(40),
    DATE_OF_BIRTH DATE,
    CITY VARCHAR2(40),
    DISTRICT VARCHAR2(40),
    DIVISION VARCHAR2(40),
    STREETNO VARCHAR2(20),
    PHONE VARCHAR2(20)
);
ALTER TABLE Volunteer
ADD AVAILABILITY VARCHAR(255);

--availability changed to task count
ALTER TABLE VOLUNTEER
RENAME COLUMN AVAILABILITY TO TASK_COUNT;

--changing count
ALTER TABLE VOLUNTEER
MODIFY TASK_COUNT NUMBER DEFAULT 0;





-- Create Assign table
CREATE TABLE ASSIGN (
    MANAGER_ID NUMBER,
    VOLUNTEER_ID NUMBER,
    PRIMARY KEY (MANAGER_ID, VOLUNTEER_ID),
    FOREIGN KEY (MANAGER_ID) REFERENCES MANAGER(MANAGER_ID),
    FOREIGN KEY (VOLUNTEER_ID) REFERENCES VOLUNTEER(VOLUNTEER_ID)
);
--adding task to the assign table 
ALTER TABLE ASSIGN
ADD task VARCHAR(50); 
ALTER TABLE ASSIGN
MODIFY TASK VARCHAR2(50);
--adding phn column
ALTER TABLE ASSIGN
ADD PHONE VARCHAR2(20);


--drop PRIMARY key constraint from this table
ALTER TABLE "ADMIN"."ASSIGN"
DROP CONSTRAINT SYS_C007588;


--



-- Create Donor table
CREATE TABLE DONOR (
    DONOR_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    EMAIL VARCHAR2(50) CONSTRAINT DONOR_EMAIL_FORMAT CHECK (REGEXP_LIKE(EMAIL, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')),
    PASSWORD VARCHAR2(100),
    INSTITUTION_NAME VARCHAR2(40),
    INSTITUTION_TYPE VARCHAR2(50),
    CITY VARCHAR2(40),
    DISTRICT VARCHAR2(40),
    DIVISION VARCHAR2(40),
    STREETNO VARCHAR2(20),
    PHONE VARCHAR2(20),
    VERIFIED CHAR(10),
    POINTS NUMBER,
    VOLUNTEER_ID NUMBER,
    DATE_D DATE,
    FOREIGN KEY (VOLUNTEER_ID) REFERENCES VOLUNTEER(VOLUNTEER_ID)
);



-- Add AUTHENTICITY column to the DONOR table
ALTER TABLE DONOR
ADD AUTHENTICITY VARCHAR2(20) DEFAULT 'pending';




-- Create Food table
CREATE TABLE FOOD (
    FOOD_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    NAME VARCHAR2(40),
    QUANTITY NUMBER,
    EXP_DATE DATE,
    PHOTO BLOB, -- Changed from VARCHAR2 to BLOB for storing images
    VERIFIED CHAR(10),
    VOLUNTEER_ID NUMBER,
    DONOR_ID NUMBER,
    DATE_F DATE,
    FOREIGN KEY (VOLUNTEER_ID) REFERENCES VOLUNTEER(VOLUNTEER_ID),
    FOREIGN KEY (DONOR_ID) REFERENCES DONOR(DONOR_ID)
);


-- Add AUTHENTICITY column to the food table
ALTER TABLE food
ADD AUTHENTICITY VARCHAR2(20) DEFAULT 'pending';



-- do you want to donate or sell 
ALTER TABLE FOOD
ADD SELL_OR_DONATE VARCHAR2(20);
-- Create Get_point table
CREATE TABLE GET_POINT (
    DONOR_ID NUMBER,
    FOOD_ID NUMBER,
    POINTS NUMBER,
    PRIMARY KEY (DONOR_ID, FOOD_ID),
    FOREIGN KEY (DONOR_ID) REFERENCES DONOR(DONOR_ID),
    FOREIGN KEY (FOOD_ID) REFERENCES FOOD(FOOD_ID)
);

-- Add AUTHENTICITY column to the food table
ALTER TABLE food
ADD AUTHENTICITY VARCHAR2(20) DEFAULT 'pending';

-- Create VulnerableCitizen table
CREATE TABLE CUSTOMER(
    NID NUMBER PRIMARY KEY,
    NAME VARCHAR2(40),
    DATE_OF_BIRTH DATE,
    CITY VARCHAR2(40),
    DISTRICT VARCHAR2(40),
    DIVISION VARCHAR2(40),
    STREETNO VARCHAR2(20),
    PHONE VARCHAR2(20)
);

ALTER TABLE CUSTOMER ADD COLUMN PASSWORD VARCHAR2(255) NOT NULL;

-- Create Sells table
CREATE TABLE SELLS (
    DONOR_ID NUMBER,
    NID NUMBER,
    FOOD_ID NUMBER,
    ORIGINAL_PRICE NUMBER,
    DISCOUNTED_PRICE NUMBER,
    DATE_S DATE,
    PRIMARY KEY (DONOR_ID, NID, FOOD_ID),
    FOREIGN KEY (DONOR_ID) REFERENCES DONOR(DONOR_ID),
    FOREIGN KEY (NID) REFERENCES VULNERABLECITIZEN(NID),
    FOREIGN KEY (FOOD_ID) REFERENCES FOOD(FOOD_ID)
);


ALTER TABLE SELLS
ADD Order_Status VARCHAR2(8) DEFAULT NULL;

--droping constraint
SELECT constraint_name
FROM user_cons_columns
WHERE table_name = 'SELLS' AND column_name = 'NID';

--drop constraint

ALTER TABLE SELLS DROP CONSTRAINT SYS_C007603;
ALTER TABLE SELLS DROP CONSTRAINT SYS_C007605;

--MODIFY to NULL
ALTER TABLE SELLS MODIFY NID NULL;


-- Create Recipient table
CREATE TABLE RECIPIENT (
    RECIPIENT_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    EMAIL VARCHAR2(50) CONSTRAINT RECIPIENT_EMAIL_FORMAT CHECK (REGEXP_LIKE(EMAIL, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')),
    PASSWORD VARCHAR2(100),
    INSTITUTION_NAME VARCHAR2(40),
    INSTITUTION_TYPE VARCHAR2(50),
    CITY VARCHAR2(40),
    DISTRICT VARCHAR2(40),
    DIVISION VARCHAR2(40),
    STREETNO VARCHAR2(20),
    PHONE VARCHAR2(20),
    VOLUNTEER_ID NUMBER,
    DATE_R DATE,
    VERIFIED CHAR(10),
    FOREIGN KEY (VOLUNTEER_ID) REFERENCES VOLUNTEER(VOLUNTEER_ID)
);



--alter table recipient
alter table RECIPIENT
drop column NUMBER_OF_PEOPLE;


--status added
ALTER TABLE RECIPIENT
Add Status VARCHAR2(20) DEFAULT 'Pending';





-- Add AUTHENTICITY column to the RECIPIENT table
ALTER TABLE RECIPIENT
ADD AUTHENTICITY VARCHAR2(20) DEFAULT 'pending';




--alter table recipient
alter table RECIPIENT
drop column NUMBER_OF_PEOPLE;


--status added
ALTER TABLE RECIPIENT
Add Status VARCHAR2(20) DEFAULT 'Pending';





-- Add AUTHENTICITY column to the RECIPIENT table
ALTER TABLE RECIPIENT
ADD AUTHENTICITY VARCHAR2(20) DEFAULT 'pending';




-- Create Receives table
CREATE TABLE RECEIVES (
    MANAGER_ID NUMBER,
    FOOD_ID NUMBER,
    RECIPIENT_ID NUMBER,
    DATE_RECEIVES DATE,
    FOREIGN KEY (MANAGER_ID) REFERENCES MANAGER(MANAGER_ID),
    FOREIGN KEY (FOOD_ID) REFERENCES FOOD(FOOD_ID),
    FOREIGN KEY (RECIPIENT_ID) REFERENCES RECIPIENT(RECIPIENT_ID)
);
alter table RECEIVES
add req_id NUMBER generated by default as  identity  primary key ;

alter table RECEIVES
add  NUMBER_OF_PEOPLE NUMBER

alter table RECEIVES
add order_date date
--virtual coloumn

ALTER TABLE RECEIVES
ADD status VARCHAR2(20) GENERATED ALWAYS AS (
    CASE
        WHEN MANAGER_ID IS NULL AND FOOD_ID IS NULL THEN 'Pending'
        ELSE 'Assigned'
    END
) VIRTUAL;


--contacts table
select *from CONTACT
CREATE TABLE CONTACT(
 EMAIL VARCHAR2(50) CONSTRAINT CONTACT CHECK (REGEXP_LIKE(EMAIL, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')),
     PHONE VARCHAR2(20),
    MESSAGE VARCHAR2(500)


);



alter table RECEIVES
add  NUMBER_OF_PEOPLE NUMBER;

alter table RECEIVES
add  received_amount NUMBER;

--req date
ALTER TABLE RECEIVES
RENAME COLUMN DATE_RECEIVES TO REQ_DATE;


ALTER TABLE RECEIVES
MODIFY received_amount NUMBER DEFAULT 0;

--request id
ALTER TABLE RECEIVES
ADD REQ_ID NUMBER;

--generate request id
CREATE SEQUENCE RECEIVES_SEQ
START WITH 1
INCREMENT BY 1
NOCACHE
NOCYCLE;



-- Drop PRIMARY key constraint from the RECEIVES table
ALTER TABLE RECEIVES
DROP CONSTRAINT SYS_C007611;


CREATE TABLE ORDERS (
    ORDER_ID NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    NID NUMBER,  -- Customer NID
    FOOD_ID NUMBER,  -- ID of the food ordered
    DONOR_NAME VARCHAR2(100),  -- Seller/Donor name
    QUANTITY NUMBER,  -- Quantity ordered
    ORDER_STATUS VARCHAR2(20) DEFAULT 'PENDING',  -- Either 'PENDING' or 'FINISHED'
    ORDER_DATE DATE DEFAULT SYSDATE,  -- Date of the order
    FOREIGN KEY (FOOD_ID) REFERENCES FOOD(FOOD_ID)
);

desc donor;

DROP TABLE MANAGER CASCADE CONSTRAINTS;

DROP TABLE MOON CASCADE CONSTRAINTS;

DROP TABLE VOLUNTEER CASCADE CONSTRAINTS;

DROP TABLE ASSIGN CASCADE CONSTRAINTS;

DROP TABLE DONOR CASCADE CONSTRAINTS;

DROP TABLE FOOD CASCADE CONSTRAINTS;

DROP TABLE GET_POINT CASCADE CONSTRAINTS;

DROP TABLE CUSTOMER CASCADE CONSTRAINTS;

DROP TABLE SELLS CASCADE CONSTRAINTS;

DROP TABLE RECIPIENT CASCADE CONSTRAINTS;

DROP TABLE RECEIVES CASCADE CONSTRAINTS;

DROP TABLE ORDERS CASCADE CONSTRAINTS;

SELECT
    *
FROM
    MANAGER;

SELECT
    *
FROM
    VOLUNTEER;

SELECT
    *
FROM
    ASSIGN;

SELECT
    *
FROM
    DONOR;

SELECT
    *
FROM
    FOOD;

SELECT
    *
FROM
    GET_POINT;

SELECT
    *
FROM
    CUSTOMER;

SELECT
    *
FROM
    SELLS;

SELECT
    *
FROM
    RECIPIENT;

SELECT
    *
FROM
    RECEIVES;

SELECT
    *
FROM
     ORDERS;

SELECT
    'DROP TABLE '
    || TABLE_NAME
    || ' CASCADE CONSTRAINTS;'
FROM
    USER_TABLES;

SELECT
    'SELECT * FROM '
    || TABLE_NAME
    || ';'
FROM
    USER_TABLES;

CONNECT admin/admin@localhost:8080




update RECEIVES set REQ_ID=RECEIVES_SEQ.nextval