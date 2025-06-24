# Playwright Practice – E2E Automation Suite 🎭🧪

This repository contains a modular end-to-end testing suite built with [Playwright](https://playwright.dev/). It automates key user flows such as sign-up and login against [Practice Software Testing](https://practicesoftwaretesting.com), with full CI/CD integration and cross-browser coverage.

---

## 🚀 Features

- 🧪 Automated signup and login flow coverage
- 🧩 Page Object Model architecture
- 🔄 Dynamic test data generation with `createTestUser()`
- 💚 GitHub Actions pipeline with browser matrix strategy
- 🧼 Pre-commit checks via ESLint + Prettier (Husky & lint-staged)

---

## 🛠 Tech Stack

- [Playwright](https://playwright.dev/) (E2E automation)
- TypeScript
- Node.js (v20+)
- GitHub Actions (CI/CD)
- Husky + lint-staged (Code quality enforcement)

---

## 📦 Getting Started

### 🔧 Install dependencies

npm install

### 🧪 Run all tests

npx playwright test

### ✅ Run only smoke tests

npx playwright test --grep @smoke

### 📊 Open HTML test report

npx playwright show-report

### 📸 View full trace from a run

npx playwright test --trace on
npx playwright show-trace trace.zip

---

### 🔁 Continuous Integration

This project runs Playwright tests on every push and pull request to main using GitHub Actions.

✅ Tests execute on Chromium, Firefox, and WebKit

🔁 Matrix strategy provides full browser coverage

🛠 Artifacts like reports and logs upload on failure

![CI](https://github.com/aleghikrian/playwrightPractice/actions/workflows/playwright.yml/badge.svg)

---

### 📁 Folder Structure

.
├── pages/ # Page Object Models (Signup, Login, etc.)
├── tests/ # Test specs
├── utils/ # User generator, shared auth flows
├── .github/workflows/ # GitHub Actions config

---

### 🔍 Key Utilities

createTestUser() – dynamic test data factory

registerAndLoginUser() – DRY utility to authenticate test users

TestUser type – strongly typed, reusable user model

### 🧑‍💻 Author

Developed and maintained by Alexis Ghiglieri
