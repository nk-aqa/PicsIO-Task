import { test as base, Page } from '@playwright/test';
import { SearchPage } from '../../pom/pages/SearchPage';
import { SavedSearchForm } from '../../pom/forms/SavedSearchForm';

type App = {
    page: Page;
    searchPage: SearchPage;
    savedSearchForm: SavedSearchForm;
};

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            searchPage: new SearchPage(page),
            savedSearchForm: new SavedSearchForm(page)
        };
        await use(app);
    }
});

export { expect } from '@playwright/test';