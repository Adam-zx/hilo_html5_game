var queue = new Hilo.LoadQueue();
var resources = [
    {id:'bg',src:'bg.jpg',noCache:false,crossOrigin:'anonymous'},
];
queue.add(resources);
queue.on('complete',function(e) {
 //   alert('资源加载完成');//资源加载完成后的逻辑，比如隐藏loading
    var bg = queue.getContent('bg');
    console.log(bg);
});
queue.start();
