#!/bin/bash
set -e

# The postgres image's entrypoint script will create the default database
# specified by POSTGRES_DB (or the user name if it's not set).
# We connect to the default 'postgres' database to create our application-specific databases.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
    CREATE DATABASE $POSTGRES_BLOG_DB;
    CREATE DATABASE $POSTGRES_NOTE_DB;
EOSQL