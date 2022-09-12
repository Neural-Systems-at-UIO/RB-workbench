@import '~antd/dist/antd.css';
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #f8fafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* body{transform: scale(1.5);
  transform-origin: 0 0;}
 */
 i{
  font-size:29px;
  }
  .ant-tabs-large > .ant-tabs-nav .ant-tabs-tab {
    font-size: 200%;
  }

/* make ant design webpage red */
.ant-layout {
	background: #e8efff;
}


.ant-tabs-nav {
  background-color: #e8efff;
  z-index: 0;
}
/* .card-container {
  box-shadow: 5px 8px 24px 5px rgba(1, 1, 2, 0.6);
} */

.ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active {
	border-bottom-color: #f1f4fa;
  
  color: #1890ff;
	background: #f1f4fa;
  z-index: 999;
  position:relative;
}

.ant-tabs-top > .ant-tabs-nav, .ant-tabs-bottom > .ant-tabs-nav, .ant-tabs-top > div > .ant-tabs-nav, .ant-tabs-bottom > div > .ant-tabs-nav {
	margin: 0 0 0.5% 0;
}
.ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab {
	border-bottom-color: #f1f4fa;
	color: #1890ff;
	background: #f1f4fa;
	position: relative;
  border-radius: 15px 15px 0 0;
  box-shadow: 7px 25px 28px 6px rgba(1, 1, 2, 0.6);
  clip-path: (250px 250px 250px 0px);
}


