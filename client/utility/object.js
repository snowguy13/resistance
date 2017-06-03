export function except( obj, props ) {
  var ret = { ...obj };

  props.forEach( prop => {
    delete ret[prop];
  });

  return ret;
};

export function map( obj, fn ) {
  const ret = {};

  for( let prop in obj ) {
    ret[ prop ] = fn.call( ret, obj[prop], prop );
  }

  return ret;
};

export default { except, map };
