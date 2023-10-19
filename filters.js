const filter = (inputString) => {
    inputString = inputString.replace(/الجزيرة مباشر/g, 'الأنباء الأمريكية');
    inputString = inputString.replace(/للجزيرة مباشر/g, 'للأنباء الأمريكية');
    inputString = inputString.replace(/للجزيرة/g, "للأنباء الأمريكية");
    inputString = inputString.replace(/#الجزيرة/g, "#الانباء_الامريكية");
    inputString = inputString.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g, '');
    inputString = inputString.replace(/عاجل \|?/g, "")

    inputString = inputString.replace(/أخبار الكرة العالمية/g, 'الأنباء الأمريكية');
    inputString = inputString.replace(/اخبار الكرة العالمية/g, 'الأنباء الأمريكية');
    inputString = inputString.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g, '');
    inputString = inputString.replace(/اخـبـار الـكـرة الـعـالـمـيـة/g, "الأنباء الأمريكية")
    inputString = inputString.replace(/⚡️/g, "")  
    
    inputString = inputString.replace(/Watch the video 🔻/g, "")
    inputString = inputString.replace(/✅اخبار الفوركس و الآقتصاد \|\|/g, "")
    inputString = inputString.replace(/💠شارك الخبر مع المهتمين/g, "@USXFOREX")
      return `🚨${inputString}`;
  }

  module.exports = {filter}