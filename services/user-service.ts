import { APIRequestContext } from '@playwright/test';
import { BaseApiService } from './base-api-service';
import { User } from '../types/models';

export class UserService extends BaseApiService {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createUser(userPayload: User, token: string = process.env.AUTH_TOKEN as string) {
    const response = await this.request.post('/users', {
      data: userPayload,
      headers: { Authorization: `Bearer ${token}` }
    });
    return this.logAndParse(response, 'POST /users');
  }

  async getUser(userId: string) {
    const response = await this.request.get(`/users/${userId}`);
    return this.logAndParse(response, `GET /users/${userId}`);
  }
}