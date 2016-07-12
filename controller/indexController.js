/**
 * Created by JT on 15/12/28.
 */
//var wish = require('../model/wish');
var request = require('superagent');
var bodyParse = require('co-body');
var oauth=require('wechat-oauth');
var urlPares=require('url');
var wxSign = require('./wx_sign.js');
var wxAppid = "wxdc041c85f0bf7b6f";
var wxSecret = "5bcb2ec82178f7085b449fcffe8b3816";

var Client=new oauth("wx9a66afce31e4ec8b","c2b679dbd1ea6c0ffc99155123a25697");
var items =[
    {
        index: 0,
        question: '小说中的三体星系位',
        options: [
            'A.半人马座α星',
            'B.人马座α星',
            'C.射手座α星',
            'D.1/2人马座α星'
        ],
        answer: 'a'
    },
    {
        index: 1,
        question: '以下关于ETO统帅叶文洁的信息不正确的是？',
        options: [
            'A.在清华大学攻读天体物理学',
            'B.文革期间目睹母亲被红卫兵殴打致死',
            'C.被送往大兴安岭参加劳动',
            'D.离开红安基地后会到清华大学任教'
        ],
        answer: 'b'
    },
    {
        index: 2,
        question: '汪淼进入三体游戏的时候，注册的ID是？',
        options: [
            'A.水人',
            'B.蚁人',
            'C.海人',
            'D.湖人'
        ],
        answer: 'c'
    },
    {
        index: 3,
        question: '贯穿罗辑和庄颜的爱情中的画作，作者是?',
        options: [
            'A.毕加索',
            'B.达芬奇',
            'C.米开朗基罗',
            'D.梵高'
        ],
        answer: 'b'
    },
    {
        index: 4,
        question: '三体中是什么虫子为汪淼等人带来启示？',
        options: [
            'A.小强',
            'B.蟋蟀',
            'C.蚂蚱',
            'D.蝗虫'
        ],
        answer: 'd'
    },
    {
        index: 5,
        question: '在三体星系上的普通三体人是如何度过不适应生产的乱纪元的？',
        options: [
            'A.脱水',
            'B.组成人列cpu',
            'C.冬眠',
            'D.住在巨大的建筑中'
        ],
        answer: 'a'
    },
    {
        index: 6,
        question: '在云天明编写的童话《王国的新画师》中，针眼画师把国王画到画中，国王就消失，云天明是想向人类透露哪些信息？',
        options: [
            'A.三体人会瞬间转移',
            'B.三体人知道或掌握维度打击武器',
            'C.三体人会用魔法',
            'D.三体人喜欢画画'
        ],
        answer: 'b'
    },
    {
        index: 7,
        question: '冬眠了200年之后的丁仪，在大学里教授哪门课程？',
        options: [
            'A.200年前的人类社会历史',
            'B.理论物理',
            'C.应用数学',
            'D.宇宙社会学'
        ],
        answer: 'b'
    },
    {
        index: 8,
        question: '以下哪个人物不属于地球三体组织（ETO）的成员？',
        options: [
            'A.伊文斯',
            'B.山杉惠子',
            'C.希恩斯',
            'D.潘寒'
        ],
        answer: 'c'
    },
    {
        index: 9,
        question: '红岸基地在哪个省？',
        options: [
            'A.新疆自治区',
            'B.吉林省',
            'C.内蒙古自治区',
            'D.辽宁省'
        ],
        answer: 'c'
    },
    {
        index: 10,
        question: '三体logo的六芒星（又叫大卫之星）是哪个宗教的标志？',
        options: [
            'A.基督教',
            'B.伊斯兰教',
            'C.犹太教',
            'D.摩门教'
        ],
        answer: 'c'
    },
    {
        index: 11,
        question: '黑暗森林理论的基本公理不包括以下哪一项？',
        options: [
            'A.宇宙中的物质总量保持不变',
            'B.生产是文明的第一需求',
            'C.宇宙文明之间的猜疑链很长',
            'D.文明不断增长和扩张'
        ],
        answer: 'c'
    },
    {
        index: 12,
        question: '军方粉碎ETO组织的计划用下面哪种乐器命名？',
        options: [
            'A.古筝',
            'B.古琴',
            'C.竖琴',
            'D.提琴'
        ],
        answer: 'a'
    },
    {
        index: 13,
        question: '黑暗森林法则可以回答下面哪个未决的疑问？',
        options: [
            'A.外祖母悖论',
            'B.费米悖论',
            'C.三体问题',
            'D.多维宇宙'
        ],
        answer: 'b'
    },
    {
        index: 14,
        question: '三体世界最恐怖的灾难是什么？',
        options: [
            'A.三日连珠',
            'B.三日凌空',
            'C.飞星不动',
            'D.三颗飞星'
        ],
        answer: 'b'
    },
    {
        index: 15,
        question: '汪淼主持研制的超强度纳米材料代号叫什么？',
        options: [
            'A.尖刀',
            'B.飞刃',
            'C.飞刀',
            'D.逆刃'
        ],
        answer: 'b'
    },
    {
        index: 16,
        question: '维德有哪种癖好？',
        options: [
            'A.吸大麻',
            'B.抽雪茄',
            'C.喝红酒',
            'D.吃橘子'
        ],
        answer: 'b'
    },
    {
        index: 17,
        question: '水滴是三体人基于哪种物理原理制造的？',
        options: [
            'A.强相互作用力',
            'B.万有引力',
            'C.弱相互作用力',
            'D.电磁相互作用力'
        ],
        answer: 'a'
    },
    {
        index: 18,
        question: '黑域计划的内容是什么？',
        options: [
            'A.利用巨行星为掩体，躲避光粒打击',
            'B.利用慢雾形成的低光速区躲避黑暗森林打击',
            'C.威胁三体人向宇宙广播地球的坐标',
            'D.进入高维宇宙保存地球文明的种子'
        ],
        answer: 'b'
    },
    {
        index: 19,
        question: '二向箔打击范围内的逃逸速度为哪种速度？',
        options: [
            'A.超光速',
            'B.无限接近光速',
            'C.光速',
            'D.光速的π分之一'
        ],
        answer: 'c'
    },
    {
        index: 20,
        question: '第二红岸基地在哪里？',
        options: [
            'A.巴拿马运河岸边',
            'B.一艘叫“审判日”的油轮',
            'C.第一红岸基地原址',
            'D.联合国总部'
        ],
        answer: 'b'
    },
    {
        index: 21,
        question: '科学边界是个怎样的组织？',
        options: [
            'A.主动迎接三体文明，希望由三体文明来改造地球文明的组织',
            'B.著名科学家成立的，阻碍人类科学发展的组织',
            'C.认为所有生物——人类、动物、植物都平等的环保组织',
            'D.专门针对面壁者而成立的破壁者组织'
        ],
        answer: 'b'
    },
    {
        index: 22,
        question: '开展面壁计划的依据是什么？',
        options: [
            'A.三体人之间思维透明',
            'B.智子可以读取人类所有的信息，但不能见是人类的思维',
            'C.继续打破破壁人对地球文明的危害',
            'D.清除思想钢印的唯一办法'
        ],
        answer: 'b'
    },
    {
        index: 23,
        question: '地球文明博物馆建在哪个行星或卫星上？',
        options: [
            'A.火星',
            'B.地球',
            'C.冥王星',
            'D.土卫六'
        ],
        answer: 'c'
    },
    {
        index: 24,
        question: '三体人拥有透明思维，在三体人的社会中，以下哪项行为是不可能发生的？',
        options: [
            'A.三体人之间没办法进行诈骗',
            'B.三体人会对犯罪嫌疑人进行严刑拷问',
            'C.日常交流中不用开口说话',
            'D.三体人难以理解什么叫谎言'
        ],
        answer: 'b'
    },
    {
        index: 25,
        question: '最后发射引力波宇宙广播的战舰是？',
        options: [
            'A.万有引力号',
            'B.蓝色空间号',
            'C.地心引力号',
            'D.企业号'
        ],
        answer: 'a'
    },
    {
        index: 26,
        question: '莫斯肯漩涡位于？',
        options: [
            'A.挪威',
            'B.芬兰',
            'C.俄罗斯',
            'D.冰岛'
        ],
        answer: 'a'
    },
    {
        index: 27,
        question: '为了阻止三体人的入侵，人类决定利用个人的思想无法被看穿这一特点制定战略，这一计划，称作？',
        options: [
            'A.冥想计划',
            'B.细胞壁计划',
            'C.破壁计划',
            'D.面壁计划'
        ],
        answer: 'd'
    },
    {
        index: 28,
        question: '以下那个计划在三体中并没有提到？',
        options: [
            'A.群星计划',
            'B.阿波罗计划',
            'C.阶梯计划',
            'D.光速飞船计划'
        ],
        answer: 'b'
    },
    {
        index: 29,
        question: '程心与云天明在“拉格郎日点”进行通讯，云天明讲了三个童话，请问“拉格朗日点”是什么？',
        options: [
            'A.受两大物体引力作用下,小物体所受引力为最大值二分之一的点',
            'B.两大物体的引力最大点',
            'C.两大物体的引力最小点',
            'D.受两大物体引力作用下,能使小物体稳定的点'
        ],
        answer: 'd'
    },
    {
        index: 30,
        question: '下列关于降临派的描述，不正确的是？',
        options: [
            'A.希望三体星球的生命降临到地球,毁灭一切地球原生物种',
            'B.组织总部设"审判日"号上',
            'C.实质领袖为叶文洁',
            'D.在巴拿马运河航行时被消灭'
        ],
        answer: 'c'
    },
    {
        index: 31,
        question: '暗恋程心的悲催男云天明，身患哪种绝症？',
        options: [
            'A.白血病',
            'B.癌症',
            'C.肌萎缩侧索硬化',
            'D.帕金森综合症'
        ],
        answer: 'b'
    },
    {
        index: 32,
        question: '以下哪个人物并没有冬眠过？',
        options: [
            'A.程心',
            'B.关一帆',
            'C.罗辑',
            'D.云天明'
        ],
        answer: 'd'
    },
    {
        index: 33,
        question: '关于罗辑的描述不正确的是？',
        options: [
            'A.在大学中担任哲学教授',
            'B.是面壁计划的面壁者之一',
            'C.第一任执剑人',
            'D.在威慑失败后没按三体人的要求移居澳大利亚坚持抵抗'
        ],
        answer: 'a'
    },
    {
        index: 34,
        question: '蝗虫为人类来带来了怎样的启发？',
        options: [
            'A.物竞天择，适者生存，劣势的物种终将被消灭',
            'B.即使力量相差悬殊，但是虫子从没被真正战胜过',
            'C.人类若想战胜三体人，必须依靠人口数量取胜',
            'D.在三体人面前人类就像蝗虫一样，必死无疑'
        ],
        answer: 'b'
    }
];

var n = 246559;


exports.start = function* (){
    yield this.render('start');
};


eports.code=function *() {
    var rlt=urlPares.parse(this.request.url,true).query;
    var code=rlt.code;
    Client.getAccessToken(code,function (err,result) {
        var accessToken=result.data.access_token;
        var openID=result.data.openid;
        Client.getUser(openID,function (err,result) {
            var userInfo=result;
            this.render('start');
        })
    })
}

exports.userAuth = function*() {
    //var work_id = req.param('work_id');

    var appid = "wxbfa6b99cc8267d25";
    var response_type = "code";
    var scope = "snsapi_userinfo";
    var state = ''//work_id;
    var redirect_uri = "http://zimbra.yueduapi.com:3000/redirect";
    var baseUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?";

    var url = baseUrl + "appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=" + response_type + "&scope=" + scope + "&state=" + state + "#wechat_redirect";


    this.redirect(url);
};

exports.redirect = function*() {
    //var work_id = req.param('state');
    var code = this.query.code;console.log(code)
    //sails.log.info(work_id);
    //sails.log.info(code);

    // 通过code换取网页授权access_token
    var appid = "wxbfa6b99cc8267d25";
    var secret = "4a4a62347866e8edcc8064c9cdfea399";
    var grant_type = "authorization_code";
    var api = "https://api.weixin.qq.com/sns/oauth2/access_token?";
    var url = api + "appid=" + appid + "&secret=" + secret + "&code=" + code + "&grant_type=" + grant_type;

    var data = yield request.get(url);
    data = JSON.parse(data.text);

    url = "http://zimbra.yueduapi.com:3000/index/";// + JSON.parse(data.text).openid;
    this.redirect(url);



    //unirest.get(url)
    //    .header('Accept', 'application/json')
    //    .send()
    //    .end(function cb(response) {
    //        console.log(response.body);
    //        console.log(response.body.openid);
    //        var url = "http://zimbra.yueduapi.com:3000/share/" + work_id + "/" + JSON.parse(response.body).openid;
    //        return res.redirect(url);
    //    });
};






exports.index = function* (){
    var data = yield request.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + wxAppid + "&secret=" + wxSecret);
    var access_token = data.body.access_token;
    data = yield request.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi");
    var ticket = data.body.ticket;
    var sign = wxSign(ticket, 'http://zimbra.yueduapi.com:3000/index');
    sign.appId = wxAppid;
    console.log(sign);

    //var marks = [];
    //var r = 0;
    //for(var i = 0;i < 5;i++){
    //    r = Math.round(25 * Math.random());
    //    while(marks.indexOf(r) != -1)r = Math.round(25 * Math.random());
    //    marks.push(r);
    //}
    //var local_items = [];
    //for(var j = 0;j<marks.length;j++)local_items.push(items[marks[j]]);console.log(local_items)

    var temp = items.slice(0,items.length);
    temp.sort(function(){ return 0.5 - Math.random() });
    var start = Math.round(25 * Math.random());
    var local_items = temp.slice(start,start+10);

    yield this.render('index',{items:local_items,n: n++,sign:sign});
};

exports.next = function* (){
    var form = yield bodyParse.form(this);console.log(form.index,form.answer,items[form.index].answer);
    this.body = {result: items[form.index].answer == form.answer};
};