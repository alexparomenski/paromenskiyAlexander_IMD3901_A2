// game variables
var Picked_UP = false;
var Ball_Thrown = false;
var Game_Points = 0;

// throw ball variables
var lastPosition = new CANNON.Vec3(0, 0, 0);
var currentPosition = new CANNON.Vec3(0, 0, 0);

// reference variables
const scene = document.querySelector('a-scene');
let camera = document.getElementById('camera');

AFRAME.registerComponent( 'pickup-object-component',{
    init:function(){
        console.log("Init component");
        const Context_AF = this;
        let target_1 = document.getElementById('target_1');
        let target_2 = document.getElementById('target_2');
        let target_3 = document.getElementById('target_3');
        Context_AF.el.addEventListener('click', function(event){
            // if the ball is clicked and it is not already picked up then call the pick up function
            if(!Picked_UP){
                Context_AF.pickUpObject();
            }  
        });
        target_1.addEventListener('click', function(event){
            // this is mostly for phone but user can tap the targets to throw ball as well as prace space (on computer)
            if(Picked_UP){
                Context_AF.throwObject();
            }  
        });
        target_2.addEventListener('click', function(event){
            if(Picked_UP){
                Context_AF.throwObject();
            }  
        });
        target_3.addEventListener('click', function(event){
            if(Picked_UP){
                Context_AF.throwObject();
            }  
        });
        
        Context_AF.el.addEventListener('mouseenter', function(event){
            Context_AF.el.object3D.scale.set(1.05,1.05,1.05);
        });
        Context_AF.el.addEventListener('mouseleave', function(event){
            Context_AF.el.object3D.scale.set(1.0,1.0,1.0);
        });
        document.addEventListener("keydown", function(event){
            
            if(event.keyCode == 32 && Picked_UP){
                Ball_Thrown = true;
                console.log("spacebar was pressed");
                Context_AF.throwObject();
            }
        });
        
    },
    pickUpObject : function() {
        const attachment = document.querySelector('#attachment');
        const Context_AF = this;
        let camera = document.getElementById('camera');

        // remove physics from the object 
        Context_AF.el.removeAttribute('dynamic-body');
        //camera.object3D.localToWorld(attachment.object3D.position);
        attachment.object3D.localToWorld(Context_AF.el.object3D.position);
        attachment.object3D.add(Context_AF.el.object3D);
        console.log(attachment.object3D.position);
        Context_AF.el.setAttribute('position',attachment.getAttribute('position'));
        // Ball is picked up -> can throw
        Picked_UP = true;
        console.log("item picked up");
        
    },
    throwObject: function (){
        const attachment = document.querySelector('#attachment');
        let scene = document.querySelector('a-scene');
        const Context_AF = this;
        let impulseAmount = 100;
        let camera = document.getElementById('camera');
        let throwElem = document.createElement('a-sphere');
        throwElem.setAttribute('radius', 0.3);
        // Set initial position of projectile to that of the camera.
        throwElem.setAttribute('position', camera.object3D.position);
        throwElem.setAttribute('color', 'red');
        //entity.setAttribute('shader', 'flat');
        throwElem.setAttribute('mass', 1);

        // add the ball to the scene and give it a dynamic body
        scene.appendChild(throwElem);
        throwElem.setAttribute('dynamic-body', '');
        
        throwElem.addEventListener('body-loaded', function(){
            setTimeout(function () {
              let pStart = new CANNON.Vec3();
              pStart.copy(attachment.object3D.getWorldPosition());
              let force = throwElem.body.position.vsub(pStart);
              force.normalize(); 
              force.scale(impulseAmount, force);
              throwElem.body.applyImpulse(force, throwElem.body.position);
            }, 0);
          });
        
          // checking if the ball has collided with any objects
        throwElem.addEventListener('collide', function (event) {
            console.log('Player has collided with body #' + event.detail.body.id);
            
            event.detail.body.el.setAttribute('material', 'color:green;');
            // if the player hits targets add points
            if(event.detail.body.id == 1 || event.detail.body.id == 2 || event.detail.body.id == 3){
                Game_Points ++;
                console.log(Game_Points);
            }
            if(Game_Points == 3){
                const target_1 = document.querySelector('#target_1');
                const target_2 = document.querySelector('#target_2');
                const target_3 = document.querySelector('#target_3');
                // target_1.removeAttribute('static-body');
                target_1.setAttribute('scale',{x:0, y:0, z:0})
                target_2.setAttribute('scale',{x:0, y:0, z:0})
                target_3.setAttribute('scale',{x:0, y:0, z:0})

            }
         });
         Picked_UP = false;
             
    },
    
});
