#define PINO_MOEDA 8
#define MAX_MESSAGE_LENGTH 12
#define BOTAO 7
#define ID 1
#include <LiquidCrystal.h>

const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

int estado;
float valor = 0;
float caixa = 0;
bool finalizado = false;
int resposta;

void setup() {
  pinMode(PINO_MOEDA, INPUT);
  pinMode(BOTAO, INPUT_PULLUP);
  digitalWrite(PINO_MOEDA, HIGH);
  Serial.begin(9600);
  lcd.begin(16, 2);

  estado = 0;
}

void mostraMensagemLCDEstado0() {
  lcd.setCursor(0, 0);
  lcd.print("Inicio: aperte");
  lcd.setCursor(0, 1);
  lcd.print("para comecar");
}

void mostraMensagemLCDEstado2() {
  lcd.setCursor(0, 0);
  lcd.print("Ticket Gerado");
  lcd.setCursor(0, 1);
}

void mostraValorLCD(float v) {
  lcd.setCursor(0, 0);
  lcd.print("Insercao. Valor:");
  lcd.setCursor(0, 1);
  lcd.print(valor);
}

int inverterSinal(int sinal) {
  if (sinal == 1) {
    sinal = 0;
  } else if (sinal == 0) {
    sinal = 1;
  }
  return sinal;
}

int detectarBotaoERetornarEstado(int estadoAtual, int proximoEstado) {
  int contatoBotao = inverterSinal(digitalRead(BOTAO));
  if (contatoBotao == HIGH) {
    lcd.clear();
    delay(1000);
    return proximoEstado;
  }
  return estadoAtual;
}

void loop() {

  if (estado == 0) {
    finalizado = false;
    mostraMensagemLCDEstado0();
    estado = detectarBotaoERetornarEstado(estado, 1);
  } else if (estado == 1) {

    mostraValorLCD(valor);
    int contatoMoeda = inverterSinal(digitalRead(PINO_MOEDA));
    if (contatoMoeda == HIGH) {
      valor++;
      delay(500);
    }

    estado = detectarBotaoERetornarEstado(estado, 2);
  } else if (estado == 2) {
    if (!finalizado) {
      caixa += valor;

      char buffer[40];
      char bufferValor[10];
      dtostrf(valor, 5, 2, bufferValor);
      sprintf(buffer, "{\"pontoId\":%d,\"valor\": %s}", ID, bufferValor);

      Serial.println(buffer);

      valor = 0;
     
      while (!Serial.available());
      resposta = Serial.readString().toInt();
    
      Serial.flush();
      finalizado = true;

    } else {
      mostraMensagemLCDEstado2();
      lcd.print(resposta);
      estado = detectarBotaoERetornarEstado(estado, 0);
      valor = 0;
    }
  }
}
