import React from 'react';
import ProjectList from './components/ProjectList/ProjectListPage.js';
import Workbench from './components/workbench.js';
import init_tables from './metadata_new/schemaTables';

export function PageSwitcher({page, token, user, setPage, setProject, project}) {
  console.log('rerender pageSwitcher')
  console.log('page', page)
  const [projectDataTable, setProjectDataTable] = React.useState(init_tables)

  if (page === 'workbench') {
    return (
      <Workbench token={token} user={user} setPage={setPage} page={page} project={project} projectDataTable={projectDataTable} />

    );
  }
  else if (page === 'projectList') {
    return (
      <ProjectList token={token} user={user} setPage={setPage} setProject={setProject}  setProjectDataTable={setProjectDataTable}/>
    );
  }
}

