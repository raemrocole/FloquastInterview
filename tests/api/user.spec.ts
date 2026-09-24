import { test, expect } from '@playwright/test';
import { UserService } from '../../services/user-service';
import { DataFactory } from '../../utils/data-factory';

test.describe('User API Test Suite', () => {
  let userService: UserService;

  test.beforeEach(async ({ request }) => {
    userService = new UserService(request);
  });

  test('should successfully create and retrieve a user', async () => {
    const newUser = DataFactory.createRandomUser();
    
    // Create User and verify response
    const createRes = await userService.createUser(newUser);
    expect(createRes).toBeApiSuccess
    expect(createRes.data.id).toBeDefined();
    expect(createRes.data.email).toBe(newUser.email);

    const userId = createRes.data.id;

    // Retrieve User
    const getRes = await userService.getUser(userId);
    expect(createRes).toBeApiSuccess
    expect(getRes.data.name).toBe(newUser.name);
  });

  test('should return 400 Bad Request when email is missing', async () => {
    const invalidUser = { name: 'No Email Doe', accountType: 'premium' }; // Missing email
    
    // @ts-expect-error - Intentionally passing bad data
    const res = await userService.createUser(invalidUser);
    
    expect(res).toBeApiError(400);
    expect(res.data.message).toContain('email is required');
  });

  test('should return 401 Unauthorized with invalid token', async () => {
    const user = DataFactory.createRandomUser();
    const res = await userService.createUser(user, 'invalid-token');
    
    expect(res).toBeApiError(401);
  });
});