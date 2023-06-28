import { Menu, Button, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';


function AppsAndAnalysisPage() {
  const [selectedApp, setSelectedApp] = useState("https://webalign.apps-dev.hbp.eu/?clb-collab-id=space-for-testing-the-nutil-web-applicat");
  const [disableCreatedBrains, setDisableCreatedBrains] = useState(false);

  const handleAppSelect = (appUrl) => {
    setSelectedApp(appUrl);
    const iframe = document.getElementById("apps-iframe");
    // set the height to 100vh
    iframe.style.height = "94vh";
    const iframeContainer = document.getElementById("iframeContainer");
    iframeContainer.style.height = "94vh";
    // disable the "Created Brains" menu if WebIlastik or NutilWeb is selected
    if (appUrl.includes("https://app.ilastik.org/") || appUrl.includes("https://nutil.apps-dev.hbp.eu/")) {
      setDisableCreatedBrains(true);
    } else {
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
  const [currentlySelectedBrain, setCurrentlySelectedBrain] = useState("");

const handleMenuSelect = ({ key }) => {
  const selectedBrain = menuItems[key].props.children;
  console.log(selectedBrain)
  setCurrentlySelectedBrain(selectedBrain);
};


  let menuStyle = {
    width: '10vw',
    backgroundColor:'white'
  }
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("https://data-proxy.ebrains.eu/api/v1/buckets/space-for-testing-the-nutil-web-applicat?prefix=.nesysWorkflowFiles/alignmentJsons/&delimiter=%2F&limit=50")
      .then(response => response.json())
.then(data => {
  const items = data.objects.slice(1).map((object, index) => {
    console.log(object.name)
    const name = object.name.substring(object.name.lastIndexOf("/") + 1);
    const nameWithoutExtension = name.split(".").slice(0, -1).join(".");

    return <Menu.Item key={index}>{nameWithoutExtension}</Menu.Item>;
  });
  setMenuItems(items);
})
        
      .catch(error => console.error(error));
  }, []);

  
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div id="sideBarApps" style={menuStyle}>
        <div style={{ fontWeight: 'bold' }}>Created Brains</div>
        <Menu disabled={disableCreatedBrains} onSelect={handleMenuSelect}>
        {menuItems}
        
        </Menu>
        <div style={{ fontWeight: 'bold' }}>Apps</div>
        <Menu style={{ justifyContent: "center" }}>
  <Menu.Item onClick={() => handleAppSelect("https://webalign.apps-dev.hbp.eu/?clb-collab-id=space-for-testing-the-nutil-web-applicat&filename="+currentlySelectedBrain+'.waln')}>
    <span style={{ marginLeft: "5px", marginRight: "5px" }}>WebAlign</span>
    <Tooltip title="Launch WebAlign">
    <Button shape="circle" size="small" style={{ marginLeft: "1.1rem", marginRight: "5px" }}>
        <InfoCircleOutlined />
      </Button>
    </Tooltip>
  </Menu.Item>
  <Menu.Item onClick={() => handleAppSelect("https://lz-nl.apps.hbp.eu/webwarp.html?clb-collab-id=space-for-testing-the-nutil-web-applicat")}>
    <span style={{ marginLeft: "5px", marginRight: "5px" }}>WebWarp</span>
    <Tooltip title="Launch WebWarp">
    <Button shape="circle" size="small" style={{ marginLeft: "1rem", marginRight: "5px" }}>
        <InfoCircleOutlined />
      </Button>
    </Tooltip>
  </Menu.Item>
  <Menu.Item onClick={() => handleAppSelect(`https://app.ilastik.org/public/nehuba/index.html#!{"layout":"xy"}?clb-collab-id=space-for-testing-the-nutil-web-applicat`)}>
    <span style={{ marginLeft: "5px", marginRight: "5px" }}>WebIlastik</span>
    <Tooltip title="Launch WebIlastik">
    <Button shape="circle" size="small" style={{ marginLeft: "0.8rem", marginRight: "5px" }} >
        <InfoCircleOutlined />
      </Button>
    </Tooltip>
  </Menu.Item>
<Menu.Item onClick={() => handleAppSelect("https://nutil.apps-dev.hbp.eu/")} style={{ display: "flex", alignItems: "center" }}>
  <span style={{ marginLeft: "5px", marginRight: "5px" }}>NutilWeb</span>
  <Tooltip title="Launch NutilWeb">
    <Button shape="circle" size="small" style={{ marginLeft: "1rem", marginRight: "5px" }}>
      <InfoCircleOutlined />
    </Button>
  </Tooltip>
</Menu.Item>
</Menu>
        <Button type='primary' onClick={handleFullScreen}>Full Screen</Button>
      </div>
      <div id="iframeContainer" style={{ width: '90vw', height: '100vh', float: 'right' }}>
        <iframe id="apps-iframe" title="Apps and Analysis" src={selectedApp} style={{ background: 'white', height: '100%', width: '100%', border: '0' }}></iframe>
      </div>
    </div>
  )
}

export default AppsAndAnalysisPage;