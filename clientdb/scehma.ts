import { appSchema,tableSchema } from "@nozbe/watermelondb";

export default appSchema({
    version: 4,
    tables: [
        tableSchema({
            name:'tasks',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'description', type: 'string', isOptional: true },
                { name: 'status', type: 'string' },
                { name: 'priority', type: 'string' },
                {name: 'user_id',type: 'string',isIndexed: true},
                {name: 'created_at', type:'number'},
                {name: 'updated_at',type: 'number'}
            ]
        }),
        tableSchema({
            name: 'users',
            columns: [
              { name: 'name', type: 'string' },
              { name: 'email_address', type: 'string' },
              {name: 'created_at', type:'number'},
              {name: 'updated_at',type: 'number'}
            ]
          })
    ]
})