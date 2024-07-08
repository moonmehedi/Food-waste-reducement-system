SELECT
    ROW_NUMBER() OVER (ORDER BY REC.DATE_RECEIVES) AS NO,
    D.INSTITUTION_NAME                             AS DONOR_NAME,
    F.NAME                                         AS FOOD_NAME,
    F.PHOTO                                        AS FOOD_IMAGE,
    F.QUANTITY                                     AS FOOD_QUANTITY,
    F.EXP_DATE,
    R.INSTITUTION_NAME                             AS RECIPIENT_NAME,
    R.INSTITUTION_TYPE
FROM
    RECEIVES  REC,
    DONOR     D,
    FOOD      F,
    RECIPIENT R
WHERE
    REC.FOOD_ID = F.FOOD_ID
    AND REC.RECIPIENT_ID = R.RECIPIENT_ID
    AND REC.FOOD_ID = F.FOOD_ID
    AND F.DONOR_ID=D.DONOR_ID
ORDER BY
    REC.DATE_RECEIVES;

SELECT
    *
FROM
    DONOR;

SELECT
    *
FROM
    RECIPIENT;

SELECT
    *
FROM
    FOOD;