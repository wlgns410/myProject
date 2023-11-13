import { uniqueNamesGenerator, languages, colors, names } from 'unique-names-generator';

const capitalizedRandomName: string = uniqueNamesGenerator({
  dictionaries: [languages, colors, names],
  separator: '',
  style: 'capital'
}); // PoliteRedJone

export default capitalizedRandomName;
