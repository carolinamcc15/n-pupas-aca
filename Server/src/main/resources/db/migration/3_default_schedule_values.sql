--changeset Nestor:3
--preconditions onFail="MARK_RAN"
--precondition not columnValueIsNull schemaName=public tableName=schedule columnName=opening_time
--precondition not columnValueIsNull schemaName=public tableName=schedule columnName=closing_time
UPDATE public.schedule
SET opening_time = COALESCE(opening_time, '09:00'),
    closing_time = COALESCE(closing_time, '17:00')
WHERE opening_time IS NULL OR closing_time IS NULL;