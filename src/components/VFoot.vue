<template>
  <div class="gym_foot">
    <ul class="list_wrap">
      <li class="list_item">
        <div class="img_wrap">
          <img src="../assets/images/reshen.png" alt />
        </div>
        <div class="desc">
          <div class="title">
            <p>热身</p>
            <p>运动</p>
          </div>
          <p>&lt;59%</p>
        </div>
      </li>

      <li class="list_item">
        <div class="img_wrap">
          <img src="../assets/images/ranzhi.png" alt />
        </div>
        <div class="desc">
          <div class="title">
            <p>燃脂</p>
            <p>训练</p>
          </div>
          <p>60-69%</p>
        </div>
      </li>

      <li class="list_item">
        <div class="img_wrap">
          <img src="../assets/images/naili.png" alt />
        </div>
        <div class="desc">
          <div class="title">
            <p>有氧</p>
            <p>耐力</p>
          </div>
          <p>70-79%</p>
        </div>
      </li>

      <li class="list_item">
        <div class="img_wrap">
          <img src="../assets/images/qianghua.png" alt />
        </div>
        <div class="desc">
          <div class="title">
            <p>肌肉</p>
            <p>强化</p>
          </div>
          <p>80-89%</p>
        </div>
      </li>

      <li class="list_item">
        <div class="img_wrap">
          <img src="../assets/images/chongci.png" alt />
        </div>
        <div class="desc">
          <div class="title">
            <p>有氧</p>
            <p>冲刺</p>
          </div>
          <p>&gt;90%</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "gym_foot"
};
</script>
<style lang="scss" scoped>
.gym_foot {
  height: 98px;
  width: 1080px;
  background-color: #0c1f3b;
  box-sizing: border-box;
  padding: 14px 30px 15px 31px;
  color: #fff;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  .list_wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .list_item {
      display: flex;
      height: 69px;
      .img_wrap {
        height: 69px;
        img {
          height: 69px;
          width: 69px;
        }
      }
      .desc {
        height: 100%;
        display: flex;
        align-items: center;
        .title {
          p {
              text-align: center;
            font-size: 22px;
            height: 100%;
            margin: 0 5px;
            overflow: hidden;
          }
        }

        p:last-child {
          font-size: 22px;
        }
      }
    }
  }
}
</style>