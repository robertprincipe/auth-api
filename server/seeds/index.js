const userSeed = require('./userSeed');
const yargs = require('yargs')


const seeder = () => {
    let argv = yargs.command('$0 [name]', 'seed data for database.', yargs => {
        return yargs.positional('seed', {
            alias: 's',
            type: 'boolean',
            default: false,
            description: 'Command for start.',
        })
    }).argv

    if (argv.seed) {
        // execute seed's
        userSeed()
    }

}

module.exports = seeder