import debug from 'debug'
import cheerio from 'cheerio'

const tableParserDebug = debug('tableParser')

export interface ParsedTableEntry {
    [x: string]: string;   
}

/**
 * Applies header to row
 */
function applyRowToHeader(header: string[], row: string[]) {
    const acc: { [key: string]: string } = {}

    if (header.length !== row.length) {
        tableParserDebug(`
        Header length does not match row length
        header.length: ${header.length}
        row.length: ${row.length}
      `)
    }

    return header.reduce((acc, column, index) => {
        acc[column] = row[index]
        return acc
    }, acc)
}


function parseRow(row: cheerio.Element) {
    return cheerio('td', row)
        .toArray()
        .map((element, index) => cheerio(element).text())
}

export function parseTableToJSON(table: cheerio.Element): ParsedTableEntry[] {
    const rows = cheerio('tr', table).toArray()
    const header = parseRow(rows[0])

    rows.shift()

    return rows
        .map(row => applyRowToHeader(header, parseRow(row)))
}
