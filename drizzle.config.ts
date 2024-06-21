import { config } from  "dotenv";
import {defineConfig} from "drizzle-kit"

config({path:".env.local"})

export default defineConfig({
    schema:"./db/schema.ts",
    driver:"pg",
    dbCredentials:{
        connectionString:"postgresql://finance_owner:iMIdyR1qeoU0@ep-patient-cell-a5q5gvjg.us-east-2.aws.neon.tech/finance?sslmode=require"
    },
    verbose:true,
    strict:true
})