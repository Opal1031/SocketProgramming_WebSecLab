from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

messages = []  # 임시 메모리 저장소

@app.route('/api/messages', methods=['GET', 'POST'])
def messages_api():
    if request.method == 'GET':
        return jsonify(messages)
    elif request.method == 'POST':
        data = request.get_json()
        msg = data.get('message', '')
        # TODO: 입력값 검증 및 보안 처리
        messages.append(msg)
        socketio.emit('new_message', msg)
        return jsonify({'result': 'ok'})

@socketio.on('send_message')
def handle_send_message(msg):
    # TODO: 입력값 검증 및 보안 처리
    messages.append(msg)
    emit('new_message', msg, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
