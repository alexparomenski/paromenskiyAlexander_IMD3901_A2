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
            //Context_AF.el.object3D.scale.set(1.1,1.1,1.1);
        });
        Context_AF.el.addEventListener('mouseleave', function(event){
            //Context_AF.el.object3D.scale.set(1.0,1.0,1.0);
        });
    },

    dropObject : function() {
        const Context_AF = this;
        let scene = document.querySelector('a-scene');
        let camera = document.getElementById('camera');
        let wVec = camera.object3D.localToWorld(Context_AF.el.object3D.position);
       
        //let ball = document.getElementById('ball');
        //Context_AF.el.parentNode.removeChild(Context_AF.el);
        scene.object3D.add(Context_AF.el.object3D);
        //Context_AF.el.object3D.position = (wVec.x, wVec.y, wVec.z);
        Context_AF.el.setAttribute('position',{x:wVec.x, y:wVec.y, z:wVec.z});
        Context_AF.el.setAttribute('dynamic-body', '');


        

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
        Context_AF.el.removeAttribute('dynamic-body');
        camera.object3D.add(ball.object3D);
        Context_AF.el.setAttribute('position', {x: 0, y: 0, z:-2});
        Picked_UP = true;
        console.log("item picked up");
        
    }
   
});