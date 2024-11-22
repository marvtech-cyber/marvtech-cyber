import { mockWithVideo } from "./libs/mindar/camera-mock.js";
import {loadGLTF} from "./libs/loaders/loaders.js";
const THREE = window.MINDAR.IMAGE.THREE;



document.addEventListener('DOMContentLoaded', () =>{
    const start = async () => {
        mockWithVideo('./assets/mockvideos/museumvid.mp4');
        
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "./assets/targets/animals1.mind"
        });
    
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

       const elephant = await loadGLTF("./assets/3dmodels/elephant.glb");
        elephant.scene.position.set(0, -0.4, 0);

        //const leopard = await loadGLTF("./assets/3dmodels/leopard.glb");
        //leopard.scene.position.set(0, 0, 0);
        
        //const lion = await loadGLTF("./assets/3dmodels/lion.glb");
        //lion.scene.position.set(0, -0.4, 0);

        //const buffallo = await loadGLTF("./assets/3dmodels/african_buffalo.glb");
        //buffallo.scene.position.set(0, -0.4, 0);

        const elephantAnchor = mindarThree.addAnchor(0);
        elephantAnchor.group.add(elephant.scene);

        //const leopardAnchor = mindarThree.addAnchor(1);
        //leopardAnchor.group.add(leopard.scene);

        //const lionAnchor = mindarThree.addAnchor(2);
        //lionAnchor.group.add(lion.scene);

        //const bufalloAnchor = mindarThree.addAnchor(3);
        //bufalloAnchor.group.add(buffallo.scene);
        
    
        await mindarThree.start();
    
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
    
        })
    }
    start();

    

})