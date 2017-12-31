// Project: Immutability helper
// TypeScript Version: 2.2

export = update

// declare function update<T>(data: T, query: update.Query<T>): T
declare function update<T>(
  data: ReadonlyArray<T>,
  query:
    | {$push: T}
    | {$unshift: T}
    | {$splice: Array<[number, number]>}
    | {$splice: Array<[number, number]>}
): ReadonlyArray<T>

declare function update<T>(data: T, query: Query<T>): object
declare function update<T>(
  data: ReadonlySet<T>,
  query: {$add: any[]} | {$remove: string[]}
): ReadonlySet<T>

declare function update<K, V>(
  data: ReadonlyMap<K, V>,
  query: {$add: any[]} | {$remove: string[]}
): ReadonlyMap<K, V>

type Tree<T> = {[K in keyof T]?: Query<T[K]>}
type Query<T> = Tree<T> | ObjectOperators<T>
type ObjectOperators<T> =
  | {$set: any}
  | {$toggle: Array<keyof T>}
  | {$unset: Array<keyof T>}
  | {$merge: Partial<T>}
  | {$apply: (old: T) => any}
  | ((old: T) => any)

declare namespace update {
  function newContext(): typeof update
  function extend<T>(
    command: Command,
    handler: (param: CommandArg, old: T) => T
  ): void

  type Command = string
  type CommandArg = any
}
