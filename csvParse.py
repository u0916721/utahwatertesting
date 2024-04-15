import csv
def get_second_column(file_path):
    with open(file_path, 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        second_column_values = [row[1] for row in csvreader]
        return second_column_values

file_path = 'utahCities.csv'
second_column_values = get_second_column(file_path)
print(second_column_values)
