/**
微信小程序搜索：农夫山泉好水旺财兔年吉祥

活动截止时间2023年2月5日 23:59:59

抓包：https://nfsq.lookcharm.cn/网址body里面token和uid的值，用&连接，多账号@隔开

例如 ：export nfsq = "XXXXXXXX&XXXXXXXXXX@XXXXXXXX&XXXXXXXXXX"

目前实现: 每日抽奖，玩游戏1和玩游戏2，每日抽盲盒
*/

const $ = new Env('农夫三拳有点甜');
 const notify = $.isNode() ? require('./sendNotify') : '';
 const {log} = console;
 const Notify = 0; //0为关闭通知，1为打开通知,默认为1
 const debug = 0; //0为关闭调试，1为打开调试,默认为0
 //////////////////////
 let nfsq = process.env.nfsq;
 let nfsqArr = [];
 let nfsqtk = '';
 let youxicishu1 = '';
//////////////////////
 let msg = '';
 !(async () => {
     if (!(await Envs()))
         return;
     else {
         log(`\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
             new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
             8 * 60 * 60 * 1000).toLocaleString()} \n=============================================\n`);
        // await poem();
         log(`\n=================== 共找到 ${nfsqArr.length} 个账号 ===================`)
         if (debug) {
             log(`【debug】 这是你的全部账号数组:\n ${nfsqArr}`);
         }
         for (let index = 0; index < nfsqArr.length; index++) {
             nfsq = nfsqArr[index];
             let num = index + 1;
             nfsqtk = nfsqArr[index].split('&');            
             log(`\n========= 开始【第 ${num} 个账号】=========\n`)
             if (debug) {
                log(`【debug】 这是你的第 ${num} 个账号数组:\n ${nfsq}`);
             }

//             msg += `\n第${num}个账号运行结果：`
            log('检测用户');
            await getaddr();
            await $.wait(2 * 1000);

         }

         await SendMsg(msg);

     }

 })()

     .catch((e) => log(e))
     .finally(() => $.done())

     

 /**

  * 检测用户

  */

async function getaddr(timeout = 2 * 1000) {

    let url = {

       url : `https://nfsq.lookcharm.cn/game1/getaddr`,

       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`

       },

//       body : ``
       
       }

    return new Promise((resolve) => {

        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);

            log(JSON.stringify(url));

        }

        $.get(url, async (error, response, data) => {

            try {

                if (debug) {

                    log(`\n\n【debug】=============== 返回data==============`);

                    log(data)

                }

                let result = JSON.parse(data);
                if(result.code == 0){
                    log('用户有效');
                        await $.wait(2 * 1000);
                    log('查询任务');
                        await $.wait(2 * 1000);
                        await gettasklist();
                        await $.wait(2 * 1000);
                }else{
                        log(result);
                }

            } catch (e) {

                log(e)

            } finally {

                resolve();

            }

        }, timeout)

    })

}

/**

  * 任务列表

  */

async  function gettasklist(timeout = 2 * 1000) {

    let url = {

       url : `https://nfsq.lookcharm.cn/game1/gettasklist`,

       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`

       },

//       body : ``
       
       }

    return new Promise((resolve) => {

        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);

            log(JSON.stringify(url));

        }

        $.get(url, async (error, response, data) => {

            try {

                if (debug) {

                    log(`\n\n【debug】=============== 返回data==============`);

                    log(data)

                }

                let result = JSON.parse(data);
                log(result);
                if(result.data[1] == 1){
                    await list1()
                }else{
                    log("任务1已完成")
                }
                await $.wait(2 * 1000);
                if(result.data[2] == 1){
                    await list2()
                }else{
                    log("任务2已完成")
                }
                await $.wait(2 * 1000);
                if(result.data[3] == 1){
                    await list3()
                }else{
                    log("任务3已完成")
                }
                await $.wait(2 * 1000);
                log("查询抽奖机会")
                await getcishu();

            } catch (e) {

                log(e)

            } finally {

                resolve();

            }

        }, timeout)

    })

}


 /**

  * 任务1

  */

  function list1(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game1/finishtask`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
       body : `{"type" : 1}`       
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.post(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }

                let result = JSON.parse(data);
                log(`任务1：${result}`);
            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**

  * 任务2

  */

  function list2(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game1/finishtask`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
       body : `{"type" : 2}`       
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.post(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }

                let result = JSON.parse(data);
                log(`任务2：${result}`);
            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**

  * 任务3

  */

  function list3(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game1/finishtask`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
       body : `{"type" : 3}`       
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.post(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }

                let result = JSON.parse(data);
                log(result);
                log(`任务3：${result}`);
            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**

  * 获取每日抽奖次数

  */

async  function getcishu(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game1/getlotterycnt`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
    //   body : ``       
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.get(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }

                let result = JSON.parse(data);
                log(result);
                if(result.data > 0){
                    log("去抽奖")
                    for(let cishu = 0; cishu < 6; cishu++){
                        await choujiang();
                        await $.wait(2 * 1000);
                    }
                }else{
                    log("没抽奖机会了")
                    await $.wait(2 * 1000);
                    log("开始玩游戏1")
                    await getyouxicishu1();
                    if(youxicishu1 ==0){
                        log("开始玩游戏2")
                        await getyouxicishu2()
                    }
                }
                

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**

  * 每日抽奖

  */
async  function choujiang(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game1/bottlelottery`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
    //   body : ``       
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.post(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }
                let result = JSON.parse(data);
                log(result);
                if(result.data ==20){
                    log("不知道鸡毛")
                }else if(result.data ==29){
                    log("3元代金券")
                }else if(result.data ==30){
                    log("5元代金券")
                }else if(result.data ==31){
                    log("满100-15代金券")
                }else if(result.data ==30){
                    log("5元代金券")
                }else if(result.data ==-100){
                    log("没抽奖机会了")
                    await getcishu();
                }else{
                    log("不知道啥玩意")
                }

                

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**

  * 获取游戏1的次数

  */
async  function getyouxicishu1(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game1/getplaycnt`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
    //   body : ``       
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.get(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }
                let result = JSON.parse(data);
                log(result);
                if(result.data > 0){
                        log("上报游戏")
                        await wanyouxi1();
                        let loadtime = randomInt(5, 10)
                        log(`随即等待时长：${loadtime}秒`)
                        await $.wait(loadtime * 1000);
                        log("上报分数")
                        await addfenshu1();
                        await $.wait(2 * 1000);
                    
                }else{
                    log("没游戏次数了")
                    youxicishu1 = 0;

                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}
/**

  * 开始游戏1

  */
  function wanyouxi1(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game1/deduct`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
       body : `{}`       
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.post(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }
                let result = JSON.parse(data);
                log(result);

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**

  * 上报游戏1分数

  */
async  function addfenshu1(timeout = 2 * 1000) {
    let fenshu = randomInt(150, 200)
    let url = {
       url : `https://nfsq.lookcharm.cn/game1/addscore`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
       body : `${fenshu}`
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.post(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }
                let result = JSON.parse(data);
                log(`本次上报分数: ${fenshu}`)
                log(result);
                await getyouxicishu1();


            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**

  * 游戏2的次数

  */
async  function getyouxicishu2(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game2/getg2playcnt`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
    //   body : ``       
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.get(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }
                let result = JSON.parse(data);
                log(result.data);
                if(result.data.playcnt > 0){                   
                        log("上报游戏")
                        await wanyouxi2();
                        let loadtime = randomInt(5, 10)
                        log(`随即等待时长：${loadtime}秒`)
                        await $.wait(loadtime * 1000);
                        log("上报分数")
                        await addfenshu2();
                        await $.wait(2 * 1000);
                    
                }else if(result.data.leftgameshare > 0){
                    log("分享游戏")
                    for(let fenxiang = 0; fenxiang < 3; fenxiang++){
                        await fenxiang2();
                        await $.wait(2 * 1000);
                    }

                }else{
                    log("没游戏次数了")
                    await $.wait(2 * 1000);
                    log("开盲盒")
                    await kaimanghe();

                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}
/**

  * 开始游戏2

  */
  function wanyouxi2(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game2/deductg2`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
       body : `null`       
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.post(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }
                let result = JSON.parse(data);
                log(result);

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**

  * 上报游戏2分数

  */
async  function addfenshu2(timeout = 2 * 1000) {
    let fenshu = randomInt(150, 200)
    let url = {
       url : `https://nfsq.lookcharm.cn/game2/addg2score`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
       body : `${fenshu}`
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.post(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }
                let result = JSON.parse(data);
                log(`本次上报分数: ${fenshu}`)
                log(result);
                await getyouxicishu2();

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**

  * 分享游戏2任务

  */
async  function fenxiang2(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game2/share4playgame2`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
       body : `null`
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.post(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }
                let result = JSON.parse(data);
                log(result);

                await getyouxicishu2();

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**

  * 查询积分

  */
  function getjifen(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game1/getscore`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
    //   body : ``
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.get(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }
                let result = JSON.parse(data);
                log(`当前积分: ${result.data}`)

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}

/**

  * 开盲盒

  */
async  function kaimanghe(timeout = 2 * 1000) {
    let url = {
       url : `https://nfsq.lookcharm.cn/game1/rabbitimage`,
       headers : {

           "Host": "nfsq.lookcharm.cn",

           "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001435) NetType/WIFI Language/zh_CN",

           "Content-Type": "application/json",

           "token": `${nfsqtk[0]}`,

           "uid": `${nfsqtk[1]}`
       },
       body : `{}`
       }
    return new Promise((resolve) => {
        if (debug) {

            log(`\n【debug】===============  请求 url ===============`);
            log(JSON.stringify(url));
        }
        $.post(url, async (error, response, data) => {

            try {
                if (debug) {
                    log(`\n\n【debug】=============== 返回data==============`);
                    log(data)
                }
                let result = JSON.parse(data);
                log(result.data)
                if(result.data > 1){
                    await $.wait(2 * 1000);
                    await kaimanghe();
                }else{
                    log("机会已用完")

                    await getjifen();
                }

            } catch (e) {
                log(e)
            } finally {
                resolve();
            }
        }, timeout)
    })
}
 // ============================================变量检查============================================ \\

 async function Envs() {

     if (nfsq) {

        if (nfsq.indexOf("@") != -1) {

            nfsq.split("@").forEach((item) => {

                nfsqArr.push(item);

            });

        } else if (nfsq.indexOf("\n") != -1){

            nfsq.split("\n").forEach((item) => {

                nfsqArr.push(item);

            });

        } else {

            nfsqArr.push(nfsq);

        }

    } else {

        log(`\n 【${$.name}】：未填写变量 nfsq`)

        return ;

    }

     return true;

 }

 

 // ============================================发送消息============================================ \\

 async function SendMsg(message) {

     if (!message)

         return;

 

     if (Notify > 0) {

         if ($.isNode()) {

             var notify = require('./sendNotify');

             await notify.sendNotify($.name, message);

         } else {

             $.msg(message);

         }

     } else {

         log(message);

     }

 }


 
/**
 * 随机数生成
 */
function randomString(e) {
  void 0 === e && (e = 16);
  for (var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", n = t.length, a = "", r = 0; r < e; r++) a += t.charAt(Math.floor(Math.random() * n));
  return a
}
 

 /**

  * 随机整数生成

  */

 function randomInt(min, max) {

     return Math.round(Math.random() * (max - min) + min)

 }

 /**

  * 获取毫秒时间戳

  */

 function timestampMs(){

    return new Date().getTime();

 }

 /**

  * 获取秒时间戳

  */

 function timestampS(){

    return Date.parse(new Date())/1000;

 }

 



 function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
