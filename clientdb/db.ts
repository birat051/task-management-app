import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import schema from './scehma';
import Task from '../datamodels/Task'
import User from "@/datamodels/User";


const adapter=new LokiJSAdapter({
    dbName: 'taskschema',
    schema,
    useWebWorker: false,
    useIncrementalIndexedDB: true
})

const database=new Database(
    {
        adapter,
        modelClasses:  [Task,User],
    }
)

export {database}