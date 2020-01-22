module.exports = {
    create2DArray: function create2DArray(size) {
        var mdArray = new Array()
        for (i = -Math.abs(size); i < size; i++) {
            mdArray[i] = new Array()
        }
        return mdArray;
    }
}