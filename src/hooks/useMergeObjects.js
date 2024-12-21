const useMergeObjects = () => {
  const mergeObjects = (target, source) => {
    return Object.keys(target).reduce(
      (acc, key) => {
        acc[key] = source[key] !== undefined ? source[key] : target[key]
        return acc
      },
      { ...source },
    )
  }

  return mergeObjects
}

export default useMergeObjects
