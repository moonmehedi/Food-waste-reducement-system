



--updated

CREATE OR REPLACE VIEW TOTAL_REQUEST AS
    SELECT 
        (SELECT COUNT(*) FROM COMBINEDREQUEST) +
        (SELECT COUNT(*) FROM DONOR_FOOD_DONATION_REQUEST) 
        AS TOTAL_VERIFIED_COUNT
    FROM DUAL;

select * from TOTAL_REQUEST;

CREATE OR REPLACE VIEW TOTAL_PENDING_REQUEST AS
    SELECT 
        (SELECT COUNT(*) FROM COMBINEDPENDINGREQUEST) +
        (SELECT COUNT(*) FROM DONOR_FOOD_DONATION_PENDING_REQUEST) 
        AS TOTAL_PENDING_REQUEST_COUNT
    FROM DUAL;



SELECT COUNT(*) FROM DONOR_FOOD_DONATION_PENDING_REQUEST;




-- OVER ALL INFO
CREATE OR REPLACE VIEW FETCH_INFO AS
    SELECT
        (
            SELECT
                TOTAL_VERIFIED_COUNT
            FROM
                TOTAL_REQUEST
        ) AS TOTAL_VERIFIED_REQUESTS,
        (
            SELECT
                COUNT(*)
            FROM
                VOLUNTEER
        ) AS PRESENT_VOLUNTEERS,
        (
            SELECT
                COUNT(*)
            FROM
                DONOR
            WHERE
                VERIFIED = 'Y'
        ) AS TOTAL_VERIFIED_DONORS,
        (
            SELECT
                COUNT(*)
            FROM
                RECIPIENT
            WHERE
                VERIFIED = 'Y'
        ) AS TOTAL_VERIFIED_RECIPIENTS,
        (
            SELECT
                COUNT(*)
            FROM
                DONOR_CURRENT_FOOD_VIEW
        ) AS NUMBER_OF_AVAILABLE_FOODS,
        (
            SELECT
                TOTAL_PENDING_REQUEST_COUNT
            FROM
                TOTAL_PENDING_REQUEST
        ) AS TOTAL_PENDING_REQUESTS
    FROM
        DUAL;


SELECT
    *
FROM
    FETCH_INFO;



SELECT * FROM FETCH_INFO;