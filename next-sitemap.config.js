/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.URL || `http://localhost:${process.env.PORT || 3000}`,
  generateRobotsTxt: true,
}
