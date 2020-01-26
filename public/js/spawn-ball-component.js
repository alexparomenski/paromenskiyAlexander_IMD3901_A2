AFRAME.registerComponent( 'spawn-ball-component',{
    init:function(){
        console.log("Init component");

        const Context_AF = this;

        Context_AF.el.addEventListener('click', function(event){
            console.log('click');
            Context_AF.spawnBall();
        });
        Context_AF.el.addEventListener('mouseenter', function(event){
            //e1 = html enitity or element
            //object3D = three.js (rendering engine) 3D element
            Context_AF.el.object3D.scale.set(1.1,1.1,1.1);
        });
        Context_AF.el.addEventListener('mouseleave', function(event){
            Context_AF.el.object3D.scale.set(1.0,1.0,1.0);
        });
    },
    spawnBall: function() {

        const Context_AF = this;
        let ballElem = document.createElement('a-entity');
        ballElem.setAttribute('class','clickable');
        ballElem.setAttribute('dynamic-body','');
        ballElem.setAttribute('position',{x:0,y:5,z:0});
        ballElem.setAttribute('geometry',"primitive:sphere; radius:0.3;");
        ballElem.setAttribute('material',"color:red;");
        ballElem.setAttribute('pickup-object-component','');

        //add to scene
        let scene = document.querySelector('a-scene');
        scene.appendChild(ballElem);
    }
});
