const storeModel = require('./mysql');
const _ = require('lodash');
let allArr = [];

function addmessage(data) {
    let date = Date.now()
    data = {...data, time: date}
    tempSpace(data)

}
//创建缓存空间3条进一次数据库
async function tempSpace(data) {
    let tempObj = {};
    let num = _.findIndex(allArr, o => {
        return o.tempName === data.from
    });
    if (allArr.length === 0 || num === -1) {
        tempObj = {
            tempName: data.from,
            tempArr: []
        };
        tempObj.tempArr.push(data)
        allArr.push(tempObj)
    } else {
        allArr[num].tempArr.push(data)
        if (allArr[num].tempArr.length === 3) {
            let res = await storeModel.findMessageUser(allArr[num].tempName).then(res => res).catch(err => err)
            console.log(res)
            if (res.errno || res.length === 0) {
                //出错则添加或者没找到结果
                console.log(allArr[num])
                let sqlData = {
                    username: allArr[num].tempName,
                    content: JSON.stringify(allArr[num].tempArr)//加正则转化（优化）
                }
                await storeModel.saveMessageUser(sqlData).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            } else {
                //有此用户则直接更新数据
                console.log("更新")
                await storeModel.updateMessageUser(JSON.stringify(_.concat(JSON.parse(res[0].content), allArr[num].tempArr)), allArr[num].tempName).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
            allArr[num].tempArr.splice(0, allArr[num].tempArr.length)
        }
    }
    console.log(allArr)
}
//断线后将现有对话直接存入数据库
async function disconnectDb(username) {
    // console.log(username) 小心username无效，适当位置加个判断
    let num = _.findIndex(allArr, o => {
        return o.tempName === username
    });
    let res = await storeModel.findMessageUser(allArr[num].tempName).then(res => res).catch(err => err)
    if (res.errno || res.length === 0) {
        //出错则添加或者没找到结果
        console.log(allArr[num])
        let sqlData = {
            username: allArr[num].tempName,
            content: JSON.stringify(allArr[num].tempArr)//加正则转化（优化）
        }
        await storeModel.saveMessageUser(sqlData).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    } else {
        //有此用户则直接更新数据
        console.log("更新")
        await storeModel.updateMessageUser(JSON.stringify(_.concat(JSON.parse(res[0].content), allArr[num].tempArr)), allArr[num].tempName).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
}


module.exports = {
    addmessage,
    disconnectDb
}









