use nbw;
insert into user(lastname,firstname) values('Nicolaas','G');
insert into user(lastname,firstname) values('Harry','C');


insert into roletype(value) values('admin');
insert into roletype(value) values('user');

insert into projecttype(name) values('quint');
insert into projecttype(name) values('quant');

insert into tasktype(name) values('visualalign');
insert into tasktype(name) values('nutil');
insert into tasktype(name) values('ilastik');




insert into treatment_group(name) values('High/Low dose');
insert into treatment_group(name) values('Control');

insert into project(name,projecttype_id) values('My Little Project',1);
insert into brain(name,group_id,project_id) values('My Little Brain',1,1);

insert into projectrole(project_id,user_id,roletype_id) values(1,1,1);

insert into task(tasktype_id,project_id,percentage) values(1,1,25);
insert into task(tasktype_id,project_id,percentage) values(2,1,25);
insert into task(tasktype_id,project_id,percentage) values(3,1,25);

