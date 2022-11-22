import {Component, createContext, createRef, useContext} from "react";
import {AdvancedDynamicTexture} from "@babylonjs/gui";

const FullScreenUIContext = createContext(null);

export class ADTFullScreenUI extends Component{
    constructor(props) {
        super(props);
        this.uiRef = createRef(null);
        this.uiRef.current = AdvancedDynamicTexture.CreateFullscreenUI('ui');
    }
    componentWillUnmount() {
        this.uiRef.current.dispose();
    }
    render() {
        return (
            <FullScreenUIContext.Provider value={this.uiRef.current}>
                {this.props.children}
            </FullScreenUIContext.Provider>
        );
    }
}

export const useFullScreenUI = () => useContext(FullScreenUIContext);