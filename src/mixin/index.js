export const actSocket = {
  data() {
    return {
      socket: null,
      MAClist: [],
      userList: [],
      userMacList: [],
      newArray: [],
      n: 0
    }
  },
  methods: {
    init() {
      // 实例化socket
      this.socket = new WebSocket(
        `ws://129.28.114.72:7003/act;${this.token};${this.userid}`
      );
      // 监听socket连接
      this.socket.onopen = this.open;
      // 监听socket错误信息
      this.socket.onerror = this.error;
      // 监听socket消息
      this.socket.onmessage = this.getMessage;
    },
    open() {
      console.log("socket连接成功");
    },
    error() {
      this.warning("广播连接错误，请联系后台");
    },
    getMessage(e) {
      let devicesList = [];
      let arrSort = require("arr-sort");
      //数据接收
      if (e.data != "disconnected" && e.data !== "") {
        let resdata = JSON.parse(e.data);

        resdata = resdata.filter(item=>{
          //es8 新方法
          // const arr = [1, 3, 5, 2, '8', NaN, -0]
          // arr.includes(1) // true
          // arr.includes(1, 2) // false 该方法的第二个参数表示搜索的起始位置，默认为0
          // arr.includes('1') // false
          // arr.includes(NaN) // true
          // arr.includes(+0) // true
          return this.MAClist.includes(item.gt)
        })
        resdata.forEach(item => {
          
          if( !this.userMacList.includes(item.mac)){
            devicesList.push(item.mac.split("-").join(":"));
            //建立一个已经获取到用户头像等信息的list以用于过滤掉多域请求，减少请求用户信息的次数
            this.userMacList.push(item.mac)
          } 
        });
        if(devicesList.length>0){
          this.getUserInfo(devicesList).then(()=>{
            this.userList.forEach(i=>{
              resdata.forEach(j=>{
                if(i.mac === j.mac){
                  let pl = this.getHrPayload(j.hr,i.birthdate,i.gender);
                  if(pl < 60){
                    this.$set(i, "className", "bgImg5");
                  }else if (pl >= 60 && pl <= 69) {
                    // console.log("蓝色")
                    this.$set(i, "className", "bgImg4");
                  } else if (pl >= 70 && pl <= 79) {
                    // console.log("绿色")
                    this.$set(i, "className", "bgImg3");
                  } else if (pl >= 80 && pl <= 89) {
                    // console.log("黄色")
                    this.$set(i, "className", "bgImg2");
                  } else if (pl >= 90) {
                    // console.log("红色")
                    this.$set(i, "className", "bgImg1");
                  }
                  this.$set(i, "pl", pl);
                  this.$set(i, "isShow", true);
                  this.$set(i, "cl", j.cl); //卡路里
                  this.$set(i, "ds", j.ds); //里程
                  this.$set(i, "em", j.em); //SOS报警状态. 0: 未报警, 1: 报警中
                  this.$set(i, "gt", j.gt); //所在网关
                  this.$set(i, "hbp", j.hbp); //血压(收缩压)
                  this.$set(i, "hr", j.hr); //心率
                  this.$set(i, "lbp", j.lbp); //血压(舒张压)
                  this.$set(i, "rssi", j.rssi); //蓝牙信号强度
                  this.$set(i, "st", j.st); //步数
                  this.$set(i, "syt", j.syt); //是否同步时间
                  this.$set(i, "t", j.t); //数据时间
                }
              })
            })
          })
        }else{
          this.userList.forEach(i=>{
              resdata.forEach(j=>{
                if(i.mac === j.mac){
                  let pl = this.getHrPayload(j.hr,i.birthdate,i.gender);
                  if(pl < 60){
                    this.$set(i, "className", "bgImg5");
                  }else if (pl >= 60 && pl <= 69) {
                    // console.log("蓝色")
                    this.$set(i, "className", "bgImg4");
                  } else if (pl >= 70 && pl <= 79) {
                    // console.log("绿色")
                    this.$set(i, "className", "bgImg3");
                  } else if (pl >= 80 && pl <= 89) {
                    // console.log("黄色")
                    this.$set(i, "className", "bgImg2");
                  } else if (pl >= 90) {
                    // console.log("红色")
                    this.$set(i, "className", "bgImg1");
                  }
                  this.$set(i, "pl", pl);
                  this.$set(i, "isShow", true);
                  this.$set(i, "cl", j.cl); //卡路里
                  this.$set(i, "ds", j.ds); //里程
                  this.$set(i, "em", j.em); //SOS报警状态. 0: 未报警, 1: 报警中
                  this.$set(i, "gt", j.gt); //所在网关
                  this.$set(i, "hbp", j.hbp); //血压(收缩压)
                  this.$set(i, "hr", j.hr); //心率
                  this.$set(i, "lbp", j.lbp); //血压(舒张压)
                  this.$set(i, "rssi", j.rssi); //蓝牙信号强度
                  this.$set(i, "st", j.st); //步数
                  this.$set(i, "syt", j.syt); //是否同步时间
                  this.$set(i, "t", j.t); //数据时间
                }
              })
            })
        }
      }
      //socket广播进来改变 userList 内的数据，然后根据 字段payload进行排序
      this.userList = arrSort(this.userList, [{
        attr: "pl",
        asc: false
      }, {
        attr: "cl",
        asc: false
      }]);
      //重新排序后重新设置 list 的 index 字段
      let index = 1;
      this.userList.map(item => {
        item.index = index;
        index++;
      });
      //重新进行分组和自动翻页
      this.resortAndresetIsShow();
      this.group();
    },
    send() {
      this.socket.send(params);
    },
    close() {
      console.log("socket已经关闭");
      this.socket.close();
    },
    resortAndresetIsShow() {
      let timeStamp = new Date().getTime();
      let index = 1;
      this.userList.map(item => {
        if (timeStamp - item.t < 120000) {
          item.index = index;
          index++;
        }else{
          item.isShow = false;
        }
      });
    },
    getUserInfo(devices){
      return this.httpRequest("POST",`web/v3/user/get?token=${this.token}`,{
        userid: this.userid,
        gym_id: this.gymid,
        mapid: this.mapid,
        devices: devices
      }).then(res=>{
        let resualt;
        if(res.data.data){
          resualt = JSON.parse(this.$decrypt(res.data.data));
          resualt.forEach(item => {
            this.userList.push({
              avatar: decodeURIComponent(item.avatar),
              birthdate: item.birthdate,
              gender: item.gender,
              mac: item.mac,
              nickname: decodeURIComponent(item.nickname)
            })
          });
        }
      })
      
    },
    getHrPayload(hr, birthdate, gender) {
      let age = new Date().getFullYear() - birthdate.substring(0,4);
      let resualt;
      resualt =
        gender == 0
          ? Math.round((hr / (226 - age)) * 100)
          : Math.round((hr / (220 - age)) * 100);
      return resualt;
    },
    //将所有数据分成16个一组
    group() {
      let index = 0;
      let newArray = [];
      let tempList = this.userList.filter(item => {
        return item.isShow;
      });
      while (index < tempList.length) {
        newArray.push(tempList.slice(index, (index += 16)));
      }
      this.newArray = newArray;
    },
    //每隔若干分钟 上移16个数据
    autoPager() {
      if (this.timer1) {
        clearInterval(this.timer1);
        this.timer1 = null;
      }
      this.timer1 = setInterval(() => {
        let len = this.newArray.length - 1;
        this.n = this.n < len ? this.n + 1 : 0;
      }, 100000);
    }
  },
  beforeDestroy() {
    // 销毁监听
    this.close();
    if(this.timer1){
      clearInterval(this.timer1)
      this.timer1 = null;
    }
  },
  mounted() {
    this.init();
    window.onbeforeunload = e => {
      console.log('----断开连接')
      this.close();
    };
    this.autoPager();
  },
  created(){
    try {
        this.token = JSON.parse(window.sessionStorage.getItem("userInfo")).token;
        this.userid = JSON.parse(window.sessionStorage.getItem("userInfo")).userid;
        this.socketUri = JSON.parse(sessionStorage.getItem("socketUri"));
        this.MAClist = JSON.parse(sessionStorage.getItem("MAClist"));
        this.gymid = JSON.parse(window.sessionStorage.getItem("gymInfo")).gym_id;
        this.mapid = JSON.parse(window.sessionStorage.getItem("gymInfo")).map_id;
      } catch (error) {
        this.$router.push({name: "login"})
      }
  }
}
