import { createAction, createReducer, on, props } from '@ngrx/store';

export interface ChatState {
  messages: { sender: string, text: string }[];
}

export const initialState: ChatState = { messages: [] };

export const sendMessage = createAction('[Chat] Send Message', props<{ message: string }>());
export const receiveMessage = createAction('[Chat] Receive Message', props<{ message: string }>());

export const chatReducer = createReducer(
  initialState,
  on(sendMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, { sender: 'You', text: message }]
  })),
  on(receiveMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, { sender: 'AngularAiChat', text: message }]
  }))
);