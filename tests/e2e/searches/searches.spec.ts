import { expect, test } from "../../../utils/fixtures/pagesFixtures";
import { generateSavedSearchData, generateCollectionData } from "../../../utils/factories/searches.factory";
import { faker } from '@faker-js/faker';

test.describe('Saved Searches scenarios', () => {

    test.beforeEach(async ({ app }) => {
        await app.searchPage.navigate();
        await app.searchPage.openSavedSearchesPanel();
    });

    test('Create a personal saved search', { tag: '@smoke' }, async ({ app }) => {
        const { searchValue } = generateSavedSearchData();

        await app.searchPage.openCreateSavedSearchesForm();
        await app.savedSearchForm.createSavedSearch(searchValue);
        await expect(app.searchPage.personalSavedSearchesSection).toContainText(searchValue);
    });

    test.describe('Adding Searches to Collection', () => {
        test('Create a personal saved search and add it to collection', { tag: '@regression' }, async ({ app }) => {
            const { collectionValue } = generateCollectionData();
            const { searchValue } = generateSavedSearchData();

            await app.searchPage.addPersonalCollection(collectionValue);
            await expect(app.searchPage.personalSavedSearchesSection).toContainText(collectionValue);
            await app.searchPage.openCreateSavedSearchesForm();
            await expect(app.savedSearchForm.createFormHeading).toBeVisible();
            await app.savedSearchForm.fillSearchValue(searchValue);
            await app.savedSearchForm.addCollection(); 
            await expect(app.searchPage.personalSavedSearchesSection).toContainText(searchValue);
        });
    });

    test('Create a team saved search', { tag: '@smoke' }, async ({ app }) => {
        const { searchValue } = generateSavedSearchData();

        await app.searchPage.openCreateSavedSearchesForm();
        await expect(app.savedSearchForm.createFormHeading).toBeVisible();
        await app.savedSearchForm.fillSearchValue(searchValue);
        await app.savedSearchForm.makeCheckboxOn();
        await app.savedSearchForm.clickOkButton();
        await expect(app.searchPage.teamSavedSearchesSection).toContainText(searchValue);
    });

    test('Rename a personal saved search', { tag: '@regression' }, async ({ app }) => {
        const { searchValue } = generateSavedSearchData();
        const newSearchValue = faker.word.noun();

        await app.searchPage.openCreateSavedSearchesForm();
        await app.savedSearchForm.createSavedSearch(searchValue);
        await expect(app.searchPage.personalSavedSearchesSection).toContainText(searchValue);
        await app.searchPage.createdSavedSearch.hover();
        await app.searchPage.renameValue(newSearchValue);
        await expect(app.searchPage.personalSavedSearchesSection).toContainText(newSearchValue);
    });

    test.afterEach(async ({ app }) => {
        await app.searchPage.createdSavedSearch.hover();
        await app.searchPage.removeSavedSearchButton.click();
        await app.savedSearchForm.removeSearch();
        await expect(app.searchPage.personalSavedSearchesSection).not.toBeVisible();
    });
});

test.describe('Removing Saved Searches', () => {

    test.beforeEach(async ({ app }) => {
        await app.searchPage.navigate();
        await app.searchPage.openSavedSearchesPanel();
    });
    
    test('Remove a personal saved search', { tag: '@smoke' }, async ({ app }) => {
        const { searchValue } = generateSavedSearchData();

        await app.searchPage.openCreateSavedSearchesForm();
        await app.savedSearchForm.createSavedSearch(searchValue);
        await expect(app.searchPage.personalSavedSearchesSection).toContainText(searchValue);
        await app.searchPage.createdSavedSearch.hover();
        await app.searchPage.removeSavedSearchButton.click();
        await app.savedSearchForm.removeSearch();
        await expect(app.searchPage.personalSavedSearchesSection).not.toBeVisible();
    });
});