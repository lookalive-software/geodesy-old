function keypath(object, keypath){
    let cursor = Object.assign(new Object, object)

    while(keypath.length && cursor){
        cursor = cursor[keypath.shift()]
    }

    return cursor
}