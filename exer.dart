import 'dart:io';

void main() {
    while(true){

   
    stdout.write("Digite o valor de X: ");
    int numx = int.parse(stdin.readLineSync()!);
    
    stdout.write("Digite o valor de Y: ");
    int numy = int.parse(stdin.readLineSync()!);

   
    if (numx == numy) {
      print("Os valores são iguais. Programa encerrado.");
     
    }

  
    if (numx < numy) {
      print("Os valores foram digitados em ordem crescente.");
    } else {
      print("Os valores foram digitados em ordem decrescente.");
    }
  }
 }