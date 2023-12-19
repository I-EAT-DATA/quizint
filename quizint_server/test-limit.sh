cat /dev/null > response_times.txt
for i in {1..100}; do
  curl -X POST -d '{"quizletId": "720142456"}' -H "Content-Type: application/json" -s -o /dev/null -w '%{time_total}\n' http://127.0.0.1:8080/api/card-data >> response_times.txt
done
gnuplot plot_response_times.gp