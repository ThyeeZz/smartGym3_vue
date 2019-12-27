import Mock from "mockjs"
const Random=Mock.Random;
//数据模板'name|min-max':value
const mockData= [];
for(let i=0;i<50;i++){
    mockData.push({
        "mac": "c7-58-a2-54-78-f9",
        'name': Random.name(), // 生成姓名
        "cl":Random.integer(0, 1000), // 生成1到100之间的整数,
        "hr":Random.integer(50, 120), // 生成1到100之间的整数,
        "st":Random.integer(0, 10000), // 生成1到100之间的整数,
        "avatar":require("@/assets/images/timg.jpg"), // 生成web地址
        "isShow": true,
        "hrPayload": Random.integer(20, 99)
      })
}


Mock.mock('/Get/list2', mockData) ;
