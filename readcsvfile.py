import csv
data = []
with open('static/energy.csv', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        data.append(row)
print(type(data), len(data))
print(data[0])