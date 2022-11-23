// basic function to calculate the number of items in a collection

function isEmpty(conatainer){
    if (conatainer.length>0){
        return false;
    }
    return true;
}

module.exports= isEmpty;