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

const canMatchFrom = (chars: string[], haystack: string, from: number) => {
  let position = from;
  for (const char of chars) {
    position = haystack.indexOf(char, position);
    if (position === -1) {
      return false;
    }
    position++;
  }
  return true;
};

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

  const chars = needle.replace(/\s+/g, '').split('');
  if (!canMatchFrom(chars, haystack, 0)) {
    return null;
  }

  const indices: number[] = [];
  let score = 0;
  let searchFrom = 0;

  for (let c = 0; c < chars.length; c++) {
    const char = chars[c];
    const rest = chars.slice(c + 1);
    // The earliest occurrence always leaves room for the rest of the query (checked above).
    const nextIndex = haystack.indexOf(char, searchFrom);
    const previous = indices[indices.length - 1];
    let index = nextIndex;
    // Prefer a later word-start occurrence, unless the earliest continues a run or the rest of the
    // query would no longer fit after it.
    if (previous === undefined || nextIndex !== previous + 1) {
      for (let i = nextIndex; i < haystack.length; i++) {
        if (haystack[i] === char && isWordStart(text, i)) {
          if (canMatchFrom(rest, haystack, i + 1)) {
            index = i;
          }
          break;
        }
      }
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
