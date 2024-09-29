CREATE OR REPLACE VIEW TOTAL_REQUEST AS
    SELECT
        (
            SELECT
                COUNT(*)
            FROM
                DONOR
            WHERE
                VERIFIED = 'N'
        ) + (
            SELECT
                COUNT(*)
            FROM
                RECIPIENT
            WHERE
                VERIFIED = 'N'
        ) + (
            SELECT
                COUNT(*)
            FROM
                FOOD
            WHERE
                VERIFIED = 'N'
        ) AS TOTAL_VERIFIED_COUNT
    FROM
        DUAL;

-- OVER ALL INFO

CREATE OR REPLACE VIEW FETCH_INFO AS
    SELECT
        (
            SELECT
                TOTAL_VERIFIED_COUNT
            FROM
                TOTAL_REQUEST
        ) AS TOTAL_REQUEST,
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
                FOOD
            WHERE
                VERIFIED = 'Y'
        ) AS NUMBER_OF_AVAILABLE_FOODS
    FROM
        DUAL;

SELECT
    *
FROM
    FETCH_INFO;