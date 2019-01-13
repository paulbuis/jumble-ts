/*
 * permute.ts
 *
 * An implementation of Heap's algorithm for generating all lpossible permutations
 * See https://en.wikipedia.org/wiki/Heap%27s_algorithm and
 * https://academic.oup.com/comjnl/article/6/3/293/360213
 * Note: this can be improved by unrolling and/or converting to a non-recursive implementation
 * See: http://www.cs.princeton.edu/~rs/talks/perms.pdf
 *
 * Key observation: by converting to an array of letters rather than repeatedly slicing and concatinating
 * a string, frequency of memory allocation / deallocation is reduced
 */
function* heapsPermute(letterArray: string[], n: number): Iterable<string[]> {
  if (n === 1) {
    yield letterArray.slice();
  } else {
    let  j;
    const nm1 = n - 1;
    for (let i = 0; i < n; i += 1) {
      yield* heapsPermute(letterArray, nm1);
      if (n % 2 !== 0) {
        j = 0;
      } else {
        j = i;
      }
      const tempLetter = letterArray[j];
      letterArray[j] = letterArray[nm1];
      letterArray[nm1] = tempLetter;
    }
  }
}

function* permute(letters: string): Iterable<string> {
    for (const letterArray of heapsPermute([...letters], letters.length)) {
        yield letterArray.join("");
    }
}

export {
    permute,
};
