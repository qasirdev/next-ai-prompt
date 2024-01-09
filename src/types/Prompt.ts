export interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface Prompt {
  creator: User;
  prompt: string;
  userId: string;
  tag: string;
}
export interface ResponsePrompt extends Prompt {
  _id: string;
  creator: User;
  prompt: string;
  userId: string;
  tag: string;
}