AFRAME.registerComponent( 'pickup-object-component',{
    init:function(){
        console.log("Init component");

        const Context_AF = this;
        let Picked_Up = false;

        Context_AF.el.addEventListener('click', function(event){
            //var position_copy = ball.position;
            console.log('click');
            let camera = document.getElementById('camera');
            let ball = document.getElementById('ball');
            //ball.object3D.position;
            //const wVec = camera.object3D.localToWorld( ball.object3D.position );
            camera.object3D.add(ball.object3D);
            ball.position = "0 1 0"
            Picked_UP = true;
            console.log(Picked_UP);
            

            //Context_AF.createCow();
        });
        Context_AF.el.addEventListener('mouseenter', function(event){
            //e1 = html enitity or element
            //object3D = three.js (rendering engine) 3D element
            //Context_AF.el.object3D.scale.set(1.1,1.1,1.1);
        });
        Context_AF.el.addEventListener('mouseleave', function(event){
            //Context_AF.el.object3D.scale.set(1.0,1.0,1.0);
        });
    },
    createCow : function() {
        const Context_AF = this;

        let grabElem = document.createElement('a-entity');
        grabElem.setAttribute('class','clickable');
        //grabElem.setAttribute('obj-model', 'obj:assets/models/Cow.obj');
        //grabElem.setAttribute('material', 'src:assets/textures/Cow.png');
        grabElem.setAttribute('delete-cow-component','');

        // random transforms
        // grabElem.setAttribute('position', {x:(Math.random() * 6.0) - 3.0, y:0, z:-4 -(Math.random()*3.0)});
        // const randScale = 0.2 + (Math.random() * 0.8);
        // grabElem.setAttribute('scale',{x:randScale, y:randScale, z:randScale});
        // grabElem.setAttribute('rotation',{x:0, y:Math.random() *360.0,z:0});

        //add to scene
        let scene = document.querySelector('a-scene');
        scene.appendChild(grabElem);
    }
});