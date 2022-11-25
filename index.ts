import './style.css';

import {
  bufferCount,
  interval,
  map,
  Observable,
  OperatorFunction,
  pairwise,
  scan,
} from 'rxjs';
export const sum: OperatorFunction<number, number> = (arr) =>
  arr.pipe(scan((accumulator, currentValue) => accumulator + currentValue, 0));
export const average: OperatorFunction<number, number> = (arr) =>
  arr.pipe(
    sum,
    map((sum, index) => (index === 0 ? sum : sum / index))
  );
export const group = (n: number) => (arr: Observable<number>) =>
  arr.pipe(bufferCount(n, 1));
export const groupAverage = (n: number) => (arr: Observable<number>) =>
  arr.pipe(
    group(n),
    map((a) => a.reduce((a, b) => a + b, 0) / a.length),
    average
  );
export const isUpDown =
  (fn: (d: [number, number]) => boolean) => (arr: Observable<number>) =>
    arr.pipe(pairwise(), map(fn));

export const isUp = isUpDown(([pre, cur]) => pre < cur);

export const isDown = isUpDown(([pre, cur]) => pre > cur);

const intervals = interval(1000);

// intervals.pipe(groupAverage(1)).subscribe(console.log);
// intervals.pipe(group(3)).subscribe(console.log);
// intervals.pipe(average).subscribe(console.log);

intervals.pipe(isDown).subscribe(console.log);

// Open the console in the bottom right to see results.
