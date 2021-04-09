import * as stream from "../src";

describe("Stream", () => {
  it("should maintain array through `from` to `to`", () => {
    const arr = stream.fromArray([1, 2, 3]).toArray();

    expect(arr).toStrictEqual([1, 2, 3]);
  });

  it("should count up with `from` up to `value`", () => {
    const arr = stream.from(1).take(10).toArray();

    expect(arr).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should drop values from from of stream", () => {
    const arr = stream.from(1).drop(3).take(3).toArray();

    expect(arr).toStrictEqual([4, 5, 6]);
  });

  it("should take until some boolean test", () => {
    const arr = stream
      .from(1)
      .takeUntil((n) => n * 2 === 6)
      .toArray();
    expect(arr).toStrictEqual([1, 2]);
  });

  it("should map and flatten values", () => {
    const arr = stream
      .from(1)
      .take(3)
      .flatMap((n) => [n, n])
      .toArray();

    expect(arr).toStrictEqual([1, 1, 2, 2, 3, 3]);
  });

  it("should perform side-effects for each element", () => {
    let count = 0;
    const increment = () => {
      count++;
    };
    stream
      .from(1)
      .take(3)
      .forEach((_n) => {
        increment();
      });

    expect(count).toBe(3);
  });

  it("should unfold to a value", () => {
    const res = stream
      .unfold(1, (acc) => {
        if (acc > 4) {
          return;
        }
        return [acc % 2 === 0, acc + 1];
      })
      .toArray();

    expect(res).toStrictEqual([false, true, false, true]);
  });

  it("should flatten nested values", () => {
    function getCounter() {
      let count = 0;
      return () => {
        if (count > 3) {
          return;
        }
        return [count++];
      };
    }
    const res = stream
      .unfold(getCounter(), (counter) => {
        const value = counter();
        if (!value) {
          return;
        }

        return [value, counter];
      })
      .flatten()
      .toArray();

    expect(res).toStrictEqual([0, 1, 2, 3]);
  });

  it("should filter out values", () => {
    const res = stream
      .from(1)
      .filter((n) => n % 2 === 0)
      .takeUntil((n) => n > 10)
      .toArray();

    expect(res).toStrictEqual([2, 4, 6, 8, 10]);
  });

  it("should allow consuming the iterator", () => {
    const s = stream.from(1).take(5);
    let items = [];
    for (const elem of s) {
      items.push(elem);
    }

    expect(items).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it("should iterate through values", () => {
    const arr = stream
      .iterate(1, (n) => n + 1)
      .take(5)
      .toArray();

    expect(arr).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it("should unfold async and return", async () => {
    let n = 0;
    const arr = await stream
      .unfoldAsync<number, string | undefined>("", async (str) => {
        if (str === undefined) {
          return;
        }
        return [n++, n > 3 ? undefined : str];
      })
      .toArray();

    expect(arr).toStrictEqual([0, 1, 2, 3]);
  });
});
