(function () {
    /**
     * a pull component which pulls
     * a certain area periodically
     *
     * we can use an ll parser here
     */
    var _RT = myfaces._impl.core._Runtime;
    _RT.extendClass("extras.apache._RegexpMatcher", Object, {

                _LANG: myfaces._impl._util._Lang,

                _matchRegexp: null,

                constructor_: function(re) {
                    this._matchRegexp = new RegExp(re);
                },

                match:function(str) {
                    return str.matches(this._matchRegexp);
                }

            })
})();