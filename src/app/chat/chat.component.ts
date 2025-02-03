import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Store } from '@ngrx/store';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ChatState, sendMessage, receiveMessage } from '../chat.store';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <h1>GPT-2 via Hugging Face</h1>
      <div *ngFor="let msg of messages">
        <p><strong>{{ msg.sender }}</strong>: {{ msg.text }}</p>
      </div>
      <form (ngSubmit)="handleSend()" #chatForm="ngForm">
        <mat-form-field>
          <input
            matInput
            [(ngModel)]="userInput"
            placeholder="Type your message..."
            name="message"
            required
          />
        </mat-form-field>
        <button mat-raised-button type="submit" [disabled]="!chatForm.valid">
          Send
        </button>
      </form>
    </mat-card>
  `,
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  userInput: string = '';
  messages: { sender: string, text: string }[] = [];

  constructor(private store: Store<{ chat: ChatState }>) {
    this.store.select('chat').subscribe(state => {
      this.messages = state.messages;
    });
  }

  async handleSend() {
    if (!this.userInput.trim()) return;

    this.store.dispatch(sendMessage({ message: this.userInput }));

    try {
      const response = await axios.post('http://localhost:5555/api/huggingface', {
        message: this.userInput
      });

      if (response.data.text) {
        this.store.dispatch(receiveMessage({ message: response.data.text }));
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }

    this.userInput = '';
  }
}