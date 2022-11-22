import {useScene} from 'react-babylonjs';
import { Rectangle, TextBlock} from '@babylonjs/gui';

import {useEffect, useRef} from "react";
import {MeshBuilder, Vector3} from "@babylonjs/core";
import {useFullScreenUI} from "./fullScreenUI";

const Sensor = ({ title, value, info, alpha, x, y, z,onClick }) => {
    const scene = useScene()
    const ui = useFullScreenUI()
    const sphRef = useRef(null);
    const rectRef = useRef(null);
    useEffect(() => {
        const sph = MeshBuilder.CreateSphere(`${title}-sp`, { segments: 32, diameter: 1 }, scene) //创建一个球体代表传感器
        const rect1 = new Rectangle(); // 创建显示文本用的框
        sphRef.current = sph;
        rectRef.current = rect1;
        ui.addControl(rect1);
        rect1.linkWithMesh(sph) // 链接
        return () => {
            sph.dispose()
            rect1.dispose()
        }
    },[title,scene,ui])
    useEffect(() => {
        const sph = sphRef.current;
        const rect1 = rectRef.current;
        sph.position = new Vector3(x, y, z) // 设置到 XYZ 坐标
        rect1.width = '100px';
        rect1.height = "40px";
        rect1.cornerRadius = 20;
        rect1.thickness = 4;
        rect1.alpha = alpha;
        rect1.background = "black";
        const label = new TextBlock(); // 创建文字
        label.text = title;
        label.color = 'white'
        rect1.addControl(label);
        return () => {
            label.dispose()
        }
    },[title,alpha, x, y, z])
    useEffect(() => {
        const rect1 = rectRef.current;
        let observer = rect1.onPointerClickObservable.add(() => onClick(title,value,info)) // 注册点击回调
        return () => {
            rect1.onPointerClickObservable.remove(observer)
        }
    },[title,value,info,onClick])
    return null
}
export default Sensor;
// AdvancedDynamicTexture.CreateFullscreenUI('UI') 这个要封装成一个可以使用 useFullscreenUi 来获取实例的 Component
/* 

let sph = MeshBuilder.CreateSphere(`${sensorLayer[i]['name']}-sp`, { segments: 32, diameter: 500 }, scene.scene) //创建一个球体代表传感器
sph.position = new Vector3(x, y, z) // 设置到 XYZ 坐标
var rect1 = new Rectangle(); // 创建显示文本用的框
rect1.width = '100px';
rect1.height = "40px";
rect1.cornerRadius = 20;
rect1.thickness = 4;
rect1.alpha = alpha; 
rect1.background = "black";
ui.addControl(rect1);
var label = new TextBlock(); // 创建文字
label.text = title;
label.color = 'white'
rect1.addControl(label);
rect1.linkWithMesh(sph) // 链接

*/

// 需要在改变 title value info alpha x y z 时响应变更，并在这个 Component 被移除时同时移除这些内容