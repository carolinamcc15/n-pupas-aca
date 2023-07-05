--liquibase formatted sql

--changeset Nestor:2
--preconditions onFail="MARK_RAN"
--precondition not columnDataType schemaName=public tableName=schedule columnName=opening_time columnDataType=text
--precondition not columnDataType schemaName=public tableName=schedule columnName=closing_time columnDataType=text
ALTER TABLE public.schedule
    ALTER COLUMN opening_time TYPE text COLLATE pg_catalog."default",
    ALTER COLUMN closing_time TYPE text COLLATE pg_catalog."default";