export interface FuzzyMatchResult {
  /**
   * Relevance of the match. Higher is better.
   */
  score: number;
  /**
   * Indices of the characters in the searched text that matched the query, in ascending order.
   */
  indices: number[];
}

const isWordStart = (text: string, index: number) =>
  index === 0 ||
  /[\s\-_/.]/.test(text[index - 1]) ||
  /[a-z][A-Z]/.test(text.slice(index - 1, index + 1));

/**
 * Case-insensitive subsequence match of `query` against `text`. Every character of the query must
 * appear in `text` in order, but not necessarily next to each other ("nwrq" matches "New
 * Request"). Consecutive characters and characters at the start of a word score higher. Returns
 * `null` when the text doesn't match.
 *
 * ```ts
 * fuzzyMatch('nr', 'New Request'); // {score: ..., indices: [0, 4]}
 * fuzzyMatch('xyz', 'New Request'); // null
 * ```
 */
export function fuzzyMatch(query: string, text: string): FuzzyMatchResult | null {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return {score: 0, indices: []};
  }
  const haystack = text.toLowerCase();

  // Prefer a contiguous substring match when one exists; it's what users expect to see highlighted.
  const substringIndex = haystack.indexOf(needle);
  if (substringIndex !== -1) {
    const indices = Array.from({length: needle.length}, (_, i) => substringIndex + i);
    const score =
      needle.length * 10 + (isWordStart(text, substringIndex) ? 15 : 0) - substringIndex * 0.5 + 20;
    return {score, indices};
  }

  const indices: number[] = [];
  let score = 0;
  let searchFrom = 0;

  for (const char of needle) {
    if (char === ' ') {
      continue;
    }
    // Prefer the next word-start occurrence of the character, otherwise take the next occurrence.
    let index = -1;
    for (let i = searchFrom; i < haystack.length; i++) {
      if (haystack[i] === char && isWordStart(text, i)) {
        index = i;
        break;
      }
    }
    const nextIndex = haystack.indexOf(char, searchFrom);
    if (nextIndex === -1) {
      return null;
    }
    const previous = indices[indices.length - 1];
    if (index === -1 || (previous !== undefined && nextIndex === previous + 1)) {
      index = nextIndex;
    }

    score += 1;
    if (previous !== undefined && index === previous + 1) {
      score += 5;
    }
    if (isWordStart(text, index)) {
      score += 8;
    }
    indices.push(index);
    searchFrom = index + 1;
  }

  score -= (indices[0] ?? 0) * 0.5;
  score -= (indices[indices.length - 1] - indices[0] - indices.length) * 0.2;

  return {score, indices};
}
