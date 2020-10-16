import axios from 'axios';
import cheerio from 'cheerio';
import LogUtils from './LogUtils';

const scrapeCornellMajors = async (): Promise<string[]> => {
  const url = 'https://www.cornell.edu/academics/fields.cfm';
  const majors: string[] = [];
  await axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      $('.cu-table-majors td a').each((i, elm) => {
        const major = elm.children[0].data;
        if (major !== undefined && elm.attribs['aria-describedby'] === 'majors') {
          majors.push(major);
        }
      });
    })
    .catch((err) => LogUtils.logErr(err, 'server', 'Application error'));
  return majors;
};

export default scrapeCornellMajors;
