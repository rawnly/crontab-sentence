/**
 *
 * Returns a random element of the given array
 */
export function randomElement<T>(arr: T[]): T {
  const index = Math.floor(Math.random() * arr.length);

  return arr[index];
}
