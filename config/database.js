module.exports = ({
  env
}) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'onews'),
        username: env('DATABASE_USERNAME', 'onews'),
        password: env('DATABASE_PASSWORD', 'onews'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {
        "timestamps": true,
        "privateAttributes": ["id", "created_at"],
        "populateCreatorFields": true
      }
    },
  },
});
