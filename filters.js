const filter = (inputString) => {
    inputString = inputString.replace(/الجزيرة مباشر/g, 'للجزيرة');
    inputString = inputString.replace(/للجزيرة مباشر/g, 'للجزيرة');
    inputString = inputString.replace(/للجزيرة/g, "للجزيرة ");
    inputString = inputString.replace(/#الجزيرة/g, "");
    inputString = inputString.replace(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g, '');
    inputString = inputString.replace(/عاجل \|?/g, "")
    inputString = inputString.replace(/Watch the video 🔻/g, "")
    inputString = inputString.replace(/Watch |/g,"")
    inputString = inputString.replace(/🚨/g, "")
      return `BREAKING | ${inputString} /n @AJENQ`;
  }

  module.exports = {filter}