

export type PromiseCbNoPara<T>= () => Promise<T>

export type PromiseCb<T, Q>=(data: T) => Promise<Q>
