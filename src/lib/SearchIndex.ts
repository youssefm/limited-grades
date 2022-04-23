export interface Match {
  atStartOfWord: boolean;
  startPosition: number;
  endPosition: number;
}

export interface SearchResult<T> {
  item: T;
  match: Match;
}

type CandidateIndex = [string, number[]];

const normalizeString = (value: string): CandidateIndex => {
  let result = "";
  const deletedPositions = [];

  const valueLength = value.length;
  const lowercaseValue = value.toLowerCase();
  let lastCharacter = "";
  for (let index = 0; index < valueLength; index += 1) {
    let char = lowercaseValue[index];
    if (
      char === "," ||
      char === "'" ||
      char === "/" ||
      (char === " " && lastCharacter === " ")
    ) {
      deletedPositions.push(index);
      continue;
    }
    if (char === "-") {
      char = " ";
    }
    lastCharacter = char;
    result += char;
  }
  return [result, deletedPositions];
};

const adjustPosition = (position: number, deletedPositions: number[]) => {
  let originalIndex = position;
  for (const deletedPosition of deletedPositions) {
    if (originalIndex > deletedPosition) {
      originalIndex += 1;
    } else {
      break;
    }
  }
  return originalIndex;
};

const compareMatches = (match1: Match, match2: Match) => {
  if (match1.atStartOfWord && !match2.atStartOfWord) {
    return -1;
  }
  if (match2.atStartOfWord && !match1.atStartOfWord) {
    return 1;
  }
  return match1.startPosition - match2.startPosition;
};

const getBestMatch = (candidate: string, query: string): Match | null => {
  let bestMatch = null;
  let start = 0;
  while (start < candidate.length) {
    const index = candidate.indexOf(query, start);
    if (index === -1) {
      break;
    }
    const atStartOfWord = index === 0 || candidate[index - 1] === " ";
    const match = {
      atStartOfWord,
      startPosition: index,
      endPosition: index + query.length,
    };
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

  candidateIndices: CandidateIndex[];

  constructor(items: T[], key: (item: T) => string) {
    this.#items = items;
    this.candidateIndices = items.map((item) => normalizeString(key(item)));
  }

  search(query: string): SearchResult<T>[] {
    if (query.length === 0) {
      return [];
    }
    const [normalizedQuery] = normalizeString(query);
    const results: SearchResult<T>[] = [];
    for (const [
      index,
      [candidate, deletedPositions],
    ] of this.candidateIndices.entries()) {
      const bestMatch = getBestMatch(candidate, normalizedQuery);
      if (bestMatch) {
        bestMatch.startPosition = adjustPosition(
          bestMatch.startPosition,
          deletedPositions
        );
        bestMatch.endPosition = adjustPosition(
          bestMatch.endPosition,
          deletedPositions
        );
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
