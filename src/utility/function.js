export const NOOP = () => {};
export const ID = x => x;

export const compose = ( ...fns ) => ( arg )
  => fns.reduceRight(( result, fn ) => fn( result ), arg);

export default { NOOP, ID, compose };
