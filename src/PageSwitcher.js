import React from 'react';
import ProjectList from './components/ProjectList/ProjectListPage.js';
import Workbench from './components/workbench.js';
import init_tables from './metadata_new/schemaTables';

export function PageSwitcher({token, user, page, setPage}) {

  // Todo: page and project should be moved to a context(?)
  const [keyValue, setKey] = React.useState('init')
  // this can be used instead of setPage to set the page to workbench (when it is not null then render workbench)
  const [project, setProject] = React.useState(null)
  
  const [projectDataTable, setProjectDataTable] = React.useState(init_tables)
  
  if (page === 'workbench') {
    return (
      <Workbench token={token} user={user} setPage={setPage} page={page} project={project} keyValue={keyValue} projectDataTable={projectDataTable} />
    );
  }
  else if (page === 'projectList') {
    return (
      <ProjectList token={token} user={user} setPage={setPage} setProject={setProject} setKey={setKey} setProjectDataTable={setProjectDataTable}/>
    );
  }
}

