export const except = function( obj, props ) {
  var ret = { ...obj };

  props.forEach( prop => {
    delete ret[prop];
  });

  return ret;
};

export default { except };
