import { Menu, Button, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

function AppsAndAnalysisPage(props) {
  const [selectedApp, setSelectedApp] = useState("");
  const [unsetSelectedApp, setUnsetSelectedApp] = useState("");
  const [disableCreatedBrains, setDisableCreatedBrains] = useState(true);
  const [currentlySelectedBrain, setCurrentlySelectedBrain] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(['0']);
  const [BrainMenuHeader, setBrainMenuHeader] = useState("Created Brains");
  const handleAppSelect = (appUrl) => {
    setSelectedKeys([])
    setUnsetSelectedApp(appUrl);
    setSelectedApp("")
    setCurrentlySelectedBrain(""); // reset currentlySelectedBrain to empty string
    // set classname of all menu items to "ant-menu-item ant-menu-item-only-child"
    setMenuItems(menuItems.map(item => ({ ...item, props: { ...item.props} })));
    
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
    if (appUrl.includes("https://app.ilastik.org/") || appUrl.includes("https://nutil.apps-dev.hbp.eu/")) {
      setDisableCreatedBrains(true);
      setSelectedApp(appUrl);

    } else {
      setBrainMenuHeader("Select one brain")

      setDisableCreatedBrains(false);
    }
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
    backgroundColor:'white'
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
        <div style={{ fontWeight: 'bold' }}>Apps</div>
        <Menu style={{ justifyContent: "center" }}>
          <Menu.Item onClick={() => handleAppSelect(`https://webalign.apps-dev.hbp.eu/?clb-collab-id=${props.keyValue}`)}>
            <span style={{ marginLeft: ".3125rem", marginRight: ".3125rem" }}>WebAlign</span>
            <Tooltip title="Launch WebAlign">
              <Button shape="circle" size="small" style={{ marginLeft: "1.1rem", marginRight: ".3125rem" }}>
                <InfoCircleOutlined />
              </Button>
            </Tooltip>
          </Menu.Item>
          <Menu.Item onClick={() => handleAppSelect(`https://lz-nl.apps.hbp.eu/webwarp.html?clb-collab-id=${props.keyValue}`)}>
            <span style={{ marginLeft: ".3125rem", marginRight: ".3125rem" }}>WebWarp</span>
            <Tooltip title="Launch WebWarp">
              <Button shape="circle" size="small" style={{ marginLeft: "1rem", marginRight: ".3125rem" }}>
                <InfoCircleOutlined />
              </Button>
            </Tooltip>
          </Menu.Item>
          <Menu.Item onClick={() => handleAppSelect(`https://app.ilastik.org/public/nehuba/index.html#!{"layout":"xy"}?clb-collab-id=${props.keyValue}`)}>
            <span style={{ marginLeft: ".3125rem", marginRight: ".3125rem" }}>WebIlastik</span>
            <Tooltip title="Launch WebIlastik">
              <Button shape="circle" size="small" style={{ marginLeft: "0.8rem", marginRight: ".3125rem" }} >
                <InfoCircleOutlined />
              </Button>
            </Tooltip>
          </Menu.Item>
          <Menu.Item onClick={() => handleAppSelect("https://nutil.apps-dev.hbp.eu/")} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginLeft: ".3125rem", marginRight: ".3125rem" }}>NutilWeb</span>
            <Tooltip title="Launch NutilWeb">
              <Button shape="circle" size="small" style={{ marginLeft: "1rem", marginRight: ".3125rem" }}>
                <InfoCircleOutlined />
              </Button>
            </Tooltip>
          </Menu.Item>
        </Menu>
        <Button type='primary' onClick={handleFullScreen}>Full Screen the Application</Button>
      </div>
      <div id="sideBarBrains" style={{ ...menuStyle, 'white-space': 'nowrap',  maxWidth: disableCreatedBrains ? 0 : '10vw', width:'10vw', overflow: 'hidden', transition: 'max-width 0.5s ease-in-out' }}>
        <div style={{ fontWeight: 'bold' }}>{BrainMenuHeader}</div>
        <Menu disabled={disableCreatedBrains} onSelect={handleMenuSelect} selectedKeys={selectedKeys}>
          {menuItems}
        </Menu>
      </div>
    </div>
    <div id="iframeContainer" style={{ width: '90vw', height: '100vh', float: 'right' }}>
      {(disableCreatedBrains & (selectedApp!=="")) ? (
  <iframe id="apps-iframe" title="Apps and Analysis" src={selectedApp} style={{ background: 'white', height: '94vh', width: '100%', border: '0' , overflow:'auto'}}></iframe>
) : !unsetSelectedApp ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background:"white"}}>
    <span style={{ fontSize: '2em', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: 'white' }}>Please start by selecting an app</span>    
  </div>
) : currentlySelectedBrain === "" ? (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background:"white"}}>
    <span style={{ fontSize: '2em', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: 'white' }}>Please select a brain to view in the app.</span>    
  </div>
) : (
  <iframe id="apps-iframe" title="Apps and Analysis" src={selectedApp} style={{ background: 'white', height: '100%', width: '100%', border: '0' }}></iframe>
)}
    </div>
    </div>
  )
}

export default AppsAndAnalysisPage;