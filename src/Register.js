import { Table, Button, Form, Input, Select, } from 'antd'
// import styled from 'styled-components'
import datasource from './datasource.js'
import './Register.css'
import useUndo from 'use-undo';
import SidePanel from './SidePanel.js'
// import OptionsBar from './options-bar.js'
import metadata from './metadata'
import metadataDefinitions from './metadata-definitions'
// import { render } from '@umijs/deps/compiled/mustache'
import React, { useContext, useEffect, useRef, useState } from 'react';
// const { Title } = Typography
import { Menu, Dropdown, message, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import './options-bar.css'
import { PlusOutlined } from '@ant-design/icons';

import { Divider } from 'antd';
const EditableContext = React.createContext(null);
const { Option } = Select;
let index = 0;

function width_calc(column_name, font) {
  console.log('column_name')
  var width = column_name.length

  if (typeof font === 'undefined') {
    font = '1.25'
    if (width < 11) {
      width = 11
      font = '1.25'

    }
  }
  else {
    if (width < 11) {
      width = 11
      font = '1.35'

    }
    if (width > 11) {
      font = '1.35'

    }
    // if (width > 16) {
    //   // width = 11
    //   font = '1.2'

    // }
    // if (width > 20) {
    //   // width = 11
    //   font = '1.1'

    // }
    // if (width > 25) {
    //   // width = 11
    //   font = '1.0'

    // }
  }

  var css_value = "calc(" + font + "em * " + width + ")"
  // console.log('css_value', css_value)
  return css_value
}
function width_calc_dropdown(input, font) {
  console.log('wot')
  // console.log('input', input)
  // console.log('font', font)
  var width = input.length
  // console.log('width', width)

  var css_value = "calc(" + font + "em * " + width + ")"
  // console.log('bool', ((parseFloat(font))))
  if ((parseFloat(width) * parseFloat(font)) < 1.25 * 11) {
    // convert string to int
    var width = 11
    var font = '1.25'
  }
  var css_value = "calc(" + font + "em * " + width + ")"

  return css_value
}

const defaultColumns = [
  {
    title: 'Subject',
    dataIndex: 'Subject',
    key: 'Subject',
    sorter: (a, b) => {
      if (a.Subject == null) {
        return 1;
      }
      if (b.Subject == null) {
        return -1;
      }
      return a.Subject.localeCompare(b.Subject)

    },
    sortDirections: ['descend', 'ascend', 'descend'],
    fixed: true,
    // set the width of the column based on the title
    width: width_calc('Subject'),
    // fixed: 'left',
    editable: true,
    filters: [
      {
        text: '71717640',
        value: '71717640',
      }]
  },
  // {
  //   title: 'Age Category',
  //   dataIndex: 'AgeCategory',
  //   key: 'AgeCategory',
  //   sorter: (a, b) => {
  //     if (a.AgeCategory == null) {
  //       return 1;
  //     }
  //     if (b.AgeCategory == null) {
  //       return -1;
  //     }
  //     return metadata['AgeCategory'][a.AgeCategory].localeCompare(metadata['AgeCategory'][b.AgeCategory])
  //   },
  //   sortDirections: ['descend', 'ascend', 'descend'],
  //   // width: width_calc('Age Category'),
  //   editable: true,
  //   select: true

  // },
  {

    title: 'Age Category',
    dataIndex: 'AgeCategory',
    key: 'AgeCategory',

    sorter: (a, b) => {
      if (a.AgeCategory == null) {
        return 1;
      }
      if (b.AgeCategory == null) {
        return -1;
      }
      return a.AgeCategory.localeCompare(b.AgeCategory)

    },

    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('AgeCategory'),
    select: true,
  },
  {

    title: 'Sex',
    dataIndex: 'BiologicalSex',
    key: 'BiologicalSex',
    // hierarchy_level: '1',
    // Sorter which handles null values
    // sorter: (a, b) => a.BiologicalSex - b.BiologicalSex,
    sorter: (a, b) => {
      if (a.BiologicalSex == null) {
        return 1;
      }
      if (b.BiologicalSex == null) {
        return -1;
      }
      return a.BiologicalSex.localeCompare(b.BiologicalSex)

    },

    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Sex'),
    select: true
  },

  {
    title: 'Species',
    dataIndex: 'Species',
    key: 'Species',
    sorter: (a, b) => {
      if (a.Species == null) {
        return 1;
      }
      if (b.Species == null) {
        return -1;
      }
      return a.Species.localeCompare(b.Species)
    },
    sortDirections: ['descend', 'ascend', 'descend'],

    width: width_calc('Species'),
    editable: true,
    select: true
  },
  {
    title: 'Age',
    dataIndex: 'Age',
    key: 'Age',
    sorter: (a, b) => {
      if (a.Age == null) {
        return 1;
      }
      if (b.Age == null) {
        return -1;
      }
      return a.Age - b.Age

    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Age'),
    editable: true,

  },
  {
    title: 'Weight',
    dataIndex: 'Weight',
    key: 'Weight',
    sorter: (a, b) => {
      if (a.Weight == null) {
        return 1;
      }
      if (b.Weight == null) {
        return -1;
      }
      return a.Weight - b.Weight

    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Weight'),
    editable: true,

  },
  {
    title: 'Strain',
    dataIndex: 'Strain',
    key: 'Strain',
    sorter: (a, b) => {
      if (a.Strain == null) {
        return 1;
      }
      if (b.Strain == null) {
        return -1;
      }
      return a.Strain.localeCompare(b.Strain)
    }, sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Strain'),
    editable: true,
    select: true

  },
  {
    title: 'Pathology',
    dataIndex: 'Pathology',
    key: 'Pathology',
    sorter: (a, b) => {
      if (a.Pathology == null) {
        return 1;
      }
      if (b.Pathology == null) {
        return -1;
      }
      return a.Pathology.localeCompare(b.Pathology)

    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Pathology'),
    editable: true,

  },
  {
    title: 'Phenotype',
    dataIndex: 'Phenotype',
    key: 'Phenotype',
    sorter: (a, b) => {
      if (a.Phenotype == null) {
        return 1;
      }
      if (b.Phenotype == null) {
        return -1;
      }
      return a.Phenotype.localeCompare(b.Phenotype)
    }, sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Phenotype'),
    editable: true,
    select: true

  },
  {
    title: 'Handedness',
    dataIndex: 'Handedness',
    key: 'Handedness',
    sorter: (a, b) => {
      if (a.Handedness == null) {
        return 1;
      }
      if (b.Handedness == null) {
        return -1;
      }
      return a.Handedness.localeCompare(b.Handedness)
    }, sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Handedness'),
    editable: true,
    select: true

  },
  {
    title: 'Laterality',
    dataIndex: 'Laterality',
    key: 'Laterality',
    sorter: (a, b) => {
      if (a.Laterality == null) {
        return 1;
      }
      if (b.Laterality == null) {
        return -1;
      }
      return a.Laterality.localeCompare(b.Laterality)
    }, sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Laterality'),
    editable: true,
    select: true

  },
  {
    title: 'Origin',
    dataIndex: 'Origin',
    key: 'Origin',
    sorter: (a, b) => {
      if (a.Origin == null) {
        return 1;
      }
      if (b.Origin == null) {
        return -1;
      }
      return a.Origin.localeCompare(b.Origin)

    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Origin'),
    editable: true,

  },
  {
    title: 'Sampletype',
    dataIndex: 'Sampletype',
    key: 'Sampletype',
    sorter: (a, b) => {
      if (a.Sampletype == null) {
        return 1;
      }
      if (b.Sampletype == null) {
        return -1;
      }
      return a.Sampletype.localeCompare(b.Sampletype)

    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Sampletype'),
    editable: true,

  }
]
var called_api = false;
// a function to get the data from the api and set the state of statefulmetadata

var max_len = {
  Subject: 0,
  BiologicalSex: 0,
  AgeCategory: 0,
  Species: 0,
  Age: 0,
  Weight: 0,
  Strain: 0,
  Pathology: 0,
  Phenotype: 0,
  Handedness: 0,
  Laterality: 0,
  Origin: 0,
  Sampletype: 0

}
var history = []
var sel_rows = []
// var prev_row = null
// var prev_index = null
function App() {
  var [statefulColumns, setStatefulColumns] = useState(defaultColumns)

  var [statefulmetadata, setstatefulmetadata] = useState(metadata)
  var [statefulmetadataDefinitions, setstatefulmetadataDefinitions] = useState(metadataDefinitions)
  // datasource = {}
  function get_metadata() {
    if (called_api == false) {
      console.log('getting metadata')

      called_api = true;
      fetch('/get_metadata')
        .then(response => response.json())
        .then(data => {
          statefulmetadata = data[0];
          statefulmetadataDefinitions = data[1];
          setstatefulmetadata(statefulmetadata);
          setstatefulmetadataDefinitions(statefulmetadataDefinitions);
        });
    }
  }
  get_metadata();
  var datasource_template = [{
    key: '1',
    Subject: null,
    BiologicalSex: null,
    AgeCategory: null,
    Species: null,
    Age: null,
    Weight: null,
    Strain: null,
    Pathology: null,
    Phenotype: null,
    Handedness: null,
    Laterality: null,
    Origin: null,
    Sampletype: null

  }]
  var [DataSource, { set: SetDataSource, reset: resetDataSource, undo: undoDataSource, redo: redoDataSource, canUndoDS, canRedoDS },] = useUndo(datasource_template, { useCheckpoints: true });
  const { present: presentDS } = DataSource;
  // console.log('undoDS')
  // console.log(presentDS)
  // // Define useUndo hook

  // create undoable state
  // const [state, setState, { undo, redo, canUndo, canRedo }] = useUndo(DataSource)

  // console.log('NOW')
  var count = presentDS.length
  function handleUndoDS(e) {
    // console.log(prev_row)
    e.preventDefault()

    undoDataSource()
    // limit size of history
    DataSource.past = DataSource.past.slice(-50)

    // var step_back = [DataSource['past'].length - 1]
    // console.log('step_back', step_back)
    // // console.log('DataSourcePast')
    // // console.log(DataSource.past)
    // // DataSource['present'][0]['Species'] = 1
    // // undoDataSource()
    // // SetDataSource(DataSource['present'])
    // // handle undo for dropdowns
    // console.log('onestepbackis')
    // console.log(DataSource['past'][step_back])
    // SetDataSource(DataSource['past'][step_back])
    // DataSource['past'].pop()
    // // DataSource['past'].pop()
    // // SetDataSource(DataSource.present, false)
    // console.log('DataSourcePost')
    // console.log(DataSource)
    // handle undo for dropdowns


    // DataSource.future = [DataSource.present, ...DataSource.future]
    // DataSource.present = DataSource.past[DataSource.past.length - 1]
    // DataSource.past = DataSource.past.slice(0, DataSource.past.length - 1)
    // SetDataSource(DataSource.present)
    // DataSource.past.pop()
    // DataSource.past.pop()

    // console.log('DataSourcePast', DataSource.past)
    // undo state
    // undo()


    // console.log('postundo')
    // console.log(presentDS)
  }
  function handleRedoDS(e) {
    e.preventDefault()
    redoDataSource()
    // console.log('postredo')
    // console.log(presentDS)
  }
  // add a new row
  const handleAdd = () => {
    count += 1;

    const newData = {
      key: count.toString(),
      Subject: null,
      BiologicalSex: null,
      AgeCategory: null,
      Species: null,
      Age: null,
      Weight: null,
      Strain: null,
      Pathology: null,
      Phenotype: null,
      Handedness: null,
      Laterality: null,
      Origin: null,
      Sampletype: null
    };
    // DataSource.push(newData)

    SetDataSource([...presentDS, newData], true);
    // console.log(DataSource)
  };

  const handleDuplicate = () => {
    count += 1;
    // duplicate selected rows
    var newDS = [...presentDS]

    for (var i = 0; i < sel_rows.length; i++) {
      var new_row = JSON.parse(JSON.stringify(newDS[sel_rows[i] - 1]));

      new_row['key'] = count.toString()

      // new_row.key = count.toString()
      var newDS = [...newDS, new_row]
      count += 1
    }
    SetDataSource(newDS, true);
  };
  const DownloadCSV = () => {
    var csv = 'Subject;BiologicalSex;AgeCategory;Species;Age;Weight;Strain;Pathology;Phenotype;Handedness;Laterality;Origin;Sampletype\n'
    for (var i = 0; i < presentDS.length; i++) {
      var row = presentDS[i]
      csv += row.Subject + ';' + row.BiologicalSex + ';' + row.AgeCategory + ';' + row.Species + ';' + row.Age + ';' + row.Weight + ';' + row.Strain + ';' + row.Pathology + ';' + row.Phenotype + ';' + row.Handedness + ';' + row.Laterality + ';' + row.Origin + ';' + row.Sampletype + '\n'
    }
    var blob = new Blob([csv], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'metadata.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const UploadCSVButton = () => {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
      // getting a hold of the file reference
      var file = e.target.files[0];

      // setting up the reader
      var reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
        var content = readerEvent.target.result; // this is the content!
        var lines = content.split('\n')
        // console.log(lines)
        var new_data = []
        for (var i = 0; i < lines.length; i++) {
          // skip the header
          if (i == 0) {
            continue
          }
          var line = lines[i]
          var line_data = line.split(';')
          // console.log(line_data)
          // console.log(line_data.length)
          if (line_data.length == 13) {
            // handle null values
            for (var j = 0; j < line_data.length; j++) {
              if (line_data[j] == 'null') {
                line_data[j] = null
              }
              if (line_data[j] == "undefined") {
                line_data[j] = null
              }
            }

            var row = {
              key: i.toString(),
              Subject: line_data[0],
              // handle if the value is not in the metadata
              // BiologicalSex: metadata['BiologicalSex'].indexOf(line_data[1]) == -1 ? null : metadata['BiologicalSex'].indexOf(line_data[1]),
              // AgeCategory: metadata['AgeCategory'].indexOf(line_data[2]) == -1 ? null : metadata['AgeCategory'].indexOf(line_data[2]),
              // Species: metadata['Species'].indexOf(line_data[3]) == -1 ? null : metadata['Species'].indexOf(line_data[3]),
              BiologicalSex: line_data[1],
              AgeCategory: line_data[2],
              Species: line_data[3],
              Age: line_data[4],
              Weight: line_data[5],
              Strain: line_data[6],
              // Strain: metadata['Strain'].indexOf(line_data[6]) == -1 ? null : metadata['Strain'].indexOf(line_data[6]),
              Pathology: line_data[7],
              Phenotype: line_data[8],
              Handedness: line_data[9],
              Laterality: line_data[10],
              // Phenotype: metadata['Phenotype'].indexOf(line_data[8]) == -1 ? null : metadata['Phenotype'].indexOf(line_data[8]),
              // Handedness: metadata['Handedness'].indexOf(line_data[9]) == -1 ? null : metadata['Handedness'].indexOf(line_data[9]),
              // Laterality: metadata['Laterality'].indexOf(line_data[10]) == -1 ? null : metadata['Laterality'].indexOf(line_data[10]),
              Origin: line_data[11],
              Sampletype: line_data[12]
            }

            new_data.push(row)
          }
        }
        SetDataSource(new_data)
      }
    }

    input.click();
  }


  const handleDelete = () => {
    // console.log(sel_rows)
    var temp_ = presentDS
    for (var i = 0; i < sel_rows.length; i++) {
      // console.log(i)
      // delete selected rows
      temp_ = temp_.filter(item => item.key !== sel_rows[i])
    }

    // reset keys 
    for (var i = 0; i < temp_.length; i++) {
      console.log(i)
      console.log(temp_[i])
      temp_[i].key = (i + 1).toString()
    }
    // reset selected rows
    sel_rows = []
    // uncheck all deleted checkboxes
    var checkboxes = document.getElementsByClassName('ant-checkbox-input')
    for (var i = 0; i < checkboxes.length; i++) {
      // console.log(checkboxes[i])
      // update the props of the checkbox
      checkboxes[i].checked = false

      checkboxes[i].dispatchEvent(new Event('change', { bubbles: true }));

    }
    // console.log(checkboxes)
    SetDataSource(temp_)
    setSelected([])
    // DataSource.push(newData)

    // SetDataSource([...DataSource, newData]);
  };
  const OptionsBar = () => (
    <div>
      <div style={{ padding: '0 ', textAlign: 'left' }} className='OptionsBar'>

        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={handleUndoDS} >Undo</Button>
        <Button onClick={handleRedoDS} >Redo</Button>

        <Button onClick={handleDuplicate}>Duplicate Selected</Button>
        <Button onClick={DownloadCSV}>Download CSV</Button>
        <Button onClick={UploadCSVButton}>Upload CSV</Button>


        <Button onClick={handleDelete} type='default' danger>
          Delete
        </Button>


        {/* {{ add_button }} */}

      </div>
      <hr
        style={{
          backgroundColor: '#bfbfbf',
          border: 'none',
          height: '0.15rem'
        }}
      ></hr>
    </div >
  )


  const [selected, setSelected] = useState([]);

  const rowSelection = {
    // uncheck all checkboxes when the table is re-rendered
    selectedRowKeys: selected,


    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelected(selectedRows.map((row) => row.key));
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   'selectedRows: ',
      //   selectedRows
      // )
      sel_rows = selectedRowKeys

    },
    getCheckboxProps: (record) => {
      // set all checkboxes to true
      return {
        // checked: true
      }

    }

  }
  const handleSave = (row, event, dataIndex) => {

    const OldData = [...presentDS];
    const index = OldData.findIndex((item) => row.key === item.key);
    const item = OldData[index];
    console.log('row', row)
    // create a copy of the row
    var original_data = { ...row }



    var columns = (Object.keys(row))

    // console.log('columns', columns)
    for (var key in Object.keys(row)) {
      var id = columns[key]


      if (row[id] !== item[id]) {
        // console.log('row_key', row[id])
        // console.log('item_key', item[id])
        var match_col = id
        var match_value = row[id]
        original_data[match_col] = item[id]
        OldData.splice(index, 1, { ...item, ...row });

      }
    }
    if (typeof event !== 'undefined') {
      // console.log('this works')
      match_col = dataIndex
      match_value = event
      var temp_row = OldData[index]
      temp_row[match_col] = match_value
      // original_data[match_col] = match_value
      OldData.splice(index, 1, { ...temp_row });
      // console.log('temp_row1', temp_row)
      // console.log('olddata-debug', OldData)


    }



    // console.log('OldData1', OldData)
    if (sel_rows.includes(row["key"])) {
      console.log('this works sel rows')
      for (var i in sel_rows) {
        console.log(OldData[sel_rows[i] - 1])
        temp_row = OldData[sel_rows[i] - 1]
        temp_row[match_col] = match_value
        // console.log('temp row', temp_row)
        // console.log('match_value', match_value)

        OldData.splice(sel_rows[i] - 1, 1, { ...temp_row });

      }
    }
    // get match col index
    var match_col_index = columns.indexOf(match_col)
    match_col_index = match_col_index - 1
    // console.log('h', )
    // check data type of match value
    var match_value_type = typeof match_value
    // console.log('match_value_type', match_value_type)
    // console.log('max_len', max_len)

    if (match_value_type == 'number') {
      console.log('runnning')
      match_value = metadata[match_col][match_value]
      // console.log('match_value', match_value)
      // console.log('max_len2', max_len[match_col])
      if (match_value.length > max_len[match_col]) {
        // console.log('here')
        max_len[match_col] = match_value.length

        console.log(statefulColumns[match_col_index].width)
        statefulColumns[match_col_index].width = width_calc_dropdown(match_value, '0.82')
      }

    }
    else {
      if (match_value.length > max_len[match_col]) {
        max_len[match_col] = match_value.length
        statefulColumns[match_col_index].width = width_calc(match_value, '1.25')
      }
    }
    // console.log('match_value_length', match_value.length)
    // console.log('match_col_max_len', match_col)
    // console.log('max_len', max_len)
    setStatefulColumns([...statefulColumns])
    // console.log(OldData)
    // OldData has now become newdata
    SetDataSource([...OldData], false);
    // remove statefulness from the row

    DataSource['present'] = { ...OldData }
    var temp_data = [...OldData]
    temp_data[index] = { ...original_data }


    // unpack and get values
    // console.log([...Object.values(temp_data[0])], 'temp_data')
    // for each object in temp_data get the values

    var temp_data_values = []
    var temp_data_keys = []
    for (var i in temp_data) {
      temp_data_values.push([...Object.values(temp_data[i])])
      temp_data_keys.push([...Object.keys(temp_data[i])])
    }

    // recreate object from keys and values
    var temp_data_obj = []
    for (var i in temp_data_values) {
      var temp_obj = {}
      for (var j in temp_data_values[i]) {
        temp_obj[temp_data_keys[i][j]] = temp_data_values[i][j]
      }
      temp_data_obj.push(temp_obj)
    }

    history = [...history, temp_data_obj]

    DataSource['past'] = [...DataSource['past'], [...temp_data_obj]]

    // console.log([...DataSource['past'], temp_data])
    // DataSource['present'] = [...OldData]

    // create copy of OldData

    // if (DataSource['past'].length > 0) {

    //   console.log('check')
    //   var temp_ = [...DataSource['past'][DataSource['past'].length - 1]]
    //   console.log('temp_', temp_)
    //   temp_[index] = original_data
    //   console.log('temp', temp_)
    //   DataSource['past'] = [...DataSource['past'], temp_]
    // }
    // else {
    //   var temp_data = [...OldData]
    //   temp_data[index] = original_data
    //   DataSource['past'] = [...DataSource['past'], temp_data]

    // }

    // prev_row = row

    // DataSource['past'][DataSource['past'].length - 1][prev_index] = prev_row
    // console.log('DataSourcePost')
    // console.log(DataSource)
    // console.log('datasource', DataSource)

  };


  // title,
  //   editable,
  //   children,
  //   dataIndex,
  //   record,
  //   select,
  //   handleSave,
  //   statefulmetadata,
  //   statefulmetadataDefinitions,
  //   setstatefulmetadata,
  //   setstatefulmetadataDefinitions,
  // ...restProps



  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = statefulColumns.map((col) => {
    if (!col.editable & !col.select) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        select: col.select,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        statefulmetadata,
        statefulmetadataDefinitions,
        setstatefulmetadata,
        setstatefulmetadataDefinitions
      }),
    };
  });




  return (
    <div>
      <OptionsBar />
      <Table
        className='table-striped-rows'
        name='table'
        rowSelection={{
          type: 'checkbox',

          ...rowSelection,
        }}
        components={components}
        columns={columns}
        // rowClassName={() => 'editable-row'}
        dataSource={presentDS}
        scroll={{ x: '30vh', y: '76vh' }}
        pagination={false}
      />
    </div >
  )
}

function fetch_api() {
  var return_data
  const data = fetch('/print_statement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
    .then(response => response.json())
    .then(data => {
      return_data = data
      console.log('1:', return_data)

      // for (let i = 0; i < data["data"].length; i++) {
      //   console.log('data_test', data['data'][i]["https://openminds.ebrains.eu/vocab/name"])
      //   var option = (data['data'][i]["https://openminds.ebrains.eu/vocab/name"])
      //   options_antd.push(<Option value={option} >{option}</Option>);

    })

    // 
    .catch(error => {
      console.error('Error:', error)
    })
}


const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};


const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  select,
  handleSave,
  statefulmetadata,
  statefulmetadataDefinitions,
  setstatefulmetadata,
  setstatefulmetadataDefinitions,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);


  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    // console.log('dataIndex', dataIndex)
    // console.log('RecorddataIndex', record[dataIndex])
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (event) => {

    // console.log('selected_value', form);
    // console.log('event', event);
    try {

      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });

    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };



  const saveDropDown = async (event) => {
    // setSelectedValue('MALE')
    // console.log('selected_value', form);
    // console.log('event', event);

    // setEditing(!editing);
    toggleEdit();

    try {
      // event.preventDefault()
      const values = await form.validateFields();
      // toggleEdit();
      // console.log('values init', { ...values })
      handleSave({ ...record, ...values }, event, dataIndex);

    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
    // form.setFieldsValue({
    //   [dataIndex]: 'lucy',
    // });
    const values = await form.validateFields();

    // console.log('values end', { ...values })
    setEditing(false);
    // change column width to match content


  };
  var options_antd = []


  const [name, setName] = useState('');


  const onNameChange = (event) => {
    setName(event.target.value);
  };


  const addItem = (e) => {
    e.preventDefault();
    var items = statefulmetadata[dataIndex]

    var definitions = statefulmetadataDefinitions[dataIndex]

    items = ([name, ...items]);
    statefulmetadata[dataIndex] = items
    var newdefinition = 'A custom option added by the user'
    definitions = ([newdefinition, ...definitions]);
    statefulmetadataDefinitions[dataIndex] = definitions
    setstatefulmetadataDefinitions(statefulmetadataDefinitions)
    setstatefulmetadata(statefulmetadata)
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  // if (called_api == false) {
  //   fetch_data()
  //   called_api = true
  // }

  // fetch_data()
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title} is required.`,
          },
        ]}
      >

        <Input ref={inputRef} onBlur={save} onPressEnter={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>

    );

  }


  // fetch_data()

  if (select) {


    // const Add = options_.map(Add => Add
    // )
    // const definitionsMap = definitions.map(definitions => definitions
    // )

    // for (let i = 0; i < options_.length; i++) {
    //   // var option = (data['data'][i]["https://openminds.ebrains.eu/vocab/name"])
    //   var option = (options_[i])
    //   option = <Option value={option} > {option}</Option >


    //   options_antd.push(option);
    // }


    for (let i = 0; i < statefulmetadata[dataIndex].length; i++) {

      var option = <Option value={statefulmetadata[dataIndex][i]} title={statefulmetadataDefinitions[dataIndex][i]}>{statefulmetadata[dataIndex][i]}</Option>
      options_antd.push(option);
    }

    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title} is required.`,
          },
        ]}
      >
        {/* allow the user to add new options to a select  if missing*/}

        <Select
          showSearch
          optionFilterProp="children"
          placeholder='Select a option...'
          id='selectmain'
          style={{
            width: '100%',
            cursor: 'pointer'
          }}
          // options={options_antd}
          // style={{
          //   width: '100%'

          // }}
          // allow us to add a new option

          ref={inputRef} onChange={saveDropDown} value={children[1]} size={'large'}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          // set select min width based on the longest option
          dropdownMatchSelectWidth={false}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: '8px 0',
                }}
              />
              <Space
                width='10px'

                style={{
                  padding: '0 8px 4px',

                }}
              >
                <Input
                  placeholder="Please enter item"
                  ref={inputRef}
                  value={name}
                  onChange={onNameChange}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  Add item
                </Button>
              </Space>
            </>
          )}


        >
          {options_antd}



        </Select>
        {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
      </Form.Item >)
      : (



        <Select showSearch

          optionFilterProp="children"
          placeholder='Select a option...'

          id='select' onChange={saveDropDown} value={children[1]} size={'large'}
          // set select min width based on the longest option
          dropdownMatchSelectWidth={false}
          // set box width 
          style={{
            width: '100%',
            cursor: 'pointer'
          }}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          // options={options_antd}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: '8px 0',
                }}
              />
              <Space
                style={{
                  padding: '0 8px 4px',
                }}
              >
                <Input
                  placeholder="Please enter item"
                  ref={inputRef}
                  value={name}
                  onChange={onNameChange}
                  style={{ 'fontSize': '1em' }}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  Add item
                </Button>
              </Space>
            </>
          )}
        >

          {options_antd}
        </Select >


      );



  }

  return <td {...restProps}>{childNode}</td>;
};

// a function that gets api data from a node function
// connect to node backend to get data


// function fetch_data() {
//   fetch('/print_statement', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({}),
//   })
//     .then(response => response.json())
//     // return data to a variable
//     .then(data => {
//       console.log('data', data)
//     })


//     .catch(error => {
//       console.error('Error:', error)
//     })

// }


// resolve the promise

// get fetch data
// console.log('hello', fetched_data)

const Register = () => (

  <div className='Register'>
    <div style={{ display: 'flex', height: '92.55vh' }}>
      <div
        className='MainPanel'
        style={{
          // 'border-radius': '1.5625rem 0   0 1.5625rem',

          // padding: '2% 1% 1% 1%',
          // margin: '1% 1% 2% 1%'
          margin: '-0.7% 0 0 0',
          // 'box-shadow': '0.4375rem 1.5625rem 1.75rem 0.375rem rgba(1, 1, 2, 0.6)',

          'clip-path': 'inset(-15.625rem -15.625rem -15.625rem -15.625rem)'
        }}
      >
        <div
          style={{
            // outline: '0.3125rem solid black',
            padding: '2% 0% 2% 0%',
            margin: '1% 1% 2% 1%',
            'border-radius': '0.9375rem',
            'box-shadow': '0.3125rem 0.5rem 1.5rem 0.3125rem rgba(208, 216, 243, 0.6)',
            height: '90.5vh',
            width: '98vw'
          }}
        >
          {/* <OptionsBar /> */}
          <Form>
            <App></App>
            {/* <Buildtable></Buildtable> */}
          </Form>
        </div>
      </div>
      {/* <SidePanel></SidePanel> */}
    </div>
  </div>
)
export default Register
