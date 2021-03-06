
// # config

var path = require('path')

var pkg = require(path.join(__dirname, '..', 'package'))
var assetsDir = path.join(__dirname, '..', 'assets')
var publicDir = path.join(assetsDir, 'public')
var viewsDir = path.join(__dirname, '..', 'app', 'views')
var maxAge = 24 * 60 * 60 * 1000

exports = module.exports = function() {

  return {

    defaults: {
      pkg: pkg,
      showStack: true,
      // directories
      assetsDir: assetsDir,
      publicDir: publicDir,
      // views
      views: {
        dir: viewsDir,
        engine: 'jade'
      },
      hipchat: {
        level: 'error',
        silent: false,
        token: '',
        notify: false,
        color: 'yellow',
        room: '',
        from: '',
        messageFormat: 'text'
      },
      session: {
        secret: 'igloo-change-me',
        key: 'igloo',
        cookie: {
          maxAge: maxAge
        },
        resave: true,
        saveUninitialized: true
      },
      trustProxy: true,
      updateNotifier: {
        enabled: true,
        dependencies: {},
        updateCheckInterval: 1000 * 60 * 60,
        updateCheckTimeout: 1000 * 20
      },
      staticServer: {
        maxAge: maxAge
      },
      server: {
        host: 'localhost',
        cluster: false,
        ssl: {
          enabled: false,
          options: {}
        }
      },
      cookieParser: 'igloo-change-me',
      csrf: {
        enabled: true,
        options: {
          cookie: {
            maxAge: maxAge
          }
        }
      },
      mongo: {
        host: 'localhost',
        port: 27017,
        opts: {},
        // faster - don't perform 2nd request to verify
        // log message was received/saved
        safe: false
      },
      knex: {
        client: 'mysql'
      },
      redis: {
        host: 'localhost',
        port: 6379,
        maxAge: maxAge
      },
      output: {
        handleExceptions: false,
        colorize: true,
        prettyPrint: false
      },
      logger: {
        'console': true,
        requests: true,
        mongo: false,
        file: false,
        hipchat: false
      },
      less: {
        path: publicDir,
        options: {
          force: true
        }
      },
      jade: {
        amd: {
          path: '/js/tmpl/',
          options: {}
        }
      }
    },

    test: {
      csrf: {
        enabled: false
      },
      server: {
        env: 'test',
        port: 5000
      },
      redis: {
        prefix: 'igloo_test'
      }
    },

    development: {
      server: {
        env: 'development',
        port: 3000,
      },
      mongo: {
        dbname: 'igloo-development',
        db: 'igloo-development' // keep for winston logger
      },
      knex: {
        debug: true,
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: '',
          database: 'igloo_development'
        }
      },
      redis: {
        prefix: 'igloo-development'
      }
    },

    production: {
      views: {
        dir: path.join(assetsDir, 'dist'),
      },
      publicDir: path.join(assetsDir, 'dist'),
      showStack: false,
      updateNotifier: {
        enabled: false,
      },
      server: {
        env: 'production',
        port: 3080,
        cluster: true
      },
      mongo: {
        dbname: 'igloo-production',
        db: 'igloo-production' // keep for winston logger
      },
      knex: {
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: '',
          database: 'igloo_production'
        }
      },
      redis: {
        prefix: 'igloo_production'
      },
      output: {
        colorize: false
      },
      logger: {
        'console': true,
        requests: true,
        mongo: false,
        file: false
        /*
        // <https://github.com/flatiron/winston#file-transport>
        file: {
          filename: '/var/log/igloo.log',
          // TODO: maxsize
          // TODO: maxFiles
          timestamp: true
        }
        */
      }
    }

  }

}

exports['@singleton'] = true
