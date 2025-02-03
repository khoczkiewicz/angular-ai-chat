import { TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { provideStore } from '@ngrx/store';
import { chatReducer } from '../chat.store';

describe('ChatComponent', () => {
  let component: ChatComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChatComponent],
      providers: [provideStore({ chat: chatReducer })]
    });
    component = TestBed.createComponent(ChatComponent).componentInstance;
  });

  it('should create the chat component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a message when handleSend is called', () => {
    component.userInput = 'Hello';
    component.handleSend();
    expect(component.messages.length).toBeGreaterThan(0);
  });
});