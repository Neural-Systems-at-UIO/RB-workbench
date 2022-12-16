import metadata from './metadata'
import metadataDefinitions from './metadata-definitions'

function reformatMetadata(metadata, metadataDefinitions) {
    var metadataKeys = Object.keys(metadata)
    var metadataValues = Object.values(metadata)
    var metadataDefinitionsValues = Object.values(metadataDefinitions)
    var reformattedMetadata = []
    for (var i = 0; i < metadataKeys.length; i++) {
        var key = metadataKeys[i]
        var value = metadataValues[i]
        // flatten values into a list seperated by commas
        value = value.join(', ')
        var definition = metadataDefinitionsValues[i]
        var reformattedMetadataItem = []
        for (var j = 0; j < value.length; j++) {
            var item = [value[j], definition[j]]
            reformattedMetadataItem.push(item)
        }
        var reformattedMetadataItemObject = { 'key':i, 'OpenMindsField':key,  'definition':definition, 'options':value }
        reformattedMetadata.push(reformattedMetadataItemObject)
    }
    return reformattedMetadata
}


var reformattedMetadata = reformatMetadata(metadata, metadataDefinitions)

export default reformattedMetadata