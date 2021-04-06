export declare function fromArray<T>(elems: T[]): Stream<T>;
export declare function from(n: number): Stream<number>;
export declare function unfold<T, R>(initial: R, mapper: (v: R) => [T, R] | undefined): Stream<T>;
export declare function iterate<T>(initial: T, mapper: (v: T) => T): Stream<T>;
export declare function unfoldAsync<T, R>(initial: R, mapper: (v: R) => Promise<[T, R] | undefined>): AsyncStream<T>;
export declare function iterateAsync<T>(initial: T, mapper: (v: T) => Promise<T>): AsyncStream<T>;
declare class AsyncStream<T> {
    private generator;
    constructor(generator: () => AsyncGenerator<T, void, void>);
    take(n: number): AsyncStream<T>;
    takeUntil(test: (value: T) => boolean): AsyncStream<T>;
    flatten(): AsyncStream<T>;
    map<R>(mapper: (value: T) => R): AsyncStream<R>;
    filter(filter: (value: T) => boolean): AsyncStream<T>;
    fold<R>(initial: R, folder: (value: T, accum: R) => Promise<R>): Promise<R>;
    toArray(): Promise<T[]>;
    [Symbol.asyncIterator](): AsyncGenerator<T, void, void>;
}
declare class Stream<T> {
    private generator;
    constructor(generator: () => Generator<T, void, void>);
    take(n: number): Stream<T>;
    takeUntil(test: (value: T) => boolean): Stream<T>;
    flatten(): Stream<T>;
    map<R>(mapper: (value: T) => R): Stream<R>;
    filter(filter: (value: T) => boolean): Stream<T>;
    fold<R>(initial: R, folder: (value: T, accum: R) => R): R;
    toArray(): T[];
    mapAsync<R>(mapper: (value: T) => Promise<R>): AsyncStream<R>;
    filterAsync(test: (value: T) => Promise<boolean>): AsyncStream<T>;
    foldAsync<R>(initial: R, folder: (value: T, accum: R) => Promise<R>): Promise<R>;
    [Symbol.iterator](): Generator<T, void, void>;
}
export {};
