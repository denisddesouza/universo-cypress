const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env:{
    apiServer: 'https://samuraibs-api-qaddenis.fly.dev'
  },
  defaultCommandTimeout: 30000,
  viewportHeight: 900,
  viewportWidth: 1440,
  videoCompression: false,
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
         const { Pool } = require('pg')

         const pool = new Pool({
            // host: 'localhost',
            // user: 'postgres',
            // password: 'sined',
            // database: 'SamuraiBS-Dev',
            // port: 5432
            host: 'bubble.db.elephantsql.com',
            user: 'hxqomvqk',
            password: 'BpYfgak0_YpGzBeyM7A0SpIfugkTpa1z',
            database: 'hxqomvqk',
            port: 5432
         })
         

         on('task', {
          removeUser(email){
            return new Promise(function(resolve){
              pool.query('DELETE from public.users  WHERE email = $1' , [email], function(error, result){
                if(error){
                  throw error
                }
                resolve({success: result})
              })
            })
            
          }
        })

        //const { Pool } = require('pg')

    },
    
      baseUrl: 'https://samuraibs-web-qaddenis.fly.dev',
      testIsolation: true
      
  },

  
});


