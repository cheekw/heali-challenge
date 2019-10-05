import json
import requests

# api-endpoint 
url = 'https://2vdqlmfjbk.execute-api.us-west-2.amazonaws.com/dev/menuimage'
image_path = 'https://heali-interview-screening.s3.amazonaws.com'
file_path = './data/menuIDs.json'
headers = {'content-type': 'application/json'}

with open(file_path) as json_file:
    json_content = json.load(json_file)
    for i in range(len(json_content)):
        for menu_id in json_content[i]:
            params = { 'menuId': menu_id, 'menuImage': image_path + '/' + json_content[i][menu_id] } 
            response = requests.post(url=url, headers=headers, json=params)
            print(response)