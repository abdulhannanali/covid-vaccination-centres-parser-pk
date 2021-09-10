import debug from 'debug'
import cheerio, { Element } from 'cheerio'

const tableParserDebug = debug('tableParser')

export interface ParsedTableEntry {
    [x: string]: string;   
}

/**
 * Applies header to row
 */
function applyRowToHeader(header: string[], row: string[]) {
    const acc: { [key: string]: string } = {}

    for (let i = 0; i < header.length; i++) {
        const column = header[i]
        acc[column] = row[i]
    }

    return acc
}


function parseRow(row: Element) {
    return cheerio('td', row)
        .toArray()
        .map((element, index) => cheerio(element).text())
}

export function parseTableToJSON(table: Element): ParsedTableEntry[] {
    const rows = cheerio('tr', table).toArray()
    const header = parseRow(rows[0])

    rows.shift()

    return rows
        .map(row => applyRowToHeader(header, parseRow(row)))
}
