Vue.component('wrap', {
    props: ['config'],
    template: '\
        <div class="Component" @click="showFields">\
            <component :is="config._name" :config="config"></component>\
        </div>',
    methods: {
        showFields: function() {
            this.$emit('showfields', this.config);
        }
    },
    created: function() {
        var _this = this;
        Util.debug('created component ' + _this.config._name);
        if (_this.config._tokens) {
            _this.$options.watch = {};
            _this.config._tokens.forEach(function(token) {
                var source = token[Object.keys(token)[0]];
                _this.$watch(
                    function() {
                        if (_this.config._fiels) {
                            return _this.config._fields.output[source]; 
                        }
                    },
                    function(newVal, oldVal) {
                        _this.$bus.$emit('outputUpdate', source);
                    }
                )
            })
        }
    },
    mounted: function() {
        this.config._index = Index.getDomIndex(this.$el);
        Util.debug('mounted "' + this.config._name + '" at ' + this.config._index);
        $('a').click(function(e) {
            e.preventDefault();
        })
    },
    updated: function() {
        this.config._index = Index.getDomIndex(this.$el);
        Util.debug('updated "' + this.config._name + '" at ' + this.config._index);
    }
})