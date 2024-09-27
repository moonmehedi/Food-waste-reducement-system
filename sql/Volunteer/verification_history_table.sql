SET SERVEROUTPUT ON;

CREATE OR REPLACE PROCEDURE get_verified_tasks (
    p_volunteer_id IN NUMBER,
    p_results OUT SYS_REFCURSOR
)
IS
BEGIN
    OPEN p_results FOR
        -- Donor section
        SELECT 
            D.DONOR_ID AS ID,
            'Donor' AS Request_Type,
            D.EMAIL AS Email_Address,
            D.STREETNO AS Request_Address,
            D.PHONE,
            D.INSTITUTION_TYPE,
            D.INSTITUTION_NAME,
            D.DATE_D AS Request_Date,
            D.AUTHENTICITY
        FROM 
            DONOR D
        WHERE 
            D.VOLUNTEER_ID = p_volunteer_id 
            AND (D.VERIFIED = 'Y' OR D.VERIFIED = 'N')
            AND (D.AUTHENTICITY = 'authentic' or D.AUTHENTICITY = 'Not authentic')
        
        UNION ALL
        
        -- Recipient section
        SELECT 
            R.RECIPIENT_ID AS ID,
            'Recipient' AS Request_Type,
            R.EMAIL AS Email_Address,
            R.STREETNO AS Request_Address,
            R.PHONE,
            R.INSTITUTION_TYPE,
            R.INSTITUTION_NAME,
            R.DATE_R AS Request_Date,
            R.AUTHENTICITY
        FROM 
            RECIPIENT R
        WHERE
            R.VOLUNTEER_ID = p_volunteer_id 
            AND (R.VERIFIED = 'Y' OR R.VERIFIED = 'N')
            AND (R.AUTHENTICITY = 'authentic' or R.AUTHENTICITY = 'Not authentic')
        
        UNION ALL
        
        -- Food section
        SELECT 
            F.FOOD_ID AS ID,
            'Food' AS Request_Type,
            D.EMAIL AS Email_Address,
            D.STREETNO AS Request_Address,
            D.PHONE,
            D.INSTITUTION_TYPE,
            D.INSTITUTION_NAME,
            F.DATE_F AS Request_Date,
            F.AUTHENTICITY
        FROM 
            FOOD F
        JOIN 
            DONOR D ON F.DONOR_ID = D.DONOR_ID
        WHERE
            F.VOLUNTEER_ID = p_volunteer_id
            AND (F.VERIFIED = 'Y' OR F.VERIFIED = 'N')
            AND (F.AUTHENTICITY = 'authentic' or F.AUTHENTICITY = 'Not authentic');
END;
/


SET SERVEROUTPUT ON;

DECLARE
    v_results SYS_REFCURSOR;
    v_id NUMBER;
    v_request_type VARCHAR2(100);
    v_email_address VARCHAR2(100);
    v_request_address VARCHAR2(100);
    v_phone VARCHAR2(100);
    v_institution_type VARCHAR2(100);
    v_institution_name VARCHAR2(100);
    v_request_date DATE;
    v_authenticity VARCHAR2(20);  -- Field for authenticity status
BEGIN
    -- Call the procedure with volunteer_id = 2
    get_verified_tasks(2, v_results);

    -- Fetch rows from the cursor and print each row
    LOOP
        FETCH v_results INTO
            v_id,
            v_request_type,
            v_email_address,
            v_request_address,
            v_phone,
            v_institution_type,
            v_institution_name,
            v_request_date,
            v_authenticity;

        EXIT WHEN v_results%NOTFOUND;

        -- Print or process fetched data
        DBMS_OUTPUT.PUT_LINE(
            'ID: ' || v_id || ' | ' ||
            'Type: ' || v_request_type || ' | ' ||
            'Email: ' || v_email_address || ' | ' ||
            'Address: ' || v_request_address || ' | ' ||
            'Phone: ' || v_phone || ' | ' ||
            'Institution Type: ' || v_institution_type || ' | ' ||
            'Institution Name: ' || v_institution_name || ' | ' ||
            'Date: ' || TO_CHAR(v_request_date, 'DD-MON-YYYY') || ' | ' ||
            'Authenticity: ' || v_authenticity
        );
    END LOOP;

    -- Close the cursor after fetching data
    CLOSE v_results;
END;
/
