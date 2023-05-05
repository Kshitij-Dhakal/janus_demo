import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  randomPassword(length?: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < (length ?? 12); i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  constructor() { }
}
