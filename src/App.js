import './App.css';
import {Engine, Scene} from "react-babylonjs";
import { Vector3} from "@babylonjs/core";
import Sensor from "./sensors";
import {ADTFullScreenUI} from "./fullScreenUI";
// const DebugLayer = () => {
//   const scene = useScene();
//   import('@babylonjs/inspector').then(() => {
//     scene.debugLayer.show({embedMode: true});
//   })
//   return null
// }
const clickLogger = (title,value,info) => {
    alert(`click ${title},value: ${value},info: ${info}`);
}
function App() {
  return (
      <div>
        <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
          <Scene>

              {/*<DebugLayer>*/}
                  <arcRotateCamera
                      name="camera1"
                      target={Vector3.Zero()}
                      alpha={Math.PI / 2}
                      beta={Math.PI / 4}
                      radius={8}
                  />
                  <hemisphericLight
                      name="light1"
                      intensity={0.7}
                      direction={Vector3.Up()}

                  />
                  <ADTFullScreenUI>
                      <Sensor
                          title="sensor1"
                          value="value1"
                          info='info1'
                          onClick={clickLogger}
                          x={0}
                          y={0}
                          z={0}
                          alpha={1}

                      />
                      <Sensor
                          title="sensor2"
                          value="value2"
                          info='info2'
                          onClick={clickLogger}
                          x={2}
                          y={0}
                          z={0}
                          alpha={1}
                      />
                  </ADTFullScreenUI>
              {/*</DebugLayer>*/}

          </Scene>
        </Engine>
      </div>
  );
}

export default App;
