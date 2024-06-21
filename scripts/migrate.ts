import { neon } from "@neondatabase/serverless"
import { error } from "console"
import {config} from "dotenv"
import { drizzle } from "drizzle-orm/neon-http";
import {migrate} from "drizzle-orm/neon-http/migrator"

config({
    path:".env.local",

})

// const sql = neon(process.env.DATABASE_URL!)
const sql = neon("postgresql://finance_owner:iMIdyR1qeoU0@ep-patient-cell-a5q5gvjg.us-east-2.aws.neon.tech/finance?sslmode=require")
const db = drizzle(sql)
const main = async()=>{
try{    
    await migrate(db,{  
        migrationsFolder:"drizzle"
    })

}catch(err){
        console.error(error)
        process.exit(1)
}

}

main()