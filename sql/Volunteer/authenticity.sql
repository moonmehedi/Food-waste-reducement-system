set SERVEROUT ON;
CREATE OR REPLACE PROCEDURE update_task_status (
    p_task_id IN NUMBER,
    is_accept IN VARCHAR2,
    req_type IN VARCHAR2
)
IS
BEGIN
    IF is_accept = 'Y' THEN
        IF req_type = 'Donor' THEN
            UPDATE donor 
            SET AUTHENTICITY = 'authentic'
            WHERE DONOR_ID = p_task_id;
        ELSIF req_type = 'Food' THEN
            UPDATE food 
            SET AUTHENTICITY = 'authentic'
            WHERE FOOD_ID = p_task_id;
        ELSIF req_type = 'Recipient' THEN
            UPDATE recipient 
            SET AUTHENTICITY = 'authentic'
            WHERE RECIPIENT_ID = p_task_id;
        END IF;
    ELSE
        IF req_type = 'Donor' THEN
            UPDATE donor 
            SET AUTHENTICITY = 'Not authentic'
            WHERE DONOR_ID = p_task_id;
        ELSIF req_type = 'Food' THEN
            UPDATE food 
            SET AUTHENTICITY = 'Not authentic'
            WHERE FOOD_ID = p_task_id;
        ELSIF req_type = 'Recipient' THEN
            UPDATE recipient 
            SET AUTHENTICITY = 'Not authentic'
            WHERE RECIPIENT_ID = p_task_id;
        END IF;
    END IF;

    COMMIT;
END;
/


BEGIN
    update_task_status(
        p_task_id => 2, 
        is_accept => 'Y', 
        req_type => 'Donor'
    );
END;
/
