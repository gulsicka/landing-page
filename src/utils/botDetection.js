const botPatterns = [
    // General Bots
    /bot/i,
    /crawler/i,
    /spider/i,
    /crawl/i,
    /scraper/i,
    /scrape/i,
    /parser/i,
    /parse/i,
    
    // HTTP Clients
    /curl/i,
    /wget/i,
    /python/i,
    /java/i,
    /requests/i,
    /axios/i,
    /fetch/i,
    /http/i,
    /https/i,
    
    // Automation Tools
    /playwright/i,
    /cypress/i,
    /nightmare/i,
    /cheerio/i,
    /scrapy/i,
    /beautifulsoup/i,
    /mechanize/i,
    /httrack/i,
    /archive/i,
    /wayback/i,
    /validator/i,
    /checker/i,
    /monitor/i,
    /analyzer/i,
    /scanner/i,
    /selenium/i,
    /puppeteer/i,
    /phantomjs/i,
    /headless/i,
    
    // Security Tools
    /security/i,
    /scan/i,
    /audit/i,
    /check/i,
    /verify/i,
    /validate/i,
    /test/i,
    /debug/i,
    
    // Analytics
    /analytics/i,
    /track/i,
    /monitor/i,
    /stats/i,
    /statistics/i,
    /metric/i,
    /measure/i
];

const socialMediaPatterns = [
    // Facebook
    /facebookexternalhit/i,
    /facebookcatalog/i,
    /facebook/i,
    /FBAN/i,
    /FBAV/i,
    /FB_IAB/i,
    /FB4A/i,
    /FBIOS/i,
    /FBSS/i,
    /FBSV/i,
    
    // Twitter
    /twitterbot/i,
    /Twitter/i,
    /TwitterCrawler/i,
    /TwitterFeed/i,
    
    // TikTok
    /tiktok/i,
    /TikTokBot/i,
    /TikTokCrawler/i,
    /TikTokShare/i,
    /TikTokApp/i,
    
    // Instagram
    /instagram/i,
    /InstagramBot/i,
    /InstagramCrawler/i,
    /InstagramApp/i,
    
    // LinkedIn
    /linkedinbot/i,
    /LinkedIn/i,
    /LinkedInBot/i,
    /LinkedInCrawler/i,
    
    // Pinterest
    /pinterest/i,
    /PinterestBot/i,
    /PinterestCrawler/i,
    /PinterestApp/i,
    
    // WhatsApp
    /whatsapp/i,
    /WhatsAppBot/i,
    /WhatsAppCrawler/i,
    /WhatsAppApp/i,
    
    // Telegram
    /telegrambot/i,
    /Telegram/i,
    /TelegramBot/i,
    /TelegramCrawler/i,
    
    // Discord
    /discord/i,
    /DiscordBot/i,
    /DiscordCrawler/i,
    /DiscordApp/i,
    
    // Reddit
    /redditbot/i,
    /Reddit/i,
    /RedditBot/i,
    /RedditCrawler/i,
    
    // Snapchat
    /snapchat/i,
    /SnapchatBot/i,
    /SnapchatCrawler/i,
    /SnapchatApp/i,
    
    // Tumblr
    /tumblr/i,
    /TumblrBot/i,
    /TumblrCrawler/i,
    /TumblrApp/i,
    
    // Other Social Media
    /line/i,
    /LineBot/i,
    /LineCrawler/i,
    /LineApp/i,
    /wechat/i,
    /WeChatBot/i,
    /WeChatCrawler/i,
    /WeChatApp/i,
    /kakao/i,
    /KakaoBot/i,
    /KakaoCrawler/i,
    /KakaoApp/i
];

function isBot(req) {
    const userAgent = req.headers['user-agent'] || '';
    const isSocialMediaBot = socialMediaPatterns.some(pattern => pattern.test(userAgent));
    const isRegularBot = botPatterns.some(pattern => pattern.test(userAgent));
    return isSocialMediaBot || isRegularBot;
}

module.exports = { isBot }; 