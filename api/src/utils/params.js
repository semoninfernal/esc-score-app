export function assignId(id, params) {
  return {
    ...params,
    query: {
      ...(params.query || {}),
      id
    }
  }
}
