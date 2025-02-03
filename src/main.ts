import { bootstrapApplication } from '@angular/platform-browser';
import { ChatComponent } from './app/chat/chat.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { chatReducer } from './app/chat.store';

bootstrapApplication(ChatComponent, {
  providers: [
    provideAnimations(),
    provideStore({ chat: chatReducer })
  ]
}).catch(err => console.error(err));