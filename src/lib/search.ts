export interface Match {
  atStartOfWord: boolean;
  position: number;
}

export interface SearchResult<T> {
  item: T;
  match: Match;
}

const normalizeString = (value: string) => {
  let result = "";
  for (const char of value.toLowerCase()) {
    if (char === "," || char === "'" || char === "/") {
      continue;
    }
    result += char;
  }
  return result;
};

const compareMatches = (match1: Match, match2: Match) => {
  if (match1.atStartOfWord && !match2.atStartOfWord) {
    return -1;
  }
  if (match2.atStartOfWord && !match1.atStartOfWord) {
    return 1;
  }
  return match1.position - match2.position;
};

const getBestMatch = (candidate: string, query: string): Match | null => {
  let bestMatch = null;
  let start = 0;
  while (start < candidate.length) {
    const index = candidate.indexOf(query, start);
    if (index === -1) {
      break;
    }
    const atStartOfWord =
      index === 0 ||
      candidate[index - 1] === " " ||
      candidate[index - 1] === "-";
    const match = { atStartOfWord, position: index };
    if (bestMatch === null || compareMatches(bestMatch, match) > 0) {
      bestMatch = match;
    }
    // Optimization: we can't have any better matches later on in the string
    // if we just found one at the start of a word
    if (atStartOfWord) {
      break;
    }
    start += query.length;
  }
  return bestMatch;
};

class SearchIndex<T> {
  #items: T[];

  #candidates: string[];

  constructor(items: T[], key: keyof T) {
    this.#items = items;
    this.#candidates = items.map((item) =>
      normalizeString(item[key] as unknown as string)
    );
  }

  search(query: string) {
    if (query.length === 0) {
      return [];
    }
    const normalizedQuery = normalizeString(query);
    const results: SearchResult<T>[] = [];
    for (const [index, candidate] of this.#candidates.entries()) {
      const bestMatch = getBestMatch(candidate, normalizedQuery);
      if (bestMatch) {
        results.push({
          item: this.#items[index],
          match: bestMatch,
        });
      }
    }
    results.sort((a, b) => compareMatches(a.match, b.match));
    return results;
  }
}

export default SearchIndex;
