set SERVEROUT on;
CREATE OR REPLACE PROCEDURE get_assigned_tasks (
    p_volunteer_id IN NUMBER,
    p_results OUT SYS_REFCURSOR
)
IS
BEGIN
    OPEN p_results FOR
        SELECT 
            D.DONOR_ID as ID,
            'Donor' AS Request_Type,
            D.EMAIL AS Email_Address,
            D.STREETNO AS Request_Address,
            D.PHONE,
            D.INSTITUTION_TYPE,
            D.INSTITUTION_NAME,
            D.DATE_D AS Request_Date,
            D.VOLUNTEER_ID
        FROM 
            DONOR D
        WHERE 
            D.VOLUNTEER_ID = p_volunteer_id AND D.VERIFIED = 'N'
            AND D.authenticity='pending'
        UNION ALL
        SELECT 
            R.RECIPIENT_ID AS ID,
            'Recipient' AS Request_Type,
            R.EMAIL AS Email_Address,
            R.STREETNO AS Request_Address,
            R.PHONE,
            R.INSTITUTION_TYPE,
            R.INSTITUTION_NAME,
            R.DATE_R AS Request_Date,
            R.VOLUNTEER_ID
        FROM 
            RECIPIENT R
        WHERE
            R.VOLUNTEER_ID = p_volunteer_id AND R.VERIFIED = 'N'
            AND R.authenticity='pending'
        UNION ALL
        SELECT 
        F.FOOD_ID AS ID,
            'Food' AS Request_Type,
            D.EMAIL AS Email_Address,
            D.STREETNO AS Request_Address,
            D.PHONE,
            D.INSTITUTION_TYPE,
            D.INSTITUTION_NAME,
            F.DATE_F AS Request_Date,
            F.VOLUNTEER_ID
        FROM 
            FOOD F
        JOIN 
            DONOR D ON F.DONOR_ID = D.DONOR_ID
        WHERE
            F.VOLUNTEER_ID = p_volunteer_id AND 
            F.VERIFIED = 'N'
             AND F.authenticity='pending';
END;
/



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
    v_volunteer_id NUMBER;
BEGIN
    -- Call the procedure with a SYS_REFCURSOR output parameter
    get_assigned_tasks(2, v_results);

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
            v_volunteer_id
        );
    END LOOP;

    -- Close the cursor after fetching data
    CLOSE v_results;
END;
/





--modified

CREATE OR REPLACE PROCEDURE get_assigned_tasks (
    p_volunteer_id IN NUMBER,
    p_searchTerm IN VARCHAR2,   -- New parameter for dynamic searching
    p_results OUT SYS_REFCURSOR
)
IS
BEGIN
    OPEN p_results FOR
        SELECT 
            D.DONOR_ID AS ID,
            'Donor' AS Request_Type,
            D.EMAIL AS Email_Address,
            D.STREETNO AS Request_Address,
            D.PHONE,
            D.INSTITUTION_TYPE,
            D.INSTITUTION_NAME,
            D.DATE_D AS Request_Date,
            D.VOLUNTEER_ID
        FROM 
            DONOR D
        WHERE 
            D.VOLUNTEER_ID = p_volunteer_id 
            AND D.VERIFIED = 'N'
            AND D.authenticity = 'pending'
            AND (COALESCE(LOWER(p_searchTerm), '') = '' OR 
                 LOWER(D.EMAIL) LIKE '%' || LOWER(p_searchTerm) || '%' 
                 OR LOWER(D.INSTITUTION_NAME) LIKE '%' || LOWER(p_searchTerm) || '%'
                 OR LOWER(D.PHONE) LIKE '%' || LOWER(p_searchTerm) || '%'
                 OR LOWER('Donor') LIKE LOWER(p_searchTerm))  -- Check if p_searchTerm is 'food'
        UNION ALL
        SELECT 
            R.RECIPIENT_ID AS ID,
            'Recipient' AS Request_Type,
            R.EMAIL AS Email_Address,
            R.STREETNO AS Request_Address,
            R.PHONE,
            R.INSTITUTION_TYPE,
            R.INSTITUTION_NAME,
            R.DATE_R AS Request_Date,
            R.VOLUNTEER_ID
        FROM 
            RECIPIENT R
        WHERE
            R.VOLUNTEER_ID = p_volunteer_id 
            AND R.VERIFIED = 'N'
            AND R.authenticity = 'pending'
            AND (COALESCE(LOWER(p_searchTerm), '') = '' OR
                 LOWER(R.EMAIL) LIKE '%' || LOWER(p_searchTerm) || '%' 
                 OR LOWER(R.INSTITUTION_NAME) LIKE '%' || LOWER(p_searchTerm) || '%'
                 OR LOWER(R.PHONE) LIKE '%' || LOWER(p_searchTerm) || '%'
                 OR LOWER('Recipient') LIKE LOWER(p_searchTerm))  -- Check if p_searchTerm is 'recipient'
        UNION ALL
        SELECT 
            F.FOOD_ID AS ID,
            'Food' AS Request_Type,
            D.EMAIL AS Email_Address,
            D.STREETNO AS Request_Address,
            D.PHONE,
            D.INSTITUTION_TYPE,
            D.INSTITUTION_NAME,
            F.DATE_F AS Request_Date,
            F.VOLUNTEER_ID
        FROM 
            FOOD F
        JOIN 
            DONOR D ON F.DONOR_ID = D.DONOR_ID
        WHERE
            F.VOLUNTEER_ID = p_volunteer_id 
            AND F.VERIFIED = 'N'
            AND F.authenticity = 'pending'
            AND (COALESCE(LOWER(p_searchTerm), '') = '' OR 
                 LOWER(D.EMAIL) LIKE '%' || LOWER(p_searchTerm) || '%' 
                 OR LOWER(D.INSTITUTION_NAME) LIKE '%' || LOWER(p_searchTerm) || '%'
                 OR LOWER(D.PHONE) LIKE '%' || LOWER(p_searchTerm) || '%'
                 OR LOWER('Food') LIKE LOWER(p_searchTerm));  -- Check if p_searchTerm is 'food'
END;
/






update donor set VERIFIED='N' ,AUTHENTICITY='pending' ,VOLUNTEER_ID=2  where DONOR_ID  in(1,5,7,9);
update food set VERIFIED='N' ,AUTHENTICITY='pending' ,VOLUNTEER_ID=2  where food_ID  in(1,5,7,9);
update recipient set VERIFIED='N' ,AUTHENTICITY='pending', VOLUNTEER_ID=2 where  recipient_ID  in(1,5,7,9);