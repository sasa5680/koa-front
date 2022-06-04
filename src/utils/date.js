export function dateConverter(ISOTimeFormat) {
   const date = new Date(ISOTimeFormat)
    try {
        return new Intl.DateTimeFormat(["ban", "id"]).format(date);
    } catch (error) {
      
      return "00/00/0000"
    }
}

export function dateConverterToTime(ISOTimeFormat) {
   
   const date = new Date(ISOTimeFormat);

   try {
      let months = date.getMonth();
      let day = date.getDay();

      let hour = date.getHours();
      let minute = date.getMinutes();

      let s = months+'/'+day+ " " + hour+":"+minute;
      return s;
      
   } catch (error) {
     return "00/00/0000";
   }    

}