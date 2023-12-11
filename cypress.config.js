const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env:{
    apiServer: 'http://localhost:3333'
  },

  viewportHeight: 900,
  viewportWidth: 1440,
  videoCompression: true,
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
         const { Pool } = require('pg')

         const pool = new Pool({
            host: 'localhost',
            user: 'postgres',
            password: 'sined',
            database: 'SamuraiBS-Dev',
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
    
      baseUrl: 'http://localhost:3000',
      testIsolation: true
      
  },

  
});


