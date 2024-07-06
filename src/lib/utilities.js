

function areTheTwoObjEqual(obj1, obj2) {
  'use strict'
  
  // verify if obj are empty and if either variable is empty
  // we can instantly compare them and check for equality.
  if (Object.keys(obj1).length === 0 && Object.keys(obj2).length === 0) {
    return true
  }
  // Check if obj constructors are equal. If true both obj must be of same type.
  if (obj1.constructor !== obj2.constructor) {
    return false
  }
  //check what type one of the objects is, and then compare them
  if (obj1 instanceof Function || obj1 instanceof RegExp) {
    return obj1 === obj2
  }
  // in we are dealing with simple object, let's simple comparison
  if(obj1 === obj2 || obj1.valueOf() === obj2.valueOf()){
    return true
  } 
  // If the value of check we saw above failed and the objects are Dates,
  // we know they are not Dates because Dates would have equal valueOf() values
  if ( obj1 instanceof Date) return false

  // If the objects are arrays, they are not equal if they have not equal lengths
  if(Array.isArray(obj1) && obj1.length !== obj2.length){
    return false
  }
  // If we have gotten to this point, we need to just make sure that we are
  // working with objects so that we can do a recursive check of the keys and values.
  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) {
    // Handle non-object comparison (convert to lowercase if they are strings)
    if (typeof obj1 === 'string' && typeof obj2 === 'string') {
      return obj1.toLowerCase() === obj2.toLowerCase();
    }
    return false;
  }

  // let's do a recursive check on all objects to make sure they are deeply equal
  const obj1Keys = Object.keys(obj1);
  // make sure all obj keys are the same
  const allKeysExist = Object.keys(obj2).every(
    key => obj1Keys.indexOf(key) !== -1
  )
  // finally make sure all values are the same
  const allValuesAreEqual = obj1Keys.every(
    key => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.toLowerCase() === value2.toLowerCase();
      } 
      return areTheTwoObjEqual(obj1[key], obj2[key])
    }
  )
  return allKeysExist && allValuesAreEqual
}

export {
  areTheTwoObjEqual
}