webpackJsonp([1],{"/n+g":function(t,e,s){"use strict";t.exports=function(t,e){if(null==t)return[];if("[object Array]"!==Object.prototype.toString.call(t))throw new TypeError("PARAM MUST BE ARRAY");if(null==e)return t;if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("PARAM MUST BE ARRAY");for(var s=t.length,r=0,n=e.length;r<n;r++){if("number"!=typeof e[r])throw new TypeError("PARAM MUST BE NUMBER ARRAY");Math.abs(e[r])>s&&(e[r]=s+1),e[r]>=-s&&e[r]<0&&(e[r]=e[r]+s)}e.sort(function(t,e){return t-e});var i=[];for(r=0,n=e.length;r<n;r++)-1==i.indexOf(e[r])&&i.push(e[r]);var a=JSON.parse(JSON.stringify(t));if(0===t.length)return[];for(r=0,n=i.length;r<n;r++)a.splice(i[r]-r,1);return a}},d6zA:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("RiDO"),n=s("AW8r"),i={data:function(){return{socket:null,MAClist:[],userList:[],userMacList:[],newArray:[],n:0}},methods:{init:function(){this.socket=new WebSocket("ws://129.28.114.72:7003/act;"+this.token+";"+this.userid),this.socket.onopen=this.open,this.socket.onerror=this.error,this.socket.onmessage=this.getMessage},open:function(){console.log("socket连接成功")},error:function(){this.warning("广播连接错误，请联系后台")},getMessage:function(t){var e=this,r=[],n=s("woiu");if("disconnected"!=t.data&&""!==t.data){var i=JSON.parse(t.data);(i=i.filter(function(t){return e.MAClist.includes(t.gt)})).forEach(function(t){e.userMacList.includes(t.mac)||(r.push(t.mac.split("-").join(":")),e.userMacList.push(t.mac))}),r.length>0?this.getUserInfo(r).then(function(){e.userList.forEach(function(t){i.forEach(function(s){if(t.mac===s.mac){var r=e.getHrPayload(s.hr,t.birthdate,t.gender);r<60?e.$set(t,"className","bgImg5"):r>=60&&r<=69?e.$set(t,"className","bgImg4"):r>=70&&r<=79?e.$set(t,"className","bgImg3"):r>=80&&r<=89?e.$set(t,"className","bgImg2"):r>=90&&e.$set(t,"className","bgImg1"),e.$set(t,"pl",r),e.$set(t,"isShow",!0),e.$set(t,"cl",s.cl),e.$set(t,"ds",s.ds),e.$set(t,"em",s.em),e.$set(t,"gt",s.gt),e.$set(t,"hbp",s.hbp),e.$set(t,"hr",s.hr),e.$set(t,"lbp",s.lbp),e.$set(t,"rssi",s.rssi),e.$set(t,"st",s.st),e.$set(t,"syt",s.syt),e.$set(t,"t",s.t)}})})}):this.userList.forEach(function(t){i.forEach(function(s){if(t.mac===s.mac){var r=e.getHrPayload(s.hr,t.birthdate,t.gender);r<60?e.$set(t,"className","bgImg5"):r>=60&&r<=69?e.$set(t,"className","bgImg4"):r>=70&&r<=79?e.$set(t,"className","bgImg3"):r>=80&&r<=89?e.$set(t,"className","bgImg2"):r>=90&&e.$set(t,"className","bgImg1"),e.$set(t,"pl",r),e.$set(t,"isShow",!0),e.$set(t,"cl",s.cl),e.$set(t,"ds",s.ds),e.$set(t,"em",s.em),e.$set(t,"gt",s.gt),e.$set(t,"hbp",s.hbp),e.$set(t,"hr",s.hr),e.$set(t,"lbp",s.lbp),e.$set(t,"rssi",s.rssi),e.$set(t,"st",s.st),e.$set(t,"syt",s.syt),e.$set(t,"t",s.t)}})})}this.userList=n(this.userList,[{attr:"pl",asc:!1},{attr:"cl",asc:!1}]);var a=1;this.userList.map(function(t){t.index=a,a++}),this.resortAndresetIsShow(),this.group()},send:function(){this.socket.send(params)},close:function(){console.log("socket已经关闭"),this.socket.close()},resortAndresetIsShow:function(){var t=(new Date).getTime(),e=1;this.userList.map(function(s){t-s.t<12e4?(s.index=e,e++):s.isShow=!1})},getUserInfo:function(t){var e=this;return this.httpRequest("POST","web/v3/user/get?token="+this.token,{userid:this.userid,gym_id:this.gymid,mapid:this.mapid,devices:t}).then(function(t){t.data.data&&JSON.parse(e.$decrypt(t.data.data)).forEach(function(t){e.userList.push({avatar:decodeURIComponent(t.avatar),birthdate:t.birthdate,gender:t.gender,mac:t.mac,nickname:decodeURIComponent(t.nickname)})})})},getHrPayload:function(t,e,s){var r=(new Date).getFullYear()-e.substring(0,4);return 0==s?Math.round(t/(226-r)*100):Math.round(t/(220-r)*100)},group:function(){for(var t=0,e=[],s=this.userList.filter(function(t){return t.isShow});t<s.length;)e.push(s.slice(t,t+=16));this.newArray=e},autoPager:function(){var t=this;this.timer1&&(clearInterval(this.timer1),this.timer1=null),this.timer1=setInterval(function(){var e=t.newArray.length-1;t.n=t.n<e?t.n+1:0},1e5)}},beforeDestroy:function(){this.close(),this.timer1&&(clearInterval(this.timer1),this.timer1=null)},mounted:function(){var t=this;this.init(),window.onbeforeunload=function(e){console.log("----断开连接"),t.close()},this.autoPager()},created:function(){try{this.token=JSON.parse(window.sessionStorage.getItem("userInfo")).token,this.userid=JSON.parse(window.sessionStorage.getItem("userInfo")).userid,this.socketUri=JSON.parse(sessionStorage.getItem("socketUri")),this.MAClist=JSON.parse(sessionStorage.getItem("MAClist")),this.gymid=JSON.parse(window.sessionStorage.getItem("gymInfo")).gym_id,this.mapid=JSON.parse(window.sessionStorage.getItem("gymInfo")).map_id}catch(t){this.$router.push({name:"login"})}}},a={name:"activeItem",props:{member:{type:Object,required:!0}},data:function(){return{}},methods:{}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.member.isShow?s("div",{ref:"items",class:t.member.className},[s("div",{staticClass:"left"},[s("div",{staticClass:"left_top"},[s("span",{staticStyle:{"font-size":"22px"}},[t._v(t._s(t.member.index))])]),t._v(" "),s("div",{staticClass:"left_mid"},[s("span",{staticClass:"hrPayload"},[t._v(t._s(t.member.pl?t.member.pl:0))]),t._v(" "),s("span",{staticClass:"hr_tag"},[t._v("%")])]),t._v(" "),s("div",{staticClass:"left_btm"},[s("span",{staticClass:"calIcon"}),t._v(" "),s("span",{staticClass:"calNum"},[t._v(t._s(t.member.cl?t.member.cl:0))])])]),t._v(" "),s("div",{staticClass:"mid"},[s("div",{staticClass:"img_wrap"},[s("img",{attrs:{src:t.member.avatar}})])]),t._v(" "),s("div",{staticClass:"right"},[s("div",{staticClass:"right_top"},[t._v(t._s(t.member.nickname?t.member.nickname:"未知"))]),t._v(" "),s("div",{staticClass:"right_mid"},[s("span",{staticClass:"hbNum"},[t._v(t._s(t.member.hr?t.member.hr:0))]),t._v(" "),t._m(0)]),t._v(" "),s("div",{staticClass:"right_btm"},[s("span",{staticClass:"stIcon"}),t._v(" "),s("span",{staticClass:"stNum"},[t._v(t._s(t.member.st?t.member.st:0))])])])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"hbIcon_wrap"},[e("span",{staticClass:"hbIcon"})])}]};var c=s("VU/8")(a,o,!1,function(t){s("hYcv")},"data-v-20dfd7ec",null).exports,l=(s("mtWM"),s("woiu"),{name:"smartgym",mixins:[i],components:{ActiveItem:c,VHeader:r.a,VFooter:n.a},data:function(){return{}},methods:{},mounted:function(){},beforeDestroy:function(){this.timer1&&(clearInterval(this.timer1),this.timer1=null),this.timer3&&(clearInterval(this.timer3),this.timer3=null)}}),u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-header"),t._v(" "),s("div",{ref:"myContent",staticClass:"content"},t._l(t.newArray,function(e,r){return s("div",{key:r,staticClass:"smartgym"},[s("transition-group",{staticClass:"itemWrap",attrs:{name:"slide-fade"}},[r==t.n?t._l(e,function(t,e){return s("active-item",{key:e,attrs:{member:t}})}):t._e()],2)],1)}),0),t._v(" "),s("v-footer")],1)},staticRenderFns:[]};var m=s("VU/8")(l,u,!1,function(t){s("pm1A")},"data-v-0857e1d6",null);e.default=m.exports},hYcv:function(t,e){},pm1A:function(t,e){},woiu:function(t,e,s){"use strict";var r=s("/n+g");function n(t){var e={};for(var s in t)if(t.hasOwnProperty(s))if("object"==typeof t[s]){var r=n(t[s]);for(var i in r)r.hasOwnProperty(i)&&(e[s+"."+i]=r[i])}else e[s]=t[s];return e}t.exports=function(t,e){if(null==t)return[];if("[object Array]"!==Object.prototype.toString.call(t))throw new TypeError("PARAM MUST BE ARRAY");if(null==e)return t;if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("PARAM MUST BE ARRAY");var s=0,i=e.length,a=JSON.parse(JSON.stringify(t)),o=[];if(!i)return a;var c=function t(c,l){if("[object Object]"!==Object.prototype.toString.call(l))throw new TypeError("PARAM MUST BE OBJECT ARRAY");var u=[];if(0!==c.length)if(0===(u=function(t,e,s){var r,i=JSON.parse(JSON.stringify(t)),a=function(t){return"function"==typeof t?t:!1===t?function(t,e){return"string"==typeof t?e.localeCompare(t):"number"==typeof t?e-t:0}:function(t,e){return"string"==typeof t?t.localeCompare(e):"number"==typeof t?t-e:0}}(s);if(void 0===e||0===t.length)return[];if("string"!=typeof e)throw new TypeError("PARAM MUST BE STRING");for(var o=0,c=i.length;o<c;o++)if("[object Object]"!==Object.prototype.toString.call(i[o]))throw new TypeError("PARAM MUST BE OBJECT ARRAY");for(i.sort(function(t,s){return a(n(t)[e],n(s)[e])}),o=0,c=i.length-1;o<c;o++){if(a(n(i[o])[e],n(i[o+1])[e])){r=o;break}if(o==c-1){r=c;break}}return i.slice(0,r+1)}(c,l.attr||"",l.asc)).length&&(u=c),1===u.length||s>=i-1){o=o.concat(u);for(var m=0,h=u.length;m<h;m++){for(var f=[],g=0,p=a.length;g<p;g++)f.push(JSON.stringify(a[g]));var d=f.indexOf(JSON.stringify(u[m]));-1!==d&&(a=r(a,[d]))}}else t(u,e[++s])};return function t(){s=0,c(a,e[0]),0!==a.length&&t()}(),o}}});
//# sourceMappingURL=1.0cc81b303d29b3b057da.js.map