
export default function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
  // This function is used to ensure that all possible cases of a union type are handled.
}