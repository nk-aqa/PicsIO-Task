import { expect, Locator } from "@playwright/test";
import { BaseForm } from "./BaseForm";

export class SavedSearchForm extends BaseForm {
    public readonly createFormHeading: Locator = this.page.locator(".simpleDialogTitle", { hasText: 'Create saved search' });
    private readonly deleteFormHeading: Locator = this.page.locator(".simpleDialogTitle", { hasText: 'Delete saved search?' });
    private readonly valueField: Locator = this.page.getByPlaceholder("Please enter the name");
    private readonly teamShareCheckbox: Locator = this.page.locator("..UICheckbox__checkbox");
    private readonly okButton: Locator = this.page.locator("div.simpleDialogFooter > button", { hasText: 'Ok' });
    private readonly deleteButton: Locator = this.page.locator("div.simpleDialogFooter > button", { hasText: 'Delete' });
    public readonly collectionOption: Locator = this.page.getByTestId("saveSearchTreeItem");

    async createSavedSearch(searchValue: string) {
        await expect(this.createFormHeading).toBeVisible();
        await this.valueField.fill(searchValue);
        await this.okButton.click();
    }

    async fillSearchValue(searchValue: string) {
        await this.valueField.fill(searchValue);
    }

    async clickOkButton() {
        await this.okButton.click();
    }

    async makeCheckboxOn() {
        await this.teamShareCheckbox.check();
    }

    async makeCheckboxOff() {
        await this.teamShareCheckbox.uncheck();
    }

    async removeSearch() {
        await expect(this.deleteFormHeading).toBeVisible();
        await this.deleteButton.click();
    }

    async addCollection() {
        await this.collectionOption.click();
    }
}