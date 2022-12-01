import serial.tools.list_ports
import requests
import json

r_path = 'http://localhost:3000/api/tickets'

def requestServer(jsonString):
    print("-"*10)
    print(" Iniciando Requisição para " + r_path)
    obj = json.loads(jsonString)
    response = requests.post(r_path, json=obj);
    return response
    

ports = serial.tools.list_ports.comports()
portsList = []

for onePort in ports:
    portsList.append(str(onePort))
    print(str(onePort))

val = input("Selecione a porta: ")

for x in range(0,len(portsList)):
    if portsList[x].startswith(str(val)):
        portVar = str(val)
        print("escutando entradas em " + portVar)

serialInst = serial.Serial(portVar, 9600)

while True:
    if serialInst.in_waiting:
        print("-"*10)
        print("Valor Recebido na Porta serial: ")
        packet = serialInst.readline()
        decoded = packet.decode('utf').rstrip("\n")
        print("  " + decoded)
        response = requestServer(decoded)
        print("-"*10)
        print(" Resposta Recebida: " + response.text)

        serialInst.flush()

        print("-"*10)
        if(response.status_code == 201):
            print(" Mandando resposta para o Arduino")
            serialInst.write(bytes(response.text, 'utf8'))
        else:
            print(" Mandando resposta falha para o Arduino")
            serialInst.write(bytes("Falha", 'utf8'))

