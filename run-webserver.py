from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return "<p>Hello!</p>"

@app.route('/animatecircle')
def animatecircle():
    return render_template('animateCircles-v1.html')

if __name__ == '__main__':
    app.run(debug=True)
