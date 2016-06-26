const handleArray = function( arr ) {
  return arr.join(' ');
}

const handleObject = function( obj ) {
  let classes = [];

  for( let cName in obj ) {
    obj[ cName ] && classes.push( cName );
  }

  return classes.join(' ');
};

const classes = function( arg ) {
  if( typeof arg === 'array' || arg instanceof Array ) {
    // If it's an array, concatenate the parts
    return handleArray( arg );
  } else if( typeof arg === 'object' ) {
    // If it's an object, conditionally add classes
    return handleObject( arg );
  } else {
    // Ottherwise, just coerce to a string
    return `${arg}`;
  }
};

export default function cssClasses( ...args ) {
  return args.map( classes ).join(' ');
};
