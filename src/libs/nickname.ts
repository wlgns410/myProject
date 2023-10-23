import { uniqueNamesGenerator, languages, colors, names } from 'unique-names-generator';

export const capitalizedRandomName: string = uniqueNamesGenerator({
  dictionaries: [languages, colors, names],
  separator: '',
  style: 'capital'
}); // PoliteRedJone
