Vue.component('field', {
    props: ['field', 'component'],
    template: '\
        <div class="field-wrap">\
            <component :is="field.type" :field="field" :component="component"></component>\
        </div>',
    beforeMount: function() {
        // result = default output listed in components
        var result = this.component.fields.output[this.field.result];

        // field instances aren't components; they're object literals passed to field components
        var fieldData = Cmint.Instance.Fields.List[this.field.name];

        this.field.label = this.field.label || fieldData.label;
        this.field.type = fieldData.type;
        this.field.display = this.field.display || fieldData.display;
        this.field.menu = fieldData.menu || null;
        this.field.choices = fieldData.choices || null;
        this.field.help = fieldData.help || null;
        this.field.check = fieldData.check || null;
        this.field.processes = fieldData.processes || null;
        
        // if no inputs, this is the first instantiation of this field for a given component.
        // inputs are established based on the defaults provided to the fieldData and the components
        if (!this.field.inputs) {
            this.field.inputs = {};
            // If text input, make the input equal the default result
            if (this.field.type === 'field-text') {
                this.field.inputs[fieldData.input] = result;
            }
            // If dropdown, make the input equal 'Default' selection
            if (this.field.type === 'field-dropdown') {
                this.field.inputs[fieldData.input] = 'Default';
            }
            // If field group, cycle through and add to inputs
            if (this.field.type === 'field-group') {
                if (!this.field.processes) throw 'ERROR at '+this.field.name+': All field-group fields must have an associated processes';
                var inputs = this.field.inputs;
                fieldData.input.forEach(function(inp) {
                    inputs[inp.name] = { label: inp.label, type: inp.type, value: '' };
                })
            }
        }

    }
})