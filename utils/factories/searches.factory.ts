import { faker } from '@faker-js/faker';

export const PREFIX = 'qa_';

export interface SavedSearchData {
    searchValue: string;
}

export interface CollectionData {
    collectionValue: string;
}

interface NameParams {
    prefix?: string;
    word?: string;
}

export function generateSavedSearchData({
    prefix = PREFIX,
    word = faker.word.noun(),
}: NameParams = {}): SavedSearchData {
    return {
        searchValue: `${prefix}${word}_${faker.string}`
    };
}

export function generateCollectionData({
    prefix = PREFIX,
    word = faker.word.noun(),
}: NameParams = {}): CollectionData {
    return {
        collectionValue: `${prefix}${word}_${faker.string}`
    };
}