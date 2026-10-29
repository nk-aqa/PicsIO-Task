# Pics.io: Saved Searches, Playwright tests

Automated tests for the **Saved Searches** feature of [Pics.io](https://pics.io), written with Playwright and TypeScript.
They are the second part of the QA test challenge; the testing plan (Part 1) is here: [link to plan](https://docs.google.com/document/d/12ipNYbByTXFW-Dxyqf4OtzSGxmFAynGNlJnZKGsWG_g/edit?usp=sharing).

## What I chose to test and why

I picked **Saved Searches** because it is used often, depends on filters and backend requests, and is easy to break with a UI change.
The suite covers the core flows from my plan (P0/P1): creating, removing, renaming and organizing saved searches.

## Scope

### Automated

| Test | Priority | Tag |
|---|---|---|
| Create a personal saved search | P0 | `@smoke` |
| Remove a personal saved search | P0 | `@smoke` |
| Create a team saved search | P0 | `@smoke` |
| Rename a personal saved search | P1 | `@regression` |
| Create a personal saved search and add it to a collection | P1 | `@regression` |

I kept the set small on purpose: every test checks one behavior, is independent, and cleans up after itself.

### Deliberately not automated

- **Login / auth.** The task did not include auth flows and asked to avoid them (see "Authentication" below).
- **Team visibility between users.** It needs a second account, which touches team management.
- **Bulk actions on assets, 14 filter combinations, cross-browser visual checks.** These are better for manual or exploratory testing, or need more time.
- **Edge cases** (very long names, special characters, duplicates). Planned as P2 in the testing plan, not automated yet.

## Authentication

Authentication was not part of the assignment, and the task asked to avoid auth flows, so the tests **do not automate login** and no attempt at login automation is included in this repository.

I used a Google (Gmail) account for the product. Google OAuth is not a good fit for automation, since it can block automated browsers and may require captcha or 2FA. For this reason, the scenarios start directly on the library page and expect an already authenticated session.

How to provide the session: Log in manually once, save the session to auth/storage-state.json, and point storageState in playwright.config.ts to it. The auth/ folder is git-ignored because the file contains session tokens.

To run the suite, you need your own Pics.io account (a trial account is enough) with an active session prepared in the same way. If the session expires, tests will fail at the first step, so it has to be refreshed manually.

## Prerequisites

- Node.js `[version]` and npm
- A Pics.io account (a trial account is enough) with access to the library

## Setup

```bash
git clone <repo-url>
cd <repo-name>
npm ci
npx playwright install
cp .env.example .env     # on Windows: copy .env.example .env
```

## Running the tests

| Command | Description |
|---|---|
| `npx playwright test` | Whole suite |
| `npx playwright test --grep "@smoke"` | Only smoke tests |
| `npx playwright test --grep "@regression"` | Only regression tests |
| `npx playwright test --headed` | Run with a visible browser |
| `npx playwright show-report` | Open the HTML report |

On Windows PowerShell, put the tag in quotes (`"@smoke"`), otherwise `@` is interpreted as splatting.

## Project structure

```
tests/
└── e2e/<area>/saved-searches/     # test scenarios only (no selectors)
utils/
├── fixtures/                  # Playwright fixtures (page objects as `app`)
└── factories/                 # test data generators based on faker
pom/                         # page objects and forms
├── forms/
└── pages/
playwright.config.ts
.env
```

## Approach

- **Page Object Model.** Tests contain only the scenario and assertions. Selectors and UI actions live in page objects (`searchPage`, `savedSearchForm`), exposed through one `app` fixture.
- **Fixtures.** Page objects are provided through Playwright fixtures, so tests stay short.
- **Dynamic data.** Names are generated with `faker` in factories (`generateSavedSearchData`, `generateCollectionData`) and use the `qa_` prefix, so test data is unique and easy to find.
- **Cleanup.** Each test removes the saved search it created in `afterEach`, so the account stays clean and tests can be re-run.
- **Config.** `dotenv` is used for environment values, and secrets are not committed.
- **Tags.** `@smoke` for core flows and `@regression` for the rest.
- **Assertions.** Web-first assertions only, no fixed `waitForTimeout`.

## AI tools used

- **GitHub Copilot:** helped with page object and fixture drafts and with reviewing selectors.
- **Claude:** helped with the structure of the testing plan and documentation.

## Known limitations

- Tests depend on a manually saved session, so they cannot run unattended in CI without extra setup.
- Selectors are based on the current Pics.io UI and may need updates after UI changes.
- Tests run on Chromium only; other browsers are planned in the testing plan.
- `afterEach` cleanup assumes the test created a saved search.