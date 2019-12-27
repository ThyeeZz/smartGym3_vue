<template>
    <div class="gym_foot">
        <ul class="list_wrap">
            <li class="list_item">
                <div class="img_wrap">
                    <img src="../assets/images/reshen.png" alt="">
                </div>
                <div class="desc">
                    <p>热身运动</p>
                    <p>&lt;59%</p>
                </div>
            </li>

            <li class="list_item">
                <div class="img_wrap">
                    <img src="../assets/images/ranzhi.png" alt="">
                </div>
                <div class="desc">
                    <p>燃脂训练</p>
                    <p>60-69%</p>
                </div>
            </li>

            <li class="list_item">
                <div class="img_wrap">
                    <img src="../assets/images/naili.png" alt="">
                </div>
                <div class="desc">
                    <p>有氧耐力</p>
                    <p>70-79%</p>
                </div>
            </li>

            <li class="list_item">
                <div class="img_wrap">
                    <img src="../assets/images/qianghua.png" alt="">
                </div>
                <div class="desc">
                    <p>肌肉强化</p>
                    <p>80-89%</p>
                </div>
            </li>

            <li class="list_item">
                <div class="img_wrap">
                    <img src="../assets/images/chongci.png" alt="">
                </div>
                <div class="desc">
                    <p>有氧冲刺</p>
                    <p>&gt;90%</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "gym_foot"
}
</script>
<style lang="scss" scoped>
.gym_foot{
    height: 98px;
    width: 1920px;
    background-color: #0C1F3B;
    box-sizing: border-box;
    padding: 14px 30px 15px 31px;
    color: #fff;
    .list_wrap{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        .list_item{
            display: flex;
            height: 69px;
            .img_wrap{
                height: 69px;
                img{
                    height: 69px;
                    width: 69px;
                }
            }
            .desc{
                height: 100%;
                display: flex;
                align-items: center;
                p:first-child{
                    font-size: 26px;
                    width: 55px;
                    height: 100%;
                    margin: 0 10px;
                    overflow: hidden;
                }
                p:last-child{
                    font-size: 42px
                }   
            }
        }
    }
}

</style>