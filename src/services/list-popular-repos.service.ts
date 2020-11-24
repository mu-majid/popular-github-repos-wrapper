import moment from 'moment';

export const formatSearchQuery = (
  searchText: string,
  languages: string[],
  created: string
) => {
  // default q params
  if (!searchText && !languages && !created) {
    return `created:${moment().format('YYYY-MM-DD')}`;
  }
  const dateFilter = created ? `created:${created}` : '';
  const languageQuery = languages?.length ? (<string[]>languages).map((l: string) => `language:${l}`).join(' ') : '';
  searchText = searchText || '';

  return [searchText, languageQuery, dateFilter].filter(Boolean).join(' ');
}