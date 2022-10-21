export function getParsedDob(rawdate){
    rawdate = new Date(rawdate)
    var splitDate = String(rawdate).split(' ');
    var month = String(splitDate[1])+'-'
    var date = String(splitDate[2])+'-'
    var year= rawdate.getFullYear()
    return [date,month,year];
  }