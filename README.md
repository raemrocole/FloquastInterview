# Fintech Microservices Test Automation Framework

An end-to-end and API automation testing suite built with Playwright and TypeScript for a hypothetical fintech company.

---

## 🚀 Quick Start: Installation & Run Instructions

### Prerequisites
* **Node.js:** v18.x or higher
* **npm:** v9.x or higher
* **IDE:** Visual Studio Code (Recommended) with the "Playwright Test for VSCode" extension.

### 1. Installation
Run the following commands in your terminal to install dependencies, and download the required Playwright browsers:

# Install Node dependencies
```bash
npm install
```

# Install Playwright browsers (Chromium, Firefox, WebKit)
```bash
npx playwright install --with-deps
```

### 2. Run Instructions
# Environment Setup

Before running the tests, you must set up your local environment variables. The framework uses a `.env.example` template to define required variables without exposing sensitive data in version control.

1. Duplicate the `.env.example` file located in the `config/` directory.
2. Rename the duplicated file to `.env.local`.

# Running Tests
You can run the tests using the npm scripts configured in `package.json`. 

**Run the Entire Suite (API & UI concurrently):**
```bash
npm test
```

**Run Only API Tests:**
```bash
npm run test:api
```

**Run Only UI Tests (Using Mock Frontend):**
```bash
npm run test:ui
```

**View the HTML Test Report:**
```bash
npm run report
```

---

## Architecture & Design Decisions

* **Language & Engine:** TypeScript + Playwright. Unified runner for both browser-level UI flows and direct HTTP service requests.
* **API Architecture (Service Object Model):** Dedicated service objects (`UserService`) abstract raw HTTP requests, headers, and authentication. A centralized `BaseApiService` handles unified request/response logging and response payload normalization.
* **UI Architecture (Page Object Model):** Page objects (`RegistrationPage`, `TransactionPage`) isolate DOM selectors and user actions from assertion logic.
* **Mock Frontend:** Leverages Playwright's native network interception (`page.route()`) combined with custom test fixtures. This serves self-contained DOM templates and simulates backend API responses (200s, 400s, 500s) directly in memory, ensuring test isolation without requiring external frontend or backend services to be running.
* **Deterministic Test Data:** A centralized `DataFactory` dynamically generates isolated test data payloads per test run to prevent collision during parallel execution.

---

## Environment Configuration

The framework supports dynamic environment execution to seamlessly switch between different environments. Configuration profiles are stored in the `/config` directory:

* `config/.env.local` (Default)

To select an environment during execution, prepend `TEST_ENV=<env_name>` to your test command. If omitted, the suite defaults to `local`.

**Example: Running API tests against the staging environment:**
```bash
TEST_ENV=staging npm run test:api
```

---

## Reporting & Artifacts

The framework outputs multiple report formats upon test completion to satisfy reporting requirements[cite: 1]:

* **Interactive HTML Report:** Generated automatically; viewable via `npm run report`.
* **Structured Data Formats:**
  * JSON: `test-results/test-results.json`
  * JUnit XML: `test-results/results.xml`
* **Artifacts on Failure:**
  * Screenshots are automatically captured on UI assertion failures and saved to the `test-results/` directory.
  * API requests, status codes, and response bodies are logged directly to standard output via the custom `BaseApiService`.

### ⚠️ Important Note on Test Execution & Expected Results

There is no live backend provided for this exercise. Therefore, test execution will result in the following:

* **UI Tests (`npm run test:ui`): WILL PASS ✅ (except for the one demonstrating screenshots)** 
  These tests utilize Playwright's native network interception (`page.route()`) to serve a self-contained, inline DOM and mock all backend API responses.
* **API Tests (`npm run test:api`): WILL FAIL ❌**
  These tests are intentionally written as true integration tests against the provided API contract (e.g., `POST /api/users`). Because there is no active server listening at the `BASE_API_URL` defined in `.env.local`, these tests will correctly fail with a connection error.