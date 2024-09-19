set SERVEROUT on;
CREATE OR REPLACE PROCEDURE get_verified_tasks (
    p_volunteer_id IN NUMBER,
    p_results OUT SYS_REFCURSOR
)
IS
BEGIN
    OPEN p_results FOR
        SELECT 
            'Donor' AS Request_Type,
            D.EMAIL AS Email_Address,
            D.STREETNO AS Request_Address,
            D.PHONE,
            D.INSTITUTION_TYPE,
            D.INSTITUTION_NAME,
            D.DATE_D AS Request_Date,
            CASE 
                WHEN D.VERIFIED = 'Y' THEN 'Accepted'
                WHEN D.VERIFIED = 'N' THEN 'Rejected'
                ELSE 'Pending'
            END AS Authenticity,
            D.VOLUNTEER_ID
        FROM 
            DONOR D
        WHERE 
            D.VOLUNTEER_ID = p_volunteer_id
        UNION ALL
        SELECT 
            'Recipient' AS Request_Type,
            R.EMAIL AS Email_Address,
            R.STREETNO AS Request_Address,
            R.PHONE,
            R.INSTITUTION_TYPE,
            R.INSTITUTION_NAME,
            R.DATE_R AS Request_Date,
            CASE 
                WHEN R.VERIFIED = 'Y' THEN 'Accepted'
                WHEN R.VERIFIED = 'N' THEN 'Rejected'
                ELSE 'Pending'
            END AS Authenticity,
            R.VOLUNTEER_ID
        FROM 
            RECIPIENT R
        WHERE
            R.VOLUNTEER_ID = p_volunteer_id
        UNION ALL
        SELECT 
            'Food' AS Request_Type,
            D.EMAIL AS Email_Address,
            D.STREETNO AS Request_Address,
            D.PHONE,
            D.INSTITUTION_TYPE,
            D.INSTITUTION_NAME,
            F.DATE_F AS Request_Date,
            CASE 
                WHEN F.VERIFIED = 'Y' THEN 'Accepted'
                WHEN F.VERIFIED = 'N' THEN 'Rejected'
                ELSE 'Pending'
            END AS Authenticity,
            F.VOLUNTEER_ID
        FROM 
            FOOD F
        JOIN 
            DONOR D ON F.DONOR_ID = D.DONOR_ID
        WHERE
            F.VOLUNTEER_ID = p_volunteer_id;
END;
/



DECLARE
    v_results SYS_REFCURSOR;
    v_request_type VARCHAR2(100);
    v_email_address VARCHAR2(100);
    v_request_address VARCHAR2(100);
    v_phone VARCHAR2(100);
    v_institution_type VARCHAR2(100);
    v_institution_name VARCHAR2(100);
    v_request_date DATE;
    v_authenticity VARCHAR2(20);  -- New field for authenticity status
    v_volunteer_id NUMBER;
BEGIN
    -- Call the procedure with a SYS_REFCURSOR output parameter
    get_verified_tasks(2, v_results);  -- Using the procedure with the modified SQL query

    -- Fetch rows from the cursor and print each row
    LOOP
        FETCH v_results INTO 
            v_request_type, 
            v_email_address, 
            v_request_address, 
            v_phone, 
            v_institution_type, 
            v_institution_name, 
            v_request_date, 
            v_authenticity,  -- Fetch the authenticity field
            v_volunteer_id;

        EXIT WHEN v_results%NOTFOUND;

        -- Print or process fetched data
        DBMS_OUTPUT.PUT_LINE(
            v_request_type || ' | ' || 
            v_email_address || ' | ' || 
            v_request_address || ' | ' || 
            v_phone || ' | ' || 
            v_institution_type || ' | ' || 
            v_institution_name || ' | ' || 
            TO_CHAR(v_request_date, 'DD-MON-YYYY') || ' | ' || 
            v_authenticity || ' | ' ||  -- Print the authenticity field
            v_volunteer_id
        );
    END LOOP;

    -- Close the cursor after fetching data
    CLOSE v_results;
END;
/
