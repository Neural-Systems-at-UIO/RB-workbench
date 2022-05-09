sudo apt-get install apache2
sudo apt install mysql-server
sudo apt install php libapache2-mod-php php-mysql
move default /var/www/html to point to the rb-workbench repo/php (ln -s /home/ubuntu/rb-workbench/php html)
setup mysql user
 - mysql -u root -p
 - create user 'nbw-user'@'localhost' identified by 'the-password';
 - create database nbw;
 - grant all privileges on nbw.* to 'nbw-user'@'localhost';
 - Import database: mysql -u nbw-user -p nbw < database.sql

npm make sure you have the newest version of node.js and npm:
- sudo apt-get install npm
- npm install --global pm2
- npm install
- 

