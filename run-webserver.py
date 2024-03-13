from flask import Flask, render_template, send_from_directory

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
    return render_template('leafletAndGraph-v3.html')

@app.route('/leafletd3')
def leafletd3():
    return render_template('leafletAndD3-v1.html')

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/data/<path:filename>')
def download_file(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)
