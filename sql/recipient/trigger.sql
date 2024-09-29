
--trigger creation for counting more than 2 times for receive tables with procedure

CREATE OR REPLACE PROCEDURE check_daily_requests(
    p_recipient_id IN RECEIVES.RECIPIENT_ID%TYPE,
    p_REQ_DATE IN RECEIVES.REQ_DATE%TYPE
)
AS
    request_count NUMBER;
BEGIN
    -- Raise error for past dates
    IF trunc(p_REQ_DATE) < trunc(SYSDATE) THEN
        RAISE_APPLICATION_ERROR(-20002, 'You cannot request food for a previous date.');
    END IF;

    -- Check if the recipient has requested more than 2 times today
    SELECT COUNT(*)
    INTO request_count
    FROM RECEIVES
    WHERE RECIPIENT_ID = p_recipient_id
      AND TRUNC(ORDER_DATE) = TRUNC(SYSDATE);
      
    IF request_count >= 10 THEN
        RAISE_APPLICATION_ERROR(-20001, 'You cannot request food more than 2 times in a day.');
    END IF;
END;


    --trigger call

CREATE OR REPLACE TRIGGER limit_daily_requests
BEFORE INSERT ON RECEIVES
FOR EACH ROW
BEGIN
    check_daily_requests(:NEW.RECIPIENT_ID, :NEW.REQ_DATE);
END;







--view crearion


CREATE OR REPLACE VIEW recipient_requests_today AS
SELECT
    r.EMAIL AS "email",
    rc.NUMBER_OF_PEOPLE AS "numberOfPeople",
    TO_CHAR(rc.REQ_DATE, 'YYYY-MM-DD') AS "date",
    CASE
        WHEN rc.MANAGER_ID IS NULL AND rc.FOOD_ID IS NULL THEN 'Pending'
        ELSE 'Assigned'
    END AS "status"
FROM
    RECIPIENT r
JOIN
    RECEIVES rc ON r.RECIPIENT_ID = rc.RECIPIENT_ID
WHERE
    rc.REQ_DATE >= TRUNC(SYSDATE)
    AND rc.NUMBER_OF_PEOPLE IS NOT NULL
ORDER BY
    rc.REQ_DATE DESC;
