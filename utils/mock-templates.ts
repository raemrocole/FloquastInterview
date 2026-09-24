export const MockTemplates = {
  registration: `
    <!DOCTYPE html>
    <html>
      <body>
        <input type="text" aria-label="name" />
        <input type="email" aria-label="email" />
        <select aria-label="account type">
          <option value="premium">Premium</option>
          <option value="standard">Standard</option>
        </select>
        <button>Register</button>
        <div class="success-message" style="display:none;"></div>
        <div class="error-message" style="display:none;"></div>
        
        <script>
          document.querySelector('button').addEventListener('click', async () => {
            const res = await fetch('/api/users', { method: 'POST' });
            const data = await res.json();
            const el = document.querySelector(res.ok ? '.success-message' : '.error-message');
            el.textContent = res.ok ? 'Registration successful' : (data.message || 'Error occurred');
            el.style.display = 'block';
          });
        </script>
      </body>
    </html>
  `,
  transaction: `
    <!DOCTYPE html>
    <html>
      <body>
        <input type="text" aria-label="recipient id" />
        <input type="number" aria-label="amount" />
        <button>Send Funds</button>
        <div class="success-message" style="display:none;"></div>
        <div class="error-message" style="display:none;"></div>
        
        <script>
          document.querySelector('button').addEventListener('click', async () => {
            const res = await fetch('/api/transactions', { method: 'POST' });
            const data = await res.json();
            const el = document.querySelector(res.ok ? '.success-message' : '.error-message');
            el.textContent = res.ok ? 'Transaction successful' : (data.message || 'Transfer failed');
            el.style.display = 'block';
          });
        </script>
      </body>
    </html>
  `
};