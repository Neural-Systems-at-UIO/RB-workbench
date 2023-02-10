import metadata from './metadata'
import metadataDefinitions from './metadata-definitions'

function reformatMetadata (metadata, metadataDefinitions) {
  const metadataKeys = Object.keys(metadata)
  const metadataValues = Object.values(metadata)
  const metadataDefinitionsValues = Object.values(metadataDefinitions)
  const reformattedMetadata = []
  for (let i = 0; i < metadataKeys.length; i++) {
    const key = metadataKeys[i]
    let value = metadataValues[i]
    // flatten values into a list seperated by commas
    value = value.join(', ')
    const definition = metadataDefinitionsValues[i]
    const reformattedMetadataItem = []
    for (let j = 0; j < value.length; j++) {
      const item = [value[j], definition[j]]
      reformattedMetadataItem.push(item)
    }
    const reformattedMetadataItemObject = { key: i, OpenMindsField: key, definition, options: value }
    reformattedMetadata.push(reformattedMetadataItemObject)
  }
  return reformattedMetadata
}

const reformattedMetadata = reformatMetadata(metadata, metadataDefinitions)

export default reformattedMetadata
