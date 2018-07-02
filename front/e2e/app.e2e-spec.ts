import { HomePage } from './app.po';

describe('game drones App Home', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  
  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('Enter Player\'s Name');
  });

  it('should click Start Button with wrong inputs', () => {
    page.navigateTo();

    var elementToBePresent1 = page.getPlayer1DivMessage1().isPresent();   
    var elementToBePresent2 = page.getPlayer2DivMessage1().isPresent();
    expect(elementToBePresent1).toBe(false);
    expect(elementToBePresent2).toBe(false);
    page.getStartButton().click();
    elementToBePresent1 = page.getPlayer1DivMessage1().isPresent();    
    elementToBePresent2 = page.getPlayer2DivMessage1().isPresent();
    expect(elementToBePresent1).toBe(true);
    expect(elementToBePresent2).toBe(true);

    page.clearBothInputs();
    page.getInputPlayer1().sendKeys('abc');
    page.getInputPlayer2().sendKeys('a');
    page.getStartButton().click();

    elementToBePresent1 = page.getPlayer1DivMessage2().isPresent();   
    elementToBePresent2 = page.getPlayer2DivMessage2().isPresent();
    expect(elementToBePresent1).toBe(true);
    expect(elementToBePresent2).toBe(true);

    page.clearBothInputs();
    page.getInputPlayer1().sendKeys('test with more than 45 characteres abcderferdwsadfsxswsawerfgewwsssqalkf');
    page.getInputPlayer2().sendKeys('test with more than 45 characteres fkgjuuytndsnbvmklsdfsdfsdfsdfvvbbbmrr');
    page.getStartButton().click();

    elementToBePresent1 = page.getPlayer1DivMessage3().isPresent();   
    elementToBePresent2 = page.getPlayer2DivMessage3().isPresent();
    expect(elementToBePresent1).toBe(true);
    expect(elementToBePresent2).toBe(true);

    page.clearBothInputs();
    page.getInputPlayer1().sendKeys('Cavani');
    page.getInputPlayer2().sendKeys('Cavani');
    page.getStartButton().click();

    let elementToBePresent = page.getTwoPlayerSame().isPresent();   
    expect(elementToBePresent).toBe(true);


 });


 it('should click Start Button without right inputs', () => {
    page.navigateTo();

    page.getInputPlayer1().sendKeys('Player1Test');
    page.getInputPlayer2().sendKeys('Player2Test');
    page.getStartButton().click();

    var list = page.getAllH2fromPage();
    expect(list.count()).toBe(2);
    expect(list.get(0).getText()).toContain('Round');
    expect(list.get(1).getText()).toContain('Score');

    // 1
    page.setDropdownValue('rock').click();
    page.getOkButton().click();
    page.setDropdownValue('paper').click();
    page.getOkButton().click();

    // 2
    page.setDropdownValue('rock').click();
    page.getOkButton().click();
    page.setDropdownValue('paper').click();
    page.getOkButton().click();
    
    // 3
    page.setDropdownValue('scissors').click();
    page.getOkButton().click();
    page.setDropdownValue('scissors').click();
    page.getOkButton().click();

    // 4
    page.setDropdownValue('rock').click();
    page.getOkButton().click();
    page.setDropdownValue('paper').click();
    page.getOkButton().click();

    page.waitForAngular();

    // Victory
    expect(page.getHeadingTextVictory()).toContain('is the new EMPEROR!');
    page.getPlayAgainButton().click();
    
    page.waitForAngular();

    expect(page.getHeadingText()).toEqual('Enter Player\'s Name');

 });


});