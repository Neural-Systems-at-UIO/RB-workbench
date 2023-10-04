import { Menu, Button, Tooltip, Modal , Table} from 'antd';
import React, { useState, useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

function AppsAndAnalysisPage(props) {
  const [selectedApp, setSelectedApp] = useState("");
  const [unsetSelectedApp, setUnsetSelectedApp] = useState("");
  const [disableCreatedBrains, setDisableCreatedBrains] = useState(true);
  const [currentlySelectedBrain, setCurrentlySelectedBrain] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(['']);
  const [BrainMenuHeader, setBrainMenuHeader] = useState("Created Brains");
  const handleAppSelect = (appUrl) => {
    // setSelectedKeys([])
    setUnsetSelectedApp(appUrl);
    setSelectedApp("")
    // setCurrentlySelectedBrain(""); // reset currentlySelectedBrain to empty string
    // set classname of all menu items to "ant-menu-item ant-menu-item-only-child"
    // setMenuItems(menuItems.map(item => ({ ...item, props: { ...item.props} })));
    
    const iframe = document.getElementById("apps-iframe");
    // if iframe exists change the style
    // if (iframe) {
    //     // hack bc ilastik resizes the iframe 
    // // set the height to 100vh
    //     iframe.style.height = "94vh";
    //     const iframeContainer = document.getElementById("iframeContainer");
    //     iframeContainer.style.height = "94vh";
    // }


    // disable the "Created Brains" menu if WebIlastik or NutilWeb is selected
    if (appUrl.includes("https://app.ilastik.org/") || appUrl.includes("https://pynutil-test.apps.hbp.eu/")) {
      setDisableCreatedBrains(true);
      setSelectedApp(appUrl);
      setSelectedApp(`${appUrl}`);
    } else {
      setBrainMenuHeader("Select one brain")

      setDisableCreatedBrains(false);
      setSelectedApp(`${appUrl}&filename=.nesysWorkflowFiles/alignmentJsons/${currentlySelectedBrain}.waln`);

    }
    console.log('currentlySelectedBrain', currentlySelectedBrain)

  }
  const [progressWidgetOpen, setProgressWidgetOpen] = useState(false);
  const launchProgressWidget = () => {
    setProgressWidgetOpen(true);
  }
  

  const handleFullScreen = () => {
    const iframe = document.getElementById("apps-iframe");
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) { /* Safari */
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE11 */
      iframe.msRequestFullscreen();
    }
  }

  const handleMenuSelect = ({ key }) => {
    const selectedBrain = menuItems[key].props.children;
    setSelectedKeys([key]);
    setCurrentlySelectedBrain(selectedBrain);
    setSelectedApp(`${unsetSelectedApp}&filename=.nesysWorkflowFiles/alignmentJsons/${selectedBrain}.waln`);
  };

  let menuStyle = {
    backgroundColor:'#fbf8fc',
  };

  const [menuItems, setMenuItems] = useState([]);
  
  useEffect(() => {
    fetch(`https://data-proxy.ebrains.eu/api/v1/buckets/${props.keyValue}?prefix=.nesysWorkflowFiles/alignmentJsons/&delimiter=%2F&limit=50`)
      .then(response => response.json())
      .then(data => {
        const items = data.objects.slice(1).map((object, index) => {
          const name = object.name.substring(object.name.lastIndexOf("/") + 1);
          const nameWithoutExtension = name.split(".").slice(0, -1).join(".");
          return <Menu.Item key={index}>{nameWithoutExtension}</Menu.Item>;
        });
        setMenuItems(items);
      })
      .catch(error => console.error(error));
  }, []);
  console.log("unsetSelectedApp", unsetSelectedApp)
  console.log("unsetSelectedApp", unsetSelectedApp === "")
  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
        <div id="sideBar" style={{ ...menuStyle ,display: "flex", flexDirection: "row"}}>
      <div id="sideBarApps" style={{ ...menuStyle, width: "10vw"}}>
        <div style={{ fontWeight: 'bold', marginTop:'3rem', marginBottom:'1rem', fontSize: '1.5em'}}>Apps</div>
        <Menu style={{ justifyContent: "center" , backgroundColor:'#fbf8fc'}}>
          <Menu.Item onClick={() => handleAppSelect(`https://webalign.apps-dev.hbp.eu/?clb-collab-id=${props.keyValue}`)}>
            <span style={{ marginLeft: ".3125rem", marginRight: ".3125rem" }}>WebAlign</span>
            <Tooltip title="Launch WebAlign">
              <Button shape="circle" size="small" style={{ marginLeft: "1.1rem", marginRight: ".3125rem" }}>
                <InfoCircleOutlined />
              </Button>
            </Tooltip>
          </Menu.Item>
          <Menu.Item onClick={() => handleAppSelect(`https://lz-nl.apps.hbp.eu/webwarp.php?clb-collab-id=${props.keyValue}`)}>
            <span style={{ marginLeft: ".3125rem", marginRight: ".3125rem" }}>WebWarp</span>
            <Tooltip title="Launch WebWarp">
              <Button shape="circle" size="small" style={{ marginLeft: "1rem", marginRight: ".3125rem" }}>
                <InfoCircleOutlined />
              </Button>
            </Tooltip>
          </Menu.Item>
          <Menu.Item onClick={() => handleAppSelect(`https://app.ilastik.org/public/nehuba/index.html?output_path_pattern=/.nesysWorkflowFiles/ilastikOutputs/{parent_dir_name}/{name}.{extension}&ebrains_bucket_name=${props.keyValue}&ebrains_bucket_path=.nesysWorkflowFiles/zippedPyramids/#!{"layout":"xy"}`)}>
            <span style={{ marginLeft: ".3125rem", marginRight: ".3125rem" }}>WebIlastik</span>
            <Tooltip title="Launch WebIlastik">
              <Button shape="circle" size="small" style={{ marginLeft: "0.8rem", marginRight: ".3125rem" }} >
                <InfoCircleOutlined />
              </Button>
            </Tooltip>
          </Menu.Item>
          <Menu.Item onClick={() => handleAppSelect(`https://pynutil-test.apps.hbp.eu/?clb-collab-id=${props.keyValue}`)} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginLeft: ".3125rem", marginRight: ".3125rem" }}>NutilWeb</span>
            <Tooltip title="Launch NutilWeb">
              <Button shape="circle" size="small" style={{ marginLeft: "1rem", marginRight: ".3125rem" }}>
                <InfoCircleOutlined />
              </Button>
            </Tooltip>
          </Menu.Item>
        </Menu>
    <Button type='primary' onClick={handleFullScreen} style={{ width: "8rem", height:"4rem", whiteSpace: "normal", marginTop:'1rem' }} disabled={!currentlySelectedBrain}>Full Screen the Application</Button> 
    <br></br>
    <Button type='primary' onClick={launchProgressWidget} style={{ width: "8rem", height:"4rem", whiteSpace: "normal", marginTop:'1rem' }} >View Progress Widget</Button> 
    <Modal title="Progress Widget" visible={progressWidgetOpen} onOk={() => setProgressWidgetOpen(false)} onCancel={() => setProgressWidgetOpen(false)}>
    <Table columns={[
  {
    title: 'Brain ID',
    dataIndex: 'BrainID',
  },
  {
    title: 'WebAlign',
    dataIndex: 'WebAlign',
  },
  {
    title: 'WebWarp',
    dataIndex: 'WebWarp',
  },
  {
    title: 'WebIlastik',
    dataIndex: 'WebIlastik',
  },
  {
    title: 'NutilWeb',
    dataIndex: 'NutilWeb',
  },
]} dataSource={[
  {
    key: '1',
    BrainID: '71717640',
    // tick emoji
    WebAlign:'✔️',
    WebWarp: '❌',
    WebIlastik: '❌',
    NutilWeb: '❌',
  },
  {
    key: '2',
    BrainID: '71717641',
    // tick emoji
    WebAlign:'✔️',
    WebWarp: '❌',
    WebIlastik: '❌',
    NutilWeb: '❌',
  },
  {
    key: '3',
    BrainID: '71717642',
    // tick emoji
    WebAlign:'✔️',
    WebWarp: '❌',
    WebIlastik: '❌',
    NutilWeb: '❌',
  },
]} size="small" />
    </Modal>
    </div>
      <div id="sideBarBrains" style={{ ...menuStyle, 'white-space': 'nowrap',  maxWidth: disableCreatedBrains ? 0 : '10vw', width:'10vw', overflow: 'hidden', transition: 'max-width 0.5s ease-in-out' }}>
        <div style={{ fontWeight: 'bold' ,marginTop:'3rem', fontSize: '1.5em',marginBottom:'1rem'}}>{BrainMenuHeader}</div>
        <Menu disabled={disableCreatedBrains} onSelect={handleMenuSelect} selectedKeys={selectedKeys} style={{backgroundColor:'#fbf8fc'}}>
          {menuItems}
        </Menu>
      </div>
    </div>
    <div id="iframeContainer" style={{ width: '90vw', height: '100vh', float: 'right' }}>
      {(disableCreatedBrains & (selectedApp!=="")) ? (
  <iframe id="apps-iframe" title="Apps and Analysis" src={selectedApp} style={{ background: 'white', height: 'calc(100vh - 3.875rem)', width: '100%', border: '0' , overflow:'auto'}}></iframe>
) :(menuItems.length == 0) ?(
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background:"white"}}>
  <span style={{ fontSize: '2em', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: 'white' }}>  You havent created any brains,<br></br> start by creating a brain in the file creator tab
  </span>    
</div>
)

  : !unsetSelectedApp ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background:"white"}}>
    <span style={{ fontSize: '2em', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: 'white' }}>Please start by selecting an app</span>    
  </div>
) : currentlySelectedBrain === "" ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background:"white"}}>
    <span style={{ fontSize: '2em', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: 'white' }}>Please select a brain to view in the app.</span>    
  </div>
) : (
  <iframe id="apps-iframe" title="Apps and Analysis" src={selectedApp} style={{ background: 'white', height: '100vh', width: '100%', border: '0' }} ></iframe>
)}
    </div>
    </div>
  )
}

export default AppsAndAnalysisPage;
