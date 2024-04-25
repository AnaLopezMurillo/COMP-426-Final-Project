import { db } from './db.mjs';

async function setupDatabase() {

  await db.run(`
    CREATE TABLE IF NOT EXISTS user (
        pid INTEGER PRIMARY KEY    
    );
  `);

  // Creating the cities table
  await db.run(`
    CREATE TABLE IF NOT EXISTS cities (
        city_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL,                        
        weather TEXT,                              
        wind_speed DECIMAL,                        
        temp DECIMAL,                              
        pid INTEGER,                              
        FOREIGN KEY(pid) REFERENCES user(pid)     
    );
  `);

  // Inserting sample data into the user table
  //await db.run(`INSERT INTO user (pid) VALUES (1001)`);
  //await db.run(`INSERT INTO user (pid) VALUES (1002)`);

  // Inserting sample data into the cities table
  //await db.run(`INSERT INTO cities (name, weather, wind_speed, temp, pid) VALUES ('Springfield', 'Sunny', 5.2, 75, 1001)`);
  //await db.run(`INSERT INTO cities (name, weather, wind_speed, temp, pid) VALUES ('Shelbyville', 'Cloudy', 3.1, 65, 1001)`);
  //await db.run(`INSERT INTO cities (name, weather, wind_speed, temp, pid) VALUES ('Capital City', 'Rainy', 7.4, 60, 1002)`);

  console.log('Database setup complete');
  await db.close();
}
 
setupDatabase();



//Objective of the back-end:

//GET: 
//Should be able to get everything (pids and cities)
//Get cities by pid

//POST: 
//Should be able to post pid (DONE) 
//Post cities to a given pid (DONE)
