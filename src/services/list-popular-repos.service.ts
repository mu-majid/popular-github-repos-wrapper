export const formatSearchQuery = (
  searchText: string,
  languages: string[],
  created: string
) => {
  const languageQuery = languages?.length ? (<string[]>languages).map((l: string) => `language:${l}`).join(' ') : '*';
  const dateFilter = created ? `created:${created}`: '';

  return `${searchText} ${languageQuery} ${dateFilter}`;
}