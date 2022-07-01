drop database nbw;
create database nbw;
use nbw;
CREATE TABLE `brain`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NULL,
    `group_id` INT NULL,
    `project_id` INT NOT NULL
);
CREATE TABLE `projecttype`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NULL
);
CREATE TABLE `project`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `projecttype_id` INT NOT NULL
);
CREATE TABLE `projectrole`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `project_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `roletype_id` INT NOT NULL
);
CREATE TABLE `roletype`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `value` VARCHAR(255) NOT NULL
);
CREATE TABLE `treatment_group`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NULL
);
CREATE TABLE `user`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `lastname` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NULL
);
CREATE TABLE `task`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `tasktype_id` INT NOT NULL,
    `project_id` INT NOT NULL,
    `percentage` INT NOT NULL
);
CREATE TABLE `tasktype`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
CREATE TABLE `section`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `brain_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `filename` VARCHAR(255) NOT NULL
);
CREATE TABLE `taskmetadata`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `task_id` INT NOT NULL,
    `brain_id` INT NOT NULL,
    `data` VARCHAR(255) NOT NULL,
    `taskmetadatatype_id` INT NOT NULL
);
CREATE TABLE `taskmetadatatype`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
<<<<<<< HEAD
=======
ALTER TABLE
    `project` ADD CONSTRAINT `project_projecttype_id_foreign` FOREIGN KEY(`projecttype_id`) REFERENCES `projecttype`(`id`);
ALTER TABLE
    `projectrole` ADD CONSTRAINT `projectrole_project_id_foreign` FOREIGN KEY(`project_id`) REFERENCES `project`(`id`);
ALTER TABLE
    `projectrole` ADD CONSTRAINT `projectrole_roletype_id_foreign` FOREIGN KEY(`roletype_id`) REFERENCES `roletype`(`id`);
ALTER TABLE
    `brain` ADD CONSTRAINT `brain_group_id_foreign` FOREIGN KEY(`group_id`) REFERENCES `treatment_group`(`id`);
ALTER TABLE
    `task` ADD CONSTRAINT `task_project_id_foreign` FOREIGN KEY(`project_id`) REFERENCES `project`(`id`);
>>>>>>> c0e85d33ec8f3033668c25d7f016b244d3e1eed0
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

