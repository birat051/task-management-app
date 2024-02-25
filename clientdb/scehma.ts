import { appSchema,tableSchema } from "@nozbe/watermelondb";

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name:'tasks',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'description', type: 'string', isOptional: true },
                { name: 'status', type: 'string', isIndexed: true },
                { name: 'priority', type: 'string', isIndexed: true },
                { name: 'due_date', type: 'number' }, // Storing timestamp as number
                {name: 'user_id',type: 'string',isIndexed: true},
                {name: 'created_at', type:'number'},
                {name: 'updated_at',type: 'number'}
            ]
        }),
        tableSchema({
            name: 'users',
            columns: [
              { name: 'user_id', type: 'string', isIndexed: true },
              { name: 'name', type: 'string' },
              { name: 'email_address', type: 'string' },
            ]
          })
    ]
})