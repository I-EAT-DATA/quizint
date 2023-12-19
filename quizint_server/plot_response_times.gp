set terminal png
set output 'response_times.png'
set xlabel 'Request Number'
set ylabel 'Response Time (seconds)'
set title 'Response Times for /api/card-data'
plot 'response_times.txt' with lines title 'Response Times'