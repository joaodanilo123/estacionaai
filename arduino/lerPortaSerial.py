import serial.tools.list_ports
import requests
import json

r_path = 'http://localhost:3000/api/tickets'

def requestServer(jsonString):
    print("Iniciando Requisição para " + r_path)
    obj = json.loads(jsonString)
    response = requests.post(r_path, json=obj)
    print("\n Reposta Recebida: " + response.text)

ports = serial.tools.list_ports.comports()
portsList = []

for onePort in ports:
    portsList.append(str(onePort))
    print(str(onePort))

val = input("Select Port: ")

for x in range(0,len(portsList)):
    if portsList[x].startswith(str(val)):
        portVar = str(val)
        print(portVar)

serialInst = serial.Serial(portVar, 9600)

while True:
    if serialInst.in_waiting:
        print("Valor Recebido na Porta serial: ")
        packet = serialInst.readline()
        decoded = packet.decode('utf').rstrip("\n")
        print(decoded)
        requestServer(decoded)


