from bottle import route, run, response
from json import dumps


@route('/get-quiz-question/')
def index():
    # return 200 Success
    response.headers['Content-Type'] = 'application/json'
    response.headers['Cache-Control'] = 'no-cache'
    response.headers['Access-Control-Allow-Origin'] = '*'
    data = dumps({
       "id": 0,
       "text": "A stampede followed the coronation of Tsar Nicholas and his wife, Alexandra, in which an estimated 1,389 people died. What caused it?",
       "imageUrl": "https://placekitten.com/g/64/64",
       "answers": [
          {
             "id": 1,
             "text": "Crowds protesting about the fact that Nicholas had married a German woman"
          },
          {
             "id": 2,
             "text": "Police opening fire when the celebrating crowd would not let the tsar\\'s party through"
          },
          {
             "id": 3,
             "text": "The organisers of a celebratory festival ran out of commemorative cups"
          }
       ],
       "correctAnswerId": 3
    })
    return data

run(host='localhost', port=8080)

