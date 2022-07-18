export function throwExpression(errorMessage: string): never {
    throw new Error(errorMessage);
  }

export function calTimeFromNowOneWeekBeforeAndOneWeekAfter(date: Date): [Date, Date] {
    const oneWeekBefore = new Date(date.getTime());
    oneWeekBefore.setDate(oneWeekBefore.getDate() - 7);
    const oneWeekAfter = new Date(date.getTime());
    oneWeekAfter.setDate(oneWeekAfter.getDate() + 7);
    return [oneWeekBefore, oneWeekAfter];
}

export const createUuid = () =>{
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}