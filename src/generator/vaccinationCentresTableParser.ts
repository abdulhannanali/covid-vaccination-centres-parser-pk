import cheerio from "cheerio";
import { ParsedTableEntry, parseTableToJSON } from './tableParser'

import provinces from './provinces'
import debug from 'debug'
import { parseToVaccinationCentreArray } from "./vaccinationCentresParser";
import { flatten } from "ramda";

const htmlToRawJSONDebug = debug('htmlToRawJson')

export interface ParsedTable {
  province: string;
  tableEntries: ParsedTableEntry[];
}

export default function parse(htmlExportedFile: string) {
  const $ = cheerio.load(htmlExportedFile);
  const allTables = $("table");
  
  if (allTables.length !== 9) {
    htmlToRawJSONDebug.extend('allTables/html')(allTables.html())
    throw new Error(`There should be 9 tables but only ${allTables.length} found`)
  }

  const tables = allTables
    .toArray()
    .slice(1)
    .map(parseTable)
    .filter(table => table)
    .map(parseToVaccinationCentreArray)

  return flatten(tables)
}

function parseTable(table: cheerio.Element, index: number): ParsedTable {
  const anchorElementHtml = cheerio(table).prev("a").html();

  if (!anchorElementHtml) {
    htmlToRawJSONDebug('anchorElementHTML not provided')
    return undefined;
  }

  const province = provinces.find((province) => {
    return anchorElementHtml.toLowerCase().indexOf(province) !== -1;
  });

  if (province) {
    return {
      province,
      tableEntries: parseTableToJSON(table)
    }
  }

}


