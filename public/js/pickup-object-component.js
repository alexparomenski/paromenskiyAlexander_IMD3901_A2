var Picked_UP = false;

AFRAME.registerComponent( 'pickup-object-component',{
    init:function(){
        console.log("Init component");

        const Context_AF = this;
        

        Context_AF.el.addEventListener('click', function(event){
            
            if(Picked_UP){
                Context_AF.dropObject();
            }
            else{
                Context_AF.pickUpObject();
            }

            /* 
            var position_copy = ball.position;
            console.log(Picked_UP);
            console.log('click');
            let camera = document.getElementById('camera');
            let ball = document.getElementById('ball');
            position before pick up
            console.log(ball.object3D.position);
            const wVec = camera.object3D.localToWorld(ball.object3D.position);
            camera.object3D.localToWorld(ball.object3D.position);
            
            camera.object3D.add(ball.object3D);
            console.log(ball.object3D.position);
            ball.setAttribute('position', {x: 0, y: 0, z:-2});
            console.log(ball.object3D.position);
            console.log(wVec);
            position after pick up
            console.log(wVec);
            
            Picked_UP = true;
            onsole.log(Picked_UP);
            

            Context_AF.createCow();
            */
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
    },

    dropObject : function() {
        let scene = document.querySelector('a-scene');
        const Context_AF = this;
        let camera = document.getElementById('camera');
        let wVec = camera.object3D.localToWorld(Context_AF.el.object3D.position);
        console.log(wVec);
        console.log(parseFloat(wVec.x.toFixed(2)));
        console.log(wVec.y);
        console.log(wVec.z);
        //let ball = document.getElementById('ball');
        //Context_AF.el.parentNode.removeChild(Context_AF.el);
        scene.object3D.add(Context_AF.el.object3D);
        Context_AF.el.object3D.position = (wVec.x, wVec.y, wVec.z);


        console.log("dropping item");
        Picked_UP = false;

        /*
        // creating a new object in the position of the removed object
        let grabElem = document.createElement('a-entity');
        grabElem.setAttribute('position',{x: 0, y:1, z:0});
        grabElem.setAttribute('id', 'ball'); 
        grabElem.setAttribute('class', 'clickable');
        grabElem.setAttribute('geometry',{primitive:'sphere', radius:'0.5', height:'1.0'});
        grabElem.setAttribute('material','color:yellow;');
        grabElem.setAttribute('pickup-object-component','');

        let scene = document.querySelector('a-scene');
        scene.appendChild(grabElem);
        */
    },

    pickUpObject : function() {
        const Context_AF = this;
        let camera = document.getElementById('camera');
        //let ball = document.getElementById('ball');

        camera.object3D.localToWorld(Context_AF.el.object3D.position);
        camera.object3D.add(Context_AF.el.object3D);
        camera.object3D.add(ball.object3D)
        Context_AF.el.setAttribute('position', {x: 0, y: 0, z:-2});
        Picked_UP = true;
        console.log("item picked up");
        
    },
    dropBall :function(){
        const Context_AF = this;
        let camera = document.getElementById('camera');

        let wVec = camera.object3D.localToWorld(Context_AF.el.object3D.position);

        Context_AF.el.parentNode.removeChild(Context_AF.el);
        console.log("placing item");
        Picked_UP = false;

        // creating a new object in the position of the removed object
        let grabElem = document.createElement('a-entity');
        grabElem.position = "0 1 0";
        //grabElem.setAttribute('position',{x: wVec.x, y:wVec.y, z:wVec.z});
        grabElem.setAttribute('id', 'ball'); 
        grabElem.setAttribute('class', 'clickable');
        grabElem.setAttribute('geometry',{primitive:'sphere', radius:'0.5', height:'1.0'});
        grabElem.setAttribute('material','color:yellow;');
        grabElem.setAttribute('pickup-object-component','');

        let scene = document.querySelector('a-scene');
        scene.appendChild(grabElem);


        
    }
});