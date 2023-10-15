//https://github.com/typeorm/typeorm/issues/4714

import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
//import { User } from '../entities/User';
import { Localidade } from "@/app/models/Localidade";
import { Pais } from "@/app/models/Pais";
import { Estado } from "@/app/models/Estado";
import { Cidade } from "@/app/models/Cidade";
import { Indicador } from "@/app/models/Indicador";
import { Fonte } from "@/app/models/Fonte"
import { Eixo } from "@/app/models/Eixo";
import { ValorIndicador } from "@/app/models/ValorIndicador";


//const entitiesPath = join(process.cwd(),'src/app/models/**/*.ts');
/*
import { join } from 'path';
console.log(entitiesPath);

let options_env = {
    "type": "postgres",
    "host": process.env.TYPEORM_HOST,
    "port": Number(process.env.TYPEORM_PORT),
    "username": process.env.TYPEORM_USERNAME,
    "password": process.env.TYPEORM_PASSWORD,
    "database": process.env.TYPEORM_DATABASE,
    "logging": Boolean(process.env.TYPEORM_LOGGING),
    "synchronize": Boolean(process.env.TYPEORM_SYNCHRONIZE),
    "entities":[entitiesPath],
}

import dotenv from "dotenv";
dotenv.config();
*/

let options: DataSourceOptions;

options = {
    type: 'oracle',
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    connectString: process.env.TYPEORM_CONNECTSTRING,
    logging: false,
    logger: 'advanced-console',
    synchronize: false,
    entities: [Cidade, Eixo, Estado, Fonte, Indicador, Localidade, Pais, ValorIndicador],
}



export const AppDataSource = new DataSource({
    ...options
});

export const initializeDatabase = async (): Promise<void> => {
    if (!AppDataSource.isInitialized) {
        try {
            await AppDataSource.initialize();
            console.log(`Data Source has been initialized`);
        } catch (error) {
            console.error(`######DATABASE: Data Source initialization error: `, error);
            process.exit(1);
        }
    }
};

export const closeDatabase = async (): Promise<void> => {
    if (AppDataSource.isInitialized) {
        try {
            await AppDataSource.destroy();
            console.log(`Data Source has been closed`);
        } catch (error) {
            console.error(`Data Source closing error: `, error);
            //process.exit(1);
        }
    }
};

export default initializeDatabase;