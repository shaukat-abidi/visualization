from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return "<p>Hello!</p>"

@app.route('/animatecircle')
def animatecircle():
    return render_template('animateCircles-v1.html')

@app.route('/slider')
def slider():
    return render_template('circleposAndSlider-v1.html')


@app.route('/sliderdropdown')
def sliderdropdown():
    return render_template('circlepos-slider-dropdown-v1.html')

@app.route('/leafletmap')
def leafletmap():
    return render_template('leafletAndGraph-v1.html')

if __name__ == '__main__':
    app.run(debug=True)
