insert into houserUsers (username, encryptedPassword)
values ($1, $2)
returning *