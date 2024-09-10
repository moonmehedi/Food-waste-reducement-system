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
ALTER TABLE VOLUNTEER
ADD AVAILABILITY VARCHAR2(255);
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
    NUMBER_OF_PEOPLE NUMBER,
    VOLUNTEER_ID NUMBER,
    DATE_R DATE,
    VERIFIED CHAR(10),
    FOREIGN KEY (VOLUNTEER_ID) REFERENCES VOLUNTEER(VOLUNTEER_ID)
);

ALTER TABLE VOLUNTEER
ADD AVAILABILITY VARCHAR2(255);

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

ALTER TABLE FOOD
ADD SELL_OR_DONATE VARCHAR2(20);