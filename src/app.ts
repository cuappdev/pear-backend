/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import cron from 'node-cron';
import API from './API';
import ClubRepo from './repos/ClubRepo';
import Constants from './common/constants';
import CornellMajorRepo from './repos/CornellMajorRepo';
import DBConnection from './db/DBConnection';
import InterestRepo from './repos/InterestRepo';
import MatchingRepo from './repos/MatchingRepo';
import scrapeCornellMajors from './utils/WebScraper';

const app = new API();
const server = app.getServer(false);
const PORT = +process.env.PORT || 5000;
const SERVER_ADDRESS = '0.0.0.0';

DBConnection()
  .then(async (connection: any) => {
    // Pre-populate the database with times, clubs, interests, and majors
    Constants.VALID_TIMES.forEach((time) => MatchingRepo.createTime(time));
    importDataFromFile('PearClubs.txt', ClubRepo.createClub);
    importDataFromFile('PearInterests.txt', InterestRepo.createInterest);
    addCornellMajorsToDB();
    setupMajorScraperCron();
    app.express.listen(PORT, () => {
      console.log(`App is running on ${SERVER_ADDRESS}:${PORT}...`);
      console.log('Press CTRL-C to stop\n');
    });
  })
  .catch((error: any) => console.log(error));

async function importDataFromFile(filename: string, fn: (data: string) => Promise<void>) {
  const fs = require('fs');
  const readline = require('readline');
  const fileStream = fs.createReadStream(`${__dirname}/../assets/${filename}`);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    if (line.trim()) {
      fn(line);
    }
  }
}

async function addCornellMajorsToDB() {
  const majors = await scrapeCornellMajors();
  if (majors.length) {
    majors.forEach((major) => {
      CornellMajorRepo.createCornellMajor(major);
    });
  }
}

async function setupMajorScraperCron() {
  // Scrape cornell list of majors and update db weekly
  cron.schedule('0 0 * * 0', async () => {
    addCornellMajorsToDB();
  });
}

export { server };
