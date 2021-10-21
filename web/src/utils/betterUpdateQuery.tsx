import { Cache, QueryInput } from "@urql/exchange-graphcache";

export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: any, q: any) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
