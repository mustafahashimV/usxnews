const filter = (inputString) => {
    inputString = inputString.replace(/الجزيرة مباشر/g, 'الأنباء الأمريكية');
    inputString = inputString.replace(/للجزيرة مباشر/g, 'للأنباء الأمريكية');
    inputString = inputString.replace(/للجزيرة/g, "للأنباء الأمريكية");
    inputString = inputString.replace(/#الجزيرة/g, "");
    inputString = inputString.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g, '');
    inputString = inputString.replace(/عاجل \|?/g, "")
    inputString = inputString.replace(/Watch the video 🔻/g, "")
    inputString = inputString.replace(/🚨/g, "")
      return `BREAKING:${inputString}`;
  }

  module.exports = {filter}