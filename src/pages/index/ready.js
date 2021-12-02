// 骨架屏消失
const hideSkeleton = () => {
    const skeleton = document.getElementById('skeleton-screen');
    skeleton.style.opacity = 0;
    setTimeout(() => {
        skeleton.style.display = 'none';
    }, 500);
};

const Ready = () => {
    // 模拟数据加载耗时
    setTimeout(() => {
        hideSkeleton();
    }, 2000)

};
export default Ready;
