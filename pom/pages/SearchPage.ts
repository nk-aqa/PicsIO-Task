import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {
    private readonly savedSearchesButton: Locator = this.page.locator("#button-search");
    public readonly personalSavedSearchesSection: Locator = this.page.getByTestId("savedSearches").first();
    private readonly createSavedSearchButton: Locator = this.page.locator("//div[contains(@class, 'searchFilters__controls')]//button[2]");
    public readonly teamSavedSearchesSection: Locator = this.page.getByTestId("teamSearches").first();
    private readonly createPersonalGroupButton: Locator = this.page.getByTestId("savedSearchCreateRootGroup-personal");
    private readonly createTeamGroupButton: Locator = this.page.getByTestId("savedSearchCreateRootGroup-team");
    private readonly resetFiltersButton: Locator = this.page.getByTestId("resetFilters");
    private readonly collectionNameField: Locator = this.page.locator("[name='collectionName']");
    private readonly saveCollectionButton: Locator = this.page.locator("[viewBox='0 0 12 10']");
    private readonly cancelButtonCollection: Locator = this.page.locator("[viewBox='0 0 1000 1000']");
    public readonly createdSavedSearch: Locator = this.page.getByRole("treeitem");
    public readonly removeSavedSearchButton: Locator = this.page.getByTestId("savedSearchDelete");
    public readonly renameSavedSearchButton: Locator = this.page.getByTestId("savedSearchRename");

    async navigate() {
        await super.navigate('/search');
    }

    async openSavedSearchesPanel() {
        await this.savedSearchesButton.click();
    }

    async openCreateSavedSearchesForm() {
        await this.createSavedSearchButton.click();
    }

    async openCreatePersonalGroupField() {
        await this.createPersonalGroupButton.click();
    }

    async openCreateTeamGroupField() {
        await this.createTeamGroupButton.click();
    }

    async clickResetFilters() {
        await this.resetFiltersButton.click();
    }

    async addPersonalCollection(collectionValue: string) {
        await this.openCreatePersonalGroupField();
        await this.collectionNameField.fill(collectionValue);
        await this.saveCollectionButton.click();
    }

    async addTeamCollection(collectionValue: string) {
        await this.openCreateTeamGroupField();
        await this.collectionNameField.fill(collectionValue);
        await this.saveCollectionButton.click();
    }

    async clickCancelButton() {
        await this.cancelButtonCollection.click();
    }

    async renameValue(newValue: string) {
        await this.renameSavedSearchButton.click();
        await this.collectionNameField.fill(newValue);
        await this.saveCollectionButton.click();
    }
}