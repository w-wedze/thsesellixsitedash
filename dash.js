const { Client, Intents, Permissions } = require('discord.js');
const config = require("./Moderation/Configs/config.json");
const Discord = require("discord.js");

const express = require('express');
const app = express();
const fetch = require('node-fetch');

const setupdurum = require("./Moderation/Models/Setup.js");
const cezadurum = require("./Moderation/Models/Ceza.js");
const yetkili = require("./Moderation/Models/Yetkili.js");
const ChatGuardDatabase = require("./Moderation/Models/Controls.js");


const bParser = require("body-parser");
const cParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");

const passport = require('passport');
const session = require('express-session');
const { Strategy } = require('passport-discord');
const moment = require('moment');
const e = require('express');
const { type } = require('os');
moment.locale('tr');

app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: true }));
app.use(cParser());
app.set('views', path.join(__dirname, './Moderation/Panel/views'));
app.use('/css', express.static(path.join(__dirname, './Moderation/Panel/views/css')));
app.use('/ek', express.static(path.join(__dirname, './Moderation/Panel/views/ek')));
app.use(express.static(path.join(__dirname, './Moderation/Panel/public')));
app.use(session({ secret: 'içşarabı-sikarabı', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => { done(null, user) });
passport.deserializeUser((obj, done) => { done(null, obj) });
const izinler = ["identify", "guilds"];
passport.use(new Strategy({
    clientID: config.BotBağlıozAşkom.clientID,
    clientSecret: config.BotBağlıozAşkom.clientSecret,
    callbackURL: config.BotBağlıozAşkom.callbackURL,
    scope: izinler
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
}));


app.get("/login", passport.authenticate("discord", { scope: izinler, }));
app.get('/callback', passport.authenticate("discord", { failureRedirect: '/error' }), async (req, res) => {
    const elcavo = await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }); res.redirect('/index');
});
app.get('/logout', (req, res) => { req.logOut(); return res.redirect('/'); });
app.get('/', async (req, res) => { res.redirect('/login') })
app.get('/error', async (req, res) => { res.render('hata', { user: req.user, bot: client }); })
app.get('/404', async (req, res) => { res.render('404', { user: req.user, bot: client }); });
app.get('/index', async (req, res) => {
    if (!["500325853108895744"].some(x => req.user.id === x))
        return res.redirect('/404'); res.render('index', { user: req.user, bot: client, })
});
    

app.get('/index', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('index', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await cezadurum.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await cezadurum.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/underworld', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('underworld', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await cezadurum.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await cezadurum.find({ guildID: config.BotBağlıozAşkom.guildID }); data.filter(e => e.jail === true); })
app.get('/profile', async (req, res) => {
    if (!["500325853108895744"].some(x => req.user.id === x))
        return res.redirect('/404');
    //console.log(req.user);
    res.render('profile', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await yetkili.find({ guildID: config.BotBağlıozAşkom.guildID }) });
    const data = await yetkili.find({ guildID: config.BotBağlıozAşkom.guildID });
})
app.get('/guild', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('guild', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/userlist', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('userlist', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/channel-manage', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('channel-manage', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/roles-manage', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('roles-manage', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/moderation-manage', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('moderation-manage', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/moderation-manage2', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('moderation-manage2', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/moderation-manage3', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('moderation-manage3', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/stat', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('stat', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/welcome', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('welcome', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/limit', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('limit', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/checkout', async (req, res) => { if (!["500325853108895744"].some(x => req.user.id === x)) return res.redirect('/404'); res.render('checkout', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
app.get('/api', async (req, res) => { res.render('api', { user: req.user, bot: client, elchavopy: await setupdurum.findOne({ guildID: config.BotBağlıozAşkom.guildID }), data: await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }) }); const data = await ChatGuardDatabase.find({ guildID: config.BotBağlıozAşkom.guildID }); })
//app.listen(3005, () => console.log(`[${config.Bot.guildName}/thesellix.site/]`));

//BURADADA API ÇEKİYOZ VERİLERİ KAYIT EDİYOR
app.post('/guilds', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { sunucutagfln: req.body.sunucutagfln }; if (obj.sunucutagfln !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { guildTag: obj.sunucutagfln } }, { upsert: true }).exec(); }; })
app.post('/guildss', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { sunucutagsızfln: req.body.sunucutagsızfln }; if (obj.sunucutagsızfln !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { guildNoTag: obj.sunucutagsızfln } }, { upsert: true }).exec(); }; })
app.post('/guildsss', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { sunucuototag: req.body.sunucuototag }; if (obj.sunucuototag !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { otoTag: obj.sunucuototag } }, { upsert: true }).exec(); }; })
app.post('/guildssss', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { botdurum: req.body.botdurum }; if (obj.botdurum !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { durum: obj.botdurum } }, { upsert: true }).exec(); }; })
app.post('/guildsssss', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { botstatus: req.body.botstatus }; if (obj.botstatus !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { status: obj.botstatus } }, { upsert: true }).exec(); }; })
app.post('/chatkaydet', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { kurallar: req.body.kurallar, genelchat: req.body.genelchat, ftchat: req.body.ftchat, welcomekanal: req.body.welcomekanal, welcomeseskanal: req.body.welcomeseskanal, botses: req.body.botses, botcommands: req.body.botcommands }; if (obj.genelchat !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { chat: obj.genelchat } }, { upsert: true }).exec(), console.log("[WEB PANEL] Genel Chat " + obj.genelchat + " kanal idsi olarak ayarlandı!"); } else { console.log("[WEB PANEL] Site ayarlarında genel chat kanalı seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.ftchat !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { fotoChat: obj.ftchat } }, { upsert: true }).exec(), console.log("[WEB PANEL] Foto chat " + obj.ftchat + " kanal idsi olarak ayarlandı!"); } else { console.log("[WEB PANEL] Site ayarlarında foto chat kanalı seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.welcomekanal !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { registerChat: obj.welcomekanal } }, { upsert: true }).exec(), console.log("[WEB PANEL] Welcome chat " + obj.welcomekanal + " kanal idsi olarak ayarlandı!"); } else { console.log("[WEB PANEL] Site ayarlarında welcome chat kanalı seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.welcomeseskanal !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { RegisterVoices: [obj.welcomeseskanal] } }, { upsert: true }).exec(), console.log("[WEB PANEL] Welcome ses " + obj.welcomeseskanal + " kanal idsi olarak ayarlandı!"); } else { console.log("[WEB PANEL] Site ayarlarında welcome chat kanalı seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.botses !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { botVoiceChannel: obj.botses } }, { upsert: true }).exec(), console.log("[WEB PANEL] Bot ses " + obj.botses + " kanal idsi olarak ayarlandı!"); } else { console.log("[WEB PANEL] Site ayarlarında Bot ses kanalı seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.kurallar !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { rules: obj.kurallar } }, { upsert: true }).exec(), console.log("[WEB PANEL] Kurallar chat " + obj.kurallar + " kanal idsi olarak ayarlandı!"); } else { console.log("[WEB PANEL] Site ayarlarında Kurallar kanalı seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.botcommands !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { botCommandsChannel: obj.botcommands } }, { upsert: true }).exec(), console.log("[WEB PANEL] Bot Commands " + obj.botcommands + " kanal idsi olarak ayarlandı!\n-------------------------------------------------------------------------"); } else { console.log("[WEB PANEL] Site ayarlarında Bot commands kanalı seçilmediği için herhangi bir işlem yapmıyorum!\n-------------------------------------------------------------------------") } })
app.post('/registerkaydet', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { registeryetkili: req.body.registeryetkili, kayitsiz: req.body.kayitsizrol, erkekrolleri: req.body.erkekrolleri, kadinrolleri: req.body.kadinrolleri }; if (obj.registeryetkili !== undefined) { let RegisterRollerFiltred = []; typeof obj.registeryetkili == 'string' ? RegisterRollerFiltred.push(obj.registeryetkili) : obj.registeryetkili.map(a => RegisterRollerFiltred.push(a)); await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { botCommandsRoles: RegisterRollerFiltred } }, { upsert: true }).exec(); console.log("[WEB PANEL] Register yetkilisi " + obj.registeryetkili + " rol idsi olarak ayarlandı!"); } else { console.log("[WEB PANEL] Site ayarlarında register yetkili rolü seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.erkekrolleri !== undefined) { let ErkekRollerFiltered = []; typeof obj.erkekrolleri == 'string' ? ErkekRollerFiltered.push(obj.erkekrolleri) : obj.erkekrolleri.map(a => ErkekRollerFiltered.push(a)); await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { manRoles: ErkekRollerFiltered } }, { upsert: true }).exec(); } else { console.log("[WEB PANEL] Site ayarlarında erkek rolleri seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.kadinrolleri !== undefined) { let KadinRollerFiltered = []; typeof obj.kadinrolleri == 'string' ? KadinRollerFiltered.push(obj.kadinrolleri) : obj.kadinrolleri.map(a => KadinRollerFiltered.push(a)); await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { ladyRoles: KadinRollerFiltered } }, { upsert: true }).exec(); } else { console.log("[WEB PANEL] Site ayarlarında kadın rolleri seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.kayitsiz !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { unregisterRoles: [obj.kayitsiz] } }, { upsert: true }).exec(); } else { console.log("[WEB PANEL] Site ayarlarında unregister rol seçilmediği için herhangi bir işlem yapmıyorum!\n-------------------------------------------------------------------------") }; })
app.post('/yetkilikaydet', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { jailyrol: req.body.jailyrol, banyrol: req.body.banyrol, muteyrol: req.body.muteyrol, vmuteyrol: req.body.vmuteyrol }; if (obj.jailyrol !== undefined) { let JailRollerFiltred = []; typeof obj.jailyrol == 'string' ? JailRollerFiltred.push(obj.jailyrol) : obj.jailyrol.map(a => JailRollerFiltred.push(a)); await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { jailRoles: JailRollerFiltred } }, { upsert: true }).exec(), console.log("[WEB PANEL] Jail yetkilisi " + obj.jailyrol + " rol idsi olarak ayarlandı!"); } else { console.log("[WEB PANEL] Site ayarlarında jail yetkili rolü seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.banyrol !== undefined) { let BanRollerFiltered = []; typeof obj.banyrol == 'string' ? BanRollerFiltered.push(obj.banyrol) : obj.banyrol.map(a => BanRollerFiltered.push(a)); await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { banHammerRoles: BanRollerFiltered } }, { upsert: true }).exec(); console.log("[WEB PANEL] Ban yetkilisi " + obj.banyrol + " rol idsi olarak ayarlandı!") } else { console.log("[WEB PANEL] Site ayarlarında ban yetkili rolü seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.muteyrol !== undefined) { let MuteRollerFiltred = []; typeof obj.muteyrol == 'string' ? MuteRollerFiltred.push(obj.muteyrol) : obj.muteyrol.map(a => MuteRollerFiltred.push(a)); await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { chatMuteRoles: MuteRollerFiltred } }, { upsert: true }).exec(); console.log("[WEB PANEL] Mute yetkilisi " + obj.muteyrol + " rol id'si olarak ayarlandı!") } else { console.log("[WEB PANEL] Site ayarlarında mute yetkili seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.vmuteyrol !== undefined) { let VmuteRollerFiltred = []; typeof obj.vmuteyrol == 'string' ? VmuteRollerFiltred.push(obj.vmuteyrol) : obj.vmuteyrol.map(a => VmuteRollerFiltred.push(a)); await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { voiceMuteRoles: VmuteRollerFiltred } }, { upsert: true }).exec(); console.log("[WEB PANEL] Voice Mute yetkilisi " + obj.vmuteyrol + " rol id'si olarak ayarlandı!") } else { console.log("[WEB PANEL] Site ayarlarında Vmute yetkili seçilmediği için herhangi bir işlem yapmıyorum!") }; })
app.post('/genelrolkaydet', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { jailrol: req.body.jailrol, vmuterol: req.body.vmuterol, muterol: req.body.muterol, boosterrol: req.body.boosterrol }; if (obj.jailrol !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { punitiveRole: obj.jailrol } }, { upsert: true }).exec(); console.log("[WEB PANEL] Jailed rolü" + obj.jailrol + " rol idsi olarak ayarlandı!") } else { console.log("[WEB PANEL] Site ayarlarında jailed rolü seçilmediği için herhangi bir işle yapmıyorum!") }; if (obj.muterol !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { mutedRole: obj.muterol } }, { upsert: true }).exec(); console.log("[WEB PANEL] Muted rolü" + obj.muterol + "rol idsi olarak ayarlandı!") } else { console.log("[WEB PANEL] Site ayarlarında mute rolü seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.boosterrol !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { boosterRole: obj.boosterrol } }, { upsert: true }).exec(); console.log("[WEB PANEL] Booster rolü " + obj.boosterrol + " rol id'si olarak ayarlandı!\n-------------------------------------------------------------------------") } else { console.log("[WEB PANEL] Site ayarlarında Booster rolü seçilmediği için herhangi bir işlem yapmıyorum!\n-------------------------------------------------------------------------") }; })
app.post('/rolkaydet', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { enaltyetkilirol: req.body.enaltrol, staffRoles: req.body.yetkilirolleriymiş, yasaklitag: req.body.yasaklıtagrol, yoneticirol: req.body.ytrol, yenihesap: req.body.yenihesaprol }; if (obj.yasaklitag !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { bannedTagRole: obj.yasaklitag } }, { upsert: true }).exec(); console.log("[WEB PANEL] Yasaklı tag rolü " + obj.yasaklitag + " rol idsi olarak ayarlandı!") } else { console.log("[WEB PANEL] Site ayarlarında yasaklı tag rolü seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.yenihesap !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { newAccRole: obj.yenihesap } }, { upsert: true }).exec(); console.log("[WEB PANEL] Yeni hesap rolü " + obj.yenihesap + " rol idsi olarak ayarlandı!") } else { console.log("[WEB PANEL] Site ayarlarında yeni hesap rolü seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.yoneticirol !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { adminRole: obj.yoneticirol } }, { upsert: true }).exec(); console.log("[WEB PANEL] Yönetici rolü " + obj.yoneticirol + " rol idsi olarak ayarlandı!") } else { console.log("[WEB PANEL] Site ayarlarında yönetici rolü seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.enaltyetkilirol !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { minStaffRole: obj.enaltyetkilirol } }, { upsert: true }).exec(); console.log("[WEB PANEL] En alt yetkili rolü " + obj.enaltyetkilirol + " rol idsi olarak ayarlandı!") } else { console.log("[WEB PANEL] Site ayarlarında en alt yetkili rolü seçilmediği için herhangi bir işlem yapmıyorum!") }; if (obj.staffRoles !== undefined) {let yetkilirollerfiltred = []; typeof obj.staffRoles == 'string' ? yetkilirollerfiltred.push(obj.staffRoles) : obj.staffRoles.map(a => yetkilirollerfiltred.push(a)); await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID}, { $set: { staffRoles: yetkilirollerfiltred } }, { upsert: true}); } })
app.post('/stats', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { publickategori: req.body.publickategori, registerkategori: req.body.registerkategori, sorunçözmekategori: req.body.sorunçözmekategori, alonekategori: req.body.alonekategori, privatekategori: req.body.privatekategori, streamerkategori: req.body.streamerkategori, sleepkanalı: req.body.sleepkanalı, gamekategori: req.body.gamekategori }; if (obj.publickategori !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { publicCategory: obj.publickategori } }, { upsert: true }).exec() }; if (obj.registerkategori !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { registerCategory: obj.registerkategori } }, { upsert: true }).exec(); } if (obj.sorunçözmekategori !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { sorunÇözmeCategory: obj.sorunçözmekategori } }, { upsert: true }).exec(); }; if (obj.alonekategori !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { aloneCategory: obj.alonekategori } }, { upsert: true }).exec(); }; if (obj.streamerkategori !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { streamerCategory: obj.streamerkategori } }, { upsert: true }).exec(); }; if (obj.sleepkanalı !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { sleepChannel: obj.sleepkanalı } }, { upsert: true }).exec(); }; if (obj.gamekategori !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { gameParents: obj.gamekategori } }, { upsert: true }).exec(); } if (obj.privatekategori !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { privateCategory: obj.privatekategori } }, { upsert: true }).exec() }; })
app.post('/welcomeayars', async (req, res) => { res.render('index', { user: req.user, bot: client }); let obj = { hgmesaj: req.body.hgmesaj }; if (obj.hgmesaj !== undefined) { await setupdurum.findOneAndUpdate({ guildID: config.BotBağlıozAşkom.guildID }, { $set: { hgMesajı: obj.hgmesaj } }, { upsert: true }).exec(); }; })
