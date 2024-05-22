from flask import Flask, render_template, send_from_directory, jsonify
import json
import csv

app = Flask(__name__)

@app.route('/')
def index():
    return "<p>Hello!</p>"

@app.route('/observableplot')
def observableplot():
    return render_template('observablePlot-v3.html')

@app.route('/animatedTreemap')
def animatedTreemap():
    return render_template('animatedTreemap.html')

@app.route('/loadDataFetchApi')
def loadDataFetchApi():
    return render_template('loadDataFetchApi.html')

@app.route('/animatecircle')
def animatecircle():
    return render_template('animateCircles-v1.html')

@app.route('/slider')
def slider():
    return render_template('circleposAndSlider-v1.html')

@app.route('/forceDirectedGraph')
def forceDirectedGraph():
    return render_template('forceDirectedGraph.html')

@app.route('/sankeyComponent')
def sankeyComponent():
    return render_template('animatedSankeyPlot.html')

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

@app.route('/jsondata')
def get_jsondata():
    with open('static/sankeyDataMedYearly.json') as json_file:
        data = json.load(json_file)
    return jsonify(data)

@app.route('/csvdata')
def get_csvdata():
    data = []
    with open('static/mh_data.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data

if __name__ == '__main__':
    app.run(debug=True)
