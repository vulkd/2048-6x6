interface IOpts {
  h?: [number, number];
  s?: [number, number];
  l?: [number, number];
  mod?: number;
}

const getHashCode = (str: string, mod: number = 200): number => {
  let hash = 0;

  if (str.length === 0) {
    return hash;
  }

  /* tslint:disable:no-bitwise */
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << mod) - hash);
    hash = hash & hash;
  }
  /* tslint:enable:no-bitwise */

  return hash;
};

const range = (hash: number, min: number, max: number): number => {
  const diff = max - min;
  const x = ((hash % diff) + diff) % diff;
  return x + min;
};

// https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
export default (str: string|number, opts: IOpts = {}): string => {
  const hash: number = getHashCode(String(str), opts.mod ? opts.mod : 5);

  opts.h = opts.h ? opts.h : [0, 360];
  opts.s = opts.s ? opts.s : [40, 60];
  opts.l = opts.l ? opts.l : [40, 60];

  const h = range(hash, opts.h[0], opts.h[1]);
  const s = range(hash, opts.s[0], opts.s[1]);
  const l = range(hash, opts.l[0], opts.l[1]);

  return `hsl(${h}, ${s}%, ${l}%)`;
};
