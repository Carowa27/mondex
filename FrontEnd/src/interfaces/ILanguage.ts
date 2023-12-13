import swedish from "../globals/language/swedish.json";
import english from "../globals/language/english.json";
export interface ILanguageVariables {
  word_about: string;
  word_account: string;
  word_goal: string;
  word_language: string;
  word_loading: string;
  word_purpose: string;
  word_search: string;
  account_create_account: string;
  account_description: string;
  account_login: string;
  account_logout: string;
  about_about_project: string;
  about_exam: string;
  about_description_exam: string;
  about_description_goal: string;
  about_description_purpose: string;
  my_pages_my_pages: string;
  read_more: string;
}
export const SE: ILanguageVariables = swedish;
export const EN: ILanguageVariables = english;
