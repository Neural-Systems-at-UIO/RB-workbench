cat drop.txt database.sql testdata.sql >all.sql
mysql -u nbw-user -p nbw < all.sql
#mysql -u nbw-user -p nbw < database.sql
#mysql -u nbw-user -p nbw < testdata.sql
