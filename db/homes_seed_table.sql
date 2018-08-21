CREATE TABLE homes(home_id serial primary key, userid serial REFERENCES houserUsers(userid), home_name VARCHAR(100), description VARCHAR(500), loan int, monthly_mortgage int, recommended_rent int, desired_rent int, address varchar(180), city varchar(80), img_alt varchar(125), img_url varchar)