import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApiService {
  constructor(protected request: APIRequestContext) {}

  protected async logAndParse(response: APIResponse, endpoint: string) {
    const status = response.status();
    const body = await response.text();
    
    // API response logging
    console.log(`[API CALL] ${endpoint} | Status: ${status} | Body: ${body}`);
    
    if (status >= 400 && status < 500) {
      return { error: true, status, data: body ? JSON.parse(body) : null };
    }
    
    if (!response.ok()) {
      throw new Error(`API call failed: ${endpoint} with status ${status}`);
    }
    
    return { error: false, status, data: body ? JSON.parse(body) : null };
  }
}