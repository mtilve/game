import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/home');
  }

  // Home Component

  getStartButton() {
    return element(by.buttonText('Start'));
  }

  getHeadingText() {
    return element(by.css('h1')).getText();
  }

  getPlayer1DivMessage1() {
    return element(by.id('player1NameReq1'));
  }
  getPlayer1DivMessage2() {
    return element(by.id('player1NameReq2'));
  }
  getPlayer1DivMessage3() {
    return element(by.id('player1NameReq3'));
  }

  getPlayer2DivMessage1() {
    return element(by.id('player2NameReq1'));
  }
  getPlayer2DivMessage2() {
    return element(by.id('player2NameReq2'));
  }
  getPlayer2DivMessage3() {
    return element(by.id('player2NameReq3'));
  }
  getTwoPlayerSame() {
    return element(by.id('twoPlayerSame'));
  }
  getInputPlayer1(){
    return element(by.css("input[formControlName=player1]"));
  }
  getInputPlayer2(){
    return element(by.css("input[formControlName=player2]"));
  }

  clearBothInputs(){
    element(by.css("input[formControlName=player1]")).clear();    
    element(by.css("input[formControlName=player2]")).clear();
  }

  // Game Component

  getAllH2fromPage(){
    return element.all(by.css('h2'));
  }

  getOkButton() {
    return element(by.buttonText('Ok'));
  }

  setDropdownValue(value){
    return element(by.cssContainingText('option', value));
  }

  // Victory Component
  getHeadingTextVictory() {
    return element(by.css('h2')).getText();
  }
      
   getPlayAgainButton() {
    return element(by.buttonText('Play Again'));
   }

  waitSeconds(cant){        
    browser.sleep(cant * 1000);
  }
    
  waitForAngular(){
    browser.waitForAngular();
  }
}