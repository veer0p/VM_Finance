import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Import necessary modules
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  messages = [
    { sender: 'bot', text: 'Hello! How can I help you today?' },
    { sender: 'user', text: 'Tell me about Angular 19.' },
    {
      sender: 'bot',
      text: 'Sure! Angular 19 introduces standalone components and better performance.',
    },
  ];
  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      // Add user message
      this.messages.push({ sender: 'user', text: this.newMessage });
      this.newMessage = '';

      // Simulated bot response
      setTimeout(() => {
        this.messages.push({
          sender: 'bot',
          text: 'I am a bot. This is a demo response.',
        });
      }, 1000);
    }
  }
}
