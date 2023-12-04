SELECT MIN(code_name_x) as name, origin_airport, MIN(lat_x) as latitude, MIN(long_x) as longitude, COUNT(*) AS total_flights, SUM(CASE WHEN departure_delay > 15 THEN 1 ELSE 0 END) AS delayed_flights_count 
FROM aerocast.final_data
GROUP BY origin_airport;
