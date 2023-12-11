import swedish from "../globals/language/swedish.json";
import english from "../globals/language/english.json";
export interface ILanguageVariables {
  word_about: string;
  word_account: string;
  word_language: string;
  word_search: string;
  account_create_account: string;
  account_description: string;
  account_login: string;
  about_about_project: string;
}
export const SE: ILanguageVariables = swedish;
export const EN: ILanguageVariables = english;
