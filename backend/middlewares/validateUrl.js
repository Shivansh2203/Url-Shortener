function validateUrl(url) {
  // Allow urls like google.com, www.google.com, http://..., https://...
  const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

  return regex.test(url);
}

module.exports = validateUrl;
