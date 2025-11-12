# nodoLab

## cronjobs

0 3 21 * * psql -U usuario -d database -c "CALL optimize_db();"
