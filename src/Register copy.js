import { Table, Button, Form, Input, Select, } from 'antd'
// import styled from 'styled-components'
import datasource from './datasource.js'
import './Register.css'
import SidePanel from './SidePanel.js'
// import OptionsBar from './options-bar.js'
import metadata from './metadata'
// import { render } from '@umijs/deps/compiled/mustache'
import React, { useContext, useEffect, useRef, useState } from 'react';
// const { Title } = Typography
import { Menu, Dropdown, message, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import './options-bar.css'
const EditableContext = React.createContext(null);
const { Option } = Select;
function width_calc(column_name, font) {
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
      return metadata['AgeCategory'][a.AgeCategory].localeCompare(metadata['AgeCategory'][b.AgeCategory])

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
      return metadata['BiologicalSex'][a.BiologicalSex].localeCompare(metadata['BiologicalSex'][b.BiologicalSex])

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
      return metadata['Species'][a.Species].localeCompare(metadata['Species'][b.Species])
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
      return metadata['Strain'][a.Strain].localeCompare(metadata['Strain'][b.Strain])
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
      if (a.Subject == null) {
        return 1;
      }
      if (b.Subject == null) {
        return -1;
      }
      return a.Subject.localeCompare(b.Subject)

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
      return metadata['Phenotype'][a.Phenotype].localeCompare(metadata['Phenotype'][b.Phenotype])
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
      return metadata['Handedness'][a.Handedness].localeCompare(metadata['Handedness'][b.Handedness])
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
      return metadata['Laterality'][a.Laterality].localeCompare(metadata['Laterality'][b.Laterality])
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
      if (a.Subject == null) {
        return 1;
      }
      if (b.Subject == null) {
        return -1;
      }
      return a.Subject.localeCompare(b.Subject)

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
      if (a.Subject == null) {
        return 1;
      }
      if (b.Subject == null) {
        return -1;
      }
      return a.Subject.localeCompare(b.Subject)

    },
    sortDirections: ['descend', 'ascend', 'descend'],
    width: width_calc('Sampletype'),
    editable: true,

  }
]

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

var sel_rows = []

function App() {
  var [statefulColumns, setStatefulColumns] = useState(defaultColumns)

  // datasource = {}
  var [DataSource, SetDataSource] = useState([{
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

  }])

  // console.log('NOW')
  var count = DataSource.length
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

    SetDataSource([...DataSource, newData]);
  };
  const handleDuplicate = () => {
    count += 1;
    // duplicate selected rows
    for (var i = 0; i < sel_rows.length; i++) {
      console.log('i', i)
      var new_row = JSON.parse(JSON.stringify(DataSource[sel_rows[i] - 1]));

      console.log('ds')
      console.log(DataSource)
      console.log('--')
      console.log(sel_rows[i])
      console.log(DataSource[sel_rows[i] - 1])
      new_row['key'] = count.toString()
      console.log('new_row', new_row)
      console.log('DataSource', DataSource)
      // new_row.key = count.toString()
      DataSource = [...DataSource, new_row]
      count += 1
    }
    console.log(DataSource)
    SetDataSource(DataSource);
  };
  //   const newData = {
  //     key: count.toString(),
  //     Subject: null,
  //     BiologicalSex: null,
  //     AgeCategory: null,
  //     Species: null,
  //     Age: null,
  //     Weight: null,
  //     Strain: null,
  //     Pathology: null,
  //     Phenotype: null,
  //     Handedness: null,
  //     Laterality: null,
  //     Origin: null,
  //     Sampletype: null
  //   };
  //   // DataSource.push(newData)

  //   SetDataSource([...DataSource, newData]);
  // };
  const handleDelete = () => {

    // console.log(sel_rows)
    for (var i = 0; i < sel_rows.length; i++) {
      // console.log(i)
      // delete selected rows
      DataSource = DataSource.filter(item => item.key !== sel_rows[i])
    }
    // reset keys 
    for (var i = 0; i < DataSource.length; i++) {
      DataSource[i].key = (i + 1).toString()
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
    SetDataSource(DataSource)
    setSelected([])
    // DataSource.push(newData)

    // SetDataSource([...DataSource, newData]);
  };
  const OptionsBar = () => (
    <div>
      <div style={{ padding: '0 ', textAlign: 'left' }} className='OptionsBar'>

        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={handleDuplicate}>Duplicate Selected</Button>

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
      for (var i in selectedRowKeys) {
        console.log(i)
      }
    },
    getCheckboxProps: (record) => {
      // set all checkboxes to true
      return {
        // checked: true
      }

    }

  }
  const handleSave = (row, event, dataIndex) => {

    const OldData = [...DataSource];
    const index = OldData.findIndex((item) => row.key === item.key);
    const item = OldData[index];
    console.log('index', index)
    console.log('item', item)
    console.log('row', row)
    console.log('event2', event)



    var columns = (Object.keys(row))

    // console.log('columns', columns)
    for (var key in Object.keys(row)) {
      var id = columns[key]


      if (row[id] !== item[id]) {
        // console.log('row_key', row[id])
        // console.log('item_key', item[id])
        var match_col = id
        var match_value = row[id]
        OldData.splice(index, 1, { ...item, ...row });

      }
    }
    if (typeof event !== 'undefined') {
      // console.log('this works')
      match_col = dataIndex
      match_value = event
      var temp_row = OldData[index]
      temp_row[match_col] = match_value
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
    setStatefulColumns(statefulColumns)
    // console.log(OldData)
    // OldData has now become newdata
    SetDataSource(OldData);
  };






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
        dataSource={DataSource}
        scroll={{ x: '30vh', y: '76vh' }}
        pagination={false}
      />
    </div >
  )
}

// function fetch_api() {
//   var return_data
//   const data = fetch('http://localhost:8080/print_statement', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({}),
//   })
//     .then(response => response.json())
//     .then(data => {
//       return_data = data
//       console.log('1:', return_data)

//       // for (let i = 0; i < data["data"].length; i++) {
//       //   console.log('data_test', data['data'][i]["https://openminds.ebrains.eu/vocab/name"])
//       //   var option = (data['data'][i]["https://openminds.ebrains.eu/vocab/name"])
//       //   options_antd.push(<Option value={option} >{option}</Option>);

//     })

//     // 
//     .catch(error => {
//       console.error('Error:', error)
//     })
//   console.log('2:', return_data)
// }


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

    setEditing(!editing);

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
    let options_antd = []
    let options_ = metadata[dataIndex]

    const Add = options_.map(Add => Add
    )
    for (let i = 0; i < options_.length; i++) {
      // var option = (data['data'][i]["https://openminds.ebrains.eu/vocab/name"])
      var option = (options_[i])
      option = <Option value={option} >{option}</Option>


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
        <Select
          showSearch
          optionFilterProp="children"
          placeholder='Select a option...'
          id='selectmain'
          // style={{
          //   width: '100%'

          // }}
          ref={inputRef} onChange={saveDropDown} value={children[1]} size={'large'}
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          // set select min width based on the longest option
          dropdownMatchSelectWidth={false}


        >
          {
            Add.map((address, key) => <option value={key}>{address}</option>)
          }

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
            width: '100%'
          }}
        >
          {
            Add.map((address, key) => <option value={key}>{address}</option>)
          }

          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}

        </Select >


      );



  }

  return <td {...restProps}>{childNode}</td>;
};

// a function that gets api data from a node function


// function fetch_data() {
//   fetch('/get_data', {
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
            width: '78.5vw'
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
