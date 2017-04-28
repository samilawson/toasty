const config = require('../config.json'),
    NewsAPI = require('newsapi'),
    newsapi = new NewsAPI(config.newsApiToken),
    Discord = require('discord.js');
exports.run = (client, msg, args) => {
    const embed = new Discord.RichEmbed();
    if (!args[0]) return;
    if (args[0] === "sources") return msg.channel.sendMessage("**Sources you may specify for the `;news` command:**\ncnn, time, the-verge, cnbc, nytimes, buzzfeed, washington-post, wsj, daily-mail, google, espn, reddit, bbc, associated-press, techradar, polygon, hacker-news, mashable, and national-geographic");

    var source = "";
    var sourceIcon = "";
    if (args[0] === "cnn") {
        source = 'cnn';
        sourceIcon = 'http://vignette3.wikia.nocookie.net/logopedia/images/0/09/CNN_International_logo_2014.svg/revision/latest/scale-to-width-down/185?cb=20161205122246';
    } else
    if (args[0] === "hacker-news") {
        source = 'hacker-news';
        sourceIcon = 'https://news.ycombinator.com/favicon.ico';
    } else
    if (args[0] === "techradar") {
        source = 'techradar';
        sourceIcon = 'https://s-media-cache-ak0.pinimg.com/564x/e7/d4/32/e7d43201fc36584e635a299a14823a92.jpg';
    } else
    if (args[0] === "polygon") {
        source = 'polygon';
        sourceIcon = 'http://assets.sbnation.com/polygon/polygon-mark.png';
    } else
    if (args[0] === "washington-post") {
        source = 'the-washington-post';
        sourceIcon = 'https://pbs.twimg.com/profile_images/753656134565785600/iQ1GX-ov.jpg';
    } else
    if (args[0] === "buzzfeed") {
        source = 'buzzfeed';
        sourceIcon = 'https://webappstatic.buzzfeed.com/static/images/global/og-image-trending.jpg';
    } else
    if (args[0] === "the-verge") {
        source = 'the-verge';
        sourceIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/The_Verge_logo.svg/2000px-The_Verge_logo.svg.png';
    } else
    if (args[0] === "time") {
        source = 'time';
        sourceIcon = 'https://s0.wp.com/wp-content/themes/vip/time2014/img/time-logo-og.png';
    } else
    if (args[0] === "daily-mail") {
        source = 'daily-mail';
        sourceIcon = 'http://logos-download.com/wp-content/uploads/2016/06/The_Daily_Mail_logo_wordmark.png';
    } else
    if (args[0] === "wsj") {
        source = 'the-wall-street-journal';
        sourceIcon = 'http://www.wsj.com/apple-touch-icon.png';
    } else
    if (args[0] === "nytimes") {
        source = 'the-new-york-times';
        sourceIcon = 'http://www.goseekadventures.com/wp-content/uploads/2014/06/New-York-Times-Social-Logo.jpg';
    } else
    if (args[0] === "google") {
        source = 'google-news';
        sourceIcon = 'https://lh3.googleusercontent.com/fnqDFUD0zN_T1rR-4fyiCGsn6-MVE3azzA6fgMZN5xmsNIvpNQ7NbG0sXNGovftaQhb6=w300';
    } else
    if (args[0] === "espn") {
        source = 'espn';
        sourceIcon = 'https://pbs.twimg.com/profile_images/629351437676511232/PnAYQDx8.png';
    } else
    if (args[0] === "reddit") {
        source = 'reddit-r-all';
        sourceIcon = 'https://lh3.googleusercontent.com/J41hsV2swVteoeB8pDhqbQR3H83NrEBFv2q_kYdq1xp9vsI1Gz9A9pzjcwX_JrZpPGsa=w300';
    } else
    if (args[0] === "cnbc") {
        source = 'cnbc';
        sourceIcon = 'http://fm.cnbc.com/applications/cnbc.com/staticcontent/img/cnbc_logo.gif';
    } else
    if (args[0] === "bbc") {
        source = 'bbc-news';
        sourceIcon = 'https://pbs.twimg.com/profile_images/662708106/bbc.png';
    } else
    if (args[0] === "associated-press") {
        source = 'associated-press';
        sourceIcon = 'https://pbs.twimg.com/profile_images/461964160838803457/8z9FImcv_400x400.png';
    } else
    if (args[0] === "mashable") {
        source = 'mashable';
        sourceIcon = 'https://yt3.ggpht.com/-QN_50PuVBvA/AAAAAAAAAAI/AAAAAAAAAAA/BTltwiK9xLg/s900-c-k-no-mo-rj-c0xffffff/photo.jpg';
    } else
    if (args[0] === "national-geographic") {
        source = 'national-geographic';
        sourceIcon = 'http://logok.org/wp-content/uploads/2014/06/National-Geographic-logo.png';
    } else
    if (!args[0]) {
        source = 'cnn';
        sourceIcon = 'http://vignette3.wikia.nocookie.net/logopedia/images/0/09/CNN_International_logo_2014.svg/revision/latest/scale-to-width-down/185?cb=20161205122246';
        msg.reply("You didn't specify a news source so I'm showing you CNN news. Type, `;news sources` to get a list of news sources you may specify.")
    } else {
        msg.reply("You didn't specify a news source so I'm showing you CNN news. Type, `;news sources` to get a list of news sources you may specify.")
        source = 'cnn'
        sourceIcon = 'http://vignette3.wikia.nocookie.net/logopedia/images/0/09/CNN_International_logo_2014.svg/revision/latest/scale-to-width-down/185?cb=20161205122246';
    }
    newsapi.articles({
        source: source, // required, get the list of news outlets from newsapi.org
        sortBy: 'top' // optional, a sortby method, top, latest, etc.
    }).then(articlesResponse => {
        //the embed, with the first 4 stories returned with the title and link (make sure to log the articlesResponse to know what you want to access
        embed.setColor(3447003)
            .setAuthor(`:newspaper: Latest news from ${source}:`, `${sourceIcon}`)
            .setThumbnail(`${articlesResponse.articles[0]["urlToImage"]}`)
            .addField(`Headline 1:`, `**[${articlesResponse.articles[0]["title"]}](${articlesResponse.articles[0]["url"]})**`, true)
            .addField(`Headline 2:`, `**[${articlesResponse.articles[1]["title"]}](${articlesResponse.articles[1]["url"]})**`, true)
            .addField(`Headline 3:`, `**[${articlesResponse.articles[2]["title"]}](${articlesResponse.articles[2]["url"]})**`, true)
            .addField(`Headline 4:`, `**[${articlesResponse.articles[3]["title"]}](${articlesResponse.articles[3]["url"]})**`, true)
            .addField(`Headline 5:`, `**[${articlesResponse.articles[4]["title"]}](${articlesResponse.articles[4]["url"]})**`, true)
            .setFooter(`News via: newsapi.org`)
        msg.channel.sendEmbed(embed);
    }).catch(e => {
        msg.channel.sendMessage(":no_entry_sign: There was an error!\n" + e);
    });
}
