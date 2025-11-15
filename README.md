# nodoLab

## cronjobs

0 3 21 * * psql -U usuario -d database -c "CALL optimize_db();"
59 23 * * * psql -U usuario -d database -c "CALL generar_factura_diaria();"
58 23 * * * [ "$(date -d tomorrow +\%d)" == "01" ] && psql -U usuario -d database -c "CALL generar_factura_mensual();"

