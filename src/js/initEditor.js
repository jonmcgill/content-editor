//
//  src/js/initEditor.js
//
function globalEditorConfig() {
    return {
        inline: true,
        menubar: false,
        insert_toolbar: false,
        fixed_toolbar_container: g.id.editorToolbar,
        plugins: 'link lists paste textpattern autolink',
    }
}


function initEditor(component) {

    var editorConfig = globalEditorConfig(),
        $component = $(component);

    $component.find(g.attr.editor).each(function() {

        var editorElement = this,
            $editorElement = $(this),
            editorType = $editorElement.attr(g.name.editor),
            editorInitiated = $editorElement.attr(g.name.editorID),
            isThumbnail = $component.parent().hasClass(g.name.thumbnail);
            console.log(!editorInitiated)
            console.log(isThumbnail)
        if (!editorInitiated && !isThumbnail) {
            switch(editorType) {
                case g.name.editorPlain:
                    editorConfig.toolbar = g.editors.plain;
                    break;
                 case g.name.editorBasic:
                    editorConfig.toolbar = g.editors.basic;
                    break;
                 case g.name.editorRobust:
                    editorConfig.toolbar = g.editors.robust;
                    break;
                default:
                    editorConfig.toolbar = g.editors.basic;
                    break; 
            }

            editorConfig.setup = function(editor) {
                editor.on('Change keyup', function() {
                    var componentData = JSON.parse($component.attr(g.name.config)),
                        componentProp = $editorElement.attr(g.name.prop);
                    componentData[componentProp] = editor.getContent();
                    $component.attr(g.name.config, JSON.parse(componentData));
                })
            }

            var editorID = genID(10);
            $editorElement.attr(g.name.editorID, editorID)
            editorConfig.selector = '['+g.name.editorID+'="'+editorID+'"]';
            $editorElement.on('mouseover', function() {
                tinymce.init(editorConfig);
                console.log('init editing');
            })

        }

    })

}