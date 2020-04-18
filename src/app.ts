import 'reflect-metadata';
import Constants from './common/constants';
import cron from 'node-cron'
import API from './API';
import DBConnection from './db/DBConnection';
import MatchingRepo from './repos/MatchingRepo';
import scrapeCornellMajors from './utils/WebScraper'
import UserRepo from './repos/UserRepo';


const app = new API();
const server = app.getServer(false);
const PORT = +process.env.PORT || 5000;
const SERVER_ADDRESS = '0.0.0.0';

DBConnection()
  .then(async (connection: any) => {
    // Pre-populate the database with times, clubs, and cornell majors
    setupScraperCron()
    Constants.VALID_TIMES.forEach(time => MatchingRepo.createTime(time));
    addClubsToDB()
    app.express.listen(PORT, () => {
      console.log(`App is running on ${SERVER_ADDRESS}:${PORT}...`);
      console.log('Press CTRL-C to stop\n');
    });
  })
  .catch((error: any) => console.log(error));

async function addClubsToDB() {
  const fs = require('fs');
  const readline = require('readline');
  const fileStream = fs.createReadStream(__dirname + "/../../assets/PearClubs.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    UserRepo.createClub(line);
  }
}

async function setupScraperCron() {
  // Scrape cornell fields of study and update db weekly
  cron.schedule('0 0 * * 0', async () => {
    const majors = await scrapeCornellMajors();
    if (majors.length) {
      majors.forEach(major => {
        UserRepo.createCornellMajor(major)
      });
    }
  });
}

export { server };
