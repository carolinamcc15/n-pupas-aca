--changeset Nestor:1
--preconditions onFail="MARK_RAN"
--precondition not columnExists schemaName=public tableName=branch columnName=latitude
--precondition not columnExists schemaName=public tableName=branch columnName=longitude
ALTER TABLE public.branch
ADD COLUMN latitude double precision,
ADD COLUMN longitude double precision;