import { TestBed, inject } from '@angular/core/testing';
import { BackService } from '../services/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('servicestest', ()=>{

  // setup service
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BackService]
    });
  });

  it('BackService should be created', inject([BackService], (service: BackService) => {
    expect(service).toBeTruthy();
  }));

  it('BackService should have AddGame function',
  inject([BackService], (service: BackService) => {
    expect(service.AddGame).toBeTruthy();
  }));
  
  it('BackService should have AddMove function',
  inject([BackService], (service: BackService) => {
    expect(service.AddMove).toBeTruthy();
  }));

  it('BackService should have AddRound function',
  inject([BackService], (service: BackService) => {
    expect(service.AddRound).toBeTruthy();
  }));

  it('BackService should have GetGames function',
  inject([BackService], (service: BackService) => {
    expect(service.GetGames).toBeTruthy();
  }));
  
  it('BackService should have GetMoves function',
  inject([BackService], (service: BackService) => {
    expect(service.GetMoves).toBeTruthy();
  }));

  it('BackService should have GetRounds function',
  inject([BackService], (service: BackService) => {
    expect(service.GetRounds).toBeTruthy();
  }));

  it('BackService should have GetTopWinners function',
  inject([BackService], (service: BackService) => {
    expect(service.GetTopWinners).toBeTruthy();
  }));

  it('BackService should have RemoveMove function',
  inject([BackService], (service: BackService) => {
    expect(service.RemoveMove).toBeTruthy();
  }));

  it('BackService should have UpdateMove function',
  inject([BackService], (service: BackService) => {
    expect(service.UpdateMove).toBeTruthy();
  }));

  it('BackService should have GetWinners function',
  inject([BackService], (service: BackService) => {
    expect(service.GetWinners).toBeTruthy();
  }));

  it('BackService should have GetWinnersByDay function',
  inject([BackService], (service: BackService) => {
    expect(service.GetWinnersByDay).toBeTruthy();
  }));


  // -----------------------
/*
    it('should return an Array<Move>', () => {
      inject([BackService], (service: BackService) => {

        const dummyVisits = [
            { login: 'John' },
            { login: 'Doe' }
          ];
        service.GetMoves().subscribe(moves => {
            //expect(moves.length).toBe(2);
            //expect(moves).toEqual(dummyVisits);
        });
    });
});

    let expected = '';
    let notExpected = '';
    let expectMatch = null;

     // runs before each test
  beforeEach(()=> {
    expected = 'hellotest';
    notExpected = 'hellotest123';
    expectMatch = new RegExp(/^hello/);
  });

  // runs after each test
  afterEach(()=>{
    expected = '';
    notExpected = '';
  });

it('checks if hellotest is hellotest',
    ()=> expect('hellotest').toBe(expected)
  );
 it('checks if hellotest is not hellotest',
    ()=> expect('hellotest').not.toBe(notExpected)
  );
  it('checks if hellotest starts with hello',
    ()=> expect('hellotest').toMatch(expectMatch)
  )
*/
});