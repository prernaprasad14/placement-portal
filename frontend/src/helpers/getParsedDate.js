export function getParsedDate(rawdate){
    rawdate = new Date(rawdate)
    var splitDate = String(rawdate).split(' ');
    var day = String(splitDate[0])+', '
    var month = String(splitDate[1])+' '
    var date = String(splitDate[2])+', '
    var year= rawdate.getFullYear()
    return [day, month, date, year];
  }