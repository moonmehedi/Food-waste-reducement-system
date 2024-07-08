SELECT
    ID                                                           AS NO,
    EMAIL                                                        AS EMAIL,
    INSTITUTION_TYPE                                             AS INSTITUTION_TYPE,
    INSTITUTION_NAME                                             AS INSTITUTION_NAME,
    PHONE                                                        AS PHONE,
    CONCAT(DISTRICT, ', ', DIVISION, ', ', CITY, ', ', STREETNO) AS ADDRESS,
    DATE                                                         AS DATE
FROM
    DONOR
WHERE
    VERIFIED ='Y';